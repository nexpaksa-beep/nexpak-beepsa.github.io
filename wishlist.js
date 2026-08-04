/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 1/8
WISHLIST ENGINE
=========================================================*/

// =========================================================
// STORAGE KEY
// =========================================================

const WISHLIST_KEY = "nexpak_wishlist_v17";

// =========================================================
// LOAD WISHLIST
// =========================================================

function loadWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch (e) {
        return [];
    }
}

// =========================================================
// SAVE WISHLIST
// =========================================================

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistCount();
}

// =========================================================
// GET WISHLIST
// =========================================================

function getWishlist() {
    return loadWishlist();
}

// =========================================================
// CHECK IF PRODUCT EXISTS
// =========================================================

function isInWishlist(productId) {
    return loadWishlist().includes(productId);
}

// =========================================================
// ADD TO WISHLIST
// =========================================================

function addToWishlist(productId) {

    let wishlist = loadWishlist();

    if (!wishlist.includes(productId)) {

        wishlist.push(productId);

        saveWishlist(wishlist);

        showNotification("Added to Wishlist ❤️");

        return true;
    }

    return false;
}

// =========================================================
// REMOVE FROM WISHLIST
// =========================================================

function removeFromWishlist(productId) {

    let wishlist = loadWishlist();

    wishlist = wishlist.filter(id => id !== productId);

    saveWishlist(wishlist);

    showNotification("Removed from Wishlist");

}

// =========================================================
// TOGGLE WISHLIST
// =========================================================

function toggleWishlist(productId) {

    if (isInWishlist(productId)) {

        removeFromWishlist(productId);

    } else {

        addToWishlist(productId);

    }

    updateWishlistButtons();

}

// =========================================================
// CLEAR WISHLIST
// =========================================================

function clearWishlist() {

    localStorage.removeItem(WISHLIST_KEY);

    updateWishlistCount();

    updateWishlistButtons();

}

// =========================================================
// WISHLIST COUNT
// =========================================================

function updateWishlistCount() {

    const count = loadWishlist().length;

    document.querySelectorAll(".wishlist-count").forEach(el => {

        el.textContent = count;

    });

}

// =========================================================
// UPDATE HEART BUTTONS
// =========================================================

function updateWishlistButtons() {

    document.querySelectorAll("[data-wishlist]").forEach(button => {

        const id = button.dataset.wishlist;

        if (isInWishlist(id)) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });

}

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    updateWishlistCount();

    updateWishlistButtons();

});

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 2/8
WISHLIST DRAWER
=========================================================*/

// =========================================================
// OPEN WISHLIST DRAWER
// =========================================================

function openWishlist() {

    const drawer = document.getElementById("wishlistDrawer");

    if (drawer) {

        drawer.classList.add("open");

    }

    renderWishlist();

}

// =========================================================
// CLOSE WISHLIST DRAWER
// =========================================================

function closeWishlist() {

    const drawer = document.getElementById("wishlistDrawer");

    if (drawer) {

        drawer.classList.remove("open");

    }

}

// =========================================================
// TOGGLE DRAWER
// =========================================================

function toggleWishlistDrawer() {

    const drawer = document.getElementById("wishlistDrawer");

    if (!drawer) return;

    drawer.classList.toggle("open");

    if (drawer.classList.contains("open")) {

        renderWishlist();

    }

}

// =========================================================
// RENDER WISHLIST
// =========================================================

