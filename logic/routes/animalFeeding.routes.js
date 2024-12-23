const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();

const {
  createAnimalFeedingOrder,
  getAllAnimalFeedingProducts,
  getAnimalFeedingAllOrders,
  getAnimalFeedingProductById,
  getAnimalFeedingOrderById,
  updateAnimalFeedingProduct,
  updateAnimalFeedingOrder,
  deleteAnimalFeedingProductById,
  deleteAnimalFeedingOrderById,
  searchAnimalFeedingProducts,
  searchAnimalFeedingOrders,
} = require("../controllers/animalFeeding.controller");

const validateObjectId = require("../middleware/validateObjectId");
const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

const upload = require("../middleware/uploadAnimalFeeding");

const { validateAnimalFeedingOrder } = require("../middleware/validateOrder");
// const validateProductUpload = require("../middleware/validateProductUpload");
const { CREATED, SERVER_ERROR, BAD_REQUEST } = require("../constants/responseStatusCode");

router.post("/orders", validateAnimalFeedingOrder, createAnimalFeedingOrder);

router.get("/products", getAllAnimalFeedingProducts);

router.get("/products/search", searchAnimalFeedingProducts);

router.get("/orders", getAnimalFeedingAllOrders);

router.get("/orders/search", searchAnimalFeedingOrders);

router.get("/products/:id", validateObjectId, getAnimalFeedingProductById);

router.get("/orders/:id", validateObjectId, getAnimalFeedingOrderById);

router.patch("/products/:id", validateObjectId, updateAnimalFeedingProduct);

router.patch("/orders/:id", validateObjectId, updateAnimalFeedingOrder);

router.delete("/products/:id", validateObjectId, deleteAnimalFeedingProductById);

router.delete("/orders/:id", validateObjectId, deleteAnimalFeedingOrderById);

router.post("/products", upload.single('image'), async (req, res) => {
  try {
    const { name, description, quantity, nutrients, price, total, userId } = req.body;

    // Validate required fields
    if (!name || !description || !quantity || !nutrients || !price || !total || !userId) {
      return res.status(BAD_REQUEST).json({ error: "All fields are required." });
    }

    // Validate that quantity, price, and total are numbers
    if (isNaN(quantity) || isNaN(price) || isNaN(total)) {
      return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be valid numbers." });
    }

    // Validate that quantity, price, and total are greater than zero
    if (quantity <= 0 || price <= 0 || total <= 0) {
      return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
    }

    // Validate userId (e.g., if using JWT or session-based authentication)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    // Optional: validate file if an image is expected
    const image = req.file ? req.file.path : null;

    // Create a new product instance
    const newProduct = new AnimalFeedingProduct({
      name,
      description,
      quantity,
      nutrients,
      image,
      price,
      total,
      userId
    });

    // Save the product to the database
    await newProduct.save();

    // Return success response
    res.status(CREATED).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    // Handle server errors
    console.error(error); // Log the error for debugging
    res.status(SERVER_ERROR).json({ error: error.message });
  }
});

module.exports = router;