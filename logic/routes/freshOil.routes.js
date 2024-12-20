const express = require("express")
const router = express.Router()

// controllers
const { createFreshOilProduct, createFreshOilOrder, getAllFreshOilProducts, getAllFreshOilOrders, getSingleFreshOilProduct, getSingleFreshOilOrder, updateFreshOilProduct, updateFreshOilOrder, deleteFreshOilProduct, deleteFreshOilOrder } = require("../controllers/freshOil.controller")

// middleware
const validateObjectId = require("../middleware/validateObjectId")
const upload = require("../middleware/upload")

// models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel")


// create product
// POST route for creating a new product
router.post("/products", upload.single("image"), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new product object (assuming `FreshOilProduct` model is available)
        const newProduct = new FreshOilProduct({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            image: req.file.path,  // Store the file path in the database
            price: req.body.price,
            userId: req.body.userId,
            total: req.body.quantity * req.body.price,
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);  // Return the saved product as a response
    } catch (error) {
        res.status(500).json({ error: 'Error saving product', error: error.message });
    }
});
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