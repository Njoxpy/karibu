const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const freshOilProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxLength: [500, "Description is too long"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Admin user is required to create a product"],
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

freshOilProductSchema.pre("save", function (next) {
  if (this.isModified("quantity") || this.isModified("price")) {
    this.total = this.quantity * this.price;
  }
  next();
});

const freshOilProduct = mongoose.model(
  "freshOilProduct",
  freshOilProductSchema
);
module.exports = freshOilProduct;
