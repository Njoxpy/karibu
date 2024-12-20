const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
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
                return `FRESHOIL-${Date.now()}`; // FRESHOIL-123456789
            }
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
        },
        totalAmount: {
            type: Number, // Define the field
            required: false, // It's calculated, so no need to make it required
        },
    },
    { timestamps: true }
);

// Pre-save hook to calculate totalAmount
orderSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalAmount = this.quantity * this.price;
    }
    next();
});

const freshOilOrder = mongoose.model('FreshOilOrder', orderSchema);
module.exports = freshOilOrder;
