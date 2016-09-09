import Window from './window'
import Choices from './choices'
import Util from './util'
import Debug from './debug';
import Smoke from './smoke';

export default class extends PIXI.Container  {
    constructor(config, socketController, characters) {
        super();
        this.socketController = socketController;
        this.spaceWindow = new Window();
        this.characters = characters;
        this.currentCharacter = null;
        this.smoke = new Smoke();
        this.config = config;

        this.active = false;
    }
    
    init() {
        $("#gaijin-form").submit((event) => {
        	this.sendMessage(event.target["message"].value);
        	event.preventDefault();
            event.target["message"].value = "";
        })

        this.socketController.on("gaijin-inbox", (data) => {
            console.log("Incoming message to gaijin! ", data);
            this.showMessage("Fish", data.text);
        });

        this.socketController.on("gaijin-reply", (data) => {
            console.log("Gaijin replies", data);
            this.gaijinReply(data.text);
        });

        this.socketController.on("character-enters", (data) => {
            this.characterEnters(data);
        });

        this.socketController.on("character-says", (data) => {
            this.characterSays(data);
        });

        this.filterLayer = new PIXI.Container();
        this.addChild(this.filterLayer);

        this.spaceWindow.init();
        this.spaceWindow.position.set(1540,520);
        this.filterLayer.addChild(this.spaceWindow);
        //Debug.positionObject(this.spaceWindow, "Window");

        let bgSprite = new PIXI.Sprite(PIXI.loader.resources['gaijin_bg'].texture)
        this.filterLayer.addChild(bgSprite);

        this.smoke.init();
        this.smoke.position.set(1175,698);
        this.smoke.rotation = 90 * Math.PI / 180;
        //Debug.positionObject(this.smoke, "Smoke");
        this.filterLayer.addChild(this.smoke);

        /*
        this.noiseFilter = new PIXI.filters.NoiseFilter();
        this.noiseFilter.enabled = true; */

        /*
        events.emit("add_gui", {folder:"Filter"}, this.dispFilter.scale, "x"); 
        events.emit("add_gui", {folder:"Filter"}, this.dispFilter.scale, "y");  */
    }

    showMessage(sender, message) {
        Util.appendScrollingText($("#gaijin-output"), "<b>" + sender + "<b>: " + message)
    }

    show() {
        this.active = true;
        $("#gaijin-ui").show();
        $("#gaijin-ui-overlay").show();
        this.socketController.emit("gaijin-start", {});
    }

    update(dt) {
        if (this.active) {
            this.spaceWindow.update();
            this.smoke.update(dt);
        }
    }

    load() {
        this.spaceWindow.load();
        this.smoke.load();
        Choices.load();

        PIXI.loader.add('gaijin_bg', 'assets/gaijin_bg.png');        
        PIXI.loader.add('disp_map', 'assets/scatter_map.png');        
    }

    sendMessage(message) {
    	this.socketController.emit("gaijin-outbox", {text:message});
        this.showMessage("You", message);
    }

    characterEnters(data) {
        this.currentCharacter = this.characters[data.name];
        console.log("Character enters", data);
        this.currentCharacter.position.x = -this.currentCharacter.width;
        this.filterLayer.addChild(this.currentCharacter);
        TweenMax.to(this.currentCharacter.position, 1, {x: 100, onComplete: () => {
            this.currentCharacter.say(data.text)
            .then(() => {
                //Debug.positionObject(this.currentCharacter, "Character");
                this.showChoices(data.choices);
            })
        }});
    }

    showChoices(choicesData) {
        let choices = new Choices(choicesData, (choice) => {
            this.onChoice(choice)
            TweenMax.to(choices, 1, {alpha: 0, onComplete: () => {choices = null}});
        });
        choices.init();
        choices.position.set(850,50);
        choices.alpha = 0;
        this.addChild(choices);
        TweenMax.to(choices, 1, {alpha: 1});
    }

    gaijinReply(text) {
        this.sayToCharacter(text)
        .then(() => {
            setTimeout(() => {
                this.socketController.emit("gaijin-next");
            },1500);
        })
        
    }

    sayToCharacter(text) {
        return new Promise((resolve, reject) => {
            $(() => {
                $("#gaijin-box").typed({
                    strings: ["<b>You</b>: " + text],
                    typeSpeed: 0,
                    showCursor: false,
                    onStringTyped: () => {resolve()}
                });
            });
        });
    }

    characterSays(data) {
        this.currentCharacter.say(data.text)
        .then(() => {
            if (data.end) {
                console.log("End!", data.end);                
                if (data.end == "bad") {
                    this.endBad();
                } else if (data.end == "good") {
                    this.endGood();
                }
            } else {
                this.showChoices(data.choices);
            }
        })
    }

    onChoice(choice) {
        console.log("Player choice! ", choice);
        this.socketController.emit("gaijin-choice", {index: choice});
    }

    endBad() {
        let dispSprite = new PIXI.Sprite(PIXI.loader.resources['disp_map'].texture)
        this.filterLayer.addChild(dispSprite);
        this.dispFilter = new PIXI.filters.DisplacementFilter(dispSprite, 0);
        this.dispFilter.enabled = true;
        this.filterLayer.filters = [this.dispFilter];
        TweenMax.to(this.smoke.emitter, 10, 
        {frequency: 0.001, maxParticles: 500, startSpeed: 2000, endSpeed: 1000, startScale: 0.5, endScale: 1.0});
        TweenMax.to(this.dispFilter.scale, 10, {ease: Power1.easeIn, delay: 6, x: -8000, onComplete: () => {
            var text = new PIXI.Text('YOU LOSE',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff, align : 'center'});
            text.anchor.set(0.5, 0.5);
            text.position.set(this.config.width / 2, 300);
            text.alpha = 0;
            this.addChild(text);
            TweenMax.to(text, 1, {delay: 1, alpha: 1});
        }});
    }

    endGood() {
        this.colorFilter = new PIXI.filters.ColorMatrixFilter();
        this.colorFilter.enabled = true;
        this.filterLayer.filters = [this.colorFilter];
        TweenMax.to(this.smoke.emitter, 2,{maxParticles: 0, onComplete: () => {
            this.colorFilter.browni(true);
            var text = new PIXI.Text('YOU WIN!\nThanks for playing ^_^',
            {fontFamily : 'Arial', fontSize: 100, fill : 0x9103AD, align : 'center', stroke: 'white', strokeThickness: 10, fontWeight: 'bolder' });
            text.anchor.set(0.5, 0.5);
            text.position.set(this.config.width / 2, -300);
            this.addChild(text);
            TweenMax.to(text.position, 1, {y: 300});
        }});
    }
}
