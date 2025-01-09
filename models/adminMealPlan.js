const db = require('../config/db');

class AdminMealPlan {
    static async create(mealPlanData) {
        const { userId, startDate, endDate, goalType, totalCalories } = mealPlanData;

        const result = await db`
            INSERT INTO Meal_Plans (user_id, start_date, end_date, goal_type, total_calories) 
            VALUES (${userId}, ${startDate}, ${endDate}, ${goalType}, ${totalCalories}) 
            RETURNING *;
        `;
        return result[0]; // Return the created meal plan
    }

    static async update(planId, mealPlanData) {
        const { goalType, totalCalories } = mealPlanData;

        const result = await db`
            UPDATE Meal_Plans 
            SET goal_type = ${goalType}, total_calories = ${totalCalories} 
            WHERE plan_id = ${planId} 
            RETURNING *;
        `;
        return result[0]; // Return the updated meal plan
    }

    static async delete(planId) {
        const result = await db`
            DELETE FROM Meal_Plans WHERE plan_id = ${planId} RETURNING *;
        `;
        return result[0]; // Return the deleted meal plan
    }

    static async findAll() {
        const result = await db`
            SELECT * FROM Meal_Plans;
        `;
        return result; // Return all meal plans
    }
}

module.exports = AdminMealPlan;
