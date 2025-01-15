const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GodownProduct = require("./godownProductModel")

const godownOrderSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GodownProduct",
            required: [true, "Product is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"]
        },
        orderId: {
            type: String,
            required: true,
            default: () => {
                return `ORDER-GODOWN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            }
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"]
        },
        totalPrice: {
            type: Number,
            min: [1, "Total price must be at least 1"]
        }
    },
    { timestamps: true }
);

godownOrderSchema.pre('save', function (next) {

    const product = this.productId;
    const quantity = this.quantity;

    this.totalPrice = product.price * quantity;

    next();
});

godownOrderSchema.post('save', async function (doc, next) {
    try {
        const product = await GodownProduct.findById(doc.productId);
        if (product.quantity < doc.quantity) {
            throw new Error('Not enough stock available');
        }
        product.quantity -= doc.quantity;
        await product.save();
        next();
    } catch (err) {
        next(err);
    }
});

const GodownOrder = mongoose.model("GodownOrder", godownOrderSchema);

module.exports = GodownOrder;
