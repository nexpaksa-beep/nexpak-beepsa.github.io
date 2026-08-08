/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 1/8
 Purpose:
 - Database connection
 - Global store state
 - Store configuration
 - DOM references
 - Safe utility helpers
 - Initialization foundation

 IMPORTANT:
 - Product data comes ONLY from online-data/*.js
 - Do NOT duplicate products here
 - Do NOT modify online.css
=========================================================*/


/*=========================================================
 1. GLOBAL NEXPAK ONLINE STORE NAMESPACE
=========================================================*/

(function (window, document) {

    "use strict";


    /*=====================================================
      2. MAIN STORE OBJECT
    =====================================================*/

    const NEXPAK_ONLINE = {

        /*-----------------------------------------------
          Store information
        -----------------------------------------------*/

        version: "1.0.0",
        engine: "online.js",
        build: "08 August 2026",

        initialized: false,

        /*-----------------------------------------------
          Database
        -----------------------------------------------*/

        database: {
            products: [],
            categories: {},
            brands: {},
            aliases: {},
            productTypes: {},
            compatibility: {},
            deliveryClasses: {},
            info: {},
            validation: {},
            stats: {},
            categoryCounts: {},
            storeData: {}
        },


        /*-----------------------------------------------
          Global product state
        -----------------------------------------------*/

        state: {

            /* Complete database */
            allProducts: [],

            /* Currently displayed products */
            visibleProducts: [],

            /* Currently selected product */
            selectedProduct: null,

            /* Search */
            searchTerm: "",

            /* Filters */
            category: "all",
            subcategory: "all",
            brand: "all",
            productType: "all",

            /* Product status filters */
            stockStatus: "all",

            /* Special collections */
            featuredOnly: false,
            popularOnly: false,
            newOnly: false,

            /* Sorting */
            sortBy: "default",

            /* Pagination */
            currentPage: 1,
            productsPerPage: 24,

            /* View */
            viewMode: "grid",

            /* Product count */
            totalProducts: 0,
            filteredProducts: 0,

            /* UI */
            loading: false,
            error: null
        },


        /*-----------------------------------------------
          Store configuration
        -----------------------------------------------*/

        config: {

            /* Default pagination */
            defaultProductsPerPage: 24,

            /* Search behaviour */
            minimumSearchLength: 1,

            /* Default category */
            defaultCategory: "all",

            /* Default brand */
            defaultBrand: "all",

            /* Default product type */
            defaultProductType: "all",

            /* Default sorting */
            defaultSort: "default",

            /* Default view */
            defaultViewMode: "grid",

            /* Product statuses */
            pricedStatus: "priced",
            requestPriceStatus: "request-price",
            quoteStatus: "quote",

            /* Storage */
            storageKey: "nexpak_online_store_state_v1",

            /* Debugging */
            debug: true
        },


        /*-----------------------------------------------
          DOM references
        -----------------------------------------------*/

        elements: {},


        /*-----------------------------------------------
          Runtime flags
        -----------------------------------------------*/

        flags: {

            databaseReady: false,
            domReady: false,
            renderingReady: false,
            eventsReady: false
        },


        /*-----------------------------------------------
          Runtime metadata
        -----------------------------------------------*/

        meta: {

            initializedAt: null,
            lastRenderAt: null,
            lastSearchAt: null,
            lastFilterAt: null,

            databaseProductCount: 0,
            databaseCategoryCount: 0,
            databaseBrandCount: 0
        }
    };


    /*=====================================================
      3. DATABASE CONNECTION
    =====================================================*/

    function connectDatabase() {

        /*
         * The eight database files are loaded before
         * online.js by online.html.
         *
         * The database therefore exists in the global
         * NEXPAK database namespace when this function runs.
         */

        const products =
            window.NEXPAK_PRODUCTS ||
            [];

        const categoryMap =
            window.NEXPAK_CATEGORY_MAP ||
            {};

        const brandMap =
            window.NEXPAK_BRAND_MAP ||
            {};

        const searchAliases =
            window.NEXPAK_SEARCH_ALIASES ||
            {};

        const productTypes =
            window.NEXPAK_PRODUCT_TYPES ||
            {};

        const compatibilityMap =
            window.NEXPAK_COMPATIBILITY_MAP ||
            {};

        const deliveryClasses =
            window.NEXPAK_DELIVERY_CLASSES ||
            {};

        const databaseInfo =
            window.NEXPAK_DATABASE_INFO ||
            {};

        const databaseValidation =
            window.NEXPAK_DATABASE_VALIDATION ||
            {};

        const databaseStats =
            window.NEXPAK_DATABASE_STATS ||
            {};

        const categoryCounts =
            window.NEXPAK_CATEGORY_COUNTS ||
            {};

        const onlineStoreData =
            window.NEXPAK_ONLINE_STORE_DATA ||
            {};


        /*-----------------------------------------------
          Store database references
        -----------------------------------------------*/

        NEXPAK_ONLINE.database.products = products;
        NEXPAK_ONLINE.database.categories = categoryMap;
        NEXPAK_ONLINE.database.brands = brandMap;
        NEXPAK_ONLINE.database.aliases = searchAliases;
        NEXPAK_ONLINE.database.productTypes = productTypes;
        NEXPAK_ONLINE.database.compatibility = compatibilityMap;
        NEXPAK_ONLINE.database.deliveryClasses = deliveryClasses;
        NEXPAK_ONLINE.database.info = databaseInfo;
        NEXPAK_ONLINE.database.validation = databaseValidation;
        NEXPAK_ONLINE.database.stats = databaseStats;
        NEXPAK_ONLINE.database.categoryCounts = categoryCounts;
        NEXPAK_ONLINE.database.storeData = onlineStoreData;


        /*-----------------------------------------------
          Product state
        -----------------------------------------------*/

        NEXPAK_ONLINE.state.allProducts =
            Array.isArray(products)
                ? products.slice()
                : [];


        NEXPAK_ONLINE.state.visibleProducts =
            NEXPAK_ONLINE.state.allProducts.slice();


        NEXPAK_ONLINE.state.totalProducts =
            NEXPAK_ONLINE.state.allProducts.length;


        NEXPAK_ONLINE.state.filteredProducts =
            NEXPAK_ONLINE.state.allProducts.length;


        /*-----------------------------------------------
          Metadata
        -----------------------------------------------*/

        NEXPAK_ONLINE.meta.databaseProductCount =
            NEXPAK_ONLINE.state.allProducts.length;


        NEXPAK_ONLINE.meta.databaseCategoryCount =
            Object.keys(categoryMap).length;


        NEXPAK_ONLINE.meta.databaseBrandCount =
            Object.keys(brandMap).length;


        /*-----------------------------------------------
          Database ready flag
        -----------------------------------------------*/

        NEXPAK_ONLINE.flags.databaseReady = true;


        return true;
    }


    /*=====================================================
      4. DATABASE VALIDATION
    =====================================================*/

    function validateDatabaseConnection() {

        const database =
            NEXPAK_ONLINE.database;


        /*-----------------------------------------------
          Products must exist
        -----------------------------------------------*/

        if (!Array.isArray(database.products)) {

            NEXPAK_ONLINE.state.error =
                "NEXPAK product database is unavailable.";

            return false;
        }


        /*-----------------------------------------------
          Empty database warning
        -----------------------------------------------*/

        if (database.products.length === 0) {

            console.warn(
                "[NEXPAK ONLINE] Product database contains no products."
            );

        }


        /*-----------------------------------------------
          Confirm database objects
        -----------------------------------------------*/

        const databaseObjects = [
            "categories",
            "brands",
            "aliases",
            "productTypes",
            "compatibility",
            "deliveryClasses",
            "info",
            "validation",
            "stats",
            "categoryCounts",
            "storeData"
        ];


        databaseObjects.forEach(function (key) {

            if (
                database[key] === null ||
                typeof database[key] !== "object"
            ) {

                database[key] = {};
            }

        });


        return true;
    }


    /*=====================================================
      5. DOM ELEMENT DISCOVERY
    =====================================================*/

    function cacheDOMElements() {

        /*
         * We intentionally use flexible selectors.
         *
         * The existing online.html remains untouched.
         * Parts 2–8 can use these cached references where
         * the corresponding elements already exist.
         */

        NEXPAK_ONLINE.elements = {

            /* Main store */
            store:
                document.querySelector(
                    "#online-store, .online-store, [data-online-store]"
                ),

            /* Product area */
            productGrid:
                document.querySelector(
                    "#product-grid, .product-grid, [data-product-grid]"
                ),

            productList:
                document.querySelector(
                    "#product-list, .product-list, [data-product-list]"
                ),

            /* Search */
            search:
                document.querySelector(
                    "#product-search, #online-search, [data-product-search]"
                ),

            searchForm:
                document.querySelector(
                    "#product-search-form, #online-search-form, [data-search-form]"
                ),

            /* Category */
            categoryFilter:
                document.querySelector(
                    "#category-filter, #online-category-filter, [data-category-filter]"
                ),

            /* Brand */
            brandFilter:
                document.querySelector(
                    "#brand-filter, #online-brand-filter, [data-brand-filter]"
                ),

            /* Product type */
            productTypeFilter:
                document.querySelector(
                    "#product-type-filter, [data-product-type-filter]"
                ),

            /* Sorting */
            sort:
                document.querySelector(
                    "#sort-products, #product-sort, [data-product-sort]"
                ),

            /* Pagination */
            pagination:
                document.querySelector(
                    "#pagination, .pagination, [data-pagination]"
                ),

            /* Product count */
            productCount:
                document.querySelector(
                    "#product-count, .product-count, [data-product-count]"
                ),

            /* Product details */
            productDetails:
                document.querySelector(
                    "#product-details, .product-details, [data-product-details]"
                ),

            /* Featured */
            featured:
                document.querySelector(
                    "#featured-products, .featured-products, [data-featured-products]"
                ),

            /* Popular */
            popular:
                document.querySelector(
                    "#popular-products, .popular-products, [data-popular-products]"
                ),

            /* Related */
            related:
                document.querySelector(
                    "#related-products, .related-products, [data-related-products]"
                ),

            /* Loading */
            loading:
                document.querySelector(
                    "#store-loading, .store-loading, [data-store-loading]"
                ),

            /* Error */
            error:
                document.querySelector(
                    "#store-error, .store-error, [data-store-error]"
                )
        };


        NEXPAK_ONLINE.flags.domReady = true;
    }


    /*=====================================================
      6. SAFE VALUE HELPERS
    =====================================================*/

    function safeString(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value).trim();
    }


    function safeLower(value) {

        return safeString(value).toLowerCase();
    }


    function safeArray(value) {

        return Array.isArray(value)
            ? value
            : [];
    }


    function safeObject(value) {

        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        )
            ? value
            : {};
    }


    function escapeHTML(value) {

        const text = safeString(value);

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /*=====================================================
      7. PRODUCT IDENTIFICATION HELPERS
    =====================================================*/

    function getProductID(product) {

        if (!product) {
            return "";
        }

        return safeString(
            product.id ||
            product.productId ||
            product.productID ||
            product.sku ||
            ""
        );
    }


    function getProductSKU(product) {

        if (!product) {
            return "";
        }

        return safeString(
            product.sku ||
            product.SKU ||
            product.productSku ||
            ""
        );
    }


    function getProductName(product) {

        if (!product) {
            return "";
        }

        return safeString(
            product.name ||
            product.productName ||
            product.title ||
            ""
        );
    }


    function getProductBrand(product) {

        if (!product) {
            return "";
        }

        return safeString(
            product.brand ||
            product.manufacturer ||
            ""
        );
    }


    function getProductCategory(product) {

        if (!product) {
            return "";
        }

        return safeString(
            product.category ||
            product.mainCategory ||
            ""
        );
    }


    /*=====================================================
      8. PRODUCT PRICING HELPERS
    =====================================================*/

    function getProductPriceStatus(product) {

        if (!product) {
            return "quote";
        }


        const status =
            safeLower(
                product.priceStatus ||
                product.pricingStatus ||
                product.priceType ||
                ""
            );


        if (
            status === "priced" ||
            status === "price"
        ) {
            return "priced";
        }


        if (
            status === "request-price" ||
            status === "request_price" ||
            status === "requestprice"
        ) {
            return "request-price";
        }


        if (
            status === "quote" ||
            status === "request-quote" ||
            status === "request_quote"
        ) {
            return "quote";
        }


        /*
         * Never assume a missing price is a real price.
         */

        if (
            product.price === null ||
            product.price === undefined ||
            product.price === ""
        ) {
            return "quote";
        }


        return "priced";
    }


    function hasConfirmedPrice(product) {

        if (!product) {
            return false;
        }


        const status =
            getProductPriceStatus(product);


        if (status !== "priced") {
            return false;
        }


        const price =
            Number(product.price);


        return (
            Number.isFinite(price) &&
            price >= 0
        );
    }


    /*=====================================================
      9. DEBUG LOGGER
    =====================================================*/

    function log() {

        if (!NEXPAK_ONLINE.config.debug) {
            return;
        }

        const args =
            Array.prototype.slice.call(arguments);

        args.unshift("[NEXPAK ONLINE]");

        console.log.apply(
            console,
            args
        );
    }


    function warn() {

        const args =
            Array.prototype.slice.call(arguments);

        args.unshift("[NEXPAK ONLINE]");

        console.warn.apply(
            console,
            args
        );
    }


    function error() {

        const args =
            Array.prototype.slice.call(arguments);

        args.unshift("[NEXPAK ONLINE]");

        console.error.apply(
            console,
            args
        );
    }


    /*=====================================================
      10. INITIAL STATE RESET
    =====================================================*/

    function resetStoreState() {

        const state =
            NEXPAK_ONLINE.state;


        state.searchTerm = "";

        state.category =
            NEXPAK_ONLINE.config.defaultCategory;

        state.subcategory = "all";

        state.brand =
            NEXPAK_ONLINE.config.defaultBrand;

        state.productType =
            NEXPAK_ONLINE.config.defaultProductType;

        state.stockStatus = "all";

        state.featuredOnly = false;

        state.popularOnly = false;

        state.newOnly = false;

        state.sortBy =
            NEXPAK_ONLINE.config.defaultSort;

        state.currentPage = 1;

        state.productsPerPage =
            NEXPAK_ONLINE.config.defaultProductsPerPage;

        state.viewMode =
            NEXPAK_ONLINE.config.defaultViewMode;

        state.selectedProduct = null;

        state.error = null;


        state.visibleProducts =
            state.allProducts.slice();

        state.filteredProducts =
            state.visibleProducts.length;
    }


    /*=====================================================
      11. MAIN INITIALIZATION
    =====================================================*/
          function initialize() {

        if (NEXPAK_ONLINE.initialized) {

            log(
                "Store engine already initialized."
            );

            return NEXPAK_ONLINE;
        }


        log(
            "Initializing NEXPAK Online Store Engine..."
        );


        /*-----------------------------------------------
          Connect database
        -----------------------------------------------*/

        connectDatabase();


        /*-----------------------------------------------
          Validate database
        -----------------------------------------------*/

        if (!validateDatabaseConnection()) {

            error(
                "Database initialization failed."
            );

            return NEXPAK_ONLINE;
        }


        /*-----------------------------------------------
          Cache DOM
        -----------------------------------------------*/

        cacheDOMElements();


        /*-----------------------------------------------
          Reset state
        -----------------------------------------------*/

        resetStoreState();


        /*-----------------------------------------------
          Runtime metadata
        -----------------------------------------------*/

        NEXPAK_ONLINE.meta.initializedAt =
            new Date().toISOString();


        NEXPAK_ONLINE.initialized =
            true;


        log(
            "Database connected:",
            NEXPAK_ONLINE.state.totalProducts,
            "products"
        );


        log(
            "NEXPAK Online Store Engine Part 1 ready."
        );


        return NEXPAK_ONLINE;
    }


    /*=====================================================
      12. PUBLIC API
    =====================================================*/

    NEXPAK_ONLINE.init =
        initialize;

    NEXPAK_ONLINE.connectDatabase =
        connectDatabase;

    NEXPAK_ONLINE.validateDatabase =
        validateDatabaseConnection;

    NEXPAK_ONLINE.cacheDOM =
        cacheDOMElements;

    NEXPAK_ONLINE.resetState =
        resetStoreState;


    /* Safe helpers exposed for Parts 2–8 */

    NEXPAK_ONLINE.helpers = {

        safeString: safeString,
        safeLower: safeLower,
        safeArray: safeArray,
        safeObject: safeObject,
        escapeHTML: escapeHTML,

        getProductID: getProductID,
        getProductSKU: getProductSKU,
        getProductName: getProductName,
        getProductBrand: getProductBrand,
        getProductCategory: getProductCategory,

        getProductPriceStatus:
            getProductPriceStatus,

        hasConfirmedPrice:
            hasConfirmedPrice,

        log: log,
        warn: warn,
        error: error
    };


    /*=====================================================
      13. GLOBAL EXPORT
    =====================================================*/

    window.NEXPAK_ONLINE =
        NEXPAK_ONLINE;


    /*
     * Compatibility alias.
     *
     * This allows later scripts to reference the engine
     * using either NEXPAK_ONLINE or NEXPAKOnline.
     */

    window.NEXPAKOnline =
        NEXPAK_ONLINE;


    /*=====================================================
      14. AUTOMATIC INITIALIZATION
    =====================================================*/

    function boot() {

        try {

            initialize();

        } catch (err) {

            NEXPAK_ONLINE.state.error =
                err.message ||
                "Unknown online store initialization error.";

            error(
                "Store initialization error:",
                err
            );
        }
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            boot,
            {
                once: true
            }
        );

    } else {

        boot();
    }


})(window, document);


