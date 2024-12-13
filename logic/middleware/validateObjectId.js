const mongoose = require("mongoose")
const { NOT_FOUND } = require("../constants/responseStatusCode")

const validateObjectId = (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(NOT_FOUND).json({ message: "Not found" })
    }
    next()
}

module.exports = validateObjectId