const { BAD_REQUEST } = require("../../constants/responseStatusCode")

const validatePrintingOrder = (req, res, next) => {

    const { description, price, quantity, contact, category } = req.body

    // check if the fileds are filled

    // include userId
    if (!description || !price || !quantity || !contact || !category) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" })
    }

    // check numbers if a valid: price
    if (typeof price !== "number" || price == null || price <= 0) {
        return res.status(BAD_REQUEST).json({ message: "Price should be a positive number and postive" })
    }


    // quantity
    if (typeof quantity !== "number" || price == null || price <= 0) {
        return res.status(BAD_REQUEST).json({ message: "Price should be a positive number and postive" })
    }

    // next
    next()
}

module.exports = validatePrintingOrder