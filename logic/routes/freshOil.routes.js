// Fresh Oil Routes
const express = require("express");
const router = express.Router();

// Middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadAnimalFeeding");

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
  getRevenue,
} = require("../controllers/freshOil.controller");

const { getFreshOilOrders } = require("../services/freshOil/freshOilService");
const { generateFreshOilPDF } = require("../services/freshOil/pdfService");
const freshOilProduct = require("../models/freshOil/freshOilproductModel");

// Add pagination middleware
const addPagination = (req, res, next) => {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 10;
  next();
};

// Product Routes
router.get(
  "/products",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  addPagination,
  getAllFreshOilProducts
);

router.get(
  "/revenue",
  authenticate,
  checkCategory(["admin"]), // Admin only
  getRevenue
);

router.get(
  "/products/search",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  searchFreshOilProducts
);

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  validateObjectId,
  getSingleFreshOilProduct
);

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
          .json({ message: "Quantity must be a positive number" });
      }

      if (isNaN(price) || price <= 0) {
        return res
          .status(400)
          .json({ message: "Price must be a positive number" });
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
      const product = await freshOilProduct.create(newProduct);

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

router.patch(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  updateFreshOilProduct
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  deleteFreshOilProduct
);

// Order Routes
router.post(
  "/orders",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  checkPermissions(["createOrder"]),
  createFreshOilOrder
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  addPagination,
  getAllFreshOilOrders
);

router.get(
  "/orders/search",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  searchFreshOilOrders
);

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  validateObjectId,
  getSingleFreshOilOrder
);

router.patch(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateFreshOilOrder
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  deleteFreshOilOrder
);

// Miscellaneous Routes
router.get(
  "/available-products",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  getAvailableProducts
);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]),
  getTotalCostByDate
);

// Generate Fresh Oil Report
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

      const orders = await getFreshOilOrders(startDate, endDate);

      if (!orders.length) {
        return res.status(404).json({
          message: "No orders found for the given period",
        });
      }

      generateFreshOilPDF(orders, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating report" });
    }
  }
);

module.exports = router;
