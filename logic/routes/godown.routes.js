const express = require("express")
const router = express.Router()

const { createGodownProduct, createGodownOrder, getAllGodownProducts, getAllGodownOrders, getAllGodownProductById, getAllGodownOrderById, updateGodownProductById, updateGodownOrderById, deleteGodownProduct, deleteGodownOrder } = require("../controllers/godown.controller")

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
router.get("/products/:id", getAllGodownProductById)

// get order by id
router.get("/orders/:id", getAllGodownOrderById)

// update product by id
router.patch("/products/:id", updateGodownProductById)

// update order by id
router.patch("/orders/:id", updateGodownOrderById)

// delete product by id
router.delete("/products/:id", deleteGodownProduct)

// delete product by id
router.delete("/orders/:id", deleteGodownOrder)

module.exports = router