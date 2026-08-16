/* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   onlinecart.js
   PART 1 — CART CORE + STORAGE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. CART CONFIGURATION
       ===================================================== */

    const CART_STORAGE_KEY =
        "NEXPAK_ONLINE_CART";


    const CART_VERSION =
        1;


    /* =====================================================
       2. CART STATE
       ===================================================== */

    let nexpakOnlineCart = [];


    /* =====================================================
       3. SAFE NUMBER
       ===================================================== */

    function safeCartNumber(value, fallback = 0) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : fallback;
    }


    /* =====================================================
       4. SAFE INTEGER
       ===================================================== */

    function safeCartInteger(value, fallback = 1) {

        const number =
            parseInt(value, 10);

        return Number.isFinite(number)
            ? number
            : fallback;
    }


    /* =====================================================
       5. NORMALISE QUANTITY
       ===================================================== */

    function normaliseCartQuantity(quantity) {

        quantity =
            safeCartInteger(quantity, 1);


        if (quantity < 1) {

            quantity = 1;

        }


        return quantity;

    }


    /* =====================================================
       6. NORMALISE KIT ID
       ===================================================== */

    function normaliseCartKitId(kit) {

        if (!kit) {

            return "";

        }


        return String(
            kit.id ||
            kit.kitId ||
            kit.slug ||
            kit.code ||
            ""
        ).trim();

    }


    /* =====================================================
       7. NORMALISE KIT NAME
       ===================================================== */

    function normaliseCartKitName(kit) {

        if (!kit) {

            return "NEXPAK Security Kit";

        }


        return String(
            kit.name ||
            kit.kitName ||
            kit.title ||
            kit.label ||
            "NEXPAK Security Kit"
        ).trim();

    }


    /* =====================================================
       8. NORMALISE KIT PRICE
       ===================================================== */

    function normaliseCartKitPrice(kit) {

        if (!kit) {

            return 0;

        }


        const possiblePrices = [

            kit.priceExVat,
            kit.priceExVAT,
            kit.exVatPrice,
            kit.exVATPrice,
            kit.price,
            kit.kitPrice

        ];


        for (
            let i = 0;
            i < possiblePrices.length;
            i++
        ) {

            const price =
                safeCartNumber(
                    possiblePrices[i],
                    NaN
                );


            if (Number.isFinite(price)) {

                return Math.max(0, price);

            }

        }


        return 0;

    }


    /* =====================================================
       9. NORMALISE KIT WEIGHT
       ===================================================== */

    function normaliseCartKitWeight(kit) {

        if (!kit) {

            return 0;

        }


        const possibleWeights = [

            kit.weight,
            kit.weightKg,
            kit.kitWeight,
            kit.totalWeight

        ];


        for (
            let i = 0;
            i < possibleWeights.length;
            i++
        ) {

            const weight =
                safeCartNumber(
                    possibleWeights[i],
                    NaN
                );


            if (Number.isFinite(weight)) {

                return Math.max(0, weight);

            }

        }


        return 0;

    }


    /* =====================================================
       10. NORMALISE KIT IMAGE
       ===================================================== */

    function normaliseCartKitImage(kit) {

        if (!kit) {

            return "";

        }


        return String(

            kit.image ||
            kit.imageUrl ||
            kit.thumbnail ||
            kit.photo ||
            ""

        ).trim();

    }


    /* =====================================================
       11. NORMALISE KIT OPTIONS
       ===================================================== */

    function normaliseCartKitOptions(options) {

        if (!options) {

            return {};

        }


        if (
            typeof options !== "object" ||
            Array.isArray(options)
        ) {

            return {};

        }


        try {

            return JSON.parse(
                JSON.stringify(options)
            );

        } catch (error) {

            console.warn(
                "NEXPAK Online Cart: Could not clone kit options.",
                error
            );

            return {};

        }

    }


    /* =====================================================
       12. NORMALISE KIT
       ===================================================== */

    function normaliseOnlineCartKit(
        kit,
        quantity = 1,
        options = {}
    ) {

        if (!kit) {

            return null;

        }


        const kitId =
            normaliseCartKitId(kit);


        if (!kitId) {

            console.warn(
                "NEXPAK Online Cart: Kit has no valid ID.",
                kit
            );

            return null;

        }


        return {

            id:
                kitId,

            name:
                normaliseCartKitName(kit),

            priceExVat:
                normaliseCartKitPrice(kit),

            weight:
                normaliseCartKitWeight(kit),

            image:
                normaliseCartKitImage(kit),

            quantity:
                normaliseCartQuantity(quantity),

            options:
                normaliseCartKitOptions(options),

            version:
                CART_VERSION

        };

    }


    /* =====================================================
       13. LOAD CART FROM LOCAL STORAGE
       ===================================================== */

    function loadNexpakOnlineCart() {

        try {

            const storedCart =
                localStorage.getItem(
                    CART_STORAGE_KEY
                );


            if (!storedCart) {

                nexpakOnlineCart = [];

                return nexpakOnlineCart;

            }


            const parsedCart =
                JSON.parse(storedCart);


            if (!Array.isArray(parsedCart)) {

                nexpakOnlineCart = [];

                return nexpakOnlineCart;

            }


            nexpakOnlineCart =
                parsedCart
                    .filter(item => item && item.id)
                    .map(item => ({

                        id:
                            String(item.id),

                        name:
                            String(
                                item.name ||
                                "NEXPAK Security Kit"
                            ),

                        priceExVat:
                            Math.max(
                                0,
                                safeCartNumber(
                                    item.priceExVat,
                                    0
                                )
                            ),

                        weight:
                            Math.max(
                                0,
                                safeCartNumber(
                                    item.weight,
                                    0
                                )
                            ),

                        image:
                            String(
                                item.image || ""
                            ),

                        quantity:
                            normaliseCartQuantity(
                                item.quantity
                            ),

                        options:
                            normaliseCartKitOptions(
                                item.options
                            ),

                        version:
                            CART_VERSION

                    }));


            return nexpakOnlineCart;

        } catch (error) {

            console.error(
                "NEXPAK Online Cart: Failed to load cart.",
                error
            );


            nexpakOnlineCart = [];


            return nexpakOnlineCart;

        }

    }


    /* =====================================================
       14. SAVE CART TO LOCAL STORAGE
       ===================================================== */

    function saveNexpakOnlineCart() {

        try {

            localStorage.setItem(

                CART_STORAGE_KEY,

                JSON.stringify(
                    nexpakOnlineCart
                )

            );


            return true;

        } catch (error) {

            console.error(
                "NEXPAK Online Cart: Failed to save cart.",
                error
            );


            return false;

        }

    }


    /* =====================================================
       15. GET CART
       ===================================================== */

    function getNexpakOnlineCart() {

        return nexpakOnlineCart;

    }


    /* =====================================================
       16. GET CART ITEM COUNT
       ===================================================== */

    function getNexpakOnlineCartCount() {

        return nexpakOnlineCart.reduce(

            (total, item) => {

                return total +
                    normaliseCartQuantity(
                        item.quantity
                    );

            },

            0

        );

    }


    /* =====================================================
       17. GET CART KIT COUNT
       ===================================================== */

    function getNexpakOnlineCartKitCount() {

        return nexpakOnlineCart.length;

    }


    /* =====================================================
       18. EXPOSE CART CORE
       ===================================================== */

    window.NEXPAK_ONLINE_CART = {

        version:
            CART_VERSION,

        load:
            loadNexpakOnlineCart,

        save:
            saveNexpakOnlineCart,

        get:
            getNexpakOnlineCart,

        getCount:
            getNexpakOnlineCartCount,

        getKitCount:
            getNexpakOnlineCartKitCount,

        normaliseKit:
            normaliseOnlineCartKit

    };


    /* =====================================================
       PART 1 END
       ===================================================== */
/* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 2 — ADD KIT + OPTION HANDLING
   ========================================================= */


/* =====================================================
   19. CREATE OPTION KEY
   ===================================================== */

function createNexpakOnlineCartOptionKey(options) {

    if (!options || typeof options !== "object") {

        return "";

    }


    try {

        return JSON.stringify(
            options,
            Object.keys(options).sort()
        );

    } catch (error) {

        console.warn(
            "NEXPAK Online Cart: Could not create option key.",
            error
        );

        return "";

    }

}


/* =====================================================
   20. CHECK IF CART ITEMS MATCH
   ===================================================== */

function doNexpakOnlineCartItemsMatch(
    existingItem,
    newItem
) {

    if (!existingItem || !newItem) {

        return false;

    }


    if (
        String(existingItem.id) !==
        String(newItem.id)
    ) {

        return false;

    }


    const existingOptionsKey =
        createNexpakOnlineCartOptionKey(
            existingItem.options
        );


    const newOptionsKey =
        createNexpakOnlineCartOptionKey(
            newItem.options
        );


    return (
        existingOptionsKey ===
        newOptionsKey
    );

}


/* =====================================================
   21. ADD KIT TO CART
   ===================================================== */

function addNexpakOnlineKitToCart(
    kit,
    quantity = 1,
    options = {}
) {

    /* -------------------------------------------------
       Validate kit
       ------------------------------------------------- */

    if (!kit) {

        console.error(
            "NEXPAK Online Cart: Cannot add empty kit."
        );

        return {

            success: false,

            message:
                "Unable to add this kit to the cart."

        };

    }


    /* -------------------------------------------------
       Normalise quantity
       ------------------------------------------------- */

    quantity =
        normaliseCartQuantity(
            quantity
        );


    /* -------------------------------------------------
       Build cart item
       ------------------------------------------------- */

    const cartItem =
        normaliseOnlineCartKit(
            kit,
            quantity,
            options
        );


    if (!cartItem) {

        return {

            success: false,

            message:
                "This kit could not be added to the cart."

        };

    }


    /* -------------------------------------------------
       Find matching kit + options
       ------------------------------------------------- */

    const existingIndex =
        nexpakOnlineCart.findIndex(

            item =>
                doNexpakOnlineCartItemsMatch(
                    item,
                    cartItem
                )

        );


    /* -------------------------------------------------
       Existing kit
       ------------------------------------------------- */

    if (existingIndex !== -1) {

        const existingItem =
            nexpakOnlineCart[
                existingIndex
            ];


        existingItem.quantity =
            normaliseCartQuantity(
                existingItem.quantity
            ) +
            quantity;


        /* ---------------------------------------------
           Keep latest safe product information
           --------------------------------------------- */

        existingItem.name =
            cartItem.name;


        existingItem.priceExVat =
            cartItem.priceExVat;


        existingItem.weight =
            cartItem.weight;


        existingItem.image =
            cartItem.image;


        existingItem.options =
            cartItem.options;


    }


    /* -------------------------------------------------
       New kit
       ------------------------------------------------- */

    else {

        nexpakOnlineCart.push(
            cartItem
        );

    }


    /* -------------------------------------------------
       Save immediately
       ------------------------------------------------- */

    const saved =
        saveNexpakOnlineCart();


    /* -------------------------------------------------
       Notify the rest of the Online Store
       ------------------------------------------------- */

    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    /* -------------------------------------------------
       Return result
       ------------------------------------------------- */

    return {

        success:
            saved,

        item:
            cartItem,

        cart:
            nexpakOnlineCart,

        cartCount:
            getNexpakOnlineCartCount(),

        message:
            saved
                ? "Kit added to cart."
                : "Kit added, but the cart could not be saved."

    };

}


/* =====================================================
   22. ADD KIT USING KIT ID
   ===================================================== */

function addNexpakOnlineKitById(
    kitId,
    quantity = 1,
    options = {}
) {

    if (!kitId) {

        return {

            success: false,

            message:
                "No kit was selected."

        };

    }


    /* -------------------------------------------------
       Try Online Store database
       ------------------------------------------------- */

    let kit = null;


    if (
        typeof NEXPAK_ONLINE_KITS !==
        "undefined"
    ) {

        if (
            Array.isArray(
                NEXPAK_ONLINE_KITS
            )
        ) {

            kit =
                NEXPAK_ONLINE_KITS.find(

                    item =>
                        String(
                            item.id ||
                            item.kitId ||
                            item.slug ||
                            item.code
                        ) ===
                        String(kitId)

                );

        }

    }


    /* -------------------------------------------------
       Try store object if database is nested
       ------------------------------------------------- */

    if (
        !kit &&
        typeof NEXPAK_ONLINE_STORE !==
        "undefined"
    ) {

        const store =
            NEXPAK_ONLINE_STORE;


        if (
            Array.isArray(
                store.kits
            )
        ) {

            kit =
                store.kits.find(

                    item =>
                        String(
                            item.id ||
                            item.kitId ||
                            item.slug ||
                            item.code
                        ) ===
                        String(kitId)

                );

        }

    }


    /* -------------------------------------------------
       Kit not found
       ------------------------------------------------- */

    if (!kit) {

        console.error(
            "NEXPAK Online Cart: Kit not found:",
            kitId
        );


        return {

            success: false,

            message:
                "The selected kit could not be found."

        };

    }


    return addNexpakOnlineKitToCart(
        kit,
        quantity,
        options
    );

}


/* =====================================================
   23. CART EVENT DISPATCHER
   ===================================================== */

function dispatchNexpakOnlineCartEvent(
    eventName
) {

    try {

        document.dispatchEvent(

            new CustomEvent(
                eventName,
                {

                    detail: {

                        cart:
                            nexpakOnlineCart,

                        count:
                            getNexpakOnlineCartCount(),

                        kitCount:
                            getNexpakOnlineCartKitCount()

                    }

                }
            )

        );

    } catch (error) {

        console.warn(
            "NEXPAK Online Cart: Event dispatch failed.",
            error
        );

    }

}


/* =====================================================
   24. UPDATE CART BADGE
   ===================================================== */

function updateNexpakOnlineCartCountDisplay() {

    const count =
        getNexpakOnlineCartCount();


    const selectors = [

        "[data-online-cart-count]",

        ".online-cart-count",

        "#onlineCartCount",

        "#cartCount"

    ];


    selectors.forEach(
        selector => {

            const elements =
                document.querySelectorAll(
                    selector
                );


            elements.forEach(
                element => {

                    element.textContent =
                        String(count);

                    element.setAttribute(
                        "data-count",
                        String(count)
                    );

                }
            );

        }
    );

}


/* =====================================================
   25. CART UPDATE LISTENER
   ===================================================== */

