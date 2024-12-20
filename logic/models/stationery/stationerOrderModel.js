const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationeryOrderSchema = new Schema(
    {
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
        },
        status: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            required: true,
            default: "pending",
        },
        orderId: {
            type: String,
            required: true,
            unique: true,
            default: () => {
                return `STATIONERY-${Date.now()}`; // Unique order ID generation
            },
        },
        userId: {
            type: Schema.Types.ObjectId, // Refers to the User model
            ref: "User",
            required: true, // Making userId required for creating an order
        },
        name: {
            type: String,
            ref: "StationeryProduct", // Correctly referencing StationeryProduct
            required: [true, "Product name is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: 1,
        },
        totalPrice: {
            type: Number,
            // Remove required flag since it's calculated automatically in the pre-save hook
        },
    },
    { timestamps: true }
);

// Middleware to calculate total price
StationeryOrderSchema.pre("save", function (next) {
    this.totalPrice = this.quantity * this.price;  // Calculate totalPrice
    next();
});

const StationeryOrder = mongoose.model("StationeryOrder", StationeryOrderSchema);
module.exports = StationeryOrder;
