const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Create a new order
router.post("/", async (req, res) => {
  const { userId, items, deliveryAddress, paymentMode, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      deliveryAddress,
      paymentMode,
      totalAmount,
      paymentStatus: "pending",
    });

    await newOrder.save();

    // Update user's order history
    const user = await User.findById(userId);
    user.orders.push(newOrder._id);
    await user.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
});

// Get all orders of a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get order by ID
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId").populate("items.foodId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Update order status (Admin/Restaurant use)
router.put("/:id", async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
});

module.exports = router;
