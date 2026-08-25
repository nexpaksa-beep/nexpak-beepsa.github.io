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
   ============================================
