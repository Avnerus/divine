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

        this.socketController.on("message", (data) => {
            this.showMessage(data.text);
        });
    }

    showMessage(text) {
      $(function(){
          $("#gaijin-output").typed({
            strings: [text],
            typeSpeed: 0
          });
      });
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
