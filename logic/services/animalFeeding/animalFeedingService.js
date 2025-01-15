const AnimalFeedingOrder = require("../../models/animalFeeding/animalFeedingOrderModel");

const getAnimalFeedingOrders = async (startDate, endDate) => {
  try {
    return await AnimalFeedingOrder.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("productId", "name description price nutrients");
  } catch (error) {
    throw new Error("Error fetching animal feeding orders");
  }
};

module.exports = { getAnimalFeedingOrders };
