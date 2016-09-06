import EventEmitter from 'events'
import TranslationService from './translation_service';


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

        this.translationService = new TranslationService();

        this.scene = new PIXI.Container();
        this.stage.addChild(this.scene);

    }

    load(onLoad) {
        onLoad();
    }


    start() {
        this.container = document.getElementById('game');
        this.container.appendChild(this.renderer.view);
        this.resize();

        
        this.translationService.jumble("Good luck")
        .then((result) => {
            console.log("BOO", result);
            let text = new PIXI.Text(result, {fontFamily: 'Arial', fontSize: 48, fill: 0x000000});
                text.anchor.set(0.5,0.5);
                text.position.set(WIDTH / 2, HEIGHT / 1.8);
                this.scene.addChild(text);
        });

        let text = new PIXI.Text('Good luck',{fontFamily : 'Arial', fontSize: 48, fill : 0x000000, align : 'center'});
        text.anchor.set(0.5,0.5);
        text.position.set(WIDTH / 2, HEIGHT / 2);
        this.scene.addChild(text);


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
