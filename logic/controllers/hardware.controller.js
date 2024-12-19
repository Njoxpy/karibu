// response code
const { SERVER_ERROR, BAD_REQUEST, CREATED, NOT_FOUND, OK } = require("../constants/responseStatusCode")

// create hardware product
const HardwareOrder = require("../models/hardware/orderModel")
const HardwareProduct = require("../models/hardware/productModel")

// create hardware product
const createHardwareProduct = async (req, res) => {

    const { price, status, orderId, userId, name, quantity } = req.params

    try {
        const newOrder = await HardwareProduct.create({
            productId,
            quantity,
            price,
            status,
            name,
            customerId
        })
        res.status(CREATED).json(newOrder)
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to create hardware product" })
    }
}

// create hardware order
const createHardwareOrder = async (req, res) => {

    const { productId, quantity, price, status, name, customerId } = req.params

    if (quantity == null || price == null || !productId || !name || !customerId) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" });
    }

    try {
        const newOrder = await HardwareOrder.create({
            productId,
            quantity,
            price,
            status,
            name,
            customerId
        })
        res.status(CREATED).json(newOrder)
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to create hardware order" })
    }
}

// get all products
const getAllHardwareProducts = async (req, res) => {
    try {
        const products = await HardwareProduct.find()

        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No products found" })
        }

        res.status(OK).json(products)
    }
    catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to get products" })
    }
}

// get all orders
const getAllHardwareOrders = async (req, res) => {
    try {
        const orders = await HardwareOrder.find()

        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No orders found" })
        }

        res.status(OK).json(orders)
    }
    catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to get orders" })
    }
}

// get product by id
const getSingleHardwareProduct = async (req, res) => {

    const { id } = req.params

    try {
        const product = await HardwareProduct.findOne({ _id: id })
        if (!product) {
            return res.status(NOT_FOUND).json({ message: "product not found" })
        }
        res.status(OK).json(product)
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to get product" })
    }
}

// get single order by id
const getSingleHardwareOrder = async (req, res) => {

    const { id } = req.params

    try {
        const order = await HardwareOrder.findOne({ _id: id })
        if (!order) {
            return res.status(NOT_FOUND).json({ message: "order not found" })
        }
        res.status(OK).json(order)
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to get order" })
    }
}

// update product
const updateHardwareProduct = async (req, res) => {
    const { id } = req.params

    try {
        const updatedProduct = await HardwareProduct.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }
        res.status(OK).json({ message: "Update sucessfully", updatedProduct })
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to update product" })
    }
}

// update order
const updateHardwareOrder = async (req, res) => {
    const { id } = req.params

    try {
        const updateHardwareOrder = await HardwareOrder.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updateHardwareOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }
        res.status(OK).json({ message: "Update sucessfully", updateHardwareOrder })
    } catch (error) {
        res.staus(SERVER_ERROR).json({ message: "Failed to update order" })
    }
}

// delete product
const deleteHardwareProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deletedHardwareProduct = await HardwareProduct.findOneAndDelete({ _id: id })

        if (!deletedHardwareProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Deleted sucessfully", deletedHardwareProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message })
    }
}

// delete order
const deleteHardwareOrder = async (req, res) => {
    const { id } = req.params

    try {
        const deletedHardwareOrder = await HardwareOrder.findOneAndDelete({ _id: id })

        if (!deletedHardwareOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json({ message: "Deleted sucessfully", deletedHardwareOrder })
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
    deleteHardwareOrder
}