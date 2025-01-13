// models
const PrintingOrder = require("../models/printing/printingOrderModel");

// response status code
const {
  NOT_FOUND,
  CREATED,
  SERVER_ERROR,
  OK,
  BAD_REQUEST,
} = require("../constants/responseStatusCode");

// create order: POST
const createOrder = async (req, res) => {
  // create new order handling
  const { description, totalPrice, price, quantity, contact, category } =
    req.body;

  try {
    const submission = await PrintingOrder.create({
      description,
      price,
      quantity,
      contact,
      category,
      totalPrice,
    });

    res.status(CREATED).json(submission);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// get orders
const getPrintingOrders = async (req, res) => {
  try {
    const orders = await PrintingOrder.find().sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No orders for now" });
    }
    res.status(OK).json(orders);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

// get order by id
const getSinglePrintingOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await PrintingOrder.findOne({ _id: id });

    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order Not found" });
    }

    res.status(OK).json(order);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get order", error: error.message });
  }
};

// update order
const updatePrintingOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.body;

    if (price <= 0 || quantity <= 0) {
      return res.status(BAD_REQUEST).json({
        message: "Price or quantity should not be zero and should be postive",
      });
    }

    const updates = req.body;

    const order = await PrintingOrder.findById(id);

    if (!order) {
      return res.status(BAD_REQUEST).json({ message: "Order not found" });
    }

    Object.keys(updates).forEach((key) => {
      order[key] = updates[key];
    });

    await order.save();

    res.status(OK).json({ message: "Updated sucessfully", order });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to update order", error: error.message });
  }
};

// delete order
const deletePrintingOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await PrintingOrder.findOneAndDelete({ _id: id });

    if (!deletedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }
    res.status(OK).json({ message: "Order deleted sucessfully", deletedOrder });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "in progress", "completed"].includes(status)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid status" });
    }

    const order = await PrintingOrder.findById(id);

    if (!order) {
      return res.status(NOT_FOUND).json({ error: "Order not found." });
    }

    order.status = status;
    await order.save();

    res.status(OK).json(order);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const revenueData = await PrintingOrder.aggregate([
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
    const totalCost = await PrintingOrder.aggregate([
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
  createOrder,
  getPrintingOrders,
  getSinglePrintingOrder,
  updatePrintingOrder,
  deletePrintingOrder,
  updateOrderStatus,
  getRevenue,
  getTotalCostByDate,
};
