export default class extends PIXI.Container  {
    constructor(config) {
        super();
    }
    
    init() {
        this.uiContainer = $("#angel-ui");
    }

    show() {
        this.uiContainer.show();
    }

    update() {

    }
}
