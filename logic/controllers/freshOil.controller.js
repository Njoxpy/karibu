// models
const FreshOilProduct = require("../models/freshOil/freshOilproductModel");
const FreshOilOrder = require("../models/freshOil/freshOilOrderModel");

// models for total cost
const AnimalFeedingOrder = require("../models/animalFeeding/animalFeedingOrderModel");
const GodownOrder = require("../models/godown/godownOrderModel");
const HardwareOrder = require("../models/hardware/orderModel");
const PrintingOrder = require("../models/printing/printingOrderModel");
const StationeryOrder = require("../models/stationery/stationerOrderModel");

// middleware
const {
  SERVER_ERROR,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");

const searchFreshOilProducts = async (req, res) => {
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

    const products = await FreshOilProduct.find(searchQuery);

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error searching products", details: error.message });
  }
};

const searchFreshOilOrders = async (req, res) => {
  const { orderId, status, userId } = req.query;

  try {
    let searchQuery = {};

    if (orderId) {
      searchQuery._id = orderId; // Search by orderId (MongoDB's ObjectId)
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
    res
      .status(500)
      .json({ error: "Error searching orders", details: error.message });
  }
};

// create order
const createFreshOilOrder = async (req, res) => {
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
    const product = await FreshOilProduct.findById(productId);
    if (!product) {
      return res.status(NOT_FOUND).json({ error: "Product not found" });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
    }

    // Create the order
    const order = await FreshOilOrder.create({
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

// get all products
const getAllFreshOilProducts = async (req, res) => {
  try {
    const products = await FreshOilProduct.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There are no products available" });
    }

    res.status(OK).json(products);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get products", error: error.message });
  }
};

// get all orders
const getAllFreshOilOrders = async (req, res) => {
  try {
    const orders = await FreshOilOrder.find()
      .populate("productId", "name") // Include product name
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There are no orders available" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

// get single product
const getSingleFreshOilProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const freshOilProduct = await FreshOilProduct.findOne({ _id: id });

    if (!freshOilProduct) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    res.status(OK).json(freshOilProduct);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get product", error: error.message });
  }
};

// get single order
const getSingleFreshOilOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const freshOilOrder = await FreshOilOrder.findOne({ _id: id });

    if (!freshOilOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json(freshOilOrder);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get order", error: error.message });
  }
};

// update product
const updateFreshOilProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.body;

    // Validate price and quantity
    if (price <= 0 || quantity < 0) {
      return res.status(BAD_REQUEST).json({
        message:
          "Price should be greater than zero, and quantity cannot be negative.",
      });
    }

    if (typeof price !== "number" || typeof quantity !== "number") {
      return res.status(BAD_REQUEST).json({
        message: "Price and quantity should be valid numbers.",
      });
    }

    // Get product to update
    const product = await FreshOilProduct.findById(id);

    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    // Only update provided fields
    const updates = {};
    if (price !== undefined) updates.price = price;
    if (quantity !== undefined) updates.quantity = quantity;

    // Apply updates
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    // Calculate new total if price or quantity changed
    if (updates.price || updates.quantity) {
      product.total = product.price * product.quantity;
    }

    // Save the updated product
    await product.save();

    res.status(OK).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(SERVER_ERROR).json({
        message: "Server error",
        details: error.message,
      });
    }
  }
};

// update order
const updateFreshOilOrder = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Ensure quantity is a valid number
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity value" });
  }

  try {
    // Find the existing order
    const order = await FreshOilOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the product associated with the order
    const product = await FreshOilProduct.findById(order.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate the updated stock
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

// delete product
const deleteFreshOilProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the FreshOilProduct by its ID
    const deletedFreshOilProduct = await FreshOilProduct.findOneAndDelete({
      _id: id,
    });

    if (!deletedFreshOilProduct) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    // Respond with success
    res
      .status(OK)
      .json({ message: "Deleted successfully", deletedFreshOilProduct });
  } catch (error) {
    // Handle any server errors
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

// delete order
const deleteFreshOilOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFreshOilOrder = await FreshOilOrder.findOneAndDelete({
      _id: id,
    });

    if (!deletedFreshOilOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res
      .status(OK)
      .json({ message: "Deleted successfully", deletedFreshOilOrder });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

const getAvailableProducts = async (req, res) => {
  try {
    // Fetch products with quantity greater than zero
    const availableProducts = await FreshOilProduct.find({
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
    const totalCost = await FreshOilOrder.aggregate([
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

const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await FreshOilOrder.aggregate([
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

const getTotalOrders = async (req, res) => {
  try {
    const collections = [
      FreshOilOrder,
      AnimalFeedingOrder,
      GodownOrder,
      HardwareOrder,
      PrintingOrder,
      StationeryOrder,
    ];

    // Run countDocuments queries in parallel
    const counts = await Promise.all(
      collections.map((collection) => collection.countDocuments())
    );

    const totalCount = counts.reduce((sum, count) => sum + count, 0);

    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports
module.exports = {
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
  searchFreshOilOrders,
  getAvailableProducts,
  getTotalCostByDate,
  getRevenue,
  getTotalOrders,
};
