// // backend/controllers/activityController.js
// const Activity = require('../models/Activity');

// exports.createActivity = (req, res) => {
//     const activityData = req.body;

//     Activity.create(activityData, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });

//         res.status(201).json({ message: 'Activity logged successfully', activityId: result.insertId });
//     });
// };

// exports.getActivitiesByUserId = (req, res) => {
//     const userId = req.params.id;

//     Activity.findByUserId(userId, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });

//         res.status(200).json(results);
//     });
// };

const db = require('../config/db'); // Assuming you have a database connection set up

// Create a new activity
exports.createActivity = async (req, res) => {
    const { userId, activityType, duration, caloriesBurned } = req.body;

    if (!userId || !activityType || !duration || !caloriesBurned ||
        typeof duration !== 'number' || typeof caloriesBurned !== 'number') {
        return res.status(400).json({ message: 'User ID, activity type, duration (number), and calories burned (number) are required.' });
    }

    try {
        const result = await db.query('INSERT INTO Activities (user_id, activity_type, duration, calories_burned) VALUES ($1, $2, $3, $4) RETURNING *', [userId, activityType, duration, caloriesBurned]);
        res.status(201).json({ message: 'Activity logged successfully', activity: result.rows[0] });
    } catch (error) {
        console.error('Error logging activity:', error.message);
        res.status(500).json({ message: 'Error logging activity.' });
    }
};

// Get activities by user ID
exports.getActivitiesByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const results = await db.query('SELECT * FROM Activities WHERE user_id = $1', [userId]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'No activities found for this user.' });
        }
        
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching activities:', error.message);
        res.status(500).json({ message: 'Error fetching activities.' });
    }
};

