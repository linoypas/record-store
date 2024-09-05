const product = require('../models/product');

async function sortbyDefault(queryParams) {
    try {
        const returnedProducts = await product.find(queryParams);
        if(!returnedProducts) {
          return null;
        }
        return returnedProducts;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function sortByYear(queryParams) {
    try {
        const returnedProducts = await product.find(queryParams).sort([['year', -1]]);
        if(!returnedProducts) {
          return null;
        }
        return returnedProducts;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function sortByPriceLowToHigh(queryParams) {
    try {
        const returnedProducts = await product.find(queryParams).sort([['price', 1]]);
        if(!returnedProducts) {
          return null;
        }
        return returnedProducts;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function sortByPriceHighToLow(queryParams) {
    try {
        const returnedProducts = await product.find(queryParams).sort([['price', -1]]);
        if(!returnedProducts) {
          return null;
        }
        return returnedProducts;
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = {
    sortbyDefault,
    sortByYear,
    sortByPriceLowToHigh,
    sortByPriceHighToLow,
};