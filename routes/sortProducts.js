const expres = require('express');
const sortProductsController = require('../controllers/sortProducts');

const router = expres.Router();

router.get("/priceAscending", sortProductsController.sortByPriceLowToHigh);
router.get("/priceDescending", sortProductsController.sortByPriceHighToLow);
router.get("/newest", sortProductsController.sortByYear);
router.get("/default", sortProductsController.sortbyDefault);

module.exports = router;
