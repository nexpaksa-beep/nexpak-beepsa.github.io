/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   Unified Delivery Calculator
   --------------------------------------------------------------------------
   Used by:
   - shop.html
   - online.html
   - equestrian.html

   Version: 2.0
   ========================================================================== */

'use strict';

console.log('Nexpak Unified Delivery Calculator loading...');


/* ==========================================================================
   1. GLOBAL CONFIGURATION
   ========================================================================== */

const NEXPAK_DELIVERY_CONFIG = {

    /* ----------------------------------------------------------------------
       Warehouse
       ---------------------------------------------------------------------- */

    warehouse: {
        name: 'Nexpak Security Solutions',
        address: 'Benoni, Gauteng, South Africa'
    },


    /* ----------------------------------------------------------------------
       Standard delivery calculation
       ----------------------------------------------------------------------

       Formula:

       Base Fee
       + Distance Fee
       + Weight Fee
       = Delivery Cost
    */

    pricing: {
        baseFee: 90.00,
        perKm: 6.50,
        perKg: 8.00
    },


    /* ----------------------------------------------------------------------
       Regional fallback pricing

       Used when the customer selects a region instead of entering an
       exact address.
       ---------------------------------------------------------------------- */

    regionalRates: {

        gauteng: {
            name: 'Gauteng',
            baseFee: 200.00
        },

        durban: {
            name: 'Durban',
            baseFee: 650.00
        },

        capetown: {
            name: 'Cape Town Areas',
            baseFee: 800.00
        },

        other: {
            name: 'Other Areas',
            baseFee: 500.00
        }

    },


    /* ----------------------------------------------------------------------
       VAT

       Delivery is calculated separately first.

       Checkout can then apply VAT to the taxable amount.
       ---------------------------------------------------------------------- */

    vatRate: 0.15,


    /* ----------------------------------------------------------------------
       Google Maps

       IMPORTANT:
       Do NOT put an unrestricted production Google API key here.

       Recommended architecture:

       Browser
          ↓
       Your backend/proxy
          ↓
       Google Maps API

       The endpoint below can later be connected to your backend.

       Example:

       https://www.nexpaksolutions.co.za/api/distance
       ---------------------------------------------------------------------- */

    maps: {

        enabled: true,

        endpoint: '/api/distance',

        /* Optional frontend fallback.
           Leave blank in production. */

        apiKey: '',

        origin: 'Benoni, Gauteng, South Africa'

    },


    /* ----------------------------------------------------------------------
       Storage

       The calculated delivery information is saved so checkout.js can
       retrieve EXACTLY the same delivery amount.
       ---------------------------------------------------------------------- */

    storageKey: 'nexpak_delivery_quote'

};


/* ==========================================================================
   2. CURRENT DELIVERY STATE
   ========================================================================== */

const NEXPAK_DELIVERY_STATE = {

    calculated: false,

    method: null,

    region: null,

    address: '',

    distanceKm: 0,

    weightKg: 0,

    baseFee: 0,

    distanceFee: 0,

    weightFee: 0,

    total: 0,

    timestamp: null

};


/* ==========================================================================
   3. PAGE DETECTION
   ========================================================================== */

function getNexpakPageType() {

    const path = window.location.pathname.toLowerCase();

    const filename = path.split('/').pop();


    /* Build Your System */

    if (
        filename === 'shop.html' ||
        document.getElementById('systemBuilder') ||
        document.getElementById('propertyPreview')
    ) {
        return 'shop';
    }


    /* Equestrian */

    if (
        filename === 'equestrian.html' ||
        path.includes('equestrian')
    ) {
        return 'equestrian';
    }


    /* Online Store */

    if (
        filename === 'online.html' ||
        path.includes('online-store')
    ) {
        return 'online';
    }


    /* Checkout */

    if (
        filename === 'checkout.html' ||
        document.getElementById('checkoutForm')
    ) {
        return 'checkout';
    }


    return 'unknown';

}


/* ==========================================================================
   4. INITIALISE DELIVERY CALCULATOR
   ========================================================================== */

