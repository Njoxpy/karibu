const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts, createOrder, getAllOrders, getProductById, getOrderById, updateProduct, deleteProductById, deleteOrderById } = require("../controllers/animalFeeding.controllers");

// GET: Get all products
router.get("/products", getAllProducts);

// GET: Get product by an id
router.get("/products/:id", getProductById);

// POST: Upload new product
router.post("/products/bulk-upload", (req, res) => {
  res.json({ message: "add new products, POST new product" })
})

// add new product
router.post("/products", createProduct)

// PATCH: Update product details
router.patch("/products/:id", updateProduct)

// POST: search for new order
router.post("/products/search", (req, res) => {
  res.json({ message: "search for products" })
})

// DELETE: Delete product
router.delete("/products/:id", deleteProductById)

// GET: get all orders
router.get("/orders", getAllOrders)

// GET: Get single order
router.get("/orders/:id", getOrderById)

// POST: create new order
router.post("/orders", createOrder)

// DELETE: Delete order by an id
router.delete("/orders/:id", deleteOrderById)

module.exports = router;
