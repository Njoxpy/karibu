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
            required: [true, "Product quantity is required"]
        }, price: {
            type: Number,
            required: [true, "Product price is required"]
        },
        userId: {
            type: Number,
            required: [true, "User Id is required"],
            ref: 'User'
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Products", productSchema)