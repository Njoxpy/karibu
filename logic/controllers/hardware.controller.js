const mongoose = require("mongoose");
const HardwareProduct = require("../models/hardware/productModel");
const HardwareOrder = require("../models/hardware/orderModel");
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require("../constants/responseStatusCode");

// Create a Hardware Product
const createHardwareProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, userId } = req.body;

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      quantity === undefined ||
      !description ||
      !userId
    ) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    // Validate that price and quantity are numbers
    if (isNaN(quantity) || isNaN(price)) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Quantity and price must be valid numbers." });
    }

    // Validate that quantity and price are greater than or equal to zero
    if (quantity < 0 || price < 0) {
      return res.status(BAD_REQUEST).json({
        error: "Quantity and price must be greater than or equal to zero.",
      });
    }

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({
        error: "Invalid userId. Please provide a valid MongoDB ObjectId.",
      });
    }

    const image = req.file ? req.file.path : null;

    // Create a new hardware product
    const newProduct = await HardwareProduct.create({
      name,
      price,
      quantity,
      description,
      userId,
      image,
    });

    res
      .status(CREATED)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get All Hardware Products
const getAllHardwareProducts = async (req, res) => {
  try {
    const products = await HardwareProduct.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No products available" });
    }

    res.status(OK).json(products);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get products", error: error.message });
  }
};

// Get Hardware Product by ID
const getHardwareProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await HardwareProduct.findById(id);

    if (!product) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    res.status(OK).json(product);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get product", error: error.message });
  }
};

// Update Hardware Product by ID
const updateHardwareProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.body;

    // Validate price and quantity
    if (price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price should not be zero or negative" });
    }

    if (quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity cannot be negative" });
    }

    // Get the product from the database
    const product = await HardwareProduct.findById(id);

    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    // Handle the condition when quantity is 0
    if (quantity === 0) {
      product.condition = "Out of Stock"; // or set an "out of stock" status field
    } else if (quantity < 10) {
      product.condition = "Low Stock";
    } else {
      product.condition = "In Stock"; // or any other condition based on your logic
    }

    // Update product properties
    Object.keys(req.body).forEach((key) => {
      if (key !== "condition") {
        product[key] = req.body[key];
      }
    });

    // Save the updated product
    await product.save();

    // Send success response
    res.status(OK).json({ message: "Product updated successfully", product });
  } catch (error) {
    // Handle errors and send server error response
    if (!res.headersSent) {
      return res
        .status(SERVER_ERROR)
        .json({ message: "Server error", details: error.message });
    }
  }
};

// Delete Hardware Product by ID
const deleteHardwareProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await HardwareProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    res.status(OK).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

const createHardwareOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user && req.user._id;

    // Validate required fields
    if (!productId || quantity === undefined || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    // Check if quantity is greater than 0
    if (quantity <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity must be greater than 0" });
    }

    const product = await HardwareProduct.findById(productId);
    if (!product) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    // Check if enough stock is available
    if (product.quantity < quantity) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Not enough stock available" });
    }

    // Create new hardware order
    const newOrder = new HardwareOrder({
      productId,
      quantity,
      userId,
      totalPrice: product.price * quantity,
    });

    await newOrder.save();

    // Update product stock
    product.quantity -= quantity;

    // Update product condition if stock changes
    if (product.quantity === 0) {
      product.condition = "out of stock";
    } else if (product.quantity < 10) {
      product.condition = "low stock";
    } else {
      product.condition = "new";
    }

    await product.save();

    res
      .status(CREATED)
      .json({ message: "Order created successfully", newOrder });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// Get All Hardware Orders
const getAllHardwareOrders = async (req, res) => {
  try {
    const orders = await HardwareOrder.find();

    if (orders.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No orders available" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

// Get Hardware Order by ID
const getHardwareOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await HardwareOrder.findById(id);

    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json(order);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get order", error: error.message });
  }
};

// Update Hardware Order by ID
const updateHardwareOrderById = async (req, res) => {
  const { id } = req.params;
  const { quantity, productId } = req.body;

  try {
    // Validate the input
    if (quantity && quantity <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity must be greater than zero." });
    }

    // Find the existing order
    const order = await HardwareOrder.findById(id);
    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found." });
    }

    // If quantity is updated, ensure the product has enough stock
    if (quantity && productId) {
      const product = await HardwareProduct.findById(productId);
      if (!product) {
        return res.status(NOT_FOUND).json({ message: "Product not found." });
      }

      const quantityDifference = quantity - order.quantity; // Difference between new and old quantities

      if (quantityDifference > 0 && product.quantity < quantityDifference) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Insufficient product quantity available." });
      }

      // Update product stock
      product.quantity -= quantityDifference;
      await product.save();
    }

    // Update order fields
    Object.keys(req.body).forEach((key) => {
      order[key] = req.body[key];
    });

    await order.save();

    res
      .status(OK)
      .json({ message: "Order updated successfully.", updatedOrder: order });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to update order.", error: error.message });
  }
};
// Delete Hardware Order by ID
const deleteHardwareOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await HardwareOrder.findById(id);
    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    const product = await HardwareProduct.findById(order.productId);
    if (product) {
      // Restore the stock in case of deletion
      product.quantity += order.quantity;

      // Update product condition
      if (product.quantity === 0) {
        product.condition = "out of stock";
      } else if (product.quantity < 10) {
        product.condition = "low stock";
      } else {
        product.condition = "new";
      }

      await product.save();
    }

    await order.deleteOne();
    res.status(OK).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

const getAvailableProducts = async (req, res) => {
  try {
    // Fetch products with quantity greater than zero
    const availableProducts = await HardwareProduct.find({
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

const getHardwareRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await HardwareOrder.aggregate([
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

const getHardwareRevenue = async (req, res) => {
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
          .status(400) // BAD_REQUEST
          .json({ message: 'Invalid period. Use "day", "week", or "month".' });
    }

    // Get the revenue for the given period (specific to the hardware page)
    const revenue = await getHardwareRevenueByDateRange(startDate, endDate);

    res.status(201).json({
      // CREATED
      message: `${
        period.charAt(0).toUpperCase() + period.slice(1)
      } revenue for hardware fetched successfully.`,
      revenue: revenue,
      period: period,
      startDate: startDate,
      endDate: endDate,
    });
  } catch (error) {
    res.status(500).json({
      // SERVER_ERROR
      message: "Server error while calculating hardware revenue.",
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
    const totalCost = await HardwareOrder.aggregate([
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
  createHardwareProduct,
  createHardwareOrder,
  getAllHardwareOrders,
  getHardwareOrderById,
  getAllHardwareProducts,
  getHardwareProductById,
  updateHardwareProductById,
  updateHardwareOrderById,
  deleteHardwareProductById,
  deleteHardwareOrderById,
  getTotalCostByDate,
  getAvailableProducts,
  getHardwareRevenue,
};
