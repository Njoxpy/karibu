const HardwareOrder = require("../../models/hardware/orderModel");

const getHardwareOrders = async (startDate, endDate) => {
  try {
    const orders = await HardwareOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    })
    .populate('productId', 'name')
    .sort({ createdAt: 1 });

    return orders.map(order => ({
      ...order.toObject(),
      productName: order.productId?.name || 'N/A'
    }));
  } catch (error) {
    throw new Error("Error fetching hardware orders: " + error.message);
  }
};

module.exports = {
  getHardwareOrders
}; 