const expres = require('express');
const userController = require('../controllers/user');

const router = expres.Router();

router.get('/users',userController.listUsers);
router.get('/user/:username', userController.getUser);
router.put('/user/:username', userController.updateUser)
router.post('/user/:username', userController.deleteUser)

module.exports = router;