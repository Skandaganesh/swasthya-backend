// backend/routes/mealPlanRoutes.js
const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');

// Create meal plan
//router.post('/meal-plans', mealPlanController.createMealPlan);

// Get meal plans by user ID
//router.get('/meal-plans/:id', mealPlanController.getMealPlansByUserId);

// Fetch meal plans based on user ID, health goals, and dietary mode
router.post('/meal-plans/fetch', mealPlanController.fetchMealPlans); // New POST route

// Suggest meal plans based on user health goals and allergies
//router.post('/suggest', mealPlanController.suggestMealPlan); // New POST route for suggesting meal plans

module.exports = router;
