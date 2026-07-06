// ======================================================
// NEXPAK SHOP SCRIPT V2
// Complete Rewrite
// PART 1 - INITIALIZATION & PRODUCT RENDERING
// ======================================================

let cart = [];

let currentCategory = "all";
let currentSearch = "";

// VAT
const VAT_RATE = 0.15;

// Delivery
const DELIVERY_FEE = 150;
const FREE_DELIVERY_OVER = 5000;

// ======================================================
// INITIALIZE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    renderProducts();

    updateCartUI();

    const search = document.getElementById("searchInput");

    if (search) {

        search.addEventListener("input", function () {

            currentSearch = this.value.trim();

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

    if (event) {

        event.target.classList.add("active");

    }

    renderProducts(category, currentSearch);

}

// ======================================================
// PRODUCT RENDERING
// ======================================================

function renderProducts(category = "all", search = "") {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    const filtered = products.filter(product => {

        const categoryMatch =
            category === "all" ||
            product.category === category;

        const searchMatch =
            search === "" ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toLowerCase().includes(search.toLowerCase());

        return categoryMatch && searchMatch;

    });

    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
            </div>
        `;

        return;

    }

    filtered.forEach(product => {

        const image = product.images && product.images.length
            ? product.images[0]
            : "";

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                ${
                    image
                    ? `<img src="${image}" class="product-img" alt="${product.name}">`
                    : `<div class="product-placeholder">${product.icon || "📦"}</div>`
                }

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category.toUpperCase()}
                </span>

                <h3>${product.name}</h3>

                <p>SKU: ${product.id}</p>

                <h2>R${Number(product.price).toFixed(2)}</h2>

                <div class="qty-selector">

                    <button onclick="changeQty('${product.id}',-1)">−</button>

                    <input
                        id="qty-${product.id}"
                        type="number"
                        value="${product.minOrder || 1}"
                        min="${product.minOrder || 1}"
                    >

                    <button onclick="changeQty('${product.id}',1)">+</button>

                </div>

                <button
                    class="add-cart-btn"
                    onclick="addToCart('${product.id}')">

                    🛒 Add to Cart

                </button>

            </div>

        `;

        grid.appendChild(card);

    });

}
// ======================================================
// PART 2 - QUANTITY CONTROL & CART FUNCTIONS
// ======================================================

// ----------------------------
// CHANGE PRODUCT QUANTITY
// ----------------------------
function changeQty(id, change) {

    const input = document.getElementById(`qty-${id}`);

    if (!input) return;

    const product = products.find(p => p.id === id);

    const min = product?.minOrder || 1;

    let qty = parseInt(input.value);

    if (isNaN(qty)) qty = min;

    qty += change;

    if (qty < min) qty = min;

    input.value = qty;
}

// ----------------------------
// ADD TO CART
// ----------------------------
function addToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    const qtyInput = document.getElementById(`qty-${id}`);

    let qty = parseInt(qtyInput.value);

    if (isNaN(qty)) {
        qty = product.minOrder || 1;
    }

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity += qty;

    } else {

        cart.push({

            id: product.id,
            sku: product.id,
            name: product.name,
            category: product.category,
            unit: product.unit || "",
            price: Number(product.price),
            quantity: qty

        });

    }

    saveCart();

    updateCartUI();

    toggleCart(true);

    alert(product.name + " added to cart.");

}

// ----------------------------
// REMOVE ITEM
// ----------------------------
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCartUI();

}

// ----------------------------
// UPDATE CART QUANTITY
// ----------------------------
function updateQty(id, qty) {

    qty = parseInt(qty);

    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (qty <= 0) {

        removeFromCart(id);

        return;

    }

    item.quantity = qty;

    saveCart();

    updateCartUI();

}

// ----------------------------
// EMPTY CART
// ----------------------------
function clearCart() {

    if (!confirm("Clear your shopping cart?")) return;

    cart = [];

    saveCart();

    updateCartUI();

}

// ----------------------------
// LOCAL STORAGE
// ----------------------------
function saveCart() {

    localStorage.setItem(
        "nexpak_cart",
        JSON.stringify(cart)
    );

}

function loadCart() {

    const saved = localStorage.getItem("nexpak_cart");

    if (saved) {

        cart = JSON.parse(saved);

    } else {

        cart = [];

    }

}
// ======================================================
// PART 3 - CART UI & TOTALS
// ======================================================

