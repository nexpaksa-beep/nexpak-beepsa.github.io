/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   configurator.js

   PART 1 — CORE CONFIGURATION, STATE & DATABASE CONNECTION
   ==========================================================================

   PURPOSE:
   - Build completely custom security systems
   - NO pre-built kits
   - Uses individual products from SHOP_DATA
   - Every product has its own quantity
   - Live pricing
   - 15% VAT from SHOP_DATA
   - Compatible with cart.js
   - Compatible with delivery.js
   - Compatible with checkout.js
   - Compatible with payment.js

   ARCHITECTURE:

        shop-data.js
              ↓
        Individual Products
              ↓
        configurator.js
              ↓
        Custom System
              ↓
           cart.js
              ↓
        delivery.js
              ↓
        checkout.js
              ↓
        payment.js

   ========================================================================== */


/* ==========================================================================
   1. WAIT FOR SHOP DATA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* ======================================================================
       2. BASIC SHOP DATA CHECK
       ====================================================================== */

    if (typeof SHOP_DATA === "undefined") {

        console.error(
            "Nexpak Configurator V3: SHOP_DATA is not available."
        );

        return;
    }


    /* ======================================================================
       3. COMPANY SETTINGS
       ====================================================================== */

    const VAT_RATE =
        SHOP_DATA.company &&
        typeof SHOP_DATA.company.vatRate === "number"

            ? SHOP_DATA.company.vatRate

            : 0.15;


    const CURRENCY =
        SHOP_DATA.company &&
        SHOP_DATA.company.currency

            ? SHOP_DATA.company.currency

            : "ZAR";


    /* ======================================================================
       4. CONFIGURATOR STATE
       ======================================================================

       IMPORTANT:

       There is ONLY ONE state object in V3.

       We do NOT use:
           systemState
           selectedState
           configuratorState
           multiple competing objects

       Everything belongs here.
       ====================================================================== */

    const state = {

        /* ---------------------------------------------------------------
           CURRENT SECURITY SYSTEM
           --------------------------------------------------------------- */

        category: "electric-fencing",

        categoryTitle: "Electric Fencing",


        /* ---------------------------------------------------------------
           SELECTED PRODUCTS
           ---------------------------------------------------------------

           Example:

           selections: {
               "ef-walltop-001": {
                   id: "ef-walltop-001",
                   name: "Wall Top Bracket",
                   price: 85,
                   quantity: 4,
                   image: "",
                   group: "brackets"
               }
           }

           Every product is independent.
           --------------------------------------------------------------- */

        selections: {},


        /* ---------------------------------------------------------------
           CALCULATED TOTALS
           --------------------------------------------------------------- */

        totals: {

            productCount: 0,

            itemCount: 0,

            subtotal: 0,

            vat: 0,

            grandTotal: 0

        }

    };


    /* ======================================================================
       5. DOM ELEMENT REFERENCES
       ====================================================================== */

    const elements = {

        /* Main configurator product area */

        configurator:
            document.getElementById(
                "configuratorSelectors"
            ),


        /* Current category heading */

        categoryTitle:
            document.getElementById(
                "currentCategoryTitle"
            ),


        /* Summary */

        summaryCategory:
            document.getElementById(
                "summaryCategory"
            ),

        summaryAddonCount:
            document.getElementById(
                "summaryAddonCount"
            ),

        summarySubtotal:
            document.getElementById(
                "summarySubtotal"
            ),

        summaryVat:
            document.getElementById(
                "summaryVat"
            ),

        summaryGrandTotal:
            document.getElementById(
                "summaryGrandTotal"
            ),


        /* Add to cart */

        addToCart:
            document.getElementById(
                "btnAddToCart"
            ),


        /* Cart badge */

        cartBadge:
            document.getElementById(
                "cartCountBadge"
            ),


        /* Toast */

        toast:
            document.getElementById(
                "toastContainer"
            )

    };


    /* ======================================================================
       6. CATEGORY HELPERS
       ====================================================================== */

    function getCategories() {

        if (
            !Array.isArray(
                SHOP_DATA.categories
            )
        ) {

            return [];

        }

        return SHOP_DATA.categories;

    }


    function getCategory(categoryId) {

        return getCategories().find(
            function (category) {

                return category.id === categoryId;

            }
        );

    }


    /* ======================================================================
       7. SET CURRENT CATEGORY
       ====================================================================== */

    function setCategory(categoryId) {

        const category =
            getCategory(categoryId);


        if (!category) {

            console.warn(
                "Nexpak Configurator V3: " +
                "Unknown category:",
                categoryId
            );

            return false;

        }


        state.category =
            category.id;


        /* Remove wording such as "Kits" or "Systems"
           from the display heading where appropriate. */

        state.categoryTitle =
            String(
                category.title || category.id
            )
                .replace(
                    /\s+Kits$/i,
                    ""
                )
                .replace(
                    /\s+Systems$/i,
                    ""
                );


        /* Changing system type starts a fresh configuration. */

        state.selections = {};


        resetTotals();


        return true;

    }


    /* ======================================================================
       8. RESET TOTALS
       ====================================================================== */

    function resetTotals() {

        state.totals = {

            productCount: 0,

            itemCount: 0,

            subtotal: 0,

            vat: 0,

            grandTotal: 0

        };

    }


    /* ======================================================================
       9. MONEY FORMATTER
       ====================================================================== */

    function formatMoney(amount) {

        const value =
            Number(amount) || 0;


        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {
                    style: "currency",
                    currency: CURRENCY,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ).format(value);

        }

        catch (error) {

            return (
                "R " +
                value.toFixed(2)
            );

        }

    }


    /* ======================================================================
       10. PRODUCT NORMALISATION
       ====================================================================== */

    function getProductId(product) {

        if (!product) {

            return null;

        }


        return (
            product.id ||
            product.value ||
            product.productId ||
            null
        );

    }


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


    function getProductPrice(product) {

        if (!product) {

            return 0;

        }


        if (
            typeof product.priceExclVat ===
            "number"
        ) {

            return product.priceExclVat;

        }


        if (
            typeof product.price ===
            "number"
        ) {

            return product.price;

        }


        return (
            Number(
                product.priceExclVat
            ) ||

            Number(
                product.price
            ) ||

            0
        );

    }


    /* ======================================================================
       11. NORMALISE PRODUCT FOR CONFIGURATOR
       ====================================================================== */

    function normaliseProduct(product) {

        if (!product) {

            return null;

        }


        const id =
            getProductId(product);


        if (!id) {

            return null;

        }


        return {

            id: id,

            name:
                getProductName(product),

            price:
                getProductPrice(product),

            image:
                product.image ||
                product.img ||
                "",

            category:
                product.category ||
                product.systemCategory ||
                state.category,

            group:
                product.group ||
                product.productGroup ||
                "general",

            groupTitle:
                product.groupTitle ||
                product.groupName ||
                "",

            description:
                product.description ||
                "",

            unit:
                product.unit ||
                "each",

            weightKg:
                Number(
                    product.weightKg ||
                    product.weight ||
                    0
                ) || 0

        };

    }


    /* ======================================================================
       12. PUBLIC CONFIGURATOR OBJECT
       ====================================================================== */

    window.NEXPAK_CONFIGURATOR = {

        state: state,

        VAT_RATE: VAT_RATE,

        CURRENCY: CURRENCY,

        getCategories: getCategories,

        getCategory: getCategory,

        setCategory: setCategory,

        formatMoney: formatMoney,

        normaliseProduct: normaliseProduct

    };


    /* ======================================================================
       13. INITIAL CATEGORY
       ====================================================================== */

    setCategory(
        "electric-fencing"
    );


    console.log(
        "Nexpak Configurator V3 loaded successfully."
    );


});

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 2 — PRODUCT DISCOVERY
   ========================================================================== */


/* ==========================================================================
   14. GET PRODUCT DATABASE
   ========================================================================== */

function getProductDatabase() {

    /*
       Preferred structure:

           SHOP_DATA.products

       This is the cleanest structure because each
       product exists independently.

       Example:

           {
               id: "EF-BRACKET-001",
               name: "Wall Top Bracket",
               category: "electric-fencing",
               priceExclVat: 85
           }

       No pre-built kits are read here.
    */

    if (
        Array.isArray(
            SHOP_DATA.products
        )
    ) {

        return SHOP_DATA.products;

    }


    return [];

}


/* ==========================================================================
   15. GET PRODUCTS FOR CATEGORY
   ========================================================================== */

function getProductsForCategory(categoryId) {

    const products =
        getProductDatabase();


    if (!categoryId) {

        return [];

    }


    return products

        .filter(function (product) {

            if (!product) {

                return false;

            }


            /*
               Support the category naming used
               throughout the Nexpak database.
            */

            return (

                product.category === categoryId ||

                product.systemCategory === categoryId ||

                product.system === categoryId

            );

        })

        .map(function (product) {

            return normaliseProduct(product);

        })

        .filter(function (product) {

            return product !== null;

        });

}


/* ==========================================================================
   16. FALLBACK — CONFIGURATOR PRODUCT DATABASE
   ==========================================================================

   Older versions of shop-data.js may contain products under:

       SHOP_DATA.configurators

   This fallback allows the new configurator to work
   with that structure while the product database is
   being completed.

   IMPORTANT:

   This does NOT create pre-built kits.

   It simply converts individual configurator options
   into individual products.
   ========================================================================== */

function getProductsFromConfiguratorData(
    categoryId
) {

    if (
        !SHOP_DATA.configurators ||
        !Array.isArray(
            SHOP_DATA.configurators[categoryId]
        )
    ) {

        return [];

    }


    const fields =
        SHOP_DATA.configurators[
            categoryId
        ];


    const products = [];


    fields.forEach(function (field) {

        if (
            !field ||
            !Array.isArray(field.options)
        ) {

            return;

        }


        field.options.forEach(function (option) {

            if (!option) {

                return;

            }


            const generatedId =

                option.productId ||

                option.id ||

                `${categoryId}-${field.id}-${option.value}`;


            const product = {

                id: generatedId,

                name:
                    option.label ||
                    option.name ||
                    field.label ||
                    "Unnamed Product",

                priceExclVat:
                    Number(
                        option.price
                    ) || 0,

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
                    Number(
                        option.weight
                    ) || 0

            };


            const normalised =
                normaliseProduct(product);


            if (normalised) {

                products.push(
                    normalised
                );

            }

        });

    });


    return products;

}


/* ==========================================================================
   17. COMBINED CATEGORY PRODUCT SOURCE
   ========================================================================== */

function getConfiguratorProducts(
    categoryId
) {

    /*
       FIRST:
       Use the proper individual product database.
    */

    const databaseProducts =
        getProductsForCategory(
            categoryId
        );


    if (
        databaseProducts.length > 0
    ) {

        return databaseProducts;

    }


    /*
       FALLBACK:
       Use individual options from
       SHOP_DATA.configurators.
    */

    return getProductsFromConfiguratorData(
        categoryId
    );

}


/* ==========================================================================
   18. REMOVE DUPLICATE PRODUCTS
   ========================================================================== */

function removeDuplicateProducts(
    products
) {

    const seen =
        new Set();


    return products.filter(
        function (product) {

            if (!product || !product.id) {

                return false;

            }


            if (
                seen.has(product.id)
            ) {

                return false;

            }


            seen.add(
                product.id
            );


            return true;

        }
    );

}


/* ==========================================================================
   19. GET CURRENT CATEGORY PRODUCTS
   ========================================================================== */

function getCurrentProducts() {

    const products =
        getConfiguratorProducts(
            state.category
        );


    return removeDuplicateProducts(
        products
    );

}


/* ==========================================================================
   20. GET PRODUCT BY ID
   ========================================================================== */

function findConfiguratorProduct(
    productId
) {

    if (!productId) {

        return null;

    }


    const products =
        getCurrentProducts();


    return (

        products.find(
            function (product) {

                return (
                    product.id ===
                    productId
                );

            }
        ) ||

        null

    );

}


/* ==========================================================================
   21. GET PRODUCT GROUP
   ========================================================================== */

function getProductGroup(
    product
) {

    if (!product) {

        return {

            id: "general",

            title: "Products"

        };

    }


    return {

        id:
            product.group ||
            "general",

        title:
            product.groupTitle ||
            product.group ||
            "Products"

    };

}


/* ==========================================================================
   22. GROUP PRODUCTS
   ========================================================================== */

function groupProducts(
    products
) {

    const groups = {};


    products.forEach(
        function (product) {

            if (!product) {

                return;

            }


            const group =
                getProductGroup(
                    product
                );


            if (
                !groups[group.id]
            ) {

                groups[group.id] = {

                    id:
                        group.id,

                    title:
                        group.title,

                    products: []

                };

            }


            groups[group.id]
                .products
                .push(product);

        }
    );


    return Object.values(
        groups
    );

}


/* ==========================================================================
   23. UPDATE PUBLIC API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .getProductsForCategory =
            getConfiguratorProducts;


    window.NEXPAK_CONFIGURATOR
        .getCurrentProducts =
            getCurrentProducts;


    window.NEXPAK_CONFIGURATOR
        .findProduct =
            findConfiguratorProduct;


    window.NEXPAK_CONFIGURATOR
        .groupProducts =
            groupProducts;

}


/* ==========================================================================
   PART 2 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 3 — PRODUCT CARD RENDERING
   ========================================================================== */


/* ==========================================================================
   24. ESCAPE HTML
   ========================================================================== */

function escapeHtml(value) {

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


/* ==========================================================================
   25. FORMAT PRODUCT IMAGE
   ========================================================================== */

function getProductImage(product) {

    if (
        product &&
        product.image
    ) {

        return product.image;

    }


    /*
       No fake image is generated here.
       CSS can provide the visual fallback.
    */

    return "";

}


/* ==========================================================================
   26. CREATE PRODUCT CARD
   ========================================================================== */

function createProductCard(product) {

    const productId =
        escapeHtml(
            product.id
        );


    const productName =
        escapeHtml(
            product.name
        );


    const description =
        escapeHtml(
            product.description
        );


    const image =
        getProductImage(
            product
        );


    const price =
        formatMoney(
            product.price
        );


    const existing =
        state.selections[
            product.id
        ];


    const quantity =
        existing
            ? Number(
                existing.quantity
            ) || 0
            : 0;


    const selectedClass =
        quantity > 0
            ? " selected"
            : "";


    const imageHtml = image

        ? `
            <div class="system-product-image">
                <img
                    src="${escapeHtml(image)}"
                    alt="${productName}"
                    loading="lazy"
                >
            </div>
          `

        : `
            <div class="system-product-image no-image">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
          `;


    return `

        <article
            class="system-product-card${selectedClass}"
            data-product-id="${productId}"
        >

            ${imageHtml}


            <div class="system-product-content">

                <div class="system-product-info">

                    <h4 class="system-product-name">
                        ${productName}
                    </h4>


                    ${
                        description

                            ? `
                                <p class="system-product-description">
                                    ${description}
                                </p>
                              `

                            : ""
                    }

                </div>


                <div class="system-product-price">

                    ${price}

                    <span class="system-product-unit">
                        / ${escapeHtml(product.unit)}
                    </span>

                </div>


                <div class="system-product-actions">

                    <button
                        type="button"
                        class="system-qty-btn system-qty-minus"
                        data-product-id="${productId}"
                        aria-label="Decrease ${productName} quantity"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>


                    <input
                        type="number"
                        class="system-qty-input"
                        data-product-id="${productId}"
                        value="${quantity}"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        aria-label="${productName} quantity"
                    >


                    <button
                        type="button"
                        class="system-qty-btn system-qty-plus"
                        data-product-id="${productId}"
                        aria-label="Increase ${productName} quantity"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>


                <div class="system-product-selected">

                    ${
                        quantity > 0

                            ? `
                                <i class="fa-solid fa-check"></i>
                                Added to system
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


/* ==========================================================================
   27. CREATE PRODUCT GROUP
   ========================================================================== */

function createProductGroup(group) {

    if (
        !group ||
        !Array.isArray(
            group.products
        )
    ) {

        return "";

    }


    const productCards =
        group.products

            .map(
                function (product) {

                    return createProductCard(
                        product
                    );

                }
            )

            .join("");


    if (!productCards) {

        return "";

    }


    return `

        <section
            class="system-product-group"
            data-group-id="${escapeHtml(group.id)}"
        >

            <div class="system-group-header">

                <div>

                    <h3>
                        ${escapeHtml(group.title)}
                    </h3>

                </div>

            </div>


            <div class="system-product-grid">

                ${productCards}

            </div>

        </section>

    `;

}


/* ==========================================================================
   28. RENDER CURRENT CATEGORY
   ========================================================================== */

function renderConfigurator() {

    if (
        !elements.configurator
    ) {

        console.warn(
            "Nexpak Configurator V3: " +
            "#configuratorSelectors was not found."
        );

        return;

    }


    const products =
        getCurrentProducts();


    /*
       No products available.
    */

    if (
        products.length === 0
    ) {

        elements.configurator.innerHTML = `

            <div class="system-empty-state">

                <i class="fa-solid fa-box-open"></i>

                <h3>
                    Products Coming Soon
                </h3>

                <p>
                    Products for this system
                    are currently being prepared.
                </p>

            </div>

        `;

        updateSummary();

        return;

    }


    const groups =
        groupProducts(
            products
        );


    elements.configurator.innerHTML =

        groups

            .map(
                function (group) {

                    return createProductGroup(
                        group
                    );

                }
            )

            .join("");


    attachProductEvents();

    updateSummary();

}


/* ==========================================================================
   29. REFRESH CURRENT PRODUCT DISPLAY
   ========================================================================== */

function refreshConfiguratorProducts() {

    renderConfigurator();

}


/* ==========================================================================
   30. UPDATE PRODUCT CARD VISUAL STATE
   ========================================================================== */

function updateProductCard(productId) {

    if (!elements.configurator) {

        return;

    }


    const card =
        elements.configurator.querySelector(
            `.system-product-card[data-product-id="${CSS.escape(productId)}"]`
        );


    if (!card) {

        return;

    }


    const selected =
        state.selections[
            productId
        ];


    const quantity =
        selected
            ? Number(
                selected.quantity
            ) || 0
            : 0;


    const input =
        card.querySelector(
            ".system-qty-input"
        );


    const status =
        card.querySelector(
            ".system-product-selected"
        );


    if (input) {

        input.value =
            quantity;

    }


    if (quantity > 0) {

        card.classList.add(
            "selected"
        );


        if (status) {

            status.innerHTML = `

                <i class="fa-solid fa-check"></i>
                Added to system

            `;

        }

    }

    else {

        card.classList.remove(
            "selected"
        );


        if (status) {

            status.innerHTML =
                "Select quantity";

        }

    }

}


/* ==========================================================================
   31. PUBLIC RENDER API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .render =
            renderConfigurator;


    window.NEXPAK_CONFIGURATOR
        .refreshProducts =
            refreshConfiguratorProducts;

}


/* ==========================================================================
   PART 3 COMPLETE
   ========================================================================== */
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 4 — PRODUCT QUANTITY CONTROLS
   ========================================================================== */


/* ==========================================================================
   32. ATTACH PRODUCT EVENTS
   ========================================================================== */

function attachProductEvents() {

    if (!elements.configurator) {

        return;

    }


    /* ----------------------------------------------------------------------
       PLUS BUTTONS
       ---------------------------------------------------------------------- */

    elements.configurator
        .querySelectorAll(
            ".system-qty-plus"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const productId =
                            this.dataset.productId;


                        if (!productId) {

                            return;

                        }


                        const product =
                            findConfiguratorProduct(
                                productId
                            );


                        if (!product) {

                            return;

                        }


                        changeProductQuantity(
                            product,
                            1
                        );

                    }
                );

            }
        );


    /* ----------------------------------------------------------------------
       MINUS BUTTONS
       ---------------------------------------------------------------------- */

    elements.configurator
        .querySelectorAll(
            ".system-qty-minus"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const productId =
                            this.dataset.productId;


                        if (!productId) {

                            return;

                        }


                        const product =
                            findConfiguratorProduct(
                                productId
                            );


                        if (!product) {

                            return;

                        }


                        changeProductQuantity(
                            product,
                            -1
                        );

                    }
                );

            }
        );


    /* ----------------------------------------------------------------------
       DIRECT NUMBER INPUT
       ---------------------------------------------------------------------- */

    elements.configurator
        .querySelectorAll(
            ".system-qty-input"
        )
        .forEach(
            function (input) {


                /* ----------------------------------------------------------
                   LIVE INPUT VALIDATION
                   ---------------------------------------------------------- */

                input.addEventListener(
                    "input",
                    function () {

                        /*
                           Prevent negative values.
                        */

                        let value =
                            parseInt(
                                this.value,
                                10
                            );


                        if (
                            Number.isNaN(value) ||
                            value < 0
                        ) {

                            value = 0;

                        }


                        this.value =
                            value;

                    }
                );


                /* ----------------------------------------------------------
                   COMMIT DIRECT INPUT
                   ---------------------------------------------------------- */

                input.addEventListener(
                    "change",
                    function () {

                        const productId =
                            this.dataset.productId;


                        if (!productId) {

                            return;

                        }


                        const product =
                            findConfiguratorProduct(
                                productId
                            );


                        if (!product) {

                            return;

                        }


                        let quantity =
                            parseInt(
                                this.value,
                                10
                            );


                        if (
                            Number.isNaN(
                                quantity
                            )
                        ) {

                            quantity = 0;

                        }


                        quantity =
                            Math.max(
                                0,
                                quantity
                            );


                        setProductQuantity(
                            product,
                            quantity
                        );

                    }
                );


                /* ----------------------------------------------------------
                   ENTER KEY
                   ----------------------------------------------------------

                   Allows the customer to type a quantity
                   and press Enter without needing to click
                   somewhere else first.
                   ---------------------------------------------------------- */

                input.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key !== "Enter"
                        ) {

                            return;

                        }


                        event.preventDefault();


                        this.dispatchEvent(
                            new Event(
                                "change",
                                {
                                    bubbles: true
                                }
                            )
                        );


                        this.blur();

                    }
                );

            }
        );

}


/* ==========================================================================
   33. CHANGE PRODUCT QUANTITY
   ========================================================================== */

function changeProductQuantity(
    product,
    amount
) {

    if (!product) {

        return;

    }


    const productId =
        getProductId(
            product
        );


    if (!productId) {

        return;

    }


    const existing =
        state.selections[
            productId
        ];


    const currentQuantity =
        existing

            ? Number(
                existing.quantity
            ) || 0

            : 0;


    const newQuantity =
        Math.max(
            0,
            currentQuantity +
                Number(amount || 0)
        );


    setProductQuantity(
        product,
        newQuantity
    );

}


/* ==========================================================================
   34. SET PRODUCT QUANTITY
   ========================================================================== */

