// models
const Product = require("../models/animalFeeding/animalFeedingProductModel")
const Order = require("../models/animalFeeding/animalFeedingOrderModel")

// status code
const { OK, NOT_FOUND, SERVER_ERROR, CREATED } = require("../constants/responseStatusCode")

const searchAnimalFeedingProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice } = req.query;

    try {
        let searchQuery = {};

        if (name) {
            searchQuery.name = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        if (description) {
            searchQuery.description = { $regex: description, $options: "i" }; // Case-insensitive search
        }

        if (minPrice && maxPrice) {
            searchQuery.price = { $gte: minPrice, $lte: maxPrice }; // Price range search
        }

        const products = await AnimalFeedingProduct.find(searchQuery);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error searching products", details: error.message });
    }
};

// Search animal feeding orders by orderId, status, or userId
const searchAnimalFeedingOrders = async (req, res) => {
    const { orderId, status, userId } = req.query;

    try {
        let searchQuery = {};

        if (orderId) {
            searchQuery._id = orderId; // Search by orderId (MongoDB's ObjectId)
        }

        if (status) {
            searchQuery.status = status; // Filter by order status (e.g., "pending", "shipped", "delivered")
        }

        if (userId) {
            searchQuery.userId = userId; // Filter by userId
        }

        const orders = await AnimalFeedingOrder.find(searchQuery);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error searching orders", details: error.message });
    }
};

// GET ALL PRODUCTS
const getAllAnimalFeedingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })

        if (products.length === 0) {
            return res.json({ message: "there are no products now" })
        }

        res.status(OK).json(products)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Failed to fetch products", error: error.message })
    }
}

// GET ALL ORDERS
const getAnimalFeedingAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        if (orders.length === 0) {
            return res.json({ message: "There are no orders now" })
        }
        res.status(OK).json(orders)
    } catch (error) {
        res.status(SERVER_ERROR).json({
            message: "Failed to fetch product orders",
            error: error.message
        })
    }
}

// GET PRODUCT BY ID
const getAnimalFeedingProductById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find product by ID
        const product = await Product.findOne({ _id: id });

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

    const { id } = req.params

    try {

        const order = await Order.findOne({ _id: id })

        if (!order) {
            return res.status(NOT_FOUND).json({ message: "Order not found" })
        }

        res.status(OK).json(order)
    } catch (error) {
        res.status(SERVER_ERROR).json({ message: "Failed to get order", error: error.message })
    }
}

// CREATE ORDER
const createAnimalFeedingOrder = async (req, res) => {
    try {
        const { createdBy, product, name, quantity, price } = req.body;

        // Step 1: Fetch the product
        const productDetails = await Product.findById(product);
        if (!productDetails) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Step 2: Check product quantity
        if (productDetails.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient product quantity available" });
        }

        // Step 3: Create the order
        const order = await Order.create({
            createdBy,
            product,
            name,
            quantity,
            price,
        });

        // Step 4: Deduct the ordered quantity from the product stock
        productDetails.quantity -= quantity;
        await productDetails.save();

        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the order",
            error: error.message,
        });
    }
};

// UPDATE PRODUCT
const updateAnimalFeedingProduct = async (req, res) => {
    try {
        const { id } = req.params;

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
    updateAnimalFeedingOrder,
    searchAnimalFeedingProducts,
    searchAnimalFeedingOrders
}