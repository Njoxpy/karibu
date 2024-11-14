// Fields: username, password, email, createdAt.
// Represents user accounts for registration and authentication.

/**
 * mongodb by self is
 */
const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    }
  },
{timestamps: true})

module.exports = mongoose.model("User", userSchema)