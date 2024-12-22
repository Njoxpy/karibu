const mongoose = require('mongoose');

const inventoryMovementSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Assuming you have a Product model
    required: true
  },
  transferQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  transferDate: {
    type: Date,
    default: Date.now
  },
  // Optional fields if you want to track user or reason for transfer
  transferredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model to track who performed the transfer
    required: true
  },
  reason: {
    type: String,
    trim: true
  }
});

const InventoryMovement = mongoose.model('InventoryMovement', inventoryMovementSchema);

module.exports = InventoryMovement;