function initNexpakDeliveryCalculator() {

    const pageType = getNexpakPageType();

    console.log(
        'Nexpak Delivery Calculator:',
        'Page =',
        pageType
    );


    /* ----------------------------------------------------------------------
       Prevent duplicate initialisation
       ---------------------------------------------------------------------- */

    if (window.__NEXPAK_DELIVERY_INITIALIZED__) {

        console.log(
            'Nexpak Delivery Calculator already initialized.'
        );

        return;

    }


    window.__NEXPAK_DELIVERY_INITIALIZED__ = true;


    /* ----------------------------------------------------------------------
       Load saved quote
       ---------------------------------------------------------------------- */

    loadSavedDeliveryQuote();


    /* ----------------------------------------------------------------------
       Create calculator if page contains a delivery container
       ---------------------------------------------------------------------- */

    initializeDeliveryUI(pageType);


    /* ----------------------------------------------------------------------
       Connect cart/configurator updates
       ---------------------------------------------------------------------- */

    setupDeliveryListeners();


    /* ----------------------------------------------------------------------
       Calculate initial weight
       ---------------------------------------------------------------------- */

    updateDeliveryWeight();


    console.log(
        'Nexpak Delivery Calculator initialized successfully.'
    );

}


/* ==========================================================================
   5. DELIVERY UI INITIALISATION
   ========================================================================== */

function initializeDeliveryUI(pageType) {

    /*
       Do not automatically inject a calculator into checkout.

       checkout.js controls checkout.

       The calculator is intended for:
       - shop.html
       - online.html
       - equestrian.html
    */

    if (pageType === 'checkout') {

        console.log(
            'Checkout detected - delivery engine loaded without UI injection.'
        );

        return;

    }


    const existingContainer =
        document.querySelector(
            '.delivery-calculator, ' +
            '#delivery-calculator, ' +
            '#deliveryCalculator, ' +
            '#delivery-section'
        );


    if (!existingContainer) {

        console.log(
            'No delivery calculator container found on this page.'
        );

        return;

    }


    /*
       If a calculator already exists, don't replace it.
    */

    if (
        document.getElementById(
            'delivery-calculator-enhanced'
        )
    ) {

        setupDeliveryEvents();

        return;

    }


    createUnifiedDeliveryCalculator(existingContainer);

}


/* ==========================================================================
   6. CREATE UNIFIED DELIVERY CALCULATOR
   ========================================================================== */

function createUnifiedDeliveryCalculator(container) {

    const calculatorHTML = `

        <div
            id="delivery-calculator-enhanced"
            class="nexpak-delivery-calculator"
        >

            <div class="delivery-header">

                <div>

                    <h3>
                        Delivery Calculator
                    </h3>

                    <p>
                        Delivery from Benoni, Gauteng
                    </p>

                </div>

                <span class="delivery-icon">
                    <i class="fa-solid fa-truck"></i>
                </span>

            </div>


            <!-- ==========================================================
                 ADDRESS CALCULATION
                 ========================================================== -->

            <div class="delivery-section">

                <label for="delivery-address">
                    Delivery Address
                </label>

                <div class="delivery-address-row">

                    <input
                        type="text"
                        id="delivery-address"
                        placeholder="Enter your delivery address"
                        autocomplete="street-address"
                    >

                    <button
                        type="button"
                        id="calculate-address-delivery"
                        class="delivery-calculate-btn"
                    >

                        <i class="fa-solid fa-location-dot"></i>

                        Calculate

                    </button>

                </div>

                <small>
                    Enter your address for an estimated distance-based quote.
                </small>

            </div>


            <!-- ==========================================================
                 DIVIDER
                 ========================================================== -->

            <div class="delivery-divider">

                <span>OR SELECT YOUR REGION</span>

            </div>


            <!-- ==========================================================
                 REGION
                 ========================================================== -->

            <div class="delivery-section">

                <label for="delivery-region">
                    Delivery Region
                </label>

                <select id="delivery-region">

                    <option value="">
                        Select Region
                    </option>

                    <option value="gauteng">
                        Gauteng — From R200
                    </option>

                    <option value="durban">
                        Durban — From R650
                    </option>

                    <option value="capetown">
                        Cape Town Areas — From R800
                    </option>

                    <option value="other">
                        Other Areas — From R500
                    </option>

                </select>

            </div>


            <!-- ==========================================================
                 MANUAL DISTANCE
                 ========================================================== -->

            <div class="delivery-section">

                <label for="distance-km">
                    Distance from Benoni
                </label>

                <div class="distance-input">

                    <input
                        type="number"
                        id="distance-km"
                        min="0"
                        step="1"
                        placeholder="Enter distance"
                    >

                    <span>km</span>

                </div>

                <button
                    type="button"
                    id="calculate-distance-delivery"
                    class="delivery-secondary-btn"
                >

                    Calculate Delivery

                </button>

            </div>


            <!-- ==========================================================
                 WEIGHT
                 ========================================================== -->

            <div class="delivery-weight">

                <span>
                    Estimated Cart/System Weight
                </span>

                <strong>

                    <span id="delivery-weight-display">
                        0.0
                    </span>

                    kg

                </strong>

            </div>


            <!-- ==========================================================
                 RESULTS
                 ========================================================== -->

            <div
                id="delivery-result"
                class="delivery-result"
                style="display:none;"
            >

                <h4>
                    Delivery Quote
                </h4>


                <div class="delivery-result-row">

                    <span>
                        Base Fee
                    </span>

                    <strong id="base-fee-display">
                        R0.00
                    </strong>

                </div>


                <div class="delivery-result-row">

                    <span>
                        Distance Fee
                    </span>

                    <strong id="distance-fee-display">
                        R0.00
                    </strong>

                </div>


                <div class="delivery-result-row">

                    <span>
                        Weight Fee
                    </span>

                    <strong id="weight-fee-display">
                        R0.00
                    </strong>

                </div>


                <div class="delivery-result-row delivery-total">

                    <span>
                        Total Delivery
                    </span>

                    <strong id="total-delivery-display">
                        R0.00
                    </strong>

                </div>


                <div
                    id="delivery-calculation-message"
                    class="delivery-message"
                ></div>

            </div>


            <!-- ==========================================================
                 STATUS
                 ========================================================== -->

            <div
                id="delivery-status"
                class="delivery-status"
            ></div>


            <p class="delivery-note">

                Delivery pricing is calculated from our Benoni warehouse.
                Final delivery cost may vary for unusually heavy or
                oversized orders.

            </p>

        </div>

    `;


    container.innerHTML = calculatorHTML;


    addUnifiedDeliveryStyles();


    setupDeliveryEvents();


    console.log(
        'Unified delivery calculator UI created.'
    );

}


