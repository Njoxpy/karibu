const express = require("express")
const orderRoutes = express.Router()

// create new order
orderRoutes.post("/", (req, res) => {
  res.json({ "description": "Order description", "price": "Order price", "userId": "User ID" })

  console.log(res.statusMessage);
})

// Retrieve all orders (for admin view).
orderRoutes.get("/", (req, res) => {
  res.json("retrieve all orders for admin view")
})

// Retrieve a specific order by ID.
orderRoutes.get("/:id", (req, res) => {
  res.json("Retrieve a specific order by ID.")
})

// Update an existing order by ID.
orderRoutes.put("/:id", (req, res) => {
  res.json("Update an existing order by ID.")
})

// Delete an order by ID.
orderRoutes.delete("/:id", (req, res) => {
  res.json("Delete an order by ID.")
})

module.exports = orderRoutes;