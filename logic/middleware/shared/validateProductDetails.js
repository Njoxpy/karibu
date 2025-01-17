const mongoose = require("mongoose");

const validateProductDetails = (req, res, next) => {
  const { productId, quantity, userId } = req.body;

  // Check if all required fields are present
  if (!productId || !quantity || !userId) {
    return res.status(400).json({
      message: "productId, quantity, and userId are required.",
    });
  }

  // Validate productId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      message: "Invalid productId. Must be a valid ObjectId.",
    });
  }

  // Validate quantity
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be a positive number.",
    });
  }

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid userId. Must be a valid ObjectId.",
    });
  }

  // If all validations pass, move to the next middleware or route handler
  next();
};

module.exports = validateProductDetails;
