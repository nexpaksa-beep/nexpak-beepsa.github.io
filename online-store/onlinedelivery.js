/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   FILE: onlinedelivery.js
   PART 1
   PURPOSE:
   - Delivery configuration
   - Delivery state
   - Safe configuration access
   - Distance / weight constants
   ========================================================= */

(function () {

    "use strict";


    /* =========================================================
       1. DELIVERY CONFIGURATION
       ========================================================= */

    const NEXPAK_ONLINE_DELIVERY_CONFIG = {

        baseFee: 80,

        distanceRate: 4.50,

        weightRate: 1.50,

        minimumFee: 80,

        maximumFee: 5000,

        maximumDistance: 500,

        currency: "ZAR"

    };


    /* =========================================================
       2. DELIVERY STATE
       ========================================================= */

    const NEXPAK_ONLINE_DELIVERY_STATE = {

        distance: 0,

        cartWeight: 0,

        distanceCharge: 0,

        weightCharge: 0,

        calculatedFee: 0,

        finalFee: 0,

        isValid: true,

        error: "",

        lastUpdated: null

    };


    /* =========================================================
       3. GET DELIVERY CONFIGURATION
       ========================================================= */

    function getNexpakOnlineDeliveryConfig() {

        return {
            ...NEXPAK_ONLINE_DELIVERY_CONFIG
        };

    }


    /* =========================================================
       4. RESET DELIVERY STATE
       ========================================================= */

    function resetNexpakOnlineDeliveryState() {

        NEXPAK_ONLINE_DELIVERY_STATE.distance = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.cartWeight = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.distanceCharge = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.weightCharge = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.calculatedFee = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.finalFee = 0;

        NEXPAK_ONLINE_DELIVERY_STATE.isValid = true;

        NEXPAK_ONLINE_DELIVERY_STATE.error = "";

        NEXPAK_ONLINE_DELIVERY_STATE.lastUpdated = new Date();

    }


    /* =========================================================
       5. NORMALISE NUMBER
       ========================================================= */

    function normaliseNexpakOnlineDeliveryNumber(value) {

        const number = Number(value);

        if (!Number.isFinite(number)) {

            return 0;

        }

        return number;

    }


    /* =========================================================
       6. ROUND CURRENCY
       ========================================================= */

    function roundNexpakOnlineDeliveryCurrency(value) {

        return Math.round(
            normaliseNexpakOnlineDeliveryNumber(value) * 100
        ) / 100;

    }


    /* =========================================================
       7. SET DISTANCE
       ========================================================= */

    function setNexpakOnlineDeliveryDistance(distance) {

        distance =
            normaliseNexpakOnlineDeliveryNumber(distance);

        if (distance < 0) {

            distance = 0;

        }

        if (
            distance >
            NEXPAK_ONLINE_DELIVERY_CONFIG.maximumDistance
        ) {

            distance =
                NEXPAK_ONLINE_DELIVERY_CONFIG.maximumDistance;

        }

        NEXPAK_ONLINE_DELIVERY_STATE.distance = distance;

        NEXPAK_ONLINE_DELIVERY_STATE.lastUpdated =
            new Date();

        return distance;

    }


    /* =========================================================
       8. SET CART WEIGHT
       ========================================================= */

    function setNexpakOnlineDeliveryCartWeight(weight) {

        weight =
            normaliseNexpakOnlineDeliveryNumber(weight);

        if (weight < 0) {

            weight = 0;

        }

        NEXPAK_ONLINE_DELIVERY_STATE.cartWeight = weight;

        NEXPAK_ONLINE_DELIVERY_STATE.lastUpdated =
            new Date();

        return weight;

    }


    /* =========================================================
       9. GET CURRENT DELIVERY STATE
       ========================================================= */

    function getNexpakOnlineDeliveryState() {

        return {
            ...NEXPAK_ONLINE_DELIVERY_STATE
        };

    }


    /* =========================================================
       10. EXPOSE DELIVERY ENGINE
       ========================================================= */

    window.NEXPAK_ONLINE_DELIVERY = {

        config:
            NEXPAK_ONLINE_DELIVERY_CONFIG,

        state:
            NEXPAK_ONLINE_DELIVERY_STATE,

        getConfig:
            getNexpakOnlineDeliveryConfig,

        getState:
            getNexpakOnlineDeliveryState,

        reset:
            resetNexpakOnlineDeliveryState,

        normaliseNumber:
            normaliseNexpakOnlineDeliveryNumber,

        roundCurrency:
            roundNexpakOnlineDeliveryCurrency,

        setDistance:
            setNexpakOnlineDeliveryDistance,

        setCartWeight:
            setNexpakOnlineDeliveryCartWeight

    };


})();

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 2
   CART WEIGHT + DISTANCE INPUT HANDLING
   ========================================================= */


/* =========================================================
   11. GET ONLINE CART
   ========================================================= */

