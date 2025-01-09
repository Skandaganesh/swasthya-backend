const db = require('../config/db');

class Recipe {
    static async create(recipeData) {
        const result = await db`
            INSERT INTO Recipes (name, description, ingredients, instructions)
            VALUES (${recipeData.name}, ${recipeData.description}, ${recipeData.ingredients}, ${recipeData.instructions})
            RETURNING *;
        `;
        return result[0]; // Return the created recipe
    }

    static async findAll() {
        const result = await db`
            SELECT * FROM Recipes;
        `;
        return result; // Return all recipes
    }
}

module.exports = Recipe;
