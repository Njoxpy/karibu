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
    const { name, description, quantity, nutrients, price,  total } = req.body;

    // Validate required fields
    if (!name || !description || !quantity || !nutrients || !price  || !total) {
      return res.status(BAD_REQUEST).json({ error: "All fields are required." });
    }

    // Validate quantity, price, and total should be numbers
    if (isNaN(quantity) || isNaN(price) || isNaN(total)) {
      return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be valid numbers." });
    }

    // Validate that quantity, price, and total are greater than zero
    if (quantity <= 0 || price <= 0 || total <= 0) {
      return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
    }

    // Validate userId is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    // }

    const image = req.file ? req.file.path : null;

    // Create and save the product
    const newProduct = new AnimalFeedingProduct({
      name,
      description,
      quantity,
      nutrients,
      image,
      price,
      total
    });

    await newProduct.save();

    // Return response with created status
    res.status(CREATED).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    // Handle server errors
    res.status(SERVER_ERROR).json({ error: error.message });
  }
});

module.exports = router;