function getNexpakOnlineDeliveryCart() {

    /*
     * The Online Store cart is handled by onlinecart.js.
     *
     * We deliberately do not create another cart system here.
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
   12. FIND CART ITEMS
   ========================================================= */

function getNexpakOnlineDeliveryCartItems() {

    const cart =
        getNexpakOnlineDeliveryCart();


    if (!cart) {

        return [];

    }


    /*
     * Support the most common cart property names
     * without modifying onlinecart.js.
     */

    if (Array.isArray(cart.items)) {

        return cart.items;

    }


    if (Array.isArray(cart.cart)) {

        return cart.cart;

    }


    if (Array.isArray(cart.products)) {

        return cart.products;

    }


    return [];

}


/* =========================================================
   13. GET KIT QUANTITY
   ========================================================= */

function getNexpakOnlineDeliveryKitQuantity(item) {

    if (!item || typeof item !== "object") {

        return 0;

    }


    const quantity =
        Number(
            item.quantity ??
            item.qty ??
            item.count ??
            0
        );


    if (!Number.isFinite(quantity)) {

        return 0;

    }


    return Math.max(0, quantity);

}


/* =========================================================
   14. GET KIT WEIGHT
   ========================================================= */

function getNexpakOnlineDeliveryKitWeight(item) {

    if (!item || typeof item !== "object") {

        return 0;

    }


    const possibleWeight =
        item.weight ??
        item.kitWeight ??
        item.shippingWeight ??
        item.deliveryWeight ??
        0;


    const weight =
        Number(possibleWeight);


    if (!Number.isFinite(weight)) {

        return 0;

    }


    return Math.max(0, weight);

}


/* =========================================================
   15. CALCULATE CART WEIGHT
   ========================================================= */

function calculateNexpakOnlineDeliveryCartWeight() {

    const items =
        getNexpakOnlineDeliveryCartItems();


    let totalWeight = 0;


    items.forEach(function (item) {

        const quantity =
            getNexpakOnlineDeliveryKitQuantity(item);


        const kitWeight =
            getNexpakOnlineDeliveryKitWeight(item);


        /*
         * Weight is calculated per KIT.
         *
         * Example:
         *
         * Kit weight = 25 kg
         * Quantity   = 2
         *
         * Total      = 50 kg
         */

        totalWeight +=
            kitWeight * quantity;

    });


    totalWeight =
        roundNexpakOnlineDeliveryCurrency(
            totalWeight
        );


    setNexpakOnlineDeliveryCartWeight(
        totalWeight
    );


    return totalWeight;

}


/* =========================================================
   16. GET DELIVERY DISTANCE
   ========================================================= */

function getNexpakOnlineDeliveryDistance() {

    return normaliseNexpakOnlineDeliveryNumber(
        NEXPAK_ONLINE_DELIVERY_STATE.distance
    );

}


/* =========================================================
   17. UPDATE DELIVERY DISTANCE
   ========================================================= */

function updateNexpakOnlineDeliveryDistance(distance) {

    const updatedDistance =
        setNexpakOnlineDeliveryDistance(
            distance
        );


    /*
     * Recalculate cart weight whenever delivery
     * information is refreshed.
     */

    calculateNexpakOnlineDeliveryCartWeight();


    return updatedDistance;

}


/* =========================================================
   18. UPDATE DELIVERY WEIGHT
   ========================================================= */

function updateNexpakOnlineDeliveryWeight() {

    return calculateNexpakOnlineDeliveryCartWeight();

}


/* =========================================================
   19. GET DELIVERY INPUT SUMMARY
   ========================================================= */

function getNexpakOnlineDeliveryInputSummary() {

    const distance =
        getNexpakOnlineDeliveryDistance();


    const weight =
        calculateNexpakOnlineDeliveryCartWeight();


    return {

        distance: distance,

        weight: weight,

        maximumDistance:
            NEXPAK_ONLINE_DELIVERY_CONFIG
                .maximumDistance

    };

}


/* =========================================================
   20. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY.getCart =
        getNexpakOnlineDeliveryCart;

    window.NEXPAK_ONLINE_DELIVERY.getCartItems =
        getNexpakOnlineDeliveryCartItems;

    window.NEXPAK_ONLINE_DELIVERY.getKitQuantity =
        getNexpakOnlineDeliveryKitQuantity;

    window.NEXPAK_ONLINE_DELIVERY.getKitWeight =
        getNexpakOnlineDeliveryKitWeight;

    window.NEXPAK_ONLINE_DELIVERY.calculateCartWeight =
        calculateNexpakOnlineDeliveryCartWeight;

    window.NEXPAK_ONLINE_DELIVERY.getDistance =
        getNexpakOnlineDeliveryDistance;

    window.NEXPAK_ONLINE_DELIVERY.updateDistance =
        updateNexpakOnlineDeliveryDistance;

    window.NEXPAK_ONLINE_DELIVERY.updateWeight =
        updateNexpakOnlineDeliveryWeight;

    window.NEXPAK_ONLINE_DELIVERY.getInputSummary =
        getNexpakOnlineDeliveryInputSummary;

     }

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 3
   DELIVERY FEE CALCULATION
   ========================================================= */


/* =========================================================
   21. VALIDATE DELIVERY DISTANCE
   ========================================================= */

function validateNexpakOnlineDeliveryDistance(distance) {

    distance =
        normaliseNexpakOnlineDeliveryNumber(
            distance
        );


    if (distance < 0) {

        return {

            valid: false,

            distance: 0,

            error: "Delivery distance cannot be negative."

        };

    }


    if (
        distance >
        NEXPAK_ONLINE_DELIVERY_CONFIG.maximumDistance
    ) {

        return {

            valid: false,

            distance:
                NEXPAK_ONLINE_DELIVERY_CONFIG
                    .maximumDistance,

            error:
                "Delivery distance exceeds the maximum allowed distance of " +
                NEXPAK_ONLINE_DELIVERY_CONFIG.maximumDistance +
                " km."

        };

    }


    return {

        valid: true,

        distance: distance,

        error: ""

    };

}


/* =========================================================
   22. CALCULATE DISTANCE CHARGE
   ========================================================= */

function calculateNexpakOnlineDeliveryDistanceCharge(
    distance
) {

    distance =
        normaliseNexpakOnlineDeliveryNumber(
            distance
        );


    const charge =
        distance *
        NEXPAK_ONLINE_DELIVERY_CONFIG
            .distanceRate;


    return roundNexpakOnlineDeliveryCurrency(
        charge
    );

}


/* =========================================================
   23. CALCULATE WEIGHT CHARGE
   ========================================================= */

function calculateNexpakOnlineDeliveryWeightCharge(
    weight
) {

    weight =
        normaliseNexpakOnlineDeliveryNumber(
            weight
        );


    const charge =
        weight *
        NEXPAK_ONLINE_DELIVERY_CONFIG
            .weightRate;


    return roundNexpakOnlineDeliveryCurrency(
        charge
    );

}


/* =========================================================
   24. CALCULATE RAW DELIVERY FEE
   ========================================================= */

function calculateNexpakOnlineDeliveryRawFee(
    distance,
    weight
) {

    const baseFee =
        NEXPAK_ONLINE_DELIVERY_CONFIG
            .baseFee;


    const distanceCharge =
        calculateNexpakOnlineDeliveryDistanceCharge(
            distance
        );


    const weightCharge =
        calculateNexpakOnlineDeliveryWeightCharge(
            weight
        );


    return roundNexpakOnlineDeliveryCurrency(

        baseFee +
        distanceCharge +
        weightCharge

    );

}


/* =========================================================
   25. APPLY MINIMUM DELIVERY FEE
   ========================================================= */

function applyNexpakOnlineDeliveryMinimum(
    fee
) {

    fee =
        normaliseNexpakOnlineDeliveryNumber(
            fee
        );


    const minimum =
        NEXPAK_ONLINE_DELIVERY_CONFIG
            .minimumFee;


    return Math.max(
        fee,
        minimum
    );

}


/* =========================================================
   26. APPLY MAXIMUM DELIVERY FEE
   ========================================================= */

function applyNexpakOnlineDeliveryMaximum(
    fee
) {

    fee =
        normaliseNexpakOnlineDeliveryNumber(
            fee
        );


    const maximum =
        NEXPAK_ONLINE_DELIVERY_CONFIG
            .maximumFee;


    return Math.min(
        fee,
        maximum
    );

}


/* =========================================================
   27. CALCULATE FINAL DELIVERY FEE
   ========================================================= */

function calculateNexpakOnlineDeliveryFee(
    distance,
    weight
) {

    const validation =
        validateNexpakOnlineDeliveryDistance(
            distance
        );


    if (!validation.valid) {

        NEXPAK_ONLINE_DELIVERY_STATE.isValid =
            false;

        NEXPAK_ONLINE_DELIVERY_STATE.error =
            validation.error;

        NEXPAK_ONLINE_DELIVERY_STATE.distance =
            validation.distance;

        NEXPAK_ONLINE_DELIVERY_STATE.finalFee =
            0;

        return {

            success: false,

            fee: 0,

            distance:
                validation.distance,

            weight:
                normaliseNexpakOnlineDeliveryNumber(
                    weight
                ),

            error:
                validation.error

        };

    }


    weight =
        normaliseNexpakOnlineDeliveryNumber(
            weight
        );


    if (weight < 0) {

        weight = 0;

    }


    const distanceCharge =
        calculateNexpakOnlineDeliveryDistanceCharge(
            validation.distance
        );


    const weightCharge =
        calculateNexpakOnlineDeliveryWeightCharge(
            weight
        );


    const rawFee =
        calculateNexpakOnlineDeliveryRawFee(
            validation.distance,
            weight
        );


    let finalFee =
        applyNexpakOnlineDeliveryMinimum(
            rawFee
        );


    finalFee =
        applyNexpakOnlineDeliveryMaximum(
            finalFee
        );


    finalFee =
        roundNexpakOnlineDeliveryCurrency(
            finalFee
        );


    NEXPAK_ONLINE_DELIVERY_STATE.distance =
        validation.distance;


    NEXPAK_ONLINE_DELIVERY_STATE.cartWeight =
        weight;


    NEXPAK_ONLINE_DELIVERY_STATE.distanceCharge =
        distanceCharge;


    NEXPAK_ONLINE_DELIVERY_STATE.weightCharge =
        weightCharge;


    NEXPAK_ONLINE_DELIVERY_STATE.calculatedFee =
        rawFee;


    NEXPAK_ONLINE_DELIVERY_STATE.finalFee =
        finalFee;


    NEXPAK_ONLINE_DELIVERY_STATE.isValid =
        true;


    NEXPAK_ONLINE_DELIVERY_STATE.error =
        "";


    NEXPAK_ONLINE_DELIVERY_STATE.lastUpdated =
        new Date();


    return {

        success: true,

        fee: finalFee,

        rawFee: rawFee,

        baseFee:
            NEXPAK_ONLINE_DELIVERY_CONFIG
                .baseFee,

        distance:
            validation.distance,

        distanceCharge:
            distanceCharge,

        weight:
            weight,

        weightCharge:
            weightCharge,

        minimumFee:
            NEXPAK_ONLINE_DELIVERY_CONFIG
                .minimumFee,

        maximumFee:
            NEXPAK_ONLINE_DELIVERY_CONFIG
                .maximumFee,

        error: ""

    };

}


/* =========================================================
   28. CALCULATE USING CURRENT STATE
   ========================================================= */

function calculateNexpakOnlineDeliveryFromState() {

    const distance =
        NEXPAK_ONLINE_DELIVERY_STATE.distance;


    const weight =
        calculateNexpakOnlineDeliveryCartWeight();


    return calculateNexpakOnlineDeliveryFee(
        distance,
        weight
    );

}


/* =========================================================
   29. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .validateDistance =
        validateNexpakOnlineDeliveryDistance;


    window.NEXPAK_ONLINE_DELIVERY
        .calculateDistanceCharge =
        calculateNexpakOnlineDeliveryDistanceCharge;


    window.NEXPAK_ONLINE_DELIVERY
        .calculateWeightCharge =
        calculateNexpakOnlineDeliveryWeightCharge;


    window.NEXPAK_ONLINE_DELIVERY
        .calculateRawFee =
        calculateNexpakOnlineDeliveryRawFee;


    window.NEXPAK_ONLINE_DELIVERY
        .calculateFee =
        calculateNexpakOnlineDeliveryFee;


    window.NEXPAK_ONLINE_DELIVERY
        .calculateFromState =
        calculateNexpakOnlineDeliveryFromState;

         }
/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 4
   DELIVERY SUMMARY + CHECKOUT INTEGRATION
   ========================================================= */


/* =========================================================
   30. SET DELIVERY DISTANCE FROM INPUT
   ========================================================= */

function setNexpakOnlineDeliveryDistanceFromInput(
    value
) {

    const distance =
        normaliseNexpakOnlineDeliveryNumber(
            value
        );


    const validation =
        validateNexpakOnlineDeliveryDistance(
            distance
        );


    if (!validation.valid) {

        NEXPAK_ONLINE_DELIVERY_STATE.isValid =
            false;

        NEXPAK_ONLINE_DELIVERY_STATE.error =
            validation.error;

        NEXPAK_ONLINE_DELIVERY_STATE.distance =
            validation.distance;

        NEXPAK_ONLINE_DELIVERY_STATE.finalFee =
            0;


        return {

            success: false,

            distance:
                validation.distance,

            error:
                validation.error

        };

    }


    setNexpakOnlineDeliveryDistance(
        validation.distance
    );


    NEXPAK_ONLINE_DELIVERY_STATE.isValid =
        true;

    NEXPAK_ONLINE_DELIVERY_STATE.error =
        "";


    return {

        success: true,

        distance:
            validation.distance,

        error: ""

    };

}


/* =========================================================
   31. REFRESH DELIVERY CALCULATION
   ========================================================= */

function refreshNexpakOnlineDelivery() {

    const distance =
        getNexpakOnlineDeliveryDistance();


    const weight =
        calculateNexpakOnlineDeliveryCartWeight();


    const result =
        calculateNexpakOnlineDeliveryFee(
            distance,
            weight
        );


    return result;

}


/* =========================================================
   32. GET DELIVERY FEE
   ========================================================= */

function getNexpakOnlineDeliveryFee() {

    return roundNexpakOnlineDeliveryCurrency(

        NEXPAK_ONLINE_DELIVERY_STATE.finalFee

    );

}


/* =========================================================
   33. BUILD DELIVERY SUMMARY
   ========================================================= */

function getNexpakOnlineDeliverySummary() {

    const state =
        NEXPAK_ONLINE_DELIVERY_STATE;


    const config =
        NEXPAK_ONLINE_DELIVERY_CONFIG;


    return {

        success:
            state.isValid,

        distance:
            roundNexpakOnlineDeliveryCurrency(
                state.distance
            ),

        weight:
            roundNexpakOnlineDeliveryCurrency(
                state.cartWeight
            ),

        baseFee:
            roundNexpakOnlineDeliveryCurrency(
                config.baseFee
            ),

        distanceRate:
            config.distanceRate,

        weightRate:
            config.weightRate,

        distanceCharge:
            roundNexpakOnlineDeliveryCurrency(
                state.distanceCharge
            ),

        weightCharge:
            roundNexpakOnlineDeliveryCurrency(
                state.weightCharge
            ),

        calculatedFee:
            roundNexpakOnlineDeliveryCurrency(
                state.calculatedFee
            ),

        deliveryFee:
            roundNexpakOnlineDeliveryCurrency(
                state.finalFee
            ),

        minimumFee:
            config.minimumFee,

        maximumFee:
            config.maximumFee,

        maximumDistance:
            config.maximumDistance,

        error:
            state.error || ""

    };

}


/* =========================================================
   34. GET CHECKOUT DELIVERY DATA
   ========================================================= */

function getNexpakOnlineCheckoutDeliveryData() {

    const summary =
        getNexpakOnlineDeliverySummary();


    return {

        deliveryDistance:
            summary.distance,

        deliveryWeight:
            summary.weight,

        deliveryFee:
            summary.deliveryFee,

        distanceCharge:
            summary.distanceCharge,

        weightCharge:
            summary.weightCharge,

        deliveryValid:
            summary.success,

        deliveryError:
            summary.error

    };

}


/* =========================================================
   35. UPDATE CHECKOUT DELIVERY DATA
   ========================================================= */

function updateNexpakOnlineCheckoutDeliveryData() {

    const result =
        refreshNexpakOnlineDelivery();


    const deliveryData =
        getNexpakOnlineCheckoutDeliveryData();


    /*
     * Do not overwrite the checkout engine.
     *
     * We only expose the latest delivery information
     * so onlinecheckout.js can consume it.
     */

    if (
        window.NEXPAK_ONLINE_CHECKOUT &&
        typeof window.NEXPAK_ONLINE_CHECKOUT === "object"
    ) {

        window.NEXPAK_ONLINE_CHECKOUT.delivery =
            deliveryData;

    }


    return {

        result:
            result,

        delivery:
            deliveryData

    };

}


/* =========================================================
   36. DELIVERY DISPLAY DATA
   ========================================================= */

function getNexpakOnlineDeliveryDisplayData() {

    const summary =
        getNexpakOnlineDeliverySummary();


    return {

        distanceText:
            summary.distance.toFixed(2) +
            " km",

        weightText:
            summary.weight.toFixed(2) +
            " kg",

        distanceChargeText:
            "R " +
            summary.distanceCharge
                .toFixed(2),

        weightChargeText:
            "R " +
            summary.weightCharge
                .toFixed(2),

        deliveryFeeText:
            "R " +
            summary.deliveryFee
                .toFixed(2),

        errorText:
            summary.error || ""

    };

}


/* =========================================================
   37. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .setDistanceFromInput =
        setNexpakOnlineDeliveryDistanceFromInput;


    window.NEXPAK_ONLINE_DELIVERY
        .refresh =
        refreshNexpakOnlineDelivery;


    window.NEXPAK_ONLINE_DELIVERY
        .getFee =
        getNexpakOnlineDeliveryFee;


    window.NEXPAK_ONLINE_DELIVERY
        .getSummary =
        getNexpakOnlineDeliverySummary;


    window.NEXPAK_ONLINE_DELIVERY
        .getCheckoutData =
        getNexpakOnlineCheckoutDeliveryData;


    window.NEXPAK_ONLINE_DELIVERY
        .updateCheckout =
        updateNexpakOnlineCheckoutDeliveryData;


    window.NEXPAK_ONLINE_DELIVERY
        .getDisplayData =
        getNexpakOnlineDeliveryDisplayData;

}

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 5
   DOM ELEMENTS + DELIVERY SUMMARY RENDERING
   ========================================================= */


/* =========================================================
   38. FIND DELIVERY ELEMENT
   ========================================================= */

function findNexpakOnlineDeliveryElement(
    selectors
) {

    if (!Array.isArray(selectors)) {

        return null;

    }


    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        const selector =
            selectors[i];


        if (!selector) {

            continue;

        }


        try {

            const element =
                document.querySelector(
                    selector
                );


            if (element) {

                return element;

            }

        } catch (error) {

            console.warn(
                "NEXPAK Online Delivery: Invalid selector:",
                selector
            );

        }

    }


    return null;

}


