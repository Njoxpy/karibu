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
} = require("../controllers/animalFeeding.controller");

const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

const upload = require("../middleware/uploadAnimalFeeding");

const { CREATED, SERVER_ERROR, BAD_REQUEST } = require("../constants/responseStatusCode");

// Authenticate and authorize routes

// Admin can create orders, view orders, and update or delete products
router.post("/orders", authenticate, authorizeAdmin, createAnimalFeedingOrder); // Admin can create orders
router.get("/products", authenticate, getAllAnimalFeedingProducts); // View all products (any authenticated user)
router.get("/products/search", authenticate, searchAnimalFeedingProducts); // Search products (any authenticated user)
router.get("/orders", authenticate, getAnimalFeedingAllOrders); // View all orders (admin only)
router.get("/orders/search", authenticate, searchAnimalFeedingOrders); // Search orders (admin only)
router.get("/products/:id", authenticate, validateObjectId, getAnimalFeedingProductById); // Get product by ID
router.get("/orders/:id", authenticate, validateObjectId, getAnimalFeedingOrderById); // Get order by ID

// Admin can update products and orders, but employee can only update orders
router.patch("/products/:id", authenticate, authorizeAdmin, validateObjectId, updateAnimalFeedingProduct); // Admin can update product
router.patch("/orders/:id", authenticate, authorizeEmployee, validateObjectId, updateAnimalFeedingOrder); // Employee can update orders

// Admin can delete products and orders, but employees cannot
router.delete("/products/:id", authenticate, authorizeAdmin, validateObjectId, deleteAnimalFeedingProductById); // Admin can delete product
router.delete("/orders/:id", authenticate, authorizeAdmin, validateObjectId, deleteAnimalFeedingOrderById); // Admin can delete order

// Bulk upload products (admin only)
router.post("/products/bulk-upload", authenticate, authorizeAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, quantity, nutrients, price, userId } = req.body;

    // Validate required fields
    if (!name || !description || !quantity || !nutrients || !price || !userId) {
      return res.status(BAD_REQUEST).json({ error: "All fields are required." });
    }

    // Validate that quantity, price, and total are numbers
    if (isNaN(quantity) || isNaN(price)) {
      return res.status(BAD_REQUEST).json({ error: "Quantity and price must be valid numbers." });
    }

    // Validate that quantity, price, and total are greater than zero
    if (quantity <= 0 || price <= 0) {
      return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
    }

    // Validate userId (e.g., if using JWT or session-based authentication)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    // Optional: validate file if an image is expected
    const image = req.file ? req.file.path : null;

    // Create a new product instance
    const newProduct = new AnimalFeedingProduct({
      name,
      description,
      quantity,
      nutrients,
      image,
      price,
      userId
    });

    // Save the product to the database
    await newProduct.save();

    // Return success response
    res.status(CREATED).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    // Handle server errors
    console.error(error); // Log the error for debugging
    res.status(SERVER_ERROR).json({ error: error.message });
  }
});

module.exports = router;
