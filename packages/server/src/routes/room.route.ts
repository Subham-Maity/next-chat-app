// Import express router and types
import { Router } from 'express';

// Import room controller
import roomController from '../controllers/room.controller';

// Create a router for rooms
const router = Router();

// Define routes for rooms
router.post('/', roomController.createRoom); // Create a new room
router.get('/', roomController.getRooms); // Get all rooms
router.get('/:roomId', roomController.getRoomById); // Get a room by id
router.put('/:roomId', roomController.updateRoomById); // Update a room by id
router.delete('/:roomId', roomController.deleteRoomById); // Delete a room by id
router.put('/add/:roomId/:userId', roomController.addUserToRoom); // Add a user to a room by id
router.put('/remove/:roomId/:userId', roomController.removeUserFromRoom); // Remove a user from a room by id
router.put('/timer', roomController.setTimerForRoom); // Set or reset the timer for a room by id

// Export the router
export default router;