/* ==========================================================================
   7. DELIVERY EVENTS
   ========================================================================== */

function setupDeliveryEvents() {

    const addressInput =
        document.getElementById('delivery-address');

    const addressButton =
        document.getElementById(
            'calculate-address-delivery'
        );

    const regionSelect =
        document.getElementById('delivery-region');

    const distanceInput =
        document.getElementById('distance-km');

    const distanceButton =
        document.getElementById(
            'calculate-distance-delivery'
        );


    /* Address */

    if (addressButton) {

        addressButton.addEventListener(
            'click',
            calculateDeliveryByAddress
        );

    }


    if (addressInput) {

        addressInput.addEventListener(
            'keydown',
            function(event) {

                if (event.key === 'Enter') {

                    event.preventDefault();

                    calculateDeliveryByAddress();

                }

            }
        );

    }


    /* Region */

    if (regionSelect) {

        regionSelect.addEventListener(
            'change',
            calculateDeliveryRegion
        );

    }


    /* Distance */

    if (distanceButton) {

        distanceButton.addEventListener(
            'click',
            calculateDeliveryManual
        );

    }


    if (distanceInput) {

        distanceInput.addEventListener(
            'keydown',
            function(event) {

                if (event.key === 'Enter') {

                    event.preventDefault();

                    calculateDeliveryManual();

                }

            }
        );

    }

}


/* ==========================================================================
   8. LISTEN FOR CART / CONFIGURATOR CHANGES
   ========================================================================== */

function setupDeliveryListeners() {

    /*
       Existing Nexpak systems may dispatch cartUpdated.
    */

    document.addEventListener(
        'cartUpdated',
        function() {

            updateDeliveryWeight();

        }
    );


    /*
       Configurator updates.
    */

    document.addEventListener(
        'configuratorUpdated',
        function() {

            updateDeliveryWeight();

        }
    );


    document.addEventListener(
        'systemUpdated',
        function() {

            updateDeliveryWeight();

        }
    );


    /*
       Storage changes.
    */

    window.addEventListener(
        'storage',
        function(event) {

            if (
                event.key === 'nexpak_cart' ||
                event.key === 'nexpak_configurator'
            ) {

                updateDeliveryWeight();

            }

        }
    );

}


