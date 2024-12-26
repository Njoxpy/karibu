const express = require("express")

// controller
const { createOrder, getPrintingOrders, getSinglePrintingOrder, updatePrintingOrder, deletePrintingOrder, updateOrderStatus } = require("../controllers/printing.controller")

// router
const router = express.Router()

// middleware
const validateObjectId = require("../middleware/validateObjectId")
const validatePrintingOrder = require("../middleware/printing/validatePrintingOrder")

// create
router.post("/orders", validatePrintingOrder, createOrder)

// orders
router.get("/orders", getPrintingOrders)

// order
router.get("/orders/:id", validateObjectId, getSinglePrintingOrder)

// update
router.patch("/orders/:id", validateObjectId, updatePrintingOrder)

// delete
router.delete("/orders/:id", validateObjectId, deletePrintingOrder)

// update order status
router.put("orders/:id/status", updateOrderStatus)

module.exports = router