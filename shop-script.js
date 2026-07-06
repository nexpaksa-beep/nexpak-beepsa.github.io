// ======================================================
// NEXPAK SHOP SCRIPT V3
// MODULE 1 - SETUP & INITIALIZATION
// ======================================================

// -----------------------------
// SHOP SETTINGS
// -----------------------------
const VAT_RATE = 0.15;
const DELIVERY_FEE = 150;
const FREE_DELIVERY_OVER = 5000;

// -----------------------------
// GLOBAL VARIABLES
// -----------------------------
let cart = [];
let currentCategory = "all";
let currentSearch = "";

// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    initializeSearch();

    initializeFilters();

    renderProducts();

    updateCartUI();

    // ================================
    // 🔥 BACKGROUND SLIDESHOW (ADD HERE)
    // ================================

    const images = [
        "hero.jpg",
        "hero2.jpg",
        "hero3.jpg",
        "hero4.jpg"
    ];

    let index = 0;

    document.body.style.backgroundImage = `url('${images[0]}')`;

    setInterval(() => {

        index = (index + 1) % images.length;

        document.body.style.backgroundImage = `url('${images[index]}')`;

    }, 5000);

});

// ======================================================
// SEARCH
// ======================================================

function initializeSearch() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        currentSearch = this.value.trim().toLowerCase();

        renderProducts(currentCategory, currentSearch);

    });

}

// ======================================================
// CATEGORY FILTERS
// ======================================================

function initializeFilters() {

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.addEventListener("click", function () {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

        });

    });

}

function filterCategory(category) {

    currentCategory = category;

    renderProducts(currentCategory, currentSearch);

}

// ======================================================
// MONEY FORMAT
// ======================================================

function money(value) {

    return "R" + Number(value).toFixed(2);

}

// ======================================================
// FIND PRODUCT
// ======================================================

function getProduct(id) {

    return products.find(product => product.id === id);

}

console.log("Module 1 Loaded");
// ======================================================
// MODULE 2 - PRODUCT RENDERING
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
            product.name.toLowerCase().includes(search) ||
            product.id.toLowerCase().includes(search) ||
            (product.specs || "").toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });

    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;

    }

    filtered.forEach(product => {

        createProductCard(product, grid);

    });

}

// ======================================================
// CREATE PRODUCT CARD
// ======================================================

