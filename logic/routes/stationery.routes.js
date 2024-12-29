const express = require("express");
const mongoose = require("mongoose");
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
        const { name, price, quantity, description, userId } = req.body;

        // Validate required fields
        if (!name || price === undefined || quantity === undefined || !description || !userId) {
            return res.status(BAD_REQUEST).json({ message: "All fields are required" });
        }

        // Validate that price and quantity are numbers
        if (isNaN(quantity) || isNaN(price)) {
            return res.status(BAD_REQUEST).json({ error: "Quantity and price must be valid numbers." });
        }

        // Validate that quantity and price are greater than or equal to zero
        if (quantity < 0 || price < 0) {
            return res.status(BAD_REQUEST).json({ error: "Quantity and price must be greater than or equal to zero." });
        }

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
        }

        const newProduct = await StationeryProduct.create({
            name,
            price,
            quantity,
            description,
            userId,
        })

        res.status(CREATED).json(newProduct);
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create product", error: error.message });
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
