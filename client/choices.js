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
            let text = new PIXI.Text(choice, {fill: "#ffffff", wordWrap: true, wordWrapWidth: 600});
            text.anchor.set(0.5, 0.5);
            text.position.set(bgRect.width / 2, bgRect.height / 2);
            bgRect.addChild(text);
            bgRect.position.set(0,y);
            bgRect.interactive = true;
            bgRect.buttonMode = true;
            bgRect.click = () => {this.onChoice(i)};
            bgRect.mouseover = function() {this.texture = PIXI.loader.resources['choice-rect-hover'].texture};
            bgRect.mouseout = function() {this.texture = PIXI.loader.resources['choice-rect'].texture};
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
        PIXI.loader.add("choice-rect-hover", 'assets/choice-rect_hover.png');        
    }
}
