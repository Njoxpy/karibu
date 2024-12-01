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

const { getAllProducts, createOrder, getAllOrders, getProductById, getOrderById, updateProduct, deleteProductById, deleteOrderById, searchProductName, updateOrder } = require("../controllers/animalFeeding.controller");
const validateProductFields = require("../middleware/validateProductFields");
const Product = require("../models/productModel");

// GET: Get all products
router.get("/products", getAllProducts);

// GET: Get product by an id
router.get("/products/:id", getProductById);

// POST: Upload new product
router.post("/products/bulk-upload", (req, res) => {
  res.json({ message: "add new products, POST new product" })
})

// add new product
router.post("/products/new", validateProductFields, upload.single("image"), async (req, res) => {
  const { name, description, quantity, price, userId, image } = req.body
  const thumbnail_image = req.file ? req.file.filename : null; // The image file name from Multer
  try {
    const product = await Product.create({
      name, description, quantity, userId, price, image, category: "animal-feeding", image: `/uploads/${thumbnail_image}`, // Store the image path in the database (relative to the public folder)
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: "failed to add product", error: error.message })
  }
})

// PATCH: Update product details
router.patch("/products/:id", updateProduct)

// POST: search for new order
router.post("/products/search", searchProductName)

// DELETE: Delete product
router.delete("/products/:id", deleteProductById)

// GET: get all orders
router.get("/orders", getAllOrders)

// GET: Get single order
router.get("/orders/:id", getOrderById)

// UPDATE ORDER
router.patch("/orders/:id", updateOrder)

// POST: create new order
router.post("/orders/new", createOrder)

// DELETE: Delete order by an id
router.delete("/orders/:id", deleteOrderById)

module.exports = router;
