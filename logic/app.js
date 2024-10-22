
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// admin routes
const adminRoutes = require("./src/routes/admin/adminRoutes")
// order routes
const orderRoutes = require("./src/routes/orders/orderRoutes")
// receipt routes
const receiptRoutes = require("./src/routes/receipt/receiptRoutes")
// userRoutes
const userRoutes = require("./src/routes/user/userRoutes")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// configure routes
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/receipts", receiptRoutes)
app.use("/api/v1/users", userRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening http://localhost:${process.env.PORT}/`);
})