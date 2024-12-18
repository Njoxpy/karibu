const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema(
  {
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0
    },
    status: {
      enum: ["pending", "in progress", "completed"],
      type: String,
      required: true,
      default: "pending"
    },
    orderId: {
      type: Number,
    },
    userId: {
      type: Number,
      ref: 'User',
      required: [true, "User Id is required"]
    },
    productName: {
      type: String,
      ref: "HardwareProduct",
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: 1
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("NewOrder", orderSchema)
module.exports = Order;