const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Stationery Product Schema
const stationeryProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        sku: {
            type: String,
            unique: true, // Ensures SKU is unique
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price must be greater than or equal to 0"]
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "Quantity must be at least 0"]
        },
        description: {
            type: String,
            maxLength: [500, "Description cannot exceed 500 characters"]
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        imageUrl: {
            type: String,
            default: "default-product-image.jpg"
        },
        tags: [{
            type: String
        }]
    },
    { timestamps: true }
);

const StationeryProduct = mongoose.model("StationeryProduct", stationeryProductSchema);

module.exports = StationeryProduct;