function setProductQuantity(
    product,
    quantity
) {

    if (!product) {

        return;

    }


    const productId =
        getProductId(
            product
        );


    if (!productId) {

        return;

    }


    let newQuantity =
        parseInt(
            quantity,
            10
        );


    if (
        Number.isNaN(
            newQuantity
        )
    ) {

        newQuantity = 0;

    }


    newQuantity =
        Math.max(
            0,
            newQuantity
        );


    /* ----------------------------------------------------------------------
       REMOVE PRODUCT WHEN QUANTITY IS ZERO
       ---------------------------------------------------------------------- */

    if (
        newQuantity === 0
    ) {

        delete state.selections[
            productId
        ];


        updateTotals();


        updateProductCard(
            productId
        );


        return;

    }


    /* ----------------------------------------------------------------------
       SAVE PRODUCT
       ---------------------------------------------------------------------- */

    state.selections[
        productId
    ] = {

        id:
            productId,

        name:
            getProductName(
                product
            ),

        price:
            getProductPrice(
                product
            ),

        quantity:
            newQuantity,

        image:
            product.image ||
            "",

        category:
            product.category ||
            state.category,

        group:
            product.group ||
            "general",

        groupTitle:
            product.groupTitle ||
            "",

        description:
            product.description ||
            "",

        unit:
            product.unit ||
            "each",

        weightKg:
            Number(
                product.weightKg
            ) || 0

    };


    /* ----------------------------------------------------------------------
       UPDATE EVERYTHING
       ---------------------------------------------------------------------- */

    updateTotals();


    updateProductCard(
        productId
    );

}


/* ==========================================================================
   35. GET SELECTED PRODUCT QUANTITY
   ========================================================================== */

function getProductQuantity(
    productId
) {

    if (!productId) {

        return 0;

    }


    const selected =
        state.selections[
            productId
        ];


    if (!selected) {

        return 0;

    }


    return (
        Number(
            selected.quantity
        ) || 0
    );

}


/* ==========================================================================
   36. CHECK WHETHER PRODUCT IS SELECTED
   ========================================================================== */

function isProductSelected(
    productId
) {

    return (
        getProductQuantity(
            productId
        ) > 0
    );

}


/* ==========================================================================
   37. PUBLIC QUANTITY API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .changeProductQuantity =
            changeProductQuantity;


    window.NEXPAK_CONFIGURATOR
        .setProductQuantity =
            setProductQuantity;


    window.NEXPAK_CONFIGURATOR
        .getProductQuantity =
            getProductQuantity;


    window.NEXPAK_CONFIGURATOR
        .isProductSelected =
            isProductSelected;

}


/* ==========================================================================
   PART 4 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   PART 5 — SYSTEM SUMMARY + CART INTEGRATION
   ========================================================================== */


/* ========================================================================
   36. RENDER SELECTED PRODUCTS
   ======================================================================== */

