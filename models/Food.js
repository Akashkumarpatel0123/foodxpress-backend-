const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // URL or path to the image
    },
    category: {
      type: String,
      enum: ["Pizza", "Burger", "Drinks", "Dessert", "Others"], // Modify categories as needed
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: false, // set to true if you want restaurant linkage
    },
    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);
