const { BAD_REQUEST } = require("../../constants/responseStatusCode");
const mongoose = require("mongoose");

const allowedCategories = [
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
];

const validatePrintingOrder = (req, res, next) => {
  const { description, price, quantity, contact, category } = req.body;

  // Check if all fields are present
  if (!description || !price || !quantity || !contact || !category) {
    return res.status(BAD_REQUEST).json({ message: "All fields are required" });
  }

  // Validate price: must be a positive number
  if (typeof price !== "number" || price <= 0) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Price should be a positive number." });
  }

  // Validate description: must not exceed 500 characters
  if (description.length > 500) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Description is too long." });
  }

  // Validate userId: must be a valid ObjectId
  const userId = req.user && req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).json({ message: "Invalid user ID." });
  }

  // Validate quantity: must be a positive number
  if (typeof quantity !== "number" || quantity <= 0) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Quantity should be a positive number." });
  }

  // Validate category: must be one of the allowed categories
  if (!allowedCategories.includes(category)) {
    return res.status(BAD_REQUEST).json({
      message: `Invalid category. Allowed categories are: ${allowedCategories.join(
        ", "
      )}.`,
    });
  }

  // If all validations pass, proceed to the next middleware
  next();
};

module.exports = validatePrintingOrder;
