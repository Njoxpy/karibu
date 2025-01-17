const express = require("express");
const router = express.Router();

// middleware
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
  searchAnimalFeedingOrders,
} = require("../controllers/animalFeeding.controller");

const upload = require("../middleware/uploadAnimalFeeding");

// Constants for HTTP status codes
const {
  CREATED,
  SERVER_ERROR,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");
const AnimalFeedingProductProduct = require("../models/animalFeeding/animalFeedingProductModel");

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
  "/orders/search",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  searchAnimalFeedingOrders
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
      const { name, description, quantity, nutrients, price } = req.body;

      // Get the userId from the authenticated user (set by `authenticate` middleware)
      const userId = req.user && req.user._id; // Assuming `req.user` is populated by `authenticate`

      // Check if the required fields are present
      if (!name || !description || !quantity || !nutrients || !price) {
        return res
          .status(400)
          .json({ message: "All fields are required except userId" });
      }

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof nutrients !== "string"
      ) {
        return res.status(400).json({
          message: "Name, description, and nutrients must be strings",
        });
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
        nutrients,
        price,
        userId,
        image: imageUrl, // Save the relative image URL
      };

      const product = await AnimalFeedingProductProduct.create(newProduct);

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

// Function to validate userId format (example for MongoDB ObjectId)
function isValidUserId(userId) {
  const ObjectId = require("mongodb").ObjectId;
  return ObjectId.isValid(userId); // Adjust this validation if needed based on your database type
}

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
      return res.status(BAD_REQUEST).json({ message: "Missing date range" });
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
    res.status(SERVER_ERROR).json({ message: "Error generating report" });
  }
});

module.exports = router;
