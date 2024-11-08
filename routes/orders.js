const expres = require('express');
const orderController = require('../controllers/orders');

const router = expres.Router();

router.get('/orders',orderController.showorders);
router.get('/order/:id', orderController.getorder);
router.put('/order/:id', orderController.updateorder)
router.delete('/order/:id', orderController.deleteorder)
//router.get('/orders/cart/:id',orderController.showcart);
router.put('/order/cart/:id', orderController.updatecart)
//router.post('/order/:id', orderController.createorder)

module.exports = router;