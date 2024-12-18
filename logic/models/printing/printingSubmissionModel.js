const mongoose = require("mongoose")
const Schema = mongoose.Schema

const printingSubmissionSchema = new Schema(
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
            enum: ["Books", "Cups", "Posters", "Flyers"]
        }
        // status
    }
)

printingSubmissionSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
        this.totalAmount = this.totalPrice;
    }
    next();
});


module.exports = mongoose.model("PrintingSubmission", printingSubmissionSchema)