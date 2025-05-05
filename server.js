// Import required modules
require('dotenv').config();  // Load environment variables from .env file
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const cartRoutes = require('./routes/cart');
const foodRoutes = require("./routes/food");
const orderRoutes = require("./routes/order");
// Log the MongoDB URI to verify the environment variable is loaded
console.log('MongoDB URI:', process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files like images (upload directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));  // Authentication routes
app.use('/api/users', require('./routes/users'));  // User routes
app.use('/api/restaurant', require('./routes/restaurantRoutes'));  // Restaurant routes
app.use('/api/cart', cartRoutes);  // Cart routes
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;  // Set port from environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
