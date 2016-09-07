import EventEmitter from 'events'
import SocketController from './socket-controller'
import Angel from './angel';
import Gaijin from './gaijin';
import Character from './character';

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

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(this.config.width, this.config.height);
        this.renderer.backgroundColor = 0x003F54;

        this.scene = new PIXI.Container();
        this.stage.addChild(this.scene);

        this.characters = {
            'mechanic': new Character('mechanic')
        }

        this.gaijin = new Gaijin(this.config, this.socketController, this.characters);
        this.angel = new Angel(this.config, this.socketController);

    }

    load(onLoad) {
        PIXI.loader.once('complete',() => {
            console.log("Loading complete");
            Object.keys(this.characters).forEach((key) => {
              let obj = this.characters[key];
              obj.init();
            });

            onLoad();
        });

        this.gaijin.load();
        this.angel.load();

        Object.keys(this.characters).forEach((key) => {
          let obj = this.characters[key];
          obj.load();
        });

        PIXI.loader.load();

    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();
        //$("#portal").show();
        this.showIntro();

        $("#intro").click(() => {$("#intro").fadeOut("slow");$("#portal").fadeIn("slow");});
        $("#gaijin-button").click(() => {this.showInterface(this.gaijin)});
        $("#angel-button").click(() => {this.showInterface(this.angel)});

        /*this.angel.show();*/

    }

    showIntro(){
        $("#intro").show();
        $("#intro-content").typed({
            strings: ["<h1>DIVINE</h1>","<p>Who could have predicted 30 years ago, that the final bastion of human civilization would be a Japanese space fortress floating through space, on course for Mars.</p>"],
            typeSpeed: 0,
            showCursor: false
        });
    }

    showInterface(module) {
        $("#portal").hide();
        module.init();
        module.show();
        this.scene.addChild(module);
    }

    animate(t) {
        this.update();
        this.render();
    }

    update() {
        this.gaijin.update();
        this.angel.update();
    }

    render() {
        this.renderer.render(this.stage);
    }

    resize() {
        this.renderer.view.style.width = window.innerWidth + "px";
        this.renderer.view.style.height = window.innerHeight + "px";
    }
}