/* =========================================================
   39. DELIVERY DISTANCE INPUT
   ========================================================= */

function getNexpakOnlineDeliveryDistanceInput() {

    return findNexpakOnlineDeliveryElement([

        "#deliveryDistance",

        "#delivery-distance",

        "[name='deliveryDistance']",

        "[name='delivery-distance']",

        ".delivery-distance-input"

    ]);

}


/* =========================================================
   40. DELIVERY SUMMARY CONTAINER
   ========================================================= */

function getNexpakOnlineDeliverySummaryContainer() {

    return findNexpakOnlineDeliveryElement([

        "#deliverySummary",

        "#delivery-summary",

        ".delivery-summary",

        "[data-delivery-summary]"

    ]);

}


/* =========================================================
   41. SET DELIVERY TEXT
   ========================================================= */

function setNexpakOnlineDeliveryText(
    selectors,
    value
) {

    const element =
        findNexpakOnlineDeliveryElement(
            selectors
        );


    if (!element) {

        return false;

    }


    element.textContent =
        value;


    return true;

}


/* =========================================================
   42. FORMAT RAND
   ========================================================= */

function formatNexpakOnlineDeliveryRand(
    value
) {

    value =
        normaliseNexpakOnlineDeliveryNumber(
            value
        );


    return (
        "R " +
        value.toFixed(2)
    );

}


