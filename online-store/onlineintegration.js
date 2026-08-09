/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   File: onlineintegration.js
   Version: 1.0
   Part: 1/8
   ========================================================= */

"use strict";

/* =========================================================
   NEXPAK INTEGRATION ENGINE
   ---------------------------------------------------------
   Purpose:
   - Connect completed store modules
   - Provide safe communication between modules
   - Centralise integration events
   - Maintain shared store state
   - Prepare external service integration
   - Protect locked modules from direct modification
   ========================================================= */

window.NEXPAK = window.NEXPAK || {};

window.NEXPAK.integration = {

    /* -----------------------------------------------------
       ENGINE INFORMATION
       ----------------------------------------------------- */

    version: "1.0.0",

    status: "initialising",

    ready: false,

    initializedAt: null,


    /* -----------------------------------------------------
       MODULE REGISTRY
       ----------------------------------------------------- */

    modules: {

        store: null,

        cart: null,

        checkout: null,

        delivery: null,

        configurator: null,

        ui: null,

        database: null

    },


    /* -----------------------------------------------------
       INTEGRATION STATE
       ----------------------------------------------------- */

    state: {

        initialized: false,

        storeReady: false,

        cartReady: false,

        checkoutReady: false,

        deliveryReady: false,

        configuratorReady: false,

        uiReady: false,

        databaseReady: false,

        externalServicesReady: false

    },


    /* -----------------------------------------------------
       EVENT SYSTEM
       ----------------------------------------------------- */

    events: {},


    on(eventName, callback) {

        if (!eventName || typeof callback !== "function") {
            return false;
        }

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        return true;
    },


    off(eventName, callback) {

        if (!this.events[eventName]) {
            return false;
        }

        this.events[eventName] =
            this.events[eventName].filter(
                handler => handler !== callback
            );

        return true;
    },


    emit(eventName, data = {}) {

        if (!this.events[eventName]) {
            return false;
        }

        this.events[eventName].forEach(callback => {

            try {

                callback(data);

            } catch (error) {

                console.error(
                    `[NEXPAK Integration] Event error: ${eventName}`,
                    error
                );

            }

        });

        return true;
    },


    /* -----------------------------------------------------
       MODULE DETECTION
       ----------------------------------------------------- */

    detectModules() {

        this.modules.store =
            window.NEXPAK.store ||
            window.NEXPAKStore ||
            null;

        this.modules.cart =
            window.NEXPAK.cart ||
            window.NEXPAKCart ||
            null;

        this.modules.checkout =
            window.NEXPAK.checkout ||
            window.NEXPAKCheckout ||
            null;

        this.modules.delivery =
            window.NEXPAK.delivery ||
            window.NEXPAKDelivery ||
            null;

        this.modules.configurator =
            window.NEXPAK.configurator ||
            window.NEXPAKConfigurator ||
            null;

        this.modules.ui =
            window.NEXPAK.ui ||
            window.NEXPAKUI ||
            null;

        this.modules.database =
            window.NEXPAK.database ||
            window.NEXPAKData ||
            null;

        return this.modules;
    },


    /* -----------------------------------------------------
       MODULE STATUS
       ----------------------------------------------------- */

    checkModuleStatus() {

        this.state.storeReady =
            !!this.modules.store;

        this.state.cartReady =
            !!this.modules.cart;

        this.state.checkoutReady =
            !!this.modules.checkout;

        this.state.deliveryReady =
            !!this.modules.delivery;

        this.state.configuratorReady =
            !!this.modules.configurator;

        this.state.uiReady =
            !!this.modules.ui;

        this.state.databaseReady =
            !!this.modules.database;

        return this.state;
    },


    /* -----------------------------------------------------
       REQUIRED MODULE CHECK
       ----------------------------------------------------- */

    validateCoreModules() {

        const required = [
            "store",
            "cart",
            "checkout",
            "delivery",
            "configurator"
        ];

        const missing = required.filter(
            moduleName => !this.modules[moduleName]
        );

        if (missing.length) {

            console.warn(
                "[NEXPAK Integration] Missing modules:",
                missing
            );

            return {
                valid: false,
                missing
            };

        }

        return {
            valid: true,
            missing: []
        };
    },


    /* -----------------------------------------------------
       SAFE MODULE ACCESS
       ----------------------------------------------------- */

    getModule(moduleName) {

        if (!moduleName) {
            return null;
        }

        return this.modules[moduleName] || null;
    },


    /* -----------------------------------------------------
       INTEGRATION LOG
       ----------------------------------------------------- */

    log(message, data = null) {

        if (data !== null) {

            console.log(
                `[NEXPAK Integration] ${message}`,
                data
            );

        } else {

            console.log(
                `[NEXPAK Integration] ${message}`
            );

        }

    },


    /* -----------------------------------------------------
       INITIALISATION
       ----------------------------------------------------- */

    init() {

        if (this.state.initialized) {
            return this;
        }

        this.log("Starting integration engine...");

        this.detectModules();

        this.checkModuleStatus();

        const validation =
            this.validateCoreModules();

        if (!validation.valid) {

            this.log(
                "Integration engine waiting for required modules."
            );

            this.status = "waiting";

            return this;
        }

        this.state.initialized = true;

        this.ready = true;

        this.status = "ready";

        this.initializedAt =
            new Date().toISOString();

        this.emit("integration:ready", {
            timestamp: this.initializedAt,
            modules: this.modules
        });

        this.log(
            "Integration engine ready."
        );

        return this;
    }

};


/* =========================================================
   GLOBAL INITIALISATION
   ========================================================= */

(function initialiseNexpakIntegration() {

    const start = () => {

        if (
            window.NEXPAK &&
            window.NEXPAK.integration
        ) {

            window.NEXPAK.integration.init();

        }

    };


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    } else {

        start();

    }

})();


/* =========================================================
   END — PART 1/8
   ========================================================= */
/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 2/8
   CROSS-MODULE COMMUNICATION
   ========================================================= */


/* ---------------------------------------------------------
   INTEGRATION MESSAGE BUS
   --------------------------------------------------------- */

window.NEXPAK.integration.bus = {

    channels: {},


    /* -----------------------------------------------------
       SUBSCRIBE
       ----------------------------------------------------- */

    subscribe(channel, callback) {

        if (
            !channel ||
            typeof callback !== "function"
        ) {
            return false;
        }

        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }

        this.channels[channel].push(callback);

        return true;
    },


    /* -----------------------------------------------------
       UNSUBSCRIBE
       ----------------------------------------------------- */

    unsubscribe(channel, callback) {

        if (!this.channels[channel]) {
            return false;
        }

        this.channels[channel] =
            this.channels[channel].filter(
                handler => handler !== callback
            );

        return true;
    },


    /* -----------------------------------------------------
       PUBLISH MESSAGE
       ----------------------------------------------------- */

    publish(channel, payload = {}) {

        if (!channel) {
            return false;
        }

        const listeners =
            this.channels[channel] || [];

        listeners.forEach(callback => {

            try {

                callback(payload);

            } catch (error) {

                console.error(
                    `[NEXPAK Bus] Error on ${channel}:`,
                    error
                );

            }

        });

        return true;
    },


    /* -----------------------------------------------------
       CLEAR CHANNEL
       ----------------------------------------------------- */

    clear(channel) {

        if (!channel) {
            return false;
        }

        delete this.channels[channel];

        return true;
    },


    /* -----------------------------------------------------
       CLEAR ALL CHANNELS
       ----------------------------------------------------- */

    clearAll() {

        this.channels = {};

        return true;
    }

};


/* ---------------------------------------------------------
   STANDARD STORE EVENTS
   --------------------------------------------------------- */

window.NEXPAK.integration.channels = {

    STORE_READY:
        "store:ready",

    PRODUCT_SELECTED:
        "product:selected",

    PRODUCT_UPDATED:
        "product:updated",

    CATEGORY_CHANGED:
        "category:changed",

    SEARCH_CHANGED:
        "search:changed",

    CART_UPDATED:
        "cart:updated",

    CART_ITEM_ADDED:
        "cart:item-added",

    CART_ITEM_REMOVED:
        "cart:item-removed",

    CART_CLEARED:
        "cart:cleared",

    CHECKOUT_STARTED:
        "checkout:started",

    CHECKOUT_UPDATED:
        "checkout:updated",

    CHECKOUT_COMPLETED:
        "checkout:completed",

    DELIVERY_UPDATED:
        "delivery:updated",

    DELIVERY_SELECTED:
        "delivery:selected",

    CONFIGURATOR_OPENED:
        "configurator:opened",

    CONFIGURATOR_UPDATED:
        "configurator:updated",

    CONFIGURATOR_COMPLETED:
        "configurator:completed",

    UI_READY:
        "ui:ready",

    ERROR:
        "integration:error"

};


/* ---------------------------------------------------------
   MESSAGE HELPERS
   --------------------------------------------------------- */

window.NEXPAK.integration.send = function (
    channel,
    payload = {}
) {

    return this.bus.publish(
        channel,
        {
            timestamp:
                new Date().toISOString(),

            source:
                "onlineintegration",

            payload
        }
    );

};


/* ---------------------------------------------------------
   MODULE EVENT BRIDGE
   --------------------------------------------------------- */

