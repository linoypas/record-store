const Product = require('../models/product');

async function sortbyDefault(queryParams) {
    const returnedProducts = await Product.find(queryParams);
    return returnedProducts;
}

async function sortByYear(queryParams) {
    const returnedProducts = await Product.find(queryParams).sort([['year', -1]]);
    return returnedProducts;
}

async function sortByPriceLowToHigh(queryParams) {
    const returnedProducts = await Product.find(queryParams).sort([['price', 1]]);
    return returnedProducts;
}

async function sortByPriceHighToLow(queryParams) {
    const returnedProducts = await Product.find(queryParams).sort([['price', -1]]);
    return returnedProducts;
}

module.exports = {
    sortbyDefault,
    sortByYear,
    sortByPriceLowToHigh,
    sortByPriceHighToLow,
};