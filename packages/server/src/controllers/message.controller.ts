// Import express types
import { Request, Response } from 'express';

// Import message service
import messageService from '../../services/message.service';

// Create a message controller class
class MessageController {
    // A method to handle creating a new message
    async createMessage(req: Request, res: Response) {
        try {
            // Get the text, sender and room from the request body
            const {text, sender, room} = req.body;
            // Validate the input
            if (!text || !sender || !room) {
                return res.status(400).json({message: 'Missing required fields'});
            }
            // Create a new message using the message service
            const message = await messageService.createMessage(text, sender, room);
            // Return a success response with the created message
            return res.status(201).json({message: 'Message created', data: message});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle getting all messages in a room
    async getMessagesByRoom(req: Request, res: Response) {
        try {
            // Get the room id from the request params
            const {roomId} = req.params;
            // Validate the input
            if (!roomId) {
                return res.status(400).json({message: 'Missing room id'});
            }
            // Get all messages in the room using the message service
            const messages = await messageService.getMessagesByRoom(roomId);
            // Return a success response with the messages
            return res.status(200).json({message: 'Messages retrieved', data: messages});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

}

// Export an instance of the message controller class
export default new MessageController();
