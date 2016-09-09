export default class extends PIXI.Container  {
    constructor(name) {
        super();
        this.name = name;
    }
    
    init() {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[this.name].texture)
        console.log(this.name, this.sprite);
        this.addChild(this.sprite);
        this.element = $('#gaijin-box');
        this.currentScrollHeight = this.element.get(0).scrollHeight;

        this.element.bind('DOMSubtreeModified', () => {
            let scrollHeight = this.element.get(0).scrollHeight;
            if (scrollHeight != this.currentScrollHeight) {
                this.element.animate({
                    scrollTop: scrollHeight
                }, 500)
                this.currentScrollHeight = scrollHeight;
            }
        });
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
        console.log(this.name + " Says: " + text);
        return new Promise((resolve, reject) => {
            $(() => {
                this.element.typed({
                    strings: ["<b>" + this.name + "</b>: " + text],
                    typeSpeed: 0,
                    showCursor: false,
                    onStringTyped: () => {resolve()}
                });
            });
        });
    }
}
