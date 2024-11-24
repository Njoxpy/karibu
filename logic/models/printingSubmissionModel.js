const mongoose = require("mongoose")
const Schema = mongoose.Schema
const printingSubmission = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        contact: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        }
    }
)

module.exports = mongoose.model("PrintingSubmission", printingSubmission)