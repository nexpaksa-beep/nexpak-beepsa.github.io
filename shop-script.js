// ===== NEXPAK SHOP SCRIPT (CLEAN FIXED VERSION) =====

let cart = [];
let stripe = null;
let elements = null;
let cardElement = null;

let activeImageIndex = {};
// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    renderProducts();
    initializeStripe?.();
    updateCartUI();
});

// ===== PRODUCT RENDERING =====
function renderProducts(category = "all", searchTerm = "") {

    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const categoryMatch = category === "all" || product.category === category;

        const searchMatch =
            searchTerm === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:3rem;color:#888;">
                No products found
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        const minOrderText = product.minOrder
            ? `<div class="min-order">Min order: ${product.minOrder} ${product.unit}</div>`
            : '';

        const sizeSelector =
            product.sizes?.length
                ? `
            <select class="size-selector" id="size-${product.id}">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
          `
                : '';

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.images?.[0] || ''}"
                    alt="${product.name}"
                    class="product-img"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='${product.icon || ''}'"
                >
            </div>

            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-sku">SKU: ${product.id}</div>
                <div class="product-specs">${product.specs || ''}</div>
                <div class="product-price">R${Number(product.price).toFixed(2)}</div>
                <div class="product-price-note">(Ex VAT)</div>

                ${minOrderText}
                ${sizeSelector}

                <div class="product-footer">
                    <div class="qty-selector">
                        <button type="button" onclick="increaseQty('qty-${product.id}')">+</button>

                        <input
                            type="number"
                            id="qty-${product.id}"
                            value="${product.minOrder || 1}"
                            min="${product.minOrder || 1}"
                            step="1"
                        >

                        <button type="button" onclick="decreaseQty('qty-${product.id}')">−</button>
                    </div>

                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ===== QUANTITY CONTROLS =====
function increaseQty(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.value = parseInt(input.value || 1) + 1;
}

function decreaseQty(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const productId = inputId.replace('qty-', '');
    const product = products.find(p => p.id === productId);

    const min = product?.minOrder || 1;
    const current = parseInt(input.value || min);

    input.value = Math.max(min, current - 1);
}

// ===== CART =====
function addToCart(productId) {

    const product = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);

    if (!product || !qtyInput) return;

    const quantity = parseInt(qtyInput.value || product.minOrder || 1);

    if (quantity < product.minOrder) {
        alert(`Minimum order quantity for ${product.name} is ${product.minOrder} ${product.unit}`);
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: Number(product.price),
            quantity,
            minOrder: product.minOrder || 1,
            unit: product.unit || ''
        });
    }

    saveCart();
    updateCartUI();
    toggleCart?.();
    showNotification?.(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartItemQty(productId, newQty) {

    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const qty = Math.max(item.minOrder, parseInt(newQty || item.minOrder));

    item.quantity = qty;

    saveCart();
    updateCartUI();
}

// ===== CART UI =====
function updateCartUI() {

    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) cartCount.textContent = totalItems;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const el = document.createElement("div");
        el.className = "cart-item";

        el.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <div>SKU: ${item.id}</div>

                <input type="number"
                    value="${item.quantity}"
                    min="${item.minOrder}"
                    onchange="updateCartItemQty('${item.id}', this.value)"
                >

                <div>R${(item.price * item.quantity).toFixed(2)}</div>
            </div>

            <button onclick="removeFromCart('${item.id}')">🗑️</button>
        `;

        cartItemsContainer.appendChild(el);
    });

    if (checkoutBtn) checkoutBtn.disabled = false;

    updateCartSummary();
}

// ===== SUMMARY =====
function updateCartSummary() {

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal >= 5000 ? 0 : 150;
    const total = subtotal + delivery;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    set('subtotal', `R${subtotal.toFixed(2)}`);
    set('delivery', delivery === 0 ? 'FREE' : `R${delivery.toFixed(2)}`);
    set('total', `R${total.toFixed(2)}`);
}

// ===== CART STORAGE =====
function saveCart() {
    localStorage.setItem('nexpak_cart', JSON.stringify(cart));
}

function loadCart() {
    const data = localStorage.getItem('nexpak_cart');
    cart = data ? JSON.parse(data) : [];
        }
