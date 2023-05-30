// Import express
import express from 'express';

// Import room controller
import * as roomController from '../controllers/room.controller';

// Create a new router
const router = express.Router();

// Define GET endpoint for /rooms
router.get('/rooms', roomController.getRooms);

// Define GET endpoint for /rooms/:id
router.get('/rooms/:id', roomController.getRoomById);

// Define POST endpoint for /rooms
router.post('/rooms', roomController.createRoom);

// Define PUT endpoint for /rooms/:id
router.put('/rooms/:id', roomController.updateRoomById);

// Define DELETE endpoint for /rooms/:id
router.delete('/rooms/:id', roomController.deleteRoomById);

// Export the router
export default router;