window.NEXPAK.integration.bridge = {


    /* -----------------------------------------------------
       CONNECT MODULE EVENT
       ----------------------------------------------------- */

    connect(
        moduleName,
        eventName,
        integrationChannel
    ) {

        const module =
            window.NEXPAK.integration
                .getModule(moduleName);

        if (!module) {

            console.warn(
                `[NEXPAK Bridge] Module not found: ${moduleName}`
            );

            return false;
        }

        if (
            typeof module.on !== "function"
        ) {

            console.warn(
                `[NEXPAK Bridge] ${moduleName} does not expose an event API.`
            );

            return false;
        }

        module.on(
            eventName,
            data => {

                window.NEXPAK.integration.send(
                    integrationChannel,
                    {
                        module:
                            moduleName,

                        event:
                            eventName,

                        data
                    }
                );

            }
        );

        return true;
    },


    /* -----------------------------------------------------
       CONNECT MULTIPLE EVENTS
       ----------------------------------------------------- */

    connectMany(
        moduleName,
        mappings = []
    ) {

        if (!Array.isArray(mappings)) {
            return false;
        }

        let connected = 0;

        mappings.forEach(mapping => {

            if (
                !mapping ||
                !mapping.event ||
                !mapping.channel
            ) {
                return;
            }

            if (
                this.connect(
                    moduleName,
                    mapping.event,
                    mapping.channel
                )
            ) {

                connected++;

            }

        });

        return connected;
    }

};


/* ---------------------------------------------------------
   REQUEST / RESPONSE SYSTEM
   --------------------------------------------------------- */

window.NEXPAK.integration.request = async function (
    moduleName,
    method,
    args = []
) {

    const module =
        this.getModule(moduleName);

    if (!module) {

        throw new Error(
            `NEXPAK module unavailable: ${moduleName}`
        );

    }

    if (
        typeof module[method] !== "function"
    ) {

        throw new Error(
            `Method unavailable: ${moduleName}.${method}`
        );

    }

    try {

        return await module[method](...args);

    } catch (error) {

        this.send(
            this.channels.ERROR,
            {
                module:
                    moduleName,

                method,

                error:
                    error.message
            }
        );

        throw error;

    }

};


/* ---------------------------------------------------------
   MODULE SNAPSHOT
   --------------------------------------------------------- */

window.NEXPAK.integration.getModuleSnapshot =
    function () {

        const modules =
            this.modules;

        return {

            store:
                !!modules.store,

            cart:
                !!modules.cart,

            checkout:
                !!modules.checkout,

            delivery:
                !!modules.delivery,

            configurator:
                !!modules.configurator,

            ui:
                !!modules.ui,

            database:
                !!modules.database,

            timestamp:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   INTEGRATION HEALTH CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.healthCheck =
    function () {

        const snapshot =
            this.getModuleSnapshot();

        const required = [
            "store",
            "cart",
            "checkout",
            "delivery",
            "configurator"
        ];

        const missing =
            required.filter(
                moduleName =>
                    !snapshot[moduleName]
            );

        return {

            healthy:
                missing.length === 0,

            status:
                missing.length === 0
                    ? "healthy"
                    : "incomplete",

            missing,

            modules:
                snapshot,

            timestamp:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   PART 2 INITIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.send(
    window.NEXPAK.integration.channels.STORE_READY,
    {
        message:
            "Integration communication layer loaded.",

        health:
            window.NEXPAK.integration.healthCheck()
    }
);


/* =========================================================
   END — PART 2/8
   ========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 3/8
   STATE SYNCHRONISATION & DATA COORDINATION
   ========================================================= */


/* ---------------------------------------------------------
   CENTRAL STORE STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.storeState = {

    /* -----------------------------------------------------
       STORE
       ----------------------------------------------------- */

    store: {

        initialized: false,

        currentPage: null,

        currentCategory: null,

        searchTerm: "",

        sortBy: null,

        viewMode: "grid"

    },


    /* -----------------------------------------------------
       PRODUCT
       ----------------------------------------------------- */

    product: {

        selected: null,

        selectedId: null,

        quantity: 1,

        configuration: null

    },


    /* -----------------------------------------------------
       CART
       ----------------------------------------------------- */

    cart: {

        items: [],

        itemCount: 0,

        subtotal: 0,

        discount: 0,

        deliveryCost: 0,

        total: 0

    },


    /* -----------------------------------------------------
       CHECKOUT
       ----------------------------------------------------- */

    checkout: {

        active: false,

        step: 1,

        customer: null,

        billing: null,

        paymentMethod: null,

        orderReference: null,

        completed: false

    },


    /* -----------------------------------------------------
       DELIVERY
       ----------------------------------------------------- */

    delivery: {

        method: null,

        zone: null,

        address: null,

        cost: 0,

        estimatedDate: null,

        selected: false

    },


    /* -----------------------------------------------------
       CONFIGURATOR
       ----------------------------------------------------- */

    configurator: {

        active: false,

        productId: null,

        options: {},

        configurationId: null,

        completed: false

    },


    /* -----------------------------------------------------
       UI
       ----------------------------------------------------- */

    ui: {

        loading: false,

        modalOpen: false,

        notification: null,

        lastAction: null

    },


    /* -----------------------------------------------------
       SYSTEM
       ----------------------------------------------------- */

    system: {

        lastUpdated: null,

        lastSource: null,

        version: "1.0.0"

    }

};


/* ---------------------------------------------------------
   STATE UPDATE
   --------------------------------------------------------- */

window.NEXPAK.integration.setState =
    function (
        section,
        updates = {},
        source = "integration"
    ) {

        if (
            !section ||
            !this.storeState[section]
        ) {

            console.warn(
                `[NEXPAK State] Unknown section: ${section}`
            );

            return false;
        }

        if (
            typeof updates !== "object" ||
            updates === null
        ) {

            return false;
        }

        Object.assign(
            this.storeState[section],
            updates
        );

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            source;

        this.send(
            this.channels.STORE_READY,
            {
                type: "state:update",

                section,

                updates,

                source
            }
        );

        return true;
    };


/* ---------------------------------------------------------
   GET STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.getState =
    function (section = null) {

        if (!section) {

            return this.cloneState(
                this.storeState
            );

        }

        if (!this.storeState[section]) {

            return null;

        }

        return this.cloneState(
            this.storeState[section]
        );

    };


/* ---------------------------------------------------------
   CLONE STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.cloneState =
    function (data) {

        try {

            return JSON.parse(
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "[NEXPAK State] Unable to clone state.",
                error
            );

            return null;

        }

    };


/* ---------------------------------------------------------
   PRODUCT STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.setSelectedProduct =
    function (
        product,
        quantity = 1
    ) {

        if (!product) {
            return false;
        }

        const productId =
            product.id ||
            product.productId ||
            product.sku ||
            null;

        this.storeState.product = {

            ...this.storeState.product,

            selected:
                this.cloneState(product),

            selectedId:
                productId,

            quantity:
                Math.max(
                    1,
                    Number(quantity) || 1
                )

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "product";

        this.send(
            this.channels.PRODUCT_SELECTED,
            {
                product:
                    this.cloneState(product),

                productId,

                quantity:
                    this.storeState.product.quantity
            }
        );

        return true;
    };


/* ---------------------------------------------------------
   CLEAR SELECTED PRODUCT
   --------------------------------------------------------- */

window.NEXPAK.integration.clearSelectedProduct =
    function () {

        this.storeState.product.selected = null;

        this.storeState.product.selectedId = null;

        this.storeState.product.quantity = 1;

        this.storeState.product.configuration = null;

        this.send(
            this.channels.PRODUCT_UPDATED,
            {
                action: "clear"
            }
        );

        return true;
    };


/* ---------------------------------------------------------
   CART STATE SYNCHRONISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.syncCart =
    function (cartData = {}) {

        if (
            !cartData ||
            typeof cartData !== "object"
        ) {

            return false;

        }

        const items =
            Array.isArray(cartData.items)
                ? cartData.items
                : [];

        const itemCount =
            cartData.itemCount ??
            items.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (
                        Number(
                            item.quantity
                        ) || 0
                    ),
                0
            );

        const subtotal =
            Number(
                cartData.subtotal
            ) || 0;

        const discount =
            Number(
                cartData.discount
            ) || 0;

        const deliveryCost =
            Number(
                cartData.deliveryCost
            ) || 0;

        const total =
            Number(
                cartData.total
            );

        this.storeState.cart = {

            items:
                this.cloneState(items),

            itemCount,

            subtotal,

            discount,

            deliveryCost,

            total:
                Number.isFinite(total)
                    ? total
                    : (
                        subtotal -
                        discount +
                        deliveryCost
                    )

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "cart";

        this.send(
            this.channels.CART_UPDATED,
            this.getState("cart")
        );

        return true;
    };


/* ---------------------------------------------------------
   CHECKOUT STATE SYNCHRONISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.syncCheckout =
    function (checkoutData = {}) {

        if (
            !checkoutData ||
            typeof checkoutData !== "object"
        ) {

            return false;

        }

        this.storeState.checkout = {

            ...this.storeState.checkout,

            ...this.cloneState(
                checkoutData
            )

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "checkout";

        this.send(
            this.channels.CHECKOUT_UPDATED,
            this.getState("checkout")
        );

        return true;
    };


/* ---------------------------------------------------------
   DELIVERY STATE SYNCHRONISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.syncDelivery =
    function (deliveryData = {}) {

        if (
            !deliveryData ||
            typeof deliveryData !== "object"
        ) {

            return false;

        }

        this.storeState.delivery = {

            ...this.storeState.delivery,

            ...this.cloneState(
                deliveryData
            )

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "delivery";

        this.send(
            this.channels.DELIVERY_UPDATED,
            this.getState("delivery")
        );

        return true;
    };


/* ---------------------------------------------------------
   CONFIGURATOR STATE SYNCHRONISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.syncConfigurator =
    function (configurationData = {}) {

        if (
            !configurationData ||
            typeof configurationData !== "object"
        ) {

            return false;

        }

        this.storeState.configurator = {

            ...this.storeState.configurator,

            ...this.cloneState(
                configurationData
            )

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "configurator";

        this.send(
            this.channels.CONFIGURATOR_UPDATED,
            this.getState("configurator")
        );

        return true;
    };


/* ---------------------------------------------------------
   UI STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.setUIState =
    function (updates = {}) {

        if (
            !updates ||
            typeof updates !== "object"
        ) {

            return false;

        }

        Object.assign(
            this.storeState.ui,
            updates
        );

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "ui";

        return true;
    };


/* ---------------------------------------------------------
   RESET TEMPORARY STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.resetTemporaryState =
    function () {

        this.storeState.product = {

            selected: null,

            selectedId: null,

            quantity: 1,

            configuration: null

        };

        this.storeState.ui = {

            loading: false,

            modalOpen: false,

            notification: null,

            lastAction: null

        };

        this.storeState.system.lastUpdated =
            new Date().toISOString();

        this.storeState.system.lastSource =
            "reset";

        return true;
    };


/* ---------------------------------------------------------
   STATE SUMMARY
   --------------------------------------------------------- */

window.NEXPAK.integration.getStateSummary =
    function () {

        const state =
            this.storeState;

        return {

            productSelected:
                !!state.product.selected,

            productId:
                state.product.selectedId,

            cartItems:
                state.cart.itemCount,

            cartSubtotal:
                state.cart.subtotal,

            cartTotal:
                state.cart.total,

            checkoutActive:
                state.checkout.active,

            checkoutStep:
                state.checkout.step,

            deliverySelected:
                state.delivery.selected,

            configuratorActive:
                state.configurator.active,

            configuratorCompleted:
                state.configurator.completed,

            lastUpdated:
                state.system.lastUpdated,

            lastSource:
                state.system.lastSource

        };

    };


/* ---------------------------------------------------------
   STATE VALIDATION
   --------------------------------------------------------- */

window.NEXPAK.integration.validateState =
    function () {

        const state =
            this.storeState;

        const errors = [];


        /* PRODUCT */

        if (
            state.product.quantity < 1
        ) {

            errors.push(
                "Product quantity cannot be below 1."
            );

        }


        /* CART */

        if (
            state.cart.subtotal < 0
        ) {

            errors.push(
                "Cart subtotal cannot be negative."
            );

        }


        if (
            state.cart.discount < 0
        ) {

            errors.push(
                "Cart discount cannot be negative."
            );

        }


        /* DELIVERY */

        if (
            state.delivery.cost < 0
        ) {

            errors.push(
                "Delivery cost cannot be negative."
            );

        }


        /* TOTAL */

        if (
            state.cart.total < 0
        ) {

            errors.push(
                "Cart total cannot be negative."
            );

        }


        return {

            valid:
                errors.length === 0,

            errors

        };

    };


/* ---------------------------------------------------------
   PART 3 READY
   --------------------------------------------------------- */

window.NEXPAK.integration.send(
    window.NEXPAK.integration.channels.STORE_READY,
    {
        type:
            "state-layer-ready",

        summary:
            window.NEXPAK.integration
                .getStateSummary(),

        validation:
            window.NEXPAK.integration
                .validateState()
    }
);


/* =========================================================
   END — PART 3/8
   ========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 4/8
   PERSISTENCE, SESSION & DATA STORAGE
   ========================================================= */


/* ---------------------------------------------------------
   STORAGE CONFIGURATION
   --------------------------------------------------------- */

window.NEXPAK.integration.storage = {

    prefix: "nexpak_online_",

    version: "1.0",

    local: true,

    session: true

};


/* ---------------------------------------------------------
   STORAGE KEY BUILDER
   --------------------------------------------------------- */

window.NEXPAK.integration.getStorageKey =
    function (key) {

        if (!key) {
            return null;
        }

        return (
            this.storage.prefix +
            key
        );

    };


/* ---------------------------------------------------------
   SAFE JSON SERIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.serialize =
    function (data) {

        try {

            return JSON.stringify(data);

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Serialization failed.",
                error
            );

            return null;

        }

    };


/* ---------------------------------------------------------
   SAFE JSON PARSING
   --------------------------------------------------------- */

window.NEXPAK.integration.deserialize =
    function (data) {

        if (
            data === null ||
            data === undefined
        ) {

            return null;

        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Parsing failed.",
                error
            );

            return null;

        }

    };


/* ---------------------------------------------------------
   LOCAL STORAGE — SAVE
   --------------------------------------------------------- */

window.NEXPAK.integration.saveLocal =
    function (
        key,
        value
    ) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return false;
        }

        try {

            localStorage.setItem(
                storageKey,
                this.serialize(value)
            );

            return true;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Local save failed.",
                error
            );

            return false;

        }

    };


