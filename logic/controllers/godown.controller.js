const mongoose = require("mongoose");

// CRUD
const GodownProduct = require("../models/godown/godownProductModel");

const Inventory = require("../models/godown/godownProductModel"); // Assuming Inventory model for locations
const InventoryMovement = require("../models/godown/inventoryModel"); // Inventory Movement log model
const GodownOrder = require("../models/godown/godownOrderModel");

// response code
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require("../constants/responseStatusCode");

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
    const { name, price, quantity, location, description, userId } = req.body;

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
    const { productId, quantity, userId } = req.body;

    if (quantity == null || !productId || !userId) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    // fetch product
    const productDetails = await GodownProduct.findById(productId);
    if (!productDetails) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    if (productDetails.quantity < quantity) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Insufficient product quantity available" });
    }

    productDetails.quantity -= quantity;
    await productDetails.save();

    const totalPrice = productDetails.price * quantity;

    const newOrder = await GodownOrder.create({
      productId,
      quantity,
      userId,
      totalPrice,
    });

    res.status(CREATED).json(newOrder);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create order", error: error.message });
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
    const orders = await GodownOrder.find().sort({ createdAt: -1 });

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
    const { price, quantity } = req.body;

    if (price <= 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Price cannot be negative" });
    }

    if (quantity < 0) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Quantity cannot be negative" });
    }

    const updates = req.body;

    const product = await GodownProduct.findById(id);

    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }

    if (quantity === 0) {
      product.condition = "Out of Stock"; // or set an "out of stock" status field
    }

    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

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

// update order by id
const updateGodownOrderById = async (req, res) => {
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
    const order = await GodownOrder.findById(id);
    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found." });
    }

    // If quantity is updated, ensure the product has enough stock
    if (quantity && productId) {
      const product = await GodownProduct.findById(productId);
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
  const {
    selectedItemId,
    transferQuantity,
    destination,
    transferredBy,
    reason,
  } = req.body;

  try {
    // Validate incoming request data
    if (
      !selectedItemId ||
      !transferQuantity ||
      !destination ||
      !transferredBy
    ) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please fill in all required fields." });
    }

    // Step 1: Fetch the product from the GodownProduct model
    const product = await GodownProduct.findById(selectedItemId);
    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found." });
    }

    // Step 2: Ensure the product has enough stock
    if (transferQuantity > product.quantity) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Transfer quantity exceeds available stock." });
    }

    // Step 3: Create an Inventory Movement log
    const movementData = {
      product: selectedItemId,
      transferQuantity,
      origin: product.location, // Assuming product has a location field
      destination,
      transferredBy,
      reason,
    };

    const newMovement = new InventoryMovement(movementData);
    await newMovement.save();

    // Step 4: Decrease the quantity at the origin location
    product.quantity -= transferQuantity;
    await product.save();

    // Step 5: Check if the product exists in the destination location
    let destinationInventory = await Inventory.findOne({
      product: selectedItemId,
      location: destination,
    });

    if (!destinationInventory) {
      // If it doesn't exist, create a new entry in the destination location
      destinationInventory = new Inventory({
        product: selectedItemId,
        location: destination,
        quantity: transferQuantity,
      });
    } else {
      // Otherwise, update the existing inventory
      destinationInventory.quantity += transferQuantity;
    }

    await destinationInventory.save();

    // Step 6: Respond with success
    res.status(OK).json({
      message: `Successfully transferred ${transferQuantity} units of ${product.name} from ${product.location} to ${destination}`,
      data: {
        product: product.name,
        transferredQuantity: transferQuantity,
        origin: product.location,
        destination,
        transferredBy,
        reason,
      },
    });
  } catch (error) {
    console.error("Error during inventory movement:", error);
    res.status(SERVER_ERROR).json({
      error: "Error processing inventory movement.",
      details: error.message,
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
};
