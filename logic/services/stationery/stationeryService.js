const StationeryOrder = require("../../models/stationery/stationerOrderModel");

const getStationeryOrderss = async (startDate, endDate) => {
  try {
    const orders = await StationeryOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate("productId", "name")
      .sort({ createdAt: 1 });

    return orders.map((order) => ({
      ...order.toObject(),
      productName: order.productId?.name || "N/A",
    }));
  } catch (error) {
    throw new Error("Error fetching stationery orders: " + error.message);
  }
};

module.exports = {
  getStationeryOrderss,
};
