const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const multer = require("multer");

// Multer setup for single file upload
const uploadExcell = multer({ dest: "uploads/" });
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

// middleware
const validateObjectId = require("../middleware/validateObjectId");

// models
const GodownProduct = require("../models/godown/godownProductModel");
const Inventory = require("../models/godown/inventoryModel");

// response code
const {
  SERVER_ERROR,
  BAD_REQUEST,
  OK,
} = require("../constants/responseStatusCode");

// create product
router.post("/products", createGodownProduct);

router.post(
  "/products/bulk-upload",
  uploadExcell.single("file"), // Expecting a field 'file'
  async (req, res) => {
    // Step 1: Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Step 2: Validate request data (if any other validation required)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const filePath = req.file.path; // Path to the uploaded file

      // Step 3: Read and parse the Excel file
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON

      const newProducts = [];
      const failedRows = [];

      // Step 4: Process each row and store in the database
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];

        // Validate row data (e.g., check for missing required fields)
        if (!row.name || !row.price || !row.quantity) {
          failedRows.push({ row: i + 1, error: "Missing required fields" });
          continue;
        }

        try {
          // Create a new product entry
          const newProduct = await GodownProduct.create({
            name: row.name,
            price: parseFloat(row.price), // Parse price as a float
            quantity: parseInt(row.quantity), // Parse quantity as an integer
            location: row.location,
            description: row.description,
            userId: row.userId,
          });

          newProducts.push(newProduct);
        } catch (error) {
          // Log specific error for the row and continue
          failedRows.push({ row: i + 1, error: error.message });
          console.error(`Error processing row ${i + 1}:`, error);
        }
      }

      // Step 5: Clean up the uploaded file (delete it after processing)
      await fs.promises.unlink(filePath);

      // Step 6: Respond with the result
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

module.exports = router;

router.post("/products", createGodownProduct);

// Other routes remain the same (create, get, update, delete, etc.)

// create order
router.post("/orders", createGodownOrder);

router.get("/available-products", getAvailableProducts);
router.get("/revenue", getRevenue);

// get all products
router.get("/products", getAllGodownProducts);

// get all orders
router.get("/orders", getAllGodownOrders);

// get product by id
router.get("/products/:id", validateObjectId, getAllGodownProductById);

// get order by id
router.get("/orders/:id", validateObjectId, getGodownOrder);

// update product by id
router.patch("/products/:id", validateObjectId, updateGodownProductById);

// update order by id
router.patch("/orders/:id", validateObjectId, updateGodownOrderById);

// delete product by id
router.delete("/products/:id", validateObjectId, deleteGodownProduct);

// delete product by id
router.delete("/orders/:id", validateObjectId, deleteGodownOrder);

router.post("/inventory-movement", transferInventory);

module.exports = router;
