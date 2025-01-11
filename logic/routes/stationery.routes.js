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
    searchStationeryProducts,
    searchStationeryOrders,
    deleteStationeryProduct,
    deleteStationeryOrder,
    getStationeryOrder,
    getStationeryProduct,
} = require("../controllers/stationery.controller");

// Middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/stationery/uploadStationery");

// Models
const StationeryProduct = require("../models/stationery/stationeryProductModel");

// Response codes
const { BAD_REQUEST } = require("../constants/responseStatusCode");

// POST: Create a new stationery product
router.post(
    "/products", 
    authenticate,
    checkCategory(["admin"]),
    checkPermissions(["createProduct"]),
    upload.single('image'), 
    async (req, res) => {
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

            // Validate quantity and price greater than or equal to zero
            if (quantity < 0 || price < 0) {
                return res.status(BAD_REQUEST).json({ error: "Quantity and price must be greater than or equal to zero." });
            }

            // Validate userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
            }

            // Ensure image is uploaded
            if (!req.file) {
                return res.status(BAD_REQUEST).json({ message: "Image is required" });
            }

            const image = req.file.path; // Get the image path

            // Create product in the database
            const newProduct = await StationeryProduct.create({
                name,
                price,
                quantity,
                description,
                userId,
                image,
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: "Failed to create product", error: error.message });
        }
    }
);

// POST: Create a new stationery order
router.post(
    "/orders", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    checkPermissions(["createOrder"]),
    createStationeryOrder
);

// GET: Get all stationery products
router.get(
    "/products", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    getAllStationeryProducts
);

// GET: Search stationery products
router.get(
    "/products/search", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    searchStationeryProducts
);

// GET: Get all stationery orders
router.get(
    "/orders", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    getAllStationeryOrders
);

// GET: Search stationery orders
router.get(
    "/orders/search", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    searchStationeryOrders
);

// GET: Get single stationery product by ID
router.get(
    "/products/:id", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    validateObjectId, 
    getStationeryProduct
);

// GET: Get single stationery order by ID
router.get(
    "/orders/:id", 
    authenticate,
    checkCategory(["stationery", "admin"]),
    validateObjectId, 
    getStationeryOrder
);

// PATCH: Update stationery product details
router.patch(
    "/products/:id", 
    authenticate,
    checkCategory(["admin"]),
    validateObjectId,
    checkPermissions(["updateProduct"]), 
    updateStationeryProduct
);

// PATCH: Update stationery order details
router.patch(
    "/orders/:id", 
    authenticate,
    checkCategory(["admin"]),
    validateObjectId,
    checkPermissions(["updateOrder"]), 
    updateStationeryOrder
);

// DELETE: Delete stationery product by ID
router.delete(
    "/products/:id", 
    authenticate,
    checkCategory(["admin"]),
    validateObjectId,
    checkPermissions(["deleteProduct"]), 
    deleteStationeryProduct
);

// DELETE: Delete stationery order by ID
router.delete(
    "/orders/:id", 
    authenticate,
    checkCategory(["admin"]),
    validateObjectId,
    checkPermissions(["deleteOrder"]), 
    deleteStationeryOrder
);

module.exports = router;