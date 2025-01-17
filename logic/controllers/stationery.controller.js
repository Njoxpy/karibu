// models
const Product = require("../models/stationery/stationeryProductModel");
const Order = require("../models/stationery/stationerOrderModel");

// status code
const {
  OK,
  NOT_FOUND,
  SERVER_ERROR,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");
const StationeryProduct = require("../models/stationery/stationeryProductModel");
const StationeryOrder = require("../models/stationery/stationerOrderModel");
const { default: mongoose } = require("mongoose");

const searchStationeryProducts = async (req, res) => {
  const { name, description, minPrice, maxPrice } = req.query;

  try {
    let searchQuery = {};

    if (name) {
      searchQuery.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
    }

    if (description) {
      searchQuery.description = { $regex: description, $options: "i" }; // Case-insensitive search for description
    }

    if (minPrice && maxPrice) {
      searchQuery.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    const products = await Product.find(searchQuery);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ error: "Error searching products", details: error.message });
  }
};

// Search stationery orders by orderId, status, or userId
const searchStationeryOrders = async (req, res) => {
  const { orderId, status, userId } = req.query;

  try {
    let searchQuery = {};

    if (orderId) {
      searchQuery._id = orderId; // Search by orderId (MongoDB's ObjectId)
    }

    if (status) {
      searchQuery.status = status; // Filter orders by status (e.g., "pending", "shipped", etc.)
    }

    if (userId) {
      searchQuery.userId = userId; // Filter orders by userId
    }

    const orders = await Order.find(searchQuery);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ error: "Error searching orders", details: error.message });
  }
};

// GET ALL PRODUCTS
const getAllStationeryProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There are no products now" });
    }

    res.status(OK).json(products);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ error: "Failed to fetch products", details: error.message });
  }
};

// GET ALL ORDERS
const getAllStationeryOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.json({ message: "There are no orders now" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// GET PRODUCT BY ID
const getStationeryProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(NOT_FOUND).json({ error: "Product not found" });
    }

    res.status(OK).json(product);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ error: "Failed to fetch the product", details: error.message });
  }
};

// GET ORDER BY ID
const getStationeryOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json(order);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

// CREATE ORDER
const createStationeryOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user && req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid product id." });
    }

    // Check if all fields are provided
    if (!productId || !quantity || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    if (quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity cannot be negative" });
    }

    if (!productId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Product ID is required" });
    }
    if (!quantity) {
      return res.status(BAD_REQUEST).json({ message: "Quantity is required" });
    }
    if (!userId) {
      return res.status(BAD_REQUEST).json({ message: "User ID is required" });
    }

    // Fetch the product from the database
    const product = await StationeryProduct.findById(productId);
    if (!product) {
      return res.status(NOT_FOUND).json({ error: "Product not found" });
    }

    // Check if there's enough stock
    if (product.quantity < quantity) {
      return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
    }

    const price = product.price;

    // Create the order
    const order = await StationeryOrder.create({
      productId,
      quantity,
      price, // Ensure price is passed
      total: quantity * price,
      userId,
    });

    // Update the product stock
    product.quantity -= quantity;
    await product.save();

    // Return response
    if (!res.headersSent) {
      return res
        .status(201)
        .json({ message: "Order created successfully", order });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(SERVER_ERROR).json({
        message: "An error occurred while creating the order",
        error: error.message,
      });
    }
  }
};

// UPDATE PRODUCT
const updateStationeryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.body;

    if (price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price should not be negative or zero" });
    }

    if (quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price cannot be negative" });
    }

    const updates = req.body;

    const product = await StationeryProduct.findById(id);

    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    if (quantity === 0) {
      product.condition = "Out of Stock";
    }

    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    await product.save();

    res.status(OK).json({ message: "Updated sucessfully", product });
  } catch (error) {
    if (!res.headersSent) {
      return res
        .status(SERVER_ERROR)
        .json({ message: "Server error", details: error.message });
    }
  }
};

// UPDATE ORDER
const updateStationeryOrder = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be greater than zero" });
  }

  try {
    // Find the existing order
    const order = await StationeryOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the product associated with the order
    const product = await StationeryProduct.findById(order.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the new quantity is valid
    const updatedStock = product.quantity + order.quantity - quantity;
    if (updatedStock < 0) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Update the product stock
    product.quantity = updatedStock;
    await product.save();

    // Update order details
    order.quantity = quantity;
    order.total = quantity * product.price; // Recalculate total based on product price
    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
      product,
    });
  } catch (error) {
    console.error("Error updating stationery order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
};

// DELETE PRODUCT BY ID
const deleteStationeryProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    res
      .status(OK)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

// DELETE ORDER BY ID
const deleteStationeryOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res
      .status(OK)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await StationeryOrder.aggregate([
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
          .status(400)
          .json({ message: 'Invalid period. Use "day", "week", or "month".' });
    }

    // Get the revenue for the given period
    const revenue = await getRevenueByDateRange(startDate, endDate);

    res.status(200).json({
      message: `${
        period.charAt(0).toUpperCase() + period.slice(1)
      } revenue fetched successfully.`,
      revenue: revenue,
      period: period,
      startDate: startDate,
      endDate: endDate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while calculating revenue.",
      details: error.message,
    });
  }
};

const getAvailableProducts = async (req, res) => {
  try {
    // Fetch products with quantity greater than zero
    const availableProducts = await StationeryProduct.find({
      quantity: { $gt: 0 },
    });

    if (availableProducts.length === 0) {
      return res.status(404).json({ message: "No products available." });
    }

    res.status(200).json({
      message: "Available products fetched successfully.",
      products: availableProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching products.",
      details: error.message,
    });
  }
};

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
      .status(400)
      .json({ message: 'Invalid filter. Use "day", "week", or "month".' });
  }

  try {
    const totalCost = await StationeryOrder.aggregate([
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
      return res.status(200).json({
        totalCost: 0,
        message: "No orders found for the specified period",
      });
    }

    res.status(200).json({ totalCost: totalCost[0].totalCost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStationeryProducts,
  createStationeryOrder,
  getAllStationeryOrders,
  getStationeryProduct,
  getStationeryOrder,
  updateStationeryProduct,
  deleteStationeryProduct,
  deleteStationeryOrder,
  updateStationeryOrder,
  searchStationeryOrders,
  searchStationeryProducts,
  getRevenue,
  getTotalCostByDate,
  getAvailableProducts,
};
