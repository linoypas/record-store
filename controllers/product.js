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
    //handle in stock
    if(req.query.showOnlyinStock != null && req.query.showOnlyinStock == 'true')
        params['inStock'] = true;
    //handle max Price 
    if(req.query.maxPrice !=null )
        params['maxPrice'] = req.query.maxPrice;
    return params;
}

async function getAllProducts(req, res) {
    console.log(checkParams(req));
    const products = await productService.getProducts(checkParams(req));
    if(!products){
        return res.status(404).json({errors: ['not found']})
    }

    
    const productsList = products.map(product => ({
        _id: product._id,
        genre: product.genre,
        year: product.year,
        artist: product.artist,
        name: product.name,
        price: product.price,
        description: product.description,
        inStock: product.inStock,
        imageData: product.image.data.toString('base64'), 
        imageContentType: product.image.contentType,

      }));

      res.json(productsList);
}

async function showProducts(req, res) {
    console.log(checkParams(req));
    const products = await productService.getProducts(checkParams(req));
    const genres = await productService.getListOfGenres();
    const maxPriceProduct = await productService.getMaxPriceProduct();
    if(!products || !genres){
        return res.status(404).json({errors: ['not found']})
    }

    const productsList = products.map(product => ({
        _id: product._id,
        genre: product.genre,
        year: product.year,
        artist: product.artist,
        name: product.name,
        price: product.price,
        description: product.description,
        inStock: product.inStock,
        image: {
          data: product.image.data.toString('base64'), 
          contentType: product.image.contentType
        }
      }));

    res.render('../views/products', {products:productsList, genres:genres, maxPriceProduct:maxPriceProduct});
}


async function getProductById(req,res){
    const product = await productService.getProductById(req.params.id);
    if(!product) {
        return res.status(404).json({errors: ['not found']})
    } 
    
    const productData  = {
        _id: product._id,
        genre: product.genre,
        year: product.year,
        artist: product.artist,
        name: product.name,
        price: product.price,
        description: product.description,
        inStock: product.inStock,
        imageData: product.image.data.toString('base64'), 
        imageContentType: product.image.contentType
    };

    res.json(productData);
}

async function showProductById(req,res){
    const product = await productService.getProductById(req.query.id);
    if(!product){
        return res.status(404).json({errors: ['not found']})
    }

    const productData  = {
        _id: product._id,
        genre: product.genre,
        year: product.year,
        artist: product.artist,
        name: product.name,
        price: product.price,
        description: product.description,
        inStock: product.inStock,
        image: {
          data: product.image.data.toString('base64'), 
          contentType: product.image.contentType
        }
    };
    
    await res.render('../views/product', {product: productData});
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
        || req.body.price == null || req.body.description == null || req.file == null) {
            res.status(400).send("חלק מהשדות ריקים, נסה שוב")

        } else{
            if(req.body.inStock == null)
                req.body.inStock = false

            const product = await productService.createProduct(
                req.body.genre,
                req.body.year,
                req.body.artist,
                req.body.name,
                req.body.price,
                req.body.description, 
                req.file,
                req.body.inStock
            );
            
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
    if(req.body.inStock == null)
        req.body.inStock = false

    let file;
    if(req.file == null){
        const getProduct = await productService.getProductById(req.params.id);
        file = {buffer: getProduct.image.data, mimetype:  getProduct.image.contentType};
    }else{
        file = req.file;
    }
    const product = await productService.updateProduct(
        req.params.id,
        req.body.catagory,
        req.body.year,
        req.body.artist,
        req.body.name,
        req.body.price,
        req.body.description,
        file,
        req.body.inStock);

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