/* =========================================================
   43. RENDER DELIVERY SUMMARY
   ========================================================= */

function renderNexpakOnlineDeliverySummary() {

    const summary =
        getNexpakOnlineDeliverySummary();


    const display =
        getNexpakOnlineDeliveryDisplayData();


    /*
     * Update individual fields when they exist.
     * This makes the delivery engine tolerant of
     * different checkout HTML layouts.
     */

    setNexpakOnlineDeliveryText(
        [
            "#deliveryDistanceValue",
            "#delivery-distance-value",
            "[data-delivery-distance]"
        ],
        display.distanceText
    );


    setNexpakOnlineDeliveryText(
        [
            "#deliveryWeightValue",
            "#delivery-weight-value",
            "[data-delivery-weight]"
        ],
        display.weightText
    );


    setNexpakOnlineDeliveryText(
        [
            "#deliveryDistanceCharge",
            "#delivery-distance-charge",
            "[data-delivery-distance-charge]"
        ],
        display.distanceChargeText
    );


    setNexpakOnlineDeliveryText(
        [
            "#deliveryWeightCharge",
            "#delivery-weight-charge",
            "[data-delivery-weight-charge]"
        ],
        display.weightChargeText
    );


    setNexpakOnlineDeliveryText(
        [
            "#deliveryFee",
            "#delivery-fee",
            "#deliveryFeeValue",
            "#delivery-fee-value",
            "[data-delivery-fee]"
        ],
        display.deliveryFeeText
    );


    setNexpakOnlineDeliveryText(
        [
            "#deliveryError",
            "#delivery-error",
            "[data-delivery-error]"
        ],
        display.errorText
    );


    /*
     * Optional summary container.
     */

    const container =
        getNexpakOnlineDeliverySummaryContainer();


    if (container) {

        container.dataset.distance =
            String(summary.distance);


        container.dataset.weight =
            String(summary.weight);


        container.dataset.deliveryFee =
            String(summary.deliveryFee);


        container.dataset.valid =
            String(summary.success);


        if (summary.success) {

            container.classList.remove(
                "delivery-error"
            );

            container.classList.add(
                "delivery-valid"
            );

        } else {

            container.classList.remove(
                "delivery-valid"
            );

            container.classList.add(
                "delivery-error"
            );

        }

    }


    return summary;

}


