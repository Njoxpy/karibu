const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareOrderSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => `HARDWARE-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'HardwareProduct',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be at least 0'],
  },
  total: {
    type: Number,
  },
}, { timestamps: true });

// Calculate the total before saving
hardwareOrderSchema.pre('save', function (next) {
  this.total = this.quantity * this.price;
  next();
});

const HardwareOrder = mongoose.model('HardwareOrder', hardwareOrderSchema);
module.exports = HardwareOrder;