/* ---------------------------------------------------------
   LOCAL STORAGE — LOAD
   --------------------------------------------------------- */

window.NEXPAK.integration.loadLocal =
    function (key, fallback = null) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return fallback;
        }

        try {

            const value =
                localStorage.getItem(
                    storageKey
                );

            if (value === null) {
                return fallback;
            }

            const parsed =
                this.deserialize(value);

            return parsed === null
                ? fallback
                : parsed;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Local load failed.",
                error
            );

            return fallback;

        }

    };


/* ---------------------------------------------------------
   LOCAL STORAGE — REMOVE
   --------------------------------------------------------- */

window.NEXPAK.integration.removeLocal =
    function (key) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return false;
        }

        try {

            localStorage.removeItem(
                storageKey
            );

            return true;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Local removal failed.",
                error
            );

            return false;

        }

    };


/* ---------------------------------------------------------
   SESSION STORAGE — SAVE
   --------------------------------------------------------- */

window.NEXPAK.integration.saveSession =
    function (
        key,
        value
    ) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return false;
        }

        try {

            sessionStorage.setItem(
                storageKey,
                this.serialize(value)
            );

            return true;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Session save failed.",
                error
            );

            return false;

        }

    };


/* ---------------------------------------------------------
   SESSION STORAGE — LOAD
   --------------------------------------------------------- */

window.NEXPAK.integration.loadSession =
    function (
        key,
        fallback = null
    ) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return fallback;
        }

        try {

            const value =
                sessionStorage.getItem(
                    storageKey
                );

            if (value === null) {
                return fallback;
            }

            const parsed =
                this.deserialize(value);

            return parsed === null
                ? fallback
                : parsed;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Session load failed.",
                error
            );

            return fallback;

        }

    };


/* ---------------------------------------------------------
   SESSION STORAGE — REMOVE
   --------------------------------------------------------- */

window.NEXPAK.integration.removeSession =
    function (key) {

        const storageKey =
            this.getStorageKey(key);

        if (!storageKey) {
            return false;
        }

        try {

            sessionStorage.removeItem(
                storageKey
            );

            return true;

        } catch (error) {

            console.error(
                "[NEXPAK Storage] Session removal failed.",
                error
            );

            return false;

        }

    };


/* ---------------------------------------------------------
   SAVE STORE STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.persistStoreState =
    function () {

        const state =
            this.cloneState(
                this.storeState
            );

        if (!state) {
            return false;
        }

        /*
         * Temporary UI information should not survive
         * a new browser session.
         */

        state.ui.loading = false;

        state.ui.modalOpen = false;

        state.ui.notification = null;


        return this.saveLocal(
            "store_state",
            state
        );

    };


/* ---------------------------------------------------------
   RESTORE STORE STATE
   --------------------------------------------------------- */

window.NEXPAK.integration.restoreStoreState =
    function () {

        const saved =
            this.loadLocal(
                "store_state",
                null
            );

        if (!saved) {
            return false;
        }

        if (
            typeof saved !== "object"
        ) {

            return false;

        }

        const current =
            this.storeState;


        /* ---------------------------------------------
           RESTORE SAFE STORE DATA
           --------------------------------------------- */

        if (saved.store) {

            Object.assign(
                current.store,
                saved.store
            );

        }


        /* ---------------------------------------------
           RESTORE PRODUCT DATA
           --------------------------------------------- */

        if (saved.product) {

            Object.assign(
                current.product,
                saved.product
            );

        }


        /* ---------------------------------------------
           RESTORE CART DATA
           --------------------------------------------- */

        if (saved.cart) {

            Object.assign(
                current.cart,
                saved.cart
            );

        }


        /* ---------------------------------------------
           DELIVERY
           --------------------------------------------- */

        if (saved.delivery) {

            Object.assign(
                current.delivery,
                saved.delivery
            );

        }


        /* ---------------------------------------------
           CONFIGURATOR
           --------------------------------------------- */

        if (saved.configurator) {

            Object.assign(
                current.configurator,
                saved.configurator
            );

        }


        /*
         * Checkout customer/payment information is
         * intentionally NOT automatically restored here.
         */

        current.checkout.active = false;

        current.checkout.completed = false;

        current.checkout.customer = null;

        current.checkout.billing = null;

        current.checkout.paymentMethod = null;


        current.system.lastUpdated =
            new Date().toISOString();

        current.system.lastSource =
            "storage:restore";


        this.send(
            this.channels.STORE_READY,
            {
                type:
                    "state-restored"
            }
        );

        return true;

    };


/* ---------------------------------------------------------
   SAVE CART SNAPSHOT
   --------------------------------------------------------- */

window.NEXPAK.integration.saveCartSnapshot =
    function () {

        return this.saveLocal(
            "cart_snapshot",
            this.getState("cart")
        );

    };


/* ---------------------------------------------------------
   LOAD CART SNAPSHOT
   --------------------------------------------------------- */

window.NEXPAK.integration.loadCartSnapshot =
    function () {

        return this.loadLocal(
            "cart_snapshot",
            null
        );

    };


/* ---------------------------------------------------------
   SAVE USER PREFERENCES
   --------------------------------------------------------- */

window.NEXPAK.integration.savePreferences =
    function (
        preferences = {}
    ) {

        if (
            !preferences ||
            typeof preferences !== "object"
        ) {

            return false;

        }

        const current =
            this.loadLocal(
                "preferences",
                {}
            );

        const updated = {

            ...current,

            ...preferences,

            updatedAt:
                new Date().toISOString()

        };

        return this.saveLocal(
            "preferences",
            updated
        );

    };


