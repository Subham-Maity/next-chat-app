// Import mongoose
import mongoose from 'mongoose';

// Create a message schema
const messageSchema = new mongoose.Schema({
    // A message has a text field of type String
    text: {
        type: String,
        required: true
    },
    // A message has a sender field that references a user model
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // A message has a room field that references a room model
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    // A message has a createdAt field that stores the date and time of creation
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a message model
const Message = mongoose.model('Message', messageSchema);

// Export the message model
export default Message;
