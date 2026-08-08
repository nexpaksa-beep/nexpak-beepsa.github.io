/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 1/8
 Purpose:
 Core cart foundation, storage, state management,
 product lookup, validation and cart API.
=========================================================*/

(function () {

    "use strict";

    /*=====================================================
      CART ENGINE CONFIGURATION
    =====================================================*/

    const NEXPAK_ONLINE_CART = {

        VERSION: "1.0.0",

        STORAGE_KEY: "nexpak_online_cart_v1",

        CURRENCY: "ZAR",

        DEFAULT_QUANTITY: 1,

        MIN_QUANTITY: 1,

        MAX_QUANTITY: 999,

        DEBUG: false

    };


    /*=====================================================
      INTERNAL CART STATE
    =====================================================*/

    let cart = [];


    /*=====================================================
      DEBUG LOGGER
    =====================================================*/

    function log() {

        if (!NEXPAK_ONLINE_CART.DEBUG) {
            return;
        }

        console.log(
            "[NEXPAK ONLINE CART]",
            ...arguments
        );

    }


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(value, fallback) {

        const number = Number(value);

        if (!Number.isFinite(number)) {
            return fallback || 0;
        }

        return number;

    }


    /*=====================================================
      NORMALISE QUANTITY
    =====================================================*/

    function normalizeQuantity(quantity) {

        quantity = Math.floor(
            safeNumber(
                quantity,
                NEXPAK_ONLINE_CART.DEFAULT_QUANTITY
            )
        );

        if (
            quantity <
            NEXPAK_ONLINE_CART.MIN_QUANTITY
        ) {
            quantity =
                NEXPAK_ONLINE_CART.MIN_QUANTITY;
        }

        if (
            quantity >
            NEXPAK_ONLINE_CART.MAX_QUANTITY
        ) {
            quantity =
                NEXPAK_ONLINE_CART.MAX_QUANTITY;
        }

        return quantity;

    }


    /*=====================================================
      NORMALISE PRODUCT ID
    =====================================================*/

    function normalizeProductId(productId) {

        if (
            productId === null ||
            productId === undefined
        ) {
            return "";
        }

        return String(productId).trim();

    }


    /*=====================================================
      FIND PRODUCT IN ONLINE DATABASE
    =====================================================*/

    function findProduct(productId) {

        productId = normalizeProductId(productId);

        if (!productId) {
            return null;
        }


        /*
         * The completed online-data.js may expose the
         * product database under different public names.
         * We check the common NEXPAK data structures first.
         */

        const possibleSources = [

            window.NEXPAK_ONLINE_PRODUCTS,

            window.onlineProducts,

            window.ONLINE_PRODUCTS,

            window.nexpakProducts,

            window.products,

            window.PRODUCTS

        ];


        for (let i = 0; i < possibleSources.length; i++) {

            const source = possibleSources[i];

            if (!source) {
                continue;
            }


            /*---------------------------------------------
              ARRAY DATABASE
            ---------------------------------------------*/

            if (Array.isArray(source)) {

                const product = source.find(function (item) {

                    if (!item) {
                        return false;
                    }

                    const id =
                        item.id ??
                        item.productId ??
                        item.productID ??
                        item.sku ??
                        item.code;

                    return (
                        normalizeProductId(id) ===
                        productId
                    );

                });

                if (product) {
                    return product;
                }

            }


            /*---------------------------------------------
              OBJECT DATABASE
            ---------------------------------------------*/

            if (
                typeof source === "object" &&
                !Array.isArray(source)
            ) {

                if (source[productId]) {
                    return source[productId];
                }


                const values =
                    Object.values(source);

                const product =
                    values.find(function (item) {

                        if (!item) {
                            return false;
                        }

                        const id =
                            item.id ??
                            item.productId ??
                            item.productID ??
                            item.sku ??
                            item.code;

                        return (
                            normalizeProductId(id) ===
                            productId
                        );

                    });

                if (product) {
                    return product;
                }

            }

        }


        /*---------------------------------------------
          OPTIONAL DATABASE FUNCTION
        ---------------------------------------------*/

        if (
            typeof window.getOnlineProduct ===
            "function"
        ) {

            try {

                const product =
                    window.getOnlineProduct(productId);

                if (product) {
                    return product;
                }

            } catch (error) {

                log(
                    "getOnlineProduct() error:",
                    error
                );

            }

        }


        return null;

    }


    /*=====================================================
      PRODUCT ID EXTRACTION
    =====================================================*/

    function getProductId(product) {

        if (!product) {
            return "";
        }

        return normalizeProductId(

            product.id ??
            product.productId ??
            product.productID ??
            product.sku ??
            product.code

        );

    }


    /*=====================================================
      PRODUCT NAME EXTRACTION
    =====================================================*/

    function getProductName(product) {

        if (!product) {
            return "NEXPAK Product";
        }

        return String(

            product.name ??
            product.title ??
            product.productName ??
            "NEXPAK Product"

        ).trim();

    }


    /*=====================================================
      PRODUCT PRICE EXTRACTION
    =====================================================*/

    function getProductPrice(product) {

        if (!product) {
            return 0;
        }


        const possiblePrices = [

            product.price,

            product.salePrice,

            product.sellingPrice,

            product.unitPrice,

            product.amount

        ];


        for (
            let i = 0;
            i < possiblePrices.length;
            i++
        ) {

            const price =
                Number(possiblePrices[i]);

            if (
                Number.isFinite(price) &&
                price >= 0
            ) {
                return price;
            }

        }


        return 0;

    }


    /*=====================================================
      PRODUCT IMAGE EXTRACTION
    =====================================================*/

    function getProductImage(product) {

        if (!product) {
            return "";
        }

        return String(

            product.image ??
            product.imageUrl ??
            product.imageURL ??
            product.thumbnail ??
            product.photo ??
            ""

        ).trim();

    }


    /*=====================================================
      CREATE CART ITEM
    =====================================================*/

    function createCartItem(product, quantity) {

        if (!product) {
            return null;
        }


        const productId =
            getProductId(product);


        if (!productId) {
            return null;
        }


        return {

            id: productId,

            name: getProductName(product),

            price: getProductPrice(product),

            image: getProductImage(product),

            quantity:
                normalizeQuantity(quantity),

            addedAt:
                Date.now()

        };

    }


    /*=====================================================
      VALIDATE CART ITEM
    =====================================================*/

    function isValidCartItem(item) {

        if (!item) {
            return false;
        }


        if (
            !normalizeProductId(item.id)
        ) {
            return false;
        }


        if (
            typeof item.name !== "string"
        ) {
            return false;
        }


        if (
            !Number.isFinite(
                Number(item.price)
            )
        ) {
            return false;
        }


        if (
            !Number.isFinite(
                Number(item.quantity)
            )
        ) {
            return false;
        }


        return true;

    }


    /*=====================================================
      CLEAN CART
    =====================================================*/

    function sanitizeCart(items) {

        if (!Array.isArray(items)) {
            return [];
        }


        const cleaned = [];


        items.forEach(function (item) {

            if (!isValidCartItem(item)) {
                return;
            }


            const cleanItem = {

                id:
                    normalizeProductId(item.id),

                name:
                    String(item.name).trim(),

                price:
                    Math.max(
                        0,
                        safeNumber(item.price, 0)
                    ),

                image:
                    typeof item.image === "string"
                        ? item.image
                        : "",

                quantity:
                    normalizeQuantity(item.quantity),

                addedAt:
                    safeNumber(
                        item.addedAt,
                        Date.now()
                    )

            };


            cleaned.push(cleanItem);

        });


        return cleaned;

    }


    /*=====================================================
      SAVE CART TO LOCAL STORAGE
    =====================================================*/

    function saveCart() {

        try {

            localStorage.setItem(

                NEXPAK_ONLINE_CART.STORAGE_KEY,

                JSON.stringify(cart)

            );

            log("Cart saved:", cart);

            return true;

        } catch (error) {

            console.error(
                "[NEXPAK ONLINE CART] Unable to save cart:",
                error
            );

            return false;

        }

    }


    /*=====================================================
      LOAD CART FROM LOCAL STORAGE
    =====================================================*/

    function loadCart() {

        try {

            const stored =
                localStorage.getItem(
                    NEXPAK_ONLINE_CART.STORAGE_KEY
                );


            if (!stored) {

                cart = [];

                return cart;

            }


            const parsed =
                JSON.parse(stored);


            cart =
                sanitizeCart(parsed);


            log(
                "Cart loaded:",
                cart
            );


            return cart;

        } catch (error) {

            console.error(
                "[NEXPAK ONLINE CART] Unable to load cart:",
                error
            );


            cart = [];


            return cart;

        }

    }


    /*=====================================================
      GET CART
    =====================================================*/

    function getCart() {

        return cart.map(function (item) {

            return {
                ...item
            };

        });

    }


    /*=====================================================
      GET CART ITEM
    =====================================================*/

    function getCartItem(productId) {

        productId =
            normalizeProductId(productId);


        return cart.find(function (item) {

            return (
                item.id === productId
            );

        }) || null;

    }


    /*=====================================================
      CART ITEM COUNT
    =====================================================*/

    function getItemCount() {

        return cart.reduce(

            function (total, item) {

                return (
                    total +
                    normalizeQuantity(
                        item.quantity
                    )
                );

            },

            0

        );

    }


    /*=====================================================
      CART SUBTOTAL
    =====================================================*/

    function getSubtotal() {

        return cart.reduce(

            function (total, item) {

                const price =
                    Math.max(
                        0,
                        safeNumber(
                            item.price,
                            0
                        )
                    );

                const quantity =
                    normalizeQuantity(
                        item.quantity
                    );


                return (
                    total +
                    (price * quantity)
                );

            },

            0

        );

    }


    /*=====================================================
      INITIALISE CART ENGINE
    =====================================================*/

    function init() {

        loadCart();

        log(
            "Cart engine initialized.",
            NEXPAK_ONLINE_CART.VERSION
        );

    }


    /*=====================================================
      PUBLIC CART API
    =====================================================*/

    window.NEXPAKOnlineCart = {

        version:
            NEXPAK_ONLINE_CART.VERSION,

        init:

            init,

        load:

            loadCart,

        save:

            saveCart,

        get:

            getCart,

        getItem:

            getCartItem,

        findProduct:

            findProduct,

        getProductId:

            getProductId,

        getProductName:

            getProductName,

        getProductPrice:

            getProductPrice,

        getProductImage:

            getProductImage,

        getItemCount:

            getItemCount,

        getSubtotal:

            getSubtotal,

        normalizeQuantity:

            normalizeQuantity

    };


    /*=====================================================
      AUTO INITIALISE
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 2/8
 Purpose:
 Cart operations — add, remove, update, increment,
 decrement and clear.
=========================================================*/


/*=========================================================
 CART OPERATION HELPERS
=========================================================*/

(function () {

    "use strict";


    /*-----------------------------------------------------
      MAKE SURE CART API EXISTS
    -----------------------------------------------------*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Part 1 must load first."
        );

        return;

    }


    /*-----------------------------------------------------
      INTERNAL REFERENCES
    -----------------------------------------------------*/

    const Cart =
        window.NEXPAKOnlineCart;


    const STORAGE_KEY =
        "nexpak_online_cart_v1";


    const MIN_QUANTITY =
        1;


    const MAX_QUANTITY =
        999;


    /*=====================================================
      NORMALISE PRODUCT ID
    =====================================================*/

    function normalizeId(productId) {

        if (
            productId === null ||
            productId === undefined
        ) {

            return "";

        }


        return String(productId).trim();

    }


    /*=====================================================
      NORMALISE QUANTITY
    =====================================================*/

    function normalizeQuantity(quantity) {

        quantity =
            Math.floor(
                Number(quantity)
            );


        if (!Number.isFinite(quantity)) {

            quantity = MIN_QUANTITY;

        }


        if (quantity < MIN_QUANTITY) {

            quantity = MIN_QUANTITY;

        }


        if (quantity > MAX_QUANTITY) {

            quantity = MAX_QUANTITY;

        }


        return quantity;

    }


    /*=====================================================
      GET INTERNAL CART
    =====================================================*/

    function getInternalCart() {

        return Cart.get();

    }


    /*=====================================================
      WRITE CART
    =====================================================*/

    function writeCart(items) {

        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(items)

            );

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] Cart save failed:",

                error

            );

        }

    }


    /*=====================================================
      READ CART
    =====================================================*/

    function readCart() {

        try {

            const stored =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!stored) {

                return [];

            }


            const parsed =
                JSON.parse(stored);


            if (!Array.isArray(parsed)) {

                return [];

            }


            return parsed;

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] Cart read failed:",

                error

            );


            return [];

        }

    }


    /*=====================================================
      REFRESH CART
    =====================================================*/

    function refreshCart() {

        /*
         * Reloading through Part 1 ensures the public
         * cart state stays synchronized with storage.
         */

        if (
            typeof Cart.load ===
            "function"
        ) {

            return Cart.load();

        }


        return readCart();

    }


    /*=====================================================
      DISPATCH CART EVENT
    =====================================================*/

    function dispatchCartEvent(
        action,
        item,
        extraData
    ) {

        const detail = {

            action:
                action || "",

            item:
                item || null,

            cart:
                Cart.get(),

            itemCount:
                Cart.getItemCount(),

            subtotal:
                Cart.getSubtotal(),

            timestamp:
                Date.now()

        };


        if (
            extraData &&
            typeof extraData === "object"
        ) {

            Object.assign(
                detail,
                extraData
            );

        }


        try {

            window.dispatchEvent(

                new CustomEvent(
                    "nexpak:cart:update",
                    {
                        detail: detail
                    }
                )

            );

        } catch (error) {

            /*
             * Older browsers may not support CustomEvent.
             * The cart itself will still function normally.
             */

            console.warn(
                "[NEXPAK ONLINE CART] Event dispatch failed:",
                error
            );

        }


        /*
         * Also notify any legacy/custom listeners that
         * may be attached to the document.
         */

        try {

            document.dispatchEvent(

                new CustomEvent(
                    "nexpakCartUpdated",
                    {
                        detail: detail
                    }
                )

            );

        } catch (error) {

            console.warn(
                "[NEXPAK ONLINE CART] Legacy event failed:",
                error
            );

        }

    }


    /*=====================================================
      ADD PRODUCT TO CART
    =====================================================*/

    function addProduct(
        productId,
        quantity
    ) {

        productId =
            normalizeId(productId);


        if (!productId) {

            console.warn(
                "[NEXPAK ONLINE CART] Missing product ID."
            );

            return {

                success: false,

                message:
                    "Product ID is required.",

                cart:
                    Cart.get()

            };

        }


        /*
         * Find the product in online-data.js.
         */

        const product =
            Cart.findProduct(productId);


        if (!product) {

            console.warn(

                "[NEXPAK ONLINE CART] Product not found:",

                productId

            );


            return {

                success: false,

                message:
                    "Product could not be found.",

                productId:
                    productId,

                cart:
                    Cart.get()

            };

        }


        quantity =
            normalizeQuantity(
                quantity || 1
            );


        /*
         * Work with the latest cart stored in memory.
         */

        const currentCart =
            getInternalCart();


        /*
         * Check whether product is already in cart.
         */

        const existingIndex =
            currentCart.findIndex(
                function (item) {

                    return (
                        normalizeId(item.id) ===
                        productId
                    );

                }
            );


        let cartItem;


        /*-------------------------------------------------
          EXISTING PRODUCT
        -------------------------------------------------*/

        if (existingIndex !== -1) {

            cartItem =
                currentCart[
                    existingIndex
                ];


            const oldQuantity =
                normalizeQuantity(
                    cartItem.quantity
                );


            cartItem.quantity =
                normalizeQuantity(
                    oldQuantity +
                    quantity
                );


            /*
             * Refresh product information in case the
             * database has been updated.
             */

            cartItem.name =
                Cart.getProductName(
                    product
                );


            cartItem.price =
                Cart.getProductPrice(
                    product
                );


            cartItem.image =
                Cart.getProductImage(
                    product
                );


            currentCart[
                existingIndex
            ] = cartItem;


        }

        /*-------------------------------------------------
          NEW PRODUCT
        -------------------------------------------------*/

        else {

            cartItem = {

                id:
                    Cart.getProductId(
                        product
                    ),

                name:
                    Cart.getProductName(
                        product
                    ),

                price:
                    Cart.getProductPrice(
                        product
                    ),

                image:
                    Cart.getProductImage(
                        product
                    ),

                quantity:
                    quantity,

                addedAt:
                    Date.now()

            };


            currentCart.push(
                cartItem
            );

        }


        /*
         * Save the updated cart.
         */

        writeCart(
            currentCart
        );


        /*
         * Reload Part 1 state.
         */

        refreshCart();


        /*
         * Notify the rest of the store.
         */

        dispatchCartEvent(

            "add",

            cartItem,

            {

                productId:
                    productId,

                quantityAdded:
                    quantity

            }

        );


        return {

            success: true,

            message:
                "Product added to cart.",

            item:
                Cart.getItem(productId),

            cart:
                Cart.get(),

            itemCount:
                Cart.getItemCount(),

            subtotal:
                Cart.getSubtotal()

        };

    }


    /*=====================================================
      REMOVE PRODUCT
    =====================================================*/

    function removeProduct(
        productId
    ) {

        productId =
            normalizeId(productId);


        if (!productId) {

            return {

                success: false,

                message:
                    "Product ID is required.",

                cart:
                    Cart.get()

            };

        }


        const currentCart =
            getInternalCart();


        const index =
            currentCart.findIndex(
                function (item) {

                    return (
                        normalizeId(item.id) ===
                        productId
                    );

                }
            );


        if (index === -1) {

            return {

                success: false,

                message:
                    "Product is not in the cart.",

                productId:
                    productId,

                cart:
                    Cart.get()

            };

        }


        const removedItem =
            currentCart[index];


        currentCart.splice(
            index,
            1
        );


        writeCart(
            currentCart
        );


        refreshCart();


        dispatchCartEvent(

            "remove",

            removedItem,

            {

                productId:
                    productId

            }

        );


        return {

            success: true,

            message:
                "Product removed from cart.",

            item:
                removedItem,

            cart:
                Cart.get(),

            itemCount:
                Cart.getItemCount(),

            subtotal:
                Cart.getSubtotal()

        };

    }


    /*=====================================================
      UPDATE PRODUCT QUANTITY
    =====================================================*/

    function updateQuantity(
        productId,
        quantity
    ) {

        productId =
            normalizeId(productId);


        if (!productId) {

            return {

                success: false,

                message:
                    "Product ID is required."

            };

        }


        quantity =
            normalizeQuantity(
                quantity
            );


        const currentCart =
            getInternalCart();


        const index =
            currentCart.findIndex(
                function (item) {

                    return (
                        normalizeId(item.id) ===
                        productId
                    );

                }
            );


        if (index === -1) {

            return {

                success: false,

                message:
                    "Product is not in the cart.",

                productId:
                    productId

            };

        }


        const item =
            currentCart[index];


        const oldQuantity =
            normalizeQuantity(
                item.quantity
            );


        item.quantity =
            quantity;


        currentCart[index] =
            item;


        writeCart(
            currentCart
        );


        refreshCart();


        dispatchCartEvent(

            "quantity",

            item,

            {

                productId:
                    productId,

                oldQuantity:
                    oldQuantity,

                newQuantity:
                    quantity

            }

        );


        return {

            success: true,

            message:
                "Cart quantity updated.",

            item:
                Cart.getItem(productId),

            oldQuantity:
                oldQuantity,

            newQuantity:
                quantity,

            cart:
                Cart.get(),

            itemCount:
                Cart.getItemCount(),

            subtotal:
                Cart.getSubtotal()

        };

    }


    /*=====================================================
      INCREASE QUANTITY
    =====================================================*/

    function increaseQuantity(
        productId,
        amount
    ) {

        productId =
            normalizeId(productId);


        amount =
            Math.floor(
                Number(amount)
            );


        if (
            !Number.isFinite(amount) ||
            amount < 1
        ) {

            amount = 1;

        }


        const item =
            Cart.getItem(
                productId
            );


        if (!item) {

            return {

                success: false,

                message:
                    "Product is not in the cart.",

                productId:
                    productId

            };

        }


        const newQuantity =
            normalizeQuantity(

                Number(item.quantity) +
                amount

            );


        return updateQuantity(

            productId,

            newQuantity

        );

    }


    /*=====================================================
      DECREASE QUANTITY
    =====================================================*/

    function decreaseQuantity(
        productId,
        amount
    ) {

        productId =
            normalizeId(productId);


        amount =
            Math.floor(
                Number(amount)
            );


        if (
            !Number.isFinite(amount) ||
            amount < 1
        ) {

            amount = 1;

        }


        const item =
            Cart.getItem(
                productId
            );


        if (!item) {

            return {

                success: false,

                message:
                    "Product is not in the cart.",

                productId:
                    productId

            };

        }


        const currentQuantity =
            normalizeQuantity(
                item.quantity
            );


        /*
         * If quantity is 1 and the user decreases it,
         * remove the item instead of allowing quantity 0.
         */

        if (
            currentQuantity -
            amount <
            MIN_QUANTITY
        ) {

            return removeProduct(
                productId
            );

        }


        const newQuantity =
            normalizeQuantity(

                currentQuantity -
                amount

            );


        return updateQuantity(

            productId,

            newQuantity

        );

    }


    /*=====================================================
      CLEAR CART
    =====================================================*/

    function clearCart() {

        const previousCart =
            Cart.get();


        cart = [];


        /*
         * Clear storage.
         */

        try {

            localStorage.removeItem(
                STORAGE_KEY
            );

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] Unable to clear storage:",

                error

            );

        }


        /*
         * Reload empty state.
         */

        refreshCart();


        dispatchCartEvent(

            "clear",

            null,

            {

                previousCart:
                    previousCart

            }

        );


        return {

            success: true,

            message:
                "Cart cleared.",

            cart:
                Cart.get(),

            itemCount:
                Cart.getItemCount(),

            subtotal:
                Cart.getSubtotal()

        };

    }


    /*=====================================================
      CHECK IF PRODUCT IS IN CART
    =====================================================*/

    function hasProduct(
        productId
    ) {

        productId =
            normalizeId(productId);


        if (!productId) {

            return false;

        }


        return !!Cart.getItem(
            productId
        );

    }


    /*=====================================================
      GET PRODUCT QUANTITY
    =====================================================*/

    function getQuantity(
        productId
    ) {

        const item =
            Cart.getItem(
                normalizeId(productId)
            );


        if (!item) {

            return 0;

        }


        return normalizeQuantity(
            item.quantity
        );

    }


    /*=====================================================
      EXTEND PUBLIC CART API
    =====================================================*/

    Cart.add =
        addProduct;


    Cart.remove =
        removeProduct;


    Cart.updateQuantity =
        updateQuantity;


    Cart.increase =
        increaseQuantity;


    Cart.decrease =
        decreaseQuantity;


    Cart.clear =
        clearCart;


    Cart.has =
        hasProduct;


    Cart.getQuantity =
        getQuantity;


    /*=====================================================
      GLOBAL CONVENIENCE FUNCTIONS
    =====================================================*/

    /*
     * These make it easier for online.js and the HTML
     * buttons to interact with the cart.
     */

    window.addToOnlineCart =
        addProduct;


    window.removeFromOnlineCart =
        removeProduct;


    window.updateOnlineCartQuantity =
        updateQuantity;


    window.increaseOnlineCartQuantity =
        increaseQuantity;


    window.decreaseOnlineCartQuantity =
        decreaseQuantity;


    window.clearOnlineCart =
        clearCart;


    /*=====================================================
      CART STORAGE SYNCHRONISATION
    =====================================================*/

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key !==
                STORAGE_KEY
            ) {

                return;

            }


            refreshCart();


            dispatchCartEvent(

                "sync",

                null,

                {

                    source:
                        "storage"

                }

            );

        }
    );


    /*=====================================================
      READY LOG
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 2 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 3/8
 Purpose:
 Cart calculations, line totals, discounts, tax,
 delivery charges, savings and order totals.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-2 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      CONFIGURATION
    =====================================================*/

    const CALCULATION_CONFIG = {

        CURRENCY:
            "ZAR",

        TAX_RATE:
            0,

        DISCOUNT_RATE:
            0,

        FIXED_DISCOUNT:
            0,

        DELIVERY_FEE:
            0,

        FREE_DELIVERY_THRESHOLD:
            0,

        DECIMAL_PLACES:
            2

    };


    /*=====================================================
      INTERNAL STATE
    =====================================================*/

    let calculationSettings = {

        taxRate:
            CALCULATION_CONFIG.TAX_RATE,

        discountRate:
            CALCULATION_CONFIG.DISCOUNT_RATE,

        fixedDiscount:
            CALCULATION_CONFIG.FIXED_DISCOUNT,

        deliveryFee:
            CALCULATION_CONFIG.DELIVERY_FEE,

        freeDeliveryThreshold:
            CALCULATION_CONFIG.FREE_DELIVERY_THRESHOLD

    };


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(
        value,
        fallback
    ) {

        const number =
            Number(value);


        if (
            !Number.isFinite(number)
        ) {

            return (
                fallback || 0
            );

        }


        return number;

    }


    /*=====================================================
      ROUND MONEY
    =====================================================*/

    function roundMoney(
        amount
    ) {

        const factor =
            Math.pow(
                10,
                CALCULATION_CONFIG.DECIMAL_PLACES
            );


        return (
            Math.round(
                (
                    safeNumber(
                        amount,
                        0
                    ) +
                    Number.EPSILON
                ) *
                factor
            ) /
            factor
        );

    }


    /*=====================================================
      FORMAT MONEY
    =====================================================*/

    function formatMoney(
        amount
    ) {

        amount =
            roundMoney(
                amount
            );


        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {

                    style:
                        "currency",

                    currency:
                        CALCULATION_CONFIG.CURRENCY,

                    minimumFractionDigits:
                        2,

                    maximumFractionDigits:
                        2

                }
            ).format(amount);

        } catch (error) {

            return (
                "R " +
                amount.toFixed(2)
            );

        }

    }


    /*=====================================================
      GET CURRENT CART
    =====================================================*/

    function getCurrentCart() {

        if (
            typeof Cart.get ===
            "function"
        ) {

            return Cart.get();

        }


        return [];

    }


    /*=====================================================
      CALCULATE LINE TOTAL
    =====================================================*/

    function calculateLineTotal(
        item
    ) {

        if (!item) {

            return 0;

        }


        const price =
            Math.max(
                0,
                safeNumber(
                    item.price,
                    0
                )
            );


        const quantity =
            Math.max(
                0,
                Math.floor(
                    safeNumber(
                        item.quantity,
                        0
                    )
                )
            );


        return roundMoney(
            price * quantity
        );

    }


    /*=====================================================
      GET CART LINE ITEMS
    =====================================================*/

    function getLineItems() {

        const cart =
            getCurrentCart();


        return cart.map(
            function (item) {

                const price =
                    Math.max(
                        0,
                        safeNumber(
                            item.price,
                            0
                        )
                    );


                const quantity =
                    Math.max(
                        0,
                        Math.floor(
                            safeNumber(
                                item.quantity,
                                0
                            )
                        )
                    );


                const lineTotal =
                    calculateLineTotal(
                        item
                    );


                return {

                    id:
                        item.id || "",

                    name:
                        item.name || "",

                    image:
                        item.image || "",

                    price:
                        roundMoney(
                            price
                        ),

                    quantity:
                        quantity,

                    lineTotal:
                        lineTotal,

                    formattedPrice:
                        formatMoney(
                            price
                        ),

                    formattedLineTotal:
                        formatMoney(
                            lineTotal
                        )

                };

            }
        );

    }


    /*=====================================================
      CALCULATE ITEM COUNT
    =====================================================*/

    function calculateItemCount() {

        const cart =
            getCurrentCart();


        return cart.reduce(

            function (
                total,
                item
            ) {

                const quantity =
                    Math.max(
                        0,
                        Math.floor(
                            safeNumber(
                                item.quantity,
                                0
                            )
                        )
                    );


                return (
                    total +
                    quantity
                );

            },

            0

        );

    }


    /*=====================================================
      CALCULATE SUBTOTAL
    =====================================================*/

    function calculateSubtotal() {

        const lines =
            getLineItems();


        const subtotal =
            lines.reduce(

                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        item.lineTotal
                    );

                },

                0

            );


        return roundMoney(
            subtotal
        );

    }


    /*=====================================================
      CALCULATE ORIGINAL TOTAL
    =====================================================*/

    function calculateOriginalTotal() {

        const cart =
            getCurrentCart();


        return roundMoney(

            cart.reduce(

                function (
                    total,
                    item
                ) {

                    const originalPrice =
                        safeNumber(
                            item.originalPrice,
                            item.price
                        );


                    const quantity =
                        Math.max(
                            0,
                            Math.floor(
                                safeNumber(
                                    item.quantity,
                                    0
                                )
                            )
                        );


                    return (
                        total +
                        (
                            Math.max(
                                0,
                                originalPrice
                            ) *
                            quantity
                        )
                    );

                },

                0

            )

        );

    }


    /*=====================================================
      CALCULATE PERCENTAGE DISCOUNT
    =====================================================*/

    function calculatePercentageDiscount(
        subtotal
    ) {

        const rate =
            Math.max(
                0,
                safeNumber(
                    calculationSettings.discountRate,
                    0
                )
            );


        if (
            rate <= 0
        ) {

            return 0;

        }


        return roundMoney(

            subtotal *
            (
                rate /
                100
            )

        );

    }


    /*=====================================================
      CALCULATE FIXED DISCOUNT
    =====================================================*/

    function calculateFixedDiscount(
        subtotal
    ) {

        const fixed =
            Math.max(
                0,
                safeNumber(
                    calculationSettings.fixedDiscount,
                    0
                )
            );


        return roundMoney(

            Math.min(
                fixed,
                subtotal
            )

        );

    }


    /*=====================================================
      CALCULATE TOTAL DISCOUNT
    =====================================================*/

    function calculateDiscount(
        subtotal
    ) {

        const percentageDiscount =
            calculatePercentageDiscount(
                subtotal
            );


        const fixedDiscount =
            calculateFixedDiscount(
                subtotal
            );


        return {

            percentage:
                percentageDiscount,

            fixed:
                fixedDiscount,

            total:
                roundMoney(
                    Math.min(
                        subtotal,
                        percentageDiscount +
                        fixedDiscount
                    )
                )

        };

    }


    /*=====================================================
      CALCULATE TAXABLE AMOUNT
    =====================================================*/

    function calculateTaxableAmount(
        subtotal,
        discount
    ) {

        return roundMoney(

            Math.max(
                0,
                subtotal -
                discount
            )

        );

    }


    /*=====================================================
      CALCULATE TAX
    =====================================================*/

    function calculateTax(
        taxableAmount
    ) {

        const taxRate =
            Math.max(
                0,
                safeNumber(
                    calculationSettings.taxRate,
                    0
                )
            );


        if (
            taxRate <= 0
        ) {

            return 0;

        }


        return roundMoney(

            taxableAmount *
            (
                taxRate /
                100
            )

        );

    }


    /*=====================================================
      CALCULATE DELIVERY
    =====================================================*/

    function calculateDelivery(
        subtotal
    ) {

        const configuredFee =
            Math.max(
                0,
                safeNumber(
                    calculationSettings.deliveryFee,
                    0
                )
            );


        const threshold =
            Math.max(
                0,
                safeNumber(
                    calculationSettings
                        .freeDeliveryThreshold,
                    0
                )
            );


        /*
         * No delivery charge configured.
         */

        if (
            configuredFee <= 0
        ) {

            return {

                fee:
                    0,

                free:
                    true,

                reason:
                    "No delivery fee configured."

            };

        }


        /*
         * Free delivery threshold reached.
         */

        if (
            threshold > 0 &&
            subtotal >= threshold
        ) {

            return {

                fee:
                    0,

                free:
                    true,

                reason:
                    "Free delivery threshold reached."

            };

        }


        return {

            fee:
                roundMoney(
                    configuredFee
                ),

            free:
                false,

            reason:
                "Standard delivery fee."

        };

    }


    /*=====================================================
      CALCULATE SAVINGS
    =====================================================*/

    function calculateSavings(
        originalTotal,
        subtotal,
        discount
    ) {

        const productSavings =
            Math.max(
                0,
                originalTotal -
                subtotal
            );


        const discountSavings =
            Math.max(
                0,
                discount
            );


        return roundMoney(

            productSavings +
            discountSavings

        );

    }


    /*=====================================================
      CALCULATE GRAND TOTAL
    =====================================================*/

    function calculateGrandTotal(
        taxableAmount,
        tax,
        delivery
    ) {

        return roundMoney(

            Math.max(
                0,
                taxableAmount +
                tax +
                delivery
            )

        );

    }


    /*=====================================================
      COMPLETE CART CALCULATION
    =====================================================*/

    function calculateCart() {

        const subtotal =
            calculateSubtotal();


        const originalTotal =
            calculateOriginalTotal();


        const discount =
            calculateDiscount(
                subtotal
            );


        const taxableAmount =
            calculateTaxableAmount(

                subtotal,

                discount.total

            );


        const tax =
            calculateTax(
                taxableAmount
            );


        const delivery =
            calculateDelivery(
                subtotal
            );


        const grandTotal =
            calculateGrandTotal(

                taxableAmount,

                tax,

                delivery.fee

            );


        const savings =
            calculateSavings(

                originalTotal,

                subtotal,

                discount.total

            );


        const itemCount =
            calculateItemCount();


        return {

            currency:
                CALCULATION_CONFIG.CURRENCY,

            itemCount:
                itemCount,

            lines:
                getLineItems(),

            subtotal:
                subtotal,

            discount:
                discount.total,

            discountPercentage:
                discount.percentage,

            discountFixed:
                discount.fixed,

            taxableAmount:
                taxableAmount,

            taxRate:
                calculationSettings.taxRate,

            tax:
                tax,

            delivery:
                delivery.fee,

            deliveryFree:
                delivery.free,

            deliveryReason:
                delivery.reason,

            originalTotal:
                originalTotal,

            savings:
                savings,

            grandTotal:
                grandTotal,

            formattedSubtotal:
                formatMoney(
                    subtotal
                ),

            formattedDiscount:
                formatMoney(
                    discount.total
                ),

            formattedTax:
                formatMoney(
                    tax
                ),

            formattedDelivery:
                formatMoney(
                    delivery.fee
                ),

            formattedSavings:
                formatMoney(
                    savings
                ),

            formattedGrandTotal:
                formatMoney(
                    grandTotal
                )

        };

    }


    /*=====================================================
      SET TAX RATE
    =====================================================*/

    function setTaxRate(
        rate
    ) {

        rate =
            Math.max(
                0,
                safeNumber(
                    rate,
                    0
                )
            );


        calculationSettings.taxRate =
            rate;


        return calculateCart();

    }


    /*=====================================================
      SET DISCOUNT RATE
    =====================================================*/

    function setDiscountRate(
        rate
    ) {

        rate =
            Math.max(
                0,
                safeNumber(
                    rate,
                    0
                )
            );


        calculationSettings.discountRate =
            rate;


        return calculateCart();

    }


    /*=====================================================
      SET FIXED DISCOUNT
    =====================================================*/

    function setFixedDiscount(
        amount
    ) {

        amount =
            Math.max(
                0,
                safeNumber(
                    amount,
                    0
                )
            );


        calculationSettings.fixedDiscount =
            amount;


        return calculateCart();

    }


    /*=====================================================
      SET DELIVERY FEE
    =====================================================*/

    function setDeliveryFee(
        amount
    ) {

        amount =
            Math.max(
                0,
                safeNumber(
                    amount,
                    0
                )
            );


        calculationSettings.deliveryFee =
            amount;


        return calculateCart();

    }


    /*=====================================================
      SET FREE DELIVERY THRESHOLD
    =====================================================*/

    function setFreeDeliveryThreshold(
        amount
    ) {

        amount =
            Math.max(
                0,
                safeNumber(
                    amount,
                    0
                )
            );


        calculationSettings
            .freeDeliveryThreshold =
            amount;


        return calculateCart();

    }


    /*=====================================================
      RESET CALCULATION SETTINGS
    =====================================================*/

    function resetCalculationSettings() {

        calculationSettings = {

            taxRate:
                CALCULATION_CONFIG.TAX_RATE,

            discountRate:
                CALCULATION_CONFIG.DISCOUNT_RATE,

            fixedDiscount:
                CALCULATION_CONFIG.FIXED_DISCOUNT,

            deliveryFee:
                CALCULATION_CONFIG.DELIVERY_FEE,

            freeDeliveryThreshold:
                CALCULATION_CONFIG
                    .FREE_DELIVERY_THRESHOLD

        };


        return calculateCart();

    }


    /*=====================================================
      GET CALCULATION SETTINGS
    =====================================================*/

    function getCalculationSettings() {

        return {

            ...calculationSettings

        };

    }


    /*=====================================================
      CART SUMMARY
    =====================================================*/

    function getCartSummary() {

        const totals =
            calculateCart();


        return {

            itemCount:
                totals.itemCount,

            subtotal:
                totals.subtotal,

            discount:
                totals.discount,

            tax:
                totals.tax,

            delivery:
                totals.delivery,

            savings:
                totals.savings,

            grandTotal:
                totals.grandTotal,

            formattedSubtotal:
                totals.formattedSubtotal,

            formattedDiscount:
                totals.formattedDiscount,

            formattedTax:
                totals.formattedTax,

            formattedDelivery:
                totals.formattedDelivery,

            formattedSavings:
                totals.formattedSavings,

            formattedGrandTotal:
                totals.formattedGrandTotal

        };

    }


    /*=====================================================
      EXTEND PUBLIC CART API
    =====================================================*/

    Cart.calculateLineTotal =
        calculateLineTotal;


    Cart.getLineItems =
        getLineItems;


    Cart.calculateSubtotal =
        calculateSubtotal;


    Cart.calculateDiscount =
        calculateDiscount;


    Cart.calculateTax =
        function () {

            const subtotal =
                calculateSubtotal();


            const discount =
                calculateDiscount(
                    subtotal
                );


            const taxable =
                calculateTaxableAmount(

                    subtotal,

                    discount.total

                );


            return calculateTax(
                taxable
            );

        };


    Cart.calculateDelivery =
        function () {

            return calculateDelivery(
                calculateSubtotal()
            );

        };


    Cart.calculate =
        calculateCart;


    Cart.getSummary =
        getCartSummary;


    Cart.formatMoney =
        formatMoney;


    Cart.roundMoney =
        roundMoney;


    Cart.setTaxRate =
        setTaxRate;


    Cart.setDiscountRate =
        setDiscountRate;


    Cart.setFixedDiscount =
        setFixedDiscount;


    Cart.setDeliveryFee =
        setDeliveryFee;


    Cart.setFreeDeliveryThreshold =
        setFreeDeliveryThreshold;


    Cart.getCalculationSettings =
        getCalculationSettings;


    Cart.resetCalculationSettings =
        resetCalculationSettings;


    /*=====================================================
      GLOBAL CALCULATION HELPERS
    =====================================================*/

    window.calculateOnlineCart =
        calculateCart;


    window.getOnlineCartSummary =
        getCartSummary;


    window.formatOnlineCartMoney =
        formatMoney;


    /*=====================================================
      CART UPDATE LISTENER
    =====================================================*/

    window.addEventListener(

        "nexpak:cart:update",

        function () {

            /*
             * Recalculate automatically whenever the cart
             * changes.
             */

            calculateCart();

        }

    );


    /*=====================================================
      READY MESSAGE
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 3 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 4/8
 Purpose:
 Cart UI synchronization, cart badges, totals,
 quantity controls, empty states and product states.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-3 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      UI SELECTORS
    =====================================================*/

    const SELECTORS = {

        cartCount: [

            ".cart-count",

            ".online-cart-count",

            "[data-cart-count]",

            "[data-online-cart-count]"

        ],

        cartTotal: [

            ".cart-total",

            ".online-cart-total",

            "[data-cart-total]",

            "[data-online-cart-total]"

        ],

        cartSubtotal: [

            ".cart-subtotal",

            ".online-cart-subtotal",

            "[data-cart-subtotal]",

            "[data-online-cart-subtotal]"

        ],

        cartDiscount: [

            ".cart-discount",

            ".online-cart-discount",

            "[data-cart-discount]"

        ],

        cartTax: [

            ".cart-tax",

            ".online-cart-tax",

            "[data-cart-tax]"

        ],

        cartDelivery: [

            ".cart-delivery",

            ".online-cart-delivery",

            "[data-cart-delivery]"

        ],

        cartSavings: [

            ".cart-savings",

            ".online-cart-savings",

            "[data-cart-savings]"

        ],

        cartItems: [

            ".cart-items",

            ".online-cart-items",

            "[data-cart-items]",

            "[data-online-cart-items]"

        ],

        emptyCart: [

            ".empty-cart",

            ".cart-empty",

            ".online-cart-empty",

            "[data-cart-empty]"

        ],

        cartContent: [

            ".cart-content",

            ".online-cart-content",

            "[data-cart-content]"

        ],

        checkoutButton: [

            ".checkout-btn",

            ".online-checkout-btn",

            "[data-checkout]",

            "[data-online-checkout]"

        ]

    };


    /*=====================================================
      FIND ELEMENTS
    =====================================================*/

    function findElements(
        selectors
    ) {

        const elements = [];


        if (
            !Array.isArray(
                selectors
            )
        ) {

            return elements;

        }


        selectors.forEach(
            function (selector) {

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        function (element) {

                            if (
                                elements.indexOf(
                                    element
                                ) === -1
                            ) {

                                elements.push(
                                    element
                                );

                            }

                        }
                    );

            }
        );


        return elements;

    }


    /*=====================================================
      SET TEXT
    =====================================================*/

    function setText(
        selectors,
        value
    ) {

        const elements =
            findElements(
                selectors
            );


        elements.forEach(
            function (element) {

                element.textContent =
                    value;

            }
        );


        return elements.length;

    }


    /*=====================================================
      SHOW / HIDE ELEMENT
    =====================================================*/

    function setVisible(
        selectors,
        visible
    ) {

        const elements =
            findElements(
                selectors
            );


        elements.forEach(
            function (element) {

                if (visible) {

                    element.style.display =
                        "";

                    element.removeAttribute(
                        "aria-hidden"
                    );

                } else {

                    element.style.display =
                        "none";

                    element.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );


        return elements.length;

    }


    /*=====================================================
      UPDATE CART BADGES
    =====================================================*/

    function updateCartCount(
        totals
    ) {

        const count =
            Number(
                totals.itemCount
            ) || 0;


        const elements =
            findElements(
                SELECTORS.cartCount
            );


        elements.forEach(
            function (element) {

                element.textContent =
                    count;


                element.setAttribute(
                    "data-count",
                    count
                );


                /*
                 * Keep accessibility information useful.
                 */

                element.setAttribute(
                    "aria-label",
                    count === 1
                        ? "1 item in cart"
                        : count +
                          " items in cart"
                );

            }
        );

    }


    /*=====================================================
      UPDATE TOTALS
    =====================================================*/

    function updateTotals(
        totals
    ) {

        if (!totals) {

            return;

        }


        setText(

            SELECTORS.cartTotal,

            totals.formattedGrandTotal

        );


        setText(

            SELECTORS.cartSubtotal,

            totals.formattedSubtotal

        );


        setText(

            SELECTORS.cartDiscount,

            totals.formattedDiscount

        );


        setText(

            SELECTORS.cartTax,

            totals.formattedTax

        );


        setText(

            SELECTORS.cartDelivery,

            totals.formattedDelivery

        );


        setText(

            SELECTORS.cartSavings,

            totals.formattedSavings

        );

    }


    /*=====================================================
      UPDATE EMPTY CART STATE
    =====================================================*/

    function updateEmptyState(
        totals
    ) {

        const isEmpty =
            !totals ||
            Number(
                totals.itemCount
            ) <= 0;


        setVisible(

            SELECTORS.emptyCart,

            isEmpty

        );


        setVisible(

            SELECTORS.cartContent,

            !isEmpty

        );


        const checkoutButtons =
            findElements(
                SELECTORS.checkoutButton
            );


        checkoutButtons.forEach(
            function (button) {

                button.disabled =
                    isEmpty;


                button.setAttribute(
                    "aria-disabled",
                    isEmpty
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /*=====================================================
      UPDATE CART UI
    =====================================================*/

    function updateCartUI() {

        let totals;


        try {

            totals =
                Cart.calculate();

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] UI calculation error:",

                error

            );

            return;

        }


        updateCartCount(
            totals
        );


        updateTotals(
            totals
        );


        updateEmptyState(
            totals
        );


        updateCartLineItems(
            totals
        );


        updateProductCartStates();

    }


    /*=====================================================
      UPDATE CART LINE ITEMS
    =====================================================*/

    function updateCartLineItems(
        totals
    ) {

        if (!totals) {

            return;

        }


        const cart =
            Cart.get();


        /*
         * Find quantity inputs belonging to cart items.
         */

        document
            .querySelectorAll(
                "[data-cart-product-id]"
            )
            .forEach(
                function (element) {

                    const productId =
                        String(
                            element.getAttribute(
                                "data-cart-product-id"
                            ) || ""
                        ).trim();


                    if (!productId) {

                        return;

                    }


                    const item =
                        cart.find(
                            function (cartItem) {

                                return (
                                    String(
                                        cartItem.id
                                    ) ===
                                    productId
                                );

                            }
                        );


                    if (!item) {

                        return;

                    }


                    /*
                     * Quantity input.
                     */

                    if (
                        element.matches(
                            "input, select"
                        )
                    ) {

                        element.value =
                            item.quantity;

                    }


                    /*
                     * Quantity text.
                     */

                    element
                        .querySelectorAll(
                            "[data-cart-quantity]"
                        )
                        .forEach(
                            function (quantityElement) {

                                quantityElement
                                    .textContent =
                                    item.quantity;

                            }
                        );

                }
            );


        /*
         * Update individual line totals.
         */

        totals.lines.forEach(
            function (line) {

                const productId =
                    String(
                        line.id
                    );


                document
                    .querySelectorAll(

                        '[data-cart-line-total="' +
                        CSS.escape(
                            productId
                        ) +
                        '"]'

                    )
                    .forEach(
                        function (element) {

                            element.textContent =
                                line.formattedLineTotal;

                        }
                    );

            }
        );

    }


    /*=====================================================
      UPDATE PRODUCT CART STATES
    =====================================================*/

    function updateProductCartStates() {

        const cart =
            Cart.get();


        /*
         * Product cards may use:
         *
         * data-product-id
         * data-product
         * data-id
         */

        document
            .querySelectorAll(
                "[data-product-id]"
            )
            .forEach(
                function (card) {

                    const productId =
                        String(
                            card.getAttribute(
                                "data-product-id"
                            ) || ""
                        ).trim();


                    if (!productId) {

                        return;

                    }


                    const inCart =
                        cart.some(
                            function (item) {

                                return (
                                    String(
                                        item.id
                                    ) ===
                                    productId
                                );

                            }
                        );


                    card.classList.toggle(
                        "in-cart",
                        inCart
                    );


                    card.setAttribute(
                        "data-in-cart",
                        inCart
                            ? "true"
                            : "false"
                    );


                    /*
                     * Update add-to-cart buttons.
                     */

                    card
                        .querySelectorAll(
                            "[data-add-to-cart]"
                        )
                        .forEach(
                            function (button) {

                                button.classList.toggle(
                                    "in-cart",
                                    inCart
                                );


                                button.setAttribute(
                                    "aria-pressed",
                                    inCart
                                        ? "true"
                                        : "false"
                                );

                            }
                        );

                }
            );

    }


    /*=====================================================
      UPDATE SPECIFIC PRODUCT QUANTITY DISPLAY
    =====================================================*/

    function updateProductQuantityDisplay(
        productId
    ) {

        productId =
            String(
                productId || ""
            ).trim();


        if (!productId) {

            return;

        }


        const quantity =
            typeof Cart.getQuantity ===
            "function"

                ? Cart.getQuantity(
                    productId
                )

                : 0;


        document
            .querySelectorAll(
                '[data-product-quantity="' +
                CSS.escape(
                    productId
                ) +
                '"]'
            )
            .forEach(
                function (element) {

                    element.textContent =
                        quantity;

                }
            );

    }


    /*=====================================================
      CART ITEM REMOVAL FROM UI
    =====================================================*/

    function removeCartItemFromUI(
        productId
    ) {

        productId =
            String(
                productId || ""
            ).trim();


        if (!productId) {

            return;

        }


        document
            .querySelectorAll(
                '[data-cart-item="' +
                CSS.escape(
                    productId
                ) +
                '"]'
            )
            .forEach(
                function (element) {

                    element.remove();

                }
            );

    }


    /*=====================================================
      CART QUANTITY INPUT HANDLER
    =====================================================*/

    function handleQuantityInput(
        input
    ) {

        if (!input) {

            return;

        }


        const productId =
            input.getAttribute(
                "data-cart-product-id"
            );


        if (!productId) {

            return;

        }


        let quantity =
            Number(
                input.value
            );


        if (
            !Number.isFinite(
                quantity
            )
        ) {

            quantity = 1;

        }


        quantity =
            Math.floor(
                quantity
            );


        if (
            quantity < 1
        ) {

            quantity = 1;

        }


        if (
            quantity > 999
        ) {

            quantity = 999;

        }


        input.value =
            quantity;


        if (
            typeof Cart.updateQuantity ===
            "function"
        ) {

            Cart.updateQuantity(

                productId,

                quantity

            );

        }

    }


    /*=====================================================
      QUANTITY BUTTON HANDLER
    =====================================================*/

    function handleQuantityButton(
        button
    ) {

        if (!button) {

            return;

        }


        const productId =
            button.getAttribute(
                "data-cart-product-id"
            );


        if (!productId) {

            return;

        }


        const action =
            (
                button.getAttribute(
                    "data-cart-action"
                ) || ""
            ).toLowerCase();


        if (
            action === "increase" ||
            action === "plus"
        ) {

            Cart.increase(
                productId
            );

            return;

        }


        if (
            action === "decrease" ||
            action === "minus"
        ) {

            Cart.decrease(
                productId
            );

        }

    }


    /*=====================================================
      REMOVE BUTTON HANDLER
    =====================================================*/

    function handleRemoveButton(
        button
    ) {

        if (!button) {

            return;

        }


        const productId =
            button.getAttribute(
                "data-cart-product-id"
            );


        if (!productId) {

            return;

        }


        Cart.remove(
            productId
        );

    }


    /*=====================================================
      EVENT DELEGATION
    =====================================================*/

    function bindUIEvents() {

        /*
         * Quantity inputs.
         */

        document.addEventListener(
            "change",
            function (event) {

                const input =
                    event.target.closest(
                        "[data-cart-quantity-input]"
                    );


                if (!input) {

                    return;

                }


                handleQuantityInput(
                    input
                );

            }
        );


        /*
         * Quantity buttons.
         */

        document.addEventListener(
            "click",
            function (event) {

                const quantityButton =
                    event.target.closest(
                        "[data-cart-action]"
                    );


                if (
                    quantityButton
                ) {

                    handleQuantityButton(
                        quantityButton
                    );

                    return;

                }


                /*
                 * Remove buttons.
                 */

                const removeButton =
                    event.target.closest(
                        "[data-remove-cart-item]"
                    );


                if (
                    removeButton
                ) {

                    event.preventDefault();

                    handleRemoveButton(
                        removeButton
                    );

                }

            }
        );

    }


    /*=====================================================
      CART EVENT LISTENER
    =====================================================*/

    function bindCartEvents() {

        window.addEventListener(

            "nexpak:cart:update",

            function (event) {

                updateCartUI();


                /*
                 * Update the affected product quantity
                 * when available.
                 */

                if (
                    event.detail &&
                    event.detail.productId
                ) {

                    updateProductQuantityDisplay(

                        event.detail.productId

                    );

                }


                /*
                 * If an item was removed, remove its
                 * corresponding DOM element.
                 */

                if (
                    event.detail &&
                    event.detail.action ===
                    "remove"
                ) {

                    if (
                        event.detail.productId
                    ) {

                        removeCartItemFromUI(

                            event.detail.productId

                        );

                    }

                }

            }

        );

    }


    /*=====================================================
      INITIAL UI UPDATE
    =====================================================*/

    function initializeCartUI() {

        updateCartUI();

    }


    /*=====================================================
      PUBLIC UI API
    =====================================================*/

    Cart.updateUI =
        updateCartUI;


    Cart.updateCartCount =
        updateCartCount;


    Cart.updateTotals =
        updateTotals;


    Cart.updateEmptyState =
        updateEmptyState;


    Cart.updateProductCartStates =
        updateProductCartStates;


    Cart.updateProductQuantityDisplay =
        updateProductQuantityDisplay;


    /*=====================================================
      GLOBAL UI FUNCTIONS
    =====================================================*/

    window.updateOnlineCartUI =
        updateCartUI;


    window.updateOnlineCartCount =
        function () {

            const totals =
                Cart.calculate();

            updateCartCount(
                totals
            );

        };


    /*=====================================================
      INITIALISE
    =====================================================*/

    function initPart4() {

        bindUIEvents();

        bindCartEvents();

        initializeCartUI();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart4
        );

    } else {

        initPart4();

    }


    /*=====================================================
      READY MESSAGE
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 4 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 5/8
 Purpose:
 Cart rendering engine, cart item templates,
 cart summary rendering and empty-cart rendering.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-4 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      RENDER CONFIGURATION
    =====================================================*/

    const RENDER_CONFIG = {

        cartContainerSelectors: [

            "[data-online-cart-list]",

            "[data-cart-list]",

            ".online-cart-list",

            ".cart-list",

            ".cart-items"

        ],

        summarySelectors: [

            "[data-online-cart-summary]",

            "[data-cart-summary]",

            ".online-cart-summary",

            ".cart-summary"

        ],

        emptySelectors: [

            "[data-online-cart-empty]",

            "[data-cart-empty]",

            ".online-cart-empty",

            ".cart-empty"

        ]

    };


    /*=====================================================
      HTML ESCAPE
    =====================================================*/

    function escapeHTML(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

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


    /*=====================================================
      ESCAPE ATTRIBUTE
    =====================================================*/

    function escapeAttribute(
        value
    ) {

        return escapeHTML(
            value
        );

    }


    /*=====================================================
      FIND FIRST AVAILABLE ELEMENT
    =====================================================*/

    function findFirstElement(
        selectors
    ) {

        if (
            !Array.isArray(
                selectors
            )
        ) {

            return null;

        }


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


    /*=====================================================
      FIND ALL AVAILABLE ELEMENTS
    =====================================================*/

    function findAllElements(
        selectors
    ) {

        const elements = [];


        if (
            !Array.isArray(
                selectors
            )
        ) {

            return elements;

        }


        selectors.forEach(
            function (selector) {

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        function (element) {

                            if (
                                elements.indexOf(
                                    element
                                ) === -1
                            ) {

                                elements.push(
                                    element
                                );

                            }

                        }
                    );

            }
        );


        return elements;

    }


    /*=====================================================
      GET CART CONTAINERS
    =====================================================*/

    function getCartContainers() {

        return findAllElements(

            RENDER_CONFIG
                .cartContainerSelectors

        );

    }


    /*=====================================================
      GET SUMMARY CONTAINERS
    =====================================================*/

    function getSummaryContainers() {

        return findAllElements(

            RENDER_CONFIG
                .summarySelectors

        );

    }


    /*=====================================================
      GET EMPTY CONTAINERS
    =====================================================*/

    function getEmptyContainers() {

        return findAllElements(

            RENDER_CONFIG
                .emptySelectors

        );

    }


    /*=====================================================
      DEFAULT IMAGE
    =====================================================*/

    function getDefaultImage() {

        return (

            "data:image/svg+xml," +

            encodeURIComponent(

                '<svg xmlns="http://www.w3.org/2000/svg" ' +
                'width="300" height="300">' +

                '<rect width="100%" height="100%" ' +
                'fill="#f1f1f1"/>' +

                '<text x="50%" y="50%" ' +
                'dominant-baseline="middle" ' +
                'text-anchor="middle" ' +
                'font-family="Arial" ' +
                'font-size="18" ' +
                'fill="#777">' +

                'NEXPAK'

                + '</text>' +

                '</svg>'

            )

        );

    }


    /*=====================================================
      CART ITEM TEMPLATE
    =====================================================*/

    function createCartItemHTML(
        item
    ) {

        if (!item) {

            return "";

        }


        const id =
            escapeAttribute(
                item.id
            );


        const name =
            escapeHTML(
                item.name ||
                "NEXPAK Product"
            );


        const image =
            item.image
                ? escapeAttribute(
                    item.image
                )
                : getDefaultImage();


        const price =
            Cart.formatMoney(
                item.price
            );


        const lineTotal =
            Cart.formatMoney(

                Number(
                    item.price
                ) *
                Number(
                    item.quantity
                )

            );


        const quantity =
            Number(
                item.quantity
            ) || 1;


        return `

            <article
                class="online-cart-item"
                data-cart-item="${id}"
                data-cart-product-id="${id}"
            >

                <div class="online-cart-item-image">

                    <img
                        src="${image}"
                        alt="${name}"
                        loading="lazy"
                        onerror="this.src='${getDefaultImage()}';"
                    >

                </div>


                <div class="online-cart-item-details">

                    <h3 class="online-cart-item-name">
                        ${name}
                    </h3>


                    <div class="online-cart-item-price">

                        <span
                            class="online-cart-unit-price"
                        >
                            ${price}
                        </span>

                    </div>


                    <div class="online-cart-item-controls">

                        <button
                            type="button"
                            class="online-cart-quantity-btn"
                            data-cart-action="decrease"
                            data-cart-product-id="${id}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <input
                            type="number"
                            class="online-cart-quantity-input"
                            data-cart-quantity-input
                            data-cart-product-id="${id}"
                            value="${quantity}"
                            min="1"
                            max="999"
                            inputmode="numeric"
                            aria-label="Quantity for ${name}"
                        >


                        <button
                            type="button"
                            class="online-cart-quantity-btn"
                            data-cart-action="increase"
                            data-cart-product-id="${id}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="online-cart-remove"
                        data-remove-cart-item
                        data-cart-product-id="${id}"
                    >
                        Remove
                    </button>

                </div>


                <div
                    class="online-cart-item-total"
                    data-cart-line-total="${id}"
                >
                    ${lineTotal}
                </div>

            </article>

        `;

    }


    /*=====================================================
      EMPTY CART HTML
    =====================================================*/

    function createEmptyCartHTML() {

        return `

            <div class="online-cart-empty-state">

                <div class="online-cart-empty-icon">
                    🛒
                </div>


                <h2>
                    Your cart is empty
                </h2>


                <p>
                    You haven't added any security products yet.
                </p>


                <button
                    type="button"
                    class="online-cart-continue-shopping"
                    data-continue-shopping
                >
                    Continue Shopping
                </button>

            </div>

        `;

    }


    /*=====================================================
      CART SUMMARY HTML
    =====================================================*/

    function createCartSummaryHTML(
        totals
    ) {

        if (!totals) {

            return "";

        }


        return `

            <div class="online-cart-summary-inner">

                <div
                    class="online-cart-summary-row"
                    data-summary-row="subtotal"
                >

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${escapeHTML(
                            totals.formattedSubtotal
                        )}
                    </strong>

                </div>


                ${
                    Number(
                        totals.discount
                    ) > 0

                    ? `

                        <div
                            class="online-cart-summary-row discount"
                            data-summary-row="discount"
                        >

                            <span>
                                Discount
                            </span>

                            <strong>
                                -${escapeHTML(
                                    totals.formattedDiscount
                                )}
                            </strong>

                        </div>

                    `

                    : ""
                }


                <div
                    class="online-cart-summary-row"
                    data-summary-row="delivery"
                >

                    <span>
                        Delivery
                    </span>

                    <strong>
                        ${
                            Number(
                                totals.delivery
                            ) > 0

                            ? escapeHTML(
                                totals.formattedDelivery
                            )

                            : "FREE"
                        }
                    </strong>

                </div>


                ${
                    Number(
                        totals.tax
                    ) > 0

                    ? `

                        <div
                            class="online-cart-summary-row"
                            data-summary-row="tax"
                        >

                            <span>
                                Tax
                            </span>

                            <strong>
                                ${escapeHTML(
                                    totals.formattedTax
                                )}
                            </strong>

                        </div>

                    `

                    : ""
                }


                ${
                    Number(
                        totals.savings
                    ) > 0

                    ? `

                        <div
                            class="online-cart-summary-row savings"
                            data-summary-row="savings"
                        >

                            <span>
                                You Save
                            </span>

                            <strong>
                                ${escapeHTML(
                                    totals.formattedSavings
                                )}
                            </strong>

                        </div>

                    `

                    : ""
                }


                <div
                    class="online-cart-summary-row grand-total"
                    data-summary-row="grand-total"
                >

                    <span>
                        Total
                    </span>

                    <strong>
                        ${escapeHTML(
                            totals.formattedGrandTotal
                        )}
                    </strong>

                </div>


                <button
                    type="button"
                    class="online-cart-checkout-btn"
                    data-checkout
                    ${
                        Number(
                            totals.itemCount
                        ) <= 0
                            ? "disabled"
                            : ""
                    }
                >
                    Proceed to Checkout
                </button>

            </div>

        `;

    }


    /*=====================================================
      RENDER CART ITEMS
    =====================================================*/

    function renderCartItems() {

        const containers =
            getCartContainers();


        if (
            containers.length === 0
        ) {

            return false;

        }


        const cart =
            Cart.get();


        const html =
            cart.length > 0

                ? cart.map(
                    createCartItemHTML
                ).join("")

                : createEmptyCartHTML();


        containers.forEach(
            function (container) {

                container.innerHTML =
                    html;

                container.setAttribute(
                    "data-rendered",
                    "true"
                );

            }
        );


        return true;

    }


    /*=====================================================
      RENDER CART SUMMARY
    =====================================================*/

    function renderCartSummary() {

        const containers =
            getSummaryContainers();


        if (
            containers.length === 0
        ) {

            return false;

        }


        const totals =
            Cart.calculate();


        const html =
            createCartSummaryHTML(
                totals
            );


        containers.forEach(
            function (container) {

                container.innerHTML =
                    html;

            }
        );


        return true;

    }


    /*=====================================================
      RENDER EMPTY CART STATE
    =====================================================*/

    function renderEmptyCartState() {

        const totals =
            Cart.calculate();


        const empty =
            Number(
                totals.itemCount
            ) <= 0;


        const containers =
            getEmptyContainers();


        containers.forEach(
            function (container) {

                container.innerHTML =
                    empty

                        ? createEmptyCartHTML()

                        : "";

                container.style.display =
                    empty
                        ? ""
                        : "none";

            }
        );

    }


    /*=====================================================
      RENDER EVERYTHING
    =====================================================*/

    function renderCart() {

        renderCartItems();

        renderCartSummary();

        renderEmptyCartState();


        /*
         * Part 4 handles badges, product states and
         * other UI synchronization.
         */

        if (
            typeof Cart.updateUI ===
            "function"
        ) {

            Cart.updateUI();

        }


        return {

            success:
                true,

            cart:
                Cart.get(),

            totals:
                Cart.calculate()

        };

    }


    /*=====================================================
      RENDER SINGLE ITEM
    =====================================================*/

    function renderSingleCartItem(
        productId
    ) {

        productId =
            String(
                productId || ""
            ).trim();


        if (!productId) {

            return false;

        }


        const item =
            Cart.getItem(
                productId
            );


        const containers =
            document.querySelectorAll(

                '[data-cart-item="' +
                CSS.escape(
                    productId
                ) +
                '"]'

            );


        if (!item) {

            containers.forEach(
                function (element) {

                    element.remove();

                }
            );


            return false;

        }


        const html =
            createCartItemHTML(
                item
            );


        containers.forEach(
            function (element) {

                const temporary =
                    document.createElement(
                        "div"
                    );


                temporary.innerHTML =
                    html;


                const replacement =
                    temporary.firstElementChild;


                if (
                    replacement
                ) {

                    element.replaceWith(
                        replacement
                    );

                }

            }
        );


        return true;

    }


    /*=====================================================
      CART ITEM COUNT LABEL
    =====================================================*/

    function createItemCountLabel() {

        const totals =
            Cart.calculate();


        const count =
            Number(
                totals.itemCount
            ) || 0;


        return (
            count === 1
                ? "1 item"
                : count + " items"
        );

    }


    /*=====================================================
      CONTINUE SHOPPING
    =====================================================*/

    function handleContinueShopping() {

        const buttons =
            document.querySelectorAll(
                "[data-continue-shopping]"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        /*
                         * If online.js provides a shop
                         * navigation function, use it.
                         */

                        if (
                            typeof window.goToOnlineShop ===
                            "function"
                        ) {

                            window.goToOnlineShop();

                            return;

                        }


                        if (
                            typeof window.openOnlineShop ===
                            "function"
                        ) {

                            window.openOnlineShop();

                            return;

                        }


                        /*
                         * Fallback.
                         */

                        const shopLink =
                            document.querySelector(
                                '[href*="online.html"]'
                            );


                        if (shopLink) {

                            shopLink.click();

                        }

                    }
                );

            }
        );

    }


    /*=====================================================
      CART EVENT LISTENER
    =====================================================*/

    function bindRenderEvents() {

        window.addEventListener(

            "nexpak:cart:update",

            function () {

                renderCart();

                handleContinueShopping();

            }

        );

    }


    /*=====================================================
      PUBLIC RENDER API
    =====================================================*/

    Cart.render =
        renderCart;


    Cart.renderItems =
        renderCartItems;


    Cart.renderSummary =
        renderCartSummary;


    Cart.renderEmpty =
        renderEmptyCartState;


    Cart.renderItem =
        renderSingleCartItem;


    Cart.createItemHTML =
        createCartItemHTML;


    Cart.createSummaryHTML =
        createCartSummaryHTML;


    Cart.createEmptyHTML =
        createEmptyCartHTML;


    Cart.getItemCountLabel =
        createItemCountLabel;


    /*=====================================================
      GLOBAL RENDER FUNCTIONS
    =====================================================*/

    window.renderOnlineCart =
        renderCart;


    window.renderOnlineCartItems =
        renderCartItems;


    window.renderOnlineCartSummary =
        renderCartSummary;


    /*=====================================================
      INITIALISE
    =====================================================*/

    function initPart5() {

        bindRenderEvents();

        renderCart();

        handleContinueShopping();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart5
        );

    } else {

        initPart5();

    }


    /*=====================================================
      READY MESSAGE
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 5 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 6/8
 Purpose:
 Cart persistence, recovery, promo codes, stock checks,
 cart metadata and customer session support.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-5 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      STORAGE KEYS
    =====================================================*/

    const STORAGE = {

        CART:
            "nexpak_online_cart_v1",

        CART_META:
            "nexpak_online_cart_meta_v1",

        PROMO:
            "nexpak_online_cart_promo_v1",

        SESSION:
            "nexpak_online_cart_session_v1"

    };


    /*=====================================================
      CART SESSION
    =====================================================*/

    let cartMeta = {

        createdAt:
            null,

        updatedAt:
            null,

        customerType:
            "retail",

        currency:
            "ZAR",

        deliveryMethod:
            null,

        notes:
            "",

        reference:
            null

    };


    /*=====================================================
      ACTIVE PROMO
    =====================================================*/

    let activePromo = null;


    /*=====================================================
      PROMO DATABASE
    =====================================================*/

    /*
     * Promo codes can be added here later.
     *
     * The structure deliberately supports:
     *
     * percentage discounts
     * fixed discounts
     * minimum order values
     * expiry dates
     * usage restrictions
     *
     * No live promotion is assumed at this stage.
     */

    const PROMO_CODES = {


        /*-------------------------------------------------
          EXAMPLE STRUCTURE
          Disabled until real promotions are configured.
        -------------------------------------------------*/

        /*
        NEXPAK10: {

            code: "NEXPAK10",

            type: "percentage",

            value: 10,

            minimumOrder: 500,

            expires:
                "2026-12-31T23:59:59",

            active: true

        }
        */

    };


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(
        value,
        fallback
    ) {

        const number =
            Number(value);


        if (
            !Number.isFinite(number)
        ) {

            return (
                fallback || 0
            );

        }


        return number;

    }


    /*=====================================================
      GENERATE CART REFERENCE
    =====================================================*/

    function generateReference() {

        const timestamp =
            Date.now()
                .toString(36)
                .toUpperCase();


        const random =
            Math.random()
                .toString(36)
                .substring(
                    2,
                    7
                )
                .toUpperCase();


        return (
            "NXP-" +
            timestamp +
            "-" +
            random
        );

    }


    /*=====================================================
      SAVE CART METADATA
    =====================================================*/

    function saveCartMeta() {

        try {

            localStorage.setItem(

                STORAGE.CART_META,

                JSON.stringify(
                    cartMeta
                )

            );

            return true;

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] Unable to save cart metadata:",

                error

            );

            return false;

        }

    }


    /*=====================================================
      LOAD CART METADATA
    =====================================================*/

    function loadCartMeta() {

        try {

            const stored =
                localStorage.getItem(
                    STORAGE.CART_META
                );


            if (!stored) {

                return cartMeta;

            }


            const parsed =
                JSON.parse(stored);


            if (
                parsed &&
                typeof parsed ===
                "object"
            ) {

                cartMeta = {

                    ...cartMeta,

                    ...parsed

                };

            }

        } catch (error) {

            console.warn(

                "[NEXPAK ONLINE CART] Unable to load cart metadata:",

                error

            );

        }


        return cartMeta;

    }


    /*=====================================================
      UPDATE CART METADATA
    =====================================================*/

    function updateCartMeta(
        updates
    ) {

        if (
            !updates ||
            typeof updates !==
            "object"
        ) {

            return cartMeta;

        }


        cartMeta = {

            ...cartMeta,

            ...updates,

            updatedAt:
                new Date().toISOString()

        };


        saveCartMeta();


        return {

            ...cartMeta

        };

    }


    /*=====================================================
      GET CART METADATA
    =====================================================*/

    function getCartMeta() {

        return {

            ...cartMeta

        };

    }


    /*=====================================================
      START CART SESSION
    =====================================================*/

    function startCartSession() {

        if (
            !cartMeta.createdAt
        ) {

            cartMeta.createdAt =
                new Date().toISOString();

        }


        cartMeta.updatedAt =
            new Date().toISOString();


        if (
            !cartMeta.reference
        ) {

            cartMeta.reference =
                generateReference();

        }


        saveCartMeta();


        return getCartMeta();

    }


    /*=====================================================
      CART AGE
    =====================================================*/

    function getCartAge() {

        if (
            !cartMeta.createdAt
        ) {

            return 0;

        }


        const created =
            new Date(
                cartMeta.createdAt
            ).getTime();


        if (
            !Number.isFinite(
                created
            )
        ) {

            return 0;

        }


        return Math.max(

            0,

            Date.now() -
            created

        );

    }


    /*=====================================================
      CART RECOVERY
    =====================================================*/

    function recoverCart() {

        /*
         * Part 1 already restores the main cart.
         * Here we restore the metadata and promotion state.
         */

        loadCartMeta();

        loadPromo();


        if (
            Cart.get().length > 0
        ) {

            startCartSession();

        }


        return {

            cart:
                Cart.get(),

            meta:
                getCartMeta(),

            promo:
                getActivePromo()

        };

    }


    /*=====================================================
      CLEAR CART SESSION
    =====================================================*/

    function clearCartSession() {

        try {

            localStorage.removeItem(
                STORAGE.CART_META
            );

            localStorage.removeItem(
                STORAGE.PROMO
            );

        } catch (error) {

            console.warn(

                "[NEXPAK ONLINE CART] Session cleanup failed:",

                error

            );

        }


        cartMeta = {

            createdAt:
                null,

            updatedAt:
                null,

            customerType:
                "retail",

            currency:
                "ZAR",

            deliveryMethod:
                null,

            notes:
                "",

            reference:
                null

        };


        activePromo =
            null;

    }


    /*=====================================================
      VALIDATE PROMO CODE
    =====================================================*/

    function validatePromoCode(
        code
    ) {

        code =
            String(
                code || ""
            )
            .trim()
            .toUpperCase();


        if (!code) {

            return {

                valid:
                    false,

                message:
                    "Please enter a promo code."

            };

        }


        const promo =
            PROMO_CODES[code];


        if (!promo) {

            return {

                valid:
                    false,

                message:
                    "Promo code is not valid."

            };

        }


        if (
            promo.active === false
        ) {

            return {

                valid:
                    false,

                message:
                    "This promo code is inactive."

            };

        }


        if (
            promo.expires
        ) {

            const expiry =
                new Date(
                    promo.expires
                ).getTime();


            if (
                Number.isFinite(
                    expiry
                ) &&
                Date.now() >
                expiry
            ) {

                return {

                    valid:
                        false,

                    message:
                        "This promo code has expired."

                };

            }

        }


        const subtotal =
            typeof Cart.calculateSubtotal ===
            "function"

                ? Cart.calculateSubtotal()

                : 0;


        const minimumOrder =
            Math.max(

                0,

                safeNumber(
                    promo.minimumOrder,
                    0
                )

            );


        if (
            subtotal <
            minimumOrder
        ) {

            return {

                valid:
                    false,

                message:

                    "Minimum order value is " +
                    Cart.formatMoney(
                        minimumOrder
                    ) +
                    "."

            };

        }


        return {

            valid:
                true,

            promo:
                promo,

            message:
                "Promo code applied."

        };

    }


    /*=====================================================
      APPLY PROMO CODE
    =====================================================*/

    function applyPromoCode(
        code
    ) {

        const result =
            validatePromoCode(
                code
            );


        if (!result.valid) {

            return result;

        }


        activePromo = {

            code:
                result.promo.code,

            type:
                result.promo.type,

            value:
                safeNumber(
                    result.promo.value,
                    0
                ),

            appliedAt:
                new Date().toISOString()

        };


        try {

            localStorage.setItem(

                STORAGE.PROMO,

                JSON.stringify(
                    activePromo
                )

            );

        } catch (error) {

            console.warn(

                "[NEXPAK ONLINE CART] Unable to save promo:",

                error

            );

        }


        /*
         * Apply the discount through the calculation
         * engine from Part 3.
         */

        if (
            activePromo.type ===
            "percentage"
        ) {

            Cart.setDiscountRate(
                activePromo.value
            );

            Cart.setFixedDiscount(
                0
            );

        }


        if (
            activePromo.type ===
            "fixed"
        ) {

            Cart.setDiscountRate(
                0
            );

            Cart.setFixedDiscount(
                activePromo.value
            );

        }


        updateCartMeta({

            updatedAt:
                new Date().toISOString()

        });


        window.dispatchEvent(

            new CustomEvent(
                "nexpak:promo:update",
                {

                    detail: {

                        action:
                            "apply",

                        promo:
                            getActivePromo()

                    }

                }
            )

        );


        return {

            valid:
                true,

            success:
                true,

            message:
                "Promo code applied.",

            promo:
                getActivePromo(),

            totals:
                Cart.calculate()

        };

    }


    /*=====================================================
      LOAD PROMO
    =====================================================*/

    function loadPromo() {

        try {

            const stored =
                localStorage.getItem(
                    STORAGE.PROMO
                );


            if (!stored) {

                activePromo =
                    null;

                return null;

            }


            const parsed =
                JSON.parse(
                    stored
                );


            if (
                parsed &&
                parsed.code
            ) {

                activePromo =
                    parsed;

            }

        } catch (error) {

            activePromo =
                null;

        }


        return activePromo;

    }


    /*=====================================================
      GET ACTIVE PROMO
    =====================================================*/

    function getActivePromo() {

        if (!activePromo) {

            return null;

        }


        return {

            ...activePromo

        };

    }


    /*=====================================================
      REMOVE PROMO
    =====================================================*/

    function removePromoCode() {

        activePromo =
            null;


        try {

            localStorage.removeItem(
                STORAGE.PROMO
            );

        } catch (error) {

            console.warn(

                "[NEXPAK ONLINE CART] Unable to remove promo:",

                error

            );

        }


        /*
         * Reset discounts created by the promo engine.
         */

        Cart.setDiscountRate(
            0
        );


        Cart.setFixedDiscount(
            0
        );


        window.dispatchEvent(

            new CustomEvent(
                "nexpak:promo:update",
                {

                    detail: {

                        action:
                            "remove",

                        promo:
                            null

                    }

                }
            )

        );


        return {

            success:
                true,

            message:
                "Promo code removed.",

            totals:
                Cart.calculate()

        };

    }


    /*=====================================================
      STOCK EXTRACTION
    =====================================================*/

    function getProductStock(
        product
    ) {

        if (!product) {

            return null;

        }


        const possibleStock = [

            product.stock,

            product.stockQty,

            product.stockQuantity,

            product.inventory,

            product.quantityAvailable,

            product.availableQuantity

        ];


        for (
            let i = 0;
            i < possibleStock.length;
            i++
        ) {

            const stock =
                Number(
                    possibleStock[i]
                );


            if (
                Number.isFinite(
                    stock
                ) &&
                stock >= 0
            ) {

                return Math.floor(
                    stock
                );

            }

        }


        /*
         * Null means the product does not currently
         * expose a stock quantity.
         */

        return null;

    }


    /*=====================================================
      CHECK PRODUCT AVAILABILITY
    =====================================================*/

             function checkProductAvailability(
        productId,
        requestedQuantity
    ) {

        productId =
            String(
                productId || ""
            ).trim();


        requestedQuantity =
            Math.max(

                1,

                Math.floor(
                    safeNumber(
                        requestedQuantity,
                        1
                    )
                )

            );


        const product =
            Cart.findProduct(
                productId
            );


        if (!product) {

            return {

                available:
                    false,

                reason:
                    "Product not found.",

                productId:
                    productId

            };

        }


        /*
         * Product can explicitly be marked unavailable.
         */

        if (
            product.available === false ||
            product.inStock === false
        ) {

            return {

                available:
                    false,

                reason:
                    "Product is currently unavailable.",

                productId:
                    productId,

                stock:
                    0

            };

        }


        const stock =
            getProductStock(
                product
            );


        /*
         * No stock number supplied means we cannot
         * claim the item is out of stock.
         */

        if (
            stock === null
        ) {

            return {

                available:
                    true,

                reason:
                    "Availability not stock-limited.",

                productId:
                    productId,

                stock:
                    null,

                requestedQuantity:
                    requestedQuantity

            };

        }


        if (
            stock <= 0
        ) {

            return {

                available:
                    false,

                reason:
                    "Product is out of stock.",

                productId:
                    productId,

                stock:
                    0

            };

        }


        if (
            requestedQuantity >
            stock
        ) {

            return {

                available:
                    false,

                reason:
                    "Requested quantity exceeds available stock.",

                productId:
                    productId,

                stock:
                    stock,

                requestedQuantity:
                    requestedQuantity

            };

        }


        return {

            available:
                true,

            reason:
                "Product is available.",

            productId:
                productId,

            stock:
                stock,

            requestedQuantity:
                requestedQuantity

        };

    }


    /*=====================================================
      VALIDATE ENTIRE CART
    =====================================================*/

    function validateCart() {

        const cart =
            Cart.get();


        const issues = [];


        cart.forEach(
            function (item) {

                const result =
                    checkProductAvailability(

                        item.id,

                        item.quantity

                    );


                if (
                    !result.available
                ) {

                    issues.push({

                        productId:
                            item.id,

                        productName:
                            item.name,

                        quantity:
                            item.quantity,

                        reason:
                            result.reason,

                        stock:
                            result.stock

                    });

                }

            }
        );


        return {

            valid:
                issues.length === 0,

            issues:
                issues,

            itemCount:
                cart.length

        };

    }


    /*=====================================================
      SET CUSTOMER TYPE
    =====================================================*/

    function setCustomerType(
        type
    ) {

        type =
            String(
                type || "retail"
            )
            .trim()
            .toLowerCase();


        const allowedTypes = [

            "retail",

            "trade",

            "business",

            "contractor"

        ];


        if (
            allowedTypes.indexOf(
                type
            ) === -1
        ) {

            type =
                "retail";

        }


        updateCartMeta({

            customerType:
                type

        });


        return type;

    }


    /*=====================================================
      GET CUSTOMER TYPE
    =====================================================*/

    function getCustomerType() {

        return (
            cartMeta.customerType ||
            "retail"
        );

    }


    /*=====================================================
      SET DELIVERY METHOD
    =====================================================*/

    function setDeliveryMethod(
        method
    ) {

        method =
            String(
                method || ""
            )
            .trim()
            .toLowerCase();


        updateCartMeta({

            deliveryMethod:
                method || null

        });


        return (
            cartMeta.deliveryMethod
        );

    }


    /*=====================================================
      SET CART NOTES
    =====================================================*/

    function setNotes(
        notes
    ) {

        notes =
            String(
                notes || ""
            ).trim();


        /*
         * Keep notes reasonably sized.
         */

        if (
            notes.length > 2000
        ) {

            notes =
                notes.substring(
                    0,
                    2000
                );

        }


        updateCartMeta({

            notes:
                notes

        });


        return notes;

    }


    /*=====================================================
      GET CART REFERENCE
    =====================================================*/

    function getReference() {

        startCartSession();


        return (
            cartMeta.reference
        );

    }


    /*=====================================================
      EXTEND PUBLIC API
    =====================================================*/

    Cart.getMeta =
        getCartMeta;


    Cart.updateMeta =
        updateCartMeta;


    Cart.startSession =
        startCartSession;


    Cart.recover =
        recoverCart;


    Cart.clearSession =
        clearCartSession;


    Cart.getAge =
        getCartAge;


    Cart.validatePromo =
        validatePromoCode;


    Cart.applyPromo =
        applyPromoCode;


    Cart.removePromo =
        removePromoCode;


    Cart.getPromo =
        getActivePromo;


    Cart.checkAvailability =
        checkProductAvailability;


    Cart.validate =
        validateCart;


    Cart.getStock =
        getProductStock;


    Cart.setCustomerType =
        setCustomerType;


    Cart.getCustomerType =
        getCustomerType;


    Cart.setDeliveryMethod =
        setDeliveryMethod;


    Cart.setNotes =
        setNotes;


    Cart.getReference =
        getReference;


    /*=====================================================
      GLOBAL HELPERS
    =====================================================*/

    window.validateOnlineCart =
        validateCart;


    window.applyOnlinePromo =
        applyPromoCode;


    window.removeOnlinePromo =
        removePromoCode;


    window.getOnlineCartReference =
        getReference;


    /*=====================================================
      CART UPDATE HOOK
    =====================================================*/

    window.addEventListener(

        "nexpak:cart:update",

        function () {

            if (
                Cart.get().length > 0
            ) {

                startCartSession();

            }

        }

    );


    /*=====================================================
      INITIALISE PART 6
    =====================================================*/

    function initPart6() {

        loadCartMeta();

        loadPromo();

        recoverCart();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart6
        );

    } else {

        initPart6();

    }


    /*=====================================================
      READY MESSAGE
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 6 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 7/8
 Purpose:
 Checkout preparation, order payload generation,
 customer data, order validation and checkout handoff.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-6 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      CHECKOUT STATE
    =====================================================*/

    let checkoutState = {

        customer:
            null,

        delivery:
            null,

        paymentMethod:
            null,

        orderNotes:
            "",

        prepared:
            false,

        preparedAt:
            null

    };


    /*=====================================================
      CUSTOMER DATA
    =====================================================*/

    const CUSTOMER_FIELDS = [

        "firstName",

        "lastName",

        "company",

        "email",

        "phone",

        "vatNumber"

    ];


    /*=====================================================
      SAFE STRING
    =====================================================*/

    function safeString(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(
            value
        ).trim();

    }


    /*=====================================================
      SAFE OBJECT COPY
    =====================================================*/

    function copyObject(
        object
    ) {

        if (
            !object ||
            typeof object !==
            "object"
        ) {

            return {};

        }


        return {
            ...object
        };

    }


    /*=====================================================
      EMAIL VALIDATION
    =====================================================*/

    function isValidEmail(
        email
    ) {

        email =
            safeString(
                email
            );


        if (!email) {

            return false;

        }


        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /*=====================================================
      PHONE VALIDATION
    =====================================================*/

    function isValidPhone(
        phone
    ) {

        phone =
            safeString(
                phone
            );


        if (!phone) {

            return false;

        }


        /*
         * South African-friendly validation.
         * Allows +27, 0 and spaces/hyphens.
         */

        const cleaned =
            phone.replace(
                /[\s\-().]/g,
                ""
            );


        return /^(\+27|0)[0-9]{9}$/
            .test(cleaned);

    }


    /*=====================================================
      SET CUSTOMER
    =====================================================*/

    function setCustomer(
        customer
    ) {

        if (
            !customer ||
            typeof customer !==
            "object"
        ) {

            checkoutState.customer =
                null;


            return null;

        }


        const cleanCustomer = {};


        CUSTOMER_FIELDS.forEach(
            function (field) {

                cleanCustomer[field] =
                    safeString(
                        customer[field]
                    );

            }
        );


        checkoutState.customer =
            cleanCustomer;


        checkoutState.prepared =
            false;


        return copyObject(
            cleanCustomer
        );

    }


    /*=====================================================
      GET CUSTOMER
    =====================================================*/

    function getCustomer() {

        return checkoutState.customer
            ? copyObject(
                checkoutState.customer
            )
            : null;

    }


    /*=====================================================
      SET DELIVERY DETAILS
    =====================================================*/

    function setDeliveryDetails(
        delivery
    ) {

        if (
            !delivery ||
            typeof delivery !==
            "object"
        ) {

            checkoutState.delivery =
                null;


            return null;

        }


        checkoutState.delivery = {

            method:
                safeString(
                    delivery.method
                ),

            addressLine1:
                safeString(
                    delivery.addressLine1
                ),

            addressLine2:
                safeString(
                    delivery.addressLine2
                ),

            suburb:
                safeString(
                    delivery.suburb
                ),

            city:
                safeString(
                    delivery.city
                ),

            province:
                safeString(
                    delivery.province
                ),

            postalCode:
                safeString(
                    delivery.postalCode
                ),

            country:
                safeString(
                    delivery.country
                ) ||
                "South Africa",

            instructions:
                safeString(
                    delivery.instructions
                )

        };


        /*
         * Also update Part 6 metadata.
         */

        if (
            checkoutState.delivery.method
        ) {

            Cart.setDeliveryMethod(
                checkoutState.delivery.method
            );

        }


        checkoutState.prepared =
            false;


        return copyObject(
            checkoutState.delivery
        );

    }


    /*=====================================================
      GET DELIVERY DETAILS
    =====================================================*/

    function getDeliveryDetails() {

        return checkoutState.delivery
            ? copyObject(
                checkoutState.delivery
            )
            : null;

    }


    /*=====================================================
      SET PAYMENT METHOD
    =====================================================*/

    function setPaymentMethod(
        method
    ) {

        checkoutState.paymentMethod =
            safeString(
                method
            ).toLowerCase();


        checkoutState.prepared =
            false;


        return checkoutState.paymentMethod;

    }


    /*=====================================================
      GET PAYMENT METHOD
    =====================================================*/

    function getPaymentMethod() {

        return (
            checkoutState.paymentMethod ||
            null
        );

    }


    /*=====================================================
      SET ORDER NOTES
    =====================================================*/

    function setOrderNotes(
        notes
    ) {

        notes =
            safeString(
                notes
            );


        if (
            notes.length > 2000
        ) {

            notes =
                notes.substring(
                    0,
                    2000
                );

        }


        checkoutState.orderNotes =
            notes;


        Cart.setNotes(
            notes
        );


        checkoutState.prepared =
            false;


        return notes;

    }


    /*=====================================================
      GET ORDER NOTES
    =====================================================*/

    function getOrderNotes() {

        return (
            checkoutState.orderNotes ||
            ""
        );

    }


    /*=====================================================
      VALIDATE CUSTOMER
    =====================================================*/

    function validateCustomer(
        customer
    ) {

        customer =
            customer ||
            checkoutState.customer ||
            {};


        const errors = [];


        if (
            !safeString(
                customer.firstName
            )
        ) {

            errors.push(
                "First name is required."
            );

        }


        if (
            !safeString(
                customer.lastName
            )
        ) {

            errors.push(
                "Last name is required."
            );

        }


        const email =
            safeString(
                customer.email
            );


        if (!email) {

            errors.push(
                "Email address is required."
            );

        } else if (
            !isValidEmail(
                email
            )
        ) {

            errors.push(
                "Please enter a valid email address."
            );

        }


        const phone =
            safeString(
                customer.phone
            );


        if (!phone) {

            errors.push(
                "Phone number is required."
            );

        } else if (
            !isValidPhone(
                phone
            )
        ) {

            errors.push(
                "Please enter a valid South African phone number."
            );

        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors

        };

    }


    /*=====================================================
      VALIDATE DELIVERY
    =====================================================*/

    function validateDelivery(
        delivery
    ) {

        delivery =
            delivery ||
            checkoutState.delivery ||
            {};


        const errors = [];


        const method =
            safeString(
                delivery.method
            );


        if (!method) {

            errors.push(
                "Delivery method is required."
            );

        }


        /*
         * Collection can work without a delivery address.
         */

        const collectionMethods = [

            "collection",

            "pickup",

            "pick-up",

            "store collection"

        ];


        const isCollection =
            collectionMethods.indexOf(
                method.toLowerCase()
            ) !== -1;


        if (!isCollection) {

            if (
                !safeString(
                    delivery.addressLine1
                )
            ) {

                errors.push(
                    "Delivery address is required."
                );

            }


            if (
                !safeString(
                    delivery.city
                )
            ) {

                errors.push(
                    "City is required."
                );

            }


            if (
                !safeString(
                    delivery.province
                )
            ) {

                errors.push(
                    "Province is required."
                );

            }


            if (
                !safeString(
                    delivery.postalCode
                )
            ) {

                errors.push(
                    "Postal code is required."
                );

            }

        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors

        };

    }


    /*=====================================================
      VALIDATE PAYMENT
    =====================================================*/

    function validatePayment(
        method
    ) {

        method =
            safeString(
                method ||
                checkoutState.paymentMethod
            );


        if (!method) {

            return {

                valid:
                    false,

                errors: [

                    "Payment method is required."

                ]

            };

        }


        return {

            valid:
                true,

            errors:
                []

        };

    }


    /*=====================================================
      VALIDATE CHECKOUT
    =====================================================*/

    function validateCheckout(
        options
    ) {

        options =
            options || {};


        const errors = [];


        /*
         * Cart validation.
         */

        const cartValidation =
            Cart.validate();


        if (
            !cartValidation.valid
        ) {

            cartValidation.issues.forEach(
                function (issue) {

                    errors.push(

                        issue.productName +
                        ": " +
                        issue.reason

                    );

                }
            );

        }


        /*
         * Customer validation.
         */

        const customerValidation =
            validateCustomer(
                options.customer ||
                checkoutState.customer
            );


        if (
            !customerValidation.valid
        ) {

            errors.push(
                ...customerValidation.errors
            );

        }


        /*
         * Delivery validation.
         */

        const deliveryValidation =
            validateDelivery(
                options.delivery ||
                checkoutState.delivery
            );


        if (
            !deliveryValidation.valid
        ) {

            errors.push(
                ...deliveryValidation.errors
            );

        }


        /*
         * Payment validation.
         *
         * Payment can be skipped when this function
         * is specifically being used to prepare an
         * enquiry/quote instead of immediate payment.
         */

        if (
            options.requirePayment !== false
        ) {

            const paymentValidation =
                validatePayment(
                    options.paymentMethod ||
                    checkoutState.paymentMethod
                );


            if (
                !paymentValidation.valid
            ) {

                errors.push(
                    ...paymentValidation.errors
                );

            }

        }


        const totals =
            Cart.calculate();


        if (
            Number(
                totals.itemCount
            ) <= 0
        ) {

            errors.push(
                "Your cart is empty."
            );

        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors,

            cart:
                cartValidation,

            customer:
                customerValidation,

            delivery:
                deliveryValidation,

            totals:
                totals

        };

    }


    /*=====================================================
      BUILD ORDER ITEMS
    =====================================================*/

    function buildOrderItems() {

        const lines =
            Cart.getLineItems();


        return lines.map(
            function (item) {

                return {

                    productId:
                        safeString(
                            item.id
                        ),

                    name:
                        safeString(
                            item.name
                        ),

                    quantity:
                        Number(
                            item.quantity
                        ) || 0,

                    unitPrice:
                        Number(
                            item.price
                        ) || 0,

                    lineTotal:
                        Number(
                            item.lineTotal
                        ) || 0

                };

            }
        );

    }


    /*=====================================================
      BUILD ORDER PAYLOAD
    =====================================================*/

    function buildOrderPayload(
        options
    ) {

        options =
            options || {};


        /*
         * Allow checkout information to be passed
         * directly into this function.
         */

        if (
            options.customer
        ) {

            setCustomer(
                options.customer
            );

        }


        if (
            options.delivery
        ) {

            setDeliveryDetails(
                options.delivery
            );

        }


        if (
            options.paymentMethod
        ) {

            setPaymentMethod(
                options.paymentMethod
            );

        }


        if (
            options.orderNotes !== undefined
        ) {

            setOrderNotes(
                options.orderNotes
            );

        }


        const validation =
            validateCheckout(
                options
            );


        if (
            !validation.valid
        ) {

            return {

                success:
                    false,

                valid:
                    false,

                errors:
                    validation.errors,

                validation:
                    validation

            };

        }


        const totals =
            Cart.calculate();


        const reference =
            Cart.getReference();


        const orderDate =
            new Date().toISOString();


        const payload = {

            orderReference:
                reference,

            orderDate:
                orderDate,

            status:
                "pending",

            currency:
                "ZAR",

            customer:
                getCustomer(),

            customerType:
                Cart.getCustomerType(),

            delivery:
                getDeliveryDetails(),

            paymentMethod:
                getPaymentMethod(),

            notes:
                getOrderNotes(),

            items:
                buildOrderItems(),

            totals: {

                itemCount:
                    totals.itemCount,

                subtotal:
                    totals.subtotal,

                discount:
                    totals.discount,

                tax:
                    totals.tax,

                delivery:
                    totals.delivery,

                savings:
                    totals.savings,

                grandTotal:
                    totals.grandTotal

            },

            promo:
                typeof Cart.getPromo ===
                "function"

                    ? Cart.getPromo()

                    : null

        };


        return {

            success:
                true,

            valid:
                true,

            order:
                payload,

            validation:
                validation

        };

    }


    /*=====================================================
      PREPARE CHECKOUT
    =====================================================*/

    function prepareCheckout(
        options
    ) {

        const result =
            buildOrderPayload(
                options
            );


        if (
            !result.success
        ) {

            checkoutState.prepared =
                false;


            return result;

        }


        checkoutState.prepared =
            true;


        checkoutState.preparedAt =
            new Date().toISOString();


        window.dispatchEvent(

            new CustomEvent(
                "nexpak:checkout:prepared",
                {

                    detail: {

                        order:
                            result.order,

                        preparedAt:
                            checkoutState.preparedAt

                    }

                }
            )

        );


        return {

            ...result,

            prepared:
                true,

            preparedAt:
                checkoutState.preparedAt

        };

    }


    /*=====================================================
      GET CHECKOUT STATE
    =====================================================*/

    function getCheckoutState() {

        return {

            customer:
                getCustomer(),

            delivery:
                getDeliveryDetails(),

            paymentMethod:
                getPaymentMethod(),

            orderNotes:
                getOrderNotes(),

            prepared:
                checkoutState.prepared,

            preparedAt:
                checkoutState.preparedAt

        };

    }


    /*=====================================================
      RESET CHECKOUT STATE
    =====================================================*/

    function resetCheckoutState() {

        checkoutState = {

            customer:
                null,

            delivery:
                null,

            paymentMethod:
                null,

            orderNotes:
                "",

            prepared:
                false,

            preparedAt:
                null

        };


        return getCheckoutState();

    }


    /*=====================================================
      GET ORDER JSON
    =====================================================*/

    function getOrderJSON(
        options
    ) {

        const result =
            buildOrderPayload(
                options
            );


        if (
            !result.success
        ) {

            return null;

        }


        try {

            return JSON.stringify(
                result.order
            );

        } catch (error) {

            console.error(

                "[NEXPAK ONLINE CART] Order JSON failed:",

                error

            );


            return null;

        }

    }


    /*=====================================================
      CHECKOUT HANDOFF
    =====================================================*/

    function handoffToCheckout(
        options
    ) {

        const result =
            prepareCheckout(
                options
            );


        if (
            !result.success
        ) {

            return result;

        }


        /*
         * If online checkout functions exist,
         * hand the order to them.
         */

        if (
            typeof window.openOnlineCheckout ===
            "function"
        ) {

            window.openOnlineCheckout(
                result.order
            );

            return result;

        }


        if (
            typeof window.startOnlineCheckout ===
            "function"
        ) {

            window.startOnlineCheckout(
                result.order
            );

            return result;

        }


        /*
         * No checkout engine exists yet.
         *
         * We deliberately DO NOT redirect to an
         * unknown URL.
         */

        window.dispatchEvent(

            new CustomEvent(
                "nexpak:checkout:ready",
                {

                    detail: {

                        order:
                            result.order

                    }

                }
            )

        );


        return result;

    }


    /*=====================================================
      PUBLIC API
    =====================================================*/

    Cart.setCustomer =
        setCustomer;


    Cart.getCustomer =
        getCustomer;


    Cart.setDeliveryDetails =
        setDeliveryDetails;


    Cart.getDeliveryDetails =
        getDeliveryDetails;


    Cart.setPaymentMethod =
        setPaymentMethod;


    Cart.getPaymentMethod =
        getPaymentMethod;


    Cart.setOrderNotes =
        setOrderNotes;


    Cart.getOrderNotes =
        getOrderNotes;


    Cart.validateCustomer =
        validateCustomer;


    Cart.validateDelivery =
        validateDelivery;


    Cart.validatePayment =
        validatePayment;


    Cart.validateCheckout =
        validateCheckout;


    Cart.buildOrderItems =
        buildOrderItems;


    Cart.buildOrder =
        buildOrderPayload;


    Cart.prepareCheckout =
        prepareCheckout;


    Cart.getCheckoutState =
        getCheckoutState;


    Cart.resetCheckout =
        resetCheckoutState;


    Cart.getOrderJSON =
        getOrderJSON;


    Cart.checkout =
        handoffToCheckout;


    /*=====================================================
      GLOBAL FUNCTIONS
    =====================================================*/

    window.prepareOnlineCheckout =
        prepareCheckout;


    window.buildOnlineOrder =
        buildOrderPayload;


    window.validateOnlineCheckout =
        validateCheckout;


    window.startOnlineCheckout =
        handoffToCheckout;


    /*=====================================================
      CHECKOUT BUTTON HANDLER
    =====================================================*/

    function bindCheckoutButtons() {

        document.addEventListener(

            "click",

            function (event) {

                const button =
                    event.target.closest(
                        "[data-checkout]"
                    );


                if (!button) {

                    return;

                }


                if (
                    button.disabled
                ) {

                    return;

                }


                /*
                 * Prevent accidental navigation.
                 */

                event.preventDefault();


                const result =
                    handoffToCheckout();


                if (
                    !result.success
                ) {

                    console.warn(

                        "[NEXPAK ONLINE CART] Checkout validation failed:",

                        result.errors

                    );


                    window.dispatchEvent(

                        new CustomEvent(
                            "nexpak:checkout:error",
                            {

                                detail: {

                                    errors:
                                        result.errors

                                }

                            }
                        )

                    );

                }

            }

        );

    }


    /*=====================================================
      INITIALISE PART 7
    =====================================================*/

    function initPart7() {

        bindCheckoutButtons();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart7
        );

    } else {

        initPart7();

    }


    /*=====================================================
      READY MESSAGE
    =====================================================*/

    console.log(
        "[NEXPAK ONLINE CART] Part 7 loaded."
    );


})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CART ENGINE
 ---------------------------------------------------------
 File: onlinecart.js
 Part: 8/8 — FINAL
 Purpose:
 Final cart interaction layer, quantity controls,
 remove controls, notifications, accessibility,
 event management and final API exposure.