document.addEventListener(

    "nexpak:cart-updated",

    function () {

        updateNexpakOnlineCartCountDisplay();

    }

);


/* =====================================================
   26. EXTEND PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.add =
        addNexpakOnlineKitToCart;


    window.NEXPAK_ONLINE_CART.addById =
        addNexpakOnlineKitById;


    window.NEXPAK_ONLINE_CART.dispatch =
        dispatchNexpakOnlineCartEvent;

}


/* =====================================================
   PART 2 END
   ===================================================== */
 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 3 — QUANTITY + REMOVE + CLEAR + WEIGHT
   ========================================================= */


/* =====================================================
   27. FIND CART ITEM INDEX
   ===================================================== */

function findNexpakOnlineCartItemIndex(
    itemId,
    options = null
) {

    if (!itemId) {

        return -1;

    }


    const id =
        String(itemId);


    return nexpakOnlineCart.findIndex(

        item => {

            if (
                String(item.id) !== id
            ) {

                return false;

            }


            /*
             * If no options were supplied,
             * match by kit ID only.
             */

            if (options === null) {

                return true;

            }


            return (
                createNexpakOnlineCartOptionKey(
                    item.options
                ) ===
                createNexpakOnlineCartOptionKey(
                    options
                )
            );

        }

    );

}


/* =====================================================
   28. SET KIT QUANTITY
   ===================================================== */

function setNexpakOnlineKitQuantity(
    itemId,
    quantity,
    options = null
) {

    const index =
        findNexpakOnlineCartItemIndex(
            itemId,
            options
        );


    if (index === -1) {

        return {

            success: false,

            message:
                "Cart item not found."

        };

    }


    quantity =
        safeCartInteger(
            quantity,
            1
        );


    /*
     * Quantity below 1 removes the kit.
     */

    if (quantity <= 0) {

        return removeNexpakOnlineKitFromCart(
            itemId,
            options
        );

    }


    nexpakOnlineCart[index].quantity =
        normaliseCartQuantity(
            quantity
        );


    const saved =
        saveNexpakOnlineCart();


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    return {

        success:
            saved,

        item:
            nexpakOnlineCart[index],

        quantity:
            nexpakOnlineCart[index].quantity,

        cart:
            nexpakOnlineCart

    };

}


/* =====================================================
   29. INCREASE KIT QUANTITY
   ===================================================== */

function increaseNexpakOnlineKitQuantity(
    itemId,
    amount = 1,
    options = null
) {

    const index =
        findNexpakOnlineCartItemIndex(
            itemId,
            options
        );


    if (index === -1) {

        return {

            success: false,

            message:
                "Cart item not found."

        };

    }


    amount =
        safeCartInteger(
            amount,
            1
        );


    if (amount < 1) {

        amount = 1;

    }


    nexpakOnlineCart[index].quantity +=
        amount;


    nexpakOnlineCart[index].quantity =
        normaliseCartQuantity(
            nexpakOnlineCart[index].quantity
        );


    const saved =
        saveNexpakOnlineCart();


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    return {

        success:
            saved,

        item:
            nexpakOnlineCart[index],

        quantity:
            nexpakOnlineCart[index].quantity

    };

}


/* =====================================================
   30. DECREASE KIT QUANTITY
   ===================================================== */

function decreaseNexpakOnlineKitQuantity(
    itemId,
    amount = 1,
    options = null
) {

    const index =
        findNexpakOnlineCartItemIndex(
            itemId,
            options
        );


    if (index === -1) {

        return {

            success: false,

            message:
                "Cart item not found."

        };

    }


    amount =
        safeCartInteger(
            amount,
            1
        );


    if (amount < 1) {

        amount = 1;

    }


    const newQuantity =
        nexpakOnlineCart[index].quantity -
        amount;


    /*
     * Quantity reaching zero removes
     * the kit from the cart.
     */

    if (newQuantity <= 0) {

        return removeNexpakOnlineKitFromCart(
            itemId,
            options
        );

    }


    nexpakOnlineCart[index].quantity =
        normaliseCartQuantity(
            newQuantity
        );


    const saved =
        saveNexpakOnlineCart();


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    return {

        success:
            saved,

        item:
            nexpakOnlineCart[index],

        quantity:
            nexpakOnlineCart[index].quantity

    };

}


/* =====================================================
   31. REMOVE KIT FROM CART
   ===================================================== */

function removeNexpakOnlineKitFromCart(
    itemId,
    options = null
) {

    const index =
        findNexpakOnlineCartItemIndex(
            itemId,
            options
        );


    if (index === -1) {

        return {

            success: false,

            message:
                "Cart item not found."

        };

    }


    const removedItem =
        nexpakOnlineCart.splice(
            index,
            1
        )[0];


    const saved =
        saveNexpakOnlineCart();


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    return {

        success:
            saved,

        removed:
            removedItem,

        cart:
            nexpakOnlineCart

    };

}


/* =====================================================
   32. CLEAR CART
   ===================================================== */

function clearNexpakOnlineCart() {

    nexpakOnlineCart = [];


    const saved =
        saveNexpakOnlineCart();


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-cleared"
    );


    dispatchNexpakOnlineCartEvent(
        "nexpak:cart-updated"
    );


    return {

        success:
            saved,

        cart:
            nexpakOnlineCart

    };

}


/* =====================================================
   33. CALCULATE TOTAL KIT QUANTITY
   ===================================================== */

function calculateNexpakOnlineTotalKitQuantity() {

    return nexpakOnlineCart.reduce(

        (total, item) => {

            return total +
                normaliseCartQuantity(
                    item.quantity
                );

        },

        0

    );

}


/* =====================================================
   34. CALCULATE TOTAL CART WEIGHT
   ===================================================== */

function calculateNexpakOnlineCartWeight() {

    return nexpakOnlineCart.reduce(

        (total, item) => {

            const weight =
                Math.max(
                    0,
                    safeCartNumber(
                        item.weight,
                        0
                    )
                );


            const quantity =
                normaliseCartQuantity(
                    item.quantity
                );


            return total +
                (
                    weight *
                    quantity
                );

        },

        0

    );

}


/* =====================================================
   35. GET CART WEIGHT
   ===================================================== */

function getNexpakOnlineCartWeight() {

    return calculateNexpakOnlineCartWeight();

}


/* =====================================================
   36. UPDATE PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.setQuantity =
        setNexpakOnlineKitQuantity;


    window.NEXPAK_ONLINE_CART.increase =
        increaseNexpakOnlineKitQuantity;


    window.NEXPAK_ONLINE_CART.decrease =
        decreaseNexpakOnlineKitQuantity;


    window.NEXPAK_ONLINE_CART.remove =
        removeNexpakOnlineKitFromCart;


    window.NEXPAK_ONLINE_CART.clear =
        clearNexpakOnlineCart;


    window.NEXPAK_ONLINE_CART.getTotalKitQuantity =
        calculateNexpakOnlineTotalKitQuantity;


    window.NEXPAK_ONLINE_CART.getWeight =
        getNexpakOnlineCartWeight;

}


/* =====================================================
   PART 3 END
   ===================================================== */

 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 4 — CART TOTALS + VAT
   ========================================================= */


/* =====================================================
   37. GET VAT RATE
   ===================================================== */

