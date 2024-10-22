// Fields: orderId, userId, price, createdAt.
// Represents receipts generated for each order.
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const receiptSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true,
      ref: 'User'
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("Receipt", receiptSchema)