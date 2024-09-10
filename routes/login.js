const expres = require('express');
const loginController = require('../controllers/login');

const router = expres.Router();

router.post('/login',loginController.login);
router.get('/login',loginController.loginForm);
router.post('/register',loginController.register);
router.get('/register',loginController.registerForm);

module.exports = router;