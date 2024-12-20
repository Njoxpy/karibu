const express = require("express");
const path = require("path");
const XLSX = require("xlsx");

const router = express.Router();

// Models
const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

// Response codes
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR, CREATED } = require("../constants/responseStatusCode");

// Controllers
const {
  getAllAnimalFeedingProducts,
  createAnimalFeedingOrder,
  getAnimalFeedingAllOrders,
  getAnimalFeedingProductById,
  getAnimalFeedingOrderById,
  updateAnimalFeedingProduct,
  deleteAnimalFeedingProductById,
  deleteAnimalFeedingOrderById,
  searchAnimalFeedingProductName,
  updateAnimalFeedingOrder,
} = require("../controllers/animalFeeding.controller");

// Middleware
const validateProductFields = require("../middleware/validateProductFields");
const createOrderMiddleware = require("../middleware/createOrderMiddleware");
const upload = require("../middleware/upload");
const validateObjectId = require("../middleware/validateObjectId");

// GET: Get all products
router.get("/products", getAllAnimalFeedingProducts);

// GET: Get product by an id
router.get("/products/:id", getAnimalFeedingProductById);

// POST: Bulk upload products (Excel file)
router.post("/products/bulk-upload", upload.single("file"), async (req, res) => {
  const results = [];

  try {
    if (!req.file || !(req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || req.file.originalname.endsWith('.xlsx'))) {
      return res.status(BAD_REQUEST).json({ message: 'Please upload a valid Excel file.' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename); // Assuming 'uploads' directory exists for uploads

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];  // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true }); // Use raw to handle numbers correctly

    // Bulk insert for better performance
    const products = excelData.map(productData => ({
      name: productData.name,
      description: productData.description,
      quantity: productData.quantity,
      nutrients: productData.nutrients,
      image: filePath,  // Adjust as needed
      price: productData.price,
      userId: req.body.userId,
      total: productData.quantity * productData.price,
    }));

    const savedProducts = await AnimalFeedingProduct.insertMany(products);
    results.push(...savedProducts);

    res.status(CREATED).json({ message: 'Products uploaded successfully', data: results.length });
  } catch (error) {
    console.error('Error during bulk upload:', error);
    res.status(SERVER_ERROR).json({ error: 'Error during bulk upload', details: error.message });
  }
});

// POST: Add a new product (with image)
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new AnimalFeedingProduct({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      nutrients: req.body.nutrients,
      image: req.file.path,  // Store the image path
      price: req.body.price,
      userId: req.body.userId,
      total: req.body.quantity * req.body.price,
    });

    const savedProduct = await newProduct.save();
    res.status(CREATED).json(savedProduct);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: 'Error saving product', error: error.message });
  }
});

// PATCH: Update product details
router.patch("/products/:id", validateObjectId, updateAnimalFeedingProduct);

// POST: Search for products by name
router.get("/products/search", searchAnimalFeedingProductName);

// DELETE: Delete product by ID
router.delete("/products/:id", validateObjectId, deleteAnimalFeedingProductById);

// GET: Get all orders
router.get("/orders", getAnimalFeedingAllOrders);

// GET: Get single order by ID
router.get("/orders/:id", validateObjectId, getAnimalFeedingOrderById);

// UPDATE: Update order details
router.patch("/orders/:id", validateObjectId, updateAnimalFeedingOrder);

// POST: Create new order
router.post("/orders", createOrderMiddleware, createAnimalFeedingOrder);

// DELETE: Delete order by ID
router.delete("/orders/:id", validateObjectId, deleteAnimalFeedingOrderById);

module.exports = router;