function getNexpakOnlineCartVatRate() {

    let vatRate = 0.15;


    /*
     * Use the Online Store VAT value when available.
     */

    if (
        typeof NEXPAK_VAT !==
        "undefined"
    ) {

        const configuredVat =
            safeCartNumber(
                NEXPAK_VAT,
                NaN
            );


        if (
            Number.isFinite(
                configuredVat
            )
        ) {

            vatRate =
                configuredVat > 1
                    ? configuredVat / 100
                    : configuredVat;

        }

    }


    /*
     * Protect against invalid VAT values.
     */

    if (
        !Number.isFinite(vatRate) ||
        vatRate < 0
    ) {

        vatRate = 0.15;

    }


    return vatRate;

}


/* =====================================================
   38. CALCULATE KIT LINE TOTAL
   ===================================================== */

function calculateNexpakOnlineKitLineTotal(
    item
) {

    if (!item) {

        return 0;

    }


    const priceExVat =
        Math.max(
            0,
            safeCartNumber(
                item.priceExVat,
                0
            )
        );


    const quantity =
        normaliseCartQuantity(
            item.quantity
        );


    return (
        priceExVat *
        quantity
    );

}


/* =====================================================
   39. CALCULATE CART SUBTOTAL EX VAT
   ===================================================== */

function calculateNexpakOnlineCartSubtotal() {

    return nexpakOnlineCart.reduce(

        (total, item) => {

            return total +
                calculateNexpakOnlineKitLineTotal(
                    item
                );

        },

        0

    );

}


/* =====================================================
   40. CALCULATE VAT
   ===================================================== */

function calculateNexpakOnlineCartVat() {

    const subtotal =
        calculateNexpakOnlineCartSubtotal();


    const vatRate =
        getNexpakOnlineCartVatRate();


    return subtotal * vatRate;

}


/* =====================================================
   41. CALCULATE TOTAL INCLUDING VAT
   ===================================================== */

function calculateNexpakOnlineCartTotalInclVat() {

    const subtotal =
        calculateNexpakOnlineCartSubtotal();


    const vat =
        calculateNexpakOnlineCartVat();


    return subtotal + vat;

}


/* =====================================================
   42. CALCULATE TOTAL INCLUDING DELIVERY
   ===================================================== */

function calculateNexpakOnlineCartGrandTotal(
    deliveryFee = 0
) {

    const totalInclVat =
        calculateNexpakOnlineCartTotalInclVat();


    deliveryFee =
        Math.max(
            0,
            safeCartNumber(
                deliveryFee,
                0
            )
        );


    return totalInclVat +
        deliveryFee;

}


/* =====================================================
   43. BUILD CART TOTALS OBJECT
   ===================================================== */

function getNexpakOnlineCartTotals(
    deliveryFee = 0
) {

    const vatRate =
        getNexpakOnlineCartVatRate();


    const subtotalExVat =
        calculateNexpakOnlineCartSubtotal();


    const vatAmount =
        subtotalExVat *
        vatRate;


    const totalInclVat =
        subtotalExVat +
        vatAmount;


    deliveryFee =
        Math.max(
            0,
            safeCartNumber(
                deliveryFee,
                0
            )
        );


    const grandTotal =
        totalInclVat +
        deliveryFee;


    return {

        subtotalExVat:
            subtotalExVat,

        vatRate:
            vatRate,

        vatPercent:
            vatRate * 100,

        vatAmount:
            vatAmount,

        totalInclVat:
            totalInclVat,

        deliveryFee:
            deliveryFee,

        grandTotal:
            grandTotal,

        currency:
            "ZAR"

    };

}


/* =====================================================
   44. FORMAT RAND AMOUNT
   ===================================================== */

function formatNexpakOnlineCartMoney(
    amount
) {

    amount =
        safeCartNumber(
            amount,
            0
        );


    if (amount < 0) {

        amount = 0;

    }


    return (

        "R " +

        amount.toLocaleString(
            "en-ZA",
            {

                minimumFractionDigits: 2,

                maximumFractionDigits: 2

            }

        )

    );

}


/* =====================================================
   45. GET FORMATTED CART TOTALS
   ===================================================== */

function getNexpakOnlineFormattedCartTotals(
    deliveryFee = 0
) {

    const totals =
        getNexpakOnlineCartTotals(
            deliveryFee
        );


    return {

        subtotalExVat:
            formatNexpakOnlineCartMoney(
                totals.subtotalExVat
            ),

        vatAmount:
            formatNexpakOnlineCartMoney(
                totals.vatAmount
            ),

        totalInclVat:
            formatNexpakOnlineCartMoney(
                totals.totalInclVat
            ),

        deliveryFee:
            formatNexpakOnlineCartMoney(
                totals.deliveryFee
            ),

        grandTotal:
            formatNexpakOnlineCartMoney(
                totals.grandTotal
            ),

        vatPercent:
            totals.vatPercent

    };

}


/* =====================================================
   46. UPDATE PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.getVatRate =
        getNexpakOnlineCartVatRate;


    window.NEXPAK_ONLINE_CART.getSubtotal =
        calculateNexpakOnlineCartSubtotal;


    window.NEXPAK_ONLINE_CART.getVat =
        calculateNexpakOnlineCartVat;


    window.NEXPAK_ONLINE_CART.getTotalInclVat =
        calculateNexpakOnlineCartTotalInclVat;


    window.NEXPAK_ONLINE_CART.getGrandTotal =
        calculateNexpakOnlineCartGrandTotal;


    window.NEXPAK_ONLINE_CART.getTotals =
        getNexpakOnlineCartTotals;


    window.NEXPAK_ONLINE_CART.formatMoney =
        formatNexpakOnlineCartMoney;


    window.NEXPAK_ONLINE_CART.getFormattedTotals =
        getNexpakOnlineFormattedCartTotals;

}


/* =====================================================
   PART 4 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 5 — CART RENDERING
   ========================================================= */


/* =====================================================
   47. ESCAPE HTML
   ===================================================== */

function escapeNexpakOnlineCartHtml(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)

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


/* =====================================================
   48. FORMAT OPTION VALUE
   ===================================================== */

function formatNexpakOnlineCartOptionValue(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    if (
        typeof value === "object"
    ) {

        try {

            return JSON.stringify(
                value
            );

        } catch (error) {

            return "";

        }

    }


    return String(value);

}


/* =====================================================
   49. RENDER KIT OPTIONS
   ===================================================== */

function renderNexpakOnlineCartOptions(
    options
) {

    if (
        !options ||
        typeof options !== "object"
    ) {

        return "";

    }


    const keys =
        Object.keys(options);


    if (!keys.length) {

        return "";

    }


    let html =
        '<div class="online-cart-item-options">';


    keys.forEach(
        key => {

            const value =
                formatNexpakOnlineCartOptionValue(
                    options[key]
                );


            if (!value) {

                return;

            }


            html +=

                '<div class="online-cart-option">' +

                    '<span class="online-cart-option-label">' +

                        escapeNexpakOnlineCartHtml(
                            key
                        ) +

                    '</span>' +

                    '<span class="online-cart-option-value">' +

                        escapeNexpakOnlineCartHtml(
                            value
                        ) +

                    '</span>' +

                '</div>';

        }
    );


    html +=
        "</div>";


    return html;

}


/* =====================================================
   50. GET CART ITEM TOTAL
   ===================================================== */

