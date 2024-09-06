const expres = require('express');
const productController = require('../controllers/product');

const router = expres.Router();


router.post('/products/add_product',productController.createProduct);
router.get('/products/add_product', productController.addProductPage);

router.get('/products',productController.showProducts);
router.get('/products/:collection',productController.showProducts);
router.get('/product', productController.showProductById);

router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

module.exports = router;