/* ==========================================================================
   9. UPDATE DELIVERY WEIGHT
   ========================================================================== */

function updateDeliveryWeight() {

    const pageType = getNexpakPageType();

    let weight = 0;


    /* ----------------------------------------------------------------------
       Build Your System
       ---------------------------------------------------------------------- */

    if (pageType === 'shop') {

        weight = getConfiguratorWeight();

    }


    /* ----------------------------------------------------------------------
       Online Store
       ---------------------------------------------------------------------- */

    else if (pageType === 'online') {

        weight = getOnlineStoreWeight();

    }


    /* ----------------------------------------------------------------------
       Equestrian
       ---------------------------------------------------------------------- */

    else if (pageType === 'equestrian') {

        weight = getEquestrianWeight();

    }


    /* ----------------------------------------------------------------------
       Checkout / fallback
       ---------------------------------------------------------------------- */

    else {

        weight = getGenericCartWeight();

    }


    weight = Number(weight) || 0;


    NEXPAK_DELIVERY_STATE.weightKg = weight;


    const display =
        document.getElementById(
            'delivery-weight-display'
        );


    if (display) {

        display.textContent =
            weight.toFixed(1);

    }


    return weight;

}


/* ==========================================================================
   10. CONFIGURATOR WEIGHT
   ========================================================================== */

function getConfiguratorWeight() {

    /*
       We deliberately check several possible structures because the
       configurator has evolved through different versions.

       The first valid source is used.
    */


    /* ----------------------------------------------------------------------
       Global configurator cart
       ---------------------------------------------------------------------- */

    if (
        Array.isArray(window.cart) &&
        window.cart.length
    ) {

        return calculateItemsWeight(
            window.cart
        );

    }


    /* ----------------------------------------------------------------------
       Nexpak saved cart
       ---------------------------------------------------------------------- */

    const savedCart =
        getLocalStorageArray(
            'nexpak_cart'
        );


    if (savedCart.length) {

        return calculateItemsWeight(
            savedCart
        );

    }


    /* ----------------------------------------------------------------------
       Configurator state
       ---------------------------------------------------------------------- */

    if (
        window.configuratorState &&
        Array.isArray(
            window.configuratorState.cart
        )
    ) {

        return calculateItemsWeight(
            window.configuratorState.cart
        );

    }


    /* ----------------------------------------------------------------------
       Configurator selected products
       ---------------------------------------------------------------------- */

    if (
        window.selectedProducts &&
        Array.isArray(window.selectedProducts)
    ) {

        return calculateItemsWeight(
            window.selectedProducts
        );

    }


    /*
       Some versions of the configurator use an object rather than
       an array.
    */

    if (
        window.selectedProducts &&
        typeof window.selectedProducts === 'object'
    ) {

        return calculateObjectWeight(
            window.selectedProducts
        );

    }


    return 0;

}


/* ==========================================================================
   11. ONLINE STORE WEIGHT
   ========================================================================== */

function getOnlineStoreWeight() {

    /*
       First try the global cart.
    */

    if (
        Array.isArray(window.cart) &&
        window.cart.length
    ) {

        return calculateItemsWeight(
            window.cart
        );

    }


    /*
       Try the Nexpak online cart.
    */

    const onlineCartKeys = [
        'nexpak_cart',
        'online_cart',
        'nexpak_online_cart',
        'cart'
    ];


    for (
        let i = 0;
        i < onlineCartKeys.length;
        i++
    ) {

        const cart =
            getLocalStorageArray(
                onlineCartKeys[i]
            );


        if (cart.length) {

            return calculateItemsWeight(
                cart
            );

        }

    }


    /*
       Try common global cart variables.
    */

    if (
        Array.isArray(window.onlineCart)
    ) {

        return calculateItemsWeight(
            window.onlineCart
        );

    }


    if (
        Array.isArray(window.storeCart)
    ) {

        return calculateItemsWeight(
            window.storeCart
        );

    }


    return 0;

}


/* ==========================================================================
   12. EQUESTRIAN WEIGHT
   ========================================================================== */

