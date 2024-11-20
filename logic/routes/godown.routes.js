const express = require("express")
const router = express.Router()

// get all products
router.get("/products", (req, res) => {
    res.json({ message: "get all products" })
})

// get products by id

// delete product by id

// get all orders

// get order by id

// move item

/*
before moving item
- check if the item is available.
- check quantity.
*/

module.exports = router