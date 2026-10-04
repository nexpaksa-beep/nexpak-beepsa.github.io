/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   DELIVERY CALCULATOR
   =========================================================

   DELIVERY PROVIDER:
   KT COURIERS

   =========================================================
   GAUTENG / JOHANNESBURG METRO
   =========================================================

   ECONOMY:
   Small  = R120
   Medium = R179
   Large  = R210
   ETA    = 3–4 business days

   STANDARD:
   Small  = R179
   Medium = R220
   Large  = R299
   ETA    = 1–2 business days

   SAME DAY:
   R6.00 per KM
   Gauteng / Johannesburg Metro only

   =========================================================
   DURBAN / KZN
   =========================================================

   ECONOMY:
   Small  = R199
   Medium = R249
   Large  = R299
   ETA    = 3–5 business days

   STANDARD:
   Small  = R249
   Medium = R299
   Large  = R379
   ETA    = 2–3 business days

   =========================================================
   CAPE TOWN / WESTERN CAPE
   =========================================================

   ECONOMY:
   Small  = R229
   Medium = R279
   Large  = R339
   ETA    = 3–5 business days

   STANDARD:
   Small  = R279
   Medium = R339
   Large  = R429
   ETA    = 2–3 business days

   =========================================================

   IMPORTANT:
   This file handles DELIVERY ONLY.

   It does NOT handle:
   - Checkout submission
   - Payments
   - WhatsApp orders
   - Cart clearing

   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       NEXPAK DELIVERY CONFIGURATION
    ===================================================== */

    const DELIVERY_RATES = {

        gauteng: {

            name: "Gauteng / Johannesburg Metro",

            economy: {
                name: "Economy",
                description: "3–4 business days",
                small: 120,
                medium: 179,
                large: 210
            },

            standard: {
                name: "Standard",
                description: "1–2 business days",
                small: 179,
                medium: 220,
                large: 299
            },

            express: {
                name: "Same Day",
                description: "Same-day delivery",
                perKm: 6.00
            }

        },


        durban: {

            name: "Durban / KwaZulu-Natal",

            economy: {
                name: "Economy",
                description: "3–5 business days",
                small: 199,
                medium: 249,
                large: 299
            },

            standard: {
                name: "Standard",
                description: "2–3 business days",
                small: 249,
                medium: 299,
                large: 379
            }

        },


        capetown: {

            name: "Cape Town / Western Cape",

            economy: {
                name: "Economy",
                description: "3–5 business days",
                small: 229,
                medium: 279,
                large: 339
            },

            standard: {
                name: "Standard",
                description: "2–3 business days",
                small: 279,
                medium: 339,
                large: 429
            }

        }

    };


    /* =====================================================
       BACKWARD COMPATIBILITY
       Existing KT_RATES name retained
    ===================================================== */

    const KT_RATES = {

        economy: DELIVERY_RATES.gauteng.economy,

        standard: DELIVERY_RATES.gauteng.standard,

        express: DELIVERY_RATES.gauteng.express

    };


    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    const STORAGE = {

        destination: "nexpak_delivery_destination",

        method: "nexpak_delivery_method",

        size: "nexpak_delivery_size",

        km: "nexpak_delivery_km",

        fee: "nexpak_delivery_fee",

        eta: "nexpak_delivery_eta"

    };


    /* =====================================================
       CART HELPERS
    ===================================================== */

    function getCart() {

        const possibleKeys = [

            "nexpak_cart_items",

            "cart_items",

            "cartItems",

            "cart"

        ];


        for (const key of possibleKeys) {

            try {

                const stored =
                    localStorage.getItem(key);


                if (!stored) continue;


                const parsed =
                    JSON.parse(stored);


                if (Array.isArray(parsed)) {

                    return parsed;

                }


                if (
                    parsed &&
                    Array.isArray(parsed.items)
                ) {

                    return parsed.items;

                }

            }

            catch (error) {

                console.warn(
                    "[Nexpak Delivery] Could not read cart:",
                    key,
                    error
                );

            }

        }


        return [];

    }


    /* =====================================================
       ELEMENT HELPERS
    ===================================================== */

    function getElement(id) {

        return document.getElementById(id);

    }


    /* =====================================================
       MONEY FORMAT
    ===================================================== */

    function money(value) {

        return "R" +
            Number(value || 0).toLocaleString(
                "en-ZA",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    /* =====================================================
       DESTINATION
    ===================================================== */

    function getSelectedDestination() {

        const select =
            getElement("deliveryDestination");


        if (select) {

            return String(
                select.value || "gauteng"
            ).toLowerCase();

        }


        return (
            localStorage.getItem(
                STORAGE.destination
            ) || "gauteng"
        ).toLowerCase();

    }


    /* =====================================================
       DELIVERY METHOD
    ===================================================== */

    function getSelectedMethod() {

        const select =
            getElement("deliveryMethod");


        if (select) {

            return String(
                select.value || "standard"
            ).toLowerCase();

        }


        const checked =
            document.querySelector(
                'input[name="deliveryMethod"]:checked'
            );


        if (checked) {

            return String(
                checked.value || "standard"
            ).toLowerCase();

        }


        return (
            localStorage.getItem(
                STORAGE.method
            ) || "standard"
        ).toLowerCase();

    }


    /* =====================================================
       PARCEL SIZE
    ===================================================== */

    function getSelectedSize() {

        const select =
            getElement("parcelSize");


        if (select) {

            return String(
                select.value || "medium"
            ).toLowerCase();

        }


        const checked =
            document.querySelector(
                'input[name="parcelSize"]:checked'
            );


        if (checked) {

            return String(
                checked.value || "medium"
            ).toLowerCase();

        }


        return (
            localStorage.getItem(
                STORAGE.size
            ) || "medium"
        ).toLowerCase();

    }


    /* =====================================================
       DISTANCE
    ===================================================== */

    function getDistance() {

        const distanceField =
            getElement("distance-km");


        if (!distanceField) {

            return 0;

        }


        const distance =
            parseFloat(
                String(
                    distanceField.value || ""
                )
                .replace(",", ".")
                .replace(/[^\d.]/g, "")
            );


        return (
            Number.isFinite(distance) &&
            distance > 0
        )
            ? distance
            : 0;

    }


    /* =====================================================
       GET DESTINATION CONFIG
    ===================================================== */

    function getDestinationConfig() {

        const destination =
            getSelectedDestination();


        return (
            DELIVERY_RATES[destination] ||
            DELIVERY_RATES.gauteng
        );

    }


    /* =====================================================
       DELIVERY CALCULATION
    ===================================================== */

    function calculateDelivery() {

        const destination =
            getSelectedDestination();


        const destinationConfig =
            getDestinationConfig();


        const method =
            getSelectedMethod();


        const size =
            getSelectedSize();


        const km =
            getDistance();


        /* -------------------------------------------------
           EXPRESS / SAME DAY
           Gauteng ONLY
        ------------------------------------------------- */

        if (method === "express") {

            if (destination !== "gauteng") {

                return {

                    success: false,

                    message:
                        "Same-day delivery is currently available only within Gauteng / Johannesburg Metro. Please select Economy or Standard for this destination."

                };

            }


            if (!km || km <= 0) {

                return {

                    success: false,

                    message:
                        "Please enter the delivery distance in kilometres for Same Day delivery."

                };

            }


            const fee =
                km *
                DELIVERY_RATES.gauteng.express.perKm;


            return {

                success: true,

                destination: destination,

                destinationName:
                    destinationConfig.name,

                method: "express",

                methodName: "Same Day",

                size: "any",

                km: km,

                fee:
                    Number(
                        fee.toFixed(2)
                    ),

                eta: "Same day"

            };

        }


        /* -------------------------------------------------
           ECONOMY
        ------------------------------------------------- */

        if (method === "economy") {

            const rate =
                destinationConfig.economy[size];


            if (!rate) {

                return {

                    success: false,

                    message:
                        "Please select a valid parcel size."

                };

            }


            return {

                success: true,

                destination: destination,

                destinationName:
                    destinationConfig.name,

                method: "economy",

                methodName: "Economy",

                size: size,

                km: 0,

                fee: rate,

                eta:
                    destinationConfig
                        .economy
                        .description

            };

        }


        /* -------------------------------------------------
           STANDARD
        ------------------------------------------------- */

        if (method === "standard") {

            const rate =
                destinationConfig.standard[size];


            if (!rate) {

                return {

                    success: false,

                    message:
                        "Please select a valid parcel size."

                };

            }


            return {

                success: true,

                destination: destination,

                destinationName:
                    destinationConfig.name,

                method: "standard",

                methodName: "Standard",

                size: size,

                km: 0,

                fee: rate,

                eta:
                    destinationConfig
                        .standard
                        .description

            };

        }


        return {

            success: false,

            message:
                "Please select a delivery method."

        };

    }


    /* =====================================================
       SAVE DELIVERY
    ===================================================== */

    function saveDelivery(result) {

        localStorage.setItem(
            STORAGE.destination,
            result.destination || "gauteng"
        );


        localStorage.setItem(
            STORAGE.method,
            result.method
        );


        localStorage.setItem(
            STORAGE.size,
            result.size
        );


        localStorage.setItem(
            STORAGE.km,
            String(result.km || 0)
        );


        localStorage.setItem(
            STORAGE.fee,
            String(result.fee)
        );


        localStorage.setItem(
            STORAGE.eta,
            result.eta
        );

    }


    /* =====================================================
       UPDATE CHECKOUT DISPLAY
    ===================================================== */

    function updateCheckoutDisplay(result) {

        const deliveryAmount =
            getElement("chkDelivery");


        if (deliveryAmount) {

            deliveryAmount.textContent =
                money(result.fee);

        }


        const deliverySummary =
            getElement("chkDeliverySummary");


        if (deliverySummary) {

            deliverySummary.textContent =
                `${result.methodName} • ${money(result.fee)}`;

        }


        const deliveryInfo =
            getElement("deliveryInfo");


        if (deliveryInfo) {

            let text =
                `${result.destinationName} • ${result.methodName} delivery`;


            if (
                result.method === "economy" ||
                result.method === "standard"
            ) {

                text +=
                    ` • ${capitalize(result.size)} parcel • ${result.eta}`;

            }


            if (
                result.method === "express"
            ) {

                text +=
                    ` • ${result.km.toFixed(1)} km × R6.00/km • Same day`;

            }


            deliveryInfo.textContent =
                text;

        }


        const status =
            getElement("deliveryStatus");


        if (status) {

            status.textContent =
                `✓ ${result.destinationName} — ${result.methodName} delivery calculated: ${money(result.fee)}`;

            status.classList.add(
                "success"
            );

        }


        /* -------------------------------------------------
           Tell checkout.js to refresh totals
        ------------------------------------------------- */

        if (
            window.NexpakCheckout &&
            typeof
            window.NexpakCheckout.updateSummary ===
            "function"
        ) {

            window.NexpakCheckout.updateSummary();

        }

    }


    /* =====================================================
       CAPITALIZE
    ===================================================== */

    function capitalize(value) {

        if (!value) {

            return "";

        }


        return (
            value.charAt(0).toUpperCase() +
            value.slice(1)
        );

    }


    /* =====================================================
       CREATE DELIVERY CONTROLS
    ===================================================== */

    function createDeliveryControls() {

        let container =
            getElement("deliveryOptions");


        /*
         * If the HTML already has delivery controls,
         * don't create duplicates.
         */

        if (
            getElement("deliveryMethod") ||
            document.querySelector(
                'input[name="deliveryMethod"]'
            )
        ) {

            return;

        }


        const calculateButton =
            getElement(
                "btnCalculateDelivery"
            );


        if (!calculateButton) {

            console.warn(
                "[Nexpak Delivery] btnCalculateDelivery not found."
            );

            return;

        }


        container =
            container ||
            document.createElement("div");


        if (!container.id) {

            container.id =
                "deliveryOptions";

        }


        container.innerHTML = `

            <div class="nexpak-delivery-selector">

                <h3>
                    Delivery Destination
                </h3>


                <div class="nexpak-delivery-destination">

                    <label
                        for="deliveryDestination"
                    >
                        Where should we deliver?
                    </label>


                    <select
                        id="deliveryDestination"
                        class="form-control"
                    >

                        <option
                            value="gauteng"
                        >
                            Gauteng / Johannesburg Metro
                        </option>


                        <option
                            value="durban"
                        >
                            Durban / KwaZulu-Natal
                        </option>


                        <option
                            value="capetown"
                        >
                            Cape Town / Western Cape
                        </option>

                    </select>

                </div>


                <h3
                    style="margin-top:20px;"
                >
                    Delivery Method
                </h3>


                <div class="nexpak-delivery-methods">

                    <label
                        class="nexpak-delivery-option"
                    >

                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="economy"
                        >

                        <span>

                            <strong>
                                Economy
                            </strong>

                            <small
                                id="economyDescription"
                            >
                                3–4 business days
                            </small>

                            <em
                                id="economyStartingPrice"
                            >
                                From R120
                            </em>

                        </span>

                    </label>


                    <label
                        class="nexpak-delivery-option"
                    >

                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="standard"
                            checked
                        >

                                                <span>

                            <strong>
                                Standard
                            </strong>

                            <small
                                id="standardDescription"
                            >
                                1–2 business days
                            </small>

                            <em
                                id="standardStartingPrice"
                            >
                                From R179
                            </em>

                        </span>

                    </label>


                    <label
                        class="nexpak-delivery-option"
                        id="expressDeliveryOption"
                    >

                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="express"
                        >

                        <span>

                            <strong>
                                Same Day
                            </strong>

                            <small>
                                Gauteng / Johannesburg Metro
                            </small>

                            <em>
                                R6.00/km
                            </em>

                        </span>

                    </label>

                </div>


                <div
                    id="parcelSizeContainer"
                    class="nexpak-parcel-size"
                >

                    <label
                        for="parcelSize"
                    >
                        Parcel Size
                    </label>


                    <select
                        id="parcelSize"
                        class="form-control"
                    >

                        <option
                            value="small"
                        >
                            Small
                        </option>


                        <option
                            value="medium"
                            selected
                        >
                            Medium
                        </option>


                        <option
                            value="large"
                        >
                            Large
                        </option>

                    </select>


                    <div
                        id="parcelRateDisplay"
                        style="
                            margin-top:8px;
                            font-size:12px;
                            color:#64748b;
                        "
                    >
                        Economy / Standard rates shown after destination selection.
                    </div>

                </div>

            </div>

        `;


        /*
         * Insert before calculate button.
         */

        calculateButton.parentNode.insertBefore(
            container,
            calculateButton
        );


        /* -------------------------------------------------
           Destination change
        ------------------------------------------------- */

        const destinationSelect =
            getElement(
                "deliveryDestination"
            );


        if (destinationSelect) {

            destinationSelect.addEventListener(
                "change",
                function () {

                    const destination =
                        this.value;


                    localStorage.setItem(
                        STORAGE.destination,
                        destination
                    );


                    /*
                     * Durban and Cape Town do not
                     * offer Same Day.
                     */

                    updateMethodAvailability();

                    updateRateDisplay();

                    clearDeliveryResult();

                }
            );

        }


        /* -------------------------------------------------
           Method change
        ------------------------------------------------- */

        document
            .querySelectorAll(
                'input[name="deliveryMethod"]'
            )
            .forEach(
                function (radio) {

                    radio.addEventListener(
                        "change",
                        function () {

                            updateSizeVisibility();

                            updateRateDisplay();

                            clearDeliveryResult();

                        }
                    );

                }
            );


        /* -------------------------------------------------
           Parcel size change
        ------------------------------------------------- */

        const parcelSize =
            getElement(
                "parcelSize"
            );


        if (parcelSize) {

            parcelSize.addEventListener(
                "change",
                function () {

                    updateRateDisplay();

                    clearDeliveryResult();

                }
            );

        }


        /*
         * Restore previous destination.
         */

        restoreDestination();

        updateMethodAvailability();

        updateRateDisplay();

        updateSizeVisibility();

    }


    /* =====================================================
       RESTORE DESTINATION
    ===================================================== */

    function restoreDestination() {

        const select =
            getElement(
                "deliveryDestination"
            );


        if (!select) return;


        const saved =
            localStorage.getItem(
                STORAGE.destination
            );


        if (
            saved &&
            select.querySelector(
                `option[value="${saved}"]`
            )
        ) {

            select.value =
                saved;

        } else {

            select.value =
                "gauteng";

        }

    }


    /* =====================================================
       UPDATE METHOD AVAILABILITY
    ===================================================== */

    function updateMethodAvailability() {

        const destination =
            getSelectedDestination();


        const expressOption =
            getElement(
                "expressDeliveryOption"
            );


        const expressRadio =
            document.querySelector(
                'input[name="deliveryMethod"][value="express"]'
            );


        if (!expressOption || !expressRadio) {

            return;

        }


        if (destination === "gauteng") {

            expressOption.style.display =
                "block";

            expressRadio.disabled =
                false;

        } else {

            expressOption.style.display =
                "none";

            expressRadio.disabled =
                true;


            /*
             * If Express was previously selected,
             * automatically switch to Standard.
             */

            if (
                expressRadio.checked
            ) {

                const standardRadio =
                    document.querySelector(
                        'input[name="deliveryMethod"][value="standard"]'
                    );


                if (standardRadio) {

                    standardRadio.checked =
                        true;

                }

            }

        }

    }


    /* =====================================================
       UPDATE RATE DISPLAY
    ===================================================== */

    function updateRateDisplay() {

        const destination =
            getSelectedDestination();


        const config =
            getDestinationConfig();


        const economyDescription =
            getElement(
                "economyDescription"
            );


        const standardDescription =
            getElement(
                "standardDescription"
            );


        const economyStartingPrice =
            getElement(
                "economyStartingPrice"
            );


        const standardStartingPrice =
            getElement(
                "standardStartingPrice"
            );


        const parcelRateDisplay =
            getElement(
                "parcelRateDisplay"
            );


        if (economyDescription) {

            economyDescription.textContent =
                config.economy.description;

        }


        if (standardDescription) {

            standardDescription.textContent =
                config.standard.description;

        }


        if (economyStartingPrice) {

            economyStartingPrice.textContent =
                "From " +
                money(config.economy.small);

        }


        if (standardStartingPrice) {

            standardStartingPrice.textContent =
                "From " +
                money(config.standard.small);

        }


        const size =
            getSelectedSize();


        const economyRate =
            config.economy[size];


        const standardRate =
            config.standard[size];


        if (parcelRateDisplay) {

            parcelRateDisplay.innerHTML =
                `
                <strong>
                    ${capitalize(size)} parcel:
                </strong>
                Economy ${money(economyRate)}
                &nbsp;•&nbsp;
                Standard ${money(standardRate)}
                `;

        }

    }


    /* =====================================================
       SHOW / HIDE PARCEL SIZE
    ===================================================== */

    function updateSizeVisibility() {

        const method =
            getSelectedMethod();


        const container =
            getElement(
                "parcelSizeContainer"
            );


        if (!container) return;


        if (
            method === "express"
        ) {

            container.style.display =
                "none";

        } else {

            container.style.display =
                "block";

        }


        /*
         * Same-day distance is required
         * only for Gauteng.
         */

        const distanceField =
            getElement(
                "distance-km"
            );


        if (distanceField) {

            if (
                method === "express"
            ) {

                distanceField.disabled =
                    false;

                distanceField.placeholder =
                    "Enter same-day delivery distance in KM";

            } else {

                distanceField.disabled =
                    true;

                distanceField.placeholder =
                    "Distance not required for this service";

                distanceField.value =
                    "";

            }

        }

    }


    /* =====================================================
       CLEAR DELIVERY RESULT
    ===================================================== */

    function clearDeliveryResult() {

        localStorage.removeItem(
            STORAGE.fee
        );


        localStorage.removeItem(
            STORAGE.eta
        );


        localStorage.removeItem(
            STORAGE.km
        );


        const amount =
            getElement(
                "chkDelivery"
            );


        if (amount) {

            amount.textContent =
                "R0.00";

        }


        const summary =
            getElement(
                "chkDeliverySummary"
            );


        if (summary) {

            summary.textContent =
                "Select delivery method";

        }


        const status =
            getElement(
                "deliveryStatus"
            );


        if (status) {

            status.textContent =
                "Select your destination, delivery method and parcel size.";

            status.classList.remove(
                "success"
            );

        }


        if (
            window.NexpakCheckout &&
            typeof
            window.NexpakCheckout.updateSummary ===
            "function"
        ) {

            window.NexpakCheckout.updateSummary();

        }

    }


    /* =====================================================
       CALCULATE BUTTON
    ===================================================== */

    function attachCalculateHandler() {

        const button =
            getElement(
                "btnCalculateDelivery"
            );


        if (!button) {

            console.warn(
                "[Nexpak Delivery] Calculate button not found."
            );

            return;

        }


        /*
         * Prevent duplicate listeners.
         */

        if (
            button.dataset
                .nexpakDeliveryBound ===
            "true"
        ) {

            return;

        }


        button.dataset
            .nexpakDeliveryBound =
            "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*
                 * Make sure the current method
                 * is still valid for destination.
                 */

                updateMethodAvailability();


                const result =
                    calculateDelivery();


                if (!result.success) {

                    const status =
                        getElement(
                            "deliveryStatus"
                        );


                    if (status) {

                        status.textContent =
                            result.message;

                        status.classList.remove(
                            "success"
                        );

                    }


                    alert(
                        result.message
                    );


                    return;

                }


                saveDelivery(
                    result
                );


                updateCheckoutDisplay(
                    result
                );


                console.log(
                    "[Nexpak Delivery] Calculated:",
                    result
                );

            }
        );

    }


    /* =====================================================
       RESTORE PREVIOUS DELIVERY
    ===================================================== */

    function restoreDelivery() {

        const savedFee =
            parseFloat(
                localStorage.getItem(
                    STORAGE.fee
                )
            ) || 0;


        const savedMethod =
            localStorage.getItem(
                STORAGE.method
            );


        const savedDestination =
            localStorage.getItem(
                STORAGE.destination
            );


        const savedSize =
            localStorage.getItem(
                STORAGE.size
            );


        /*
         * Restore destination.
         */

        const destinationSelect =
            getElement(
                "deliveryDestination"
            );


        if (
            destinationSelect &&
            savedDestination &&
            destinationSelect.querySelector(
                `option[value="${savedDestination}"]`
            )
        ) {

            destinationSelect.value =
                savedDestination;

        }


        /*
         * Restore method.
         */

        if (savedMethod) {

            const radio =
                document.querySelector(
                    `input[name="deliveryMethod"][value="${savedMethod}"]`
                );


            if (
                radio &&
                !radio.disabled
            ) {

                radio.checked =
                    true;

            }

        }


        /*
         * Restore parcel size.
         */

        const parcelSize =
            getElement(
                "parcelSize"
            );


        if (
            parcelSize &&
            savedSize &&
            parcelSize.querySelector(
                `option[value="${savedSize}"]`
            )
        ) {

            parcelSize.value =
                savedSize;

        }


        updateMethodAvailability();

        updateSizeVisibility();

        updateRateDisplay();


        /*
         * Restore calculated display.
         */

        if (savedFee > 0) {

            const method =
                getSelectedMethod();


            const destination =
                getSelectedDestination();


            const config =
                getDestinationConfig();


            const size =
                getSelectedSize();


            const savedKm =
                parseFloat(
                    localStorage.getItem(
                        STORAGE.km
                    )
                ) || 0;


            const eta =
                localStorage.getItem(
                    STORAGE.eta
                ) || "";


            const result = {

                success: true,

                destination:
                    destination,

                destinationName:
                    config.name,

                method:
                    method,

                methodName:
                    method === "express"
                        ? "Same Day"
                        : capitalize(method),

                size:
                    method === "express"
                        ? "any"
                        : size,

                km:
                    savedKm,

                fee:
                    savedFee,

                eta:
                    eta

            };


            updateCheckoutDisplay(
                result
            );

        }

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.NexpakDelivery = {

        calculate:
            calculateDelivery,


        getDestination:
            function () {

                return (
                    localStorage.getItem(
                        STORAGE.destination
                    ) || "gauteng"
                );

            },


        getMethod:
            function () {

                return (
                    localStorage.getItem(
                        STORAGE.method
                    ) || ""
                );

            },


        getSize:
            function () {

                return (
                    localStorage.getItem(
                        STORAGE.size
                    ) || ""
                );

            },


        getKm:
            function () {

                return (
                    parseFloat(
                        localStorage.getItem(
                            STORAGE.km
                        )
                    ) || 0
                );

            },


        getFee:
            function () {

                return (
                    parseFloat(
                        localStorage.getItem(
                            STORAGE.fee
                        )
                    ) || 0
                );

            },


        getEta:
            function () {

                return (
                    localStorage.getItem(
                        STORAGE.eta
                    ) || ""
                );

            },


        clear:
            clearDeliveryResult

    };


    /* =====================================================
       BACKWARD COMPATIBILITY
       Keeps older checkout code working
    ===================================================== */

    window.NexpakDeliveryCalculator = {

        calculate:
            calculateDelivery,


        getCart:
            getCart,


        rates:
            KT_RATES

           ,


        getFee:
            function () {

                return (
                    parseFloat(
                        localStorage.getItem(
                            STORAGE.fee
                        )
                    ) || 0
                );

            }

    };


    /* =====================================================
       INITIALISE DELIVERY CALCULATOR
    ===================================================== */

    function init() {

        console.log(
            "[Nexpak Delivery] Delivery calculator loading..."
        );


        /*
         * Create delivery controls.
         */

        createDeliveryControls();


        /*
         * Attach Calculate button.
         */

        attachCalculateHandler();


        /*
         * Initial UI state.
         */

        updateMethodAvailability();

        updateSizeVisibility();

        updateRateDisplay();


        /*
         * Restore previous calculation.
         */

        restoreDelivery();


        console.log(
            "[Nexpak Delivery] ✓ Delivery calculator ready."
        );

    }


    /* =====================================================
       DOM READY
    ===================================================== */

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
    
