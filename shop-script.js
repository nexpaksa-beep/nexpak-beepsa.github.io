// ======================================================
// NEXPAK SHOP SCRIPT
// PART 1A - INITIALIZATION & PRODUCT RENDERING
// ======================================================

let cart = [];
let stripe = null;
let elements = null;
let cardElement = null;

let currentCategory = "all";
let currentSearch = "";

// =====================
// INITIALIZE
// =====================
document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    renderProducts();

    updateCartUI();

    if (typeof initializeStripe === "function") {
        initializeStripe();
    }

    // Search
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            currentSearch = this.value.trim();

            renderProducts(currentCategory, currentSearch);

        });
    }

});

// =====================
// CATEGORY FILTER
// =====================
function filterCategory(category) {

    currentCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    renderProducts(category, currentSearch);

}

// =====================
// RENDER PRODUCTS
// =====================
function renderProducts(category = "all", searchTerm = "") {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            category === "all" ||
            product.category === category;

        const searchMatch =
            searchTerm === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;

    });

    if (filteredProducts.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:#64748b;
            ">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;

    }

    filteredProducts.forEach(product => {

        createProductCard(product, grid);

    });

    }
// =====================
// CREATE PRODUCT CARD
// =====================
function createProductCard(product, grid) {

    const card = document.createElement("div");
    card.className = "product-card";

    const image = product.images && product.images.length
        ? product.images[0]
        : "";

    const sizeSelector = product.sizes && product.sizes.length
        ? `
            <select class="size-selector" id="size-${product.id}">
                <option value="">Select Size</option>
                ${product.sizes.map(size =>
                    `<option value="${size}">${size}</option>`
                ).join("")}
            </select>
        `
        : "";

    const colourSelector = product.color
        ? `
            <select class="color-selector" id="color-${product.id}">
                <option value="">Select Colour</option>
                ${(Array.isArray(product.color)
                    ? product.color
                    : [product.color])
                    .map(colour =>
                        `<option value="${colour}">${colour}</option>`
                    ).join("")}
            </select>
        `
        : "";

    card.innerHTML = `

<div class="product-image">

    ${
        image
        ? `<img src="${image}" class="product-img" alt="${product.name}">`
        : `<div class="product-placeholder">${product.icon || "📦"}</div>`
    }

    <span class="stock-badge">✔ In Stock</span>

</div>

<div class="product-info">

    <div class="product-category">
        ${product.category.toUpperCase()}
    </div>

    <h3 class="product-name">
        ${product.name}
    </h3>

    <div class="product-sku">
        SKU: ${product.id}
    </div>

    <div class="product-specs">
        ${product.specs || ""}
    </div>

    <div class="min-order">
        Minimum Order:
        ${product.minOrder || 1} ${product.unit || ""}
    </div>

    <div class="product-price">
        R${Number(product.price).toFixed(2)}
    </div>

    <div class="vat-note">
        Excluding VAT
    </div>

    ${sizeSelector}

    ${colourSelector}

    <div class="product-footer">

        <div class="qty-selector">

            <button onclick="decreaseQty('qty-${product.id}')">−</button>

            <input
                id="qty-${product.id}"
                type="number"
                value="${product.minOrder || 1}"
                min="${product.minOrder || 1}"
            >

            <button onclick="increaseQty('qty-${product.id}')">+</button>

        </div>

        <button
            class="add-to-cart-btn"
            onclick="addToCart('${product.id}')">

            🛒 Add to Cart

        </button>

    </div>

</div>

`;
                    
    grid.appendChild(card);

}

// =====================
// QUANTITY CONTROLS
// =====================
function increaseQty(id) {

    const input = document.getElementById(id);

    if (!input) return;

    input.value = parseInt(input.value || 1) + 1;

}

function decreaseQty(id) {

    const input = document.getElementById(id);

    if (!input) return;

    const productId = id.replace("qty-", "");

    const product = products.find(p => p.id === productId);

    const minimum = product?.minOrder || 1;

    input.value = Math.max(
        minimum,
        parseInt(input.value || minimum) - 1
    );

}
// ======================================================
// PART 2A - CART FUNCTIONS
// ======================================================

