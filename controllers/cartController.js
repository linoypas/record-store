const cartService = require('../services/cartService');

async function getCart(req, res) {
    const username = req.user ? req.user.username : 'Guest'; // Assuming you have user authentication in place
    const cart = await cartService.getCart(username);
    res.json(cart);
}

async function addItem(req, res) {
    const username = req.user ? req.user.username : 'Guest';
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(username, productId, quantity);
    res.status(201).json(cart);
}

async function updateItem(req, res) {
    const username = req.user ? req.user.username : 'Guest';
    const { productId, quantity } = req.body;
    const cart = await cartService.updateItemQuantity(username, productId, quantity);
    res.json(cart);
}

async function removeItem(req, res) {
    const username = req.user ? req.user.username : 'Guest';
    const { productId } = req.body;
    const cart = await cartService.removeItemFromCart(username, productId);
    res.json(cart);
}

module.exports = {
    getCart,
    addItem,
    updateItem,
    removeItem,
};