=========================================================*/


(function () {

    "use strict";


    /*=====================================================
      CART ENGINE CHECK
    =====================================================*/

    if (!window.NEXPAKOnlineCart) {

        console.error(
            "[NEXPAK ONLINE CART] Parts 1-7 must load first."
        );

        return;

    }


    const Cart =
        window.NEXPAKOnlineCart;


    /*=====================================================
      INTERNAL STATE
    =====================================================*/

    const STATE = {

        initialized:
            false,

        busy:
            false,

        lastAction:
            null,

        lastProductId:
            null

    };


    /*=====================================================
      CONFIGURATION
    =====================================================*/

    const CONFIG = {

        minQuantity:
            1,

        maxQuantity:
            999,

        notificationDuration:
            3000

    };


    /*=====================================================
      SAFE STRING
    =====================================================*/

    function safeString(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(
            value
        ).trim();

    }


    /*=====================================================
      SAFE INTEGER
    =====================================================*/

    function safeInteger(
        value,
        fallback
    ) {

        const number =
            parseInt(
                value,
                10
            );


        if (
            !Number.isFinite(
                number
            )
        ) {

            return (
                fallback || 0
            );

        }


        return number;

    }


    /*=====================================================
      CLAMP QUANTITY
    =====================================================*/

    function clampQuantity(
        quantity
    ) {

        quantity =
            safeInteger(
                quantity,
                CONFIG.minQuantity
            );


        return Math.min(

            CONFIG.maxQuantity,

            Math.max(

                CONFIG.minQuantity,

                quantity

            )

        );

    }


    /*=====================================================
      FIND PRODUCT ID
    =====================================================*/

    function getProductIdFromElement(
        element
    ) {

        if (!element) {

            return "";

        }


        const id =
            element.getAttribute(
                "data-cart-product-id"
            );


        if (id) {

            return safeString(
                id
            );

        }


        const parent =
            element.closest(
                "[data-cart-product-id]"
            );


        if (parent) {

            return safeString(

                parent.getAttribute(
                    "data-cart-product-id"
                )

            );

        }


        return "";

    }


    /*=====================================================
      NOTIFICATION CONTAINER
    =====================================================*/

    function getNotificationContainer() {

        let container =
            document.querySelector(
                "[data-online-cart-notification]"
            );


        if (container) {

            return container;

        }


        container =
            document.createElement(
                "div"
            );


        container.className =
            "online-cart-notification";


        container.setAttribute(
            "data-online-cart-notification",
            "true"
        );


        container.setAttribute(
            "role",
            "status"
        );


        container.setAttribute(
            "aria-live",
            "polite"
        );


        document.body.appendChild(
            container
        );


        return container;

    }


    /*=====================================================
      SHOW NOTIFICATION
    =====================================================*/

    function notify(
        message,
        type
    ) {

        message =
            safeString(
                message
            );


        if (!message) {

            return;

        }


        type =
            safeString(
                type
            ) ||
            "info";


        const container =
            getNotificationContainer();


        container.textContent =
            message;


        container.setAttribute(
            "data-type",
            type
        );


        container.classList.add(
            "is-visible"
        );


        clearTimeout(
            container._nexpakTimer
        );


        container._nexpakTimer =
            setTimeout(

                function () {

                    container.classList.remove(
                        "is-visible"
                    );

                },

                CONFIG.notificationDuration

            );

    }


    /*=====================================================
      DISPATCH CART EVENT
    =====================================================*/

    function dispatchCartEvent(
        action,
        details
    ) {

        STATE.lastAction =
            action;


        if (
            details &&
            details.productId
        ) {

            STATE.lastProductId =
                details.productId;

        }


        window.dispatchEvent(

            new CustomEvent(
                "nexpak:cart:action",
                {

                    detail: {

                        action:
                            action,

                        ...(details || {}),

                        totals:
                            Cart.calculate()

                    }

                }
            )

        );

    }


    /*=====================================================
      INCREASE QUANTITY
    =====================================================*/

    function increaseQuantity(
        productId
    ) {

        productId =
            safeString(
                productId
            );


        if (!productId) {

            return {

                success:
                    false,

                message:
                    "Product ID is missing."

            };

        }


        const item =
            Cart.getItem(
                productId
            );


        if (!item) {

            return {

                success:
                    false,

                message:
                    "Product is not in the cart."

            };

        }


        const currentQuantity =
            safeInteger(
                item.quantity,
                1
            );


        if (
            currentQuantity >=
            CONFIG.maxQuantity
        ) {

            notify(
                "Maximum quantity reached.",
                "warning"
            );


            return {

                success:
                    false,

                message:
                    "Maximum quantity reached."

            };

        }


        const newQuantity =
            currentQuantity + 1;


        const result =
            Cart.updateQuantity(

                productId,

                newQuantity

            );


        if (
            result &&
            result.success !== false
        ) {

            dispatchCartEvent(

                "increase",

                {

                    productId:
                        productId,

                    quantity:
                        newQuantity

                }

            );

        }


        return result;

    }


    /*=====================================================
      DECREASE QUANTITY
    =====================================================*/

    function decreaseQuantity(
        productId
    ) {

        productId =
            safeString(
                productId
            );


        if (!productId) {

            return {

                success:
                    false,

                message:
                    "Product ID is missing."

            };

        }


        const item =
            Cart.getItem(
                productId
            );


        if (!item) {

            return {

                success:
                    false,

                message:
                    "Product is not in the cart."

            };

        }


        const currentQuantity =
            safeInteger(
                item.quantity,
                1
            );


        const newQuantity =
            currentQuantity - 1;


        /*
         * If quantity reaches zero, remove the item.
         */

        if (
            newQuantity <= 0
        ) {

            return removeItem(
                productId
            );

        }


        const result =
            Cart.updateQuantity(

                productId,

                newQuantity

            );


        if (
            result &&
            result.success !== false
        ) {

            dispatchCartEvent(

                "decrease",

                {

                    productId:
                        productId,

                    quantity:
                        newQuantity

                }

            );

        }


        return result;

    }


    /*=====================================================
      SET QUANTITY
    =====================================================*/

    function setQuantity(
        productId,
        quantity
    ) {

        productId =
            safeString(
                productId
            );


        if (!productId) {

            return {

                success:
                    false,

                message:
                    "Product ID is missing."

            };

        }


        quantity =
            safeInteger(
                quantity,
                CONFIG.minQuantity
            );


        /*
         * Zero means remove.
         */

        if (
            quantity <= 0
        ) {

            return removeItem(
                productId
            );

        }


        quantity =
            clampQuantity(
                quantity
            );


        const result =
            Cart.updateQuantity(

                productId,

                quantity

            );


        if (
            result &&
            result.success !== false
        ) {

            dispatchCartEvent(

                "quantity",

                {

                    productId:
                        productId,

                    quantity:
                        quantity

                }

            );

        }


        return result;

    }


    /*=====================================================
      REMOVE ITEM
    =====================================================*/

    function removeItem(
        productId
    ) {

        productId =
            safeString(
                productId
            );


        if (!productId) {

            return {

                success:
                    false,

                message:
                    "Product ID is missing."

            };

        }


        const item =
            Cart.getItem(
                productId
            );


        if (!item) {

            return {

                success:
                    false,

                message:
                    "Product is not in the cart."

            };

        }


        const productName =
            safeString(
                item.name
            ) ||
            "Product";


        const result =
            Cart.remove(
                productId
            );


        if (
            result &&
            result.success !== false
        ) {

            notify(
                productName +
                " removed from cart.",
                "success"
            );


            dispatchCartEvent(

                "remove",

                {

                    productId:
                        productId,

                    productName:
                        productName

                }

            );

        }


        return result;

    }


    /*=====================================================
      CLEAR CART
    =====================================================*/

    function clearCart() {

        const count =
            Cart.get().length;


        if (
            count === 0
        ) {

            return {

                success:
                    true,

                message:
                    "Cart is already empty."

            };

        }


        const result =
            Cart.clear();


        if (
            result &&
            result.success !== false
        ) {

            /*
             * Remove checkout session data if available.
             */

            if (
                typeof Cart.resetCheckout ===
                "function"
            ) {

                Cart.resetCheckout();

            }


            if (
                typeof Cart.clearSession ===
                "function"
            ) {

                Cart.clearSession();

            }


            notify(
                "Cart cleared.",
                "success"
            );


            dispatchCartEvent(
                "clear"
            );

        }


        return result;

    }


    /*=====================================================
      HANDLE QUANTITY INPUT
    =====================================================*/

    function handleQuantityInput(
        input
    ) {

        if (!input) {

            return;

        }


        const productId =
            getProductIdFromElement(
                input
            );


        if (!productId) {

            return;

        }


        const quantity =
            safeInteger(
                input.value,
                CONFIG.minQuantity
            );


        setQuantity(

            productId,

            quantity

        );

    }


    /*=====================================================
      HANDLE CART CLICK
    =====================================================*/

    function handleCartClick(
        event
    ) {

        const target =
            event.target;


        if (!target) {

            return;

        }


        /*
         * Increase button.
         */

        const increaseButton =
            target.closest(
                '[data-cart-action="increase"]'
            );


        if (
            increaseButton
        ) {

            event.preventDefault();


            const productId =
                getProductIdFromElement(
                    increaseButton
                );


            increaseQuantity(
                productId
            );


            return;

        }


        /*
         * Decrease button.
         */

        const decreaseButton =
            target.closest(
                '[data-cart-action="decrease"]'
            );


        if (
            decreaseButton
        ) {

            event.preventDefault();


            const productId =
                getProductIdFromElement(
                    decreaseButton
                );


            decreaseQuantity(
                productId
            );


            return;

        }


        /*
         * Remove button.
         */

        const removeButton =
            target.closest(
                "[data-remove-cart-item]"
            );


        if (
            removeButton
        ) {

            event.preventDefault();


            const productId =
                getProductIdFromElement(
                    removeButton
                );


            removeItem(
                productId
            );


            return;

        }


        /*
         * Clear cart.
         */

        const clearButton =
            target.closest(
                "[data-clear-cart]"
            );


        if (
            clearButton
        ) {

            event.preventDefault();


            clearCart();


            return;

        }

    }


    /*=====================================================
      HANDLE CART CHANGE
    =====================================================*/

    function handleCartChange(
        event
    ) {

        const target =
            event.target;


        if (!target) {

            return;

        }


        if (
            target.matches(
                "[data-cart-quantity-input]"
            )
        ) {

            handleQuantityInput(
                target
            );

        }

    }


    /*=====================================================
      KEYBOARD ACCESSIBILITY
    =====================================================*/

    function handleKeyboard(
        event
    ) {

        const target =
            event.target;


        if (!target) {

            return;

        }


        /*
         * Quantity inputs.
         */

        if (
            target.matches(
                "[data-cart-quantity-input]"
            )
        ) {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();


                handleQuantityInput(
                    target
                );


                target.blur();

            }

        }

    }


    /*=====================================================
      CART BADGE ACCESSIBILITY
    =====================================================*/

    function updateAccessibilityLabels() {

        const totals =
            Cart.calculate();


        const count =
            safeInteger(
                totals.itemCount,
                0
            );


        document
            .querySelectorAll(
                ".cart-count, [data-cart-count]"
            )
            .forEach(
                function (element) {

                    element.setAttribute(

                        "aria-label",

                        count === 1

                            ? "1 item in cart"

                            : count +
                              " items in cart"

                    );

                }
            );

    }


    /*=====================================================
      UPDATE QUANTITY INPUTS
    =====================================================*/

    function synchronizeQuantityInputs() {

        const cart =
            Cart.get();


        cart.forEach(
            function (item) {

                const productId =
                    safeString(
                        item.id
                    );


                document
                    .querySelectorAll(

                        '[data-cart-quantity-input="' +
                        productId +
                        '"]'

                    )
                    .forEach(
                        function (input) {

                            input.value =
                                item.quantity;

                        }
                    );

            }
        );

    }


    /*=====================================================
      CHECKOUT ERROR HANDLER
    =====================================================*/

    function handleCheckoutError(
        event
    ) {

        const detail =
            event.detail ||
            {};


        const errors =
            Array.isArray(
                detail.errors
            )
                ? detail.errors
                : [];


        if (
            errors.length === 0
        ) {

            notify(
                "Please check your checkout details.",
                "warning"
            );


            return;

        }


        notify(
            errors[0],
            "error"
        );

    }


    /*=====================================================
      CHECKOUT READY HANDLER
    =====================================================*/

    function handleCheckoutReady(
        event
    ) {

        const order =
            event.detail &&
            event.detail.order;


        if (!order) {

            return;

        }


        /*
         * This event intentionally does not process
         * payment. The checkout/payment engine will
         * consume the prepared order later.
         */

        console.log(

            "[NEXPAK ONLINE CART] Checkout order ready:",

            order.orderReference

        );

    }


    /*=====================================================
      PROMO UPDATE HANDLER
    =====================================================*/

    function handlePromoUpdate() {

        if (
            typeof Cart.render ===
            "function"
        ) {

            Cart.render();

        }

    }


    /*=====================================================
      BIND EVENTS
    =====================================================*/

    function bindEvents() {

        /*
         * Delegated click listener.
         * Works for dynamically rendered cart items.
         */

        document.addEventListener(

            "click",

            handleCartClick

        );


        /*
         * Quantity inputs.
         */

        document.addEventListener(

            "change",

            handleCartChange

        );


        /*
         * Keyboard controls.
         */

        document.addEventListener(

            "keydown",

            handleKeyboard

        );


        /*
         * Cart updates.
         */

        window.addEventListener(

            "nexpak:cart:update",

            handleCartUpdate

        );


        /*
         * Checkout errors.
         */

        window.addEventListener(

            "nexpak:checkout:error",

            handleCheckoutError

        );


        /*
         * Checkout ready.
         */

        window.addEventListener(

            "nexpak:checkout:ready",

            handleCheckoutReady

        );


        /*
         * Promo changes.
         */

        window.addEventListener(

            "nexpak:promo:update",

            handlePromoUpdate

        );

    }


    /*=====================================================
      FINAL CART STATE
    =====================================================*/

    function getState() {

        return {

            initialized:
                STATE.initialized,

            busy:
                STATE.busy,

            lastAction:
                STATE.lastAction,

            lastProductId:
                STATE.lastProductId,

            itemCount:
                Cart.calculate().itemCount,

            totals:
                Cart.calculate()

        };

    }


    /*=====================================================
      FINAL CART API
    =====================================================*/

    Cart.increase =
        increaseQuantity;


    Cart.decrease =
        decreaseQuantity;


    Cart.setQuantity =
        setQuantity;


    Cart.removeItem =
        removeItem;


    Cart.clearCart =
        clearCart;


    Cart.notify =
        notify;


    Cart.getState =
        getState;


    Cart.getConfig =
        function () {

            return {

                ...CONFIG

            };

        };


    /*=====================================================
      GLOBAL HELPERS
    =====================================================*/

    window.increaseOnlineCartQuantity =
        increaseQuantity;


    window.decreaseOnlineCartQuantity =
        decreaseQuantity;


    window.setOnlineCartQuantity =
        setQuantity;


    window.removeOnlineCartItem =
        removeItem;


    window.clearOnlineCart =
        clearCart;


    window.getOnlineCartState =
        getState;


    /*=====================================================
      FINAL INITIALIZATION
    =====================================================*/

    function initPart8() {

        if (
            STATE.initialized
        ) {

            return;

        }


        bindEvents();


        /*
         * Recover cart/session information if Part 6
         * exposes the recovery function.
         */

        if (
            typeof Cart.recover ===
            "function"
        ) {

            Cart.recover();

        }


        /*
         * Render cart one final time if Part 5
         * exposes the renderer.
         */

        if (
            typeof Cart.render ===
            "function"
        ) {

            Cart.render();

        }


        updateAccessibilityLabels();


        synchronizeQuantityInputs();


        STATE.initialized =
            true;


        /*
         * Final ready event.
         */

        window.dispatchEvent(

            new CustomEvent(
                "nexpak:onlinecart:ready",
                {

                    detail: {

                        cart:
                            Cart.get(),

                        totals:
                            Cart.calculate(),

                        state:
                            getState()

                    }

                }
            )

        );

    }


    /*=====================================================
      DOCUMENT READY
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            initPart8

        );

    } else {

        initPart8();

    }


    /*=====================================================
      FINAL READY MESSAGE
    =====================================================*/

    console.log(
        "================================================="
    );

    console.log(
        " NEXPAK ONLINE CART — COMPLETE"
    );

    console.log(
        " onlinecart.js Parts 1-8 loaded successfully."
    );

    console.log(
        " Cart engine ready for checkout integration."
    );

    console.log(
        "================================================="
    );


})();
