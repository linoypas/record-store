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
    try {
        console.log(id);
        const returnedProduct = await Product.findById(id.trim());
        if(!returnedProduct) {
          return null;
        }
        return returnedProduct;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function getListOfGenres() {
    return Product.schema.path('genre').options.enum;
}

async function createProduct(genre, year, artist, name, price, description, image ) {
    const newProduct = new Product({
        genre: genre,
        year: year,
        artist: artist,
        name: name,
        price: price,
        description: description,
        image: image
    });

    try{
        await newProduct.save();
        return true;
    } catch(err){
        console.log(err);
        return false;
    }
}

async function updateProduct(id, catagory, year, artist, name, price, description, image ) {
    const Product = await Product.findById(id.trim());
    if(!Product)
        return null;

    Product.catagory = catagory;
    Product.year = year;
    Product.artist = artist;
    Product.name = name;
    Product.price = price;
    Product.description = description;
    Product.image = image;

    await Product.save();
    return Product;
}

async function deleteProduct(id){
    try{
        await Product.findByIdAndDelete(id.trim());
        return true;
    } catch{
        return false;
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getListOfGenres,
};