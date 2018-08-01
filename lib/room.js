module.exports = class Room {
    constructor(id, name = false) {
        if (id === undefined || id === '') {
            throw "room id required"
        } else if (!id.match(/^[a-z0-9]+$/)) {
            throw "room id must contain only lowercase letters"
        }
        this.id = id

        if (!name) {
            this.name = id.charAt(0).toUpperCase() + id.slice(1);
        } else {
            this.name = name
        }
        this.messages = []

    }
    messageCount() {
        return this.messages.length
    }
    sendMessage(message) {
        this.messages.push(message)
    }


    messagesSince(time) {
        // time = new Date(time)
        return this.messages.filter(message => new Date(message.when) > time)
    }

}





        // let messagesSince = []

        // for (let i = 0; i < this.messages.length; i++)
        //     message = messages[i]

        //     if (this.messageCount.length > 5) {
        //         messagesSince.push(message)
        //     }
        // return messagesSince