/*=========================================================
 END OF online.js — PART 1/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 2/8
 Purpose:
 - Product rendering engine
 - Product card generation
 - Product pricing display
 - Product action buttons
 - Product selection hooks
 - Empty-state rendering

 Continues directly from:
 online.js — Part 1/8
=========================================================*/


/*=========================================================
 15. PRODUCT RENDERING ENGINE
=========================================================*/

(function (window, document) {

    "use strict";


    /*-----------------------------------------------------
      Get existing NEXPAK online engine
    -----------------------------------------------------*/

    const STORE =
        window.NEXPAK_ONLINE;


    if (!STORE) {

        console.error(
            "[NEXPAK ONLINE] Part 2 could not start. " +
            "Part 1 must load first."
        );

        return;
    }


    const helpers =
        STORE.helpers;


    /*=====================================================
      16. PRODUCT FIELD HELPERS
    =====================================================*/


    function getProductImage(product) {

        if (!product) {
            return "";
        }


        /*
         * Support multiple possible database image fields.
         */

        const image =
            product.image ||
            product.imageUrl ||
            product.imageURL ||
            product.img ||
            product.thumbnail ||
            product.photo ||
            "";


        if (typeof image === "string") {
            return image.trim();
        }


        /*
         * Some product databases may store images
         * inside an array.
         */

        if (Array.isArray(product.images)) {

            if (product.images.length > 0) {

                const firstImage =
                    product.images[0];

                if (typeof firstImage === "string") {
                    return firstImage;
                }

                if (
                    firstImage &&
                    typeof firstImage === "object"
                ) {

                    return (
                        firstImage.url ||
                        firstImage.src ||
                        firstImage.image ||
                        ""
                    );
                }
            }
        }


        return "";
    }


    function getProductDescription(product) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.shortDescription ||
            product.short_description ||
            product.description ||
            product.summary ||
            ""
        );
    }


    function getProductSubcategory(product) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.subcategory ||
            product.subCategory ||
            product.sub_category ||
            ""
        );
    }


    function getProductType(product) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.productType ||
            product.type ||
            product.product_type ||
            ""
        );
    }


    function getProductStockStatus(product) {

        if (!product) {
            return "unknown";
        }


        return helpers.safeLower(
            product.stockStatus ||
            product.stock ||
            product.availability ||
            "unknown"
        );
    }


    function getProductWarranty(product) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.warranty ||
            product.warrantyPeriod ||
            product.guarantee ||
            ""
        );
    }


    /*=====================================================
      17. PRODUCT URL / LINK HANDLING
    =====================================================*/


    function getProductLink(product) {

        if (!product) {
            return "#";
        }


        /*
         * Respect an existing product URL if the database
         * contains one.
         */

        const existingURL =
            product.url ||
            product.link ||
            product.productUrl ||
            product.productURL;


        if (existingURL) {
            return helpers.safeString(existingURL);
        }


        /*
         * No fake page is created here.
         *
         * The product-card button uses the internal
         * product-selection engine instead.
         */

        return "#";
    }


    /*=====================================================
      18. PRICE FORMATTING
    =====================================================*/


    function formatPrice(product) {

        if (!product) {
            return "";
        }


        if (!helpers.hasConfirmedPrice(product)) {
            return "";
        }


        const numericPrice =
            Number(product.price);


        if (!Number.isFinite(numericPrice)) {
            return "";
        }


        /*
         * South African Rand formatting.
         */

        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {
                    style: "currency",
                    currency: "ZAR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ).format(numericPrice);

        } catch (error) {

            return "R " +
                numericPrice.toFixed(2);
        }
    }


    /*=====================================================
      19. PRICE DISPLAY
    =====================================================*/


    function renderPrice(product) {

        const status =
            helpers.getProductPriceStatus(product);


        /*-----------------------------------------------
          Confirmed price
        -----------------------------------------------*/

        if (status === "priced") {

            const price =
                formatPrice(product);


            if (price) {

                return `
                    <div class="online-product-price"
                         data-price-status="priced">
                        <span class="price-label">
                            ${helpers.escapeHTML(price)}
                        </span>
                    </div>
                `;
            }
        }


        /*-----------------------------------------------
          Request price
        -----------------------------------------------*/

        if (status === "request-price") {

            return `
                <div class="online-product-price online-request-price"
                     data-price-status="request-price">
                    <span class="price-label">
                        Request Price
                    </span>
                </div>
            `;
        }


        /*-----------------------------------------------
          Quote
        -----------------------------------------------*/

        return `
            <div class="online-product-price online-quote-price"
                 data-price-status="quote">
                <span class="price-label">
                    Request Quote
                </span>
            </div>
        `;
    }


    /*=====================================================
      20. PRODUCT BADGES
    =====================================================*/


    function renderProductBadges(product) {

        if (!product) {
            return "";
        }


        const badges = [];


        /* Featured */

        if (
            product.featured === true ||
            product.isFeatured === true
        ) {

            badges.push(
                `<span class="online-product-badge featured">
                    Featured
                </span>`
            );
        }


        /* Popular */

        if (
            product.popular === true ||
            product.isPopular === true
        ) {

            badges.push(
                `<span class="online-product-badge popular">
                    Popular
                </span>`
            );
        }


        /* New */

        if (
            product.new === true ||
            product.isNew === true ||
            product.newProduct === true
        ) {

            badges.push(
                `<span class="online-product-badge new">
                    New
                </span>`
            );
        }


        /* Kit */

        if (
            product.isKit === true ||
            product.kit === true
        ) {

            badges.push(
                `<span class="online-product-badge kit">
                    Kit
                </span>`
            );
        }


        if (!badges.length) {
            return "";
        }


        return `
            <div class="online-product-badges">
                ${badges.join("")}
            </div>
        `;
    }


    /*=====================================================
      21. STOCK DISPLAY
    =====================================================*/


    function renderStockStatus(product) {

        const status =
            getProductStockStatus(product);


        switch (status) {

            case "in-stock":
            case "instock":
            case "available":

                return `
                    <span class="online-stock-status in-stock">
                        In Stock
                    </span>
                `;


            case "low-stock":
            case "lowstock":

                return `
                    <span class="online-stock-status low-stock">
                        Low Stock
                    </span>
                `;


            case "out-of-stock":
            case "outofstock":
            case "unavailable":

                return `
                    <span class="online-stock-status out-of-stock">
                        Out of Stock
                    </span>
                `;


            case "pre-order":
            case "preorder":

                return `
                    <span class="online-stock-status pre-order">
                        Pre-Order
                    </span>
                `;


            default:

                return "";
        }
    }


    /*=====================================================
      22. PRODUCT ACTION BUTTON
    =====================================================*/


    function getPrimaryAction(product) {

        if (!product) {
            return "";
        }


        const priceStatus =
            helpers.getProductPriceStatus(product);


        const productID =
            helpers.getProductID(product);


        const escapedID =
            helpers.escapeHTML(productID);


        /*-----------------------------------------------
          Confirmed price
        -----------------------------------------------*/

        if (priceStatus === "priced") {

            return `
                <button
                    type="button"
                    class="online-product-action online-add-to-cart"
                    data-action="add-to-cart"
                    data-product-id="${escapedID}"
                    aria-label="Add ${helpers.escapeHTML(
                        helpers.getProductName(product)
                    )} to cart">

                    <span class="action-text">
                        Add to Cart
                    </span>

                </button>
            `;
        }


        /*-----------------------------------------------
          Request price
        -----------------------------------------------*/

        if (priceStatus === "request-price") {

            return `
                <button
                    type="button"
                    class="online-product-action online-request-product-price"
                    data-action="request-price"
                    data-product-id="${escapedID}">

                    <span class="action-text">
                        Request Price
                    </span>

                </button>
            `;
        }


        /*-----------------------------------------------
          Quote
        -----------------------------------------------*/

        return `
            <button
                type="button"
                class="online-product-action online-request-quote"
                data-action="request-quote"
                data-product-id="${escapedID}">

                <span class="action-text">
                    Request Quote
                </span>

            </button>
        `;
    }


    /*=====================================================
      23. PRODUCT CARD
    =====================================================*/


    function renderProductCard(product) {

        if (!product) {
            return "";
        }


        const productID =
            helpers.getProductID(product);


        const sku =
            helpers.getProductSKU(product);


        const name =
            helpers.getProductName(product);


        const brand =
            helpers.getProductBrand(product);


        const category =
            helpers.getProductCategory(product);


        const subcategory =
            getProductSubcategory(product);


        const productType =
            getProductType(product);


        const description =
            getProductDescription(product);


        const image =
            getProductImage(product);


        const warranty =
            getProductWarranty(product);


        const escapedID =
            helpers.escapeHTML(productID);


        const escapedName =
            helpers.escapeHTML(name);


        const escapedSKU =
            helpers.escapeHTML(sku);


        const escapedBrand =
            helpers.escapeHTML(brand);


        const escapedCategory =
            helpers.escapeHTML(category);


        const escapedSubcategory =
            helpers.escapeHTML(subcategory);


        const escapedProductType =
            helpers.escapeHTML(productType);


        const escapedDescription =
            helpers.escapeHTML(description);


        const escapedWarranty =
            helpers.escapeHTML(warranty);


        /*-----------------------------------------------
          Image
        -----------------------------------------------*/

        let imageHTML;


        if (image) {

            imageHTML = `
                <img
                    src="${helpers.escapeHTML(image)}"
                    alt="${escapedName}"
                    class="online-product-image"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >

                <div
                    class="online-product-image-placeholder"
                    style="display:none;"
                    aria-hidden="true">
                    <span>Image unavailable</span>
                </div>
            `;

        } else {

            imageHTML = `
                <div
                    class="online-product-image-placeholder"
                    aria-hidden="true">

                    <span>
                        NEXPAK Security
                    </span>

                </div>
            `;
        }


        /*-----------------------------------------------
          Product metadata
        -----------------------------------------------*/

        const metadata = [];


        if (brand) {

            metadata.push(`
                <span class="online-product-brand">
                    ${escapedBrand}
                </span>
            `);
        }


        if (category) {

            metadata.push(`
                <span class="online-product-category">
                    ${escapedCategory}
                </span>
            `);
        }


        /*-----------------------------------------------
          SKU
        -----------------------------------------------*/

        const skuHTML =
            sku
                ? `
                    <div class="online-product-sku">
                        SKU:
                        <span>${escapedSKU}</span>
                    </div>
                `
                : "";


        /*-----------------------------------------------
          Product type
        -----------------------------------------------*/

        const typeHTML =
            productType
                ? `
                    <div class="online-product-type"
                         data-product-type="${escapedProductType}">
                        ${escapedProductType}
                    </div>
                `
                : "";


        /*-----------------------------------------------
          Subcategory
        -----------------------------------------------*/

        const subcategoryHTML =
            subcategory
                ? `
                    <div class="online-product-subcategory">
                        ${escapedSubcategory}
                    </div>
                `
                : "";


        /*-----------------------------------------------
          Warranty
        -----------------------------------------------*/

        const warrantyHTML =
            warranty
                ? `
                    <div class="online-product-warranty">
                        Warranty:
                        ${escapedWarranty}
                    </div>
                `
                : "";


        /*-----------------------------------------------
          Description
        -----------------------------------------------*/

        const descriptionHTML =
            description
                ? `
                    <div class="online-product-description">
                        ${escapedDescription}
                    </div>
                `
                : "";


        /*-----------------------------------------------
          Product card
        -----------------------------------------------*/

        return `
            <article
                class="online-product-card"
                data-product-id="${escapedID}"
                data-product-sku="${escapedSKU}"
                data-category="${escapedCategory}"
                data-subcategory="${escapedSubcategory}"
                data-brand="${escapedBrand}"
                data-product-type="${escapedProductType}"
                tabindex="0">

                <div class="online-product-image-wrap">

                    ${renderProductBadges(product)}

                    ${imageHTML}

                </div>


                <div class="online-product-card-body">

                    <div class="online-product-meta">

                        ${metadata.join("")}

                    </div>


                    <h3 class="online-product-name">
                        ${escapedName}
                    </h3>


                    ${skuHTML}


                    ${typeHTML}


                    ${subcategoryHTML}


                    ${descriptionHTML}


                    ${renderStockStatus(product)}


                    ${warrantyHTML}


                    <div class="online-product-purchase">

                        ${renderPrice(product)}

                        <div class="online-product-actions">

                            <button
                                type="button"
                                class="online-product-view"
                                data-action="view-product"
                                data-product-id="${escapedID}">
                                View Details
                            </button>
                                          ${getPrimaryAction(product)}

                        </div>

                    </div>

                </div>

            </article>
        `;
    }


    /*=====================================================
      24. PRODUCT COLLECTION RENDERING
    =====================================================*/


    function renderProducts(products, container) {

        /*
         * If no explicit product array is supplied,
         * use the current visible product collection.
         */

        const collection =
            Array.isArray(products)
                ? products
                : STORE.state.visibleProducts;


        /*
         * If no container is supplied, use the product grid
         * discovered during Part 1.
         */

        const target =
            container ||
            STORE.elements.productGrid ||
            STORE.elements.productList;


        if (!target) {

            STORE.helpers.warn(
                "Product rendering skipped: product container not found."
            );

            return false;
        }


        /*-----------------------------------------------
          Empty results
        -----------------------------------------------*/

        if (!collection.length) {

            renderEmptyProducts(target);

            STORE.meta.lastRenderAt =
                new Date().toISOString();

            return true;
        }


        /*-----------------------------------------------
          Render cards
        -----------------------------------------------*/

        target.innerHTML =
            collection
                .map(renderProductCard)
                .join("");


        STORE.meta.lastRenderAt =
            new Date().toISOString();


        STORE.flags.renderingReady =
            true;


        updateProductCount(
            collection.length
        );


        return true;
    }


    /*=====================================================
      25. EMPTY PRODUCT STATE
    =====================================================*/


    function renderEmptyProducts(container) {

        if (!container) {
            return;
        }


        container.innerHTML = `
            <div class="online-empty-products">

                <div class="online-empty-products-icon">
                    🔍
                </div>

                <h3>
                    No Security Products Found
                </h3>

                <p>
                    We couldn't find products matching
                    your current selection.
                </p>

                <button
                    type="button"
                    class="online-reset-products"
                    data-action="reset-store">

                    Clear Filters

                </button>

            </div>
        `;
    }


    /*=====================================================
      26. PRODUCT COUNT
    =====================================================*/


    function updateProductCount(count) {

        const countElement =
            STORE.elements.productCount;


        if (!countElement) {
            return;
        }


        const safeCount =
            Number.isFinite(Number(count))
                ? Number(count)
                : 0;


        countElement.textContent =
            safeCount.toLocaleString("en-ZA");
    }


    /*=====================================================
      27. PRODUCT LOOKUP
    =====================================================*/


    function findProduct(productID) {

        const id =
            helpers.safeLower(productID);


        if (!id) {
            return null;
        }


        const products =
            STORE.state.allProducts;


        return products.find(function (product) {

            return (
                helpers.safeLower(
                    helpers.getProductID(product)
                ) === id
            );

        }) || null;
    }


    /*=====================================================
      28. PRODUCT SELECTION
    =====================================================*/


    function selectProduct(productID) {

        const product =
            findProduct(productID);


        if (!product) {

            helpers.warn(
                "Product not found:",
                productID
            );

            return null;
        }


        STORE.state.selectedProduct =
            product;


        /*
         * Later Parts can listen for this event.
         */

        document.dispatchEvent(
            new CustomEvent(
                "nexpak:product-selected",
                {
                    detail: {
                        product: product,
                        productID:
                            helpers.getProductID(product)
                    }
                }
            )
        );


        return product;
    }


    /*=====================================================
      29. PRODUCT DETAIL TARGET
    =====================================================*/


    function renderSelectedProduct(container) {

        const product =
            STORE.state.selectedProduct;


        if (!product) {
            return false;
        }


        const target =
            container ||
            STORE.elements.productDetails;


        if (!target) {
            return false;
        }


        const name =
            helpers.escapeHTML(
                helpers.getProductName(product)
            );


        const sku =
            helpers.escapeHTML(
                helpers.getProductSKU(product)
            );


        const brand =
            helpers.escapeHTML(
                helpers.getProductBrand(product)
            );


        const category =
            helpers.escapeHTML(
                helpers.getProductCategory(product)
            );


        const description =
            helpers.escapeHTML(
                getProductDescription(product)
            );


        const image =
            getProductImage(product);


        const imageHTML =
            image
                ? `
                    <img
                        src="${helpers.escapeHTML(image)}"
                        alt="${name}"
                        class="online-product-detail-image"
                        loading="lazy">
                `
                : `
                    <div class="online-product-detail-image-placeholder">
                        NEXPAK Security
                    </div>
                `;


        target.innerHTML = `
            <section
                class="online-product-detail"
                data-product-id="${helpers.escapeHTML(
                    helpers.getProductID(product)
                )}">

                <div class="online-product-detail-image-wrap">

                    ${imageHTML}

                </div>


                <div class="online-product-detail-content">

                    <div class="online-product-detail-brand">
                        ${brand}
                    </div>


                    <h2 class="online-product-detail-title">
                        ${name}
                    </h2>


                    ${
                        sku
                            ? `
                                <div class="online-product-detail-sku">
                                    SKU: ${sku}
                                </div>
                            `
                            : ""
                    }


                    ${
                        category
                            ? `
                                <div class="online-product-detail-category">
                                    ${category}
                                </div>
                            `
                            : ""
                    }


                    ${
                        description
                            ? `
                                <div class="online-product-detail-description">
                                    ${description}
                                </div>
                            `
                            : ""
                    }


                    <div class="online-product-detail-price">

                        ${renderPrice(product)}

                    </div>


                    <div class="online-product-detail-action">

                        ${getPrimaryAction(product)}

                    </div>

                </div>

            </section>
        `;


        return true;
    }


    /*=====================================================
      30. EVENT DELEGATION FOR PRODUCT CARDS
    =====================================================*/


    function handleProductAction(event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.getAttribute(
                "data-action"
            );


        const productID =
            button.getAttribute(
                "data-product-id"
            );


        if (!action) {
            return;
        }


        /*-----------------------------------------------
          View product
        -----------------------------------------------*/

        if (
            action === "view-product"
        ) {

            const product =
                selectProduct(productID);


            if (product) {

                renderSelectedProduct();

                document.dispatchEvent(
                    new CustomEvent(
                        "nexpak:view-product",
                        {
                            detail: {
                                product: product
                            }
                        }
                    )
                );
            }


            return;
        }


        /*-----------------------------------------------
          Add to cart
        -----------------------------------------------*/

        if (
            action === "add-to-cart"
        ) {

            const product =
                selectProduct(productID);


            if (!product) {
                return;
            }


            /*
             * onlinecart.js will eventually listen for
             * this event.
             *
             * This keeps Part 2 independent from the cart
             * engine while making integration possible.
             */

            document.dispatchEvent(
                new CustomEvent(
                    "nexpak:add-to-cart",
                    {
                        detail: {
                            product: product,
                            productID:
                                helpers.getProductID(product),
                            quantity: 1
                        }
                    }
                )
            );


            return;
        }


        /*-----------------------------------------------
          Request price
        -----------------------------------------------*/

        if (
            action === "request-price"
        ) {

            const product =
                selectProduct(productID);


            if (!product) {
                return;
            }


            document.dispatchEvent(
                new CustomEvent(
                    "nexpak:request-price",
                    {
                        detail: {
                            product: product
                        }
                    }
                )
            );


            return;
        }


        /*-----------------------------------------------
          Request quote
        -----------------------------------------------*/

        if (
            action === "request-quote"
        ) {

            const product =
                selectProduct(productID);


            if (!product) {
                return;
            }


            document.dispatchEvent(
                new CustomEvent(
                    "nexpak:request-quote",
                    {
                        detail: {
                            product: product
                        }
                    }
                )
            );


            return;
        }


        /*-----------------------------------------------
          Reset store
        -----------------------------------------------*/

        if (
            action === "reset-store"
        ) {

            STORE.resetState();


            renderProducts(
                STORE.state.visibleProducts
            );


            return;
        }
    }


    /*=====================================================
      31. PRODUCT CARD KEYBOARD ACCESSIBILITY
    =====================================================*/


    function handleProductKeyboard(event) {

        const card =
            event.target.closest(
                ".online-product-card"
            );


        if (!card) {
            return;
        }


        /*
         * Do not interfere with buttons.
         */

        if (
            event.target.closest("button") ||
            event.target.closest("a") ||
            event.target.closest("input")
        ) {
            return;
        }


        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();


            const productID =
                card.getAttribute(
                    "data-product-id"
                );


            if (productID) {

                selectProduct(productID);

                renderSelectedProduct();


                document.dispatchEvent(
                    new CustomEvent(
                        "nexpak:view-product",
                        {
                            detail: {
                                product:
                                    STORE.state.selectedProduct
                            }
                        }
                    )
                );
            }
        }
    }


    /*=====================================================
      32. PRODUCT EVENTS
    =====================================================*/


    function initializeProductEvents() {

        /*
         * Use document-level delegation so dynamically
         * rendered product cards work automatically.
         */

        document.addEventListener(
            "click",
            handleProductAction
        );


        document.addEventListener(
            "keydown",
            handleProductKeyboard
        );


        STORE.flags.eventsReady =
            true;
    }


    /*=====================================================
      33. PUBLIC PRODUCT API
    =====================================================*/


    STORE.products = {

        /* Rendering */

        render:
            renderProducts,

        renderCard:
            renderProductCard,

        renderSelected:
            renderSelectedProduct,

        renderEmpty:
            renderEmptyProducts,


        /* Lookup */

        find:
            findProduct,

        select:
            selectProduct,


        /* Pricing */

        formatPrice:
            formatPrice,

        renderPrice:
            renderPrice,


        /* Product fields */

        getImage:
            getProductImage,

        getDescription:
            getProductDescription,

        getSubcategory:
            getProductSubcategory,

        getType:
            getProductType,

        getStockStatus:
            getProductStockStatus,

        getWarranty:
            getProductWarranty,


        /* Actions */

        getPrimaryAction:
            getPrimaryAction,


        /* Events */

        initializeEvents:
            initializeProductEvents
    };


    /*=====================================================
      34. INITIALIZE PRODUCT EVENTS
    =====================================================*/

    initializeProductEvents();


    /*=====================================================
      35. PART 2 READY
    =====================================================*/

    helpers.log(
        "online.js Part 2 loaded — Product Rendering Engine ready."
    );


})(window, document);