/* =========================================================
   44. RENDER DELIVERY ERROR
   ========================================================= */

function renderNexpakOnlineDeliveryError(
    message
) {

    const errorElement =
        findNexpakOnlineDeliveryElement([

            "#deliveryError",

            "#delivery-error",

            "[data-delivery-error]"

        ]);


    if (!errorElement) {

        return false;

    }


    errorElement.textContent =
        message || "";


    if (message) {

        errorElement.hidden =
            false;

    } else {

        errorElement.hidden =
            true;

    }


    return true;

}


/* =========================================================
   45. CLEAR DELIVERY ERROR
   ========================================================= */

function clearNexpakOnlineDeliveryError() {

    return renderNexpakOnlineDeliveryError(
        ""
    );

}


/* =========================================================
   46. RENDER DELIVERY FEE ONLY
   ========================================================= */

function renderNexpakOnlineDeliveryFee() {

    const fee =
        getNexpakOnlineDeliveryFee();


    const formattedFee =
        formatNexpakOnlineDeliveryRand(
            fee
        );


    setNexpakOnlineDeliveryText(

        [
            "#deliveryFee",
            "#delivery-fee",
            "#deliveryFeeValue",
            "#delivery-fee-value",
            "[data-delivery-fee]"
        ],

        formattedFee

    );


    return fee;

}


/* =========================================================
   47. REFRESH DELIVERY DISPLAY
   ========================================================= */

