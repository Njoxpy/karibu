const express = require("express")
const adminRoutes = express.Router()

// Get all orders for admin review.
adminRoutes.get("/orders", (req, res) => {
  res.json("Get all orders for admin review.")
})

// Update the status of an order (e.g., to "Completed").
adminRoutes.patch("/orders/:id", (req, res) => {
  res.json("Update the status of an order (e.g., to Completed")
})
module.exports = adminRoutes;