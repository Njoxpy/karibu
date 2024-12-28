const mongoose = require("mongoose")

// CRUD
const GodownProduct = require("../models/godown/godownProductModel")
const GodownOrder = require("../models/godown/godownOrderModel")

// response code
const { SERVER_ERROR, CREATED, BAD_REQUEST, OK, NOT_FOUND } = require("../constants/responseStatusCode")

// Create product
const createGodownProduct = async (req, res) => {

    try {
        const { name, price, quantity, location, description, userId } = req.body;

        if (!name || !price || !quantity || !location || !description || !userId) {
            return res.status(BAD_REQUEST).json({ message: "All fields are required" })
        }

        if (isNaN(quantity) || isNaN(price)) {
            return res.status(BAD_REQUEST).json({ error: "Quantity and price must be valid numbers." });
        }

        if (quantity <= 0 || price <= 0) {
            return res.status(BAD_REQUEST).json({ error: "Quantity, price, and total must be greater than zero." });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
        }

        const newItem = await GodownProduct.create({
            name,
            price,
            quantity,
            location,
            description,
            userId
        })

        res.status(CREATED).json(newItem)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create product", error: error.message });
    }
};


// create order
const createGodownOrder = async (req, res) => {

    try {

        const { productId, quantity, userId } = req.body;

        if (quantity == null || !productId || !userId) {
            return res.status(BAD_REQUEST).json({ message: "All fields are required" });
        }

        // fetch product
        const productDetails = await GodownProduct.findById(productId)
        if (!productDetails) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        if (productDetails.quantity < quantity) {
            return res.status(BAD_REQUEST).json({ message: "Insufficient product quantity available" })
        }

        productDetails.quantity -= quantity;
        await productDetails.save();

        const totalPrice = productDetails.price * quantity;

        const newOrder = await GodownOrder.create({
            productId,
            quantity,
            userId,
            totalPrice
        });

        res.status(CREATED).json(newOrder);
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message });
    }
}

// get all products
const getAllGodownProducts = async (req, res) => {

    try {
        const products = await GodownProduct.find().sort({ createdAt: -1 })

        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No products for now" })
        }
        res.status(OK).json(products)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get products", error: error.message });
    }
}

// get all orders
const getAllGodownOrders = async (req, res) => {
    try {
        const orders = await GodownOrder.find().sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "There are no orders for now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

// get product by id
const getAllGodownProductById = async (req, res) => {
    const { id } = req.params

    try {
        const product = await GodownProduct.findOne({ _id: id })

        if (!product) {
            return res.status(NOT_FOUND).json({ message: "Failed to get product" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to get product", error: error.message })
    }
}

// get order by id
const getGodownOrder = async (req, res) => {
    const { id } = req.params

    try {
        const product = await GodownOrder.findOne({ _id: id })

        if (!product) {
            return res.status(NOT_FOUND).json({ message: "Failed to get order" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to get order", error: error.message })
    }
}

// update product by id
const updateGodownProductById = async (req, res) => {
    const { id } = req.params

    try {
        const updatedProduct = await GodownProduct.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json({ message: "updated sucessfully", updatedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to update product", error: error.message })
    }
}

// update order by id
const updateGodownOrderById = async (req, res) => {
    const { id } = req.params

    try {
        const updatedOrder = await GodownOrder.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        if (!updatedOrder) {
            res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json({ message: "updated sucessfully", updatedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to update order", error: error.message })
    }
}

// delete product
const deleteGodownProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deletedProduct = await GodownProduct.findOneAndDelete({ _id: id })

        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ mesage: "Deleted sucessfully", deletedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to delete product", error: error.message })
    }
}

// delete order 
const deleteGodownOrder = async (req, res) => {
    const { id } = req.params

    try {
        const deletedOrder = await GodownOrder.findOneAndDelete({ _id: id })

        if (!deletedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json({ mesage: "Deleted sucessfully", deletedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to delete product", error: error.message })
    }
}

// move godown item functionality
// const moveGodownItem = async (req, res) => {

// }

module.exports = {
    createGodownProduct,
    createGodownOrder,
    getAllGodownProducts,
    getAllGodownOrders,
    getAllGodownProductById,
    getGodownOrder,
    updateGodownProductById,
    updateGodownOrderById,
    deleteGodownProduct,
    deleteGodownOrder
}