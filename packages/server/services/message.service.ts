// Import message model
import Message from '../models/message.model';
import { Document } from 'mongoose';

// Define interface for message data
interface MessageData {
    text: string;
    sender: string;
    room: string;
}

// Define interface for query options
interface QueryOptions {
    limit?: number;
}

// Define function to create a new message document in the database
async function createMessage(data: MessageData): Promise<Document> {
    try {
        // Create a new message document using the message model and data object
        const newMessage = new Message(data);

        // Save the message document to the database and return it
        return await newMessage.save();

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;
    }
}

// Define function to get all messages for a given room from the database
async function getMessagesByRoom(roomId: string, options?: QueryOptions): Promise<Document[]> {
    try {
        // Find the messages that match the room id using the message model
        const messages = await Message.find({ room: roomId });

        // If options object has a limit property, slice the messages array to return only the last n messages
        if (options && options.limit) {
            return messages.slice(-options.limit);
        }

        // Otherwise, return all messages
        return messages;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;
    }
}

export { createMessage, getMessagesByRoom };
