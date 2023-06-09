// Import user model
import User from '../models/user.model';

// Create a user service class
class UserService {
    // A method to create a new user
    async createUser(username: string) {
        // Create a new user object
        const user = new User({
            username
        });
        // Save the user to the database and return it
        return await user.save();
    }

    // A method to get all users
    async getUsers() {
        // Find all users and return them
        return await User.find();
    }

    // A method to get a user by id
    async getUserById(id: string) {
        // Find a user by id and return it
        return await User.findById(id);
    }

    // A method to update a user by id
    async updateUserById(id: string, data: any) {
        // Find and update a user by id and return the updated user
        return await User.findByIdAndUpdate(id, data, {new: true});
    }

    // A method to delete a user by id
    async deleteUserById(id: string) {
        // Find and delete a user by id and return it
        return await User.findByIdAndDelete(id);
    }
}

// Export an instance of the user service class
export default new UserService();
