/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — MAIN ENGINE

   File: online.js
   Version: 1.0
   Part: 1/8

   PURPOSE:
   - Control the NEXPAK Online Store
   - Display PRE-BUILT KITS ONLY
   - Handle kit quantities
   - Handle kit options
   - Prepare kits for cart
   - Prepare kits for PDF breakdown
   - Connect with onlinecart.js
   - Connect with onlinedelivery.js
   - Connect with onlinecheckout.js

   IMPORTANT:
   This file is for the ONLINE STORE ONLY.

   DO NOT use this file for:
   - Build Your System
   - Individual product selection
   - Existing configurator.js
========================================================= */


/* =========================================================
   1. ONLINE STORE CONFIGURATION
========================================================= */

const NEXPAK_ONLINE_CONFIG = {

    version: "1.0",

    storeName:
        "NEXPAK Online Store",

    companyName:
        "NEXPAK Security Solutions",

    currency:
        "ZAR",

    currencySymbol:
        "R",

    vatRate:
        0.15,

    defaultQuantity:
        1,

    minimumQuantity:
        1,

    maximumQuantity:
        99,

    defaultCategory:
        "all",

    defaultSort:
        "featured",

    cartStorageKey:
        "nexpak-online-cart",

    selectedKitStorageKey:
        "nexpak-online-selected-kit"

};


/* =========================================================
   2. ONLINE STORE STATE
========================================================= */

const NEXPAK_ONLINE_STATE = {

    initialized:
        false,

    currentCategory:
        "all",

    currentSearch:
        "",

    currentSort:
        "featured",

    currentKit:
        null,

    currentKitQuantity:
        1,

    selectedOptions:
        {},

    displayedKits:
        [],

    cart:
        []

};


/* =========================================================
   3. VERIFY ONLINE DATABASE
========================================================= */

function verifyNexpakOnlineDatabase() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        console.error(
            "NEXPAK Online Store: NEXPAK_ONLINE_KITS is not loaded."
        );

        return false;

    }

    if (
        !Array.isArray(
            NEXPAK_ONLINE_KITS
        )
    ) {

        console.error(
            "NEXPAK Online Store: NEXPAK_ONLINE_KITS is not an array."
        );

        return false;

    }

    return true;

}


/* =========================================================
   4. GET ALL ONLINE KITS
========================================================= */

function getAllNexpakOnlineKits() {

    if (
        !verifyNexpakOnlineDatabase()
    ) {

        return [];

    }

    return [
        ...NEXPAK_ONLINE_KITS
    ];

}


/* =========================================================
   5. GET CURRENT CATEGORY
========================================================= */

function getCurrentNexpakOnlineCategory() {

    return (
        NEXPAK_ONLINE_STATE.currentCategory
        || "all"
    );

}


/* =========================================================
   6. SET CURRENT CATEGORY
========================================================= */

function setNexpakOnlineCategory(
    categoryId
) {

    NEXPAK_ONLINE_STATE.currentCategory =
        categoryId || "all";

    return getNexpakOnlineKitsForDisplay();

}


/* =========================================================
   7. GET KITS FOR CURRENT CATEGORY
========================================================= */

function getNexpakOnlineKitsForDisplay() {

    let kits =
        getAllNexpakOnlineKits();

    const category =
        getCurrentNexpakOnlineCategory();

    const search =
        (
            NEXPAK_ONLINE_STATE.currentSearch
            || ""
        )
        .trim()
        .toLowerCase();


    /* -----------------------------------------------------
       CATEGORY FILTER
    ----------------------------------------------------- */

    if (
        category &&
        category !== "all"
    ) {

        kits =
            kits.filter(

                kit =>
                    kit.category ===
                    category

            );

    }


    /* -----------------------------------------------------
       SEARCH FILTER
    ----------------------------------------------------- */

    if (search) {

        kits =
            kits.filter(

                kit => {

                    const name =
                        (
                            kit.name ||
                            ""
                        ).toLowerCase();

                    const description =
                        (
                            kit.shortDescription ||
                            ""
                        ).toLowerCase();

                    const brand =
                        (
                            kit.brand ||
                            ""
                        ).toLowerCase();

                    const sku =
                        (
                            kit.sku ||
                            ""
                        ).toLowerCase();

                    const tags =
                        Array.isArray(
                            kit.tags
                        )
                            ? kit.tags.join(" ")
                                .toLowerCase()
                            : "";


                    return (

                        name.includes(search) ||

                        description.includes(search) ||

                        brand.includes(search) ||

                        sku.includes(search) ||

                        tags.includes(search)

                    );

                }

            );

    }


    /* -----------------------------------------------------
       SORT
    ----------------------------------------------------- */

    kits =
        sortNexpakOnlineKits(
            kits,
            NEXPAK_ONLINE_STATE.currentSort
        );


    NEXPAK_ONLINE_STATE.displayedKits =
        kits;

    return kits;

}


/* =========================================================
   8. SEARCH ONLINE STORE
========================================================= */

function searchNexpakOnlineStore(
    searchTerm
) {

    NEXPAK_ONLINE_STATE.currentSearch =
        searchTerm || "";

    return getNexpakOnlineKitsForDisplay();

}


/* =========================================================
   9. CLEAR SEARCH
========================================================= */

function clearNexpakOnlineSearch() {

    NEXPAK_ONLINE_STATE.currentSearch =
        "";

    return getNexpakOnlineKitsForDisplay();

}


/* =========================================================
   10. SORT KITS
========================================================= */

function sortNexpakOnlineKits(
    kits,
    sortType
) {

    const sorted =
        [
            ...kits
        ];


    switch (
        sortType
    ) {

        case "price-low":

            sorted.sort(

                (
                    a,
                    b
                ) =>
                    (
                        Number(
                            a.priceInclVat
                        ) || 0
                    )
                    -
                    (
                        Number(
                            b.priceInclVat
                        ) || 0
                    )

            );

            break;


        case "price-high":

            sorted.sort(

                (
                    a,
                    b
                ) =>
                    (
                        Number(
                            b.priceInclVat
                        ) || 0
                    )
                    -
                    (
                        Number(
                            a.priceInclVat
                        ) || 0
                    )

            );

            break;


        case "name":

            sorted.sort(

                (
                    a,
                    b
                ) =>
                    (
                        a.name || ""
                    ).localeCompare(
                        b.name || ""
                    )

            );

            break;


        case "newest":

            sorted.sort(

                (
                    a,
                    b
                ) => {

                    if (
                        a.newProduct ===
                        b.newProduct
                    ) {

                        return 0;

                    }

                    return a.newProduct
                        ? -1
                        : 1;

                }

            );

            break;


        case "popular":

            sorted.sort(

                (
                    a,
                    b
                ) => {

                    if (
                        a.popular ===
                        b.popular
                    ) {

                        return 0;

                    }

                    return a.popular
                        ? -1
                        : 1;

                }

            );

            break;


        case "featured":

        default:

            sorted.sort(

                (
                    a,
                    b
                ) => {

                    if (
                        a.featured ===
                        b.featured
                    ) {

                        if (
                            a.popular ===
                            b.popular
                        ) {

                            return 0;

                        }

                        return a.popular
                            ? -1
                            : 1;

                    }

                    return a.featured
                        ? -1
                        : 1;

                }

            );

            break;

    }


    return sorted;

}


/* =========================================================
   11. SET SORT
========================================================= */

function setNexpakOnlineSort(
    sortType
) {

    NEXPAK_ONLINE_STATE.currentSort =
        sortType || "featured";

    return getNexpakOnlineKitsForDisplay();

}


/* =========================================================
   12. GET KIT
========================================================= */

function getNexpakOnlineKit(
    kitId
) {

    if (
        typeof getNexpakOnlineKitById ===
        "function"
    ) {

        return getNexpakOnlineKitById(
            kitId
        );

    }


    const kits =
        getAllNexpakOnlineKits();


    return kits.find(

        kit =>
            kit.id === kitId

    ) || null;

}


/* =========================================================
   13. SELECT KIT
========================================================= */

function selectNexpakOnlineKit(
    kitId
) {

    const kit =
        getNexpakOnlineKit(
            kitId
        );


    if (!kit) {

        console.error(
            "NEXPAK Online Store: Kit not found:",
            kitId
        );

        return null;

    }


    NEXPAK_ONLINE_STATE.currentKit =
        kit;


    NEXPAK_ONLINE_STATE.currentKitQuantity =
        NEXPAK_ONLINE_CONFIG.defaultQuantity;


    NEXPAK_ONLINE_STATE.selectedOptions =
        {};


    if (
        Array.isArray(
            kit.options
        )
    ) {

        kit.options.forEach(

            option => {

                if (
                    option &&
                    option.id
                ) {

                    NEXPAK_ONLINE_STATE.selectedOptions[
                        option.id
                    ] =
                        option.default ||
                        (
                            option.values &&
                            option.values[0] &&
                            option.values[0].id
                        ) ||
                        null;

                }

            }

        );

    }


    return kit;

}


/* =========================================================
   14. SET KIT QUANTITY
========================================================= */

function setNexpakOnlineKitQuantity(
    quantity
) {

    let value =
        parseInt(
            quantity,
            10
        );


    if (
        Number.isNaN(value)
    ) {

        value =
            NEXPAK_ONLINE_CONFIG.defaultQuantity;

    }


    value =
        Math.max(

            NEXPAK_ONLINE_CONFIG.minimumQuantity,

            Math.min(

                NEXPAK_ONLINE_CONFIG.maximumQuantity,

                value

            )

        );


    NEXPAK_ONLINE_STATE.currentKitQuantity =
        value;


    return value;

}


/* =========================================================
   15. INCREASE KIT QUANTITY
========================================================= */

function increaseNexpakOnlineKitQuantity() {

    return setNexpakOnlineKitQuantity(

        NEXPAK_ONLINE_STATE.currentKitQuantity
        + 1

    );

}


/* =========================================================
   16. DECREASE KIT QUANTITY
========================================================= */

function decreaseNexpakOnlineKitQuantity() {

    return setNexpakOnlineKitQuantity(

        NEXPAK_ONLINE_STATE.currentKitQuantity
        - 1

    );

}


/* =========================================================
   17. GET CURRENT KIT QUANTITY
========================================================= */

function getNexpakOnlineKitQuantity() {

    return (
        NEXPAK_ONLINE_STATE.currentKitQuantity
        || 1
    );

}


/* =========================================================
   18. SET KIT OPTION
========================================================= */

function setNexpakOnlineKitOption(
    optionId,
    value
) {

    if (!optionId) {

        return false;

    }


    NEXPAK_ONLINE_STATE.selectedOptions[
        optionId
    ] =
        value;


    return true;

}


/* =========================================================
   19. GET KIT OPTION
========================================================= */

function getNexpakOnlineKitOption(
    optionId
) {

    if (!optionId) {

        return null;

    }


    return (
        NEXPAK_ONLINE_STATE.selectedOptions[
            optionId
        ]
        || null
    );

}


/* =========================================================
   20. GET SELECTED OPTIONS
========================================================= */

function getNexpakOnlineSelectedOptions() {

    return {

        ...NEXPAK_ONLINE_STATE.selectedOptions

    };

}


/* =========================================================
   21. CALCULATE KIT TOTAL
========================================================= */

function calculateNexpakOnlineKitTotal(
    kit,
    quantity
) {

    if (!kit) {

        return {

            quantity: 0,

            priceExVat: 0,

            vatAmount: 0,

            totalInclVat: 0

        };

    }


    const qty =
        Math.max(

            1,

            Number(
                quantity
            ) || 1

        );


    const unitTotal =
        Number(
            kit.priceInclVat
        ) || 0;


    const totalInclVat =
        Number(

            (
                unitTotal *
                qty

            ).toFixed(2)

        );


    const vatAmount =
        typeof calculateNexpakOnlineVAT ===
        "function"

            ? calculateNexpakOnlineVAT(
                totalInclVat
            )

            : Number(

                (
                    totalInclVat -
                    (
                        totalInclVat /
                        1.15
                    )

                ).toFixed(2)

            );


    const priceExVat =
        Number(

            (
                totalInclVat -
                vatAmount

            ).toFixed(2)

        );


    return {

        quantity:
            qty,

        unitPriceInclVat:
            Number(
                unitTotal.toFixed(2)
            ),

        priceExVat:
            priceExVat,

        vatAmount:
            vatAmount,

        totalInclVat:
            totalInclVat

    };

}


