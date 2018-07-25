let Room = require('./room.js')

module.exports = class House {
    constructor() {
        this.allRooms = [];
    }

    roomWithId(roomId) {
        let roomFound = this.allRooms.find((room) => {
            return room.id === roomId;
        })

        if (roomFound) {
            return roomFound;
        } else {
            let newRoom = new Room(roomId);
            this.allRooms.push(newRoom);
            return newRoom
        }
    }

    sendMessageToRoom(roomId, message) {
        let room = this.roomWithId(roomId)
        room.sendMessage(message)
    }

    
    allRoomIds() {
        return this.allRooms.map(room => room.id)
    }
};
