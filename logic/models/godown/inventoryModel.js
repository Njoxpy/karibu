const mongoose = require("mongoose");
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
      default: () => `TRX-${Date.now()}`,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Optional: Check stock availability before saving
inventoryMovementSchema.pre("save", async function (next) {
  const product = await GodownProduct.findById(this.product);
  if (this.transferQuantity > product.quantity) {
    throw new Error("Transfer quantity exceeds available stock.");
  }
  next();
});

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

module.exports = InventoryMovement;
