import express from 'express';
import socketio from 'socket.io'
import _ from 'lodash';

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

let waitingGaijins = [];
let waitingAngels = [];

let matchingAngels = {};
let matchingGaijins = {};


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

        // Search for angel
        if (waitingAngels.length > 0) {
            // Get a random one
            let index = Math.floor(Math.random() * waitingAngels.length);
            let angel = waitingAngels[index];
            waitingAngels.splice(index, 1);

            matchingAngels[socket.id] = angel;
            matchingGaijins[angel.id] = socket;

            socket.emit("found-match");
            angel.emit("found-match");
        } else {
            socket.emit("gaijin-wait");
            waitingGaijins.push(socket);
        }
    });
    socket.on('angel-start',  (data) => {
        console.log("Angel Starting!", data)
        consoleWindow = new Console(socket, ConsoleKeywords, translationService);        
        consoleWindow.start();

        // Search for gaijin
        if (waitingGaijins.length > 0) {
            // Get a random one
            console.log("Found match for angel!");
            let index = Math.floor(Math.random() * waitingGaijins.length);
            let gaijin = waitingGaijins[index]
            waitingGaijins.splice(index, 1);

            matchingGaijins[socket.id] = gaijin;
            matchingAngels[gaijin.id] = socket;


            socket.emit("found-match");
            gaijin.emit("found-match");


        } else {
            socket.emit("angel-wait");
            waitingAngels.push(socket);
        }
    });
    socket.on('gaijin-outbox',  (data) => {
        if (matchingAngels[socket.id]) {
            console.log("Gaijin Jumble!", data)
            translationService.jumble(data.text)
            .then((result) => {
                console.log("Final result, sending to angel" , result);
                matchingAngels[socket.id].emit("angel-inbox", {text: result});
            });
        } else {
            console.log("No match for this gaijin...");
        }
    });
    socket.on('angel-outbox',  (data) => {
        if (matchingGaijins[socket.id]) {
            console.log("Jumble!", data)
            translationService.jumble(data.text)
            .then((result) => {
                console.log("Final result, sending to gaijin" , result);
                matchingGaijins[socket.id].emit("gaijin-inbox", {text: result});
            });
        } else {
            console.log("No match for this angel..");
        }
    });

    socket.on('disconnect', function () {
        console.log("Socket disconnected");
        if (matchingAngels[socket.id]) {
            // It was connected to an angel
            let angel = matchingAngels[socket.id];
            matchingGaijins[angel.id] = null;
            matchingAngels[socket.id] = null;
            angel.emit("match-disconnected");
            waitingAngels.push(angel);

        } else if (matchingGaijins[socket.id]) {
            // It was connected to a gaijin
            let gaijin = matchingGaijins[socket.id];
            matchingAngels[gaijin.id] = null;
            matchingGaijins[socket.id] = null;
            gaijin.emit("match-disconnected");
            waitingGaijins.push(gaijin);
        } else {
            let index = _.findIndex(waitingGaijins, { 'id': socket.id });
            if (index != -1) {
                console.log("Removing from waiting gaijins list");
                waitingGaijins.splice(index, 1);
            } else {
                let index = _.findIndex(waitingAngels, { 'id': socket.id });
                if (index != -1) {
                    console.log("Removing from waiting angels list");
                    waitingAngels.splice(index, 1);
                }
            }
        }
    });
});


