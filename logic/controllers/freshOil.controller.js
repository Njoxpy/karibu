const Product = require("../models/productModel")
const Order = require("../models/orderModel")
const { OK, NOT_FOUND, SERVER_ERROR } = require("../constants/responseStatusCode")

// get all product
const getAllProducts = async (req, res) => {

    try {
        const product = await Product.find({ category: "fresh-oil" })
        if (product.length === 0) {
            return res.json({ message: "There are no products for now!" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "product not found" })
    }
}

// get product by id


// get all orders
const getAllFreshOilOrders = async (req, res) => {
    try {
        const orders = await Order.find()

        if (orders.length === 0) {
            return res.json({ message: "there are no orders for now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch products", details: error.message })
    }
}

// create product
const createFreshOilProduct = async (req, res) => {
    const { name, description, quantity, price, userId } = req.body

    if (!name || !quantity || !price || !userId) {
        return res.status(NOT_FOUND).json({ message: "all required fields must be provided" })
    }

    try {
        const product = await Product.create({ name, description, quantity, price, userId })
        res.status(OK).json(product)

    } catch (error) {
        res.status(NOT_FOUND).json(error.message)
    }
}

// create order
const createFreshOilOrder = async (req, res) => {
    const { totalPrice, orderId, userId, productName, quantity, status } = req.body

    if (!totalPrice || !userId || !productName || !quantity) {
        return res.status(NOT_FOUND).json({ message: "all fields are required" })
    }
    try {
        const order = await Order.create({ totalPrice, orderId, userId, productName, quantity, status })
        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", details: error.message })
    }
}


module.exports = {
    getAllProducts,
    getAllFreshOilOrders,
    createFreshOilProduct,
    createFreshOilOrder
}