function refreshNexpakOnlineDeliveryDisplay() {

    const result =
        refreshNexpakOnlineDelivery();


    renderNexpakOnlineDeliverySummary();


    if (!result.success) {

        renderNexpakOnlineDeliveryError(
            result.error
        );

    } else {

        clearNexpakOnlineDeliveryError();

    }


    return result;

}


/* =========================================================
   48. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .findElement =
        findNexpakOnlineDeliveryElement;


    window.NEXPAK_ONLINE_DELIVERY
        .getDistanceInput =
        getNexpakOnlineDeliveryDistanceInput;


    window.NEXPAK_ONLINE_DELIVERY
        .getSummaryContainer =
        getNexpakOnlineDeliverySummaryContainer;


    window.NEXPAK_ONLINE_DELIVERY
        .formatRand =
        formatNexpakOnlineDeliveryRand;


    window.NEXPAK_ONLINE_DELIVERY
        .renderSummary =
        renderNexpakOnlineDeliverySummary;


    window.NEXPAK_ONLINE_DELIVERY
        .renderError =
        renderNexpakOnlineDeliveryError;


    window.NEXPAK_ONLINE_DELIVERY
        .clearError =
        clearNexpakOnlineDeliveryError;


    window.NEXPAK_ONLINE_DELIVERY
        .renderFee =
        renderNexpakOnlineDeliveryFee;


    window.NEXPAK_ONLINE_DELIVERY
        .refreshDisplay =
        refreshNexpakOnlineDeliveryDisplay;

}

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 6
   DISTANCE INPUT + AUTO RECALCULATION
   + CHECKOUT TOTAL INTEGRATION
   ========================================================= */


/* =========================================================
   49. HANDLE DISTANCE INPUT
   ========================================================= */

function handleNexpakOnlineDeliveryDistanceInput(
    event
) {

    if (!event || !event.target) {

        return;

    }


    const value =
        event.target.value;


    const result =
        setNexpakOnlineDeliveryDistanceFromInput(
            value
        );


    if (!result.success) {

        renderNexpakOnlineDeliveryError(
            result.error
        );

    } else {

        clearNexpakOnlineDeliveryError();

    }


    refreshNexpakOnlineDeliveryDisplay();


    updateNexpakOnlineCheckoutDeliveryData();


    /*
     * Notify any other Online Store engine that
     * delivery information has changed.
     */

    try {

        window.dispatchEvent(
            new CustomEvent(
                "nexpak:online-delivery-updated",
                {
                    detail:
                        getNexpakOnlineDeliverySummary()
                }
            )
        );

    } catch (error) {

        console.warn(
            "NEXPAK Online Delivery: Could not dispatch update event.",
            error
        );

    }

}


/* =========================================================
   50. HANDLE DISTANCE CHANGE
   ========================================================= */

function handleNexpakOnlineDeliveryDistanceChange(
    event
) {

    handleNexpakOnlineDeliveryDistanceInput(
        event
    );

}


/* =========================================================
   51. BIND DISTANCE INPUT
   ========================================================= */

function bindNexpakOnlineDeliveryDistanceInput() {

    const input =
        getNexpakOnlineDeliveryDistanceInput();


    if (!input) {

        console.warn(
            "NEXPAK Online Delivery: Distance input not found."
        );

        return false;

    }


    /*
     * Prevent duplicate event bindings.
     */

    if (
        input.dataset.nexpakDeliveryBound ===
        "true"
    ) {

        return true;

    }


    input.addEventListener(
        "input",
        handleNexpakOnlineDeliveryDistanceInput
    );


    input.addEventListener(
        "change",
        handleNexpakOnlineDeliveryDistanceChange
    );


    input.dataset.nexpakDeliveryBound =
        "true";


    return true;

}


/* =========================================================
   52. SET INITIAL DISTANCE
   ========================================================= */

function initialiseNexpakOnlineDeliveryDistance() {

    const input =
        getNexpakOnlineDeliveryDistanceInput();


    if (!input) {

        return false;

    }


    let distance =
        input.value;


    if (
        distance ===
        ""
    ) {

        distance = 0;

    }


    const result =
        setNexpakOnlineDeliveryDistanceFromInput(
            distance
        );


    if (!result.success) {

        renderNexpakOnlineDeliveryError(
            result.error
        );

    }


    return result.success;

}


/* =========================================================
   53. REFRESH DELIVERY FROM CART
   ========================================================= */

function refreshNexpakOnlineDeliveryFromCart() {

    /*
     * Recalculate the total kit weight.
     */

    const weight =
        calculateNexpakOnlineDeliveryCartWeight();


    /*
     * Use the current delivery distance.
     */

    const distance =
        getNexpakOnlineDeliveryDistance();


    const result =
        calculateNexpakOnlineDeliveryFee(
            distance,
            weight
        );


    renderNexpakOnlineDeliverySummary();


    return result;

}


/* =========================================================
   54. HANDLE CART UPDATE
   ========================================================= */

function handleNexpakOnlineDeliveryCartUpdate() {

    const result =
        refreshNexpakOnlineDeliveryFromCart();


    updateNexpakOnlineCheckoutDeliveryData();


    renderNexpakOnlineDeliverySummary();


    try {

        window.dispatchEvent(
            new CustomEvent(
                "nexpak:online-delivery-updated",
                {
                    detail:
                        getNexpakOnlineDeliverySummary()
                }
            )
        );

    } catch (error) {

        console.warn(
            "NEXPAK Online Delivery: Cart update event failed.",
            error
        );

    }


    return result;

}


/* =========================================================
   55. BIND CART UPDATE EVENTS
   ========================================================= */

