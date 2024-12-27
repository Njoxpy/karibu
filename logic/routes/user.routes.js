const express = require("express")
const { loginUser, signupUser, getAllUsers } = require("../controllers/user.controller")
const userRoutes = express.Router()

// login route
userRoutes.post("/login", loginUser)

// signup route
userRoutes.post("/signup", signupUser)

// get all users
userRoutes.get("/", getAllUsers)

module.exports = userRoutes