const GodownOrder = require("../../models/godown/godownOrderModel");

const getGodownOrders = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0); // Ensure it starts at midnight UTC

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // Ensure it includes the whole day

    return await GodownOrder.find({
      createdAt: { $gte: start, $lte: end },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching animal feeding orders");
  }
};

module.exports = {
  getGodownOrders,
};
