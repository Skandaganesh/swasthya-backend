// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const activityRoutes = require('./routes/activityRoutes');
const adminMealPlanRoutes = require('./routes/adminMealPlanRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes setup
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', mealPlanRoutes);
app.use('/api', activityRoutes);
app.use('/api/admin', adminMealPlanRoutes);



// Start server
const PORT = process.env.PORT || 5001; // Default to 3000 if not set in .env
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
