const express = require("express");

// controller
const {
  createOrder,
  getPrintingOrders,
  getSinglePrintingOrder,
  updatePrintingOrder,
  deletePrintingOrder,
  updateOrderStatus,
  getRevenue,
  getTotalCostByDate,
} = require("../controllers/printing.controller");

// router
const router = express.Router();

// middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const validatePrintingOrder = require("../middleware/printing/validatePrintingOrder");

// create
router.post(
  "/orders",
  // authenticate,
  // checkCategory(["printing", "admin"]),
  // checkPermissions(["createOrder"]),
  validatePrintingOrder,
  createOrder
);

// get all orders
router.get(
  "/orders",
  authenticate,
  checkCategory(["printing", "admin"]),
  getPrintingOrders
);

// get single order
router.get(
  "/orders/:id",
  authenticate,
  checkCategory(["printing", "admin"]),
  validateObjectId,
  getSinglePrintingOrder
);

// update order
router.patch(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["updateOrder"]),
  updatePrintingOrder
);

// delete order
router.delete(
  "/orders/:id",
  authenticate,
  checkCategory(["admin"]),
  validateObjectId,
  checkPermissions(["deleteOrder"]),
  deletePrintingOrder
);

// update order status
router.put(
  "/orders/:id/status",
  authenticate,
  checkCategory(["printing", "admin"]),
  checkPermissions(["updateOrderStatus"]),
  validateObjectId,
  updateOrderStatus
);

router.get("/revenue", authenticate, checkCategory(["admin"]), getRevenue);

router.get(
  "/total-orders",
  authenticate,
  checkCategory(["admin"]),
  getTotalCostByDate
);

module.exports = router;
