const productService = require("../services/product");


function checkParams(req){
    params = {}
    // handle collection
    if(req.params.collection != null)
        params['collection'] = req.params.collection;
    else
        params['collection'] = '';
    // handle sort
    if(req.params.sortBy !=null)
        params['sortBy'] = req.params.sortBy;
    else
        params['sortBy'] = '';
    // handle genre
    if(req.query.genre != null)
        params['genre'] = req.query.genre;
    else
        params['genre'] = 'all';
    return params;
}

async function getAllProducts(req, res) {
    const products = await productService.getProducts(checkParams(req));
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(products);
}

async function showProducts(req, res) {
    const products = await productService.getProducts(checkParams(req));
    const genres = await productService.getListOfGenres();
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }
    res.render('../views/products', {products:products, genres:genres});
}

// async function showNewProducts(req, res) {
//     const products = await productService.getNewProducts();
//     const genres = await productService.getListOfGenres();
//     if(!products){
//         return res.status(404).json({errors: ['not found']})
//     }
//     res.render('../views/products', {products:products, genres:genres});
// }



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
    showProducts,
    getProductById,
    showProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
}