/* =========================================================
   22. PREPARE SELECTED KIT
========================================================= */

function prepareNexpakOnlineSelectedKit() {

    const kit =
        NEXPAK_ONLINE_STATE.currentKit;


    if (!kit) {

        return null;

    }


    const quantity =
        getNexpakOnlineKitQuantity();


    const pricing =
        calculateNexpakOnlineKitTotal(

            kit,

            quantity

        );


    return {

        kitId:
            kit.id,

        sku:
            kit.sku,

        name:
            kit.name,

        brand:
            kit.brand,

        category:
            kit.category,

        quantity:
            quantity,

        options:
            getNexpakOnlineSelectedOptions(),

        contents:
            Array.isArray(
                kit.contents
            )
                ? [...kit.contents]
                : [],

        image:
            kit.image || "",

        weight:
            Number(
                kit.weight
            ) || 0,

        weightUnit:
            kit.weightUnit || "kg",

        unitPriceInclVat:
            pricing.unitPriceInclVat,

        priceExVat:
            pricing.priceExVat,

        vatAmount:
            pricing.vatAmount,

        totalInclVat:
            pricing.totalInclVat

    };

}


/* =========================================================
   23. SAVE SELECTED KIT
========================================================= */

function saveNexpakOnlineSelectedKit() {

    const selectedKit =
        prepareNexpakOnlineSelectedKit();


    if (!selectedKit) {

        return false;

    }


    try {

        localStorage.setItem(

            NEXPAK_ONLINE_CONFIG.selectedKitStorageKey,

            JSON.stringify(
                selectedKit
            )

        );

        return true;

    } catch (
        error
    ) {

        console.error(
            "NEXPAK Online Store: Unable to save selected kit.",
            error
        );

        return false;

    }

}


/* =========================================================
   24. LOAD SELECTED KIT
========================================================= */

function loadNexpakOnlineSelectedKit() {

    try {

        const saved =
            localStorage.getItem(

                NEXPAK_ONLINE_CONFIG.selectedKitStorageKey

            );


        if (!saved) {

            return null;

        }


        return JSON.parse(
            saved
        );

    } catch (
        error
    ) {

        console.error(
            "NEXPAK Online Store: Unable to load selected kit.",
            error
        );

        return null;

    }

}


/* =========================================================
   25. CLEAR SELECTED KIT
========================================================= */

function clearNexpakOnlineSelectedKit() {

    NEXPAK_ONLINE_STATE.currentKit =
        null;

    NEXPAK_ONLINE_STATE.currentKitQuantity =
        1;

    NEXPAK_ONLINE_STATE.selectedOptions =
        {};


    try {

        localStorage.removeItem(

            NEXPAK_ONLINE_CONFIG.selectedKitStorageKey

        );

    } catch (
        error
    ) {

        console.warn(
            "NEXPAK Online Store: Could not clear saved kit.",
            error
        );

    }

}


/* =========================================================
   26. INITIALISE ONLINE STORE ENGINE
========================================================= */

function initialiseNexpakOnlineEngine() {

    if (NEXPAK_ONLINE_STATE.initialized) {
        return true;
    }

    if (!verifyNexpakOnlineDatabase()) {
        return false;
    }

    NEXPAK_ONLINE_STATE.displayedKits =
        getNexpakOnlineKitsForDisplay();

    NEXPAK_ONLINE_STATE.initialized = true;

    console.log(
        "NEXPAK Online Store initialized:",
        NEXPAK_ONLINE_STATE.displayedKits.length,
        "kits loaded."
    );

    return true;
}


/* =========================================================
   27. AUTO INITIALISE
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            initialiseNexpakOnlineEngine();
        }
    );

} else {

    initialiseNexpakOnlineEngine();

}


/* =========================================================
   END OF PART 1/8

   NEXT:
   PART 2/8

   STORE DISPLAY ENGINE

   Will handle:
   - Existing kit cards
   - Kit images
   - Kit names
   - Prices
   - Quantity controls
   - Kit options
   - Add To Cart
   - View More

   Existing Online Store design remains unchanged.
========================================================= */

/* =========================================================
   NEXPAK ONLINE STORE
   online.js — PART 2/8

   STORE DISPLAY ENGINE

   Handles:
   - Kit cards
   - Kit images
   - Kit names
   - Kit descriptions
   - Kit pricing
   - Quantity selector
   - Kit options
   - Add To Cart button
   - View More button

   IMPORTANT:
   PRE-BUILT KITS ONLY.
========================================================= */


/* =========================================================
   28. FIND STORE CONTAINER
========================================================= */

function getNexpakOnlineStoreContainer() {

    return (
        document.getElementById("onlineProducts") ||
        document.getElementById("online-products") ||
        document.getElementById("productGrid") ||
        document.getElementById("product-grid") ||
        document.getElementById("shopProducts") ||
        document.querySelector(".online-products") ||
        document.querySelector(".product-grid")
    );

}


/* =========================================================
   29. FORMAT CURRENCY
========================================================= */

function formatNexpakOnlinePrice(amount) {

    const value =
        Number(amount) || 0;

    return (
        "R" +
        value.toLocaleString(
            "en-ZA",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


/* =========================================================
   30. ESCAPE HTML
========================================================= */

function escapeNexpakOnlineHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   31. CREATE KIT OPTIONS HTML
========================================================= */

function createNexpakOnlineOptionsHTML(kit) {

    if (
        !Array.isArray(kit.options) ||
        kit.options.length === 0
    ) {

        return "";

    }


    return kit.options.map(
        option => {

            if (!option || !option.id) {
                return "";
            }

            const values =
                Array.isArray(option.values)
                    ? option.values
                    : [];

            if (!values.length) {
                return "";
            }

            const selected =
                option.default ||
                values[0].id;

            return `
                <div class="online-kit-option">

                    <label
                        for="online-option-${escapeNexpakOnlineHTML(kit.id)}-${escapeNexpakOnlineHTML(option.id)}"
                    >
                        ${escapeNexpakOnlineHTML(option.name)}
                    </label>

                    <select
                        id="online-option-${escapeNexpakOnlineHTML(kit.id)}-${escapeNexpakOnlineHTML(option.id)}"
                        class="online-kit-option-select"
                        data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                        data-option-id="${escapeNexpakOnlineHTML(option.id)}"
                    >

                        ${values.map(
                            value => `
                                <option
                                    value="${escapeNexpakOnlineHTML(value.id)}"
                                    ${value.id === selected ? "selected" : ""}
                                >
                                    ${escapeNexpakOnlineHTML(value.name)}
                                </option>
                            `
                        ).join("")}

                    </select>

                </div>
            `;

        }
    ).join("");

}


/* =========================================================
   32. CREATE KIT CARD
========================================================= */

function createNexpakOnlineKitCard(kit) {

    const price =
        Number(kit.priceInclVat) || 0;

    const quantity =
        NEXPAK_ONLINE_CONFIG.defaultQuantity;

    const image =
        kit.image ||
        "images/products/placeholder.jpg";

    const optionsHTML =
        createNexpakOnlineOptionsHTML(kit);


    return `

        <article
            class="online-kit-card"
            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
        >

            <div class="online-kit-image-wrap">

                <img
                    class="online-kit-image"
                    src="${escapeNexpakOnlineHTML(image)}"
                    alt="${escapeNexpakOnlineHTML(kit.name)}"
                    loading="lazy"
                >

            </div>


            <div class="online-kit-content">

                <div class="online-kit-brand">
                    ${escapeNexpakOnlineHTML(kit.brand)}
                </div>

                <h3 class="online-kit-title">
                    ${escapeNexpakOnlineHTML(kit.name)}
                </h3>

                <p class="online-kit-description">
                    ${escapeNexpakOnlineHTML(
                        kit.shortDescription
                    )}
                </p>


                <div class="online-kit-price">

                    ${formatNexpakOnlinePrice(price)}

                    <small>
                        incl. VAT
                    </small>

                </div>


                ${optionsHTML}


                <div class="online-kit-actions">

                    <div class="online-kit-quantity">

                        <button
                            type="button"
                            class="online-qty-minus"
                            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <input
                            type="number"
                            class="online-qty-input"
                            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                            value="${quantity}"
                            min="1"
                            max="99"
                        >

                        <button
                            type="button"
                            class="online-qty-plus"
                            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <div class="online-kit-buttons">

                        <button
                            type="button"
                            class="online-add-cart"
                            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                        >
                            Add to Cart
                        </button>

                        <button
                            type="button"
                            class="online-view-more"
                            data-kit-id="${escapeNexpakOnlineHTML(kit.id)}"
                        >
                            View More
                        </button>

                    </div>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   33. RENDER KIT CARDS
========================================================= */

function renderNexpakOnlineKits() {

    const container =
        getNexpakOnlineStoreContainer();

    if (!container) {

        console.warn(
            "NEXPAK Online Store: Product container not found."
        );

        return;

    }


    const kits =
        getNexpakOnlineKitsForDisplay();


    if (!kits.length) {

        container.innerHTML = `

            <div class="online-no-products">

                <h3>
                    No kits found
                </h3>

                <p>
                    Try another category or search term.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        kits.map(
            kit =>
                createNexpakOnlineKitCard(kit)
        ).join("");


    attachNexpakOnlineCardEvents();

}


/* =========================================================
   34. CARD EVENTS
========================================================= */

function attachNexpakOnlineCardEvents() {

    document
        .querySelectorAll(".online-qty-minus")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const input =
                        this.closest(
                            ".online-kit-card"
                        )
                        ?.querySelector(
                            ".online-qty-input"
                        );

                    if (!input) return;

                    input.value =
                        Math.max(
                            1,
                            Number(input.value || 1) - 1
                        );

                }
            );

        });


    document
        .querySelectorAll(".online-qty-plus")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const input =
                        this.closest(
                            ".online-kit-card"
                        )
                        ?.querySelector(
                            ".online-qty-input"
                        );

                    if (!input) return;

                    input.value =
                        Math.min(
                            99,
                            Number(input.value || 1) + 1
                        );

                }
            );

        });


    document
        .querySelectorAll(
            ".online-kit-option-select"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                function () {

                    setNexpakOnlineKitOption(
                        this.dataset.optionId,
                        this.value
                    );

                }
            );

        });


    document
        .querySelectorAll(".online-add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    handleNexpakOnlineAddToCart(
                        this.dataset.kitId,
                        this
                    );

                }
            );

        });


    document
        .querySelectorAll(".online-view-more")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    handleNexpakOnlineViewMore(
                        this.dataset.kitId
                    );

                }
            );

        });

}


/* =========================================================
   35. INITIAL RENDER
========================================================= */

function refreshNexpakOnlineStore() {

    renderNexpakOnlineKits();

}


/* =========================================================
   END OF PART 2/8

   NEXT:
   PART 3/8

   ADD TO CART ENGINE

   Will handle:
   - Kit quantity
   - Selected options
   - Cart item creation
   - Cart storage
   - Cart count
   - Add-to-cart feedback

   VIEW MORE / PDF WILL BE BUILT AFTER THAT.
========================================================= */

/* =========================================================
   NEXPAK ONLINE STORE
   online.js — PART 3/8

   ADD TO CART ENGINE

   Handles:
   - Pre-built kits only
   - Kit quantity
   - Kit options
   - Cart storage
   - Duplicate kits
   - Cart quantity updates
   - Cart count
   - Add-to-cart feedback
========================================================= */


/* =========================================================
   36. GET CART FROM STORAGE
========================================================= */

function getNexpakOnlineCart() {

    try {

        const saved =
            localStorage.getItem(
                NEXPAK_ONLINE_CONFIG.cartStorageKey
            );

        if (!saved) {
            return [];
        }

        const cart =
            JSON.parse(saved);

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "NEXPAK Online Store: Unable to load cart.",
            error
        );

        return [];

    }

}


/* =========================================================
   37. SAVE CART
========================================================= */

