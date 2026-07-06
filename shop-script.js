// ======================================================
// NEXPAK SHOP SCRIPT V4
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

    initializeBackgroundSlider();

});

// ======================================================
// BACKGROUND SLIDESHOW
// ======================================================

function initializeBackgroundSlider() {

    const images = [
        "hero.jpg",
        "hero2.jpg",
        "hero3.jpg",
        "hero4.jpg"
    ];

    if (images.length === 0) return;

    let index = 0;

    document.body.style.backgroundImage = `url('${images[index]}')`;

    setInterval(() => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        document.body.style.backgroundImage =
            `url('${images[index]}')`;

    }, 5000);

}

// ======================================================
// SEARCH
// ======================================================

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        currentSearch =
            this.value.trim().toLowerCase();

        renderProducts();

    });

}

// ======================================================
// CATEGORY FILTERS
// ======================================================

function initializeFilters() {

    document.querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active"));

                this.classList.add("active");

                currentCategory =
                    this.dataset.category || "all";

                renderProducts();

            });

        });

}

// ======================================================
// FILTER BUTTON SUPPORT
// ======================================================

function filterCategory(category) {

    currentCategory = category;

    renderProducts();

}

// ======================================================
// MONEY FORMAT
// ======================================================

function money(value) {

    return "R" + Number(value).toFixed(2);

}

// ======================================================
// GET PRODUCT
// ======================================================

function getProduct(id) {

    return products.find(product =>
        product.id === id);

}

console.log("✅ Module 1 Loaded");
