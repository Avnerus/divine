//import translate from 'node-google-translate-skidz';
import MsTranslator from 'mstranslator'

export default class TranslationService {
    constructor() {
        console.log("Translation Service constructed!")
        this.client = new MsTranslator({
          client_id: "divine",
          client_secret: "0ttubAnS3B9vuporgJU3WQPcapZGUmcq74Nkj7cP68U="
        }, true);
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
        return new Promise((resolve, reject) => {
            this.client.translate({
                text:text,
                from: source,
                to: target
            }, function(err,result){
                    resolve(result);
            });
        });
    }
    /*
    FUCK GOOGLE

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
        }*/
}
