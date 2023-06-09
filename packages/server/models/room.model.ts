// Import mongoose
import mongoose from 'mongoose';

// Create a room schema
const roomSchema = new mongoose.Schema({
    // A room has a name field of type String
    name: {
        type: String,
        unique: true,
        required: true
    },
    // A room has a users field that stores an array of users who have joined the room
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // A room has a timer field that stores an object with timer settings for the room
    timer: {
        // The timer has a duration field that stores the number of seconds for each round of conversation
        duration: Number,
        // The timer has a startedAt field that stores the date and time when the timer was started
        startedAt: Date,
        // The timer has a setter field that stores the user who set or reset the timer
        setter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    // A room has a createdAt field that stores the date and time of creation
    createdAt: {
        type: Date,
        default: Date.now
    },
    // A room has an updatedAt field that stores the date and time of last update
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a room model
const Room = mongoose.model('Room', roomSchema);

// Export the room model
export default Room;
