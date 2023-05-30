// Import user model
import User from '../models/user.model';

// Define interface for user data
interface UserData {
    username: string;
    email: string;
    password: string;
}

// Define function to create a new user document in the database
async function createUser(data: UserData): Promise<User> {
    try {
        // Create a new user document using the user model and data object
        const newUser = new User(data);

        // Save the user document to the database and return it
        return await newUser.save();

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to get all users from the database
async function getUsers(): Promise<User[]> {
    try {
        // Find all users using the user model
        const users = await User.find();

        // Return all users
        return users;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to get a user by id from the database
async function getUserById(userId: string): Promise<User> {
    try {
        // Find a user that matches the id using the user model
        const user = await User.findById(userId);

        // If no user is found, throw an error
        if (!user) {
            throw new Error('User not found');

        }

        // Return the user
        return user;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

// Define function to update a user by id in the database
// Define function to update a user by id in the database
async function updateUserById(userId: string, data: Partial<UserData>): Promise<User> {
    try {
        // Find a user by id and update it with the data object using the user model
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

        // If no user is found, throw an error
        if (!updatedUser) {
            throw new Error('User not found');

        }

        // Return the updated user
        return updatedUser;

    } catch (err) {
        // Throw an error if something goes wrong
        throw err;

    }
}

