const PrintingOrder = require("../../models/printing/printingOrderModel");

const getPrintingOrderss = async (startDate, endDate) => {
  try {
    const orders = await PrintingOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate({
        path: "productId",
        select: "name",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: 1 });

    return orders.map((order) => ({
      ...order.toObject(),
      productName: order.productId?.name || "N/A",
    }));
  } catch (error) {
    throw new Error("Error fetching printing orders: " + error.message);
  }
};

module.exports = {
  getPrintingOrderss,
};
