
import express from 'express';

// Import room service
import * as roomService from '../../services/room.service'

// Define function to handle GET request for /rooms endpoint
async function getRooms(req: express.Request, res: express.Response): Promise<void> {
    try {
        // Get all rooms from the database using the room service
        const rooms = await roomService.getRooms();

        // Send a success response with the rooms array
        res.status(200).json(rooms);

    } catch (err) {
        // Send an error response with the error message
        res.status(500).send(err.message);

    }
}

// Define function to handle GET request for /rooms/:id endpoint
// Define function to handle GET request for /rooms/:id endpoint
async function getRoomById(req: express.Request, res: express.Response): Promise<void> {
    try {
        // Get the room id from the request parameters
        const roomId = req.params.id;

        // Get a room by id from the database using the room service
        const room = await roomService.getRoomById(roomId);

        // Send a success response with the room
        res.status(200).json(room);

    } catch (err) {
        // Send an error response with the error message
        res.status(500).send(err.message);

    }
}

