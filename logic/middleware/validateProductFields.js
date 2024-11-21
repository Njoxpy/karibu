const validateProductFields = (req, res, next) => {
    const { price, quantity, name, userId } = req.body

    if (!name || quantity == null || price == null || !userId) {
        return res.status(400).json({ message: "all required fields must be provided" })
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json("Price must be a positive number")
    }

    if (typeof quantity !== "number" || price < 0) {
        return res.status(400).json("Quantity must be a none negative number")
    }
    next();
}

module.exports = validateProductFields;