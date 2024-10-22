const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    isGuest: { type: Boolean, default: false },
    items: [CartItemSchema],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
