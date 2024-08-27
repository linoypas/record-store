const sortProductService = require('../services/sortProducts');
const productService = require('../services/product');

async function sortbyDefault(req, res) {
    const products = await productService.getAllProducts();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(products);
}

async function sortByYear(req, res) {
    const products = await sortProductService.sortByYear();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(products);
}

async function sortByPriceLowToHigh(req, res) {
    const products = await sortProductService.sortByPriceLowToHigh();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(products);
}

async function sortByPriceHighToLow(req, res) {
    const products = await sortProductService.sortByPriceHighToLow();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(products);
}

module.exports = { 
    sortByYear, 
    sortByPriceLowToHigh, 
    sortByPriceHighToLow,
    sortbyDefault
};