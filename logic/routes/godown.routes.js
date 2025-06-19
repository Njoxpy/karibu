const express = require("express");
const xlsx = require("xlsx");
const router = express.Router();

const CHUNK_SIZE = 1000;
// Import controllers
const {
  createGodownProduct,
  createGodownOrder,
  getAllGodownProducts,
  getAllGodownOrders,
  getAllGodownProductById,
  getGodownOrder,
  updateGodownProductById,
  updateGodownOrderById,
  deleteGodownProduct,
  deleteGodownOrder,
  getAvailableProducts,
  getRevenue,
  transferInventory,
  getTotalCostByDate,
  getMovementLogs,
} = require("../controllers/godown.controller");

const {
  getLogById,
  updateLog,
  deleteLog,
} = require("../controllers/godown.controller");

// Import middleware
const uploadExcel = require("../middleware/excell/uploadExcel"); // Adjust to your middleware path
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

// Models
const GodownProduct = require("../models/godown/godownProductModel");

// Import services
const { generateGodownPDF } = require("../services/godown/pdfService");
const { getGodownOrders } = require("../services/godown/godownService");

// Create product route
router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  createGodownProduct
);

router.post(
  "/products/bulk-upload",
  authenticate,
  checkCategory(["admin"]), // Admin only
  checkPermissions(["createProduct"]), // Ensure user has permissions
  uploadExcel.single("file"), // Upload a single Excel file
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileBuffer = req.file.buffer; // Get the file buffer from memory
      const workbook = xlsx.read(fileBuffer, { type: "buffer" });

      const sheetNames = workbook.SheetNames;
      const sheet = workbook.Sheets[sheetNames[0]]; // Assuming data is in the first sheet
      const data = xlsx.utils.sheet_to_json(sheet);

      // Validate Excel data
      const validationErrors = [];
      const products = data.map((item, index) => {
        const errors = [];
        const product = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          location: item.location,
          description: item.description,
          condition: item.condition || "new", // Default to "new" if no condition is specified
          userId: req.user._id, // Assuming the authenticated user is an admin
        };

        // Validate fields
        if (!product.name || typeof product.name !== "string") {
          errors.push("Product name is required and must be a string.");
        }
        if (
          !product.price ||
          typeof product.price !== "number" ||
          product.price <= 0
        ) {
          errors.push("Price is required and must be a positive number.");
        }
        if (
          !product.quantity ||
          typeof product.quantity !== "number" ||
          product.quantity < 0
        ) {
          errors.push(
            "Quantity is required and must be a non-negative number."
          );
        }
        if (!product.location || typeof product.location !== "string") {
          errors.push("Location is required and must be a string.");
        }
        if (
          !product.description ||
          typeof product.description !== "string" ||
          product.description.length > 500
        ) {
          errors.push(
            "Description is required and must be a string with a max length of 500 characters."
          );
        }
        if (errors.length > 0) {
          validationErrors.push({ row: index + 1, errors });
        }

        return { ...product, errors };
      });

      if (validationErrors.length > 0) {
        return res.status(400).json({
          message: "Validation errors in uploaded data",
          errors: validationErrors,
        });
      }

      // Filter out invalid products
      const validProducts = products.filter(
        (product) => product.errors.length === 0
      );

      // Chunk the valid products into smaller arrays for bulk insert
      const chunkedProducts = [];
      for (let i = 0; i < validProducts.length; i += CHUNK_SIZE) {
        chunkedProducts.push(validProducts.slice(i, i + CHUNK_SIZE));
      }

      // Insert each chunk separately
      for (let chunk of chunkedProducts) {
        await GodownProduct.insertMany(chunk);
      }

      // Return a success response
      res.status(201).json({
        message: "Products uploaded successfully",
        products: validProducts.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error processing the bulk upload",
        error: error.message,
      });
    }
  }
);

router.post(
  "/orders",
  authenticate,
  checkCategory(["godown", "admin"]),
  createGodownOrder
);

router.get(
  "/available-products",
  authenticate,
  checkCategory(["godown", "admin"]),
  checkPermissions(["createOrder"]),
  getAvailableProducts
);

router.get("/revenue", authenticate, checkCategory(["admin"]), getRevenue);

router.get(
  "/products",
  authenticate,
  checkCategory(["godown", "admin"]),
  getAllGodownProducts
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["godown", "admin"]),
  getAllGodownOrders
);

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["godown", "admin"]),
  validateObjectId,
  getAllGodownProductById
);

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["godown", "admin"]),
  validateObjectId,
  getGodownOrder
);

router.put(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  updateGodownProductById
);

router.put(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateGodownOrderById
);

router.get(
  "/movement-logs",
  authenticate,
  checkCategory(["admin"]),
  getMovementLogs
);

router.get(
  "/movement-logs/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  getLogById
);

// Route to update log by ID
router.put(
  "/movement-logs/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  updateLog
);

// Route to delete log by ID
router.delete(
  "/movement-logs/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  deleteLog
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  deleteGodownProduct
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  deleteGodownOrder
);

router.post(
  "/inventory-movement",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["transferInventory"]),
  transferInventory
);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]), // Admin only
  getTotalCostByDate
);

// Generate Godown Report
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

      const orders = await getGodownOrders(startDate, endDate);

      if (!orders.length) {
        return res.status(404).json({
          message: "No godown records found for the given period",
        });
      }

      generateGodownPDF(orders, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating godown report" });
    }
  }
);

module.exports = router;
