const productService = require("../services/product");


async function showAllProducts(req, res) {
    const products = await productService.getAllProducts();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.render('../views/products', {products:products});

}

async function getProductById(req,res){
    const product = await productService.getProductById(req.params.id);
    if(!product){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(product);
}

async function showProductById(req,res){
    const product = await productService.getProductById(req.query.id);
    if(!product){
        return res.status(404).json({errors: ['not found']})
    }
    await res.render('../views/product', {product});
}


async function createProduct(req,res) {
    const product = await productService.createProduct(
        req.body.catagory,
        req.body.year,
        req.body.artist,
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.image);

    res.json(product);

}

async function updateProduct(req,res) {
    const product = await productService.updateProduct(
        req.body.catagory,
        req.body.year,
        req.body.artist,
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.image);

    res.json(product);
}

async function deleteProduct(req,res){
    const product = await productService.deleteProduct(req.params.id);
    if(!product){
        return res.status(404).json({errors: ['not found']})
    }
    res.send();
}


module.exports = {
    showAllProducts,
    getProductById,
    showProductById,
    createProduct,
    deleteProduct,
    updateProduct
}