// ----------------------------
// UPDATE CART DISPLAY
// ----------------------------
function updateCartUI() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const lineTotal = item.price * item.quantity;

        row.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                <small>${item.sku}</small><br>
                <small>R${item.price.toFixed(2)} each</small>
            </div>

            <div class="cart-item-controls">

                <button onclick="updateQty('${item.id}', ${item.quantity - 1})">−</button>

                <span>${item.quantity}</span>

                <button onclick="updateQty('${item.id}', ${item.quantity + 1})">+</button>

            </div>

            <div class="cart-item-total">
                R${lineTotal.toFixed(2)}
            </div>

            <button onclick="removeFromCart('${item.id}')">
                ✖
            </button>
        `;

        cartItems.appendChild(row);

    });

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:20px;">
                Your cart is empty.
            </p>
        `;

    }

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }

    updateTotals();

}

// ----------------------------
// CALCULATE TOTALS
// ----------------------------
function updateTotals() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const vat = subtotal * VAT_RATE;

    const delivery =
        subtotal >= FREE_DELIVERY_OVER
            ? 0
            : DELIVERY_FEE;

    const total =
        subtotal +
        vat +
        delivery;

    setMoney("subtotal", subtotal);

    setMoney("vat", vat);

    if (delivery === 0) {

        const d = document.getElementById("delivery");

        if (d) d.textContent = "FREE";

    } else {

        setMoney("delivery", delivery);

    }

    setMoney("total", total);

}

// ----------------------------
// DISPLAY MONEY
// ----------------------------
function setMoney(id, value) {

    const el = document.getElementById(id);

    if (!el) return;

    el.textContent =
        "R" + Number(value).toFixed(2);

}

// ----------------------------
// OPEN/CLOSE CART
// ----------------------------
function toggleCart(open = true) {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.toggle("active", open);
    overlay.classList.toggle("active", open);

}

// ----------------------------
// ESC KEY CLOSES CART
// ----------------------------
document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        toggleCart(false);

    }

});
// ======================================================
// PART 4 - EFT CHECKOUT & WHATSAPP ORDER
// ======================================================

function processOrder() {

    if (cart.length === 0) {
        alert("Your shopping cart is empty.");
        return;
    }

    const customerName =
        prompt("Please enter your Name or Company Name:");

    if (!customerName) return;

    const customerPhone =
        prompt("Please enter your Contact Number:");

    if (!customerPhone) return;

    let subtotal = 0;

    let order = "";

    order += "NEXPAK SOLUTIONS\n";
    order += "ONLINE ORDER\n";
    order += "========================\n\n";

    order += "Customer: " + customerName + "\n";
    order += "Contact: " + customerPhone + "\n\n";

    order += "ORDER ITEMS\n";
    order += "------------------------\n";

    cart.forEach(item => {

        const line = item.price * item.quantity;

        subtotal += line;

        order += item.name + "\n";
        order += "Qty: " + item.quantity + " " + (item.unit || "") + "\n";
        order += "Amount: R" + line.toFixed(2) + "\n\n";

    });

    const vat = subtotal * VAT_RATE;

    const delivery =
        subtotal >= FREE_DELIVERY_OVER
            ? 0
            : DELIVERY_FEE;

    const total =
        subtotal +
        vat +
        delivery;

    order += "------------------------\n";
    order += "Subtotal : R" + subtotal.toFixed(2) + "\n";
    order += "VAT (15%): R" + vat.toFixed(2) + "\n";
    order += "Delivery : " + (delivery === 0 ? "FREE" : "R" + delivery.toFixed(2)) + "\n";
    order += "TOTAL    : R" + total.toFixed(2) + "\n\n";

    order += "PAYMENT METHOD\n";
    order += "EFT\n\n";

    order += "BANK: Capitec\n";
    order += "ACCOUNT NO: 2517857594\n";
    order += "BRANCH CODE: 470010\n";
    order += "REFERENCE: " + customerName + "\n\n";

    order += "Please send Proof of Payment after making the EFT.\n";
    order += "Thank you for shopping with NexPak Solutions.";

    window.open(
        "https://wa.me/27836308249?text=" +
        encodeURIComponent(order),
        "_blank"
    );

    cart = [];

    saveCart();

    updateCartUI();

    toggleCart(false);

    alert("Your order has been prepared for WhatsApp. Please complete your EFT payment and send the proof of payment.");
}

// ======================================================
// END OF SCRIPT
// ======================================================

console.log("NexPak Shop V2 Loaded Successfully");
