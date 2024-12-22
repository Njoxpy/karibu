const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const stationeryProductSchema = new Schema({
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

// Pre-save middleware to calculate the total
stationeryProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.total = this.quantity * this.price;
    }
    next();
});

// Check if the model already exists before defining it
const StationeryProduct = mongoose.models.StationeryProduct || mongoose.model('StationeryProduct', stationeryProductSchema);

module.exports = StationeryProduct;
