// const { getAllProducts } = require('../controllers/product');
const product = require('../models/Product');

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
    try {
        const returnedProduct = await product.findById(id);
        if(!returnedProduct) {
          return null;
        }
        return returnedProduct;
    } catch (error) {
        console.log(error)
        return null;
    }
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
    updateProduct
};