function saveNexpakOnlineCart(cart) {

    const safeCart =
        Array.isArray(cart)
            ? cart
            : [];

    NEXPAK_ONLINE_STATE.cart =
        safeCart;

    try {

        localStorage.setItem(
            NEXPAK_ONLINE_CONFIG.cartStorageKey,
            JSON.stringify(safeCart)
        );

        updateNexpakOnlineCartCount();

        return true;

    } catch (error) {

        console.error(
            "NEXPAK Online Store: Unable to save cart.",
            error
        );

        return false;

    }

}


/* =========================================================
   38. LOAD CART
========================================================= */

function loadNexpakOnlineCart() {

    NEXPAK_ONLINE_STATE.cart =
        getNexpakOnlineCart();

    updateNexpakOnlineCartCount();

    return NEXPAK_ONLINE_STATE.cart;

}


/* =========================================================
   39. GET CART COUNT
========================================================= */

function getNexpakOnlineCartCount() {

    const cart =
        NEXPAK_ONLINE_STATE.cart || [];

    return cart.reduce(
        (total, item) =>
            total +
            (
                Number(item.quantity) || 0
            ),
        0
    );

}


/* =========================================================
   40. UPDATE CART COUNT
========================================================= */

function updateNexpakOnlineCartCount() {

    const count =
        getNexpakOnlineCartCount();

    const selectors = [

        "#onlineCartCount",

        "#online-cart-count",

        "#cartCount",

        ".cart-count",

        ".header-cart-count"

    ];


    selectors.forEach(
        selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        count;

                    element.classList.toggle(
                        "has-items",
                        count > 0
                    );

                });

        }
    );


    return count;

}


/* =========================================================
   41. CREATE CART ITEM
========================================================= */

function createNexpakOnlineCartItem(
    kit,
    quantity,
    options
) {

    const pricing =
        calculateNexpakOnlineKitTotal(
            kit,
            quantity
        );


    return {

        cartItemId:
            createNexpakOnlineCartItemId(
                kit,
                options
            ),

        kitId:
            kit.id,

        sku:
            kit.sku || "",

        name:
            kit.name || "",

        brand:
            kit.brand || "",

        category:
            kit.category || "",

        image:
            kit.image || "",

        quantity:
            pricing.quantity,

        options:
            {
                ...options
            },

        contents:
            Array.isArray(kit.contents)
                ? [...kit.contents]
                : [],

        weight:
            Number(kit.weight) || 0,

        weightUnit:
            kit.weightUnit || "kg",

        unitPriceInclVat:
            pricing.unitPriceInclVat,

        priceExVat:
            pricing.priceExVat,

        vatAmount:
            pricing.vatAmount,

        totalInclVat:
            pricing.totalInclVat,

        addedAt:
            new Date().toISOString()

    };

}


/* =========================================================
   42. CREATE UNIQUE CART ITEM ID
========================================================= */

function createNexpakOnlineCartItemId(
    kit,
    options
) {

    const optionString =
        Object.keys(options || {})
            .sort()
            .map(
                key =>
                    key +
                    ":" +
                    options[key]
            )
            .join("|");


    return (

        String(
            kit.id || "kit"
        ) +

        "::" +

        optionString

    );

}


/* =========================================================
   43. CHECK IF SAME KIT EXISTS
========================================================= */

function findNexpakOnlineCartItem(
    cart,
    cartItemId
) {

    return cart.find(
        item =>
            item.cartItemId ===
            cartItemId
    ) || null;

}


/* =========================================================
   44. ADD KIT TO CART
========================================================= */

function addNexpakOnlineKitToCart(
    kitId,
    quantity,
    options
) {

    const kit =
        getNexpakOnlineKit(
            kitId
        );


    if (!kit) {

        console.error(
            "NEXPAK Online Store: Kit not found.",
            kitId
        );

        return {

            success: false,

            message:
                "Kit could not be found."

        };

    }


    const qty =
        Math.max(
            1,
            Number(quantity) || 1
        );


    const selectedOptions =
        options || {};


    const cart =
        getNexpakOnlineCart();


    const newItem =
        createNexpakOnlineCartItem(
            kit,
            qty,
            selectedOptions
        );


    const existing =
        findNexpakOnlineCartItem(
            cart,
            newItem.cartItemId
        );


    if (existing) {

        existing.quantity +=
            newItem.quantity;


        const pricing =
            calculateNexpakOnlineKitTotal(
                kit,
                existing.quantity
            );


        existing.priceExVat =
            pricing.priceExVat;

        existing.vatAmount =
            pricing.vatAmount;

        existing.totalInclVat =
            pricing.totalInclVat;

    } else {

        cart.push(
            newItem
        );

    }


    saveNexpakOnlineCart(
        cart
    );


    return {

        success: true,

        item:
            existing || newItem,

        cart:
            cart,

        cartCount:
            getNexpakOnlineCartCount(),

        message:
            `${kit.name} added to cart.`

    };

}


/* =========================================================
   45. HANDLE ADD TO CART BUTTON
========================================================= */

function handleNexpakOnlineAddToCart(
    kitId,
    button
) {

    const card =
        document.querySelector(
            `.online-kit-card[data-kit-id="${kitId}"]`
        );


    if (!card) {

        console.error(
            "NEXPAK Online Store: Kit card not found.",
            kitId
        );

        return;

    }


    const quantityInput =
        card.querySelector(
            ".online-qty-input"
        );


    const quantity =
        Math.max(
            1,
            Number(
                quantityInput?.value
            ) || 1
        );


    const options = {};


    card
        .querySelectorAll(
            ".online-kit-option-select"
        )
        .forEach(select => {

            if (
                select.dataset.optionId
            ) {

                options[
                    select.dataset.optionId
                ] =
                    select.value;

            }

        });


    const result =
        addNexpakOnlineKitToCart(
            kitId,
            quantity,
            options
        );


    if (!result.success) {

        showNexpakOnlineMessage(
            result.message,
            "error"
        );

        return;

    }


    if (button) {

        const originalText =
            button.textContent;

        button.textContent =
            "Added ✓";

        button.disabled =
            true;


        setTimeout(
            () => {

                button.textContent =
                    originalText;

                button.disabled =
                    false;

            },
            1200
        );

    }


    showNexpakOnlineMessage(
        result.message,
        "success"
    );


    return result;

}


/* =========================================================
   46. STORE MESSAGE
========================================================= */

function showNexpakOnlineMessage(
    message,
    type
) {

    let box =
        document.getElementById(
            "onlineStoreMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "onlineStoreMessage";

        box.className =
            "online-store-message";

        document.body.appendChild(
            box
        );

    }


    box.textContent =
        message || "";


    box.dataset.type =
        type || "info";


    box.classList.add(
        "show"
    );


    clearTimeout(
        box._nexpakTimer
    );


    box._nexpakTimer =
        setTimeout(
            () => {

                box.classList.remove(
                    "show"
                );

            },
            2500
        );


    return box;

}


/* =========================================================
   47. REMOVE CART ITEM
========================================================= */

function removeNexpakOnlineCartItem(
    cartItemId
) {

    const cart =
        getNexpakOnlineCart();


    const newCart =
        cart.filter(
            item =>
                item.cartItemId !==
                cartItemId
        );


    saveNexpakOnlineCart(
        newCart
    );


    return newCart;

}


/* =========================================================
   48. CLEAR CART
========================================================= */

function clearNexpakOnlineCart() {

    NEXPAK_ONLINE_STATE.cart =
        [];


    try {

        localStorage.removeItem(
            NEXPAK_ONLINE_CONFIG.cartStorageKey
        );

    } catch (error) {

        console.error(
            "NEXPAK Online Store: Unable to clear cart.",
            error
        );

    }


    updateNexpakOnlineCartCount();

    return [];

}


/* =========================================================
   49. INITIALISE CART
========================================================= */

function initialiseNexpakOnlineCart() {

    loadNexpakOnlineCart();

}


/* =========================================================
   50. START CART
========================================================= */

initialiseNexpakOnlineCart();


/* =========================================================
   END OF PART 3/8

   NEXT:
   PART 4/8

   VIEW MORE + KIT BREAKDOWN

   Will handle:
   - View More button
   - Full kit contents
   - Selected options
   - Ex VAT
   - VAT
   - Total Incl VAT
   - PDF-ready quotation data

   NO INDIVIDUAL COMPONENT PRICES.
========================================================= */

/* =========================================================
   NEXPAK ONLINE STORE
   online.js — PART 4/8

   VIEW MORE + KIT BREAKDOWN

   Handles:
   - View More button
   - Complete kit contents
   - Selected options
   - Ex VAT
   - VAT
   - Total Incl VAT
   - Print / Save as PDF

   IMPORTANT:
   Components do NOT have individual prices.
========================================================= */


/* =========================================================
   51. PREPARE KIT BREAKDOWN
========================================================= */

function prepareNexpakOnlineKitBreakdown(kitId) {

    const kit =
        getNexpakOnlineKit(kitId);

    if (!kit) {

        return null;

    }


    const card =
        document.querySelector(
            `.online-kit-card[data-kit-id="${kitId}"]`
        );


    const quantityInput =
        card?.querySelector(
            ".online-qty-input"
        );


    const quantity =
        Math.max(
            1,
            Number(
                quantityInput?.value
            ) || 1
        );


    const options = {};


    card
        ?.querySelectorAll(
            ".online-kit-option-select"
        )
        .forEach(select => {

            if (
                select.dataset.optionId
            ) {

                options[
                    select.dataset.optionId
                ] =
                    select.value;

            }

        });


    const pricing =
        calculateNexpakOnlineKitTotal(
            kit,
            quantity
        );


    return {

        kit: kit,

        quantity:
            quantity,

        options:
            options,

        contents:
            Array.isArray(kit.contents)
                ? kit.contents
                : [],

        priceExVat:
            pricing.priceExVat,

        vatAmount:
            pricing.vatAmount,

        totalInclVat:
            pricing.totalInclVat

    };

}


/* =========================================================
   52. GET OPTION DISPLAY NAME
========================================================= */

function getNexpakOnlineOptionDisplayName(
    kit,
    optionId,
    valueId
) {

    const option =
        Array.isArray(kit.options)
            ? kit.options.find(
                item =>
                    item.id === optionId
            )
            : null;


    if (!option) {

        return valueId;

    }


    const value =
        Array.isArray(option.values)
            ? option.values.find(
                item =>
                    item.id === valueId
            )
            : null;


    return value?.name ||
        valueId;

}


/* =========================================================
   53. CREATE OPTIONS BREAKDOWN
========================================================= */

function createNexpakOnlineOptionsBreakdown(
    kit,
    options
) {

    const entries =
        Object.entries(
            options || {}
        );


    if (!entries.length) {

        return "";

    }


    return `

        <div class="online-pdf-options">

            <h3>Selected Options</h3>

            <ul>

                ${entries.map(
                    ([optionId, valueId]) => `

                        <li>

                            <strong>
                                ${escapeNexpakOnlineHTML(
                                    optionId
                                )}
                            </strong>

                            :
                            
                            ${escapeNexpakOnlineHTML(
                                getNexpakOnlineOptionDisplayName(
                                    kit,
                                    optionId,
                                    valueId
                                )
                            )}

                        </li>

                    `
                ).join("")}

            </ul>

        </div>

    `;

}


/* =========================================================
   54. CREATE KIT CONTENTS HTML
========================================================= */

function createNexpakOnlineContentsHTML(
    contents
) {

    if (
        !Array.isArray(contents) ||
        !contents.length
    ) {

        return `

            <p>
                No component breakdown available.
            </p>

        `;

    }


    return `

        <table class="online-pdf-contents">

            <thead>

                <tr>

                    <th>
                        Component
                    </th>

                    <th>
                        Quantity
                    </th>

                </tr>

            </thead>

            <tbody>

                ${contents.map(
                    item => `

                        <tr>

                            <td>
                                ${escapeNexpakOnlineHTML(
                                    item.name
                                )}
                            </td>

                            <td>
                                ${escapeNexpakOnlineHTML(
                                    item.quantity
                                )}
                            </td>

                        </tr>

                    `
                ).join("")}

            </tbody>

        </table>

    `;

}


/* =========================================================
   55. CREATE PRICE SUMMARY
========================================================= */

