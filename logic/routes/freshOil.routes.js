const express = require("express")
const router = express.Router()

// controllers
const { createFreshOilProduct, createFreshOilOrder, getAllFreshOilProducts, getAllFreshOilOrders, getSingleFreshOilProduct, getSingleFreshOilOrder, updateFreshOilProduct, updateFreshOilOrder, deleteFreshOilProduct, deleteFreshOilOrder } = require("../controllers/freshOil.controller")

// middleware
const validateObjectId = require("../middleware/validateObjectId")

// create product
router.post("/products", createFreshOilProduct)

// create order
router.post("/orders", createFreshOilOrder)

// get all freshOil products
router.get("/products", getAllFreshOilProducts)

// get fresh oil orders
router.get("/orders", getAllFreshOilOrders)

// get product
router.get("/products/:id", validateObjectId, getSingleFreshOilProduct)

// get order
router.get("/orders/:id", validateObjectId, getSingleFreshOilOrder)

// update product
router.patch("/products/:id", validateObjectId, updateFreshOilProduct)

// update order
router.patch("/orders/:id", validateObjectId, updateFreshOilOrder)

// delete product
router.delete("/products/:id", validateObjectId, deleteFreshOilProduct)

// delete order
router.delete("/orders/:id", validateObjectId, deleteFreshOilOrder)

// handling bulk upload

// handling image upload

module.exports = router