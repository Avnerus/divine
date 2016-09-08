import Util from './util'

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
            this.showMessage("Gaijin", data.text);
        });

        $("#angel-console-form").submit((event) => {
            event.preventDefault();
            console.log(event.target["console-message"]);
            this.sendConsoleMessage(event.target["console-message"].value);
            event.target["console-message"].value = "";
        })

        this.socketController.on("angel-console", (data) => {
            $("#console-output").html(data.text);
        });
    }

    showMessage(sender, message) {
      Util.appendScrollingText($("#angel-output"), "<b>" + sender + "<b>: " + message);
    }

    show() {
        this.uiContainer.show();
        this.active = true;
        this.socketController.emit("angel-start", {});
    }

    update() {

    }

    sendConsoleMessage(message){
        console.log("ANGEL console - Send", message);
        this.socketController.emit("angel-console", {text:message});
    }

    sendMessage(message) {
        console.log("ANGEL - Send messsage", message);
        this.showMessage("You", message);
        this.socketController.emit("angel-outbox", {text:message});
    }
}
