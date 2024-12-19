const mongoose = require("mongoose");

const validateProductFields = (req, res, next) => {
    const { name, userId } = req.body;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const image = req.file;

    if (!name || quantity == null || price == null || !userId || !image) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    if (isNaN(price) || price < 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: "Quantity must be a non-negative number" });
    }

    if (!image || !image.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: "A valid image must be uploaded" });
    }

    next();
};

module.exports = validateProductFields;
