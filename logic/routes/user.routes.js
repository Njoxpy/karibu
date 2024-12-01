const express = require("express")
const { loginUser, signupUser } = require("../controllers/user.controller")
const userRoutes = express.Router()

// login route
userRoutes.post("/login", loginUser)

// signup route
userRoutes.post("/signup", signupUser)

module.exports = userRoutes