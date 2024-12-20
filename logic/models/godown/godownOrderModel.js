const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GodownProduct",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"]
        },
        price: {
            type: Number,
            required: true,
            min: [1, "Price must be at least 1"]
        },
        orderId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: () => {
                return `GODOWN-${Date.now()}`; // FRESHOIL-123456789
            }
        },
        status: {
            type: String,
            enum: ["pending", "completed", "canceled"],
            default: "pending"
        },
        name: {
            type: String,
            ref: "GodownProduct"
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

orderSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
        this.totalAmount = this.totalPrice;
    }
    next();
});

const GodownOrder = mongoose.model("GodownOrder", orderSchema);

module.exports = GodownOrder;
