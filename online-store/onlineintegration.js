/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   FILE: onlineintegration.js
   PART 1
   PURPOSE:
   - Connect the Online Store engines
   - Detect available modules
   - Maintain integration state
   - Prepare safe event communication
   - DO NOT duplicate business logic
   ========================================================= */

(function () {

    "use strict";


    /* =========================================================
       1. INTEGRATION CONFIGURATION
       ========================================================= */

    const NEXPAK_ONLINE_INTEGRATION_CONFIG = {

        version: "1.0.0",

        mode: "ONLINE_STORE",

        storeEngine:
            "NEXPAK_ONLINE_STORE",

        deliveryEngine:
            "NEXPAK_ONLINE_DELIVERY",

        checkoutEngine:
            "NEXPAK_ONLINE_CHECKOUT",

        uiEngine:
            "NEXPAK_ONLINE_UI"

    };


    /* =========================================================
       2. INTEGRATION STATE
       ========================================================= */

    const NEXPAK_ONLINE_INTEGRATION_STATE = {

        initialised: false,

        domReady: false,

        storeAvailable: false,

        deliveryAvailable: false,

        checkoutAvailable: false,

        uiAvailable: false,

        lastUpdated: null

    };


    /* =========================================================
       3. GET ONLINE STORE ENGINE
       ========================================================= */

    function getNexpakOnlineIntegrationStore() {

        if (
            window.NEXPAK_ONLINE_STORE &&
            typeof window.NEXPAK_ONLINE_STORE === "object"
        ) {

            return window.NEXPAK_ONLINE_STORE;

        }


        return null;

    }


    /* =========================================================
       4. GET DELIVERY ENGINE
       ========================================================= */

    function getNexpakOnlineIntegrationDelivery() {

        if (
            window.NEXPAK_ONLINE_DELIVERY &&
            typeof window.NEXPAK_ONLINE_DELIVERY === "object"
        ) {

            return window.NEXPAK_ONLINE_DELIVERY;

        }


        return null;

    }


    /* =========================================================
       5. GET CHECKOUT ENGINE
       ========================================================= */

    function getNexpakOnlineIntegrationCheckout() {

        if (
            window.NEXPAK_ONLINE_CHECKOUT &&
            typeof window.NEXPAK_ONLINE_CHECKOUT === "object"
        ) {

            return window.NEXPAK_ONLINE_CHECKOUT;

        }


        return null;

    }


    /* =========================================================
       6. GET UI ENGINE
       ========================================================= */

    function getNexpakOnlineIntegrationUI() {

        if (
            window.NEXPAK_ONLINE_UI &&
            typeof window.NEXPAK_ONLINE_UI === "object"
        ) {

            return window.NEXPAK_ONLINE_UI;

        }


        return null;

    }


    /* =========================================================
       7. CHECK DOM READY
       ========================================================= */

    function checkNexpakOnlineIntegrationDOM() {

        const ready =
            document.readyState === "interactive" ||
            document.readyState === "complete";


        NEXPAK_ONLINE_INTEGRATION_STATE.domReady =
            ready;


        return ready;

    }


    /* =========================================================
       8. CHECK AVAILABLE ENGINES
       ========================================================= */

    function checkNexpakOnlineIntegrationEngines() {

        NEXPAK_ONLINE_INTEGRATION_STATE.storeAvailable =
            !!getNexpakOnlineIntegrationStore();


        NEXPAK_ONLINE_INTEGRATION_STATE.deliveryAvailable =
            !!getNexpakOnlineIntegrationDelivery();


        NEXPAK_ONLINE_INTEGRATION_STATE.checkoutAvailable =
            !!getNexpakOnlineIntegrationCheckout();


        NEXPAK_ONLINE_INTEGRATION_STATE.uiAvailable =
            !!getNexpakOnlineIntegrationUI();


        NEXPAK_ONLINE_INTEGRATION_STATE.lastUpdated =
            new Date();


        return {

            store:
                NEXPAK_ONLINE_INTEGRATION_STATE
                    .storeAvailable,

            delivery:
                NEXPAK_ONLINE_INTEGRATION_STATE
                    .deliveryAvailable,

            checkout:
                NEXPAK_ONLINE_INTEGRATION_STATE
                    .checkoutAvailable,

            ui:
                NEXPAK_ONLINE_INTEGRATION_STATE
                    .uiAvailable

        };

    }


    /* =========================================================
       9. GET INTEGRATION STATE
       ========================================================= */

    function getNexpakOnlineIntegrationState() {

        return {

            ...NEXPAK_ONLINE_INTEGRATION_STATE

        };

    }


    /* =========================================================
       10. INITIALISE INTEGRATION STATE
       ========================================================= */

    function initialiseNexpakOnlineIntegrationState() {

        checkNexpakOnlineIntegrationDOM();

        checkNexpakOnlineIntegrationEngines();


        NEXPAK_ONLINE_INTEGRATION_STATE.initialised =
            false;


        return getNexpakOnlineIntegrationState();

    }


    /* =========================================================
       11. PUBLIC INTEGRATION API
       ========================================================= */

    window.NEXPAK_ONLINE_INTEGRATION = {

        config:
            NEXPAK_ONLINE_INTEGRATION_CONFIG,

        state:
            NEXPAK_ONLINE_INTEGRATION_STATE,

        getStore:
            getNexpakOnlineIntegrationStore,

        getDelivery:
            getNexpakOnlineIntegrationDelivery,

        getCheckout:
            getNexpakOnlineIntegrationCheckout,

        getUI:
            getNexpakOnlineIntegrationUI,

        checkDOM:
            checkNexpakOnlineIntegrationDOM,

        checkEngines:
            checkNexpakOnlineIntegrationEngines,

        getState:
            getNexpakOnlineIntegrationState,

        initialiseState:
            initialiseNexpakOnlineIntegrationState

    };


})();

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 2
   ENGINE READINESS + SAFE MODULE ACCESS
   ========================================================= */


