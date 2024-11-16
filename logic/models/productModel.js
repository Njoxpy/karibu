const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },price: {
            type: Number,
            required: true
        },
        userId:{
            type: Number,
            required: true,
            ref: 'User'
          }

    },
    {timestamps: true}
)

module.exports = mongoose.model("Products", productSchema)