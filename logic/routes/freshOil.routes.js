const express = require("express");
const path = require("path");
const router = express.Router();

const XLSX = require('xlsx')

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
    searchFreshOilProducts, // Added search controller for products
    searchFreshOilOrders,   // Added search controller for orders
} = require("../controllers/freshOil.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/upload"); // Assuming this is your general file upload handler

// Models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");
// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");

// POST: Create new product
router.post("/products", upload.single("image"), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(BAD_REQUEST).json({ error: 'No file uploaded' });
        }

        // Create a new FreshOilProduct object
        const newProduct = new FreshOilProduct({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            image: req.file.path,  // Store the file path in the database
            price: req.body.price,
            userId: req.body.userId,
            total: req.body.quantity * req.body.price,
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(CREATED).json(savedProduct);  // Return the saved product as a response
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: 'Error saving product', details: error.message });
    }
});

// POST: Bulk upload products (Excel)
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
        const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        if (excelData.length === 0) {
            return res.status(BAD_REQUEST).json({ message: 'The uploaded file is empty or does not contain valid data.' });
        }

        // Bulk insert for better performance
        const products = excelData.map(productData => ({
            name: productData.name,
            description: productData.description,
            quantity: productData.quantity,
            price: productData.price,
            image: filePath,  // Adjust as needed (store the image or use a placeholder)
            total: productData.quantity * productData.price,
        }));

        const savedProducts = await FreshOilProduct.insertMany(products);
        results.push(...savedProducts);

        res.status(CREATED).json({ message: 'Products uploaded successfully', data: results.length });
    } catch (error) {
        console.error('Error during bulk upload:', error);
        res.status(SERVER_ERROR).json({ error: 'Error during bulk upload', details: error.message });
    }
});

// POST: Create a fresh oil order
router.post("/orders", createFreshOilOrder);

// GET: Get all fresh oil products
router.get("/products", getAllFreshOilProducts);

// GET: Search products (added search functionality)
router.get("/products/search", searchFreshOilProducts);

// GET: Get all orders
router.get("/orders", getAllFreshOilOrders);

// GET: Search orders (added search functionality)
router.get("/orders/search", searchFreshOilOrders);

// GET: Get single product by ID
router.get("/products/:id", validateObjectId, getSingleFreshOilProduct);

// GET: Get single order by ID
router.get("/orders/:id", validateObjectId, getSingleFreshOilOrder);

// PATCH: Update product details
router.patch("/products/:id", validateObjectId, updateFreshOilProduct);

// PATCH: Update order details
router.patch("/orders/:id", validateObjectId, updateFreshOilOrder);

// DELETE: Delete product by ID
router.delete("/products/:id", validateObjectId, deleteFreshOilProduct);

// DELETE: Delete order by ID
router.delete("/orders/:id", validateObjectId, deleteFreshOilOrder);

// Handling bulk upload and image upload

module.exports = router;
