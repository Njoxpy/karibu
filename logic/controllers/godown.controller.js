const mongoose = require("mongoose");

// CRUD
const GodownProduct = require("../models/godown/godownProductModel");
const InventoryMovement = require("../models/godown/inventoryModel");
const GodownOrder = require("../models/godown/godownOrderModel");

// response code
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require("../constants/responseStatusCode");

const NO_CONTENT = 204;

const getMovementLogs = async (req, res) => {
  try {
    const logs = await InventoryMovement.find().sort({ createdAt: -1 });

    if (logs.length === 0) {
      return res
        .status(NO_CONTENT)
        .json({ message: "There are no products for now" });
    }

    return res.status(OK).json(logs); // Added return to ensure no further code is executed
  } catch (error) {
    return res.status(SERVER_ERROR).json({ error: error.message }); // Added return here as well
  }
};

const bulkUploadGodownProducts = async (req, res) => {
  try {
    const products = req.body;

    // Check if the products array is empty
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please provide an array of products to upload" });
    }

    // Validate each product before inserting it
    const validProducts = [];
    const invalidProducts = [];

    for (const product of products) {
      const { name, price, quantity, location, description, userId } = product;

      // Validate required fields
      if (
        !name ||
        !price ||
        !quantity ||
        !location ||
        !description ||
        !userId
      ) {
        invalidProducts.push({ product, error: "All fields are required" });
        continue;
      }

      // Validate price and quantity
      if (price <= 0 || quantity <= 0) {
        invalidProducts.push({
          product,
          error: "Price and quantity must be greater than zero",
        });
        continue;
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        invalidProducts.push({ product, error: "Invalid userId" });
        continue;
      }

      // If the product is valid, add to the valid list
      validProducts.push(product);
    }

    // If there are any invalid products, respond with them
    if (invalidProducts.length > 0) {
      return res.status(BAD_REQUEST).json({
        message: "Some products are invalid",
        invalidProducts,
      });
    }

    // Bulk insert valid products into the database
    const newProducts = await GodownProduct.insertMany(validProducts);

    res.status(CREATED).json({
      message: `${newProducts.length} products uploaded successfully`,
      newProducts,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Failed to bulk upload products",
      error: error.message,
    });
  }
};

// Create product
const createGodownProduct = async (req, res) => {
  try {
    const { name, price, quantity, location, description } = req.body;

    const userId = req.user && req.user._id;

    if (!name || !price || !quantity || !location || !description || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    if (isNaN(quantity) || isNaN(price)) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Quantity and price must be valid numbers." });
    }

    if (quantity <= 0 || price <= 0) {
      return res.status(BAD_REQUEST).json({
        error: "Quantity, price, and total must be greater than zero.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid userId." });
    }

    const newItem = await GodownProduct.create({
      name,
      price,
      quantity,
      location,
      description,
      userId,
    });

    res.status(CREATED).json(newItem);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// create order
const createGodownOrder = async (req, res) => {
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
    const product = await GodownProduct.findById(productId);
    if (!product) {
      return res.status(NOT_FOUND).json({ error: "Product not found" });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(BAD_REQUEST).json({ message: "Insufficient stock" });
    }

    // Create the order
    const order = await GodownOrder.create({
      productId,
      productName, // Include the product name
      quantity,
      price: product.price,
      totalPrice: quantity * product.price,
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
const getAllGodownProducts = async (req, res) => {
  try {
    const products = await GodownProduct.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No products for now" });
    }
    res.status(OK).json(products);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get products", error: error.message });
  }
};

// get all orders
const getAllGodownOrders = async (req, res) => {
  try {
    const orders = await GodownOrder.find()
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There are no orders for now" });
    }
    res.status(OK).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

// get product by id
const getAllGodownProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await GodownProduct.findOne({ _id: id });

    if (!product) {
      return res.status(NOT_FOUND).json({ message: "Failed to get product" });
    }
    res.status(OK).json(product);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "failed to get product", error: error.message });
  }
};

// get order by id
const getGodownOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await GodownOrder.findOne({ _id: id });

    if (!product) {
      return res.status(NOT_FOUND).json({ message: "Failed to get order" });
    }
    res.status(OK).json(product);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "failed to get order", error: error.message });
  }
};

