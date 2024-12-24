// response code
const { SERVER_ERROR, BAD_REQUEST, CREATED, NOT_FOUND, OK } = require("../constants/responseStatusCode")

// Hardware Models
const Product = require("../models/hardware/productModel")
const Order = require("../models/hardware/orderModel")

const searchHardwareProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice } = req.query;

    try {
        let searchQuery = {};

        if (name) {
            searchQuery.name = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        if (description) {
            searchQuery.description = { $regex: description, $options: "i" }; // Case-insensitive search
        }

        if (minPrice && maxPrice) {
            searchQuery.price = { $gte: minPrice, $lte: maxPrice }; // Price range search
        }

        const products = await Product.find(searchQuery);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error searching products", details: error.message });
    }
};

// Search hardware orders by orderId, status, or userId
const searchHardwareOrders = async (req, res) => {
    const { orderId, status, userId } = req.query;

    try {
        let searchQuery = {};

        if (orderId) {
            searchQuery._id = orderId; // Search by orderId (MongoDB's ObjectId)
        }

        if (status) {
            searchQuery.status = status; // Filter by order status (e.g., "pending", "shipped", "delivered")
        }

        if (userId) {
            searchQuery.userId = userId; // Filter by userId
        }

        const orders = await Order.find(searchQuery);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error searching orders", details: error.message });
    }
};

// CREATE PRODUCT
const createHardwareProduct = async (req, res) => {
    const { productId, quantity, price, status, name, customerId } = req.body

    try {
        const newProduct = await Product.create({
            productId,
            quantity,
            price,
            status,
            name,
            customerId
        })
        res.status(CREATED).json(newProduct)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create hardware product", error: error.message })
    }
}

// CREATE ORDER
const createHardwareOrder = async (req, res) => {
    const { productId, quantity, price, status, name, customerId } = req.body

    if (!quantity || !price || !productId || !name || !customerId) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" })
    }

    try {
        const newOrder = await Order.create({
            productId,
            quantity,
            price,
            status,
            name,
            customerId
        })
        res.status(CREATED).json(newOrder)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create hardware order", error: error.message })
    }
}

// GET ALL PRODUCTS
const getAllHardwareProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No products found" })
        }
        res.status(OK).json(products)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get products", error: error.message })
    }
}

// GET ALL ORDERS
const getAllHardwareOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No orders found" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

// GET PRODUCT BY ID
const getSingleHardwareProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get product", error: error.message })
    }
}

// GET ORDER BY ID
const getSingleHardwareOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findOne({ _id: id })
        if (!order) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }
}

// UPDATE PRODUCT
const updateHardwareProduct = async (req, res) => {
    const { id } = req.params
    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json({ message: "Updated successfully", updatedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update product", error: error.message })
    }
}

// UPDATE ORDER
const updateHardwareOrder = async (req, res) => {
    const { id } = req.params
    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        if (!updatedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json({ message: "Updated successfully", updatedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update order", error: error.message })
    }
}

// DELETE PRODUCT
const deleteHardwareProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: id })
        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json({ message: "Deleted successfully", deletedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message })
    }
}

// DELETE ORDER
const deleteHardwareOrder = async (req, res) => {
    const { id } = req.params
    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: id })
        if (!deletedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json({ message: "Deleted successfully", deletedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete order", error: error.message })
    }
}

module.exports = {
    createHardwareProduct,
    createHardwareOrder,
    getAllHardwareProducts,
    getAllHardwareOrders,
    getSingleHardwareProduct,
    getSingleHardwareOrder,
    updateHardwareProduct,
    updateHardwareOrder,
    deleteHardwareProduct,
    deleteHardwareOrder,
    searchHardwareProducts,
    searchHardwareOrders
}
