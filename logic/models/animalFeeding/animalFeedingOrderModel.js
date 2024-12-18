const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalFeedingOrderSchema = new Schema(
    {
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"]
        },
        totalPrice: {
            type: Number,
            required: true
        }
        ,
        orderType: {
            type: String,
            enum: ["purchase", "sale"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "canceled"],
            default: "pending"
        },
        totalAmount: {
            type: Number,
            required: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderDate: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const AnimalFeedingOrder = mongoose.model("AnimalFeedingOrder", animalFeedingOrderSchema);

module.exports = AnimalFeedingOrder;
