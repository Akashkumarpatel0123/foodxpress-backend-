const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// Get all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get food by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Create a new food item
router.post("/", async (req, res) => {
  const { name, description, image, category, price, restaurantId, rating } = req.body;

  try {
    const newFood = new Food({ name, description, image, category, price, restaurantId, rating });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
});

// Update food by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
});

// Delete food by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
