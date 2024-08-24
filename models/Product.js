const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  _id: { type: mongoose.ObjectId, auto: true },
  catagory: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preview_img: {
    type: String,
    required: true,
  },
  hover_img: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("product", Product);