function getNexpakOnlineCartItemDisplayTotal(
    item
) {

    return calculateNexpakOnlineKitLineTotal(
        item
    );

}


/* =====================================================
   51. RENDER SINGLE CART ITEM
   ===================================================== */

function renderNexpakOnlineCartItem(
    item,
    index
) {

    if (!item) {

        return "";

    }


    const quantity =
        normaliseCartQuantity(
            item.quantity
        );


    const price =
        Math.max(
            0,
            safeCartNumber(
                item.priceExVat,
                0
            )
        );


    const lineTotal =
        getNexpakOnlineCartItemDisplayTotal(
            item
        );


    const image =
        escapeNexpakOnlineCartHtml(
            item.image || ""
        );


    const name =
        escapeNexpakOnlineCartHtml(
            item.name ||
            "NEXPAK Security Kit"
        );


    const id =
        escapeNexpakOnlineCartHtml(
            item.id
        );


    const optionsHtml =
        renderNexpakOnlineCartOptions(
            item.options
        );


    return (

        '<article ' +

            'class="online-cart-item" ' +

            'data-cart-index="' +
                index +
            '" ' +

            'data-cart-item-id="' +
                id +
            '"' +

        '>' +


            '<div class="online-cart-item-image">' +

                (
                    image

                        ?

                    '<img ' +

                        'src="' +
                            image +
                        '" ' +

                        'alt="' +
                            name +
                        '" ' +

                        'loading="lazy"' +

                    '>'

                        :

                    '<div class="online-cart-item-image-placeholder">' +

                        'NEXPAK'

                    '</div>'
                ) +

            '</div>' +


            '<div class="online-cart-item-details">' +

                '<h3 class="online-cart-item-name">' +

                    name +

                '</h3>' +


                optionsHtml +


                '<div class="online-cart-item-unit-price">' +

                    'Price EX VAT: ' +

                    '<strong>' +

                        formatNexpakOnlineCartMoney(
                            price
                        ) +

                    '</strong>' +

                '</div>' +

            '</div>' +


            '<div class="online-cart-item-controls">' +

                '<button ' +

                    'type="button" ' +

                    'class="online-cart-quantity-button online-cart-decrease" ' +

                    'data-cart-action="decrease" ' +

                    'data-cart-item-id="' +
                        id +
                    '"' +

                    'aria-label="Decrease quantity"' +

                '>−</button>' +


                '<input ' +

                    'type="number" ' +

                    'class="online-cart-quantity-input" ' +

                    'data-cart-action="quantity" ' +

                    'data-cart-item-id="' +
                        id +
                    '"' +

                    'value="' +
                        quantity +
                    '" ' +

                    'min="1" ' +

                    'step="1" ' +

                    'inputmode="numeric"' +

                '>' +


                '<button ' +

                    'type="button" ' +

                    'class="online-cart-quantity-button online-cart-increase" ' +

                    'data-cart-action="increase" ' +

                    'data-cart-item-id="' +
                        id +
                    '"' +

                    'aria-label="Increase quantity"' +

                '>+</button>' +

            '</div>' +


            '<div class="online-cart-item-total">' +

                '<span>Kit Total</span>' +

                '<strong>' +

                    formatNexpakOnlineCartMoney(
                        lineTotal
                    ) +

                '</strong>' +

            '</div>' +


            '<button ' +

                'type="button" ' +

                'class="online-cart-remove-button" ' +

                'data-cart-action="remove" ' +

                'data-cart-item-id="' +
                    id +
                '"' +

            '>' +

                'Remove' +

            '</button>' +


        '</article>'

    );

}


/* =====================================================
   52. FIND CART CONTAINER
   ===================================================== */

function findNexpakOnlineCartContainer() {

    const selectors = [

        "#onlineCart",

        "#online-cart",

        "#cartContainer",

        ".online-cart-container",

        ".online-cart-items",

        "[data-online-cart]"

    ];


    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        const element =
            document.querySelector(
                selectors[i]
            );


        if (element) {

            return element;

        }

    }


    return null;

}


/* =====================================================
   53. RENDER CART ITEMS
   ===================================================== */

function renderNexpakOnlineCartItems(
    container = null
) {

    if (!container) {

        container =
            findNexpakOnlineCartContainer();

    }


    if (!container) {

        return false;

    }


    if (
        !nexpakOnlineCart.length
    ) {

        container.innerHTML =

            '<div class="online-cart-empty">' +

                '<h3>Your cart is empty</h3>' +

                '<p>' +

                    'Select a NEXPAK security kit to get started.' +

                '</p>' +

            '</div>';


        return true;

    }


    let html = "";


    nexpakOnlineCart.forEach(

        (item, index) => {

            html +=
                renderNexpakOnlineCartItem(
                    item,
                    index
                );

        }

    );


    container.innerHTML =
        html;


    return true;

}


/* =====================================================
   54. RENDER CART TOTALS
   ===================================================== */

function renderNexpakOnlineCartTotals(
    container = null,
    deliveryFee = 0
) {

    if (!container) {

        const selectors = [

            "#onlineCartTotals",

            "#cartTotals",

            ".online-cart-totals",

            "[data-online-cart-totals]"

        ];


        for (
            let i = 0;
            i < selectors.length;
            i++
        ) {

            container =
                document.querySelector(
                    selectors[i]
                );


            if (container) {

                break;

            }

        }

    }


    if (!container) {

        return false;

    }


    const totals =
        getNexpakOnlineCartTotals(
            deliveryFee
        );


    container.innerHTML =

        '<div class="online-cart-summary-row">' +

            '<span>Subtotal EX VAT</span>' +

            '<strong>' +

                formatNexpakOnlineCartMoney(
                    totals.subtotalExVat
                ) +

            '</strong>' +

        '</div>' +


        '<div class="online-cart-summary-row">' +

            '<span>VAT (' +

                totals.vatPercent +

                '%)' +

            '</span>' +

            '<strong>' +

                formatNexpakOnlineCartMoney(
                    totals.vatAmount
                ) +

            '</strong>' +

        '</div>' +


        '<div class="online-cart-summary-row">' +

            '<span>Total INCL VAT</span>' +

            '<strong>' +

                formatNexpakOnlineCartMoney(
                    totals.totalInclVat
                ) +

            '</strong>' +

        '</div>' +


        '<div class="online-cart-summary-row online-cart-delivery-row">' +

            '<span>Delivery</span>' +

            '<strong>' +

                formatNexpakOnlineCartMoney(
                    totals.deliveryFee
                ) +

            '</strong>' +

        '</div>' +


        '<div class="online-cart-summary-row online-cart-grand-total">' +

            '<span>Order Total</span>' +

            '<strong>' +

                formatNexpakOnlineCartMoney(
                    totals.grandTotal
                ) +

            '</strong>' +

        '</div>';


    return true;

}


/* =====================================================
   55. RENDER COMPLETE CART
   ===================================================== */