function renderSelectedProducts() {

    const summaryContainer =
        document.getElementById(
            "selectedProducts"
        );


    if (!summaryContainer) {
        return;
    }


    const selectedProducts =
        Object.values(
            state.selections
        );


    if (
        selectedProducts.length === 0
    ) {

        summaryContainer.innerHTML = `

            <div class="empty-system">

                <i class="fa-solid fa-box-open"></i>

                <h4>Your system is empty</h4>

                <p>
                    Select products above to start
                    building your security system.
                </p>

            </div>

        `;

        return;

    }


    summaryContainer.innerHTML = "";


    selectedProducts.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "selected-system-item";


        const lineTotal =
            (
                Number(product.price) || 0
            ) *
            (
                Number(product.quantity) || 0
            );


        item.innerHTML = `

            <div class="selected-item-info">

                <strong>
                    ${escapeHtml(product.name)}
                </strong>

                <span>
                    ${formatMoney(product.price)}
                    × ${product.quantity}
                </span>

            </div>


            <div class="selected-item-total">

                ${formatMoney(lineTotal)}

            </div>


            <button
                type="button"
                class="remove-system-item"
                data-product-id="${escapeHtml(product.id)}"
                aria-label="Remove ${escapeHtml(product.name)}"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        summaryContainer.appendChild(item);

    });


    attachSelectedProductEvents();

}


/* ========================================================================
   37. SELECTED PRODUCT EVENTS
   ======================================================================== */

function attachSelectedProductEvents() {

    document
        .querySelectorAll(
            ".remove-system-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        this.dataset.productId;


                    removeProduct(productId);


                    renderSelectedProducts();

                }
            );

        });

}


/* ========================================================================
   38. RENDER SYSTEM TOTALS
   ======================================================================== */

function renderSystemTotals() {

    const subtotalElement =
        document.getElementById(
            "systemSubtotal"
        );


    const vatElement =
        document.getElementById(
            "systemVat"
        );


    const totalElement =
        document.getElementById(
            "systemGrandTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(
                state.totals.subtotal
            );

    }


    if (vatElement) {

        vatElement.textContent =
            formatMoney(
                state.totals.vat
            );

    }


    if (totalElement) {

        totalElement.textContent =
            formatMoney(
                state.totals.grandTotal
            );

    }

}


/* ========================================================================
   39. REFRESH CONFIGURATOR UI
   ======================================================================== */

function refreshConfiguratorUI() {

    renderSelectedProducts();

    renderSystemTotals();

    updateSummary();

}


/* ========================================================================
   40. UPDATE TOTALS OVERRIDE
   ========================================================================

   We extend the original total calculation so that every UI section
   stays synchronised whenever a product is added, removed or changed.
   ======================================================================== */

const originalUpdateTotals =
    updateTotals;


function updateTotals() {

    originalUpdateTotals();

    renderSelectedProducts();

    renderSystemTotals();

}


/* ========================================================================
   41. ADD PRODUCT WITH UI REFRESH
   ======================================================================== */

const originalAddProduct =
    addProduct;


function addProduct(product, quantity = 1) {

    originalAddProduct(
        product,
        quantity
    );

    renderSelectedProducts();

    renderSystemTotals();

}


/* ========================================================================
   42. CHANGE QUANTITY WITH UI REFRESH
   ======================================================================== */

const originalChangeQuantity =
    changeQuantity;


function changeQuantity(product, amount) {

    originalChangeQuantity(
        product,
        amount
    );

    renderSelectedProducts();

    renderSystemTotals();

}


/* ========================================================================
   43. REMOVE PRODUCT WITH UI REFRESH
   ======================================================================== */

const originalRemoveProduct =
    removeProduct;


function removeProduct(productId) {

    originalRemoveProduct(
        productId
    );

    renderSelectedProducts();

    renderSystemTotals();

}


/* ========================================================================
   44. CLEAR SYSTEM WITH UI REFRESH
   ======================================================================== */

const originalClearSystem =
    clearSystem;


function clearSystem() {

    originalClearSystem();

    renderSelectedProducts();

    renderSystemTotals();

}


/* ========================================================================
   45. ADD COMPLETE SYSTEM TO CART
   ======================================================================== */

function addSystemToCart() {

    const products =
        Object.values(
            state.selections
        );


    if (
        products.length === 0
    ) {

        showToast(
            "Please select at least one product.",
            "error"
        );

        return;

    }


    /* ---------------------------------------------------------------
       BUILD CART OBJECT
       --------------------------------------------------------------- */

    const systemItem = {

        id:
            `SYSTEM-${Date.now()}`,

        type:
            "custom-system",

        category:
            state.category,

        categoryTitle:
            state.categoryTitle,

        name:
            `${state.categoryTitle} — Custom System`,

        products:
            products.map(product => ({

                id:
                    product.id,

                name:
                    product.name,

                price:
                    Number(product.price) || 0,

                quantity:
                    Number(product.quantity) || 0,

                image:
                    product.image || "",

                category:
                    product.category ||
                    state.category,

                group:
                    product.group || "",

                unit:
                    product.unit || "each"

            })),

        totals: {

            subtotal:
                state.totals.subtotal,

            vat:
                state.totals.vat,

            grandTotal:
                state.totals.grandTotal

        },

        createdAt:
            new Date().toISOString()

    };


    /* ---------------------------------------------------------------
       READ EXISTING CART
       --------------------------------------------------------------- */

    let cart = [];


    try {

        const storedCart =
            localStorage.getItem(
                "nexpak_cart"
            );


        if (storedCart) {

            const parsedCart =
                JSON.parse(
                    storedCart
                );


            if (
                Array.isArray(parsedCart)
            ) {

                cart = parsedCart;

            }

        }

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not read cart.",
            error
        );

    }


    /* ---------------------------------------------------------------
       ADD SYSTEM
       --------------------------------------------------------------- */

    cart.push(
        systemItem
    );


    /* ---------------------------------------------------------------
       SAVE CART
       --------------------------------------------------------------- */

    try {

        localStorage.setItem(
            "nexpak_cart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not save cart.",
            error
        );


        showToast(
            "Unable to save your system to the cart.",
            "error"
        );

        return;

    }


    /* ---------------------------------------------------------------
       UPDATE CART BADGE
       --------------------------------------------------------------- */

    updateCartBadge(
        cart
    );


    /* ---------------------------------------------------------------
       SUCCESS MESSAGE
       --------------------------------------------------------------- */

    showToast(
        "Your custom system has been added to the cart."
    );


    /* ---------------------------------------------------------------
       OPTIONAL CART EVENT
       --------------------------------------------------------------- */

    document.dispatchEvent(
        new CustomEvent(
            "nexpak:systemAdded",
            {
                detail: systemItem
            }
        )
    );

}


/* ========================================================================
   46. UPDATE CART BADGE
   ======================================================================== */

function updateCartBadge(
    cart
) {

    if (!elements.cartBadge) {
        return;
    }


    const count =
        Array.isArray(cart)
            ? cart.length
            : 0;


    elements.cartBadge.textContent =
        count;


    elements.cartBadge.style.display =
        count > 0
            ? ""
            : "none";

}


/* ========================================================================
   47. ADD TO CART BUTTON
   ======================================================================== */

if (elements.addToCart) {

    elements.addToCart.addEventListener(
        "click",
        addSystemToCart
    );

}


/* ========================================================================
   48. CLEAR SYSTEM BUTTON
   ======================================================================== */

const clearSystemButton =
    document.getElementById(
        "clearSystem"
    );


if (clearSystemButton) {

    clearSystemButton.addEventListener(
        "click",
        () => {

            if (
                Object.keys(
                    state.selections
                ).length === 0
            ) {

                showToast(
                    "Your system is already empty.",
                    "error"
                );

                return;

            }


            clearSystem();


            showToast(
                "System cleared."
            );

        }
    );

}


/* ========================================================================
   49. INITIAL SUMMARY RENDER
   ======================================================================== */

renderSelectedProducts();

renderSystemTotals();

updateSummary();


/* ========================================================================
   END OF PART 5
   ======================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   PART 6 — DELIVERY + SYSTEM ACTIONS
   ========================================================================== */


/* ========================================================================
   50. GET CURRENT SYSTEM PRODUCTS
   ======================================================================== */

function getCurrentSystemProducts() {

    return Object.values(
        state.selections || {}
    );

}


/* ========================================================================
   51. CALCULATE SYSTEM WEIGHT
   ======================================================================== */

function calculateSystemWeight() {

    const products =
        getCurrentSystemProducts();


    return products.reduce(
        (total, product) => {

            const weight =
                Number(
                    product.weight
                ) || 0;

            const quantity =
                Number(
                    product.quantity
                ) || 0;


            return total +
                (weight * quantity);

        },
        0
    );

}


/* ========================================================================
   52. CALCULATE SYSTEM ITEM COUNT
   ======================================================================== */

function calculateSystemItemCount() {

    const products =
        getCurrentSystemProducts();


    return products.reduce(
        (total, product) => {

            return total +
                (
                    Number(
                        product.quantity
                    ) || 0
                );

        },
        0
    );

}


/* ========================================================================
   53. RENDER SYSTEM ITEM COUNT
   ======================================================================== */

function renderSystemItemCount() {

    const countElement =
        document.getElementById(
            "systemItemCount"
        );


    if (!countElement) {
        return;
    }


    const count =
        calculateSystemItemCount();


    countElement.textContent =
        count;


    countElement.style.display =
        count > 0
            ? ""
            : "none";

}


/* ========================================================================
   54. RENDER SYSTEM WEIGHT
   ======================================================================== */

function renderSystemWeight() {

    const weightElement =
        document.getElementById(
            "systemWeight"
        );


    if (!weightElement) {
        return;
    }


    const weight =
        calculateSystemWeight();


    weightElement.textContent =
        `${weight.toFixed(2)} kg`;

}


/* ========================================================================
   55. DELIVERY CALCULATOR BRIDGE
   ========================================================================

   The configurator does not replace the existing delivery calculator.
   It simply exposes the current system totals so delivery.js can use
   them when required.
   ======================================================================== */

function getConfiguratorDeliveryData() {

    return {

        subtotal:
            Number(
                state.totals.subtotal
            ) || 0,

        vat:
            Number(
                state.totals.vat
            ) || 0,

        grandTotal:
            Number(
                state.totals.grandTotal
            ) || 0,

        itemCount:
            calculateSystemItemCount(),

        weight:
            calculateSystemWeight(),

        category:
            state.category || "",

        categoryTitle:
            state.categoryTitle || "",

        products:
            getCurrentSystemProducts()

    };

}


/* ========================================================================
   56. DISPATCH DELIVERY UPDATE EVENT
   ======================================================================== */

function dispatchDeliveryUpdate() {

    document.dispatchEvent(
        new CustomEvent(
            "nexpak:configuratorUpdated",
            {
                detail:
                    getConfiguratorDeliveryData()
            }
        )
    );

}


/* ========================================================================
   57. EXTENDED UI REFRESH
   ======================================================================== */

const originalRefreshConfiguratorUI =
    refreshConfiguratorUI;


function refreshConfiguratorUI() {

    originalRefreshConfiguratorUI();

    renderSystemItemCount();

    renderSystemWeight();

    dispatchDeliveryUpdate();

}


/* ========================================================================
   58. SAVE CONFIGURATOR STATE
   ======================================================================== */

function saveConfiguratorState() {

    const saveData = {

        category:
            state.category || "",

        categoryTitle:
            state.categoryTitle || "",

        selections:
            state.selections || {},

        totals:
            state.totals || {},

        savedAt:
            new Date().toISOString()

    };


    try {

        localStorage.setItem(
            "nexpak_configurator_state",
            JSON.stringify(
                saveData
            )
        );

        return true;

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not save configurator state.",
            error
        );

        return false;

    }

}


/* ========================================================================
   59. LOAD CONFIGURATOR STATE
   ======================================================================== */

function loadConfiguratorState() {

    try {

        const storedState =
            localStorage.getItem(
                "nexpak_configurator_state"
            );


        if (!storedState) {
            return false;
        }


        const savedState =
            JSON.parse(
                storedState
            );


        if (
            !savedState ||
            typeof savedState !== "object"
        ) {

            return false;

        }


        if (
            savedState.category !== undefined
        ) {

            state.category =
                savedState.category;

        }


        if (
            savedState.categoryTitle !== undefined
        ) {

            state.categoryTitle =
                savedState.categoryTitle;

        }


        if (
            savedState.selections &&
            typeof savedState.selections === "object"
        ) {

            state.selections =
                savedState.selections;

        }


        if (
            savedState.totals &&
            typeof savedState.totals === "object"
        ) {

            state.totals =
                savedState.totals;

        }


        return true;

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not load saved state.",
            error
        );

        return false;

    }

}


/* ========================================================================
   60. CLEAR SAVED CONFIGURATOR STATE
   ======================================================================== */

function clearSavedConfiguratorState() {

    try {

        localStorage.removeItem(
            "nexpak_configurator_state"
        );

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not clear saved state.",
            error
        );

    }

}


/* ========================================================================
   61. SAVE SYSTEM AUTOMATICALLY
   ======================================================================== */

document.addEventListener(
    "nexpak:configuratorUpdated",
    () => {

        saveConfiguratorState();

    }
);


/* ========================================================================
   62. CONTINUE BUILDING BUTTON
   ======================================================================== */

const continueBuildingButton =
    document.getElementById(
        "continueBuilding"
    );


if (continueBuildingButton) {

    continueBuildingButton.addEventListener(
        "click",
        () => {

            const firstProductSection =
                document.querySelector(
                    ".configurator-products-section"
                );


            if (firstProductSection) {

                firstProductSection.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }

        }
    );

}


/* ========================================================================
   63. VIEW CART BUTTON
   ======================================================================== */

const viewCartButton =
    document.getElementById(
        "viewCart"
    );


if (viewCartButton) {

    viewCartButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "cart.html";

        }
    );

}


/* ========================================================================
   64. CONFIRM BEFORE LEAVING EMPTY SYSTEM
   ======================================================================== */

function hasConfiguratorProducts() {

    return Object.keys(
        state.selections || {}
    ).length > 0;

}


/* ========================================================================
   65. SYSTEM SUMMARY DATA ATTRIBUTE
   ======================================================================== */

function updateSystemSummaryAttributes() {

    const summary =
        document.getElementById(
            "systemSummary"
        );


    if (!summary) {
        return;
    }


    summary.dataset.itemCount =
        calculateSystemItemCount();


    summary.dataset.weight =
        calculateSystemWeight()
            .toFixed(2);


    summary.dataset.subtotal =
        Number(
            state.totals.subtotal
        ) || 0;


    summary.dataset.vat =
        Number(
            state.totals.vat
        ) || 0;


    summary.dataset.grandTotal =
        Number(
            state.totals.grandTotal
        ) || 0;

}


/* ========================================================================
   66. FINAL SUMMARY REFRESH
   ======================================================================== */

function refreshSystemSummary() {

    renderSelectedProducts();

    renderSystemTotals();

    renderSystemItemCount();

    renderSystemWeight();

    updateSummary();

    updateSystemSummaryAttributes();

    dispatchDeliveryUpdate();

}


/* ========================================================================
   67. INITIALISE SAVED CONFIGURATOR DATA
   ======================================================================== */

const restoredConfiguratorState =
    loadConfiguratorState();


if (
    restoredConfiguratorState
) {

    try {

        updateTotals();

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not recalculate restored totals.",
            error
        );

    }

}


/* ========================================================================
   68. INITIAL SYSTEM SUMMARY REFRESH
   ======================================================================== */

refreshSystemSummary();


/* ========================================================================
   69. CONFIGURATOR READY EVENT
   ======================================================================== */

document.dispatchEvent(
    new CustomEvent(
        "nexpak:configuratorReady",
        {
            detail:
                getConfiguratorDeliveryData()
        }
    )
);


/* ========================================================================
   END OF PART 6
   ======================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   PART 7 — DELIVERY INTEGRATION + VALIDATION
   ========================================================================== */


/* ========================================================================
   70. GET DELIVERY DATA
   ======================================================================== */

function getSystemDeliveryData() {

    const data =
        getConfiguratorDeliveryData();


    return {

        subtotal:
            Number(data.subtotal) || 0,

        vat:
            Number(data.vat) || 0,

        grandTotal:
            Number(data.grandTotal) || 0,

        itemCount:
            Number(data.itemCount) || 0,

        weight:
            Number(data.weight) || 0,

        category:
            data.category || "",

        categoryTitle:
            data.categoryTitle || "",

        products:
            Array.isArray(data.products)
                ? data.products
                : []

    };

}


/* ========================================================================
   71. UPDATE DELIVERY CALCULATOR
   ======================================================================== */

function updateConfiguratorDelivery() {

    const deliveryData =
        getSystemDeliveryData();


    /*
       If delivery.js exposes a compatible update function,
       pass the configurator data through to it.
    */

    if (
        typeof window.updateDeliveryCalculator ===
        "function"
    ) {

        try {

            window.updateDeliveryCalculator(
                deliveryData
            );

        } catch (error) {

            console.error(
                "Nexpak Configurator: Delivery calculator update failed.",
                error
            );

        }

    }


    /*
       Also expose the data globally so delivery.js
       can retrieve it whenever required.
    */

    window.nexpakConfiguratorDelivery =
        deliveryData;


    return deliveryData;

}


/* ========================================================================
   72. DELIVERY UPDATE EVENT
   ======================================================================== */

document.addEventListener(
    "nexpak:configuratorUpdated",
    () => {

        updateConfiguratorDelivery();

    }
);


/* ========================================================================
   73. CALCULATE DELIVERY ELIGIBILITY
   ======================================================================== */

function isSystemReadyForDelivery() {

    const products =
        getCurrentSystemProducts();


    if (
        products.length === 0
    ) {

        return false;

    }


    return products.some(
        product =>
            (
                Number(
                    product.quantity
                ) || 0
            ) > 0
    );

}


/* ========================================================================
   74. RENDER DELIVERY STATUS
   ======================================================================== */

function renderDeliveryStatus() {

    const statusElement =
        document.getElementById(
            "deliveryStatus"
        );


    if (!statusElement) {
        return;
    }


    const ready =
        isSystemReadyForDelivery();


    if (ready) {

        statusElement.textContent =
            "System ready for delivery calculation.";

        statusElement.classList.add(
            "active"
        );

        statusElement.classList.remove(
            "empty"
        );

    } else {

        statusElement.textContent =
            "Add products to calculate delivery.";

        statusElement.classList.add(
            "empty"
        );

        statusElement.classList.remove(
            "active"
        );

    }

}


/* ========================================================================
   75. SYSTEM VALIDATION
   ======================================================================== */

function validateConfiguratorSystem() {

    const products =
        getCurrentSystemProducts();


    const errors = [];


    if (
        products.length === 0
    ) {

        errors.push(
            "Your system does not contain any products."
        );

    }


    products.forEach(
        product => {

            if (
                !product.id
            ) {

                errors.push(
                    "A selected product is missing its product ID."
                );

            }


            if (
                !product.name
            ) {

                errors.push(
                    "A selected product is missing its name."
                );

            }


            const quantity =
                Number(
                    product.quantity
                );


            if (
                !Number.isFinite(quantity) ||
                quantity <= 0
            ) {

                errors.push(
                    `${product.name || "A product"} has an invalid quantity.`
                );

            }


            const price =
                Number(
                    product.price
                );


            if (
                !Number.isFinite(price) ||
                price < 0
            ) {

                errors.push(
                    `${product.name || "A product"} has an invalid price.`
                );

            }

        }
    );


    return {

        valid:
            errors.length === 0,

        errors

    };

}


/* ========================================================================
   76. SHOW VALIDATION ERRORS
   ======================================================================== */

function showConfiguratorValidationErrors(
    errors
) {

    if (
        !Array.isArray(errors) ||
        errors.length === 0
    ) {

        return;

    }


    const message =
        errors.join(" ");


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            message,
            "error"
        );

    } else {

        console.error(
            "Nexpak Configurator Validation:",
            message
        );

    }

}


/* ========================================================================
   77. VALIDATE BEFORE ADDING SYSTEM TO CART
   ======================================================================== */

const originalAddSystemToCart =
    addSystemToCart;


function addSystemToCart() {

    const validation =
        validateConfiguratorSystem();


    if (
        !validation.valid
    ) {

        showConfiguratorValidationErrors(
            validation.errors
        );

        return;

    }


    /*
       Make sure the latest totals are calculated
       before the system is placed into the cart.
    */

    try {

        updateTotals();

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not update totals before cart.",
            error
        );

    }


    updateConfiguratorDelivery();


    originalAddSystemToCart();

}


/* ========================================================================
   78. UPDATE SUMMARY AFTER DELIVERY CHANGE
   ======================================================================== */

function refreshDeliveryAndSummary() {

    renderDeliveryStatus();

    updateConfiguratorDelivery();

    updateSystemSummaryAttributes();

}


/* ========================================================================
   79. EXTENDED SYSTEM REFRESH
   ======================================================================== */

const originalRefreshSystemSummary =
    refreshSystemSummary;


function refreshSystemSummary() {

    originalRefreshSystemSummary();

    renderDeliveryStatus();

    updateConfiguratorDelivery();

}


/* ========================================================================
   80. DELIVERY CALCULATOR INITIALISATION
   ======================================================================== */

function initialiseConfiguratorDelivery() {

    const deliveryData =
        getSystemDeliveryData();


    window.nexpakConfiguratorDelivery =
        deliveryData;


    renderDeliveryStatus();

    updateConfiguratorDelivery();

}


/* ========================================================================
   81. LISTEN FOR DELIVERY CALCULATOR READY
   ======================================================================== */

document.addEventListener(
    "nexpak:deliveryReady",
    () => {

        initialiseConfiguratorDelivery();

    }
);


/* ========================================================================
   82. LISTEN FOR CART CHANGES
   ======================================================================== */

document.addEventListener(
    "nexpak:cartUpdated",
    () => {

        updateCartBadge(
            getCartFromStorage()
        );

    }
);


/* ========================================================================
   83. READ CART SAFELY
   ======================================================================== */

function getCartFromStorage() {

    try {

        const storedCart =
            localStorage.getItem(
                "nexpak_cart"
            );


        if (!storedCart) {

            return [];

        }


        const cart =
            JSON.parse(
                storedCart
            );


        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "Nexpak Configurator: Could not read cart.",
            error
        );


        return [];

    }

}


/* ========================================================================
   84. INITIAL CART BADGE
   ======================================================================== */

updateCartBadge(
    getCartFromStorage()
);


/* ========================================================================
   85. FINAL PART 7 INITIALISATION
   ======================================================================== */

try {

    refreshSystemSummary();

} catch (error) {

    console.error(
        "Nexpak Configurator: Final Part 7 refresh failed.",
        error
    );

}


try {

    initialiseConfiguratorDelivery();

} catch (error) {

    console.error(
        "Nexpak Configurator: Delivery initialisation failed.",
        error
    );

}


/* ========================================================================
   END OF PART 7
   ======================================================================== */


/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 8 — SYSTEM SUMMARY + CART HANDOFF
   ========================================================================== */


/* ==========================================================================
   48. GET SELECTED PRODUCTS
   ========================================================================== */

function getSelectedConfiguratorProducts() {

    const selected = [];

    Object.keys(state.selections || {}).forEach(
        function (productId) {

            const selection =
                state.selections[productId];

            if (!selection) {
                return;
            }

            const quantity =
                Number(selection.quantity) || 0;

            if (quantity <= 0) {
                return;
            }

            const product =
                findConfiguratorProduct(productId);

            if (!product) {
                return;
            }

            selected.push({
                id: product.id,
                name: product.name,
                price: Number(product.price) || 0,
                quantity: quantity,
                image: product.image || "",
                category: product.category || state.category,
                group: product.group || "general",
                groupTitle:
                    product.groupTitle ||
                    product.group ||
                    "Products",
                description:
                    product.description || "",
                unit:
                    product.unit || "each",
                weightKg:
                    Number(product.weightKg) || 0
            });

        }
    );

    return selected;
}


/* ==========================================================================
   49. CALCULATE SYSTEM TOTALS
   ========================================================================== */

function calculateSystemTotals() {

    const products =
        getSelectedConfiguratorProducts();

    let subtotal = 0;
    let itemCount = 0;
    let totalWeight = 0;

    products.forEach(
        function (product) {

            const quantity =
                Number(product.quantity) || 0;

            const price =
                Number(product.price) || 0;

            subtotal +=
                price * quantity;

            itemCount +=
                quantity;

            totalWeight +=
                (Number(product.weightKg) || 0) *
                quantity;

        }
    );

    const vat =
        subtotal * VAT_RATE;

    const grandTotal =
        subtotal + vat;

    return {
        products: products,
        itemCount: itemCount,
        subtotal: subtotal,
        vat: vat,
        grandTotal: grandTotal,
        totalWeight: totalWeight
    };
}


/* ==========================================================================
   50. UPDATE SYSTEM SUMMARY
   ========================================================================== */

function updateSystemSummary() {

    const totals =
        calculateSystemTotals();

    state.itemCount =
        totals.itemCount;

    state.subtotal =
        totals.subtotal;

    state.vat =
        totals.vat;

    state.grandTotal =
        totals.grandTotal;

    /*
       Keep the summary compatible with the
       existing configurator summary element.
    */

    if (!elements.summary) {
        return totals;
    }

    const productCount =
        totals.products.length;

    if (productCount === 0) {

        elements.summary.innerHTML = `
            <div class="system-summary-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your System Is Empty
                </h3>

                <p>
                    Select the products you need
                    to build your security system.
                </p>

            </div>
        `;

        return totals;
    }


    elements.summary.innerHTML = `

        <div class="system-summary-header">

            <div>
                <span class="summary-eyebrow">
                    BUILD YOUR SYSTEM
                </span>

                <h3>
                    System Summary
                </h3>
            </div>

            <div class="summary-item-count">
                ${totals.itemCount}
                item${totals.itemCount === 1 ? "" : "s"}
            </div>

        </div>


        <div class="system-summary-products">

            ${totals.products.map(
                function (product) {

                    const lineTotal =
                        product.price *
                        product.quantity;

                    return `

                        <div
                            class="system-summary-product"
                            data-product-id="${escapeHtml(product.id)}"
                        >

                            <div class="summary-product-info">

                                <strong>
                                    ${escapeHtml(product.name)}
                                </strong>

                                <span>
                                    ${product.quantity}
                                    ×
                                    ${formatMoney(product.price)}
                                </span>

                            </div>

                            <strong class="summary-product-total">
                                ${formatMoney(lineTotal)}
                            </strong>

                        </div>

                    `;

                }
            ).join("")}

        </div>


        <div class="system-summary-totals">

            <div class="summary-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${formatMoney(totals.subtotal)}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    VAT (${VAT_RATE * 100}%)
                </span>

                <strong>
                    ${formatMoney(totals.vat)}
                </strong>

            </div>


            <div class="summary-row summary-grand-total">

                <span>
                    Total
                </span>

                <strong>
                    ${formatMoney(totals.grandTotal)}
                </strong>

            </div>

        </div>

    `;

    return totals;
}


/* ==========================================================================
   51. BUILD CART ITEMS
   ========================================================================== */

function buildConfiguratorCartItems() {

    const products =
        getSelectedConfiguratorProducts();

    return products.map(
        function (product) {

            return {

                id: product.id,

                productId: product.id,

                name: product.name,

                title: product.name,

                price: product.price,

                quantity: product.quantity,

                image: product.image,

                category: product.category,

                description: product.description,

                unit: product.unit,

                weightKg: product.weightKg,

                source:
                    "build-your-system"

            };

        }
    );
}


/* ==========================================================================
   52. ADD CONFIGURED SYSTEM TO CART
   ========================================================================== */

function addConfiguredSystemToCart() {

    const cartItems =
        buildConfiguratorCartItems();

    if (cartItems.length === 0) {

        console.warn(
            "Nexpak Configurator: " +
            "Cannot add an empty system to cart."
        );

        return false;
    }


    /*
       Prefer the existing cart engine.

       No new cart system is created here.
       The configurator simply hands the
       selected individual products to it.
    */

    if (
        window.NEXPAK_CART &&
        typeof window.NEXPAK_CART.addItem === "function"
    ) {

        cartItems.forEach(
            function (item) {

                window.NEXPAK_CART.addItem(
                    item
                );

            }
        );

        return true;
    }


    /*
       Compatibility with cart.js implementations
       that expose addToCart().
    */

    if (
        typeof window.addToCart === "function"
    ) {

        cartItems.forEach(
            function (item) {

                window.addToCart(
                    item
                );

            }
        );

        return true;
    }


    /*
       Compatibility fallback.

       Store the configured system temporarily
       so the cart page can recover it without
       creating pre-built kits.
    */

    try {

        localStorage.setItem(
            "nexpakConfiguredSystem",
            JSON.stringify(cartItems)
        );

        return true;

    }
    catch (error) {

        console.error(
            "Nexpak Configurator: " +
            "Unable to save configured system.",
            error
        );

        return false;
    }
}


/* ==========================================================================
   53. CLEAR CONFIGURED SYSTEM
   ========================================================================== */

function clearConfiguredSystem() {

    state.selections = {};

    state.itemCount = 0;

    state.subtotal = 0;

    state.vat = 0;

    state.grandTotal = 0;

    try {

        localStorage.removeItem(
            "nexpakConfiguredSystem"
        );

    }
    catch (error) {

        console.warn(
            "Nexpak Configurator: " +
            "Unable to clear temporary system storage."
        );

    }


    /*
       Refresh the product cards if the renderer
       is available.
    */

    if (
        typeof renderConfigurator === "function"
    ) {

        renderConfigurator();

    }

    updateSystemSummary();

}


/* ==========================================================================
   54. GET CONFIGURED SYSTEM
   ========================================================================== */

function getConfiguredSystem() {

    return calculateSystemTotals();

}


/* ==========================================================================
   55. PUBLIC SUMMARY API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .getSelectedProducts =
            getSelectedConfiguratorProducts;


    window.NEXPAK_CONFIGURATOR
        .calculateTotals =
            calculateSystemTotals;


    window.NEXPAK_CONFIGURATOR
        .updateSummary =
            updateSystemSummary;


    window.NEXPAK_CONFIGURATOR
        .getCartItems =
            buildConfiguratorCartItems;


    window.NEXPAK_CONFIGURATOR
        .addToCart =
            addConfiguredSystemToCart;


    window.NEXPAK_CONFIGURATOR
        .clearSystem =
            clearConfiguredSystem;


    window.NEXPAK_CONFIGURATOR
        .getConfiguredSystem =
            getConfiguredSystem;

}


/* ==========================================================================
   56. FINAL SUMMARY REFRESH
   ========================================================================== */

if (
    typeof updateSystemSummary === "function"
) {

    updateSystemSummary();

}


/* ==========================================================================
   PART 8 COMPLETE
   ========================================================================== */
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 9 — PROPERTY VISUALISATION ENGINE
   ==========================================================================

   PURPOSE:

   - Uses the existing property visualisation HTML in shop.html.
   - Does NOT create a second property system.
   - Uses #propertyScene and #productPlacementLayer.
   - Converts selected products into visual security placements.
   - Updates when quantities change.
   - Removes placements when products are removed.
   - Activates the appropriate property security zones.
   - Keeps the existing cart/product engine untouched.

   PROPERTY ARCHITECTURE:

       SHOP DATA
           ↓
       PRODUCT SELECTION
           ↓
       state.selections
           ↓
       PROPERTY VISUALISATION
           ↓
       productPlacementLayer
           ↓
       LIVE PROPERTY VIEW

   ========================================================================== */


/* ==========================================================================
   78. PROPERTY VISUALISATION REFERENCES
   ========================================================================== */

const propertyElements = {

    preview:
        document.getElementById(
            "propertyPreview"
        ),

    canvas:
        document.getElementById(
            "propertyCanvas"
        ),

    scene:
        document.getElementById(
            "propertyScene"
        ),

    placementLayer:
        document.getElementById(
            "productPlacementLayer"
        ),

    perimeter:
        document.getElementById(
            "propertyPerimeter"
        ),

    fence:
        document.getElementById(
            "propertyFenceZone"
        ),

    gate:
        document.getElementById(
            "propertyGate"
        ),

    status:
        document.getElementById(
            "propertyPreviewStatus"
        ),

    productCount:
        document.getElementById(
            "propertyProductCount"
        ),

    securityStatus:
        document.getElementById(
            "propertySecurityStatus"
        ),

    builderStatus:
        document.getElementById(
            "builderStatus"
        ),

    builderStatusText:
        document.querySelector(
            ".builder-status-text"
        )

};


/* ==========================================================================
   79. PROPERTY VISUALISATION STATE
   ========================================================================== */

const propertyState = {

    zoom:
        1,

    view:
        "overview",

    placements:
        {},

    productTypes: {

        cctv: 0,

        fence: 0,

        alarm: 0,

        gate: 0,

        access: 0,

        intercom: 0,

        roboguard: 0

    }

};


/* ==========================================================================
   80. NORMALISE PRODUCT CATEGORY
   ========================================================================== */

function getPropertyProductType(
    product
) {

    if (!product) {

        return "other";

    }


    const category = String(

        product.category ||

        product.systemCategory ||

        product.system ||

        ""

    ).toLowerCase();


    const name = String(

        product.name ||

        ""

    ).toLowerCase();


    const group = String(

        product.group ||

        ""

    ).toLowerCase();


    const searchText =

        category +
        " " +
        name +
        " " +
        group;


    /* ----------------------------------------------------------------------
       CCTV / IP CCTV
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("cctv") ||

        searchText.includes("ip-cctv") ||

        searchText.includes("camera") ||

        searchText.includes("hikvision") ||

        searchText.includes("dahua")

    ) {

        return "cctv";

    }


    /* ----------------------------------------------------------------------
       ELECTRIC FENCING
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("electric-fencing") ||

        searchText.includes("electric fencing") ||

        searchText.includes("energizer") ||

        searchText.includes("fence") ||

        searchText.includes("walltop") ||

        searchText.includes("wall top")

    ) {

        return "fence";

    }


    /* ----------------------------------------------------------------------
       ALARM
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("alarm") ||

        searchText.includes("pir") ||

        searchText.includes("motion detector") ||

        searchText.includes("magnetic contact") ||

        searchText.includes("siren")

    ) {

        return "alarm";

    }


    /* ----------------------------------------------------------------------
       GATE AUTOMATION
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("gate automation") ||

        searchText.includes("gate motor") ||

        searchText.includes("sliding gate") ||

        searchText.includes("swing gate") ||

        searchText.includes("gate")

    ) {

        return "gate";

    }


    /* ----------------------------------------------------------------------
       ACCESS CONTROL
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("access control") ||

        searchText.includes("access-control") ||

        searchText.includes("fingerprint") ||

        searchText.includes("keypad") ||

        searchText.includes("reader")

    ) {

        return "access";

    }


    /* ----------------------------------------------------------------------
       INTERCOM
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("intercom") ||

        searchText.includes("video intercom") ||

        searchText.includes("door station")

    ) {

        return "intercom";

    }


    /* ----------------------------------------------------------------------
       ROBOGUARD
       ---------------------------------------------------------------------- */

    if (

        searchText.includes("roboguard") ||

        searchText.includes("robo guard")

    ) {

        return "roboguard";

    }


    return "other";

}


/* ==========================================================================
   81. PROPERTY ICONS
   ========================================================================== */

function getPropertyIcon(
    type
) {

    const icons = {

        cctv:
            "fa-video",

        fence:
            "fa-bolt",

        alarm:
            "fa-bell",

        gate:
            "fa-door-open",

        access:
            "fa-fingerprint",

        intercom:
            "fa-phone",

        roboguard:
            "fa-tower-broadcast",

        other:
            "fa-shield-halved"

    };


    return (

        icons[type] ||

        icons.other

    );

}


/* ==========================================================================
   82. PROPERTY LABELS
   ========================================================================== */

function getPropertyLabel(
    type
) {

    const labels = {

        cctv:
            "CCTV",

        fence:
            "Electric Fence",

        alarm:
            "Alarm",

        gate:
            "Gate Automation",

        access:
            "Access Control",

        intercom:
            "Intercom",

        roboguard:
            "Roboguard",

        other:
            "Security"

    };


    return (

        labels[type] ||

        labels.other

    );

}


/* ==========================================================================
   83. CLEAR PROPERTY PLACEMENTS
   ========================================================================== */

function clearPropertyPlacements() {

    if (
        !propertyElements.placementLayer
    ) {

        return;

    }


    propertyElements
        .placementLayer
        .innerHTML = "";


    propertyState.placements = {};


    propertyState.productTypes = {

        cctv: 0,

        fence: 0,

        alarm: 0,

        gate: 0,

        access: 0,

        intercom: 0,

        roboguard: 0

    };

}


/* ==========================================================================
   84. CREATE PROPERTY PRODUCT MARKER
   ========================================================================== */

function createPropertyMarker(
    product,
    type,
    index
) {

    if (
        !propertyElements.placementLayer
    ) {

        return null;

    }


    const marker =
        document.createElement(
            "div"
        );


    marker.className =
        "property-product-marker";


    marker.classList.add(
        `property-product-${type}`
    );


    marker.dataset.productId =
        product.id;


    marker.dataset.productType =
        type;


    marker.dataset.index =
        String(index);


    marker.setAttribute(
        "aria-label",
        `${product.name || getPropertyLabel(type)} placed on property`
    );


    marker.innerHTML = `

        <span class="property-product-marker-icon">

            <i
                class="fa-solid ${getPropertyIcon(type)}"
            ></i>

        </span>

        <span class="property-product-marker-label">

            ${escapeHtml(
                getPropertyLabel(type)
            )}

        </span>

    `;


    return marker;

}


/* ==========================================================================
   85. POSITION CCTV PRODUCTS
   ========================================================================== */

function positionCCTVMarker(
    marker,
    index
) {

    const positions = [

        {
            left: "17%",
            top: "35%"
        },

        {
            left: "79%",
            top: "35%"
        },

        {
            left: "28%",
            top: "53%"
        },

        {
            left: "68%",
            top: "53%"
        },

        {
            left: "47%",
            top: "27%"
        },

        {
            left: "50%",
            top: "62%"
        }

    ];


    const position =

        positions[
            index %
            positions.length
        ];


    marker.style.left =
        position.left;


    marker.style.top =
        position.top;

}


/* ==========================================================================
   86. POSITION ALARM PRODUCTS
   ========================================================================== */

function positionAlarmMarker(
    marker,
    index
) {

    const positions = [

        {
            left: "43%",
            top: "48%"
        },

        {
            left: "54%",
            top: "48%"
        },

        {
            left: "48%",
            top: "42%"
        }

    ];


    const position =

        positions[
            index %
            positions.length
        ];


    marker.style.left =
        position.left;


    marker.style.top =
        position.top;

}


/* ==========================================================================
   87. POSITION ACCESS CONTROL
   ========================================================================== */

function positionAccessMarker(
    marker
) {

    marker.style.left =
        "74%";


    marker.style.top =
        "66%";

}


/* ==========================================================================
   88. POSITION INTERCOM
   ========================================================================== */

function positionIntercomMarker(
    marker
) {

    marker.style.left =
        "78%";


    marker.style.top =
        "69%";

}


/* ==========================================================================
   89. POSITION GATE PRODUCTS
   ========================================================================== */

function positionGateMarker(
    marker
) {

    marker.style.left =
        "86%";


    marker.style.top =
        "73%";

}


/* ==========================================================================
   90. POSITION ROBOGUARD PRODUCTS
   ========================================================================== */

function positionRoboguardMarker(
    marker,
    index
) {

    const positions = [

        {
            left: "10%",
            top: "70%"
        },

        {
            left: "25%",
            top: "78%"
        },

        {
            left: "72%",
            top: "79%"
        },

        {
            left: "91%",
            top: "65%"
        }

    ];


    const position =

        positions[
            index %
            positions.length
        ];


    marker.style.left =
        position.left;


    marker.style.top =
        position.top;

}


/* ==========================================================================
   91. POSITION ELECTRIC FENCE PRODUCTS
   ========================================================================== */

function positionFenceMarker(
    marker,
    index
) {

    const positions = [

        {
            left: "20%",
            top: "20%"
        },

        {
            left: "38%",
            top: "17%"
        },

        {
            left: "58%",
            top: "17%"
        },

        {
            left: "77%",
            top: "20%"
        }

    ];


    const position =

        positions[
            index %
            positions.length
        ];


    marker.style.left =
        position.left;


    marker.style.top =
        position.top;

}


/* ==========================================================================
   92. POSITION OTHER PRODUCTS
   ========================================================================== */

function positionOtherMarker(
    marker,
    index
) {

    const positions = [

        {
            left: "50%",
            top: "50%"
        },

        {
            left: "35%",
            top: "60%"
        },

        {
            left: "65%",
            top: "60%"
        }

    ];


    const position =

        positions[
            index %
            positions.length
        ];


    marker.style.left =
        position.left;


    marker.style.top =
        position.top;

}


/* ==========================================================================
   93. POSITION PROPERTY MARKER
   ========================================================================== */

function positionPropertyMarker(
    marker,
    type,
    index
) {

    switch (type) {

        case "cctv":

            positionCCTVMarker(
                marker,
                index
            );

            break;


        case "fence":

            positionFenceMarker(
                marker,
                index
            );

            break;


        case "alarm":

            positionAlarmMarker(
                marker,
                index
            );

            break;


        case "access":

            positionAccessMarker(
                marker
            );

            break;


        case "intercom":

            positionIntercomMarker(
                marker
            );

            break;


        case "gate":

            positionGateMarker(
                marker
            );

            break;


        case "roboguard":

            positionRoboguardMarker(
                marker,
                index
            );

            break;


        default:

            positionOtherMarker(
                marker,
                index
            );

            break;

    }

}


/* ==========================================================================
   94. ACTIVATE PROPERTY SECURITY ZONES
   ========================================================================== */

function updatePropertySecurityZones() {

    const fenceCount =
        propertyState.productTypes.fence;


    const cctvCount =
        propertyState.productTypes.cctv;


    const alarmCount =
        propertyState.productTypes.alarm;


    const gateCount =
        propertyState.productTypes.gate;


    const accessCount =
        propertyState.productTypes.access;


    const intercomCount =
        propertyState.productTypes.intercom;


    const roboguardCount =
        propertyState.productTypes.roboguard;


    /* ----------------------------------------------------------------------
       ELECTRIC FENCE
       ---------------------------------------------------------------------- */

    if (
        propertyElements.fence
    ) {

        propertyElements.fence
            .classList.toggle(
                "is-active",
                fenceCount > 0
            );

    }


    if (
        propertyElements.perimeter
    ) {

        propertyElements.perimeter
            .classList.toggle(
                "is-active",
                fenceCount > 0 ||
                roboguardCount > 0
            );

    }


    /* ----------------------------------------------------------------------
       GATE
       ---------------------------------------------------------------------- */

    if (
        propertyElements.gate
    ) {

        propertyElements.gate
            .classList.toggle(
                "is-active",
                gateCount > 0 ||
                accessCount > 0 ||
                intercomCount > 0
            );

    }


    /* ----------------------------------------------------------------------
       SECURITY ZONES
       ---------------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".security-zone"
        )
        .forEach(
            function (zone) {

                zone.classList.remove(
                    "is-active"
                );

            }
        );


    if (
        cctvCount > 0 ||
        accessCount > 0 ||
        intercomCount > 0
    ) {

        document
            .querySelectorAll(
                ".entrance-zone"
            )
            .forEach(
                zone =>
                    zone.classList.add(
                        "is-active"
                    )
            );

    }


    if (
        cctvCount > 0 ||
        gateCount > 0 ||
        roboguardCount > 0
    ) {

        document
            .querySelectorAll(
                ".driveway-zone"
            )
            .forEach(
                zone =>
                    zone.classList.add(
                        "is-active"
                    )
            );

    }


    if (
        alarmCount > 0 ||
        cctvCount > 0
    ) {

        document
            .querySelectorAll(
                ".house-zone"
            )
            .forEach(
                zone =>
                    zone.classList.add(
                        "is-active"
                    )
            );

    }

}


/* ==========================================================================
   95. RENDER PROPERTY PRODUCTS
   ========================================================================== */

function renderPropertyProducts() {

    if (
        !propertyElements.placementLayer
    ) {

        return;

    }


    clearPropertyPlacements();


    const selectedProducts =
        getCurrentSystemProducts();


    if (
        !Array.isArray(
            selectedProducts
        ) ||
        selectedProducts.length === 0
    ) {

        updatePropertySecurityZones();

        updatePropertyInformation();

        return;

    }


    const typeIndexes = {

        cctv: 0,

        fence: 0,

        alarm: 0,

        gate: 0,

        access: 0,

        intercom: 0,

        roboguard: 0,

        other: 0
};


    /*
       Determine the visual type of a product.

       The configurator database can use different
       category names, so we deliberately check
       several common identifiers.
    */

    function getPropertyProductType(product) {

        if (!product) {

            return "other";

        }


        const values = [

            product.category,

            product.systemCategory,

            product.system,

            product.type,

            product.productType,

            product.group,

            product.subcategory,

            product.name

        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


        if (
            values.includes("cctv") ||
            values.includes("camera") ||
            values.includes("ip-cam")
        ) {

            return "cctv";

        }


        if (
            values.includes("electric-fencing") ||
            values.includes("electric fence") ||
            values.includes("fence")
        ) {

            return "fence";

        }


        if (
            values.includes("alarm") ||
            values.includes("pir") ||
            values.includes("motion detector")
        ) {

            return "alarm";

        }


        if (
            values.includes("gate") ||
            values.includes("gate automation") ||
            values.includes("gate motor")
        ) {

            return "gate";

        }


        if (
            values.includes("access") ||
            values.includes("access control") ||
            values.includes("fingerprint") ||
            values.includes("card reader")
        ) {

            return "access";

        }


        if (
            values.includes("intercom") ||
            values.includes("video intercom")
        ) {

            return "intercom";

        }


        if (
            values.includes("roboguard") ||
            values.includes("robo guard")
        ) {

            return "roboguard";

        }


        return "other";

    }


    /*
       Return a suitable Font Awesome icon
       for the property marker.
    */

    function getPropertyProductIcon(type) {

        const icons = {

            cctv:
                "fa-video",

            fence:
                "fa-bolt",

            alarm:
                "fa-bell",

            gate:
                "fa-door-open",

            access:
                "fa-fingerprint",

            intercom:
                "fa-phone",

            roboguard:
                "fa-person-running",

            other:
                "fa-shield-halved"

        };


        return icons[type] || icons.other;

    }


    /*
       Determine where the product should appear
       on the illustrated property.

       Multiple products of the same type are
       automatically distributed around the property.
    */

    function getPropertyProductPosition(
        type,
        index
    ) {

        const positions = {

            cctv: [

                {
                    left: 18,
                    top: 37
                },

                {
                    left: 82,
                    top: 37
                },

                {
                    left: 25,
                    top: 57
                },

                {
                    left: 75,
                    top: 57
                }

            ],

            fence: [

                {
                    left: 8,
                    top: 18
                },

                {
                    left: 92,
                    top: 18
                },

                {
                    left: 8,
                    top: 78
                },

                {
                    left: 92,
                    top: 78
                }

            ],

            alarm: [

                {
                    left: 50,
                    top: 42
                },

                {
                    left: 58,
                    top: 50
                }

            ],

            gate: [

                {
                    left: 88,
                    top: 78
                },

                {
                    left: 82,
                    top: 78
                }

            ],

            access: [

                {
                    left: 49,
                    top: 58
                },

                {
                    left: 56,
                    top: 58
                }

            ],

            intercom: [

                {
                    left: 44,
                    top: 57
                },

                {
                    left: 55,
                    top: 57
                }

            ],

            roboguard: [

                {
                    left: 12,
                    top: 62
                },

                {
                    left: 88,
                    top: 62
                },

                {
                    left: 20,
                    top: 72
                },

                {
                    left: 80,
                    top: 72
                }

            ],

            other: [

                {
                    left: 50,
                    top: 72
                }

            ]

        };


        const typePositions =
            positions[type] ||
            positions.other;


        return typePositions[
            index %
            typePositions.length
        ];

    }


    /*
       Create a visual product marker.
    */

    function createPropertyProductMarker(
        product,
        type,
        index
    ) {

        const position =
            getPropertyProductPosition(
                type,
                index
            );


        const marker =
            document.createElement("div");


        marker.className =
            "property-product-marker " +
            "property-product-" +
            type;


        marker.dataset.productId =
            product.id || "";


        marker.dataset.productType =
            type;


        marker.style.left =
            position.left + "%";


        marker.style.top =
            position.top + "%";


        const icon =
            document.createElement("span");


        icon.className =
            "property-product-marker-icon";


        icon.innerHTML =
            `<i class="fa-solid ${
                getPropertyProductIcon(type)
            }"></i>`;


        const label =
            document.createElement("span");


        label.className =
            "property-product-marker-label";


        label.textContent =
            product.name ||
            "Security Product";


        marker.appendChild(
            icon
        );


        marker.appendChild(
            label
        );


        return marker;

    }


    /*
       Render all currently selected products
       onto the property.
    */

    function renderPropertyProducts(
        selectedProducts
    ) {

        const layer =
            document.getElementById(
                "productPlacementLayer"
            );


        if (!layer) {

            return;

        }


        layer.innerHTML = "";


        if (
            !Array.isArray(
                selectedProducts
            ) ||
            selectedProducts.length === 0
        ) {

            updatePropertyStatus(
                0
            );

            return;

        }


        typeIndexes = {

            cctv: 0,

            fence: 0,

            alarm: 0,

            gate: 0,

            access: 0,

            intercom: 0,

            roboguard: 0,

            other: 0

        };


        selectedProducts.forEach(
            function (product) {

                if (!product) {

                    return;

                }


                const type =
                    getPropertyProductType(
                        product
                    );


                const index =
                    typeIndexes[type] || 0;


                const marker =
                    createPropertyProductMarker(
                        product,
                        type,
                        index
                    );


                layer.appendChild(
                    marker
                );


                typeIndexes[type] =
                    index + 1;

            }
        );


        updatePropertyStatus(
            selectedProducts.length
        );

    }


    /*
       Update the information displayed below
       the property visualisation.
    */

    function updatePropertyStatus(
        productCount
    ) {

        const countElement =
            document.getElementById(
                "propertyProductCount"
            );


        const statusElement =
            document.getElementById(
                "propertySecurityStatus"
            );


        const previewStatus =
            document.getElementById(
                "propertyPreviewStatus"
            );


        if (countElement) {

            countElement.textContent =
                String(
                    productCount || 0
                );

        }


        if (statusElement) {

            statusElement.textContent =
                productCount > 0
                    ? `${productCount} product${
                        productCount === 1
                            ? ""
                            : "s"
                    } configured`
                    : "No products configured";

        }


        if (previewStatus) {

            previewStatus.textContent =
                productCount > 0
                    ? "Security products positioned on your property"
                    : "Select products to place them on your property";

        }

    }


    /*
       Public property visualisation API.
    */

    window.NEXPAK_PROPERTY_VISUAL =
        {

            render:
                renderPropertyProducts,

            updateStatus:
                updatePropertyStatus,

            getProductType:
                getPropertyProductType

        };

   
  /* ============================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — SHOP STYLES
   PART 10 — PROPERTY VISUALISATION
   ============================================================================ */


