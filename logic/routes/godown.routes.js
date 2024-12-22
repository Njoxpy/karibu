const express = require("express");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const {
  createGodownProduct,
  createGodownOrder,
  getAllGodownProducts,
  getAllGodownOrders,
  getAllGodownProductById,
  getAllGodownOrderById,
  updateGodownProductById,
  updateGodownOrderById,
  deleteGodownProduct,
  deleteGodownOrder,
} = require("../controllers/godown.controller");

// middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadGodown");

// models
const GodownProduct = require("../models/godown/godownProductModel");
const Inventory =  require("../models/godown/inventoryModel")

// response code
const { SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../constants/responseStatusCode");

// create product
router.post("/products", createGodownProduct);

// bulk upload
router.post("/products", createGodownProduct);

// bulk upload
router.post("/products/bulk-upload", upload.single("file"), async (req, res) => {
  const results = [];
  const failedRows = [];

  try {
    // Check if file is uploaded and is a valid Excel or CSV file
    if (!req.file || !(req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || req.file.mimetype === 'text/csv')) {
      return res.status(BAD_REQUEST).json({ message: 'Please upload a valid Excel or CSV file.' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    console.log(`File uploaded to: ${filePath}`); // Log the file upload path

    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let excelData = [];

    // Parse the uploaded file based on extension
    if (fileExt === '.xlsx') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    } else if (fileExt === '.csv') {
      const csvData = fs.readFileSync(filePath, 'utf-8');
      const csvRows = csvData.split('\n').map(row => row.split(','));
      const headers = csvRows[0];
      excelData = csvRows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i];
        });
        return obj;
      });
    }

    // File is empty or has invalid data
    if (excelData.length === 0) {
      return res.status(BAD_REQUEST).json({ message: 'The uploaded file is empty or does not contain valid data.' });
    }

    // Assume default godownId (can be dynamically assigned or fetched from the file)
    const defaultGodownId = '60f8f7f7f3c5e41c2c6d3d71';  // Replace with actual godown ID or dynamic logic

    // Bulk insert for better performance
    const products = excelData.map(productData => {
      // Validate required fields and collect error details
      let errors = [];
      if (!productData.name) errors.push('Name is required');
      if (!productData.price) errors.push('Price is required');
      if (!productData.quantity) errors.push('Quantity is required');
      if (!productData.location) errors.push('Location is required');

      if (errors.length > 0) {
        failedRows.push({ row: productData, errors });
        return null;  // Skip this row
      }

      // Create product object
      return {
        godownId: productData.godownId || defaultGodownId,  // Assign godownId (can be dynamically fetched or passed)
        name: productData.name,
        code: productData.code || `ITEM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,  // Auto-generate code if missing
        price: productData.price,
        quantity: productData.quantity,
        location: productData.location,
        description: productData.description || '',  // Default empty description if not provided
        condition: productData.condition || 'new',  // Default to "new" if no condition
        total: productData.quantity * productData.price,
      };
    }).filter(product => product !== null);  // Remove null entries (failed rows)

    // Perform bulk insert
    if (products.length > 0) {
      const savedProducts = await GodownProduct.insertMany(products);
      results.push(...savedProducts);
    }

    // Clean up uploaded file after processing
    fs.unlinkSync(filePath); // Delete the uploaded file

    res.status(CREATED).json({
      message: 'Products uploaded successfully',
      data: results.length,
      failedRows: failedRows.length > 0 ? failedRows : null,
    });

  } catch (error) {
    console.error('Error during bulk upload:', error);
    res.status(SERVER_ERROR).json({ error: 'Error during bulk upload', details: error.message });
  }
});

// Other routes remain the same (create, get, update, delete, etc.)

// create order
router.post("/orders", createGodownOrder);

// get all products
router.get("/products", getAllGodownProducts);

// get all orders
router.get("/orders", getAllGodownOrders);

// get product by id
router.get("/products/:id", validateObjectId, getAllGodownProductById);

// get order by id
router.get("/orders/:id", validateObjectId, getAllGodownOrderById);

// update product by id
router.patch("/products/:id", validateObjectId, updateGodownProductById);

// update order by id
router.patch("/orders/:id", validateObjectId, updateGodownOrderById);

// delete product by id
router.delete("/products/:id", validateObjectId, deleteGodownProduct);

// delete product by id
router.delete("/orders/:id", validateObjectId, deleteGodownOrder);

router.post("/inventory-movement", async (req, res) => {
  const { selectedItemId, transferQuantity, origin, destination } = req.body;

  try {
    if (!selectedItemId || !transferQuantity || !origin || !destination) {
      return res.status(BAD_REQUEST).json({ message: "Please fill in all fields." });
    }

    const item = await GodownProduct.findOne({ _id: selectedItemId });
    if (!item) {
      return res.status(BAD_REQUEST).json({ message: "Item not found." });
    }

    if (item.location !== origin) {
      return res.status(BAD_REQUEST).json({ message: "Item is not at the specified origin location." });
    }

    if (transferQuantity > item.quantity) {
      return res.status(BAD_REQUEST).json({ message: "Transfer quantity exceeds available stock." });
    }

    item.quantity -= transferQuantity;
    await item.save();

    let destinationItem = await Inventory.findOne({ location: destination, name: item.name });
    if (!destinationItem) {
      destinationItem = new GodownProduct({
        name: item.name,
        code: item.code,
        quantity: transferQuantity,
        location: destination,
        godownId: item.godownId,  
      });
    } else {
      destinationItem.quantity += transferQuantity;
    }

    await destinationItem.save();

    // Return success message
    res.status(OK).json({
      message: `Successfully transferred ${transferQuantity} ${item.name} from ${origin} to ${destination}`,
      data: {
        item: item.name,
        transferredQuantity: transferQuantity,
        from: origin,
        to: destination,
      },
    });
  } catch (error) {
    console.error("Error during inventory movement:", error);
    res.status(SERVER_ERROR).json({ error: "Error processing the inventory movement.", details: error.message });
  }
});


module.exports = router;
