import EventEmitter from 'events'
import SocketController from './socket-controller'
import Angel from './angel';
import Gaijin from './gaijin';

export default class  {
    constructor(config) {
        console.log("Game constructed!")
        this.config = config;
        this.started = false;
    }
    init() {

        class CustomEmitter extends EventEmitter {}
        this.emitter = new CustomEmitter();
        global.events = this.emitter;

        this.socketController = new SocketController();
        this.socketController.init();

        /*this.angel = new Angel();*/

        this.gaijin = new Gaijin(this.config, this.socketController);

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(this.config.width, this.config.height);
        this.renderer.backgroundColor = 0x003F54;

        this.scene = new PIXI.Container();
        this.stage.addChild(this.scene);

    }

    load(onLoad) {
        /*this.angel.init();*/
        this.gaijin.init();
        onLoad();
    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();

        /*this.angel.show();*/
        this.gaijin.show();

        let text = new PIXI.Text("Good luck" ,{fontFamily : 'Arial', fontSize: 48, fill : 0x000000, align : 'center'});
        text.anchor.set(0.5,0.5);
        text.position.set(this.config.width / 2, this.config.height / 2);
        this.scene.addChild(text);

        this.socketController.emit("jumble", {text: "Good Luck"});
        this.socketController.on("message", (data) => {
            console.log("Message! ", data);
            text.text = data.text;            
        });
    }

    animate(t) {
        this.update();
        this.render();
    }

    update() {
    }

    render() {
        this.renderer.render(this.stage);
    }

    resize() {
        this.renderer.view.style.width = window.innerWidth + "px";
        this.renderer.view.style.height = window.innerHeight + "px";
    }
}
