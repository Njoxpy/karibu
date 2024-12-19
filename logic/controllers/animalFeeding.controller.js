const mongoose = require("mongoose")
// models
const Product = require("../models/animalFeeding/animalFeedingProductModel")
const Order = require("../models/animalFeeding/animalFeedingOrderModel")
const User = require("../models/userModel")
const { OK, NOT_FOUND, SERVER_ERROR } = require("../constants/responseStatusCode")

// GET ALL PRODUCTS
const getAllAnimalFeedingProducts = async (req, res) => {
    try {
        const product = await Product.find({ category: "animal-feeding" }).sort({ createdAt: -1 })
        if (product.length === 0) {
            return res.json({ message: "there are no products now" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch products", details: error.message })
    }
}

// GET ALL ORDERS
const getAnimalFeedingAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ category: "animal-feeding" }).sort({ createdAt: -1 })
        if (orders.length === 0) {
            return res.json({ message: "there are no orders now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to fetch product orders", details: error.message })
    }
}

// GET PRODUCT BY ID
const getAnimalFeedingProductById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(NOT_FOUND).json({ error: "Invalid product ID" });
    }

    try {
        // Find product by ID
        const product = await Product.findOne({ _id: id, category: "animal-feeding" });

        if (!product) {
            return res.status(NOT_FOUND).json({ error: "Product not found" });
        }
        res.status(OK).json(product);
    } catch (error) {
        res.status(SERVER_ERROR).json({
            error: "Failed to fetch the product.",
            error: error.message,
        });
    }
};

// GET ORDER BY ID
const getAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(NOT_FOUND).json({ error: "Invalid order ID" });
    }

    try {
        // Find the order by ID
        const order = await Order.findOne({ _id: id, category: "animal-feeding" });

        if (!order) {
            return res.status(NOT_FOUND).json({ error: "Order not found" });
        }

        // Return the order if found
        res.status(OK).json(order);
    } catch (error) {
        res.status(SERVER_ERROR).json({
            error: "Failed to fetch the order.",
            details: error.message,
        });
    }
};

// CREATE ORDER
const createAnimalFeedingOrder = async (req, res) => {

    try {
        const order = await Order.create({ totalPrice, orderId, userId, productName, quantity, status, category })
        res.status(OK).json(order)
    } catch (error) {
        res.status(NOT_FOUND).json({ message: "Failed to create order", details: error.message })
    }
}

// UPDATE PRODUCT
const updateAnimalFeedingProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(NOT_FOUND).json({ message: "Product not found." });
        }

        // Update the product
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        // Handle case where product does not exist
        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found." });
        }

        // Return the updated product
        res.status(OK).json({ "updated product": updatedProduct });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// UPDATE ORDER
const updateAnimalFeedingOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(NOT_FOUND).json({ message: "Order not found." });
        }

        // Update the product
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        // Handle case where product does not exist
        if (!updatedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found." });
        }

        // Return the updated product
        res.status(OK).json({ "updated order": updatedOrder });
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
};

// delete product by id
const deleteAnimalFeedingProductById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(NOT_FOUND).json({ message: "Product not found." })
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json({ "product deleted sucessfully": deletedProduct })
    } catch (error) {
        res.status(NOT_FOUND).json({ message: "failed to fetch product" })
    }
}

// delte order by id
const deleteAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(NOT_FOUND).json({ message: "order not found" })
    }
    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: id })
        if (!deletedOrder) {
            res.status(NOT_FOUND).json({ message: "order not found" })
        }
        res.status(OK).json({ "order deleted sucessfully": deletedOrder })
    } catch (error) {
        res.status(NOT_FOUND).json({ message: "failed to get order", error: error.message })
    }
}

// search product
const searchAnimalFeedingProductName = async (req, res) => {
    const { productName } = req.query;

    // Check if the product name query parameter is provided
    if (!productName) {
        return res.status(BAD_REQUEST).json({ error: "Product name is required" });
    }

    try {
        // Search for products with a case-insensitive regex match on the name
        const products = await Product.find({
            name: { $regex: productName, $options: "i" }
        });

        // If no products are found, return a 'not found' response
        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No products found with that name." });
        }

        // Return the found products with an 'OK' status
        res.status(OK).json(products);

    } catch (error) {
        // Handle any unexpected errors during the query process
        console.error('Error searching for products:', error);
        return res.status(INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while searching for products.' });
    }
};

module.exports = {
    getAllAnimalFeedingProducts,
    createAnimalFeedingOrder,
    getAnimalFeedingAllOrders,
    getAnimalFeedingProductById,
    getAnimalFeedingOrderById,
    updateAnimalFeedingProduct,
    deleteAnimalFeedingProductById,
    deleteAnimalFeedingOrderById,
    searchAnimalFeedingProductName,
    updateAnimalFeedingOrder
}