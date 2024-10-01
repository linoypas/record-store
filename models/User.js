const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const User = new mongoose.Schema({
  _id: { 
    type: mongoose.ObjectId,
    auto: true 
    },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

User.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
})
module.exports = mongoose.model("user", User);