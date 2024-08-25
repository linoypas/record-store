const expres = require('express');
const productController = require('../controllers/product');

const router = expres.Router();

router.get('/products',productController.showAllProducts);
router.get('/product', productController.showProductById);

router.post('/product',productController.createProduct);
router.patch('/product', productController.createProduct)
router.delete('/product', productController.deleteProduct)

module.exports = router;