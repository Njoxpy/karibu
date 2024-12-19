const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrintingProductSchema = new Schema(
    {
        description: {
            type: String,
            required: [true, "Description of the print job is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0,
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 1,
        },
        contact: {
            type: String,
            required: [true, "Contact information is required"],
        },
        category: {
            type: String,
            enum: ["business card", "flyer", "brochure", "poster"],
            required: [true, "Category is required"],
        },
    },
    { timestamps: true }
);

const PrintingProduct = mongoose.model("PrintingProduct", PrintingProductSchema);
module.exports = PrintingProduct;
