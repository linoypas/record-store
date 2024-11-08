const express = require('express');
const router = express.Router();
const { fetchConversionRates } = require('../services/currencyService');

// Route to fetch the exchange rate
router.get('/api/exchange-rate', async (req, res) => {
    try {
        const rates = await fetchConversionRates();
        res.json(rates);
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        res.status(500).json({ error: "Error fetching exchange rate" });
    }
});

module.exports = router;