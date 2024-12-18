const express = require("express")
const router = express.Router()

const { createGodownProduct, createGodownOrder, getAllGodownProducts, getAllGodownOrders, getAllGodownProductById, getAllGodownOrderById, updateGodownProductById, updateGodownOrderById, deleteGodownProduct, deleteGodownOrder } = require("../controllers/godown.controller")
const validateObjectId = require("../middleware/validateObjectId")

// create product
router.post("/products", createGodownProduct)

// bulk upload

// create order
router.post("/orders", createGodownOrder)

// get all products
router.get("/products", getAllGodownProducts)

// get all orders
router.get("/orders", getAllGodownOrders)

// get product by id
router.get("/products/:id", validateObjectId, getAllGodownProductById)

// get order by id
router.get("/orders/:id", validateObjectId, getAllGodownOrderById)

// update product by id
router.patch("/products/:id", validateObjectId, updateGodownProductById)

// update order by id
router.patch("/orders/:id", validateObjectId, updateGodownOrderById)

// delete product by id
router.delete("/products/:id", validateObjectId, deleteGodownProduct)

// delete product by id
router.delete("/orders/:id", validateObjectId, deleteGodownOrder)

module.exports = router