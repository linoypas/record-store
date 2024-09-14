const productService = require('./product');
const Product = require('../models/product');


async function genresGraph(){
    genres = await productService.getListOfGenres();
    genresData = {};

    await Promise.all(genres.map(async (genre) => {
        const number = await getNumOfProductsInGenre(genre);
        genresData[genre] = number;
      }));

    return genresData;
}


async function getNumOfProductsInGenre(genre) {
    try{
        numberOfProducts = await Product.find({genre: genre});
        
        return numberOfProducts.length;
    } catch{
        return false;
    } 
}

async function pricesGraph(){
    try{
        allProductsPrices = await Product.find({}).select('price -_id');
        return allProductsPrices;
    } catch{
        return false;
    } 
}

module.exports = {
    genresGraph,
    pricesGraph
};