import translate from 'node-google-translate-skidz';

export default class TranslationService {
    constructor() {
        console.log("Translation Service constructed!")
    }
    init() {
    }

    test(text) {
        return new Promise((resolve, reject) => {
            translate({
                text: text,
                source: 'en',
                target: 'es'

            }, function(result) {
                  console.log(result);
                  resolve(result);
            });
        });
    }
}
