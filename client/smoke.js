export default class extends PIXI.Container  {
    constructor(config) {
        super();

        this.emitterConfig = {
                "alpha": {
                    "start": 1,
                    "end": 0
                },
                "scale": {
                    "start": 0.1,
                    "end": 0.7
                },
                "color": {
                    "start": "ffffff",
                    "end": "ffffff"
                },
                "speed": {
                    "start": 600,
                    "end": 100
                },
                "startRotation": {
                    "min": 260,
                    "max": 280
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 20
                },
                "lifetime": {
                    "min": 0.5,
                    "max": 0.7
                },
                "blendMode": "normal",
                "frequency": 0.015,
                "maxParticles": 200,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "point"
        };
    }
    
    load() {
        PIXI.loader.add('cartoon-smoke', 'assets/CartoonSmoke.png');        
    }

    init() {
        this.emitter = new PIXI.particles.Emitter(
            this,
            [PIXI.loader.resources['cartoon-smoke'].texture],
            this.emitterConfig
        );
        console.log("Emitter: ", this.emitter);
        this.emitter.emit = true;
        
    }

    update(dt) {
        this.emitter.update(dt * 0.001);
    }
}