function renderWishlist() {

    const container = document.getElementById("wishlistItems");

    if (!container) return;

    const wishlist = loadWishlist();

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="wishlist-empty">
                <i class="fas fa-heart-broken"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save products to your wishlist and they'll appear here.</p>
            </div>
        `;

        return;

    }

    wishlist.forEach(productId => {

        const product = shopProducts.find(p => String(p.id) === String(productId));

        if (!product) return;

        container.innerHTML += `

        <div class="wishlist-item">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="wishlist-image">

            <div class="wishlist-info">

                <h4>${product.name}</h4>

                <div class="wishlist-price">
                    ${formatCurrency(product.price)}
                </div>

                <div class="wishlist-buttons">

                    <button
                        onclick="addToCart('${product.id}')"
                        class="wishlist-cart-btn">

                        <button
                     onclick="moveWishlistToCart('${product.id}')"
                     class="wishlist-cart-btn">

                     Move to Cart


                    </button>

                    <button
                        onclick="deleteWishlistItem('${product.id}')"
                        class="wishlist-remove-btn">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// =========================================================
// AUTO REFRESH DRAWER
// =========================================================

const wishlistSaveOriginal = saveWishlist;

saveWishlist = function (wishlist) {

    wishlistSaveOriginal(wishlist);

    renderWishlist();

};

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 3/8
MOVE TO CART
DELETE
CLEAR WISHLIST
=========================================================*/

// =========================================================
// MOVE SINGLE ITEM TO CART
// =========================================================

function moveWishlistToCart(productId) {

    if (typeof addToCart === "function") {

        addToCart(productId);

    }

    removeFromWishlist(productId);

    renderWishlist();

    showNotification("Moved to Cart");

}

// =========================================================
// MOVE ALL ITEMS TO CART
// =========================================================

function moveAllWishlistToCart() {

    const wishlist = loadWishlist();

    if (!wishlist.length) {

        showNotification("Wishlist is empty");

        return;

    }

    wishlist.forEach(id => {

        if (typeof addToCart === "function") {

            addToCart(id);

        }

    });

    clearWishlist();

    renderWishlist();

    showNotification("All items moved to Cart");

}

// =========================================================
// DELETE SINGLE ITEM
// =========================================================

function deleteWishlistItem(productId) {

    removeFromWishlist(productId);

    renderWishlist();

}

// =========================================================
// CLEAR ENTIRE WISHLIST
// =========================================================

function clearWishlistConfirm() {

    if (!confirm("Clear your wishlist?")) {

        return;

    }

    clearWishlist();

    renderWishlist();

    showNotification("Wishlist cleared");

}

// =========================================================
// WISHLIST TOTAL
// =========================================================

function getWishlistTotal() {

    let total = 0;

    const wishlist = getFilteredWishlist();

    wishlist.forEach(id => {

        const product = shopProducts.find(p => String(p.id) === String(id));

        if (product) {

            total += Number(product.price);

        }

    });

    return total;

}

// =========================================================
// WISHLIST ITEM COUNT
// =========================================================

function getWishlistCount() {

    return loadWishlist().length;

}

// =========================================================
// REFRESH EVERYTHING
// =========================================================

function refreshWishlist() {

    updateWishlistCount();

    updateWishlistButtons();

    renderWishlist();

          }
<div class="wishlist-footer">

    <button
        onclick="moveAllWishlistToCart()"
        class="wishlist-checkout">

        Move All To Cart

    </button>

    <button
        onclick="clearWishlistConfirm()"
        class="wishlist-clear">

        Clear Wishlist

    </button>

</div>

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 4/8
SEARCH
SORT
CATEGORY FILTER
=========================================================*/

// =========================================================
// FILTER STATE
// =========================================================

let wishlistSearch = "";
let wishlistCategory = "all";
let wishlistSort = "name";

// =========================================================
// GET FILTERED WISHLIST
// =========================================================

function getFilteredWishlist() {

    let products = loadWishlist()
        .map(id => shopProducts.find(p => String(p.id) === String(id)))
        .filter(Boolean);

    // SEARCH
    if (wishlistSearch) {

        const search = wishlistSearch.toLowerCase();

        products = products.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );

    }

    // CATEGORY
    if (wishlistCategory !== "all") {

        products = products.filter(product =>
            product.category === wishlistCategory
        );

    }

    // SORT
    switch (wishlistSort) {

        case "price-low":
            products.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            products.sort((a, b) => b.price - a.price);
            break;

        case "brand":
            products.sort((a, b) => a.brand.localeCompare(b.brand));
            break;

        case "name":
        default:
            products.sort((a, b) => a.name.localeCompare(b.name));

    }

    return products;

}

