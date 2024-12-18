const PrintingSubmission = require("../models/printing/printingSubmissionModel")
const PrintingOrder = require("../models/printing/printingOrderModel")
const { NOT_FOUND, CREATED, SERVER_ERROR, OK } = require("../constants/responseStatusCode")

// create submission: POST
const createSubmission = async (req, res) => {
    // create new order handling
    const { description, price, quantity, contact, category } = req.body


    try {
        const submission = PrintingSubmission.create({ description, price, quantity, contact, category })

        res.status(CREATED).json(submission)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message })
    }
}

// get submission
const getPrintingSubmission = async (req, res) => {
    try {
        const submissions = await PrintingSubmission.find()

        if (submissions.length === 0) {
            return res.status(NOT_FOUND).json({ message: "There no submissions for now" })
        }
        res.status(OK).json(submissions)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get submission", error: error.message })
    }
}

// get orders
const getPrintingOrders = async (req, res) => {
    try {
        const orders = await PrintingSubmission.find()

        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No orders for now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

// get subimmsion by id
const getSinglePrintingSubmission = async (req, res) => {
    const { id } = req.params

    try {
        const submission = await PrintingSubmission.findOne({ _id: id })

        if (!submission) {
            return res.status(NOT_FOUND).json({ message: "Submission not found" })
        }
        res.status(OK).json(submission)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get submission", error: error.message })
    }
}

// get order by id
const getSinglePrintingOrder = async (req, res) => {
    const { id } = req.params

    try {
        const submission = await PrintingOrder.findOne({ _id: id })

        if (!submission) {
            return res.status(NOT_FOUND).json({ message: "Submission not found" })
        }
        res.status(OK).json(submission)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get submission", error: error.message })
    }
}

module.exports = {
    createSubmission,
    getPrintingSubmission,
    getPrintingOrders,
    getSinglePrintingSubmission,
    getSinglePrintingOrder
}