/* ---------------------------------------------------------
   LOAD USER PREFERENCES
   --------------------------------------------------------- */

window.NEXPAK.integration.loadPreferences =
    function () {

        return this.loadLocal(
            "preferences",
            {

                viewMode:
                    "grid",

                sortBy:
                    null,

                category:
                    null,

                rememberPreferences:
                    true

            }
        );

    };


/* ---------------------------------------------------------
   APPLY USER PREFERENCES
   --------------------------------------------------------- */

window.NEXPAK.integration.applyPreferences =
    function () {

        const preferences =
            this.loadPreferences();

        if (!preferences) {
            return false;
        }

        if (
            preferences.viewMode
        ) {

            this.storeState.store.viewMode =
                preferences.viewMode;

        }

        if (
            preferences.sortBy
        ) {

            this.storeState.store.sortBy =
                preferences.sortBy;

        }

        if (
            preferences.category
        ) {

            this.storeState.store.currentCategory =
                preferences.category;

        }

        return true;

    };


/* ---------------------------------------------------------
   STORE SESSION
   --------------------------------------------------------- */

window.NEXPAK.integration.session = {

    id: null,

    startedAt: null,

    lastActivity: null

};


/* ---------------------------------------------------------
   CREATE SESSION
   --------------------------------------------------------- */

window.NEXPAK.integration.startSession =
    function () {

        let sessionId =
            this.loadSession(
                "session_id",
                null
            );

        if (!sessionId) {

            sessionId =
                "NXP-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();

            this.saveSession(
                "session_id",
                sessionId
            );

        }

        this.session.id =
            sessionId;

        this.session.startedAt =
            this.loadSession(
                "session_started",
                new Date().toISOString()
            );

        this.saveSession(
            "session_started",
            this.session.startedAt
        );

        this.updateActivity();

        return sessionId;

    };


/* ---------------------------------------------------------
   UPDATE SESSION ACTIVITY
   --------------------------------------------------------- */

window.NEXPAK.integration.updateActivity =
    function () {

        const timestamp =
            new Date().toISOString();

        this.session.lastActivity =
            timestamp;

        this.saveSession(
            "last_activity",
            timestamp
        );

        return timestamp;

    };


/* ---------------------------------------------------------
   GET SESSION
   --------------------------------------------------------- */

window.NEXPAK.integration.getSession =
    function () {

        return {

            id:
                this.session.id,

            startedAt:
                this.session.startedAt,

            lastActivity:
                this.session.lastActivity

        };

    };


/* ---------------------------------------------------------
   CLEAR SESSION
   --------------------------------------------------------- */

window.NEXPAK.integration.clearSession =
    function () {

        this.removeSession(
            "session_id"
        );

        this.removeSession(
            "session_started"
        );

        this.removeSession(
            "last_activity"
        );

        this.session.id = null;

        this.session.startedAt = null;

        this.session.lastActivity = null;

        return true;

    };


/* ---------------------------------------------------------
   CLEAR NEXPAK STORE STORAGE
   --------------------------------------------------------- */

window.NEXPAK.integration.clearStoreStorage =
    function () {

        const keys = [

            "store_state",

            "cart_snapshot",

            "preferences"

        ];

        keys.forEach(
            key => this.removeLocal(key)
        );

        return true;

    };


/* ---------------------------------------------------------
   STORAGE STATUS
   --------------------------------------------------------- */

window.NEXPAK.integration.getStorageStatus =
    function () {

        let localAvailable = false;

        let sessionAvailable = false;


        try {

            const testKey =
                this.getStorageKey(
                    "__test"
                );

            localStorage.setItem(
                testKey,
                "1"
            );

            localStorage.removeItem(
                testKey
            );

            localAvailable = true;

        } catch (error) {

            localAvailable = false;

        }


        try {

            const testKey =
                this.getStorageKey(
                    "__test"
                );

            sessionStorage.setItem(
                testKey,
                "1"
            );

            sessionStorage.removeItem(
                testKey
            );

            sessionAvailable = true;

        } catch (error) {

            sessionAvailable = false;

        }


        return {

            localStorage:
                localAvailable,

            sessionStorage:
                sessionAvailable,

            supported:
                localAvailable ||
                sessionAvailable

        };

    };


/* ---------------------------------------------------------
   PART 4 INITIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.applyPreferences();

window.NEXPAK.integration.startSession();

window.NEXPAK.integration.send(
    window.NEXPAK.integration.channels.STORE_READY,
    {
        type:
            "persistence-layer-ready",

        storage:
            window.NEXPAK.integration
                .getStorageStatus(),

        session:
            window.NEXPAK.integration
                .getSession()
    }
);


/* =========================================================
   END — PART 4/8
   ========================================================= */
/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 5/8
   EXTERNAL SERVICE & INTEGRATION ADAPTERS
   ========================================================= */


/* ---------------------------------------------------------
   EXTERNAL SERVICES CONFIGURATION
   --------------------------------------------------------- */

window.NEXPAK.integration.services = {

    payment: {

        enabled: false,

        provider: null,

        environment: "production",

        configured: false

    },


    backend: {

        enabled: false,

        baseURL: null,

        configured: false

    },


    email: {

        enabled: false,

        provider: null,

        configured: false

    },


    whatsapp: {

        enabled: false,

        number: null,

        configured: false

    },


    analytics: {

        enabled: false,

        provider: null,

        configured: false

    }

};


/* ---------------------------------------------------------
   SERVICE REGISTRATION
   --------------------------------------------------------- */

window.NEXPAK.integration.registerService =
    function (
        serviceName,
        configuration = {}
    ) {

        if (!serviceName) {
            return false;
        }

        if (
            !this.services[serviceName]
        ) {

            console.warn(
                `[NEXPAK Services] Unknown service: ${serviceName}`
            );

            return false;

        }

        if (
            typeof configuration !== "object" ||
            configuration === null
        ) {

            return false;

        }

        this.services[serviceName] = {

            ...this.services[serviceName],

            ...configuration,

            configured: true

        };

        this.send(
            this.channels.STORE_READY,
            {
                type:
                    "service-registered",

                service:
                    serviceName
            }
        );

        return true;
    };


/* ---------------------------------------------------------
   SERVICE STATUS
   --------------------------------------------------------- */

window.NEXPAK.integration.getServiceStatus =
    function (serviceName = null) {

        if (serviceName) {

            if (
                !this.services[serviceName]
            ) {

                return null;

            }

            return {
                ...this.services[serviceName]
            };

        }

        return this.cloneState(
            this.services
        );

    };


/* ---------------------------------------------------------
   PAYMENT ADAPTER
   --------------------------------------------------------- */

window.NEXPAK.integration.payment =
    {


        /* -------------------------------------------------
           INITIALISE
           ------------------------------------------------- */

        init(configuration = {}) {

            return window.NEXPAK.integration
                .registerService(
                    "payment",
                    configuration
                );

        },


        /* -------------------------------------------------
           CREATE PAYMENT REQUEST
           ------------------------------------------------- */

        async createPaymentRequest(
            orderData = {}
        ) {

            const service =
                window.NEXPAK.integration
                    .services.payment;

            if (
                !service.enabled ||
                !service.configured
            ) {

                return {

                    success: false,

                    status:
                        "not-configured",

                    message:
                        "Payment service is not configured."

                };

            }


            /*
             * Actual payment provider API calls should
             * be implemented here when the provider is
             * officially connected.
             */

            return {

                success: false,

                status:
                    "adapter-ready",

                message:
                    "Payment adapter is ready for provider integration.",

                order:
                    window.NEXPAK.integration
                        .cloneState(orderData)

            };

        },


        /* -------------------------------------------------
           PAYMENT RESULT
           ------------------------------------------------- */

        handleResult(result = {}) {

            window.NEXPAK.integration.send(

                result.success
                    ? window.NEXPAK.integration
                        .channels.CHECKOUT_COMPLETED
                    : window.NEXPAK.integration
                        .channels.ERROR,

                {

                    type:
                        "payment-result",

                    result:
                        window.NEXPAK.integration
                            .cloneState(result)

                }

            );

            return result;

        }

    };


/* ---------------------------------------------------------
   BACKEND / API ADAPTER
   --------------------------------------------------------- */

window.NEXPAK.integration.api =
    {


        /* -------------------------------------------------
           CONFIGURE API
           ------------------------------------------------- */

        configure(configuration = {}) {

            return window.NEXPAK.integration
                .registerService(
                    "backend",
                    configuration
                );

        },


        /* -------------------------------------------------
           REQUEST
           ------------------------------------------------- */

        async request(
            endpoint,
            options = {}
        ) {

            const service =
                window.NEXPAK.integration
                    .services.backend;

            if (
                !service.enabled ||
                !service.configured ||
                !service.baseURL
            ) {

                return {

                    success: false,

                    status:
                        "not-configured",

                    message:
                        "Backend API is not configured."

                };

            }

            if (!endpoint) {

                return {

                    success: false,

                    status:
                        "invalid-endpoint"

                };

            }


            const url =
                service.baseURL.replace(
                    /\/$/,
                    ""
                ) +
                "/" +
                endpoint.replace(
                    /^\//,
                    ""
                );


            try {

                const response =
                    await fetch(
                        url,
                        {

                            ...options,

                            headers: {

                                "Content-Type":
                                    "application/json",

                                ...(options.headers || {})

                            }

                        }
                    );


                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";


                const data =
                    contentType.includes(
                        "application/json"
                    )
                        ? await response.json()
                        : await response.text();


                if (!response.ok) {

                    throw new Error(
                        `API request failed: ${response.status}`
                    );

                }


                return {

                    success: true,

                    status:
                        response.status,

                    data

                };

            } catch (error) {

                window.NEXPAK.integration.send(

                    window.NEXPAK.integration
                        .channels.ERROR,

                    {

                        type:
                            "api-error",

                        endpoint,

                        message:
                            error.message

                    }

                );


                return {

                    success: false,

                    status:
                        "request-failed",

                    message:
                        error.message

                };

            }

        }

    };


