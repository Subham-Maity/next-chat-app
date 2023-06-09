// Import mongoose
import mongoose from 'mongoose';

// Create a user schema
const userSchema = new mongoose.Schema({
    // A user has a username field of type String
    username: {
        type: String,
        unique: true,
        required: true
    },
    // A user has a createdAt field that stores the date and time of creation
    createdAt: {
        type: Date,
        default: Date.now
    },
    // A user has an updatedAt field that stores the date and time of last update
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Export the user model
export default User;