function createProductCard(product, grid) {

    const card = document.createElement("div");

    card.className = "product-card";

    const image =
        product.images && product.images.length
            ? product.images[0]
            : "";

    const sizeSelector = Array.isArray(product.sizes)
        ? `
        <label>Size</label>
        <select id="size-${product.id}" class="option-select">
            ${product.sizes.map(size =>
                `<option value="${size}">${size}</option>`
            ).join("")}
        </select>
        `
        : "";

    const colourSelector = Array.isArray(product.color)
        ? `
        <label>Colour</label>
        <select id="colour-${product.id}" class="option-select">
            ${product.color.map(colour =>
                `<option value="${colour}">${colour}</option>`
            ).join("")}
        </select>
        `
        : (typeof product.color === "string"
            ? `
            <label>Colour</label>
            <input
                id="colour-${product.id}"
                class="option-select"
                value="${product.color}"
                readonly>
            `
            : "");

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

            <p>${product.specs}</p>

            <small>SKU: ${product.id}</small>

            <h2>${money(product.price)}</h2>

            <p>
                <strong>Minimum Order:</strong>
                ${product.minOrder} ${product.unit}
            </p>

            ${sizeSelector}

            ${colourSelector}

            <div class="qty-selector">

                <button onclick="changeQty('${product.id}',-1)">
                    −
                </button>

                <input
                    id="qty-${product.id}"
                    type="number"
                    min="${product.minOrder}"
                    value="${product.minOrder}">

                <button onclick="changeQty('${product.id}',1)">
                    +
                </button>

            </div>

            <button
                class="add-cart-btn"
                onclick="addToCart('${product.id}')">

                🛒 Add to Cart

            </button>

        </div>

    `;

    grid.appendChild(card);

}

console.log("Module 2 Loaded");
// ======================================================
// MODULE 3 - QUANTITY & ADD TO CART
// ======================================================

// -----------------------------
// CHANGE PRODUCT QUANTITY
// -----------------------------
function changeQty(id, change) {

    const input = document.getElementById(`qty-${id}`);

    if (!input) return;

    const product = getProduct(id);

    const min = product.minOrder || 1;

    let qty = parseInt(input.value);

    if (isNaN(qty)) qty = min;

    qty += change;

    if (qty < min) qty = min;

    input.value = qty;

}

// -----------------------------
// ADD TO CART
// -----------------------------
function addToCart(id) {

    const product = getProduct(id);

    if (!product) return;

    const qty =
        parseInt(document.getElementById(`qty-${id}`).value) ||
        product.minOrder;

    // Selected size
    let size = "";

    const sizeField = document.getElementById(`size-${id}`);

    if (sizeField) {
        size = sizeField.value;
    }

    // Selected colour
    let colour = "";

    const colourField = document.getElementById(`colour-${id}`);

    if (colourField) {
        colour = colourField.value;
    }

    // Same product + same size + same colour
    const existing = cart.find(item =>
        item.id === id &&
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

            price: Number(product.price),

            item: qty,

            unit: product.unit || "",

            specs: product.specs || "",

            size: size,

            colour: colour

        });

    }

    saveCart();

    updateCartUI();

    toggleCart(true);

    alert(product.name + " added to cart.");

}

console.log("Module 3 Loaded");
// ======================================================
// MODULE 4A - CART DISPLAY
// ======================================================

function updateCartUI() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let totalItems = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:20px;">
                Your cart is empty.
            </p>
        `;

        if (cartCount) cartCount.textContent = "0";

        if (checkoutBtn) checkoutBtn.disabled = true;

        updateTotals();

        return;

    }

    cart.forEach(item => {

        totalItems += item.quantity;

        const lineTotal = item.price * item.quantity;

        const row = document.createElement("div");

        row.className = "cart-item";

        row.innerHTML = `

            <div class="cart-item-details">

                <strong>${item.name}</strong><br>

                <small>SKU: ${item.sku}</small><br>

                ${item.size ? `<small>Size: ${item.size}</small><br>` : ""}

                ${item.colour ? `<small>Colour: ${item.colour}</small><br>` : ""}

                <small>${money(item.price)} each</small>

            </div>

            <div class="cart-item-controls">

                <button onclick="updateQty('${item.id}','${item.size}','${item.colour}',${item.quantity-1})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="updateQty('${item.id}','${item.size}','${item.colour}',${item.quantity+1})">
                    +
                </button>

            </div>

            <div class="cart-item-price">

                ${money(lineTotal)}

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart('${item.id}','${item.size}','${item.colour}')">

                ✖

            </button>

        `;

        cartItems.appendChild(row);

    });

    if (cartCount) {

        cartCount.textContent = totalItems;

    }

    if (checkoutBtn) {

        checkoutBtn.disabled = false;

    }

    updateTotals();

}

console.log("Module 4A Loaded");
// ======================================================
// MODULE 4B - CART MANAGEMENT
// ======================================================

// -----------------------------
// UPDATE CART QUANTITY
// -----------------------------
function updateQty(id, size, colour, qty) {

    qty = parseInt(qty);

    const item = cart.find(i =>
        i.id === id &&
        i.size === size &&
        i.colour === colour
    );

    if (!item) return;

    if (qty <= 0) {

        removeFromCart(id, size, colour);

        return;

    }

    item.quantity = qty;

    saveCart();

    updateCartUI();

}

// -----------------------------
// REMOVE FROM CART
// -----------------------------
function removeFromCart(id, size, colour) {

    cart = cart.filter(item =>

        !(item.id === id &&
          item.size === size &&
          item.colour === colour)

    );

    saveCart();

    updateCartUI();

}

// -----------------------------
// CLEAR CART
// -----------------------------
function clearCart() {

    if (!confirm("Clear your shopping cart?")) return;

    cart = [];

    saveCart();

    updateCartUI();

}

// -----------------------------
// LOCAL STORAGE
// -----------------------------
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

