/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   configurator.js
   ==========================================================================

   PURPOSE:
   - Individual product system builder
   - NO pre-built kits
   - Uses SHOP_DATA as the product source
   - Every selected product has its own quantity
   - Live system summary
   - Designed to integrate with cart.js
   - VAT supplied by SHOP_DATA.company.vatRate

   ARCHITECTURE:

   shop-data.js
        ↓
   SHOP_DATA
        ↓
   configurator.js
        ↓
   Build Your System
        ↓
   cart.js
        ↓
   delivery.js / checkout.js / payment.js

   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ======================================================================
       1. CONFIGURATOR STATE
       ====================================================================== */

    const state = {

        /* Currently selected security system */
        category: "electric-fencing",

        /* Human-readable category title */
        categoryTitle: "Electric Fencing",

        /* All selected products
           Example:

           {
               "EF-BRACKET-001": {
                   id: "EF-BRACKET-001",
                   name: "Wall Top Bracket",
                   price: 85,
                   quantity: 4
               }
           }
        */
        selections: {},

        /* Current totals */
        totals: {
            itemCount: 0,
            productCount: 0,
            subtotal: 0,
            vat: 0,
            grandTotal: 0
        }

    };


    /* ======================================================================
       2. VAT / CURRENCY SETTINGS
       ====================================================================== */

    const VAT_RATE =
        SHOP_DATA &&
        SHOP_DATA.company &&
        typeof SHOP_DATA.company.vatRate === "number"

            ? SHOP_DATA.company.vatRate

            : 0.15;


    const CURRENCY =
        SHOP_DATA &&
        SHOP_DATA.company &&
        SHOP_DATA.company.currency

            ? SHOP_DATA.company.currency

            : "ZAR";


    /* ======================================================================
       3. DOM REFERENCES
       ====================================================================== */

    const elements = {

        configurator:
            document.getElementById("configuratorSelectors"),

        categoryTitle:
            document.getElementById("currentCategoryTitle"),

        summaryCategory:
            document.getElementById("summaryCategory"),

        summaryAddonCount:
            document.getElementById("summaryAddonCount"),

        summarySubtotal:
            document.getElementById("summarySubtotal"),

        summaryVat:
            document.getElementById("summaryVat"),

        summaryGrandTotal:
            document.getElementById("summaryGrandTotal"),

        addToCart:
            document.getElementById("btnAddToCart"),

        cartBadge:
            document.getElementById("cartCountBadge"),

        toast:
            document.getElementById("toastContainer")

    };


    /* ======================================================================
       4. BASIC SAFETY CHECK
       ====================================================================== */

    if (typeof SHOP_DATA === "undefined") {

        console.error(
            "Nexpak Configurator: SHOP_DATA could not be found. " +
            "Make sure shop-data.js loads before configurator.js."
        );

        return;
    }


    /* ======================================================================
       5. CATEGORY MASTER DATA
       ====================================================================== */

    function getCategories() {

        if (
            !SHOP_DATA.categories ||
            !Array.isArray(SHOP_DATA.categories)
        ) {

            return [];

        }

        return SHOP_DATA.categories;

    }


    /* ======================================================================
       6. FIND CATEGORY
       ====================================================================== */

    function getCategory(categoryId) {

        const categories = getCategories();

        return categories.find(
            category => category.id === categoryId
        );

    }


    /* ======================================================================
       7. UPDATE CATEGORY STATE
       ====================================================================== */

    function setCategory(categoryId) {

        const category = getCategory(categoryId);

        if (!category) {

            console.warn(
                `Nexpak Configurator: Unknown category "${categoryId}".`
            );

            return;

        }

        state.category = category.id;

        state.categoryTitle =
            category.title
                .replace(/ Kits$/i, "")
                .replace(/ Systems$/i, "");

        /* Every time the customer changes system type,
           start that system with an empty configuration. */

        state.selections = {};

        state.totals = {
            itemCount: 0,
            productCount: 0,
            subtotal: 0,
            vat: 0,
            grandTotal: 0
        };

    }


    /* ======================================================================
       8. FORMAT MONEY
       ====================================================================== */

    function formatMoney(amount) {

        const numericAmount =
            Number(amount) || 0;

        return new Intl.NumberFormat("en-ZA", {

            style: "currency",

            currency: CURRENCY,

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        }).format(numericAmount);

    }


    /* ======================================================================
       9. NORMALISE PRODUCT PRICE
       ====================================================================== */

    function getProductPrice(product) {

        if (!product) {
            return 0;
        }

        if (typeof product.priceExclVat === "number") {
            return product.priceExclVat;
        }

        if (typeof product.price === "number") {
            return product.price;
        }

        return 0;

    }


    /* ======================================================================
       10. NORMALISE PRODUCT NAME
       ====================================================================== */

    function getProductName(product) {

        if (!product) {
            return "Unnamed Product";
        }

        return (

            product.name ||

            product.title ||

            product.label ||

            "Unnamed Product"

        );

    }


    /* ======================================================================
       11. NORMALISE PRODUCT ID
       ====================================================================== */

    function getProductId(product) {

        if (!product) {
            return null;
        }

        return (

            product.id ||

            product.value ||

            null

        );

    }


    /* ======================================================================
       12. ADD PRODUCT TO SYSTEM
       ====================================================================== */

    function addProduct(product, quantity = 1) {

        const productId = getProductId(product);

        if (!productId) {

            console.warn(
                "Nexpak Configurator: Product has no valid ID.",
                product
            );

            return;

        }

        const price = getProductPrice(product);

        const name = getProductName(product);

        const qty =
            Math.max(
                0,
                parseInt(quantity, 10) || 0
            );


        /* Quantity of zero means remove the product */

        if (qty === 0) {

            removeProduct(productId);

            return;

        }


        state.selections[productId] = {

            id: productId,

            name: name,

            price: price,

            quantity: qty,

            image:
                product.image ||
                product.img ||
                "",

            category:
                product.category ||
                state.category,

            group:
                product.group ||
                product.productGroup ||
                "",

            unit:
                product.unit ||
                "each"

        };


        updateTotals();

    }


    /* ======================================================================
       13. CHANGE PRODUCT QUANTITY
       ====================================================================== */

    function changeQuantity(product, amount) {

        const productId = getProductId(product);

        if (!productId) {
            return;
        }

        const existing =
            state.selections[productId];


        const currentQuantity =
            existing
                ? existing.quantity
                : 0;


        const newQuantity =
            Math.max(
                0,
                currentQuantity + amount
            );


        if (newQuantity === 0) {

            removeProduct(productId);

            return;

        }


        addProduct(product, newQuantity);

    }


    /* ======================================================================
       14. REMOVE PRODUCT
       ====================================================================== */

    function removeProduct(productId) {

        if (
            Object.prototype.hasOwnProperty.call(
                state.selections,
                productId
            )
        ) {

            delete state.selections[productId];

        }

        updateTotals();

    }


    /* ======================================================================
       15. CLEAR CURRENT SYSTEM
       ====================================================================== */

    function clearSystem() {

        state.selections = {};

        updateTotals();

    }


    /* ======================================================================
       16. CALCULATE TOTALS
       ====================================================================== */

    function updateTotals() {

        let subtotal = 0;

        let itemCount = 0;

        let productCount = 0;


        Object.values(state.selections).forEach(product => {

            const quantity =
                Number(product.quantity) || 0;

            const price =
                Number(product.price) || 0;


            subtotal += price * quantity;

            itemCount += quantity;

            productCount += 1;

        });


        const vat =
            subtotal * VAT_RATE;


        const grandTotal =
            subtotal + vat;


        state.totals = {

            itemCount,

            productCount,

            subtotal,

            vat,

            grandTotal

        };


        updateSummary();

    }


    /* ======================================================================
       17. UPDATE SUMMARY PANEL
       ====================================================================== */

    function updateSummary() {

        if (elements.summaryCategory) {

            elements.summaryCategory.textContent =
                state.categoryTitle;

        }


        if (elements.summaryAddonCount) {

            elements.summaryAddonCount.textContent =

                `${state.totals.itemCount} ` +

                (
                    state.totals.itemCount === 1
                        ? "item"
                        : "items"
                ) +

                ` configured`;

        }


        if (elements.summarySubtotal) {

            elements.summarySubtotal.textContent =
                formatMoney(
                    state.totals.subtotal
                );

        }


        if (elements.summaryVat) {

            elements.summaryVat.textContent =
                formatMoney(
                    state.totals.vat
                );

        }


        if (elements.summaryGrandTotal) {

            elements.summaryGrandTotal.textContent =
                formatMoney(
                    state.totals.grandTotal
                );

        }


        updateCartButtonState();

    }


    /* ======================================================================
       18. CART BUTTON STATE
       ====================================================================== */

    function updateCartButtonState() {

        if (!elements.addToCart) {
            return;
        }

        const hasProducts =
            state.totals.productCount > 0;


        elements.addToCart.disabled =
            !hasProducts;


        if (hasProducts) {

            elements.addToCart.classList.remove(
                "disabled"
            );

        } else {

            elements.addToCart.classList.add(
                "disabled"
            );

        }

    }


    /* ======================================================================
       19. DISPLAY TOAST
       ====================================================================== */

    function showToast(message, type = "success") {

        if (!elements.toast) {
            return;
        }


        const icon =
            type === "error"

                ? "fa-circle-exclamation"

                : "fa-check";


        elements.toast.innerHTML = `

            <div class="cart-notification ${type}">

                <i class="fa-solid ${icon}"></i>

                <span>${message}</span>

            </div>

        `;


        window.setTimeout(() => {

            elements.toast.innerHTML = "";

        }, 3000);

    }


    /* ======================================================================
       20. PUBLIC CONFIGURATOR API
       ====================================================================== */

    window.NEXPAK_CONFIGURATOR = {

        state,

        addProduct,

        changeQuantity,

        removeProduct,

        clearSystem,

        setCategory,

        updateTotals,

        formatMoney

    };


    /* ======================================================================
       PART 1 INITIALISATION
       ====================================================================== */

    setCategory(state.category);

    updateTotals();

});

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   PART 2 — PRODUCT DISCOVERY & PRODUCT CARD RENDERING
   ========================================================================== */


