export default class GuiManager {
    constructor() {
        this.folders = {};
        this.controls = [];
       
    }
    init() {
        this.gui = new dat.GUI();
        //this.gui.close();
        events.on('add_gui', (opts,...args) => {
            console.log("ADD GUI",args);
            let control;
            if (opts.folder) {
                if (!this.folders[opts.folder]) {
                    this.folders[opts.folder] = this.gui.addFolder(opts.folder);
                    this.folders[opts.folder].open();
                }
                control = this.folders[opts.folder].add.apply(this.folders[opts.folder], args);
            } else {
                control = this.gui.add.apply(this.gui, args);
            }
            if (opts.step) {
                control.step(opts.step);
            }

            if (opts.onChange) {
                control.onChange(opts.onChange);
            }

            if (opts.listen) {
                control.listen();
            }
        })
    }
}
