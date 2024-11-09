const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  _id: { 
    type: mongoose.ObjectId,
    auto: true 
    },
  items: [{
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("order", Order);