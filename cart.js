// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    // Show success message
    alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = '₹0';
        return;
    }

    let total = 0;
    let itemCount = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        return `
            <div class="flex items-center gap-4 mb-4 pb-4 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">${item.name}</h4>
                    <p class="text-purple-600 font-semibold">₹${item.price.toLocaleString()}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${index}, -1)" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                    <span class="w-8 text-center font-semibold">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </div>
        `;
    }).join('');

    cartCount.textContent = itemCount;
    cartTotal.textContent = '₹' + total.toLocaleString();

    lucide.createIcons();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    window.location.href = 'order.html';
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
