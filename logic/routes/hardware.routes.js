const express = require("express");
const router = express.Router();
const hardwareController = require("../controllers/hardware.controller");

// Create a new product
router.post("/products", hardwareController.createHardwareProduct);

// Get all products
router.get("/products", hardwareController.getAllHardwareProducts);

// Get a product by ID
router.get("/products/:id", hardwareController.getHardwareProductById);

// Update a product by ID
router.patch("/products/:id", hardwareController.updateHardwareProductById);

// Delete a product by ID
router.delete("/products/:id", hardwareController.deleteHardwareProductById);

router.post("/orders", hardwareController.createHardwareOrder);
router.get("/orders", hardwareController.getAllHardwareOrders);
router.get("/orders/:id", hardwareController.getHardwareOrderById);
router.patch("/orders/:id", hardwareController.updateHardwareOrderById);
router.delete("/orders/:id", hardwareController.deleteHardwareOrderById);

module.exports = router;
