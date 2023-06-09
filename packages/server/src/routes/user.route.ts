// Import express router and types
import { Router } from 'express';

// Import user controller
import userController from '../controllers/user.controller';

// Create a router for users
const router = Router();

// Define routes for users
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getUsers); // Get all users
router.get('/:userId', userController.getUserById); // Get a user by id
router.put('/:userId', userController.updateUserById); // Update a user by id
router.delete('/:userId', userController.deleteUserById); // Delete a user by id

// Export the router
export default router;