console.log("Module 4B Loaded");
// ======================================================
// MODULE 5 - TOTALS & VAT
// ======================================================

// -----------------------------
// UPDATE TOTALS
// -----------------------------
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

        const deliveryElement =
            document.getElementById("delivery");

        if (deliveryElement) {

            deliveryElement.textContent = "FREE";

        }

    } else {

        setMoney("delivery", delivery);

    }

    setMoney("total", total);

}

// -----------------------------
// DISPLAY MONEY
// -----------------------------
function setMoney(id, value) {

    const element = document.getElementById(id);

    if (!element) return;

    element.textContent =
        "R" + Number(value).toFixed(2);

}

console.log("Module 5 Loaded");
// ======================================================
// MODULE 6 - EFT CHECKOUT & WHATSAPP ORDER
// ======================================================

function processOrder() {
    const orderNumber = generateOrderNumber();

    if (cart.length === 0) {
        alert("Your shopping cart is empty.");
        return;
    }

    const customerName =
        document.getElementById("customerName")?.value.trim();

    const customerPhone =
        document.getElementById("customerPhone")?.value.trim();

    const customerEmail =
        document.getElementById("customerEmail")?.value.trim();

    const customerAddress =
        document.getElementById("customerAddress")?.value.trim();

    if (!customerName || !customerPhone || !customerAddress) {

        alert("Please complete your Name, Contact Number and Delivery Address.");

        return;

    }

    let subtotal = 0;

    let message = "";

    message += "🟦 *NEXPAK SOLUTIONS ONLINE ORDER*\n\n";
    
    message += "*Order Number:* " + orderNumber + "\n\n";
    message += "*Customer Details*\n";
    message += "Name: " + customername+ "\n";
    message += "Phone: " + customerPhone + "\n";

    if (customerEmail) {
        message += "Email: " + customerEmail + "\n";
    }

    message += "Address: " + customerAddress + "\n\n";

    message += "*ORDER ITEMS*\n";
    message += "--------------------------\n";

    cart.forEach(item => {

        const lineTotal = item.price * item.quantity;

        subtotal += lineTotal;

        message += "• " + item.name + "\n";

        if (item.size) {
            message += "Size: " + item.size + "\n";
        }

        if (item.colour) {
            message += "Colour: " + item.colour + "\n";
        }

        message += "Qty: " + item.quantity + " " + (item.unit || "") + "\n";
        message += "Amount: " + money(lineTotal) + "\n\n";

    });

    const vat = subtotal * VAT_RATE;

    const delivery =
        subtotal >= FREE_DELIVERY_OVER
            ? 0
            : DELIVERY_FEE;

    const total = subtotal + vat + delivery;

    message += "--------------------------\n";
    message += "Subtotal: " + money(subtotal) + "\n";
    message += "VAT (15%): " + money(vat) + "\n";
    message += "Delivery: " + (delivery === 0 ? "FREE" : money(delivery)) + "\n";
    message += "*TOTAL: " + money(total) + "*\n\n";

    message += "*EFT PAYMENT DETAILS*\n";
    message += "Bank: Capitec\n";
    message += "Account No: 2517857594\n";
    message += "Branch Code: 470010\n";
    message += "Reference: " + customerName + "\n\n";

    message += "Please send your Proof of Payment after completing the EFT.\n";
    message += "Thank you for choosing NexPak Solutions.";

    window.open(
        "https://wa.me/27836308249?text=" +
        encodeURIComponent(message),
        "_blank"
    );

    alert("WhatsApp is opening with your order. Complete the EFT payment and send your proof of payment.");

    cart = [];

    saveCart();

    updateCartUI();

    toggleCart(false);

}

console.log("Module 6 Loaded");
// ======================================================
// MODULE 7A - ORDER NUMBER & BANK DETAILS
// ======================================================

// -----------------------------
// GENERATE ORDER NUMBER
// -----------------------------
function generateOrderNumber() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 9000) + 1000;

    return `NP-${year}${month}${day}-${random}`;

}

