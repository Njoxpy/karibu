const mongoose = require("mongoose");

const validateOrderParams = (req, res, next) => {
    const { price, status, orderId, userId, productName, quantity } = req.params;

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    const validStatuses = ["pending", "shipped", "delivered", "canceled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Status must be one of 'pending', 'shipped', 'delivered', or 'canceled'" });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid Order ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    if (!productName || productName.trim().length === 0) {
        return res.status(400).json({ message: "Product name cannot be empty" });
    }

    const quantityNumber = Number(quantity);
    if (isNaN(quantityNumber) || quantityNumber < 0) {
        return res.status(400).json({ message: "Quantity must be a non-negative number" });
    }

    next();
};

module.exports = validateOrderParams;
