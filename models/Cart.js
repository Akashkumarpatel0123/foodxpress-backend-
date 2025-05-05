const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: Number
    }]
});
module.exports = mongoose.model('Cart', cartSchema);
