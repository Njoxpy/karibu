const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationeryOrderSchema = new Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "StationeryProduct",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"]
            },
            unitPrice: {
                type: Number,
                required: true,
                min: [0, "Unit price must be greater than or equal to 0"]
            },
            totalPrice: {
                type: Number,
                required: true,
                min: [0, "Total price must be greater than or equal to 0"]
            }
        }],
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount must be greater than or equal to 0"]
        },
        orderStatus: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending"
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

const StationeryOrder = mongoose.model("StationeryOrder", stationeryOrderSchema);

module.exports = StationeryOrder;
