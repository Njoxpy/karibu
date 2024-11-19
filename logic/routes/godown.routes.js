const express = require("express")
const router = express.Router()

// get all products
router.get("/products", (req, res) => {
    res.json({ message: "get all products" })
})

module.exports = router