/* ---------------------------------------------------------
   EMAIL ADAPTER
   --------------------------------------------------------- */

window.NEXPAK.integration.email =
    {


        /* -------------------------------------------------
           CONFIGURE EMAIL
           ------------------------------------------------- */

        configure(configuration = {}) {

            return window.NEXPAK.integration
                .registerService(
                    "email",
                    configuration
                );

        },


        /* -------------------------------------------------
           SEND EMAIL
           ------------------------------------------------- */

        async send(
            message = {}
        ) {

            const service =
                window.NEXPAK.integration
                    .services.email;

            if (
                !service.enabled ||
                !service.configured
            ) {

                return {

                    success: false,

                    status:
                        "not-configured",

                    message:
                        "Email service is not configured."

                };

            }


            /*
             * Email sending should normally happen through
             * a secure backend rather than exposing SMTP
             * credentials inside the browser.
             */

            return {

                success: false,

                status:
                    "adapter-ready",

                message:
                    "Email adapter is ready for backend integration.",

                payload:
                    window.NEXPAK.integration
                        .cloneState(message)

            };

        }

    };


/* ---------------------------------------------------------
   WHATSAPP ADAPTER
   --------------------------------------------------------- */

window.NEXPAK.integration.whatsapp =
    {


        /* -------------------------------------------------
           CONFIGURE WHATSAPP
           ------------------------------------------------- */

        configure(configuration = {}) {

            return window.NEXPAK.integration
                .registerService(
                    "whatsapp",
                    configuration
                );

        },


        /* -------------------------------------------------
           BUILD WHATSAPP MESSAGE
           ------------------------------------------------- */

        buildMessage(data = {}) {

            const lines = [];


            if (data.title) {

                lines.push(
                    data.title
                );

            }


            if (data.orderReference) {

                lines.push(
                    `Order: ${data.orderReference}`
                );

            }


            if (data.customerName) {

                lines.push(
                    `Customer: ${data.customerName}`
                );

            }


            if (data.total !== undefined) {

                lines.push(
                    `Total: R${Number(data.total).toFixed(2)}`
                );

            }


            if (data.message) {

                lines.push(
                    data.message
                );

            }


            return lines.join(
                "\n"
            );

        },


        /* -------------------------------------------------
           CREATE WHATSAPP URL
           ------------------------------------------------- */

        createURL(message = "") {

            const service =
                window.NEXPAK.integration
                    .services.whatsapp;

            if (
                !service.number
            ) {

                return null;

            }


            const cleanNumber =
                String(service.number)
                    .replace(
                        /[^0-9]/g,
                        ""
                    );


            if (!cleanNumber) {

                return null;

            }


            return (
                "https://wa.me/" +
                cleanNumber +
                "?text=" +
                encodeURIComponent(
                    message
                )
            );

        },


        /* -------------------------------------------------
           OPEN WHATSAPP
           ------------------------------------------------- */

        open(message = "") {

            const url =
                this.createURL(
                    message
                );

            if (!url) {

                return {

                    success: false,

                    status:
                        "not-configured"

                };

            }


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );


            return {

                success: true,

                status:
                    "opened"

            };

        }

    };


/* ---------------------------------------------------------
   ANALYTICS ADAPTER
   --------------------------------------------------------- */

window.NEXPAK.integration.analytics =
    {


        /* -------------------------------------------------
           CONFIGURE
           ------------------------------------------------- */

        configure(configuration = {}) {

            return window.NEXPAK.integration
                .registerService(
                    "analytics",
                    configuration
                );

        },


        /* -------------------------------------------------
           TRACK EVENT
           ------------------------------------------------- */

        track(
            eventName,
            eventData = {}
        ) {

            if (!eventName) {
                return false;
            }


            const service =
                window.NEXPAK.integration
                    .services.analytics;


            /*
             * Internal event tracking is always available.
             */

            window.NEXPAK.integration.send(

                eventName,

                {

                    type:
                        "analytics",

                    event:
                        eventName,

                    data:
                        window.NEXPAK.integration
                            .cloneState(eventData)

                }

            );


            /*
             * If a real analytics provider is later
             * connected, it can be called here.
             */

            if (
                service.enabled &&
                service.configured
            ) {

                if (
                    typeof window.gtag ===
                    "function"
                ) {

                    window.gtag(
                        "event",
                        eventName,
                        eventData
                    );

                }

            }


            return true;

        }

    };


/* ---------------------------------------------------------
   ORDER INTEGRATION PAYLOAD
   --------------------------------------------------------- */

