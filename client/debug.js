export default {
    positionObject: function(object, name) {
        events.emit("add_gui", {folder:name + " - Position"}, object.position, "x"); 
        events.emit("add_gui", {folder:name + " - Position"}, object.position, "y"); 

        events.emit("add_gui", {folder:name + " - Scale"}, object.scale, "x"); 
        events.emit("add_gui", {folder:name + " - Scale"}, object.scale, "y"); 
    }
}
