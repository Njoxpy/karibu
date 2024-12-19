const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freshOilProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

freshOilProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
        this.totalAmount = this.totalPrice;
    }
    next();
});

const FreshOilProduct = mongoose.model('FreshOilProduct', freshOilProductSchema);
module.exports = FreshOilProduct
