// routes/payment.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { items, total, method } = req.body;

  console.log("Payment Received:", { items, total, method });

  // You can add payment gateway logic here (e.g. Razorpay, Stripe, etc.)

  if (!items || !total || !method) {
    return res.status(400).json({ message: "Invalid payment details" });
  }

  // Fake success for now
  res.status(200).json({ message: "Payment processed successfully" });
});

module.exports = router;
