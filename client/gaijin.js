import Window from './window'

export default class extends PIXI.Container  {
    constructor(config, socketController) {
        super();
        this.socketController = socketController;
        this.spaceWindow = new Window();
    }
    
    init() {
        this.uiContainer = $("#gaijin-ui");
        $("#gaijin-form").submit((event) => {
        	this.sendMessage(event.target["message"].value);
        	event.preventDefault();
            event.target["message"].value = "";
        })

        this.socketController.on("message", (data) => {
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
        this.uiContainer.show();
    }

    update() {
        this.spaceWindow.update();
    }

    load() {
        this.spaceWindow.load();
    }

    sendMessage(message) {
    	console.log("Send messsage", message);
    	this.socketController.emit("gaijin-message", {text:message});
    }
}
