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

    try {
        const products = await productService.getProducts(checkParams(req));

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
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

async function showProducts(req, res) {
    try {
        const products = await productService.getProducts(checkParams(req));
        const genres = await productService.getListOfGenres();
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;
        const maxPriceProduct = await productService.getMaxPriceProduct();
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
          res.render('../views/products', {products:productsList, genres:genres, username,isAdmin, maxPriceProduct:maxPriceProduct});
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}


async function getProductById(req,res){

    try {
        const product = await productService.getProductById(req.params.id);
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
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

async function showProductById(req,res){
    try {
        const product = await productService.getProductById(req.query.id);
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;

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
        res.render('../views/product', {product: productData,username,isAdmin});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

}

async function addProductPage(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    if(isAdmin)
        try {
            const genres = await productService.getListOfGenres();
            res.render('../views/addProduct.ejs', {genres:genres,username,isAdmin});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    else
        res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});
}

async function createProduct(req,res) {
    if( req.body.genre == null || req.body.year == null || req.body.artist == null || req.body.artist == null || req.body.name == null
        || req.body.price == null || req.body.description == null || req.file == null) {
            res.status(400).send("חלק מהשדות ריקים, נסה שוב")

        } else{
            if(req.body.inStock == null)
                req.body.inStock = false
            try {
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
                console.log('done: create product')
                res.status(200).send('המוצר התווסף בהצלחה');

            } catch(err){
                console.log('fail: create product')
                res.status(500).send("חלה שגיאה בעת יצירת המוצר");
            }

        }
}

async function updateProduct(req,res) {
    if(req.body.inStock == null)
        req.body.inStock = false

    let file;
    try{
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
        res.json(product);

        } catch(err){
            console.log('fail: create product')
            res.status(500).send("חלה שגיאה בעת עדכון המוצר");

        }
}

async function deleteProduct(req,res){
    try{
        const product = await productService.deleteProduct(req.params.id);
        res.status(200).send('המוצר נמחק בהצלחה');

    } catch(err){
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