// =========================================================
// SEARCH
// =========================================================

function searchWishlist(value) {

    wishlistSearch = value.trim();

    renderWishlist();

}

// =========================================================
// CATEGORY
// =========================================================

function filterWishlistCategory(category) {

    wishlistCategory = category;

    renderWishlist();

}

// =========================================================
// SORT
// =========================================================

function sortWishlist(sortBy) {

    wishlistSort = sortBy;

    renderWishlist();

          }

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 5/8
SHARE
EXPORT
COPY LINK
=========================================================*/

// =========================================================
// GET WISHLIST PRODUCTS
// =========================================================

function getWishlistProducts() {

    return loadWishlist()
        .map(id => shopProducts.find(p => String(p.id) === String(id)))
        .filter(Boolean);

}

// =========================================================
// SHARE WISHLIST
// =========================================================

async function shareWishlist() {

    const products = getWishlistProducts();

    if (!products.length) {

        showNotification("Wishlist is empty");

        return;

    }

    const message =
        "My NEXPAK Security Solutions Wishlist\n\n" +

        products.map(product =>
            `• ${product.name} - ${formatCurrency(product.price)}`
        ).join("\n");

    if (navigator.share) {

        try {

            await navigator.share({

                title: "NEXPAK Wishlist",

                text: message,

                url: window.location.origin + "/shop.html"

            });

        } catch (e) {}

    } else {

        navigator.clipboard.writeText(message);

        showNotification("Wishlist copied to clipboard");

    }

}

// =========================================================
// EXPORT TO CSV
// =========================================================

