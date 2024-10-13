const expres = require('express');
const orderController = require('../controllers/orders');

const router = expres.Router();

router.get('/orders',orderController.showorders);
router.get('/order/:id', orderController.getorder);
//router.post('/order/:ordername', orderController.addorder);
router.put('/order/:id', orderController.updateorder)
router.delete('/order/:id', orderController.deleteorder)

module.exports = router;