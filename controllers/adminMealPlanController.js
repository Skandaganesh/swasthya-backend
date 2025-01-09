// backend/controllers/adminMealPlanController.js
const AdminMealPlan = require('../models/adminMealPlan'); // Import the new admin meal plan model

// Create a new meal plan
exports.createMealPlan = async (req, res) => {
    const { userId, startDate, endDate, goalType, totalCalories } = req.body;

    if (!userId || !startDate || !endDate || !goalType || !totalCalories) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await AdminMealPlan.create({ userId, startDate, endDate, goalType, totalCalories });
        res.status(201).json({ message: 'Meal plan created successfully', mealPlan: result });
    } catch (error) {
        console.error('Error creating meal plan:', error);
        res.status(500).json({ message: 'Error creating meal plan.' });
    }
};

// Update a specific meal plan by ID
exports.updateMealPlan = async (req, res) => {
    const planId = req.params.id;
    const mealPlanData = req.body;

    try {
        const result = await AdminMealPlan.update(planId, mealPlanData);
        
        if (!result) return res.status(404).json({ message: 'Meal plan not found' });

        res.status(200).json({ message: 'Meal plan updated successfully', mealPlan: result });
    } catch (error) {
        console.error('Error updating meal plan:', error);
        return res.status(500).json({ message: 'Error updating meal plan.' });
    }
};

// Delete a specific meal plan by ID
exports.deleteMealPlan = async (req, res) => {
    const planId = req.params.id;

    try {
       const result= await AdminMealPlan.delete(planId); 
       if (!result) return res.status(404).json({ message: 'Meal plan not found' });

       res.status(200).json({ message: 'Meal plan deleted successfully', deletedMealPlan: result });
   } catch (error) {
       console.error('Error deleting meal plan:', error);
       return res.status(500).json({ message: 'Error deleting meal plan.' });
   }
};

// Get all meal plans
exports.getAllMealPlans = async (req, res) => {
    try {
        const results = await AdminMealPlan.findAll();
        res.status(200).json(results); // Return the list of all meal plans
    } catch (error) {
        console.error('Error fetching all meal plans:', error);
        return res.status(500).json({ message: 'Error fetching all meal plans.' });
    }
};
