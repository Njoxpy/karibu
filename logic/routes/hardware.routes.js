const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const hardwareController = require("../controllers/hardware.controller");

// Import middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadAnimalFeeding");
const HardwareProduct = require("../models/hardware/productModel");
const { getRevenue } = require("../controllers/godown.controller");
const { generateHardwarePDF } = require("../services/hardware/pdfService");
const { getHardwareOrders } = require("../services/hardware/hardwareService");

// file uploa
// Product Routes
router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]), // Admin only
  checkPermissions(["createProduct"]),
  upload.single("image"), // Upload a single image file
  async (req, res) => {
    try {
      // Extract product details from the request body
      const { name, description, quantity, price } = req.body;

      // Get the userId from the authenticated user (set by `authenticate` middleware)
      const userId = req.user && req.user._id; // Assuming `req.user` is populated by `authenticate`

      // Check if the required fields are present
      if (!name || !description || !quantity || !price) {
        return res
          .status(400)
          .json({ message: "All fields are required except userId" });
      }

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      if (typeof name !== "string" || typeof description !== "string") {
        return res
          .status(400)
          .json({ message: "Name and description must be strings" });
      }

      if (description.length > 500) {
        return res.status(400).json({ message: "Description is too long" });
      }

      if (isNaN(quantity) || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be a positive number  or not zero" });
      }

      if (isNaN(price) || price <= 0) {
        return res
          .status(400)
          .json({ message: "Price must be a positive number or not zero" });
      }

      // Check if an image was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Define the image path
      const imagePath = req.file.path;

      // Generate the relative path for the image
      const imageUrl = `/uploads/${req.file.filename}`;

      // Create a new product object (save this to your database)
      const newProduct = {
        name,
        description,
        quantity,
        price,
        userId,
        image: imageUrl, // Save the relative image URL
        total: quantity * price,
      };

      // Save the product to the database
      const product = await HardwareProduct.create(newProduct);

      res.status(201).json({
        message: "Product created successfully",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error, please try again later." });
    }
  }
);

router.get(
  "/products",
  authenticate,
  checkCategory(["hardware", "admin"]),
  hardwareController.getAllHardwareProducts
);

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["hardware", "admin"]),
  validateObjectId,
  hardwareController.getHardwareProductById
);

router.patch(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  hardwareController.updateHardwareProductById
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  hardwareController.deleteHardwareProductById
);

// Order Routes
router.post(
  "/orders",
  authenticate,
  checkCategory(["hardware", "admin"]),
  hardwareController.createHardwareOrder
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["hardware", "admin"]),
  hardwareController.getAllHardwareOrders
);

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["hardware", "admin"]),
  validateObjectId,
  hardwareController.getHardwareOrderById
);

router.patch(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  hardwareController.updateHardwareOrderById
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  hardwareController.deleteHardwareOrderById
);

router.get(
  "/revenue",
  authenticate,
  checkCategory(["admin"]),
  hardwareController.getHardwareRevenue
);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]), // Admin only
  hardwareController.getTotalCostByDate
);

router.get(
  "/available-products",
  authenticate,
  checkCategory(["hardware", "admin"]),
  checkPermissions(["createOrder"]),
  hardwareController.getAvailableProducts
);

// Generate Hardware Report
router.get(
  "/reports",
  authenticate,
  checkCategory(["admin"]),
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Missing date range" });
      }

      const orders = await getHardwareOrders(startDate, endDate);

      if (!orders.length) {
        return res.status(404).json({
          message: "No hardware orders found for the given period",
        });
      }

      generateHardwarePDF(orders, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating hardware report" });
    }
  }
);

module.exports = router;
