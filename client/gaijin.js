import Window from './window'

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
    }

    sendMessage(message) {
    	console.log("GAIJIN - Send messsage", message);
    	this.socketController.emit("gaijin-outbox", {text:message});
    }

    characterEnters(data) {
        let character = this.characters[data.name];
        console.log("Character enters", character);
        character.position.x = -character.width;
        this.addChild(character);
        TweenMax.to(character.position, 1, {x: 500, onComplete: () => {
            character.say(data.text)
        }});
    }
}