/* =========================================================
   12. CHECK STORE READINESS
   ========================================================= */

function isNexpakOnlineIntegrationStoreReady() {

    const store =
        getNexpakOnlineIntegrationStore();


    if (!store) {

        return false;

    }


    /*
     * The store engine is considered available when
     * its public object exists.
     *
     * We do not assume a specific internal function.
     */

    return true;

}


/* =========================================================
   13. CHECK DELIVERY READINESS
   ========================================================= */

function isNexpakOnlineIntegrationDeliveryReady() {

    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (!delivery) {

        return false;

    }


    return true;

}


/* =========================================================
   14. CHECK CHECKOUT READINESS
   ========================================================= */

function isNexpakOnlineIntegrationCheckoutReady() {

    const checkout =
        getNexpakOnlineIntegrationCheckout();


    if (!checkout) {

        return false;

    }


    return true;

}


/* =========================================================
   15. CHECK UI READINESS
   ========================================================= */

function isNexpakOnlineIntegrationUIReady() {

    const ui =
        getNexpakOnlineIntegrationUI();


    if (!ui) {

        return false;

    }


    return true;

}


/* =========================================================
   16. REFRESH ENGINE STATUS
   ========================================================= */

function refreshNexpakOnlineIntegrationStatus() {

    checkNexpakOnlineIntegrationDOM();


    const storeReady =
        isNexpakOnlineIntegrationStoreReady();


    const deliveryReady =
        isNexpakOnlineIntegrationDeliveryReady();


    const checkoutReady =
        isNexpakOnlineIntegrationCheckoutReady();


    const uiReady =
        isNexpakOnlineIntegrationUIReady();


    NEXPAK_ONLINE_INTEGRATION_STATE.storeAvailable =
        storeReady;


    NEXPAK_ONLINE_INTEGRATION_STATE.deliveryAvailable =
        deliveryReady;


    NEXPAK_ONLINE_INTEGRATION_STATE.checkoutAvailable =
        checkoutReady;


    NEXPAK_ONLINE_INTEGRATION_STATE.uiAvailable =
        uiReady;


    NEXPAK_ONLINE_INTEGRATION_STATE.lastUpdated =
        new Date();


    return {

        domReady:
            NEXPAK_ONLINE_INTEGRATION_STATE.domReady,

        storeReady:
            storeReady,

        deliveryReady:
            deliveryReady,

        checkoutReady:
            checkoutReady,

        uiReady:
            uiReady

    };

}


/* =========================================================
   17. GET ENGINE STATUS
   ========================================================= */

function getNexpakOnlineIntegrationEngineStatus() {

    return {

        store:
            isNexpakOnlineIntegrationStoreReady(),

        delivery:
            isNexpakOnlineIntegrationDeliveryReady(),

        checkout:
            isNexpakOnlineIntegrationCheckoutReady(),

        ui:
            isNexpakOnlineIntegrationUIReady()

    };

}


/* =========================================================
   18. CHECK REQUIRED ENGINES
   ========================================================= */

function areNexpakOnlineIntegrationRequiredEnginesReady() {

    const status =
        getNexpakOnlineIntegrationEngineStatus();


    /*
     * Store and delivery are required for the
     * Online Store flow.
     *
     * Checkout and UI may load immediately after
     * integration and therefore are not treated as
     * fatal at this stage.
     */

    return (
        status.store &&
        status.delivery
    );

}


/* =========================================================
   19. SAFE STORE CALL
   ========================================================= */

function callNexpakOnlineIntegrationStoreMethod(
    methodName,
    ...args
) {

    const store =
        getNexpakOnlineIntegrationStore();


    if (!store) {

        return {

            success: false,

            result: null,

            error:
                "Online Store engine is not available."

        };

    }


    if (
        typeof store[methodName] !==
        "function"
    ) {

        return {

            success: false,

            result: null,

            error:
                "Online Store method '" +
                methodName +
                "' is not available."

        };

    }


    try {

        const result =
            store[methodName](...args);


        return {

            success: true,

            result: result,

            error: ""

        };

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: Store method failed.",
            error
        );


        return {

            success: false,

            result: null,

            error:
                error.message ||
                "Online Store method failed."

        };

    }

}


/* =========================================================
   20. SAFE DELIVERY CALL
   ========================================================= */

function callNexpakOnlineIntegrationDeliveryMethod(
    methodName,
    ...args
) {

    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (!delivery) {

        return {

            success: false,

            result: null,

            error:
                "Online Delivery engine is not available."

        };

    }


    if (
        typeof delivery[methodName] !==
        "function"
    ) {

        return {

            success: false,

            result: null,

            error:
                "Online Delivery method '" +
                methodName +
                "' is not available."

        };

    }


    try {

        const result =
            delivery[methodName](...args);


        return {

            success: true,

            result: result,

            error: ""

        };

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: Delivery method failed.",
            error
        );


        return {

            success: false,

            result: null,

            error:
                error.message ||
                "Online Delivery method failed."

        };

    }

}


/* =========================================================
   21. SAFE CHECKOUT CALL
   ========================================================= */

