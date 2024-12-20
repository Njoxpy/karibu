const PrintingSubmission = require("../models/printing/printingSubmissionModel")
const PrintingOrder = require("../models/printing/printingOrderModel")
const { NOT_FOUND, CREATED, SERVER_ERROR, OK } = require("../constants/responseStatusCode")

// create submission: POST
const createSubmission = async (req, res) => {
    // create new order handling
    const { description, price, quantity, contact, category } = req.body

    try {
        const submission = await PrintingSubmission.create({ description, price, quantity, contact, category })

        res.status(CREATED).json(submission)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message })
    }
}

// get orders
const getPrintingOrders = async (req, res) => {
    try {
        const orders = await PrintingSubmission.find().sort({ createdAt: -1 })

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

    const { id } = req.params;

    try {

        const order = await PrintingOrder.findOne({ _id: id })

        if (!order) {
            return res.status(404).json({ message: "Not found" })
        }

        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }
}

// update order
const updatePrintingOrder = async (req, res) => {
    const { id } = req.params

    try {
        const updatedOrder = await PrintingOrder.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order nto found" })
        }

        res.status(OK).json({ message: "Updated sucessfully", updatedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update order", error: error.message })
    }
}

// delete order
const deletePrintingOrder = async (req, res) => {
    const { id } = req.params

    try {
        const deletedOrder = await PrintingOrder.findOneAndDelete({ _id: id })

        if (!deletedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json({ message: "Order deleted sucessfully", deletedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete order", error: error.message })
    }
}

module.exports = {
    createSubmission,
    getPrintingOrders,
    getSinglePrintingSubmission,
    getSinglePrintingOrder,
    updatePrintingOrder,
    deletePrintingOrder
}