const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrintingOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      default: () =>
        `ORDER-PRINTING-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
    description: {
      type: String,
      required: [true, "Order description is required"],
      maxLength: [500, "Description is too long"],
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      required: [true, "Status is required: pending, in progress, completed, "],
      default: "pending",
    },
    category: {
      type: String,
      enum: [
        "business card",
        "flyer",
        "brochure",
        "poster",
        "books",
        "magazine",
        "clothing",
        "cards",
        "banners",
        "cups",
        "bags",
      ],
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
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity cannot be below 1"],
    },
    contact: {
      type: String,
      required: [true, "Contact information is required"],
    },
    totalPrice: {
      type: Number,
      min: [1, "Total price must be at least 1"],
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
