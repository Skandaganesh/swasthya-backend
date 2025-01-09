// backend/controllers/mealPlanController.js
const MealPlan = require('../models/MealPlan');
const User = require('../models/user');
const Recipe = require('../models/Recipe');

// Helper function to format meal plans
const formatMealPlans = (plans) => {
    return plans.map(plan => ({
        plan_id: plan.plan_id,
        start_date: plan.start_date,
        end_date: plan.end_date,
        goal_type: plan.goal_type,
        total_calories: plan.total_calories,
        recipes: plan.recipes || [] // Ensure recipes are included
    }));
};

// Fetch meal plans based on user ID, health goals, and dietary mode
exports.fetchMealPlans = async (req, res) => {
    const { userId, healthGoals, dietaryMode } = req.body;

    if (!userId || !healthGoals || !dietaryMode) {
        return res.status(400).json({ message: 'User ID, health goals, and dietary mode are required.' });
    }

    try {
        console.log(`Fetching meal plans for User ID: ${userId}, Health Goals: ${healthGoals}, Dietary Mode: ${dietaryMode}`);

        const allergenIds = await MealPlan.getUserAllergens(userId);
        console.log(`Fetched allergens for User ID ${userId}:`, allergenIds);

        const results = await MealPlan.getMealPlans(healthGoals, allergenIds, dietaryMode);
        console.log(`Fetched meal plans for health goals '${healthGoals}':`, results);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No meal plans found for the given criteria.' });
        }

        // Fetch recipes for each meal plan
        const mealPlansWithRecipes = await Promise.all(results.map(async (plan) => {
            try {
                const recipes = await MealPlan.getRecipesForMealPlan(plan.plan_id); // Fetching recipes for each meal plan
                return {
                    ...plan,
                    recipes // Add fetched recipes to each plan
                };
            } catch (error) {
                console.error(`Error fetching recipes for meal plan ID ${plan.plan_id}:`, error);
                return { ...plan, recipes: [] }; // Return the plan with an empty recipes array on error
            }
        }));

        const formattedPlans = formatMealPlans(mealPlansWithRecipes);
        
        console.log('Meal plans suggested successfully:', formattedPlans);
        res.status(200).json({ message: 'Meal plans suggested successfully!', mealPlans: formattedPlans });
    } catch (error) {
        console.error('Error in fetchMealPlans:', error);
        res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
};


// // Create a new meal plan
// exports.createMealPlan = async (req, res) => {
//     const mealPlanData = req.body;

//     try {
//         const result = await MealPlan.create(mealPlanData);
//         res.status(201).json({ message: 'Meal plan created successfully', mealPlan: result });
//     } catch (err) {
//         console.error('Error creating meal plan:', err);
//         return res.status(500).json({ error: err.message });
//     }
// };

// // Get all meal plans for a specific user
// exports.getMealPlansByUserId = async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const results = await MealPlan.findByUserId(userId);
        
//         if (results.length === 0) return res.status(404).json({ message: 'No meal plans found for this user.' });
        
//         res.status(200).json(results);
//     } catch (err) {
//         console.error('Error fetching meal plans by user ID:', err);
//         return res.status(500).json({ error: err.message });
//     }
// };

// // Get all meal plans (Admin functionality)
// exports.getAllMealPlans = async (req, res) => {
//     try {
//         const results = await MealPlan.findAll();
//         res.status(200).json(results); // Return the list of users
//     } catch (err) {
//         console.error('Error fetching all meal plans:', err);
//         return res.status(500).json({ error: err.message });
//     }
// };
// // backend/controllers/mealPlanController.js
// exports.suggestMealPlan = async (req, res) => {
//     const { userId, dietaryPreferences, healthGoals } = req.body; // Change healthGoal to healthGoals

//     // Validate input
//     if (!userId || !healthGoals) { // Check for healthGoals instead of healthGoal
//         console.log('Validation failed: User ID and health goals are required.');
//         return res.status(400).json({ message: 'User ID and health goals are required.' });
//     }

//     try {
//         console.log(`Received request to suggest meal plans for User ID: ${userId}, Health Goals: ${healthGoals}, Dietary Preferences: ${dietaryPreferences}`);

//         // Step 1: Fetch the user's allergens
//         const allergenIds = await MealPlan.getUserAllergens(userId);

//         // Step 2: Fetch meal plans based on health goals and allergens
//         const mealPlans = await MealPlan.getMealPlans(healthGoals, allergenIds, dietaryPreferences);

//         // Step 3: Filter recipes by dietary preferences if specified
//         let filteredMealPlans = mealPlans;

//         if (dietaryPreferences) {
//             const preferencesArray = dietaryPreferences.split(',').map(pref => pref.trim().toLowerCase());
//             filteredMealPlans = mealPlans.filter(plan => {
//                 return preferencesArray.every(pref => 
//                     plan.recipe_name.toLowerCase().includes(pref)
//                 );
//             });
//         }

//         // Remove duplicates from filteredMealPlans based on recipe_id
//         const uniqueRecipeIds = new Set();
//         filteredMealPlans = filteredMealPlans.filter(plan => {
//             if (!uniqueRecipeIds.has(plan.recipe_id)) {
//                 uniqueRecipeIds.add(plan.recipe_id);
//                 return true; // Keep this recipe
//             }
//             return false; // Skip duplicate recipe
//         });

//         // Step 4: Respond with the filtered meal plans or a not found message
//         if (filteredMealPlans.length === 0) {
//             console.log('No suitable meal plans found based on user preferences and allergens.');
//             return res.status(404).json({ message: 'No suitable meal plans found based on your preferences and allergens.' });
//         }

//         console.log('Meal plans suggested successfully:', filteredMealPlans);
//         res.status(200).json({ message: 'Meal plans suggested successfully!', mealPlans: filteredMealPlans });
//     } catch (error) {
//         console.error('Error in suggestMealPlan:', error);
//         res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
//     }
// };


// // Update a specific meal plan by ID
// exports.updateMealPlan = async (req, res) => {
//     const planId = req.params.id;
//     const mealPlanData = req.body;

//     try {
//         const result = await MealPlan.update(planId, mealPlanData);
        
//         if (!result) return res.status(404).json({ message: 'Meal plan not found' });

//         res.status(200).json({ message: 'Meal plan updated successfully', mealPlan: result });
//     } catch (err) {
//         console.error('Error updating meal plan:', err);
//         return res.status(500).json({ error: err.message });
//     }
// };

// // Delete a specific meal plan by ID
// exports.deleteMealPlan = async (req, res) => {
//     const planId = req.params.id;

//     try {
//        const result= await MealPlan.delete(planId); 
//        if (!result) return res.status(404).json({ message: 'Meal plan not found' });

//        res.status(200).json({ message: 'Meal plan deleted successfully', deletedMealPlan: result });
//    } catch (err) {
//        console.error('Error deleting meal plan:', err);
//        return res.status(500).json({ error: err.message });
//    }
// };
