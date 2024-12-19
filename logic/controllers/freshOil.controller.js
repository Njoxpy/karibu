// models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel")
const FreshOilOrder = require("../models/freshOil/freshOilOrderModel")

// middleware
const { SERVER_ERROR, CREATED, BAD_REQUEST, OK, NOT_FOUND } = require("../constants/responseStatusCode")

// create product
const createFreshOilProduct = async (req, res) => {
    const { name, description, quantity, image, price } = req.body

    if (!name || !description) {
        return res.json({ message: "All fields are required" })
    }

    if (typeof quantity !== "number" || quantity < 0) {
        return res.json({ message: "Quantity should be positive or less than zero" })
    }

    if (typeof price !== "number" || price < 0) {
        return res.json({ message: "Quantity should be positive or less than zero" })
    }

    try {
        const product = await FreshOilProduct.create({ name, description, quantity, image, price })
        res.status(CREATED).json(product)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create product", error: error.message })
    }
}

// create order
const createFreshOilOrder = async (req, res) => {

    const { createdBy, orderId, product, quantity, price } = req.body;

    if (typeof price !== "number" && price < 0) {
        return res.json({ message: "price must be positive or greater than zero" })
    }
    if (typeof quantity !== "number" && price < 0) {
        return res.json({ message: "price must be positive or greater than zero" })
    }

    try {
        const order = await FreshOilOrder.create({ createdBy, orderId, product, quantity, price })
        res.status(CREATED).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to create order", error: error.message })
    }
}

// get all products
const getAllFreshOilProducts = async (req, res) => {
    try {
        const products = await FreshOilProduct.find()

        if (products.length === 0) {
            return res.json({ message: "There are no products for now" })
        }

        res.status(OK).json(products)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get products", error: error.message })
    }
}

const getAllFreshOilOrders = async (req, res) => {
    try {
        const orders = await FreshOilOrder.find()

        if (orders.length === 0) {
            return res.json({ message: "There are no products for now" })
        }

        res.status(OK).json(orders)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get orders", error: error.message })
    }
}

// get single product
const getSingleFreshOilProduct = async (req, res) => {
    const { id } = req.params

    try {
        const freshOilProduct = await FreshOilProduct.findOne({ _id: id })

        if (!freshOilProduct) {
            return res.status(NOT_FOUND).json({ message: "Product Not found" })
        }
        res.status(OK).json(freshOilProduct)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get product", error: error.message })
    }

}

// get single order
const getSingleFreshOilOrder = async (req, res) => {
    const { id } = req.params

    try {
        const freshOilOrder = await FreshOilProduct.findOne({ _id: id })

        if (!freshOilOrder) {
            return res.status(NOT_FOUND).json({ message: "Order Not found" })
        }
        res.status(OK).json(freshOilOrder)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }

}

// update product
const updateFreshOilProduct = async (req, res) => {
    const { id } = req.params

    try {
        const updatedProduct = await FreshOilProduct.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Update sucessfully", updatedProduct })
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update product details", error: error.message })
    }
}

// update order
const updateFreshOilOrder = async (req, res) => {
    const { id } = req.params

    try {
        const updatedOrder = await FreshOilOrder.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

        if (!updatedOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json(updatedOrder)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to update order details", error: error.message })
    }

}

// delete product
const deleteFreshOilProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deletedFreshOilProduct = await FreshOilProduct.findOneAndDelete({ _id: id })

        if (!deleteFreshOilProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Delete sucessfully", deletedFreshOilProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message })
    }

}

// delete order
const deleteFreshOilOrder = async (req, res) => {
    const { id } = req.params

    try {
        const deletedFreshOilOrder = await FreshOilOrder.findOneAndDelete({ _id: id })

        if (!deleteFreshOilOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json({ message: "Delete sucessfully", deletedFreshOilOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete Order", error: error.message })
    }

}

// exports
module.exports = {
    createFreshOilProduct,
    createFreshOilOrder,
    getAllFreshOilProducts,
    getAllFreshOilOrders,
    getSingleFreshOilProduct,
    getSingleFreshOilOrder,
    updateFreshOilProduct,
    updateFreshOilOrder,
    deleteFreshOilProduct,
    deleteFreshOilOrder
}