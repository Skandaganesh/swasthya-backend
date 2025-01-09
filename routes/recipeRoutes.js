// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/recipes', recipeController.createRecipe); // Create recipe
router.get('/recipes', recipeController.getAllRecipes); // Get all recipes

module.exports = router;
