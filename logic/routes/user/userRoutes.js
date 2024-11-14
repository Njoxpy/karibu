const express = require("express")
const userRoutes = express.Router()

// model
const User = require("../../models/userModel")

// register user
userRoutes.post("/auth/register",async (req, res) => {

  const {email, password, username} = req.body();
  try {
    const user = await User.create({email, password, username})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  res.json("add new user")
})

// authenticate user to login
userRoutes.post("/auth/login", (req, res) => {
  res.json("login")
})

// get user details by id
userRoutes.get("/:id", (req, res) => {
  res.json("get user details by id")
})

module.exports =userRoutes;