/*=========================================================
 END OF online.js — PART 2/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 3/8
 Purpose:
 - Product search
 - Category filtering
 - Subcategory filtering
 - Brand filtering
 - Product type filtering
 - Stock filtering
 - Featured filtering
 - Popular filtering
 - New-product filtering
 - Search aliases
 - Combined filtering

 Continues directly from:
 online.js — Part 1/8
 online.js — Part 2/8
=========================================================*/

(function (window, document) {

    "use strict";


    /*=====================================================
      36. STORE CONNECTION
    =====================================================*/

    const STORE =
        window.NEXPAK_ONLINE;


    if (!STORE) {

        console.error(
            "[NEXPAK ONLINE] Part 3 could not start. " +
            "Parts 1 and 2 must load first."
        );

        return;
    }


    const helpers =
        STORE.helpers;


    /*=====================================================
      37. SEARCHABLE PRODUCT CONTENT
    =====================================================*/

    function getSearchableText(product) {

        if (!product) {
            return "";
        }


        const searchableFields = [

            product.id,
            product.productId,
            product.productID,

            product.sku,
            product.SKU,

            product.name,
            product.productName,
            product.title,

            product.brand,
            product.manufacturer,

            product.category,
            product.mainCategory,

            product.subcategory,
            product.subCategory,

            product.productType,
            product.type,

            product.description,
            product.shortDescription,
            product.summary,

            product.tags,
            product.keywords,

            product.features,
            product.specifications,

            product.compatibility,

            product.model,
            product.series,

            product.code
        ];


        let text = "";


        searchableFields.forEach(function (field) {

            if (Array.isArray(field)) {

                text += " " +
                    field.join(" ");

            } else if (
                field !== null &&
                field !== undefined
            ) {

                text += " " +
                    String(field);
            }

        });


        return helpers.safeLower(text);
    }


    /*=====================================================
      38. SEARCH ALIAS MATCHING
    =====================================================*/

    function getSearchAliases() {

        return STORE.database.aliases || {};
    }


    function getAliasesForTerm(term) {

        const aliases =
            getSearchAliases();


        const normalizedTerm =
            helpers.safeLower(term);


        if (!normalizedTerm) {
            return [];
        }


        /*
         * Supported structures:
         *
         * {
         *   cctv: ["camera", "dvr", ...]
         * }
         *
         * or
         *
         * {
         *   CCTV: "camera"
         * }
         */

        const matched = [];


        Object.keys(aliases).forEach(function (key) {

            const normalizedKey =
                helpers.safeLower(key);


            let values =
                aliases[key];


            if (!Array.isArray(values)) {

                values = [
                    values
                ];
            }


            const normalizedValues =
                values
                    .map(function (value) {
                        return helpers.safeLower(value);
                    })
                    .filter(Boolean);


            if (
                normalizedKey === normalizedTerm ||
                normalizedValues.indexOf(normalizedTerm) !== -1
            ) {

                matched.push(
                    normalizedKey
                );


                normalizedValues.forEach(function (value) {

                    if (
                        matched.indexOf(value) === -1
                    ) {

                        matched.push(value);
                    }

                });
            }

        });


        return matched;
    }


    /*=====================================================
      39. SEARCH TERM MATCHING
    =====================================================*/

    function productMatchesSearch(
        product,
        searchTerm
    ) {

        const term =
            helpers.safeLower(searchTerm);


        if (!term) {
            return true;
        }


        if (
            term.length <
            STORE.config.minimumSearchLength
        ) {
            return true;
        }


        const searchableText =
            getSearchableText(product);


        /*
         * Direct search.
         */

        if (
            searchableText.indexOf(term) !== -1
        ) {

            return true;
        }


        /*
         * Alias search.
         */

        const aliases =
            getAliasesForTerm(term);


        if (!aliases.length) {
            return false;
        }


        return aliases.some(function (alias) {

            return searchableText.indexOf(alias) !== -1;

        });
    }


    /*=====================================================
      40. MULTI-WORD SEARCH
    =====================================================*/

    function productMatchesMultiWordSearch(
        product,
        searchTerm
    ) {

        const term =
            helpers.safeLower(searchTerm);


        if (!term) {
            return true;
        }


        /*
         * First attempt the complete phrase.
         */

        if (
            productMatchesSearch(
                product,
                term
            )
        ) {

            return true;
        }


        /*
         * Then check individual meaningful words.
         *
         * Example:
         * "Dahua 8 channel"
         *
         * A product can match all terms even when they
         * aren't stored next to one another.
         */

        const words =
            term
                .split(/\s+/)
                .map(function (word) {
                    return word.trim();
                })
                .filter(function (word) {
                    return word.length >= 2;
                });


        if (!words.length) {
            return true;
        }


        const searchableText =
            getSearchableText(product);


        return words.every(function (word) {

            if (
                searchableText.indexOf(word) !== -1
            ) {

                return true;
            }


            const aliases =
                getAliasesForTerm(word);


            if (!aliases.length) {
                return false;
            }


            return aliases.some(function (alias) {

                return searchableText.indexOf(alias) !== -1;

            });

        });
    }


    /*=====================================================
      41. GENERIC VALUE MATCHER
    =====================================================*/

    function valueMatches(
        productValue,
        selectedValue
    ) {

        const selected =
            helpers.safeLower(selectedValue);


        if (
            !selected ||
            selected === "all" ||
            selected === "*" ||
            selected === "any"
        ) {

            return true;
        }


        if (Array.isArray(productValue)) {

            return productValue.some(function (value) {

                return valueMatches(
                    value,
                    selected
                );

            });
        }


        return (
            helpers.safeLower(productValue) ===
            selected
        );
    }


    /*=====================================================
      42. CATEGORY MATCHING
    =====================================================*/

    function productMatchesCategory(
        product,
        category
    ) {

        if (
            !category ||
            category === "all"
        ) {

            return true;
        }


        const selected =
            helpers.safeLower(category);


        const productCategory =
            helpers.safeLower(
                helpers.getProductCategory(product)
            );


        if (
            productCategory === selected
        ) {

            return true;
        }


        /*
         * Category aliases from database.
         */

        const aliases =
            getAliasesForTerm(selected);


        if (!aliases.length) {
            return false;
        }


        return aliases.some(function (alias) {

            return (
                productCategory ===
                helpers.safeLower(alias)
            );

        });
    }


    /*=====================================================
      43. SUBCATEGORY MATCHING
    =====================================================*/

    function productMatchesSubcategory(
        product,
        subcategory
    ) {

        if (
            !subcategory ||
            subcategory === "all"
        ) {

            return true;
        }


        const productSubcategory =
            helpers.safeLower(
                product.subcategory ||
                product.subCategory ||
                ""
            );


        const selected =
            helpers.safeLower(subcategory);


        return (
            productSubcategory ===
            selected
        );
    }


    /*=====================================================
      44. BRAND MATCHING
    =====================================================*/

    function productMatchesBrand(
        product,
        brand
    ) {

        if (
            !brand ||
            brand === "all"
        ) {

            return true;
        }


        const productBrand =
            helpers.safeLower(
                helpers.getProductBrand(product)
            );


        const selected =
            helpers.safeLower(brand);


        if (
            productBrand === selected
        ) {

            return true;
        }


        /*
         * Allow products with multiple brands stored
         * as an array.
         */

        if (
            Array.isArray(product.brand)
        ) {

            return product.brand.some(function (item) {

                return (
                    helpers.safeLower(item) ===
                    selected
                );

            });
        }


        return false;
    }


    /*=====================================================
      45. PRODUCT TYPE MATCHING
    =====================================================*/

    function productMatchesType(
        product,
        productType
    ) {

        if (
            !productType ||
            productType === "all"
        ) {

            return true;
        }


        const selected =
            helpers.safeLower(productType);


        const actual =
            helpers.safeLower(
                product.productType ||
                product.type ||
                ""
            );


        return actual === selected;
    }


    /*=====================================================
      46. STOCK STATUS MATCHING
    =====================================================*/

    function productMatchesStock(
        product,
        stockStatus
    ) {

        if (
            !stockStatus ||
            stockStatus === "all"
        ) {

            return true;
        }


        const actual =
            helpers.safeLower(
                product.stockStatus ||
                product.stock ||
                product.availability ||
                ""
            );


        const selected =
            helpers.safeLower(stockStatus);


        return (
            actual === selected
        );
    }


    /*=====================================================
      47. FEATURED MATCHING
    =====================================================*/

    function productIsFeatured(product) {

        if (!product) {
            return false;
        }


        return (
            product.featured === true ||
            product.isFeatured === true ||
            product.featuredProduct === true
        );
    }


    function productMatchesFeatured(
        product,
        enabled
    ) {

        if (!enabled) {
            return true;
        }


        return productIsFeatured(product);
    }


    /*=====================================================
      48. POPULAR MATCHING
    =====================================================*/

    function productIsPopular(product) {

        if (!product) {
            return false;
        }


        return (
            product.popular === true ||
            product.isPopular === true ||
            product.popularProduct === true ||
            product.bestSeller === true ||
            product.bestseller === true
        );
    }


    function productMatchesPopular(
        product,
        enabled
    ) {

        if (!enabled) {
            return true;
        }


        return productIsPopular(product);
    }


    /*=====================================================
      49. NEW PRODUCT MATCHING
    =====================================================*/

    function productIsNew(product) {

        if (!product) {
            return false;
        }


        return (
            product.new === true ||
            product.isNew === true ||
            product.newProduct === true
        );
    }


    function productMatchesNew(
        product,
        enabled
    ) {

        if (!enabled) {
            return true;
        }


        return productIsNew(product);
    }


    /*=====================================================
      50. COMPLETE PRODUCT FILTER
    =====================================================*/

    function productPassesFilters(
        product,
        state
    ) {

        if (!product) {
            return false;
        }


        /*
         * Search
         */

        if (
            !productMatchesMultiWordSearch(
                product,
                state.searchTerm
            )
        ) {

            return false;
        }


        /*
         * Category
         */

        if (
            !productMatchesCategory(
                product,
                state.category
            )
        ) {

            return false;
        }


        /*
         * Subcategory
         */

        if (
            !productMatchesSubcategory(
                product,
                state.subcategory
            )
        ) {

            return false;
        }


        /*
         * Brand
         */

        if (
            !productMatchesBrand(
                product,
                state.brand
            )
        ) {

            return false;
        }


        /*
         * Product type
         */

        if (
            !productMatchesType(
                product,
                state.productType
            )
        ) {

            return false;
        }


        /*
         * Stock
         */

        if (
            !productMatchesStock(
                product,
                state.stockStatus
            )
        ) {

            return false;
        }


        /*
         * Featured
         */

        if (
            !productMatchesFeatured(
                product,
                state.featuredOnly
            )
        ) {

            return false;
        }


        /*
         * Popular
         */

        if (
            !productMatchesPopular(
                product,
                state.popularOnly
            )
        ) {

            return false;
        }


        /*
         * New
         */

        if (
            !productMatchesNew(
                product,
                state.newOnly
            )
        ) {

            return false;
        }


        return true;
    }


    /*=====================================================
      51. APPLY ALL FILTERS
    =====================================================*/

    function applyFilters(options) {

        const state =
            STORE.state;


        const settings =
            options || {};


        /*
         * Optional state updates.
         *
         * This allows:
         *
         * STORE.filters.apply({
         *     category: "CCTV"
         * });
         */

        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "searchTerm"
            )
        ) {

            state.searchTerm =
                helpers.safeString(
                    settings.searchTerm
                );
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "category"
            )
        ) {

            state.category =
                helpers.safeString(
                    settings.category
                ) || "all";
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "subcategory"
            )
        ) {

            state.subcategory =
                helpers.safeString(
                    settings.subcategory
                ) || "all";
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "brand"
            )
        ) {

            state.brand =
                helpers.safeString(
                    settings.brand
                ) || "all";
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "productType"
            )
        ) {

            state.productType =
                helpers.safeString(
                    settings.productType
                ) || "all";
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "stockStatus"
            )
        ) {

            state.stockStatus =
                helpers.safeString(
                    settings.stockStatus
                ) || "all";
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "featuredOnly"
            )
        ) {

            state.featuredOnly =
                Boolean(
                    settings.featuredOnly
                );
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "popularOnly"
            )
        ) {

            state.popularOnly =
                Boolean(
                    settings.popularOnly
                );
        }


        if (
            Object.prototype.hasOwnProperty.call(
                settings,
                "newOnly"
            )
        ) {

            state.newOnly =
                Boolean(
                    settings.newOnly
                );
        }


        /*
         * Filtering starts from the complete database.
         */

        const products =
            STORE.state.allProducts;


        const filtered =
            products.filter(function (product) {

                return productPassesFilters(
                    product,
                    state
                );

            });


        STORE.state.visibleProducts =
            filtered;


        STORE.state.filteredProducts =
            filtered.length;


        /*
         * New filter result starts at page 1.
         *
         * Part 4 will take over pagination.
         */

        STORE.state.currentPage = 1;


        STORE.meta.lastFilterAt =
            new Date().toISOString();


        /*
         * Render current filtered collection.
         */

        if (
            STORE.products &&
            typeof STORE.products.render ===
            "function"
        ) {

            STORE.products.render(
                filtered
            );
        }


        /*
         * Search-specific metadata.
         */

        if (state.searchTerm) {

            STORE.meta.lastSearchAt =
                new Date().toISOString();
        }


        /*
         * Notify the rest of the store.
         */

        document.dispatchEvent(
            new CustomEvent(
                "nexpak:products-filtered",
                {
                    detail: {
                        products: filtered,
                        count: filtered.length,
                        state: state
                    }
                }
            )
        );


        return filtered;
    }


    /*=====================================================
      52. SEARCH
    =====================================================*/

    function search(searchTerm) {

        const term =
            helpers.safeString(searchTerm);


        STORE.state.searchTerm =
            term;


        return applyFilters();
    }


    /*=====================================================
      53. CATEGORY FILTER
    =====================================================*/

    function setCategory(category) {

        STORE.state.category =
            helpers.safeString(category) ||
            "all";


        /*
         * Reset subcategory when main category changes.
         */

        STORE.state.subcategory =
            "all";


        return applyFilters();
    }


    /*=====================================================
      54. SUBCATEGORY FILTER
    =====================================================*/

    function setSubcategory(subcategory) {

        STORE.state.subcategory =
            helpers.safeString(subcategory) ||
            "all";


        return applyFilters();
    }


    /*=====================================================
      55. BRAND FILTER
    =====================================================*/

    function setBrand(brand) {

        STORE.state.brand =
            helpers.safeString(brand) ||
            "all";


        return applyFilters();
    }


    /*=====================================================
      56. PRODUCT TYPE FILTER
    =====================================================*/

    function setProductType(productType) {

        STORE.state.productType =
            helpers.safeString(productType) ||
            "all";


        return applyFilters();
    }


    /*=====================================================
      57. STOCK FILTER
    =====================================================*/

    function setStockStatus(stockStatus) {

        STORE.state.stockStatus =
            helpers.safeString(stockStatus) ||
            "all";


        return applyFilters();
    }


    /*=====================================================
      58. SPECIAL COLLECTION FILTERS
    =====================================================*/

    function setFeaturedOnly(enabled) {

        STORE.state.featuredOnly =
            Boolean(enabled);


        return applyFilters();
    }


    function setPopularOnly(enabled) {

        STORE.state.popularOnly =
            Boolean(enabled);


        return applyFilters();
    }


    function setNewOnly(enabled) {

        STORE.state.newOnly =
            Boolean(enabled);


        return applyFilters();
    }


    /*=====================================================
      59. CLEAR FILTERS
    =====================================================*/

    function clearFilters() {

        STORE.state.searchTerm =
            "";

        STORE.state.category =
            "all";

        STORE.state.subcategory =
            "all";

        STORE.state.brand =
            "all";

        STORE.state.productType =
            "all";

        STORE.state.stockStatus =
            "all";

        STORE.state.featuredOnly =
            false;

        STORE.state.popularOnly =
            false;

        STORE.state.newOnly =
            false;

        STORE.state.currentPage =
            1;


        return applyFilters();
    }


    /*=====================================================
      60. ACTIVE FILTER SUMMARY
    =====================================================*/

    function getActiveFilters() {

        const state =
            STORE.state;


        const filters = [];


        if (state.searchTerm) {

            filters.push({
                type: "search",
                value: state.searchTerm
            });
        }


        if (
            state.category &&
            state.category !== "all"
        ) {

            filters.push({
                type: "category",
                value: state.category
            });
        }


        if (
            state.subcategory &&
            state.subcategory !== "all"
        ) {

            filters.push({
                type: "subcategory",
                value: state.subcategory
            });
        }


        if (
            state.brand &&
            state.brand !== "all"
        ) {

            filters.push({
                type: "brand",
                value: state.brand
            });
        }


        if (
            state.productType &&
            state.productType !== "all"
        ) {

            filters.push({
                type: "productType",
                value: state.productType
            });
        }


        if (
            state.stockStatus &&
            state.stockStatus !== "all"
        ) {

            filters.push({
                type: "stockStatus",
                value: state.stockStatus
            });
        }


        if (state.featuredOnly) {

            filters.push({
                type: "featured",
                value: true
            });
        }


        if (state.popularOnly) {

            filters.push({
                type: "popular",
                value: true
            });
        }


        if (state.newOnly) {

            filters.push({
                type: "new",
                value: true
            });
        }


        return filters;
    }


    /*=====================================================
      61. FILTER STATE
    =====================================================*/

    function getFilterState() {

        return {

            searchTerm:
                STORE.state.searchTerm,

            category:
                STORE.state.category,

            subcategory:
                STORE.state.subcategory,

            brand:
                STORE.state.brand,

            productType:
                STORE.state.productType,

            stockStatus:
                STORE.state.stockStatus,

            featuredOnly:
                STORE.state.featuredOnly,

            popularOnly:
                STORE.state.popularOnly,

            newOnly:
                STORE.state.newOnly
        };
    }


    /*=====================================================
      62. FILTER DOM EVENTS
    =====================================================*/

    function initializeFilterEvents() {

        const elements =
            STORE.elements;


        /*-----------------------------------------------
          Search input
        -----------------------------------------------*/

        if (elements.search) {

            elements.search.addEventListener(
                "input",
                function (event) {

                    search(
                        event.target.value
                    );

                }
            );
        }


        /*-----------------------------------------------
          Search form
        -----------------------------------------------*/

        if (elements.searchForm) {

            elements.searchForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (elements.search) {

                        search(
                            elements.search.value
                        );
                    }

                }
            );
        }


        /*-----------------------------------------------
          Category
        -----------------------------------------------*/

        if (elements.categoryFilter) {

            elements.categoryFilter.addEventListener(
                "change",
                function (event) {

                    setCategory(
                        event.target.value
                    );

                }
            );
        }


        /*-----------------------------------------------
          Brand
        -----------------------------------------------*/

        if (elements.brandFilter) {

            elements.brandFilter.addEventListener(
                "change",
                function (event) {

                    setBrand(
                        event.target.value
                    );

                }
            );
        }


        /*-----------------------------------------------
          Product type
        -----------------------------------------------*/

        if (elements.productTypeFilter) {

            elements.productTypeFilter.addEventListener(
                "change",
                function (event) {

                    setProductType(
                        event.target.value
                    );

                }
            );
        }


        /*-----------------------------------------------
          Sorting is handled in Part 4.
          We intentionally do not attach sorting here.
        -----------------------------------------------*/
    }


    /*=====================================================
      63. PUBLIC FILTER API
    =====================================================*/

    STORE.filters = {

        apply:
            applyFilters,

        search:
            search,

        category:
            setCategory,

        subcategory:
            setSubcategory,

        brand:
            setBrand,

        productType:
            setProductType,

        stock:
            setStockStatus,

        featured:
            setFeaturedOnly,

        popular:
            setPopularOnly,

        newest:
            setNewOnly,

        clear:
            clearFilters,

        active:
            getActiveFilters,

        state:
            getFilterState,

        matchesSearch:
            productMatchesSearch,

        matchesCategory:
            productMatchesCategory,

        matchesBrand:
            productMatchesBrand,

        matchesType:
            productMatchesType,

        matchesStock:
            productMatchesStock,

        isFeatured:
            productIsFeatured,

        isPopular:
            productIsPopular,

        isNew:
            productIsNew
    };


    /*=====================================================
      64. INITIALIZE FILTER EVENTS
    =====================================================*/

    initializeFilterEvents();


    /*=====================================================
      65. PART 3 READY
    =====================================================*/

    helpers.log(
        "online.js Part 3 loaded — Search & Filtering Engine ready."
    );


})(window, document);


