// models
const Product = require("../models/stationery/stationeryProductModel");
const Order = require("../models/stationery/stationerOrderModel");

// status code
const { OK, NOT_FOUND, SERVER_ERROR, CREATED, BAD_REQUEST } = require("../constants/responseStatusCode");
const StationeryProduct = require("../models/stationery/stationeryProductModel");
const StationeryOrder = require("../models/stationery/stationerOrderModel");


const searchStationeryProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice } = req.query;

    try {
        let searchQuery = {};

        if (name) {
            searchQuery.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
        }

        if (description) {
            searchQuery.description = { $regex: description, $options: "i" }; // Case-insensitive search for description
        }

        if (minPrice && maxPrice) {
            searchQuery.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
        }

        const products = await Product.find(searchQuery);
        res.status(200).json(products);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Error searching products", details: error.message });
    }
};

// Search stationery orders by orderId, status, or userId
const searchStationeryOrders = async (req, res) => {
    const { orderId, status, userId } = req.query;

    try {
        let searchQuery = {};

        if (orderId) {
            searchQuery._id = orderId; // Search by orderId (MongoDB's ObjectId)
        }

        if (status) {
            searchQuery.status = status; // Filter orders by status (e.g., "pending", "shipped", etc.)
        }

        if (userId) {
            searchQuery.userId = userId; // Filter orders by userId
        }

        const orders = await Order.find(searchQuery);
        res.status(200).json(orders);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Error searching orders", details: error.message });
    }
};

// GET ALL PRODUCTS
const getAllStationeryProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "There are no products now" });
        }

        res.status(OK).json(products);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch products", details: error.message });
    }
};

// GET ALL ORDERS
const getAllStationeryOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        if (orders.length === 0) {
            return res.json({ message: "There are no orders now" });
        }

        res.status(OK).json(orders);
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to fetch orders", error: error.message });
    }
};

// GET PRODUCT BY ID
const getStationeryProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.status(NOT_FOUND).json({ error: "Product not found" });
        }

        res.status(OK).json(product);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch the product", details: error.message });
    }
};

// GET ORDER BY ID
const getStationeryOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            return res.status(NOT_FOUND).json({ message: "Order not found" });
        }

        res.status(OK).json(order);
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to fetch order", error: error.message });
    }
};

// CREATE ORDER
const createStationeryOrder = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;

        // Check if all fields are provided
        if (!productId || !quantity || !userId) {
            return res.status(BAD_REQUEST).json({ message: "All fields are required" });
        }

        if (!productId) {
            return res.status(BAD_REQUEST).json({ message: "Product ID is required" });
        }
        if (!quantity) {
            return res.status(BAD_REQUEST).json({ message: "Quantity is required" });
        }
        if (!userId) {
            return res.status(BAD_REQUEST).json({ message: "User ID is required" });
        }

        // Fetch the product from the database
        const product = await StationeryProduct.findById(productId);
        if (!product) {
            return res.status(NOT_FOUND).json({ error: "Product not found" });
        }

        // Check if there's enough stock
        if (product.quantity < quantity) {
            return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
        }

        const price = product.price;

        // Create the order
        const order = await StationeryOrder.create({
            productId,
            quantity,
            price,  // Ensure price is passed
            total: quantity * price,
            userId
        });

        // Update the product stock
        product.quantity -= quantity;
        await product.save();

        // Return response
        if (!res.headersSent) {
            return res.status(201).json({ message: "Order created successfully", order });
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "An error occurred while creating the order", error: error.message });
        }
    }
};

// UPDATE PRODUCT
const updateStationeryProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const { price, quantity } = req.body;

        if (price <= 0) {
            return res.status(BAD_REQUEST).json({ message: "Price or should not be zero" })
        }

        if (quantity < 0) {
            return res.status(BAD_REQUEST).json({ message: "Price cannot be negative" });

        }

        const updates = req.body;

        const product = await StationeryProduct.findById(id);

        if (!product) {
            return res.status(BAD_REQUEST).json({ message: "Product not found" })
        }

        if (quantity === 0) {
            product.condition = "Out of Stock"; 
        }

        Object.keys(updates).forEach((key) => {
            product[key] = updates[key];
        })

        await product.save();

        res.status(OK).json({ message: "Updated sucessfully", product })
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Server error", details: error.message });
        }
    }
};


// UPDATE ORDER
const updateStationeryOrder = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Find the existing order
        const order = await StationeryOrder.findById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Find the product associated with the order
        const product = await StationeryProduct.findById(order.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the new quantity is valid (considering the original quantity in stock)
        const updatedStock = product.quantity + order.quantity - quantity; // Adjust stock based on old order quantity
        if (updatedStock < 0) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // Update the product stock
        product.quantity = updatedStock;
        await product.save();

        // Update order details
        order.quantity = quantity;
        order.total = quantity * product.price; // Recalculate the total based on the current product price
        await order.save();

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE PRODUCT BY ID
const deleteStationeryProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" });
        }

        res.status(OK).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message });
    }
};

// DELETE ORDER BY ID
const deleteStationeryOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" });
        }

        res.status(OK).json({ message: "Order deleted successfully", deletedOrder });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete order", error: error.message });
    }
};

module.exports = {
    getAllStationeryProducts,
    createStationeryOrder,
    getAllStationeryOrders,
    getStationeryProduct,
    getStationeryOrder,
    updateStationeryProduct,
    deleteStationeryProduct,
    deleteStationeryOrder,
    updateStationeryOrder,
    searchStationeryOrders,
    searchStationeryProducts
};