/* ============================================================================
   10.1 PROPERTY PREVIEW
   ============================================================================ */

.property-preview {

    position: relative;

    width: 100%;

    margin-top: 32px;

    overflow: hidden;

    border-radius: 24px;

    border: 1px solid rgba(255,255,255,0.10);

    background:
        linear-gradient(
            145deg,
            #101923 0%,
            #17232d 45%,
            #0b1219 100%
        );

    box-shadow:
        0 24px 70px rgba(0,0,0,0.28);

}


/* ============================================================================
   10.2 PROPERTY HEADER
   ============================================================================ */

.property-preview-header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 24px;

    padding: 22px 26px;

    border-bottom:
        1px solid rgba(255,255,255,0.08);

}


.property-preview-eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    margin-bottom: 6px;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: 0.14em;

    text-transform: uppercase;

    color: #7dd3fc;

}


.property-preview-eyebrow i {

    font-size: 13px;

}


.property-preview-header h3 {

    margin: 0;

    font-size: 22px;

    line-height: 1.2;

    color: #ffffff;

}


.property-preview-status {

    max-width: 330px;

    font-size: 13px;

    line-height: 1.5;

    text-align: right;

    color: rgba(255,255,255,0.58);

}


/* ============================================================================
   10.3 PROPERTY TOOLBAR
   ============================================================================ */

.property-toolbar {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 16px;

    padding: 12px 18px;

    background:
        rgba(4,10,16,0.72);

    border-bottom:
        1px solid rgba(255,255,255,0.07);

}


.property-toolbar-left {

    display: flex;

    align-items: center;

    gap: 8px;

}


.property-toolbar-right {

    display: flex;

    align-items: center;

}


.property-tool {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    min-height: 38px;

    padding: 0 13px;

    border: 1px solid rgba(255,255,255,0.10);

    border-radius: 9px;

    background:
        rgba(255,255,255,0.035);

    color: rgba(255,255,255,0.65);

    font: inherit;

    font-size: 12px;

    font-weight: 700;

    cursor: pointer;

    transition:
        background 180ms ease,
        color 180ms ease,
        border-color 180ms ease,
        transform 180ms ease;

}


.property-tool:hover {

    transform: translateY(-1px);

    color: #ffffff;

    border-color:
        rgba(255,255,255,0.20);

}


.property-tool.active {

    color: #ffffff;

    border-color:
        rgba(56,189,248,0.45);

    background:
        rgba(14,165,233,0.14);

}


.property-toolbar-status {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 0.04em;

    color: rgba(255,255,255,0.48);

}


.property-toolbar-status i {

    font-size: 7px;

    color: #4ade80;

}


/* ============================================================================
   10.4 PROPERTY CANVAS
   ============================================================================ */

.property-canvas {

    position: relative;

    width: 100%;

    min-height: 560px;

    overflow: hidden;

    background:
        #18252d;

    isolation: isolate;

}


.property-scene {

    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;

    overflow: hidden;

    transform-origin: center center;

    transition:
        transform 220ms ease;

}


/* ============================================================================
   10.5 SKY
   ============================================================================ */

.property-sky {

    position: absolute;

    inset: 0;

    z-index: 1;

    background:
        linear-gradient(
            180deg,
            #071522 0%,
            #12324a 36%,
            #47718a 68%,
            #8ca8ad 100%
        );

}


.property-sky::before {

    content: "";

    position: absolute;

    width: 180px;

    height: 180px;

    top: 55px;

    right: 12%;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(255,230,160,0.85) 0%,
            rgba(255,210,130,0.25) 38%,
            rgba(255,210,130,0) 72%
        );

}


.property-sky::after {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            120deg,
            rgba(255,255,255,0.08),
            transparent 30%,
            transparent 70%,
            rgba(0,0,0,0.16)
        );

}


/* ============================================================================
   10.6 HORIZON
   ============================================================================ */

.property-horizon {

    position: absolute;

    left: 0;

    right: 0;

    bottom: 43%;

    height: 20%;

    z-index: 2;

    background:
        linear-gradient(
            180deg,
            rgba(38,67,72,0.35),
            rgba(24,45,47,0.75)
        );

}


.property-horizon::before,
.property-horizon::after {

    content: "";

    position: absolute;

    bottom: 0;

    width: 35%;

    height: 75%;

    background:
        linear-gradient(
            135deg,
            transparent 50%,
            rgba(18,38,42,0.72) 51%
        );

}


.property-horizon::before {

    left: -4%;

}


.property-horizon::after {

    right: -4%;

    transform:
        scaleX(-1);

}


/* ============================================================================
   10.7 GROUND
   ============================================================================ */

.property-ground {

    position: absolute;

    left: 0;

    right: 0;

    bottom: 0;

    height: 56%;

    z-index: 3;

    background:
        linear-gradient(
            180deg,
            #50665b 0%,
            #3b5046 36%,
            #26372f 100%
        );

}


.property-ground::before {

    content: "";

    position: absolute;

    inset: 0;

    opacity: 0.25;

    background-image:
        radial-gradient(
            circle,
            rgba(255,255,255,0.16) 1px,
            transparent 1px
        );

    background-size:
        18px 18px;

}


/* ============================================================================
   10.8 YARDS
   ============================================================================ */

.property-yard {

    position: absolute;

    z-index: 4;

    background:
        linear-gradient(
            145deg,
            rgba(90,119,87,0.9),
            rgba(43,65,51,0.95)
        );

    border:
        1px solid rgba(255,255,255,0.07);

}


.yard-left {

    left: 4%;

    bottom: 12%;

    width: 30%;

    height: 33%;

    clip-path:
        polygon(
            0 18%,
            78% 0,
            100% 100%,
            0 100%
        );

}


.yard-right {

    right: 4%;

    bottom: 12%;

    width: 30%;

    height: 33%;

    clip-path:
        polygon(
            22% 0,
            100% 18%,
            100% 100%,
            0 100%
        );

}


/* ============================================================================
   10.9 DRIVEWAY
   ============================================================================ */

.property-driveway {

    position: absolute;

    z-index: 5;

    left: 39%;

    bottom: 0;

    width: 23%;

    height: 58%;

    background:
        linear-gradient(
            90deg,
            #5c6462,
            #858b87 48%,
            #5b6361
        );

    clip-path:
        polygon(
            26% 0,
            74% 0,
            100% 100%,
            0 100%
        );

    opacity: 0.88;

}


.property-driveway::after {

    content: "";

    position: absolute;

    inset: 0;

    background:
        repeating-linear-gradient(
            0deg,
            transparent 0 24px,
            rgba(255,255,255,0.08) 25px 26px
        );

}


/* ============================================================================
   10.10 HOUSE
   ============================================================================ */

.property-house {

    position: absolute;

    z-index: 10;

    left: 26%;

    bottom: 30%;

    width: 48%;

    height: 40%;

}


.property-house-body {

    position: absolute;

    left: 0;

    right: 0;

    bottom: 0;

    height: 74%;

    border:
        1px solid rgba(0,0,0,0.32);

    background:
        linear-gradient(
            135deg,
            #e7e1d5,
            #c8c0b1
        );

    box-shadow:
        0 20px 40px rgba(0,0,0,0.30);

}


.property-house-roof {

    position: absolute;

    z-index: 2;

    left: -6%;

    top: 0;

    width: 112%;

    height: 34%;

    background:
        linear-gradient(
            180deg,
            #343b42,
            #1b2228
        );

    clip-path:
        polygon(
            50% 0,
            100% 100%,
            0 100%
        );

    filter:
        drop-shadow(
            0 8px 7px rgba(0,0,0,0.35)
        );

}


.property-house-body::before {

    content: "";

    position: absolute;

    left: 0;

    right: 0;

    top: 0;

    height: 8px;

    background:
        rgba(255,255,255,0.18);

}


/* ============================================================================
   10.11 HOUSE WINDOWS
   ============================================================================ */

.property-house-window {

    position: absolute;

    top: 26%;

    width: 17%;

    height: 29%;

    border:
        4px solid #d4cbbd;

    background:
        linear-gradient(
            135deg,
            #173b50,
            #78a9b9
        );

    box-shadow:
        inset 0 0 0 2px rgba(0,0,0,0.22),
        0 4px 8px rgba(0,0,0,0.18);

}


.property-window-one {

    left: 12%;

}


.property-window-two {

    right: 12%;

}


.property-house-window span {

    position: absolute;

    left: 50%;

    top: 0;

    width: 2px;

    height: 100%;

    background:
        rgba(255,255,255,0.45);

}


.property-house-window span::after {

    content: "";

    position: absolute;

    left: -20px;

    top: 50%;

    width: 40px;

    height: 2px;

    background:
        rgba(255,255,255,0.45);

}


/* ============================================================================
   10.12 HOUSE DOOR
   ============================================================================ */

.property-house-door {

    position: absolute;

    left: 50%;

    bottom: 0;

    width: 16%;

    height: 42%;

    transform:
        translateX(-50%);

    background:
        linear-gradient(
            90deg,
            #35261f,
            #5b4031,
            #2c211c
        );

    border:
        2px solid #9c826d;

    box-shadow:
        0 7px 14px rgba(0,0,0,0.28);

}


.property-door-handle {

    position: absolute;

    right: 15%;

    top: 53%;

    width: 5px;

    height: 5px;

    border-radius: 50%;

    background:
        #d8b66e;

    box-shadow:
        0 0 6px rgba(216,182,110,0.6);

}


/* ============================================================================
   10.13 PROPERTY FENCE
   ============================================================================ */

.property-fence-zone {

    position: absolute;

    z-index: 15;

    inset: 7% 5% 8% 5%;

    border:
        2px solid rgba(220,235,230,0.28);

    border-radius:
        8px;

    opacity: 0.58;

    transition:
        opacity 200ms ease,
        filter 200ms ease;

}


.property-fence-zone.is-active {

    opacity: 1;

    filter:
        drop-shadow(
            0 0 7px rgba(96,211,148,0.42)
        );

}


.fence-post {

    position: absolute;

    width: 5px;

    height: 44px;

    bottom: -1px;

    background:
        linear-gradient(
            90deg,
            #30383b,
            #9aa3a2,
            #30383b
        );

}


.fence-post-one {

    left: 0;

}


.fence-post-two {

    left: 32%;

}


.fence-post-three {

    left: 67%;

}


.fence-post-four {

    right: 0;

}


.fence-wire {

    position: absolute;

    left: 0;

    right: 0;

    height: 1px;

    background:
        rgba(211,240,232,0.82);

    box-shadow:
        0 0 4px rgba(180,255,225,0.28);

}


.fence-wire-one {

    bottom: 20px;

}


.fence-wire-two {

    bottom: 30px;

}


.fence-wire-three {

    bottom: 40px;

}


/* ============================================================================
   10.14 GATE
   ============================================================================ */

.property-gate {

    position: absolute;

    z-index: 18;

    right: 5%;

    bottom: 8%;

    width: 16%;

    height: 18%;

    border:
        5px solid #31393b;

    border-bottom:
        0;

    opacity: 0.48;

    transition:
        opacity 200ms ease,
        filter 200ms ease;

}


.property-gate.is-active {

    opacity: 1;

    filter:
        drop-shadow(
            0 0 8px rgba(96,165,250,0.48)
        );

}


.property-gate::before,
.property-gate::after {

    content: "";

    position: absolute;

    bottom: 0;

    width: 45%;

    height: 78%;

    border:
        3px solid #596367;

    background:
        repeating-linear-gradient(
            90deg,
            #323b3e 0 4px,
            transparent 4px 11px
        );

}


.property-gate::before {

    left: 0;

}


.property-gate::after {

    right: 0;

}


/* ============================================================================
   10.15 CCTV ZONES
   ============================================================================ */

.property-cctv-zone {

    position: absolute;

    z-index: 25;

    width: 42px;

    height: 42px;

    opacity: 0.38;

    transition:
        opacity 200ms ease,
        transform 200ms ease;

}


.property-cctv-zone-one {

    left: 20%;

    top: 37%;

}


.property-cctv-zone-two {

    right: 20%;

    top: 37%;

}


.property-cctv-zone:has(.cctv-zone-marker) {

    pointer-events: none;

}


.cctv-zone-marker {

    position: absolute;

    left: 50%;

    top: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    width: 34px;

    height: 34px;

    transform:
        translate(-50%, -50%);

    border:
        1px solid rgba(255,255,255,0.22);

    border-radius: 50%;

    background:
        rgba(8,17,24,0.90);

    color: #7dd3fc;

    box-shadow:
        0 6px 18px rgba(0,0,0,0.30);

}


.cctv-zone-beam {

    position: absolute;

    left: 50%;

    top: 50%;

    width: 130px;

    height: 90px;

    transform:
        translate(-5%, -10%)
        rotate(20deg);

    transform-origin:
        left top;

    background:
        linear-gradient(
            135deg,
            rgba(56,189,248,0.22),
            rgba(56,189,248,0)
        );

    clip-path:
        polygon(
            0 0,
            100% 32%,
            100% 68%,
            0 100%
        );

}


.property-cctv-zone.is-active {

    opacity: 1;

}


/* ============================================================================
   10.16 SECURITY ZONES
   ============================================================================ */

.security-zone {

    position: absolute;

    z-index: 20;

    border:
        1px dashed rgba(125,211,252,0.18);

    background:
        rgba(56,189,248,0.025);

    opacity: 0;

    transition:
        opacity 220ms ease,
        background 220ms ease;

    pointer-events: none;

}


.security-zone.is-active {

    opacity: 1;

    background:
        rgba(56,189,248,0.055);

}


.entrance-zone {

    left: 40%;

    bottom: 25%;

    width: 20%;

    height: 27%;

}


.driveway-zone {

    left: 35%;

    bottom: 0;

    width: 30%;

    height: 48%;

}


.house-zone {

    left: 28%;

    bottom: 29%;

    width: 44%;

    height: 40%;

}


/* ============================================================================
   10.17 PRODUCT PLACEMENT LAYER
   ============================================================================ */

.product-placement-layer {

    position: absolute;

    inset: 0;

    z-index: 60;

    pointer-events: none;

}


.property-product-marker {

    position: absolute;

    display: flex;

    align-items: center;

    gap: 7px;

    min-width: 34px;

    transform:
        translate(-50%, -50%);

    pointer-events: auto;

    animation:
        propertyMarkerIn 280ms ease both;

}


