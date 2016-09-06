export default class extends PIXI.Container  {
    constructor(config, socketController) {
        super();
        this.socketController = socketController;
    }
    
    init() {
        this.uiContainer = $("#gaijin-ui");
        $("#gaijin-form").submit((event) => {
        	this.sendMessage(event.target["message"].value)
        	event.preventDefault()
        })
    }

    show() {
        this.uiContainer.show();
    }

    update() {

    }

    sendMessage(message) {
    	console.log("Send messsage", message);
    	this.socketController.emit("gaijin-message", {text:message});
    }
}