window.NEXPAK.integration.buildOrderPayload =
    function () {

        const state =
            this.storeState;


        return {

            sessionId:
                this.session.id,

            product:
                this.cloneState(
                    state.product
                ),

            cart:
                this.cloneState(
                    state.cart
                ),

            delivery:
                this.cloneState(
                    state.delivery
                ),

            configurator:
                this.cloneState(
                    state.configurator
                ),

            checkout:
                {

                    step:
                        state.checkout.step,

                    orderReference:
                        state.checkout
                            .orderReference,

                    completed:
                        state.checkout
                            .completed

                },

            createdAt:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   INTEGRATION EVENT TRACKING
   --------------------------------------------------------- */

window.NEXPAK.integration.trackStoreEvent =
    function (
        eventName,
        data = {}
    ) {

        return this.analytics.track(
            eventName,
            data
        );

    };


/* ---------------------------------------------------------
   SERVICE HEALTH CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.checkServices =
    function () {

        const services =
            this.services;

        const result = {};


        Object.keys(
            services
        ).forEach(
            serviceName => {

                const service =
                    services[serviceName];

                result[serviceName] = {

                    enabled:
                        !!service.enabled,

                    configured:
                        !!service.configured,

                    ready:
                        !!service.enabled &&
                        !!service.configured

                };

            }
        );


        return result;

    };


/* ---------------------------------------------------------
   PART 5 INITIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.trackStoreEvent(
    "integration_services_loaded",
    {

        version:
            window.NEXPAK.integration.version,

        services:
            window.NEXPAK.integration
                .checkServices()

    }
);


/* =========================================================
   END — PART 5/8
   ========================================================= */
/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 6/8
   ORDER PIPELINE & TRANSACTION COORDINATION
   ========================================================= */


/* ---------------------------------------------------------
   ORDER PIPELINE
   --------------------------------------------------------- */

window.NEXPAK.integration.orderPipeline = {

    status: "idle",

    currentOrder: null,

    startedAt: null,

    completedAt: null,

    lastError: null,

    steps: [

        "validation",

        "cart",

        "delivery",

        "checkout",

        "order",

        "notification"

    ]

};


/* ---------------------------------------------------------
   PIPELINE STATUS
   --------------------------------------------------------- */

window.NEXPAK.integration.getPipelineStatus =
    function () {

        return {

            status:
                this.orderPipeline.status,

            currentOrder:
                this.cloneState(
                    this.orderPipeline.currentOrder
                ),

            startedAt:
                this.orderPipeline.startedAt,

            completedAt:
                this.orderPipeline.completedAt,

            lastError:
                this.orderPipeline.lastError,

            steps:
                [
                    ...this.orderPipeline.steps
                ]

        };

    };


/* ---------------------------------------------------------
   PIPELINE STATUS UPDATE
   --------------------------------------------------------- */

window.NEXPAK.integration.setPipelineStatus =
    function (
        status,
        data = {}
    ) {

        this.orderPipeline.status =
            status;

        if (data.order) {

            this.orderPipeline.currentOrder =
                this.cloneState(
                    data.order
                );

        }

        if (data.error) {

            this.orderPipeline.lastError =
                data.error;

        }

        this.send(
            this.channels.CHECKOUT_UPDATED,
            {

                type:
                    "pipeline-status",

                status,

                data:
                    this.cloneState(data)

            }
        );

        return true;

    };


/* ---------------------------------------------------------
   ORDER ID GENERATOR
   --------------------------------------------------------- */

window.NEXPAK.integration.generateOrderReference =
    function () {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );

        const random =
            Math.random()
                .toString(36)
                .substring(
                    2,
                    8
                )
                .toUpperCase();


        return (
            "NXP-" +
            year +
            month +
            day +
            "-" +
            random
        );

    };


/* ---------------------------------------------------------
   ORDER VALIDATION
   --------------------------------------------------------- */

window.NEXPAK.integration.validateOrder =
    function (
        order = null
    ) {

        const data =
            order ||
            this.buildOrderPayload();

        const errors = [];


        /* -------------------------------------------------
           CART
           ------------------------------------------------- */

        if (
            !data.cart ||
            !Array.isArray(
                data.cart.items
            )
        ) {

            errors.push(
                "Cart data is unavailable."
            );

        }


        if (
            data.cart &&
            Array.isArray(
                data.cart.items
            ) &&
            data.cart.items.length === 0
        ) {

            errors.push(
                "Cart is empty."
            );

        }


        /* -------------------------------------------------
           CART TOTAL
           ------------------------------------------------- */

        if (
            data.cart &&
            (
                typeof data.cart.total !==
                "number" ||
                data.cart.total < 0
            )
        ) {

            errors.push(
                "Invalid cart total."
            );

        }


        /* -------------------------------------------------
           DELIVERY
           ------------------------------------------------- */

        if (
            data.delivery &&
            data.delivery.selected === false
        ) {

            errors.push(
                "Delivery method has not been selected."
            );

        }


        /* -------------------------------------------------
           CHECKOUT
           ------------------------------------------------- */

        if (
            data.checkout &&
            data.checkout.completed
        ) {

            /*
             * A completed checkout can still be submitted
             * only when an order reference exists.
             */

            if (
                !data.checkout.orderReference
            ) {

                errors.push(
                    "Completed checkout has no order reference."
                );

            }

        }


        return {

            valid:
                errors.length === 0,

            errors,

            order:
                data

        };

    };


/* ---------------------------------------------------------
   START ORDER PIPELINE
   --------------------------------------------------------- */

window.NEXPAK.integration.startOrder =
    function () {

        if (
            this.orderPipeline.status ===
            "processing"
        ) {

            return {

                success: false,

                status:
                    "already-processing"

            };

        }


        const orderReference =
            this.generateOrderReference();


        const order =
            this.buildOrderPayload();


        order.orderReference =
            orderReference;


        order.createdAt =
            new Date().toISOString();


        this.orderPipeline = {

            ...this.orderPipeline,

            status:
                "processing",

            currentOrder:
                this.cloneState(order),

            startedAt:
                new Date().toISOString(),

            completedAt:
                null,

            lastError:
                null

        };


        this.storeState.checkout
            .orderReference =
            orderReference;


        this.send(
            this.channels.CHECKOUT_STARTED,
            {

                orderReference,

                order:
                    this.cloneState(order)

            }
        );


        this.analytics.track(
            "order_pipeline_started",
            {

                orderReference

            }
        );


        return {

            success: true,

            orderReference,

            order:
                this.cloneState(order)

        };

    };


/* ---------------------------------------------------------
   REFRESH ORDER PAYLOAD
   --------------------------------------------------------- */

window.NEXPAK.integration.refreshOrder =
    function () {

        if (
            !this.orderPipeline.currentOrder
        ) {

            return null;

        }


        const currentReference =
            this.orderPipeline
                .currentOrder
                .orderReference;


        const order =
            this.buildOrderPayload();


        order.orderReference =
            currentReference;


        order.updatedAt =
            new Date().toISOString();


        this.orderPipeline.currentOrder =
            this.cloneState(order);


        return this.cloneState(
            order
        );

    };


/* ---------------------------------------------------------
   VALIDATE CURRENT ORDER
   --------------------------------------------------------- */

window.NEXPAK.integration.validateCurrentOrder =
    function () {

        const order =
            this.refreshOrder();


        const validation =
            this.validateOrder(
                order
            );


        if (!validation.valid) {

            this.orderPipeline.lastError =
                validation.errors;

        }


        return validation;

    };


/* ---------------------------------------------------------
   COMPLETE ORDER PIPELINE
   --------------------------------------------------------- */

window.NEXPAK.integration.completeOrder =
    function (
        result = {}
    ) {

        const validation =
            this.validateCurrentOrder();


        if (!validation.valid) {

            this.setPipelineStatus(
                "validation-failed",
                {

                    error:
                        validation.errors

                }
            );


            return {

                success: false,

                status:
                    "validation-failed",

                errors:
                    validation.errors

            };

        }


        const order =
            this.orderPipeline
                .currentOrder;


        order.completedAt =
            new Date().toISOString();


        order.result =
            this.cloneState(
                result
            );


        this.orderPipeline.currentOrder =
            this.cloneState(
                order
            );


        this.orderPipeline.completedAt =
            order.completedAt;


        this.orderPipeline.status =
            "completed";


        this.storeState.checkout.completed =
            true;


        this.send(
            this.channels.CHECKOUT_COMPLETED,
            {

                orderReference:
                    order.orderReference,

                order:
                    this.cloneState(
                        order
                    ),

                result:
                    this.cloneState(
                        result
                    )

            }
        );


        this.analytics.track(
            "order_completed",
            {

                orderReference:
                    order.orderReference,

                total:
                    order.cart.total

            }
        );


        this.persistStoreState();


        return {

            success: true,

            status:
                "completed",

            order:
                this.cloneState(
                    order
                )

        };

    };


/* ---------------------------------------------------------
   FAIL ORDER PIPELINE
   --------------------------------------------------------- */

window.NEXPAK.integration.failOrder =
    function (
        error
    ) {

        const message =
            error instanceof Error
                ? error.message
                : String(error || "Unknown error");


        this.orderPipeline.status =
            "failed";


        this.orderPipeline.lastError =
            message;


        this.send(
            this.channels.ERROR,
            {

                type:
                    "order-pipeline-error",

                message,

                orderReference:
                    this.orderPipeline
                        .currentOrder
                        ?.orderReference ||
                    null

            }
        );


        this.analytics.track(
            "order_pipeline_failed",
            {

                message,

                orderReference:
                    this.orderPipeline
                        .currentOrder
                        ?.orderReference ||
                    null

            }
        );


        return {

            success: false,

            status:
                "failed",

            message

        };

    };


/* ---------------------------------------------------------
   CANCEL ORDER PIPELINE
   --------------------------------------------------------- */

window.NEXPAK.integration.cancelOrder =
    function (
        reason = "Cancelled by user"
    ) {

        const reference =
            this.orderPipeline
                .currentOrder
                ?.orderReference ||
            null;


        this.orderPipeline.status =
            "cancelled";


        this.orderPipeline.lastError =
            reason;


        this.send(
            this.channels.CHECKOUT_UPDATED,
            {

                type:
                    "order-cancelled",

                orderReference:
                    reference,

                reason

            }
        );


        this.analytics.track(
            "order_cancelled",
            {

                orderReference:
                    reference,

                reason

            }
        );


        return {

            success: true,

            status:
                "cancelled",

            orderReference:
                reference

        };

    };


/* ---------------------------------------------------------
   ORDER SUMMARY
   --------------------------------------------------------- */

window.NEXPAK.integration.getOrderSummary =
    function () {

        const order =
            this.orderPipeline
                .currentOrder;


        if (!order) {

            return {

                exists: false,

                orderReference: null,

                itemCount: 0,

                subtotal: 0,

                deliveryCost: 0,

                total: 0

            };

        }


        return {

            exists: true,

            orderReference:
                order.orderReference ||
                null,

            itemCount:
                order.cart?.itemCount ||
                0,

            subtotal:
                order.cart?.subtotal ||
                0,

            discount:
                order.cart?.discount ||
                0,

            deliveryCost:
                order.cart?.deliveryCost ||
                0,

            total:
                order.cart?.total ||
                0,

            status:
                this.orderPipeline.status

        };

    };


/* ---------------------------------------------------------
   ORDER HISTORY
   --------------------------------------------------------- */

window.NEXPAK.integration.getOrderHistory =
    function () {

        return this.loadLocal(
            "order_history",
            []
        );

    };


/* ---------------------------------------------------------
   SAVE ORDER HISTORY
   --------------------------------------------------------- */

window.NEXPAK.integration.saveOrderHistory =
    function (
        order
    ) {

        if (!order) {
            return false;
        }


        const history =
            this.getOrderHistory();


        if (!Array.isArray(history)) {
            return false;
        }


        history.unshift(
            this.cloneState(
                order
            )
        );


        /*
         * Keep browser history intentionally limited.
         */

        const limitedHistory =
            history.slice(
                0,
                20
            );


        return this.saveLocal(
            "order_history",
            limitedHistory
        );

    };


/* ---------------------------------------------------------
   FINALISE & STORE ORDER
   --------------------------------------------------------- */

window.NEXPAK.integration.finaliseOrder =
    function (
        result = {}
    ) {

        const completed =
            this.completeOrder(
                result
            );


        if (!completed.success) {

            return completed;

        }


        this.saveOrderHistory(
            completed.order
        );


        return {

            success: true,

            status:
                "finalised",

            order:
                completed.order

        };

    };


/* ---------------------------------------------------------
   ORDER PIPELINE RESET
   --------------------------------------------------------- */

window.NEXPAK.integration.resetOrderPipeline =
    function () {

        this.orderPipeline = {

            status:
                "idle",

            currentOrder:
                null,

            startedAt:
                null,

            completedAt:
                null,

            lastError:
                null,

            steps: [

                "validation",

                "cart",

                "delivery",

                "checkout",

                "order",

                "notification"

            ]

        };


        return true;

    };


/* ---------------------------------------------------------
   PIPELINE HEALTH CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.checkOrderPipeline =
    function () {

        const pipeline =
            this.orderPipeline;


        const validation =
            pipeline.currentOrder
                ? this.validateCurrentOrder()
                : {
                    valid: false,
                    errors: [
                        "No active order."
                    ]
                };


        return {

            status:
                pipeline.status,

            active:
                !!pipeline.currentOrder,

            valid:
                validation.valid,

            errors:
                validation.errors,

            orderReference:
                pipeline.currentOrder
                    ?.orderReference ||
                null

        };

    };


/* ---------------------------------------------------------
   PART 6 INITIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.trackStoreEvent(
    "order_pipeline_loaded",
    {

        status:
            window.NEXPAK.integration
                .orderPipeline
                .status,

        steps:
            window.NEXPAK.integration
                .orderPipeline
                .steps

    }
);


/* =========================================================
   END — PART 6/8
   ========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 7/8
   SECURITY, ERROR RECOVERY & RUNTIME PROTECTION
   ========================================================= */


/* ---------------------------------------------------------
   RUNTIME PROTECTION
   --------------------------------------------------------- */

window.NEXPAK.integration.runtime = {

    active: true,

    online: navigator.onLine,

    lastError: null,

    errorCount: 0,

    lastErrorAt: null,

    busyActions: {},

    requestCount: 0,

    failedRequests: 0

};


/* ---------------------------------------------------------
   ERROR RECOVERY CONFIGURATION
   --------------------------------------------------------- */

window.NEXPAK.integration.recovery = {

    maxErrors: 10,

    retryAttempts: 3,

    retryDelay: 1000,

    enabled: true

};


/* ---------------------------------------------------------
   RECORD ERROR
   --------------------------------------------------------- */

window.NEXPAK.integration.recordError =
    function (
        error,
        context = {}
    ) {

        const message =
            error instanceof Error
                ? error.message
                : String(
                    error || "Unknown error"
                );

        const errorRecord = {

            message,

            context:
                this.cloneState(
                    context
                ),

            timestamp:
                new Date().toISOString(),

            stack:
                error instanceof Error
                    ? error.stack || null
                    : null

        };


        this.runtime.lastError =
            errorRecord;

        this.runtime.errorCount++;

        this.runtime.lastErrorAt =
            errorRecord.timestamp;


        console.error(
            "[NEXPAK Runtime Error]",
            errorRecord
        );


        this.send(
            this.channels.ERROR,
            errorRecord
        );


        return errorRecord;

    };


/* ---------------------------------------------------------
   SAFE EXECUTION
   --------------------------------------------------------- */

window.NEXPAK.integration.safeExecute =
    function (
        callback,
        context = {}
    ) {

        if (
            typeof callback !==
            "function"
        ) {

            return {

                success: false,

                error:
                    "Callback is not a function."

            };

        }


        try {

            const result =
                callback();


            return {

                success: true,

                result

            };

        } catch (error) {

            const record =
                this.recordError(
                    error,
                    context
                );


            return {

                success: false,

                error:
                    record.message,

                record

            };

        }

    };


/* ---------------------------------------------------------
   ASYNC SAFE EXECUTION
   --------------------------------------------------------- */

window.NEXPAK.integration.safeExecuteAsync =
    async function (
        callback,
        context = {}
    ) {

        if (
            typeof callback !==
            "function"
        ) {

            return {

                success: false,

                error:
                    "Callback is not a function."

            };

        }


        try {

            const result =
                await callback();


            return {

                success: true,

                result

            };

        } catch (error) {

            const record =
                this.recordError(
                    error,
                    context
                );


            return {

                success: false,

                error:
                    record.message,

                record

            };

        }

    };


/* ---------------------------------------------------------
   DUPLICATE ACTION PROTECTION
   --------------------------------------------------------- */

window.NEXPAK.integration.isBusy =
    function (
        action
    ) {

        return !!(
            action &&
            this.runtime.busyActions[action]
        );

    };


/* ---------------------------------------------------------
   LOCK ACTION
   --------------------------------------------------------- */

window.NEXPAK.integration.lockAction =
    function (
        action
    ) {

        if (!action) {
            return false;
        }

        if (
            this.runtime.busyActions[action]
        ) {

            return false;

        }

        this.runtime.busyActions[action] = {

            startedAt:
                Date.now()

        };


        return true;

    };


/* ---------------------------------------------------------
   UNLOCK ACTION
   --------------------------------------------------------- */

window.NEXPAK.integration.unlockAction =
    function (
        action
    ) {

        if (!action) {
            return false;
        }

        delete this.runtime.busyActions[action];

        return true;

    };


/* ---------------------------------------------------------
   EXECUTE ONCE
   --------------------------------------------------------- */

window.NEXPAK.integration.executeOnce =
    async function (
        action,
        callback
    ) {

        if (
            !action ||
            typeof callback !==
            "function"
        ) {

            return {

                success: false,

                error:
                    "Invalid action."

            };

        }


        if (
            !this.lockAction(action)
        ) {

            return {

                success: false,

                status:
                    "already-running"

            };

        }


        try {

            const result =
                await callback();


            return {

                success: true,

                result

            };

        } catch (error) {

            const record =
                this.recordError(
                    error,
                    {
                        action
                    }
                );


            return {

                success: false,

                error:
                    record.message

            };

        } finally {

            this.unlockAction(
                action
            );

        }

    };


/* ---------------------------------------------------------
   RETRY ASYNC OPERATION
   --------------------------------------------------------- */

window.NEXPAK.integration.retry =
    async function (
        callback,
        attempts =
            this.recovery.retryAttempts,
        delay =
            this.recovery.retryDelay
    ) {

        if (
            typeof callback !==
            "function"
        ) {

            return {

                success: false,

                error:
                    "Callback is not a function."

            };

        }


        let lastError =
            null;


        for (
            let attempt = 1;
            attempt <= attempts;
            attempt++
        ) {

            try {

                const result =
                    await callback(
                        attempt
                    );


                return {

                    success: true,

                    attempt,

                    result

                };

            } catch (error) {

                lastError =
                    error;


                this.runtime
                    .failedRequests++;


                if (
                    attempt <
                    attempts
                ) {

                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                delay *
                                attempt
                            )
                    );

                }

            }

        }


        const record =
            this.recordError(
                lastError,
                {
                    attempts
                }
            );


        return {

            success: false,

            attempts,

            error:
                record.message

        };

    };


