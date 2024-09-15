const expres = require('express');
const graphsController = require('../controllers/graphs');

const router = expres.Router();
router.get('/statistics', graphsController.showGraphsPage);
router.get('/statistics/genresGraph', graphsController.getGenresGraph);
router.get('/statistics/pricesGraph', graphsController.getPricesGraph);


module.exports = router;