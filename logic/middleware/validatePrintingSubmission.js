const validatePrintingSubmission = (req, res, next) => {
    const { description, price, quantity, contact, category } = req.body
    if (!description || price == null || quantity == null || !contact || !category) {
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

module.exports = validatePrintingSubmission;