function createNexpakOnlinePriceSummary(
    breakdown
) {

    return `

        <div class="online-pdf-price-summary">

            <div class="online-pdf-price-row">

                <span>
                    Price Ex VAT
                </span>

                <strong>
                    ${formatNexpakOnlinePrice(
                        breakdown.priceExVat
                    )}
                </strong>

            </div>


            <div class="online-pdf-price-row">

                <span>
                    VAT @ 15%
                </span>

                <strong>
                    ${formatNexpakOnlinePrice(
                        breakdown.vatAmount
                    )}
                </strong>

            </div>


            <div class="online-pdf-price-row online-pdf-total">

                <span>
                    Total Incl VAT
                </span>

                <strong>
                    ${formatNexpakOnlinePrice(
                        breakdown.totalInclVat
                    )}
                </strong>

            </div>

        </div>

    `;

}


/* =========================================================
   56. CREATE PDF / QUOTE DOCUMENT
========================================================= */

function createNexpakOnlineQuoteDocument(
    breakdown
) {

    const kit =
        breakdown.kit;


    const optionsHTML =
        createNexpakOnlineOptionsBreakdown(
            kit,
            breakdown.options
        );


    const contentsHTML =
        createNexpakOnlineContentsHTML(
            breakdown.contents
        );


    const priceHTML =
        createNexpakOnlinePriceSummary(
            breakdown
        );


    return `

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>
        ${escapeNexpakOnlineHTML(
            kit.name
        )} — NEXPAK
    </title>


    <style>

        * {
            box-sizing: border-box;
        }

        body {

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            margin: 0;

            padding: 35px;

            color: #111;

            background: #fff;

        }

        .quote-header {

            border-bottom:
                3px solid #111;

            padding-bottom: 20px;

            margin-bottom: 25px;

        }

        .company {

            font-size: 24px;

            font-weight: 700;

        }

        .company-subtitle {

            margin-top: 5px;

            color: #555;

        }

        .quote-title {

            font-size: 28px;

            margin:
                25px 0 8px;

        }

        .sku {

            color: #555;

            margin-bottom: 20px;

        }

        .kit-image {

            max-width: 260px;

            max-height: 180px;

            object-fit: contain;

            margin-bottom: 20px;

        }

        .section-title {

            font-size: 18px;

            margin:
                25px 0 12px;

        }

        table {

            width: 100%;

            border-collapse:
                collapse;

        }

        th,
        td {

            padding: 10px;

            border:
                1px solid #ccc;

            text-align: left;

        }

        th {

            background: #f2f2f2;

        }

        th:last-child,
        td:last-child {

            text-align: center;

            width: 120px;

        }

        .options {

            margin:
                20px 0;

            padding:
                15px;

            background: #f7f7f7;

        }

        .price-summary {

            margin-top: 30px;

            margin-left: auto;

            max-width: 380px;

        }

        .price-row {

            display: flex;

            justify-content:
                space-between;

            padding: 10px 0;

            border-bottom:
                1px solid #ddd;

        }

        .total {

            font-size: 20px;

            font-weight: 700;

            border-top:
                2px solid #111;

            margin-top: 8px;

        }

        .footer {

            margin-top: 45px;

            padding-top: 15px;

            border-top:
                1px solid #ccc;

            color: #666;

            font-size: 12px;

        }

        .print-button {

            display: inline-block;

            padding:
                12px 20px;

            margin-bottom: 25px;

            background: #111;

            color: #fff;

            border: 0;

            cursor: pointer;

            font-size: 14px;

        }

        @media print {

            .print-button {

                display: none;

            }

            body {

                padding: 15px;

            }

        }

    </style>

</head>


<body>


    <button
        class="print-button"
        onclick="window.print()"
    >
        Print / Save as PDF
    </button>


    <div class="quote-header">

        <div class="company">
            NEXPAK Security Solutions
        </div>

        <div class="company-subtitle">
            Security Equipment & Solutions
        </div>

    </div>


    <h1 class="quote-title">

        ${escapeNexpakOnlineHTML(
            kit.name
        )}

    </h1>


    <div class="sku">

        SKU:
        ${escapeNexpakOnlineHTML(
            kit.sku
        )}

    </div>


    ${
        kit.image
            ? `
                <img
                    class="kit-image"
                    src="${escapeNexpakOnlineHTML(
                        kit.image
                    )}"
                    alt=""
                >
              `
            : ""
    }


    <h2 class="section-title">
        Kit Quantity
    </h2>

    <p>
        ${breakdown.quantity}
    </p>


    ${optionsHTML}


    <h2 class="section-title">
        Kit Contents
    </h2>


    ${contentsHTML}


    ${priceHTML}


    <div class="footer">

        NEXPAK Security Solutions

        <br>

        All prices shown are in South African Rand.

        <br>

        VAT calculated at 15%.

        <br>

        Component prices are not shown because
        this document represents the complete kit.

    </div>


</body>

</html>

    `;

}


/* =========================================================
   57. OPEN QUOTE DOCUMENT
========================================================= */

function openNexpakOnlineQuoteDocument(
    breakdown
) {

    const documentHTML =
        createNexpakOnlineQuoteDocument(
            breakdown
        );


    const quoteWindow =
        window.open(
            "",
            "_blank"
        );


    if (!quoteWindow) {

        showNexpakOnlineMessage(
            "Please allow pop-ups to view the kit breakdown.",
            "error"
        );

        return null;

    }


    quoteWindow.document.open();

    quoteWindow.document.write(
        documentHTML
    );

    quoteWindow.document.close();


    return quoteWindow;

}


/* =========================================================
   58. HANDLE VIEW MORE
========================================================= */

function handleNexpakOnlineViewMore(
    kitId
) {

    const breakdown =
        prepareNexpakOnlineKitBreakdown(
            kitId
        );


    if (!breakdown) {

        showNexpakOnlineMessage(
            "Unable to load this kit.",
            "error"
        );

        return null;

    }


    return openNexpakOnlineQuoteDocument(
        breakdown
    );

}


/* =========================================================
   59. PDF DOWNLOAD HELPER
========================================================= */

function printNexpakOnlineKitPDF(
    kitId
) {

    const breakdown =
        prepareNexpakOnlineKitBreakdown(
            kitId
        );


    if (!breakdown) {

        showNexpakOnlineMessage(
            "Unable to create the kit document.",
            "error"
        );

        return null;

    }


    const quoteWindow =
        openNexpakOnlineQuoteDocument(
            breakdown
        );


    return quoteWindow;

}


/* =========================================================
   END OF PART 4/8

   NEXT:
   PART 5/8

   KIT PRICING + VAT ENGINE

   Will handle:
   - Market kit prices
   - Ex VAT calculation
   - VAT calculation
   - Total calculation
   - Quantity pricing
   - Price validation
========================================================= */


/* =========================================================
   NEXPAK ONLINE STORE
   online.js — PART 5/8

   PRICING + VAT ENGINE

   Handles:
   - Kit pricing
   - VAT @ 15%
   - Ex VAT
   - Total Incl VAT
   - Quantity calculations
   - Price validation

   IMPORTANT:
   Kit prices are the only prices used.
   Individual component prices are NOT used.
========================================================= */


/* =========================================================
   60. VAT RATE
========================================================= */

function getNexpakOnlineVATRate() {

    if (
        typeof NEXPAK_VAT !== "undefined" &&
        Number.isFinite(
            Number(NEXPAK_VAT.rate)
        )
    ) {

        return Number(
            NEXPAK_VAT.rate
        );

    }


    return (
        NEXPAK_ONLINE_CONFIG.vatRate ||
        0.15
    );

}


/* =========================================================
   61. CALCULATE VAT FROM INCLUSIVE PRICE
========================================================= */

function calculateNexpakOnlineVAT(
    inclusiveAmount
) {

    const amount =
        Number(inclusiveAmount) || 0;

    const rate =
        getNexpakOnlineVATRate();


    if (
        amount <= 0 ||
        rate <= 0
    ) {

        return 0;

    }


    return Number(

        (
            amount -
            (
                amount /
                (1 + rate)
            )

        ).toFixed(2)

    );

}


/* =========================================================
   62. CALCULATE EX VAT
========================================================= */

function calculateNexpakOnlineExVAT(
    inclusiveAmount
) {

    const amount =
        Number(inclusiveAmount) || 0;

    const rate =
        getNexpakOnlineVATRate();


    if (
        amount <= 0
    ) {

        return 0;

    }


    return Number(

        (
            amount /
            (1 + rate)

        ).toFixed(2)

    );

}


/* =========================================================
   63. CALCULATE INCLUSIVE PRICE
========================================================= */

function calculateNexpakOnlineInclusivePrice(
    exVatAmount
) {

    const amount =
        Number(exVatAmount) || 0;

    const rate =
        getNexpakOnlineVATRate();


    if (
        amount <= 0
    ) {

        return 0;

    }


    return Number(

        (
            amount *
            (1 + rate)

        ).toFixed(2)

    );

}


/* =========================================================
   64. CALCULATE COMPLETE PRICE
========================================================= */

function calculateNexpakOnlinePrice(
    kit,
    quantity = 1
) {

    if (!kit) {

        return {

            valid: false,

            quantity: 0,

            unitPriceExVat: 0,

            unitVAT: 0,

            unitPriceInclVat: 0,

            priceExVat: 0,

            vatAmount: 0,

            totalInclVat: 0

        };

    }


    const qty =
        Math.max(
            1,
            Number(quantity) || 1
        );


    const unitInclVat =
        Number(
            kit.priceInclVat
        ) || 0;


    if (
        unitInclVat <= 0
    ) {

        return {

            valid: false,

            quantity: qty,

            unitPriceExVat: 0,

            unitVAT: 0,

            unitPriceInclVat: 0,

            priceExVat: 0,

            vatAmount: 0,

            totalInclVat: 0,

            message:
                "This kit does not have a selling price yet."

        };

    }


    const unitExVat =
        calculateNexpakOnlineExVAT(
            unitInclVat
        );


    const unitVAT =
        Number(

            (
                unitInclVat -
                unitExVat

            ).toFixed(2)

        );


    const totalInclVat =
        Number(

            (
                unitInclVat *
                qty

            ).toFixed(2)

        );


    const priceExVat =
        calculateNexpakOnlineExVAT(
            totalInclVat
        );


    const vatAmount =
        Number(

            (
                totalInclVat -
                priceExVat

            ).toFixed(2)

        );


    return {

        valid: true,

        quantity: qty,

        unitPriceExVat:
            unitExVat,

        unitVAT:
            unitVAT,

        unitPriceInclVat:
            unitInclVat,

        priceExVat:
            priceExVat,

        vatAmount:
            vatAmount,

        totalInclVat:
            totalInclVat

    };

}


/* =========================================================
   65. VALIDATE KIT PRICE
========================================================= */

function validateNexpakOnlineKitPrice(
    kit
) {

    if (!kit) {

        return {

            valid: false,

            message:
                "Kit not found."

        };

    }


    const price =
        Number(
            kit.priceInclVat
        );


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        return {

            valid: false,

            message:
                `${kit.name} does not have a selling price yet.`

        };

    }


    return {

        valid: true,

        price:
            price

    };

}


/* =========================================================
   66. GET KIT DISPLAY PRICES
========================================================= */

function getNexpakOnlineKitDisplayPrices(
    kit
) {

    if (!kit) {

        return {

            exVat: 0,

            vat: 0,

            inclVat: 0

        };

    }


    const pricing =
        calculateNexpakOnlinePrice(
            kit,
            1
        );


    return {

        exVat:
            pricing.unitPriceExVat,

        vat:
            pricing.unitVAT,

        inclVat:
            pricing.unitPriceInclVat

    };

}


/* =========================================================
   67. UPDATE KIT PRICE DISPLAY
========================================================= */

function updateNexpakOnlinePriceDisplay(
    kit
) {

    if (!kit) {

        return;

    }


    const card =
        document.querySelector(
            `.online-kit-card[data-kit-id="${kit.id}"]`
        );


    if (!card) {

        return;

    }


    const priceElement =
        card.querySelector(
            ".online-kit-price"
        );


    if (!priceElement) {

        return;

    }


    const prices =
        getNexpakOnlineKitDisplayPrices(
            kit
        );


    if (
        prices.inclVat <= 0
    ) {

        priceElement.innerHTML = `

            <span class="online-price-unavailable">

                Price coming soon

            </span>

        `;

        return;

    }


    priceElement.innerHTML = `

        ${formatNexpakOnlinePrice(
            prices.inclVat
        )}

        <small>
            incl. VAT
        </small>

    `;

}


