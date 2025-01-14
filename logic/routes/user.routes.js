const express = require("express");
const {
  loginUser,
  signupUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Import middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const userRoutes = express.Router();

// Public route - login remains accessible to all
userRoutes.post("/login", loginUser);

// Protected routes - admin only
userRoutes.post(
  "/signup",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["createUser"]),
  signupUser
);

userRoutes.get(
  "/",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["viewUsers"]),
  getAllUsers
);

userRoutes.get(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["viewUsers"]),
  validateObjectId,
  getUserById
);

userRoutes.put(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["updateUser"]),
  updateUser
);

userRoutes.delete(
  "/:id",
  authenticate,
  checkCategory(["admin"]),
  checkPermissions(["deleteUser"]),
  deleteUser
);

module.exports = userRoutes;
