const express = require("express")
const userRoutes = express.Router()

// model
const User = require("../models/userModel")
const { login, signup } = require("../controllers/user.controller")

userRoutes.post("/login", login)

userRoutes.post("/signup", signup)

module.exports = userRoutes;