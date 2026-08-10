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


