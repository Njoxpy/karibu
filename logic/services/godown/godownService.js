const GodownOrder = require("../../models/godown/godownOrderModel");

const getGodownOrders = async (startDate, endDate) => {
  try {
    const orders = await GodownOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ createdAt: 1 });

    return orders;
  } catch (error) {
    throw new Error("Error fetching godown orders: " + error.message);
  }
};

module.exports = {
  getGodownOrders
}; 