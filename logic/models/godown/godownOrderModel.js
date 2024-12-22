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
            type: String,
            required: true,
            default: () => {
                return `GODOWN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            }
        },
        status: {
            type: String,
            enum: ["pending", "completed", "canceled"],
            default: "pending"
        },
        name: {
            type: String, // Store product name directly
            required: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        totalPrice: {
            type: Number,
            min: [1, "Total price must be at least 1"]
        }
    },
    { timestamps: true }
);

orderSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.totalPrice = this.quantity * this.price;
    }
    next();
});

const GodownOrder = mongoose.model("GodownOrder", orderSchema);

module.exports = GodownOrder;
