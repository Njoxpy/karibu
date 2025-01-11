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
  createFreshOilProduct,
} = require("../controllers/freshOil.controller");

// Models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// Add pagination middleware
const addPagination = (req, res, next) => {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 10;
  next();
};

// Routes

// Product Routes
router.get(
  "/products",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  addPagination,
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
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  upload.single("image"),
  createFreshOilProduct
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

module.exports = router;
