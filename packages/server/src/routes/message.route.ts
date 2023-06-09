
// Import express router and types
import { Router } from 'express';

// Import message controller
import messageController from '../controllers/message.controller';

// Create a router for messages
const router = Router();

// Define routes for messages
router.post('/', messageController.createMessage); // Create a new message
router.get('/:roomId', messageController.getMessagesByRoom); // Get all messages in a room


// Export the router
export default router;

