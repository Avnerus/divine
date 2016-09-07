import Mechanic from './characters/mechanic'
export default class {
    constructor(socket, translationService) {
        this.translationService = translationService;
        this.socket = socket;
    }
    start() {
        // Mechanic demo
        console.log("Bring in " + Mechanic.name);
        let choices = Mechanic.dialog[0].questions.map((e) => {return e.content })
        this.translationService.jumble(Mechanic.dialog[0].content)
        .then((result) => {
            this.socket.emit("character-enters", {name: Mechanic.name, text: result, choices: choices})
        });
    }

    init() {
    }

    showMessage(text) {
    }

}
