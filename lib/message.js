module.exports = class Message {
    constructor(options = {}) {
        // if (!options) {
        //     let options = {}
        // }
        this.when = new Date();
        this.author = options.author || 'anonymous';
        this.body = options.body || "";
    }
}