const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalFeedingProductSchema = new Schema({
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
    nutrients: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
        required: true,
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