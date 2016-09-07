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
        PIXI.loader.once('complete',() => {
            console.log("Loading complete");
            this.gaijin.init();
            onLoad();
        });

        this.gaijin.load();
        /*this.angel.init();*/

        PIXI.loader.load();

    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();

        $("#portal").show();

        $("#gaijin-button").click(() => {this.showInterface(this.gaijin)});
        $("#angel-button").click(() => {this.showInterface(this.angel)});

        /*this.angel.show();*/

    }

    showInterface(module) {
        $("#portal").hide();
        module.show();
        this.scene.addChild(module);
    }

    animate(t) {
        this.update();
        this.render();
    }

    update() {
        this.gaijin.update();
    }

    render() {
        this.renderer.render(this.stage);
    }

    resize() {
        this.renderer.view.style.width = window.innerWidth + "px";
        this.renderer.view.style.height = window.innerHeight + "px";
    }
}