.property-product-marker-icon {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 34px;

    height: 34px;

    flex: 0 0 34px;

    border:
        1px solid rgba(255,255,255,0.22);

    border-radius: 50%;

    background:
        rgba(7,15,22,0.94);

    box-shadow:
        0 7px 20px rgba(0,0,0,0.36);

    color: #ffffff;

}


.property-product-marker-label {

    padding:
        5px 8px;

    border:
        1px solid rgba(255,255,255,0.10);

    border-radius: 6px;

    background:
        rgba(5,11,17,0.86);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 0.04em;

    white-space: nowrap;

    color: rgba(255,255,255,0.86);

    backdrop-filter:
        blur(8px);

}


/* ============================================================================
   10.18 PRODUCT MARKER TYPES
   ============================================================================ */

.property-product-cctv
.property-product-marker-icon {

    color: #7dd3fc;

}


.property-product-cctv
.property-product-marker-icon {

    border-color:
        rgba(125,211,252,0.40);

}


.property-product-fence
.property-product-marker-icon {

    color: #86efac;

    border-color:
        rgba(134,239,172,0.40);

}


.property-product-alarm
.property-product-marker-icon {

    color: #fbbf24;

    border-color:
        rgba(251,191,36,0.40);

}


.property-product-gate
.property-product-marker-icon {

    color: #93c5fd;

    border-color:
        rgba(147,197,253,0.40);

}


.property-product-access
.property-product-marker-icon {

    color: #c4b5fd;

    border-color:
        rgba(196,181,253,0.40);

}


.property-product-intercom
.property-product-marker-icon {

    color: #67e8f9;

    border-color:
        rgba(103,232,249,0.40);

}


.property-product-roboguard
.property-product-marker-icon {

    color: #fca5a5;

    border-color:
        rgba(252,165,165,0.40);

}


/* ============================================================================
   10.19 PROPERTY LEGEND
   ============================================================================ */

.property-legend {

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    gap: 14px;

    padding: 14px 20px;

    background:
        rgba(3,9,14,0.62);

    border-top:
        1px solid rgba(255,255,255,0.07);

}


.property-legend-item {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    font-size: 11px;

    font-weight: 700;

    color:
        rgba(255,255,255,0.58);

}


.legend-dot {

    display: inline-block;

    width: 8px;

    height: 8px;

    border-radius: 50%;

    box-shadow:
        0 0 7px currentColor;

}


.legend-dot.camera {

    color: #7dd3fc;

    background:
        currentColor;

}


.legend-dot.fence {

    color: #86efac;

    background:
        currentColor;

}


.legend-dot.gate {

    color: #93c5fd;

    background:
        currentColor;

}


.legend-dot.alarm {

    color: #fbbf24;

    background:
        currentCol

   or;


/* ============================================================================
   10.20 PROPERTY INFORMATION BAR
   ============================================================================ */

.property-info-bar {

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    justify-content: space-between;

    gap: 12px 24px;

    padding: 14px 20px;

    background:
        rgba(255,255,255,0.025);

    border-top:
        1px solid rgba(255,255,255,0.06);

    font-size: 11px;

    color:
        rgba(255,255,255,0.48);

}


.property-info-bar strong {

    color:
        rgba(255,255,255,0.82);

}


/* ============================================================================
   10.21 ZOOM CONTROLS
   ============================================================================ */

.property-zoom-controls {

    position: absolute;

    z-index: 80;

    right: 18px;

    bottom: 18px;

    display: flex;

    flex-direction: column;

    gap: 6px;

}


.property-zoom-controls .property-tool {

    width: 38px;

    min-width: 38px;

    padding: 0;

    background:
        rgba(5,12,18,0.84);

    backdrop-filter:
        blur(10px);

}


/* ============================================================================
   10.22 PROPERTY MARKER ANIMATION
   ============================================================================ */

@keyframes propertyMarkerIn {

    from {

        opacity: 0;

        transform:
            translate(-50%, -50%)
            scale(0.65);

    }

    to {

        opacity: 1;

        transform:
            translate(-50%, -50%)
            scale(1);

    }

}


/* ============================================================================
   10.23 SECURITY VIEW
   ============================================================================ */

.property-scene[data-property-view="security"]
.security-zone.is-active {

    opacity: 1;

    background:
        rgba(56,189,248,0.09);

    border-color:
        rgba(125,211,252,0.28);

}


.property-scene[data-property-view="security"]
.property-cctv-zone {

    opacity: 1;

}


.property-scene[data-property-view="security"]
.property-fence-zone {

    opacity: 1;

    filter:
        drop-shadow(
            0 0 7px rgba(96,211,148,0.35)
        );

}


/* ============================================================================
   10.24 PROPERTY EMPTY STATE
   ============================================================================ */

.product-placement-layer:empty::after {

    content:
        "Select security products to build your property layout";

    position: absolute;

    left: 50%;

    top: 82%;

    transform:
        translate(-50%, -50%);

    padding:
        8px 13px;

    border:
        1px solid rgba(255,255,255,0.08);

    border-radius: 8px;

    background:
        rgba(4,10,16,0.62);

    color:
        rgba(255,255,255,0.48);

    font-size: 10px;

    font-weight: 700;

    white-space: nowrap;

    pointer-events: none;

}


/* ============================================================================
   10.25 BUILDER STATUS
   ============================================================================ */

.builder-status.is-active
.builder-status-indicator {

    background:
        #4ade80;

    box-shadow:
        0 0 8px rgba(74,222,128,0.55);

}


/* ============================================================================
   PART 10 COMPLETE
   ============================================================================ */

   /* ============================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — SHOP STYLES
   PART 11 — RESPONSIVE PROPERTY VISUALISATION
   ============================================================================ */


/* ============================================================================
   11.1 TABLET / SMALL LAPTOP
   ============================================================================ */

@media (max-width: 900px) {

    .property-preview-header {

        align-items: flex-start;

        flex-direction: column;

        gap: 10px;

    }


    .property-preview-status {

        max-width: none;

        text-align: left;

    }


    .property-canvas {

        min-height: 500px;

    }


    .property-house {

        left: 22%;

        width: 56%;

    }


    .property-driveway {

        left: 36%;

        width: 28%;

    }


    .property-product-marker-label {

        font-size: 8px;

    }

}


/* ============================================================================
   11.2 MOBILE PROPERTY TOOLBAR
   ============================================================================ */

@media (max-width: 680px) {

    .property-preview {

        margin-top: 22px;

        border-radius: 18px;

    }


    .property-preview-header {

        padding: 17px 16px;

    }


    .property-preview-header h3 {

        font-size: 19px;

    }


    .property-toolbar {

        align-items: stretch;

        flex-direction: column;

        padding: 10px 12px;

    }


    .property-toolbar-left {

        width: 100%;

    }


    .property-toolbar-left .property-tool {

        flex: 1;

    }


    .property-toolbar-right {

        justify-content: flex-start;

    }


    .property-toolbar-status {

        font-size: 10px;

    }


    .property-canvas {

        min-height: 430px;

    }


    .property-legend {

        gap: 9px 12px;

        padding: 12px 14px;

    }


    .property-info-bar {

        align-items: flex-start;

        flex-direction: column;

        gap: 7px;

        padding: 12px 14px;

    }


    .property-zoom-controls {

        right: 10px;

        bottom: 10px;

    }

}


/* ============================================================================
   11.3 REDMI / SMALL MOBILE FOUNDATION
   ============================================================================ */

@media (max-width: 480px) {

    .property-preview {

        width: 100%;

        margin-top: 18px;

        border-radius: 15px;

    }


    .property-preview-header {

        padding: 15px 13px;

    }


    .property-preview-eyebrow {

        font-size: 9px;

        letter-spacing: 0.11em;

    }


    .property-preview-header h3 {

        font-size: 17px;

    }


    .property-preview-status {

        font-size: 11px;

        line-height: 1.4;

    }


    .property-toolbar {

        padding: 8px;

    }


    .property-toolbar-left {

        gap: 5px;

    }


    .property-toolbar-left .property-tool {

        min-height: 36px;

        padding: 0 8px;

        font-size: 10px;

    }


    .property-toolbar-left .property-tool i {

        font-size: 11px;

    }


    .property-canvas {

        min-height: 360px;

    }


    /*
       Keep the illustrated property large enough
       to remain visually useful on a narrow screen.
    */

    .property-house {

        left: 18%;

        bottom: 30%;

        width: 64%;

        height: 39%;

    }


    .property-house-roof {

        left: -7%;

        width: 114%;

    }


    .property-house-window {

        border-width: 3px;

    }


    .property-yard {

        bottom: 10%;

        height: 32%;

    }


    .yard-left {

        left: 2%;

        width: 31%;

    }


    .yard-right {

        right: 2%;

        width: 31%;

    }


    .property-driveway {

        left: 34%;

        width: 32%;

    }


    .property-fence-zone {

        inset: 7% 3% 7% 3%;

    }


    .property-gate {

        right: 3%;

        bottom: 7%;

        width: 19%;

        height: 18%;

    }


    .property-cctv-zone-one {

        left: 15%;

        top: 35%;

    }


    .property-cctv-zone-two {

        right: 15%;

        top: 35%;

    }


    /*
       Product markers become compact on mobile.
    */

    .property-product-marker {

        gap: 4px;

    }


    .property-product-marker-icon {

        width: 29px;

        height: 29px;

        flex-basis: 29px;

        font-size: 11px;

    }


    .property-product-marker-label {

        max-width: 105px;

        overflow: hidden;

        padding: 4px 6px;

        font-size: 8px;

        text-overflow: ellipsis;

    }


    /*
       Prevent the empty-state message from
       overflowing the Redmi screen.
    */

    .product-placement-layer:empty::after {

        max-width: 82%;

        padding: 7px 9px;

        font-size: 9px;

        line-height: 1.4;

        text-align: center;

        white-space: normal;

    }


    .property-legend {

        padding: 11px 12px;

    }


    .property-legend-item {

        font-size: 9px;

    }


    .legend-dot {

        width: 7px;

        height: 7px;

    }


    .property-info-bar {

        padding: 11px 12px;

        font-size: 9px;

    }


    .property-zoom-controls {

        right: 8px;

        bottom: 8px;

        gap: 4px;

    }


    .property-zoom-controls .property-tool {

        width: 34px;

        min-width: 34px;

        height: 34px;

        min-height: 34px;

    }

}


/* ============================================================================
   11.4 VERY SMALL DEVICES
   ============================================================================ */

@media (max-width: 360px) {

    .property-canvas {

        min-height: 320px;

    }


    .property-house {

        left: 15%;

        width: 70%;

    }


    .property-product-marker-label {

        display: none;

    }


    .property-product-marker-icon {

        width: 27px;

        height: 27px;

        flex-basis: 27px;

    }


    .property-preview-header h3 {

        font-size: 16px;

    }


    .property-toolbar-left .property-tool span {

        display: none;

    }


    .property-toolbar-left .property-tool {

        min-width: 38px;

    }


    .property-legend {

        gap: 7px 10px;

    }

}


/* ============================================================================
   11.5 TOUCH DEVICE INTERACTION
   ============================================================================ */

@media (hover: none) and (pointer: coarse) {

    .property-tool {

        min-height: 42px;

    }


    .property-zoom-controls .property-tool {

        min-height: 40px;

        height: 40px;

    }


    .property-product-marker {

        pointer-events: none;

    }

}


/* ============================================================================
   11.6 PROPERTY SCENE SAFETY
   ============================================================================ */

/*
   Prevent the property illustration from causing
   horizontal page overflow on mobile.
*/

.property-preview,
.property-canvas,
.property-scene {

    max-width: 100%;

}


.property-scene {

    overflow: hidden;

}


/* ============================================================================
   11.7 MOBILE PROPERTY SHADOW
   ============================================================================ */

@media (max-width: 480px) {

    .property-house-body {

        box-shadow:
            0 12px 24px rgba(0,0,0,0.28);

    }


    .property-house-roof {

        filter:
            drop-shadow(
                0 5px 5px rgba(0,0,0,0.30)
            );

    }

}


/* ============================================================================
   PART 11 COMPLETE
   ============================================================================ */

/* ============================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — SHOP STYLES
   PART 12 — LIVE PRODUCT PLACEMENT VISUALS
   ============================================================================ */


/* ============================================================================
   12.1 PRODUCT PLACEMENT LAYER
   ============================================================================ */

.product-placement-layer {

    position: absolute;

    inset: 0;

    z-index: 70;

    pointer-events: none;

}


/* ============================================================================
   12.2 MOUNTED PRODUCT MARKER
   ============================================================================ */

.property-product-marker {

    position: absolute;

    display: flex;

    align-items: center;

    gap: 6px;

    transform:
        translate(-50%, -50%);

    animation:
        propertyMarkerIn 0.35s ease-out both;

    pointer-events: auto;

    cursor: default;

    z-index: 90;

}


/* ============================================================================
   12.3 PRODUCT ICON
   ============================================================================ */

.property-product-marker-icon {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 34px;

    height: 34px;

    flex: 0 0 34px;

    border:
        2px solid rgba(255,255,255,0.72);

    border-radius: 50%;

    background:
        rgba(7,15,23,0.94);

    box-shadow:
        0 5px 15px rgba(0,0,0,0.45);

    color:
        #ffffff;

    font-size: 13px;

}


/* ============================================================================
   12.4 PRODUCT LABEL
   ============================================================================ */

.property-product-marker-label {

    max-width: 150px;

    padding:
        5px 8px;

    border:
        1px solid rgba(255,255,255,0.12);

    border-radius: 6px;

    background:
        rgba(4,10,16,0.90);

    backdrop-filter:
        blur(8px);

    color:
        rgba(255,255,255,0.88);

    font-size: 9px;

    font-weight: 700;

    line-height: 1.25;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    box-shadow:
        0 5px 14px rgba(0,0,0,0.32);

}


/* ============================================================================
   12.5 CCTV
   ============================================================================ */

.property-product-cctv
.property-product-marker-icon {

    border-color:
        rgba(56,189,248,0.75);

    color:
        #38bdf8;

    box-shadow:
        0 0 14px rgba(56,189,248,0.28);

}


.property-product-cctv
.property-product-marker-label {

    border-color:
        rgba(56,189,248,0.22);

}


/* ============================================================================
   12.6 ELECTRIC FENCE
   ============================================================================ */

.property-product-fence
.property-product-marker-icon {

    border-color:
        rgba(74,222,128,0.78);

    color:
        #4ade80;

    box-shadow:
        0 0 14px rgba(74,222,128,0.25);

}


.property-product-fence
.property-product-marker-label {

    border-color:
        rgba(74,222,128,0.22);

}


/* ============================================================================
   12.7 ALARM
   ============================================================================ */

.property-product-alarm
.property-product-marker-icon {

    border-color:
        rgba(251,191,36,0.82);

    color:
        #fbbf24;

    box-shadow:
        0 0 14px rgba(251,191,36,0.25);

}


.property-product-alarm
.property-product-marker-label {

    border-color:
        rgba(251,191,36,0.22);

}


/* ============================================================================
   12.8 GATE AUTOMATION
   ============================================================================ */

.property-product-gate
.property-product-marker-icon {

    border-color:
        rgba(244,114,182,0.78);

    color:
        #f472b6;

    box-shadow:
        0 0 14px rgba(244,114,182,0.25);

}


.property-product-gate
.property-product-marker-label {

    border-color:
        rgba(244,114,182,0.22);

}


/* ============================================================================
   12.9 ACCESS CONTROL
   ============================================================================ */

.property-product-access
.property-product-marker-icon {

    border-color:
        rgba(167,139,250,0.82);

    color:
        #a78bfa;

    box-shadow:
        0 0 14px rgba(167,139,250,0.25);

}


.property-product-access
.property-product-marker-label {

    border-color:
        rgba(167,139,250,0.22);

}


/* ============================================================================
   12.10 INTERCOM
   ============================================================================ */

.property-product-intercom
.property-product-marker-icon {

    border-color:
        rgba(45,212,191,0.82);

    color:
        #2dd4bf;

    box-shadow:
        0 0 14px rgba(45,212,191,0.25);

}


.property-product-intercom
.property-product-marker-label {

    border-color:
        rgba(45,212,191,0.22);

}


/* ============================================================================
   12.11 ROBOGUARD
   ============================================================================ */

.property-product-roboguard
.property-product-marker-icon {

    border-color:
        rgba(251,146,60,0.82);

    color:
        #fb923c;

    box-shadow:
        0 0 14px rgba(251,146,60,0.25);

}


.property-product-roboguard
.property-product-marker-label {

    border-color:
        rgba(251,146,60,0.22);

}


/* ============================================================================
   12.12 OTHER SECURITY PRODUCTS
   ============================================================================ */

.property-product-other
.property-product-marker-icon {

    border-color:
        rgba(148,163,184,0.72);

    color:
        #cbd5e1;

}


.property-product-other
.property-product-marker-label {

    border-color:
        rgba(148,163,184,0.18);

}


/* ============================================================================
   12.13 CCTV COVERAGE INDICATOR
   ============================================================================ */

.property-product-cctv::after {

    content: "";

    position: absolute;

    left: 50%;

    top: 50%;

    width: 70px;

    height: 70px;

    transform:
        translate(-50%, -50%);

    border:
        1px solid rgba(56,189,248,0.16);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(56,189,248,0.08) 0%,
            rgba(56,189,248,0.025) 45%,
            transparent 72%
        );

    z-index: -1;

    pointer-events: none;

}


/* ============================================================================
   12.14 ELECTRIC FENCE ACTIVE EFFECT
   ============================================================================ */

.property-product-fence::after {

    content: "";

    position: absolute;

    left: 50%;

    top: 50%;

    width: 55px;

    height: 55px;

    transform:
        translate(-50%, -50%);

    border:
        1px solid rgba(74,222,128,0.20);

    border-radius: 50%;

    box-shadow:
        0 0 16px rgba(74,222,128,0.12);

    z-index: -1;

    pointer-events: none;

}


/* ============================================================================
   12.15 ALARM PULSE
   ============================================================================ */

.property-product-alarm
.property-product-marker-icon {

    animation:
        alarmMarkerPulse 2.4s ease-in-out infinite;

}


@keyframes alarmMarkerPulse {

    0%,
    100% {

        box-shadow:
            0 0 8px rgba(251,191,36,0.18);

    }

    50% {

        box-shadow:
            0 0 18px rgba(251,191,36,0.42);

    }

}


/* ============================================================================
   12.16 PRODUCT MARKER HOVER
   ============================================================================ */

@media (hover: hover) {

    .property-product-marker:hover
    .property-product-marker-icon {

        transform:
            scale(1.08);

    }


    .property-product-marker:hover
    .property-product-marker-label {

        color:
            #ffffff;

        border-color:
            rgba(255,255,255,0.28);

    }

}


/* ============================================================================
   12.17 MOUNTING POSITION VISUAL
   ============================================================================ */

.property-product-cctv {

    transform:
        translate(-50%, -50%);

}


.property-product-access {

    transform:
        translate(-50%, -50%);

}


.property-product-intercom {

    transform:
        translate(-50%, -50%);

}


/* ============================================================================
   12.18 MOBILE PRODUCT MARKERS
   ============================================================================ */

@media (max-width: 480px) {

    .property-product-marker {

        gap: 4px;

    }


    .property-product-marker-icon {

        width: 29px;

        height: 29px;

        flex-basis: 29px;

        font-size: 11px;

    }


    .property-product-marker-label {

        max-width: 110px;

        padding:
            4px 6px;

        font-size: 8px;

    }


    .property-product-cctv::after {

        width: 55px;

        height: 55px;

    }


    .property-product-fence::after {

        width: 45px;

        height: 45px;

    }

}


/* ============================================================================
   12.19 VERY SMALL MOBILE
   ============================================================================ */

@media (max-width: 360px) {

    .property-product-marker-label {

        display: none;

    }


    .property-product-marker-icon {

        width: 27px;

        height: 27px;

        flex-basis: 27px;

        font-size: 10px;

    }

}


/* ============================================================================
   12.20 ACCESSIBILITY
   ============================================================================ */

@media (prefers-reduced-motion: reduce) {

    .property-product-marker {

        animation:
            none;

    }


    .property-product-alarm
    .property-product-marker-icon {

        animation:
            none;

    }

}


/* ============================================================================
   PART 12 COMPLETE
   ============================================================================ */

/* ============================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — SHOP STYLES
   PART 13 — LIVE PROPERTY SECURITY STATES
   ============================================================================ */


/* ============================================================================
   13.1 ACTIVE PROPERTY VIEW
   ============================================================================ */

.property-tool.active {

    border-color:
        rgba(56,189,248,0.38);

    background:
        rgba(56,189,248,0.10);

    color:
        #ffffff;

    box-shadow:
        inset 0 0 0 1px rgba(56,189,248,0.05);

}


/* ============================================================================
   13.2 PROPERTY SECURITY MODE
   ============================================================================ */

.property-preview.security-mode
.property-scene {

    background:
        #07131d;

}


.property-preview.security-mode
.property-security-overlay {

    opacity: 1;

}


/* ============================================================================
   13.3 SECURITY ZONE BASE
   ============================================================================ */

.security-zone {

    position: absolute;

    z-index: 30;

    border:
        1px solid transparent;

    border-radius: 10px;

    opacity: 0;

    pointer-events: none;

    transition:
        opacity 0.35s ease,
        background 0.35s ease,
        border-color 0.35s ease;

}


/* ============================================================================
   13.4 ACTIVE SECURITY ZONES
   ============================================================================ */

.security-zone.is-active {

    opacity: 1;

}


/* ============================================================================
   13.5 ENTRANCE SECURITY ZONE
   ============================================================================ */

.entrance-zone {

    left: 43%;

    top: 49%;

    width: 16%;

    height: 17%;

    background:
        rgba(167,139,250,0.07);

    border-color:
        rgba(167,139,250,0.18);

}


/* ============================================================================
   13.6 DRIVEWAY SECURITY ZONE
   ============================================================================ */

.driveway-zone {

    left: 33%;

    bottom: 5%;

    width: 34%;

    height: 34%;

    background:
        rgba(56,189,248,0.045);

    border-color:
        rgba(56,189,248,0.16);

    clip-path:
        polygon(
            18% 100%,
            82% 100%,
            65% 0,
            35% 0
        );

}


/* ============================================================================
   13.7 HOUSE SECURITY ZONE
   ============================================================================ */

.house-zone {

    left: 20%;

    top: 25%;

    width: 60%;

    height: 45%;

    background:
        rgba(251,191,36,0.025);

    border-color:
        rgba(251,191,36,0.12);

}


/* ============================================================================
   13.8 CCTV SECURITY MODE
   ============================================================================ */

.property-preview.security-mode
.property-cctv-zone {

    opacity: 1;

}


.property-preview.security-mode
.cctv-zone-beam {

    opacity: 1;

}


.property-preview.security-mode
.cctv-zone-marker {

    box-shadow:
        0 0 18px rgba(56,189,248,0.42);

}


