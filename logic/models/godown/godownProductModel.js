const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const godownProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"]
        },
        code: {
            type: String,
            default: function () {
                const timestamp = Date.now().toString();
                const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                const code = `GODOWN-${timestamp}-${randomPart}`;
                return code;
            }
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Must be atleat 1"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Must be atleat 1"]
        },
        location: {
            type: String,
            required: [true, "Location is required"]
        },
        description: {
            type: String,
            required: true,
            maxLength: [500, "Description is too long"]
        },
        condition: {
            type: String,
            enum: ["new", "low stock", "out of stock"],
            default: "new"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Admin user is required to create a product"]
        },
        totalPrice: {
            type: Number,
        },
    },
    { timestamps: true }
)

godownProductSchema.pre("save", function (next) {
    this.totalPrice = this.quantity * this.price;

    next();
});

const GodownProduct = mongoose.model("GodownProduct", godownProductSchema)
module.exports = GodownProduct 