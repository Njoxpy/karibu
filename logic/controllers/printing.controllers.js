const PrintingSubmission = require("../models/printingSubmissionModel")
const mongoose = require("mongoose")

// create submission: POST
const createSubmission = async (req, res) => {
    // create new order handling
    const { description, price, quantity, contact, category } = req.body


    try {
        const submission = PrintingSubmission.create({ description, price, quantity, contact, category })
        res.status(200).json("submission added sucessfully")
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", details: error })
    }
}


module.exports = {
    createSubmission
}