function callNexpakOnlineIntegrationCheckoutMethod(
    methodName,
    ...args
) {

    const checkout =
        getNexpakOnlineIntegrationCheckout();


    if (!checkout) {

        return {

            success: false,

            result: null,

            error:
                "Online Checkout engine is not available."

        };

    }


    if (
        typeof checkout[methodName] !==
        "function"
    ) {

        return {

            success: false,

            result: null,

            error:
                "Online Checkout method '" +
                methodName +
                "' is not available."

        };

    }


    try {

        const result =
            checkout[methodName](...args);


        return {

            success: true,

            result: result,

            error: ""

        };

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: Checkout method failed.",
            error
        );


        return {

            success: false,

            result: null,

            error:
                error.message ||
                "Online Checkout method failed."

        };

    }

}


/* =========================================================
   22. EXTEND PUBLIC INTEGRATION API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .isStoreReady =
        isNexpakOnlineIntegrationStoreReady;


    window.NEXPAK_ONLINE_INTEGRATION
        .isDeliveryReady =
        isNexpakOnlineIntegrationDeliveryReady;


    window.NEXPAK_ONLINE_INTEGRATION
        .isCheckoutReady =
        isNexpakOnlineIntegrationCheckoutReady;


    window.NEXPAK_ONLINE_INTEGRATION
        .isUIReady =
        isNexpakOnlineIntegrationUIReady;


    window.NEXPAK_ONLINE_INTEGRATION
        .refreshStatus =
        refreshNexpakOnlineIntegrationStatus;


    window.NEXPAK_ONLINE_INTEGRATION
        .getEngineStatus =
        getNexpakOnlineIntegrationEngineStatus;


    window.NEXPAK_ONLINE_INTEGRATION
        .requiredEnginesReady =
        areNexpakOnlineIntegrationRequiredEnginesReady;


    window.NEXPAK_ONLINE_INTEGRATION
        .callStore =
        callNexpakOnlineIntegrationStoreMethod;


    window.NEXPAK_ONLINE_INTEGRATION
        .callDelivery =
        callNexpakOnlineIntegrationDeliveryMethod;


    window.NEXPAK_ONLINE_INTEGRATION
        .callCheckout =
        callNexpakOnlineIntegrationCheckoutMethod;

}

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 3
   EVENT BRIDGE
   STORE → CART → DELIVERY → CHECKOUT
   ========================================================= */


/* =========================================================
   23. INTEGRATION EVENT NAMES
   ========================================================= */

const NEXPAK_ONLINE_INTEGRATION_EVENTS = {

    storeReady:
        "nexpak:online-store-ready",

    cartReady:
        "nexpak:online-cart-ready",

    cartUpdated:
        "nexpak:online-cart-updated",

    cartChanged:
        "nexpak:online-cart-changed",

    deliveryUpdated:
        "nexpak:online-delivery-updated",

    checkoutDeliveryUpdated:
        "nexpak:checkout-delivery-updated",

    checkoutReady:
        "nexpak:online-checkout-ready",

    integrationReady:
        "nexpak:online-integration-ready"

};


/* =========================================================
   24. DISPATCH INTEGRATION EVENT
   ========================================================= */

function dispatchNexpakOnlineIntegrationEvent(
    eventName,
    detail
) {

    if (!eventName) {

        return false;

    }


    try {

        window.dispatchEvent(

            new CustomEvent(
                eventName,
                {
                    detail:
                        detail || {}
                }
            )

        );


        return true;

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: " +
            "Unable to dispatch event.",
            error
        );


        return false;

    }

}


/* =========================================================
   25. GET CART OBJECT SAFELY
   ========================================================= */

function getNexpakOnlineIntegrationCart() {

    /*
     * onlinecart.js may expose the cart through
     * different public structures.
     *
     * We only read the existing object.
     * We do not create a second cart.
     */

    if (
        window.NEXPAK_ONLINE_CART &&
        typeof window.NEXPAK_ONLINE_CART === "object"
    ) {

        return window.NEXPAK_ONLINE_CART;

    }


    return null;

}


/* =========================================================
   26. GET CART ITEMS SAFELY
   ========================================================= */

function getNexpakOnlineIntegrationCartItems() {

    const cart =
        getNexpakOnlineIntegrationCart();


    if (!cart) {

        return [];

    }


    if (
        Array.isArray(cart.items)
    ) {

        return cart.items;

    }


    if (
        Array.isArray(cart.cart)
    ) {

        return cart.cart;

    }


    if (
        Array.isArray(cart.products)
    ) {

        return cart.products;

    }


    return [];

}


/* =========================================================
   27. GET CART COUNT SAFELY
   ========================================================= */

function getNexpakOnlineIntegrationCartCount() {

    const cart =
        getNexpakOnlineIntegrationCart();


    if (!cart) {

        return 0;

    }


    const possibleValues = [

        cart.count,

        cart.cartCount,

        cart.itemCount,

        cart.totalQuantity

    ];


    for (
        let i = 0;
        i < possibleValues.length;
        i++
    ) {

        const value =
            Number(
                possibleValues[i]
            );


        if (
            Number.isFinite(value)
        ) {

            return Math.max(
                0,
                value
            );

        }

    }


    const items =
        getNexpakOnlineIntegrationCartItems();


    let total =
        0;


    items.forEach(
        function (item) {

            if (
                !item ||
                typeof item !== "object"
            ) {

                return;

            }


            const quantity =
                Number(
                    item.quantity ??
                    item.qty ??
                    item.count ??
                    0
                );


            if (
                Number.isFinite(quantity)
            ) {

                total +=
                    Math.max(
                        0,
                        quantity
                    );

            }

        }
    );


    return total;

}


