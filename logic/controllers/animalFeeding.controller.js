// models
const Product = require("../models/animalFeeding/animalFeedingProductModel");
const Order = require("../models/animalFeeding/animalFeedingOrderModel");
const User = require("../models/user/userModel")

// status code
const { OK, NOT_FOUND, SERVER_ERROR, BAD_REQUEST } = require("../constants/responseStatusCode");
const AnimalFeedingProduct = require("../models/animalFeeding/animalFeedingProductModel");
const AnimalFeedingOrder = require("../models/animalFeeding/animalFeedingOrderModel");

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

const getAllAnimalFeedingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        if (products.length === 0) {
            if (!res.headersSent) {
                return res.status(OK).json({ message: "There are no products now" });
            }
        }

        if (!res.headersSent) {
            return res.status(OK).json(products);
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ error: "Failed to fetch products", details: error.message });
        }
    }
};

// GET ALL ORDERS
// Get all orders
const getAnimalFeedingAllOrders = async (req, res) => {
    try {
        const orders = await AnimalFeedingOrder.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
// Get single order by ID
const getAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await AnimalFeedingOrder.findById(id)
            .populate("productId", "name description")
            .populate("userId", "email");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createAnimalFeedingOrder = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;

        // Check if all fields are provided
        if (!productId || !quantity || !userId) {
            return res.status(BAD_REQUEST).json({ message: "All fields are required" });
        }

        // Fetch the product from the database
        const product = await AnimalFeedingProduct.findById(productId);
        if (!product) {
            return res.status(NOT_FOUND).json({ error: "Product not found" });
        }

        // Check if there's enough stock
        if (product.quantity < quantity) {
            return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
        }

        const price = product.price;

        // Create the order
        const order = await AnimalFeedingOrder.create({
            productId,
            quantity,
            price,  // Ensure price is passed
            total: quantity * price,
            userId
        });

        // Update the product stock
        product.quantity -= quantity;
        await product.save();

        // Return response
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

    try {
        const { id } = req.params;
        const { price, quantity } = req.body;

        if (price <= 0) {
            return res.status(BAD_REQUEST).json({ message: "Price or should not be zero" })
        }

        if (quantity < 0) {
            return res.status(BAD_REQUEST).json({ message: "Price cannot be negative" });

        }

        const updates = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(BAD_REQUEST).json({ message: "Product not found" })
        }

        if (quantity === 0) {
            product.condition = "Out of Stock"; // or set an "out of stock" status field
        }

        Object.keys(updates).forEach((key) => {
            product[key] = updates[key];
        })

        await product.save();

        res.status(OK).json({ message: "Updated sucessfully", product })
    } catch (error) {
        if (!res.headersSent) {
            return res.status(SERVER_ERROR).json({ message: "Server error", details: error.message });
        }
    }
};

// UPDATE ORDER
// Update an order (Admin only)
const updateAnimalFeedingOrder = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Find the existing order
        const order = await AnimalFeedingOrder.findById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Find the product associated with the order
        const product = await AnimalFeedingProduct.findById(order.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the new quantity is valid (considering the original quantity in stock)
        const updatedStock = product.quantity + order.quantity - quantity; // Adjust stock based on old order quantity
        if (updatedStock < 0) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // Update the product stock
        product.quantity = updatedStock;
        await product.save();

        // Update order details
        order.quantity = quantity;
        order.total = quantity * product.price; // Recalculate the total based on the current product price
        await order.save();

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
// Delete an order (Admin only)
const deleteAnimalFeedingOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the order by its ID
        const order = await AnimalFeedingOrder.findById(id);
        if (!order) {
            return res.status(NOT_FOUND).json({ error: "Order not found" });
        }

        // Delete the order
        await order.deleteOne();

        res.status(OK).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message });
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
