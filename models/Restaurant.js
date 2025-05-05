const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  caption: String,
  imageUrl: String,
  menuItems: [
    {
      name: String,
      price: String,
      imageUrl: String,
    }
  ]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
