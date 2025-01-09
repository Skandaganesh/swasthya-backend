// backend/routes/adminMealPlanRoutes.js
const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/adminMealPlanController');

// Admin can create a new meal plan
router.post('/meal-plans', mealPlanController.createMealPlan);

// Admin can update a specific meal plan by ID
router.put('/meal-plans/:id', mealPlanController.updateMealPlan);

// Admin can delete a specific meal plan by ID
router.delete('/meal-plans/:id', mealPlanController.deleteMealPlan);

// Admin can get all meal plans
router.get('/meal-plans', mealPlanController.getAllMealPlans);

module.exports = router;
