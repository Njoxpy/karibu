const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StationeryProduct = require('./stationeryProductModel'); 

const stationeyOrderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        default: () => `STATIONERY-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'StationeryProduct',
        required: [true, "Product is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, 'Quantity must be at least 1'],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, 'Price cannot be negative'],
    },
    total: {
        type: Number,
        min: [1, "Total price must be at least 1"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    }
}, { timestamps: true });

// Pre-save hook to calculate total
stationeyOrderSchema.pre('save', function (next) {
    if (!this.price) {
        StationeryProduct.findById(this.productId, (err, product) => {
            if (err || !product) {
                return next(new Error('Product not found'));
            }
            this.price = product.price; // Assign the product price to the order
            this.total = this.quantity * this.price;
            next();
        });
    } else {
        this.total = this.quantity * this.price;
        next();
    }
});

// Post-save hook to update product stock
stationeyOrderSchema.post('save', async function (doc, next) {
    try {
        const product = await StationeryProduct.findById(doc.productId);
        if (product.quantity < doc.quantity) {
            throw new Error('Not enough stock available');
        }
        product.quantity -= doc.quantity;
        await product.save();
        next();
    } catch (err) {
        next(err);
    }
});

const StationeryOrder = mongoose.model('StationeryOrder', stationeyOrderSchema);
module.exports = StationeryOrder;
