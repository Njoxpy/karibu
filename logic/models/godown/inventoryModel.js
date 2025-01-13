const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const GodownProduct = require("./godownProductModel");

const inventoryMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GodownProduct",
      required: true,
    },
    transferQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    transferDate: {
      type: Date,
      default: Date.now,
    },
    transferredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: String,
      unique: true,
      default: uuidv4,
    },
  },
  { timestamps: true }
);

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

module.exports = InventoryMovement;
