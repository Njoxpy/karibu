const express = require("express");
const xlsx = require("xlsx");
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
  getMovementLogs,
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
    console.log("Uploaded file:", req.file); // Log the file object for debugging

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

      // Insert valid products into the database
      const createdProducts = await GodownProduct.insertMany(validProducts);

      // Return a success response
      res.status(201).json({
        message: "Products uploaded successfully",
        products: createdProducts,
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

router.get(
  "/movement-logs",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  getMovementLogs
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
