const express = require("express");
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
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, quantity, nutrients, price } = req.body;

      if (!name || !description || !quantity || !nutrients || !price) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "All fields are required" });
      }

      if (description.length > 500) {
        return res.status(400).json({ message: "Description is too long" });
      }

      const userId = req.user.id;

      const image = req.file ? req.file.path : null;
      const newProduct = new AnimalFeedingProduct({
        name,
        description,
        quantity,
        nutrients,
        image,
        price,
        userId,
      });

      await newProduct.save();
      res.status(CREATED).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      res
        .status(SERVER_ERROR)
        .json({ error: "Server error, please try again later." });
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
