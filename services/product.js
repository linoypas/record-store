const product = require('../models/Product');
const mongoose = require("mongoose");

async function getAllProducts() {
    try {
        const returnedProducts = await product.find({});
        if(!returnedProducts) {
          return null;
        }
        return returnedProducts;
    } catch (error) {
        return null;
    }
}

async function getProductById(id){
    if (!mongoose.isValidObjectId(id)){
        return null;
    }
    try {
        const returnedProduct = await product.findById(id.trim());
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
    return product.schema.path('genre').options.enum;
}

async function createProduct(catagory, year, artist, name, price, description, image ) {
    const product = new Product({
        catagory: catagory,
        year: year,
        artist: artist,
        name: name,
        price: price,
        description: description,
        image: image
    });

    await product.save();
    return product;
}

async function updateProduct(id, catagory, year, artist, name, price, description, image ) {
    const product = await product.findById(id);
    if(!product)
        return null;

    product.catagory = catagory;
    product.year = year;
    product.artist = artist;
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;

    await product.save();
    return product;
}

async function deleteProduct(id){
    try {
        const product = await product.findById(id);
        if(!product) {
          return null;
        }
        await product.remove();    
        return product;
    } catch (error) {
        return null;
    }   
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getListOfGenres
};