const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController'); // Import your controller

// Define the /maps route
router.get('/maps', mapsController.getMaps);

// Export the router
module.exports = router;