/* =========================================================
   28. REFRESH DELIVERY FROM CART
   ========================================================= */

function refreshNexpakOnlineIntegrationDelivery() {

    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (!delivery) {

        return {

            success: false,

            error:
                "Online Delivery engine is not available."

        };

    }


    try {

        let result = null;


        /*
         * Prefer the completed delivery engine's
         * public refresh methods.
         */

        if (
            typeof delivery.refreshEverything ===
            "function"
        ) {

            result =
                delivery.refreshEverything();

        } else if (
            typeof delivery.refreshFromCart ===
            "function"
        ) {

            result =
                delivery.refreshFromCart();

        } else if (
            typeof delivery.refresh ===
            "function"
        ) {

            result =
                delivery.refresh();

        }


        return {

            success: true,

            result: result,

            error: ""

        };

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: " +
            "Delivery refresh failed.",
            error
        );


        return {

            success: false,

            error:
                error.message ||
                "Delivery refresh failed."

        };

    }

}


/* =========================================================
   29. HANDLE CART UPDATED
   ========================================================= */

function handleNexpakOnlineIntegrationCartUpdated(
    event
) {

    const cart =
        getNexpakOnlineIntegrationCart();


    const items =
        getNexpakOnlineIntegrationCartItems();


    const count =
        getNexpakOnlineIntegrationCartCount();


    /*
     * Delivery must react to cart changes because
     * delivery weight depends on the quantity of kits.
     */

    const deliveryResult =
        refreshNexpakOnlineIntegrationDelivery();


    const detail = {

        cartAvailable:
            !!cart,

        itemCount:
            count,

        items:
            items,

        delivery:
            deliveryResult,

        originalEvent:
            event ?
                event.type :
                ""

    };


    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS.deliveryUpdated,

        detail

    );


    return detail;

}


/* =========================================================
   30. HANDLE DELIVERY UPDATED
   ========================================================= */

function handleNexpakOnlineIntegrationDeliveryUpdated(
    event
) {

    const detail =
        event &&
        event.detail
            ? event.detail
            : {};


    /*
     * Notify checkout that the delivery information
     * has changed.
     *
     * The checkout engine remains responsible for
     * calculating the final order total.
     */

    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .checkoutDeliveryUpdated,

        detail

    );


    return detail;

}


/* =========================================================
   31. HANDLE STORE READY
   ========================================================= */

function handleNexpakOnlineIntegrationStoreReady(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .integrationReady,

        {

            source:
                event ?
                    event.type :
                    "store-ready",

            status:
                getNexpakOnlineIntegrationEngineStatus()

        }

    );

}


/* =========================================================
   32. HANDLE CHECKOUT READY
   ========================================================= */

function handleNexpakOnlineIntegrationCheckoutReady(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (
        delivery &&
        typeof delivery.getCheckoutDelivery ===
        "function"
    ) {

        const deliveryData =
            delivery.getCheckoutDelivery();


        dispatchNexpakOnlineIntegrationEvent(

            NEXPAK_ONLINE_INTEGRATION_EVENTS
                .checkoutDeliveryUpdated,

            deliveryData

        );

    }


    return true;

}


/* =========================================================
   33. EXTEND PUBLIC API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION.events =
        NEXPAK_ONLINE_INTEGRATION_EVENTS;


    window.NEXPAK_ONLINE_INTEGRATION.dispatchEvent =
        dispatchNexpakOnlineIntegrationEvent;


    window.NEXPAK_ONLINE_INTEGRATION.getCart =
        getNexpakOnlineIntegrationCart;


    window.NEXPAK_ONLINE_INTEGRATION.getCartItems =
        getNexpakOnlineIntegrationCartItems;


    window.NEXPAK_ONLINE_INTEGRATION.getCartCount =
        getNexpakOnlineIntegrationCartCount;


    window.NEXPAK_ONLINE_INTEGRATION.refreshDelivery =
        refreshNexpakOnlineIntegrationDelivery;

}


/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 4
   EVENT LISTENERS + DUPLICATE-BIND PROTECTION
   ========================================================= */


/* =========================================================
   34. INTEGRATION LISTENER STATE
   ========================================================= */

const NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE = {

    bound: false,

    storeReady: false,

    cartReady: false,

    cartUpdated: false,

    cartChanged: false,

    deliveryUpdated: false,

    checkoutReady: false

};


/* =========================================================
   35. BIND STORE READY EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationStoreReadyEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .storeReady
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS.storeReady,

        handleNexpakOnlineIntegrationStoreReady

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .storeReady = true;


    return true;

}


/* =========================================================
   36. BIND CART READY EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationCartReadyEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartReady
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS.cartReady,

        handleNexpakOnlineIntegrationCartUpdated

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartReady = true;


    return true;

}


/* =========================================================
   37. BIND CART UPDATED EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationCartUpdatedEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartUpdated
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS.cartUpdated,

        handleNexpakOnlineIntegrationCartUpdated

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartUpdated = true;


    return true;

}


/* =========================================================
   38. BIND CART CHANGED EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationCartChangedEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartChanged
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS.cartChanged,

        handleNexpakOnlineIntegrationCartUpdated

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartChanged = true;


    return true;

}


/* =========================================================
   39. BIND DELIVERY UPDATED EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationDeliveryEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .deliveryUpdated
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .deliveryUpdated,

        handleNexpakOnlineIntegrationDeliveryUpdated

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .deliveryUpdated = true;


    return true;

}


/* =========================================================
   40. BIND CHECKOUT READY EVENT
   ========================================================= */

