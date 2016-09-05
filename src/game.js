import EventEmitter from 'events'


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

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
        this.renderer.backgroundColor = 0x00FF00;
    }

    load(onLoad) {
        onLoad();
    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();

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
