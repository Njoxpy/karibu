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
const uploadExcel = require("../middleware/excell/uploadExcel"); // Adjust to your middleware path
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
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  uploadExcel.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Step 1: Read and parse the Excel file
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Step 2: Prepare data for bulkWrite
      const bulkOperations = [];
      const failedRows = [];
      jsonData.forEach((row, index) => {
        if (!row.name || !row.price || !row.quantity) {
          failedRows.push({ row: index + 1, error: "Missing required fields" });
          return;
        }

        bulkOperations.push({
          insertOne: {
            document: {
              name: row.name,
              price: parseFloat(row.price),
              quantity: parseInt(row.quantity, 10),
              location: row.location || "",
              description: row.description || "",
            },
          },
        });
      });

      // Step 3: Insert data into the database using bulkWrite
      let successfulUploads = 0;
      if (bulkOperations.length > 0) {
        const result = await GodownProduct.bulkWrite(bulkOperations);
        successfulUploads = result.insertedCount;
      }

      // Step 4: Respond with the result
      const responseMessage = {
        message: `${successfulUploads} products uploaded successfully`,
        successfulUploads,
      };

      if (failedRows.length > 0) {
        responseMessage.failedRows = failedRows;
      }

      res.status(201).json(responseMessage);
    } catch (error) {
      console.error("Error processing file upload:", error);
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
  checkCategory(["admin"]), // Admin only
  getTotalCostByDate
);

module.exports = router;
