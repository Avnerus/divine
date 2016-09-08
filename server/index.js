import express from 'express';
import socketio from 'socket.io'

import TranslationService from './translation_service';
import Dialog from './dialog';
import Console from './console';
import Mechanic from './characters/mechanic';
import ConsoleKeywords from './console/consoleKeywords';



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

let dialog = null;
let consoleWindow = null;

io.on('connection', (socket) => {
    socket.on('gaijin-start',  (data) => {
        console.log("Gaijin Starting!", data)
        dialog = new Dialog(socket, Mechanic, translationService);        
        dialog.start();
    });
    socket.on('angel-start',  (data) => {
        console.log("Angel Starting!", data)
        consoleWindow = new Console(socket, ConsoleKeywords, translationService);        
        consoleWindow.start();
    });
    socket.on('gaijin-outbox',  (data) => {
        console.log("Gaijin Jumble!", data)
        translationService.jumble(data.text)
        .then((result) => {
            console.log("Final result, sending to angel" , result);
            socket.broadcast.emit("angel-inbox", {text: result});
        });
    });
    socket.on('angel-outbox',  (data) => {
        console.log("Jumble!", data)
        translationService.jumble(data.text)
        .then((result) => {
            console.log("Final result, sending to gaijin" , result);
            socket.broadcast.emit("gaijin-inbox", {text: result});
        });
    });
});
