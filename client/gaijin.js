import Window from './window'
import Choices from './choices'
import Util from './util'

export default class extends PIXI.Container  {
    constructor(config, socketController, characters) {
        super();
        this.socketController = socketController;
        this.spaceWindow = new Window();
        this.characters = characters;
        this.currentCharacter = null;

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
            this.showMessage("Fish", data.text);
        });

        this.socketController.on("gaijin-reply", (data) => {
            console.log("Gaijin replies", data);
            this.gaijinReply(data.text);
        });

        this.socketController.on("character-enters", (data) => {
            this.characterEnters(data);
        });

        this.socketController.on("character-says", (data) => {
            this.characterSays(data);
        });

        this.spaceWindow.init();
        this.spaceWindow.position.set(300,500);
        this.addChild(this.spaceWindow);

    }

    showMessage(sender, message) {
        Util.appendScrollingText($("#gaijin-output"), "<b>" + sender + "<b>: " + message)
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
    	this.socketController.emit("gaijin-outbox", {text:message});
        this.showMessage("You", message);
    }

    characterEnters(data) {
        this.currentCharacter = this.characters[data.name];
        console.log("Character enters", data);
        this.currentCharacter.position.x = -this.currentCharacter.width;
        this.addChild(this.currentCharacter);
        TweenMax.to(this.currentCharacter.position, 1, {x: 300, onComplete: () => {
            this.currentCharacter.say(data.text)
            .then(() => {
                this.showChoices(data.choices);
            })
        }});
    }

    showChoices(choicesData) {
        let choices = new Choices(choicesData, (choice) => {
            this.onChoice(choice)
            TweenMax.to(choices, 1, {alpha: 0, onComplete: () => {choices = null}});
        });
        choices.init();
        choices.position.set(1100,50);
        choices.alpha = 0;
        this.addChild(choices);
        TweenMax.to(choices, 1, {alpha: 1});
    }

    gaijinReply(text) {
        this.sayToCharacter(text)
        .then(() => {
            this.socketController.emit("gaijin-next");
        })
        
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

    characterSays(data) {
        this.currentCharacter.say(data.text)
        .then(() => {
            this.showChoices(data.choices);
        })
    }

    onChoice(choice) {
        console.log("Player choice! ", choice);
        this.socketController.emit("gaijin-choice", {index: choice});
    }
}
