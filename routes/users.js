const expres = require('express');
const userController = require('../controllers/user');

const router = expres.Router();

router.get('/users',userController.listUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser)
router.post('/user/:id', userController.deleteUser)

module.exports = router;