function getEquestrianWeight() {

    /*
       Equestrian products can use the same cart system as the online store.
    */

    if (
        Array.isArray(window.cart) &&
        window.cart.length
    ) {

        return calculateItemsWeight(
            window.cart
        );

    }


    /*
       Check localStorage.
    */

    const possibleKeys = [
        'nexpak_cart',
        'equestrian_cart',
        'nexpak_equestrian_cart',
        'online_cart'
    ];


    for (
        let i = 0;
        i < possibleKeys.length;
        i++
    ) {

        const cart =
            getLocalStorageArray(
                possibleKeys[i]
            );


        if (cart.length) {

            return calculateItemsWeight(
                cart
            );

        }

    }


    /*
       Equestrian-specific global cart.
    */

    if (
        Array.isArray(window.equestrianCart)
    ) {

        return calculateItemsWeight(
            window.equestrianCart
        );

    }


    return 0;

}


/* ==========================================================================
   13. GENERIC CART WEIGHT
   ========================================================================== */

function getGenericCartWeight() {

    const possibleSources = [

        window.cart,

        window.onlineCart,

        window.storeCart,

        window.equestrianCart

    ];


    for (
        let i = 0;
        i < possibleSources.length;
        i++
    ) {

        if (
            Array.isArray(
                possibleSources[i]
            ) &&
            possibleSources[i].length
        ) {

            return calculateItemsWeight(
                possibleSources[i]
            );

        }

    }


    const possibleKeys = [
        'nexpak_cart',
        'online_cart',
        'equestrian_cart',
        'nexpak_online_cart',
        'nexpak_equestrian_cart'
    ];


    for (
        let i = 0;
        i < possibleKeys.length;
        i++
    ) {

        const cart =
            getLocalStorageArray(
                possibleKeys[i]
            );


        if (cart.length) {

            return calculateItemsWeight(
                cart
            );

        }

    }


    return 0;

}


/* ==========================================================================
   14. READ LOCAL STORAGE ARRAY
   ========================================================================== */

function getLocalStorageArray(key) {

    try {

        const raw =
            localStorage.getItem(key);


        if (!raw) {

            return [];

        }


        const parsed =
            JSON.parse(raw);


        if (Array.isArray(parsed)) {

            return parsed;

        }


        /*
           Some cart systems store:

           {
               items: [...]
           }
        */

        if (
            parsed &&
            Array.isArray(parsed.items)
        ) {

            return parsed.items;

        }


        /*
           Some systems store:

           {
               cart: [...]
           }
        */

        if (
            parsed &&
            Array.isArray(parsed.cart)
        ) {

            return parsed.cart;

        }


        return [];

    }

    catch (error) {

        console.warn(
            'Could not read cart from localStorage:',
            key,
            error
        );

        return [];

    }

}


/* ==========================================================================
   15. CALCULATE ITEM WEIGHT
   ========================================================================== */

function calculateItemsWeight(items) {

    if (!Array.isArray(items)) {

        return 0;

    }


    let totalWeight = 0;


    items.forEach(function(item) {

        if (!item) {

            return;

        }


        /*
           Quantity

           Supports:

           quantity
           qty
           count
        */

        const quantity =
            Number(
                item.quantity ??
                item.qty ??
                item.count ??
                1
            ) || 1;


        /*
           Product weight

           Supports:

           weight
           weightKg
           kg
           productWeight
           unitWeight
        */

        let weight =
            Number(
                item.weight ??
                item.weightKg ??
                item.kg ??
                item.productWeight ??
                item.unitWeight ??
                0
            );


        /*
           If weight is stored in grams, convert to kg.
        */

        if (
            weight > 100 &&
            (
                item.weightUnit === 'g' ||
                item.unit === 'g' ||
                item.weight_unit === 'g'
            )
        ) {

            weight =
                weight / 1000;

        }


        /*
           If no weight exists on the item, attempt to find it
           from the product database.
        */

        if (!weight) {

            weight =
                findProductWeight(
                    item
                );

        }


        /*
           Final safety fallback.

           We use 0.5kg rather than silently ignoring an item.
        */

        if (!weight || weight < 0) {

            weight = 0.5;

        }


        totalWeight +=
            weight * quantity;

    });


    return totalWeight;

}


/* ==========================================================================
   16. CALCULATE OBJECT WEIGHT
   ========================================================================== */

