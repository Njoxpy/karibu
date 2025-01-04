const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const authenticate = require("../middleware/auth/authenticate");
const authorizeAdmin = require("../middleware/auth/authorizeAdmin");
const authorizeEmployee = require("../middleware/auth/authorizeEmployee");
const checkCategory = require("../middleware/auth/checkCategory");
const validateObjectId = require("../middleware/validateObjectId");

const {
  createAnimalFeedingOrder,
  getAllAnimalFeedingProducts,
  getAnimalFeedingAllOrders,
  getAnimalFeedingProductById,
  getAnimalFeedingOrderById,
  updateAnimalFeedingProduct,
  updateAnimalFeedingOrder,
  deleteAnimalFeedingProductById,
  deleteAnimalFeedingOrderById,
  searchAnimalFeedingProducts,
  searchAnimalFeedingOrders,
  getAnimalFeedingTotalCost,
  getTotalCostByDate,
  getAvailableProducts,
  getRevenue,
} = require("../controllers/animalFeeding.controller");

const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

const upload = require("../middleware/uploadAnimalFeeding");

const {
  CREATED,
  SERVER_ERROR,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");

// Authenticate and authorize routes

// Admin can create orders, view orders, and update or delete products
router.post("/orders", createAnimalFeedingOrder); // Admin can create orders
router.get("/products", getAllAnimalFeedingProducts); // View all products (any authenticated user)
router.get("/products/search", searchAnimalFeedingProducts); // Search products (any authenticated user)
router.get("/orders", getAnimalFeedingAllOrders); // View all orders (admin only)
router.get("/orders/search", searchAnimalFeedingOrders); // Search orders (admin only)
router.get(
  "/products/:id",

  validateObjectId,
  getAnimalFeedingProductById
); // Get product by ID
router.get("/orders/:id", validateObjectId, getAnimalFeedingOrderById); // Get order by ID

// Admin can update products and orders, but employee can only update orders
router.patch("/products/:id", validateObjectId, updateAnimalFeedingProduct); // Admin can update product
router.patch("/orders/:id", validateObjectId, updateAnimalFeedingOrder); // Employee can update orders

router.get("/available-products", getAvailableProducts);
router.get("/revenue", getRevenue);

// Admin can delete products and orders, but employees cannot
router.delete(
  "/products/:id",
  validateObjectId,
  deleteAnimalFeedingProductById
); // Admin can delete product
router.delete("/orders/:id", validateObjectId, deleteAnimalFeedingOrderById); // Admin can delete order

// total cost
router.get("/total-orders", getTotalCostByDate);
// Bulk upload products (admin only)
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, description, quantity, nutrients, price, userId } = req.body;

    // Validate required fields
    if (!name || !description || !quantity || !nutrients || !price || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "All fields are required." });
    }

    // Validate that quantity, price are numbers
    if (isNaN(quantity) || isNaN(price)) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Quantity and price must be valid numbers." });
    }

    // Validate that quantity, price are greater than zero
    if (quantity <= 0 || price <= 0) {
      return res.status(BAD_REQUEST).json({
        error: "Quantity, price must be greater than zero.",
      });
    }

    // Validate userId (e.g., if using JWT or session-based authentication)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    // Optional: validate image (e.g., file type and size validation)
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // Max 5MB

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(BAD_REQUEST).json({
          error: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
      }

      if (req.file.size > maxSize) {
        return res
          .status(BAD_REQUEST)
          .json({ error: "File size exceeds the maximum limit of 5MB." });
      }
    }

    // Assign the image path if available
    const image = req.file ? req.file.path : null;

    // Create a new product instance
    const newProduct = new AnimalFeedingProduct({
      name,
      description,
      quantity,
      nutrients,
      image,
      price,
      userId,
    });

    // Save the product to the database
    await newProduct.save();

    // Return success response
    res.status(CREATED).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    // Handle server errors
    console.error(error); // Log detailed error for debugging
    res
      .status(SERVER_ERROR)
      .json({ error: "Server error, please try again later." });
  }
});

module.exports = router;
