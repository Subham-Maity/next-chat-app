// Import message model
import Message from '../models/message.model';

// Create a message service class
class MessageService {
    // A method to create a new message
    async createMessage(text: string, sender: string, room: string) {
        // Create a new message object
        const message = new Message({
            text,
            sender,
            room
        });
        // Save the message to the database and return it
        return await message.save();
    }

    // A method to get all messages in a room
    async getMessagesByRoom(room: string) {
        // Find all messages that belong to the room and populate the sender field
        return await Message.find({room}).populate('sender');
    }

    // A method to delete a message by id (not implemented)
}

// Export an instance of the message service class
export default new MessageService();
