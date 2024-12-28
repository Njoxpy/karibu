// mongoose
const mongoose = require("mongoose")

// response code
const { BAD_REQUEST } = require("../../constants/responseStatusCode")

const validateProductCreateShared = (req, res, next) => {
    const { name, description, quantity, price, userId } = req.params

    if (!name || !description || !quantity || !price || !userId) {
        return res.status(BAD_REQUEST).json({ error: "All fields are required." });
    }

    if (isNaN(quantity) || isNaN(price)) {
        return res.status(BAD_REQUEST).json({ error: "Quantity and price must be valid numbers." });
    }

    if (quantity <= 0 || price <= 0) {
        return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    next();
}

module.exports = validateProductCreateShared