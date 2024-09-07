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
    console.log(checkParams(req));
    const products = await productService.getProducts(checkParams(req));
    const genres = await productService.getListOfGenres();
    if(!products || !genres){
        return res.status(404).json({errors: ['not found']})
    }
    res.render('../views/products', {products:products, genres:genres});
}


async function getProductById(req,res){
    const product = await productService.getProductById(req.params.id);
    if(!product) {
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

async function addProductPage(req, res) {
    const genres = await productService.getListOfGenres();
    if(!genres){
        return res.status(404).json({errors: ['not found']})
    }
    res.render('../views/addProduct.ejs', {genres:genres});
}

async function createProduct(req,res) {
    if( req.body.genre == null || req.body.year == null || req.body.artist == null || req.body.artist == null || req.body.name == null
        || req.body.price == null || req.body.description == null || req.body.image == null) {
            res.status(400).send("חלק מהשדות ריקים, נסה שוב")

        } else{
            const product = await productService.createProduct(
                req.body.genre,
                req.body.year,
                req.body.artist,
                req.body.name,
                req.body.price,
                req.body.description, 
                req.body.image);
            
            if(product){
                console.log('done: create product')
                res.status(200).send('המוצר התווסף בהצלחה');
            }  
            else {
                console.log('fail: create product')
                res.status(500).send("חלה שגיאה בעת יצירת המוצר");
            }      
        }

}

async function updateProduct(req,res) {
    const product = await productService.updateProduct(
        req.params.id,
        req.body.catagory,
        req.body.year,
        req.body.artist,
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.image);

    if(!product){
        console.log('fail: create product')
        res.status(500).send("חלה שגיאה בעת עדכון המוצר");
    }
    console.log('done: update product');
    res.json(product);
}

async function deleteProduct(req,res){
    const product = await productService.deleteProduct(req.params.id);
    if(product){
        console.log('done: delete product')
        res.status(200).send('המוצר נמחק בהצלחה');
    } else{
        console.log('fail: delete product')
        res.status(500).send("חלה שגיאה בעת מחיקת המוצר");
    }
       
}

module.exports = {
    showProducts,
    getProductById,
    showProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    addProductPage
}