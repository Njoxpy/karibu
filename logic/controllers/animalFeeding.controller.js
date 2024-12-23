// models
const Product = require("../models/animalFeeding/animalFeedingProductModel");
const Order = require("../models/animalFeeding/animalFeedingOrderModel");

// status code
const { OK, NOT_FOUND, SERVER_ERROR, BAD_REQUEST } = require("../constants/responseStatusCode");

// Search animal feeding products with filters
const searchAnimalFeedingProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice } = req.query;

    try {
        let searchQuery = {};

        if (name) {
            searchQuery.name = { $regex: name, $options: "i" };
        }

        if (description) {
            searchQuery.description = { $regex: description, $options: "i" };
        }

        if (minPrice && maxPrice) {
            searchQuery.price = { $gte: minPrice, $lte: maxPrice };
        }

        const products = await Product.find(searchQuery);

        if (!res.headersSent) {
            return res.status(OK).json(products); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ error: "Error searching products", details: error.message });
        }
    }
};

// Search animal feeding orders with filters
const searchAnimalFeedingOrders = async (req, res) => {
    const { orderId, status, userId } = req.query;

    try {
        let searchQuery = {};

        if (orderId) {
            searchQuery._id = orderId;
        }

        if (status) {
            searchQuery.status = status;
        }

        if (userId) {
            searchQuery.userId = userId;
        }

        const orders = await Order.find(searchQuery);

        if (!res.headersSent) {
            return res.status(OK).json(orders); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ error: "Error searching orders", details: error.message });
        }
    }
};

// GET ALL PRODUCTS
const getAllAnimalFeedingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        if (products.length === 0) {
            if (!res.headersSent) {
                return res.status(OK).json({ message: "There are no products now" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(products); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ error: "Failed to fetch products", details: error.message });
        }
    }
};

// GET ALL ORDERS
const getAnimalFeedingAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        if (orders.length === 0) {
            if (!res.headersSent) {
                return res.status(OK).json({ message: "There are no orders now" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(orders); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Failed to fetch orders", details: error.message });
        }
    }
};

// GET PRODUCT BY ID
const getAnimalFeedingProductById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(BAD_REQUEST).json({ error: "Product ID is required" });
    }

    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ error: "Product not found" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(product); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ error: "Failed to fetch the product.", details: error.message });
        }
    }
};

// GET ORDER BY ID
const getAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(BAD_REQUEST).json({ error: "Order ID is required" });
    }

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "Order not found" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(order); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Failed to get order", details: error.message });
        }
    }
};

// CREATE ORDER
const createAnimalFeedingOrder = async (req, res) => {
    try {
        const { createdBy, product, name, quantity, price } = req.body;

        const productDetails = await Product.findById(product);
        if (!productDetails) {
            return res.status(NOT_FOUND).json({ message: "Product not found" });
        }

        if (productDetails.quantity < quantity) {
            return res.status(BAD_REQUEST).json({ message: "Insufficient product quantity available" });
        }

        const order = await Order.create({
            createdBy,
            product,
            name,
            quantity,
            price,
        });

        productDetails.quantity -= quantity;
        await productDetails.save();

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
const updateAnimalFeedingProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!updatedProduct) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "Product not found." });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json({ "updated product": updatedProduct }); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Server error", details: error.message });
        }
    }
};

// UPDATE ORDER
const updateAnimalFeedingOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!updatedOrder) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "Order not found." });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json({ "updated order": updatedOrder }); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Server error", details: error.message });
        }
    }
};

// DELETE PRODUCT BY ID
const deleteAnimalFeedingProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "Product not found" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json({ "product deleted successfully": deletedProduct });
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Failed to delete product", details: error.message });
        }
    }
};

// DELETE ORDER BY ID
const deleteAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: id });

        if (!deletedOrder) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "Order not found" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json({ "order deleted successfully": deletedOrder });
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Failed to delete order", details: error.message });
        }
    }
};

// SEARCH PRODUCT BY NAME
const searchAnimalFeedingProductName = async (req, res) => {
    const { productName } = req.query;

    if (!productName) {
        return res.status(BAD_REQUEST).json({ error: "Product name is required" });
    }

    try {
        const products = await Product.find({ name: { $regex: productName, $options: "i" } });

        if (products.length === 0) {
            if (!res.headersSent) {
                return res.status(NOT_FOUND).json({ message: "No products found with that name." });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(products); // Ensure response is sent only once
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: 'An error occurred while searching for products.', details: error.message });
        }
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
    updateAnimalFeedingOrder,
    searchAnimalFeedingProducts,
    searchAnimalFeedingOrders
};