function bindNexpakOnlineIntegrationCheckoutEvent() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .checkoutReady
    ) {

        return true;

    }


    window.addEventListener(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .checkoutReady,

        handleNexpakOnlineIntegrationCheckoutReady

    );


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .checkoutReady = true;


    return true;

}


/* =========================================================
   41. BIND ALL INTEGRATION EVENTS
   ========================================================= */

function bindNexpakOnlineIntegrationEvents() {

    bindNexpakOnlineIntegrationStoreReadyEvent();


    bindNexpakOnlineIntegrationCartReadyEvent();


    bindNexpakOnlineIntegrationCartUpdatedEvent();


    bindNexpakOnlineIntegrationCartChangedEvent();


    bindNexpakOnlineIntegrationDeliveryEvent();


    bindNexpakOnlineIntegrationCheckoutEvent();


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .bound = true;


    return true;

}


/* =========================================================
   42. CHECK EVENT LISTENER STATE
   ========================================================= */

function getNexpakOnlineIntegrationListenerState() {

    return {

        ...NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE

    };

}


/* =========================================================
   43. UNBIND ALL INTEGRATION EVENTS
   ========================================================= */

function unbindNexpakOnlineIntegrationEvents() {

    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .storeReady
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS.storeReady,

            handleNexpakOnlineIntegrationStoreReady

        );

    }


    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartReady
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS.cartReady,

            handleNexpakOnlineIntegrationCartUpdated

        );

    }


    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartUpdated
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS.cartUpdated,

            handleNexpakOnlineIntegrationCartUpdated

        );

    }


    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .cartChanged
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS.cartChanged,

            handleNexpakOnlineIntegrationCartUpdated

        );

    }


    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .deliveryUpdated
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS
                .deliveryUpdated,

            handleNexpakOnlineIntegrationDeliveryUpdated

        );

    }


    if (
        NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
            .checkoutReady
    ) {

        window.removeEventListener(

            NEXPAK_ONLINE_INTEGRATION_EVENTS
                .checkoutReady,

            handleNexpakOnlineIntegrationCheckoutReady

        );

    }


    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .bound = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .storeReady = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartReady = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartUpdated = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .cartChanged = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .deliveryUpdated = false;

    NEXPAK_ONLINE_INTEGRATION_LISTENER_STATE
        .checkoutReady = false;


    return true;

}


/* =========================================================
   44. EXTEND PUBLIC INTEGRATION API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .bindEvents =
        bindNexpakOnlineIntegrationEvents;


    window.NEXPAK_ONLINE_INTEGRATION
        .unbindEvents =
        unbindNexpakOnlineIntegrationEvents;


    window.NEXPAK_ONLINE_INTEGRATION
        .getListenerState =
        getNexpakOnlineIntegrationListenerState;

       }

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 5
   STATE SYNCHRONISATION + CHECKOUT HANDOFF
   ========================================================= */


/* =========================================================
   45. BUILD CURRENT INTEGRATION SNAPSHOT
   ========================================================= */

function buildNexpakOnlineIntegrationSnapshot() {

    const engineStatus =
        getNexpakOnlineIntegrationEngineStatus();


    const cart =
        getNexpakOnlineIntegrationCart();


    const cartItems =
        getNexpakOnlineIntegrationCartItems();


    const cartCount =
        getNexpakOnlineIntegrationCartCount();


    let deliveryData = null;


    /*
     * Delivery remains responsible for its own
     * calculation and checkout data.
     */

    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (
        delivery &&
        typeof delivery.getCheckoutDelivery ===
        "function"
    ) {

        try {

            deliveryData =
                delivery.getCheckoutDelivery();

        } catch (error) {

            console.error(
                "NEXPAK Online Integration: " +
                "Unable to read delivery data.",
                error
            );

        }

    }


    return {

        timestamp:
            new Date(),

        engines:
            engineStatus,

        cart: {

            available:
                !!cart,

            count:
                cartCount,

            items:
                cartItems

        },

        delivery:
            deliveryData

    };

}


/* =========================================================
   46. STORE CURRENT SNAPSHOT
   ========================================================= */

function synchroniseNexpakOnlineIntegrationState() {

    const snapshot =
        buildNexpakOnlineIntegrationSnapshot();


    NEXPAK_ONLINE_INTEGRATION_STATE
        .lastSnapshot =
        snapshot;


    NEXPAK_ONLINE_INTEGRATION_STATE
        .lastUpdated =
        snapshot.timestamp;


    return snapshot;

}


/* =========================================================
   47. GET CURRENT SNAPSHOT
   ========================================================= */

function getNexpakOnlineIntegrationSnapshot() {

    if (
        NEXPAK_ONLINE_INTEGRATION_STATE
            .lastSnapshot
    ) {

        return (
            NEXPAK_ONLINE_INTEGRATION_STATE
                .lastSnapshot
        );

    }


    return synchroniseNexpakOnlineIntegrationState();

}


/* =========================================================
   48. REFRESH DELIVERY BEFORE CHECKOUT
   ========================================================= */

