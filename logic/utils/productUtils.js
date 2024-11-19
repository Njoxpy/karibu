const Product = require("../models/animalFedding/productModel")

const findProductById = async (productId) => {
    return await Product.findById(productId)
}

const deleteProductById = async (productId) => {
    return await Product.findByIdAndDelete(productId)
}

module.exports = { findProductById, deleteProductById }