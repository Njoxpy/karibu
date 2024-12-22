const { BAD_REQUEST } = require("../constants/responseStatusCode")

const validatePrintingSubmission = (req, res, next) => {

    const { description, price, quantity, contact, category } = req.body

    if (!description || price == null || quantity == null || !contact || !category) {
        return res.status(BAD_REQUEST).json({ message: "all required fields must be provided" })
    }
    if (typeof price !== "number" || price < 0) {
        return res.status(BAD_REQUEST).json("Price must be a positive number")
    }

    if (typeof quantity !== "number" || quantity <= 0) {
        return res.status(BAD_REQUEST).json({message:"Idadi ya order sio sahihi!"})
    }

    if (typeof quantity !== "number" || price < 0) {
        return res.status(BAD_REQUEST).json("Quantity must be a none negative number")
    }
    next();
}

module.exports = validatePrintingSubmission;