// -----------------------------
// COPY EFT DETAILS
// -----------------------------
function copyBankDetails() {

    const details = `
NEXPAK SOLUTIONS

Bank: Capitec
Account Number: 2517857594
Branch Code: 470010

Reference: Your Order Number
`;

    navigator.clipboard.writeText(details)
        .then(() => {

            alert("Bank details copied.");

        })
        .catch(() => {

            alert("Unable to copy bank details.");

        });

}

// -----------------------------
// COPY ACCOUNT NUMBER
// -----------------------------
function copyAccountNumber() {

    navigator.clipboard.writeText("2517857594")
        .then(() => {

            alert("Account number copied.");

        });

}

console.log("Module 7A Loaded");
// ======================================================
// MODULE 7B-1 - QUOTATION BUILDER CORE
// ======================================================

function generateQuoteData() {

    if (!cart || cart.length === 0) {
        alert("Cart is empty. Add products before generating a quotation.");
        return null;
    }

    let quoteItems = [];
    let subTotal = 0;

    cart.forEach(item => {

        let lineTotal = item.price * item.quantity;

        subTotal += lineTotal;

        quoteItems.push({
            id: item.id,
            name: item.name,
            qty: item.quantity,
            unitPrice: item.price,
            lineTotal: lineTotal
        });
    });

    let vat = subTotal * 0.15;
    let total = subTotal + vat;

    return {
        quoteNumber: "NP-" + Date.now(),
        date: new Date().toLocaleDateString(),
        items: quoteItems,
        subTotal,
        vat,
        total
    };
}

 // ======================================================
// MODULE 7B-2 - QUOTATION PDF GENERATOR (jsPDF)
// ======================================================

function downloadQuotationPDF() {

    const quote = generateQuoteData();
    if (!quote) return;

    const doc = new jsPDF();

    let y = 20;

    // =========================
    // WATERMARK
    // =========================
    doc.setTextColor(230, 230, 230);
    doc.setFontSize(50);
    doc.setFont("helvetica", "bold");
    doc.text("NEXPAK", 40, 160, { angle: 45 });
    doc.setTextColor(0, 0, 0);

    // =========================
    // HEADER
    // =========================
    doc.setFontSize(16);
    doc.text("NEXPAK SOLUTIONS", 14, y);

    y += 10;
    doc.setFontSize(10);
    doc.text(`Quote #: ${quote.quoteNumber}`, 14, y);
    doc.text(`Date: ${quote.date}`, 140, y);

    y += 15;

    // =========================
    // TABLE HEADER
    // =========================
    function drawHeader() {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");

        doc.text("Product", 14, y);
        doc.text("Qty", 95, y);
        doc.text("Unit Price", 120, y);
        doc.text("Total", 165, y);

        doc.line(14, y + 2, 195, y + 2);

        y += 10;
        doc.setFont("helvetica", "normal");
    }

    drawHeader();

    // =========================
    // ITEMS
    // =========================
    quote.items.forEach(item => {

        let nameLines = doc.splitTextToSize(item.name, 70);
        let rowHeight = nameLines.length * 6;

        if (y + rowHeight > 260) {
            doc.addPage();
            y = 20;
            drawHeader();
        }

        doc.text(nameLines, 14, y);
        doc.text(String(item.qty), 95, y);
        doc.text("R " + item.unitPrice.toFixed(2), 120, y);
        doc.text("R " + item.lineTotal.toFixed(2), 165, y);

        y += Math.max(rowHeight, 8);
    });

    // =========================
    // TOTALS
    // =========================
    y += 10;
    doc.line(14, y, 195, y);
    y += 10;

    doc.text(`Subtotal: R ${quote.subTotal.toFixed(2)}`, 120, y);
    y += 6;

    doc.text(`VAT: R ${quote.vat.toFixed(2)}`, 120, y);
    y += 8;

    doc.setFontSize(12);
    doc.text(`TOTAL: R ${quote.total.toFixed(2)}`, 120, y);

    // =========================
    // FOOTER
    // =========================
    doc.setFontSize(9);
    doc.text("Thank you for your business.", 14, 285);

    doc.save(`${quote.quoteNumber}.pdf`);
            }

    
