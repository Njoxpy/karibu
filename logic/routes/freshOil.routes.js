// Fresh Oil Routes
const express = require("express");
const mongoose = require("mongoose");
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
} = require("../controllers/freshOil.controller");

// Models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// Routes

// Product Routes
router.get(
  "/products",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  getAllFreshOilProducts
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
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, quantity, price, userId } = req.body;

      if (!name || !description || !quantity || !price || !userId) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "All required fields must be provided." });
      }

      if (isNaN(quantity) || isNaN(price)) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Quantity and price must be valid numbers." });
      }

      if (quantity <= 0 || price <= 0) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Quantity and price must be greater than zero." });
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(BAD_REQUEST).json({ message: "Invalid userId." });
      }

      const image = req.file ? req.file.path : null;
      const newProduct = new FreshOilProduct({
        name,
        description,
        quantity,
        price,
        image,
        userId,
        total: quantity * price,
      });

      const savedProduct = await newProduct.save();
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

module.exports = router;
