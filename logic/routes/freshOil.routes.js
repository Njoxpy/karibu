const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();

// Controllers
const {
    createFreshOilOrder,
    getAllFreshOilProducts,
    getAllFreshOilOrders,
    getSingleFreshOilProduct,
    getSingleFreshOilOrder,
    updateFreshOilProduct,
    updateFreshOilOrder,
    deleteFreshOilProduct,
    deleteFreshOilOrder,
    searchFreshOilProducts,
    searchFreshOilOrders,
} = require("../controllers/freshOil.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/upload");

// Models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// POST: Create new product
router.post("/products", upload.single("image"), async (req, res) => {
    try {

        // check all fields
        if (!req.body.name || !req.body.description || !req.body.quantity || !req.body.price || !req.body.userId) {
            return res.status(BAD_REQUEST).json({ message: "Fill all required fields" })
        }

        // Validate that quantity, price, and total are numbers
        if (isNaN(req.body.quantity) || isNaN(req.body.price)) {
            return res.status(BAD_REQUEST).json({ error: "Quantity and price must be valid numbers." });
        }

        // Validate that quantity, price, and total are greater than zero
        if (req.body.quantity <= 0 || req.body.price <= 0) {
            return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
        }

        if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
            return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
        }

        // Optional: validate file if an image is expected
        const image = req.file ? req.file.path : null;

        // Create a new FreshOilProduct object
        const newProduct = new FreshOilProduct({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            // image: req.file.path, 
            price: req.body.price,
            userId: req.body.userId,
            total: req.body.quantity * req.body.price,
        });

        const savedProduct = await newProduct.save();
        res.status(CREATED).json(savedProduct);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: 'Error saving product', details: error.message });
    }
});

// POST: Create a fresh oil order
router.post("/orders", createFreshOilOrder);

// GET: Get all fresh oil products
router.get("/products", getAllFreshOilProducts);

// GET: Search products (added search functionality)
router.get("/products/search", searchFreshOilProducts);

// GET: Get all orders
router.get("/orders", getAllFreshOilOrders);

// GET: Search orders (added search functionality)
router.get("/orders/search", searchFreshOilOrders);

// GET: Get single product by ID
router.get("/products/:id", validateObjectId, getSingleFreshOilProduct);

// GET: Get single order by ID
router.get("/orders/:id", validateObjectId, getSingleFreshOilOrder);

// PATCH: Update product details
router.patch("/products/:id", validateObjectId, updateFreshOilProduct);

// PATCH: Update order details
router.patch("/orders/:id", validateObjectId, updateFreshOilOrder);

// DELETE: Delete product by ID
router.delete("/products/:id", validateObjectId, deleteFreshOilProduct);

// DELETE: Delete order by ID
router.delete("/orders/:id", validateObjectId, deleteFreshOilOrder);

// Handling bulk upload and image upload

module.exports = router;
