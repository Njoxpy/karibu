const express = require("express")
const router = express.Router()

const products = [
    {
      id: 1,
      name: "Viazi name",
      price: 23_000,
      quantity: 12,
      description: "High-quality dog food, rich in nutrients."
    },
    {
      id: 2,
      name: "Viazi name",
      price: 23_000,
      quantity: 12,
      description: "High-quality dog food, rich in nutrients."
    },
  ];
  router.get("/", (req, res) => {
    res.json({message: "hello from fresh oil page"});
    console.log(req.query);
    
  });
  
  // GET: Get all products
  router.get("/products", (req, res) => {
    res.json(products);
  });
  
  // GET: Get product by an id
  router.get("/products/:id", (req, res) => {
    res.json({message: "GET product by an id."});
  });
  
  // POST: Add new product
  router.post("/products/bulk-upload", (req, res) => {
    res.json({message: "add new products, POST new product"})
  })
  
  // PATCH: Update product details
  router.patch("/products/:id", (req, res) => {
    res.json({message: "UPDATE product details"})
  })
  
  // POST: search for new order
  router.post("/products/search", (req, res) => {
    res.json({message: "search for products"})
  })
  
  // DELETE: Delete product
  router.delete("/products/:id", (req, res) => {
    res.json({message: "DELETE product by id"})
  })
  
  // GET: get all orders
  router.get("/orders", (req, res) => {
    res.json({message: "GET all orders"})
  })
  
  // GET: Get single order
  router.get("/orders/:id", (req, res) => {
    res.json({message: "GET an order by an id"})
  })
  
  // POST: create new order
  router.post("/orders", (req, res) => {
    res.json({message: "POST new order"})
  })
  
  // DELETE: Delete order by an id
  router.delete("/orders/:id", (req, res) => {
    res.json({message: "DELETE order by an id"})
  })

module.exports = router