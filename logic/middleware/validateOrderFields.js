const validateOrderFields = () => {
    const { totalPrice, orderId, userId, productName, quantity, status, category } = req.body

    if (totalPrice == null || !userId || !productName || quantity == null) {
        return res.status(400).json({ message: "all fields are required" })
    }

    // validate price
    if (typeof totalPrice !== "number" || totalPrice < 0) {
        return res.status(400).json("Price must be a positive number")
    }

    // validate quantity
    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json("Quantity must be a none negative number")
    }
}

module.exports = validateOrderFields;