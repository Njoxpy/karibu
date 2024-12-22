// models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel")
const FreshOilOrder = require("../models/freshOil/freshOilOrderModel")

// middleware
const { SERVER_ERROR, CREATED, OK, NOT_FOUND, BAD_REQUEST } = require("../constants/responseStatusCode")

const searchFreshOilProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice } = req.query;

    try {
        let searchQuery = {};

        if (name) {
            searchQuery.name = { $regex: name, $options: "i" };  // Case-insensitive search
        }

        if (description) {
            searchQuery.description = { $regex: description, $options: "i" };  // Case-insensitive search
        }

        if (minPrice && maxPrice) {
            searchQuery.price = { $gte: minPrice, $lte: maxPrice };  // Price range search
        }

        const products = await FreshOilProduct.find(searchQuery);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error searching products', details: error.message });
    }
};


const searchFreshOilOrders = async (req, res) => {
    const { orderId, status, userId } = req.query;

    try {
        let searchQuery = {};

        if (orderId) {
            searchQuery._id = orderId;  // Search by orderId (MongoDB's ObjectId)
        }

        if (status) {
            searchQuery.status = status;
        }

        if (userId) {
            searchQuery.userId = userId;
        }

        const orders = await FreshOilOrder.find(searchQuery);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error searching orders', details: error.message });
    }
};
// create product
const createFreshOilProduct = async (req, res) => {
    const { name, description, quantity, image, price } = req.body

    if (!name || !description || !quantity || !price) {
        return res.status(BAD_REQUEST).json({ message: "All fields are required" })
    }

    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(BAD_REQUEST).json({ message: "Quantity should be a positive number or zero" })
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(BAD_REQUEST).json({ message: "Price should be a positive number or zero" })
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
    const { createdBy, orderId, product, quantity, price } = req.body
    
    if (typeof price !== "number" || price < 0) {
        return res.status(BAD_REQUEST).json({ message: "Price must be a positive number or zero" })
    }
    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(BAD_REQUEST).json({ message: "Quantity must be a positive number or zero" })
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
        const products = await FreshOilProduct.find().sort({ createdAt: -1 })

        if (products.length === 0) {
            return res.status(NOT_FOUND).json({ message: "There are no products available" })
        }

        res.status(OK).json(products)
    }
    catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get products", error: error.message })
    }
}

// get all orders
const getAllFreshOilOrders = async (req, res) => {
    try {
        const orders = await FreshOilOrder.find().sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.status(NOT_FOUND).json({ message: "There are no orders available" })
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
            return res.status(NOT_FOUND).json({ message: "Product not found" })
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
        const freshOilOrder = await FreshOilOrder.findOne({ _id: id })

        if (!freshOilOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
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

        res.status(OK).json({ message: "Updated successfully", updatedProduct })
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

        res.status(OK).json({ message: "Updated successfully", updatedOrder })
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

        if (!deletedFreshOilProduct) {
            return res.status(NOT_FOUND).json({ message: "Product not found" })
        }

        res.status(OK).json({ message: "Deleted successfully", deletedFreshOilProduct })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete product", error: error.message })
    }
}

// delete order
const deleteFreshOilOrder = async (req, res) => {
    const { id } = req.params

    try {
        const deletedFreshOilOrder = await FreshOilOrder.findOneAndDelete({ _id: id })

        if (!deletedFreshOilOrder) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json({ message: "Deleted successfully", deletedFreshOilOrder })
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to delete order", error: error.message })
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
    deleteFreshOilOrder,
    searchFreshOilProducts,
    searchFreshOilOrders
}