function calculateObjectWeight(products) {

    if (
        !products ||
        typeof products !== 'object'
    ) {

        return 0;

    }


    let totalWeight = 0;


    Object.keys(products).forEach(function(key) {

        const item =
            products[key];


        if (!item) {

            return;

        }


        /*
           If the object itself looks like a product.
        */

        if (
            typeof item === 'object'
        ) {

            const quantity =
                Number(
                    item.quantity ??
                    item.qty ??
                    1
                ) || 1;


            let weight =
                Number(
                    item.weight ??
                    item.weightKg ??
                    item.kg ??
                    item.productWeight ??
                    0
                );


            if (!weight) {

                weight =
                    findProductWeight(
                        item
                    );

            }


            if (!weight) {

                weight = 0.5;

            }


            totalWeight +=
                weight * quantity;

        }

    });


    return totalWeight;

}


/* ==========================================================================
   17. PRODUCT WEIGHT DATABASE
   ========================================================================== */

const NEXPAK_PRODUCT_WEIGHTS = {

    /*
       Equestrian
    */

    polytape: 0.5,
    'polytape-200m': 2.5,
    'polytape-500m': 6.0,

    rope: 0.8,
    'rope-200m': 3.0,

    insulator: 0.05,

    energizer: 2.0,
    'solar-energizer': 3.5,

    'gate-handle': 0.3,
    'gate-latch': 0.5,
    'gate-hinge': 0.4,
    'gate-hardware-kit': 2.5,

    'tape-connector': 0.1,

    strainers: 0.8,

    posts: 1.5,

    wire: 0.1,


    /*
       Security products
    */

    'gate-motor': 12,
    'gate-motors': 12,

    'cctv-camera': 0.6,
    'cctv-camera-hd': 0.6,
    'cctv-camera-ip': 0.7,

    'dvr': 2.0,
    'nvr': 2.0,

    'cctv-kit': 5.0,

    'alarm-panel': 1.5,

    'alarm-kit': 3.0,

    'ajax-hub': 0.8,

    'ajax-kit': 2.5,

    'roboguard': 2.0,

    'roboguard-kit': 5.0,

    'electric-fence-energizer': 2.0,

    'electric-fence-kit': 8.0,

    'access-control': 1.5,

    'intercom': 1.5,

    'intercom-kit': 3.0,


    /*
       General kit fallback weights
    */

    'security-kit': 5.0,

    'custom-kit': 5.0

};


/* ==========================================================================
   18. FIND PRODUCT WEIGHT
   ========================================================================== */

function findProductWeight(item) {

    if (!item) {

        return 0;

    }


    /*
       Direct weight properties.
    */

    const directWeight =
        Number(
            item.weightKg ??
            item.weight ??
            item.kg ??
            item.productWeight ??
            item.unitWeight ??
            0
        );


    if (
        directWeight > 0
    ) {

        return directWeight;

    }


    /*
       Collect possible product identifiers.
    */

    const identifiers = [

        item.id,

        item.productId,

        item.product_id,

        item.sku,

        item.productSku,

        item.name,

        item.productName,

        item.title

    ];


    for (
        let i = 0;
        i < identifiers.length;
        i++
    ) {

        if (!identifiers[i]) {

            continue;

        }


        const normalized =
            String(
                identifiers[i]
            )
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');


        /*
           Exact match.
        */

        if (
            Object.prototype.hasOwnProperty.call(
                NEXPAK_PRODUCT_WEIGHTS,
                normalized
            )
        ) {

            return NEXPAK_PRODUCT_WEIGHTS[
                normalized
            ];

        }


        /*
           Partial match.

           Example:

           "12mm-200m-politape"
           can match
           "polytape-200m"
        */

        const weightKeys =
            Object.keys(
                NEXPAK_PRODUCT_WEIGHTS
            );


        for (
            let j = 0;
            j < weightKeys.length;
            j++
        ) {

            const key =
                weightKeys[j];


            if (
                normalized.includes(key) ||
                key.includes(normalized)
            ) {

                return NEXPAK_PRODUCT_WEIGHTS[
                    key
                ];

            }

        }

    }


    return 0;

}


/* ==========================================================================
   19. CALCULATE DELIVERY BY REGION
   ========================================================================== */

