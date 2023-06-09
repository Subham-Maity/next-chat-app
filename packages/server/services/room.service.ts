// Import room model
import Room from '../models/room.model';

// Create a room service class
class RoomService {
    // A method to create a new room
    async createRoom(name: string) {
        // Create a new room object
        const room = new Room({
            name
        });
        // Save the room to the database and return it
        return await room.save();
    }

    // A method to get all rooms
    async getRooms() {
        // Find all rooms and populate the users and timer.setter fields
        return await Room.find().populate('users').populate('timer.setter');
    }

    // A method to get a room by id
    async getRoomById(id: string) {
        // Find a room by id and populate the users and timer.setter fields
        return await Room.findById(id).populate('users').populate('timer.setter');
    }

    // A method to update a room by id
    async updateRoomById(id: string, data: any) {
        // Find and update a room by id and return the updated room
        return await Room.findByIdAndUpdate(id, data, {new: true});
    }

    // A method to delete a room by id
    async deleteRoomById(id: string) {
        // Find and delete a room by id and return it
        return await Room.findByIdAndDelete(id);
    }

    // A method to add a user to a room by id
    async addUserToRoom(roomId: string, userId: string) {
        // Find a room by id and push the user id to the users array
        return await Room.findByIdAndUpdate(roomId, {$push: {users: userId}}, {new: true});
    }

    // A method to remove a user from a room by id
    async removeUserFromRoom(roomId: string, userId: string) {
        // Find a room by id and pull the user id from the users array
        return await Room.findByIdAndUpdate(roomId, {$pull: {users: userId}}, {new: true});
    }

    // A method to set or reset the timer for a room by id
    async setTimerForRoom(roomId: string, duration: number, setter: string) {
        // Find a room by id and update the timer object with the duration, startedAt and setter fields
        return await Room.findByIdAndUpdate(roomId, {timer: {duration, startedAt: Date.now(), setter}}, {new: true});
    }
}

// Export an instance of the room service class
export default new RoomService();
