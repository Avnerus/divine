export default class extends PIXI.Container  {
    constructor(config) {
        super();
    }
    
    load() {
        PIXI.loader.add('stars', 'assets/stars.jpg');        
    }

    init() {
        this.sprite = new PIXI.extras.TilingSprite(PIXI.loader.resources["stars"].texture, 1366, 760);
        this.addChild(this.sprite);
        let mask = new PIXI.Graphics();
        mask.beginFill();
        mask.drawCircle(0, 0, 200);
        mask.endFill();
        this.addChild(mask);
        this.sprite.mask = mask;
        this.sprite.anchor.set(0.5, 0.5);
    }

    update() {
        this.sprite.tilePosition.x += 1
    }
}
