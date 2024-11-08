const express = require("express");
const router = express.Router();
const init = require("../controllers/initdb");

router.get('/initdb-products', init.updateProductCollection);
router.get('/initdb-users', init.updateUsersCollection);


module.exports = router;
