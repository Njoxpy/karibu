const express = require("express");
const mongoose = require("mongoose");
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
  getTotalCostByDate,
  getAvailableProducts,
} = require("../controllers/freshOil.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");

const upload = require("../middleware/uploadAnimalFeeding");

// Models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");

// Response codes
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");

// POST: Create new product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    // Check if all required fields are present
    const { name, description, quantity, price, userId } = req.body;

    if (!name || !description || !quantity || !price || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All required fields must be provided." });
    }

    // Validate that quantity and price are valid numbers
    if (isNaN(quantity) || isNaN(price)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity and price must be valid numbers." });
    }

    // Validate that quantity and price are greater than zero
    if (quantity <= 0 || price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity and price must be greater than zero." });
    }

    // Validate userId as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid userId." });
    }

    // Optional: Handle the image file upload (if provided)
    const image = req.file ? req.file.path : null;

    // Create a new product object
    const newProduct = new FreshOilProduct({
      name,
      description,
      quantity,
      price,
      image,
      userId,
      total: quantity * price, // Automatically calculate total based on quantity and price
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the created product
    res.status(CREATED).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Error creating product",
      details: error.message,
    });
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

router.get("/total-orders", getTotalCostByDate);

router.get("/available-products", getAvailableProducts);

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