function bindNexpakOnlineDeliveryCartEvents() {

    /*
     * Listen for common custom events that the
     * Online Cart engine may dispatch.
     *
     * We do not modify onlinecart.js here.
     */

    const events = [

        "nexpak:online-cart-updated",

        "nexpak:online-cart-changed",

        "nexpak:online-cart-rendered",

        "online-cart-updated",

        "cart-updated"

    ];


    events.forEach(
        function (eventName) {

            window.addEventListener(
                eventName,
                handleNexpakOnlineDeliveryCartUpdate
            );

        }
    );


    return true;

}


/* =========================================================
   56. UPDATE CHECKOUT TOTALS EVENT
   ========================================================= */

function dispatchNexpakOnlineCheckoutDeliveryUpdate() {

    const delivery =
        getNexpakOnlineCheckoutDeliveryData();


    try {

        window.dispatchEvent(
            new CustomEvent(
                "nexpak:checkout-delivery-updated",
                {
                    detail: delivery
                }
            )
        );


        return true;

    } catch (error) {

        console.warn(
            "NEXPAK Online Delivery: Checkout update event failed.",
            error
        );


        return false;

    }

}


/* =========================================================
   57. REFRESH EVERYTHING
   ========================================================= */

function refreshNexpakOnlineDeliveryEverything() {

    const result =
        refreshNexpakOnlineDeliveryFromCart();


    renderNexpakOnlineDeliverySummary();


    updateNexpakOnlineCheckoutDeliveryData();


    dispatchNexpakOnlineCheckoutDeliveryUpdate();


    return result;

}


/* =========================================================
   58. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .handleDistanceInput =
        handleNexpakOnlineDeliveryDistanceInput;


    window.NEXPAK_ONLINE_DELIVERY
        .handleDistanceChange =
        handleNexpakOnlineDeliveryDistanceChange;


    window.NEXPAK_ONLINE_DELIVERY
        .bindDistanceInput =
        bindNexpakOnlineDeliveryDistanceInput;


    window.NEXPAK_ONLINE_DELIVERY
        .initialiseDistance =
        initialiseNexpakOnlineDeliveryDistance;


    window.NEXPAK_ONLINE_DELIVERY
        .refreshFromCart =
        refreshNexpakOnlineDeliveryFromCart;


    window.NEXPAK_ONLINE_DELIVERY
        .handleCartUpdate =
        handleNexpakOnlineDeliveryCartUpdate;


    window.NEXPAK_ONLINE_DELIVERY
        .bindCartEvents =
        bindNexpakOnlineDeliveryCartEvents;


    window.NEXPAK_ONLINE_DELIVERY
        .dispatchCheckoutUpdate =
        dispatchNexpakOnlineCheckoutDeliveryUpdate;


    window.NEXPAK_ONLINE_DELIVERY
        .refreshEverything =
        refreshNexpakOnlineDeliveryEverything;

}

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 7
   INITIALISATION + STORE INTEGRATION
   ========================================================= */


/* =========================================================
   59. CHECK DOM READY
   ========================================================= */

function isNexpakOnlineDeliveryDOMReady() {

    return (
        document.readyState === "interactive" ||
        document.readyState === "complete"
    );

}


/* =========================================================
   60. INITIALISE DELIVERY STATE
   ========================================================= */

function initialiseNexpakOnlineDeliveryState() {

    resetNexpakOnlineDeliveryState();


    /*
     * Calculate the current cart weight.
     * An empty cart safely returns 0 kg.
     */

    calculateNexpakOnlineDeliveryCartWeight();


    /*
     * Start with zero distance until the customer
     * supplies a delivery distance.
     */

    setNexpakOnlineDeliveryDistance(0);


    calculateNexpakOnlineDeliveryFee(
        0,
        NEXPAK_ONLINE_DELIVERY_STATE.cartWeight
    );


    return true;

}


/* =========================================================
   61. INITIALISE DELIVERY DOM
   ========================================================= */

function initialiseNexpakOnlineDeliveryDOM() {

    bindNexpakOnlineDeliveryDistanceInput();


    bindNexpakOnlineDeliveryCartEvents();


    initialiseNexpakOnlineDeliveryDistance();


    renderNexpakOnlineDeliverySummary();


    return true;

}


/* =========================================================
   62. INITIALISE DELIVERY ENGINE
   ========================================================= */

function initialiseNexpakOnlineDelivery() {

    /*
     * Prevent accidental duplicate initialisation.
     */

    if (
        window.NEXPAK_ONLINE_DELIVERY &&
        window.NEXPAK_ONLINE_DELIVERY.initialised === true
    ) {

        return true;

    }


    initialiseNexpakOnlineDeliveryState();


    if (
        isNexpakOnlineDeliveryDOMReady()
    ) {

        initialiseNexpakOnlineDeliveryDOM();

    }


    /*
     * Mark the engine as initialised.
     */

    if (
        window.NEXPAK_ONLINE_DELIVERY
    ) {

        window.NEXPAK_ONLINE_DELIVERY.initialised =
            true;

    }


    return true;

}


/* =========================================================
   63. DOM READY INITIALISATION
   ========================================================= */

function handleNexpakOnlineDeliveryDOMReady() {

    initialiseNexpakOnlineDelivery();

}


/* =========================================================
   64. WAIT FOR ONLINE CART
   ========================================================= */

function waitForNexpakOnlineDeliveryCart() {

    /*
     * onlinecart.js may load before or after this engine.
     *
     * We therefore do not assume that the cart object
     * already exists at script execution time.
     */

    if (
        window.NEXPAK_ONLINE_CART
    ) {

        handleNexpakOnlineDeliveryCartUpdate();

        return true;

    }


    return false;

}


/* =========================================================
   65. WAIT FOR ONLINE STORE
   ========================================================= */

function waitForNexpakOnlineDeliveryStore() {

    /*
     * The Online Store engine may already exist.
     *
     * We only refresh delivery information.
     * We do NOT replace or initialise the store engine.
     */

    if (
        window.NEXPAK_ONLINE_STORE
    ) {

        handleNexpakOnlineDeliveryCartUpdate();

        return true;

    }


    return false;

}


