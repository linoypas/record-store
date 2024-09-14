const sortProducts = require('./sortProducts')
const Product = require('../models/product');
const mongoose = require("mongoose");


async function getProducts(params) {
    let queryParams = {};
    if(params.collection == "new"){
        const lastYear = new Date().getFullYear() - 1;
        queryParams["year"] = {$gte:lastYear};
    }
    if (params.genre != "all")
        queryParams["genre"] = params.genre;

    if(params.inStock != null)
        queryParams["inStock"] = params.inStock;

    if(params.maxPrice !=null)
        queryParams['price'] = { $lte: params.maxPrice };
    
    if(params.sortBy == ""){
        return sortProducts.sortbyDefault(queryParams);
    } else{
        if(params.sortBy == 'default')
            return sortProducts.sortbyDefault(queryParams); 
        if(params.sortBy == 'newest')
            return sortProducts.sortByYear(queryParams);
        if(params.sortBy == 'priceAscending')
            return sortProducts.sortByPriceLowToHigh(queryParams);
        if(params.sortBy == 'priceDescending')
            return sortProducts.sortByPriceHighToLow(queryParams);
    }
}

async function getProductById(id){
    if (!mongoose.isValidObjectId(id)){
        return null;
    }
    const returnedProduct = await Product.findById(id.trim());
    return returnedProduct;
}

async function getListOfGenres() {
    return Product.schema.path('genre').options.enum;
}

async function getMaxPriceProduct(){
    const maxPriceProduct = await Product.find({}).sort({price : -1}).limit(1);
    return maxPriceProduct[0]['price'];
}

async function createProduct(genre, year, artist, name, price, description, image, inStock) {
    const newProduct = new Product({
        genre: genre,
        year: year,
        artist: artist,
        name: name,
        price: price,
        description: description,
        image: {
            data: image.buffer,
            contentType: image.mimetype
          },
        inStock: inStock
    });

    savedProduct = await newProduct.save();
    return savedProduct;

}

async function updateProduct(id, catagory, year, artist, name, price, description, image, inStock ) {
    const updatedProduct = await Product.findById(id.trim());
    if(!updatedProduct)
        return null;

    updatedProduct.catagory = catagory;
    updatedProduct.year = year;
    updatedProduct.artist = artist;
    updatedProduct.name = name;
    updatedProduct.price = price;
    updatedProduct.description = description;
    updatedProduct.image.data = image.buffer;
    updatedProduct.image.contentType = image.mimetype;
    updatedProduct.inStock = inStock;
    await updatedProduct.save();
    return updatedProduct;
}

async function deleteProduct(id){
    await Product.findByIdAndDelete(id.trim());
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getListOfGenres,
    getMaxPriceProduct,
};