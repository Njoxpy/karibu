const express = require("express");
const { loginUser, signupUser, getAllUsers } = require("../controllers/user.controller");

// Import middleware
const authenticate = require("../middleware/auth/authenticate");
const checkCategory = require("../middleware/auth/checkCategory");
const checkPermissions = require("../middleware/auth/permissionMiddleware");

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

module.exports = userRoutes;