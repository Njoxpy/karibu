const express = require("express")
const router = express.Router()

// controllers
const { createStationeryProduct, createStationeryOrder, getAllStationeryProducts, getAllStationeryOrders, getStationeryProduct, getStationeryOrder, updateStationeryProduct, updateStationeryOrder, deleteStationeryProduct, deleteStationeryOrder } = require("../controllers/stationery.controller")

// validate object id
const validateObjectId = require("../middleware/validateObjectId")

// create product
router.post("/products", createStationeryProduct)

// create product
router.post("/orders", createStationeryOrder)

// get products
router.get("/products", getAllStationeryProducts)

// get orders
router.get("/orders", getAllStationeryOrders)

// get product
router.get("/products/:id", validateObjectId, getStationeryProduct)

// get order
router.get("/orders/:id", validateObjectId, getStationeryOrder)

// update product
router.patch("/products/:id", validateObjectId, updateStationeryProduct)

// update order
router.patch("/orders/:id", validateObjectId, updateStationeryOrder)

// delete product
router.delete("/products/:id", validateObjectId, deleteStationeryProduct)

// delete order
router.delete("/orders/:id", validateObjectId, deleteStationeryOrder)

module.exports = router