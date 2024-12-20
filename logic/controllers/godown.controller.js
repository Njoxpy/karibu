// CRUD
const GodownProduct = require("../models/godown/godownProductModel")
const GodownOrder = require("../models/godown/godownOrderModel")
const { SERVER_ERROR, CREATED, BAD_REQUEST, OK, NOT_FOUND } = require("../constants/responseStatusCode")
const mongoose = require("mongoose")

// Create product
const createGodownProduct = async (req, res) => {

    const { godownId, name, code, price, quantity, location, description } = req.body

    if (!name || !code || price == null || quantity == null || !location || !description) {
        return res.json({ message: "fill all required fields" })
    }

    try {
        const newProduct = await GodownProduct.create({
            godownId,
            name,
            code,
            price,
            quantity,
            location,
            description
        })

        res.status(CREATED).json(newProduct)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "failed to create product", error: error.message })
    }
}


// create order
const createGodownOrder = async (req, res) => {
    const { productId, quantity, price, status, name, customerId } = req.body;

    if (quantity == null || price == null || !productId || !name || !customerId) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" });
    }

    try {
        const newOrder = await GodownOrder.create({
            productId,
            quantity,
            price,
            status,
            name,
            customerId
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
            return res.json({ message: "not products for now" })
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
            return res.json({ message: "There are no orders for now" })
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
const getAllGodownOrderById = async (req, res) => {
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
const moveGodownItem = async (req, res) => {

}

module.exports = {
    createGodownProduct,
    createGodownOrder,
    getAllGodownProducts,
    getAllGodownOrders,
    getAllGodownProductById,
    getAllGodownOrderById,
    updateGodownProductById,
    updateGodownOrderById,
    deleteGodownProduct,
    deleteGodownOrder
}