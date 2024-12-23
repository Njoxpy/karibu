const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalFeedingProductSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'],
    },
    nutrients: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    total: {
        type: Number,
        required: true,
        min: [0, 'Total must be a positive number'],
    },
}, { timestamps: true });

animalFeedingProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.total = this.quantity * this.price;
    }
    next();
});

const AnimalFeedingProduct = mongoose.model('AnimalFeedingProduct', animalFeedingProductSchema);
module.exports = AnimalFeedingProduct;