// models/MealPlan.js
const pool = require('../config/db'); // Assuming `pool` is exported correctly from your db.js

// Fetch allergens for a user
const getUserAllergens = async (userId) => {
    try {
        const result = await pool`
            SELECT ingredient_id 
            FROM Allergies 
            WHERE user_id = ${userId}
        `;
        
        // If result is not empty, map the rows to get the ingredient_ids
        return result.length > 0 ? result.map(item => item.ingredient_id) : [];
    } catch (error) {
        console.error('Error fetching allergens:', error);
        throw error; // Re-throw error for handling in controller
    }
};




const getMealPlans = async (healthGoal, allergenIds, dietaryPreferences) => {
    const result = await pool`
        SELECT mp.plan_id, mp.start_date, mp.end_date, mp.goal_type, mp.total_calories, r.recipe_id, r.name AS recipe_name
        FROM Meal_Plans mp
        JOIN Recipes r ON r.recipe_id IN (
            SELECT DISTINCT ri.recipe_id 
            FROM Recipe_Ingredients ri
            WHERE NOT EXISTS (
                SELECT 1 
                FROM unnest(${allergenIds}::int[]) AS excluded(ingredient_id)
                WHERE excluded.ingredient_id = ri.ingredient_id
            )
        )
        WHERE mp.goal_type = ${healthGoal}
        AND (${dietaryPreferences}::text IS NULL OR LOWER(r.name) LIKE LOWER(${`%${dietaryPreferences}%`}));
    `;
    return result.rows;
};

const getRecipesForMealPlan = async (planId) => {
    const result = await pool`
        SELECT r.recipe_id, r.name AS recipe_name
        FROM Meal_Plan_Recipes mpr
        JOIN Recipes r ON mpr.recipe_id = r.recipe_id
        WHERE mpr.plan_id = ${planId};
    `;
    return result.rows;
};

module.exports = { getUserAllergens, getMealPlans, getRecipesForMealPlan };