/* ---------------------------------------------------------
   NETWORK STATUS
   --------------------------------------------------------- */

window.NEXPAK.integration.network =
    {

        isOnline() {

            return navigator.onLine;

        },


        getStatus() {

            return {

                online:
                    navigator.onLine,

                checkedAt:
                    new Date().toISOString()

            };

        }

    };


/* ---------------------------------------------------------
   ONLINE EVENT
   --------------------------------------------------------- */

window.addEventListener(
    "online",
    function () {

        window.NEXPAK.integration
            .runtime.online = true;


        window.NEXPAK.integration.send(
            window.NEXPAK.integration
                .channels.STORE_READY,
            {

                type:
                    "network-online"

            }
        );


        window.NEXPAK.integration.analytics.track(
            "network_online"
        );

    }
);


/* ---------------------------------------------------------
   OFFLINE EVENT
   --------------------------------------------------------- */

window.addEventListener(
    "offline",
    function () {

        window.NEXPAK.integration
            .runtime.online = false;


        window.NEXPAK.integration.send(
            window.NEXPAK.integration
                .channels.ERROR,
            {

                type:
                    "network-offline",

                message:
                    "The store has lost network connectivity."

            }
        );


        window.NEXPAK.integration.analytics.track(
            "network_offline"
        );

    }
);


/* ---------------------------------------------------------
   REQUEST TRACKING
   --------------------------------------------------------- */