function renderNexpakOnlineCart(
    options = {}
) {

    const itemContainer =
        options.itemsContainer ||
        null;


    const totalsContainer =
        options.totalsContainer ||
        null;


    const deliveryFee =
        Math.max(
            0,
            safeCartNumber(
                options.deliveryFee,
                0
            )
        );


    renderNexpakOnlineCartItems(
        itemContainer
    );


    renderNexpakOnlineCartTotals(
        totalsContainer,
        deliveryFee
    );


    updateNexpakOnlineCartCountDisplay();


    return {

        success: true,

        itemCount:
            getNexpakOnlineCartCount(),

        kitCount:
            getNexpakOnlineCartKitCount(),

        weight:
            getNexpakOnlineCartWeight(),

        totals:
            getNexpakOnlineCartTotals(
                deliveryFee
            )

    };

}


/* =====================================================
   56. UPDATE PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.renderItem =
        renderNexpakOnlineCartItem;


    window.NEXPAK_ONLINE_CART.renderItems =
        renderNexpakOnlineCartItems;


    window.NEXPAK_ONLINE_CART.renderTotals =
        renderNexpakOnlineCartTotals;


    window.NEXPAK_ONLINE_CART.render =
        renderNexpakOnlineCart;

}


/* =====================================================
   PART 5 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 6 — CART UI EVENTS + BUTTON BINDING
   ========================================================= */


/* =====================================================
   57. GET CART ITEM FROM EVENT TARGET
   ===================================================== */

function getNexpakOnlineCartItemFromElement(
    element
) {

    if (!element) {

        return null;

    }


    const itemId =
        element.getAttribute(
            "data-cart-item-id"
        );


    if (!itemId) {

        return null;

    }


    const index =
        findNexpakOnlineCartItemIndex(
            itemId
        );


    if (index === -1) {

        return null;

    }


    return {

        item:
            nexpakOnlineCart[index],

        index:
            index

    };

}


/* =====================================================
   58. HANDLE CART ACTION
   ===================================================== */

function handleNexpakOnlineCartAction(
    action,
    element
) {

    const cartItem =
        getNexpakOnlineCartItemFromElement(
            element
        );


    /*
     * Clear cart does not require
     * an individual cart item.
     */

    if (
        action === "clear"
    ) {

        return clearNexpakOnlineCart();

    }


    if (!cartItem) {

        console.warn(
            "NEXPAK Online Cart: Could not locate cart item."
        );


        return {

            success: false,

            message:
                "Cart item not found."

        };

    }


    const item =
        cartItem.item;


    const itemId =
        item.id;


    /* -------------------------------------------------
       Increase
       ------------------------------------------------- */

    if (
        action === "increase"
    ) {

        return increaseNexpakOnlineKitQuantity(
            itemId
        );

    }


    /* -------------------------------------------------
       Decrease
       ------------------------------------------------- */

    if (
        action === "decrease"
    ) {

        return decreaseNexpakOnlineKitQuantity(
            itemId
        );

    }


    /* -------------------------------------------------
       Remove
       ------------------------------------------------- */

    if (
        action === "remove"
    ) {

        return removeNexpakOnlineKitFromCart(
            itemId
        );

    }


    /* -------------------------------------------------
       Direct quantity
       ------------------------------------------------- */

    if (
        action === "quantity"
    ) {

        const quantity =
            element.value;


        return setNexpakOnlineKitQuantity(
            itemId,
            quantity
        );

    }


    return {

        success: false,

        message:
            "Unknown cart action."

    };

}


/* =====================================================
   59. CART CLICK HANDLER
   ===================================================== */

function handleNexpakOnlineCartClick(
    event
) {

    const target =
        event.target;


    if (!target) {

        return;

    }


    const actionElement =
        target.closest(
            "[data-cart-action]"
        );


    if (!actionElement) {

        return;

    }


    const action =
        actionElement.getAttribute(
            "data-cart-action"
        );


    if (!action) {

        return;

    }


    /*
     * Quantity inputs are handled separately.
     */

    if (
        action === "quantity"
    ) {

        return;

    }


    event.preventDefault();


    const result =
        handleNexpakOnlineCartAction(
            action,
            actionElement
        );


    if (
        result &&
        result.success
    ) {

        renderNexpakOnlineCart();

    }

}


/* =====================================================
   60. CART CHANGE HANDLER
   ===================================================== */

function handleNexpakOnlineCartChange(
    event
) {

    const target =
        event.target;


    if (!target) {

        return;

    }


    const action =
        target.getAttribute(
            "data-cart-action"
        );


    if (
        action !== "quantity"
    ) {

        return;

    }


    event.preventDefault();


    const result =
        handleNexpakOnlineCartAction(
            "quantity",
            target
        );


    if (
        result &&
        result.success
    ) {

        renderNexpakOnlineCart();

    }

}


/* =====================================================
   61. CART KEYBOARD HANDLER
   ===================================================== */

function handleNexpakOnlineCartKeydown(
    event
) {

    const target =
        event.target;


    if (!target) {

        return;

    }


    const action =
        target.getAttribute(
            "data-cart-action"
        );


    if (
        action !== "quantity"
    ) {

        return;

    }


    /*
     * Allow Enter to commit the quantity.
     */

    if (
        event.key === "Enter"
    ) {

        event.preventDefault();


        target.blur();

    }

}


/* =====================================================
   62. BIND CART EVENTS
   ===================================================== */

function bindNexpakOnlineCartEvents() {

    /*
     * Remove previous handlers first.
     *
     * This prevents duplicate events if the
     * cart is initialised more than once.
     */

    document.removeEventListener(
        "click",
        handleNexpakOnlineCartClick
    );


    document.removeEventListener(
        "change",
        handleNexpakOnlineCartChange
    );


    document.removeEventListener(
        "keydown",
        handleNexpakOnlineCartKeydown
    );


    document.addEventListener(
        "click",
        handleNexpakOnlineCartClick
    );


    document.addEventListener(
        "change",
        handleNexpakOnlineCartChange
    );


    document.addEventListener(
        "keydown",
        handleNexpakOnlineCartKeydown
    );


    return true;

}


/* =====================================================
   63. BIND CLEAR CART BUTTONS
   ===================================================== */

function bindNexpakOnlineClearCartButtons() {

    const selectors = [

        "[data-cart-action=\"clear\"]",

        "#clearOnlineCart",

        "#clearCart",

        ".online-clear-cart",

        ".clear-online-cart"

    ];


    selectors.forEach(

        selector => {

            document
                .querySelectorAll(selector)
                .forEach(

                    button => {

                        /*
                         * Avoid adding duplicate
                         * listeners to the same button.
                         */

                        if (
                            button.dataset
                                .nexpakCartBound ===
                            "true"
                        ) {

                            return;

                        }


                        button.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();


                                clearNexpakOnlineCart();


                                renderNexpakOnlineCart();

                            }
                        );


                        button.dataset
                            .nexpakCartBound =
                            "true";

                    }

                );

        }

    );


    return true;

}


/* =====================================================
   64. CART INITIAL RENDER
   ===================================================== */

function initialiseNexpakOnlineCartUI() {

    /*
     * Load the cart before rendering.
     */

    loadNexpakOnlineCart();


    /*
     * Bind controls.
     */

    bindNexpakOnlineCartEvents();


    bindNexpakOnlineClearCartButtons();


    /*
     * Update badge immediately.
     */

    updateNexpakOnlineCartCountDisplay();


    /*
     * Render only when a recognised
     * cart container exists.
     */

    if (
        findNexpakOnlineCartContainer()
    ) {

        renderNexpakOnlineCart();

    }


    return true;

}


/* =====================================================
   65. CART UPDATED LISTENER
   ===================================================== */

