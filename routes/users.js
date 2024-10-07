const expres = require('express');
const userController = require('../controllers/user');

const router = expres.Router();

router.get('/users',userController.showUsers);
router.get('/user/:id', userController.getUser);
//router.post('/user/:username', userController.addUser);
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router;