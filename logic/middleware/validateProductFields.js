const validateProductFields = (req, res, next) => {
    const { name, userId } = req.body;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const image = req.file; // Image is in req.file when using multer

    // Check if required fields are provided
    if (!name || quantity == null || price == null || !userId || !image) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate price (must be a positive number)
    if (isNaN(price) || price < 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    // Validate quantity (must be a non-negative number)
    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: "Quantity must be a non-negative number" });
    }

    next();
};

module.exports = validateProductFields;