/* =========================================================
   68. UPDATE ALL PRICE DISPLAYS
========================================================= */

function updateAllNexpakOnlinePrices() {

    const kits =
        getAllNexpakOnlineKits();


    kits.forEach(
        kit => {

            updateNexpakOnlinePriceDisplay(
                kit
            );

        }
    );

}


/* =========================================================
   69. VALIDATE CART PRICES
========================================================= */

function validateNexpakOnlineCartPrices() {

    const cart =
        getNexpakOnlineCart();


    const invalidItems =
        cart.filter(
            item =>
                !Number.isFinite(
                    Number(
                        item.unitPriceInclVat
                    )
                ) ||
                Number(
                    item.unitPriceInclVat
                ) <= 0
        );


    return {

        valid:
            invalidItems.length === 0,

        invalidItems:
            invalidItems

    };

}


/* =========================================================
   70. CALCULATE CART TOTALS
========================================================= */

function calculateNexpakOnlineCartTotals() {

    const cart =
        getNexpakOnlineCart();


    let subtotalExVat = 0;

    let vatAmount = 0;

    let totalInclVat = 0;


    cart.forEach(
        item => {

            subtotalExVat +=
                Number(
                    item.priceExVat
                ) || 0;

            vatAmount +=
                Number(
                    item.vatAmount
                ) || 0;

            totalInclVat +=
                Number(
                    item.totalInclVat
                ) || 0;

        }
    );


    return {

        subtotalExVat:
            Number(
                subtotalExVat.toFixed(2)
            ),

        vatAmount:
            Number(
                vatAmount.toFixed(2)
            ),

        totalInclVat:
            Number(
                totalInclVat.toFixed(2)
            )

    };

}


/* =========================================================
   71. REFRESH CART PRICES
========================================================= */

function refreshNexpakOnlineCartPrices() {

    const cart =
        getNexpakOnlineCart();


    const updatedCart =
        cart.map(
            item => {

                const kit =
                    getNexpakOnlineKit(
                        item.kitId
                    );


                if (!kit) {

                    return item;

                }


                const pricing =
                    calculateNexpakOnlinePrice(
                        kit,
                        item.quantity
                    );


                return {

                    ...item,

                    unitPriceExVat:
                        pricing.unitPriceExVat,

                    unitVAT:
                        pricing.unitVAT,

                    unitPriceInclVat:
                        pricing.unitPriceInclVat,

                    priceExVat:
                        pricing.priceExVat,

                    vatAmount:
                        pricing.vatAmount,

                    totalInclVat:
                        pricing.totalInclVat

                };

            }
        );


    saveNexpakOnlineCart(
        updatedCart
    );


    return updatedCart;

}


/* =========================================================
   72. FORMAT PRICE FOR PDF
========================================================= */

function getNexpakOnlinePDFPriceSummary(
    kit,
    quantity
) {

    const pricing =
        calculateNexpakOnlinePrice(
            kit,
            quantity
        );


    return {

        exVat:
            formatNexpakOnlinePrice(
                pricing.priceExVat
            ),

        vat:
            formatNexpakOnlinePrice(
                pricing.vatAmount
            ),

        total:
            formatNexpakOnlinePrice(
                pricing.totalInclVat
            )

    };

}


/* =========================================================
   END OF PART 5/8

   NEXT:
   PART 6/8

   STORE SEARCH + CATEGORY CONTROLS

   Will handle:
   - Category buttons
   - Search
   - Sorting
   - Refreshing the kit display
   - Empty results
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA / ENGINE

   online.js — PART 6/8

   KIT SEARCH + CATEGORY + SORT ENGINE

   IMPORTANT:
   The Online Store uses PRE-BUILT KITS ONLY.

   The separate configurator.js remains responsible
   for the Build Your System page and individual products.
========================================================= */


/* =========================================================
   73. GET ALL ONLINE KITS
========================================================= */

function getAllNexpakOnlineKits() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return [];

    }


    return Array.isArray(
        NEXPAK_ONLINE_KITS
    )
        ? NEXPAK_ONLINE_KITS
        : [];

}


/* =========================================================
   74. GET KIT BY ID
========================================================= */

function getNexpakOnlineKit(
    kitId
) {

    const kits =
        getAllNexpakOnlineKits();


    return kits.find(
        kit =>
            kit.id === kitId
    ) || null;

}


/* =========================================================
   75. GET KIT BY SKU
========================================================= */

function getNexpakOnlineKitBySKU(
    sku
) {

    const kits =
        getAllNexpakOnlineKits();


    if (!sku) {

        return null;

    }


    return kits.find(
        kit =>
            String(
                kit.sku || ""
            ).toLowerCase() ===
            String(sku).toLowerCase()
    ) || null;

}


/* =========================================================
   76. SEARCH KITS
========================================================= */

