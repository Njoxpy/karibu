// mongoose
const mongoose = require("mongoose")
// models
const Product = require("../models/productModel")
const Order = require("../models/orderModel")
// get all products
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products", detaials: error.message })
    }
}

// create product
const createProduct = async (req, res) => {
    const { name, description, quantity, price, userId } = req.body

    if (!name || !quantity || !price || !userId) {
        return res.status(400).json({ message: "all required fields must be provided" })
    }
    try {
        const product = await Product.create({ name, description, quantity, userId, price })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// create order
const createOrder = async (req, res) => {
    const { totalPrice, orderId, userId, productName, quantity, status } = req.body

    if (!totalPrice || !userId || !productName || !quantity) {
        return res.status(400).json({ message: "all fields are required" })
    }
    try {
        const order = await Order.create({ totalPrice, orderId, userId, productName, quantity, status })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", details: error.message })
    }
}

// get productById
const getProductById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        // Find product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch the product.",
            details: error.message,
        });
    }
};


// get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product orders", details: error.message })
    }
}

// get order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
    }

    try {
        // Find the order by ID
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Return the order if found
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch the order.",
            details: error.message,
        });
    }
};


// get order by id
module.exports = {
    getAllProducts,
    createProduct,
    createOrder,
    getAllOrders,
    getProductById,
    getOrderById
}