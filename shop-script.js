// ======================================================
// NEXPAK SHOP SCRIPT (CLEAN VERSION)
// ======================================================

let cart = [];
let stripe = null;

let currentCategory = "all";
let currentSearch = "";

// ======================================================
// INIT
// ======================================================
document.addEventListener("DOMContentLoaded", () => {

    loadCart();
    renderProducts();
    updateCartUI();

    initializeStripe();

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value.trim();
            renderProducts(currentCategory, currentSearch);
        });
    }
});

// ======================================================
// CATEGORY FILTER
// ======================================================
function filterCategory(category, event) {

    currentCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (event?.target) {
        event.target.classList.add("active");
    }

    renderProducts(category, currentSearch);
}

// ======================================================
// RENDER PRODUCTS
// ======================================================
function renderProducts(category = "all", searchTerm = "") {

    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered = products.filter(p => {

        const categoryMatch = category === "all" || p.category === category;

        const searchMatch =
            !searchTerm ||
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px;color:#64748b;">
                <h2>No products found</h2>
            </div>
        `;
        return;
    }

    filtered.forEach(p => createProductCard(p, grid));
}

// ======================================================
// PRODUCT CARD
// ======================================================
function createProductCard(product, grid) {

    const card = document.createElement("div");
    card.className = "product-card";

    const image = product.images?.[0];

    card.innerHTML = `
        <div class="product-image">
            ${
                image
                    ? `<img src="${image}" class="product-img">`
                    : `<div class="product-placeholder">${product.icon || "📦"}</div>`
            }
        </div>

        <div class="product-info">

            <div class="product-category">${product.category.toUpperCase()}</div>

            <h3>${product.name}</h3>

            <div>SKU: ${product.id}</div>

            <div>R${Number(product.price).toFixed(2)}</div>

            <div class="qty-selector">
                <button onclick="changeQty('${product.id}', -1)">−</button>

                <input id="qty-${product.id}" type="number" value="${product.minOrder || 1}" min="${product.minOrder || 1}">

                <button onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <button onclick="addToCart('${product.id}')">
                🛒 Add to Cart
            </button>

        </div>
    `;

    grid.appendChild(card);
}

// ======================================================
// QTY CONTROL
// ======================================================
function changeQty(id, delta) {

    const input = document.getElementById(`qty-${id}`);
    if (!input) return;

    const product = products.find(p => p.id === id);
    const min = product?.minOrder || 1;

    let val = parseInt(input.value || min);
    val = Math.max(min, val + delta);

    input.value = val;
}

// ======================================================
// CART
// ======================================================
function addToCart(id) {

    const product = products.find(p => p.id === id);
    if (!product) return;

    const qty = parseInt(document.getElementById(`qty-${id}`)?.value) || product.minOrder || 1;

    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty
        });
    }

    saveCart();
    updateCartUI();
    toggleCart(true);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function updateQty(id, qty) {

    const item = cart.find(i => i.id === id);
    if (!item) return;

    qty = parseInt(qty);

    if (qty <= 0) {
        removeFromCart(id);
        return;
    }

    item.quantity = qty;

    saveCart();
    updateCartUI();
}

// ======================================================
// CART UI
// ======================================================
function updateCartUI() {

    const count = document.getElementById("cartCount");
    const items = document.getElementById("cartItems");
    const btn = document.getElementById("checkoutBtn");

    if (!items) return;

    const totalQty = cart.reduce((a, b) => a + b.quantity, 0);

    if (count) count.textContent = totalQty;

    if (cart.length === 0) {
        items.innerHTML = "<p>Your cart is empty</p>";
        if (btn) btn.disabled = true;
        updateTotals();
        return;
    }

    items.innerHTML = "";

    cart.forEach(item => {

        const row = document.createElement("div");

        row.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div>R${item.price}</div>
            </div>

            <div>
                <button onclick="updateQty('${item.id}', ${item.quantity - 1})">-</button>
                ${item.quantity}
                <button onclick="updateQty('${item.id}', ${item.quantity + 1})">+</button>
            </div>

            <div>R${item.price * item.quantity}</div>

            <button onclick="removeFromCart('${item.id}')">X</button>
        `;

        items.appendChild(row);
    });

    if (btn) btn.disabled = false;

    updateTotals();
}

// ======================================================
// TOTALS
// ======================================================
function updateTotals() {

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const delivery = subtotal > 5000 ? 0 : 150;
    const total = subtotal + delivery;

    setText("subtotal", subtotal);
    setText("delivery", delivery === 0 ? "FREE" : delivery);
    setText("total", total);
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = `R${val}`;
}

// ======================================================
// CART TOGGLE
// ======================================================
function toggleCart(open = true) {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.toggle("active", open);
    overlay.classList.toggle("active", open);
}

// ======================================================
// CHECKOUT (STRIPE)
// ======================================================
function initializeStripe() {

    const key = "pk_test_eb10f3a59ed6937bee0d41f1664cfcc1bc3f39b0";

    try {
        stripe = Stripe(key);
        console.log("Stripe ready");
    } catch (e) {
        console.error(e);
    }
}

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        processOrder();
    });
}

async function processOrder() {

    if (!stripe) {
        alert("Stripe not ready");
        return;
    }

    try {

        const res = await fetch("http://localhost:4242/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart })
        });

        const data = await res.json();

        if (!data.id) {
            alert("Checkout failed");
            return;
        }

        await stripe.redirectToCheckout({
            sessionId: data.id
        });

    } catch (err) {
        console.error(err);
        alert("Payment error");
    }
}

// ======================================================
// STORAGE
// ======================================================
function saveCart() {
    localStorage.setItem("nexpak_cart", JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("nexpak_cart")) || [];
}

// ======================================================
// ESC KEY
// ======================================================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        toggleCart(false);
    }
});

// ======================================================
console.log("Nexpak Shop Loaded Clean Version");