/* =========================================================
   66. STORE READY HANDLER
   ========================================================= */

function handleNexpakOnlineDeliveryStoreReady() {

    waitForNexpakOnlineDeliveryStore();

    waitForNexpakOnlineDeliveryCart();


    refreshNexpakOnlineDeliveryEverything();

}


/* =========================================================
   67. EXTEND DELIVERY ENGINE API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .isDOMReady =
        isNexpakOnlineDeliveryDOMReady;


    window.NEXPAK_ONLINE_DELIVERY
        .initialiseState =
        initialiseNexpakOnlineDeliveryState;


    window.NEXPAK_ONLINE_DELIVERY
        .initialiseDOM =
        initialiseNexpakOnlineDeliveryDOM;


    window.NEXPAK_ONLINE_DELIVERY
        .initialise =
        initialiseNexpakOnlineDelivery;


    window.NEXPAK_ONLINE_DELIVERY
        .waitForCart =
        waitForNexpakOnlineDeliveryCart;


    window.NEXPAK_ONLINE_DELIVERY
        .waitForStore =
        waitForNexpakOnlineDeliveryStore;


    window.NEXPAK_ONLINE_DELIVERY
        .storeReady =
        handleNexpakOnlineDeliveryStoreReady;

}


/* =========================================================
   68. REGISTER DOM READY EVENT
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        handleNexpakOnlineDeliveryDOMReady,
        {
            once: true
        }
    );

} else {

    handleNexpakOnlineDeliveryDOMReady();

}


/* =========================================================
   69. LISTEN FOR ONLINE STORE READY
   ========================================================= */

window.addEventListener(
    "nexpak:online-store-ready",
    handleNexpakOnlineDeliveryStoreReady
);


/* =========================================================
   70. LISTEN FOR ONLINE CART READY
   ========================================================= */

window.addEventListener(
    "nexpak:online-cart-ready",
    handleNexpakOnlineDeliveryStoreReady
);

/* =========================================================
   NEXPAK ONLINE STORE — DELIVERY ENGINE
   PART 8
   PUBLIC API + FINAL ENGINE STATUS
   ========================================================= */


/* =========================================================
   71. FINAL DELIVERY API
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY.version =
        "1.0.0";


    window.NEXPAK_ONLINE_DELIVERY.engine =
        "NEXPAK Online Store Delivery Engine";


    window.NEXPAK_ONLINE_DELIVERY.mode =
        "KIT_ONLY";


    window.NEXPAK_ONLINE_DELIVERY.currency =
        "ZAR";


    window.NEXPAK_ONLINE_DELIVERY.status =
        "READY";


    window.NEXPAK_ONLINE_DELIVERY.getDeliveryFee =
        getNexpakOnlineDeliveryFee;


    window.NEXPAK_ONLINE_DELIVERY.getDeliverySummary =
        getNexpakOnlineDeliverySummary;


    window.NEXPAK_ONLINE_DELIVERY.getCheckoutDelivery =
        getNexpakOnlineCheckoutDeliveryData;


    window.NEXPAK_ONLINE_DELIVERY.calculateDelivery =
        calculateNexpakOnlineDeliveryFee;


    window.NEXPAK_ONLINE_DELIVERY.refreshDelivery =
        refreshNexpakOnlineDelivery;


    window.NEXPAK_ONLINE_DELIVERY.refreshAll =
        refreshNexpakOnlineDeliveryEverything;

}


/* =========================================================
   72. FINAL DELIVERY CONFIGURATION CHECK
   ========================================================= */

function validateNexpakOnlineDeliveryConfiguration() {

    const config =
        NEXPAK_ONLINE_DELIVERY_CONFIG;


    const requiredValues = [

        config.baseFee,

        config.distanceRate,

        config.weightRate,

        config.minimumFee,

        config.maximumFee,

        config.maximumDistance

    ];


    const valid =
        requiredValues.every(
            function (value) {

                return (
                    Number.isFinite(
                        Number(value)
                    ) &&
                    Number(value) >= 0
                );

            }
        );


    if (!valid) {

        console.error(
            "NEXPAK Online Delivery: Invalid delivery configuration."
        );

    }


    return valid;

}


/* =========================================================
   73. FINAL DELIVERY ENGINE CHECK
   ========================================================= */

function runNexpakOnlineDeliveryEngineCheck() {

    const configurationValid =
        validateNexpakOnlineDeliveryConfiguration();


    const testResult =
        calculateNexpakOnlineDeliveryFee(
            0,
            0
        );


    const engineReady =
        configurationValid &&
        testResult.success &&
        testResult.fee >=
            NEXPAK_ONLINE_DELIVERY_CONFIG.minimumFee &&
        testResult.fee <=
            NEXPAK_ONLINE_DELIVERY_CONFIG.maximumFee;


    if (engineReady) {

        console.log(
            "NEXPAK Online Store Delivery Engine: READY"
        );

    } else {

        console.error(
            "NEXPAK Online Store Delivery Engine: CHECK FAILED"
        );

    }


    return engineReady;

}


/* =========================================================
   74. FINAL PUBLIC STATUS
   ========================================================= */

if (
    window.NEXPAK_ONLINE_DELIVERY
) {

    window.NEXPAK_ONLINE_DELIVERY
        .validateConfiguration =
        validateNexpakOnlineDeliveryConfiguration;


    window.NEXPAK_ONLINE_DELIVERY
        .engineCheck =
        runNexpakOnlineDeliveryEngineCheck;


    window.NEXPAK_ONLINE_DELIVERY
        .status =
        runNexpakOnlineDeliveryEngineCheck()
            ? "READY"
            : "ERROR";

}


/* =========================================================
   75. FINAL ENGINE MESSAGE
   ========================================================= */

console.log(
    "NEXPAK Online Store Delivery Engine: " +
    "Initialised successfully."
);


/* =========================================================
   76. FINAL IIFE CLOSURE
   ========================================================= */

})();
