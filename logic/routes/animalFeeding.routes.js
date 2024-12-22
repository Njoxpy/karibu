const express = require("express");
const router = express.Router();

// Controllers
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
  searchAnimalFeedingProducts, // Added search controller for products
  searchAnimalFeedingOrders,   // Added search controller for orders
} = require("../controllers/animalFeeding.controller");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");
const upload = require("../middleware/upload");

// Models
const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");

// Response codes
const { SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");
const { validateAnimalFeedingOrder } = require("../middleware/validateOrder");

// POST: Create a new animal feeding product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(BAD_REQUEST).json({ error: "No file uploaded" });
    }

    if (!req.body.name || !req.body.description) {
      return res.status(BAD_REQUEST).json({message:"Enter the name and description for product"})
    }

    if (req.body.quantity < 0 || typeof req.body.quantity !== "number" ) {
      return res.status(BAD_REQUEST).json({message:"Quantity should be greater than zero and number"})
    }

    if (req.body.price < 0 || typeof req.body.price !== "number" ) {
      return res.status(BAD_REQUEST).json({message:"Quantity should be greater than zero and number"})
    }

    // find user id if exists

    const newProduct = await AnimalFeedingProduct.create(
      {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        image: req.file.path,
        price: req.body.price,
        userId: req.body.userId,
        total: req.body.quantity * req.body.price,
      }
    )

    res.status(CREATED).json(newProduct);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error saving product", details: error.message });
  }
});

// POST: Create a new animal feeding order
router.post("/orders", validateAnimalFeedingOrder, createAnimalFeedingOrder);

// GET: Get all animal feeding products
router.get("/products", getAllAnimalFeedingProducts);

// GET: Search animal feeding products (added search functionality)
router.get("/products/search", searchAnimalFeedingProducts);

// GET: Get all animal feeding orders
router.get("/orders", getAnimalFeedingAllOrders);

// GET: Search animal feeding orders (added search functionality)
router.get("/orders/search", searchAnimalFeedingOrders);

// GET: Get single animal feeding product by ID
router.get("/products/:id", validateObjectId, getAnimalFeedingProductById);

// GET: Get single animal feeding order by ID
router.get("/orders/:id", validateObjectId, getAnimalFeedingOrderById);

// PATCH: Update animal feeding product details
router.patch("/products/:id", validateObjectId, updateAnimalFeedingProduct);

// PATCH: Update animal feeding order details
router.patch("/orders/:id", validateObjectId, updateAnimalFeedingOrder);

// DELETE: Delete animal feeding product by ID
router.delete("/products/:id", validateObjectId, deleteAnimalFeedingProductById);

// DELETE: Delete animal feeding order by ID
router.delete("/orders/:id", validateObjectId, deleteAnimalFeedingOrderById);

module.exports = router;
