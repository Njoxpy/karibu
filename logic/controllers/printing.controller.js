// models
const PrintingOrder = require("../models/printing/printingOrderModel")

// response status code
const { NOT_FOUND, CREATED, SERVER_ERROR, OK, BAD_REQUEST } = require("../constants/responseStatusCode")

// create order: POST
const createSubmission = async (req, res) => {
    // create new order handling
    const { description, price, quantity, contact, category } = req.body

    try {
        const submission = await PrintingOrder.create({ description, price, quantity, contact, category })

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

// get subimmsion by id
const getSinglePrintingSubmission = async (req, res) => {
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

// get order by id
const getSinglePrintingOrder = async (req, res) => {

    const { id } = req.params;

    try {

        const order = await PrintingOrder.findOne({ _id: id })

        if (!order) {
            return res.status(NOT_FOUND).json({ message: "Not found" })
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
            return res.status(NOT_FOUND).json({ message: "Order nto found" })
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


// Assign a designer to an order
const assignDesigner = async (req, res) => {
    try {

        /* 
        WHO YOU WILL ASSIGN ORDER TO
        */
      const { id } = req.params;
      const { assignedTo } = req.body;
  
      const order = await PrintingOrder.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }
  
      order.assignedTo = assignedTo;
      order.status = "in progress";
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// update order status
const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!["pending", "in progress", "completed"].includes(status)) {
        return res.status(BAD_REQUEST).json({ error: "Invalid status." });
      }
  
      const order = await PrintingOrder.findById(id);
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
    createSubmission,
    getPrintingOrders,
    getSinglePrintingSubmission,
    getSinglePrintingOrder,
    updatePrintingOrder,
    deletePrintingOrder,
    updateOrderStatus,
    assignDesigner
}