/* ============================================================================
   13.9 FENCE SECURITY MODE
   ============================================================================ */

.property-preview.security-mode
.property-fence-zone {

    opacity: 1;

    filter:
        drop-shadow(
            0 0 6px rgba(74,222,128,0.38)
        );

}


/* ============================================================================
   13.10 GATE SECURITY MODE
   ============================================================================ */

.property-preview.security-mode
.property-gate {

    filter:
        drop-shadow(
            0 0 8px rgba(244,114,182,0.30)
        );

}


/* ============================================================================
   13.11 PRODUCT COUNT STATE
   ============================================================================ */

.property-preview.has-products
.product-placement-layer {

    opacity: 1;

}


.property-preview.has-products
.product-placement-layer:empty::after {

    display: none;

}


/* ============================================================================
   13.12 PROPERTY STATUS — READY
   ============================================================================ */

.property-preview.has-products
.property-preview-status {

    color:
        rgba(74,222,128,0.86);

}


.property-preview.has-products
.property-toolbar-status {

    color:
        rgba(74,222,128,0.86);

}


.property-preview.has-products
.property-toolbar-status i {

    color:
        #4ade80;

    box-shadow:
        0 0 7px rgba(74,222,128,0.65);

}


/* ============================================================================
   13.13 PRODUCT MARKER MOUNTED STATE
   ============================================================================ */

.property-product-marker.is-mounted
.property-product-marker-icon {

    border-color:
        rgba(255,255,255,0.82);

    transform:
        scale(1.03);

}


/* ============================================================================
   13.14 CCTV MOUNTING POINT
   ============================================================================ */

.property-product-cctv
.property-product-marker-icon::before {

    content: "";

    position: absolute;

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background:
        #38bdf8;

    box-shadow:
        0 0 7px rgba(56,189,248,0.8);

}


/* ============================================================================
   13.15 FENCE MOUNTING POINT
   ============================================================================ */

.property-product-fence
.property-product-marker-icon::before {

    content: "";

    position: absolute;

    width: 5px;

    height: 5px;

    border-radius: 50%;

    background:
        #4ade80;

    box-shadow:
        0 0 7px rgba(74,222,128,0.8);

}


/* ============================================================================
   13.16 PRODUCT LABEL VISIBILITY
   ============================================================================ */

.property-product-marker-label {

    opacity: 0;

    transform:
        translateX(-3px);

    transition:
        opacity 0.2s ease,
        transform 0.2s ease;

}


.property-product-marker:hover
.property-product-marker-label {

    opacity: 1;

    transform:
        translateX(0);

}


.property-preview.has-products
.property-product-marker-label {

    opacity: 1;

    transform:
        translateX(0);

}


/* ============================================================================
   13.17 PROPERTY SECURITY OVERLAY
   ============================================================================ */

.property-security-overlay {

    position: absolute;

    inset: 0;

    z-index: 20;

    opacity: 0;

    pointer-events: none;

    background:
        radial-gradient(
            circle at 50% 45%,
            transparent 0%,
            rgba(4,10,16,0.04) 55%,
            rgba(4,10,16,0.28) 100%
        );

    transition:
        opacity 0.35s ease;

}


/* ============================================================================
   13.18 LIVE SECURITY PULSE
   ============================================================================ */

.property-preview.has-products::after {

    content: "";

    position: absolute;

    top: 18px;

    right: 18px;

    width: 7px;

    height: 7px;

    border-radius: 50%;

    background:
        #4ade80;

    box-shadow:
        0 0 9px rgba(74,222,128,0.65);

    animation:
        liveSecurityPulse 2s ease-in-out infinite;

    pointer-events: none;

}


@keyframes liveSecurityPulse {

    0%,
    100% {

        opacity: 0.45;

        transform:
            scale(0.9);

    }

    50% {

        opacity: 1;

        transform:
            scale(1.15);

    }

}


/* ============================================================================
   13.19 PROPERTY STATUS TRANSITION
   ============================================================================ */

.property-preview-status,
.property-toolbar-status,
.property-security-status {

    transition:
        color 0.25s ease,
        opacity 0.25s ease;

}


/* ============================================================================
   13.20 REDUCED MOTION
   ============================================================================ */

@media (prefers-reduced-motion: reduce) {

    .property-preview.has-products::after {

        animation:
            none;

    }

}


/* ============================================================================
   13.21 MOBILE SECURITY STATES
   ============================================================================ */

@media (max-width: 480px) {

    .property-preview.has-products::after {

        top: 12px;

        right: 12px;

        width: 6px;

        height: 6px;

    }


    .property-product-marker-label {

        opacity: 1;

        transform:
            none;

    }

}


/* ============================================================================
   PART 13 COMPLETE
   ============================================================================ */
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 14 — PROPERTY VISUALISATION STATE CONNECTION
   ========================================================================== */


/* ==========================================================================
   14.1 PROPERTY PREVIEW ELEMENT
   ========================================================================== */

function getPropertyPreviewElement() {

    return document.getElementById(
        "propertyPreview"
    );

}


/* ==========================================================================
   14.2 SET PROPERTY PRODUCT STATE
   ========================================================================== */

function setPropertyProductState(
    productCount
) {

    const preview =
        getPropertyPreviewElement();


    if (!preview) {

        return;

    }


    if (
        Number(productCount) > 0
    ) {

        preview.classList.add(
            "has-products"
        );

    } else {

        preview.classList.remove(
            "has-products"
        );

    }

}


/* ==========================================================================
   14.3 MARK PRODUCTS AS MOUNTED
   ========================================================================== */

function markPropertyProductsMounted() {

    const layer =
        document.getElementById(
            "productPlacementLayer"
        );


    if (!layer) {

        return;

    }


    const markers =
        layer.querySelectorAll(
            ".property-product-marker"
        );


    markers.forEach(
        function (marker) {

            marker.classList.add(
                "is-mounted"
            );

        }
    );

}


/* ==========================================================================
   14.4 GET CURRENT CONFIGURED PRODUCTS
   ========================================================================== */

function getProductsForPropertyPreview() {

    /*
       The configurator maintains the selected
       products internally.

       We first try the public current-products
       API created earlier in V3.
    */

    if (
        window.NEXPAK_CONFIGURATOR &&
        typeof
            window.NEXPAK_CONFIGURATOR
                .getCurrentProducts ===
            "function"
    ) {

        const products =
            window.NEXPAK_CONFIGURATOR
                .getCurrentProducts();


        if (
            Array.isArray(products)
        ) {

            return products;

        }

    }


    /*
       Fallback to common internal state
       names used by the configurator.
    */

    if (
        Array.isArray(
            window.NEXPAK_CONFIGURATOR
                ?.selectedProducts
        )
    ) {

        return window.NEXPAK_CONFIGURATOR
            .selectedProducts;

    }


    return [];

}


/* ==========================================================================
   14.5 REFRESH PROPERTY VISUALISATION
   ========================================================================== */

function refreshPropertyVisualisation() {

    const products =
        getProductsForPropertyPreview();


    setPropertyProductState(
        products.length
    );


    if (
        window.NEXPAK_PROPERTY_VISUAL &&
        typeof
            window.NEXPAK_PROPERTY_VISUAL
                .render ===
            "function"
    ) {

        window.NEXPAK_PROPERTY_VISUAL
            .render(
                products
            );

    }


    /*
       Give the DOM a moment to receive
       the dynamically generated markers.
    */

    requestAnimationFrame(
        function () {

            markPropertyProductsMounted();

        }
    );

}


/* ==========================================================================
   14.6 PROPERTY VIEW SWITCHING
   ========================================================================== */

function setupPropertyViewControls() {

    const preview =
        getPropertyPreviewElement();


    if (!preview) {

        return;

    }


    const tools =
        preview.querySelectorAll(
            "[data-property-view]"
        );


    tools.forEach(
        function (tool) {

            tool.addEventListener(
                "click",
                function () {

                    const view =
                        tool.dataset
                            .propertyView;


                    tools.forEach(
                        function (item) {

                            const active =
                                item === tool;


                            item.classList.toggle(
                                "active",
                                active
                            );


                            item.setAttribute(
                                "aria-pressed",
                                active
                                    ? "true"
                                    : "false"
                            );

                        }
                    );


                    const scene =
                        document.getElementById(
                            "propertyScene"
                        );


                    if (scene) {

                        scene.dataset
                            .propertyView =
                            view;

                    }


                    preview.classList.toggle(
                        "security-mode",
                        view === "security"
                    );

                }
            );

        }
    );

}


/* ==========================================================================
   14.7 PROPERTY ZOOM
   ========================================================================== */

function setupPropertyZoomControls() {

    const canvas =
        document.getElementById(
            "propertyCanvas"
        );


    if (!canvas) {

        return;

    }


    const scene =
        document.getElementById(
            "propertyScene"
        );


    if (!scene) {

        return;

    }


    let zoom =
        1;


    const minimumZoom =
        0.85;


    const maximumZoom =
        1.35;


    function applyZoom() {

        scene.style.transform =
            `scale(${zoom})`;

    }


    const controls =
        canvas.querySelectorAll(
            "[data-property-zoom]"
        );


    controls.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset
                            .propertyZoom;


                    if (
                        action === "in"
                    ) {

                        zoom =
                            Math.min(
                                maximumZoom,
                                zoom + 0.1
                            );

                    }


                    if (
                        action === "out"
                    ) {

                        zoom =
                            Math.max(
                                minimumZoom,
                                zoom - 0.1
                            );

                    }


                    if (
                        action === "reset"
                    ) {

                        zoom = 1;

                    }


                    applyZoom();

                }
            );

        }
    );


    applyZoom();

}


/* ==========================================================================
   14.8 PROPERTY STATUS MONITOR
   ========================================================================== */

function updatePropertyVisualisation() {

    const products =
        getProductsForPropertyPreview();


    setPropertyProductState(
        products.length
    );


    if (
        window.NEXPAK_PROPERTY_VISUAL &&
        typeof
            window.NEXPAK_PROPERTY_VISUAL
                .render ===
            "function"
    ) {

        window.NEXPAK_PROPERTY_VISUAL
            .render(
                products
            );

    }


    requestAnimationFrame(
        function () {

            markPropertyProductsMounted();

        }
    );

}


/* ==========================================================================
   14.9 INITIALISE PROPERTY VISUALISATION
   ========================================================================== */

function initialisePropertyVisualisation() {

    if (
        !document.getElementById(
            "propertyPreview"
        )
    ) {

        return;

    }


    setupPropertyViewControls();

    setupPropertyZoomControls();

    updatePropertyVisualisation();

}


/* ==========================================================================
   14.10 DOM INITIALISATION
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertyVisualisation();

        }
    );

} else {

    initialisePropertyVisualisation();

}


/* ==========================================================================
   14.11 PUBLIC PROPERTY API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .refreshProperty =
            refreshPropertyVisualisation;


    window.NEXPAK_CONFIGURATOR
        .updateProperty =
            updatePropertyVisualisation;

}


/* ==========================================================================
   PART 14 COMPLETE
   ========================================================================== */
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 15 — LIVE PRODUCT → PROPERTY CONNECTION
   ========================================================================== */


/* ==========================================================================
   15.1 REFRESH PROPERTY AFTER CONFIGURATION CHANGE
   ========================================================================== */

function refreshPropertyAfterConfigurationChange() {

    /*
       Give the configurator state a moment to settle
       before reading the selected products.
    */

    requestAnimationFrame(
        function () {

            if (
                typeof
                    refreshPropertyVisualisation ===
                "function"
            ) {

                refreshPropertyVisualisation();

            }

        }
    );

}


/* ==========================================================================
   15.2 CONFIGURATOR EVENT DISPATCHER
   ========================================================================== */

function dispatchPropertyConfigurationEvent() {

    document.dispatchEvent(
        new CustomEvent(
            "nexpak:configurationChanged",
            {
                detail: {

                    products:
                        getProductsForPropertyPreview()

                }

            }
        )
    );

}


/* ==========================================================================
   15.3 LISTEN FOR CONFIGURATION CHANGES
   ========================================================================== */

document.addEventListener(
    "nexpak:configurationChanged",
    function () {

        refreshPropertyAfterConfigurationChange();

    }
);


/* ==========================================================================
   15.4 WATCH CONFIGURATOR CONTROLS
   ========================================================================== */

function setupPropertyConfigurationListeners() {

    /*
       Product quantity controls.
    */

    document.addEventListener(
        "click",
        function (event) {

            const target =
                event.target.closest(
                    "[data-product-id], " +
                    "[data-product-action], " +
                    ".product-quantity-plus, " +
                    ".product-quantity-minus, " +
                    ".quantity-plus, " +
                    ".quantity-minus, " +
                    ".add-product-button, " +
                    ".product-add-button"
                );


            if (!target) {

                return;

            }


            refreshPropertyAfterConfigurationChange();

        }
    );


    /*
       Quantity inputs.
    */

    document.addEventListener(
        "change",
        function (event) {

            const target =
                event.target;


            if (!target) {

                return;

            }


            if (
                target.matches(
                    "input[type='number'], " +
                    "[data-product-quantity]"
                )
            ) {

                refreshPropertyAfterConfigurationChange();

            }

        }
    );

}


/* ==========================================================================
   15.5 OBSERVE CONFIGURATOR DOM CHANGES
   ========================================================================== */

function setupPropertyMutationObserver() {

    const builder =
        document.getElementById(
            "systemBuilder"
        );


    if (!builder) {

        return;

    }


    /*
       The configurator dynamically creates
       product cards and quantity controls.

       MutationObserver lets the property preview
       stay synchronized without requiring the
       existing product-rendering code to be rewritten.
    */

    const observer =
        new MutationObserver(
            function (mutations) {

                let relevantChange =
                    false;


                mutations.forEach(
                    function (mutation) {

                        if (
                            mutation.type !==
                            "childList"
                        ) {

                            return;

                        }


                        if (
                            mutation.addedNodes.length ||
                            mutation.removedNodes.length
                        ) {

                            relevantChange =
                                true;

                        }

                    }
                );


                if (
                    relevantChange
                ) {

                    refreshPropertyAfterConfigurationChange();

                }

            }
        );


    observer.observe(
        builder,
        {

            childList: true,

            subtree: true

        }
    );


    return observer;

}


/* ==========================================================================
   15.6 LISTEN FOR COMMON CONFIGURATOR EVENTS
   ========================================================================== */

function setupPropertyCustomEventListeners() {

    const events = [

        "productAdded",

        "productRemoved",

        "quantityChanged",

        "configurationChanged",

        "cartUpdated",

        "configuratorUpdated"

    ];


    events.forEach(
        function (eventName) {

            document.addEventListener(
                eventName,
                function () {

                    refreshPropertyAfterConfigurationChange();

                }
            );

        }
    );

}


/* ==========================================================================
   15.7 INITIALISE LIVE PROPERTY CONNECTION
   ========================================================================== */

function initialiseLivePropertyConnection() {

    setupPropertyConfigurationListeners();

    setupPropertyCustomEventListeners();

    setupPropertyMutationObserver();

}


/* ==========================================================================
   15.8 START LIVE PROPERTY CONNECTION
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialiseLivePropertyConnection();

        }
    );

} else {

    initialiseLivePropertyConnection();

}


/* ==========================================================================
   15.9 PUBLIC CONNECTION API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .refreshPropertyAfterChange =
            refreshPropertyAfterConfigurationChange;


    window.NEXPAK_CONFIGURATOR
        .notifyPropertyConfigurationChanged =
            dispatchPropertyConfigurationEvent;

}


/* ==========================================================================
   PART 15 COMPLETE
   ========================================================================== */
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 16 — PROPERTY STATE SYNCHRONISATION
   ========================================================================== */


/* ==========================================================================
   16.1 GET SAFE CURRENT PRODUCT LIST
   ========================================================================== */

function getSafePropertyProductList() {

    const products =
        getProductsForPropertyPreview();


    if (
        !Array.isArray(products)
    ) {

        return [];

    }


    return products.filter(
        function (product) {

            return (
                product &&
                typeof product === "object"
            );

        }
    );

}


/* ==========================================================================
   16.2 UPDATE PROPERTY COUNTERS
   ========================================================================== */

function synchronisePropertyCounters(
    products
) {

    const count =
        Array.isArray(products)
            ? products.length
            : 0;


    const countElement =
        document.getElementById(
            "propertyProductCount"
        );


    const statusElement =
        document.getElementById(
            "propertySecurityStatus"
        );


    const previewStatus =
        document.getElementById(
            "propertyPreviewStatus"
        );


    if (countElement) {

        countElement.textContent =
            String(count);

    }


    if (statusElement) {

        if (count === 0) {

            statusElement.textContent =
                "No products configured";

        } else {

            statusElement.textContent =
                count +
                " product" +
                (
                    count === 1
                        ? ""
                        : "s"
                ) +
                " configured";

        }

    }


    if (previewStatus) {

        if (count === 0) {

            previewStatus.textContent =
                "Select products to place them on your property";

        } else {

            previewStatus.textContent =
                "Security products positioned on your property";

        }

    }

}


/* ==========================================================================
   16.3 UPDATE PROPERTY PREVIEW CLASS
   ========================================================================== */

function synchronisePropertyPreviewClass(
    products
) {

    const preview =
        document.getElementById(
            "propertyPreview"
        );


    if (!preview) {

        return;

    }


    const hasProducts =
        Array.isArray(products) &&
        products.length > 0;


    preview.classList.toggle(
        "has-products",
        hasProducts
    );

}


/* ==========================================================================
   16.4 RENDER CURRENT PROPERTY STATE
   ========================================================================== */

function synchronisePropertyVisualisation() {

    const products =
        getSafePropertyProductList();


    synchronisePropertyCounters(
        products
    );


    synchronisePropertyPreviewClass(
        products
    );


    if (
        window.NEXPAK_PROPERTY_VISUAL &&
        typeof
            window.NEXPAK_PROPERTY_VISUAL
                .render ===
            "function"
    ) {

        window.NEXPAK_PROPERTY_VISUAL
            .render(
                products
            );

    }


    requestAnimationFrame(
        function () {

            markPropertyProductsMounted();

        }
    );


    return products;

}


/* ==========================================================================
   16.5 RESET PROPERTY VISUALISATION
   ========================================================================== */

function resetPropertyVisualisation() {

    const layer =
        document.getElementById(
            "productPlacementLayer"
        );


    if (layer) {

        layer.innerHTML = "";

    }


    const preview =
        document.getElementById(
            "propertyPreview"
        );


    if (preview) {

        preview.classList.remove(
            "has-products"
        );

    }


    synchronisePropertyCounters(
        []
    );

}


/* ==========================================================================
   16.6 LISTEN FOR RESET EVENTS
   ========================================================================== */

function setupPropertyResetListeners() {

    const resetSelectors = [

        "[data-reset-configurator]",

        "[data-configurator-reset]",

        ".reset-configurator",

        ".configurator-reset",

        "#resetConfigurator"

    ];


    document.addEventListener(
        "click",
        function (event) {

            const resetButton =
                event.target.closest(
                    resetSelectors.join(",")
                );


            if (!resetButton) {

                return;

            }


            /*
               Wait until the configurator has
               completed its own reset.
            */

            requestAnimationFrame(
                function () {

                    synchronisePropertyVisualisation();

                }
            );

        }
    );

}


/* ==========================================================================
   16.7 LISTEN FOR PRODUCT REMOVALS
   ========================================================================== */

function setupPropertyRemovalListeners() {

    const removalSelectors = [

        "[data-remove-product]",

        "[data-product-remove]",

        ".remove-product",

        ".product-remove",

        ".configurator-remove"

    ];


    document.addEventListener(
        "click",
        function (event) {

            const removeButton =
                event.target.closest(
                    removalSelectors.join(",")
                );


            if (!removeButton) {

                return;

            }


            requestAnimationFrame(
                function () {

                    synchronisePropertyVisualisation();

                }
            );

        }
    );

}


/* ==========================================================================
   16.8 LISTEN FOR QUANTITY CHANGES
   ========================================================================== */

function setupPropertyQuantityListeners() {

    document.addEventListener(
        "input",
        function (event) {

            const input =
                event.target;


            if (!input) {

                return;

            }


            if (
                input.matches(
                    "[data-product-quantity]"
                )
            ) {

                requestAnimationFrame(
                    function () {

                        synchronisePropertyVisualisation();

                    }
                );

            }

        }
    );


    document.addEventListener(
        "change",
        function (event) {

            const input =
                event.target;


            if (!input) {

                return;

            }


            if (
                input.matches(
                    "[data-product-quantity]"
                )
            ) {

                requestAnimationFrame(
                    function () {

                        synchronisePropertyVisualisation();

                    }
                );

            }

        }
    );

}


/* ==========================================================================
   16.9 INITIALISE PROPERTY SYNCHRONISATION
   ========================================================================== */

function initialisePropertyStateSynchronisation() {

    setupPropertyResetListeners();

    setupPropertyRemovalListeners();

    setupPropertyQuantityListeners();

    synchronisePropertyVisualisation();

}


/* ==========================================================================
   16.10 START PROPERTY SYNCHRONISATION
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertyStateSynchronisation();

        }
    );

} else {

    initialisePropertyStateSynchronisation();

}


/* ==========================================================================
   16.11 PUBLIC PROPERTY STATE API
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR
        .syncProperty =
            synchronisePropertyVisualisation;


    window.NEXPAK_CONFIGURATOR
        .resetProperty =
            resetPropertyVisualisation;

}


/* ==========================================================================
   PART 16 COMPLETE
   ========================================================================== */

   /* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 17 — PROPERTY VISUALISATION ENGINE
   ========================================================================== */


/* ==========================================================================
   17. PROPERTY VISUALISATION STATE
   ========================================================================== */

const propertyVisualState = {

    view:
        "overview",

    zoom:
        1,

    minZoom:
        0.85,

    maxZoom:
        1.35,

    products:
        [],

    renderedProducts:
        0

};


/* ==========================================================================
   17.1 GET CURRENT CONFIGURED PRODUCTS
   ========================================================================== */

function getPropertyProducts() {

    if (
        !state ||
        !state.selections
    ) {

        return [];

    }


    const products = [];


    Object.keys(
        state.selections
    ).forEach(
        function (productId) {

            const selection =
                state.selections[
                    productId
                ];


            if (!selection) {

                return;

            }


            const quantity =
                Number(
                    selection.quantity
                ) || 0;


            if (
                quantity <= 0
            ) {

                return;

            }


            /*
               Use the configured product stored
               by the existing configurator whenever
               available.
            */

            const product =
                selection.product ||
                selection;


            if (!product) {

                return;

            }


            const normalised =
                normaliseProduct(
                    product
                );


            if (!normalised) {

                return;

            }


            products.push({

                product:
                    normalised,

                quantity:
                    quantity

            });

        }
    );


    return products;

}


/* ==========================================================================
   17.2 IDENTIFY PROPERTY SECURITY TYPE
   ========================================================================== */

