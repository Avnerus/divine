export default class extends PIXI.Container  {
    constructor(name) {
        super();
        this.name = name;
    }
    
    init() {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[this.name].texture)
        console.log(this.name, this.sprite);
        this.addChild(this.sprite);
    }

    show() {
    }

    update() {
    }

    load() {
        console.log("Loading character: " + this.name);
        PIXI.loader.add(this.name, 'assets/characters/' + this.name + '.png');        
    }

    say(text) {
        $(function(){
            $("#gaijin-box").typed({
              strings: [text],
              typeSpeed: 0,
              showCursor: false
            });
        });
    }
}
