const express = require("express");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const {
  getAnimalFeedingOrders,
} = require("../services/animalFeeding/animalFeedingService");
const {
  generateAnimalFeedingPDF,
} = require("../services/animalFeeding/pdfService");

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
  getTotalCostByDate,
  getAvailableProducts,
  getRevenue,
} = require("../controllers/animalFeeding.controller");

const upload = require("../middleware/uploadAnimalFeeding");

// Constants for HTTP status codes
const {
  CREATED,
  SERVER_ERROR,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");

// Routes

// Product Routes
router.get(
  "/products",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAllAnimalFeedingProducts
); // Employees and Admins can view products

router.get(
  "/products/search",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  searchAnimalFeedingProducts
); // Employees and Admins can search products

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  validateObjectId,
  getAnimalFeedingProductById
); // Employees and Admins can view product by ID

router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]), // Admin only
  checkPermissions(["createProduct"]),
  upload.single("image"), // Upload a single image file
  async (req, res) => {
    try {
      // Extract product details from the request body
      const { name, description, quantity, nutrients, price, userId } = req.body;

      // Check if the required fields are present
      if (!name || !description || !quantity || !nutrients || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (description.length > 500) {
        return res.status(400).json({ message: "Description is too long" });
      }

      if (quantity <= 0) {
        return res.status(400).json({ message: "Quantity cannot be negative or zero" });
      }

      if (price <= 0) {
        return res.status(400).json({ message: "Price cannot be negative or zero" });
      }

      // Check if an image was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Define the original image path
      const imagePath = req.file.path;

      // Define the path for the compressed image
      // Define the path for the compressed image
      const compressedImagePath = path.join(__dirname, "uploads", `compressed_${req.file.filename}.jpg`);

      // Compress the image with sharp
      await sharp(imagePath)
        .resize(800) // Resize image to 800px width (adjustable)
        .toFormat("jpeg")
        .jpeg({ quality: 40 }) // Set quality to 40% for size reduction
        .toFile(compressedImagePath);

      // Asynchronous deletion of the original image
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete original image:", err);
        } else {
          console.log("Original image deleted successfully");
        }
      });

      // Generate the relative path for the compressed image
      const imageUrl = `/uploads/compressed_${req.file.filename}.jpg`;

      // Create a new product object (you would save this to your database)
      const newProduct = {
        name,
        description,
        quantity,
        nutrients,
        price,
        userId,
        image: imageUrl, // Save the relative image URL
      };

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
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
  checkPermissions(["updateProduct"]), // Admin only
  updateAnimalFeedingProduct
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]), // Admin only
  deleteAnimalFeedingProductById
);

// Order Routes
router.post(
  "/orders",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  checkPermissions(["createOrder"]), // Employees and Admins can create orders
  createAnimalFeedingOrder
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAnimalFeedingAllOrders
); // Employees and Admins can view orders

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  validateObjectId,
  getAnimalFeedingOrderById
); // Employees and Admins can view order by ID

router.patch(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]), // Only admin can update orders
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateAnimalFeedingOrder
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]), // Only admin can delete orders
  deleteAnimalFeedingOrderById
);

// Other Routes
router.get(
  "/available-products",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAvailableProducts
);

router.get(
  "/revenue",
  authenticate,
  checkCategory(["admin"]), // Admin only
  getRevenue
);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]), // Admin only
  getTotalCostByDate
);

// Admin middleware for authentication
const adminMiddleware = (req, res, next) => {
  const user = { role: "admin" }; // Replace with real authentication
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Generate Animal Feeding Report
router.get("/reports", adminMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Missing date range" });
    }

    const orders = await getAnimalFeedingOrders(startDate, endDate);

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for the given period" });
    }

    // res.json({ success: true, orders }); // Placeholder response
    generateAnimalFeedingPDF(orders, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
  }
});

module.exports = router;
