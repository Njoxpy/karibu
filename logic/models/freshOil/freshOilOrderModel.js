const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'FreshOilProduct',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

orderSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
        this.totalAmount = this.totalPrice;
    }
    next();
});

const freshOilOrder = mongoose.model('FreshOilOrder', orderSchema);
module.exports = freshOilOrder
