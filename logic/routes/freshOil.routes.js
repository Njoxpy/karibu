// Fresh Oil Routes
const express = require("express");
const router = express.Router();

// Middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadAnimalFeeding");

const FreshOilProduct = require("../models/freshOil/freshOilproductModel");
const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");
const GodownProduct = require("../models/godown/godownProductModel");
const HardwareProduct = require("../models/hardware/productModel");
const StationeryProduct = require("../models/stationery/stationeryProductModel");
const FreshOilOrder = require("../models/freshOil/freshOilOrderModel");
const AnimalFeedingOrder = require("../models/animalFeeding/animalFeedingOrderModel");
const GodownOrder = require("../models/godown/godownOrderModel");
const HardwareOrder = require("../models/hardware/orderModel");
const PrintingOrder = require("../models/printing/printingOrderModel");
const StationeryOrder = require("../models/stationery/stationerOrderModel");

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
  getTotalOrders,
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
  getAllFreshOilProducts,
);

router.get("/revenue", authenticate, checkCategory(["admin"]), getRevenue);

router.get(
  "/products/search",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  searchFreshOilProducts,
);

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  validateObjectId,
  getSingleFreshOilProduct,
);

router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, quantity, price } = req.body;

      const userId = req.user && req.user._id;

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

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const imagePath = req.file.path;

      const imageUrl = `/uploads/${req.file.filename}`;

      const newProduct = {
        name,
        description,
        quantity,
        price,
        userId,
        image: imageUrl,
        total: quantity * price,
      };

      const product = await freshOilProduct.create(newProduct);

      res.status(201).json({
        message: "Product created successfully",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error, please try again later." });
    }
  },
);

router.put(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  updateFreshOilProduct,
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  deleteFreshOilProduct,
);

router.post(
  "/orders",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  createFreshOilOrder,
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  addPagination,
  getAllFreshOilOrders,
);

router.get(
  "/orders/search",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  searchFreshOilOrders,
);

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  validateObjectId,
  getSingleFreshOilOrder,
);

router.put(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateFreshOilOrder,
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  deleteFreshOilOrder,
);

// Miscellaneous Routes
router.get(
  "/available-products",
  authenticate,
  checkCategory(["fresh-oil", "admin"]),
  getAvailableProducts,
);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]),
  getTotalCostByDate,
);

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
  },
);

router.get(
  "/orders-count",
  authenticate,
  checkCategory(["admin"]),
  getTotalOrders,
);

const getTotalProducts = async (req, res) => {
  try {
    // Fetch and sum product quantities for each category
    const totalProductsFresh = await FreshOilProduct.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    const totalProductsAnimal = await AnimalFeedingProduct.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    const totalProductsGodown = await GodownProduct.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    const totalProductsHardware = await HardwareProduct.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    const totalProductsStationery = await StationeryProduct.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    // Calculate total products
    const totalProducts =
      (totalProductsFresh[0]?.totalQuantity || 0) +
      (totalProductsAnimal[0]?.totalQuantity || 0) +
      (totalProductsGodown[0]?.totalQuantity || 0) +
      (totalProductsHardware[0]?.totalQuantity || 0) +
      (totalProductsStationery[0]?.totalQuantity || 0);

    res.status(200).json({ totalProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalSales = async (req, res) => {
  try {
    const totalSalesFresh = await FreshOilOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSalesAnimal = await AnimalFeedingOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSalesGodown = await GodownOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSalesHardware = await HardwareOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSalesPrinting = await PrintingOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSalesStationery = await StationeryOrder.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);

    // Calculate the total sales across all categories
    const totalSales =
      (totalSalesFresh[0]?.totalSales || 0) +
      (totalSalesAnimal[0]?.totalSales || 0) +
      (totalSalesGodown[0]?.totalSales || 0) +
      (totalSalesHardware[0]?.totalSales || 0) +
      (totalSalesPrinting[0]?.totalSales || 0) +
      (totalSalesStationery[0]?.totalSales || 0);

    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.get(
  "/products-count",
  authenticate,
  checkCategory(["admin"]),
  getTotalProducts,
);

router.get(
  "/sales-total",
  authenticate,
  checkCategory(["admin"]),
  getTotalSales,
);

module.exports = router;
