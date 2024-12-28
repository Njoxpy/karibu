// models
const PrintingOrder = require("../models/printing/printingOrderModel")

// response status code
const { NOT_FOUND, CREATED, SERVER_ERROR, OK, BAD_REQUEST } = require("../constants/responseStatusCode")

// create order: POST
const createOrder = async (req, res) => {
    // create new order handling
    const { description, totalPrice, price, quantity, contact, category } = req.body

    try {
        const submission = await PrintingOrder.create({ description, price, quantity, contact, category, totalPrice })

        res.status(CREATED).json(submission)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message })
    }
}

// get orders
const getPrintingOrders = async (req, res) => {
    try {
        const orders = await PrintingOrder.find().sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No orders for now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

// get order by id
const getSinglePrintingOrder = async (req, res) => {

    const { id } = req.params;

    try {

        const order = await PrintingOrder.findOne({ _id: id })

        if (!order) {
            return res.status(NOT_FOUND).json({ message: "Order Not found" })
        }

        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }
}

// update order
const updatePrintingOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { price, quantity } = req.body

        if (price <= 0 || quantity <= 0) {
            return res.status(BAD_REQUEST).json({ message: "Price or quantity should not be zero and should be postive" })
        }

        const updates = req.body

        const order = await PrintingOrder.findById(id);

        if (!order) {
            return res.status(BAD_REQUEST).json({ message: "Order not found" })
        }

        Object.keys(updates).forEach((key) => {
            order[key] = updates[key];
        });

        await order.save();

        res.status(OK).json({ message: "Updated sucessfully", order })
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

// update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "in progress", "completed"].includes(status)) {
            return res.status(BAD_REQUEST).json({ error: "Invalid status" })
        }

        const order = await PrintingOrder.findById(id)

        if (!order) {
            return res.status(NOT_FOUND).json({ error: "Order not found." });
        }

        order.status = status;
        await order.save();

        res.status(OK).json(order);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getPrintingOrders,
    getSinglePrintingOrder,
    updatePrintingOrder,
    deletePrintingOrder,
    updateOrderStatus,
}