function searchNexpakOnlineKits(
    searchTerm
) {

    const kits =
        getAllNexpakOnlineKits();


    const term =
        String(
            searchTerm || ""
        )
        .trim()
        .toLowerCase();


    if (!term) {

        return kits;

    }


    return kits.filter(
        kit => {

            const searchableText = [

                kit.name,

                kit.sku,

                kit.brand,

                kit.category,

                kit.kitType,

                kit.shortDescription,

                kit.description,

                ...(Array.isArray(
                    kit.tags
                )
                    ? kit.tags
                    : [])

            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


            return searchableText.includes(
                term
            );

        }
    );

}


/* =========================================================
   77. FILTER BY CATEGORY
========================================================= */

function filterNexpakOnlineKitsByCategory(
    kits,
    category
) {

    const source =
        Array.isArray(kits)
            ? kits
            : getAllNexpakOnlineKits();


    if (
        !category ||
        category === "all"
    ) {

        return source;

    }


    return source.filter(
        kit =>
            kit.category ===
            category
    );

}


/* =========================================================
   78. FILTER BY BRAND
========================================================= */

function filterNexpakOnlineKitsByBrand(
    kits,
    brand
) {

    const source =
        Array.isArray(kits)
            ? kits
            : getAllNexpakOnlineKits();


    if (!brand) {

        return source;

    }


    const target =
        String(
            brand
        ).toLowerCase();


    return source.filter(
        kit =>
            String(
                kit.brand || ""
            ).toLowerCase() ===
            target
    );

}


/* =========================================================
   79. FILTER FEATURED KITS
========================================================= */

function getNexpakFeaturedKits() {

    return getAllNexpakOnlineKits()
        .filter(
            kit =>
                kit.featured === true
        );

}


/* =========================================================
   80. FILTER POPULAR KITS
========================================================= */

function getNexpakPopularKits() {

    return getAllNexpakOnlineKits()
        .filter(
            kit =>
                kit.popular === true
        );

}


/* =========================================================
   81. FILTER SPECIAL ORDER KITS
========================================================= */

function getNexpakSpecialOrderKits() {

    return getAllNexpakOnlineKits()
        .filter(
            kit =>
                kit.stockStatus ===
                "special-order"
        );

}


/* =========================================================
   82. SORT KITS
========================================================= */

function sortNexpakOnlineKits(
    kits,
    sortType
) {

    const source =
        Array.isArray(kits)
            ? [...kits]
            : [];


    switch (sortType) {


        /* ---------------------------------------------
           FEATURED
        --------------------------------------------- */

        case "featured":

            return source.sort(
                (a, b) => {

                    const aFeatured =
                        a.featured === true
                            ? 1
                            : 0;

                    const bFeatured =
                        b.featured === true
                            ? 1
                            : 0;


                    if (
                        aFeatured !==
                        bFeatured
                    ) {

                        return (
                            bFeatured -
                            aFeatured
                        );

                    }


                    const aPopular =
                        a.popular === true
                            ? 1
                            : 0;

                    const bPopular =
                        b.popular === true
                            ? 1
                            : 0;


                    return (
                        bPopular -
                        aPopular
                    );

                }
            );


        /* ---------------------------------------------
           NAME A-Z
        --------------------------------------------- */

        case "name-asc":

            return source.sort(
                (a, b) =>
                    String(
                        a.name || ""
                    ).localeCompare(
                        String(
                            b.name || ""
                        )
                    )
            );


        /* ---------------------------------------------
           NAME Z-A
        --------------------------------------------- */

        case "name-desc":

            return source.sort(
                (a, b) =>
                    String(
                        b.name || ""
                    ).localeCompare(
                        String(
                            a.name || ""
                        )
                    )
            );


        /* ---------------------------------------------
           PRICE LOW TO HIGH
        --------------------------------------------- */

        case "price-low":

            return source.sort(
                (a, b) =>
                    (
                        Number(
                            a.priceInclVat
                        ) || 0
                    ) -
                    (
                        Number(
                            b.priceInclVat
                        ) || 0
                    )
            );


        /* ---------------------------------------------
           PRICE HIGH TO LOW
        --------------------------------------------- */

        case "price-high":

            return source.sort(
                (a, b) =>
                    (
                        Number(
                            b.priceInclVat
                        ) || 0
                    ) -
                    (
                        Number(
                            a.priceInclVat
                        ) || 0
                    )
            );


        /* ---------------------------------------------
           NEWEST
        --------------------------------------------- */

        case "newest":

            return source.sort(
                (a, b) => {

                    const aDate =
                        new Date(
                            a.dateAdded || 0
                        ).getTime();

                    const bDate =
                        new Date(
                            b.dateAdded || 0
                        ).getTime();


                    return (
                        bDate -
                        aDate
                    );

                }
            );


        /* ---------------------------------------------
           DEFAULT
        --------------------------------------------- */

        default:

            return source;

    }

}


/* =========================================================
   83. COMPLETE KIT FILTER
========================================================= */

function filterNexpakOnlineKits(
    settings = {}
) {

    let kits =
        getAllNexpakOnlineKits();


    /* ---------------------------------------------
       SEARCH
    --------------------------------------------- */

    if (
        settings.search
    ) {

        kits =
            searchNexpakOnlineKits(
                settings.search
            );

    }


    /* ---------------------------------------------
       CATEGORY
    --------------------------------------------- */

    kits =
        filterNexpakOnlineKitsByCategory(
            kits,
            settings.category || "all"
        );


    /* ---------------------------------------------
       BRAND
    --------------------------------------------- */

    kits =
        filterNexpakOnlineKitsByBrand(
            kits,
            settings.brand
        );


    /* ---------------------------------------------
       FEATURED ONLY
    --------------------------------------------- */

    if (
        settings.featured === true
    ) {

        kits =
            kits.filter(
                kit =>
                    kit.featured === true
            );

    }


    /* ---------------------------------------------
       POPULAR ONLY
    --------------------------------------------- */

    if (
        settings.popular === true
    ) {

        kits =
            kits.filter(
                kit =>
                    kit.popular === true
            );

    }


    /* ---------------------------------------------
       SORT
    --------------------------------------------- */

    kits =
        sortNexpakOnlineKits(
            kits,
            settings.sort ||
            "featured"
        );


    return kits;

}


/* =========================================================
   84. UPDATE STORE STATE
========================================================= */

function updateNexpakOnlineStoreState(
    settings = {}
) {

    NEXPAK_ONLINE_STATE.filters = {

        search:
            settings.search || "",

        category:
            settings.category ||
            "all",

        brand:
            settings.brand ||
            "",

        sort:
            settings.sort ||
            "featured",

        featured:
            settings.featured === true,

        popular:
            settings.popular === true

    };


    return NEXPAK_ONLINE_STATE.filters;

}


/* =========================================================
   85. RUN STORE FILTER
========================================================= */

function runNexpakOnlineStoreFilter(
    settings = {}
) {

    updateNexpakOnlineStoreState(
        settings
    );


    return filterNexpakOnlineKits(
        settings
    );

}


/* =========================================================
   86. GET CATEGORY NAME
========================================================= */

function getNexpakOnlineCategoryName(
    categoryId
) {

    if (
        typeof NEXPAK_ONLINE_CATEGORIES ===
        "undefined"
    ) {

        return categoryId;

    }


    const category =
        NEXPAK_ONLINE_CATEGORIES.find(
            item =>
                item.id ===
                categoryId
        );


    return category?.name ||
        categoryId;

}


/* =========================================================
   87. GET KIT COUNT
========================================================= */

function getNexpakOnlineKitCount(
    kits
) {

    const source =
        Array.isArray(kits)
            ? kits
            : getAllNexpakOnlineKits();


    return source.length;

}


/* =========================================================
   88. EMPTY SEARCH MESSAGE
========================================================= */

function createNexpakOnlineEmptyResultsHTML(
    searchTerm,
    category
) {

    let message =
        "No kits found.";


    if (
        searchTerm
    ) {

        message =
            `No kits found for "${escapeNexpakOnlineHTML(
                searchTerm
            )}".`;

    }
    else if (
        category &&
        category !== "all"
    ) {

        message =
            `No kits are currently available in ${escapeNexpakOnlineHTML(
                getNexpakOnlineCategoryName(
                    category
                )
            )}.`;

    }


    return `

        <div class="online-store-empty">

            <div class="online-store-empty-icon">
                🔍
            </div>

            <h3>
                No Kits Found
            </h3>

            <p>
                ${message}
            </p>

            <button
                type="button"
                class="online-clear-filters"
                onclick="
                    clearNexpakOnlineFilters()
                "
            >
                View All Kits
            </button>

        </div>

    `;

}


/* =========================================================
   89. CLEAR FILTERS
========================================================= */

function clearNexpakOnlineFilters() {

    const searchInput =
        document.querySelector(
            "#onlineSearch"
        );


    const categorySelect =
        document.querySelector(
            "#onlineCategory"
        );


    const sortSelect =
        document.querySelector(
            "#onlineSort"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    if (categorySelect) {

        categorySelect.value =
            "all";

    }


    if (sortSelect) {

        sortSelect.value =
            "featured";

    }


    const settings = {

        search: "",

        category: "all",

        brand: "",

        sort: "featured",

        featured: false,

        popular: false

    };


    updateNexpakOnlineStoreState(
        settings
    );


    if (
        typeof renderNexpakOnlineKits ===
        "function"
    ) {

        renderNexpakOnlineKits(
            filterNexpakOnlineKits(
                settings
            )
        );

    }


    return settings;

}


/* =========================================================
   90. LIVE SEARCH HANDLER
========================================================= */

function handleNexpakOnlineSearch(
    searchTerm
) {

    const settings = {

        ...(
            NEXPAK_ONLINE_STATE.filters ||
            {}
        ),

        search:
            searchTerm || ""

    };


    updateNexpakOnlineStoreState(
        settings
    );


    const kits =
        filterNexpakOnlineKits(
            settings
        );


    if (
        typeof renderNexpakOnlineKits ===
        "function"
    ) {

        renderNexpakOnlineKits(
            kits
        );

    }


    return kits;

}


/* =========================================================
   91. CATEGORY HANDLER
========================================================= */

function handleNexpakOnlineCategoryChange(
    category
) {

    const settings = {

        ...(
            NEXPAK_ONLINE_STATE.filters ||
            {}
        ),

        category:
            category || "all"

    };


    updateNexpakOnlineStoreState(
        settings
    );


    const kits =
        filterNexpakOnlineKits(
            settings
        );


    if (
        typeof renderNexpakOnlineKits ===
        "function"
    ) {

        renderNexpakOnlineKits(
            kits
        );

    }


    return kits;

}


/* =========================================================
   92. SORT HANDLER
========================================================= */

function handleNexpakOnlineSortChange(
    sortType
) {

    const settings = {

        ...(
            NEXPAK_ONLINE_STATE.filters ||
            {}
        ),

        sort:
            sortType || "featured"

    };


    updateNexpakOnlineStoreState(
        settings
    );


    const kits =
        filterNexpakOnlineKits(
            settings
        );


    if (
        typeof renderNexpakOnlineKits ===
        "function"
    ) {

        renderNexpakOnlineKits(
            kits
        );

    }


    return kits;

}


/* =========================================================
   93. CATEGORY KIT COUNTS
========================================================= */

function getNexpakOnlineCategoryCounts() {

    const kits =
        getAllNexpakOnlineKits();


    const counts = {

        all:
            kits.length

    };


    kits.forEach(
        kit => {

            const category =
                kit.category;


            if (!category) {

                return;

            }


            if (
                !counts[category]
            ) {

                counts[category] =
                    0;

            }


            counts[category]++;

        }
    );


    return counts;

}


/* =========================================================
   94. INITIALISE STORE FILTER STATE
========================================================= */

function initialiseNexpakOnlineFilterState() {

    if (
        !NEXPAK_ONLINE_STATE.filters
    ) {

        NEXPAK_ONLINE_STATE.filters = {

            search: "",

            category: "all",

            brand: "",

            sort: "featured",

            featured: false,

            popular: false

        };

    }

}


/* =========================================================
   95. START FILTER ENGINE
========================================================= */

initialiseNexpakOnlineFilterState();


/* =========================================================
   END OF PART 6/8

   NEXT:
   PART 7/8

   DELIVERY CALCULATOR

   Will handle:

   - Customer location
   - Delivery distance
   - Kit weight
   - Delivery zones
   - Delivery charge
   - Cart delivery total
   - Free / paid delivery rules
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DELIVERY ENGINE

   online.js — PART 7/8

   HANDLES:
   - Delivery distance
   - Cart weight
   - Delivery charge
   - Weight calculation
   - Distance calculation
   - Delivery estimate
   - Delivery summary

   IMPORTANT:
   This is for the ONLINE STORE only.

   Build Your System uses its own configurator.js.
========================================================= */


/* =========================================================
   96. DELIVERY CONFIGURATION
========================================================= */

const NEXPAK_ONLINE_DELIVERY = {

    enabled: true,

    currency: "ZAR",

    freeDelivery: false,

    freeDeliveryMinimum: 0,

    baseFee: 80,

    perKilometre: 4.50,

    perKilogram: 1.50,

    minimumFee: 80,

    maximumFee: 5000,

    minimumDistance: 0,

    maximumDistance: 500,

    minimumWeight: 0,

    maximumWeight: 1000,

    defaultDistance: 0,

    defaultWeight: 0

};


/* =========================================================
   97. GET CART TOTAL WEIGHT
========================================================= */

function getNexpakOnlineCartWeight() {

    const cart =
        getNexpakOnlineCart();


    let totalWeight = 0;


    cart.forEach(
        item => {

            const quantity =
                Math.max(
                    1,
                    Number(
                        item.quantity
                    ) || 1
                );


            const weight =
                Number(
                    item.weight
                ) || 0;


            totalWeight +=
                weight *
                quantity;

        }
    );


    return Number(
        totalWeight.toFixed(2)
    );

}


/* =========================================================
   98. GET DELIVERY DISTANCE
========================================================= */

function getNexpakOnlineDeliveryDistance() {

    const storedDistance =
        localStorage.getItem(
            "nexpak_online_delivery_distance"
        );


    const distance =
        Number(
            storedDistance
        );


    if (
        Number.isFinite(distance) &&
        distance >= 0
    ) {

        return distance;

    }


    return (
        NEXPAK_ONLINE_DELIVERY.defaultDistance
    );

}


/* =========================================================
   99. SAVE DELIVERY DISTANCE
========================================================= */

function saveNexpakOnlineDeliveryDistance(
    distance
) {

    const value =
        Math.max(
            0,
            Number(distance) || 0
        );


    try {

        localStorage.setItem(
            "nexpak_online_delivery_distance",
            value.toString()
        );

    } catch (error) {

        console.error(
            "NEXPAK Online Store: Could not save delivery distance.",
            error
        );

    }


    return value;

}


/* =========================================================
   100. CALCULATE DELIVERY FROM DISTANCE + WEIGHT
========================================================= */

function calculateNexpakOnlineDelivery(
    distance,
    weight
) {

    const safeDistance =
        Math.max(
            0,
            Number(distance) || 0
        );


    const safeWeight =
        Math.max(
            0,
            Number(weight) || 0
        );


    if (
        !NEXPAK_ONLINE_DELIVERY.enabled
    ) {

        return {

            enabled: false,

            distance:
                safeDistance,

            weight:
                safeWeight,

            deliveryFee: 0

        };

    }


    /*
       FREE DELIVERY
    */

    const cartTotals =
        calculateNexpakOnlineCartTotals();


    if (
        NEXPAK_ONLINE_DELIVERY.freeDelivery &&
        cartTotals.totalInclVat >=
        NEXPAK_ONLINE_DELIVERY.freeDeliveryMinimum
    ) {

        return {

            enabled: true,

            freeDelivery: true,

            distance:
                safeDistance,

            weight:
                safeWeight,

            baseFee: 0,

            distanceFee: 0,

            weightFee: 0,

            deliveryFee: 0

        };

    }


    /*
       BASE DELIVERY FEE
    */

    const baseFee =
        Number(
            NEXPAK_ONLINE_DELIVERY.baseFee
        ) || 0;


    /*
       DISTANCE CHARGE
    */

    const distanceFee =
        safeDistance *
        (
            Number(
                NEXPAK_ONLINE_DELIVERY.perKilometre
            ) || 0
        );


    /*
       WEIGHT CHARGE
    */

    const weightFee =
        safeWeight *
        (
            Number(
                NEXPAK_ONLINE_DELIVERY.perKilogram
            ) || 0
        );


    let deliveryFee =
        baseFee +
        distanceFee +
        weightFee;


    /*
       MINIMUM DELIVERY FEE
    */

    const minimumFee =
        Number(
            NEXPAK_ONLINE_DELIVERY.minimumFee
        ) || 0;


    if (
        deliveryFee <
        minimumFee
    ) {

        deliveryFee =
            minimumFee;

    }


    /*
       MAXIMUM DELIVERY FEE
    */

    const maximumFee =
        Number(
            NEXPAK_ONLINE_DELIVERY.maximumFee
        ) || 0;


    if (
        maximumFee > 0 &&
        deliveryFee >
        maximumFee
    ) {

        deliveryFee =
            maximumFee;

    }


    return {

        enabled: true,

        freeDelivery: false,

        distance:
            Number(
                safeDistance.toFixed(2)
            ),

        weight:
            Number(
                safeWeight.toFixed(2)
            ),

        baseFee:
            Number(
                baseFee.toFixed(2)
            ),

        distanceFee:
            Number(
                distanceFee.toFixed(2)
            ),

        weightFee:
            Number(
                weightFee.toFixed(2)
            ),

        deliveryFee:
            Number(
                deliveryFee.toFixed(2)
            )

    };

}


/* =========================================================
   101. CALCULATE CURRENT CART DELIVERY
========================================================= */

function calculateNexpakOnlineCartDelivery() {

    const weight =
        getNexpakOnlineCartWeight();


    const distance =
        getNexpakOnlineDeliveryDistance();


    return calculateNexpakOnlineDelivery(
        distance,
        weight
    );

}


/* =========================================================
   102. GET COMPLETE ORDER TOTAL
========================================================= */

function calculateNexpakOnlineOrderTotals() {

    const cartTotals =
        calculateNexpakOnlineCartTotals();


    const delivery =
        calculateNexpakOnlineCartDelivery();


    const deliveryFee =
        Number(
            delivery.deliveryFee
        ) || 0;


    const orderTotal =
        Number(

            (
                cartTotals.totalInclVat +
                deliveryFee

            ).toFixed(2)

        );


    return {

        subtotalExVat:
            cartTotals.subtotalExVat,

        vatAmount:
            cartTotals.vatAmount,

        productsTotalInclVat:
            cartTotals.totalInclVat,

        deliveryFee:
            deliveryFee,

        orderTotal:
            orderTotal,

        cartWeight:
            delivery.weight,

        deliveryDistance:
            delivery.distance

    };

}


/* =========================================================
   103. FORMAT DELIVERY SUMMARY
========================================================= */

function createNexpakOnlineDeliverySummaryHTML() {

    const delivery =
        calculateNexpakOnlineCartDelivery();


    if (
        !delivery.enabled
    ) {

        return `

            <div class="online-delivery-summary">

                <strong>
                    Delivery
                </strong>

                <p>
                    Delivery is currently unavailable.
                </p>

            </div>

        `;

    }


    if (
        delivery.freeDelivery
    ) {

        return `

            <div class="online-delivery-summary">

                <strong>
                    Delivery
                </strong>

                <p>
                    Free Delivery
                </p>

            </div>

        `;

    }


    return `

        <div class="online-delivery-summary">

            <div class="online-delivery-row">

                <span>
                    Distance
                </span>

                <strong>
                    ${delivery.distance} km
                </strong>

            </div>


            <div class="online-delivery-row">

                <span>
                    Cart Weight
                </span>

                <strong>
                    ${delivery.weight} kg
                </strong>

            </div>


            <div class="online-delivery-row">

                <span>
                    Delivery Fee
                </span>

                <strong>
                    ${formatNexpakOnlinePrice(
                        delivery.deliveryFee
                    )}
                </strong>

            </div>

        </div>

    `;

}


/* =========================================================
   104. UPDATE DELIVERY DISPLAY
========================================================= */

function updateNexpakOnlineDeliveryDisplay() {

    const containers =
        document.querySelectorAll(
            ".online-delivery-summary-container"
        );


    const delivery =
        calculateNexpakOnlineCartDelivery();


    containers.forEach(
        container => {

            container.innerHTML =
                createNexpakOnlineDeliverySummaryHTML();

        }
    );


    const deliveryElements =
        document.querySelectorAll(
            ".online-delivery-fee"
        );


    deliveryElements.forEach(
        element => {

            element.textContent =
                formatNexpakOnlinePrice(
                    delivery.deliveryFee
                );

        }
    );


    const distanceElements =
        document.querySelectorAll(
            ".online-delivery-distance"
        );


    distanceElements.forEach(
        element => {

            element.textContent =
                `${delivery.distance} km`;

        }
    );


    const weightElements =
        document.querySelectorAll(
            ".online-delivery-weight"
        );


    weightElements.forEach(
        element => {

            element.textContent =
                `${delivery.weight} kg`;

        }
    );


    return delivery;

}


/* =========================================================
   105. HANDLE DISTANCE CHANGE
========================================================= */

function handleNexpakOnlineDeliveryDistanceChange(
    distance
) {

    const value =
        saveNexpakOnlineDeliveryDistance(
            distance
        );


    updateNexpakOnlineDeliveryDisplay();


    return value;

}


/* =========================================================
   106. DELIVERY DISTANCE INPUT
========================================================= */

function initialiseNexpakOnlineDeliveryInput() {

    const inputs =
        document.querySelectorAll(
            ".online-delivery-distance-input"
        );


    const savedDistance =
        getNexpakOnlineDeliveryDistance();


    inputs.forEach(
        input => {

            input.value =
                savedDistance;


            input.addEventListener(
                "input",
                event => {

                    handleNexpakOnlineDeliveryDistanceChange(
                        event.target.value
                    );

                }
            );

        }
    );

}


/* =========================================================
   107. VALIDATE DELIVERY DISTANCE
========================================================= */

function validateNexpakOnlineDeliveryDistance(
    distance
) {

    const value =
        Number(distance);


    if (
        !Number.isFinite(value)
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid delivery distance."

        };

    }


    if (
        value <
        NEXPAK_ONLINE_DELIVERY.minimumDistance
    ) {

        return {

            valid: false,

            message:
                "Delivery distance cannot be negative."

        };

    }


    if (
        NEXPAK_ONLINE_DELIVERY.maximumDistance > 0 &&
        value >
        NEXPAK_ONLINE_DELIVERY.maximumDistance
    ) {

        return {

            valid: false,

            message:
                `Delivery distance exceeds the current ${NEXPAK_ONLINE_DELIVERY.maximumDistance} km delivery limit.`

        };

    }


    return {

        valid: true,

        distance:
            value

    };

}


/* =========================================================
   108. GET DELIVERY INFORMATION
========================================================= */

function getNexpakOnlineDeliveryInformation() {

    const delivery =
        calculateNexpakOnlineCartDelivery();


    return {

        distance:
            delivery.distance,

        weight:
            delivery.weight,

        fee:
            delivery.deliveryFee,

        freeDelivery:
            delivery.freeDelivery === true

    };

}


/* =========================================================
   109. REFRESH ORDER TOTAL
========================================================= */

function refreshNexpakOnlineOrderTotal() {

    const totals =
        calculateNexpakOnlineOrderTotals();


    const subtotalElements =
        document.querySelectorAll(
            ".online-order-subtotal"
        );


    subtotalElements.forEach(
        element => {

            element.textContent =
                formatNexpakOnlinePrice(
                    totals.productsTotalInclVat
                );

        }
    );


    const deliveryElements =
        document.querySelectorAll(
            ".online-order-delivery"
        );


    deliveryElements.forEach(
        element => {

            element.textContent =
                formatNexpakOnlinePrice(
                    totals.deliveryFee
                );

        }
    );


    const totalElements =
        document.querySelectorAll(
            ".online-order-total"
        );


    totalElements.forEach(
        element => {

            element.textContent =
                formatNexpakOnlinePrice(
                    totals.orderTotal
                );

        }
    );


    return totals;

}


/* =========================================================
   110. REFRESH DELIVERY + ORDER TOTAL
========================================================= */

function refreshNexpakOnlineDeliveryAndTotals() {

    updateNexpakOnlineDeliveryDisplay();

    return refreshNexpakOnlineOrderTotal();

}


/* =========================================================
   111. INITIALISE DELIVERY ENGINE
========================================================= */

function initialiseNexpakOnlineDelivery() {

    initialiseNexpakOnlineDeliveryInput();

    updateNexpakOnlineDeliveryDisplay();

    refreshNexpakOnlineOrderTotal();

}


/* =========================================================
   112. START DELIVERY ENGINE
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialiseNexpakOnlineDelivery
    );

} else {

    initialiseNexpakOnlineDelivery();

}


/* =========================================================
   END OF PART 7/8

   NEXT:
   PART 8/8

   FINAL ONLINE STORE ENGINE

   Will handle:
   - Rendering kit cards
   - Add to cart button
   - View More button
   - Quantity controls
   - Kit option selectors
   - Search/category/sort controls
   - Cart updates
   - Final store initialisation
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — FINAL ENGINE

   File:
   online.js

   PART:
   8/8

   FINAL STORE UI ENGINE

   Handles:
   - Kit rendering
   - Quantity controls
   - Kit option selectors
   - Add to Cart
   - View More
   - Search
   - Categories
   - Sorting
   - Cart updates
   - Store initialisation

   IMPORTANT:
   ONLINE STORE = PRE-BUILT KITS ONLY

   BUILD YOUR SYSTEM = configurator.js
========================================================= */


/* =========================================================
   113. ESCAPE HTML
========================================================= */

function escapeNexpakOnlineHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   114. FORMAT PRICE
========================================================= */

function formatNexpakOnlinePrice(amount) {

    const value =
        Number(amount) || 0;


    return new Intl.NumberFormat(
        "en-ZA",
        {
            style: "currency",
            currency: "ZAR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);

}


/* =========================================================
   115. GET KIT IMAGE
========================================================= */

function getNexpakOnlineKitImage(kit) {

    if (
        kit &&
        kit.image
    ) {

        return kit.image;

    }


    return "images/placeholder.jpg";

}


/* =========================================================
   116. CREATE OPTION SELECTORS
========================================================= */

function createNexpakOnlineKitOptionsHTML(
    kit
) {

    if (
        !Array.isArray(
            kit.options
        ) ||
        kit.options.length === 0
    ) {

        return "";

    }


    return `

        <div class="online-kit-options">

            ${kit.options.map(
                option => `

                    <div
                        class="online-kit-option"
                    >

                        <label>

                            ${escapeNexpakOnlineHTML(
                                option.name ||
                                option.label ||
                                option.id
                            )}

                        </label>


                        <select

                            class="
                                online-kit-option-select
                            "

                            data-option-id="
                                ${escapeNexpakOnlineHTML(
                                    option.id
                                )}
                            "

                        >

                            ${
                                Array.isArray(
                                    option.values
                                )
                                ?
                                option.values.map(
                                    value => `

                                        <option

                                            value="
                                                ${escapeNexpakOnlineHTML(
                                                    value.id
                                                )}
                                            "

                                        >

                                            ${escapeNexpakOnlineHTML(
                                                value.name
                                            )}

                                        </option>

                                    `
                                ).join("")
                                :
                                ""
                            }

                        </select>

                    </div>

                `
            ).join("")}

        </div>

    `;

}


/* =========================================================
   117. CREATE QUANTITY CONTROL
========================================================= */

function createNexpakOnlineQuantityHTML(
    kit
) {

    return `

        <div class="online-kit-quantity">

            <button

                type="button"

                class="online-qty-minus"

                data-kit-id="
                    ${escapeNexpakOnlineHTML(
                        kit.id
                    )}
                "

                aria-label="Decrease quantity"

            >
                −
            </button>


            <input

                type="number"

                class="online-qty-input"

                value="1"

                min="1"

                step="1"

                inputmode="numeric"

                aria-label="Kit quantity"

            >


            <button

                type="button"

                class="online-qty-plus"

                data-kit-id="
                    ${escapeNexpakOnlineHTML(
                        kit.id
                    )}
                "

                aria-label="Increase quantity"

            >
                +
            </button>

        </div>

    `;

}


/* =========================================================
   118. CREATE KIT CARD
========================================================= */

function createNexpakOnlineKitCard(
    kit
) {

    const prices =
        getNexpakOnlineKitDisplayPrices(
            kit
        );


    const priceHTML =
        prices.inclVat > 0

            ? `

                <div class="online-kit-price">

                    ${formatNexpakOnlinePrice(
                        prices.inclVat
                    )}

                    <small>
                        incl. VAT
                    </small>

                </div>

              `

            : `

                <div class="online-kit-price">

                    <span
                        class="online-price-unavailable"
                    >
                        Price coming soon
                    </span>

                </div>

              `;


    const optionsHTML =
        createNexpakOnlineKitOptionsHTML(
            kit
        );


    const quantityHTML =
        createNexpakOnlineQuantityHTML(
            kit
        );


    const stockText =
        kit.stockStatus ===
        "out-of-stock"

            ? "Out of Stock"

            : kit.stockStatus ===
              "pre-order"

                ? "Pre-Order"

                : kit.stockStatus ===
                  "special-order"

                    ? "Special Order"

                    : "Available";


    return `

        <article

            class="online-kit-card"

            data-kit-id="
                ${escapeNexpakOnlineHTML(
                    kit.id
                )}
            "

        >


            <div class="online-kit-image-wrapper">


                <img

                    class="online-kit-image"

                    src="
                        ${escapeNexpakOnlineHTML(
                            getNexpakOnlineKitImage(
                                kit
                            )
                        )}
                    "

                    alt="
                        ${escapeNexpakOnlineHTML(
                            kit.name
                        )}
                    "

                    loading="lazy"

                    onerror="
                        this.onerror=null;
                        this.src='images/placeholder.jpg';
                    "

                >


                ${
                    kit.featured

                        ? `

                            <span
                                class="
                                    online-kit-badge
                                    online-kit-featured
                                "
                            >
                                Featured
                            </span>

                          `

                        : ""
                }


            </div>


            <div class="online-kit-content">


                <div class="online-kit-brand">

                    ${escapeNexpakOnlineHTML(
                        kit.brand || ""
                    )}

                </div>


                <h3 class="online-kit-name">

                    ${escapeNexpakOnlineHTML(
                        kit.name
                    )}

                </h3>


                <p class="online-kit-description">

                    ${escapeNexpakOnlineHTML(
                        kit.shortDescription ||
                        ""
                    )}

                </p>


                <div class="online-kit-stock">

                    ${escapeNexpakOnlineHTML(
                        stockText
                    )}

                </div>


                ${optionsHTML}


                ${quantityHTML}


                ${priceHTML}


                <div class="online-kit-actions">


                    <button

                        type="button"

                        class="
                            online-kit-button
                            online-add-to-cart
                        "

                        data-kit-id="
                            ${escapeNexpakOnlineHTML(
                                kit.id
                            )}
                        "

                    >

                        Add to Cart

                    </button>


                    <button

                        type="button"

                        class="
                            online-kit-button
                            online-view-more
                        "

                        data-kit-id="
                            ${escapeNexpakOnlineHTML(
                                kit.id
                            )}
                        "

                    >

                        View More

                    </button>


                </div>


            </div>


        </article>

    `;

}


/* =========================================================
   119. FIND KIT GRID
========================================================= */

function getNexpakOnlineKitGrid() {

    const selectors = [

        "#onlineKitGrid",

        "#online-kit-grid",

        ".online-kit-grid",

        ".online-products-grid",

        ".shop-products-grid",

        "#productsGrid"

    ];


    for (
        const selector of selectors
    ) {

        const element =
            document.querySelector(
                selector
            );


        if (element) {

            return element;

        }

    }


    return null;

}


/* =========================================================
   120. RENDER KITS
========================================================= */

function renderNexpakOnlineKits(
    kits
) {

    const grid =
        getNexpakOnlineKitGrid();


    if (!grid) {

        console.warn(
            "NEXPAK Online Store: Kit grid not found."
        );

        return;

    }


    const source =
        Array.isArray(kits)
            ? kits
            : [];


    if (
        source.length === 0
    ) {

        const filters =
            NEXPAK_ONLINE_STATE.filters ||
            {};


        grid.innerHTML =
            createNexpakOnlineEmptyResultsHTML(
                filters.search || "",
                filters.category || "all"
            );


        updateNexpakOnlineResultsCount(
            0
        );

        return;

    }


    grid.innerHTML =
        source
            .map(
                kit =>
                    createNexpakOnlineKitCard(
                        kit
                    )
            )
            .join("");


    updateNexpakOnlineResultsCount(
        source.length
    );


    bindNexpakOnlineKitButtons();

}


/* =========================================================
   121. RESULTS COUNT
========================================================= */

function updateNexpakOnlineResultsCount(
    count
) {

    const elements =
        document.querySelectorAll(
            ".online-results-count"
        );


    elements.forEach(
        element => {

            element.textContent =
                `${count} kit${
                    count === 1
                        ? ""
                        : "s"
                }`;

        }
    );

}


/* =========================================================
   122. BIND KIT BUTTONS
========================================================= */

function bindNexpakOnlineKitButtons() {

    const addButtons =
        document.querySelectorAll(
            ".online-add-to-cart"
        );


    addButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const kitId =
                        button.dataset.kitId;


                    handleNexpakOnlineAddToCart(
                        kitId,
                        button
                    );


                    refreshNexpakOnlineDeliveryAndTotals();

                }
            );

        }
    );


    const viewButtons =
        document.querySelectorAll(
            ".online-view-more"
        );


    viewButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const kitId =
                        button.dataset.kitId;


                    handleNexpakOnlineViewMore(
                        kitId
                    );

                }
            );

        }
    );


    bindNexpakOnlineQuantityButtons();

}


