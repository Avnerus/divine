import TranslationService from './translation_service';
import express from 'express';
import socketio from 'socket.io'

const app = express();
const server = require('http').Server(app);
const io = socketio(server);
const translationService = new TranslationService();

app.use(express.static('public'));

server.listen(3000, function () {
      console.log('listening on port 3000!');
});

/*
this.translationService.jumble("Good luck")
.then((result) => {
    console.log("BOO", result);
    let text = new PIXI.Text(result, {fontFamily: 'Arial', fontSize: 48, fill: 0x000000});
        text.anchor.set(0.5,0.5);
        text.position.set(WIDTH / 2, HEIGHT / 1.8);
        this.scene.addChild(text);
        });*/

io.on('connection', (socket) => {
    socket.on('gaijin-message',  (data) => {
        console.log("Jumble!", data)
        translationService.jumble(data.text)
        .then((result) => {
            console.log("Final result" , result);
            socket.emit("message", {text: result});
        });
    });
});