// ===== ADD TO CART =====
function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    if (!product) return;

    const qty = parseInt(document.getElementById(`qty-${productId}`)?.value) || product.minOrder || 1;

    const size = document.getElementById(`size-${productId}`)?.value || "";

    const colour = document.getElementById(`color-${productId}`)?.value || "";

    const existing = cart.find(item =>
        item.id === productId &&
        item.size === size &&
        item.colour === colour
    );

    if (existing) {

        existing.quantity += qty;

    } else {

        cart.push({
            id: product.id,
            sku: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            size: size,
            colour: colour,
            image: product.images?.[0] || "",
            minOrder: product.minOrder || 1
        });

    }

    saveCart();
    updateCartUI();
    toggleCart(true);

}

// ===== REMOVE ITEM =====
function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();
    updateCartUI();

}

// ===== UPDATE QUANTITY =====
function updateCartItemQty(productId, newQty) {

    const item = cart.find(i => i.id === productId);

    if (!item) return;

    newQty = parseInt(newQty);

    if (newQty <= 0) {

        removeFromCart(productId);
        return;

    }

    item.quantity = Math.max(item.minOrder || 1, newQty);

    saveCart();
    updateCartUI();

}

// ===== OPEN / CLOSE CART =====
function toggleCart(open = true) {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (!drawer || !overlay) return;

    if (open) {

        drawer.classList.add("active");
        overlay.classList.add("active");

    } else {

        drawer.classList.remove("active");
        overlay.classList.remove("active");

    }

}
// ======================================================
// PART 2B - PROFESSIONAL CART UI
// ======================================================

function updateCartUI() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartItems) return;

    // Cart Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    // Empty Cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div style="font-size:70px;">🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Browse our premium packaging products and
                    start adding items.
                </p>

            </div>
        `;

        if (checkoutBtn)
            checkoutBtn.disabled = true;

        updateCartSummary();

        return;
    }

    // Build Cart
    cartItems.innerHTML = "";

    cart.forEach(item => {

        const row = document.createElement("div");

        row.className = "cart-item";

        row.innerHTML = `

            <div class="cart-item-image">

                ${
                    item.image

                    ?

                    `<img src="${item.image}" alt="${item.name}">`

                    :

                    `<div class="cart-placeholder">
                        📦
                    </div>`

                }

            </div>

            <div class="cart-item-details">

                <h4>${item.name}</h4>

                <small>SKU: ${item.sku}</small>

                ${
                    item.size
                    ? `<div>📏 ${item.size}</div>`
                    : ""
                }

                ${
                    item.colour
                    ? `<div>🎨 ${item.colour}</div>`
                    : ""
                }

                <div class="cart-price">

                    R${Number(item.price).toFixed(2)}

                    <span>each</span>

                </div>

                <div class="cart-qty">

                    <button
                        onclick="updateCartItemQty('${item.id}',${item.quantity-1})">

                        −

                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="updateCartItemQty('${item.id}',${item.quantity+1})">

                        +

                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <div class="cart-total">

                    R${(item.price * item.quantity).toFixed(2)}

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart('${item.id}')">

                    🗑

                </button>

            </div>

        `;

        cartItems.appendChild(row);

    });

    if (checkoutBtn)
        checkoutBtn.disabled = false;

    updateCartSummary();

}

// ======================================================
// CART TOTALS
// ======================================================

function updateCartSummary() {

    const subtotal = cart.reduce((sum, item) => {

        return sum + (item.price * item.quantity);

    }, 0);

    const delivery = subtotal >= 5000 ? 0 : 150;

    const total = subtotal + delivery;

    const setValue = (id, value) => {

        const el = document.getElementById(id);

        if (el)
            el.textContent = value;

    };

    setValue("subtotal", `R${subtotal.toFixed(2)}`);

    setValue(
        "delivery",
        delivery === 0
            ? "FREE"
            : `R${delivery.toFixed(2)}`
    );

    setValue(
        "total",
        `R${total.toFixed(2)}`
    );

}
// ======================================================
// PART 3 - CHECKOUT & ORDER REVIEW
// ======================================================

// Open Checkout
function proceedToCheckout() {

    if (cart.length === 0) return;

    buildOrderReview();

    document.getElementById("checkoutModal").classList.add("active");

}

// Close Checkout
function closeCheckout() {

    document.getElementById("checkoutModal").classList.remove("active");

}

// Build Order Review
function buildOrderReview() {

    const review = document.getElementById("orderReview");

    if (!review) return;

    let html = "";

    let subtotal = 0;

    cart.forEach(item => {

        const total = item.price * item.quantity;

        subtotal += total;

        html += `
            <div class="review-item">

                <div>

                    <strong>${item.name}</strong><br>

                    Qty: ${item.quantity}

                    ${item.size ? `<br>Size: ${item.size}` : ""}

                    ${item.colour ? `<br>Colour: ${item.colour}` : ""}

                </div>

                <strong>
                    R${total.toFixed(2)}
                </strong>

            </div>
        `;

    });

    const delivery = subtotal >= 5000 ? 0 : 150;

    const total = subtotal + delivery;

    html += `

        <hr>

        <div class="review-total">

            <div>

                <span>Subtotal</span>

                <span>R${subtotal.toFixed(2)}</span>

            </div>

            <div>

                <span>Delivery</span>

                <span>${delivery === 0 ? "FREE" : "R" + delivery.toFixed(2)}</span>

            </div>

            <div>

                <strong>Total</strong>

                <strong>R${total.toFixed(2)}</strong>

            </div>

        </div>

    `;

    review.innerHTML = html;

}

// ======================================================
// PLACE ORDER
// ======================================================

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        processOrder();

    });

}

async function processOrder() {

    try {

        const response = await fetch("http://localhost:4242/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: cart
            })
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            alert(result.error.message);
        }

    } catch (error) {
        console.error("Checkout error:", error);
        alert("Payment failed to start.");
    }
}

    `;

    cart = [];

    saveCart();

    updateCartUI();

    closeCheckout();

    document.getElementById("successModal").classList.add("active");

}