/* =========================================================
   123. BIND QUANTITY BUTTONS
========================================================= */

function bindNexpakOnlineQuantityButtons() {

    const minusButtons =
        document.querySelectorAll(
            ".online-qty-minus"
        );


    const plusButtons =
        document.querySelectorAll(
            ".online-qty-plus"
        );


    minusButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".online-kit-card"
                        );


                    const input =
                        card?.querySelector(
                            ".online-qty-input"
                        );


                    if (!input) {

                        return;

                    }


                    let value =
                        Number(
                            input.value
                        ) || 1;


                    value =
                        Math.max(
                            1,
                            value - 1
                        );


                    input.value =
                        value;

                }
            );

        }
    );


    plusButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".online-kit-card"
                        );


                    const input =
                        card?.querySelector(
                            ".online-qty-input"
                        );


                    if (!input) {

                        return;

                    }


                    let value =
                        Number(
                            input.value
                        ) || 1;


                    value += 1;


                    input.value =
                        value;

                }
            );

        }
    );


    const inputs =
        document.querySelectorAll(
            ".online-qty-input"
        );


    inputs.forEach(
        input => {

            input.addEventListener(
                "change",
                () => {

                    let value =
                        Number(
                            input.value
                        ) || 1;


                    input.value =
                        Math.max(
                            1,
                            Math.floor(
                                value
                            )
                        );

                }
            );

        }
    );

}


