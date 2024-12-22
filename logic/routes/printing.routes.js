const express = require("express")

// controller
const { createSubmission, getPrintingSubmission, getPrintingOrders, getSinglePrintingSubmission, getSinglePrintingOrder, updatePrintingOrder, deletePrintingOrder, updateOrderStatus, assignDesigner } = require("../controllers/printing.controller")

const validatePrintingSubmission = require("../middleware/validatePrintingSubmission")

const router = express.Router()

// middleware
const validateObjectId = require("../middleware/validateObjectId")

// create
router.post("/orders", createSubmission)

// orders
router.get("/orders", getPrintingOrders)

// order
router.get("/orders/:id", getSinglePrintingOrder)

// update
router.patch("/orders/:id", validateObjectId, updatePrintingOrder)

// delete
router.delete("/orders/:id", validateObjectId, deletePrintingOrder)

// assign designer
router.put("orders/:id/assign-designer", assignDesigner)

// update order status
router.put("orders/:id/status", updateOrderStatus)

module.exports = router