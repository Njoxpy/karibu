// models
const StationeryProduct = require("../models/stationery/stationeryProductModel")
const StationeryOrder = require("../models/stationery/stationerOrderModel")


// status code
const { OK, SERVER_ERROR, CREATED, NOT_FOUND } = require("../constants/responseStatusCode")

const createStationeryProduct = async (req, res) => {

    const { name, description, quantity, price, userId, image } = req.body

    // validate

    try {
        const product = await StationeryProduct.create({ name, description, quantity, price, userId, image })
        res.status(CREATED).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create product", error: error.message })
    }
}

const createStationeryOrder = async (req, res) => {

    const { price, status, orderId, userId, name, quantity } = req.body
    // validate

    try {
        const order = await StationeryOrder.create({ price, status, orderId, userId, name, quantity })
        res.status(CREATED).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message })
    }
}


const getAllStationeryProducts = async (req, res) => {
    try {
        const products = await StationeryProduct.find().sort({ createdAt: -1 })

        if (products.length === 0) {
            return res.json({ message: "No products for now" })
        }

        res.status(OK).json(products)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get products", error: error.message })
    }
}

const getAllStationeryOrders = async (req, res) => {
    try {
        const orders = await StationeryOrder.find().sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.json({ message: "No orders for now" })
        }

        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

const getStationeryProduct = async (req, res) => {
    const { id } = req.params

    try {

        const product = await StationeryProduct.findOne({ _id: id })

        if (!product) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get product", error: error.message })
    }
}

const getStationeryOrder = async (req, res) => {
    const { id } = req.params

    try {

        const order = await StationeryOrder.findOne({ _id: id })

        if (!order) {
            return res.status(NOT_FOUND).json({ message: "order not found" })
        }

        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }
}

const updateStationeryProduct = async (req, res) => {

    const { id } = req.params

    try {

        const updatedProduct = await StationeryProduct.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Updated sucessfully", updatedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update product", error: error.messa })
    }
}

const updateStationeryOrder = async (req, res) => {

    const { id } = req.params

    try {
        const updatedOrder = await StationeryOrder.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json({ message: "Updated sucessfully", updatedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update order", error: error.messa })
    }
}

const deleteStationeryProduct = async (req, res) => {

    const { id } = req.params

    try {
        const deletedProduct = await StationeryProduct.findOneAndDelete({ _id: id })

        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Deleted sucessfully", deletedProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message })
    }
}

const deleteStationeryOrder = async (req, res) => {
    const { id } = req.params

    try {

        const deletedOrder = await StationeryOrder.findOneAndDelete({ _id: id })

        if (!deletedOrder) {
            return res.status(NOT_FOUND).json({ message: "Not found" })
        }

        res.status(OK).json({ message: "Delete sucessfully", deletedOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete order", error: error.message })
    }
}

module.exports = {
    createStationeryProduct,
    createStationeryOrder,
    getAllStationeryProducts,
    getStationeryProduct,
    getAllStationeryOrders,
    getStationeryOrder,
    updateStationeryProduct,
    updateStationeryOrder,
    deleteStationeryProduct,
    deleteStationeryOrder
}