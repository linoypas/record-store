const expres = require('express');
const productController = require('../controllers/user');

const router = expres.Router();


router.post('/signup',productController.addUser);
router.post('/signin',productController.searchUser);


// only for admins
router.get('/users',productController.listUsers);
router.get('/user/:id', productController.getUser);
router.put('/user/:id', productController.updateUser)
router.post('/user/:id', productController.deleteUser)

module.exports = router;