function prepareNexpakOnlineIntegrationDelivery() {

    const delivery =
        getNexpakOnlineIntegrationDelivery();


    if (!delivery) {

        return {

            success: false,

            data: null,

            error:
                "Online Delivery engine is not available."

        };

    }


    try {

        let result = null;


        /*
         * Use the existing delivery engine.
         * Do not recreate its calculation here.
         */

        if (
            typeof delivery.refreshEverything ===
            "function"
        ) {

            result =
                delivery.refreshEverything();

        } else if (
            typeof delivery.refreshDelivery ===
            "function"
        ) {

            result =
                delivery.refreshDelivery();

        } else if (
            typeof delivery.refresh ===
            "function"
        ) {

            result =
                delivery.refresh();

        }


        let checkoutDelivery = null;


        if (
            typeof delivery.getCheckoutDelivery ===
            "function"
        ) {

            checkoutDelivery =
                delivery.getCheckoutDelivery();

        }


        return {

            success: true,

            result:
                result,

            data:
                checkoutDelivery,

            error: ""

        };

    } catch (error) {

        console.error(
            "NEXPAK Online Integration: " +
            "Unable to prepare delivery.",
            error
        );


        return {

            success: false,

            data: null,

            error:
                error.message ||
                "Unable to prepare delivery."

        };

    }

}


/* =========================================================
   49. PREPARE CHECKOUT HANDOFF
   ========================================================= */

function prepareNexpakOnlineIntegrationCheckout() {

    const checkout =
        getNexpakOnlineIntegrationCheckout();


    if (!checkout) {

        return {

            success: false,

            data: null,

            error:
                "Online Checkout engine is not available."

        };

    }


    const deliveryResult =
        prepareNexpakOnlineIntegrationDelivery();


    const snapshot =
        synchroniseNexpakOnlineIntegrationState();


    const handoffData = {

        cart:
            snapshot.cart,

        delivery:
            deliveryResult.data,

        engines:
            snapshot.engines,

        timestamp:
            new Date()

    };


    /*
     * Store the handoff only in integration state.
     * The checkout engine remains responsible for
     * creating the actual order.
     */

    NEXPAK_ONLINE_INTEGRATION_STATE
        .checkoutHandoff =
        handoffData;


    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .checkoutDeliveryUpdated,

        {

            delivery:
                deliveryResult.data,

            source:
                "onlineintegration"

        }

    );


    return {

        success:
            deliveryResult.success,

        data:
            handoffData,

        error:
            deliveryResult.error || ""

    };

}


/* =========================================================
   50. GET CHECKOUT HANDOFF
   ========================================================= */

function getNexpakOnlineIntegrationCheckoutHandoff() {

    if (
        NEXPAK_ONLINE_INTEGRATION_STATE
            .checkoutHandoff
    ) {

        return (
            NEXPAK_ONLINE_INTEGRATION_STATE
                .checkoutHandoff
        );

    }


    return prepareNexpakOnlineIntegrationCheckout()
        .data;

}


/* =========================================================
   51. HANDLE CART STATE SYNCHRONISATION
   ========================================================= */

function synchroniseNexpakOnlineIntegrationCart() {

    const snapshot =
        synchroniseNexpakOnlineIntegrationState();


    /*
     * Notify the delivery engine indirectly through
     * its existing public interface.
     */

    refreshNexpakOnlineIntegrationDelivery();


    const updatedSnapshot =
        synchroniseNexpakOnlineIntegrationState();


    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .deliveryUpdated,

        {

            cart:
                updatedSnapshot.cart,

            delivery:
                updatedSnapshot.delivery,

            source:
                "cart-synchronisation"

        }

    );


    return {

        previous:
            snapshot,

        current:
            updatedSnapshot

    };

}


/* =========================================================
   52. EXTEND PUBLIC INTEGRATION API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .buildSnapshot =
        buildNexpakOnlineIntegrationSnapshot;


    window.NEXPAK_ONLINE_INTEGRATION
        .synchronise =
        synchroniseNexpakOnlineIntegrationState;


    window.NEXPAK_ONLINE_INTEGRATION
        .getSnapshot =
        getNexpakOnlineIntegrationSnapshot;


    window.NEXPAK_ONLINE_INTEGRATION
        .prepareDelivery =
        prepareNexpakOnlineIntegrationDelivery;


    window.NEXPAK_ONLINE_INTEGRATION
        .prepareCheckout =
        prepareNexpakOnlineIntegrationCheckout;


    window.NEXPAK_ONLINE_INTEGRATION
        .getCheckoutHandoff =
        getNexpakOnlineIntegrationCheckoutHandoff;


    window.NEXPAK_ONLINE_INTEGRATION
        .synchroniseCart =
        synchroniseNexpakOnlineIntegrationCart;

       }

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 6
   INITIALISATION + ENGINE COORDINATION
   ========================================================= */


/* =========================================================
   53. CHECK REQUIRED ENGINES
   ========================================================= */

function validateNexpakOnlineIntegrationEngines() {

    const status =
        refreshNexpakOnlineIntegrationStatus();


    const requiredReady =
        (
            status.domReady &&
            status.storeReady &&
            status.deliveryReady
        );


    return {

        ready:
            requiredReady,

        domReady:
            status.domReady,

        storeReady:
            status.storeReady,

        deliveryReady:
            status.deliveryReady,

        checkoutReady:
            status.checkoutReady,

        uiReady:
            status.uiReady

    };

}


/* =========================================================
   54. INITIALISE INTEGRATION ENGINES
   ========================================================= */