// ======================================================
// SUCCESS
// ======================================================

function returnToShop(){

    document.getElementById("successModal").classList.remove("active");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
// ======================================================
// PART 4 - STRIPE, STORAGE & UTILITIES
// ======================================================

// ===== STRIPE =====
function initializeStripe() {

    // Replace with your Stripe Publishable Key
    const stripeKey = "pk_test_eb10f3a59ed6937bee0d41f1664cfcc1bc3f39b0";

    if (!stripeKey) {
        console.log("Stripe not configured.");
        return;
    }

    stripe = Stripe(stripeKey);

}

// ===== SAVE CART =====
function saveCart() {

    localStorage.setItem(
        "nexpak_cart",
        JSON.stringify(cart)
    );

}

// ===== LOAD CART =====
function loadCart() {

    const saved =
        localStorage.getItem("nexpak_cart");

    cart = saved
        ? JSON.parse(saved)
        : [];

}

// ===== CLEAR CART =====
function clearCart() {

    cart = [];

    saveCart();

    updateCartUI();

}

// ===== FORMAT MONEY =====
function formatPrice(value) {

    return `R${Number(value).toFixed(2)}`;

}

// ===== FIND PRODUCT =====
function getProduct(productId) {

    return products.find(p => p.id === productId);

}

// ===== REFRESH SHOP =====
function refreshShop() {

    renderProducts(
        currentCategory,
        currentSearch
    );

    updateCartUI();

}

// ======================================================
// OPTIONAL KEYBOARD SHORTCUTS
// ======================================================

document.addEventListener("keydown", function(e){

    // ESC closes cart
    if(e.key === "Escape"){

        toggleCart(false);

        closeCheckout();

    }

});

// ======================================================
// END OF SCRIPT
// ======================================================

console.log("✅ Nexpak Shop Loaded Successfully");
        
