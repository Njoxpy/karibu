const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrintingOrderSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: () => {
                return `PRINTING-${Date.now()}`; // FRESHOIL-123456789
            }
        },
        status: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            required: true,
            default: "pending",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "PrintingProduct",
            required: [true, "Product ID is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 1,
        },
        totalPrice: {
            type: Number,
        },
    },
    { timestamps: true }
);

PrintingOrderSchema.pre("save", function (next) {
    this.totalPrice = this.quantity * this.productId.price; // assuming price is on PrintingProduct
    next();
});

const PrintingOrder = mongoose.model("PrintingOrder", PrintingOrderSchema);
module.exports = PrintingOrder;
