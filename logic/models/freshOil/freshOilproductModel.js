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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: false,  // Calculated, so not needed in the request
    }
}, { timestamps: true });

// Pre-save hook to calculate the total
freshOilProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        // Calculate total based on quantity and price
        this.total = this.quantity * this.price;
    }
    next();
});

const FreshOilProduct = mongoose.model('FreshOilProduct', freshOilProductSchema);
module.exports = FreshOilProduct;
