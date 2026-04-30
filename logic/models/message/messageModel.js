const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [16, "Name length should not exceed 16 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
});

const message = mongoose.model("message", messageSchema);
module.exports = message;
