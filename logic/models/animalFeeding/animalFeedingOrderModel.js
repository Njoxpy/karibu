const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnimalFeedingProduct = require('./animalFeedingProductModel'); // Import the product model

const animalFeedingOrderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        default: () => `ANIMAL-FEEDING-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'AnimalFeedingProduct',
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

// Pre-save hook to calculate total
animalFeedingOrderSchema.pre('save', function (next) {
    this.total = this.quantity * this.price;
    next();
});

// Post-save hook to update product stock
animalFeedingOrderSchema.post('save', async function(doc, next) {
    try {
        // Find the product and update its stock
        const product = await AnimalFeedingProduct.findById(doc.product);
        if (product.quantity < doc.quantity) {
            throw new Error('Not enough stock available');
        }
        product.quantity -= doc.quantity; // Decrease product stock by the order quantity
        await product.save(); // Save updated product
        next();
    } catch (err) {
        next(err); // Propagate error if any
    }
});

const AnimalFeedingOrder = mongoose.model('AnimalFeedingOrder', animalFeedingOrderSchema);
module.exports = AnimalFeedingOrder;