/* =========================================================
   124. SEARCH INPUT
========================================================= */

function bindNexpakOnlineSearch() {

    const input =
        document.querySelector(
            "#onlineSearch"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "input",
        event => {

            handleNexpakOnlineSearch(
                event.target.value
            );

        }
    );

}


/* =========================================================
   125. CATEGORY SELECT
========================================================= */

function bindNexpakOnlineCategory() {

    const select =
        document.querySelector(
            "#onlineCategory"
        );


    if (!select) {

        return;

    }


    select.addEventListener(
        "change",
        event => {

            handleNexpakOnlineCategoryChange(
                event.target.value
            );

        }
    );

}


/* =========================================================
   126. SORT SELECT
========================================================= */

function bindNexpakOnlineSort() {

    const select =
        document.querySelector(
            "#onlineSort"
        );


    if (!select) {

        return;

    }


    select.addEventListener(
        "change",
        event => {

            handleNexpakOnlineSortChange(
                event.target.value
            );

        }
    );

}


/* =========================================================
   127. POPULATE CATEGORY SELECT
========================================================= */

function populateNexpakOnlineCategories() {

    const select =
        document.querySelector(
            "#onlineCategory"
        );


    if (
        !select ||
        typeof NEXPAK_ONLINE_CATEGORIES ===
        "undefined"
    ) {

        return;

    }


    const currentValue =
        select.value ||
        "all";


    select.innerHTML = "";


    NEXPAK_ONLINE_CATEGORIES
        .forEach(
            category => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    category.id;


                option.textContent =
                    category.name;


                select.appendChild(
                    option
                );

            }
        );


    select.value =
        currentValue;

}


/* =========================================================
   128. STORE INITIALISATION
========================================================= */

function initialiseNexpakOnlineStore() {

    console.log(
        "NEXPAK Online Store: Initialising..."
    );


    /* -----------------------------------------
       INITIALISE FILTER STATE
    ----------------------------------------- */

    if (
        typeof initialiseNexpakOnlineFilterState ===
        "function"
    ) {

        initialiseNexpakOnlineFilterState();

    }


    /* -----------------------------------------
       LOAD CART
    ----------------------------------------- */

    if (
        typeof loadNexpakOnlineCart ===
        "function"
    ) {

        loadNexpakOnlineCart();

    }


    /* -----------------------------------------
       POPULATE CATEGORIES
    ----------------------------------------- */

    populateNexpakOnlineCategories();


    /* -----------------------------------------
       BIND SEARCH
    ----------------------------------------- */

    bindNexpakOnlineSearch();


    /* -----------------------------------------
       BIND CATEGORY
    ----------------------------------------- */

    bindNexpakOnlineCategory();


    /* -----------------------------------------
       BIND SORT
    ----------------------------------------- */

    bindNexpakOnlineSort();


    /* -----------------------------------------
       UPDATE PRICES
    ----------------------------------------- */

    if (
        typeof updateAllNexpakOnlinePrices ===
        "function"
    ) {

        updateAllNexpakOnlinePrices();

    }


    /* -----------------------------------------
       GET CURRENT FILTERS
    ----------------------------------------- */

    const settings =
        (
            typeof NEXPAK_ONLINE_STATE !==
            "undefined" &&
            NEXPAK_ONLINE_STATE.filters
        )
        ?
        NEXPAK_ONLINE_STATE.filters
        :
        {

            search: "",

            category: "all",

            brand: "",

            sort: "featured"

        };


    /* -----------------------------------------
       FILTER KITS
    ----------------------------------------- */

    let kits = [];


    if (
        typeof filterNexpakOnlineKits ===
        "function"
    ) {

        kits =
            filterNexpakOnlineKits(
                settings
            );

    } else if (
        typeof getAllNexpakOnlineKits ===
        "function"
    ) {

        kits =
            getAllNexpakOnlineKits();

    }


    /* -----------------------------------------
       RENDER KITS
    ----------------------------------------- */

    renderNexpakOnlineKits(
        kits
    );


    /* -----------------------------------------
       CART COUNT
    ----------------------------------------- */

    if (
        typeof updateNexpakOnlineCartCount ===
        "function"
    ) {

        updateNexpakOnlineCartCount();

    }


    /* -----------------------------------------
       DELIVERY
    ----------------------------------------- */

    if (
        typeof updateNexpakOnlineDeliveryDisplay ===
        "function"
    ) {

        updateNexpakOnlineDeliveryDisplay();

    }


    /* -----------------------------------------
       ORDER TOTAL
    ----------------------------------------- */

    if (
        typeof refreshNexpakOnlineOrderTotal ===
        "function"
    ) {

        refreshNexpakOnlineOrderTotal();

    }


    console.log(
        "NEXPAK Online Store: " +
        kits.length +
        " kits loaded."
    );

}


/* =========================================================
   129. START ONLINE STORE
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialiseNexpakOnlineStore
    );

} else {

    initialiseNexpakOnlineStore();

}


/* =========================================================
   130. PUBLIC ONLINE STORE API
========================================================= */

window.NEXPAK_ONLINE_STORE = {

    version: "1.0",

    getKits:
        function () {

            return (
                typeof getAllNexpakOnlineKits ===
                "function"
            )
            ?
            getAllNexpakOnlineKits()
            :
            [];

        },


    getKit:
        function (kitId) {

            return (
                typeof getNexpakOnlineKit ===
                "function"
            )
            ?
            getNexpakOnlineKit(
                kitId
            )
            :
            null;

        },


    addToCart:
        function (
            kitId,
            quantity
        ) {

            if (
                typeof addNexpakOnlineKitToCart !==
                "function"
            ) {

                return false;

            }


            return addNexpakOnlineKitToCart(
                kitId,
                quantity
            );

        },


    removeFromCart:
        function (cartItemId) {

            if (
                typeof removeNexpakOnlineCartItem !==
                "function"
            ) {

                return false;

            }


            return removeNexpakOnlineCartItem(
                cartItemId
            );

        },


    clearCart:
        function () {

            if (
                typeof clearNexpakOnlineCart !==
                "function"
            ) {

                return false;

            }


            return clearNexpakOnlineCart();

        },


    getCart:
        function () {

            if (
                typeof getNexpakOnlineCart !==
                "function"
            ) {

                return [];

            }


            return getNexpakOnlineCart();

        },


    getCartCount:
        function () {

            if (
                typeof getNexpakOnlineCartCount !==
                "function"
            ) {

                return 0;

            }


            return getNexpakOnlineCartCount();

        },


    getCartWeight:
        function () {

            if (
                typeof getNexpakOnlineCartWeight !==
                "function"
            ) {

                return 0;

            }


            return getNexpakOnlineCartWeight();

        },


    calculateDelivery:
        function () {

            if (
                typeof calculateNexpakOnlineCartDelivery !==
                "function"
            ) {

                return {

                    deliveryFee: 0,

                    distance: 0,

                    weight: 0

                };

            }


            return calculateNexpakOnlineCartDelivery();

        },


    calculateOrder:
        function () {

            if (
                typeof calculateNexpakOnlineOrderTotals !==
                "function"
            ) {

                return {

                    subtotalExVat: 0,

                    vatAmount: 0,

                    productsTotalInclVat: 0,

                    deliveryFee: 0,

                    orderTotal: 0

                };

            }


            return calculateNexpakOnlineOrderTotals();

        },


    viewMore:
        function (kitId) {

            if (
                typeof handleNexpakOnlineViewMore !==
                "function"
            ) {

                return false;

            }


            return handleNexpakOnlineViewMore(
                kitId
            );

        },


    printPDF:
        function (kitId) {

            if (
                typeof printNexpakOnlineKitPDF !==
                "function"
            ) {

                return false;

            }


            return printNexpakOnlineKitPDF(
                kitId
            );

        }

};


/* =========================================================
   131. ONLINE STORE READY
========================================================= */

console.log(
    "NEXPAK Online Store Engine loaded successfully."
);


/* =========================================================
   END OF online.js — PART 8/8
========================================================= */

