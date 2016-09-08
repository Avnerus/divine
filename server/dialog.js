export default class {
    constructor(socket, character, translationService) {
        this.translationService = translationService;
        this.socket = socket;
        this.character = character;

        this.socket.on("gaijin-choice", (data) => {this.playerChoice(data.index)});
    }
    start() {
        console.log("Bring in " + this.character.name);
        this.currentIndex = 0;
        let choices = this.character.dialog[0].questions.map((e) => {return e.content })
        this.translationService.jumble(this.character.dialog[0].content)
        .then((result) => {
            this.socket.emit("character-enters", {name: this.character.name, text: result, choices: choices})
        });
    }

    init() {
    }

    showMessage(text) {
    }

    playerChoice(index) {
        console.log("Player chooses", index);
        let answer = this.character.dialog[this.currentIndex].questions[index].content;
        this.translationService.jumble(answer)
        .then((result) => {
            this.socket.emit("gaijin-reply", {text: result})
        });
    }
}
