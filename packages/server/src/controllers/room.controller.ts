
// Import express types
import { Request, Response } from 'express';

// Import room service
import roomService from '../../services/room.service';

// Create a room controller class
class RoomController {
    // A method to handle creating a new room
    async createRoom(req: Request, res: Response) {
        try {
            // Get the name from the request body
            const { name } = req.body;
            // Validate the input
            if (!name) {
                return res.status(400).json({message: 'Missing name'});
            }
            // Create a new room using the room service
            const room = await roomService.createRoom(name);
            // Return a success response with the created room
            return res.status(201).json({message: 'Room created', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle getting all rooms
    async getRooms(req: Request, res: Response) {
        try {
            // Get all rooms using the room service
            const rooms = await roomService.getRooms();
            // Return a success response with the rooms
            return res.status(200).json({message: 'Rooms retrieved', data: rooms});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle getting a room by id
    async getRoomById(req: Request, res: Response) {
        try {
            // Get the room id from the request params
            const { roomId } = req.params;
            // Validate the input
            if (!roomId) {
                return res.status(400).json({message: 'Missing room id'});
            }
            // Get a room by id using the room service
            const room = await roomService.getRoomById(roomId);
            // Return a success response with the room
            return res.status(200).json({message: 'Room retrieved', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle updating a room by id
    async updateRoomById(req: Request, res: Response) {
        try {
            // Get the room id from the request params
            const { roomId } = req.params;
            // Get the data from the request body
            const data = req.body;
            // Validate the input
            if (!roomId) {
                return res.status(400).json({message: 'Missing room id'});
            }
            if (!data) {
                return res.status(400).json({message: 'Missing data'});
            }
            // Update a room by id using the room service
            const room = await roomService.updateRoomById(roomId, data);
            // Return a success response with the updated room
            return res.status(200).json({message: 'Room updated', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle deleting a room by id
    async deleteRoomById(req: Request, res: Response) {
        try {
            // Get the room id from the request params
            const { roomId } = req.params;
            // Validate the input
            if (!roomId) {
                return res.status(400).json({message: 'Missing room id'});
            }
            // Delete a room by id using the room service
            const room = await roomService.deleteRoomById(roomId);
            // Return a success response with the deleted room
            return res.status(200).json({message: 'Room deleted', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle adding a user to a room by id
    async addUserToRoom(req: Request, res: Response) {
        try {
            // Get the room id and user id from the request params
            const { roomId, userId } = req.params;
            // Validate the input
            if (!roomId || !userId) {
                return res.status(400).json({message: 'Missing room id or user id'});
            }
            // Add a user to a room by id using the room service
            const room = await roomService.addUserToRoom(roomId, userId);
            // Return a success response with the updated room
            return res.status(200).json({message: 'User added to room', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle removing a user from a room by id
    async removeUserFromRoom(req: Request, res: Response) {
        try {
            // Get the room id and user id from the request params
            const { roomId, userId } = req.params;
            // Validate the input
            if (!roomId || !userId) {
                return res.status(400).json({message: 'Missing room id or user id'});
            }
            // Remove a user from a room by id using the room service
            const room = await roomService.removeUserFromRoom(roomId, userId);
            // Return a success response with the updated room
            return res.status(200).json({message: 'User removed from room', data: room});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle setting or resetting the timer for a room by id
    async setTimerForRoom(req: Request, res: Response) {
        try {
            // Get the room id, duration and setter from the request body
            const { roomId, duration, setter } = req.body;
            // Validate the input
            if (!roomId || !duration || !setter) {
                return res.status(400).json({message: 'Missing required fields'});
            }
            // Set or reset the timer for a room by id using the room service
            const room = await roomService.setTimerForRoom(roomId, duration, setter);
            // Return a success response with the updated room
            return res.status(200).json({message: 'Timer set for room', data: room});
        } catch (error) {


            return res.status(500).json({message: error.message});
        }
    }
}

// Export an instance of the room controller class
export default new RoomController();


// Return an error response with the error message
