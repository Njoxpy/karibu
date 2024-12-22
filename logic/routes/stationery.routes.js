const express = require("express");
const router = express.Router();

// Controllers
const {
    createStationeryOrder,
    getAllStationeryProducts,
    getAllStationeryOrders,
    updateStationeryProduct,
    updateStationeryOrder,
    searchStationeryProducts,  // Added search functionality for products
    searchStationeryOrders,
    deleteStationeryProduct,
    deleteStationeryOrder,
    getStationeryOrder,
    getStationeryProduct,    // Added search functionality for orders
} = require("../controllers/stationery.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");

// Models
const StationeryProduct = require("../models/stationery/stationeryProductModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// POST: Create a new stationery product
router.post("/products", async (req, res) => {
    try {
        const { name, description, quantity, price, userId } = req.body;

        const newProduct = new StationeryProduct({
            name,
            description,
            quantity,
            price,
            userId,
            total: quantity * price,
        });

        const savedProduct = await newProduct.save();
        res.status(CREATED).json(savedProduct);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Error saving product", details: error.message });
    }
});

// POST: Create a new stationery order
router.post("/orders", createStationeryOrder);

// GET: Get all stationery products
router.get("/products", getAllStationeryProducts);

// GET: Search stationery products (added search functionality)
router.get("/products/search", searchStationeryProducts);

// GET: Get all stationery orders
router.get("/orders", getAllStationeryOrders);

// GET: Search stationery orders (added search functionality)
router.get("/orders/search", searchStationeryOrders);

// GET: Get single stationery product by ID
router.get("/products/:id", validateObjectId, getStationeryProduct);

// GET: Get single stationery order by ID
router.get("/orders/:id", validateObjectId, getStationeryOrder);

// PATCH: Update stationery product details
router.patch("/products/:id", validateObjectId, updateStationeryProduct);

// PATCH: Update stationery order details
router.patch("/orders/:id", validateObjectId, updateStationeryOrder);

// DELETE: Delete stationery product by ID
router.delete("/products/:id", validateObjectId, deleteStationeryProduct);

// DELETE: Delete stationery order by ID
router.delete("/orders/:id", validateObjectId, deleteStationeryOrder);

module.exports = router;
