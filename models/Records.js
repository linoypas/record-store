const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  _id: { type: mongoose.ObjectId, auto: true },
  genre: {
    type: String,
    enum: ['Pop', 'Rock', 'Hip Hop', 'ישראליים'],
    required: true,
  },
  year: {
    type: Number,
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
  trackList: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("product", Product);
