const express = require("express");
const { home } = require("nodemon/lib/utils");
const router = express.Router();
const homeController = require("../controllers/homePage");

router.get('/', homeController.gethomepage);

module.exports = router;
