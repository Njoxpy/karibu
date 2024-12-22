const mongoose = require("mongoose");

// Helper function to validate MongoDB ObjectId format
const validateObjectIdFormat = (id, fieldName) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return `${fieldName} must be a valid ObjectId`;
    }
    return null;
};

// Helper function to validate positive numbers
const validatePositiveNumber = (number, fieldName, min = 1) => {
    if (isNaN(number) || number < min) {
        return `${fieldName} must be at least ${min}`;
    }
    return null;
};

// Helper function to validate non-negative numbers
const validateNonNegativeNumber = (number, fieldName) => {
    if (isNaN(number) || number < 0) {
        return `${fieldName} must be a non-negative number`;
    }
    return null;
};

// Middleware for validating animal feeding order data
const validateAnimalFeedingOrder = (req, res, next) => {
    const { createdBy, product, name, quantity, price, orderId } = req.body;

    // Validate createdBy (User ObjectId)
    const createdByError = validateObjectIdFormat(createdBy, "CreatedBy");
    if (createdByError) return res.status(400).json({ success: false, message: createdByError });

    // Validate product (AnimalFeedingProduct ObjectId)
    const productError = validateObjectIdFormat(product, "Product");
    if (productError) return res.status(400).json({ success: false, message: productError });

    // Validate name
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Name cannot be empty" });
    }

    // Validate quantity
    const quantityNumber = Number(quantity);
    const quantityError = validatePositiveNumber(quantityNumber, "Quantity");
    if (quantityError) return res.status(400).json({ success: false, message: quantityError });

    // Validate price
    const priceNumber = Number(price);
    const priceError = validateNonNegativeNumber(priceNumber, "Price");
    if (priceError) return res.status(400).json({ success: false, message: priceError });

    // Validate orderId if provided (for updates)
    if (orderId && !orderId.startsWith('ANIMAL-FEEDING-')) {
        return res.status(400).json({ success: false, message: "Invalid order ID format" });
    }

    // Attach sanitized values to req.body
    req.body.quantity = quantityNumber;
    req.body.price = priceNumber;

    next();
};

// Middleware for validating ObjectId in URL params
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    const error = validateObjectIdFormat(id, "ID");
    if (error) return res.status(400).json({ success: false, message: error });

    next();
};

// Middleware for validating query parameters
const validateQueryParams = (req, res, next) => {
    const { price, quantity, createdBy, product } = req.query;

    // Validate price
    if (price !== undefined) {
        const priceNumber = Number(price);
        const priceError = validateNonNegativeNumber(priceNumber, "Query price");
        if (priceError) return res.status(400).json({ success: false, message: priceError });
    }

    // Validate quantity
    if (quantity !== undefined) {
        const quantityNumber = Number(quantity);
        const quantityError = validatePositiveNumber(quantityNumber, "Query quantity");
        if (quantityError) return res.status(400).json({ success: false, message: quantityError });
    }

    // Validate createdBy (User ObjectId)
    if (createdBy) {
        const createdByError = validateObjectIdFormat(createdBy, "CreatedBy");
        if (createdByError) return res.status(400).json({ success: false, message: createdByError });
    }

    // Validate product (AnimalFeedingProduct ObjectId)
    if (product) {
        const productError = validateObjectIdFormat(product, "Product");
        if (productError) return res.status(400).json({ success: false, message: productError });
    }

    next();
};

module.exports = {
    validateAnimalFeedingOrder,
    validateObjectId,
    validateQueryParams
};