/* ========================================================================
   21. PRODUCT SOURCE DETECTION
   ========================================================================

   The current shop-data.js contains configurator products inside:

       SHOP_DATA.configurators[category]

   Some future products may eventually live inside:

       SHOP_DATA.products

   This function supports BOTH structures.

   IMPORTANT:
   - Pre-built kits are NOT used.
   - Nothing is automatically selected.
   - Every product starts at quantity 0.
   ======================================================================== */

function getConfiguratorSource(categoryId) {

    /* ---------------------------------------------------------------
       PRIMARY PRODUCT DATABASE
       --------------------------------------------------------------- */

    if (
        Array.isArray(SHOP_DATA.products)
    ) {

        const products =
            SHOP_DATA.products.filter(product => {

                return (
                    product.category === categoryId ||
                    product.systemCategory === categoryId ||
                    product.system === categoryId
                );

            });


        if (products.length > 0) {

            return products;

        }

    }


    /* ---------------------------------------------------------------
       CURRENT CONFIGURATOR DATABASE
       ---------------------------------------------------------------

       Your existing shop-data.js uses:

       configurators: {
           "electric-fencing": [...]
       }

       Each field can contain multiple product options.
       We flatten those options into individual products.
       --------------------------------------------------------------- */

    if (
        SHOP_DATA.configurators &&
        Array.isArray(
            SHOP_DATA.configurators[categoryId]
        )
    ) {

        return flattenConfiguratorFields(
            SHOP_DATA.configurators[categoryId],
            categoryId
        );

    }


    return [];

}


/* ========================================================================
   22. FLATTEN EXISTING CONFIGURATOR OPTIONS
   ======================================================================== */

function flattenConfiguratorFields(fields, categoryId) {

    const products = [];


    fields.forEach(field => {

        if (
            !field ||
            !Array.isArray(field.options)
        ) {

            return;

        }


        field.options.forEach(option => {

            if (!option) {
                return;
            }


            const productId =
                option.productId ||

                option.id ||

                `${categoryId}-${field.id}-${option.value}`;


            products.push({

                id: productId,

                name:
                    option.label ||
                    option.name ||
                    field.label ||
                    "Unnamed Product",

                title:
                    option.label ||
                    option.name ||
                    field.label ||
                    "Unnamed Product",

                priceExclVat:
                    Number(option.price) || 0,

                price:
                    Number(option.price) || 0,

                image:
                    option.image ||
                    field.image ||
                    "",

                category:
                    categoryId,

                group:
                    option.group ||
                    field.group ||
                    field.id ||
                    "general",

                groupTitle:
                    option.groupTitle ||
                    field.groupTitle ||
                    field.label ||
                    "Products",

                description:
                    option.description ||
                    "",

                unit:
                    option.unit ||
                    "each",

                weightKg:
                    Number(option.weight) || 0,

                sourceField:
                    field.id,

                sourceType:
                    field.type

            });

        });

    });


    return products;

}


/* ========================================================================
   23. GET ALL PRODUCTS FOR CURRENT CATEGORY
   ======================================================================== */

function getCurrentProducts() {

    return getConfiguratorSource(
        state.category
    );

}


/* ========================================================================
   24. NORMALISE PRODUCT GROUP
   ======================================================================== */

function getProductGroup(product) {

    if (!product) {

        return {

            id: "general",

            title: "Products"

        };

    }


    const rawGroup =

        product.group ||

        product.productGroup ||

        product.groupId ||

        product.sourceField ||

        "general";


    const rawTitle =

        product.groupTitle ||

        product.productGroupTitle ||

        product.section ||

        product.categoryGroup ||

        product.sourceField ||

        "Products";


    return {

        id:
            String(rawGroup)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-"),

        title:
            formatGroupTitle(rawTitle)

    };

}


/* ========================================================================
   25. FORMAT GROUP TITLE
   ======================================================================== */

