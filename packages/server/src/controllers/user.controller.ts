
// Import express types
import { Request, Response } from 'express';

// Import user service
import userService from '../../services/user.service';

// Create a user controller class
class UserController {
    // A method to handle creating a new user
    async createUser(req: Request, res: Response) {
        try {
            // Get the username from the request body
            const { username } = req.body;
            // Validate the input
            if (!username) {
                return res.status(400).json({message: 'Missing username'});
            }
            // Create a new user using the user service
            const user = await userService.createUser(username);
            // Return a success response with the created user
            return res.status(201).json({message: 'User created', data: user});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle getting all users
    async getUsers(req: Request, res: Response) {
        try {
            // Get all users using the user service
            const users = await userService.getUsers();
            // Return a success response with the users
            return res.status(200).json({message: 'Users retrieved', data: users});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle getting a user by id
    async getUserById(req: Request, res: Response) {
        try {
            // Get the user id from the request params
            const { userId } = req.params;
            // Validate the input
            if (!userId) {
                return res.status(400).json({message: 'Missing user id'});
            }
            // Get a user by id using the user service
            const user = await userService.getUserById(userId);
            // Return a success response with the user
            return res.status(200).json({message: 'User retrieved', data: user});
        } catch (error) {

            // ... previous code ...

            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle updating a user by id
    async updateUserById(req: Request, res: Response) {
        try {
            // Get the user id from the request params
            const { userId } = req.params;
            // Get the data from the request body
            const data = req.body;
            // Validate the input
            if (!userId) {
                return res.status(400).json({message: 'Missing user id'});
            }
            if (!data) {
                return res.status(400).json({message: 'Missing data'});
            }
            // Update a user by id using the user service
            const user = await userService.updateUserById(userId, data);
            // Return a success response with the updated user
            return res.status(200).json({message: 'User updated', data: user});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }

    // A method to handle deleting a user by id
    async deleteUserById(req: Request, res: Response) {
        try {
            // Get the user id from the request params
            const { userId } = req.params;
            // Validate the input
            if (!userId) {
                return res.status(400).json({message: 'Missing user id'});
            }
            // Delete a user by id using the user service
            const user = await userService.deleteUserById(userId);
            // Return a success response with the deleted user
            return res.status(200).json({message: 'User deleted', data: user});
        } catch (error) {
            // Return an error response with the error message
            return res.status(500).json({message: error.message});
        }
    }
}

// Export an instance of the user controller class
export default new UserController();


