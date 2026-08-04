/*=========================================================
 NEXPAK SECURITY SOLUTIONS V18
 shop-v18.js
 CORE SHOP ENGINE & CONTROLLERS
=========================================================*/
"use strict";

// ======================================================
// GLOBAL SHOP VARIABLES
// ======================================================
let shopProducts = [];
let displayedProducts = [];
let activeCategory = "all";
let activeSearch = "";
let activeSort = "default";

// ======================================================
// INITIALIZE SHOP
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    initializeShop();
    initializeSearchControls();
    initializeCart();
    renderWishlist();
    renderCompare();
});

function initializeShop() {
    if (!window.NexpakShop) {
        console.error("Nexpak Shop Data Not Loaded");
        return;
    }

    shopProducts = window.NexpakShop.products || [];
    displayedProducts = [...shopProducts];

    console.log("Nexpak V18 Shop Engine Started");
    console.log("Products Available:", shopProducts.length);

    loadShopInterface();
}

function loadShopInterface() {
    renderProducts();
    loadCategories();
    updateShopCounters();
}

// ======================================================
// PRODUCT GRID LOADER
// ======================================================
function renderProducts() {
    const container = document.querySelector("#productGrid");
    if (!container) return;

    container.innerHTML = "";

    if (displayedProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>`;
        return;
    }

    displayedProducts.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// ======================================================
// BASIC PRODUCT CARD
// ======================================================
function createProductCard(product) {
    // FIXED: The broken string literal bug for price
    let priceDisplay = product.basePrice > 0 
        ? (window.NexpakShop?.config?.currencySymbol || "R") + product.basePrice 
        : "Request Quote";

    return `
    <div class="product-card" data-id="${product.id}">
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-badge">${product.badge || ""}</span>
        </div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-description">${product.shortDescription || product.description}</p>
            <div class="product-price">${priceDisplay}</div>
            
            <button class="btn add-cart" data-id="${product.id}">Add To Cart</button>
            <button class="quick-view" data-id="${product.id}">Quick View</button>
            <button class="wishlist-btn" data-id="${product.id}">♥</button>
        </div>
    </div>`;
}

// ======================================================
// CATEGORY LOADER
// ======================================================
function loadCategories() {
    const categoryBox = document.querySelector("#categoryList");
    if (!categoryBox || !window.NexpakShop.categories) return;

    categoryBox.innerHTML = "";

    window.NexpakShop.categories.forEach(category => {
        categoryBox.innerHTML += `
        <button class="category-btn" data-category="${category.id}">
            ${category.icon || ""} ${category.name}
        </button>`;
    });
}

function updateShopCounters() {
    const count = document.querySelector("#productCount");
    if (count) {
        count.textContent = displayedProducts.length + " Products";
    }
}

// ======================================================
// SEARCH • FILTER • SORT ENGINE
// ======================================================
function initializeSearchControls() {
    const searchInput = document.querySelector("#shopSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            activeSearch = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    const sortSelect = document.querySelector("#sortProducts");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            activeSort = e.target.value;
            applyFilters();
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("category-btn")) {
            activeCategory = e.target.dataset.category;
            applyFilters();
        }
    });
}

function applyFilters() {
    let results = [...shopProducts];

    if (activeSearch) {
        results = results.filter(product => {
            let text = [
                product.name,
                product.category,
                product.description,
                (product.keywords || []).join(" ")
            ].join(" ").toLowerCase();
            return text.includes(activeSearch);
        });
    }

    if (activeCategory && activeCategory !== "all") {
        results = results.filter(product => {
            return product.category.toLowerCase().includes(activeCategory.toLowerCase());
        });
    }

    results = sortProducts(results, activeSort);
    displayedProducts = results;
    renderProducts();
    updateResultCount();
}

function sortProducts(list, method) {
    let sorted = [...list];
    switch(method) {
        case "name":
            sorted.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case "price-low":
            sorted.sort((a,b) => (a.basePrice || 0) - (b.basePrice || 0));
            break;
        case "price-high":
            sorted.sort((a,b) => (b.basePrice || 0) - (a.basePrice || 0));
            break;
        case "popular":
            sorted.sort((a,b) => (b.rating || 0) - (a.rating || 0));
            break;
    }
    return sorted;
}

function updateResultCount() {
    const count = document.querySelector("#productCount");
    if (count) count.textContent = displayedProducts.length + " Products";
}

// ======================================================
// PRODUCT CARD ACTIONS ENGINE
// ======================================================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-cart")) {
        addProductToCart(e.target.dataset.id);
    }
    if (e.target.classList.contains("wishlist-btn")) {
        toggleProductWishlist(e.target.dataset.id);
    }
    if (e.target.classList.contains("compare-btn")) {
        compareProduct(e.target.dataset.id);
    }
    if (e.target.classList.contains("quick-view")) {
        openQuickView(e.target.dataset.id);
    }
});

function addProductToCart(productID) {
    if (!window.NexpakShop?.storage) {
        console.error("Cart engine unavailable");
        return;
    }
    window.NexpakShop.storage.cart.add(productID, 1);
    updateCartCount();
    showNotification("Product added to cart");
    openCart();
}

function updateCartCount() {
    let countElement = document.querySelector("#cartCount");
    if (!countElement || !window.NexpakShop?.storage) return;

    let cart = window.NexpakShop.storage.cart.get() || [];
    let total = 0;
    cart.forEach(item => { total += item.quantity; });
    countElement.textContent = total;
}

function toggleProductWishlist(productID) {
    if(!window.NexpakShop?.storage) return;
    window.NexpakShop.storage.wishlist.toggle(productID);
    showNotification("Wishlist updated");
    renderWishlist();
}

function compareProduct(productID) {
    if(!window.NexpakShop?.storage) return;
    let compare = window.NexpakShop.storage.compare.add(productID);
    if (compare.length >= 4) {
        showNotification("Maximum 4 products can be compared");
    } else {
        showNotification("Added to comparison");
        renderCompare();
    }
}

function openQuickView(productID) {
    let product = window.NexpakShop?.display?.quickView(productID) 
                  || shopProducts.find(p => p.id === productID || p.id == productID);
    if (!product) return;

    let modal = document.querySelector("#quickViewModal");
    if (!modal) return;

    let priceDisplay = product.basePrice > 0 ? "R" + product.basePrice : "Request Quote";

    modal.innerHTML = `
    <div class="quick-view-box">
        <button class="close-quick" style="position:absolute; top:10px; right:15px; border:none; background:none; font-size:20px;">✕</button>
        <img src="${product.image}" alt="${product.name}" style="max-width:100%;">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h3>${priceDisplay}</h3>
        <button class="btn add-cart" data-id="${product.id}">Add To Cart</button>
    </div>`;
    modal.classList.add("active");
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-quick")) {
        document.querySelector("#quickViewModal").classList.remove("active");
    }
});

function showNotification(message) {
    let toast = document.querySelector("#shopToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("active");
    setTimeout(() => {
        toast.classList.remove("active");
    }, 2500);
}

// ======================================================
// CART DRAWER ENGINE
// ======================================================
function initializeCart() {
    updateCartCount();
    renderCart();
}

function openCart() {
    const drawer = document.querySelector("#cartDrawer");
    if (drawer) {
        drawer.classList.add("active");
        renderCart();
    }
}

function closeCart() {
    const drawer = document.querySelector("#cartDrawer");
    if (drawer) drawer.classList.remove("active");
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".cart-icon")) openCart();
    if (e.target.classList.contains("close-cart")) closeCart();
    if (e.target.classList.contains("remove-cart-item")) removeCartItem(e.target.dataset.id);
    if (e.target.classList.contains("qty-plus")) changeCartQuantity(e.target.dataset.id, 1);
    if (e.target.classList.contains("qty-minus")) changeCartQuantity(e.target.dataset.id, -1);
    if (e.target.classList.contains("checkout-btn")) window.location.href = "checkout.html";
});

function renderCart() {
    const container = document.querySelector("#cartItems");
    if (!container || !window.NexpakShop?.storage) return;

    let cart = window.NexpakShop.storage.cart.get() || [];
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><p>Your cart is empty</p></div>`;
        updateCartSummary();
        return;
    }

    container.innerHTML = "";
    cart.forEach(item => {
        let product = shopProducts.find(p => p.id === item.id || p.id == item.id);
        if (!product) return;

        container.innerHTML += `
        <div class="cart-item" style="display:flex; gap:10px; margin-bottom:15px; border-bottom:1px solid #ddd; padding-bottom:10px;">
            <img src="${product.image}" alt="${product.name}" width="50">
            <div>
                <h4>${product.name}</h4>
                <div>
                    <button class="qty-minus" data-id="${product.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-plus" data-id="${product.id}">+</button>
                </div>
            </div>
            <button class="remove-cart-item" data-id="${product.id}" style="margin-left:auto;">✕</button>
        </div>`;
    });
    updateCartSummary();
}

