import _ from 'lodash';

export default class {
    constructor(socket, character, translationService) {
        this.translationService = translationService;
        this.socket = socket;
        this.character = character;

        this.socket.on("gaijin-choice", (data) => {this.playerChoice(data.index)});
        this.socket.on("gaijin-next", (data) => {this.getNext()});
    }
    start() {
        console.log("Bring in " + this.character.name);
        this.currentIndex = 1;
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

    getNext() {
        this.currentIndex = this.nextIndex;
        let entry = _.find(this.character.dialog, {"id": this.currentIndex});
        let choices = entry.questions.map((e) => {return e.content })
        let data = {choices: choices};
        if (entry.end) {
            data.end = entry.end;
        }
        this.translationService.jumble(entry.content)
        .then((result) => {
            data.text = result;
            this.socket.emit("character-says", data);
            if (data.end) {
                this.socket.broadcast.emit("end-game", {result: data.end});
            }
        });
    }

    playerChoice(index) {
        console.log("Player chooses", index);
        console.log()
        let entry = _.find(this.character.dialog, {"id": this.currentIndex});
        let answer = entry.questions[index].content;
        this.nextIndex = entry.questions[index]["next-id"];

        this.translationService.jumble(answer)
        .then((result) => {
            this.socket.emit("gaijin-reply", {text: result})
        });
    }
}
