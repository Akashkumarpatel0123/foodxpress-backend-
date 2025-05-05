const Restaurant = require('../models/Restaurant');  // Import your Restaurant model

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Get all restaurants
    res.status(200).json(restaurants); // Send restaurants as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to update restaurant details
exports.updateRestaurantDetails = async (req, res) => {
  try {
    const { id } = req.params;  // Get the restaurant ID from the URL params
    const updateData = req.body;  // Get the data to update from the request body

    // Validate the update data (optional: use a validation library like Joi or express-validator)

    // Find and update the restaurant by ID
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Send a response with the updated restaurant details
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant details:', error);
    res.status(500).json({ error: 'An error occurred while updating restaurant details' });
  }
};
