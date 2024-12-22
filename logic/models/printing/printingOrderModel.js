const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrintingOrderSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: () => {
                return `PRINTING-${Date.now()}`; 
            }
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User", 
          },
        description:{
            type: Number,
            required: [true, "Order description is required"]
        },
        status: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            required: true,
            default: "pending",
        },
        category: {
            type: String,
            enum: ["business card", "flyer", "brochure", "poster"],
            required: [true, "Category is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
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
        totalPrice: {
            type: Number,
        },
    },
    { timestamps: true }
);

PrintingOrderSchema.pre("save", function (next) {
    this.totalPrice = this.quantity * this.price;
    next();
});

const PrintingOrder = mongoose.model("PrintingOrder", PrintingOrderSchema);
module.exports = PrintingOrder;
