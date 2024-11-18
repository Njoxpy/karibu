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
      enum: ['pending', 'in progress', 'completed']
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
      min: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)


// how to interact between one blog model and another blog model