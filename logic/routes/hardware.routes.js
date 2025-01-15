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

// file uploa
// Product Routes
router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, quantity, description, userId } = req.body;

      // Validate required fields
      if (
        !name ||
        price === undefined ||
        quantity === undefined ||
        !description ||
        !userId
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (description.length > 500) {
        return res.status(400).json({message:"Description is too long"})
      }

      // Validate that price and quantity are numbers
      if (isNaN(quantity) || isNaN(price)) {
        return res
          .status(400)
          .json({ error: "Quantity and price must be valid numbers." });
      }

      // Validate that quantity and price are greater than or equal to zero
      if (quantity < 0 || price < 0) {
        return res.status(400).json({
          error: "Quantity and price must be greater than or equal to zero.",
        });
      }

      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          error: "Invalid userId. Please provide a valid MongoDB ObjectId.",
        });
      }

      const image = req.file ? req.file.path : null;

      // Create a new hardware product
      const newProduct = await HardwareProduct.create({
        name,
        price,
        quantity,
        description,
        userId,
        image,
      });

      res
        .status(201)
        .json({ message: "Product created successfully", newProduct });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res
        .status(500)
        .json({ message: "Failed to create product", error: error.message });
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
  checkPermissions(["createOrder"]),
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

router.get("/revenue", authenticate, checkCategory(["admin"]), getRevenue);

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

module.exports = router;