function exportWishlistCSV() {

    const products = getWishlistProducts();

    if (!products.length) {

        showNotification("Wishlist is empty");

        return;

    }

    let csv =
        "Product,Category,Brand,Price\n";

    products.forEach(product => {

        csv += `"${product.name}","${product.category}","${product.brand}",${product.price}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "nexpak-wishlist.csv";

    link.click();

    URL.revokeObjectURL(url);

}

// =========================================================
// EXPORT TO JSON
// =========================================================

function exportWishlistJSON() {

    const products = getWishlistProducts();

    const blob = new Blob(

        [JSON.stringify(products, null, 2)],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "nexpak-wishlist.json";

    link.click();

    URL.revokeObjectURL(url);

}

// =========================================================
// COPY SHOP LINK
// =========================================================

function copyWishlistLink() {

    navigator.clipboard.writeText(

        window.location.origin + "/shop.html"

    );

    showNotification("Shop link copied");

}

// =========================================================
// PRINT WISHLIST
// =========================================================

function printWishlist() {

    window.print();

}

<div class="wishlist-share-tools">

    <button onclick="shareWishlist()">
        Share
    </button>

    <button onclick="exportWishlistCSV()">
        Export CSV
    </button>

    <button onclick="exportWishlistJSON()">
        Export JSON
    </button>

    <button onclick="copyWishlistLink()">
        Copy Link
    </button>

    <button onclick="printWishlist()">
        Print
    </button>

</div>

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 6/8
RECOMMENDATIONS
RECENTLY VIEWED
=========================================================*/

// =========================================================
// RECENTLY VIEWED STORAGE
// =========================================================

const RECENTLY_VIEWED_KEY = "nexpak_recently_viewed_v17";

// =========================================================
// LOAD RECENTLY VIEWED
// =========================================================

function loadRecentlyViewed() {

    try {

        return JSON.parse(
            localStorage.getItem(RECENTLY_VIEWED_KEY)
        ) || [];

    } catch (e) {

        return [];

    }

}

// =========================================================
// SAVE RECENTLY VIEWED
// =========================================================

function saveRecentlyViewed(list) {

    localStorage.setItem(
        RECENTLY_VIEWED_KEY,
        JSON.stringify(list)
    );

}

// =========================================================
// ADD TO RECENTLY VIEWED
// =========================================================

function addRecentlyViewed(productId) {

    let recent = loadRecentlyViewed();

    recent = recent.filter(id => String(id) !== String(productId));

    recent.unshift(productId);

    recent = recent.slice(0, 12);

    saveRecentlyViewed(recent);

}

// =========================================================
// GET RECOMMENDED PRODUCTS
// =========================================================

function getWishlistRecommendations(limit = 6) {

    const wishlist = getWishlistProducts();

    if (!wishlist.length) {

        return [];

    }

    const categories = [...new Set(

        wishlist.map(product => product.category)

    )];

    const wishlistIds = wishlist.map(product => String(product.id));

    const recommendations = shopProducts.filter(product =>

        categories.includes(product.category) &&
        !wishlistIds.includes(String(product.id))

    );

    return recommendations.slice(0, limit);

}

// =========================================================
// RENDER RECOMMENDATIONS
// =========================================================

function renderWishlistRecommendations() {

    const container = document.getElementById(
        "wishlistRecommendations"
    );

    if (!container) return;

    const products = getWishlistRecommendations();

    if (!products.length) {

        container.innerHTML = "";

        return;

    }

    container.innerHTML = products.map(product => `

        <div class="wishlist-recommendation-card">

            <img
                src="${product.image}"
                alt="${product.name}">

            <h4>${product.name}</h4>

            <div class="price">
                ${formatCurrency(product.price)}
            </div>

            <button
                onclick="addToWishlist('${product.id}')">

                Add to Wishlist

            </button>

        </div>

    `).join("");

}

// =========================================================
// RENDER RECENTLY VIEWED
// =========================================================

function renderRecentlyViewedWishlist() {

    const container = document.getElementById(
        "wishlistRecentlyViewed"
    );

    if (!container) return;

    const recent = loadRecentlyViewed();

    const products = recent
        .map(id =>
            shopProducts.find(
                product => String(product.id) === String(id)
            )
        )
        .filter(Boolean);

    if (!products.length) {

        container.innerHTML = "";

        return;

    }

    container.innerHTML = products.map(product => `

        <div class="wishlist-recent-card">

            <img
                src="${product.image}"
                alt="${product.name}">

            <h4>${product.name}</h4>

            <div class="price">
                ${formatCurrency(product.price)}
            </div>

            <button
                onclick="toggleWishlist('${product.id}')">

                ❤️

            </button>

        </div>

    `).join("");

}

// =========================================================
// REFRESH RECOMMENDATIONS
// =========================================================

function refreshWishlistSuggestions() {

    renderWishlistRecommendations();

    renderRecentlyViewedWishlist();
  
  <div class="wishlist-recommendations">

    <h3>You May Also Like</h3>

    <div id="wishlistRecommendations"></div>

</div>

<div class="wishlist-recently-viewed">

    <h3>Recently Viewed</h3>

    <div id="wishlistRecentlyViewed"></div>

</div>

}
/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 7/8
PERFORMANCE
SYNCHRONIZATION
OPTIMIZATION
=========================================================*/

// =========================================================
// CACHE
// =========================================================

let wishlistCache = [];
let wishlistNeedsRefresh = true;

// =========================================================
// REFRESH CACHE
// =========================================================

function refreshWishlistCache() {

    wishlistCache = loadWishlist();

    wishlistNeedsRefresh = false;

}

// =========================================================
// GET CACHED WISHLIST
// =========================================================

function getCachedWishlist() {

    if (wishlistNeedsRefresh) {

        refreshWishlistCache();

    }

    return wishlistCache;

}

// =========================================================
// MARK CACHE DIRTY
// =========================================================

function invalidateWishlistCache() {

    wishlistNeedsRefresh = true;

}

// =========================================================
// OVERRIDE SAVE
// =========================================================

const wishlistSaveEngine = saveWishlist;

saveWishlist = function (wishlist) {

    wishlistSaveEngine(wishlist);

    invalidateWishlistCache();

    refreshWishlist();

};

// =========================================================
// STORAGE SYNCHRONIZATION
// =========================================================

window.addEventListener("storage", function (event) {

    if (event.key === WISHLIST_KEY) {

        invalidateWishlistCache();

        refreshWishlist();

    }

});

// =========================================================
// PAGE VISIBILITY
// =========================================================

document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {

        invalidateWishlistCache();

        refreshWishlist();

    }

});

// =========================================================
// DEBOUNCE
// =========================================================

function debounce(callback, delay = 300) {

    let timer;

    return function () {

        clearTimeout(timer);

        const args = arguments;

        timer = setTimeout(() => {

            callback.apply(this, args);

        }, delay);

    };

}

// =========================================================
// OPTIMIZED SEARCH
// =========================================================

const searchWishlistDebounced = debounce(function (value) {

    searchWishlist(value);

}, 250);

// =========================================================
// LAZY IMAGE LOADING
// =========================================================

function lazyLoadWishlistImages() {

    const images = document.querySelectorAll(
        ".wishlist-item img[data-src]"
    );

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const image = entry.target;

            image.src = image.dataset.src;

            image.removeAttribute("data-src");

            observer.unobserve(image);

        });

    });

    images.forEach(image => observer.observe(image));

}

// =========================================================
// AUTO REFRESH
// =========================================================

function initializeWishlistPerformance() {

    refreshWishlist();

    lazyLoadWishlistImages();

}

// =========================================================
// INITIALIZATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeWishlistPerformance();

});

/*=========================================================
NEXPAK SECURITY SOLUTIONS V17
wishlist.js
PART 8/8
FINAL INTEGRATION
PRODUCTION READY
=========================================================*/

// =========================================================
// GLOBAL API
// =========================================================

window.Wishlist = {

    load: loadWishlist,
    save: saveWishlist,
    get: getWishlist,

    add: addToWishlist,
    remove: removeFromWishlist,
    toggle: toggleWishlist,
    clear: clearWishlist,

    count: getWishlistCount,
    total: getWishlistTotal,

    render: renderWishlist,
    refresh: refreshWishlist,

    open: openWishlist,
    close: closeWishlist,
    toggleDrawer: toggleWishlistDrawer,

    recommendations: refreshWishlistSuggestions

};

// =========================================================
// SHOP EVENT INTEGRATION
// =========================================================

document.addEventListener("productViewed", function(e){

    if(e.detail && e.detail.id){

        addRecentlyViewed(e.detail.id);

    }

});

document.addEventListener("cartUpdated", function(){

    updateWishlistButtons();

    updateWishlistCount();

});

// =========================================================
// AUTO BIND WISHLIST BUTTONS
// =========================================================

function bindWishlistButtons(){

    document.querySelectorAll("[data-wishlist]").forEach(button=>{

        button.removeEventListener("click", wishlistButtonClick);

        button.addEventListener("click", wishlistButtonClick);

    });

}

function wishlistButtonClick(){

    toggleWishlist(this.dataset.wishlist);

}

// =========================================================
// MUTATION OBSERVER
// =========================================================

const wishlistObserver = new MutationObserver(function(){

    bindWishlistButtons();

});

wishlistObserver.observe(document.body,{

    childList:true,

    subtree:true

});

// =========================================================
// INITIALIZE
// =========================================================

function initializeWishlist(){

    refreshWishlistCache();

    updateWishlistCount();

    updateWishlistButtons();

    renderWishlist();

    bindWishlistButtons();

    refreshWishlistSuggestions();

    console.log("NEXPAK Wishlist V17 Loaded");

}

// =========================================================
// DOM READY
// =========================================================

document.addEventListener("DOMContentLoaded",initializeWishlist);

// =========================================================
// VERSION
// =========================================================

window.NEXPAK_WISHLIST_VERSION = "17.0";
