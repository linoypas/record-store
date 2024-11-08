require('dotenv').config();
const productService = require("../services/product");
const { postProductToFacebook } = require("../services/facebookapi");

// Helper function to process request parameters
function checkParams(req) {
    const params = {
        collection: req.params.collection || '',
        sortBy: req.params.sortBy || '',
        genre: req.query.genre || 'all',
        maxPrice: req.query.maxPrice || undefined,
    };
    
    // Only set `inStock` if `showOnlyinStock` is provided in the query
    if (req.query.showOnlyinStock === 'true') {
        params.inStock = true;
    } else if (req.query.showOnlyinStock === 'false') {
        params.inStock = false;
    }

    console.log("checkParams - Generated Params:", params); // Debugging
    return params;
}

async function getAllProducts(req, res) {
    try {
        const params = checkParams(req);
        const products = await productService.getProducts(params);
        console.log("getAllProducts - Retrieved Products:", products); // Debugging

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
        console.error("getAllProducts - Error:", error); // Debugging
        res.status(500).json({ message: error.message });
    }
}

async function showProducts(req, res) {
    try {
        const params = checkParams(req);
        const products = await productService.getProducts(params);
        const genres = await productService.getListOfGenres();
        const maxPriceProduct = await productService.getMaxPriceProduct();
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;

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
                contentType: product.image.contentType,
            },
        }));

        console.log("showProducts - Rendered Products List:", productsList); // Debugging
        res.render('../views/products', { products: productsList, genres, username, isAdmin, maxPriceProduct });
    } catch (error) {
        console.error("showProducts - Error:", error); // Debugging
        res.status(500).json({ message: error.message });
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        const productData = {
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
        };
        console.log("getProductById - Retrieved Product Data:", productData); // Debugging
        res.json(productData);
    } catch (error) {
        console.error("getProductById - Error:", error); // Debugging
        res.status(500).json({ message: error.message });
    }
}

async function showProductById(req, res) {
    try {
        const product = await productService.getProductById(req.query.id);
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;

        const productData = {
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
                contentType: product.image.contentType,
            },
        };
        
        console.log("showProductById - Rendered Product Data:", productData); // Debugging
        res.render('../views/product', { product: productData, username, isAdmin });
    } catch (error) {
        console.error("showProductById - Error:", error); // Debugging
        res.status(500).json({ message: error.message });
    }
}

async function addProductPage(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;

    if (isAdmin) {
        try {
            const genres = await productService.getListOfGenres();
            res.render('../views/addProduct.ejs', { genres, username, isAdmin });
        } catch (error) {
            console.error("addProductPage - Error:", error); // Debugging
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).render('../views/error', { message: "PERMISSION DENIED", isAdmin, username });
    }
}

async function createProduct(req, res) {
    const requiredFields = ['genre', 'year', 'artist', 'name', 'price', 'description', 'file'];
    const missingFields = requiredFields.filter(field => !req.body[field] && !req.file);

    if (missingFields.length) {
        return res.status(400).send("חלק מהשדות ריקים, נסה שוב");
    }

    req.body.inStock = req.body.inStock || false;

    try {
        // Create the product
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

        res.status(200).send('המוצר התווסף בהצלחה');

        // Check if the "Publish to Facebook" checkbox was selected
        if (req.body.publishFacebook === 'true' || req.body.publishFacebook === 'on') {
            try {
                console.log('Posting product to Facebook...');
                await postProductToFacebook(product);
                console.log('Product posted to Facebook successfully');
            } catch (error) {
                console.error('Failed to post product to Facebook:', error);
            }
        }

    } catch (error) {
        console.error("createProduct - Error:", error);
        res.status(500).send("חלה שגיאה בעת יצירת המוצר");
    }
}

async function updateProduct(req, res) {
    req.body.inStock = req.body.inStock || false;

    let file;
    try {
        if (!req.file) {
            const existingProduct = await productService.getProductById(req.params.id);
            file = { buffer: existingProduct.image.data, mimetype: existingProduct.image.contentType };
        } else {
            file = req.file;
        }

        const updatedProduct = await productService.updateProduct(
            req.params.id,
            req.body.category,
            req.body.year,
            req.body.artist,
            req.body.name,
            req.body.price,
            req.body.description,
            file,
            req.body.inStock
        );

        console.log("updateProduct - Updated Product Data:", updatedProduct); // Debugging
        res.json(updatedProduct);
    } catch (error) {
        console.error("updateProduct - Error:", error); // Debugging
        res.status(500).send("חלה שגיאה בעת עדכון המוצר");
    }
}

async function deleteProduct(req, res) {
    try {
        await productService.deleteProduct(req.params.id);
        console.log("deleteProduct - Product Deleted:", req.params.id); // Debugging
        res.status(200).send('המוצר נמחק בהצלחה');
    } catch (error) {
        console.error("deleteProduct - Error:", error); // Debugging
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
    addProductPage,
};