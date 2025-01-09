const Recipe = require('../models/Recipe'); // Assuming you have a Recipe model set up

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { name, cuisine_type, prep_time, cooking_time, difficulty_level } = req.body;

    if (!name || !cuisine_type || !prep_time || !cooking_time || !difficulty_level) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await Recipe.create({ name, cuisine_type, prep_time, cooking_time, difficulty_level });
        res.status(201).json({ message: 'Recipe created successfully', recipe: result });
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ message: 'Error creating recipe.' });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const results = await Recipe.findAll(); // Assuming findAll method is implemented in your Recipe model
        res.status(200).json(results); // Return the list of all recipes
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ message: 'Error fetching recipes.' });
    }
};
