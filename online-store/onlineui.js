/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Version: V1.0
   Part: 1/8
   ============================================================ */

"use strict";

/*
 * ============================================================
 * NEXPAK ONLINE UI ENGINE
 * ------------------------------------------------------------
 * Visual interaction layer for:
 *
 * - Store
 * - Product cards
 * - Search
 * - Filters
 * - Cart
 * - Checkout
 * - Delivery
 * - Configurator
 * - Integration
 *
 * IMPORTANT:
 * This file does NOT replace or modify:
 *
 * online.js
 * onlinecart.js
 * onlinecheckout.js
 * onlinedelivery.js
 * onlineconfigurator.js
 * onlineintegration.js
 *
 * Those systems remain independent and locked.
 * ============================================================
 */

const NexpakOnlineUI = (() => {

    /* ========================================================
       CONFIGURATION
       ======================================================== */

    const CONFIG = {
        version: "V1.0",
        debug: false,

        selectors: {
            store: "#onlineStore",
            products: "#productGrid",
            cart: "#cart",
            cartCount: "#cartCount",
            search: "#searchInput",
            category: "#categoryFilter",
            sort: "#sortProducts",

            modal: "#productModal",
            toast: "#toastContainer",

            loading: "#storeLoading",
            empty: "#storeEmpty"
        },

        classes: {
            hidden: "ui-hidden",
            active: "ui-active",
            disabled: "ui-disabled",
            loading: "ui-loading",
            open: "ui-open",
            visible: "ui-visible"
        }
    };


    /* ========================================================
       INTERNAL STATE
       ======================================================== */

    const state = {
        initialized: false,
        ready: false,

        currentView: "grid",
        currentProduct: null,

        searchTerm: "",
        category: "all",
        sort: "default",

        modalOpen: false,
        loading: false
    };


    /* ========================================================
       DOM CACHE
       ======================================================== */

    const elements = {};

    function cacheElements() {

        Object.entries(CONFIG.selectors).forEach(([key, selector]) => {
            elements[key] = document.querySelector(selector);
        });

        log("UI elements cached", elements);
    }


    /* ========================================================
       LOGGER
       ======================================================== */

    function log(...args) {

        if (CONFIG.debug) {
            console.log(
                "[NEXPAK UI]",
                ...args
            );
        }
    }


    /* ========================================================
       SAFE DOM HELPERS
       ======================================================== */

    function $(selector, parent = document) {

        return parent.querySelector(selector);
    }


    function $$(selector, parent = document) {

        return Array.from(
            parent.querySelectorAll(selector)
        );
    }


    function exists(element) {

        return element !== null &&
               element !== undefined;
    }


    function addClass(element, className) {

        if (exists(element)) {
            element.classList.add(className);
        }
    }


    function removeClass(element, className) {

        if (exists(element)) {
            element.classList.remove(className);
        }
    }


    function toggleClass(
        element,
        className,
        force
    ) {

        if (!exists(element)) {
            return;
        }

        element.classList.toggle(
            className,
            force
        );
    }


    /* ========================================================
       UI VISIBILITY
       ======================================================== */

    function show(element) {

        if (!exists(element)) {
            return;
        }

        removeClass(
            element,
            CONFIG.classes.hidden
        );

        addClass(
            element,
            CONFIG.classes.visible
        );
    }


    function hide(element) {

        if (!exists(element)) {
            return;
        }

        addClass(
            element,
            CONFIG.classes.hidden
        );

        removeClass(
            element,
            CONFIG.classes.visible
        );
    }


    /* ========================================================
       LOADING STATE
       ======================================================== */

    function setLoading(isLoading) {

        state.loading = Boolean(isLoading);

        if (isLoading) {

            addClass(
                document.body,
                CONFIG.classes.loading
            );

            show(elements.loading);

        } else {

            removeClass(
                document.body,
                CONFIG.classes.loading
            );

            hide(elements.loading);
        }

        log(
            "Loading state:",
            state.loading
        );
    }


    /* ========================================================
       DISABLED STATE
       ======================================================== */

    function setDisabled(
        element,
        disabled = true
    ) {

        if (!exists(element)) {
            return;
        }

        element.disabled = Boolean(disabled);

        toggleClass(
            element,
            CONFIG.classes.disabled,
            Boolean(disabled)
        );
    }


    /* ========================================================
       ACTIVE STATE
       ======================================================== */

    function setActive(
        element,
        active = true
    ) {

        if (!exists(element)) {
            return;
        }

        toggleClass(
            element,
            CONFIG.classes.active,
            Boolean(active)
        );
    }


    /* ========================================================
       EMPTY STORE STATE
       ======================================================== */

    function showEmptyState(message) {

        if (!elements.empty) {
            return;
        }

        if (message) {

            elements.empty.textContent =
                message;
        }

        show(elements.empty);
    }


    function hideEmptyState() {

        hide(elements.empty);
    }


    /* ========================================================
       UI RESET
       ======================================================== */

    function resetUI() {

        state.currentProduct = null;
        state.modalOpen = false;

        state.searchTerm = "";
        state.category = "all";
        state.sort = "default";

        hideEmptyState();

        log("UI reset");
    }


    /* ========================================================
       EVENT SYSTEM
       ======================================================== */

    function emit(
        eventName,
        detail = {}
    ) {

        document.dispatchEvent(
            new CustomEvent(
                `nexpak:${eventName}`,
                {
                    detail
                }
            )
        );

        log(
            "Event emitted:",
            eventName,
            detail
        );
    }


    /* ========================================================
       GLOBAL UI EVENTS
       ======================================================== */

    function bindGlobalEvents() {

        document.addEventListener(
            "keydown",
            handleKeyboard
        );

        document.addEventListener(
            "click",
            handleDocumentClick
        );

        log("Global UI events bound");
    }


    /* ========================================================
       KEYBOARD CONTROLS
       ======================================================== */

    function handleKeyboard(event) {

        /*
         * ESC closes UI overlays/modals.
         */

        if (
            event.key === "Escape" &&
            state.modalOpen
        ) {

            emit(
                "ui:close-modal"
            );
        }
    }


    /* ========================================================
       DOCUMENT CLICK HANDLER
       ======================================================== */

    function handleDocumentClick(event) {

        const target =
            event.target;

        /*
         * Future UI actions will be
         * handled here.
         */

        if (
            target.closest(
                "[data-ui-action]"
            )
        ) {

            const actionElement =
                target.closest(
                    "[data-ui-action]"
                );

            const action =
                actionElement.dataset.uiAction;

            emit(
                "ui:action",
                {
                    action,
                    element: actionElement
                }
            );
        }
    }


    /* ========================================================
       READY EVENT
       ======================================================== */

    function markReady() {

        state.ready = true;

        removeClass(
            document.body,
            CONFIG.classes.loading
        );

        emit(
            "ui:ready",
            {
                version: CONFIG.version
            }
        );

        log(
            "Nexpak Online UI ready"
        );
    }


    /* ========================================================
       INITIALIZATION
       ======================================================== */

    function init() {

        if (state.initialized) {

            log(
                "UI already initialized"
            );

            return;
        }

        log(
            `Initializing Nexpak Online UI ${CONFIG.version}`
        );

        cacheElements();

        bindGlobalEvents();

        resetUI();

        state.initialized = true;

        markReady();
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        show,
        hide,

        setLoading,
        setDisabled,
        setActive,

        showEmptyState,
        hideEmptyState,

        emit,

        resetUI,

        getState() {

            return {
                ...state
            };
        },

        getConfig() {

            return {
                ...CONFIG
            };
        }
    };

})();


/* ============================================================
   AUTO INITIALIZATION
   ============================================================ */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => NexpakOnlineUI.init(),
        {
            once: true
        }
    );

} else {

    NexpakOnlineUI.init();
}


/* ============================================================
   END — PART 1/8
   ============================================================ */


/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 2/8
   ============================================================ */


/* ============================================================
   PRODUCT UI ENGINE
   ============================================================ */

