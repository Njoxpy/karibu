const AnimalFeedingOrder = require("../../models/animalFeeding/animalFeedingOrderModel");

const getAnimalFeedingOrders = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0); // Ensure it starts at midnight UTC

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // Ensure it includes the whole day

    return await AnimalFeedingOrder.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("productId", "name description price nutrients");
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching animal feeding orders");
  }
};

module.exports = { getAnimalFeedingOrders };
