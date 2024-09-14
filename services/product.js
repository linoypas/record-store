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

async function getMaxPriceProduct(){
    try{
        const maxPriceProduct = await Product.find({}).sort({price : -1}).limit(1);
        return maxPriceProduct[0]['price'];
    } catch{
        return false;
    }
};

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

    try{
        await newProduct.save();
        return true;
    } catch(err){
        console.log(err);
        return false;
    }
}

async function updateProduct(id, catagory, year, artist, name, price, description, image, inStock ) {
    const updatedProduct = await Product.findById(id.trim());
    if(!updatedProduct)
        return null;

    console.log(id);
    console.log(catagory)
    console.log(year)
    console.log(artist)
    console.log(name)
    console.log(price)
    console.log(description)
    console.log(image)

    updatedProduct.catagory = catagory;
    updatedProduct.year = year;
    updatedProduct.artist = artist;
    updatedProduct.name = name;
    updatedProduct.price = price;
    updatedProduct.description = description;
    updatedProduct.image.data = image.buffer;
    updatedProduct.image.contentType = image.mimetype;
    updatedProduct.inStock = inStock;

    try{
        await updatedProduct.save();
        return updatedProduct;
    } catch(err){
        console.log(err);
        return null;
    }
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
    getMaxPriceProduct,
};