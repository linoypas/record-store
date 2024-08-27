const productService = require('./product');
const product = require('../models/Product');

async function sortByYear() {
    const returnedProducts = await product.find({}).sort([['year', -1]]);
    return returnedProducts;
}

async function sortByPriceLowToHigh() {
    const returnedProducts = await product.find({}).sort([['price', 1]]);
    return returnedProducts;
}

async function sortByPriceHighToLow() {
    const returnedProducts = await product.find({}).sort([['price', -1]]);
    return returnedProducts;
}

module.exports = {
    sortByYear, 
    sortByPriceLowToHigh, 
    sortByPriceHighToLow
};