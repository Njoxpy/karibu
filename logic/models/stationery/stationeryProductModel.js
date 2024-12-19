const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: 0,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            type: String,
            required: [true, "Product image is required"],
            validate: {
                validator: function (v) {
                    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(v);
                },
                message: "Please enter a valid image URL",
            },
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("StationeryProduct", productSchema);
module.exports = Product;