document.addEventListener(

    "nexpak:cart-updated",

    function () {

        updateNexpakOnlineCartCountDisplay();


        /*
         * Re-render only if the cart
         * is actually present on the page.
         */

        if (
            findNexpakOnlineCartContainer()
        ) {

            renderNexpakOnlineCart();

        }

    }

);


/* =====================================================
   66. UPDATE PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.handleAction =
        handleNexpakOnlineCartAction;


    window.NEXPAK_ONLINE_CART.bind =
        bindNexpakOnlineCartEvents;


    window.NEXPAK_ONLINE_CART.initialise =
        initialiseNexpakOnlineCartUI;

}


/* =====================================================
   PART 6 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 7 — ADD TO CART UI BRIDGE
   ========================================================= */


/* =====================================================
   67. READ QUANTITY FROM ELEMENT
   ===================================================== */

function readNexpakOnlineQuantity(
    element,
    fallback = 1
) {

    if (!element) {

        return normaliseCartQuantity(
            fallback
        );

    }


    const quantitySources = [

        element.getAttribute(
            "data-quantity"
        ),

        element.value,

        element.getAttribute(
            "data-kit-quantity"
        )

    ];


    for (
        let i = 0;
        i < quantitySources.length;
        i++
    ) {

        const value =
            safeCartInteger(
                quantitySources[i],
                NaN
            );


        if (
            Number.isFinite(value) &&
            value > 0
        ) {

            return normaliseCartQuantity(
                value
            );

        }

    }


    return normaliseCartQuantity(
        fallback
    );

}


/* =====================================================
   68. READ KIT ID FROM ELEMENT
   ===================================================== */

function readNexpakOnlineKitId(
    element
) {

    if (!element) {

        return "";

    }


    const sources = [

        element.getAttribute(
            "data-kit-id"
        ),

        element.getAttribute(
            "data-kit"
        ),

        element.getAttribute(
            "data-product-id"
        ),

        element.getAttribute(
            "data-id"
        )

    ];


    for (
        let i = 0;
        i < sources.length;
        i++
    ) {

        if (
            sources[i] !== null &&
            String(
                sources[i]
            ).trim()
        ) {

            return String(
                sources[i]
            ).trim();

        }

    }


    return "";

}


/* =====================================================
   69. READ SELECTED KIT OPTIONS
   ===================================================== */

function readNexpakOnlineKitOptions(
    source
) {

    const options = {};


    if (!source) {

        return options;

    }


    /*
     * Read explicit JSON options when
     * supplied by the kit button.
     */

    const jsonOptions =
        source.getAttribute(
            "data-kit-options"
        );


    if (jsonOptions) {

        try {

            const parsed =
                JSON.parse(
                    jsonOptions
                );


            if (
                parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
            ) {

                Object.assign(
                    options,
                    parsed
                );

            }

        } catch (error) {

            console.warn(
                "NEXPAK Online Cart: Invalid data-kit-options.",
                error
            );

        }

    }


    /*
     * Read common selector values from
     * the kit card/container.
     */

    const container =
        source.closest(
            "[data-kit-card], " +
            ".online-kit-card, " +
            ".online-product-card, " +
            ".kit-card"
        ) ||
        source.parentElement;


    if (container) {

        const optionInputs =
            container.querySelectorAll(
                "[data-kit-option]"
            );


        optionInputs.forEach(

            input => {

                const key =
                    input.getAttribute(
                        "data-kit-option"
                    );


                if (!key) {

                    return;

                }


                let value = "";


                if (
                    input.type ===
                    "radio"
                ) {

                    if (
                        !input.checked
                    ) {

                        return;

                    }


                    value =
                        input.value;

                }

                else if (
                    input.type ===
                    "checkbox"
                ) {

                    value =
                        input.checked
                            ? (
                                input.value ||
                                true
                            )
                            : false;

                }

                else {

                    value =
                        input.value;

                }


                if (
                    value !== "" &&
                    value !== null &&
                    value !== undefined
                ) {

                    options[key] =
                        value;

                }

            }

        );

    }


    /*
     * Support common data attributes
     * for colour/profile selectors.
     */

    const colour =
        source.getAttribute(
            "data-colour"
        );


    if (
        colour &&
        !options.colour
    ) {

        options.colour =
            colour;

    }


    const color =
        source.getAttribute(
            "data-color"
        );


    if (
        color &&
        !options.color
    ) {

        options.color =
            color;

    }


    const profile =
        source.getAttribute(
            "data-profile"
        );


    if (
        profile &&
        !options.profile
    ) {

        options.profile =
            profile;

    }


    return options;

}


/* =====================================================
   70. SHOW CART ADD FEEDBACK
   ===================================================== */

function showNexpakOnlineCartAddFeedback(
    message = "Kit added to cart."
) {

    /*
     * Prefer an existing store notification
     * element if the page has one.
     */

    const selectors = [

        "#onlineCartMessage",

        "#cartMessage",

        ".online-cart-message",

        ".online-store-message",

        "[data-online-cart-message]"

    ];


    let messageElement = null;


    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        messageElement =
            document.querySelector(
                selectors[i]
            );


        if (messageElement) {

            break;

        }

    }


    if (messageElement) {

        messageElement.textContent =
            message;


        messageElement.classList.add(
            "is-visible"
        );


        window.setTimeout(

            function () {

                messageElement.classList.remove(
                    "is-visible"
                );

            },

            3000

        );


        return;

    }


    /*
     * Deliberately do NOT use alert().
     *
     * The old Add to Cart problem included
     * intrusive popup behaviour.
     */

    console.log(
        "NEXPAK Online Store:",
        message
    );

}


/* =====================================================
   71. HANDLE ADD TO CART CLICK
   ===================================================== */

function handleNexpakOnlineAddToCartClick(
    event
) {

    const target =
        event.target;


    if (!target) {

        return;

    }


    const button =
        target.closest(
            "[data-online-add-to-cart], " +
            "[data-add-to-cart], " +
            ".online-add-to-cart, " +
            ".add-to-cart"
        );


    if (!button) {

        return;

    }


    /*
     * Only handle buttons that belong to
     * the Online Store.
     */

    const kitId =
        readNexpakOnlineKitId(
            button
        );


    if (!kitId) {

        /*
         * Do not interfere with unrelated
         * buttons elsewhere on the website.
         */

        return;

    }


    event.preventDefault();


    const quantity =
        readNexpakOnlineQuantity(
            button,
            1
        );


    const options =
        readNexpakOnlineKitOptions(
            button
        );


    const result =
        addNexpakOnlineKitById(
            kitId,
            quantity,
            options
        );


    if (
        result &&
        result.success
    ) {

        showNexpakOnlineCartAddFeedback(
            "Kit added to cart."
        );


        updateNexpakOnlineCartCountDisplay();


        /*
         * Allow the existing Online Store
         * UI to respond to the successful add.
         */

        document.dispatchEvent(

            new CustomEvent(
                "nexpak:kit-added",
                {

                    detail: result

                }

            )

        );

    }

    else {

        console.error(
            "NEXPAK Online Store: Add to Cart failed.",
            result
        );


        showNexpakOnlineCartAddFeedback(
            (
                result &&
                result.message
            )
                ? result.message
                : "Unable to add kit to cart."
        );

    }

}


