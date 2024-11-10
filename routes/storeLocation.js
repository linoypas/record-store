const express = require('express');
const router = express.Router();
const storeLocationController = require('../controllers/storeLocationController');

// Get all store locations
router.get('/store-locations', storeLocationController.getAllStoreLocations);

// Add a new store location
router.post('/store-locations', storeLocationController.addStoreLocation);

module.exports = router;
