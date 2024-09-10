const productService = require('./product');


async function GenresGraph(){
    genres = productService.getListOfGenres();
    genres.forEach(element => {
        console.log(element)
    });
}

module.exports = {
    GenresGraph
};