/*=========================================================
 END OF online.js — PART 3/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 4/8
 Purpose:
 - Product sorting
 - Pagination
 - Products per page
 - Grid/List view
 - Pagination controls
 - View controls
 - Sort state management

 Continues directly from:
 online.js — Part 1/8
 online.js — Part 2/8
 online.js — Part 3/8
=========================================================*/

(function (window, document) {

    "use strict";


    /*=====================================================
      66. STORE CONNECTION
    =====================================================*/

    const STORE =
        window.NEXPAK_ONLINE;


    if (!STORE) {

        console.error(
            "[NEXPAK ONLINE] Part 4 could not start. " +
            "Parts 1–3 must load first."
        );

        return;
    }


    const helpers =
        STORE.helpers;


    /*=====================================================
      67. SORTING HELPERS
    =====================================================*/


    function getNumericPrice(product) {

        if (!product) {
            return null;
        }


        const price =
            Number(product.price);


        if (
            !Number.isFinite(price)
        ) {

            return null;
        }


        return price;
    }


    function getProductTimestamp(product) {

        if (!product) {
            return 0;
        }


        const possibleDates = [

            product.dateAdded,
            product.addedDate,

            product.createdAt,
            product.createdDate,

            product.updatedAt,
            product.updatedDate,

            product.releaseDate,

            product.date
        ];


        for (
            let i = 0;
            i < possibleDates.length;
            i++
        ) {

            const value =
                possibleDates[i];


            if (!value) {
                continue;
            }


            const timestamp =
                new Date(value).getTime();


            if (
                Number.isFinite(timestamp)
            ) {

                return timestamp;
            }
        }


        return 0;
    }


    function getPopularityScore(product) {

        if (!product) {
            return 0;
        }


        const possibleScores = [

            product.popularity,

            product.popularityScore,

            product.sales,

            product.salesCount,

            product.orders,

            product.orderCount,

            product.views,

            product.viewCount
        ];


        for (
            let i = 0;
            i < possibleScores.length;
            i++
        ) {

            const score =
                Number(
                    possibleScores[i]
                );


            if (
                Number.isFinite(score)
            ) {

                return score;
            }
        }


        /*
         * Boolean popular/bestseller products receive
         * a small fallback score.
         */

        if (
            product.popular === true ||
            product.isPopular === true ||
            product.bestSeller === true ||
            product.bestseller === true
        ) {

            return 1;
        }


        return 0;
    }


    function getFeaturedScore(product) {

        if (!product) {
            return 0;
        }


        return (
            product.featured === true ||
            product.isFeatured === true ||
            product.featuredProduct === true
        )
            ? 1
            : 0;
    }


    function getStockScore(product) {

        if (!product) {
            return 0;
        }


        const status =
            helpers.safeLower(
                product.stockStatus ||
                product.stock ||
                product.availability ||
                ""
            );


        switch (status) {

            case "in-stock":
            case "instock":
            case "available":
                return 4;

            case "low-stock":
            case "lowstock":
                return 3;

            case "pre-order":
            case "preorder":
                return 2;

            case "out-of-stock":
            case "outofstock":
            case "unavailable":
                return 1;

            default:
                return 0;
        }
    }


    /*=====================================================
      68. PRODUCT COMPARISON
    =====================================================*/


    function compareText(
        first,
        second,
        direction
    ) {

        const a =
            helpers.safeLower(first);


        const b =
            helpers.safeLower(second);


        const result =
            a.localeCompare(
                b,
                "en",
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );


        return (
            direction === "desc"
                ? result * -1
                : result
        );
    }


    function compareNumbers(
        first,
        second,
        direction
    ) {

        const a =
            Number(first);


        const b =
            Number(second);


        const result =
            a - b;


        return (
            direction === "desc"
                ? result * -1
                : result
        );
    }


    /*=====================================================
      69. SORT COLLECTION
    =====================================================*/


    function sortProducts(
        products,
        sortBy
    ) {

        const collection =
            Array.isArray(products)
                ? products.slice()
                : [];


        const sort =
            helpers.safeLower(
                sortBy ||
                STORE.state.sortBy ||
                "default"
            );


        /*
         * Keep original order for default sorting.
         */

        if (
            sort === "default" ||
            sort === "relevance" ||
            sort === ""
        ) {

            return collection;
        }


        /*-----------------------------------------------
          Name A-Z
        -----------------------------------------------*/

        if (
            sort === "name-asc" ||
            sort === "name-a-z" ||
            sort === "az" ||
            sort === "a-z"
        ) {

            return collection.sort(
                function (a, b) {

                    return compareText(
                        helpers.getProductName(a),
                        helpers.getProductName(b),
                        "asc"
                    );

                }
            );
        }


        /*-----------------------------------------------
          Name Z-A
        -----------------------------------------------*/

        if (
            sort === "name-desc" ||
            sort === "name-z-a" ||
            sort === "za" ||
            sort === "z-a"
        ) {

            return collection.sort(
                function (a, b) {

                    return compareText(
                        helpers.getProductName(a),
                        helpers.getProductName(b),
                        "desc"
                    );

                }
            );
        }


        /*-----------------------------------------------
          Price low → high
        -----------------------------------------------*/

        if (
            sort === "price-low" ||
            sort === "price-asc" ||
            sort === "price-low-high" ||
            sort === "low-price"
        ) {

            return collection.sort(
                function (a, b) {

                    const priceA =
                        getNumericPrice(a);

                    const priceB =
                        getNumericPrice(b);


                    /*
                     * Products without confirmed prices are
                     * placed at the end rather than treated
                     * as R0.
                     */

                    if (
                        priceA === null &&
                        priceB === null
                    ) {

                        return 0;
                    }


                    if (
                        priceA === null
                    ) {

                        return 1;
                    }


                    if (
                        priceB === null
                    ) {

                        return -1;
                    }


                    return compareNumbers(
                        priceA,
                        priceB,
                        "asc"
                    );

                }
            );
        }


        /*-----------------------------------------------
          Price high → low
        -----------------------------------------------*/

        if (
            sort === "price-high" ||
            sort === "price-desc" ||
            sort === "price-high-low" ||
            sort === "high-price"
        ) {

            return collection.sort(
                function (a, b) {

                    const priceA =
                        getNumericPrice(a);

                    const priceB =
                        getNumericPrice(b);


                    if (
                        priceA === null &&
                        priceB === null
                    ) {

                        return 0;
                    }


                    if (
                        priceA === null
                    ) {

                        return 1;
                    }


                    if (
                        priceB === null
                    ) {

                        return -1;
                    }


                    return compareNumbers(
                        priceA,
                        priceB,
                        "desc"
                    );

                }
            );
        }


        /*-----------------------------------------------
          Newest
        -----------------------------------------------*/

        if (
            sort === "newest" ||
            sort === "new" ||
            sort === "latest" ||
            sort === "date-desc"
        ) {

            return collection.sort(
                function (a, b) {

                    return (
                        getProductTimestamp(b) -
                        getProductTimestamp(a)
                    );

                }
            );
        }


        /*-----------------------------------------------
          Oldest
        -----------------------------------------------*/

        if (
            sort === "oldest" ||
            sort === "date-asc"
        ) {

            return collection.sort(
                function (a, b) {

                    return (
                        getProductTimestamp(a) -
                        getProductTimestamp(b)
                    );

                }
            );
        }


        /*-----------------------------------------------
          Popular
        -----------------------------------------------*/

        if (
            sort === "popular" ||
            sort === "popularity" ||
            sort === "best-selling" ||
            sort === "bestseller"
        ) {

            return collection.sort(
                function (a, b) {

                    return (
                        getPopularityScore(b) -
                        getPopularityScore(a)
                    );

                }
            );
        }


        /*-----------------------------------------------
          Featured
        -----------------------------------------------*/

        if (
            sort === "featured"
        ) {

            return collection.sort(
                function (a, b) {

                    return (
                        getFeaturedScore(b) -
                        getFeaturedScore(a)
                    );

                }
            );
        }


        /*-----------------------------------------------
          Stock available first
        -----------------------------------------------*/

        if (
            sort === "stock" ||
            sort === "availability" ||
            sort === "in-stock"
        ) {

            return collection.sort(
                function (a, b) {

                    return (
                        getStockScore(b) -
                        getStockScore(a)
                    );

                }
            );
        }


        /*
         * Unknown sorting option.
         *
         * Safely return the collection without changing
         * its order.
         */

        return collection;
    }


    /*=====================================================
      70. PAGINATION CALCULATIONS
    =====================================================*/


    function getTotalPages(
        totalItems,
        itemsPerPage
    ) {

        const total =
            Number(totalItems);


        const perPage =
            Number(itemsPerPage);


        if (
            !Number.isFinite(total) ||
            total <= 0
        ) {

            return 1;
        }


        if (
            !Number.isFinite(perPage) ||
            perPage <= 0
        ) {

            return 1;
        }


        return Math.max(
            1,
            Math.ceil(
                total / perPage
            )
        );
    }


    function getPageStart(
        page,
        itemsPerPage
    ) {

        return (
            (page - 1) *
            itemsPerPage
        );
    }


    function getPageEnd(
        page,
        itemsPerPage
    ) {

        return (
            page *
            itemsPerPage
        );
    }


    /*=====================================================
      71. PAGINATE COLLECTION
    =====================================================*/


    function paginateProducts(
        products,
        page,
        itemsPerPage
    ) {

        const collection =
            Array.isArray(products)
                ? products
                : [];


        const perPage =
            Number(itemsPerPage) > 0
                ? Number(itemsPerPage)
                : STORE.config.defaultProductsPerPage;


        const totalPages =
            getTotalPages(
                collection.length,
                perPage
            );


        let currentPage =
            Number(page);


        if (
            !Number.isFinite(currentPage) ||
            currentPage < 1
        ) {

            currentPage = 1;
        }


        if (
            currentPage > totalPages
        ) {

            currentPage =
                totalPages;
        }


        const start =
            getPageStart(
                currentPage,
                perPage
            );


        const end =
            getPageEnd(
                currentPage,
                perPage
            );


        return {

            products:
                collection.slice(
                    start,
                    end
                ),

            page:
                currentPage,

            perPage:
                perPage,

            totalItems:
                collection.length,

            totalPages:
                totalPages,

            startIndex:
                collection.length
                    ? start
                    : 0,

            endIndex:
                collection.length
                    ? Math.min(
                        end,
                        collection.length
                    )
                    : 0
        };
    }


    /*=====================================================
      72. BUILD CURRENT PRODUCT PAGE
    =====================================================*/


    function getCurrentProductPage() {

        /*
         * Start with the filtered products produced by
         * Part 3.
         */

        const filtered =
            STORE.state.visibleProducts || [];


        /*
         * Sort without modifying the original filtered
         * array.
         */

        const sorted =
            sortProducts(
                filtered,
                STORE.state.sortBy
            );


        /*
         * Store the sorted collection so later parts can
         * access the current ordering.
         */

        STORE.state.sortedProducts =
            sorted;


        const pagination =
            paginateProducts(
                sorted,
                STORE.state.currentPage,
                STORE.state.productsPerPage
            );


        /*
         * Keep pagination information available globally.
         */

        STORE.state.totalPages =
            pagination.totalPages;


        STORE.state.pageStart =
            pagination.startIndex;


        STORE.state.pageEnd =
            pagination.endIndex;


        STORE.state.currentPage =
            pagination.page;


        return pagination;
    }


    /*=====================================================
      73. RENDER CURRENT PAGE
    =====================================================*/


    function renderCurrentPage() {

        const pagination =
            getCurrentProductPage();


        /*
         * Part 2's renderer handles the actual product cards.
         */

        if (
            STORE.products &&
            typeof STORE.products.render ===
            "function"
        ) {

            STORE.products.render(
                pagination.products
            );
        }


        renderPagination(
            pagination
        );


        updateResultsSummary(
            pagination
        );


        return pagination;
    }


    /*=====================================================
      74. PAGINATION BUTTONS
    =====================================================*/


    function createPaginationButton(
        label,
        page,
        disabled,
        active
    ) {

        const safePage =
            Number(page);


        return `
            <button
                type="button"
                class="online-pagination-button${
                    active
                        ? " active"
                        : ""
                }"
                data-pagination-page="${safePage}"
                ${disabled ? "disabled" : ""}
                aria-label="Go to page ${safePage}"
                ${
                    active
                        ? 'aria-current="page"'
                        : ""
                }>

                ${helpers.escapeHTML(label)}

            </button>
        `;
    }


    /*=====================================================
      75. PAGE NUMBER RANGE
    =====================================================*/

function setPage(page) {

        let requestedPage =
            Number(page);


        if (
            !Number.isFinite(
                requestedPage
            )
        ) {

            requestedPage = 1;
        }


        requestedPage =
            Math.floor(
                requestedPage
            );


        const totalPages =
            getTotalPages();


        requestedPage =
            Math.max(
                1,
                Math.min(
                    requestedPage,
                    totalPages
                )
            );


        STORE.state.currentPage =
            requestedPage;


        renderCurrentPage();


        document.dispatchEvent(
            new CustomEvent(
                "nexpak:page-changed",
                {
                    detail: {
                        page:
                            requestedPage,

                        totalPages:
                            totalPages
                    }
                }
            )
        );


        return requestedPage;
    }


    /*=====================================================
      76. NEXT PAGE
    =====================================================*/


    function nextPage() {

        const current =
            STORE.state.currentPage;


        const total =
            getTotalPages();


        if (
            current >= total
        ) {

            return current;
        }


        return setPage(
            current + 1
        );
    }


    /*=====================================================
      77. PREVIOUS PAGE
    =====================================================*/


    function previousPage() {

        const current =
            STORE.state.currentPage;


        if (current <= 1) {
            return current;
        }


        return setPage(
            current - 1
        );
    }


    /*=====================================================
      78. FIRST / LAST PAGE
    =====================================================*/


    function firstPage() {

        return setPage(1);
    }


    function lastPage() {

        return setPage(
            getTotalPages()
        );
    }


    /*=====================================================
      79. PRODUCTS PER PAGE
    =====================================================*/


    function setProductsPerPage(
        amount
    ) {

        let perPage =
            Number(amount);


        if (
            !Number.isFinite(perPage) ||
            perPage <= 0
        ) {

            perPage =
                STORE.config.defaultProductsPerPage;
        }


        /*
         * Protect against accidental huge values.
         */

        perPage =
            Math.min(
                Math.floor(perPage),
                100
            );


        STORE.state.productsPerPage =
            perPage;


        STORE.state.currentPage =
            1;


        renderCurrentPage();


        document.dispatchEvent(
            new CustomEvent(
                "nexpak:products-per-page-changed",
                {
                    detail: {
                        productsPerPage:
                            perPage
                    }
                }
            )
        );


        return perPage;
    }


    /*=====================================================
      80. PAGE NUMBER RANGE
    =====================================================*/


    function getPageNumbers() {

        const totalPages =
            getTotalPages();


        const currentPage =
            STORE.state.currentPage;


        /*
         * Small stores:
         * show every page.
         */

        if (totalPages <= 7) {

            return Array.from(
                {
                    length:
                        totalPages
                },
                function (_, index) {

                    return index + 1;

                }
            );
        }


        const pages = [];


        pages.push(1);


        /*
         * Near beginning
         */

        if (currentPage <= 4) {

            pages.push(2);
            pages.push(3);
            pages.push(4);
            pages.push(5);

            pages.push("...");

            pages.push(totalPages);

            return pages;
        }


        /*
         * Near end
         */

        if (
            currentPage >=
            totalPages - 3
        ) {

            pages.push("...");

            pages.push(
                totalPages - 4
            );

            pages.push(
                totalPages - 3
            );

            pages.push(
                totalPages - 2
            );

            pages.push(
                totalPages - 1
            );

            pages.push(
                totalPages
            );

            return pages;
        }


        /*
         * Middle
         */

        pages.push("...");

        pages.push(
            currentPage - 1
        );

        pages.push(
            currentPage
        );

        pages.push(
            currentPage + 1
        );

        pages.push("...");

        pages.push(totalPages);


        return pages;
    }


    /*=====================================================
      81. RENDER CURRENT PAGE
    =====================================================*/


    function renderCurrentPage() {

        const products =
            getCurrentPageProducts();


        /*
         * Part 2 handles actual product cards.
         */

        if (
            STORE.products &&
            typeof STORE.products.render ===
            "function"
        ) {

            STORE.products.render(
                products
            );
        }


        renderPagination();


        updatePaginationSummary();


        return products;
    }


    /*=====================================================
      82. PAGINATION HTML
    =====================================================*/


    function renderPagination() {

        const container =
            STORE.elements.pagination;


        if (!container) {
            return;
        }


        const totalPages =
            getTotalPages();


        const currentPage =
            STORE.state.currentPage;


        /*
         * No pagination required for one page.
         */

        if (totalPages <= 1) {

            container.innerHTML = "";

            return;
        }


        const pageNumbers =
            getPageNumbers();


        let html = `
            <nav
                class="online-pagination"
                aria-label="Product pagination">

                <button
                    type="button"
                    class="online-page-button online-page-first"
                    data-page-action="first"
                    ${currentPage === 1 ? "disabled" : ""}>
                    First
                </button>


                <button
                    type="button"
                    class="online-page-button online-page-prev"
                    data-page-action="previous"
                    ${currentPage === 1 ? "disabled" : ""}>
                    Previous
                </button>


                <div class="online-page-numbers">
        `;


        pageNumbers.forEach(function (page) {

            if (page === "...") {

                html += `
                    <span class="online-page-ellipsis">
                        …
                    </span>
                `;

                return;
            }


            html += `
                <button
                    type="button"
                    class="online-page-number
                    ${page === currentPage ? "active" : ""}"
                    data-page="${page}"
                    aria-current="${
                        page === currentPage
                            ? "page"
                            : "false"
                    }">

                    ${page}

                </button>
            `;
        });


        html += `
                </div>


                <button
                    type="button"
                    class="online-page-button online-page-next"
                    data-page-action="next"
                    ${currentPage === totalPages ? "disabled" : ""}>
                    Next
                </button>


                <button
                    type="button"
                    class="online-page-button online-page-last"
                    data-page-action="last"
                    ${currentPage === totalPages ? "disabled" : ""}>
                    Last
                </button>

            </nav>
        `;


        container.innerHTML =
            html;
    }


    /*=====================================================
      83. PAGINATION SUMMARY
    =====================================================*/


    function updatePaginationSummary() {

        const total =
            STORE.state.visibleProducts.length;


        const currentPage =
            STORE.state.currentPage;


        const perPage =
            STORE.state.productsPerPage;


        const totalPages =
            getTotalPages();


        const start =
            total === 0
                ? 0
                : getPageStart() + 1;


        const end =
            Math.min(
                getPageEnd(),
                total
            );


        /*
         * Existing product-count element is used when
         * available.
         */

        const countElement =
            STORE.elements.productCount;


        if (countElement) {

            if (total === 0) {

                countElement.textContent =
                    "0";

            } else {

                countElement.textContent =
                    `${start}–${end} of ${total}`;
            }
        }


        /*
         * Dispatch useful pagination information for
         * future UI components.
         */

        document.dispatchEvent(
            new CustomEvent(
                "nexpak:pagination-updated",
                {
                    detail: {
                        currentPage:
                            currentPage,

                        totalPages:
                            totalPages,

                        productsPerPage:
                            perPage,

                        totalProducts:
                            total,

                        start:
                            start,

                        end:
                            end
                    }
                }
            )
        );
    }


    /*=====================================================
      84. PAGINATION EVENTS
    =====================================================*/


    function handlePaginationClick(
        event
    ) {

        const pageButton =
            event.target.closest(
                "[data-page]"
            );


        if (pageButton) {

            const page =
                pageButton.getAttribute(
                    "data-page"
                );


            setPage(page);

            return;
        }


        const actionButton =
            event.target.closest(
                "[data-page-action]"
            );


        if (!actionButton) {
            return;
        }


        const action =
            actionButton.getAttribute(
                "data-page-action"
            );


        switch (action) {

            case "first":

                firstPage();

                break;


            case "previous":

                previousPage();

                break;


            case "next":

                nextPage();

                break;


            case "last":

                lastPage();

                break;
        }
    }


    /*=====================================================
      85. VIEW MODE
    =====================================================*/


    function setViewMode(
        mode
    ) {

        const requestedMode =
            helpers.safeLower(mode);


        let viewMode;


        if (
            requestedMode === "list" ||
            requestedMode === "list-view"
        ) {

            viewMode =
                "list";

        } else {

            viewMode =
                "grid";
        }


        STORE.state.viewMode =
            viewMode;


        applyViewModeToDOM();


        document.dispatchEvent(
            new CustomEvent(
                "nexpak:view-mode-changed",
                {
                    detail: {
                        viewMode:
                            viewMode
                    }
                }
            )
        );


        return viewMode;
    }


    /*=====================================================
      86. APPLY VIEW MODE TO DOM
    =====================================================*/


    function applyViewModeToDOM() {

        const mode =
            STORE.state.viewMode;


        const targets = [];


        if (STORE.elements.productGrid) {

            targets.push(
                STORE.elements.productGrid
            );
        }


        if (
            STORE.elements.productList &&
            targets.indexOf(
                STORE.elements.productList
            ) === -1
        ) {

            targets.push(
                STORE.elements.productList
            );
        }


        targets.forEach(function (element) {

            element.setAttribute(
                "data-view-mode",
                mode
            );


            element.classList.toggle(
                "online-view-grid",
                mode === "grid"
            );


            element.classList.toggle(
                "online-view-list",
                mode === "list"
            );
        });


        /*
         * Update view buttons if they exist.
         */

        document
            .querySelectorAll(
                "[data-view-mode]"
            )
            .forEach(function (button) {

                const buttonMode =
                    helpers.safeLower(
                        button.getAttribute(
                            "data-view-mode"
                        )
                    );


                /*
                 * Don't alter the actual product
                 * container's active state here.
                 */

                if (
                    button !== STORE.elements.productGrid &&
                    button !== STORE.elements.productList
                ) {

                    button.classList.toggle(
                        "active",
                        buttonMode === mode
                    );
                }

            });
    }


    /*=====================================================
      87. VIEW MODE EVENTS
    =====================================================*/


    function handleViewModeClick(
        event
    ) {

        const button =
            event.target.closest(
                "[data-view-mode]"
            );


        if (!button) {
            return;
        }


        /*
         * Ignore actual product containers.
         */

        if (
            button ===
            STORE.elements.productGrid ||
            button ===
            STORE.elements.productList
        ) {

            return;
        }


        const mode =
            button.getAttribute(
                "data-view-mode"
            );


        if (mode) {

            setViewMode(
                mode
            );
        }
    }


    /*=====================================================
      88. SORT CONTROL EVENTS
    =====================================================*/


    function initializeSortEvents() {

        const sortElement =
            STORE.elements.sort;


        if (!sortElement) {
            return;
        }


        sortElement.addEventListener(
            "change",
            function (event) {

                applySorting(
                    event.target.value
                );

            }
        );
    }


    /*=====================================================
      89. PAGINATION EVENTS INITIALIZATION
    =====================================================*/


    function initializePaginationEvents() {

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest(
                        "[data-page], [data-page-action]"
                    )
                ) {

                    handlePaginationClick(
                        event
                    );
                }
            }
        );


        document.addEventListener(
            "click",
            handleViewModeClick
        );
    }


    /*=====================================================
      90. SORT + PAGINATION PUBLIC API
    =====================================================*/


    STORE.sorting = {

        sort:
            sortProducts,

        apply:
            applySorting,

        comparator:
            createSortComparator,

        getPrice:
            getNumericPrice
    };


    STORE.pagination = {

        getTotalPages:
            getTotalPages,

        getPageStart:
            getPageStart,

        getPageEnd:
            getPageEnd,

        getCurrentProducts:
            getCurrentPageProducts,

        getPages:
            getPageNumbers,

        setPage:
            setPage,

        next:
            nextPage,

        previous:
            previousPage,

        first:
            firstPage,

        last:
            lastPage,

        setProductsPerPage:
            setProductsPerPage,

        render:
            renderPagination,

        renderCurrent:
            renderCurrentPage
    };


    STORE.view = {

        get:
            function () {
                return STORE.state.viewMode;
            },

        set:
            setViewMode,

        apply:
            applyViewModeToDOM
    };


    /*=====================================================
      91. INITIALIZE PART 4 EVENTS
    =====================================================*/

    initializeSortEvents();

    initializePaginationEvents();

    applyViewModeToDOM();


    /*=====================================================
      92. PART 4 READY
    =====================================================*/

    helpers.log(
        "online.js Part 4 loaded — Sorting, Pagination & View Controls ready."
    );


})(window, document);


