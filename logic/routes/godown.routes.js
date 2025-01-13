const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const multer = require("multer");
const { validationResult } = require("express-validator");
const router = express.Router();

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
} = require("../controllers/godown.controller");

// Import middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

// Models
const GodownProduct = require("../models/godown/godownProductModel");
const Inventory = require("../models/godown/inventoryModel");

// Response codes
const {
  SERVER_ERROR,
  BAD_REQUEST,
  OK,
} = require("../constants/responseStatusCode");

// Multer setup
const uploadExcell = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

// Create product route
router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  createGodownProduct
);

// Bulk upload products from Excel file
router.post(
  "/products/bulk-upload",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  uploadExcell.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const filePath = req.file.path;
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const newProducts = [];
      const failedRows = [];

      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        // Validate row data
        if (!row.name || !row.price || !row.quantity) {
          failedRows.push({ row: i + 1, error: "Missing required fields" });
          continue;
        }
        try {
          const newProduct = await GodownProduct.create({
            name: row.name,
            price: parseFloat(row.price),
            quantity: parseInt(row.quantity),
            location: row.location,
            description: row.description,
            userId: row.userId,
          });
          newProducts.push(newProduct);
        } catch (error) {
          failedRows.push({ row: i + 1, error: error.message });
          console.error(`Error processing row ${i + 1}:`, error);
        }
      }

      // Cleanup uploaded file
      await fs.promises.unlink(filePath);

      // Respond with result
      if (failedRows.length > 0) {
        return res.status(400).json({
          message: "Some rows failed to upload",
          failedRows,
          successfulUploads: newProducts.length,
        });
      }
      res.status(201).json({
        message: `${newProducts.length} products uploaded successfully`,
        newProducts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to process the Excel file",
        error: error.message,
      });
    }
  }
);

router.post(
  "/orders",
  authenticate,
  checkCategory(["godown", "admin", "employee"]),
  checkPermissions(["createOrder"]),
  createGodownOrder
);

router.get(
  "/available-products",
  authenticate,
  checkCategory(["godown", "admin"]),
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

router.patch(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  updateGodownProductById
);

router.patch(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateGodownOrderById
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
  checkCategory(["admin"]),
  getTotalCostByDate
);

module.exports = router;
