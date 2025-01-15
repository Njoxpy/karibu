const FreshOilOrder = require("../../models/freshOil/freshOilOrderModel");

const getFreshOilOrders = async (startDate, endDate) => {
  try {
    const orders = await FreshOilOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ createdAt: 1 });

    return orders;
  } catch (error) {
    throw new Error("Error fetching fresh oil orders: " + error.message);
  }
};

module.exports = {
  getFreshOilOrders
};