/*=========================================================
 END OF online.js — PART 4/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 5/8
 Purpose:
 - Product selection
 - Product detail state
 - Product detail rendering
 - Product specifications
 - Product features
 - Product images
 - Product pricing/actions
 - Product detail modal/container support
 - Product navigation
 - Product history

 Continues directly from:
 online.js — Part 1/8
 online.js — Part 2/8
 online.js — Part 3/8
 online.js — Part 4/8
=========================================================*/

(function (window, document) {

    "use strict";


    /*=====================================================
      93. STORE CONNECTION
    =====================================================*/

    const STORE =
        window.NEXPAK_ONLINE;


    if (!STORE) {

        console.error(
            "[NEXPAK ONLINE] Part 5 could not start. " +
            "Parts 1–4 must load first."
        );

        return;
    }


    const helpers =
        STORE.helpers;


    /*=====================================================
      94. PRODUCT DETAIL STATE
    =====================================================*/

    if (!STORE.state.productDetails) {

        STORE.state.productDetails = {

            product: null,

            productID: null,

            quantity: 1,

            activeImage: 0,

            history: [],

            isOpen: false
        };
    }


    /*=====================================================
      95. PRODUCT LOOKUP
    =====================================================*/

    function findProduct(productID) {

        const requestedID =
            helpers.safeLower(
                productID
            );


        if (!requestedID) {
            return null;
        }


        const products =
            STORE.state.allProducts;


        return products.find(
            function (product) {

                const id =
                    helpers.safeLower(
                        helpers.getProductID(product)
                    );


                const sku =
                    helpers.safeLower(
                        helpers.getProductSKU(product)
                    );


                return (
                    id === requestedID ||
                    sku === requestedID
                );
            }
        ) || null;
    }


    /*=====================================================
      96. PRODUCT FIELD NORMALIZATION
    =====================================================*/

    function getProductFeatures(product) {

        if (!product) {
            return [];
        }


        const features =
            product.features ||
            product.keyFeatures ||
            product.key_features ||
            [];


        if (Array.isArray(features)) {

            return features
                .map(function (item) {

                    if (
                        item &&
                        typeof item === "object"
                    ) {

                        return helpers.safeString(
                            item.name ||
                            item.title ||
                            item.value ||
                            ""
                        );
                    }


                    return helpers.safeString(
                        item
                    );

                })
                .filter(Boolean);
        }


        if (
            typeof features === "string"
        ) {

            return features
                .split(/\n|•|;/)
                .map(function (item) {
                    return item.trim();
                })
                .filter(Boolean);
        }


        return [];
    }


    function getProductSpecifications(product) {

        if (!product) {
            return {};
        }


        const specifications =
            product.specifications ||
            product.specs ||
            product.attributes ||
            product.details ||
            {};


        if (
            specifications &&
            typeof specifications === "object" &&
            !Array.isArray(specifications)
        ) {

            return specifications;
        }


        return {};
    }


    function getProductImages(product) {

        if (!product) {
            return [];
        }


        const images = [];


        /*
         * Primary image.
         */

        const primaryImage =
            product.image ||
            product.imageUrl ||
            product.imageURL ||
            product.thumbnail ||
            "";


        if (
            typeof primaryImage === "string" &&
            primaryImage.trim()
        ) {

            images.push(
                primaryImage.trim()
            );
        }


        /*
         * Additional images.
         */

        if (Array.isArray(product.images)) {

            product.images.forEach(
                function (image) {

                    let imageURL = "";


                    if (
                        typeof image === "string"
                    ) {

                        imageURL =
                            image.trim();

                    } else if (
                        image &&
                        typeof image === "object"
                    ) {

                        imageURL =
                            image.url ||
                            image.src ||
                            image.image ||
                            "";
                    }


                    if (
                        imageURL &&
                        images.indexOf(
                            imageURL
                        ) === -1
                    ) {

                        images.push(
                            imageURL
                        );
                    }
                }
            );
        }


        return images;
    }


    function getProductLongDescription(product) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.longDescription ||
            product.long_description ||
            product.description ||
            product.details ||
            product.summary ||
            ""
        );
    }


    function getProductTags(product) {

        if (!product) {
            return [];
        }


        const tags =
            product.tags ||
            product.keywords ||
            [];


        if (Array.isArray(tags)) {

            return tags
                .map(function (tag) {
                    return helpers.safeString(tag);
                })
                .filter(Boolean);
        }


        if (
            typeof tags === "string"
        ) {

            return tags
                .split(",")
                .map(function (tag) {
                    return tag.trim();
                })
                .filter(Boolean);
        }


        return [];
    }


    /*=====================================================
      97. PRODUCT SELECTION
    =====================================================*/

    function selectProduct(
        productOrID,
        options
    ) {

        let product = null;


        /*
         * Accept either:
         *
         * selectProduct("SKU123")
         *
         * or
         *
         * selectProduct(productObject)
         */

        if (
            productOrID &&
            typeof productOrID === "object"
        ) {

            product =
                productOrID;

        } else {

            product =
                findProduct(
                    productOrID
                );
        }


        if (!product) {

            helpers.warn(
                "Unable to select product:",
                productOrID
            );

            return null;
        }


        const settings =
            options || {};


        const productID =
            helpers.getProductID(
                product
            );


        /*
         * Save previous selection.
         */

        const previousProduct =
            STORE.state.productDetails.product;


        if (
            previousProduct &&
            helpers.getProductID(
                previousProduct
            ) !== productID
        ) {

            STORE.state.productDetails.history.push(
                helpers.getProductID(
                    previousProduct
                )
            );


            /*
             * Keep history manageable.
             */

            if (
                STORE.state.productDetails.history.length >
                20
            ) {

                STORE.state.productDetails.history.shift();
            }
        }


        STORE.state.selectedProduct =
            product;


        STORE.state.productDetails.product =
            product;


        STORE.state.productDetails.productID =
            productID;


        STORE.state.productDetails.activeImage =
            0;


        STORE.state.productDetails.quantity =
            1;


        /*
         * Optionally render immediately.
         */

        if (
            settings.render !== false
        ) {

            renderProductDetails(
                settings.container
            );
        }


        /*
         * Notify the rest of the store.
         */

        document.dispatchEvent(
            new CustomEvent(
                "nexpak:product-selected",
                {
                    detail: {
                        product: product,
                        productID: productID
                    }
                }
            )
        );


        return product;
    }


    /*=====================================================
      98. PRODUCT DETAIL CONTAINER
    =====================================================*/

    function getDetailContainer(
        suppliedContainer
    ) {

        if (suppliedContainer) {

            if (
                typeof suppliedContainer ===
                "string"
            ) {

                return document.querySelector(
                    suppliedContainer
                );
            }


            if (
                suppliedContainer instanceof
                Element
            ) {

                return suppliedContainer;
            }
        }


        /*
         * Existing Part 1 reference.
         */

        if (
            STORE.elements.productDetails
        ) {

            return STORE.elements.productDetails;
        }


        /*
         * Flexible fallback selectors.
         */

        return document.querySelector(
            "#product-details, " +
            ".product-details, " +
            "[data-product-details]"
        );
    }


    /*=====================================================
      99. PRODUCT DETAIL IMAGE GALLERY
    =====================================================*/

    function renderImageGallery(
        product
    ) {

        const images =
            getProductImages(
                product
            );


        if (!images.length) {

            return `
                <div
                    class="online-detail-image-placeholder"
                    aria-label="Product image unavailable">

                    <span>
                        NEXPAK Security
                    </span>

                </div>
            `;
        }


        const activeIndex =
            Math.min(
                Math.max(
                    Number(
                        STORE.state.productDetails.activeImage
                    ) || 0,
                    0
                ),
                images.length - 1
            );


        const activeImage =
            images[
                activeIndex
            ];


        let thumbnails = "";


        if (
            images.length > 1
        ) {

            thumbnails = `
                <div class="online-detail-thumbnails">
            `;


            images.forEach(
                function (image, index) {

                    thumbnails += `
                        <button
                            type="button"
                            class="
                                online-detail-thumbnail
                                ${
                                    index === activeIndex
                                        ? "active"
                                        : ""
                                }
                            "
                            data-detail-image="${index}"
                            aria-label="View product image ${
                                index + 1
                            }">

                            <img
                                src="${helpers.escapeHTML(
                                    image
                                )}"
                                alt=""
                                loading="lazy">

                        </button>
                    `;
                }
            );


            thumbnails += `
                </div>
            `;
        }


        return `
            <div
                class="online-detail-gallery"
                data-image-index="${activeIndex}">

                <div class="online-detail-main-image">

                    <img
                        src="${helpers.escapeHTML(
                            activeImage
                        )}"
                        alt="${helpers.escapeHTML(
                            helpers.getProductName(
                                product
                            )
                        )}"
                        loading="eager">

                </div>

                ${thumbnails}

            </div>
        `;
    }


    /*=====================================================
      100. PRODUCT FEATURES
    =====================================================*/

    function renderFeatures(
        product
    ) {

        const features =
            getProductFeatures(
                product
            );


        if (!features.length) {
            return "";
        }


        return `
            <section class="online-detail-section
                            online-detail-features">

                <h3>
                    Key Features
                </h3>

                <ul>
                    ${
                        features
                            .map(
                                function (feature) {

                                    return `
                                        <li>
                                            ${helpers.escapeHTML(
                                                feature
                                            )}
                                        </li>
                                    `;
                                }
                            )
                            .join("")
                    }
                </ul>

            </section>
        `;
    }


    /*=====================================================
      101. PRODUCT SPECIFICATIONS
    =====================================================*/

    function renderSpecifications(
        product
    ) {

        const specifications =
            getProductSpecifications(
                product
            );


        const keys =
            Object.keys(
                specifications
            );


        if (!keys.length) {
            return "";
        }


        let rows = "";


        keys.forEach(
            function (key) {

                const value =
                    specifications[key];


                let displayValue;


                if (
                    Array.isArray(value)
                ) {

                    displayValue =
                        value.join(", ");

                } else if (
                    value &&
                    typeof value === "object"
                ) {

                    displayValue =
                        Object.values(value)
                            .join(", ");

                } else {

                    displayValue =
                        String(
                            value
                        );
                }


                rows += `
                    <tr>

                        <th>
                            ${helpers.escapeHTML(
                                key
                            )}
                        </th>

                        <td>
                            ${helpers.escapeHTML(
                                displayValue
                            )}
                        </td>

                    </tr>
                `;
            }
        );


        return `
            <section class="online-detail-section
                            online-detail-specifications">

                <h3>
                    Specifications
                </h3>

                <div class="online-specifications-table-wrap">

                    <table class="online-specifications-table">

                        <tbody>

                            ${rows}

                        </tbody>

                    </table>

                </div>

            </section>
        `;
    }


    /*=====================================================
      102. PRODUCT TAGS
    =====================================================*/

    function renderTags(
        product
    ) {

        const tags =
            getProductTags(
                product
            );


        if (!tags.length) {
            return "";
        }


        return `
            <div class="online-detail-tags">

                ${
                    tags
                        .map(
                            function (tag) {

                                return `
                                    <span
                                        class="online-detail-tag">

                                        ${helpers.escapeHTML(
                                            tag
                                        )}

                                    </span>
                                `;
                            }
                        )
                        .join("")
                }

            </div>
        `;
    }


    /*=====================================================
      103. PRODUCT BASIC INFORMATION
    =====================================================*/

    function renderBasicInformation(
        product
    ) {

        const name =
            helpers.getProductName(
                product
            );


        const brand =
            helpers.getProductBrand(
                product
            );


        const category =
            helpers.getProductCategory(
                product
            );


        const subcategory =
            STORE.products &&
            typeof STORE.products.getSubcategory ===
            "function"
                ? STORE.products.getSubcategory(
                    product
                )
                : "";


        const sku =
            helpers.getProductSKU(
                product
            );


        const productType =
            STORE.products &&
            typeof STORE.products.getType ===
            "function"
                ? STORE.products.getType(
                    product
                )
                : "";


        return `
            <div class="online-detail-information">

                ${
                    brand
                        ? `
                            <div class="online-detail-brand">
                                ${helpers.escapeHTML(
                                    brand
                                )}
                            </div>
                        `
                        : ""
                }


                <h2 class="online-detail-title">

                    ${helpers.escapeHTML(
                        name
                    )}

                </h2>


                ${
                    sku
                        ? `
                            <div class="online-detail-sku">
                                SKU:
                                ${helpers.escapeHTML(
                                    sku
                                )}
                            </div>
                        `
                        : ""
                }


                ${
                    category
                        ? `
                            <div class="online-detail-category">
                                Category:
                                ${helpers.escapeHTML(
                                    category
                                )}
                            </div>
                        `
                        : ""
                }


                ${
                    subcategory
                        ? `
                            <div class="online-detail-subcategory">
                                ${helpers.escapeHTML(
                                    subcategory
                                )}
                            </div>
                        `
                        : ""
                }


                ${
                    productType
                        ? `
                            <div class="online-detail-type">
                                Type:
                                ${helpers.escapeHTML(
                                    productType
                                )}
                            </div>
                        `
                        : ""
                }

            </div>
        `;
    }


    /*=====================================================
      104. PRODUCT DETAIL ACTIONS
    =====================================================*/

    function renderDetailActions(
        product
    ) {

        const productID =
            helpers.getProductID(
                product
            );


        const priceStatus =
            helpers.getProductPriceStatus(
                product
            );


        let actionHTML = "";


        if (
            priceStatus === "priced"
        ) {

            actionHTML = `
                <button
                    type="button"
                    class="online-detail-add-cart"
                    data-detail-action="add-to-cart"
                    data-product-id="${helpers.escapeHTML(
                        productID
                    )}">

                    Add to Cart

                </button>
            `;

        } else if (
            priceStatus === "request-price"
        ) {

            actionHTML = `
                <button
                    type="button"
                    class="online-detail-request-price"
                    data-detail-action="request-price"
                    data-product-id="${helpers.escapeHTML(
                        productID
                    )}">

                    Request Price

                </button>
            `;

        } else {

            actionHTML = `
                <button
                    type="button"
                    class="online-detail-request-quote"
                    data-detail-action="request-quote"
                    data-product-id="${helpers.escapeHTML(
                        productID
                    )}">

                    Request Quote

                </button>
            `;
        }


        /*
         * Quantity only makes sense for confirmed priced
         * products.
         */

        const quantityHTML =
            priceStatus === "priced"
                ? `
                    <div class="online-detail-quantity">

                        <button
                            type="button"
                            data-quantity-action="decrease"
                            aria-label="Decrease quantity">

                            −

                        </button>


                        <input
                            type="number"
                            min="1"
                            value="1"
                            data-product-quantity
                            aria-label="Product quantity">


                        <button
                            type="button"
                            data-quantity-action="increase"
                            aria-label="Increase quantity">

                            +

                        </button>

                    </div>
                `
                : "";


        return `
            <div class="online-detail-actions">

                ${quantityHTML}

                ${actionHTML}

            </div>
        `;
    }


    /*=====================================================
      105. PRODUCT DETAIL RENDERING
    =====================================================*/

    function renderProductDetails(
        suppliedContainer
    ) {

        const product =
            STORE.state.productDetails.product ||
            STORE.state.selectedProduct;


        if (!product) {

            helpers.warn(
                "No product selected for detail rendering."
            );

            return false;
        }


        const container =
            getDetailContainer(
                suppliedContainer
            );


        if (!container) {

            helpers.warn(
                "Product detail container not found."
            );

            return false;
        }


        const description =
            getProductLongDescription(
                product
            );


        const warranty =
            helpers.safeString(
                product.warranty ||
                product.warrantyPeriod ||
                product.guarantee ||
                ""
            );


        const deliveryClass =
            helpers.safeString(
                product.deliveryClass ||
                product.delivery_class ||
                ""
            );


        container.innerHTML = `
            <article
                class="online-product-detail-page"
                data-product-id="${helpers.escapeHTML(
                    helpers.getProductID(
                        product
                    )
                )}">

                <div class="online-detail-header">

                    <button
                        type="button"
                        class="online-detail-close"
                        data-detail-action="close"
                        aria-label="Close product details">

                        ×

                    </button>

                </div>


                <div class="online-detail-main">

                    <div class="online-detail-media">

                        ${renderImageGallery(
                            product
                        )}

                    </div>


                    <div class="online-detail-content">

                        ${renderBasicInformation(
                            product
                        )}


                        ${STORE.products.renderPrice(
                            product
                        )}


                        ${
                            description
                                ? `
                                    <section
                                        class="online-detail-section
                                               online-detail-description">

                                        <h3>
                                            Description
                                        </h3>

                                        <p>
                                            ${helpers.escapeHTML(
                                                description
                                            )}
                                        </p>

                                    </section>
                                `
                                : ""
                        }


                        ${renderDetailActions(
                            product
                        )}


                        ${
                            warranty
                                ? `
                                    <div class="online-detail-warranty">
                                        <strong>
                                            Warranty:
                                        </strong>
                                        ${helpers.escapeHTML(
                                            warranty
                                        )}
                                    </div>
                                `
                                : ""
                        }


                        ${
                            deliveryClass
                                ? `
                                    <div class="online-detail-delivery-class">
                                        <strong>
                                            Delivery:
                                        </strong>
                                        ${helpers.escapeHTML(
                                            deliveryClass
                                        )}
                                    </div>
                                `
                                : ""
                        }


                        ${renderTags(
                            product
                        )}

                    </div>

                </div>


                ${renderFeatures(
                    product
                )}


                ${renderSpecifications(
                    product
                )}


                <div
                    class="online-detail-related-hook"
                    data-related-products-for="${helpers.escapeHTML(
                        helpers.getProductID(
                            product
                        )
                    )}">
                </div>

            </article>
        `;


        STORE.state.productDetails.isOpen =
            true;


        /*
         * Notify future UI components.
         */

        document.dispatchEvent(
            new CustomEvent(
                "nexpak:product-details-rendered",
                {
                    detail: {
                        product:
                            product,

                        container:
                            container
                    }
                }
            )
        );


        return true;
    }


    /*=====================================================
      106. PRODUCT IMAGE SELECTION
    =====================================================*/

    function setActiveImage(
        index
    ) {

        const product =
            STORE.state.productDetails.product;


        if (!product) {
            return false;
        }


        const images =
            getProductImages(
                product
            );


        if (!images.length) {
            return false;
        }


        let requestedIndex =
            Number(index);


        if (
            !Number.isFinite(
                requestedIndex
            )
        ) {

            requestedIndex = 0;
        }


        requestedIndex =
            Math.max(
                0,
                Math.min(
                    Math.floor(
                        requestedIndex
                    ),
                    images.length - 1
                )
            );


        STORE.state.productDetails.activeImage =
            requestedIndex;


        renderProductDetails();


        return true;
    }


    /*=====================================================
      107. PRODUCT QUANTITY
    =====================================================*/

    function setProductQuantity(
        quantity
    ) {

        let requestedQuantity =
            Number(quantity);


        if (
            !Number.isFinite(
                requestedQuantity
            )
        ) {

            requestedQuantity = 1;
        }


        requestedQuantity =
            Math.max(
                1,
                Math.floor(
                    requestedQuantity
                )
            );


        /*
         * Prevent accidental extreme quantities.
         */

        requestedQuantity =
            Math.min(
                requestedQuantity,
                999
            );


        STORE.state.productDetails.quantity =
            requestedQuantity;


        return requestedQuantity;
    }


    function getProductQuantity() {

        return Math.max(
            1,
            Number(
                STORE.state.productDetails.quantity
            ) || 1
        );
    }


    /*=====================================================
      108. DETAIL ACTION HANDLER
    =====================================================*/

    function handleDetailAction(
        event
    ) {

        const detailAction =
            event.target.closest(
                "[data-detail-action]"
            );


        if (detailAction) {

            const action =
                detailAction.getAttribute(
                    "data-detail-action"
                );


            const productID =
                detailAction.getAttribute(
                    "data-product-id"
                );


            switch (action) {

                case "add-to-cart": {

                    const product =
                        selectProduct(
                            productID,
                            {
                                render: false
                            }
                        );


                    if (!product) {
                        break;
                    }


                    document.dispatchEvent(
                        new CustomEvent(
                            "nexpak:add-to-cart",
                            {
                                detail: {

                                    product:
                                        product,

                                    productID:
                                        helpers.getProductID(
                                            product
                                        ),

                                    quantity:
                                        getProductQuantity()
                                }
                            }
                        )
                    );


                    break;
                }


                case "request-price": {

                    const product =
                        selectProduct(
                            productID,
                            {
                                render: false
                            }
                        );


                    if (!product) {
                        break;
                    }


                    document.dispatchEvent(
                        new CustomEvent(
                            "nexpak:request-price",
                            {
                                detail: {
                                    product:
                                        product
                                }
                            }
                        )
                    );


                    break;
                }


                case "request-quote": {

                    const product =
                        selectProduct(
                            productID,
                            {
                                render: false
                            }
                        );


                    if (!product) {
                        break;
                    }


                    document.dispatchEvent(
                        new CustomEvent(
                            "nexpak:request-quote",
                            {
                                detail: {
                                    product:
                                        product
                                }
                            }
                        )
                    );


                    break;
                }


                case "close":

                    closeProductDetails();

                    break;
            }


            return;
        }


        /*-----------------------------------------------
          Product image
        -----------------------------------------------*/

        const imageButton =
            event.target.closest(
                "[data-detail-image]"
            );


        if (imageButton) {

            const index =
                imageButton.getAttribute(
                    "data-detail-image"
                );


            setActiveImage(
                index
            );


            return;
        }


        /*-----------------------------------------------
          Quantity
        -----------------------------------------------*/

        const quantityAction =
            event.target.closest(
                "[data-quantity-action]"
            );


        if (quantityAction) {

            const action =
                quantityAction.getAttribute(
                    "data-quantity-action"
                );


            let quantity =
                getProductQuantity();


            if (
                action === "increase"
            ) {

                quantity++;

            } else if (
                action === "decrease"
            ) {

                quantity--;
            }


            setProductQuantity(
                quantity
            );


            updateQuantityInput();


            return;
        }
    }


    /*=====================================================
      109. QUANTITY INPUT
    =====================================================*/

    function handleQuantityInput(
        event
    ) {

        const input =
            event.target.closest(
                "[data-product-quantity]"
            );


        if (!input) {
            return;
        }


        setProductQuantity(
            input.value
        );


        updateQuantityInput();
    }


    function updateQuantityInput() {

        const input =
            document.querySelector(
                "[data-product-quantity]"
            );


        if (!input) {
            return;
        }


        input.value =
            getProductQuantity();
    }


    /*=====================================================
      110. CLOSE PRODUCT DETAILS
    =====================================================*/

    function closeProductDetails() {

        const container =
            getDetailContainer();


        STORE.state.productDetails.isOpen =
            false;


        if (container) {

            /*
             * Don't destroy unrelated HTML.
             * Only clear a container that is clearly being
             * used as the product-detail target.
             */

            container.innerHTML = "";
        }


        document.dispatchEvent(
            new CustomEvent(
                "nexpak:product-details-closed"
            )
        );
    }


    /*=====================================================
      111. PRODUCT HISTORY
    =====================================================*/

    function getProductHistory() {

        return STORE.state.productDetails.history
            .map(function (id) {

                return findProduct(id);

            })
            .filter(Boolean);
    }


    function clearProductHistory() {

        STORE.state.productDetails.history =
            [];
    }


    /*=====================================================
      112. BACK TO PREVIOUS PRODUCT
    =====================================================*/

    function previousProduct() {

        const history =
            STORE.state.productDetails.history;


        if (!history.length) {
            return null;
        }


        const previousID =
            history.pop();


        const product =
            findProduct(
                previousID
            );


        if (!product) {
            return null;
        }


        return selectProduct(
            product
        );
    }


    /*=====================================================
      113. OPEN PRODUCT FROM EVENT
    =====================================================*/

    function handleProductViewEvent(
        event
    ) {

        const product =
            event.detail &&
            event.detail.product;


        if (!product) {
            return;
        }


        selectProduct(
            product
        );
    }


    /*=====================================================
      114. INITIALIZE PRODUCT DETAIL EVENTS
    =====================================================*/

    function initializeProductDetailEvents() {

        /*
         * Detail buttons.
         */

        document.addEventListener(
            "click",
            handleDetailAction
        );


        /*
         * Quantity controls.
         */

        document.addEventListener(
            "input",
            handleQuantityInput
        );


        /*
         * Existing Part 2 view-product event.
         */

        document.addEventListener(
            "nexpak:view-product",
            handleProductViewEvent
        );
    }


    /*=====================================================
      115. PUBLIC PRODUCT DETAIL API
    =====================================================*/

    STORE.details = {

        find:
            findProduct,

        select:
            selectProduct,

        render:
            renderProductDetails,

        close:
            closeProductDetails,

        setImage:
            setActiveImage,

        getImages:
            getProductImages,

        getFeatures:
            getProductFeatures,

        getSpecifications:
            getProductSpecifications,

        getTags:
            getProductTags,

        setQuantity:
            setProductQuantity,

        getQuantity:
            getProductQuantity,

        history:
            getProductHistory,

        clearHistory:
            clearProductHistory,

        previous:
            previousProduct,

        isOpen:
            function () {
                return STORE.state.productDetails.isOpen;
            }
    };


    /*=====================================================
      116. INITIALIZE
    =====================================================*/

    initializeProductDetailEvents();


    /*=====================================================
      117. PART 5 READY
    =====================================================*/

    helpers.log(
        "online.js Part 5 loaded — Product Details & Selection ready."
    );


})(window, document);


