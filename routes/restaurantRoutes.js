const express = require('express');
const router = express.Router();
const multer = require('multer');
const Restaurant = require('../models/Restaurant'); // Assuming you have a restaurant model
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file uniquely
  },
});

// File filter to allow only image types (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
  }
};

// Define multer limits (optional)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route to update restaurant details
router.put('/restaurant/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, caption } = req.body;
    let imagePath = null;

    // If image file is provided, get the file path
    if (req.file) {
      imagePath = req.file.path; // The file path for the uploaded image
    }

    // Update the restaurant details in the database
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, caption, image: imagePath }, // Update the name, caption, and image
      { new: true } // Return the updated restaurant
    );

    if (updatedRestaurant) {
      res.status(200).json(updatedRestaurant); // Send the updated restaurant details back
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error updating restaurant:', error);
    if (error.message.includes('Invalid file type')) {
      res.status(400).json({ message: error.message }); // Handle invalid file type error
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

module.exports = router;