function getPropertySecurityType(
    product
) {

    if (!product) {

        return "other";

    }


    const text = [

        product.category,

        product.systemCategory,

        product.system,

        product.group,

        product.type,

        product.name,

        product.description

    ]

        .filter(Boolean)

        .join(" ")

        .toLowerCase();


    if (
        text.includes("cctv") ||
        text.includes("camera") ||
        text.includes("ip camera")
    ) {

        return "cctv";

    }


    if (
        text.includes("electric fencing") ||
        text.includes("electric fence") ||
        text.includes("energizer") ||
        text.includes("fence")
    ) {

        return "fence";

    }


    if (
        text.includes("alarm") ||
        text.includes("pir") ||
        text.includes("motion detector")
    ) {

        return "alarm";

    }


    if (
        text.includes("gate automation") ||
        text.includes("gate motor") ||
        text.includes("gate")
    ) {

        return "gate";

    }


    if (
        text.includes("access control") ||
        text.includes("access") ||
        text.includes("fingerprint") ||
        text.includes("biometric")
    ) {

        return "access";

    }


    if (
        text.includes("intercom") ||
        text.includes("video doorbell") ||
        text.includes("door phone")
    ) {

        return "intercom";

    }


    if (
        text.includes("roboguard")
    ) {

        return "roboguard";

    }


    return "other";

}


/* ==========================================================================
   17.3 GET PROPERTY PLACEMENT LAYER
   ========================================================================== */

function getPropertyPlacementLayer() {

    return document.getElementById(
        "productPlacementLayer"
    );

}


/* ==========================================================================
   17.4 GET PROPERTY SCENE
   ========================================================================== */

function getPropertyScene() {

    return document.getElementById(
        "propertyScene"
    );

}


/* ==========================================================================
   17.5 GET PROPERTY PREVIEW
   ========================================================================== */

function getPropertyPreview() {

    return document.getElementById(
        "propertyPreview"
    );

}


/* ==========================================================================
   17.6 CLEAR PROPERTY PRODUCTS
   ========================================================================== */

function clearPropertyProducts() {

    const layer =
        getPropertyPlacementLayer();


    if (!layer) {

        return;

    }


    layer.innerHTML = "";


    propertyVisualState
        .renderedProducts = 0;

}


/* ==========================================================================
   17.7 CREATE PROPERTY PRODUCT MARKER
   ========================================================================== */

function createPropertyProductMarker(
    product,
    type,
    index,
    quantityIndex
) {

    const marker =
        document.createElement(
            "div"
        );


    marker.className =
        "property-product-marker " +
        "property-product-" +
        type;


    marker.dataset.productId =
        product.id ||
        "";


    marker.dataset.productType =
        type;


    marker.dataset.quantityIndex =
        String(
            quantityIndex
        );


    marker.setAttribute(
        "role",
        "img"
    );


    marker.setAttribute(
        "aria-label",
        (
            product.name ||
            "Security product"
        ) +
        " mounted on property"
    );


    /*
       Icon selection.
    */

    const icons = {

        cctv:
            "fa-video",

        fence:
            "fa-bolt",

        alarm:
            "fa-bell",

        gate:
            "fa-door-open",

        access:
            "fa-fingerprint",

        intercom:
            "fa-phone",

        roboguard:
            "fa-shield-halved",

        other:
            "fa-shield-halved"

    };


    const icon =
        document.createElement(
            "span"
        );


    icon.className =
        "property-product-marker-icon";


    const iconElement =
        document.createElement(
            "i"
        );


    iconElement.className =
        "fa-solid " +
        (
            icons[type] ||
            icons.other
        );


    icon.appendChild(
        iconElement
    );


    marker.appendChild(
        icon
    );


    /*
       Product label.
    */

    const label =
        document.createElement(
            "span"
        );


    label.className =
        "property-product-marker-label";


    label.textContent =
        product.name ||
        "Security Product";


    marker.appendChild(
        label
    );


    return marker;

}


/* ==========================================================================
   17.8 GET PROPERTY MOUNT POSITION
   ========================================================================== */

function getPropertyMountPosition(
    type,
    index
) {

    const positions = {

        cctv: [

            {
                left: 22,
                top: 29
            },

            {
                left: 78,
                top: 29
            },

            {
                left: 27,
                top: 51
            },

            {
                left: 73,
                top: 51
            }

        ],


        fence: [

            {
                left: 13,
                top: 77
            },

            {
                left: 32,
                top: 83
            },

            {
                left: 68,
                top: 83
            },

            {
                left: 87,
                top: 77
            }

        ],


        alarm: [

            {
                left: 50,
                top: 40
            }

        ],


        gate: [

            {
                left: 16,
                top: 71
            }

        ],


        access: [

            {
                left: 48,
                top: 57
            }

        ],


        intercom: [

            {
                left: 53,
                top: 57
            }

        ],


        roboguard: [

            {
                left: 20,
                top: 78
            },

            {
                left: 80,
                top: 78
            }

        ],


        other: [

            {
                left: 50,
                top: 50
            }

        ]

    };


    const typePositions =
        positions[type] ||
        positions.other;


    return (
        typePositions[
            index %
            typePositions.length
        ]
    );

}


/* ==========================================================================
   17.9 RENDER PROPERTY PRODUCTS
   ========================================================================== */

function renderPropertyProducts() {

    const layer =
        getPropertyPlacementLayer();


    if (!layer) {

        return;

    }


    clearPropertyProducts();


    const configuredProducts =
        getPropertyProducts();


    propertyVisualState.products =
        configuredProducts;


    if (
        !configuredProducts.length
    ) {

        updatePropertyVisualStatus();

        return;

    }


    const typeIndexes = {};


    configuredProducts.forEach(
        function (item) {

            const product =
                item.product;


            const quantity =
                item.quantity;


            const type =
                getPropertySecurityType(
                    product
                );


            if (
                !typeIndexes[type]
            ) {

                typeIndexes[type] = 0;

            }


            /*
               Render one physical marker
               for every configured unit.

               Example:

               CCTV quantity = 3

               → three CCTV markers
               → three physical positions
            */

            for (
                let quantityIndex = 0;
                quantityIndex < quantity;
                quantityIndex++
            ) {

                const position =
                    getPropertyMountPosition(
                        type,
                        typeIndexes[type]
                    );


                const marker =
                    createPropertyProductMarker(
                        product,
                        type,
                        typeIndexes[type],
                        quantityIndex
                    );


                marker.style.left =
                    position.left +
                    "%";


                marker.style.top =
                    position.top +
                    "%";


                layer.appendChild(
                    marker
                );


                typeIndexes[type]++;


                propertyVisualState
                    .renderedProducts++;

            }

        }
    );


    updatePropertyVisualStatus();

}


/* ==========================================================================
   17.10 UPDATE PROPERTY STATUS
   ========================================================================== */

function updatePropertyVisualStatus() {

    const status =
        document.getElementById(
            "propertyPreviewStatus"
        );


    const count =
        document.getElementById(
            "propertyProductCount"
        );


    const securityStatus =
        document.getElementById(
            "propertySecurityStatus"
        );


    const total =
        propertyVisualState
            .renderedProducts;


    if (count) {

        count.textContent =
            String(total);

    }


    if (status) {

        if (total === 0) {

            status.textContent =
                "Select products to place them on your property";

        }

        else if (
            total === 1
        ) {

            status.textContent =
                "1 security product placed on your property";

        }

        else {

            status.textContent =
                total +
                " security products placed on your property";

        }

    }


    if (securityStatus) {

        if (total === 0) {

            securityStatus.textContent =
                "No products configured";

        }

        else {

            securityStatus.textContent =
                "Security layout configured";

        }

    }

}


/* ==========================================================================
   17.11 PROPERTY VISUAL PUBLIC API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .state =
        propertyVisualState;


window.NEXPAK_PROPERTY_VISUAL
    .render =
        renderPropertyProducts;


window.NEXPAK_PROPERTY_VISUAL
    .refresh =
        renderPropertyProducts;


/* ==========================================================================
   17.12 INITIAL PROPERTY RENDER
   ========================================================================== */

function initialisePropertyVisualisation() {

    renderPropertyProducts();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertyVisualisation();

        }
    );

}


/* ==========================================================================
   PART 17 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 18 — PROPERTY MOUNTING & SECURITY ZONES
   ========================================================================== */


/* ==========================================================================
   18.1 PROPERTY ZONE ELEMENTS
   ========================================================================== */

function getPropertyZoneElements() {

    return {

        house:
            document.querySelector(
                ".zone-house"
            ),

        entrance:
            document.querySelector(
                ".zone-entrance"
            ),

        driveway:
            document.querySelector(
                ".zone-driveway"
            ),

        fence:
            document.getElementById(
                "propertyFenceZone"
            ),

        gate:
            document.getElementById(
                "propertyGate"
            )

    };

}


/* ==========================================================================
   18.2 RESET PROPERTY SECURITY ZONES
   ========================================================================== */

function resetPropertySecurityZones() {

    const zones =
        getPropertyZoneElements();


    Object.keys(zones).forEach(
        function (key) {

            const zone =
                zones[key];


            if (!zone) {

                return;

            }


            zone.classList.remove(
                "is-active"
            );


            zone.classList.remove(
                "security-active"
            );

        }
    );

}


/* ==========================================================================
   18.3 ACTIVATE PROPERTY SECURITY ZONES
   ========================================================================== */

function updatePropertySecurityZones() {

    resetPropertySecurityZones();


    const zones =
        getPropertyZoneElements();


    const products =
        getPropertyProducts();


    if (
        !products.length
    ) {

        return;

    }


    products.forEach(
        function (item) {

            if (!item || !item.product) {

                return;

            }


            const type =
                getPropertySecurityType(
                    item.product
                );


            /*
               CCTV protects the house
               and exterior areas.
            */

            if (
                type === "cctv"
            ) {

                activatePropertyZone(
                    zones.house
                );

            }


            /*
               Alarm systems protect the
               building/interior.
            */

            if (
                type === "alarm"
            ) {

                activatePropertyZone(
                    zones.house
                );

            }


            /*
               Access control and intercom
               belong at the entrance.
            */

            if (
                type === "access" ||
                type === "intercom"
            ) {

                activatePropertyZone(
                    zones.entrance
                );

            }


            /*
               Gate automation activates
               the property gate and driveway.
            */

            if (
                type === "gate"
            ) {

                activatePropertyZone(
                    zones.gate
                );


                activatePropertyZone(
                    zones.driveway
                );

            }


            /*
               Electric fencing protects
               the property perimeter.
            */

            if (
                type === "fence"
            ) {

                activatePropertyZone(
                    zones.fence
                );

            }


            /*
               Roboguard protects the
               perimeter and open yard.
            */

            if (
                type === "roboguard"
            ) {

                activatePropertyZone(
                    zones.fence
                );


                activatePropertyZone(
                    zones.driveway
                );

            }

        }
    );

}


/* ==========================================================================
   18.4 ACTIVATE INDIVIDUAL ZONE
   ========================================================================== */

function activatePropertyZone(
    zone
) {

    if (!zone) {

        return;

    }


    zone.classList.add(
        "is-active"
    );


    zone.classList.add(
        "security-active"
    );

}


/* ==========================================================================
   18.5 GET MOUNTING LOCATION
   ========================================================================== */

function getPropertyMountingLocation(
    type
) {

    const locations = {

        cctv:
            "house-wall",

        fence:
            "perimeter",

        alarm:
            "house-interior",

        gate:
            "gate",

        access:
            "entrance",

        intercom:
            "entrance",

        roboguard:
            "perimeter",

        other:
            "property"

    };


    return (
        locations[type] ||
        locations.other
    );

}


/* ==========================================================================
   18.6 APPLY MOUNTING INFORMATION
   ========================================================================== */

function applyPropertyMountingInformation(
    marker,
    type
) {

    if (!marker) {

        return;

    }


    const location =
        getPropertyMountingLocation(
            type
        );


    marker.dataset.mountLocation =
        location;


    marker.classList.add(
        "is-mounted"
    );


    marker.classList.add(
        "mount-" +
        location
    );


    /*
       Product-specific mounting labels.
    */

    const mountingLabels = {

        "house-wall":
            "Mounted on house",

        "house-interior":
            "Installed inside house",

        "perimeter":
            "Installed on perimeter",

        "gate":
            "Installed at gate",

        "entrance":
            "Installed at entrance",

        "property":
            "Installed on property"

    };


    marker.setAttribute(
        "title",
        mountingLabels[location] ||
        "Security equipment"
    );

}


/* ==========================================================================
   18.7 CREATE MOUNTING INDICATOR
   ========================================================================== */

function createPropertyMountingIndicator(
    marker,
    type
) {

    if (!marker) {

        return;

    }


    /*
       Prevent duplicate indicators when
       the property is refreshed.
    */

    if (
        marker.querySelector(
            ".property-mount-indicator"
        )
    ) {

        return;

    }


    const indicator =
        document.createElement(
            "span"
        );


    indicator.className =
        "property-mount-indicator";


    indicator.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
       Different equipment uses different
       visual mounting behaviour.
    */

    indicator.dataset.mountType =
        type;


    marker.appendChild(
        indicator
    );

}


/* ==========================================================================
   18.8 ENHANCE ALL PROPERTY MARKERS
   ========================================================================== */

function enhancePropertyMounting() {

    const layer =
        getPropertyPlacementLayer();


    if (!layer) {

        return;

    }


    const markers =
        layer.querySelectorAll(
            ".property-product-marker"
        );


    markers.forEach(
        function (marker) {

            const type =
                marker.dataset.productType ||
                "other";


            applyPropertyMountingInformation(
                marker,
                type
            );


            createPropertyMountingIndicator(
                marker,
                type
            );

        }
    );

}


/* ==========================================================================
   18.9 PROPERTY VISUAL REFRESH
   ========================================================================== */

function refreshPropertyVisualisation() {

    renderPropertyProducts();


    updatePropertySecurityZones();


    enhancePropertyMounting();

}


/* ==========================================================================
   18.10 PUBLIC API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .updateZones =
        updatePropertySecurityZones;


window.NEXPAK_PROPERTY_VISUAL
    .refresh =
        refreshPropertyVisualisation;


/* ==========================================================================
   18.11 INITIAL PROPERTY ZONE UPDATE
   ========================================================================== */

function initialisePropertySecurityZones() {

    updatePropertySecurityZones();


    enhancePropertyMounting();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertySecurityZones();

        }
    );

} else {

    initialisePropertySecurityZones();

}


/* ==========================================================================
   PART 18 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 19 — LIVE PROPERTY UPDATE ENGINE
   ========================================================================== */


/* ==========================================================================
   19.1 PROPERTY UPDATE DEBOUNCE
   ========================================================================== */

let propertyRefreshTimer = null;


/* ==========================================================================
   19.2 SCHEDULE PROPERTY REFRESH
   ========================================================================== */

function schedulePropertyVisualRefresh() {

    if (
        propertyRefreshTimer
    ) {

        clearTimeout(
            propertyRefreshTimer
        );

    }


    propertyRefreshTimer =
        setTimeout(
            function () {

                refreshPropertyVisualisation();

            },
            80
        );

}


/* ==========================================================================
   19.3 REFRESH AFTER PRODUCT SELECTION
   ========================================================================== */

function refreshPropertyAfterSelection() {

    schedulePropertyVisualRefresh();

}


/* ==========================================================================
   19.4 WATCH CONFIGURATOR EVENTS
   ========================================================================== */

function attachPropertySelectionListeners() {

    /*
       Listen for changes to quantity controls.
    */

    document.addEventListener(
        "change",
        function (event) {

            const target =
                event.target;


            if (!target) {

                return;

            }


            /*
               Quantity inputs.
            */

            if (
                target.matches(
                    "input[type='number']"
                )
            ) {

                schedulePropertyVisualRefresh();

                return;

            }


            /*
               Product/category selectors.
            */

            if (
                target.matches(
                    "select"
                )
            ) {

                schedulePropertyVisualRefresh();

            }

        }
    );


    /*
       Listen for product buttons and
       configurator controls.
    */

    document.addEventListener(
        "click",
        function (event) {

            const target =
                event.target;


            if (!target) {

                return;

            }


            const button =
                target.closest(
                    "button"
                );


            if (!button) {

                return;

            }


            /*
               Buttons that can alter the
               configurator state.
            */

            const isConfiguratorButton =
                button.matches(
                    ".product-add-button, " +
                    ".product-remove-button, " +
                    ".quantity-plus, " +
                    ".quantity-minus, " +
                    ".product-quantity-plus, " +
                    ".product-quantity-minus, " +
                    "[data-product-id], " +
                    "[data-action='add'], " +
                    "[data-action='remove'], " +
                    "[data-action='increase'], " +
                    "[data-action='decrease']"
                );


            if (
                isConfiguratorButton
            ) {

                schedulePropertyVisualRefresh();

            }

        }
    );

}


/* ==========================================================================
   19.5 WATCH STATE CHANGES
   ========================================================================== */

function createPropertyStateSnapshot() {

    if (
        !state ||
        !state.selections
    ) {

        return "";

    }


    const snapshot = [];


    Object.keys(
        state.selections
    )
        .sort()
        .forEach(
            function (productId) {

                const selection =
                    state.selections[
                        productId
                    ];


                if (!selection) {

                    return;

                }


                snapshot.push({

                    id:
                        productId,

                    quantity:
                        Number(
                            selection.quantity
                        ) || 0

                });

            }
        );


    return JSON.stringify(
        snapshot
    );

}


/* ==========================================================================
   19.6 STATE POLLING FALLBACK
   ========================================================================== */

let propertyLastStateSnapshot =
    "";


function monitorPropertyState() {

    const currentSnapshot =
        createPropertyStateSnapshot();


    if (
        currentSnapshot !==
        propertyLastStateSnapshot
    ) {

        propertyLastStateSnapshot =
            currentSnapshot;


        schedulePropertyVisualRefresh();

    }

}


/* ==========================================================================
   19.7 START STATE MONITOR
   ========================================================================== */

let propertyStateMonitorStarted =
    false;


function startPropertyStateMonitor() {

    if (
        propertyStateMonitorStarted
    ) {

        return;

    }


    propertyStateMonitorStarted =
        true;


    propertyLastStateSnapshot =
        createPropertyStateSnapshot();


    /*
       Lightweight polling is used as a
       fallback because the existing
       configurator does not require us
       to modify its state architecture.
    */

    setInterval(
        monitorPropertyState,
        250
    );

}


/* ==========================================================================
   19.8 REFRESH PROPERTY AFTER CART ACTIONS
   ========================================================================== */

function attachPropertyCartListeners() {

    document.addEventListener(
        "click",
        function (event) {

            const target =
                event.target;


            if (!target) {

                return;

            }


            const button =
                target.closest(
                    "button, a"
                );


            if (!button) {

                return;

            }


            const action =
                (
                    button.dataset.action ||
                    ""
                ).toLowerCase();


            const text =
                (
                    button.textContent ||
                    ""
                ).toLowerCase();


            const cartAction =
                action.includes("cart") ||
                text.includes("add to cart") ||
                text.includes("remove") ||
                text.includes("increase") ||
                text.includes("decrease");


            if (
                cartAction
            ) {

                schedulePropertyVisualRefresh();

            }

        }
    );

}


/* ==========================================================================
   19.9 REFRESH PROPERTY AFTER CATEGORY CHANGE
   ========================================================================== */

function attachPropertyCategoryListeners() {

    document.addEventListener(
        "click",
        function (event) {

            const categoryButton =
                event.target.closest(
                    ".category-card"
                );


            if (!categoryButton) {

                return;

            }


            /*
               Category changes don't necessarily
               change selections, but refreshing here
               guarantees the property remains in sync.
            */

            schedulePropertyVisualRefresh();

        }
    );

}


/* ==========================================================================
   19.10 SAFE REFRESH
   ========================================================================== */

function performSafePropertyRefresh() {

    try {

        refreshPropertyVisualisation();

    }

    catch (error) {

        console.warn(
            "Nexpak property visualisation refresh failed:",
            error
        );

    }

}


/* ==========================================================================
   19.11 REPLACE REFRESH SCHEDULER
   ========================================================================== */

function scheduleSafePropertyRefresh() {

    if (
        propertyRefreshTimer
    ) {

        clearTimeout(
            propertyRefreshTimer
        );

    }


    propertyRefreshTimer =
        setTimeout(
            function () {

                performSafePropertyRefresh();

            },
            80
        );

}


/* ==========================================================================
   19.12 INITIALISE LIVE PROPERTY ENGINE
   ========================================================================== */

function initialisePropertyLiveEngine() {

    attachPropertySelectionListeners();


    attachPropertyCartListeners();


    attachPropertyCategoryListeners();


    startPropertyStateMonitor();


    propertyLastStateSnapshot =
        createPropertyStateSnapshot();


    scheduleSafePropertyRefresh();

}


/* ==========================================================================
   19.13 START LIVE PROPERTY ENGINE
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertyLiveEngine();

        }
    );

} else {

    initialisePropertyLiveEngine();

}


/* ==========================================================================
   19.14 PUBLIC API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .scheduleRefresh =
        scheduleSafePropertyRefresh;


window.NEXPAK_PROPERTY_VISUAL
    .refreshNow =
        performSafePropertyRefresh;


/* ==========================================================================
   PART 19 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 20 — PROPERTY COVERAGE & LIVE SECURITY STATUS
   ========================================================================== */


/* ==========================================================================
   20.1 GET PROPERTY SECURITY SUMMARY
   ========================================================================== */

function getPropertySecuritySummary() {

    const configuredProducts =
        getPropertyProducts();


    const summary = {

        totalProducts: 0,

        cctv: 0,

        fence: 0,

        alarm: 0,

        gate: 0,

        access: 0,

        intercom: 0,

        roboguard: 0,

        other: 0

    };


    configuredProducts.forEach(
        function (item) {

            if (
                !item ||
                !item.product
            ) {

                return;

            }


            const type =
                getPropertySecurityType(
                    item.product
                );


            const quantity =
                Number(
                    item.quantity
                ) || 0;


            summary.totalProducts +=
                quantity;


            if (
                Object.prototype.hasOwnProperty.call(
                    summary,
                    type
                )
            ) {

                summary[type] +=
                    quantity;

            }

            else {

                summary.other +=
                    quantity;

            }

        }
    );


    return summary;

}


/* ==========================================================================
   20.2 UPDATE PROPERTY PRODUCT COUNT
   ========================================================================== */

function updatePropertyProductCount(
    summary
) {

    const count =
        document.getElementById(
            "propertyProductCount"
        );


    if (!count) {

        return;

    }


    count.textContent =
        String(
            summary.totalProducts
        );

}


/* ==========================================================================
   20.3 UPDATE PROPERTY SECURITY STATUS
   ========================================================================== */

