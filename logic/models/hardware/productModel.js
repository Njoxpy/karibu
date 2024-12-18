const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
            min: 0
        }, price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0
        },
        userId: {
            type: Number,
            required: [true, "User Id is required"],
            ref: 'User'
        },
        image: {
            type: String,
            required: true
        }

    },
    { timestamps: true }
)

const Product = mongoose.model("HardwareProduct", productSchema)
module.exports = Product