function formatGroupTitle(value) {

    if (!value) {

        return "Products";

    }


    const text =
        String(value)
            .replace(/[-_]+/g, " ")
            .trim();


    /* Known professional group names */

    const knownTitles = {

        "brand":
            "Brands",

        "bracketlines":
            "Brackets & Mounting",

        "bracket-lines":
            "Brackets & Mounting",

        "bracketcolour":
            "Brackets & Mounting",

        "bracket-colour":
            "Brackets & Mounting",

        "bartype":
            "Brackets & Mounting",

        "bracketstyle":
            "Brackets & Mounting",

        "stays":
            "Stays & Supports",

        "staysleeves":
            "Stay Sleeves",

        "stay-sleeves":
            "Stay Sleeves",

        "lugs":
            "Lugs & Connections",

        "anchors":
            "Anchors & Fixings",

        "wirerolls":
            "Electric Fence Wire",

        "wire-rolls":
            "Electric Fence Wire",

        "ferrules":
            "Ferrules",

        "hardware":
            "Tensioners & Hooks",

        "earthspikes":
            "Earthing",

        "earth-spikes":
            "Earthing",

        "earthloops":
            "Earthing",

        "earth-loops":
            "Earthing",

        "htcable":
            "HT Cable",

        "ht-cable":
            "HT Cable",

        "energizeroutput":
            "Energizers",

        "energizer-output":
            "Energizers",

        "batterybackup":
            "Power & Backup",

        "battery-backup":
            "Power & Backup",

        "powersupply":
            "Power & Keypads",

        "power-supply":
            "Power & Keypads",

        "enclosure":
            "Enclosures",

        "commsmodule":
            "Communication Modules",

        "comms-module":
            "Communication Modules",

        "visualaudioalerts":
            "Sirens, Strobes & Warning Lights",

        "visual-audio-alerts":
            "Sirens, Strobes & Warning Lights",

        "installation":
            "Installation"

    };


    const normalisedKey =
        text
            .toLowerCase()
            .replace(/\s+/g, "-");


    if (
        knownTitles[normalisedKey]
    ) {

        return knownTitles[normalisedKey];

    }


    return text
        .split(" ")
        .map(word => {

            if (!word) {
                return "";
            }

            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );

        })
        .join(" ");

}


/* ========================================================================
   26. GROUP PRODUCTS
   ======================================================================== */

function groupProducts(products) {

    const groups = {};


    products.forEach(product => {

        const group =
            getProductGroup(product);


        if (!groups[group.id]) {

            groups[group.id] = {

                id:
                    group.id,

                title:
                    group.title,

                products:
                    []

            };

        }


        groups[group.id].products.push(
            product
        );

    });


    return Object.values(groups);

}


/* ========================================================================
   27. ESCAPE HTML
   ========================================================================

   Prevents product names/descriptions from accidentally being interpreted
   as HTML.
   ======================================================================== */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ========================================================================
   28. GET CURRENT PRODUCT QUANTITY
   ======================================================================== */

function getProductQuantity(productId) {

    if (
        state.selections &&
        state.selections[productId]
    ) {

        return Number(
            state.selections[productId].quantity
        ) || 0;

    }


    return 0;

}


/* ========================================================================
   29. PRODUCT CARD HTML
   ======================================================================== */

function createProductCard(product) {

    const productId =
        getProductId(product);


    const name =
        getProductName(product);


    const price =
        getProductPrice(product);


    const quantity =
        getProductQuantity(productId);


    const image =
        product.image ||
        product.img ||
        "";


    const description =
        product.description ||
        "";


    const unit =
        product.unit ||
        "each";


    const imageHTML = image

        ? `

            <div class="system-product-image">

                <img
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(name)}"
                    loading="lazy"
                >

            </div>

        `

        : `

            <div class="system-product-image system-product-placeholder">

                <i class="fa-solid fa-shield-halved"></i>

            </div>

        `;


    return `

        <article
            class="system-product-card"
            data-product-id="${escapeHtml(productId)}"
        >

            ${imageHTML}


            <div class="system-product-content">

                <div class="system-product-info">

                    <h4 class="system-product-name">

                        ${escapeHtml(name)}

                    </h4>


                    ${
                        description

                            ? `

                                <p class="system-product-description">

                                    ${escapeHtml(description)}

                                </p>

                              `

                            : ""

                    }

                </div>


                <div class="system-product-bottom">

                    <div class="system-product-price">

                        ${formatMoney(price)}

                        <small>
                            / ${escapeHtml(unit)}
                        </small>

                    </div>


                    <div class="system-product-controls">

                        <button
                            type="button"
                            class="system-qty-btn system-qty-minus"
                            data-product-id="${escapeHtml(productId)}"
                            aria-label="Decrease ${escapeHtml(name)} quantity"
                        >

                            <i class="fa-solid fa-minus"></i>

                        </button>


                        <input
                            type="number"
                            class="system-qty-input"
                            data-product-id="${escapeHtml(productId)}"
                            value="${quantity}"
                            min="0"
                            step="1"
                            aria-label="${escapeHtml(name)} quantity"
                        >


                        <button
                            type="button"
                            class="system-qty-btn system-qty-plus"
                            data-product-id="${escapeHtml(productId)}"
                            aria-label="Increase ${escapeHtml(name)} quantity"
                        >

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>

                </div>


                <div class="system-product-selected">

                    ${
                        quantity > 0

                            ? `

                                <i class="fa-solid fa-check"></i>

                                ${quantity}
                                selected

                              `

                            : `

                                Select quantity

                              `

                    }

                </div>

            </div>

        </article>

    `;

}


/* ========================================================================
   30. PRODUCT GROUP HTML
   ======================================================================== */

function createProductGroup(group) {

    const productCards =
        group.products
            .map(product =>
                createProductCard(product)
            )
            .join("");


    return `

        <section
            class="system-product-group"
            data-group-id="${escapeHtml(group.id)}"
        >

            <div class="system-group-header">

                <div>

                    <span class="system-group-eyebrow">

                        BUILD YOUR SYSTEM

                    </span>


                    <h3>

                        ${escapeHtml(group.title)}

                    </h3>

                </div>


                <span class="system-group-count">

                    ${group.products.length}

                    ${
                        group.products.length === 1
                            ? " product"
                            : " products"
                    }

                </span>

            </div>


            <div class="system-product-grid">

                ${productCards}

            </div>

        </section>

    `;

}


/* ========================================================================
   31. EMPTY CATEGORY STATE
   ======================================================================== */

function createEmptyCategoryState() {

    return `

        <div class="system-empty-state">

            <div class="system-empty-icon">

                <i class="fa-solid fa-box-open"></i>

            </div>


            <h3>

                Products Coming Soon

            </h3>


            <p>

                Individual products for this system are
                being added to the Nexpak catalogue.

            </p>

        </div>

    `;

}


/* ========================================================================
   32. RENDER PRODUCT CATALOGUE
   ======================================================================== */

function renderProductCatalogue() {

    if (!elements.configurator) {

        console.warn(
            "Nexpak Configurator: " +
            "#configuratorSelectors was not found."
        );

        return;

    }


    const products =
        getCurrentProducts();


    if (!products.length) {

        elements.configurator.innerHTML =
            createEmptyCategoryState();

        return;

    }


    const groups =
        groupProducts(products);


    elements.configurator.innerHTML =
        groups
            .map(group =>
                createProductGroup(group)
            )
            .join("");


    attachProductControls();

}


