const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const godownProductSchema = new Schema(
    {
        godownId: {
            type: mongoose.Types.ObjectId,
            ref: "Godown"
        },
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            unique: true
        },
        price: {
            type: Number,
            required: true,
            min: [1, "Must be atleat 1"]
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "Must be atleat 1"]
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxLength: [500, "Description is too long"]
        },
        condition:{
            type: String,
            enum: ["new", "low stock", "out of stock"],
            default: "new"
        }
    },
    { timestamps: true }
)

const GodownProduct = mongoose.model("GodownProduct", godownProductSchema)
module.exports = GodownProduct 