/*=========================================================
 END OF online.js — PART 5/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE ENGINE
 ---------------------------------------------------------
 File: online.js
 Part: 6/8
 Purpose:
 - Featured products
 - Popular products
 - New products
 - Related products
 - Similar products
 - Cross-category recommendations
 - Product recommendation scoring
 - Recommendation rendering

 Continues directly from:
 online.js — Part 1/8
 online.js — Part 2/8
 online.js — Part 3/8
 online.js — Part 4/8
 online.js — Part 5/8
=========================================================*/

(function (window, document) {

    "use strict";


    /*=====================================================
      118. STORE CONNECTION
    =====================================================*/

    const STORE =
        window.NEXPAK_ONLINE;


    if (!STORE) {

        console.error(
            "[NEXPAK ONLINE] Part 6 could not start. " +
            "Parts 1–5 must load first."
        );

        return;
    }


    const helpers =
        STORE.helpers;


    /*=====================================================
      119. RECOMMENDATION CONFIGURATION
    =====================================================*/

    const recommendationConfig = {

        defaultLimit: 8,

        relatedLimit: 8,

        popularLimit: 8,

        featuredLimit: 8,

        newLimit: 8,

        minimumRelatedScore: 10,

        categoryWeight: 40,

        subcategoryWeight: 30,

        brandWeight: 20,

        typeWeight: 25,

        tagWeight: 8,

        compatibilityWeight: 35,

        priceRangeWeight: 5,

        featuredWeight: 15,

        popularWeight: 15,

        newWeight: 10
    };


    /*=====================================================
      120. PRODUCT COLLECTION
    =====================================================*/

    function getAllProducts() {

        return Array.isArray(
            STORE.state.allProducts
        )
            ? STORE.state.allProducts
            : [];
    }


    /*=====================================================
      121. FLAG CHECKERS
    =====================================================*/

    function isFeatured(
        product
    ) {

        if (!product) {
            return false;
        }


        return (
            product.featured === true ||
            product.isFeatured === true ||
            product.featuredProduct === true
        );
    }


    function isPopular(
        product
    ) {

        if (!product) {
            return false;
        }


        return (
            product.popular === true ||
            product.isPopular === true ||
            product.popularProduct === true ||
            product.bestSeller === true ||
            product.bestSeller === "true"
        );
    }


    function isNewProduct(
        product
    ) {

        if (!product) {
            return false;
        }


        return (
            product.new === true ||
            product.isNew === true ||
            product.newProduct === true
        );
    }


    /*=====================================================
      122. PRODUCT METADATA
    =====================================================*/

    function getSubcategory(
        product
    ) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.subcategory ||
            product.subCategory ||
            product.sub_category ||
            ""
        );
    }


    function getProductType(
        product
    ) {

        if (!product) {
            return "";
        }


        return helpers.safeString(
            product.productType ||
            product.product_type ||
            product.type ||
            ""
        );
    }


    function getProductTags(
        product
    ) {

        if (!product) {
            return [];
        }


        const tags =
            product.tags ||
            product.keywords ||
            [];


        if (Array.isArray(tags)) {

            return tags
                .map(function (tag) {

                    return helpers.safeLower(
                        tag
                    );

                })
                .filter(Boolean);
        }


        if (
            typeof tags === "string"
        ) {

            return tags
                .split(",")
                .map(function (tag) {

                    return helpers.safeLower(
                        tag.trim()
                    );

                })
                .filter(Boolean);
        }


        return [];
    }


    /*=====================================================
      123. CATEGORY NORMALIZATION
    =====================================================*/

    function normalizeCategory(
        value
    ) {

        return helpers.safeLower(
            value
        )
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }


    /*=====================================================
      124. PRODUCT PRICE RANGE
    =====================================================*/

    function getPrice(
        product
    ) {

        if (
            !product ||
            !helpers.hasConfirmedPrice(
                product
            )
        ) {

            return null;
        }


        const price =
            Number(
                product.price
            );


        return Number.isFinite(
            price
        )
            ? price
            : null;
    }


    function getPriceSimilarity(
        productA,
        productB
    ) {

        const priceA =
            getPrice(productA);


        const priceB =
            getPrice(productB);


        if (
            priceA === null ||
            priceB === null
        ) {

            return 0;
        }


        const highest =
            Math.max(
                priceA,
                priceB
            );


        if (
            highest <= 0
        ) {

            return 0;
        }


        const difference =
            Math.abs(
                priceA - priceB
            );


        const percentage =
            difference /
            highest;


        /*
         * Products within roughly 25% of one another
         * receive the strongest price similarity.
         */

        if (
            percentage <= 0.10
        ) {

            return 10;
        }


        if (
            percentage <= 0.25
        ) {

            return 7;
        }


        if (
            percentage <= 0.50
        ) {

            return 4;
        }


        return 0;
    }


    /*=====================================================
      125. PRODUCT RELATION SCORE
    =====================================================*/

    function calculateRelatedScore(
        source,
        candidate
    ) {

        if (
            !source ||
            !candidate
        ) {

            return 0;
        }


        const sourceID =
            helpers.safeLower(
                helpers.getProductID(
                    source
                )
            );


        const candidateID =
            helpers.safeLower(
                helpers.getProductID(
                    candidate
                )
            );


        /*
         * Never recommend the current product itself.
         */

        if (
            sourceID &&
            candidateID &&
            sourceID === candidateID
        ) {

            return -9999;
        }


        let score = 0;


        /*-----------------------------------------------
          Category
        -----------------------------------------------*/

        const sourceCategory =
            normalizeCategory(
                helpers.getProductCategory(
                    source
                )
            );


        const candidateCategory =
            normalizeCategory(
                helpers.getProductCategory(
                    candidate
                )
            );


        if (
            sourceCategory &&
            candidateCategory &&
            sourceCategory === candidateCategory
        ) {

            score +=
                recommendationConfig.categoryWeight;
        }


        /*-----------------------------------------------
          Subcategory
        -----------------------------------------------*/

        const sourceSubcategory =
            normalizeCategory(
                getSubcategory(
                    source
                )
            );


        const candidateSubcategory =
            normalizeCategory(
                getSubcategory(
                    candidate
                )
            );


        if (
            sourceSubcategory &&
            candidateSubcategory &&
            sourceSubcategory === candidateSubcategory
        ) {

            score +=
                recommendationConfig.subcategoryWeight;
        }


        /*-----------------------------------------------
          Brand
        -----------------------------------------------*/

        const sourceBrand =
            helpers.safeLower(
                helpers.getProductBrand(
                    source
                )
            );


        const candidateBrand =
            helpers.safeLower(
                helpers.getProductBrand(
                    candidate
                )
            );


        if (
            sourceBrand &&
            candidateBrand &&
            sourceBrand === candidateBrand
        ) {

            score +=
                recommendationConfig.brandWeight;
        }


        /*-----------------------------------------------
          Product type
        -----------------------------------------------*/

        const sourceType =
            helpers.safeLower(
                getProductType(
                    source
                )
            );


        const candidateType =
            helpers.safeLower(
                getProductType(
                    candidate
                )
            );


        if (
            sourceType &&
            candidateType &&
            sourceType === candidateType
        ) {

            score +=
                recommendationConfig.typeWeight;
        }


        /*-----------------------------------------------
          Tags
        -----------------------------------------------*/

        const sourceTags =
            getProductTags(
                source
            );


        const candidateTags =
            getProductTags(
                candidate
            );


        if (
            sourceTags.length &&
            candidateTags.length
        ) {

            const commonTags =
                sourceTags.filter(
                    function (tag) {

                        return candidateTags.indexOf(
                            tag
                        ) !== -1;
                    }
                );


            score +=
                commonTags.length *
                recommendationConfig.tagWeight;
        }


        /*-----------------------------------------------
          Compatibility
        -----------------------------------------------*/

        const sourceCompatibility =
            source.compatibility ||
            source.compatibleWith ||
            source.compatible_with ||
            [];


        const candidateCompatibility =
            candidate.compatibility ||
            candidate.compatibleWith ||
            candidate.compatible_with ||
            [];


        const sourceCompatibilityText =
            JSON.stringify(
                sourceCompatibility
            ).toLowerCase();


        const candidateCompatibilityText =
            JSON.stringify(
                candidateCompatibility
            ).toLowerCase();


        if (
            sourceCompatibilityText &&
            candidateCompatibilityText &&
            (
                sourceCompatibilityText.includes(
                    candidateID
                ) ||
                candidateCompatibilityText.includes(
                    sourceID
                )
            )
        ) {

            score +=
                recommendationConfig.compatibilityWeight;
        }


        /*-----------------------------------------------
          Price similarity
        -----------------------------------------------*/

        score +=
            getPriceSimilarity(
                source,
                candidate
            );


        /*-----------------------------------------------
          Featured / popular / new signals
        -----------------------------------------------*/

        if (
            isFeatured(candidate)
        ) {

            score +=
                recommendationConfig.featuredWeight;
        }


        if (
            isPopular(candidate)
        ) {

            score +=
                recommendationConfig.popularWeight;
        }


        if (
            isNewProduct(candidate)
        ) {

            score +=
                recommendationConfig.newWeight;
        }


        return score;
    }


    /*=====================================================
      126. SORT RECOMMENDATIONS
    =====================================================*/

    function sortRecommendations(
        source,
        products
    ) {

        return products
            .map(function (product) {

                return {

                    product:
                        product,

                    score:
                        calculateRelatedScore(
                            source,
                            product
                        )
                };

            })
            .filter(function (item) {

                return (
                    item.score >=
                    recommendationConfig.minimumRelatedScore
                );

            })
            .sort(function (a, b) {

                return (
                    b.score -
                    a.score
                );

            })
            .map(function (item) {

                return item.product;

            });
    }


    /*=====================================================
      127. GET FEATURED PRODUCTS
    =====================================================*/

    function getFeaturedProducts(
        limit
    ) {

        const requestedLimit =
            Number(limit);


        const finalLimit =
            Number.isFinite(
                requestedLimit
            )
                ? Math.max(
                    1,
                    Math.floor(
                        requestedLimit
                    )
                )
                : recommendationConfig.featuredLimit;


        return getAllProducts()
            .filter(
                isFeatured
            )
            .slice(
                0,
                finalLimit
            );
    }


    /*=====================================================
      128. GET POPULAR PRODUCTS
    =====================================================*/

    function getPopularProducts(
        limit
    ) {

        const requestedLimit =
            Number(limit);


        const finalLimit =
            Number.isFinite(
                requestedLimit
            )
                ? Math.max(
                    1,
                    Math.floor(
                        requestedLimit
                    )
                )
                : recommendationConfig.popularLimit;


        return getAllProducts()
            .filter(
                isPopular
            )
            .slice(
                0,
                finalLimit
            );
    }


    /*=====================================================
      129. GET NEW PRODUCTS
    =====================================================*/

    function getNewProducts(
        limit
    ) {

        const requestedLimit =
            Number(limit);


        const finalLimit =
            Number.isFinite(
                requestedLimit
            )
                ? Math.max(
                    1,
                    Math.floor(
                        requestedLimit
                    )
                )
                : recommendationConfig.newLimit;


        return getAllProducts()
            .filter(
                isNewProduct
            )
            .slice(
                0,
                finalLimit
            );
    }


    /*=====================================================
      130. GET RELATED PRODUCTS
    =====================================================*/

    function getRelatedProducts(
        sourceProduct,
        limit
    ) {

        let source =
            sourceProduct;


        if (
            !source ||
            typeof source !== "object"
        ) {

            source =
                STORE.details &&
                typeof STORE.details.find ===
                "function"
                    ? STORE.details.find(
                        sourceProduct
                    )
                    : null;
        }


        if (!source) {
            return [];
        }


        const requestedLimit =
            Number(limit);


        const finalLimit =
            Number.isFinite(
                requestedLimit
            )
                ? Math.max(
                    1,
                    Math.floor(
                        requestedLimit
                    )
                )
                : recommendationConfig.relatedLimit;


        const candidates =
            getAllProducts()
                .filter(function (product) {

                    const id =
                        helpers.safeLower(
                            helpers.getProductID(
                                product
                            )
                        );


                    const sourceID =
                        helpers.safeLower(
                            helpers.getProductID(
                                source
                            )
                        );


                    return (
                        !sourceID ||
                        id !== sourceID
                    );
                });


        const related =
            sortRecommendations(
                source,
                candidates
            );


        /*
         * If there are not enough strongly related
         * products, use category fallback.
         */

        if (
            related.length <
            finalLimit
        ) {

            const sourceCategory =
                normalizeCategory(
                    helpers.getProductCategory(
                        source
                    )
                );


            const fallback =
                candidates.filter(
                    function (product) {

                        return (
                            normalizeCategory(
                                helpers.getProductCategory(
                                    product
                                )
                            ) ===
                            sourceCategory
                        );
                    }
                );


            fallback.forEach(
                function (product) {

                    const exists =
                        related.some(
                            function (item) {

                                return (
                                    helpers.getProductID(
                                        item
                                    ) ===
                                    helpers.getProductID(
                                        product
                                    )
                                );
                            }
                        );


                    if (!exists) {

                        related.push(
                            product
                        );
                    }
                }
            );
        }


        return related.slice(
            0,
            finalLimit
        );
    }


    /*=====================================================
      131. GET SIMILAR PRODUCTS
    =====================================================*/

    function getSimilarProducts(
        sourceProduct,
        limit
    ) {

        let source =
            sourceProduct;


        if (
            !source ||
            typeof source !== "object"
        ) {

            source =
                STORE.details.find(
                    sourceProduct
                );
        }


        if (!source) {
            return [];
        }


        const sourceCategory =
            normalizeCategory(
                helpers.getProductCategory(
                    source
                )
            );


        const sourceType =
            helpers.safeLower(
                getProductType(
                    source
                )
            );


        const candidates =
            getAllProducts()
                .filter(function (product) {

                    if (
                        helpers.getProductID(
                            product
                        ) ===
                        helpers.getProductID(
                            source
                        )
                    ) {

                        return false;
                    }


                    const category =
                        normalizeCategory(
                            helpers.getProductCategory(
                                product
                            )
                        );


                    const type =
                        helpers.safeLower(
                            getProductType(
                                product
                            )
                        );


                    return (
                        category ===
                        sourceCategory ||
                        (
                            sourceType &&
                            type === sourceType
                        )
                    );
                });


        return sortRecommendations(
            source,
            candidates
        ).slice(
            0,
            Number(limit) || recommendationConfig.defaultLimit
        );
    }


    /*=====================================================
      132. RECOMMENDATION CARD
    =====================================================*/

    function renderRecommendationCard(
        product
    ) {

        if (!product) {
            return "";
        }


        const productID =
            helpers.getProductID(
                product
            );


        const name =
            helpers.getProductName(
                product
            );


        const image =
            product.image ||
            product.imageUrl ||
            product.thumbnail ||
            "";


        const brand =
            helpers.getProductBrand(
                product
            );


        const category =
            helpers.getProductCategory(
                product
            );


        const priceHTML =
            STORE.products &&
            typeof STORE.products.renderPrice ===
            "function"
                ? STORE.products.renderPrice(
                    product
                )
                : "";


        return `
            <article
                class="online-recommendation-card"
                data-product-id="${helpers.escapeHTML(
                    productID
                )}">

                <button
                    type="button"
                    class="online-recommendation-image"
                    data-recommendation-product="${helpers.escapeHTML(
                        productID
                    )}">

                    ${
                        image
                            ? `
                                <img
                                    src="${helpers.escapeHTML(
                                        image
                                    )}"
                                    alt="${helpers.escapeHTML(
                                        name
                                    )}"
                                    loading="lazy">
                            `
                            : `
                                <span>
                                    NEXPAK Security
                                </span>
                            `
                    }

                </button>


                ${
                    brand
                        ? `
                            <div
                                class="online-recommendation-brand">

                                ${helpers.escapeHTML(
                                    brand
                                )}

                            </div>
                        `
                        : ""
                }


                <h3
                    class="online-recommendation-title">

                    ${helpers.escapeHTML(
                        name
                    )}

                </h3>


                ${
                    category
                        ? `
                            <div
                                class="online-recommendation-category">

                                ${helpers.escapeHTML(
                                    category
                                )}

                            </div>
                        `
                        : ""
                }


                <div
                    class="online-recommendation-price">

                    ${priceHTML}

                </div>


                <button
                    type="button"
                    class="online-recommendation-view"
                    data-recommendation-product="${helpers.escapeHTML(
                        productID
                    )}">

                    View Product

                </button>

            </article>
        `;
    }


    /*=====================================================
      133. RENDER PRODUCT COLLECTION
    =====================================================*/

    function renderProductCollection(
        products,
        container,
        title
    ) {

        if (!container) {
            return false;
        }


        const collection =
            Array.isArray(products)
                ? products
                : [];


        if (!collection.length) {

            container.innerHTML = "";

            return false;
        }


        const heading =
            title
                ? `
                    <div class="online-recommendation-heading">

                        <h2>
                            ${helpers.escapeHTML(
                                title
                            )}
                        </h2>

                    </div>
                `
                : "";


        container.innerHTML = `
            <section
                class="online-recommendation-section">

                ${heading}

                <div
                    class="online-recommendation-grid">

                    ${
                        collection
                            .map(
                                renderRecommendationCard
                            )
                            .join("")
                    }

                </div>

            </section>
        `;


        return true;
    }


    /*=====================================================
      134. RENDER FEATURED
    =====================================================*/

    function renderFeatured(
        container,
        limit
    ) {

        const target =
            resolveRecommendationContainer(
                container,
                "featured"
            );


        if (!target) {
            return false;
        }


        return renderProductCollection(
            getFeaturedProducts(
                limit
            ),
            target,
            "Featured Products"
        );
    }


    /*=====================================================
      135. RENDER POPULAR
    =====================================================*/

    function renderPopular(
        container,
        limit
    ) {

        const target =
            resolveRecommendationContainer(
                container,
                "popular"
            );


        if (!target) {
            return false;
        }


        return renderProductCollection(
            getPopularProducts(
                limit
            ),
            target,
            "Popular Products"
        );
    }


    /*=====================================================
      136. RENDER NEW
    =====================================================*/

    function renderNewProducts(
        container,
        limit
    ) {

        const target =
            resolveRecommendationContainer(
                container,
                "new"
            );


        if (!target) {
            return false;
        }


        return renderProductCollection(
            getNewProducts(
                limit
            ),
            target,
            "New Products"
        );
    }


    /*=====================================================
      137. RENDER RELATED
    =====================================================*/

    function renderRelated(
        sourceProduct,
        container,
        limit
    ) {

        const target =
            resolveRecommendationContainer(
                container,
                "related"
            );


        if (!target) {
            return false;
        }


        const products =
            getRelatedProducts(
                sourceProduct,
                limit
            );


        return renderProductCollection(
            products,
            target,
            "You May Also Like"
        );
    }


    /*=====================================================
      138. CONTAINER RESOLVER
    =====================================================*/

    function resolveRecommendationContainer(
        suppliedContainer,
        type
    ) {

        if (suppliedContainer) {

            if (
                typeof suppliedContainer ===
                "string"
            ) {

                return document.querySelector(
                    suppliedContainer
                );
            }


            if (
                suppliedContainer instanceof
                Element
            ) {

                return suppliedContainer;
            }
        }


        const selectorMap = {

            featured:
                "#featured-products, " +
                "[data-online-featured]",

            popular:
                "#popular-products, " +
                "[data-online-popular]",

            new:
                "#new-products, " +
                "[data-online-new]",

            related:
                "#related-products, " +
                "[data-online-related]"
        };


        return document.querySelector(
            selectorMap[type] || ""
        );
    }


    /*=====================================================
      139. RECOMMENDATION CLICK HANDLER
    =====================================================*/

    function handleRecommendationClick(
        event
    ) {

        const button =
            event.target.closest(
                "[data-recommendation-product]"
            );


        if (!button) {
            return;
        }


        const productID =
            button.getAttribute(
                "data-recommendation-product"
            );


        if (!productID) {
            return;
        }


        /*
         * Use Part 5 product-selection engine.
         */

        if (
            STORE.details &&
            typeof STORE.details.select ===
            "function"
        ) {

            STORE.details.select(
                productID
            );
        }


        document.dispatchEvent(
            new CustomEvent(
                "nexpak:recommendation-selected",
                {
                    detail: {
                        productID:
                            productID,

                        product:
                            STORE.details &&
                            STORE.details.find
                                ? STORE.details.find(
                                    productID
                                )
                                : null
                    }
                }
            )
        );
    }


    /*=====================================================
      140. AUTOMATIC RELATED PRODUCTS
    =====================================================*/

    function renderAutomaticRelatedProducts() {

        const product =
            STORE.state.productDetails &&
            STORE.state.productDetails.product;


        if (!product) {
            return;
        }


        const container =
            document.querySelector(
                "[data-related-products-for]"
            );


        if (!container) {
            return;
        }


        renderRelated(
            product,
            container,
            recommendationConfig.relatedLimit
        );
    }


    /*=====================================================
      141. PRODUCT DETAIL EVENT
    =====================================================*/

    function handleProductDetailsRendered(
        event
    ) {

        if (
            !event.detail ||
            !event.detail.product
        ) {

            return;
        }


        /*
         * Wait until Part 5 has finished inserting
         * the detail structure.
         */

        window.setTimeout(
            renderAutomaticRelatedProducts,
            0
        );
    }


    /*=====================================================
      142. PUBLIC RECOMMENDATION API
    =====================================================*/

    STORE.recommendations = {

        config:
            recommendationConfig,

        isFeatured:
            isFeatured,

        isPopular:
            isPopular,

        isNew:
            isNewProduct,

        featured:
            getFeaturedProducts,

        popular:
            getPopularProducts,

        newest:
            getNewProducts,

        related:
            getRelatedProducts,

        similar:
            getSimilarProducts,

        score:
            calculateRelatedScore,

        renderFeatured:
            renderFeatured,

        renderPopular:
            renderPopular,

        renderNew:
            renderNewProducts,

        renderRelated:
            renderRelated,

        renderCard:
            renderRecommendationCard
    };


    /*=====================================================
      143. EVENT INITIALIZATION
    =====================================================*/

    document.addEventListener(
        "click",
        handleRecommendationClick
    );


    document.addEventListener(
        "nexpak:product-details-rendered",
        handleProductDetailsRendered
    );


    /*=====================================================
      144. PART 6 READY
    =====================================================*/

    helpers.log(
        "online.js Part 6 loaded — Featured, Popular & Related Products ready."
    );


})(window, document);


/*=========================================================
 END OF online.js — PART 6/8
=========================================================*/
    
