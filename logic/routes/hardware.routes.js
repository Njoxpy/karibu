const express = require("express");
const router = express.Router();

// Controllers
const {
    createHardwareProduct,
    createHardwareOrder,
    getAllHardwareProducts,
    getAllHardwareOrders,
    getSingleHardwareProduct,
    getSingleHardwareOrder,
    updateHardwareProduct,
    updateHardwareOrder,
    deleteHardwareProduct,
    deleteHardwareOrder,
    searchHardwareProducts, // Added search controller for hardware products
    searchHardwareOrders,   // Added search controller for hardware orders
} = require("../controllers/hardware.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/upload");

// Models
const HardwareProduct = require("../models/hardware/productModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// POST: Create new hardware product
router.post("/products", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(BAD_REQUEST).json({ error: "No file uploaded" });
        }

        const newProduct = new HardwareProduct({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            image: req.file.path,
            price: req.body.price,
            userId: req.body.userId,
            total: req.body.quantity * req.body.price,
        });

        const savedProduct = await newProduct.save();
        res.status(CREATED).json(savedProduct);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Error saving product", details: error.message });
    }
});

// POST: Create a hardware order
router.post("/orders", createHardwareOrder);

// GET: Get all hardware products
router.get("/products", getAllHardwareProducts);

// GET: Search hardware products (added search functionality)
router.get("/products/search", searchHardwareProducts);

// GET: Get all hardware orders
router.get("/orders", getAllHardwareOrders);

// GET: Search hardware orders (added search functionality)
router.get("/orders/search", searchHardwareOrders);

// GET: Get single hardware product by ID
router.get("/products/:id", validateObjectId, getSingleHardwareProduct);

// GET: Get single hardware order by ID
router.get("/orders/:id", validateObjectId, getSingleHardwareOrder);

// PATCH: Update hardware product details
router.patch("/products/:id", validateObjectId, updateHardwareProduct);

// PATCH: Update hardware order details
router.patch("/orders/:id", validateObjectId, updateHardwareOrder);

// DELETE: Delete hardware product by ID
router.delete("/products/:id", validateObjectId, deleteHardwareProduct);

// DELETE: Delete hardware order by ID
router.delete("/orders/:id", validateObjectId, deleteHardwareOrder);

module.exports = router;
