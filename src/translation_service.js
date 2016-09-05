import translate from 'node-google-translate-skidz';

export default class TranslationService {
    constructor() {
        console.log("Translation Service constructed!")
    }
    init() {
    }
    translator(text,source,target){
        return new Promise((resolve, reject) => {
            translate({
                text: text,
                source: source,
                target: target
            }, function(result){
                console.log(result);
                resolve(result);
            });
        });
    }
    jumble(text,source = "en",target = "ja"){
        console.log(text);
        return new Promise((resolve, reject) => {
            translate({
                text:text,
                source: source,
                target: target
            }, function(result){
                console.log(result);
                translate({
                    text: result,
                    source: target,
                    target: source
                }, function(res){
                    console.log(res);
                    resolve(res);
                });
            });
        });
    }
}