/* ========================================================================
   33. ATTACH PRODUCT CONTROLS
   ======================================================================== */

function attachProductControls() {

    /* ---------------------------------------------------------------
       PLUS BUTTONS
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".system-qty-plus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;


                    const product =
                        getCurrentProducts()
                            .find(
                                item =>
                                    getProductId(item) ===
                                    productId
                            );


                    if (!product) {
                        return;
                    }


                    changeQuantity(
                        product,
                        1
                    );


                    refreshProductCard(
                        productId
                    );

                }
            );

        });


    /* ---------------------------------------------------------------
       MINUS BUTTONS
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".system-qty-minus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;


                    const product =
                        getCurrentProducts()
                            .find(
                                item =>
                                    getProductId(item) ===
                                    productId
                            );


                    if (!product) {
                        return;
                    }


                    changeQuantity(
                        product,
                        -1
                    );


                    refreshProductCard(
                        productId
                    );

                }
            );

        });


    /* ---------------------------------------------------------------
       DIRECT NUMBER INPUT
       --------------------------------------------------------------- */

        document
        .querySelectorAll(
            ".system-qty-input"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                function () {

                    const productId =
                        this.dataset.productId;

                    let quantity =
                        parseInt(this.value, 10);

                    if (
                        isNaN(quantity) ||
                        quantity < 0
                    ) {
                        quantity = 0;
                    }

                    /*
                     * Prevent excessively large quantities
                     */
                    if (quantity > 999) {
                        quantity = 999;
                    }

                    this.value = quantity;

                    updateQuantity(
                        productId,
                        quantity
                    );
                }
            );

            /*
             * Enter key should not submit
             * the entire configurator form.
             */
            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {
                        event.preventDefault();

                        this.blur();
                    }
                }
            );
        });


    /* ---------------------------------------------------------------
       QUANTITY UPDATE
       --------------------------------------------------------------- */

    function updateQuantity(
        productId,
        quantity
    ) {

        const product =
            findProduct(productId);

        if (!product) {
            return;
        }

        if (quantity <= 0) {

            delete systemState.items[
                productId
            ];

        } else {

            systemState.items[
                productId
            ] = {
                id: product.id,
                name: product.name,
                price: Number(
                    product.price || 0
                ),
                quantity: quantity,
                category:
                    product.category || "",
                sku:
                    product.sku || ""
            };
        }

        updateConfiguratorSummary();
        updateSelectedProductsUI();
    }


    /* ---------------------------------------------------------------
       FIND PRODUCT
       --------------------------------------------------------------- */

    function findProduct(productId) {

        let foundProduct = null;

        /*
         * Search the complete SHOP_DATA
         * configurator database.
         */

        if (
            typeof SHOP_DATA !== "undefined" &&
            SHOP_DATA.configurators
        ) {

            Object.values(
                SHOP_DATA.configurators
            ).forEach(category => {

                if (foundProduct) {
                    return;
                }

                category.forEach(group => {

                    if (foundProduct) {
                        return;
                    }

                    if (
                        !group.options
                    ) {
                        return;
                    }

                    const match =
                        group.options.find(
                            option =>
                                option.value ===
                                productId
                        );

                    if (match) {

                        foundProduct = {
                            id:
                                match.value,

                            name:
                                match.label,

                            price:
                                Number(
                                    match.price || 0
                                ),

                            weight:
                                Number(
                                    match.weight || 0
                                ),

                            category:
                                group.label,

                            sku:
                                match.sku ||
                                match.value
                        };
                    }
                });
            });
        }

        return foundProduct;
    }


    /* ---------------------------------------------------------------
       SELECT / OPTION PRODUCTS
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".system-option"
        )
        .forEach(option => {

            option.addEventListener(
                "click",
                function () {

                    const group =
                        this.dataset.group;

                    const productId =
                        this.dataset.productId;

                    /*
                     * Remove active state from
                     * other products in same group.
                     */

                    document
                        .querySelectorAll(
                            `.system-option[data-group="${group}"]`
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );
                        });

                    this.classList.add(
                        "active"
                    );

                    /*
                     * Store selected product.
                     */

                    const product =
                        findProduct(
                            productId
                        );

                    if (!product) {
                        return;
                    }

                    /*
                     * Remove any previous
                     * selection from this group.
                     */

                    Object.keys(
                        systemState.selections
                    ).forEach(key => {

                        if (
                            systemState
                                .selections[key]
                                .group === group
                        ) {

                            delete systemState
                                .selections[key];
                        }
                    });

                    systemState.selections[
                        group
                    ] = {

                        group: group,

                        id:
                            product.id,

                        name:
                            product.name,

                        price:
                            product.price,

                        quantity: 1
                    };

                    updateConfiguratorSummary();
                    updateSelectedProductsUI();
                }
            );
        });


    /* ---------------------------------------------------------------
       PRODUCT CARD + BUTTON QUANTITY CONTROLS
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".system-product"
        )
        .forEach(card => {

            const productId =
                card.dataset.productId;

            const plusButton =
                card.querySelector(
                    ".system-qty-plus"
                );

            const minusButton =
                card.querySelector(
                    ".system-qty-minus"
                );

            const input =
                card.querySelector(
                    ".system-qty-input"
                );

            if (plusButton) {

                plusButton.addEventListener(
                    "click",
                    function () {

                        if (!input) {
                            return;
                        }

                        let quantity =
                            parseInt(
                                input.value,
                                10
                            ) || 0;

                        quantity++;

                        input.value =
                            quantity;

                        updateQuantity(
                            productId,
                            quantity
                        );
                    }
                );
            }

            if (minusButton) {

                minusButton.addEventListener(
                    "click",
                    function () {

                        if (!input) {
                            return;
                        }

                        let quantity =
                            parseInt(
                                input.value,
                                10
                            ) || 0;

                        if (
                            quantity <= 0
                        ) {
                            return;
                        }

                        quantity--;

                        input.value =
                            quantity;

                        updateQuantity(
                            productId,
                            quantity
                        );
                    }
                );
            }
        });


    /* ---------------------------------------------------------------
       UPDATE SELECTED PRODUCT DISPLAY
       --------------------------------------------------------------- */

    function updateSelectedProductsUI() {

        document
            .querySelectorAll(
                ".system-product"
            )
            .forEach(card => {

                const productId =
                    card.dataset.productId;

                const item =
                    systemState.items[
                        productId
                    ];

                const input =
                    card.querySelector(
                        ".system-qty-input"
                    );

                const quantity =
                    item
                        ? item.quantity
                        : 0;

                if (input) {
                    input.value =
                        quantity;
                }

                if (item) {

                    card.classList.add(
                        "selected"
                    );

                } else {

                    card.classList.remove(
                        "selected"
                    );
                }
            });
    }


    /* ---------------------------------------------------------------
       CONFIGURATION SUMMARY
       --------------------------------------------------------------- */

    function updateConfiguratorSummary() {

        let subtotal = 0;
        let itemCount = 0;

        /*
         * Quantity products
         */

        Object.values(
            systemState.items
        ).forEach(item => {

            const quantity =
                Number(
                    item.quantity || 0
                );

            const price =
                Number(
                    item.price || 0
                );

            subtotal +=
                price * quantity;

            itemCount += quantity;
        });


        /*
         * Single-select products
         */

        Object.values(
            systemState.selections
        ).forEach(item => {

            subtotal +=
                Number(
                    item.price || 0
                );
        });


        const vat =
            subtotal *
            (
                typeof SHOP_DATA !== "undefined" &&
                SHOP_DATA.company &&
                SHOP_DATA.company.vatRate
                    ? SHOP_DATA.company.vatRate
                    : 0.15
            );

        const total =
            subtotal + vat;


        /*
         * Update summary elements
         */

        const subtotalElement =
            document.getElementById(
                "summarySubtotal"
            );

        const vatElement =
            document.getElementById(
                "summaryVat"
            );

        const totalElement =
            document.getElementById(
                "summaryGrandTotal"
            );

        const countElement =
            document.getElementById(
                "summaryAddonCount"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                formatCurrency(
                    subtotal
                );
        }

        if (vatElement) {

            vatElement.textContent =
                formatCurrency(
                    vat
                );
        }

        if (totalElement) {

            totalElement.textContent =
                formatCurrency(
                    total
                );
        }

        if (countElement) {

            countElement.textContent =
                `${itemCount} items configured`;
        }
    }


    /* ---------------------------------------------------------------
       CURRENCY FORMATTER
       --------------------------------------------------------------- */

    function formatCurrency(
        amount
    ) {

        return (
            "R " +
            Number(amount || 0)
                .toLocaleString(
                    "en-ZA",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )
        );
    }


    /* ---------------------------------------------------------------
       CLEAR CURRENT CONFIGURATION
       --------------------------------------------------------------- */

    function clearConfiguration() {

        systemState.items = {};
        systemState.selections = {};

        document
            .querySelectorAll(
                ".system-qty-input"
            )
            .forEach(input => {

                input.value = 0;
            });

        document
            .querySelectorAll(
                ".system-product"
            )
            .forEach(card => {

                card.classList.remove(
                    "selected"
                );
            });

        document
            .querySelectorAll(
                ".system-option"
            )
            .forEach(option => {

                option.classList.remove(
                    "active"
                );
            });

        updateConfiguratorSummary();
        updateSelectedProductsUI();
    }

    /* ---------------------------------------------------------------
       CATEGORY NAVIGATION
       --------------------------------------------------------------- */

    function setupCategoryNavigation() {

        const tabs =
            document.querySelectorAll(
                ".nav-tab"
            );

        tabs.forEach(tab => {

            tab.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.category;

                    if (!category) {
                        return;
                    }

                    /*
                     * Remove active state
                     */

                    tabs.forEach(item => {

                        item.classList.remove(
                            "active"
                        );
                    });

                    /*
                     * Activate clicked category
                     */

                    this.classList.add(
                        "active"
                    );

                    /*
                     * Update system state
                     */

                    systemState.category =
                        category;

                    /*
                     * Update category title
                     */

                    const categoryData =
                        getCategoryData(
                            category
                        );

                    if (categoryData) {

                        systemState.categoryTitle =
                            categoryData.title;

                        const title =
                            document.getElementById(
                                "currentCategoryTitle"
                            );

                        if (title) {

                            title.textContent =
                                categoryData.title;
                        }
                    }

                    /*
                     * Clear previous configuration
                     *
                     * Each system starts clean.
                     * Nothing from another system
                     * should accidentally carry over.
                     */

                    systemState.items = {};
                    systemState.selections = {};

                    /*
                     * Render the complete product
                     * selection interface.
                     */

                    renderSystemProducts(
                        category
                    );

                    updateConfiguratorSummary();
                }
            );
        });
    }


    /* ---------------------------------------------------------------
       GET CATEGORY INFORMATION
       --------------------------------------------------------------- */

    function getCategoryData(
        categoryId
    ) {

        if (
            typeof SHOP_DATA === "undefined" ||
            !SHOP_DATA.categories
        ) {
            return null;
        }

        return SHOP_DATA.categories.find(
            category =>
                category.id === categoryId
        ) || null;
    }


    /* ---------------------------------------------------------------
       GET CATEGORY CONFIGURATION
       --------------------------------------------------------------- */

    function getCategoryConfiguration(
        categoryId
    ) {

        if (
            typeof SHOP_DATA === "undefined" ||
            !SHOP_DATA.configurators
        ) {
            return [];
        }

        return (
            SHOP_DATA
                .configurators[
                    categoryId
                ] || []
        );
    }


    /* ---------------------------------------------------------------
       RENDER COMPLETE SYSTEM PRODUCT
       SELECTOR
       --------------------------------------------------------------- */

    function renderSystemProducts(
        categoryId
    ) {

        const container =
            document.getElementById(
                "configuratorSelectors"
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const configuration =
            getCategoryConfiguration(
                categoryId
            );

        if (
            !configuration ||
            configuration.length === 0
        ) {

            container.innerHTML = `
                <div class="system-empty-state">

                    <div class="system-empty-icon">
                        <i class="fa-solid fa-box-open"></i>
                    </div>

                    <h3>
                        Products Coming Soon
                    </h3>

                    <p>
                        We're currently adding
                        products for this system.
                    </p>

                </div>
            `;

            return;
        }


        /*
         * Create every product group.
         */

        configuration.forEach(
            (group, groupIndex) => {

                const groupElement =
                    document.createElement(
                        "section"
                    );

                groupElement.className =
                    "system-product-group";

                groupElement.dataset.group =
                    group.id;


                /*
                 * Group heading
                 */

                const heading =
                    document.createElement(
                        "div"
                    );

                heading.className =
                    "system-group-heading";

                heading.innerHTML = `

                    <div>
                        <span class="system-group-number">
                            ${String(
                                groupIndex + 1
                            ).padStart(2, "0")}
                        </span>

                        <div class="system-group-title-wrap">

                            <h3>
                                ${escapeHtml(
                                    group.label
                                )}
                            </h3>

                            <p>
                                ${
                                    group.type ===
                                    "quantity-selector"

                                        ? "Select any products and quantities you need."
                                        : "Select one option."
                                }
                            </p>

                        </div>
                    </div>

                `;

                groupElement.appendChild(
                    heading
                );


                /*
                 * PRODUCT GRID
                 */

                const productGrid =
                    document.createElement(
                        "div"
                    );

                productGrid.className =
                    "system-product-grid";


                /*
                 * Render products
                 */

                if (
                    Array.isArray(
                        group.options
                    )
                ) {

                    group.options.forEach(
                        option => {

                            const productCard =
                                createProductCard(
                                    option,
                                    group
                                );

                            productGrid.appendChild(
                                productCard
                            );
                        }
                    );
                }


                groupElement.appendChild(
                    productGrid
                );

                container.appendChild(
                    groupElement
                );
            }
        );


        /*
         * Reconnect quantity and selection
         * events after rendering.
         */

        attachDynamicProductEvents();

        updateSelectedProductsUI();
    }


    /* ---------------------------------------------------------------
       CREATE PRODUCT CARD
       --------------------------------------------------------------- */

    function createProductCard(
        product,
        group
    ) {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "system-product";


        card.dataset.productId =
            product.value;

        card.dataset.group =
            group.id;


        const price =
            Number(
                product.price || 0
            );


        /*
         * Different controls depending
         * on the product group.
         */

        let controlHTML = "";


        if (
            group.type ===
            "quantity-selector"
        ) {

            controlHTML = `

                <div class="system-quantity-control">

                    <button
                        type="button"
                        class="system-qty-minus"
                        aria-label="Decrease quantity"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <input
                        type="number"
                        class="system-qty-input"
                        data-product-id="${escapeAttribute(
                            product.value
                        )}"
                        value="0"
                        min="0"
                        max="999"
                        inputmode="numeric"
                        aria-label="Quantity"
                    >

                    <button
                        type="button"
                        class="system-qty-plus"
                        aria-label="Increase quantity"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            `;

        } else {

            controlHTML = `

                <button
                    type="button"
                    class="system-option"
                    data-group="${escapeAttribute(
                        group.id
                    )}"
                    data-product-id="${escapeAttribute(
                        product.value
                    )}"
                >

                    <span>
                        Select
                    </span>

                    <i class="fa-solid fa-check"></i>

                </button>

            `;
        }


        /*
         * Product card HTML
         */

        card.innerHTML = `

            <div class="system-product-info">

                <div class="system-product-icon">

                    <i class="fa-solid fa-shield-halved"></i>

                </div>

                <div class="system-product-details">

                    <h4>
                        ${escapeHtml(
                            product.label
                        )}
                    </h4>

                    <div class="system-product-meta">

                        <span class="system-product-price">
                            ${formatCurrency(
                                price
                            )}
                        </span>

                        ${
                            product.weight
                                ? `
                                    <span class="system-product-weight">
                                        <i class="fa-solid fa-box"></i>
                                        ${product.weight} kg
                                    </span>
                                  `
                                : ""
                        }

                    </div>

                </div>

            </div>

            <div class="system-product-action">

                ${
                    group.type ===
                    "quantity-selector"

                        ? controlHTML

                        : controlHTML
                }

            </div>

        `;


        return card;
    }


    /* ---------------------------------------------------------------
       DYNAMIC PRODUCT EVENTS
       --------------------------------------------------------------- */

    function attachDynamicProductEvents() {

        /*
         * Quantity + buttons
         */

        document
            .querySelectorAll(
                ".system-qty-plus"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const card =
                            this.closest(
                                ".system-product"
                            );

                        if (!card) {
                            return;
                        }

                        const input =
                            card.querySelector(
                                ".system-qty-input"
                            );

                        if (!input) {
                            return;
                        }

                        let quantity =
                            parseInt(
                                input.value,
                                10
                            ) || 0;

                        if (
                            quantity >= 999
                        ) {
                            return;
                        }

                        quantity++;

                        input.value =
                            quantity;

                        updateQuantity(
                            card.dataset.productId,
                            quantity
                        );
                    }
                );
            });


        /*
         * Quantity - buttons
         */

        document
            .querySelectorAll(
                ".system-qty-minus"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const card =
                            this.closest(
                                ".system-product"
                            );

                        if (!card) {
                            return;
                        }

                        const input =
                            card.querySelector(
                                ".system-qty-input"
                            );

                        if (!input) {
                            return;
                        }

                        let quantity =
                            parseInt(
                                input.value,
                                10
                            ) || 0;

                        if (
                            quantity <= 0
                        ) {
                            return;
                        }

                        quantity--;

                        input.value =
                            quantity;

                        updateQuantity(
                            card.dataset.productId,
                            quantity
                        );
                    }
                );
            });


        /*
         * Direct quantity input
         */

        document
            .querySelectorAll(
                ".system-qty-input"
            )
            .forEach(input => {

                input.addEventListener(
                    "change",
                    function () {

                        let quantity =
                            parseInt(
                                this.value,
                                10
                            ) || 0;

                        if (
                            quantity < 0
                        ) {
                            quantity = 0;
                        }

                        if (
                            quantity > 999
                        ) {
                            quantity = 999;
                        }

                        this.value =
                            quantity;

                        updateQuantity(
                            this.dataset.productId,
                            quantity
                        );
                    }
                );
            });


        /*
         * Single-select products
         */

        document
            .querySelectorAll(
                ".system-option"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const group =
                            this.dataset.group;

                        const productId =
                            this.dataset.productId;

                        const product =
                            findProduct(
                                productId
                            );

                        if (!product) {
                            return;
                        }


                        /*
                         * Remove previous
                         * selection in group.
                         */

                        document
                            .querySelectorAll(
                                `.system-option[data-group="${group}"]`
                            )
                            .forEach(
                                option => {

                                    option.classList.remove(
                                        "active"
                                    );

                                    option
                                        .closest(
                                            ".system-product"
                                        )
                                        ?.classList.remove(
                                            "selected"
                                        );
                                }
                            );


                        /*
                         * Activate selected product.
                         */

                        this.classList.add(
                            "active"
                        );

                        this
                            .closest(
                                ".system-product"
                            )
                            ?.classList.add(
                                "selected"
                            );


                        /*
                         * Save selection.
                         */

                        systemState.selections[
                            group
                        ] = {

                            group: group,

                            id:
                                product.id,

                            name:
                                product.name,

                            price:
                                product.price,

                            quantity: 1
                        };


                        updateConfiguratorSummary();
                    }
                );
            });
    }


    /* ---------------------------------------------------------------
       ESCAPE HTML
       --------------------------------------------------------------- */

    function escapeHtml(
        value
    ) {

        return String(
            value ?? ""
        )
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


    /* ---------------------------------------------------------------
       12. FORMAT CURRENCY
       --------------------------------------------------------------- */

    function formatCurrency(
        amount
    ) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ).format(
            Number(amount) || 0
        );
    }


    /* ---------------------------------------------------------------
       13. FIND CONFIGURATION OPTION
       --------------------------------------------------------------- */

    function findOption(
        field,
        value
    ) {

        if (
            !field ||
            !Array.isArray(
                field.options
            )
        ) {
            return null;
        }

        return field.options.find(
            option =>
                String(
                    option.value
                ) === String(value)
        ) || null;
    }


    /* ---------------------------------------------------------------
       14. GET SELECTED OPTION
       --------------------------------------------------------------- */

    function getSelectedOption(
        fieldId
    ) {

        const field =
            getFieldById(
                fieldId
            );

        if (!field) {
            return null;
        }

        const selected =
            state.selections[
                fieldId
            ];

        if (
            selected === undefined ||
            selected === null ||
            selected === ""
        ) {
            return null;
        }

        return findOption(
            field,
            selected
        );
    }


    /* ---------------------------------------------------------------
       15. GET FIELD BY ID
       --------------------------------------------------------------- */

    function getFieldById(
        fieldId
    ) {

        const schema =
            getCurrentSchema();

        return schema.find(
            field =>
                field.id === fieldId
        ) || null;
    }


    /* ---------------------------------------------------------------
       16. GET CURRENT SCHEMA
       --------------------------------------------------------------- */

    function getCurrentSchema() {

        if (
            typeof SHOP_DATA === "undefined" ||
            !SHOP_DATA.configurators
        ) {
            return [];
        }

        return (
            SHOP_DATA.configurators[
                state.category
            ] || []
        );
    }


    /* ---------------------------------------------------------------
       17. CALCULATE SELECTION TOTAL
       --------------------------------------------------------------- */

    function calculateSelectionsTotal() {

        let total = 0;

        Object.keys(
            state.selections
        ).forEach(
            fieldId => {

                const field =
                    getFieldById(
                        fieldId
                    );

                if (!field) {
                    return;
                }

                const selected =
                    state.selections[
                        fieldId
                    ];

                /*
                 * Quantity-selector fields are handled separately.
                 */
                if (
                    field.type ===
                    "quantity-selector"
                ) {
                    return;
                }

                const option =
                    findOption(
                        field,
                        selected
                    );

                if (option) {
                    total +=
                        Number(
                            option.price
                        ) || 0;
                }
            }
        );

        return total;
    }


    /* ---------------------------------------------------------------
       18. CALCULATE QUANTITY TOTAL
       --------------------------------------------------------------- */

    function calculateQuantitiesTotal() {

        let total = 0;

        Object.keys(
            state.quantities
        ).forEach(
            optionValue => {

                const item =
                    state.quantities[
                        optionValue
                    ];

                if (!item) {
                    return;
                }

                const qty =
                    Number(
                        item.qty
                    ) || 0;

                const price =
                    Number(
                        item.price
                    ) || 0;

                total +=
                    qty * price;
            }
        );

        return total;
    }


    /* ---------------------------------------------------------------
       19. CALCULATE GRAND SUBTOTAL
       --------------------------------------------------------------- */

    function calculateSubtotal() {

        return (
            calculateSelectionsTotal() +
            calculateQuantitiesTotal()
        );
    }


    /* ---------------------------------------------------------------
       20. CALCULATE VAT
       --------------------------------------------------------------- */

    function calculateVat(
        subtotal
    ) {

        const vatRate =
            typeof SHOP_DATA !== "undefined" &&
            SHOP_DATA.company &&
            typeof SHOP_DATA.company.vatRate === "number"
                ? SHOP_DATA.company.vatRate
                : 0.15;

        return (
            Number(subtotal) || 0
        ) * vatRate;
    }


    /* ---------------------------------------------------------------
       21. UPDATE SUMMARY
       --------------------------------------------------------------- */

    function updateSummary() {

        const subtotal =
            calculateSubtotal();

        const vat =
            calculateVat(
                subtotal
            );

        const grandTotal =
            subtotal + vat;

        const selectedCount =
            Object.keys(
                state.selections
            ).length;

        const quantityCount =
            Object.values(
                state.quantities
            ).reduce(
                (
                    total,
                    item
                ) => {

                    return total +
                        (
                            Number(
                                item.qty
                            ) || 0
                        );

                },
                0
            );

        const totalConfigured =
            selectedCount +
            quantityCount;

        setText(
            "summaryAddonCount",
            `${totalConfigured} item${
                totalConfigured === 1
                    ? ""
                    : "s"
            } configured`
        );

        setText(
            "summarySubtotal",
            formatCurrency(
                subtotal
            )
        );

        setText(
            "summaryVat",
            formatCurrency(
                vat
            )
        );

        setText(
            "summaryGrandTotal",
            formatCurrency(
                grandTotal
            )
        );

        updateSummaryBreakdown();

        updateConfiguratorTotals();
    }


    /* ---------------------------------------------------------------
       22. SUMMARY BREAKDOWN
       --------------------------------------------------------------- */

    function updateSummaryBreakdown() {

        const container =
            document.getElementById(
                "summaryBreakdown"
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const rows = [];


        /*
         * Single-select products
         */
        Object.keys(
            state.selections
        ).forEach(
            fieldId => {

                const field =
                    getFieldById(
                        fieldId
                    );

                if (!field) {
                    return;
                }

                const option =
                    findOption(
                        field,
                        state.selections[
                            fieldId
                        ]
                    );

                if (!option) {
                    return;
                }

                rows.push({
                    name:
                        option.label,

                    qty: 1,

                    price:
                        Number(
                            option.price
                        ) || 0
                });
            }
        );


        /*
         * Quantity products
         */
        Object.keys(
            state.quantities
        ).forEach(
            optionValue => {

                const item =
                    state.quantities[
                        optionValue
                    ];


                      if (
                    !item ||
                    Number(item.qty) <= 0
                ) {
                    return;
                }

                const field =
                    getFieldForOption(
                        optionValue
                    );

                const option =
                    field
                        ? findOption(
                            field,
                            optionValue
                        )
                        : null;

                if (!option) {
                    return;
                }

                const qty =
                    Number(item.qty) || 0;

                const price =
                    Number(option.price) || 0;

                total +=
                    qty * price;
            }
        );

        return total;
    }


    /* ---------------------------------------------------------------
       30. FIND FIELD FOR OPTION
       --------------------------------------------------------------- */

    function getFieldForOption(
        optionValue
    ) {

        const schema =
            getCurrentSchema();

        return schema.find(
            field => {

                if (
                    !Array.isArray(
                        field.options
                    )
                ) {
                    return false;
                }

                return field.options.some(
                    option =>
                        String(
                            option.value
                        ) ===
                        String(
                            optionValue
                        )
                );
            }
        ) || null;
    }


    /* ---------------------------------------------------------------
       31. UPDATE QUANTITY STATE
       --------------------------------------------------------------- */

    function updateQuantity(
        optionValue,
        quantity
    ) {

        const field =
            getFieldForOption(
                optionValue
            );

        if (!field) {
            return;
        }

        const option =
            findOption(
                field,
                optionValue
            );

        if (!option) {
            return;
        }

        let qty =
            Number(quantity) || 0;

        qty =
            Math.floor(qty);

        if (qty < 0) {
            qty = 0;
        }


        if (qty === 0) {

            delete state.quantities[
                optionValue
            ];

        } else {

            state.quantities[
                optionValue
            ] = {

                value:
                    option.value,

                label:
                    option.label,

                name:
                    option.label,

                price:
                    Number(
                        option.price
                    ) || 0,

                weight:
                    Number(
                        option.weight
                    ) || 0,

                qty:
                    qty
            };
        }


        const productRow =
            document.querySelector(
                `.quantity-option[data-option-value="${CSS.escape(
                    optionValue
                )}"]`
            );

        if (productRow) {

            productRow.classList.toggle(
                "selected",
                qty > 0
            );
        }


        updateQuantityRowTotal(
            optionValue,
            qty,
            option
        );

        updateSummary();
    }


    /* ---------------------------------------------------------------
       32. UPDATE QUANTITY ROW TOTAL
       --------------------------------------------------------------- */

    function updateQuantityRowTotal(
        optionValue,
        quantity,
        option
    ) {

        const row =
            document.querySelector(
                `.quantity-option[data-option-value="${CSS.escape(
                    optionValue
                )}"]`
            );

        if (!row) {
            return;
        }

        let totalElement =
            row.querySelector(
                ".system-product-line-total"
            );

        if (!totalElement) {

            totalElement =
                document.createElement(
                    "span"
                );

            totalElement.className =
                "system-product-line-total";

            const controls =
                row.querySelector(
                    ".system-product-controls"
                );

            if (controls) {

                controls.appendChild(
                    totalElement
                );
            }
        }


        const total =
            (
                Number(quantity) || 0
            ) *
            (
                Number(option.price) || 0
            );

        totalElement.textContent =
            total > 0
                ? formatCurrency(total)
                : "";
    }


    /* ---------------------------------------------------------------
       33. CATEGORY TAB EVENTS
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".nav-tab"
        )
        .forEach(
            tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        const category =
                            tab.dataset.category;

                        if (!category) {
                            return;
                        }

                        renderCategory(
                            category
                        );
                    }
                );
            }
        );


    /* ---------------------------------------------------------------
       34. CART COUNT
       --------------------------------------------------------------- */

    function updateCartCount() {

        const badge =
            document.getElementById(
                "cartCountBadge"
            );

        if (!badge) {
            return;
        }

        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "nexpak_cart"
                    )
                ) || [];

        } catch (error) {

            cart = [];
        }

        let count = 0;

        cart.forEach(
            item => {

                if (
                    item &&
                    item.type ===
                        "configured-system"
                ) {

                    count++;

                    return;
                }

                if (
                    item &&
                    item.quantity
                ) {

                    count +=
                        Number(
                            item.quantity
                        ) || 0;

                    return;
                }

                count++;
            }
        );

        badge.textContent =
            count;
    }


    /* ---------------------------------------------------------------
       35. ADD CONFIGURED SYSTEM TO CART
       --------------------------------------------------------------- */

    function addConfiguredSystemToCart() {

        const subtotal =
            calculateSubtotal();

        if (
            subtotal <= 0
        ) {

            showToast(
                "Please select at least one product before adding your system to the cart.",
                "warning"
            );

            return;
        }


        const selectedProducts =
            [];


        /*
         * Single-select products
         */
        Object.keys(
            state.selections
        ).forEach(
            fieldId => {

                const field =
                    getFieldById(
                        fieldId
                    );

                if (!field) {
                    return;
                }

                const option =
                    findOption(
                        field,
                        state.selections[
                            fieldId
                        ]
                    );

                if (!option) {
                    return;
                }

                selectedProducts.push({

                    fieldId:
                        field.id,

                    fieldLabel:
                        field.label,

                    productId:
                        option.value,

                    productName:
                        option.label,

                    quantity:
                        1,

                    unitPrice:
                        Number(
                            option.price
                        ) || 0,

                    lineTotal:
                        Number(
                            option.price
                        ) || 0
                });
            }
        );


        /*
         * Quantity products
         */
        Object.keys(
            state.quantities
        ).forEach(
            optionValue => {

                const item =
                    state.quantities[
                        optionValue
                    ];

                if (
                    !item ||
                    Number(item.qty) <= 0
                ) {
                    return;
                }

                const field =
                    getFieldForOption(
                        optionValue
                    );

                if (!field) {
                    return;
                }

                selectedProducts.push({

                    fieldId:
                        field.id,

                    fieldLabel:
                        field.label,

                    productId:
                        optionValue,

                    productName:
                        item.label ||
                        item.name ||
                        optionValue,

                    quantity:
                        Number(
                            item.qty
                        ),

                    unitPrice:
                        Number(
                            item.price
                        ) || 0,

                    lineTotal:
                        (
                            Number(
                                item.qty
                            ) || 0
                        ) *
                        (
                            Number(
                                item.price
                            ) || 0
                        )
                });
            }
        );


        const vat =
            calculateVat(
                subtotal
            );

        const grandTotal =
            subtotal + vat;


        const configuredSystem = {

            id:
                `SYSTEM-${Date.now()}`,

            type:
                "configured-system",

            category:
                state.category,

            categoryTitle:
                state.categoryTitle,

            products:
                selectedProducts,

            subtotalExclVat:
                Number(
                    subtotal.toFixed(2)
                ),

            vat:
                Number(
                    vat.toFixed(2)
                ),

            totalInclVat:
                Number(
                    grandTotal.toFixed(2)
                ),

            createdAt:
                new Date().toISOString()
        };


        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "nexpak_cart"
                    )
                ) || [];

        } catch (error) {

            cart = [];
        }


        if (!Array.isArray(cart)) {
            cart = [];
        }


        cart.push(
            configuredSystem
        );


        localStorage.setItem(
            "nexpak_cart",
            JSON.stringify(
                cart
            )
        );


        updateCartCount();

        showToast(
            "Your configured system was added to the cart.",
            "success"
        );
    }


    /* ---------------------------------------------------------------
       36. ADD TO CART BUTTON
       --------------------------------------------------------------- */

    const addToCartButton =
        document.getElementById(
            "btnAddToCart"
        );

    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            addConfiguredSystemToCart
        );
    }


    /* ---------------------------------------------------------------
       37. TOAST NOTIFICATIONS
       --------------------------------------------------------------- */

    function showToast(
        message,
        type = "success"
    ) {

        let container =
            document.getElementById(
                "toastContainer"
            );

        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "toastContainer";

            document.body.appendChild(
                container
            );
        }


        const toast =
            document.createElement(
                "div"
            );

        toast.className =
            `config-toast ${type}`;


        let icon =
            "fa-circle-check";

        if (type === "warning") {
            icon =
                "fa-triangle-exclamation";
        }

        if (type === "error") {
            icon =
                "fa-circle-xmark";
        }


        toast.innerHTML = `

            <i class="fa-solid ${icon}"></i>

            <span>
                ${escapeHtml(
                    message
                )}
            </span>

        `;


        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.classList.add(
                    "show"
                );
            }
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

                setTimeout(
                    () => {

                        toast.remove();

                    },
                    300
                );

            },
            3200
        );
    }


    /* ---------------------------------------------------------------
       38. INITIALISE CONFIGURATOR
       --------------------------------------------------------------- */

    function initialiseConfigurator() {

        if (
            typeof SHOP_DATA ===
            "undefined"
        ) {

            console.error(
                "SHOP_DATA is not available. Make sure shop-data.js loads before configurator.js."
            );

            showToast(
                "Product database could not be loaded.",
                "error"
            );

            return;
        }


        /*
         * Start with the first available category.
         */
        const firstCategory =
            SHOP_DATA.categories &&
            SHOP_DATA.categories.length
                ? SHOP_DATA.categories[0].id
                : "electric-fencing";


        renderCategory(
            state.category ||
            firstCategory
        );


        updateCartCount();
    }


    /* ---------------------------------------------------------------
       39. START
       --------------------------------------------------------------- */

    initialiseConfigurator();

});
           
