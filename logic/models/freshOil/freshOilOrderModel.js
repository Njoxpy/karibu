const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freshOilOrderSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: () => `FRESH-OIL-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'FreshOilProduct',
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
freshOilOrderSchema.pre('save', function (next) {
    this.total = this.quantity * this.price;
    next();
});

const FreshOilOrder = mongoose.model('FreshOilOrder', freshOilOrderSchema);
module.exports = FreshOilOrder;