function initialiseNexpakOnlineIntegrationEngines() {

    const validation =
        validateNexpakOnlineIntegrationEngines();


    /*
     * Bind the integration listeners only once.
     */

    bindNexpakOnlineIntegrationEvents();


    /*
     * Synchronise the current cart and delivery state.
     */

    synchroniseNexpakOnlineIntegrationState();


    /*
     * Integration itself can initialise even when
     * checkout or UI has not loaded yet.
     *
     * This allows scripts to load safely in sequence.
     */

    NEXPAK_ONLINE_INTEGRATION_STATE
        .initialised = true;


    NEXPAK_ONLINE_INTEGRATION_STATE
        .lastUpdated = new Date();


    return {

        success: true,

        requiredEnginesReady:
            validation.ready,

        status:
            validation,

        state:
            getNexpakOnlineIntegrationState()

    };

}


/* =========================================================
   55. WAIT FOR REQUIRED ENGINES
   ========================================================= */

function waitForNexpakOnlineIntegrationEngines() {

    const validation =
        validateNexpakOnlineIntegrationEngines();


    if (
        validation.ready
    ) {

        return {

            ready: true,

            status:
                validation

        };

    }


    return {

        ready: false,

        status:
            validation

    };

}


/* =========================================================
   56. REFRESH INTEGRATION
   ========================================================= */

function refreshNexpakOnlineIntegration() {

    refreshNexpakOnlineIntegrationStatus();


    synchroniseNexpakOnlineIntegrationState();


    return {

        status:
            getNexpakOnlineIntegrationEngineStatus(),

        snapshot:
            getNexpakOnlineIntegrationSnapshot()

    };

}


/* =========================================================
   57. HANDLE ONLINE STORE READY
   ========================================================= */

function handleNexpakOnlineIntegrationStoreInitialised(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    /*
     * The store is now available.
     * Synchronise without changing any store data.
     */

    synchroniseNexpakOnlineIntegrationState();


    dispatchNexpakOnlineIntegrationEvent(

        NEXPAK_ONLINE_INTEGRATION_EVENTS
            .integrationReady,

        {

            source:
                event ?
                    event.type :
                    "store-initialised",

            status:
                getNexpakOnlineIntegrationEngineStatus()

        }

    );


    return true;

}


/* =========================================================
   58. HANDLE CART READY
   ========================================================= */

function handleNexpakOnlineIntegrationCartInitialised(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    synchroniseNexpakOnlineIntegrationCart();


    return true;

}


/* =========================================================
   59. HANDLE DELIVERY READY
   ========================================================= */

function handleNexpakOnlineIntegrationDeliveryInitialised(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    synchroniseNexpakOnlineIntegrationState();


    return true;

}


/* =========================================================
   60. HANDLE CHECKOUT READY
   ========================================================= */

function handleNexpakOnlineIntegrationCheckoutInitialised(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    /*
     * Prepare the current checkout handoff only.
     *
     * No order is created here.
     * No payment is triggered here.
     */

    prepareNexpakOnlineIntegrationCheckout();


    return true;

}


/* =========================================================
   61. HANDLE UI READY
   ========================================================= */

function handleNexpakOnlineIntegrationUIInitialised(
    event
) {

    refreshNexpakOnlineIntegrationStatus();


    synchroniseNexpakOnlineIntegrationState();


    return true;

}


/* =========================================================
   62. EXTEND PUBLIC INTEGRATION API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .validate =
        validateNexpakOnlineIntegrationEngines;


    window.NEXPAK_ONLINE_INTEGRATION
        .initialiseEngines =
        initialiseNexpakOnlineIntegrationEngines;


    window.NEXPAK_ONLINE_INTEGRATION
        .waitForEngines =
        waitForNexpakOnlineIntegrationEngines;


    window.NEXPAK_ONLINE_INTEGRATION
        .refresh =
        refreshNexpakOnlineIntegration;


    window.NEXPAK_ONLINE_INTEGRATION
        .storeInitialised =
        handleNexpakOnlineIntegrationStoreInitialised;


    window.NEXPAK_ONLINE_INTEGRATION
        .cartInitialised =
        handleNexpakOnlineIntegrationCartInitialised;


    window.NEXPAK_ONLINE_INTEGRATION
        .deliveryInitialised =
        handleNexpakOnlineIntegrationDeliveryInitialised;


    window.NEXPAK_ONLINE_INTEGRATION
        .checkoutInitialised =
        handleNexpakOnlineIntegrationCheckoutInitialised;


    window.NEXPAK_ONLINE_INTEGRATION
        .uiInitialised =
        handleNexpakOnlineIntegrationUIInitialised;

       }

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 7
   DOM STARTUP + ENGINE EVENT REGISTRATION
   ========================================================= */


/* =========================================================
   63. DOM READY HANDLER
   ========================================================= */

function handleNexpakOnlineIntegrationDOMReady() {

    /*
     * Mark DOM as ready.
     */

    NEXPAK_ONLINE_INTEGRATION_STATE.domReady =
        true;


    /*
     * Bind integration events.
     */

    bindNexpakOnlineIntegrationEvents();


    /*
     * Check which engines are already available.
     */

    refreshNexpakOnlineIntegrationStatus();


    /*
     * Synchronise whatever is currently available.
     */

    synchroniseNexpakOnlineIntegrationState();


    /*
     * If the required engines already exist,
     * initialise the integration immediately.
     */

    if (
        areNexpakOnlineIntegrationRequiredEnginesReady()
    ) {

        initialiseNexpakOnlineIntegrationEngines();

    }

}


/* =========================================================
   64. REGISTER STORE READY LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.storeReady,

    handleNexpakOnlineIntegrationStoreInitialised

);


/* =========================================================
   65. REGISTER CART READY LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.cartReady,

    handleNexpakOnlineIntegrationCartInitialised

);


/* =========================================================
   66. REGISTER DELIVERY READY LISTENER
   ========================================================= */

