// Import room model
import Room from '../models/room.model';

// Define interface for room data
interface RoomData {
    name: string;
    topic?: string;
}

// Define interface for timer data
interface TimerData {
    duration: number;
    setter: string;
}

// Define function to create a new room document in the database
async function createRoom(data: RoomData): Promise<Room> {
    try {
        // Create a new room document using the room model and data object
        const newRoom = new Room(data);

        // Save the room document to the database and return it
        return await newRoom.save();

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to get all rooms from the database
async function getRooms(): Promise<Room[]> {
    try {
        // Find all rooms using the room model
        const rooms = await Room.find();

        // Return all rooms
        return rooms;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to get a room by id from the database
async function getRoomById(roomId: string): Promise<Room> {
    try {
        // Find a room that matches the id using the room model
        const room = await Room.findById(roomId);

        // If no room is found, throw an error
        if (!room) {
            throw new Error('Room not found');

        }

        // Return the room
        return room;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to update a room by id in the database
async function updateRoomById(roomId: string, data: Partial<RoomData>): Promise<Room> {
    try {
        // Find a room by id and update it with the data object using the room model
        const updatedRoom = await Room.findByIdAndUpdate(roomId, data, { new: true });

        // If no room is found, throw an error
        if (!updatedRoom) {
            throw new Error('Room not found');

        }

        // Return the updated room
        return updatedRoom;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to delete a room by id in the database
async function deleteRoomById(roomId: string): Promise<Room> {
    try {
        // Find a room by id and delete it using the room model
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        // If no room is found, throw an error
        if (!deletedRoom) {
            throw new Error('Room not found');

        }

        // Return the deleted room
        return deletedRoom;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to add a user to a room by id in the database
async function addUserToRoom(roomId: string, userId: string): Promise<Room> {
    try {

    }
