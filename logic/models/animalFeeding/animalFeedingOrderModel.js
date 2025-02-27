const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnimalFeedingProduct = require("./animalFeedingProductModel");

const animalFeedingOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () =>
        `ORDER-ANIMAL-FEEDING-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "AnimalFeedingProduct",
      required: [true, "Product is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    total: {
      type: Number,
      min: [1, "Total price must be at least 1"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

// Pre-save hook to fetch price & calculate total
animalFeedingOrderSchema.pre("save", async function (next) {
  try {
    const product = await AnimalFeedingProduct.findById(this.productId);
    if (!product) {
      return next(new Error("Product not found"));
    }

    // Ensure the price is always fetched from the product
    this.price = product.price;
    this.total = this.quantity * this.price;

    // Check stock availability
    if (product.quantity < this.quantity) {
      return next(new Error("Not enough stock available"));
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Post-save hook to update product stock safely
animalFeedingOrderSchema.post("save", async function (doc, next) {
  try {
    const updatedProduct = await AnimalFeedingProduct.findOneAndUpdate(
      { _id: doc.productId, quantity: { $gte: doc.quantity } }, // Ensure stock is enough
      { $inc: { quantity: -doc.quantity } }, // Deduct stock
      { new: true }
    );

    if (!updatedProduct) {
      return next(new Error("Stock update failed. Not enough stock."));
    }

    next();
  } catch (error) {
    next(error);
  }
});

const AnimalFeedingOrder = mongoose.model(
  "AnimalFeedingOrder",
  animalFeedingOrderSchema
);
module.exports = AnimalFeedingOrder;
