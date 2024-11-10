const express = require('express');
const router = express.Router();
const storeLocationController = require('../controllers/storeLocationController');

router.get('/store-locations', storeLocationController.getAllStoreLocations);
router.post('/store-locations', storeLocationController.addStoreLocation);

module.exports = router;
