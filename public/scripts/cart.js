const totalAmountDisplay = document.getElementById('total-amount');
const addButton = document.getElementById('add-button');

async function fetchCart() {
    const response = await fetch('/api/cart');
    const data = await response.json();
    updateCartDisplay(data.items);
    updateTotal(data.totalAmount);
}

async function addItem() {
    const productId = document.getElementById('product-id').value;
    const quantity = document.getElementById('quantity').value;

    await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
    });

    fetchCart();
}

function updateCartDisplay(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>Product ID: ${item.productId} (x${item.quantity})</span>
                <button onclick="removeItem('${item.productId}')">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

async function removeItem(productId) {
    await fetch('/api/cart/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    });

    fetchCart();
}

function updateTotal(totalAmount) {
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

addButton.addEventListener('click', addItem);
window.onload = fetchCart;
