const express = require("express")
const receiptRoutes = express.Router()

// post receipts
receiptRoutes.post("/", (req, res) => {
  res.json("generate new receipt after order is submitted")
})

// get receipts by id
receiptRoutes.get("/:id", (req, res) => {
  res.json("Retrieve a specific receipt by order ID.")
})

module.exports = receiptRoutes;