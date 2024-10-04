const expres = require('express');
const homePageController = require('../controllers/homePage');

const router = expres.Router();
router.get('/', homePageController.showHomePage);

module.exports = router;