/* =====================================================
   72. BIND ADD TO CART EVENTS
   ===================================================== */

function bindNexpakOnlineAddToCartEvents() {

    document.removeEventListener(
        "click",
        handleNexpakOnlineAddToCartClick
    );


    document.addEventListener(
        "click",
        handleNexpakOnlineAddToCartClick
    );


    return true;

}


/* =====================================================
   73. KIT ADDED EVENT
   ===================================================== */

document.addEventListener(

    "nexpak:kit-added",

    function (event) {

        if (
            !event ||
            !event.detail
        ) {

            return;

        }


        /*
         * Update the cart badge immediately.
         */

        updateNexpakOnlineCartCountDisplay();


        /*
         * If a cart container is visible,
         * refresh it.
         */

        if (
            findNexpakOnlineCartContainer()
        ) {

            renderNexpakOnlineCart();

        }

    }

);


/* =====================================================
   74. EXTEND PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.readKitId =
        readNexpakOnlineKitId;


    window.NEXPAK_ONLINE_CART.readQuantity =
        readNexpakOnlineQuantity;


    window.NEXPAK_ONLINE_CART.readOptions =
        readNexpakOnlineKitOptions;


    window.NEXPAK_ONLINE_CART.addFeedback =
        showNexpakOnlineCartAddFeedback;


    window.NEXPAK_ONLINE_CART.bindAddToCart =
        bindNexpakOnlineAddToCartEvents;

}


/* =====================================================
   PART 7 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CART ENGINE
   PART 8 — INITIALISATION + COMPATIBILITY
   ========================================================= */


/* =====================================================
   75. CART READY STATE
   ===================================================== */

let nexpakOnlineCartInitialised = false;


/* =====================================================
   76. CHECK DOM READY
   ===================================================== */

function isNexpakOnlineCartDomReady() {

    return (
        document.readyState ===
        "interactive" ||

        document.readyState ===
        "complete"
    );

}


/* =====================================================
   77. INITIALISE CART ENGINE
   ===================================================== */

function initialiseNexpakOnlineCartEngine() {

    if (
        nexpakOnlineCartInitialised
    ) {

        return true;

    }


    /*
     * Load existing cart first.
     */

    loadNexpakOnlineCart();


    /*
     * Bind cart controls.
     */

    bindNexpakOnlineCartEvents();


    /*
     * Bind Add to Cart buttons.
     */

    bindNexpakOnlineAddToCartEvents();


    /*
     * Bind Clear Cart buttons.
     */

    bindNexpakOnlineClearCartButtons();


    /*
     * Update cart badge.
     */

    updateNexpakOnlineCartCountDisplay();


    /*
     * Render cart if a cart container
     * exists on the current page.
     */

    if (
        findNexpakOnlineCartContainer()
    ) {

        renderNexpakOnlineCart();

    }


    nexpakOnlineCartInitialised =
        true;


    /*
     * Tell the rest of the Online Store
     * that the cart engine is ready.
     */

    try {

        document.dispatchEvent(

            new CustomEvent(
                "nexpak:cart-ready",
                {

                    detail: {

                        cart:
                            nexpakOnlineCart,

                        count:
                            getNexpakOnlineCartCount(),

                        kitCount:
                            getNexpakOnlineCartKitCount(),

                        weight:
                            getNexpakOnlineCartWeight()

                    }

                }

            )

        );

    } catch (error) {

        console.warn(
            "NEXPAK Online Cart: Ready event failed.",
            error
        );

    }


    return true;

}


/* =====================================================
   78. SAFE INITIALISATION
   ===================================================== */

function startNexpakOnlineCartEngine() {

    if (
        isNexpakOnlineCartDomReady()
    ) {

        initialiseNexpakOnlineCartEngine();

        return;

    }


    document.addEventListener(

        "DOMContentLoaded",

        function () {

            initialiseNexpakOnlineCartEngine();

        },

        {
            once: true
        }

    );

}


/* =====================================================
   79. PUBLIC CART STATE
   ===================================================== */

function getNexpakOnlineCartState() {

    return {

        initialised:
            nexpakOnlineCartInitialised,

        items:
            nexpakOnlineCart,

        itemCount:
            getNexpakOnlineCartCount(),

        kitCount:
            getNexpakOnlineCartKitCount(),

        totalKitQuantity:
            calculateNexpakOnlineTotalKitQuantity(),

        weight:
            getNexpakOnlineCartWeight(),

        totals:
            getNexpakOnlineCartTotals()

    };

}


/* =====================================================
   80. CHECK CART EMPTY
   ===================================================== */

function isNexpakOnlineCartEmpty() {

    return (
        nexpakOnlineCart.length === 0
    );

}


/* =====================================================
   81. GET CART ITEM
   ===================================================== */

function getNexpakOnlineCartItem(
    itemId,
    options = null
) {

    const index =
        findNexpakOnlineCartItemIndex(
            itemId,
            options
        );


    if (index === -1) {

        return null;

    }


    return nexpakOnlineCart[index];

}


/* =====================================================
   82. REFRESH CART
   ===================================================== */

function refreshNexpakOnlineCart() {

    updateNexpakOnlineCartCountDisplay();


    if (
        findNexpakOnlineCartContainer()
    ) {

        renderNexpakOnlineCart();

    }


    return true;

}


/* =====================================================
   83. UPDATE PUBLIC CART API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CART
) {

    window.NEXPAK_ONLINE_CART.initialiseEngine =
        initialiseNexpakOnlineCartEngine;


    window.NEXPAK_ONLINE_CART.start =
        startNexpakOnlineCartEngine;


    window.NEXPAK_ONLINE_CART.getState =
        getNexpakOnlineCartState;


    window.NEXPAK_ONLINE_CART.isEmpty =
        isNexpakOnlineCartEmpty;


    window.NEXPAK_ONLINE_CART.getItem =
        getNexpakOnlineCartItem;


    window.NEXPAK_ONLINE_CART.refresh =
        refreshNexpakOnlineCart;

}


/* =====================================================
   84. AUTOMATIC START
   ===================================================== */

startNexpakOnlineCartEngine();


/* =====================================================
   85. GLOBAL COMPATIBILITY ALIASES
   ===================================================== */

window.loadNexpakOnlineCart =
    loadNexpakOnlineCart;


window.saveNexpakOnlineCart =
    saveNexpakOnlineCart;


window.addNexpakOnlineKitToCart =
    addNexpakOnlineKitToCart;


window.addNexpakOnlineKitById =
    addNexpakOnlineKitById;


window.removeNexpakOnlineKitFromCart =
    removeNexpakOnlineKitFromCart;


window.clearNexpakOnlineCart =
    clearNexpakOnlineCart;


window.getNexpakOnlineCartCount =
    getNexpakOnlineCartCount;


window.getNexpakOnlineCartWeight =
    getNexpakOnlineCartWeight;


window.getNexpakOnlineCartTotals =
    getNexpakOnlineCartTotals;


/* =====================================================
   86. FINAL CART ENGINE STATUS
   ===================================================== */

console.log(
    "NEXPAK Online Store: Cart engine loaded."
);


/* =====================================================
   PART 8 END
   ===================================================== */


/* =========================================================
   END OF NEXPAK ONLINE CART ENGINE
   ========================================================= */

})();
 