NexpakOnlineUI.ProductUI = (() => {

    const productState = {
        products: [],
        filteredProducts: [],
        selectedProduct: null
    };


    /* ========================================================
       PRODUCT DATA NORMALIZER
       ======================================================== */

    function normalizeProduct(product) {

        if (!product || typeof product !== "object") {
            return null;
        }

        return {
            id:
                product.id ??
                product.productId ??
                product.sku ??
                "",

            sku:
                product.sku ??
                product.id ??
                "",

            name:
                product.name ??
                product.title ??
                "Security Product",

            title:
                product.title ??
                product.name ??
                "Security Product",

            description:
                product.description ??
                product.shortDescription ??
                "",

            price:
                Number(
                    product.price ??
                    product.salePrice ??
                    product.unitPrice ??
                    0
                ),

            image:
                product.image ??
                product.imageUrl ??
                product.thumbnail ??
                "",

            category:
                product.category ??
                product.categoryName ??
                "Other",

            brand:
                product.brand ??
                "",

            stock:
                Number(
                    product.stock ??
                    product.quantity ??
                    0
                ),

            featured:
                Boolean(product.featured),

            badge:
                product.badge ??
                "",

            original: product
        };
    }


    /* ========================================================
       SET PRODUCTS
       ======================================================== */

    function setProducts(products = []) {

        if (!Array.isArray(products)) {
            products = [];
        }

        productState.products =
            products
                .map(normalizeProduct)
                .filter(Boolean);

        productState.filteredProducts = [
            ...productState.products
        ];

        render();

        NexpakOnlineUI.emit(
            "products:loaded",
            {
                count:
                    productState.products.length
            }
        );
    }


    /* ========================================================
       GET PRODUCTS
       ======================================================== */

    function getProducts() {

        return [
            ...productState.products
        ];
    }


    function getFilteredProducts() {

        return [
            ...productState.filteredProducts
        ];
    }


    /* ========================================================
       FORMAT PRICE
       ======================================================== */

    function formatPrice(price) {

        const amount =
            Number(price) || 0;

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                minimumFractionDigits: 2
            }
        ).format(amount);
    }


    /* ========================================================
       ESCAPE HTML
       ======================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* ========================================================
       STOCK STATUS
       ======================================================== */

    function getStockStatus(product) {

        const stock =
            Number(product.stock);

        if (stock <= 0) {

            return {
                label: "Out of Stock",
                className: "out-of-stock",
                available: false
            };
        }

        if (stock <= 5) {

            return {
                label: `Only ${stock} left`,
                className: "low-stock",
                available: true
            };
        }

        return {
            label: "In Stock",
            className: "in-stock",
            available: true
        };
    }


    /* ========================================================
       PRODUCT CARD
       ======================================================== */

    function createCard(product) {

        const stock =
            getStockStatus(product);

        const image =
            product.image ||
            "images/product-placeholder.jpg";

        const badge =
            product.badge
                ? `
                    <span class="product-badge">
                        ${escapeHTML(product.badge)}
                    </span>
                  `
                : "";

        const brand =
            product.brand
                ? `
                    <span class="product-brand">
                        ${escapeHTML(product.brand)}
                    </span>
                  `
                : "";

        return `
            <article
                class="online-product-card"
                data-product-id="${escapeHTML(product.id)}"
                data-product-sku="${escapeHTML(product.sku)}"
            >

                <div class="product-card-image">

                    ${badge}

                    <button
                        type="button"
                        class="product-wishlist"
                        data-ui-action="wishlist"
                        data-product-id="${escapeHTML(product.id)}"
                        aria-label="Add ${escapeHTML(product.name)} to wishlist"
                    >
                        ♡
                    </button>

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="this.src='images/product-placeholder.jpg'"
                    >

                </div>


                <div class="product-card-content">

                    ${brand}

                    <h3 class="product-title">
                        ${escapeHTML(product.name)}
                    </h3>

                    <p class="product-description">
                        ${escapeHTML(product.description)}
                    </p>


                    <div class="product-stock ${stock.className}">
                        ${escapeHTML(stock.label)}
                    </div>


                    <div class="product-card-bottom">

                        <strong class="product-price">
                            ${formatPrice(product.price)}
                        </strong>

                    </div>


                    <div class="product-card-actions">

                        <button
                            type="button"
                            class="product-view-btn"
                            data-ui-action="view-product"
                            data-product-id="${escapeHTML(product.id)}"
                        >
                            View Product
                        </button>

                        <button
                            type="button"
                            class="product-add-btn"
                            data-ui-action="add-to-cart"
                            data-product-id="${escapeHTML(product.id)}"
                            ${stock.available ? "" : "disabled"}
                        >
                            ${
                                stock.available
                                    ? "Add to Cart"
                                    : "Out of Stock"
                            }
                        </button>

                    </div>

                </div>

            </article>
        `;
    }


    /* ========================================================
       RENDER PRODUCTS
       ======================================================== */

    function render(products = productState.filteredProducts) {

        const container =
            document.querySelector(
                CONFIG.selectors.products
            );

        if (!container) {

            console.warn(
                "[NEXPAK UI] Product container not found:",
                CONFIG.selectors.products
            );

            return;
        }


        if (!products.length) {

            container.innerHTML = "";

            NexpakOnlineUI.showEmptyState(
                "No products found."
            );

            return;
        }


        NexpakOnlineUI.hideEmptyState();


        container.innerHTML =
            products
                .map(createCard)
                .join("");


        NexpakOnlineUI.emit(
            "products:rendered",
            {
                count: products.length
            }
        );
    }


    /* ========================================================
       FIND PRODUCT
       ======================================================== */

    function findProduct(productId) {

        return productState.products.find(
            product =>
                String(product.id) ===
                String(productId)
        ) || null;
    }


    /* ========================================================
       SELECT PRODUCT
       ======================================================== */

    function selectProduct(productId) {

        const product =
            findProduct(productId);

        if (!product) {
            return null;
        }

        productState.selectedProduct =
            product;

        NexpakOnlineUI.emit(
            "product:selected",
            {
                product
            }
        );

        return product;
    }


    /* ========================================================
       PRODUCT ACTIONS
       ======================================================== */

    function handleProductAction(
        action,
        productId
    ) {

        const product =
            selectProduct(productId);

        if (!product) {
            return;
        }


        switch (action) {

            case "view-product":

                NexpakOnlineUI.emit(
                    "product:view",
                    {
                        product
                    }
                );

                break;


            case "add-to-cart":

                NexpakOnlineUI.emit(
                    "cart:add",
                    {
                        product
                    }
                );

                break;


            case "wishlist":

                NexpakOnlineUI.emit(
                    "wishlist:toggle",
                    {
                        product
                    }
                );

                break;


            default:

                NexpakOnlineUI.emit(
                    "product:action",
                    {
                        action,
                        product
                    }
                );
        }
    }


    /* ========================================================
       PRODUCT EVENT DELEGATION
       ======================================================== */

    function bindEvents() {

        document.addEventListener(
            "click",
            event => {

                const actionElement =
                    event.target.closest(
                        "[data-ui-action]"
                    );

                if (!actionElement) {
                    return;
                }


                const action =
                    actionElement.dataset.uiAction;


                if (
                    ![
                        "view-product",
                        "add-to-cart",
                        "wishlist"
                    ].includes(action)
                ) {
                    return;
                }


                const productId =
                    actionElement.dataset.productId;


                if (!productId) {
                    return;
                }


                handleProductAction(
                    action,
                    productId
                );
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        bindEvents();

        NexpakOnlineUI.emit(
            "product-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        setProducts,
        getProducts,
        getFilteredProducts,

        findProduct,
        selectProduct,

        render,
        createCard,

        formatPrice,

        getStockStatus,

        handleProductAction
    };

})();


/* ============================================================
   INITIALIZE PRODUCT UI
   ============================================================ */

NexpakOnlineUI.ProductUI.init();


/* ============================================================
   END — PART 2/8
   ============================================================ */
/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 3/8
   ============================================================ */


/* ============================================================
   PRODUCT FILTER ENGINE
   ============================================================ */

NexpakOnlineUI.FilterUI = (() => {

    const filterState = {

        searchTerm: "",
        category: "all",
        brand: "all",
        stock: "all",
        sort: "default",

        results: []
    };


    /* ========================================================
       NORMALIZE TEXT
       ======================================================== */

    function normalizeText(value) {

        return String(value ?? "")
            .toLowerCase()
            .trim();
    }


    /* ========================================================
       GET PRODUCT DATA
       ======================================================== */

    function getProducts() {

        if (
            NexpakOnlineUI.ProductUI &&
            typeof NexpakOnlineUI.ProductUI.getProducts ===
                "function"
        ) {

            return NexpakOnlineUI.ProductUI.getProducts();
        }

        return [];
    }


    /* ========================================================
       SEARCH MATCH
       ======================================================== */

    function matchesSearch(product) {

        const search =
            normalizeText(
                filterState.searchTerm
            );

        if (!search) {
            return true;
        }


        const searchableText = [

            product.name,
            product.title,
            product.description,
            product.category,
            product.brand,
            product.sku,
            product.id

        ]
            .map(normalizeText)
            .join(" ");


        return searchableText.includes(search);
    }


    /* ========================================================
       CATEGORY MATCH
       ======================================================== */

    function matchesCategory(product) {

        const category =
            normalizeText(
                filterState.category
            );

        if (
            !category ||
            category === "all"
        ) {

            return true;
        }


        return normalizeText(
            product.category
        ) === category;
    }


    /* ========================================================
       BRAND MATCH
       ======================================================== */

    function matchesBrand(product) {

        const brand =
            normalizeText(
                filterState.brand
            );

        if (
            !brand ||
            brand === "all"
        ) {

            return true;
        }


        return normalizeText(
            product.brand
        ) === brand;
    }


    /* ========================================================
       STOCK MATCH
       ======================================================== */

    function matchesStock(product) {

        const stockFilter =
            normalizeText(
                filterState.stock
            );


        if (
            !stockFilter ||
            stockFilter === "all"
        ) {

            return true;
        }


        const stock =
            Number(product.stock) || 0;


        if (
            stockFilter ===
            "in-stock"
        ) {

            return stock > 0;
        }


        if (
            stockFilter ===
            "out-of-stock"
        ) {

            return stock <= 0;
        }


        if (
            stockFilter ===
            "low-stock"
        ) {

            return stock > 0 &&
                   stock <= 5;
        }


        return true;
    }


    /* ========================================================
       SORT PRODUCTS
       ======================================================== */

    function sortProducts(products) {

        const sorted = [
            ...products
        ];


        switch (
            normalizeText(
                filterState.sort
            )
        ) {

            case "price-low":

            case "price-asc":

            case "low-high":

                sorted.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                );

                break;


            case "price-high":

            case "price-desc":

            case "high-low":

                sorted.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                );

                break;


            case "name-asc":

            case "name-a-z":

            case "az":

                sorted.sort(
                    (a, b) =>
                        String(a.name)
                            .localeCompare(
                                String(b.name)
                            )
                );

                break;


            case "name-desc":

            case "name-z-a":

            case "za":

                sorted.sort(
                    (a, b) =>
                        String(b.name)
                            .localeCompare(
                                String(a.name)
                            )
                );

                break;


            case "featured":

                sorted.sort(
                    (a, b) =>
                        Number(b.featured) -
                        Number(a.featured)
                );

                break;


            case "newest":

                sorted.sort(
                    (a, b) => {

                        const dateA =
                            new Date(
                                a.original?.createdAt ||
                                a.original?.dateAdded ||
                                0
                            );

                        const dateB =
                            new Date(
                                b.original?.createdAt ||
                                b.original?.dateAdded ||
                                0
                            );

                        return dateB - dateA;
                    }
                );

                break;


            case "default":

            default:

                break;
        }


        return sorted;
    }


    /* ========================================================
       APPLY FILTERS
       ======================================================== */

    function applyFilters() {

        const products =
            getProducts();


        let results =
            products.filter(
                product =>
                    matchesSearch(product) &&
                    matchesCategory(product) &&
                    matchesBrand(product) &&
                    matchesStock(product)
            );


        results =
            sortProducts(results);


        filterState.results =
            results;


        /*
         * Update ProductUI's displayed
         * collection without replacing
         * the master product database.
         */

        NexpakOnlineUI.ProductUI.render(
            results
        );


        NexpakOnlineUI.emit(
            "filters:applied",
            {
                results,
                count: results.length,

                filters: {
                    search:
                        filterState.searchTerm,

                    category:
                        filterState.category,

                    brand:
                        filterState.brand,

                    stock:
                        filterState.stock,

                    sort:
                        filterState.sort
                }
            }
        );


        updateResultCount(
            results.length
        );


        return results;
    }


    /* ========================================================
       SEARCH
       ======================================================== */

    function search(value) {

        filterState.searchTerm =
            String(value ?? "")
                .trim();

        applyFilters();
    }


    /* ========================================================
       CATEGORY
       ======================================================== */

    function setCategory(category) {

        filterState.category =
            category ||
            "all";

        applyFilters();
    }


    /* ========================================================
       BRAND
       ======================================================== */

    function setBrand(brand) {

        filterState.brand =
            brand ||
            "all";

        applyFilters();
    }


    /* ========================================================
       STOCK FILTER
       ======================================================== */

    function setStockFilter(stock) {

        filterState.stock =
            stock ||
            "all";

        applyFilters();
    }


    /* ========================================================
       SORT
       ======================================================== */

    function setSort(sort) {

        filterState.sort =
            sort ||
            "default";

        applyFilters();
    }


    /* ========================================================
       RESULT COUNT
       ======================================================== */

    function updateResultCount(count) {

        const counters =
            document.querySelectorAll(
                "[data-product-count]"
            );


        counters.forEach(
            element => {

                element.textContent =
                    String(count);
            }
        );


        const resultText =
            document.querySelector(
                "[data-result-count]"
            );


        if (resultText) {

            resultText.textContent =
                `${count} ${
                    count === 1
                        ? "product"
                        : "products"
                }`;
        }
    }


    /* ========================================================
       CLEAR FILTERS
       ======================================================== */

    function clearFilters() {

        filterState.searchTerm = "";
        filterState.category = "all";
        filterState.brand = "all";
        filterState.stock = "all";
        filterState.sort = "default";


        syncFilterControls();


        applyFilters();


        NexpakOnlineUI.emit(
            "filters:cleared"
        );
    }


    /* ========================================================
       SYNC CONTROLS
       ======================================================== */

    function syncFilterControls() {

        const searchInput =
            document.querySelector(
                CONFIG.selectors.search
            );


        if (searchInput) {

            searchInput.value =
                filterState.searchTerm;
        }


        const categorySelect =
            document.querySelector(
                CONFIG.selectors.category
            );


        if (categorySelect) {

            categorySelect.value =
                filterState.category;
        }


        const sortSelect =
            document.querySelector(
                CONFIG.selectors.sort
            );


        if (sortSelect) {

            sortSelect.value =
                filterState.sort;
        }


        const brandSelect =
            document.querySelector(
                "#brandFilter"
            );


        if (brandSelect) {

            brandSelect.value =
                filterState.brand;
        }


        const stockSelect =
            document.querySelector(
                "#stockFilter"
            );


        if (stockSelect) {

            stockSelect.value =
                filterState.stock;
        }
    }


    /* ========================================================
       CONTROL EVENTS
       ======================================================== */

    function bindControls() {

        /* SEARCH */

        const searchInput =
            document.querySelector(
                CONFIG.selectors.search
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                event => {

                    search(
                        event.target.value
                    );
                }
            );
        }


        /* CATEGORY */

        const categorySelect =
            document.querySelector(
                CONFIG.selectors.category
            );


        if (categorySelect) {

            categorySelect.addEventListener(
                "change",
                event => {

                    setCategory(
                        event.target.value
                    );
                }
            );
        }


        /* SORT */

        const sortSelect =
            document.querySelector(
                CONFIG.selectors.sort
            );


        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                event => {

                    setSort(
                        event.target.value
                    );
                }
            );
        }


        /* BRAND */

        const brandSelect =
            document.querySelector(
                "#brandFilter"
            );


        if (brandSelect) {

            brandSelect.addEventListener(
                "change",
                event => {

                    setBrand(
                        event.target.value
                    );
                }
            );
        }


        /* STOCK */

        const stockSelect =
            document.querySelector(
                "#stockFilter"
            );


        if (stockSelect) {

            stockSelect.addEventListener(
                "change",
                event => {

                    setStockFilter(
                        event.target.value
                    );
                }
            );
        }


        /* CLEAR */

        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-clear-filters]"
                    );


                if (!button) {
                    return;
                }


                clearFilters();
            }
        );
    }


    /* ========================================================
       GET FILTER STATE
       ======================================================== */

    function getState() {

        return {
            ...filterState,
            results: [
                ...filterState.results
            ]
        };
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        bindControls();

        applyFilters();

        NexpakOnlineUI.emit(
            "filter-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        search,
        setCategory,
        setBrand,
        setStockFilter,
        setSort,

        applyFilters,
        clearFilters,

        getState,
        syncFilterControls,

        matchesSearch,
        matchesCategory,
        matchesBrand,
        matchesStock,

        sortProducts
    };

})();