window.addEventListener(

    "nexpak:online-delivery-ready",

    handleNexpakOnlineIntegrationDeliveryInitialised

);


/* =========================================================
   67. REGISTER CHECKOUT READY LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.checkoutReady,

    handleNexpakOnlineIntegrationCheckoutInitialised

);


/* =========================================================
   68. REGISTER UI READY LISTENER
   ========================================================= */

window.addEventListener(

    "nexpak:online-ui-ready",

    handleNexpakOnlineIntegrationUIInitialised

);


/* =========================================================
   69. REGISTER CART UPDATE LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.cartUpdated,

    function (event) {

        handleNexpakOnlineIntegrationCartUpdated(
            event
        );

    }

);


/* =========================================================
   70. REGISTER CART CHANGE LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.cartChanged,

    function (event) {

        handleNexpakOnlineIntegrationCartUpdated(
            event
        );

    }

);


/* =========================================================
   71. REGISTER DELIVERY UPDATE LISTENER
   ========================================================= */

window.addEventListener(

    NEXPAK_ONLINE_INTEGRATION_EVENTS.deliveryUpdated,

    function (event) {

        handleNexpakOnlineIntegrationDeliveryUpdated(
            event
        );

    }

);


/* =========================================================
   72. INITIALISE WHEN DOM IS READY
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        handleNexpakOnlineIntegrationDOMReady,

        {
            once: true
        }

    );

} else {

    handleNexpakOnlineIntegrationDOMReady();

}


/* =========================================================
   73. INITIAL ENGINE STATUS MESSAGE
   ========================================================= */

console.log(
    "NEXPAK Online Integration: " +
    "Event bridge loaded."
);

/* =========================================================
   NEXPAK ONLINE STORE — INTEGRATION ENGINE
   PART 8
   FINAL API + VALIDATION + ENGINE STATUS
   ========================================================= */


/* =========================================================
   74. VALIDATE INTEGRATION ENGINE
   ========================================================= */

function validateNexpakOnlineIntegration() {

    const status =
        refreshNexpakOnlineIntegrationStatus();


    const requiredReady = (

        status.domReady &&
        status.storeReady &&
        status.deliveryReady

    );


    return {

        valid:
            requiredReady,

        domReady:
            status.domReady,

        storeReady:
            status.storeReady,

        deliveryReady:
            status.deliveryReady,

        checkoutReady:
            status.checkoutReady,

        uiReady:
            status.uiReady

    };

}


/* =========================================================
   75. FINAL INTEGRATION REFRESH
   ========================================================= */

function finaliseNexpakOnlineIntegration() {

    const validation =
        validateNexpakOnlineIntegration();


    const snapshot =
        synchroniseNexpakOnlineIntegrationState();


    NEXPAK_ONLINE_INTEGRATION_STATE
        .initialised = true;


    NEXPAK_ONLINE_INTEGRATION_STATE
        .lastUpdated = new Date();


    return {

        success: true,

        ready:
            validation.valid,

        validation:
            validation,

        snapshot:
            snapshot

    };

}


/* =========================================================
   76. GET FINAL ENGINE STATUS
   ========================================================= */

function getNexpakOnlineIntegrationStatus() {

    return {

        engine:
            "NEXPAK ONLINE INTEGRATION",

        version:
            NEXPAK_ONLINE_INTEGRATION_CONFIG.version,

        mode:
            NEXPAK_ONLINE_INTEGRATION_CONFIG.mode,

        initialised:
            NEXPAK_ONLINE_INTEGRATION_STATE
                .initialised,

        engines:
            getNexpakOnlineIntegrationEngineStatus(),

        listeners:
            getNexpakOnlineIntegrationListenerState(),

        timestamp:
            NEXPAK_ONLINE_INTEGRATION_STATE
                .lastUpdated

    };

}


/* =========================================================
   77. EXTEND PUBLIC INTEGRATION API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .validate =
        validateNexpakOnlineIntegration;


    window.NEXPAK_ONLINE_INTEGRATION
        .finalise =
        finaliseNexpakOnlineIntegration;


    window.NEXPAK_ONLINE_INTEGRATION
        .getStatus =
        getNexpakOnlineIntegrationStatus;

}


/* =========================================================
   78. FINAL ENGINE INITIALISATION
   ========================================================= */

try {

    finaliseNexpakOnlineIntegration();

} catch (error) {

    console.error(
        "NEXPAK Online Integration: " +
        "Initialisation failed.",
        error
    );


    NEXPAK_ONLINE_INTEGRATION_STATE
        .initialised = false;

}


/* =========================================================
   79. FINAL ENGINE STATUS
   ========================================================= */

console.log(
    "NEXPAK Online Integration: " +
    "Engine loaded successfully."
);


/* =========================================================
   80. FINAL PUBLIC STATUS
   ========================================================= */

if (
    window.NEXPAK_ONLINE_INTEGRATION
) {

    window.NEXPAK_ONLINE_INTEGRATION
        .status =
        NEXPAK_ONLINE_INTEGRATION_STATE
            .initialised
            ? "READY"
            : "ERROR";

}


/* =========================================================
   81. FINAL INTEGRATION EVENT
   ========================================================= */

dispatchNexpakOnlineIntegrationEvent(

    NEXPAK_ONLINE_INTEGRATION_EVENTS
        .integrationReady,

    {

        status:
            getNexpakOnlineIntegrationStatus(),

        source:
            "onlineintegration"

    }

);


/* =========================================================
   82. FINAL IIFE CLOSURE
   ========================================================= */

})();
