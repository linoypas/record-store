const expres = require('express');
const productController = require('../controllers/product');
const router = expres.Router();
const multer = require('multer');
const upload = multer(); // Middleware for handling file uploads

router.post('/products/add_product', upload.single('image'),productController.createProduct);
router.get('/products/add_product', productController.addProductPage);

router.get('/products',productController.showProducts);
router.get('/products/:collection',productController.showProducts);
router.get('/product', productController.showProductById);

router.get('/product/:id', productController.getProductById);
router.put('/product/:id',upload.single('image'), productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

module.exports = router;