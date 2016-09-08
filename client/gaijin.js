import Window from './window'
import Choices from './choices'

export default class extends PIXI.Container  {
    constructor(config, socketController, characters) {
        super();
        this.socketController = socketController;
        this.spaceWindow = new Window();
        this.characters = characters;

        this.active = false;
    }
    
    init() {
        this.uiContainer = $("#gaijin-ui");
        $("#gaijin-form").submit((event) => {
        	this.sendMessage(event.target["message"].value);
        	event.preventDefault();
            event.target["message"].value = "";
        })

        this.socketController.on("gaijin-inbox", (data) => {
            console.log("Incoming message to gaijin! ", data);
            this.showMessage(data.text);
        });

        this.socketController.on("gaijin-reply", (data) => {
            console.log("Gaijin replies", data);
            this.gaijinReply(data.text);
        });

        this.socketController.on("character-enters", (data) => {
            this.characterEnters(data);
        });

        this.spaceWindow.init();
        this.spaceWindow.position.set(300,500);
        this.addChild(this.spaceWindow);

    }

    showMessage(text) {
      $(function(){
          $("#gaijin-output").typed({
            strings: [text],
            typeSpeed: 0,
            showCursor: false
          });
      });
    }

    show() {
        this.active = true;
        this.uiContainer.show();
        this.socketController.emit("gaijin-start", {});
    }

    update() {
        if (this.active) {
            this.spaceWindow.update();
        }
    }

    load() {
        this.spaceWindow.load();
        Choices.load();
    }

    sendMessage(message) {
    	console.log("GAIJIN - Send messsage", message);
    	this.socketController.emit("gaijin-outbox", {text:message});
    }

    characterEnters(data) {
        let character = this.characters[data.name];
        console.log("Character enters", data);
        character.position.x = -character.width;
        this.addChild(character);
        TweenMax.to(character.position, 1, {x: 300, onComplete: () => {
            character.say(data.text)
            .then(() => {
                let choices = new Choices(data.choices, (choice) => {this.onChoice(choice)});
                choices.init();
                choices.position.set(1100,50);
                choices.alpha = 0;
                this.addChild(choices);
                TweenMax.to(choices, 1, {alpha: 1});
            })
        }});
    }

    gaijinReply(text) {
        this.sayToCharacter(text)
        
    }

    sayToCharacter(text) {
        return new Promise((resolve, reject) => {
            $(() => {
                $("#gaijin-box").typed({
                    strings: ["<b>You</b>: " + text],
                    typeSpeed: 0,
                    showCursor: false,
                    onStringTyped: () => {resolve()}
                });
            });
        });
    }

    onChoice(choice) {
        console.log("Player choice! ", choice);
        this.socketController.emit("gaijin-choice", {index: choice});
    }
}
