const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FreshOilProduct = require("./freshOilproductModel");

const freshOilOrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    productName: {
      type: String, // Add this field
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `ORDER-FRESH-OIL-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "FreshOilProduct",
      required: [true, "Product ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    total: {
      type: Number,
      min: [1, "Total price must be at least 1"],
    },
  },
  { timestamps: true },
);

// Calculate the total before saving
freshOilOrderSchema.pre("save", function (next) {
  this.total = this.quantity * this.price;
  next();
});

// Post-save hook to update product stock
freshOilOrderSchema.post("save", async function (doc, next) {
  try {
    const product = await FreshOilProduct.findById(doc.productId);
    if (product.quantity < doc.quantity) {
      throw new Error("Not enough stock available");
    }
    product.quantity -= doc.quantity;
    await product.save();
    next();
  } catch (err) {
    next(err);
  }
});

const FreshOilOrder = mongoose.model("FreshOilOrder", freshOilOrderSchema);
module.exports = FreshOilOrder;
