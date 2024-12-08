const express = require("express");
const multer = require("multer")
const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for storing images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // e.g., image-1597751381573.jpg
  }
});

const upload = multer({ storage: storage });

const { getAllAnimalFeedingProducts, createAnimalFeedingOrder, getAnimalFeedingAllOrders, getAnimalFeedingProductById, getAnimalFeedingOrderById, updateAnimalFeedingProduct, deleteAnimalFeedingProductById, deleteAnimalFeedingOrderById, searchAnimalFeedingProductName, updateAnimalFeedingOrder } = require("../controllers/animalFeeding.controller");
const validateProductFields = require("../middleware/validateProductFields");
const createOrderMiddleware = require("../middleware/createOrderMiddleware")
const Product = require("../models/productModel");

// GET: Get all products
router.get("/products", getAllAnimalFeedingProducts);

// GET: Get product by an id
router.get("/products/:id", getAnimalFeedingProductById);

// POST: Upload new product
router.post("/products/bulk-upload", (req, res) => {
  res.json({ message: "add new products, POST new product" })
})

// add new product
router.post("/products/new", validateProductFields, upload.single("image"), async (req, res) => {
  const { name, description, quantity, price, userId } = req.body;
  const thumbnail_image = req.file ? req.file.filename : null; // Get the filename if an image is uploaded
  try {
    const product = await Product.create({
      name,
      description,
      quantity,
      userId,
      price,
      category: "animal-feeding",
      image: thumbnail_image ? `/uploads/${thumbnail_image}` : null, // Use the uploaded image path, or null if no image
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to add product", error: error.message });
  }
});


// PATCH: Update product details
router.patch("/products/:id", updateAnimalFeedingProduct)

// POST: search for new order
router.get("/products/search", searchAnimalFeedingProductName)

// DELETE: Delete product
router.delete("/products/:id", deleteAnimalFeedingProductById)

// GET: get all orders
router.get("/orders", getAnimalFeedingAllOrders)

// GET: Get single order
router.get("/orders/:id", getAnimalFeedingOrderById)

// UPDATE ORDER
router.patch("/orders/:id", updateAnimalFeedingOrder)

// POST: create new order
router.post("/orders/new", createOrderMiddleware, createAnimalFeedingOrder)

// DELETE: Delete order by an id
router.delete("/orders/:id", deleteAnimalFeedingOrderById)

module.exports = router;
