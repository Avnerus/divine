import EventEmitter from 'events'
import SocketController from './socket-controller'
import Angel from './angel';

const WIDTH = 1920;
const HEIGHT = 1080;

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

        this.angel = new Angel();

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
        this.renderer.backgroundColor = 0x00FF00;

        this.scene = new PIXI.Container();
        this.stage.addChild(this.scene);

    }

    load(onLoad) {
        this.angel.init()
        onLoad();
    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();

        this.angel.show();

        this.socketController.emit("jumble", {text: "Good Luck"});
        this.socketController.on("message", (data) => {
            console.log("Message! ", data);
            let text = new PIXI.Text(data.text ,{fontFamily : 'Arial', fontSize: 48, fill : 0x000000, align : 'center'});
            text.anchor.set(0.5,0.5);
            text.position.set(WIDTH / 2, HEIGHT / 2);
            this.scene.addChild(text);
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
