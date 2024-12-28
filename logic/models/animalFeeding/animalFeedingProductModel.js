const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalFeedingProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, 'Quantity must be a positive number'],
    },
    nutrients: {
        type: String,
        required: [true, "Nutrients are required"]
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, 'Price must be a positive number'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Admin user is required to create a product"],
    },
}, { timestamps: true });

const AnimalFeedingProduct = mongoose.model('AnimalFeedingProduct', animalFeedingProductSchema);
module.exports = AnimalFeedingProduct;
