const productService = require('./product');
const product = require('../models/product');


async function GenresGraph(){
    genres = await productService.getListOfGenres();
    genresData = {};

    await Promise.all(genres.map(async (genre) => {
        const number = await getNumOfProductsGenre(genre);
        genresData[genre] = number;
      }));
    return genresData;
}


async function getNumOfProductsGenre(genre) {
    try{
        numberOfProducts = await product.find({genre: genre});
        return numberOfProducts.length;
    } catch{
        return false;
    } 
}

module.exports = {
    GenresGraph
};