function changeCartQuantity(productID, amount) {
    let cart = window.NexpakShop.storage.cart.get();
    let item = cart.find(i => i.id === productID || i.id == productID);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) item.quantity = 1;
        window.NexpakShop.storage.cart.update(productID, item.quantity);
    }
    renderCart();
    updateCartCount();
}

function removeCartItem(productID) {
    window.NexpakShop.storage.cart.remove(productID);
    renderCart();
    updateCartCount();
}

function updateCartSummary() {
    const totalBox = document.querySelector("#cartTotal");
    if (!totalBox || !window.NexpakShop?.storage) return;
    let total = window.NexpakShop.storage.cart.total() || 0;
    totalBox.textContent = "R" + total.toLocaleString();
}

// ======================================================
// WISHLIST & COMPARE PANELS
// ======================================================
function renderWishlist() {
    const container = document.querySelector("#wishlistItems");
    if (!container || !window.NexpakShop?.storage) return;

    const wishlist = window.NexpakShop.storage.wishlist.get() || [];
    if (wishlist.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>Your wishlist is empty</p></div>`;
        return;
    }

    container.innerHTML = "";
    wishlist.forEach(id => {
        const product = shopProducts.find(p => p.id === id || p.id == id);
        if (!product) return;
        container.innerHTML += `
        <div class="wishlist-item" style="margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #ddd;">
            <h4>${product.name}</h4>
            <button class="btn add-cart" data-id="${product.id}">Add To Cart</button>
            <button class="remove-wishlist" data-id="${product.id}">Remove</button>
        </div>`;
    });
}

function removeWishlistItem(productID) {
    window.NexpakShop.storage.wishlist.toggle(productID);
    renderWishlist();
    showNotification("Removed from wishlist");
}

function renderCompare() {
    const container = document.querySelector("#compareItems");
    if (!container || !window.NexpakShop?.storage) return;

    const compare = window.NexpakShop.storage.compare.get() || [];
    if (compare.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>No products selected</p></div>`;
        return;
    }

    container.innerHTML = "";
    compare.forEach(id => {
        const product = shopProducts.find(p => p.id === id || p.id == id);
        if (!product) return;
        container.innerHTML += `
        <div class="compare-item" style="margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #ddd;">
            <h4>${product.name}</h4>
            <button class="remove-compare" data-id="${product.id}">Remove</button>
        </div>`;
    });
}

function removeCompareItem(productID) {
    window.NexpakShop.storage.compare.remove(productID);
    renderCompare();
    showNotification("Removed from comparison");
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-wishlist")) removeWishlistItem(e.target.dataset.id);
    if (e.target.classList.contains("remove-compare")) removeCompareItem(e.target.dataset.id);
    
    if (e.target.closest(".wishlist-icon")) {
        document.querySelector("#wishlistPanel")?.classList.add("active");
        renderWishlist();
    }
    if (e.target.classList.contains("close-wishlist")) {
        document.querySelector("#wishlistPanel")?.classList.remove("active");
    }
    
    if (e.target.classList.contains("compare-icon")) {
        document.querySelector("#comparePanel")?.classList.add("active");
        renderCompare();
    }
    if (e.target.classList.contains("close-compare")) {
        document.querySelector("#comparePanel")?.classList.remove("active");
    }
});
                              
