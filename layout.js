const navigationHTML = `
<nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-2">
                <div class="bg-purple-600 p-2 rounded-lg">
                    <i data-lucide="shopping-bag" class="w-6 h-6 text-white"></i>
                </div>
                <a href="index.html" class="text-xl font-bold text-gray-900">TDS Innovation</a>
            </div>

            <div class="hidden md:flex items-center gap-8">
                <a href="index.html" class="text-gray-600 hover:text-purple-600 font-medium">Home</a>
                <a href="product.html" class="text-gray-600 hover:text-purple-600 font-medium">Products</a>
                <a href="index.html#about" class="text-gray-600 hover:text-purple-600 font-medium">About</a>
                <a href="index.html#contact" class="text-gray-600 hover:text-purple-600 font-medium">Contact</a>
            </div>

            <div class="flex items-center gap-4">
                <button class="relative p-2 hover:bg-gray-100 rounded-full" onclick="toggleCart()">
                    <i data-lucide="shopping-cart" class="w-6 h-6 text-gray-600"></i>
                    <span class="cart-count" id="cart-count">0</span>
                </button>
                <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Sign In
                </button>
            </div>
        </div>
    </div>
</nav>
`;

const footerHTML = `
<footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <div class="flex items-center gap-2 mb-4">
                    <div class="bg-purple-600 p-2 rounded-lg">
                        <i data-lucide="shopping-bag" class="w-6 h-6 text-white"></i>
                    </div>
                    <span class="text-xl font-bold text-white">TDS Innovation</span>
                </div>
                <p class="text-gray-400">Your trusted partner for digital technology solutions.</p>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Quick Links</h4>
                <ul class="space-y-2">
                    <li><a href="index.html" class="hover:text-purple-400">Home</a></li>
                    <li><a href="product.html" class="hover:text-purple-400">Products</a></li>
                    <li><a href="index.html#about" class="hover:text-purple-400">About Us</a></li>
                    <li><a href="index.html#contact" class="hover:text-purple-400">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Support</h4>
                <ul class="space-y-2">
                    <li><a href="#" class="hover:text-purple-400">Help Center</a></li>
                    <li><a href="#" class="hover:text-purple-400">Shipping Info</a></li>
                    <li><a href="#" class="hover:text-purple-400">Returns</a></li>
                    <li><a href="#" class="hover:text-purple-400">FAQ</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Newsletter</h4>
                <p class="text-gray-400 mb-4">Subscribe to get updates on new products</p>
                <div class="flex gap-2">
                    <input type="email" placeholder="Your email" class="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TDS Innovation Store. All rights reserved.</p>
        </div>
    </div>
</footer>
`;

function injectNavigation() {
    const navigationPlaceholder = document.createElement('div');
    navigationPlaceholder.innerHTML = navigationHTML;
    document.body.prepend(navigationPlaceholder);
}

function injectFooter() {
    const footerPlaceholder = document.createElement('div');
    footerPlaceholder.innerHTML = footerHTML;
    document.body.appendChild(footerPlaceholder);
}

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    injectFooter();
});
