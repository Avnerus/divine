import Window from './window'

export default class extends PIXI.Container  {
    constructor(config, socketController) {
        super();
        this.socketController = socketController;
        this.spaceWindow = new Window();
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
}