window.NEXPAK.integration.trackRequest =
    function (
        type = "request"
    ) {

        this.runtime.requestCount++;

        return {

            requestId:
                "REQ-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(
                        2,
                        7
                    )
                    .toUpperCase(),

            type,

            startedAt:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   REQUEST COMPLETION
   --------------------------------------------------------- */

window.NEXPAK.integration.completeRequest =
    function (
        request,
        success = true
    ) {

        if (!request) {
            return null;
        }


        return {

            ...request,

            success,

            completedAt:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   SECURE DATA FILTER
   --------------------------------------------------------- */

window.NEXPAK.integration.sanitize =
    function (data) {

        if (
            data === null ||
            data === undefined
        ) {

            return data;

        }


        if (
            typeof data !==
            "object"
        ) {

            return data;

        }


        const sensitiveKeys = [

            "password",

            "passwd",

            "token",

            "accessToken",

            "refreshToken",

            "secret",

            "apiKey",

            "apikey",

            "cardNumber",

            "cvv",

            "cvc",

            "expiry",

            "authorization"

        ];


        if (
            Array.isArray(data)
        ) {

            return data.map(
                item =>
                    this.sanitize(item)
            );

        }


        const result = {};


        Object.keys(
            data
        ).forEach(
            key => {

                const lowerKey =
                    key.toLowerCase();


                const sensitive =
                    sensitiveKeys.some(
                        sensitiveKey =>
                            lowerKey ===
                            sensitiveKey.toLowerCase()
                    );


                if (sensitive) {

                    result[key] =
                        "[REDACTED]";

                } else {

                    result[key] =
                        this.sanitize(
                            data[key]
                        );

                }

            }
        );


        return result;

    };


/* ---------------------------------------------------------
   SECURE EVENT LOG
   --------------------------------------------------------- */

window.NEXPAK.integration.logSecure =
    function (
        message,
        data = null
    ) {

        const safeData =
            data === null
                ? null
                : this.sanitize(
                    data
                );


        if (safeData === null) {

            console.log(
                `[NEXPAK] ${message}`
            );

        } else {

            console.log(
                `[NEXPAK] ${message}`,
                safeData
            );

        }

        return true;

    };


/* ---------------------------------------------------------
   GLOBAL ERROR HANDLER
   --------------------------------------------------------- */

window.addEventListener(
    "error",
    function (event) {

        window.NEXPAK.integration
            .recordError(
                event.error ||
                event.message,
                {

                    type:
                        "window-error",

                    filename:
                        event.filename,

                    line:
                        event.lineno,

                    column:
                        event.colno

                }
            );

    }
);


/* ---------------------------------------------------------
   UNHANDLED PROMISE HANDLER
   --------------------------------------------------------- */

window.addEventListener(
    "unhandledrejection",
    function (event) {

        window.NEXPAK.integration
            .recordError(
                event.reason,
                {

                    type:
                        "unhandled-promise"

                }
            );

    }
);


/* ---------------------------------------------------------
   RUNTIME DIAGNOSTICS
   --------------------------------------------------------- */

window.NEXPAK.integration.getDiagnostics =
    function () {

        return {

            runtime: {

                active:
                    this.runtime.active,

                online:
                    this.runtime.online,

                errorCount:
                    this.runtime.errorCount,

                requestCount:
                    this.runtime.requestCount,

                failedRequests:
                    this.runtime.failedRequests

            },

            services:
                this.checkServices(),

            modules:
                this.getModuleSnapshot(),

            pipeline:
                this.getPipelineStatus(),

            storage:
                this.getStorageStatus(),

            state:
                this.getStateSummary(),

            timestamp:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   RUNTIME HEALTH CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.runtimeHealth =
    function () {

        const diagnostics =
            this.getDiagnostics();


        const problems = [];


        if (
            !diagnostics.runtime.online
        ) {

            problems.push(
                "Store is currently offline."
            );

        }


        if (
            diagnostics.runtime.errorCount >=
            this.recovery.maxErrors
        ) {

            problems.push(
                "Runtime error threshold exceeded."
            );

        }


        if (
            !diagnostics.storage.supported
        ) {

            problems.push(
                "Browser storage is unavailable."
            );

        }


        return {

            healthy:
                problems.length === 0,

            problems,

            diagnostics

        };

    };


/* ---------------------------------------------------------
   PART 7 INITIALISATION
   --------------------------------------------------------- */

window.NEXPAK.integration.logSecure(
    "Runtime protection loaded.",
    {

        online:
            navigator.onLine,

        timestamp:
            new Date().toISOString()

    }
);


/* =========================================================
   END — PART 7/8
   ========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — INTEGRATION ENGINE
   PART 8/8
   FINAL ORCHESTRATOR & PRODUCTION READINESS
   ========================================================= */


/* ---------------------------------------------------------
   FINAL INTEGRATION CONFIGURATION
   --------------------------------------------------------- */

window.NEXPAK.integration.production = {

    version: "1.0.0",

    environment: "production",

    ready: false,

    initialised: false,

    startupTime: null,

    lastHealthCheck: null

};


/* ---------------------------------------------------------
   STARTUP CHECKLIST
   --------------------------------------------------------- */

window.NEXPAK.integration.startupChecklist =
    function () {

        const modules =
            this.getModuleSnapshot();

        const storage =
            this.getStorageStatus();

        const services =
            this.checkServices();

        const state =
            this.validateState();

        const runtime =
            this.runtimeHealth();


        const checks = {

            integration:
                !!this.ready,

            store:
                modules.store,

            cart:
                modules.cart,

            checkout:
                modules.checkout,

            delivery:
                modules.delivery,

            configurator:
                modules.configurator,

            storage:
                storage.supported,

            state:
                state.valid,

            runtime:
                runtime.healthy

        };


        const failed =
            Object.keys(checks)
                .filter(
                    key =>
                        checks[key] !== true
                );


        return {

            ready:
                failed.length === 0,

            checks,

            failed,

            services,

            timestamp:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   FINAL HEALTH CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.finalHealthCheck =
    function () {

        const checklist =
            this.startupChecklist();


        this.production.lastHealthCheck =
            new Date().toISOString();


        this.production.ready =
            checklist.ready;


        return checklist;

    };


/* ---------------------------------------------------------
   STORE STATUS
   --------------------------------------------------------- */

window.NEXPAK.integration.getStoreStatus =
    function () {

        const health =
            this.finalHealthCheck();


        return {

            name:
                "NEXPAK Security Solutions Online Store",

            version:
                this.production.version,

            environment:
                this.production.environment,

            ready:
                health.ready,

            integration:
                {

                    status:
                        this.status,

                    initialized:
                        this.state.initialized,

                    ready:
                        this.ready

                },

            modules:
                this.getModuleSnapshot(),

            pipeline:
                this.getPipelineStatus(),

            services:
                this.checkServices(),

            runtime:
                {

                    online:
                        this.runtime.online,

                    errors:
                        this.runtime.errorCount,

                    requests:
                        this.runtime.requestCount,

                    failedRequests:
                        this.runtime.failedRequests

                },

            storage:
                this.getStorageStatus(),

            state:
                this.getStateSummary(),

            timestamp:
                new Date().toISOString()

        };

    };


/* ---------------------------------------------------------
   PUBLIC READY CHECK
   --------------------------------------------------------- */

window.NEXPAK.integration.isReady =
    function () {

        return !!(
            this.production.ready &&
            this.state.initialized
        );

    };


/* ---------------------------------------------------------
   WAIT FOR INTEGRATION
   --------------------------------------------------------- */

window.NEXPAK.integration.waitUntilReady =
    function (
        timeout = 10000
    ) {

        return new Promise(
            resolve => {

                if (
                    this.isReady()
                ) {

                    resolve(true);

                    return;

                }


                const start =
                    Date.now();


                const interval =
                    setInterval(
                        () => {

                            if (
                                this.isReady()
                            ) {

                                clearInterval(
                                    interval
                                );

                                resolve(true);

                                return;

                            }


                            if (
                                Date.now() -
                                start >=
                                timeout
                            ) {

                                clearInterval(
                                    interval
                                );

                                resolve(false);

                            }

                        },
                        100
                    );

            }
        );

    };


/* ---------------------------------------------------------
   STORE ACTION
   --------------------------------------------------------- */

window.NEXPAK.integration.action =
    async function (
        actionName,
        callback
    ) {

        if (
            !actionName ||
            typeof callback !==
            "function"
        ) {

            return {

                success: false,

                error:
                    "Invalid integration action."

            };

        }


        return this.executeOnce(
            actionName,
            async () => {

                return await callback();

            }
        );

    };


/* ---------------------------------------------------------
   PERSIST BEFORE PAGE EXIT
   --------------------------------------------------------- */

window.addEventListener(
    "beforeunload",
    function () {

        try {

            window.NEXPAK.integration
                .persistStoreState();

            window.NEXPAK.integration
                .saveCartSnapshot();

            window.NEXPAK.integration
                .updateActivity();

        } catch (error) {

            console.warn(
                "[NEXPAK] Unable to persist store state.",
                error
            );

        }

    }
);


/* ---------------------------------------------------------
   USER ACTIVITY TRACKING
   --------------------------------------------------------- */

const NEXPAK_ACTIVITY_EVENTS = [

    "click",

    "touchstart",

    "keydown",

    "scroll"

];


NEXPAK_ACTIVITY_EVENTS.forEach(
    eventName => {

        window.addEventListener(
            eventName,
            function () {

                window.NEXPAK.integration
                    .updateActivity();

            },
            {
                passive: true
            }
        );

    }
);


/* ---------------------------------------------------------
   STORE EVENT HELPERS
   --------------------------------------------------------- */

window.NEXPAK.integration.events =
    {

        productSelected(
            product,
            quantity = 1
        ) {

            return window.NEXPAK
                .integration
                .setSelectedProduct(
                    product,
                    quantity
                );

        },


        cartUpdated(
            cartData
        ) {

            return window.NEXPAK
                .integration
                .syncCart(
                    cartData
                );

        },


        checkoutUpdated(
            checkoutData
        ) {

            return window.NEXPAK
                .integration
                .syncCheckout(
                    checkoutData
                );

        },


        deliveryUpdated(
            deliveryData
        ) {

            return window.NEXPAK
                .integration
                .syncDelivery(
                    deliveryData
                );

        },


        configuratorUpdated(
            configurationData
        ) {

            return window.NEXPAK
                .integration
                .syncConfigurator(
                    configurationData
                );

        }

    };


/* ---------------------------------------------------------
   FINAL STARTUP
   --------------------------------------------------------- */

window.NEXPAK.integration.startup =
    async function () {

        if (
            this.production.initialised
        ) {

            return this.getStoreStatus();

        }


        this.log(
            "NEXPAK Online Store integration starting..."
        );


        /* ---------------------------------------------
           REFRESH MODULE REGISTRY
           --------------------------------------------- */

        this.detectModules();

        this.checkModuleStatus();


        /* ---------------------------------------------
           RESTORE SAFE STORE DATA
           --------------------------------------------- */

        this.restoreStoreState();

        this.applyPreferences();


        /* ---------------------------------------------
           START SESSION
           --------------------------------------------- */

        this.startSession();


        /* ---------------------------------------------
           INITIALISE RUNTIME STATE
           --------------------------------------------- */

        this.runtime.online =
            navigator.onLine;


        this.runtime.active =
            true;


        /* ---------------------------------------------
           FINAL HEALTH CHECK
           --------------------------------------------- */

        const health =
            this.finalHealthCheck();


        this.production.initialised =
            true;

        this.production.startupTime =
            new Date().toISOString();


        this.production.ready =
            health.ready;


        /* ---------------------------------------------
           FINAL EVENT
           --------------------------------------------- */

        this.send(
            this.channels.STORE_READY,
            {

                type:
                    "store-integration-ready",

                ready:
                    this.production.ready,

                health:
                    health

            }
        );


        this.analytics.track(
            "store_integration_ready",
            {

                ready:
                    this.production.ready

            }
        );


        this.log(
            "NEXPAK Online Store integration startup complete."
        );


        return this.getStoreStatus();

    };


/* ---------------------------------------------------------
   GLOBAL NEXPAK READY EVENT
   --------------------------------------------------------- */

window.NEXPAK.integration.on(
    "integration:ready",
    function () {

        window.NEXPAK.integration
            .startup();

    }
);


/* ---------------------------------------------------------
   FALLBACK STARTUP
   --------------------------------------------------------- */

(function () {

    const startIntegration =
        async function () {

            try {

                await window.NEXPAK
                    .integration
                    .startup();

            } catch (error) {

                window.NEXPAK
                    .integration
                    .recordError(
                        error,
                        {
                            type:
                                "startup"
                        }
                    );

            }

        };


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startIntegration,
            {
                once: true
            }
        );

    } else {

        startIntegration();

    }

})();


/* ---------------------------------------------------------
   FINAL PRODUCTION API
   --------------------------------------------------------- */

window.NEXPAK.integration.apiVersion =
    "1.0";


window.NEXPAK.integration.getVersion =
    function () {

        return {

            engine:
                this.version,

            api:
                this.apiVersion,

            production:
                this.production.version

        };

    };


/* ---------------------------------------------------------
   FINAL CONSOLE MESSAGE
   --------------------------------------------------------- */

console.log(
    "%cNEXPAK SECURITY SOLUTIONS",
    "font-weight:bold;font-size:16px;"
);

console.log(
    "Online Store Integration Engine — Part 8/8 Loaded"
);

console.log(
    "Integration API Version:",
    window.NEXPAK.integration.apiVersion
);


/* =========================================================
   END — PART 8/8
   ONLINE INTEGRATION ENGINE COMPLETE
   ========================================================= */

