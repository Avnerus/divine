export default class {

    constructor(socket, keywords, translationService) {
        this.translationService = translationService;
        this.socket = socket;

        this.socket.on("angel-console", (data) => {
            console.log("Run query", data);

            let commands = keywords.commands;
            let searchTerms = new Set(data.text.replace(/[^\w\s]/gi, '').toLowerCase().split(" "));
            let results = [];

            for (let term of searchTerms){
                if(term.length > 3){
                    let result = commands.find(x => x.command.includes(term));
                    if(result != undefined){
                        results.push(result);
                    }
                }
            }

            if(results.length >= 1){
                socket.emit("angel-console", {text: "Found the above match about '"+results[0].command+"'", data:results[0]});
            } else {
                socket.emit("angel-console", {text: "No results found on '"+data.text+"'"});
            }
        });
    }

    start() {
        console.log("angel console");
    }

    init() {
    }

    showMessage(text) {
    }

}
