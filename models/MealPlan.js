const db = require('../config/db');

// Fetch allergens for a user
const getUserAllergens = async (userId) => {
    const query = 'SELECT ingredient_id FROM Allergies WHERE user_id = $1';
    try {
        const result = await db.query(query, [userId]);
        if (!result.rows || result.rows.length === 0) {
            console.log(`No allergens found for user ID: ${userId}`);
            return []; // Return an empty array if no rows
        }
        return result.rows.map(item => item.ingredient_id); // Extract ingredient_id
    } catch (error) {
        console.error('Error in getUserAllergens:', error);
        throw error;
    }
};


const getMealPlans = async (healthGoal, allergenIds, dietaryPreferences) => {
    const result = await db`
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
    const result = await db`
        SELECT r.recipe_id, r.name AS recipe_name
        FROM Meal_Plan_Recipes mpr
        JOIN Recipes r ON mpr.recipe_id = r.recipe_id
        WHERE mpr.plan_id = ${planId};
    `;
    return result.rows;
};

module.exports = { getUserAllergens, getMealPlans, getRecipesForMealPlan };
