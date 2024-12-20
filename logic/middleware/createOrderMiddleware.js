const { BAD_REQUEST, NOT_FOUND } = require("../constants/responseStatusCode");
const mongoose = require("mongoose");

const createOrderMiddleware = (req, res, next) => {
    const { createdBy, orderId, product, quantity, price } = req.body;

    // Check if required fields are present
    if (price == null || !createdBy || !product || quantity == null) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" });
    }

    // Validate createdBy (should be a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        return res.status(NOT_FOUND).json({ message: "Invalid User ID" });
    }

    // Validate price (should be a positive number)
    if (typeof price !== "number" || price < 0) {
        return res.status(BAD_REQUEST).json({ message: "Price must be a positive number" });
    }

    // Validate quantity (should be a non-negative number)
    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(BAD_REQUEST).json({ message: "Quantity must be a non-negative number" });
    }

    next();
};

module.exports = createOrderMiddleware;
