// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers); // Ensure this line exists

// Get user by ID
router.get('/users/:id', userController.getUserById); 

// Login user
router.post('/login', userController.loginUser);
// Route to update user email

router.put('/users/:id/email', userController.updateUserEmail);



// Define the route for user dashboard data
router.get('/user/:userId/dashboard', userController.getUserDashboardData);
module.exports = router;
