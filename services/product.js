// const { getAllProducts } = require('../controllers/product');
const product = require('../models/Product');
const mongoose = require('mongoose');

async function getAllProducts() {
    returnedProducts = await product.find({});
    return returnedProducts;
}

module.exports = {
    getAllProducts
};