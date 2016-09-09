import Util from './util'

export default class extends PIXI.Container  {
    constructor(config, socketController) {
        super();
        this.active = false;
        this.socketController = socketController;
    }
    
    load() {
        PIXI.loader.add('fish_bg', 'assets/fish_background.png');        
    }

    init() {
        $("#angel-form").submit((event) => {
            this.sendMessage(event.target["message"].value);
            event.preventDefault();
            event.target["message"].value = "";
        })

        this.socketController.on("angel-inbox", (data) => {
            console.log("Incoming message to angel! ", data);
            PIXI.audioManager.getAudio('msg-received').play();
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
            
            $("#console-return-container").css("border", "5px solid #9afee5");
            
            if(data.data.image && data.data.text){
                $("#console-return-container").html("<img class='smallImg' src='"+data.data.image+"'><div>"+data.data.text+"</div>");
            } else if(data.data.image){
                $("#console-return-container").html("<img src='"+data.data.image+"'>");
            } else if(data.data.text){
                $("#console-return-container").html("<div>"+data.data.text+"</div>");
            }
        });

        this.socketController.on("end-game", (data) => {
          console.log("end game!", data);  
          if(data.result == "good"){
            $("#angel-end-splash").html("<div><h1>Congratulations!</h1><p>You have successfully helped the gaijin pass the first task</p></div>");
          } else if (data.result == "bad") {
            $("#angel-end-splash").html("<div><h1>Game over</h1><p>You have failed to protect the gaijin. Humanity has been destroyed.</p></div>");
          }
          $("#angel-end-splash").css({"opacity": 1, "display":"flex"});
        });

        let bgSprite = new PIXI.Sprite(PIXI.loader.resources['fish_bg'].texture)
        this.addChild(bgSprite);
    }

    showMessage(sender, message) {
      Util.appendScrollingText($("#angel-output"), "<b>" + sender + "<b>: " + message);
    }

    show() {
        $("#game-ui").hide();
        $("#angel-ui").show();
        $("#angel-ui-overlay").show();
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
        PIXI.audioManager.getAudio('msg-sent').play();
        this.socketController.emit("angel-outbox", {text:message});
    }
}
