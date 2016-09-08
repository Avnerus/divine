export default class extends PIXI.Container  {
    constructor(choices, onChoice) {
        super();
        this.choices = choices;
        this.onChoice = onChoice;
    }
    
    init() {
        let y = 0;
        for (let i = 0; i < this.choices.length; i++) {
            let choice = this.choices[i];
            let bgRect = new PIXI.Sprite(PIXI.loader.resources['choice-rect'].texture)
            let text = new PIXI.Text(choice, {fill: "#ffffff"});
            text.anchor.set(0.5, 0.5);
            text.position.set(bgRect.width / 2, bgRect.height / 2);
            bgRect.addChild(text);
            bgRect.position.set(0,y);
            bgRect.interactive = true;
            bgRect.buttonMode = true;
            bgRect.click = () => {this.onChoice(i)};
            this.addChild(bgRect); 
            y += 250;
        }
    }

    show() {
    }

    update() {
    }

    static load() {
        console.log("Loading Choice rect");
        PIXI.loader.add("choice-rect", 'assets/choice-rect.png');        
    }
}