// update product by id
const updateGodownProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const { price, quantity, ...otherUpdates } = req.body;

    // Validate the product exists first
    const product = await GodownProduct.findById(id);
    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    // Validate price and quantity
    if (price !== undefined && price < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price cannot be negative" });
    }

    if (quantity !== undefined && quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity cannot be negative" });
    }

    // Update condition based on quantity
    if (quantity === 0) {
      otherUpdates.condition = "out of stock";
    } else if (quantity <= 10) {
      otherUpdates.condition = "low stock";
    } else {
      otherUpdates.condition = "new";
    }

    // Update the product with all fields
    const updatedProduct = await GodownProduct.findByIdAndUpdate(
      id,
      {
        ...otherUpdates,
        price: price !== undefined ? price : product.price,
        quantity: quantity !== undefined ? quantity : product.quantity,
      },
      { new: true, runValidators: true }
    );

    return res.status(OK).json({
      message: "Updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(SERVER_ERROR).json({
      message: "Server error",
      details: error.message,
    });
  }
};

// update order by id
const updateGodownOrderById = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Ensure quantity is a valid number
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity value" });
  }

  try {
    // Find the existing order
    const order = await GodownOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the product associated with the order
    const product = await GodownProduct.findById(order.productId);
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
const deleteGodownProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await GodownProduct.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    res.status(OK).json({ mesage: "Deleted sucessfully", deletedProduct });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "failed to delete product", error: error.message });
  }
};

// delete order
const deleteGodownOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await GodownOrder.findOneAndDelete({ _id: id });

    if (!deletedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json({ mesage: "Deleted sucessfully", deletedOrder });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "failed to delete product", error: error.message });
  }
};

// Function to handle inventory movement
const transferInventory = async (req, res) => {
  try {
    // Get request data
    const { productId, transferQuantity, origin, destination, reason } =
      req.body;
    const transferredBy = req.user._id; // Assume the user making the transfer is in req.user

    // Validate the request data
    if (!productId || !transferQuantity || !origin || !destination) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (transferQuantity < 1) {
      return res
        .status(400)
        .json({ message: "Transfer quantity must be at least 1." });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Find the product in the origin location
    const product = await GodownProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check if the transfer quantity is valid (not more than available in the origin)
    if (product.quantity < transferQuantity) {
      return res.status(400).json({
        message: "Not enough stock available in the origin location.",
      });
    }

    // Start the inventory transfer
    // Decrease the quantity in the origin
    product.quantity -= transferQuantity;
    // Increase the quantity in the destination (create or find the destination product)
    let destinationProduct = await GodownProduct.findOne({
      name: product.name,
      location: destination,
    });
    if (!destinationProduct) {
      // Create a new product entry in the destination location if it doesn't exist
      destinationProduct = new GodownProduct({
        name: product.name,
        price: product.price,
        quantity: transferQuantity,
        location: destination,
        description: product.description,
        condition: product.condition,
        userId: transferredBy,
      });
    } else {
      destinationProduct.quantity += transferQuantity;
    }

    // Save the updated product details
    await product.save();
    await destinationProduct.save();

    // Log the inventory movement
    const movement = new InventoryMovement({
      product: product._id,
      transferQuantity,
      origin,
      destination,
      transferredBy,
      reason,
    });
    await movement.save();

    // Return a success response
    res.status(201).json({
      message: "Inventory transfer successful.",
      movement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error transferring inventory.",
      error: error.message,
    });
  }
};

const getAvailableProducts = async (req, res) => {
  try {
    // Fetch products with quantity greater than zero
    const availableProducts = await GodownProduct.find({
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

const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await GodownOrder.aggregate([
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
          totalRevenue: { $sum: "$totalPrice" },
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
    console.log("Start Date:", startDate);
    console.log("End Date:", now);

    const totalCost = await GodownOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: now },
        },
      },
      {
        $group: {
          _id: null, // Group all matching documents together
          totalCost: { $sum: "$totalPrice" }, // Sum up the `total` field
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
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGodownProduct,
  createGodownOrder,
  getAllGodownProducts,
  getAllGodownOrders,
  getAllGodownProductById,
  getGodownOrder,
  updateGodownProductById,
  updateGodownOrderById,
  deleteGodownProduct,
  deleteGodownOrder,
  bulkUploadGodownProducts,
  getRevenue,
  getAvailableProducts,
  transferInventory,
  getTotalCostByDate,
  getMovementLogs,
};
