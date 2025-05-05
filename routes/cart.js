// backend/routes/cart.js
const express = require('express');
const router = express.Router();

// Mock cart data (replace with real DB calls later)
let cartItems = [];

// GET /api/cart - fetch all cart items
router.get('/', (req, res) => {  // <-- Change to '/'
  res.json({ cart: cartItems });
});

// POST /api/cart - add an item to cart
router.post('/', (req, res) => {  // <-- Change to '/'
  const newItem = req.body;
  if (!newItem || !newItem.id) {
    return res.status(400).json({ error: 'Invalid item data' });
  }
  cartItems.push(newItem);
  res.json({ message: 'Item added', cart: cartItems });
});

// DELETE /api/cart/:id - remove an item from cart
router.delete('/:id', (req, res) => {
  const itemId = req.params.id;
  cartItems = cartItems.filter(item => item.id !== itemId);
  res.json({ message: 'Item removed', cart: cartItems });
});

// Clear cart (optional)
router.delete('/', (req, res) => {
  cartItems = [];
  res.json({ message: 'Cart cleared', cart: [] });
});

module.exports = router;
