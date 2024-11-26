// mongoose
const mongoose = require("mongoose")
// models
const Product = require("../models/productModel")
const Order = require("../models/orderModel")
const User = require("../models/userModel")
// get all products
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find({ category: "animal-feeding" })
        if (product.length === 0) {
            return res.json({ message: "there are no products now" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products", details: error.message })
    }
}

// create product
const createProduct = async (req, res) => {
    const { name, description, quantity, price, userId } = req.body


    try {
        const product = await Product.create({ name, description, quantity, userId, price, category: "animal-feeding" })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// create order
const createOrder = async (req, res) => {
    const { totalPrice, orderId, userId, productName, quantity, status, category } = req.body

    if (totalPrice == null || !userId || !productName || quantity == null) {
        return res.status(400).json({ message: "all fields are required" })
    }

    // validate price
    if (typeof totalPrice !== "number" || totalPrice < 0) {
        return res.status(400).json("Price must be a positive number")
    }

    // validate qouantity
    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json("Quantity must be a none negative number")
    }
    try {
        const order = await Order.create({ totalPrice, orderId, userId, productName, quantity, status, category })
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
        const product = await Product.findOne({ _id: id, category: "animal-feeding" });

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
        const orders = await Order.find({ category: "animal-feeding" })
        if (orders.length === 0) {
            return res.json({ message: "there are no orders now" })
        }
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
        const order = await Order.findOne({ _id: id, category: "animal-feeding" });

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

// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Update the product
        const product = await Product.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // To return the updated document
        );

        // Handle case where product does not exist
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Return the updated product
        res.status(200).json(product);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete product by id
const deleteProductById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Product not found." })
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deleteProductById) {
            res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: `product deleted sucessfully: ${deletedProduct}` })
    } catch (error) {
        res.status(404).json({ message: "failed to fetch product" })
    }
}

// delte order by id
const deleteOrderById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Order not found." })
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deleteProductById) {
            res.status(404).json({ message: "Order not found" })
        }
        res.status(200).json({ message: `order deleted sucessfully: ${deletedProduct}` })
    } catch (error) {
        res.status(404).json({ message: "failed to fetch order" })
    }
}

// search product
const searchProductName = async (req, res) => {
    const { productName } = req.query;

    if (!productName) {
        return res.status(400).json({ error: "Product name is required" });
    }

    try {
        const products = await Product.find({
            name: { $regex: productName, $options: "i" }
        });


        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with that name." });
        }

        res.status(200).json(products);
    } catch (error) {
    }
}


// get order by id
module.exports = {
    getAllProducts,
    createProduct,
    createOrder,
    getAllOrders,
    getProductById,
    getOrderById,
    updateProduct,
    deleteProductById,
    deleteOrderById,
    searchProductName
}

// create for update order by id