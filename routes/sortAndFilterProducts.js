const expres = require('express');
const productController = require('../controllers/product');

const router = expres.Router();

router.get('/products/:collection/:sortBy',productController.getAllProducts);

module.exports = router;
