const AnimalFeedingProduct = require('../models/animalFeeding/animalFeedingProductModel');
const FreshOilProduct = require("../models/freshOil/freshOilproductModel")
const GodownProduct = require('../models/godown/godownProductModel');
const HardwareProduct = require('../models/hardware/productModel');
const StationeryProduct = require('../models/stationery/stationeryProductModel');
const User = require('../models/user/userModel');

const getModelByType = (type) => {
    switch (type) {
        case 'animal-feeding':
            return AnimalFeedingProduct;
        case 'stationery':
            return StationeryProduct;
        case 'hardware':
            return HardwareProduct;
        case 'fresh-oil':
            return FreshOilProduct;
        case 'users':
            return User;
        case 'godown':
            return GodownProduct;
        default:
            throw new Error('Invalid report type');
    }
};

module.exports = getModelByType;
