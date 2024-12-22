// models
const Product = require("../models/stationery/stationeryProductModel");
const Order = require("../models/stationery/stationerOrderModel");

// status code
const { OK, NOT_FOUND, SERVER_ERROR, CREATED } = require("../constants/responseStatusCode");


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

        const products = await StationeryProduct.find(searchQuery);
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

        const orders = await StationeryOrder.find(searchQuery);
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
            return res.json({ message: "There are no products now" });
        }

        res.status(OK).json(products);
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch products", error: error.message });
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
        res.status(SERVER_ERROR).json({ error: "Failed to fetch the product", error: error.message });
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
        const { createdBy, product, name, quantity, price } = req.body;

        const productDetails = await Product.findById(product);
        if (!productDetails) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (productDetails.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient product quantity available" });
        }

        const order = await Order.create({ createdBy, product, name, quantity, price });

        productDetails.quantity -= quantity;
        await productDetails.save();

        res.status(CREATED).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "An error occurred while creating the order", error: error.message });
    }
};

// UPDATE PRODUCT
const updateStationeryProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" });
        }

        res.status(OK).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update product", error: error.message });
    }
};

// UPDATE ORDER
const updateStationeryOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!updatedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" });
        }

        res.status(OK).json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update order", error: error.message });
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
