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
  getGodownOrder,
  updateGodownProductById,
  updateGodownOrderById,
  deleteGodownProduct,
  deleteGodownOrder,
  bulkUploadGodownProducts
} = require("../controllers/godown.controller");

// middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/uploadGodown");

// models
const GodownProduct = require("../models/godown/godownProductModel");
const Inventory = require("../models/godown/inventoryModel")

// response code
const { SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../constants/responseStatusCode");

// create product
router.post("/products", createGodownProduct);

router.post('/products/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Parse data from the Excel sheet
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Validate and save the data
    const newProducts = [];
    for (let row of jsonData) {
      const { name, price, quantity, location, description, userId } = row;

      if (!name || !price || !quantity || !location || !description || !userId) {
        return res.status(BAD_REQUEST).json({ message: "Missing required fields in Excel" });
      }

      if (isNaN(price) || isNaN(quantity)) {
        return res.status(BAD_REQUEST).json({ message: "Price and Quantity must be valid numbers" });
      }

      const newProduct = await GodownProduct.create({
        name,
        price,
        quantity,
        location,
        description,
        userId
      });

      newProducts.push(newProduct);
    }

    // Cleanup the uploaded file (optional)
    fs.unlinkSync(filePath);

    res.status(CREATED).json({ message: `${newProducts.length} products uploaded successfully`, newProducts });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: "Failed to process the Excel file", error: error.message });
  }
});

// bulk upload
router.post("/products", createGodownProduct);

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
router.get("/orders/:id", validateObjectId, getGodownOrder);

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
