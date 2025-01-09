// backend/routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/activities', activityController.createActivity); // Log activity
router.get('/activities/:id', activityController.getActivitiesByUserId); // Get activities by user ID

module.exports = router;
