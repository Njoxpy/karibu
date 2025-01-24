// models
const Product = require("../models/animalFeeding/animalFeedingProductModel");
const Order = require("../models/animalFeeding/animalFeedingOrderModel");

// status code
const {
  OK,
  NOT_FOUND,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} = require("../constants/responseStatusCode");
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
      return res
        .status(SERVER_ERROR)
        .json({ error: "Error searching products", details: error.message });
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
      return res
        .status(SERVER_ERROR)
        .json({ error: "Error searching orders", details: error.message });
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
      return res
        .status(SERVER_ERROR)
        .json({ error: "Failed to fetch products", details: error.message });
    }
  }
};

// GET ALL ORDERS
// Get all orders
const getAnimalFeedingAllOrders = async (req, res) => {
  try {
    const orders = await AnimalFeedingOrder.find()
      .populate("productId", "name") // Include product name
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(OK).json({ message: "There are no orders now" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
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
      return res.status(SERVER_ERROR).json({
        error: "Failed to fetch the product.",
        details: error.message,
      });
    }
  }
};

// GET ORDER BY ID
// Get single order by ID
const getAnimalFeedingOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await AnimalFeedingOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(CREATED).json(order);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const createAnimalFeedingOrder = async (req, res) => {
  try {
    const { productId, productName, quantity } = req.body;
    const userId = req.user && req.user._id;

    // Validate inputs
    if (!productId || !productName || !quantity || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    // Fetch the product
    const product = await AnimalFeedingProduct.findById(productId);
    if (!product) {
      return res.status(NOT_FOUND).json({ error: "Product not found" });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
    }

    // Create the order
    const order = await AnimalFeedingOrder.create({
      productId,
      productName, // Include the product name
      quantity,
      price: product.price,
      total: quantity * product.price,
      userId,
    });

    // Update the product stock
    product.quantity -= quantity;
    await product.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateAnimalFeedingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.body;

    // Validate price
    if (price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price should be greater than zero" });
    }

    // Validate quantity
    if (quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity cannot be negative" });
    }

    const updates = req.body;

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    // Update condition if quantity is zero
    if (quantity === 0) {
      product.condition = "Out of Stock";
    } else if (quantity > 0) {
      product.condition = "In Stock"; // or reset condition to "In Stock" when quantity is greater than zero
    }

    // Apply updates to the product
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    // Save the updated product
    await product.save();

    res.status(OK).json({ message: "Updated successfully", product });
  } catch (error) {
    if (!res.headersSent) {
      return res
        .status(SERVER_ERROR)
        .json({ message: "Server error", details: error.message });
    }
  }
};

// UPDATE ORDER
// Update an order (Admin only)

const updateAnimalFeedingOrder = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 0) {
    return res
      .status(BAD_REQUEST)
      .json({ error: "Quantity should be greater than zero" });
  }

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
      return res.status(BAD_REQUEST).json({ error: "Insufficient stock" });
    }

    // Update the product stock
    product.quantity = updatedStock;
    await product.save();

    // Update order details
    order.quantity = quantity;
    order.total = quantity * product.price; // Recalculate the total based on the current product price
    await order.save();

    res.status(CREATED).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
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
      return res
        .status(OK)
        .json({ "product deleted successfully": deletedProduct });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res
        .status(SERVER_ERROR)
        .json({ message: "Failed to delete product", details: error.message });
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
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    if (products.length === 0) {
      if (!res.headersSent) {
        return res
          .status(NOT_FOUND)
          .json({ message: "No products found with that name." });
      }
    }

    if (!res.headersSent) {
      return res.status(OK).json(products); // Ensure response is sent only once
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(SERVER_ERROR).json({
        message: "An error occurred while searching for products.",
        details: error.message,
      });
    }
  }
};

// Calculate Total Cost for Orders Filtered by Date
const getTotalCostByDate = async (req, res) => {
  const { filter } = req.query; // Expected values: 'day', 'week', 'month'
  const now = new Date();
  let startDate;

  if (filter === "day") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (filter === "week") {
    const startOfWeek = now.getDate() - now.getDay(); // Sunday as the first day of the week
    startDate = new Date(now.getFullYear(), now.getMonth(), startOfWeek);
  } else if (filter === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
  } else {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Invalid filter. Use "day", "week", or "month".' });
  }

  try {
    const totalCost = await AnimalFeedingOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: now },
        },
      },
      {
        $group: {
          _id: null, // Group all matching documents together
          totalCost: { $sum: "$total" }, // Sum up the `total` field
        },
      },
    ]);

    if (totalCost.length === 0) {
      return res.status(CREATED).json({
        totalCost: 0,
        message: "No orders found for the specified period",
      });
    }

    res.status(CREATED).json({ totalCost: totalCost[0].totalCost });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getAvailableProducts = async (req, res) => {
  try {
    // Fetch products with quantity greater than zero
    const availableProducts = await AnimalFeedingProduct.find({
      quantity: { $gt: 0 },
    });

    if (availableProducts.length === 0) {
      return res.status(404).json({ message: "No products available." });
    }

    res.status(CREATED).json({
      message: "Available products fetched successfully.",
      products: availableProducts,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error while fetching products.",
      details: error.message,
    });
  }
};

const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await AnimalFeedingOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
  } catch (error) {
    throw new Error("Error calculating revenue: " + error.message);
  }
};

// Get total revenue for the day, week, and month
// Get total revenue for the day, week, and month
const getRevenue = async (req, res) => {
  try {
    const { period } = req.query; // Expecting 'day', 'week', or 'month'

    let startDate, endDate;

    // Calculate the start and end date based on the period
    const now = new Date();
    switch (period) {
      case "day":
        startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
        break;
      case "week":
        startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of this week (Sunday)
        endDate = new Date(now.setDate(now.getDate() - now.getDay() + 6)); // End of this week (Saturday)
        break;
      case "month":
        // Start of this month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate.setHours(0, 0, 0, 0);

        // End of this month (last day of the month)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return res
          .status(BAD_REQUEST)
          .json({ message: 'Invalid period. Use "day", "week", or "month".' });
    }

    // Get the revenue for the given period
    const revenue = await getRevenueByDateRange(startDate, endDate);

    res.status(CREATED).json({
      message: `${
        period.charAt(0).toUpperCase() + period.slice(1)
      } revenue fetched successfully.`,
      revenue: revenue,
      period: period,
      startDate: startDate,
      endDate: endDate,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error while calculating revenue.",
      details: error.message,
    });
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
  searchAnimalFeedingOrders,
  getTotalCostByDate,
  getAvailableProducts,
  getRevenue,
};
