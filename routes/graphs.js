const expres = require('express');
const graphsController = require('../controllers/graphs');

const router = expres.Router();
router.get('/statistics', graphsController.showGraphs);

module.exports = router;