const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: false, // set to true if you link orders to specific restaurants
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: { type: String, required: true },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["placed", "preparing", "on the way", "delivered", "cancelled"],
      default: "placed",
    },
    paymentMode: {
      type: String,
      enum: ["UPI", "Card", "Wallet", "COD"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentDetails: {
      transactionId: { type: String },
      gateway: { type: String }, // e.g., Razorpay, Stripe
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
