const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const GodownProduct = require("./godownProductModel");

const inventoryMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GodownProduct",
      required: [true, "Product ID is required"],
    },
    transferQuantity: {
      type: Number,
      required: [true, "Transfer qunatity is required"],
      min: [1, "Transfer quantity should be minimum 1"],
    },
    origin: {
      type: String,
      required: [true, "Product origin loacation is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination for the product is required'],
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
      default: `GODOWN-MOVEMENT-${uuidv4}`,
    },
  },
  { timestamps: true }
);

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

module.exports = InventoryMovement;
