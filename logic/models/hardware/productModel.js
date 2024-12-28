const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be at least 0"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity must be at least 0"]
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxLength: [500, "Description is too long"]
        },
        totalPrice: {
            type: Number,
            min: [0, "Total price must be at least 0"]
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Admin user is required to create a product"]
        },
    },
    { timestamps: true }
);

hardwareProductSchema.pre("save", function (next) {
    this.totalPrice = this.quantity * this.price;
    next();
});

const HardwareProduct = mongoose.model("HardwareProduct", hardwareProductSchema);
module.exports = HardwareProduct;
