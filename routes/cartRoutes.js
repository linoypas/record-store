const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');

router.get('/', async (req, res) => {
    const username = req.user ? req.user.username : 'Guest'; // Get username from session or default to 'Guest'
    try {
        const cart = await cartService.getCartByUsername(username);
        console.log('Cart before rendering:', cart); // Log the cart here
        const totalAmount = await cartService.calculateTotalByUsername(username);
        res.render('cart', { cart, totalAmount });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
