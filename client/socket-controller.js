export default class SocketController {
    constructor() {
        console.log("Socket controller constructed!")
    }
    init() {
        this.socket = io('http://' + window.location.hostname + ":" + window.location.port);
    }
    emit(message, args) {
        console.log("Sending message ", message);
        this.socket.emit(message, args);
    }

    on(message, func) {
        this.socket.on(message, func);
    }
}
