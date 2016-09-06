import translate from 'node-google-translate-skidz';

export default class TranslationService {
    constructor() {
        console.log("Translation Service constructed!")
    }
    init() {
    }

    jumble(text) {
        return this.translate(text, "en", "ru")
        .then((result) => {
            console.log("1", result);
            return this.translate(result, "ru", "ja")
        })
        .then((result) => {
            console.log("2", result);
            return this.translate(result, "ja", "en")
        });
    }

    translate(text,source = "en",target = "ja"){
        console.log(text);
        return new Promise((resolve, reject) => {
            translate({
                text:text,
                source: source,
                target: target
            }, function(result){
                    console.log(result);
                    resolve(result);
            });
        });
    }
}
