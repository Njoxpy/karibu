const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
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
            type: Schema.Types.ObjectId,
            required: [true, "User Id is required"],
            ref: "User",
        },
        image: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("AnimalFeedingProduct", productSchema);
module.exports = Product;
