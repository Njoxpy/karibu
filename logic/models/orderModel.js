const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: [true, "Product tital price is required"],
      min: 0
    },
    status: {
      enum: ["pending", "in progress", "completed"],
      type: String,
      required: true
    },
    orderId: {
      type: Number,
    },
    // userId
    userId: {
      type: Number,
      ref: 'User',
      required: [true, "User Id is required"]
    },
    productName: {
      type: String,
      ref: "Product",
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: 1
    },
    category: {
      type: String,
      enum: ["Animal Feeding", "Fresh Oil", "Stationery", "Godown", "Printing", "Hardware"],
      required: true
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)
module.exports = Order;

// how to interact between one blog model and another blog model