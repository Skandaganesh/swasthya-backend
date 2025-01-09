const db = require('../config/db');

class User {
    static async create(userData) {
        const result = await db`
            INSERT INTO Users (name, age, dietary_preferences, health_goals, allergy_info, email, password) 
            VALUES (${userData.name}, ${userData.age}, ${userData.dietary_preferences}, ${userData.health_goals}, ${userData.allergy_info}, ${userData.email}, ${userData.password}) 
            RETURNING *;
        `;
        return result[0]; // Return the newly created user
    }

    static async findById(userId) {
        const result = await db`
            SELECT * FROM Users WHERE user_id = ${userId};
        `;
        return result; // Return the user by ID
    }

    static async findByEmail(email) {
        const result = await db`
            SELECT * FROM Users WHERE email = ${email};
        `;
        return result; // Return the user by email
    }

    static async findAll() {
        const result = await db`
            SELECT * FROM Users;
        `;
        return result; // Return all users
    }

    static async updateEmail(userId, newEmail) {
        const result = await db`
            UPDATE Users SET email = ${newEmail} WHERE user_id = ${userId} RETURNING *;
        `;
        return result[0]; // Return the updated user
    }
}

module.exports = User;
