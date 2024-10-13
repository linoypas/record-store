const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  _id: { 
    type: mongoose.ObjectId,
    auto: true 
    },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
}],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("order", Order);