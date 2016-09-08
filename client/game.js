import EventEmitter from 'events'
import SocketController from './socket-controller'
import Angel from './angel';
import Gaijin from './gaijin';
import Character from './character';
import GuiManager from './gui_manager';

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


        this.gui = new GuiManager();
        this.gui.init();

        this.socketController = new SocketController();
        this.socketController.init();

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(this.config.width, this.config.height);
        this.renderer.backgroundColor = 0x000000;

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


        PIXI.loader.add("intro-music", "assets/audio/shooreh.ogg");
        PIXI.loader.add("play-music", "assets/audio/nighttime.ogg");

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
            strings: ["<p>Who could have predicted, that the final bastion of human civilization would be a Japanese space fortress floating on course for Mars.</p><p>A sole outsider, 外人 or gaijin, survived the incident on earth by sneaking onto the flying fortress when it departed Tokyo.</p><p>Stranded in an environment where they can understand no-one, the only help the outsider has is an unnamed divine being – half slug, half fish, all adorable – who is able to decipher the language of the crew of the ship to a form the gaijin can understand... To the best of its ability.</p><p>Being divine, the creature also possesses access to the divine data register, by means of which they will aid the gaijin in their quest of surviving the journey.<p><p>Select your character and good luck."],
            typeSpeed: 2,
            showCursor: false
        });
        this.introMusic = PIXI.audioManager.getAudio('intro-music');
        this.introMusic.play();
        console.log(this.introMusic);
    }

    showInterface(module) {
        $("#portal").hide();
        module.init();
        module.show();
        this.scene.addChild(module);

        this.introMusic.stop();
        this.playMusic = PIXI.audioManager.getAudio('play-music');
        this.playMusic.play();
    }

    animate(dt) {
        this.update(dt);
        this.render();
    }

    update(dt) {
        this.gaijin.update(dt);
        this.angel.update(dt);
    }

    render() {
        this.renderer.render(this.stage);
    }

    resize() {
        this.renderer.view.style.width = window.innerWidth + "px";
        this.renderer.view.style.height = window.innerHeight + "px";
    }
}
