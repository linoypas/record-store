const expres = require('express');
const userController = require('../controllers/user');

const router = expres.Router();

router.get('/users',userController.showUsers);
router.get('/user/:id', userController.getUser);
router.get('/users/addUser', userController.addUserPage)
router.post('/users/addUser', userController.createUser)

router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/profile', userController.showProfile);

module.exports = router;