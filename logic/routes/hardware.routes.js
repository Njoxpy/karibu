const express = require("express");
const router = express.Router();
const hardwareController = require("../controllers/hardware.controller");

// Import middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

// Product Routes
router.post(
  "/products", 
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createProduct"]),
  hardwareController.createHardwareProduct
);

router.get(
  "/products", 
  authenticate,
  checkCategory(["hardware", "admin"]),
  hardwareController.getAllHardwareProducts
);

router.get(
  "/products/:id", 
  authenticate,
  checkCategory(["hardware", "admin"]),
  validateObjectId,
  hardwareController.getHardwareProductById
);

router.patch(
  "/products/:id", 
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateProduct"]),
  hardwareController.updateHardwareProductById
);

router.delete(
  "/products/:id", 
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteProduct"]),
  hardwareController.deleteHardwareProductById
);

// Order Routes
router.post(
  "/orders", 
  authenticate,
  checkCategory(["hardware", "admin"]),
  checkPermissions(["createOrder"]),
  hardwareController.createHardwareOrder
);

router.get(
  "/orders", 
  authenticate,
  checkCategory(["hardware", "admin"]),
  hardwareController.getAllHardwareOrders
);

router.get(
  "/orders/:id", 
  authenticate,
  checkCategory(["hardware", "admin"]),
  validateObjectId,
  hardwareController.getHardwareOrderById
);

router.patch(
  "/orders/:id", 
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  hardwareController.updateHardwareOrderById
);

router.delete(
  "/orders/:id", 
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  hardwareController.deleteHardwareOrderById
);

module.exports = router;