const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freshOilProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        maxLength: [500, "Description is too long"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Quantity must be a positive number"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price must be a positive number"]
    },
    image: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Admin user is required to create a product"]
    },
    total: {
        type: Number,
    },
}, { timestamps: true });

// Pre-save hook to calculate the total price before saving
freshOilProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.total = this.quantity * this.price;
    }
    next();
});

const FreshOilProduct = mongoose.model('FreshOilProduct', freshOilProductSchema);
module.exports = FreshOilProduct;
