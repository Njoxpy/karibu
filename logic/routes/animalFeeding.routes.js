const express = require("express");
const router = express.Router();

// middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

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
  getTotalCostByDate,
  getAvailableProducts,
  getRevenue,
  searchAnimalFeedingOrders,
  getAnimalFeedingReporort,
} = require("../controllers/animalFeeding.controller");

const upload = require("../middleware/uploadAnimalFeeding");

const AnimalFeedingProductProduct = require("../models/animalFeeding/animalFeedingProductModel");

router.get(
  "/products",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAllAnimalFeedingProducts,
);

router.get(
  "/products/search",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  searchAnimalFeedingProducts,
);

router.get(
  "/orders/search",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  searchAnimalFeedingOrders,
);

router.get(
  "/products/:id",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  validateObjectId,
  getAnimalFeedingProductById,
);

router.post(
  "/products",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, quantity, nutrients, price } = req.body;

      const userId = req.user && req.user._id;

      if (!name || !description || !quantity || !nutrients || !price) {
        return res
          .status(400)
          .json({ message: "All fields are required except userId" });
      }

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof nutrients !== "string"
      ) {
        return res.status(400).json({
          message: "Name, description, and nutrients must be strings",
        });
      }

      if (description.length > 500) {
        return res.status(400).json({ message: "Description is too long" });
      }

      if (isNaN(quantity) || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be a positive number" });
      }

      if (isNaN(price) || price <= 0) {
        return res
          .status(400)
          .json({ message: "Price must be a positive number" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const imagePath = req.file.path;

      const imageUrl = `/uploads/${req.file.filename}`;

      const newProduct = {
        name,
        description,
        quantity,
        nutrients,
        price,
        userId,
        image: imageUrl,
      };

      const product = await AnimalFeedingProductProduct.create(newProduct);

      res.status(201).json({
        message: "Product created successfully",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error, please try again later." });
    }
  },
);

router.put(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  updateAnimalFeedingProduct,
);

router.delete(
  "/products/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  deleteAnimalFeedingProductById,
);

router.post(
  "/orders",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  createAnimalFeedingOrder,
);

router.get(
  "/orders",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAnimalFeedingAllOrders,
);

router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  validateObjectId,
  getAnimalFeedingOrderById,
);

router.put(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updateAnimalFeedingOrder,
);

router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  deleteAnimalFeedingOrderById,
);

router.get(
  "/available-products",
  authenticate,
  checkCategory(["animal-feeding", "admin"]),
  getAvailableProducts,
);

router.get("/revenue", authenticate, checkCategory(["admin"]), getRevenue);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]),
  getTotalCostByDate,
);

router.get(
  "/reports",
  authenticate,
  checkCategory(["admin"]),
  getAnimalFeedingReporort,
);

module.exports = router;