function updatePropertySecurityStatus(
    summary
) {

    const status =
        document.getElementById(
            "propertySecurityStatus"
        );


    if (!status) {

        return;

    }


    if (
        summary.totalProducts === 0
    ) {

        status.textContent =
            "No products configured";

        return;

    }


    const activeSystems = [];


    if (
        summary.cctv > 0
    ) {

        activeSystems.push(
            "CCTV"
        );

    }


    if (
        summary.fence > 0
    ) {

        activeSystems.push(
            "Electric Fence"
        );

    }


    if (
        summary.alarm > 0
    ) {

        activeSystems.push(
            "Alarm"
        );

    }


    if (
        summary.gate > 0
    ) {

        activeSystems.push(
            "Gate"
        );

    }


    if (
        summary.access > 0
    ) {

        activeSystems.push(
            "Access Control"
        );

    }


    if (
        summary.intercom > 0
    ) {

        activeSystems.push(
            "Intercom"
        );

    }


    if (
        summary.roboguard > 0
    ) {

        activeSystems.push(
            "Roboguard"
        );

    }


    if (
        activeSystems.length
    ) {

        status.textContent =
            activeSystems.join(
                " • "
            );

    }

    else {

        status.textContent =
            "Security equipment configured";

    }

}


/* ==========================================================================
   20.4 UPDATE PROPERTY PREVIEW STATUS
   ========================================================================== */

function updatePropertyPreviewStatus(
    summary
) {

    const status =
        document.getElementById(
            "propertyPreviewStatus"
        );


    if (!status) {

        return;

    }


    if (
        summary.totalProducts === 0
    ) {

        status.textContent =
            "Select products to place them on your property";

        return;

    }


    if (
        summary.totalProducts === 1
    ) {

        status.textContent =
            "1 security product placed on your property";

        return;

    }


    status.textContent =
        summary.totalProducts +
        " security products placed on your property";

}


/* ==========================================================================
   20.5 UPDATE PROPERTY INFO BAR
   ========================================================================== */

function updatePropertyInformationBar() {

    const summary =
        getPropertySecuritySummary();


    updatePropertyProductCount(
        summary
    );


    updatePropertySecurityStatus(
        summary
    );


    updatePropertyPreviewStatus(
        summary
    );


    return summary;

}


/* ==========================================================================
   20.6 ACTIVATE CCTV VISUAL ZONES
   ========================================================================== */

function updatePropertyCCTVZones(
    summary
) {

    const zones =
        document.querySelectorAll(
            ".property-cctv-zone"
        );


    if (!zones.length) {

        return;

    }


    zones.forEach(
        function (zone, index) {

            zone.classList.toggle(
                "is-active",
                index <
                summary.cctv
            );

        }
    );

}


/* ==========================================================================
   20.7 ACTIVATE FENCE VISUAL
   ========================================================================== */

function updatePropertyFenceVisual(
    summary
) {

    const fence =
        document.getElementById(
            "propertyFenceZone"
        );


    if (!fence) {

        return;

    }


    const active =
        (
            summary.fence > 0 ||
            summary.roboguard > 0
        );


    fence.classList.toggle(
        "is-active",
        active
    );


    fence.classList.toggle(
        "security-active",
        active
    );

}


/* ==========================================================================
   20.8 ACTIVATE GATE VISUAL
   ========================================================================== */

function updatePropertyGateVisual(
    summary
) {

    const gate =
        document.getElementById(
            "propertyGate"
        );


    if (!gate) {

        return;

    }


    const active =
        summary.gate > 0;


    gate.classList.toggle(
        "is-active",
        active
    );


    gate.classList.toggle(
        "security-active",
        active
    );

}


/* ==========================================================================
   20.9 ACTIVATE HOUSE SECURITY VISUAL
   ========================================================================== */

function updatePropertyHouseSecurityVisual(
    summary
) {

    const houseZone =
        document.querySelector(
            ".zone-house"
        );


    if (!houseZone) {

        return;

    }


    const active =
        (
            summary.cctv > 0 ||
            summary.alarm > 0
        );


    houseZone.classList.toggle(
        "is-active",
        active
    );


    houseZone.classList.toggle(
        "security-active",
        active
    );

}


/* ==========================================================================
   20.10 ACTIVATE ENTRANCE SECURITY VISUAL
   ========================================================================== */

function updatePropertyEntranceSecurityVisual(
    summary
) {

    const entranceZone =
        document.querySelector(
            ".zone-entrance"
        );


    if (!entranceZone) {

        return;

    }


    const active =
        (
            summary.access > 0 ||
            summary.intercom > 0
        );


    entranceZone.classList.toggle(
        "is-active",
        active
    );


    entranceZone.classList.toggle(
        "security-active",
        active
    );

}


/* ==========================================================================
   20.11 ACTIVATE DRIVEWAY SECURITY VISUAL
   ========================================================================== */

function updatePropertyDrivewaySecurityVisual(
    summary
) {

    const drivewayZone =
        document.querySelector(
            ".zone-driveway"
        );


    if (!drivewayZone) {

        return;

    }


    const active =
        (
            summary.gate > 0 ||
            summary.roboguard > 0
        );


    drivewayZone.classList.toggle(
        "is-active",
        active
    );


    drivewayZone.classList.toggle(
        "security-active",
        active
    );

}


/* ==========================================================================
   20.12 UPDATE ALL SECURITY VISUALS
   ========================================================================== */

function updateAllPropertySecurityVisuals(
    summary
) {

    updatePropertyCCTVZones(
        summary
    );


    updatePropertyFenceVisual(
        summary
    );


    updatePropertyGateVisual(
        summary
    );


    updatePropertyHouseSecurityVisual(
        summary
    );


    updatePropertyEntranceSecurityVisual(
        summary
    );


    updatePropertyDrivewaySecurityVisual(
        summary
    );

}


/* ==========================================================================
   20.13 PROPERTY COVERAGE STATE
   ========================================================================== */

function updatePropertyCoverageState(
    summary
) {

    const preview =
        getPropertyPreview();


    if (!preview) {

        return;

    }


    preview.classList.toggle(
        "has-cctv",
        summary.cctv > 0
    );


    preview.classList.toggle(
        "has-fence",
        summary.fence > 0
    );


    preview.classList.toggle(
        "has-alarm",
        summary.alarm > 0
    );


    preview.classList.toggle(
        "has-gate",
        summary.gate > 0
    );


    preview.classList.toggle(
        "has-access",
        summary.access > 0
    );


    preview.classList.toggle(
        "has-intercom",
        summary.intercom > 0
    );


    preview.classList.toggle(
        "has-roboguard",
        summary.roboguard > 0
    );


    preview.classList.toggle(
        "has-security",
        summary.totalProducts > 0
    );

}


/* ==========================================================================
   20.14 COMPLETE PROPERTY SECURITY UPDATE
   ========================================================================== */

function updateCompletePropertySecurityState() {

    const summary =
        updatePropertyInformationBar();


    updateAllPropertySecurityVisuals(
        summary
    );


    updatePropertyCoverageState(
        summary
    );


    propertyVisualState.products =
        getPropertyProducts();


    return summary;

}


/* ==========================================================================
   20.15 EXTEND PROPERTY REFRESH
   ========================================================================== */

const originalPropertyRefreshPart20 =
    refreshPropertyVisualisation;


refreshPropertyVisualisation =
    function () {

        originalPropertyRefreshPart20();


        updateCompletePropertySecurityState();


        enhancePropertyMounting();

    };


/* ==========================================================================
   20.16 INITIALISE PROPERTY SECURITY STATUS
   ========================================================================== */

function initialisePropertySecurityStatus() {

    updateCompletePropertySecurityState();

}


/* ==========================================================================
   20.17 START PROPERTY SECURITY STATUS
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertySecurityStatus();

        }
    );

} else {

    initialisePropertySecurityStatus();

}


/* ==========================================================================
   20.18 PUBLIC API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .getSecuritySummary =
        getPropertySecuritySummary;


window.NEXPAK_PROPERTY_VISUAL
    .updateSecurityStatus =
        updateCompletePropertySecurityState;


/* ==========================================================================
   PART 20 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 21 — PROPERTY VIEW & ZOOM CONTROLS
   ========================================================================== */


/* ==========================================================================
   21.1 GET PROPERTY CANVAS
   ========================================================================== */

function getPropertyCanvas() {

    return document.getElementById(
        "propertyCanvas"
    );

}


/* ==========================================================================
   21.2 GET PROPERTY SCENE
   ========================================================================== */

function getPropertySceneElement() {

    return document.getElementById(
        "propertyScene"
    );

}


/* ==========================================================================
   21.3 APPLY PROPERTY ZOOM
   ========================================================================== */

function applyPropertyZoom() {

    const scene =
        getPropertySceneElement();


    if (!scene) {

        return;

    }


    const zoom =
        Number(
            propertyVisualState.zoom
        ) || 1;


    scene.style.transform =
        "scale(" +
        zoom +
        ")";


    scene.style.transformOrigin =
        "center center";


    const canvas =
        getPropertyCanvas();


    if (canvas) {

        canvas.dataset.zoom =
            String(zoom);

    }

}


/* ==========================================================================
   21.4 SET PROPERTY ZOOM
   ========================================================================== */

function setPropertyZoom(
    value
) {

    let zoom =
        Number(value);


    if (
        !Number.isFinite(zoom)
    ) {

        zoom = 1;

    }


    zoom =
        Math.max(
            propertyVisualState.minZoom,
            Math.min(
                propertyVisualState.maxZoom,
                zoom
            )
        );


    propertyVisualState.zoom =
        Number(
            zoom.toFixed(2)
        );


    applyPropertyZoom();

}


/* ==========================================================================
   21.5 ZOOM IN
   ========================================================================== */

function propertyZoomIn() {

    setPropertyZoom(
        propertyVisualState.zoom +
        0.1
    );

}


/* ==========================================================================
   21.6 ZOOM OUT
   ========================================================================== */

function propertyZoomOut() {

    setPropertyZoom(
        propertyVisualState.zoom -
        0.1
    );

}


/* ==========================================================================
   21.7 RESET PROPERTY ZOOM
   ========================================================================== */

function resetPropertyZoom() {

    setPropertyZoom(
        1
    );

}


/* ==========================================================================
   21.8 SET PROPERTY VIEW
   ========================================================================== */

function setPropertyView(
    view
) {

    const canvas =
        getPropertyCanvas();


    if (!canvas) {

        return;

    }


    const requestedView =
        String(
            view ||
            "overview"
        ).toLowerCase();


    const validViews = [

        "overview",

        "security"

    ];


    const selectedView =
        validViews.includes(
            requestedView
        )
            ? requestedView
            : "overview";


    propertyVisualState.view =
        selectedView;


    canvas.dataset.propertyView =
        selectedView;


    canvas.classList.remove(
        "property-view-overview"
    );


    canvas.classList.remove(
        "property-view-security"
    );


    canvas.classList.add(
        "property-view-" +
        selectedView
    );


    updatePropertyViewButtons();

}


/* ==========================================================================
   21.9 UPDATE VIEW BUTTONS
   ========================================================================== */

function updatePropertyViewButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-property-view]"
        );


    buttons.forEach(
        function (button) {

            const buttonView =
                String(
                    button.dataset.propertyView ||
                    ""
                ).toLowerCase();


            const active =
                buttonView ===
                propertyVisualState.view;


            button.classList.toggle(
                "active",
                active
            );


            button.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        }
    );

}


/* ==========================================================================
   21.10 HANDLE PROPERTY VIEW CONTROL
   ========================================================================== */

function handlePropertyViewControl(
    event
) {

    const button =
        event.target.closest(
            "[data-property-view]"
        );


    if (!button) {

        return;

    }


    const view =
        button.dataset.propertyView;


    setPropertyView(
        view
    );

}


/* ==========================================================================
   21.11 HANDLE PROPERTY ZOOM CONTROL
   ========================================================================== */

function handlePropertyZoomControl(
    event
) {

    const button =
        event.target.closest(
            "[data-property-zoom]"
        );


    if (!button) {

        return;

    }


    const action =
        String(
            button.dataset.propertyZoom ||
            ""
        ).toLowerCase();


    if (
        action === "in"
    ) {

        propertyZoomIn();

    }


    else if (
        action === "out"
    ) {

        propertyZoomOut();

    }


    else if (
        action === "reset"
    ) {

        resetPropertyZoom();

    }

}


/* ==========================================================================
   21.12 PROPERTY CONTROL LISTENERS
   ========================================================================== */

function attachPropertyViewControls() {

    document.addEventListener(
        "click",
        handlePropertyViewControl
    );


    document.addEventListener(
        "click",
        handlePropertyZoomControl
    );

}


/* ==========================================================================
   21.13 PROPERTY KEYBOARD CONTROLS
   ========================================================================== */

function attachPropertyKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {

            const canvas =
                getPropertyCanvas();


            if (!canvas) {

                return;

            }


            /*
               Only respond to zoom shortcuts when
               the property preview is visible/focused.
            */

            const preview =
                getPropertyPreview();


            if (
                !preview
            ) {

                return;

            }


            const activeElement =
                document.activeElement;


            const typing =
                activeElement &&
                (
                    activeElement.tagName ===
                    "INPUT" ||

                    activeElement.tagName ===
                    "TEXTAREA" ||

                    activeElement.tagName ===
                    "SELECT"
                );


            if (
                typing
            ) {

                return;

            }


            if (
                event.key === "+" ||
                event.key === "="
            ) {

                propertyZoomIn();

            }


            else if (
                event.key === "-"
            ) {

                propertyZoomOut();

            }


            else if (
                event.key === "0"
            ) {

                resetPropertyZoom();

            }

        }
    );

}


/* ==========================================================================
   21.14 PROPERTY VIEW STATE
   ========================================================================== */

function getPropertyViewState() {

    return {

        view:
            propertyVisualState.view,

        zoom:
            propertyVisualState.zoom,

        minZoom:
            propertyVisualState.minZoom,

        maxZoom:
            propertyVisualState.maxZoom

    };

}


/* ==========================================================================
   21.15 INITIALISE PROPERTY VIEW
   ========================================================================== */

function initialisePropertyViewControls() {

    setPropertyView(
        "overview"
    );


    resetPropertyZoom();

}


/* ==========================================================================
   21.16 INITIALISE PROPERTY CONTROLS
   ========================================================================== */

function initialisePropertyControls() {

    attachPropertyViewControls();


    attachPropertyKeyboardControls();


    initialisePropertyViewControls();

}


/* ==========================================================================
   21.17 START PROPERTY CONTROLS
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialisePropertyControls();

        }
    );

} else {

    initialisePropertyControls();

}


/* ==========================================================================
   21.18 PUBLIC PROPERTY VIEW API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .setView =
        setPropertyView;


window.NEXPAK_PROPERTY_VISUAL
    .getViewState =
        getPropertyViewState;


window.NEXPAK_PROPERTY_VISUAL
    .zoomIn =
        propertyZoomIn;


window.NEXPAK_PROPERTY_VISUAL
    .zoomOut =
        propertyZoomOut;


window.NEXPAK_PROPERTY_VISUAL
    .resetZoom =
        resetPropertyZoom;


/* ==========================================================================
   PART 21 COMPLETE
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   PART 22 — PROPERTY ENGINE FINAL INTEGRATION
   ========================================================================== */


/* ==========================================================================
   22.1 PROPERTY ENGINE READY STATE
   ========================================================================== */

let propertyEngineReady = false;


/* ==========================================================================
   22.2 CHECK PROPERTY ENGINE DEPENDENCIES
   ========================================================================== */

function propertyEngineDependenciesReady() {

    const preview =
        getPropertyPreview();


    const canvas =
        getPropertyCanvas();


    const scene =
        getPropertySceneElement();


    const layer =
        getPropertyPlacementLayer();


    return Boolean(
        preview &&
        canvas &&
        scene &&
        layer
    );

}


/* ==========================================================================
   22.3 FINAL PROPERTY ENGINE REFRESH
   ========================================================================== */

function runFinalPropertyEngineRefresh() {

    if (
        !propertyEngineDependenciesReady()
    ) {

        return false;

    }


    try {

        /*
           1. Render selected products.
        */

        renderPropertyProducts();


        /*
           2. Update security zones.
        */

        updatePropertySecurityZones();


        /*
           3. Update product mounting.
        */

        enhancePropertyMounting();


        /*
           4. Update product/status information.
        */

        updateCompletePropertySecurityState();


        /*
           5. Re-apply the current zoom.
        */

        applyPropertyZoom();


        /*
           6. Re-apply the selected view.
        */

        setPropertyView(
            propertyVisualState.view ||
            "overview"
        );


        propertyEngineReady =
            true;


        return true;

    }

    catch (error) {

        console.warn(
            "Nexpak property engine refresh error:",
            error
        );


        return false;

    }

}


/* ==========================================================================
   22.4 SAFE INITIALISATION
   ========================================================================== */

function initialiseFinalPropertyEngine() {

    if (
        !propertyEngineDependenciesReady()
    ) {

        /*
           The HTML may still be rendering.
           Try again shortly instead of failing.
        */

        setTimeout(
            initialiseFinalPropertyEngine,
            150
        );


        return;

    }


    runFinalPropertyEngineRefresh();

}


/* ==========================================================================
   22.5 PROPERTY ENGINE REFRESH AFTER STATE CHANGE
   ========================================================================== */

function refreshPropertyEngineFromState() {

    if (
        !propertyEngineReady
    ) {

        return;

    }


    scheduleSafePropertyRefresh();

}


/* ==========================================================================
   22.6 PROPERTY ENGINE STATE EVENT
   ========================================================================== */

function dispatchPropertyEngineEvent(
    eventName
) {

    try {

        document.dispatchEvent(
            new CustomEvent(
                eventName,
                {
                    detail: {

                        propertyReady:
                            propertyEngineReady,

                        state:
                            getPropertyViewState(),

                        products:
                            getPropertyProducts()

                    }
                }
            )
        );

    }

    catch (error) {

        /*
           Older browsers/environments may not
           support CustomEvent construction.
           The visual engine itself should still
           continue working.
        */

        console.warn(
            "Nexpak property event could not be dispatched:",
            error
        );

    }

}


/* ==========================================================================
   22.7 PROPERTY ENGINE READY EVENT
   ========================================================================== */

function announcePropertyEngineReady() {

    dispatchPropertyEngineEvent(
        "nexpak:property-ready"
    );

}


/* ==========================================================================
   22.8 PROPERTY ENGINE UPDATED EVENT
   ========================================================================== */

function announcePropertyEngineUpdated() {

    dispatchPropertyEngineEvent(
        "nexpak:property-updated"
    );

}


/* ==========================================================================
   22.9 FINAL REFRESH WRAPPER
   ========================================================================== */

const previousSafePropertyRefreshPart22 =
    performSafePropertyRefresh;


performSafePropertyRefresh =
    function () {

        const result =
            previousSafePropertyRefreshPart22();


        if (result !== false) {

            updateCompletePropertySecurityState();


            enhancePropertyMounting();


            applyPropertyZoom();


            announcePropertyEngineUpdated();

        }


        return result;

    };


/* ==========================================================================
   22.10 PRODUCT SELECTION OBSERVER
   ========================================================================== */

function attachPropertyMutationObserver() {

    const layer =
        getPropertyPlacementLayer();


    if (!layer) {

        return;

    }


    /*
       Watch the dynamic placement layer.

       This means if another part of the configurator
       adds/removes a visual product marker, the
       property engine automatically synchronises.
    */

    if (
        typeof MutationObserver ===
        "undefined"
    ) {

        return;

    }


    const observer =
        new MutationObserver(
            function () {

                if (
                    propertyEngineReady
                ) {

                    scheduleSafePropertyRefresh();

                }

            }
        );


    observer.observe(
        layer,
        {

            childList:
                true,

            subtree:
                true,

            attributes:
                true,

            attributeFilter: [

                "class",

                "data-product-id",

                "data-product-type",

                "data-quantity"

            ]

        }
    );

}


/* ==========================================================================
   22.11 PROPERTY PREVIEW RESIZE HANDLER
   ========================================================================== */

function attachPropertyResizeHandler() {

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        function () {

            if (
                resizeTimer
            ) {

                clearTimeout(
                    resizeTimer
                );

            }


            resizeTimer =
                setTimeout(
                    function () {

                        if (
                            propertyEngineReady
                        ) {

                            applyPropertyZoom();

                        }

                    },
                    120
                );

        }
    );

}


/* ==========================================================================
   22.12 PROPERTY VISIBILITY CHECK
   ========================================================================== */

function propertyPreviewVisible() {

    const preview =
        getPropertyPreview();


    if (!preview) {

        return false;

    }


    const styles =
        window.getComputedStyle(
            preview
        );


    return (
        styles.display !== "none" &&
        styles.visibility !== "hidden"
    );

}


/* ==========================================================================
   22.13 PROPERTY VISIBILITY RECOVERY
   ========================================================================== */

function attachPropertyVisibilityRecovery() {

    if (
        typeof IntersectionObserver ===
        "undefined"
    ) {

        return;

    }


    const preview =
        getPropertyPreview();


    if (!preview) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            if (
                                !propertyEngineReady
                            ) {

                                runFinalPropertyEngineRefresh();

                            }

                            else {

                                applyPropertyZoom();

                            }

                        }

                    }
                );

            }
        );


    observer.observe(
        preview
    );

}


/* ==========================================================================
   22.14 FINAL PROPERTY ENGINE BOOT
   ========================================================================== */

function bootFinalPropertyEngine() {

    initialiseFinalPropertyEngine();


    attachPropertyMutationObserver();


    attachPropertyResizeHandler();


    attachPropertyVisibilityRecovery();


    /*
       Give the browser one additional frame to
       complete layout calculations before the
       first final visual refresh.
    */

    if (
        typeof requestAnimationFrame ===
        "function"
    ) {

        requestAnimationFrame(
            function () {

                setTimeout(
                    function () {

                        if (
                            runFinalPropertyEngineRefresh()
                        ) {

                            announcePropertyEngineReady();

                        }

                    },
                    50
                );

            }
        );

    }

}


/* ==========================================================================
   22.15 START FINAL PROPERTY ENGINE
   ========================================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            bootFinalPropertyEngine();

        }
    );

} else {

    bootFinalPropertyEngine();

}


/* ==========================================================================
   22.16 PUBLIC FINAL PROPERTY API
   ========================================================================== */

window.NEXPAK_PROPERTY_VISUAL =
    window.NEXPAK_PROPERTY_VISUAL ||
    {};


window.NEXPAK_PROPERTY_VISUAL
    .isReady =
        function () {

            return propertyEngineReady;

        };


window.NEXPAK_PROPERTY_VISUAL
    .refreshFinal =
        runFinalPropertyEngineRefresh;


window.NEXPAK_PROPERTY_VISUAL
    .refreshFromState =
        refreshPropertyEngineFromState;


/* ==========================================================================
   PART 22 COMPLETE
   ========================================================================== */


/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V3
   CONFIGURATOR COMPLETE
   ========================================================================== */
