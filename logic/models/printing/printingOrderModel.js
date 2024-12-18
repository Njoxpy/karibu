const mongoose = require("mongoose")

const printingOrderSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            maxLength: [500, "description should be short"]
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
            enum: ["books", "posters", "banners", "magazine", "bags", "cups", "banners"],
            required: true
        }
    }
)

const PrintingOrder = mongoose.model("PrintingOrder", printingOrderSchema)
module.exports = PrintingOrder