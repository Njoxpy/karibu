const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HardwareProduct = require("./productModel");

const hardwareOrderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HardwareProduct",
      required: [true, "Product is required"],
    },
    productName: {
      type: String, // Add this field
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      min: [1, "Total price must be at least 1"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `ORDER-HARDWARE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
  },
  { timestamps: true }
);

hardwareOrderSchema.pre("save", function (next) {
  HardwareProduct.findById(this.productId)
    .then((product) => {
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.quantity < this.quantity) {
        throw new Error("Insufficient stock available");
      }
      this.totalPrice = product.price * this.quantity;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

hardwareOrderSchema.post("save", async function (doc, next) {
  try {
    const product = await HardwareProduct.findById(doc.productId);
    if (product.quantity < doc.quantity) {
      throw new Error("Not enough stock available");
    }
    product.quantity -= doc.quantity;

    // If product stock runs out, change condition
    if (product.quantity === 0) {
      product.condition = "out of stock";
    } else if (product.quantity < 10) {
      product.condition = "low stock";
    } else {
      product.condition = "new";
    }

    await product.save();
    next();
  } catch (err) {
    next(err);
  }
});

const HardwareOrder = mongoose.model("HardwareOrder", hardwareOrderSchema);
module.exports = HardwareOrder;
