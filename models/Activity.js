const db = require('../config/db');

class Activity {
    static async create(activityData) {
        const result = await db`
            INSERT INTO Activities (user_id, activity_type, duration, calories_burned, date)
            VALUES (${activityData.userId}, ${activityData.activityType}, ${activityData.duration}, ${activityData.caloriesBurned}, ${activityData.date})
            RETURNING *;
        `;
        return result[0]; // Return the created activity
    }

    static async findByUserId(userId) {
        const result = await db`
            SELECT * FROM Activities WHERE user_id = ${userId};
        `;
        return result; // Return the activities for the user
    }
}

module.exports = Activity;
