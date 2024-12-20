const mongoose = require('mongoose');
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
        default: () => {
            return `ANIMAL-FEEDING-${Date.now()}`;
        }
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'AnimalFeedingProduct',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: function () {
            return this.price * this.quantity;
        },
    },
}, { timestamps: true });

const AnimalFeedingOrder = mongoose.model('AnimalFeedingOrder', orderSchema);
module.exports = AnimalFeedingOrder