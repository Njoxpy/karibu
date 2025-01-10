const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const multer = require("multer");
const { validationResult } = require("express-validator");
const router = express.Router();

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
} = require("../controllers/godown.controller");

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
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

// Create product route
router.post("/products", createGodownProduct);

// Bulk upload products from Excel file
router.post(
  "/products/bulk-upload",
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

// Other routes
router.post("/orders", createGodownOrder);
router.get("/available-products", getAvailableProducts);
router.get("/revenue", getRevenue);
router.get("/products", getAllGodownProducts);
router.get("/orders", getAllGodownOrders);
router.get("/products/:id", validateObjectId, getAllGodownProductById);
router.get("/orders/:id", validateObjectId, getGodownOrder);
router.patch("/products/:id", validateObjectId, updateGodownProductById);
router.patch("/orders/:id", validateObjectId, updateGodownOrderById);
router.delete("/products/:id", validateObjectId, deleteGodownProduct);
router.delete("/orders/:id", validateObjectId, deleteGodownOrder);
router.post("/inventory-movement", transferInventory);

module.exports = router;
