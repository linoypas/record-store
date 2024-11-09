const Cart = require('../models/Cart');
const Product = require('../models/product');
const User = require('../models/User');

async function getCartByUsername(username) {
    console.log(`Fetching cart for username: ${username}`);

    if (username === 'Guest') {
        console.log('Handling guest user.');
        let cart = await Cart.findOne({ isGuest: true });

        if (!cart) {
            console.log('No guest cart found, creating a new one.');
            cart = await Cart.create({ isGuest: true, items: [] });
            console.log('Created new cart for guest:', cart);
        } else {
            console.log('Found existing guest cart:', cart);
        }

        return cart.items; // Return the items in the guest cart
    }

    const user = await User.findOne({ username });
    if (!user) {
        console.error('User not found for username:', username);
        throw new Error('User not found');
    }

    const cart = await Cart.findOne({ userId: user._id });
    return cart ? cart.items : []; // Return the items or an empty array if no cart found
}

async function getCart(username) {
    return await Cart.findOne({ username }).populate('items.productId');
}

async function addItemToCart(username, productId, quantity) {
    const cart = await Cart.findOneAndUpdate(
        { username },
        { $addToSet: { items: { productId, quantity } } }, 
        { new: true, upsert: true }
    );

    return cart;
}

async function updateItemQuantity(username, productId, quantity) {
    return await Cart.findOneAndUpdate(
        { username, 'items.productId': productId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
    );
}

async function removeItemFromCart(username, productId) {
    return await Cart.findOneAndUpdate(
        { username },
        { $pull: { items: { productId } } },
        { new: true }
    );
}

async function calculateTotalByUsername(username) {
    console.log(`Calculating total for user: ${username}`);

    const items = await getCartByUsername(username);
    if (!items || items.length === 0) {
        console.log('No items in cart for this user');
        return 0; // Return 0 if there are no items
    }

    const total = await Promise.all(items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return product ? product.price * item.quantity : 0;
    }));

    return total.reduce((sum, price) => sum + price, 0);
}


module.exports = {
    getCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    calculateTotalByUsername,
    getCartByUsername
};
