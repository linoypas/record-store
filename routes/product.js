const expres = require('express');
const productController = require('../controllers/product');

const router = expres.Router();
  
// router.route('/').get(productController.getAllProducts);
router.get('/', productController.form);


module.exports = router;