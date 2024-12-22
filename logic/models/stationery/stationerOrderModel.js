const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationeryOrderSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: () => `STATIONERY-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'StationeryProduct',
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
        type: Number, // No longer required
    },
}, { timestamps: true });

// Calculate the total before saving
stationeryOrderSchema.pre('save', function (next) {
    this.total = this.quantity * this.price;
    next();
});

const StationeryOrder = mongoose.model('StationeryOrder', stationeryOrderSchema);
module.exports = StationeryOrder;