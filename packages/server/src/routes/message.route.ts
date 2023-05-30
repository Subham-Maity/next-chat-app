// Import express
import express from 'express';

// Import message controller
import * as messageController from '../controllers/message.controller';

// Create a new router
const router = express.Router();

// Define GET endpoint for /messages
router.get('/messages', messageController.getMessages);

// Define POST endpoint for /messages
router.post('/messages', messageController.createMessage);

// Export the router
export default router;