function calculateDeliveryRegion() {

    const regionSelect =
        document.getElementById(
            'delivery-region'
        );


    if (!regionSelect) {

        return;

    }


    const region =
        regionSelect.value;


    if (!region) {

        return;

    }


    const regionData =
        NEXPAK_DELIVERY_CONFIG.regionalRates[
            region
        ];


    if (!regionData) {

        console.warn(
            'Unknown delivery region:',
            region
        );

        return;

    }


    const weight =
        updateDeliveryWeight();


    /*
       Regional delivery starts at the regional base rate.

       Weight surcharge is added separately.
    */

    const weightFee =
        weight *
        NEXPAK_DELIVERY_CONFIG.pricing.perKg;


    const total =
        regionData.baseFee +
        weightFee;


    NEXPAK_DELIVERY_STATE.calculated = true;

    NEXPAK_DELIVERY_STATE.method = 'region';

    NEXPAK_DELIVERY_STATE.region = region;

    NEXPAK_DELIVERY_STATE.address = '';

    NEXPAK_DELIVERY_STATE.distanceKm = 0;

    NEXPAK_DELIVERY_STATE.baseFee =
        regionData.baseFee;

    NEXPAK_DELIVERY_STATE.distanceFee =
        0;

    NEXPAK_DELIVERY_STATE.weightFee =
        weightFee;

    NEXPAK_DELIVERY_STATE.total =
        total;

    NEXPAK_DELIVERY_STATE.timestamp =
        Date.now();


    displayDeliveryResult(
        regionData.baseFee,
        0,
        weightFee,
        total
    );


    saveDeliveryQuote();


    setDeliveryStatus(
        `Delivery calculated for ${regionData.name}.`,
        'success'
    );


    dispatchDeliveryUpdatedEvent();


    return total;

}


/* ==========================================================================
   20. CALCULATE DELIVERY MANUALLY
   ========================================================================== */

function calculateDeliveryManual() {

    const distanceInput =
        document.getElementById(
            'distance-km'
        );


    if (!distanceInput) {

        return;

    }


    const distance =
        Number(
            distanceInput.value
        ) || 0;


    if (distance < 0) {

        alert(
            'Distance cannot be negative.'
        );

        return;

    }


    const weight =
        updateDeliveryWeight();


    const baseFee =
        NEXPAK_DELIVERY_CONFIG.pricing.baseFee;


    const distanceFee =
        distance *
        NEXPAK_DELIVERY_CONFIG.pricing.perKm;


    const weightFee =
        weight *
        NEXPAK_DELIVERY_CONFIG.pricing.perKg;


    const total =
        baseFee +
        distanceFee +
        weightFee;


    NEXPAK_DELIVERY_STATE.calculated = true;

    NEXPAK_DELIVERY_STATE.method = 'distance';

    NEXPAK_DELIVERY_STATE.region = null;

    NEXPAK_DELIVERY_STATE.address = '';

    NEXPAK_DELIVERY_STATE.distanceKm =
        distance;

    NEXPAK_DELIVERY_STATE.baseFee =
        baseFee;

    NEXPAK_DELIVERY_STATE.distanceFee =
        distanceFee;

    NEXPAK_DELIVERY_STATE.weightFee =
        weightFee;

    NEXPAK_DELIVERY_STATE.total =
        total;

    NEXPAK_DELIVERY_STATE.timestamp =
        Date.now();


    displayDeliveryResult(
        baseFee,
        distanceFee,
        weightFee,
        total
    );


    saveDeliveryQuote();


    setDeliveryStatus(
        'Delivery calculated successfully.',
        'success'
    );


    dispatchDeliveryUpdatedEvent();


    return total;

}


/* ==========================================================================
   21. DISPLAY DELIVERY RESULT
   ========================================================================== */

function displayDeliveryResult(
    base,
    distance,
    weight,
    total
) {

    const baseEl =
        document.getElementById(
            'base-fee-display'
        );


    const distanceEl =
        document.getElementById(
            'distance-fee-display'
        );


    const weightEl =
        document.getElementById(
            'weight-fee-display'
        );


    const totalEl =
        document.getElementById(
            'total-delivery-display'
        );


    const resultEl =
        document.getElementById(
            'delivery-result'
        );


    if (baseEl) {

        baseEl.textContent =
            formatRand(base);

    }


    if (distanceEl) {

        distanceEl.textContent =
            formatRand(distance);

    }


    if (weightEl) {

        weightEl.textContent =
            formatRand(weight);

    }


    if (totalEl) {

        totalEl.textContent =
            formatRand(total);

    }


    if (resultEl) {

        resultEl.style.display =
            'block';

    }

}


/* ==========================================================================
