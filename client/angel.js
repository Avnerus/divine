export default class extends PIXI.Container  {
    constructor(config, socketController) {
        super();
        this.active = false;
        this.socketController = socketController;
    }
    
    load() {

    }

    init() {
        this.uiContainer = $("#angel-ui");
        $("#angel-form").submit((event) => {
            this.sendMessage(event.target["message"].value);
            event.preventDefault();
            event.target["message"].value = "";
        })

        this.socketController.on("angel-inbox", (data) => {
            console.log("Incoming message to angel! ", data);
            this.showMessage(data.text);
        });
    }

    showMessage(text) {
      $(function(){
          $("#angel-output").typed({
            strings: [text],
            typeSpeed: 0,
            showCursor: false
          });
      });
    }

    show() {
        this.uiContainer.show();
        this.active = true;
    }

    update() {

    }

    sendMessage(message) {
        console.log("ANGEL - Send messsage", message);
        this.socketController.emit("angel-outbox", {text:message});
    }
}
