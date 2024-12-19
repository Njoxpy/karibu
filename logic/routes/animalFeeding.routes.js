const express = require("express");
const multer = require("multer")
const parser = require("csv-parser")
const fs = require("fs")
const router = express.Router();

// const results
const results = []

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

// controllers
const { getAllAnimalFeedingProducts, createAnimalFeedingOrder, getAnimalFeedingAllOrders, getAnimalFeedingProductById, getAnimalFeedingOrderById, updateAnimalFeedingProduct, deleteAnimalFeedingProductById, deleteAnimalFeedingOrderById, searchAnimalFeedingProductName, updateAnimalFeedingOrder } = require("../controllers/animalFeeding.controller");

// middleware
const validateProductFields = require("../middleware/validateProductFields");
const createOrderMiddleware = require("../middleware/createOrderMiddleware")

// model
const Product = require("../models/animalFeeding/animalFeedingProductModel");

// middleware
const validateObjectId = require("../middleware/validateObjectId");

// GET: Get all products
router.get("/products", getAllAnimalFeedingProducts);

// GET: Get product by an id
router.get("/products/:id", getAnimalFeedingProductById);

// POST: Upload new product
router.post("/products/bulk-upload", upload.single("file"), async (req, res) => {

  fs.createReadStream("mauzo.xlsx")
    .on("data", (data) => {
      results.push(data)
    })
    .on("error", (err) => {
      console.log(err)
    })
    .on("end", () => {
      console.log(results);
      console.log("well done!");
    })
  res.json({ message: "add new products, POST new product" })
})


// add new product
router.post("/products/", upload.single("image"), async (req, res) => {
  const { name, description, quantity, price, userId } = req.body;
  const image = req.file;
  const thumbnail_image = image ? image.filename : null;

  if (!name || quantity == null || price == null || !userId || !image) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }


  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const priceNumber = Number(price);
  if (isNaN(priceNumber) || priceNumber < 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  const quantityNumber = Number(quantity);
  if (isNaN(quantityNumber) || quantityNumber < 0) {
    return res.status(400).json({ message: "Quantity must be a non-negative number" });
  }

  if (!image || !image.mimetype.startsWith('image/')) {
    return res.status(400).json({ message: "A valid image must be uploaded" });
  }

  try {
    const product = await Product.create({
      name,
      description,
      quantity,
      userId,
      price: priceNumber,
      category: "animal-feeding",
      image: thumbnail_image ? `/uploads/${thumbnail_image}` : null,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to add product", error: error.message });
  }
});


// PATCH: Update product details
router.patch("/products/:id", validateObjectId, updateAnimalFeedingProduct)

// POST: search for new order
router.get("/products/search", searchAnimalFeedingProductName)

// DELETE: Delete product
router.delete("/products/:id", validateObjectId, deleteAnimalFeedingProductById)

// GET: get all orders
router.get("/orders", getAnimalFeedingAllOrders)

// GET: Get single order
router.get("/orders/:id", validateObjectId, getAnimalFeedingOrderById)

// UPDATE ORDER
router.patch("/orders/:id", validateObjectId, updateAnimalFeedingOrder)

// POST: create new order
router.post("/orders", createOrderMiddleware, createAnimalFeedingOrder)

// DELETE: Delete order by an id
router.delete("/orders/:id", validateObjectId, deleteAnimalFeedingOrderById)

module.exports = router;
