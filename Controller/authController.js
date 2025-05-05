// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },  // Include role in the payload
    'your_secret_key', 
    { expiresIn: '1h' }
  );

  res.json({ token });
};

// User Registration
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// Google Login (optional, based on Google authentication strategy)
const googleLogin = async (req, res) => {
  // Handle Google login (token verification and user creation or lookup)
  res.json({ message: 'Google login functionality' });
};

module.exports = { loginUser, registerUser, googleLogin };