/* ============================================================
   INITIALIZE FILTER UI
   ============================================================ */

NexpakOnlineUI.FilterUI.init();


/* ============================================================
   END — PART 3/8
   ============================================================ */

/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 4/8
   CART UI ENGINE
   ============================================================ */


/* ============================================================
   CART UI ENGINE
   ============================================================ */

NexpakOnlineUI.CartUI = (() => {

    const cartState = {
        items: [],
        subtotal: 0,
        itemCount: 0,
        initialized: false
    };


    /* ========================================================
       SAFE NUMBER
       ======================================================== */

    function number(value) {

        const result = Number(value);

        return Number.isFinite(result)
            ? result
            : 0;
    }


    /* ========================================================
       FORMAT MONEY
       ======================================================== */

    function formatMoney(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                minimumFractionDigits: 2
            }
        ).format(number(value));
    }


    /* ========================================================
       GET CART ENGINE
       ======================================================== */

    function getCartEngine() {

        /*
         * The locked cart engine may expose
         * different API names depending on
         * the final implementation.
         *
         * We detect the available API rather
         * than making assumptions.
         */

        if (
            typeof window !== "undefined" &&
            window.NexpakOnlineCart
        ) {

            return window.NexpakOnlineCart;
        }


        if (
            typeof window !== "undefined" &&
            window.onlineCart
        ) {

            return window.onlineCart;
        }


        if (
            typeof window !== "undefined" &&
            window.Cart
        ) {

            return window.Cart;
        }


        return null;
    }


    /* ========================================================
       READ CART
       ======================================================== */

    function readCart() {

        const cart =
            getCartEngine();


        if (!cart) {

            return {
                items: [],
                subtotal: 0,
                itemCount: 0
            };
        }


        let rawItems = [];


        /*
         * Supported getter patterns.
         */

        if (
            typeof cart.getItems ===
            "function"
        ) {

            rawItems =
                cart.getItems();

        } else if (
            typeof cart.getCart ===
            "function"
        ) {

            const data =
                cart.getCart();

            rawItems =
                Array.isArray(data)
                    ? data
                    : data?.items || [];

        } else if (
            Array.isArray(cart.items)
        ) {

            rawItems =
                cart.items;
        }


        if (!Array.isArray(rawItems)) {

            rawItems = [];
        }


        const items =
            rawItems.map(
                normalizeCartItem
            );


        const itemCount =
            items.reduce(
                (total, item) =>
                    total +
                    number(
                        item.quantity
                    ),
                0
            );


        const subtotal =
            items.reduce(
                (total, item) =>
                    total +
                    (
                        number(item.price) *
                        number(item.quantity)
                    ),
                0
            );


        cartState.items =
            items;

        cartState.itemCount =
            itemCount;

        cartState.subtotal =
            subtotal;


        return {
            items,
            itemCount,
            subtotal
        };
    }


    /* ========================================================
       NORMALIZE CART ITEM
       ======================================================== */

    function normalizeCartItem(item) {

        item =
            item || {};


        const quantity =
            Math.max(
                0,
                number(
                    item.quantity ??
                    item.qty ??
                    1
                )
            );


        const price =
            number(
                item.price ??
                item.unitPrice ??
                item.product?.price ??
                0
            );


        const productId =
            item.productId ??
            item.id ??
            item.product?.id ??
            item.sku ??
            "";


        const name =
            item.name ??
            item.title ??
            item.product?.name ??
            item.product?.title ??
            "Product";


        const image =
            item.image ??
            item.imageUrl ??
            item.product?.image ??
            item.product?.imageUrl ??
            "images/product-placeholder.jpg";


        return {

            id: productId,

            productId,

            sku:
                item.sku ??
                item.product?.sku ??
                "",

            name,

            title: name,

            image,

            price,

            quantity,

            total:
                price * quantity,

            original: item
        };
    }


    /* ========================================================
       UPDATE CART BADGE
       ======================================================== */

    function updateCartBadge(count) {

        const total =
            number(count);


        const badges =
            document.querySelectorAll(
                "[data-cart-count], #cartCount"
            );


        badges.forEach(
            badge => {

                badge.textContent =
                    String(total);


                badge.setAttribute(
                    "data-count",
                    String(total)
                );


                badge.classList.toggle(
                    "has-items",
                    total > 0
                );
            }
        );


        /*
         * Accessibility announcement.
         */

        const aria =
            document.querySelector(
                "[data-cart-aria]"
            );


        if (aria) {

            aria.textContent =
                total === 1
                    ? "1 item in cart"
                    : `${total} items in cart`;
        }
    }


    /* ========================================================
       UPDATE CART TOTALS
       ======================================================== */

    function updateTotals(
        subtotal
    ) {

        const total =
            number(subtotal);


        document
            .querySelectorAll(
                "[data-cart-subtotal]"
            )
            .forEach(
                element => {

                    element.textContent =
                        formatMoney(total);
                }
            );


        document
            .querySelectorAll(
                "[data-cart-total]"
            )
            .forEach(
                element => {

                    element.textContent =
                        formatMoney(total);
                }
            );
    }


    /* ========================================================
       CREATE CART ITEM
       ======================================================== */

    function createCartItem(item) {

        const quantity =
            number(item.quantity);


        const total =
            number(item.price) *
            quantity;


        return `
            <div
                class="online-cart-item"
                data-cart-item-id="${escapeHTML(item.id)}"
                data-product-id="${escapeHTML(item.productId)}"
            >

                <div class="cart-item-image">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                        onerror="this.src='images/product-placeholder.jpg'"
                    >

                </div>


                <div class="cart-item-info">

                    <h4 class="cart-item-name">
                        ${escapeHTML(item.name)}
                    </h4>

                    ${
                        item.sku
                            ? `
                                <span class="cart-item-sku">
                                    SKU: ${escapeHTML(item.sku)}
                                </span>
                              `
                            : ""
                    }

                    <span class="cart-item-price">
                        ${formatMoney(item.price)}
                    </span>


                    <div class="cart-item-controls">

                        <button
                            type="button"
                            class="cart-quantity-btn"
                            data-cart-action="decrease"
                            data-product-id="${escapeHTML(item.productId)}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <input
                            type="number"
                            class="cart-quantity-input"
                            data-cart-action="quantity"
                            data-product-id="${escapeHTML(item.productId)}"
                            value="${quantity}"
                            min="1"
                            inputmode="numeric"
                            aria-label="Quantity"
                        >


                        <button
                            type="button"
                            class="cart-quantity-btn"
                            data-cart-action="increase"
                            data-product-id="${escapeHTML(item.productId)}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="cart-item-right">

                    <strong class="cart-item-total">
                        ${formatMoney(total)}
                    </strong>


                    <button
                        type="button"
                        class="cart-remove-btn"
                        data-cart-action="remove"
                        data-product-id="${escapeHTML(item.productId)}"
                        aria-label="Remove ${escapeHTML(item.name)}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    }


    /* ========================================================
       ESCAPE HTML
       ======================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* ========================================================
       RENDER CART
       ======================================================== */

    function render() {

        const cart =
            readCart();


        const containers =
            document.querySelectorAll(
                "[data-cart-items], #cartItems"
            );


        containers.forEach(
            container => {

                if (!cart.items.length) {

                    container.innerHTML = `
                        <div class="cart-empty">
                            <div class="cart-empty-icon">
                                🛒
                            </div>

                            <h3>
                                Your cart is empty
                            </h3>

                            <p>
                                Add security products
                                to your cart to continue.
                            </p>

                            <button
                                type="button"
                                class="cart-empty-shop-btn"
                                data-ui-action="continue-shopping"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    `;

                    return;
                }


                container.innerHTML =
                    cart.items
                        .map(
                            createCartItem
                        )
                        .join("");
            }
        );


        updateCartBadge(
            cart.itemCount
        );


        updateTotals(
            cart.subtotal
        );


        toggleCartEmptyState(
            cart.items.length === 0
        );


        NexpakOnlineUI.emit(
            "cart:rendered",
            {
                items: cart.items,
                itemCount:
                    cart.itemCount,
                subtotal:
                    cart.subtotal
            }
        );


        return cart;
    }


    /* ========================================================
       EMPTY STATE
       ======================================================== */

    function toggleCartEmptyState(
        empty
    ) {

        document
            .querySelectorAll(
                "[data-cart-empty]"
            )
            .forEach(
                element => {

                    element.hidden =
                        !empty;
                }
            );


        document
            .querySelectorAll(
                "[data-cart-content]"
            )
            .forEach(
                element => {

                    element.hidden =
                        empty;
                }
            );
    }


    /* ========================================================
       CALL CART ENGINE
       ======================================================== */

    function callCartMethod(
        methodNames,
        ...args
    ) {

        const cart =
            getCartEngine();


        if (!cart) {

            console.warn(
                "[NEXPAK UI] Cart engine not found."
            );

            return false;
        }


        for (
            const methodName
            of methodNames
        ) {

            if (
                typeof cart[methodName] ===
                "function"
            ) {

                cart[methodName](
                    ...args
                );

                return true;
            }
        }


        console.warn(
            "[NEXPAK UI] Cart method unavailable:",
            methodNames
        );


        return false;
    }


    /* ========================================================
       SET QUANTITY
       ======================================================== */

    function setQuantity(
        productId,
        quantity
    ) {

        const value =
            Math.max(
                1,
                Math.floor(
                    number(quantity)
                )
            );


        const success =
            callCartMethod(
                [
                    "updateQuantity",
                    "setQuantity",
                    "updateItemQuantity",
                    "changeQuantity"
                ],
                productId,
                value
            );


        if (success) {

            refresh();
        }


        return success;
    }


    /* ========================================================
       INCREASE QUANTITY
       ======================================================== */

    function increaseQuantity(
        productId
    ) {

        const cart =
            readCart();


        const item =
            cart.items.find(
                current =>
                    String(
                        current.productId
                    ) ===
                    String(productId)
            );


        const quantity =
            item
                ? number(item.quantity) + 1
                : 1;


        return setQuantity(
            productId,
            quantity
        );
    }


    /* ========================================================
       DECREASE QUANTITY
       ======================================================== */

    function decreaseQuantity(
        productId
    ) {

        const cart =
            readCart();


        const item =
            cart.items.find(
                current =>
                    String(
                        current.productId
                    ) ===
                    String(productId)
            );


        if (!item) {
            return false;
        }


        const quantity =
            number(item.quantity);


        if (quantity <= 1) {

            return removeItem(
                productId
            );
        }


        return setQuantity(
            productId,
            quantity - 1
        );
    }


    /* ========================================================
       REMOVE ITEM
       ======================================================== */

    function removeItem(
        productId
    ) {

        const success =
            callCartMethod(
                [
                    "removeItem",
                    "removeFromCart",
                    "deleteItem"
                ],
                productId
            );


        if (success) {

            refresh();


            NexpakOnlineUI.emit(
                "cart:item-removed",
                {
                    productId
                }
            );
        }


        return success;
    }


    /* ========================================================
       CLEAR CART
       ======================================================== */

    function clearCart() {

        const success =
            callCartMethod(
                [
                    "clearCart",
                    "emptyCart",
                    "resetCart"
                ]
            );


        if (success) {

            refresh();


            NexpakOnlineUI.emit(
                "cart:cleared"
            );
        }


        return success;
    }


    /* ========================================================
       REFRESH
       ======================================================== */

    function refresh() {

        const cart =
            readCart();


        render();


        NexpakOnlineUI.emit(
            "cart:updated",
            {
                ...cart
            }
        );


        return cart;
    }


    /* ========================================================
       CART ACTION HANDLER
       ======================================================== */

    function handleAction(
        actionElement
    ) {

        if (!actionElement) {
            return;
        }


        const action =
            actionElement.dataset
                .cartAction;


        const productId =
            actionElement.dataset
                .productId;


        if (!action) {
            return;
        }


        switch (action) {

            case "increase":

                increaseQuantity(
                    productId
                );

                break;


            case "decrease":

                decreaseQuantity(
                    productId
                );

                break;


            case "remove":

                removeItem(
                    productId
                );

                break;


            case "quantity":

                setQuantity(
                    productId,
                    actionElement.value
                );

                break;


            case "clear":

                clearCart();

                break;


            default:

                break;
        }
    }


    /* ========================================================
       EVENT DELEGATION
       ======================================================== */

    function bindEvents() {

        document.addEventListener(
            "click",
            event => {

                const action =
                    event.target.closest(
                        "[data-cart-action]"
                    );


                if (!action) {
                    return;
                }


                handleAction(
                    action
                );
            }
        );


        document.addEventListener(
            "change",
            event => {

                const input =
                    event.target.closest(
                        '[data-cart-action="quantity"]'
                    );


                if (!input) {
                    return;
                }


                handleAction(
                    input
                );
            }
        );


        document.addEventListener(
            "click",
            event => {

                const clearButton =
                    event.target.closest(
                        "[data-clear-cart]"
                    );


                if (!clearButton) {
                    return;
                }


                clearCart();
            }
        );


        /*
         * External cart engine updates.
         */

        [
            "cart:updated",
            "cartUpdated",
            "cart:changed",
            "cartChanged"
        ].forEach(
            eventName => {

                document.addEventListener(
                    eventName,
                    () => {

                        refresh();
                    }
                );
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        if (
            cartState.initialized
        ) {
            return;
        }


        bindEvents();

        cartState.initialized =
            true;


        refresh();


        NexpakOnlineUI.emit(
            "cart-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        readCart,
        render,
        refresh,

        setQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,

        updateCartBadge,
        updateTotals,

        getState() {

            return {
                ...cartState,
                items: [
                    ...cartState.items
                ]
            };
        }
    };

})();


/* ============================================================
   INITIALIZE CART UI
   ============================================================ */

NexpakOnlineUI.CartUI.init();


/* ============================================================
   END — PART 4/8
   ============================================================ */
/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 5/8
   CHECKOUT + DELIVERY UI ENGINE
   ============================================================ */


/* ============================================================
   CHECKOUT UI ENGINE
   ============================================================ */

NexpakOnlineUI.CheckoutUI = (() => {

    const checkoutState = {

        step: 1,

        customer: {},

        delivery: {},

        payment: {},

        submitting: false,

        initialized: false
    };


    /* ========================================================
       SAFE VALUE
       ======================================================== */

    function value(
        element
    ) {

        if (!element) {
            return "";
        }

        return String(
            element.value ?? ""
        ).trim();
    }


    /* ========================================================
       CHECKOUT ENGINE
       ======================================================== */

    function getCheckoutEngine() {

        if (
            typeof window !== "undefined" &&
            window.NexpakOnlineCheckout
        ) {

            return window.NexpakOnlineCheckout;
        }


        if (
            typeof window !== "undefined" &&
            window.onlineCheckout
        ) {

            return window.onlineCheckout;
        }


        if (
            typeof window !== "undefined" &&
            window.Checkout
        ) {

            return window.Checkout;
        }


        return null;
    }


    /* ========================================================
       DELIVERY ENGINE
       ======================================================== */

    function getDeliveryEngine() {

        if (
            typeof window !== "undefined" &&
            window.NexpakOnlineDelivery
        ) {

            return window.NexpakOnlineDelivery;
        }


        if (
            typeof window !== "undefined" &&
            window.onlineDelivery
        ) {

            return window.onlineDelivery;
        }


        if (
            typeof window !== "undefined" &&
            window.Delivery
        ) {

            return window.Delivery;
        }


        return null;
    }


    /* ========================================================
       CHECKOUT ELEMENTS
       ======================================================== */

    function getField(
        names
    ) {

        for (
            const name of names
        ) {

            const element =
                document.querySelector(
                    `[name="${name}"]`
                );


            if (element) {
                return element;
            }
        }


        return null;
    }


    /* ========================================================
       COLLECT CUSTOMER DATA
       ======================================================== */

    function collectCustomerData() {

        const customer = {

            firstName:
                value(
                    getField([
                        "firstName",
                        "first_name"
                    ])
                ),

            lastName:
                value(
                    getField([
                        "lastName",
                        "last_name"
                    ])
                ),

            fullName:
                value(
                    getField([
                        "fullName",
                        "name",
                        "customerName"
                    ])
                ),

            email:
                value(
                    getField([
                        "email",
                        "customerEmail"
                    ])
                ),

            phone:
                value(
                    getField([
                        "phone",
                        "telephone",
                        "mobile"
                    ])
                )
        };


        checkoutState.customer =
            customer;


        return customer;
    }


    /* ========================================================
       COLLECT DELIVERY DATA
       ======================================================== */

    function collectDeliveryData() {

        const delivery = {

            address:
                value(
                    getField([
                        "address",
                        "deliveryAddress",
                        "streetAddress"
                    ])
                ),

            suburb:
                value(
                    getField([
                        "suburb",
                        "deliverySuburb"
                    ])
                ),

            city:
                value(
                    getField([
                        "city",
                        "deliveryCity"
                    ])
                ),

            province:
                value(
                    getField([
                        "province",
                        "deliveryProvince"
                    ])
                ),

            postalCode:
                value(
                    getField([
                        "postalCode",
                        "postcode",
                        "zip"
                    ])
                ),

            country:
                value(
                    getField([
                        "country",
                        "deliveryCountry"
                    ])
                ),

            method:
                value(
                    getField([
                        "deliveryMethod",
                        "shippingMethod"
                    ])
                )
        };


        checkoutState.delivery =
            delivery;


        return delivery;
    }


    /* ========================================================
       COLLECT PAYMENT DATA
       ======================================================== */

    function collectPaymentData() {

        const payment = {

            method:
                value(
                    getField([
                        "paymentMethod",
                        "payment_method"
                    ])
                )
        };


        checkoutState.payment =
            payment;


        return payment;
    }


    /* ========================================================
       EMAIL VALIDATION
       ======================================================== */

    function validEmail(
        email
    ) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                String(email)
            );
    }


    /* ========================================================
       PHONE VALIDATION
       ======================================================== */

    function validPhone(
        phone
    ) {

        const cleaned =
            String(phone)
                .replace(
                    /[\s()+\-]/g,
                    ""
                );


        return (
            cleaned.length >= 9 &&
            cleaned.length <= 15
        );
    }


    /* ========================================================
       FIELD ERROR
       ======================================================== */

    function showFieldError(
        field,
        message
    ) {

        if (!field) {
            return;
        }


        field.classList.add(
            "ui-field-error"
        );


        field.setAttribute(
            "aria-invalid",
            "true"
        );


        let error =
            field.parentElement
                ?.querySelector(
                    ".ui-field-error-message"
                );


        if (!error) {

            error =
                document.createElement(
                    "small"
                );

            error.className =
                "ui-field-error-message";


            field.parentElement
                ?.appendChild(error);
        }


        error.textContent =
            message;
    }


    /* ========================================================
       CLEAR FIELD ERROR
       ======================================================== */

    function clearFieldError(
        field
    ) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "ui-field-error"
        );


        field.removeAttribute(
            "aria-invalid"
        );


        const error =
            field.parentElement
                ?.querySelector(
                    ".ui-field-error-message"
                );


        if (error) {

            error.remove();
        }
    }


    /* ========================================================
       CLEAR ALL ERRORS
       ======================================================== */

    function clearErrors() {

        document
            .querySelectorAll(
                ".ui-field-error"
            )
            .forEach(
                field =>
                    clearFieldError(
                        field
                    )
            );


        document
            .querySelectorAll(
                ".ui-field-error-message"
            )
            .forEach(
                error =>
                    error.remove()
            );
    }


    /* ========================================================
       CUSTOMER VALIDATION
       ======================================================== */

    function validateCustomer() {

        clearErrors();


        const customer =
            collectCustomerData();


        let valid = true;


        const emailField =
            getField([
                "email",
                "customerEmail"
            ]);


        const phoneField =
            getField([
                "phone",
                "telephone",
                "mobile"
            ]);


        if (
            !customer.email
        ) {

            showFieldError(
                emailField,
                "Email address is required."
            );

            valid = false;

        } else if (
            !validEmail(
                customer.email
            )
        ) {

            showFieldError(
                emailField,
                "Enter a valid email address."
            );

            valid = false;
        }


        if (
            !customer.phone
        ) {

            showFieldError(
                phoneField,
                "Phone number is required."
            );

            valid = false;

        } else if (
            !validPhone(
                customer.phone
            )
        ) {

            showFieldError(
                phoneField,
                "Enter a valid phone number."
            );

            valid = false;
        }


        const firstName =
            getField([
                "firstName",
                "first_name"
            ]);


        const lastName =
            getField([
                "lastName",
                "last_name"
            ]);


        if (
            firstName &&
            !value(firstName)
        ) {

            showFieldError(
                firstName,
                "First name is required."
            );

            valid = false;
        }


        if (
            lastName &&
            !value(lastName)
        ) {

            showFieldError(
                lastName,
                "Last name is required."
            );

            valid = false;
        }


        return valid;
    }


    /* ========================================================
       DELIVERY VALIDATION
       ======================================================== */

    function validateDelivery() {

        const delivery =
            collectDeliveryData();


        let valid = true;


        const requiredFields = [

            [
                "address",
                "deliveryAddress",
                "streetAddress"
            ],

            [
                "city",
                "deliveryCity"
            ],

            [
                "province",
                "deliveryProvince"
            ],

            [
                "postalCode",
                "postcode",
                "zip"
            ]
        ];


        requiredFields.forEach(
            names => {

                const field =
                    getField(names);


                if (
                    field &&
                    !value(field)
                ) {

                    showFieldError(
                        field,
                        "This field is required."
                    );

                    valid = false;
                }
            }
        );


        return valid;
    }


    /* ========================================================
       PAYMENT VALIDATION
       ======================================================== */

    function validatePayment() {

        const payment =
            collectPaymentData();


        const methodField =
            getField([
                "paymentMethod",
                "payment_method"
            ]);


        if (
            methodField &&
            !payment.method
        ) {

            showFieldError(
                methodField,
                "Please select a payment method."
            );

            return false;
        }


        return true;
    }


    /* ========================================================
       STEP VALIDATION
       ======================================================== */

    function validateStep(
        step
    ) {

        switch (
            Number(step)
        ) {

            case 1:

                return validateCustomer();


            case 2:

                return validateDelivery();


            case 3:

                return validatePayment();


            default:

                return true;
        }
    }


    /* ========================================================
       SET CHECKOUT STEP
       ======================================================== */

    function setStep(
        step
    ) {

        const newStep =
            Math.max(
                1,
                Math.min(
                    3,
                    Number(step) || 1
                )
            );


        checkoutState.step =
            newStep;


        document
            .querySelectorAll(
                "[data-checkout-step]"
            )
            .forEach(
                element => {

                    const elementStep =
                        Number(
                            element.dataset
                                .checkoutStep
                        );


                    element.hidden =
                        elementStep !==
                        newStep;
                }
            );


        document
            .querySelectorAll(
                "[data-step-indicator]"
            )
            .forEach(
                indicator => {

                    const indicatorStep =
                        Number(
                            indicator.dataset
                                .stepIndicator
                        );


                    indicator.classList.toggle(
                        "active",
                        indicatorStep ===
                        newStep
                    );


                    indicator.classList.toggle(
                        "completed",
                        indicatorStep <
                        newStep
                    );
                }
            );


        NexpakOnlineUI.emit(
            "checkout:step-changed",
            {
                step: newStep
            }
        );
    }


    /* ========================================================
       NEXT STEP
       ======================================================== */

    function nextStep() {

        const current =
            checkoutState.step;


        if (
            !validateStep(current)
        ) {

            NexpakOnlineUI.emit(
                "checkout:validation-failed",
                {
                    step: current
                }
            );

            return false;
        }


        setStep(
            current + 1
        );


        return true;
    }


    /* ========================================================
       PREVIOUS STEP
       ======================================================== */

    function previousStep() {

        setStep(
            checkoutState.step - 1
        );
    }


    /* ========================================================
       SUBMIT CHECKOUT
       ======================================================== */

            async function submitCheckout() {

        if (
            checkoutState.submitting
        ) {

            return false;
        }


        /*
         * Validate all available
         * checkout sections.
         */

        const customerValid =
            validateCustomer();


        const deliveryValid =
            validateDelivery();


        const paymentValid =
            validatePayment();


        if (
            !customerValid ||
            !deliveryValid ||
            !paymentValid
        ) {

            NexpakOnlineUI.emit(
                "checkout:validation-failed",
                {
                    customer:
                        customerValid,

                    delivery:
                        deliveryValid,

                    payment:
                        paymentValid
                }
            );


            return false;
        }


        checkoutState.submitting =
            true;


        setSubmitting(true);


        const customer =
            collectCustomerData();


        const delivery =
            collectDeliveryData();


        const payment =
            collectPaymentData();


        const payload = {

            customer,

            delivery,

            payment
        };


        NexpakOnlineUI.emit(
            "checkout:submitting",
            {
                payload
            }
        );


        const engine =
            getCheckoutEngine();


        try {

            if (!engine) {

                throw new Error(
                    "Checkout engine is unavailable."
                );
            }


            let result;


            if (
                typeof engine.submit ===
                "function"
            ) {

                result =
                    await engine.submit(
                        payload
                    );

            } else if (
                typeof engine.processCheckout ===
                "function"
            ) {

                result =
                    await engine.processCheckout(
                        payload
                    );

            } else if (
                typeof engine.completeCheckout ===
                "function"
            ) {

                result =
                    await engine.completeCheckout(
                        payload
                    );

            } else {

                throw new Error(
                    "No compatible checkout method found."
                );
            }


            NexpakOnlineUI.emit(
                "checkout:success",
                {
                    result
                }
            );


            showCheckoutSuccess(
                result
            );


            return result;

        } catch (error) {

            console.error(
                "[NEXPAK UI] Checkout failed:",
                error
            );


            showCheckoutError(
                error?.message ||
                "Checkout could not be completed."
            );


            NexpakOnlineUI.emit(
                "checkout:error",
                {
                    error
                }
            );


            return false;

        } finally {

            checkoutState.submitting =
                false;

            setSubmitting(false);
        }
    }


    /* ========================================================
       SUBMITTING STATE
       ======================================================== */

    function setSubmitting(
        submitting
    ) {

        checkoutState.submitting =
            Boolean(submitting);


        document
            .querySelectorAll(
                "[data-checkout-submit]"
            )
            .forEach(
                button => {

                    button.disabled =
                        checkoutState.submitting;


                    button.classList.toggle(
                        "ui-submitting",
                        checkoutState.submitting
                    );


                    button.textContent =
                        checkoutState.submitting
                            ? "Processing..."
                            : (
                                button.dataset
                                    .defaultText ||
                                "Place Order"
                            );
                }
            );
    }


    /* ========================================================
       SUCCESS MESSAGE
       ======================================================== */

    function showCheckoutSuccess(
        result
    ) {

        const containers =
            document.querySelectorAll(
                "[data-checkout-success]"
            );


        containers.forEach(
            container => {

                container.hidden =
                    false;


                const orderNumber =
                    result?.orderNumber ??
                    result?.order?.orderNumber ??
                    "";


                const numberElement =
                    container.querySelector(
                        "[data-order-number]"
                    );


                if (
                    numberElement
                ) {

                    numberElement.textContent =
                        orderNumber;
                }
            }
        );


        document
            .querySelectorAll(
                "[data-checkout-form]"
            )
            .forEach(
                form => {

                    form.hidden =
                        true;
                }
            );
    }


    /* ========================================================
       ERROR MESSAGE
       ======================================================== */

    function showCheckoutError(
        message
    ) {

        document
            .querySelectorAll(
                "[data-checkout-error]"
            )
            .forEach(
                container => {

                    container.hidden =
                        false;


                    const messageElement =
                        container.querySelector(
                            "[data-error-message]"
                        );


                    if (
                        messageElement
                    ) {

                        messageElement.textContent =
                            message;
                    }
                }
            );


        NexpakOnlineUI.emit(
            "ui:error",
            {
                message
            }
        );
    }


    /* ========================================================
       DELIVERY OPTION UI
       ======================================================== */

    function selectDeliveryMethod(
        method
    ) {

        const delivery =
            getDeliveryEngine();


        /*
         * Pass the selection to the
         * locked delivery engine where
         * supported.
         */

        if (delivery) {

            if (
                typeof delivery
                    .selectMethod ===
                "function"
            ) {

                delivery.selectMethod(
                    method
                );

            } else if (
                typeof delivery
                    .setMethod ===
                "function"
            ) {

                delivery.setMethod(
                    method
                );
            }
        }


        document
            .querySelectorAll(
                "[data-delivery-method]"
            )
            .forEach(
                option => {

                    option.classList.toggle(
                        "selected",
                        option.dataset
                            .deliveryMethod ===
                        method
                    );
                }
            );


        checkoutState.delivery.method =
            method;


        NexpakOnlineUI.emit(
            "delivery:method-selected",
            {
                method
            }
        );
    }


    /* ========================================================
       CHECKOUT EVENT BINDING
       ======================================================== */

    function bindEvents() {

        document.addEventListener(
            "click",
            event => {

                const next =
                    event.target.closest(
                        "[data-checkout-next]"
                    );


                if (next) {

                    event.preventDefault();

                    nextStep();

                    return;
                }


                const previous =
                    event.target.closest(
                        "[data-checkout-back]"
                    );


                if (previous) {

                    event.preventDefault();

                    previousStep();

                    return;
                }


                const submit =
                    event.target.closest(
                        "[data-checkout-submit]"
                    );


                if (submit) {

                    event.preventDefault();

                    submitCheckout();

                    return;
                }


                const deliveryOption =
                    event.target.closest(
                        "[data-delivery-method]"
                    );


                if (deliveryOption) {

                    event.preventDefault();

                    selectDeliveryMethod(
                        deliveryOption.dataset
                            .deliveryMethod
                    );
                }
            }
        );


        document.addEventListener(
            "input",
            event => {

                const field =
                    event.target.closest(
                        "input, select, textarea"
                    );


                if (!field) {
                    return;
                }


                clearFieldError(
                    field
                );
            }
        );


        document.addEventListener(
            "change",
            event => {

                const field =
                    event.target.closest(
                        "input, select, textarea"
                    );


                if (!field) {
                    return;
                }


                clearFieldError(
                    field
                );
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        if (
            checkoutState.initialized
        ) {

            return;
        }


        bindEvents();

        setStep(1);

        checkoutState.initialized =
            true;


        NexpakOnlineUI.emit(
            "checkout-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        setStep,
        nextStep,
        previousStep,

        collectCustomerData,
        collectDeliveryData,
        collectPaymentData,

        validateCustomer,
        validateDelivery,
        validatePayment,
        validateStep,

        submitCheckout,

        selectDeliveryMethod,

        showCheckoutSuccess,
        showCheckoutError,

        setSubmitting,

        getState() {

            return {
                ...checkoutState,

                customer: {
                    ...checkoutState.customer
                },

                delivery: {
                    ...checkoutState.delivery
                },

                payment: {
                    ...checkoutState.payment
                }
            };
        }
    };

})();


/* ============================================================
   INITIALIZE CHECKOUT UI
   ============================================================ */

NexpakOnlineUI.CheckoutUI.init();


/* ============================================================
   END — PART 5/8
   ============================================================ */

/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 6/8
   MODALS + CONFIGURATOR + TOASTS + OVERLAYS
   ============================================================ */


/* ============================================================
   MODAL + OVERLAY UI ENGINE
   ============================================================ */

NexpakOnlineUI.OverlayUI = (() => {

    const state = {

        activeModal: null,

        modalProduct: null,

        configuratorOpen: false,

        initialized: false
    };


    /* ========================================================
       ESCAPE HTML
       ======================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* ========================================================
       PRODUCT MODAL
       ======================================================== */

    function openProductModal(
        productId
    ) {

        const product =
            NexpakOnlineUI.ProductUI
                ?.findProduct(
                    productId
                );


        if (!product) {

            showToast(
                "Product information is unavailable.",
                "error"
            );

            return false;
        }


        state.modalProduct =
            product;


        state.activeModal =
            "product";


        const modal =
            document.querySelector(
                "#productModal, [data-product-modal]"
            );


        if (!modal) {

            /*
             * If the HTML does not already
             * contain a modal, create one.
             */

            createProductModal();

        }


        renderProductModal(
            product
        );


        const productModal =
            document.querySelector(
                "#productModal, [data-product-modal]"
            );


        showOverlay(
            productModal
        );


        state.activeModal =
            "product";


        NexpakOnlineUI.emit(
            "modal:product-opened",
            {
                product
            }
        );


        return true;
    }


    /* ========================================================
       CREATE PRODUCT MODAL
       ======================================================== */

    function createProductModal() {

        if (
            document.querySelector(
                "#productModal"
            )
        ) {

            return;
        }


        const modal =
            document.createElement(
                "div"
            );


        modal.id =
            "productModal";


        modal.className =
            "online-modal product-modal";


        modal.setAttribute(
            "role",
            "dialog"
        );


        modal.setAttribute(
            "aria-modal",
            "true"
        );


        modal.hidden =
            true;


        modal.innerHTML = `

            <div
                class="online-modal-backdrop"
                data-modal-close
            ></div>


            <div
                class="online-modal-dialog"
                role="document"
            >

                <button
                    type="button"
                    class="online-modal-close"
                    data-modal-close
                    aria-label="Close product details"
                >
                    ×
                </button>


                <div
                    class="product-modal-content"
                    data-product-modal-content
                ></div>

            </div>

        `;


        document.body.appendChild(
            modal
        );
    }


    /* ========================================================
       RENDER PRODUCT MODAL
       ======================================================== */

    function renderProductModal(
        product
    ) {

        const modal =
            document.querySelector(
                "#productModal, [data-product-modal]"
            );


        if (!modal) {
            return;
        }


        const content =
            modal.querySelector(
                "[data-product-modal-content]"
            ) ||
            modal.querySelector(
                ".product-modal-content"
            );


        if (!content) {
            return;
        }


        const price =
            NexpakOnlineUI.ProductUI
                .formatPrice(
                    product.price
                );


        const stock =
            NexpakOnlineUI.ProductUI
                .getStockStatus(
                    product
                );


        content.innerHTML = `

            <div class="product-modal-grid">

                <div class="product-modal-image">

                    <img
                        src="${escapeHTML(
                            product.image ||
                            "images/product-placeholder.jpg"
                        )}"
                        alt="${escapeHTML(
                            product.name
                        )}"
                        onerror="this.src='images/product-placeholder.jpg'"
                    >

                </div>


                <div class="product-modal-details">

                    ${
                        product.brand
                            ? `
                                <span
                                    class="product-modal-brand"
                                >
                                    ${escapeHTML(
                                        product.brand
                                    )}
                                </span>
                              `
                            : ""
                    }


                    <h2>
                        ${escapeHTML(
                            product.name
                        )}
                    </h2>


                    <p class="product-modal-description">
                        ${escapeHTML(
                            product.description
                        )}
                    </p>


                    <div class="product-modal-price">
                        ${escapeHTML(price)}
                    </div>


                    <div
                        class="product-modal-stock ${escapeHTML(
                            stock.className
                        )}"
                    >
                        ${escapeHTML(
                            stock.label
                        )}
                    </div>


                    ${
                        product.sku
                            ? `
                                <div class="product-modal-sku">
                                    SKU:
                                    ${escapeHTML(
                                        product.sku
                                    )}
                                </div>
                              `
                            : ""
                    }


                    <div class="product-modal-actions">

                        <button
                            type="button"
                            class="product-modal-cart-btn"
                            data-modal-product-action="add-to-cart"
                            data-product-id="${escapeHTML(
                                product.id
                            )}"
                            ${
                                stock.available
                                    ? ""
                                    : "disabled"
                            }
                        >
                            ${
                                stock.available
                                    ? "Add to Cart"
                                    : "Out of Stock"
                            }
                        </button>


                        <button
                            type="button"
                            class="product-modal-configure-btn"
                            data-modal-product-action="configure"
                            data-product-id="${escapeHTML(
                                product.id
                            )}"
                        >
                            Configure
                        </button>

                    </div>

                </div>

            </div>

        `;
    }


    /* ========================================================
       CLOSE MODAL
       ======================================================== */

    function closeModal() {

        const modal =
            document.querySelector(
                "#productModal, [data-product-modal]"
            );


        if (modal) {

            hideOverlay(
                modal
            );
        }


        state.activeModal =
            null;


        state.modalProduct =
            null;


        NexpakOnlineUI.emit(
            "modal:closed"
        );
    }


    /* ========================================================
       GENERIC OVERLAY SHOW
       ======================================================== */

    function showOverlay(
        element
    ) {

        if (!element) {
            return;
        }


        element.hidden =
            false;


        element.classList.add(
            "ui-open"
        );


        document.body.classList.add(
            "ui-overlay-open"
        );


        /*
         * Prevent background scrolling.
         */

        document.body.style
            .overflow = "hidden";
    }


    /* ========================================================
       GENERIC OVERLAY HIDE
       ======================================================== */

    function hideOverlay(
        element
    ) {

        if (!element) {
            return;
        }


        element.classList.remove(
            "ui-open"
        );


        element.hidden =
            true;


        /*
         * Only restore scrolling when
         * there are no open overlays.
         */

        const openOverlay =
            document.querySelector(
                ".ui-open"
            );


        if (!openOverlay) {

            document.body.classList
                .remove(
                    "ui-overlay-open"
                );

            document.body.style
                .overflow = "";
        }
    }


    /* ========================================================
       CONFIGURATOR ENGINE LOOKUP
       ======================================================== */

    function getConfiguratorEngine() {

        if (
            typeof window !== "undefined" &&
            window.NexpakOnlineConfigurator
        ) {

            return window.NexpakOnlineConfigurator;
        }


        if (
            typeof window !== "undefined" &&
            window.onlineConfigurator
        ) {

            return window.onlineConfigurator;
        }


        if (
            typeof window !== "undefined" &&
            window.Configurator
        ) {

            return window.Configurator;
        }


        return null;
    }


    /* ========================================================
       OPEN CONFIGURATOR
       ======================================================== */

    function openConfigurator(
        productId
    ) {

        const product =
            NexpakOnlineUI.ProductUI
                ?.findProduct(
                    productId
                );


        const engine =
            getConfiguratorEngine();


        state.configuratorOpen =
            true;


        /*
         * Give the locked configurator
         * the selected product where
         * supported.
         */

        if (engine) {

            if (
                typeof engine.open ===
                "function"
            ) {

                engine.open(
                    product
                );

            } else if (
                typeof engine.start ===
                "function"
            ) {

                engine.start(
                    product
                );

            } else if (
                typeof engine.configure ===
                "function"
            ) {

                engine.configure(
                    product
                );
            }
        }


        const configurator =
            document.querySelector(
                "#configuratorModal, [data-configurator-modal]"
            );


        if (configurator) {

            showOverlay(
                configurator
            );
        }


        closeModal();


        NexpakOnlineUI.emit(
            "configurator:opened",
            {
                product
            }
        );


        return true;
    }


    /* ========================================================
       CLOSE CONFIGURATOR
       ======================================================== */

    function closeConfigurator() {

        const engine =
            getConfiguratorEngine();


        if (engine) {

            if (
                typeof engine.close ===
                "function"
            ) {

                engine.close();
            }
        }


        const configurator =
            document.querySelector(
                "#configuratorModal, [data-configurator-modal]"
            );


        if (configurator) {

            hideOverlay(
                configurator
            );
        }


        state.configuratorOpen =
            false;


        NexpakOnlineUI.emit(
            "configurator:closed"
        );
    }


    /* ========================================================
       TOAST CONTAINER
       ======================================================== */

    function getToastContainer() {

        let container =
            document.querySelector(
                "#toastContainer"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );


            container.id =
                "toastContainer";


            container.className =
                "online-toast-container";


            container.setAttribute(
                "aria-live",
                "polite"
            );


            document.body.appendChild(
                container
            );
        }


        return container;
    }


    /* ========================================================
       SHOW TOAST
       ======================================================== */

    function showToast(
        message,
        type = "info",
        duration = 3500
    ) {

        const container =
            getToastContainer();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            `online-toast toast-${type}`;


        toast.setAttribute(
            "role",
            type === "error"
                ? "alert"
                : "status"
        );


        toast.innerHTML = `

            <span
                class="toast-message"
            >
                ${escapeHTML(message)}
            </span>

            <button
                type="button"
                class="toast-close"
                aria-label="Close notification"
            >
                ×
            </button>

        `;


        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.classList.add(
                    "ui-visible"
                );
            }
        );


        const close =
            () => {

                toast.classList.remove(
                    "ui-visible"
                );


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    250
                );
            };


        toast
            .querySelector(
                ".toast-close"
            )
            ?.addEventListener(
                "click",
                close
            );


        if (
            duration > 0
        ) {

            setTimeout(
                close,
                duration
            );
        }


        return toast;
    }


    /* ========================================================
       CART SUCCESS TOAST
       ======================================================== */

    function showCartSuccess(
        product
    ) {

        const name =
            product?.name ||
            "Product";


        showToast(
            `${name} added to your cart.`,
            "success"
        );
    }


    /* ========================================================
       MODAL EVENTS
       ======================================================== */

function bindEvents() {

        document.addEventListener(
            "click",
            event => {

                const closeButton =
                    event.target.closest(
                        "[data-modal-close]"
                    );


                if (closeButton) {

                    closeModal();

                    return;
                }


                const viewButton =
                    event.target.closest(
                        '[data-ui-action="view-product"]'
                    );


                if (viewButton) {

                    openProductModal(
                        viewButton.dataset
                            .productId
                    );

                    return;
                }


                const modalAction =
                    event.target.closest(
                        "[data-modal-product-action]"
                    );


                if (!modalAction) {
                    return;
                }


                const action =
                    modalAction.dataset
                        .modalProductAction;


                const productId =
                    modalAction.dataset
                        .productId;


                switch (action) {

                    case "add-to-cart":

                        NexpakOnlineUI.emit(
                            "cart:add",
                            {
                                product:
                                    NexpakOnlineUI
                                        .ProductUI
                                        .findProduct(
                                            productId
                                        )
                            }
                        );

                        closeModal();

                        break;


                    case "configure":

                        openConfigurator(
                            productId
                        );

                        break;


                    default:

                        break;
                }
            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Escape"
                ) {

                    return;
                }


                if (
                    state.configuratorOpen
                ) {

                    closeConfigurator();

                    return;
                }


                if (
                    state.activeModal
                ) {

                    closeModal();
                }
            }
        );


        /*
         * React to cart events.
         */

        document.addEventListener(
            "cart:add",
            event => {

                if (
                    event.detail?.product
                ) {

                    showCartSuccess(
                        event.detail.product
                    );
                }
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return;
        }


        bindEvents();


        state.initialized =
            true;


        NexpakOnlineUI.emit(
            "overlay-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        openProductModal,
        closeModal,

        openConfigurator,
        closeConfigurator,

        showOverlay,
        hideOverlay,

        showToast,
        showCartSuccess,

        renderProductModal,

        getState() {

            return {
                ...state
            };
        }
    };

})();


/* ============================================================
   INITIALIZE OVERLAY UI
   ============================================================ */

NexpakOnlineUI.OverlayUI.init();


/* ============================================================
   END — PART 6/8
   ============================================================ */

 /* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 7/8
   RESPONSIVE + ACCESSIBILITY + GLOBAL UI
   ============================================================ */


/* ============================================================
   GLOBAL UI ENGINE
   ============================================================ */

NexpakOnlineUI.GlobalUI = (() => {

    const state = {

        view: "grid",

        mobileMenuOpen: false,

        cartPanelOpen: false,

        initialized: false
    };


    /* ========================================================
       SAFE DOM HELPERS
       ======================================================== */

    function get(
        selector
    ) {

        return document.querySelector(
            selector
        );
    }


    function getAll(
        selector
    ) {

        return Array.from(
            document.querySelectorAll(
                selector
            )
        );
    }


    /* ========================================================
       VIEW SWITCHING
       ======================================================== */

    function setView(
        view
    ) {

        const requested =
            String(
                view || "grid"
            ).toLowerCase();


        const newView =
            [
                "grid",
                "list"
            ].includes(requested)
                ? requested
                : "grid";


        state.view =
            newView;


        const productContainer =
            get(
                CONFIG.selectors.products
            );


        if (productContainer) {

            productContainer.dataset.view =
                newView;


            productContainer.classList.toggle(
                "view-grid",
                newView === "grid"
            );


            productContainer.classList.toggle(
                "view-list",
                newView === "list"
            );
        }


        getAll(
            "[data-view]"
        ).forEach(
            button => {

                const buttonView =
                    button.dataset.view;


                button.classList.toggle(
                    "active",
                    buttonView === newView
                );


                button.setAttribute(
                    "aria-pressed",
                    String(
                        buttonView === newView
                    )
                );
            }
        );


        try {

            localStorage.setItem(
                "nexpak-online-view",
                newView
            );

        } catch (
            error
        ) {

            /*
             * Storage may be unavailable
             * in private/restricted browsers.
             */
        }


        NexpakOnlineUI.emit(
            "view:changed",
            {
                view: newView
            }
        );
    }


    /* ========================================================
       LOAD SAVED VIEW
       ======================================================== */

    function loadSavedView() {

        let saved =
            "grid";


        try {

            saved =
                localStorage.getItem(
                    "nexpak-online-view"
                ) || "grid";

        } catch (
            error
        ) {

            saved = "grid";
        }


        setView(
            saved
        );
    }


    /* ========================================================
       MOBILE MENU
       ======================================================== */

    function openMobileMenu() {

        state.mobileMenuOpen =
            true;


        document.body.classList.add(
            "mobile-menu-open"
        );


        getAll(
            "[data-mobile-menu]"
        ).forEach(
            menu => {

                menu.classList.add(
                    "ui-open"
                );

                menu.hidden =
                    false;
            }
        );


        getAll(
            "[data-mobile-menu-toggle]"
        ).forEach(
            button => {

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        );


        NexpakOnlineUI.emit(
            "mobile-menu:opened"
        );
    }


    function closeMobileMenu() {

        state.mobileMenuOpen =
            false;


        document.body.classList.remove(
            "mobile-menu-open"
        );


        getAll(
            "[data-mobile-menu]"
        ).forEach(
            menu => {

                menu.classList.remove(
                    "ui-open"
                );
            }
        );


        getAll(
            "[data-mobile-menu-toggle]"
        ).forEach(
            button => {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        );


        NexpakOnlineUI.emit(
            "mobile-menu:closed"
        );
    }


    function toggleMobileMenu() {

        if (
            state.mobileMenuOpen
        ) {

            closeMobileMenu();

        } else {

            openMobileMenu();
        }
    }


    /* ========================================================
       CART PANEL
       ======================================================== */

    function openCartPanel() {

        const panel =
            get(
                "#cartPanel, [data-cart-panel]"
            );


        if (!panel) {

            /*
             * Fall back to cart page/
             * cart section when no panel
             * exists.
             */

            NexpakOnlineUI.emit(
                "cart:open-requested"
            );

            return;
        }


        state.cartPanelOpen =
            true;


        panel.hidden =
            false;


        panel.classList.add(
            "ui-open"
        );


        document.body.classList.add(
            "cart-panel-open"
        );


        getAll(
            "[data-cart-toggle]"
        ).forEach(
            button => {

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        );


        NexpakOnlineUI.CartUI?.refresh();


        NexpakOnlineUI.emit(
            "cart-panel:opened"
        );
    }


    function closeCartPanel() {

        const panel =
            get(
                "#cartPanel, [data-cart-panel]"
            );


        if (panel) {

            panel.classList.remove(
                "ui-open"
            );


            panel.hidden =
                true;
        }


        state.cartPanelOpen =
            false;


        document.body.classList.remove(
            "cart-panel-open"
        );


        getAll(
            "[data-cart-toggle]"
        ).forEach(
            button => {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        );


        NexpakOnlineUI.emit(
            "cart-panel:closed"
        );
    }


    function toggleCartPanel() {

        if (
            state.cartPanelOpen
        ) {

            closeCartPanel();

        } else {

            openCartPanel();
        }
    }


    /* ========================================================
       SCROLL TO STORE
       ======================================================== */

    function scrollToStore() {

        const store =
            get(
                CONFIG.selectors.store
            );


        if (!store) {
            return;
        }


        store.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        NexpakOnlineUI.emit(
            "store:scrolled"
        );
    }


    /* ========================================================
       SCROLL TO CART
       ======================================================== */

    function scrollToCart() {

        const cart =
            get(
                CONFIG.selectors.cart
            );


        if (!cart) {

            openCartPanel();

            return;
        }


        cart.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        NexpakOnlineUI.emit(
            "cart:scrolled"
        );
    }


    /* ========================================================
       BACK TO TOP
       ======================================================== */

    function backToTop() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* ========================================================
       BACK-TO-TOP VISIBILITY
       ======================================================== */

    function updateBackToTop() {

        const buttons =
            getAll(
                "[data-back-to-top]"
            );


        const visible =
            window.scrollY >
            500;


        buttons.forEach(
            button => {

                button.classList.toggle(
                    "ui-visible",
                    visible
                );


                button.setAttribute(
                    "aria-hidden",
                    String(!visible)
                );
            }
        );
    }


    /* ========================================================
       STICKY STORE BAR
       ======================================================== */

    function updateStickyElements() {

        const sticky =
            getAll(
                "[data-sticky-store]"
            );


        const shouldStick =
            window.scrollY >
            120;


        sticky.forEach(
            element => {

                element.classList.toggle(
                    "is-sticky",
                    shouldStick
                );
            }
        );
    }


    /* ========================================================
       FOCUS MANAGEMENT
       ======================================================== */

    function focusElement(
        selector
    ) {

        const element =
            typeof selector === "string"
                ? get(selector)
                : selector;


        if (!element) {
            return false;
        }


        try {

            element.focus({
                preventScroll: true
            });

        } catch (
            error
        ) {

            element.focus();
        }


        return true;
    }


    /* ========================================================
       FOCUS SEARCH
       ======================================================== */

    function focusSearch() {

        const search =
            get(
                CONFIG.selectors.search
            );


        if (search) {

            focusElement(
                search
            );

            return true;
        }


        return false;
    }


    /* ========================================================
       KEYBOARD SHORTCUTS
       ======================================================== */

    function handleKeyboard(
        event
    ) {

        /*
         * Ignore shortcuts while the
         * user is typing in a field.
         */

        const target =
            event.target;


        const typing =
            target &&
            (
                target.matches(
                    "input, textarea, select"
                ) ||
                target.isContentEditable
            );


        /*
         * "/" focuses search.
         */

        if (
            event.key === "/" &&
            !typing
        ) {

            event.preventDefault();

            focusSearch();

            return;
        }


        /*
         * Escape closes global UI.
         */

        if (
            event.key === "Escape"
        ) {

            if (
                state.mobileMenuOpen
            ) {

                closeMobileMenu();

                return;
            }


            if (
                state.cartPanelOpen
            ) {

                closeCartPanel();

                return;
            }
        }
    }


    /* ========================================================
       ARIA INITIALIZATION
       ======================================================== */

    function initializeAccessibility() {

        /*
         * Mobile menu buttons.
         */

        getAll(
            "[data-mobile-menu-toggle]"
        ).forEach(
            button => {

                if (
                    !button.hasAttribute(
                        "aria-expanded"
                    )
                ) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                button.setAttribute(
                    "aria-controls",
                    button.dataset
                        .menuTarget ||
                    "mobileMenu"
                );
            }
        );


        /*
         * Cart buttons.
         */

        getAll(
            "[data-cart-toggle]"
        ).forEach(
            button => {

                if (
                    !button.hasAttribute(
                        "aria-expanded"
                    )
                ) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );


        /*
         * View controls.
         */

        getAll(
            "[data-view]"
        ).forEach(
            button => {

                button.setAttribute(
                    "aria-pressed",
                    String(
                        button.dataset.view ===
                        state.view
                    )
                );
            }
        );
    }


    /* ========================================================
       GLOBAL CLICK EVENTS
       ======================================================== */

    function bindClickEvents() {

        document.addEventListener(
            "click",
            event => {

                /*
                 * VIEW SWITCH.
                 */

                const viewButton =
                    event.target.closest(
                        "[data-view]"
                    );


                if (
                    viewButton &&
                    [
                        "grid",
                        "list"
                    ].includes(
                        viewButton.dataset.view
                    )
                ) {

                    setView(
                        viewButton.dataset.view
                    );

                    return;
                }


                /*
                 * MOBILE MENU.
                 */

                const menuToggle =
                    event.target.closest(
                        "[data-mobile-menu-toggle]"
                    );


                if (menuToggle) {

                    toggleMobileMenu();

                    return;
                }


                const menuClose =
                    event.target.closest(
                        "[data-mobile-menu-close]"
                    );


                if (menuClose) {

                    closeMobileMenu();

                    return;
                }


                /*
                 * CART PANEL.
                 */

                const cartToggle =
                    event.target.closest(
                        "[data-cart-toggle]"
                    );


                if (cartToggle) {

                    toggleCartPanel();

                    return;
                }


                const cartClose =
                    event.target.closest(
                        "[data-cart-close]"
                    );


                if (cartClose) {

                    closeCartPanel();

                    return;
                }


                /*
                 * CONTINUE SHOPPING.
                 */

                const continueShopping =
                    event.target.closest(
                        '[data-ui-action="continue-shopping"]'
                    );


                if (continueShopping) {

                    closeCartPanel();

                    scrollToStore();

                    return;
                }


                /*
                 * BACK TO TOP.
                 */

                const topButton =
                    event.target.closest(
                        "[data-back-to-top]"
                    );


                if (topButton) {

                    backToTop();

                    return;
                }
            }
        );
    }


    /* ========================================================
       GLOBAL SCROLL EVENTS
       ======================================================== */

    function bindScrollEvents() {

        let ticking =
            false;


        window.addEventListener(
            "scroll",
            () => {

                if (
                    ticking
                ) {
                    return;
                }


                window.requestAnimationFrame(
                    () => {

                        updateBackToTop();

                        updateStickyElements();

                        ticking =
                            false;
                    }
                );


                ticking =
                    true;
            },
            {
                passive: true
            }
        );
    }


    /* ========================================================
       GLOBAL UI SYNCHRONIZATION
       ======================================================== */

    function bindSynchronization() {

        /*
         * Product rendering.
         */

        document.addEventListener(
            "products:rendered",
            () => {

                updateBackToTop();

                updateStickyElements();
            }
        );


        /*
         * Cart changes.
         */

        document.addEventListener(
            "cart:updated",
            event => {

                const count =
                    event.detail?.itemCount ??
                    0;


                NexpakOnlineUI.CartUI
                    ?.updateCartBadge(
                        count
                    );
            }
        );


        /*
         * Checkout success.
         */

        document.addEventListener(
            "checkout:success",
            () => {

                closeCartPanel();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );


        /*
         * Product added.
         */

        document.addEventListener(
            "cart:add",
            () => {

                NexpakOnlineUI.CartUI
                    ?.refresh();
            }
        );
    }


    /* ========================================================
       RESIZE HANDLING
       ======================================================== */

    function bindResizeEvents() {

        window.addEventListener(
            "resize",
            () => {

                /*
                 * Close mobile menu when
                 * returning to desktop.
                 */

                if (
                    window.innerWidth >=
                    768 &&
                    state.mobileMenuOpen
                ) {

                    closeMobileMenu();
                }
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return;
        }


        loadSavedView();

        initializeAccessibility();

        bindClickEvents();

        bindScrollEvents();

        bindResizeEvents();

        bindSynchronization();

        updateBackToTop();

        updateStickyElements();


        state.initialized =
            true;


        NexpakOnlineUI.emit(
            "global-ui:ready"
        );
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        setView,
        loadSavedView,

        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,

        openCartPanel,
        closeCartPanel,
        toggleCartPanel,

        scrollToStore,
        scrollToCart,
        backToTop,

        focusSearch,

        updateBackToTop,
        updateStickyElements,

        getState() {

            return {
                ...state
            };
        }
    };

})();


/* ============================================================
   INITIALIZE GLOBAL UI
   ============================================================ */

NexpakOnlineUI.GlobalUI.init();


/* ============================================================
   END — PART 7/8
   ============================================================ */

/* ============================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — UI ENGINE
   File: onlineui.js
   Part: 8/8
   FINALIZATION + HEALTH + DIAGNOSTICS
   ============================================================ */


/* ============================================================
   FINAL UI ENGINE
   ============================================================ */

NexpakOnlineUI.FinalUI = (() => {

    const state = {

        initialized: false,

        healthy: false,

        errors: [],

        warnings: [],

        startedAt: null,

        lastHealthCheck: null,

        version: "V1.0"
    };


    /* ========================================================
       LOG ERROR
       ======================================================== */

    function recordError(
        message,
        error = null
    ) {

        const entry = {

            message: String(message),

            error: error
                ? String(
                    error.message ||
                    error
                  )
                : null,

            timestamp:
                new Date().toISOString()
        };


        state.errors.push(
            entry
        );


        /*
         * Keep diagnostic memory
         * under control.
         */

        if (
            state.errors.length > 50
        ) {

            state.errors.shift();
        }


        console.error(
            "[NEXPAK UI]",
            message,
            error || ""
        );


        NexpakOnlineUI.emit(
            "ui:error",
            {
                ...entry
            }
        );
    }


    /* ========================================================
       RECORD WARNING
       ======================================================== */

    function recordWarning(
        message
    ) {

        const entry = {

            message:
                String(message),

            timestamp:
                new Date().toISOString()
        };


        state.warnings.push(
            entry
        );


        if (
            state.warnings.length > 50
        ) {

            state.warnings.shift();
        }


        console.warn(
            "[NEXPAK UI]",
            message
        );
    }


    /* ========================================================
       ENGINE CHECK
       ======================================================== */

    function checkEngine(
        name,
        engine
    ) {

        if (!engine) {

            recordWarning(
                `${name} is not available.`
            );

            return false;
        }


        return true;
    }


    /* ========================================================
       HEALTH CHECK
       ======================================================== */

    function healthCheck() {

        const checks = {

            ui:
                typeof NexpakOnlineUI !==
                "undefined",

            productUI:
                checkEngine(
                    "Product UI",
                    NexpakOnlineUI.ProductUI
                ),

            filterUI:
                checkEngine(
                    "Filter UI",
                    NexpakOnlineUI.FilterUI
                ),

            cartUI:
                checkEngine(
                    "Cart UI",
                    NexpakOnlineUI.CartUI
                ),

            checkoutUI:
                checkEngine(
                    "Checkout UI",
                    NexpakOnlineUI.CheckoutUI
                ),

            overlayUI:
                checkEngine(
                    "Overlay UI",
                    NexpakOnlineUI.OverlayUI
                ),

            globalUI:
                checkEngine(
                    "Global UI",
                    NexpakOnlineUI.GlobalUI
                ),

            onlineStore:
                checkEngine(
                    "Online Store Engine",
                    window.onlineStore ||
                    window.NexpakOnlineStore
                ),

            onlineCart:
                checkEngine(
                    "Online Cart Engine",
                    window.onlineCart ||
                    window.NexpakOnlineCart
                ),

            onlineCheckout:
                checkEngine(
                    "Online Checkout Engine",
                    window.onlineCheckout ||
                    window.NexpakOnlineCheckout
                ),

            onlineDelivery:
                checkEngine(
                    "Online Delivery Engine",
                    window.onlineDelivery ||
                    window.NexpakOnlineDelivery
                ),

            onlineConfigurator:
                checkEngine(
                    "Online Configurator Engine",
                    window.onlineConfigurator ||
                    window.NexpakOnlineConfigurator
                ),

            onlineIntegration:
                checkEngine(
                    "Online Integration Engine",
                    window.onlineIntegration ||
                    window.NexpakOnlineIntegration
                )
        };


        /*
         * Core UI modules must exist.
         *
         * External engines are allowed to be
         * unavailable because script load order
         * may differ.
         */

        const coreHealthy =
            checks.ui &&
            checks.productUI &&
            checks.filterUI &&
            checks.cartUI &&
            checks.checkoutUI &&
            checks.overlayUI &&
            checks.globalUI;


        state.healthy =
            Boolean(coreHealthy);


        state.lastHealthCheck =
            new Date().toISOString();


        const result = {

            healthy:
                state.healthy,

            checks,

            timestamp:
                state.lastHealthCheck
        };


        NexpakOnlineUI.emit(
            "ui:health-check",
            result
        );


        return result;
    }


    /* ========================================================
       GLOBAL ERROR PROTECTION
       ======================================================== */

    function bindErrorProtection() {

        window.addEventListener(
            "error",
            event => {

                /*
                 * Ignore errors without
                 * useful information.
                 */

                if (
                    !event.message
                ) {
                    return;
                }


                recordError(
                    event.message,
                    event.error
                );
            }
        );


        window.addEventListener(
            "unhandledrejection",
            event => {

                const reason =
                    event.reason;


                recordError(
                    "Unhandled promise rejection.",
                    reason
                );
            }
        );
    }


    /* ========================================================
       EVENT BRIDGE
       ======================================================== */

    function bindEventBridge() {

        /*
         * Product viewed.
         */

        document.addEventListener(
            "product:view",
            event => {

                const product =
                    event.detail?.product;


                if (
                    product &&
                    NexpakOnlineUI
                        .OverlayUI
                ) {

                    NexpakOnlineUI
                        .OverlayUI
                        .openProductModal(
                            product.id
                        );
                }
            }
        );


        /*
         * Cart add request.
         */

        document.addEventListener(
            "cart:add",
            event => {

                const product =
                    event.detail?.product;


                if (!product) {
                    return;
                }


                const cart =
                    window.NexpakOnlineCart ||
                    window.onlineCart ||
                    window.Cart;


                if (!cart) {

                    recordWarning(
                        "Cart add requested but cart engine is unavailable."
                    );

                    return;
                }


                try {

                    if (
                        typeof cart.addItem ===
                        "function"
                    ) {

                        cart.addItem(
                            product
                        );

                    } else if (
                        typeof cart.addToCart ===
                        "function"
                    ) {

                        cart.addToCart(
                            product
                        );

                    } else {

                        recordWarning(
                            "No compatible cart add method found."
                        );

                        return;
                    }


                    NexpakOnlineUI.CartUI
                        ?.refresh();


                    NexpakOnlineUI.OverlayUI
                        ?.showCartSuccess(
                            product
                        );

                } catch (
                    error
                ) {

                    recordError(
                        "Unable to add product to cart.",
                        error
                    );
                }
            }
        );


        /*
         * Wishlist request.
         */

        document.addEventListener(
            "wishlist:toggle",
            event => {

                const product =
                    event.detail?.product;


                if (!product) {
                    return;
                }


                const wishlist =
                    window.NexpakWishlist ||
                    window.onlineWishlist ||
                    window.Wishlist;


                if (!wishlist) {

                    recordWarning(
                        "Wishlist engine is unavailable."
                    );

                    return;
                }


                try {

                    if (
                        typeof wishlist.toggle ===
                        "function"
                    ) {

                        wishlist.toggle(
                            product
                        );

                    } else if (
                        typeof wishlist.toggleItem ===
                        "function"
                    ) {

                        wishlist.toggleItem(
                            product
                        );
                    }

                } catch (
                    error
                ) {

                    recordError(
                        "Wishlist action failed.",
                        error
                    );
                }
            }
        );


        /*
         * Continue shopping.
         */

        document.addEventListener(
            "store:scrolled",
            () => {

                NexpakOnlineUI.GlobalUI
                    ?.closeCartPanel();
            }
        );


        /*
         * Checkout success.
         */

        document.addEventListener(
            "checkout:success",
            event => {

                const result =
                    event.detail?.result;


                NexpakOnlineUI.OverlayUI
                    ?.showToast(
                        "Order completed successfully.",
                        "success",
                        5000
                    );


                NexpakOnlineUI.GlobalUI
                    ?.closeCartPanel();


                console.log(
                    "[NEXPAK UI] Order completed:",
                    result
                );
            }
        );


        /*
         * Checkout error.
         */

        document.addEventListener(
            "checkout:error",
            event => {

                const message =
                    event.detail?.error
                        ?.message ||
                    "Checkout could not be completed.";


                NexpakOnlineUI.OverlayUI
                    ?.showToast(
                        message,
                        "error",
                        5000
                    );
            }
        );


        /*
         * Delivery selection.
         */

        document.addEventListener(
            "delivery:method-selected",
            event => {

                const method =
                    event.detail?.method;


                if (!method) {
                    return;
                }


                NexpakOnlineUI.OverlayUI
                    ?.showToast(
                        `Delivery method selected: ${method}`,
                        "success",
                        2500
                    );
            }
        );
    }


    /* ========================================================
       UI READY EVENT
       ======================================================== */

    function announceReady() {

        document.documentElement
            .dataset
            .nexpakUI =
                "ready";


        document.body.classList.add(
            "nexpak-ui-ready"
        );


        NexpakOnlineUI.emit(
            "online-ui-ready",
            {
                version:
                    state.version
            }
        );
    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return;
        }


        state.startedAt =
            new Date().toISOString();


        try {

            bindErrorProtection();

            bindEventBridge();

            const health =
                healthCheck();


            state.initialized =
                true;


            announceReady();


            /*
             * A healthy UI is expected to
             * have all seven UI layers.
             */

            if (
                health.healthy
            ) {

                NexpakOnlineUI.OverlayUI
                    ?.showToast(
                        "Nexpak Online Store ready.",
                        "success",
                        2200
                    );
            }

        } catch (
            error
        ) {

            recordError(
                "UI initialization failed.",
                error
            );
        }
    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    return {

        init,

        healthCheck,

        recordError,
        recordWarning,

        getState() {

            return {

                ...state,

                errors: [
                    ...state.errors
                ],

                warnings: [
                    ...state.warnings
                ]
            };
        },

        clearDiagnostics() {

            state.errors = [];

            state.warnings = [];
        }
    };

})();


/* ============================================================
   INITIALIZE FINAL UI LAYER
   ============================================================ */

NexpakOnlineUI.FinalUI.init();


/* ============================================================
   FINAL PUBLIC STATUS
   ============================================================ */

NexpakOnlineUI.status = function () {

    const health =
        NexpakOnlineUI.FinalUI
            .healthCheck();


    return {

        uiVersion:
            "V1.0",

        initialized:
            true,

        healthy:
            health.healthy,

        partsCompleted:
            8,

        partsTotal:
            8,

        timestamp:
            new Date().toISOString(),

        health
    };
};


/* ============================================================
   END OF onlineui.js — PART 8/8
   ============================================================ */
