const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema with validation
const stationeryProductSchema = new Schema({
    description: {
        type: String,
        trim: true, 
        maxLength: [500, "Description is too long"]
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true, 
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be greater than 0'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], 
    },
    totalPrice: {
        type: Number,
        min: [1, "Total price must be at least 1"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User ID is required'],
    },
}, { timestamps: true });

stationeryProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
    }
    next();
});


const StationeryProduct = mongoose.model('StationeryProduct', stationeryProductSchema);
module.exports = StationeryProduct;
