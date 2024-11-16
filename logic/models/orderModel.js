// Fields: description, price, status, userId, createdAt.
// Represents the design requests submitted by users.
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema(
  {
    description:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      enum: ['pending', 'in progress', 'completed'],
      required:true
    },
    orderId:{
      type: Number,
      unique: true,
    },
    // userId
    userId:{
      type: Number,
      required: true,
      ref: 'User'
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("Order", orderSchema)


// how to interact between one blog model and another blog model