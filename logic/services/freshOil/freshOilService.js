const FreshOilOrder = require("../../models/freshOil/freshOilOrderModel");

const getFreshOilOrders = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0); // Ensure it starts at midnight UTC

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // Ensure it includes the whole day

    return await FreshOilOrder.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("productId", "name description price nutrients");
  } catch (error) {
    throw new Error("Error fetching animal feeding orders");
  }
};

module.exports = {
  getFreshOilOrders,
};
