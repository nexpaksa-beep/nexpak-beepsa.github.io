/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 1/8
=========================================================*/

"use strict";

/*=========================================================
 DELIVERY ENGINE
-----------------------------------------------------------
 Responsibilities:
 - Delivery configuration
 - Delivery zones
 - Delivery methods
 - Delivery fee calculation foundation
 - Collection / delivery state
 - Integration hooks for checkout
=========================================================*/


/*=========================================================
 1. GLOBAL DELIVERY CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_CONFIG = {

    /*---------------------------------------------
     STORE INFORMATION
    ---------------------------------------------*/

    storeName: "NEXPAK Security Solutions",

    currency: "ZAR",

    currencySymbol: "R",


    /*---------------------------------------------
     DEFAULT DELIVERY SETTINGS
    ---------------------------------------------*/

    defaultMethod: "delivery",

    defaultZone: "south-africa",

    defaultDeliveryFee: 0,

    freeDeliveryThreshold: 0,


    /*---------------------------------------------
     COLLECTION SETTINGS
    ---------------------------------------------*/

    collectionEnabled: true,

    collectionMethod: "collection",

    collectionFee: 0,


    /*---------------------------------------------
     DELIVERY SETTINGS
    ---------------------------------------------*/

    deliveryEnabled: true,

    minimumOrderValue: 0,

    maximumDeliveryDistance: null,


    /*---------------------------------------------
     ESTIMATED DELIVERY TIME
    ---------------------------------------------*/

    standardDeliveryDays: "2–5 business days",

    expressDeliveryDays: "1–2 business days",


    /*---------------------------------------------
     STORAGE KEY
    ---------------------------------------------*/

    storageKey: "nexpakDelivery"
};


/*=========================================================
 2. DELIVERY STATE
=========================================================*/

let nexpakDeliveryState = {

    method: NEXPAK_DELIVERY_CONFIG.defaultMethod,

    zone: NEXPAK_DELIVERY_CONFIG.defaultZone,

    address: null,

    province: "",

    city: "",

    suburb: "",

    postalCode: "",

    country: "South Africa",

    deliveryFee: NEXPAK_DELIVERY_CONFIG.defaultDeliveryFee,

    deliveryType: "standard",

    estimatedDelivery: NEXPAK_DELIVERY_CONFIG.standardDeliveryDays,

    valid: true,

    message: ""
};


/*=========================================================
 3. DELIVERY ZONES
=========================================================*/

const NEXPAK_DELIVERY_ZONES = {

    /*---------------------------------------------
     SOUTH AFRICA
    ---------------------------------------------*/

    "south-africa": {

        id: "south-africa",

        name: "South Africa",

        country: "South Africa",

        enabled: true,

        standardFee: 0,

        expressFee: 0,

        standardDays: "2–5 business days",

        expressDays: "1–2 business days"

    },


    /*---------------------------------------------
     LOCAL / EAST RAND
    ---------------------------------------------*/

    "local": {

        id: "local",

        name: "Local Delivery",

        country: "South Africa",

        enabled: true,

        standardFee: 0,

        expressFee: 0,

        standardDays: "1–2 business days",

        expressDays: "Same day / next business day"

    }

};


/*=========================================================
 4. DELIVERY METHODS
=========================================================*/

const NEXPAK_DELIVERY_METHODS = {

    /*---------------------------------------------
     COLLECTION
    ---------------------------------------------*/

    collection: {

        id: "collection",

        name: "Collection",

        description: "Collect your order from NEXPAK Security Solutions.",

        fee: 0,

        enabled: NEXPAK_DELIVERY_CONFIG.collectionEnabled,

        estimatedDelivery: "Ready for collection"

    },


    /*---------------------------------------------
     STANDARD DELIVERY
    ---------------------------------------------*/

    delivery: {

        id: "delivery",

        name: "Standard Delivery",

        description: "Reliable delivery to your selected address.",

        fee: 0,

        enabled: NEXPAK_DELIVERY_CONFIG.deliveryEnabled,

        estimatedDelivery:
            NEXPAK_DELIVERY_CONFIG.standardDeliveryDays

    },


    /*---------------------------------------------
     EXPRESS DELIVERY
    ---------------------------------------------*/

    express: {

        id: "express",

        name: "Express Delivery",

        description: "Priority delivery where available.",

        fee: 0,

        enabled: NEXPAK_DELIVERY_CONFIG.deliveryEnabled,

        estimatedDelivery:
            NEXPAK_DELIVERY_CONFIG.expressDeliveryDays

    }

};


/*=========================================================
 5. STORAGE HELPERS
=========================================================*/

function saveNexpakDeliveryState() {

    try {

        localStorage.setItem(
            NEXPAK_DELIVERY_CONFIG.storageKey,
            JSON.stringify(nexpakDeliveryState)
        );

        return true;

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to save delivery state.",
            error
        );

        return false;
    }
}


/*=========================================================
 6. LOAD DELIVERY STATE
=========================================================*/

function loadNexpakDeliveryState() {

    try {

        const savedDelivery =
            localStorage.getItem(
                NEXPAK_DELIVERY_CONFIG.storageKey
            );


        if (!savedDelivery) {

            return nexpakDeliveryState;

        }


        const parsedDelivery =
            JSON.parse(savedDelivery);


        if (
            parsedDelivery &&
            typeof parsedDelivery === "object"
        ) {

            nexpakDeliveryState = {

                ...nexpakDeliveryState,

                ...parsedDelivery

            };

        }

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to load delivery state.",
            error
        );

    }


    return nexpakDeliveryState;
}


/*=========================================================
 7. CLEAR DELIVERY STATE
=========================================================*/

function clearNexpakDeliveryState() {

    nexpakDeliveryState = {

        method:
            NEXPAK_DELIVERY_CONFIG.defaultMethod,

        zone:
            NEXPAK_DELIVERY_CONFIG.defaultZone,

        address: null,

        province: "",

        city: "",

        suburb: "",

        postalCode: "",

        country: "South Africa",

        deliveryFee:
            NEXPAK_DELIVERY_CONFIG.defaultDeliveryFee,

        deliveryType: "standard",

        estimatedDelivery:
            NEXPAK_DELIVERY_CONFIG.standardDeliveryDays,

        valid: true,

        message: ""

    };


    try {

        localStorage.removeItem(
            NEXPAK_DELIVERY_CONFIG.storageKey
        );

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to clear storage.",
            error
        );

    }


    return nexpakDeliveryState;
}


/*=========================================================
 8. GET DELIVERY STATE
=========================================================*/

function getNexpakDeliveryState() {

    return {
        ...nexpakDeliveryState
    };
}


/*=========================================================
 9. SET DELIVERY METHOD
=========================================================*/

function setNexpakDeliveryMethod(method) {

    if (
        !method ||
        !NEXPAK_DELIVERY_METHODS[method]
    ) {

        console.warn(
            "NEXPAK Delivery: Invalid delivery method.",
            method
        );

        return false;
    }


    if (
        !NEXPAK_DELIVERY_METHODS[method].enabled
    ) {

        console.warn(
            "NEXPAK Delivery: Selected method is disabled.",
            method
        );

        return false;
    }


    nexpakDeliveryState.method = method;


    if (method === "collection") {

        nexpakDeliveryState.deliveryFee = 0;

        nexpakDeliveryState.deliveryType =
            "collection";

        nexpakDeliveryState.estimatedDelivery =
            NEXPAK_DELIVERY_METHODS
                .collection
                .estimatedDelivery;

    }


    if (method === "delivery") {

        nexpakDeliveryState.deliveryType =
            "standard";

        nexpakDeliveryState.estimatedDelivery =
            NEXPAK_DELIVERY_METHODS
                .delivery
                .estimatedDelivery;

    }


    if (method === "express") {

        nexpakDeliveryState.deliveryType =
            "express";

        nexpakDeliveryState.estimatedDelivery =
            NEXPAK_DELIVERY_METHODS
                .express
                .estimatedDelivery;

    }


    saveNexpakDeliveryState();


    return true;
}


/*=========================================================
 10. SET DELIVERY ZONE
=========================================================*/

function setNexpakDeliveryZone(zone) {

    if (
        !zone ||
        !NEXPAK_DELIVERY_ZONES[zone]
    ) {

        console.warn(
            "NEXPAK Delivery: Invalid delivery zone.",
            zone
        );

        return false;
    }


    if (
        !NEXPAK_DELIVERY_ZONES[zone].enabled
    ) {

        console.warn(
            "NEXPAK Delivery: Selected zone is disabled.",
            zone
        );

        return false;
    }


    nexpakDeliveryState.zone = zone;


    saveNexpakDeliveryState();


    return true;
}


/*=========================================================
 11. INITIALISE DELIVERY ENGINE
=========================================================*/

function initNexpakDelivery() {

    loadNexpakDeliveryState();


    /*
     * Make sure an invalid saved method
     * does not break checkout.
     */

    if (
        !NEXPAK_DELIVERY_METHODS[
            nexpakDeliveryState.method
        ]
    ) {

        nexpakDeliveryState.method =
            NEXPAK_DELIVERY_CONFIG.defaultMethod;

    }


    /*
     * Make sure an invalid saved zone
     * falls back to South Africa.
     */

    if (
        !NEXPAK_DELIVERY_ZONES[
            nexpakDeliveryState.zone
        ]
    ) {

        nexpakDeliveryState.zone =
            NEXPAK_DELIVERY_CONFIG.defaultZone;

    }


    saveNexpakDeliveryState();


    return getNexpakDeliveryState();
}


/*=========================================================
 12. GLOBAL ACCESS
=========================================================*/

window.NEXPAK_DELIVERY_CONFIG =
    NEXPAK_DELIVERY_CONFIG;

window.NEXPAK_DELIVERY_ZONES =
    NEXPAK_DELIVERY_ZONES;

window.NEXPAK_DELIVERY_METHODS =
    NEXPAK_DELIVERY_METHODS;

window.getNexpakDeliveryState =
    getNexpakDeliveryState;

window.setNexpakDeliveryMethod =
    setNexpakDeliveryMethod;

window.setNexpakDeliveryZone =
    setNexpakDeliveryZone;

window.clearNexpakDeliveryState =
    clearNexpakDeliveryState;

window.initNexpakDelivery =
    initNexpakDelivery;


/*=========================================================
 13. AUTO INITIALISATION
=========================================================*/

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initNexpakDelivery
    );

} else {

    initNexpakDelivery();

}


/*=========================================================
 END — onlinedelivery.js — PART 1/8
=========================================================*/

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 2/8
=========================================================*/


/*=========================================================
 14. SOUTH AFRICAN PROVINCES
=========================================================*/

const NEXPAK_SA_PROVINCES = {

    "gauteng": {
        id: "gauteng",
        name: "Gauteng",
        code: "GP"
    },

    "western-cape": {
        id: "western-cape",
        name: "Western Cape",
        code: "WC"
    },

    "eastern-cape": {
        id: "eastern-cape",
        name: "Eastern Cape",
        code: "EC"
    },

    "kwazulu-natal": {
        id: "kwazulu-natal",
        name: "KwaZulu-Natal",
        code: "KZN"
    },

    "free-state": {
        id: "free-state",
        name: "Free State",
        code: "FS"
    },

    "limpopo": {
        id: "limpopo",
        name: "Limpopo",
        code: "LP"
    },

    "mpumalanga": {
        id: "mpumalanga",
        name: "Mpumalanga",
        code: "MP"
    },

    "north-west": {
        id: "north-west",
        name: "North West",
        code: "NW"
    },

    "northern-cape": {
        id: "northern-cape",
        name: "Northern Cape",
        code: "NC"
    }

};


/*=========================================================
 15. DELIVERY RATE TABLE
=========================================================*/

const NEXPAK_DELIVERY_RATES = {

    /*---------------------------------------------
     GAUTENG
    ---------------------------------------------*/

    "gauteng": {

        standard: 120,

        express: 250

    },


    /*---------------------------------------------
     KWAZULU-NATAL
    ---------------------------------------------*/

    "kwazulu-natal": {

        standard: 180,

        express: 320

    },


    /*---------------------------------------------
     MPUMALANGA
    ---------------------------------------------*/

    "mpumalanga": {

        standard: 180,

        express: 320

    },


    /*---------------------------------------------
     NORTH WEST
    ---------------------------------------------*/

    "north-west": {

        standard: 180,

        express: 320

    },


    /*---------------------------------------------
     FREE STATE
    ---------------------------------------------*/

    "free-state": {

        standard: 200,

        express: 350

    },


    /*---------------------------------------------
     LIMPOPO
    ---------------------------------------------*/

    "limpopo": {

        standard: 200,

        express: 350

    },


    /*---------------------------------------------
     EASTERN CAPE
    ---------------------------------------------*/

    "eastern-cape": {

        standard: 220,

        express: 380

    },


    /*---------------------------------------------
     WESTERN CAPE
    ---------------------------------------------*/

    "western-cape": {

        standard: 220,

        express: 380

    },


    /*---------------------------------------------
     NORTHERN CAPE
    ---------------------------------------------*/

    "northern-cape": {

        standard: 250,

        express: 420

    }

};


/*=========================================================
 16. DELIVERY RATE HELPERS
=========================================================*/


/**
 * Get the delivery rates for a province.
 *
 * @param {string} province
 * @returns {object|null}
 */

function getNexpakDeliveryRates(province) {

    if (!province) {

        return null;

    }


    const normalizedProvince =
        String(province)
            .toLowerCase()
            .trim();


    return (
        NEXPAK_DELIVERY_RATES[
            normalizedProvince
        ] || null
    );

}


/*=========================================================
 17. NORMALISE PROVINCE
=========================================================*/

function normalizeNexpakProvince(province) {

    if (!province) {

        return "";

    }


    const value =
        String(province)
            .toLowerCase()
            .trim();


    const aliases = {

        "gp": "gauteng",

        "gauteng province": "gauteng",

        "wc": "western-cape",

        "western cape": "western-cape",

        "ec": "eastern-cape",

        "eastern cape": "eastern-cape",

        "kzn": "kwazulu-natal",

        "kwazulu natal": "kwazulu-natal",

        "kwa zulu natal": "kwazulu-natal",

        "fs": "free-state",

        "free state": "free-state",

        "lp": "limpopo",

        "mp": "mpumalanga",

        "nw": "north-west",

        "north west": "north-west",

        "nc": "northern-cape",

        "northern cape": "northern-cape"

    };


    return aliases[value] || value;

}


/*=========================================================
 18. VALIDATE PROVINCE
=========================================================*/

function isValidNexpakProvince(province) {

    const normalized =
        normalizeNexpakProvince(province);


    return Boolean(
        NEXPAK_SA_PROVINCES[normalized]
    );

}


/*=========================================================
 19. ADDRESS VALIDATION
=========================================================*/

function validateNexpakDeliveryAddress(address) {

    const errors = [];


    if (!address || typeof address !== "object") {

        return {

            valid: false,

            errors: [
                "A delivery address is required."
            ]

        };

    }


    /*---------------------------------------------
     FULL NAME
    ---------------------------------------------*/

    if (
        !address.fullName ||
        String(address.fullName).trim().length < 2
    ) {

        errors.push(
            "Please enter the recipient's full name."
        );

    }


    /*---------------------------------------------
     ADDRESS LINE
    ---------------------------------------------*/

    if (
        !address.addressLine1 ||
        String(address.addressLine1).trim().length < 3
    ) {

        errors.push(
            "Please enter a valid street address."
        );

    }


    /*---------------------------------------------
     CITY
    ---------------------------------------------*/

    if (
        !address.city ||
        String(address.city).trim().length < 2
    ) {

        errors.push(
            "Please enter a valid city or town."
        );

    }


    /*---------------------------------------------
     SUBURB
    ---------------------------------------------*/

    if (
        !address.suburb ||
        String(address.suburb).trim().length < 2
    ) {

        errors.push(
            "Please enter a valid suburb."
        );

    }


    /*---------------------------------------------
     PROVINCE
    ---------------------------------------------*/

    if (
        !isValidNexpakProvince(
            address.province
        )
    ) {

        errors.push(
            "Please select a valid South African province."
        );

    }


    /*---------------------------------------------
     POSTAL CODE
    ---------------------------------------------*/

    const postalCode =
        String(
            address.postalCode || ""
        ).trim();


    if (
        !/^\d{4}$/.test(postalCode)
    ) {

        errors.push(
            "Please enter a valid 4-digit postal code."
        );

    }


    /*---------------------------------------------
     PHONE
    ---------------------------------------------*/

    if (
        !address.phone ||
        String(address.phone).trim().length < 8
    ) {

        errors.push(
            "Please enter a valid contact number."
        );

    }


    return {

        valid: errors.length === 0,

        errors: errors

    };

}


/*=========================================================
 20. NORMALISE DELIVERY ADDRESS
=========================================================*/

function normalizeNexpakDeliveryAddress(address) {

    if (!address || typeof address !== "object") {

        return null;

    }


    const province =
        normalizeNexpakProvince(
            address.province
        );


    return {

        fullName:
            String(
                address.fullName || ""
            ).trim(),

        company:
            String(
                address.company || ""
            ).trim(),

        phone:
            String(
                address.phone || ""
            ).trim(),

        email:
            String(
                address.email || ""
            ).trim(),

        addressLine1:
            String(
                address.addressLine1 || ""
            ).trim(),

        addressLine2:
            String(
                address.addressLine2 || ""
            ).trim(),

        suburb:
            String(
                address.suburb || ""
            ).trim(),

        city:
            String(
                address.city || ""
            ).trim(),

        province: province,

        provinceName:
            NEXPAK_SA_PROVINCES[province]
                ? NEXPAK_SA_PROVINCES[province].name
                : "",

        postalCode:
            String(
                address.postalCode || ""
            ).trim(),

        country:
            "South Africa"

    };

}


/*=========================================================
 21. SAVE DELIVERY ADDRESS
=========================================================*/

function setNexpakDeliveryAddress(address) {

    const normalizedAddress =
        normalizeNexpakDeliveryAddress(address);


    const validation =
        validateNexpakDeliveryAddress(
            normalizedAddress
        );


    if (!validation.valid) {

        nexpakDeliveryState.address = null;

        nexpakDeliveryState.valid = false;

        nexpakDeliveryState.message =
            validation.errors.join(" ");


        saveNexpakDeliveryState();


        return {

            success: false,

            valid: false,

            errors: validation.errors

        };

    }


    nexpakDeliveryState.address =
        normalizedAddress;


    nexpakDeliveryState.province =
        normalizedAddress.province;


    nexpakDeliveryState.city =
        normalizedAddress.city;


    nexpakDeliveryState.suburb =
        normalizedAddress.suburb;


    nexpakDeliveryState.postalCode =
        normalizedAddress.postalCode;


    nexpakDeliveryState.country =
        normalizedAddress.country;


    nexpakDeliveryState.valid = true;

    nexpakDeliveryState.message = "";


    saveNexpakDeliveryState();


    return {

        success: true,

        valid: true,

        address: normalizedAddress,

        errors: []

    };

}


/*=========================================================
 22. CALCULATE DELIVERY FEE
=========================================================*/

function calculateNexpakDeliveryFee(
    province,
    deliveryType = "standard",
    orderSubtotal = 0
) {

    /*---------------------------------------------
     COLLECTION = FREE
    ---------------------------------------------*/

    if (
        nexpakDeliveryState.method ===
        "collection"
    ) {

        return 0;

    }


    const normalizedProvince =
        normalizeNexpakProvince(province);


    const rates =
        getNexpakDeliveryRates(
            normalizedProvince
        );


    if (!rates) {

        return 0;

    }


    let fee = 0;


    if (deliveryType === "express") {

        fee = Number(rates.express || 0);

    } else {

        fee = Number(rates.standard || 0);

    }


    /*---------------------------------------------
     FREE DELIVERY THRESHOLD
    ---------------------------------------------*/

    const threshold =
        Number(
            NEXPAK_DELIVERY_CONFIG
                .freeDeliveryThreshold || 0
        );


    const subtotal =
        Number(orderSubtotal || 0);


    if (
        threshold > 0 &&
        subtotal >= threshold
    ) {

        fee = 0;

    }


    return Math.max(
        0,
        fee
    );

}


/*=========================================================
 23. UPDATE DELIVERY FEE
=========================================================*/

function updateNexpakDeliveryFee(
    orderSubtotal = 0
) {

    const method =
        nexpakDeliveryState.method;


    if (method === "collection") {

        nexpakDeliveryState.deliveryFee = 0;

        nexpakDeliveryState.estimatedDelivery =
            "Ready for collection";


        saveNexpakDeliveryState();


        return 0;

    }


    const province =
        nexpakDeliveryState.province;


    const deliveryType =
        method === "express"
            ? "express"
            : "standard";


    const fee =
        calculateNexpakDeliveryFee(
            province,
            deliveryType,
            orderSubtotal
        );


    nexpakDeliveryState.deliveryFee =
        fee;


    nexpakDeliveryState.deliveryType =
        deliveryType;


    if (deliveryType === "express") {

        nexpakDeliveryState.estimatedDelivery =
            "1–2 business days";

    } else {

        nexpakDeliveryState.estimatedDelivery =
            "2–5 business days";

    }


    saveNexpakDeliveryState();


    return fee;

}


/*=========================================================
 24. GET CURRENT DELIVERY FEE
=========================================================*/

function getNexpakDeliveryFee() {

    return Number(
        nexpakDeliveryState.deliveryFee || 0
    );

}


/*=========================================================
 25. GET CURRENT DELIVERY METHOD
=========================================================*/

function getNexpakDeliveryMethod() {

    return (
        NEXPAK_DELIVERY_METHODS[
            nexpakDeliveryState.method
        ] || null
    );

}


/*=========================================================
 26. GET CURRENT DELIVERY ZONE
=========================================================*/

function getNexpakDeliveryZone() {

    return (
        NEXPAK_DELIVERY_ZONES[
            nexpakDeliveryState.zone
        ] || null
    );

}


/*=========================================================
 27. GET AVAILABLE DELIVERY METHODS
=========================================================*/

function getNexpakAvailableDeliveryMethods() {

    return Object.values(
        NEXPAK_DELIVERY_METHODS
    ).filter(
        method => method.enabled
    );

}


/*=========================================================
 28. EXPORT PART 2 FUNCTIONS
=========================================================*/

window.NEXPAK_SA_PROVINCES =
    NEXPAK_SA_PROVINCES;

window.NEXPAK_DELIVERY_RATES =
    NEXPAK_DELIVERY_RATES;

window.getNexpakDeliveryRates =
    getNexpakDeliveryRates;

window.normalizeNexpakProvince =
    normalizeNexpakProvince;

window.isValidNexpakProvince =
    isValidNexpakProvince;

window.validateNexpakDeliveryAddress =
    validateNexpakDeliveryAddress;

window.normalizeNexpakDeliveryAddress =
    normalizeNexpakDeliveryAddress;

window.setNexpakDeliveryAddress =
    setNexpakDeliveryAddress;

window.calculateNexpakDeliveryFee =
    calculateNexpakDeliveryFee;

window.updateNexpakDeliveryFee =
    updateNexpakDeliveryFee;

window.getNexpakDeliveryFee =
    getNexpakDeliveryFee;

window.getNexpakDeliveryMethod =
    getNexpakDeliveryMethod;

window.getNexpakDeliveryZone =
    getNexpakDeliveryZone;

window.getNexpakAvailableDeliveryMethods =
    getNexpakAvailableDeliveryMethods;


/*=========================================================
 END — onlinedelivery.js — PART 2/8
=========================================================*/

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 3/8
=========================================================*/


/*=========================================================
 29. DELIVERY UI CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_UI = {

    containerSelectors: [
        "#delivery-section",
        "#delivery-options",
        "#delivery-container",
        "[data-delivery-container]"
    ],

    methodSelectors: [
        "[data-delivery-method]",
        ".delivery-method",
        ".delivery-option"
    ],

    addressSelectors: [
        "#delivery-address",
        "#deliveryAddress",
        "[data-delivery-address]"
    ],

    feeSelectors: [
        "#delivery-fee",
        "#deliveryFee",
        "[data-delivery-fee]"
    ],

    estimateSelectors: [
        "#delivery-estimate",
        "#deliveryEstimate",
        "[data-delivery-estimate]"
    ],

    totalSelectors: [
        "#order-total",
        "#orderTotal",
        "[data-order-total]"
    ]

};


/*=========================================================
 30. FORMAT CURRENCY
=========================================================*/

function formatNexpakDeliveryCurrency(amount) {

    const value = Number(amount || 0);

    return (
        NEXPAK_DELIVERY_CONFIG.currencySymbol +
        value.toFixed(2)
    );

}


/*=========================================================
 31. GET DELIVERY METHOD LABEL
=========================================================*/

function getNexpakDeliveryMethodLabel(method) {

    const deliveryMethod =
        NEXPAK_DELIVERY_METHODS[method];

    if (!deliveryMethod) {

        return "";

    }

    return deliveryMethod.name;

}


/*=========================================================
 32. BUILD DELIVERY METHOD HTML
=========================================================*/

function renderNexpakDeliveryMethods() {

    const methods =
        getNexpakAvailableDeliveryMethods();

    if (!methods.length) {

        return "";

    }


    const currentMethod =
        nexpakDeliveryState.method;


    return methods.map(method => {

        const checked =
            method.id === currentMethod
                ? "checked"
                : "";


        let feeText = "FREE";


        if (method.id === "delivery") {

            const fee =
                calculateNexpakDeliveryFee(
                    nexpakDeliveryState.province,
                    "standard"
                );

            feeText =
                formatNexpakDeliveryCurrency(fee);

        }


        if (method.id === "express") {

            const fee =
                calculateNexpakDeliveryFee(
                    nexpakDeliveryState.province,
                    "express"
                );

            feeText =
                formatNexpakDeliveryCurrency(fee);

        }


        return `

            <label
                class="nexpak-delivery-option"
                data-delivery-method="${method.id}"
            >

                <input
                    type="radio"
                    name="nexpakDeliveryMethod"
                    value="${method.id}"
                    ${checked}
                >

                <span class="delivery-option-content">

                    <span class="delivery-option-title">
                        ${method.name}
                    </span>

                    <span class="delivery-option-description">
                        ${method.description}
                    </span>

                    <span class="delivery-option-estimate">
                        ${method.estimatedDelivery}
                    </span>

                    <span class="delivery-option-fee">
                        ${feeText}
                    </span>

                </span>

            </label>

        `;

    }).join("");

}


/*=========================================================
 33. RENDER DELIVERY METHODS INTO CONTAINER
=========================================================*/

function renderNexpakDeliveryOptions(
    container = null
) {

    let target = container;


    if (!target) {

        for (
            const selector
            of NEXPAK_DELIVERY_UI.containerSelectors
        ) {

            target =
                document.querySelector(selector);

            if (target) {

                break;

            }

        }

    }


    if (!target) {

        return false;

    }


    target.innerHTML =
        renderNexpakDeliveryMethods();


    bindNexpakDeliveryMethodEvents();


    return true;

}


/*=========================================================
 34. DELIVERY METHOD EVENT HANDLER
=========================================================*/

function handleNexpakDeliveryMethodChange(
    method
) {

    const changed =
        setNexpakDeliveryMethod(method);


    if (!changed) {

        return false;

    }


    updateNexpakDeliveryInterface();


    /*
     * Notify checkout and other store modules.
     */

    dispatchNexpakDeliveryEvent(
        "nexpak:delivery-method-changed",
        {
            method:
                nexpakDeliveryState.method,

            deliveryFee:
                nexpakDeliveryState.deliveryFee,

            deliveryType:
                nexpakDeliveryState.deliveryType
        }
    );


    return true;

}


/*=========================================================
 35. BIND DELIVERY METHOD EVENTS
=========================================================*/

function bindNexpakDeliveryMethodEvents() {

    const radios =
        document.querySelectorAll(
            'input[name="nexpakDeliveryMethod"]'
        );


    radios.forEach(radio => {

        /*
         * Prevent duplicate listeners.
         */

        if (
            radio.dataset.nexpakBound === "true"
        ) {

            return;

        }


        radio.addEventListener(
            "change",
            function () {

                if (!this.checked) {

                    return;

                }


                handleNexpakDeliveryMethodChange(
                    this.value
                );

            }
        );


        radio.dataset.nexpakBound = "true";

    });


    /*
     * Also support custom delivery buttons.
     */

    document
        .querySelectorAll(
            "[data-delivery-method]"
        )
        .forEach(element => {

            if (
                element.tagName === "INPUT"
            ) {

                return;

            }


            if (
                element.dataset.nexpakBound === "true"
            ) {

                return;

            }


            element.addEventListener(
                "click",
                function () {

                    const method =
                        this.dataset.deliveryMethod;


                    handleNexpakDeliveryMethodChange(
                        method
                    );

                }
            );


            element.dataset.nexpakBound = "true";

        });

}


/*=========================================================
 36. DELIVERY ADDRESS FORM
=========================================================*/

function getNexpakDeliveryAddressForm() {

    const selectors = [

        "#delivery-form",

        "#deliveryForm",

        "#shipping-form",

        "#shippingForm",

        "[data-delivery-form]"

    ];


    for (const selector of selectors) {

        const form =
            document.querySelector(selector);


        if (form) {

            return form;

        }

    }


    return null;

}


/*=========================================================
 37. READ ADDRESS FROM FORM
=========================================================*/

function readNexpakDeliveryAddressForm(
    form = null
) {

    const target =
        form || getNexpakDeliveryAddressForm();


    if (!target) {

        return null;

    }


    const getValue = (
        selectors
    ) => {

        for (
            const selector
            of selectors
        ) {

            const field =
                target.querySelector(selector);


            if (field) {

                return String(
                    field.value || ""
                ).trim();

            }

        }


        return "";

    };


    return {

        fullName:
            getValue([
                '[name="fullName"]',
                '[name="full_name"]',
                "#fullName"
            ]),

        company:
            getValue([
                '[name="company"]',
                "#company"
            ]),

        phone:
            getValue([
                '[name="phone"]',
                '[name="telephone"]',
                "#phone"
            ]),

        email:
            getValue([
                '[name="email"]',
                "#email"
            ]),

        addressLine1:
            getValue([
                '[name="addressLine1"]',
                '[name="address1"]',
                '[name="street"]',
                "#addressLine1"
            ]),

        addressLine2:
            getValue([
                '[name="addressLine2"]',
                '[name="address2"]',
                "#addressLine2"
            ]),

        suburb:
            getValue([
                '[name="suburb"]',
                '[name="suburbTown"]',
                "#suburb"
            ]),

        city:
            getValue([
                '[name="city"]',
                '[name="town"]',
                "#city"
            ]),

        province:
            getValue([
                '[name="province"]',
                '[name="state"]',
                "#province"
            ]),

        postalCode:
            getValue([
                '[name="postalCode"]',
                '[name="postal_code"]',
                '[name="zip"]',
                "#postalCode"
            ])

    };

}


/*=========================================================
 38. SAVE ADDRESS FROM FORM
=========================================================*/

function saveNexpakDeliveryAddressFromForm(
    form = null
) {

    const address =
        readNexpakDeliveryAddressForm(form);


    if (!address) {

        return {

            success: false,

            valid: false,

            errors: [
                "Delivery address form could not be found."
            ]

        };

    }


    const result =
        setNexpakDeliveryAddress(address);


    if (!result.success) {

        displayNexpakDeliveryErrors(
            result.errors
        );


        return result;

    }


    clearNexpakDeliveryErrors();


    updateNexpakDeliveryInterface();


    dispatchNexpakDeliveryEvent(
        "nexpak:delivery-address-saved",
        {
            address:
                result.address
        }
    );


    return result;

}


/*=========================================================
 39. DISPLAY DELIVERY ERRORS
=========================================================*/

function displayNexpakDeliveryErrors(
    errors = []
) {

    let container =
        document.querySelector(
            "#delivery-errors"
        );


    if (!container) {

        container =
            document.querySelector(
                "[data-delivery-errors]"
            );

    }


    if (!container) {

        return false;

    }


    if (!Array.isArray(errors)) {

        errors = [String(errors)];

    }


    container.innerHTML =
        errors
            .filter(Boolean)
            .map(error => `
                <div class="delivery-error">
                    ${escapeNexpakDeliveryHTML(error)}
                </div>
            `)
            .join("");


    container.hidden =
        errors.length === 0;


    return true;

}


/*=========================================================
 40. CLEAR DELIVERY ERRORS
=========================================================*/

function clearNexpakDeliveryErrors() {

    const containers = [

        document.querySelector(
            "#delivery-errors"
        ),

        document.querySelector(
            "[data-delivery-errors]"
        )

    ].filter(Boolean);


    containers.forEach(container => {

        container.innerHTML = "";

        container.hidden = true;

    });

}


/*=========================================================
 41. ESCAPE HTML
=========================================================*/

function escapeNexpakDeliveryHTML(value) {

    return String(value || "")
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


/*=========================================================
 42. UPDATE DELIVERY FEE DISPLAY
=========================================================*/

function updateNexpakDeliveryFeeDisplay() {

    const fee =
        getNexpakDeliveryFee();


    const formattedFee =
        formatNexpakDeliveryCurrency(fee);


    NEXPAK_DELIVERY_UI
        .feeSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        formattedFee;

                });

        });


    return formattedFee;

}


/*=========================================================
 43. UPDATE DELIVERY ESTIMATE DISPLAY
=========================================================*/

function updateNexpakDeliveryEstimateDisplay() {

    const estimate =
        nexpakDeliveryState
            .estimatedDelivery;


    NEXPAK_DELIVERY_UI
        .estimateSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        estimate;

                });

        });


    return estimate;

}


/*=========================================================
 44. GET ORDER SUBTOTAL
=========================================================*/

function getNexpakOrderSubtotal() {

    /*
     * Try common cart/checkout values first.
     */

    const selectors = [

        "#order-subtotal",

        "#orderSubtotal",

        "#cart-subtotal",

        "#cartSubtotal",

        "[data-order-subtotal]",

        "[data-cart-subtotal]"

    ];


    for (const selector of selectors) {

        const element =
            document.querySelector(selector);


        if (element) {

            const raw =
                element.dataset.value ||
                element.value ||
                element.textContent ||
                "";


            const numeric =
                parseFloat(
                    String(raw)
                        .replace(
                            /[^0-9.-]/g,
                            ""
                        )
                );


            if (!Number.isNaN(numeric)) {

                return numeric;

            }

        }

    }


    /*
     * Fall back to cart engine if available.
     */

    try {

        if (
            typeof window.getCartSubtotal ===
            "function"
        ) {

            return Number(
                window.getCartSubtotal() || 0
            );

        }


        if (
            typeof window.getNexpakCartSubtotal ===
            "function"
        ) {

            return Number(
                window.getNexpakCartSubtotal() || 0
            );

        }

    } catch (error) {

        console.warn(
            "NEXPAK Delivery: Unable to read cart subtotal.",
            error
        );

    }


    return 0;

}


/*=========================================================
 45. UPDATE DELIVERY INTERFACE
=========================================================*/

function updateNexpakDeliveryInterface() {

    const subtotal =
        getNexpakOrderSubtotal();


    updateNexpakDeliveryFee(
        subtotal
    );


    updateNexpakDeliveryFeeDisplay();

    updateNexpakDeliveryEstimateDisplay();


    /*
     * Refresh method prices when province
     * or delivery method changes.
     */

    const container =
        document.querySelector(
            "#delivery-options"
        );


    if (container) {

        renderNexpakDeliveryOptions(
            container
        );

    }


    return {

        method:
            nexpakDeliveryState.method,

        deliveryFee:
            nexpakDeliveryState.deliveryFee,

        deliveryType:
            nexpakDeliveryState.deliveryType,

        estimatedDelivery:
            nexpakDeliveryState.estimatedDelivery

    };

}


/*=========================================================
 46. CUSTOM DELIVERY EVENT DISPATCHER
=========================================================*/

function dispatchNexpakDeliveryEvent(
    eventName,
    detail = {}
) {

    try {

        const event =
            new CustomEvent(
                eventName,
                {
                    detail: detail
                }
            );


        document.dispatchEvent(event);


        return true;

    } catch (error) {

        console.warn(
            "NEXPAK Delivery: Event dispatch failed.",
            error
        );


        return false;

    }

}


/*=========================================================
 47. DELIVERY FORM SUBMISSION
=========================================================*/

function bindNexpakDeliveryForm() {

    const form =
        getNexpakDeliveryAddressForm();


    if (!form) {

        return false;

    }


    if (
        form.dataset.nexpakDeliveryBound ===
        "true"
    ) {

        return true;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const result =
                saveNexpakDeliveryAddressFromForm(
                    form
                );


            if (!result.success) {

                return;

            }


            dispatchNexpakDeliveryEvent(
                "nexpak:delivery-form-complete",
                {
                    address:
                        result.address
                }
            );

        }
    );


    form.dataset.nexpakDeliveryBound =
        "true";


    return true;

}


/*=========================================================
 48. EXPORT PART 3 FUNCTIONS
=========================================================*/

window.NEXPAK_DELIVERY_UI =
    NEXPAK_DELIVERY_UI;

window.formatNexpakDeliveryCurrency =
    formatNexpakDeliveryCurrency;

window.getNexpakDeliveryMethodLabel =
    getNexpakDeliveryMethodLabel;

window.renderNexpakDeliveryMethods =
    renderNexpakDeliveryMethods;

window.renderNexpakDeliveryOptions =
    renderNexpakDeliveryOptions;

window.handleNexpakDeliveryMethodChange =
    handleNexpakDeliveryMethodChange;

window.bindNexpakDeliveryMethodEvents =
    bindNexpakDeliveryMethodEvents;

window.getNexpakDeliveryAddressForm =
    getNexpakDeliveryAddressForm;

window.readNexpakDeliveryAddressForm =
    readNexpakDeliveryAddressForm;

window.saveNexpakDeliveryAddressFromForm =
    saveNexpakDeliveryAddressFromForm;

window.displayNexpakDeliveryErrors =
    displayNexpakDeliveryErrors;

window.clearNexpakDeliveryErrors =
    clearNexpakDeliveryErrors;

window.updateNexpakDeliveryFeeDisplay =
    updateNexpakDeliveryFeeDisplay;

window.updateNexpakDeliveryEstimateDisplay =
    updateNexpakDeliveryEstimateDisplay;

window.getNexpakOrderSubtotal =
    getNexpakOrderSubtotal;

window.updateNexpakDeliveryInterface =
    updateNexpakDeliveryInterface;

window.dispatchNexpakDeliveryEvent =
    dispatchNexpakDeliveryEvent;

window.bindNexpakDeliveryForm =
    bindNexpakDeliveryForm;


/*=========================================================
 END — onlinedelivery.js — PART 3/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 4/8
=========================================================*/


/*=========================================================
 49. CHECKOUT INTEGRATION CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_CHECKOUT = {

    checkoutSelectors: [
        "#checkout",
        "#checkout-form",
        "#checkoutForm",
        "[data-checkout]"
    ],

    subtotalSelectors: [
        "#subtotal",
        "#order-subtotal",
        "#orderSubtotal",
        "[data-subtotal]"
    ],

    deliverySelectors: [
        "#delivery-fee",
        "#deliveryFee",
        "[data-delivery-fee]"
    ],

    totalSelectors: [
        "#total",
        "#order-total",
        "#orderTotal",
        "[data-order-total]"
    ],

    methodSelectors: [
        "#delivery-method",
        "#deliveryMethod",
        "[data-delivery-method]"
    ]

};


/*=========================================================
 50. GET CHECKOUT CART DATA
=========================================================*/

function getNexpakCheckoutCart() {

    const possibleFunctions = [

        "getCart",

        "getCartItems",

        "getNexpakCart",

        "getNexpakCartItems",

        "getCheckoutCart",

        "getNexpakCheckoutCart"

    ];


    for (
        const functionName
        of possibleFunctions
    ) {

        try {

            if (
                typeof window[functionName] ===
                "function"
            ) {

                const result =
                    window[functionName]();


                if (Array.isArray(result)) {

                    return result;

                }


                if (
                    result &&
                    Array.isArray(result.items)
                ) {

                    return result.items;

                }

            }

        } catch (error) {

            console.warn(
                "NEXPAK Delivery: Cart lookup failed:",
                functionName,
                error
            );

        }

    }


    return [];

}


/*=========================================================
 51. CALCULATE CART SUBTOTAL
=========================================================*/

function calculateNexpakCheckoutSubtotal(
    items = null
) {

    const cartItems =
        items || getNexpakCheckoutCart();


    if (!Array.isArray(cartItems)) {

        return 0;

    }


    let subtotal = 0;


    cartItems.forEach(item => {

        if (!item) {

            return;

        }


        const quantity =
            Number(
                item.quantity ||
                item.qty ||
                1
            );


        const price =
            Number(
                item.price ||
                item.salePrice ||
                item.unitPrice ||
                0
            );


        if (
            Number.isFinite(quantity) &&
            Number.isFinite(price)
        ) {

            subtotal +=
                price *
                Math.max(
                    0,
                    quantity
                );

        }

    });


    return Number(
        subtotal.toFixed(2)
    );

}


/*=========================================================
 52. GET ACTIVE SUBTOTAL
=========================================================*/

function getNexpakActiveCheckoutSubtotal() {

    const calculated =
        calculateNexpakCheckoutSubtotal();


    if (calculated > 0) {

        return calculated;

    }


    return getNexpakOrderSubtotal();

}


/*=========================================================
 53. CALCULATE CHECKOUT TOTAL
=========================================================*/

function calculateNexpakCheckoutTotal(
    subtotal = null
) {

    const orderSubtotal =
        subtotal === null
            ? getNexpakActiveCheckoutSubtotal()
            : Number(subtotal || 0);


    const deliveryFee =
        Number(
            nexpakDeliveryState.deliveryFee ||
            0
        );


    return Number(
        (
            orderSubtotal +
            deliveryFee
        ).toFixed(2)
    );

}


/*=========================================================
 54. UPDATE CHECKOUT TOTAL DISPLAY
=========================================================*/

function updateNexpakCheckoutTotalDisplay() {

    const subtotal =
        getNexpakActiveCheckoutSubtotal();


    const deliveryFee =
        updateNexpakDeliveryFee(
            subtotal
        );


    const total =
        calculateNexpakCheckoutTotal(
            subtotal
        );


    /*
     * Update subtotal displays.
     */

    NEXPAK_DELIVERY_CHECKOUT
        .subtotalSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        formatNexpakDeliveryCurrency(
                            subtotal
                        );

                });

        });


    /*
     * Update delivery displays.
     */

    NEXPAK_DELIVERY_CHECKOUT
        .deliverySelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        formatNexpakDeliveryCurrency(
                            deliveryFee
                        );

                });

        });


    /*
     * Update total displays.
     */

    NEXPAK_DELIVERY_CHECKOUT
        .totalSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        formatNexpakDeliveryCurrency(
                            total
                        );

                    /*
                     * Keep raw value available
                     * for checkout scripts.
                     */

                    element.dataset.value =
                        total.toFixed(2);

                });

        });


    return {

        subtotal: subtotal,

        deliveryFee: deliveryFee,

        total: total

    };

}


/*=========================================================
 55. DELIVERY / COLLECTION SWITCH
=========================================================*/

function switchNexpakFulfilmentMethod(
    method
) {

    const validMethods = [

        "delivery",

        "express",

        "collection"

    ];


    if (
        !validMethods.includes(method)
    ) {

        return {

            success: false,

            message:
                "Invalid fulfilment method."

        };

    }


    const success =
        setNexpakDeliveryMethod(method);


    if (!success) {

        return {

            success: false,

            message:
                "Unable to select the requested fulfilment method."

        };

    }


    /*
     * Collection does not require a
     * delivery address.
     */

    if (method === "collection") {

        nexpakDeliveryState.deliveryFee = 0;

        nexpakDeliveryState.valid = true;

        nexpakDeliveryState.message = "";

    }


    /*
     * Delivery requires an address.
     */

    if (
        method === "delivery" ||
        method === "express"
    ) {

        /*
         * Do not automatically invalidate
         * a previously valid address.
         */

        if (
            !nexpakDeliveryState.address
        ) {

            nexpakDeliveryState.valid =
                false;

            nexpakDeliveryState.message =
                "A delivery address is required.";

        }

    }


    saveNexpakDeliveryState();


    updateNexpakCheckoutTotalDisplay();


    updateNexpakFulfilmentUI();


    dispatchNexpakDeliveryEvent(
        "nexpak:fulfilment-changed",
        {
            method: method,

            deliveryFee:
                nexpakDeliveryState.deliveryFee,

            address:
                nexpakDeliveryState.address,

            valid:
                nexpakDeliveryState.valid
        }
    );


    return {

        success: true,

        method: method,

        deliveryFee:
            nexpakDeliveryState.deliveryFee,

        valid:
            nexpakDeliveryState.valid

    };

}


/*=========================================================
 56. SHOW / HIDE ADDRESS SECTION
=========================================================*/

function updateNexpakAddressVisibility() {

    const addressContainers = [

        document.querySelector(
            "#delivery-address-section"
        ),

        document.querySelector(
            "#deliveryAddressSection"
        ),

        document.querySelector(
            "[data-delivery-address-section]"
        ),

        document.querySelector(
            "#shipping-address"
        ),

        document.querySelector(
            "#shippingAddress"
        )

    ].filter(Boolean);


    const requiresAddress =
        nexpakDeliveryState.method ===
            "delivery" ||
        nexpakDeliveryState.method ===
            "express";


    addressContainers.forEach(container => {

        container.hidden =
            !requiresAddress;


        container.style.display =
            requiresAddress
                ? ""
                : "none";

    });


    return requiresAddress;

}


/*=========================================================
 57. UPDATE COLLECTION INFORMATION
=========================================================*/

function updateNexpakCollectionInformation() {

    const containers = [

        document.querySelector(
            "#collection-info"
        ),

        document.querySelector(
            "#collectionInfo"
        ),

        document.querySelector(
            "[data-collection-info]"
        )

    ].filter(Boolean);


    const isCollection =
        nexpakDeliveryState.method ===
        "collection";


    containers.forEach(container => {

        container.hidden =
            !isCollection;


        container.style.display =
            isCollection
                ? ""
                : "none";


        if (isCollection) {

            container.innerHTML = `

                <div class="nexpak-collection-message">

                    <strong>
                        Collection selected
                    </strong>

                    <p>
                        Your order will be prepared
                        for collection from NEXPAK
                        Security Solutions.
                    </p>

                    <span>
                        No delivery fee
                    </span>

                </div>

            `;

        }

    });


    return isCollection;

}


/*=========================================================
 58. UPDATE FULFILMENT UI
=========================================================*/

function updateNexpakFulfilmentUI() {

    updateNexpakAddressVisibility();

    updateNexpakCollectionInformation();

    updateNexpakDeliveryFeeDisplay();

    updateNexpakDeliveryEstimateDisplay();


    /*
     * Mark selected delivery option.
     */

    document
        .querySelectorAll(
            "[data-delivery-method]"
        )
        .forEach(element => {

            const method =
                element.dataset.deliveryMethod;


            const selected =
                method ===
                nexpakDeliveryState.method;


            element.classList.toggle(
                "selected",
                selected
            );


            element.setAttribute(
                "aria-selected",
                selected
                    ? "true"
                    : "false"
            );

        });


    return {

        method:
            nexpakDeliveryState.method,

        addressRequired:
            nexpakDeliveryState.method !==
            "collection"

    };

}


/*=========================================================
 59. SELECT DELIVERY METHOD FROM CHECKOUT
=========================================================*/

function selectNexpakCheckoutDeliveryMethod(
    method
) {

    const result =
        switchNexpakFulfilmentMethod(
            method
        );


    if (!result.success) {

        return false;

    }


    /*
     * Synchronise radio inputs.
     */

    document
        .querySelectorAll(
            'input[name="nexpakDeliveryMethod"]'
        )
        .forEach(input => {

            input.checked =
                input.value === method;

        });


    return true;

}


/*=========================================================
 60. READ CHECKOUT DELIVERY METHOD
=========================================================*/

function readNexpakCheckoutDeliveryMethod() {

    const checked =
        document.querySelector(
            'input[name="nexpakDeliveryMethod"]:checked'
        );


    if (checked) {

        return checked.value;

    }


    return nexpakDeliveryState.method;

}


/*=========================================================
 61. SYNCHRONISE CHECKOUT DELIVERY
=========================================================*/

function syncNexpakCheckoutDelivery() {

    const method =
        readNexpakCheckoutDeliveryMethod();


    if (
        method &&
        method !==
            nexpakDeliveryState.method
    ) {

        setNexpakDeliveryMethod(
            method
        );

    }


    const subtotal =
        getNexpakActiveCheckoutSubtotal();


    updateNexpakDeliveryFee(
        subtotal
    );


    updateNexpakFulfilmentUI();

    updateNexpakCheckoutTotalDisplay();


    return {

        method:
            nexpakDeliveryState.method,

        subtotal: subtotal,

        deliveryFee:
            nexpakDeliveryState.deliveryFee,

        total:
            calculateNexpakCheckoutTotal(
                subtotal
            )

    };

}


/*=========================================================
 62. CHECK DELIVERY REQUIREMENTS
=========================================================*/

function validateNexpakFulfilment() {

    const errors = [];


    const method =
        nexpakDeliveryState.method;


    if (!method) {

        errors.push(
            "Please select a delivery method."
        );

    }


    /*
     * Collection validation.
     */

    if (method === "collection") {

        return {

            valid: true,

            errors: []

        };

    }


    /*
     * Delivery validation.
     */

    if (
        method === "delivery" ||
        method === "express"
    ) {

        if (
            !nexpakDeliveryState.address
        ) {

            errors.push(
                "Please enter your delivery address."
            );

        } else {

            const validation =
                validateNexpakDeliveryAddress(
                    nexpakDeliveryState.address
                );


            if (!validation.valid) {

                errors.push(
                    ...validation.errors
                );

            }

        }

    }


    return {

        valid:
            errors.length === 0,

        errors: errors

    };

}


/*=========================================================
 63. GET CHECKOUT DELIVERY DATA
=========================================================*/

function getNexpakCheckoutDeliveryData() {

    const subtotal =
        getNexpakActiveCheckoutSubtotal();


    const deliveryFee =
        calculateNexpakDeliveryFee(
            nexpakDeliveryState.province,
            nexpakDeliveryState.deliveryType,
            subtotal
        );


    return {

        method:
            nexpakDeliveryState.method,

        deliveryType:
            nexpakDeliveryState.deliveryType,

        zone:
            nexpakDeliveryState.zone,

        address:
            nexpakDeliveryState.address,

        province:
            nexpakDeliveryState.province,

        city:
            nexpakDeliveryState.city,

        suburb:
            nexpakDeliveryState.suburb,

        postalCode:
            nexpakDeliveryState.postalCode,

        country:
            nexpakDeliveryState.country,

        deliveryFee:
            deliveryFee,

        estimatedDelivery:
            nexpakDeliveryState
                .estimatedDelivery,

        subtotal:
            subtotal,

        total:
            Number(
                (
                    subtotal +
                    deliveryFee
                ).toFixed(2)
            )

    };

}


/*=========================================================
 64. PREPARE DELIVERY FOR CHECKOUT
=========================================================*/

function prepareNexpakDeliveryForCheckout() {

    const sync =
        syncNexpakCheckoutDelivery();


    const validation =
        validateNexpakFulfilment();


    if (!validation.valid) {

        displayNexpakDeliveryErrors(
            validation.errors
        );


        return {

            success: false,

            valid: false,

            errors:
                validation.errors,

            data:
                getNexpakCheckoutDeliveryData()

        };

    }


    clearNexpakDeliveryErrors();


    const data =
        getNexpakCheckoutDeliveryData();


    saveNexpakDeliveryState();


    dispatchNexpakDeliveryEvent(
        "nexpak:delivery-ready",
        data
    );


    return {

        success: true,

        valid: true,

        errors: [],

        data: data,

        sync: sync

    };

}


/*=========================================================
 65. CHECKOUT EVENT LISTENERS
=========================================================*/

function bindNexpakCheckoutDeliveryEvents() {

    /*
     * Delivery method changes.
     */

    document.addEventListener(
        "change",
        function(event) {

            const target =
                event.target;


            if (
                !target ||
                target.name !==
                    "nexpakDeliveryMethod"
            ) {

                return;

            }


            selectNexpakCheckoutDeliveryMethod(
                target.value
            );

        }
    );


    /*
     * Cart updates.
     */

    document.addEventListener(
        "nexpak:cart-updated",
        function() {

            updateNexpakCheckoutTotalDisplay();

        }
    );


    /*
     * Checkout updates.
     */

    document.addEventListener(
        "nexpak:checkout-updated",
        function() {

            syncNexpakCheckoutDelivery();

        }
    );


    /*
     * Generic cart changes.
     */

    document.addEventListener(
        "cartUpdated",
        function() {

            updateNexpakCheckoutTotalDisplay();

        }
    );


    return true;

}


/*=========================================================
 66. INITIALISE CHECKOUT DELIVERY
=========================================================*/

function initNexpakCheckoutDelivery() {

    bindNexpakCheckoutDeliveryEvents();

    bindNexpakDeliveryForm();

    bindNexpakDeliveryMethodEvents();


    /*
     * Render methods only when a delivery
     * container exists and is empty.
     */

    const container =
        document.querySelector(
            "#delivery-options"
        );


    if (
        container &&
        !container.innerHTML.trim()
    ) {

        renderNexpakDeliveryOptions(
            container
        );

    }


    syncNexpakCheckoutDelivery();

    updateNexpakFulfilmentUI();


    return getNexpakCheckoutDeliveryData();

}


/*=========================================================
 67. EXPORT PART 4 FUNCTIONS
=========================================================*/

window.NEXPAK_DELIVERY_CHECKOUT =
    NEXPAK_DELIVERY_CHECKOUT;

window.getNexpakCheckoutCart =
    getNexpakCheckoutCart;

window.calculateNexpakCheckoutSubtotal =
    calculateNexpakCheckoutSubtotal;

window.getNexpakActiveCheckoutSubtotal =
    getNexpakActiveCheckoutSubtotal;

window.calculateNexpakCheckoutTotal =
    calculateNexpakCheckoutTotal;

window.updateNexpakCheckoutTotalDisplay =
    updateNexpakCheckoutTotalDisplay;

window.switchNexpakFulfilmentMethod =
    switchNexpakFulfilmentMethod;

window.updateNexpakAddressVisibility =
    updateNexpakAddressVisibility;

window.updateNexpakCollectionInformation =
    updateNexpakCollectionInformation;

window.updateNexpakFulfilmentUI =
    updateNexpakFulfilmentUI;

window.selectNexpakCheckoutDeliveryMethod =
    selectNexpakCheckoutDeliveryMethod;

window.readNexpakCheckoutDeliveryMethod =
    readNexpakCheckoutDeliveryMethod;

window.syncNexpakCheckoutDelivery =
    syncNexpakCheckoutDelivery;

window.validateNexpakFulfilment =
    validateNexpakFulfilment;

window.getNexpakCheckoutDeliveryData =
    getNexpakCheckoutDeliveryData;

window.prepareNexpakDeliveryForCheckout =
    prepareNexpakDeliveryForCheckout;

window.bindNexpakCheckoutDeliveryEvents =
    bindNexpakCheckoutDeliveryEvents;

window.initNexpakCheckoutDelivery =
    initNexpakCheckoutDelivery;


/*=========================================================
 END — onlinedelivery.js — PART 4/8
=========================================================*/

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 5/8
=========================================================*/


/*=========================================================
 68. DELIVERY SCHEDULING CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_SCHEDULE = {

    /*---------------------------------------------
     STANDARD DELIVERY
    ---------------------------------------------*/

    standardMinDays: 2,

    standardMaxDays: 5,


    /*---------------------------------------------
     EXPRESS DELIVERY
    ---------------------------------------------*/

    expressMinDays: 1,

    expressMaxDays: 2,


    /*---------------------------------------------
     ORDER CUT-OFF
    ---------------------------------------------*/

    cutoffHour: 14,

    cutoffMinute: 0,


    /*---------------------------------------------
     BUSINESS DAYS
    ---------------------------------------------*/

    workingDays: [
        1, // Monday
        2, // Tuesday
        3, // Wednesday
        4, // Thursday
        5  // Friday
    ],


    /*---------------------------------------------
     WEEKENDS
    ---------------------------------------------*/

    weekendsExcluded: true,


    /*---------------------------------------------
     PUBLIC HOLIDAYS
    ---------------------------------------------*/

    publicHolidaysExcluded: true

};


/*=========================================================
 69. SOUTH AFRICAN PUBLIC HOLIDAYS
=========================================================*/

const NEXPAK_PUBLIC_HOLIDAYS = {

    2026: [
        "2026-01-01",
        "2026-03-21",
        "2026-04-03",
        "2026-04-06",
        "2026-04-27",
        "2026-05-01",
        "2026-06-16",
        "2026-08-09",
        "2026-08-10",
        "2026-09-24",
        "2026-12-16",
        "2026-12-25",
        "2026-12-26"
    ],

    2027: [
        "2027-01-01",
        "2027-03-21",
        "2027-03-22",
        "2027-03-26",
        "2027-03-29",
        "2027-04-27",
        "2027-05-01",
        "2027-06-16",
        "2027-08-09",
        "2027-09-24",
        "2027-12-16",
        "2027-12-25",
        "2027-12-26"
    ]

};


/*=========================================================
 70. FORMAT DATE AS YYYY-MM-DD
=========================================================*/

function formatNexpakDeliveryDate(date) {

    if (!(date instanceof Date)) {

        date = new Date(date);

    }


    if (Number.isNaN(date.getTime())) {

        return "";

    }


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/*=========================================================
 71. CHECK PUBLIC HOLIDAY
=========================================================*/

function isNexpakPublicHoliday(date) {

    if (
        !NEXPAK_DELIVERY_SCHEDULE
            .publicHolidaysExcluded
    ) {

        return false;

    }


    const dateString =
        formatNexpakDeliveryDate(date);


    const year =
        date.getFullYear();


    const holidays =
        NEXPAK_PUBLIC_HOLIDAYS[year] || [];


    return holidays.includes(
        dateString
    );

}


/*=========================================================
 72. CHECK BUSINESS DAY
=========================================================*/

function isNexpakBusinessDay(date) {

    if (!(date instanceof Date)) {

        date = new Date(date);

    }


    if (Number.isNaN(date.getTime())) {

        return false;

    }


    const day =
        date.getDay();


    /*
     * Sunday = 0
     * Monday = 1
     * ...
     * Saturday = 6
     */

    if (
        NEXPAK_DELIVERY_SCHEDULE
            .weekendsExcluded &&
        !NEXPAK_DELIVERY_SCHEDULE
            .workingDays
            .includes(day)
    ) {

        return false;

    }


    if (
        isNexpakPublicHoliday(date)
    ) {

        return false;

    }


    return true;

}


/*=========================================================
 73. MOVE TO NEXT BUSINESS DAY
=========================================================*/

function getNexpakNextBusinessDay(
    date
) {

    const result =
        new Date(date);


    do {

        result.setDate(
            result.getDate() + 1
        );

    } while (
        !isNexpakBusinessDay(result)
    );


    return result;

}


/*=========================================================
 74. ADD BUSINESS DAYS
=========================================================*/

function addNexpakBusinessDays(
    startDate,
    businessDays
) {

    const result =
        new Date(startDate);


    let daysAdded = 0;


    while (
        daysAdded < businessDays
    ) {

        result.setDate(
            result.getDate() + 1
        );


        if (
            isNexpakBusinessDay(result)
        ) {

            daysAdded++;

        }

    }


    return result;

}


/*=========================================================
 75. CHECK ORDER CUT-OFF
=========================================================*/

function isNexpakAfterCutoff(
    date = new Date()
) {

    const hour =
        date.getHours();


    const minute =
        date.getMinutes();


    const cutoffHour =
        NEXPAK_DELIVERY_SCHEDULE
            .cutoffHour;


    const cutoffMinute =
        NEXPAK_DELIVERY_SCHEDULE
            .cutoffMinute;


    if (
        hour > cutoffHour
    ) {

        return true;

    }


    if (
        hour === cutoffHour &&
        minute >= cutoffMinute
    ) {

        return true;

    }


    return false;

}


/*=========================================================
 76. GET DELIVERY START DATE
=========================================================*/

function getNexpakDeliveryStartDate(
    date = new Date()
) {

    let startDate =
        new Date(date);


    /*
     * Orders placed after the cut-off
     * begin processing on the next
     * business day.
     */

    if (
        isNexpakAfterCutoff(startDate)
    ) {

        startDate =
            getNexpakNextBusinessDay(
                startDate
            );

    }


    /*
     * Orders placed on weekends or
     * public holidays begin on the
     * next business day.
     */

    if (
        !isNexpakBusinessDay(startDate)
    ) {

        startDate =
            getNexpakNextBusinessDay(
                startDate
            );

    }


    return startDate;

}


/*=========================================================
 77. GET DELIVERY DATE RANGE
=========================================================*/

function calculateNexpakDeliveryDateRange(
    deliveryType = "standard",
    orderDate = new Date()
) {

    const startDate =
        getNexpakDeliveryStartDate(
            orderDate
        );


    let minDays =
        NEXPAK_DELIVERY_SCHEDULE
            .standardMinDays;


    let maxDays =
        NEXPAK_DELIVERY_SCHEDULE
            .standardMaxDays;


    if (
        deliveryType === "express"
    ) {

        minDays =
            NEXPAK_DELIVERY_SCHEDULE
                .expressMinDays;

        maxDays =
            NEXPAK_DELIVERY_SCHEDULE
                .expressMaxDays;

    }


    const earliestDate =
        addNexpakBusinessDays(
            startDate,
            minDays
        );


    const latestDate =
        addNexpakBusinessDays(
            startDate,
            maxDays
        );


    return {

        startDate:
            startDate,

        earliestDate:
            earliestDate,

        latestDate:
            latestDate,

        startDateFormatted:
            formatNexpakDeliveryDate(
                startDate
            ),

        earliestDateFormatted:
            formatNexpakDeliveryDate(
                earliestDate
            ),

        latestDateFormatted:
            formatNexpakDeliveryDate(
                latestDate
            ),

        deliveryType:
            deliveryType

    };

}


/*=========================================================
 78. FORMAT FRIENDLY DATE
=========================================================*/

function formatNexpakFriendlyDate(
    date
) {

    if (!(date instanceof Date)) {

        date =
            new Date(date);

    }


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleDateString(
        "en-ZA",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/*=========================================================
 79. GET FRIENDLY DELIVERY ESTIMATE
=========================================================*/

function getNexpakFriendlyDeliveryEstimate(
    deliveryType = "standard"
) {

    if (
        deliveryType === "collection"
    ) {

        return "Ready for collection";

    }


    const range =
        calculateNexpakDeliveryDateRange(
            deliveryType
        );


    return (
        `${formatNexpakFriendlyDate(
            range.earliestDate
        )} – ` +
        `${formatNexpakFriendlyDate(
            range.latestDate
        )}`
    );

}


/*=========================================================
 80. UPDATE ESTIMATED DELIVERY DATE
=========================================================*/

function updateNexpakEstimatedDeliveryDate() {

    const method =
        nexpakDeliveryState.method;


    if (method === "collection") {

        nexpakDeliveryState
            .estimatedDelivery =
            "Ready for collection";

    } else {

        const deliveryType =
            method === "express"
                ? "express"
                : "standard";


        nexpakDeliveryState
            .estimatedDelivery =
            getNexpakFriendlyDeliveryEstimate(
                deliveryType
            );

    }


    saveNexpakDeliveryState();


    updateNexpakDeliveryEstimateDisplay();


    return (
        nexpakDeliveryState
            .estimatedDelivery
    );

}


/*=========================================================
 81. GET DELIVERY DATE RANGE FOR CURRENT ORDER
=========================================================*/

function getNexpakCurrentDeliveryDateRange() {

    if (
        nexpakDeliveryState.method ===
        "collection"
    ) {

        return {

            deliveryType:
                "collection",

            message:
                "Ready for collection",

            earliestDate: null,

            latestDate: null

        };

    }


    const deliveryType =
        nexpakDeliveryState.method ===
        "express"
            ? "express"
            : "standard";


    return calculateNexpakDeliveryDateRange(
        deliveryType
    );

}


/*=========================================================
 82. UPDATE DELIVERY SCHEDULE DISPLAY
=========================================================*/

function updateNexpakDeliveryScheduleDisplay() {

    const range =
        getNexpakCurrentDeliveryDateRange();


    const containers = [

        document.querySelector(
            "#delivery-date-range"
        ),

        document.querySelector(
            "#deliveryDateRange"
        ),

        document.querySelector(
            "[data-delivery-date-range]"
        )

    ].filter(Boolean);


    containers.forEach(container => {

        if (
            range.deliveryType ===
            "collection"
        ) {

            container.textContent =
                range.message;

            return;

        }


        container.textContent =
            `${formatNexpakFriendlyDate(
                range.earliestDate
            )} – ${formatNexpakFriendlyDate(
                range.latestDate
            )}`;

    });


    return range;

}


/*=========================================================
 83. GET DELIVERY CUTOFF INFORMATION
=========================================================*/

function getNexpakDeliveryCutoffInfo() {

    const now =
        new Date();


    const afterCutoff =
        isNexpakAfterCutoff(now);


    const cutoffHour =
        String(
            NEXPAK_DELIVERY_SCHEDULE
                .cutoffHour
        ).padStart(2, "0");


    const cutoffMinute =
        String(
            NEXPAK_DELIVERY_SCHEDULE
                .cutoffMinute
        ).padStart(2, "0");


    return {

        afterCutoff:
            afterCutoff,

        cutoffTime:
            `${cutoffHour}:${cutoffMinute}`,

        message:
            afterCutoff
                ? "Orders placed after the cut-off are processed on the next business day."
                : `Orders placed before ${cutoffHour}:${cutoffMinute} are processed today.`

    };

}


/*=========================================================
 84. DELIVERY BUSINESS-DAY SUMMARY
=========================================================*/

function getNexpakDeliveryBusinessDaySummary() {

    return {

        workingDays:
            [
                ...NEXPAK_DELIVERY_SCHEDULE
                    .workingDays
            ],

        weekendsExcluded:
            NEXPAK_DELIVERY_SCHEDULE
                .weekendsExcluded,

        publicHolidaysExcluded:
            NEXPAK_DELIVERY_SCHEDULE
                .publicHolidaysExcluded,

        cutoffTime:
            getNexpakDeliveryCutoffInfo()
                .cutoffTime

    };

}


/*=========================================================
 85. REFRESH DELIVERY SCHEDULE
=========================================================*/

function refreshNexpakDeliverySchedule() {

    updateNexpakEstimatedDeliveryDate();

    updateNexpakDeliveryScheduleDisplay();


    dispatchNexpakDeliveryEvent(
        "nexpak:delivery-schedule-updated",
        {
            estimatedDelivery:
                nexpakDeliveryState
                    .estimatedDelivery,

            dateRange:
                getNexpakCurrentDeliveryDateRange()
        }
    );


    return {

        estimatedDelivery:
            nexpakDeliveryState
                .estimatedDelivery,

        dateRange:
            getNexpakCurrentDeliveryDateRange()

    };

}


/*=========================================================
 86. EXPORT PART 5 FUNCTIONS
=========================================================*/

window.NEXPAK_DELIVERY_SCHEDULE =
    NEXPAK_DELIVERY_SCHEDULE;

window.NEXPAK_PUBLIC_HOLIDAYS =
    NEXPAK_PUBLIC_HOLIDAYS;

window.formatNexpakDeliveryDate =
    formatNexpakDeliveryDate;

window.isNexpakPublicHoliday =
    isNexpakPublicHoliday;

window.isNexpakBusinessDay =
    isNexpakBusinessDay;

window.getNexpakNextBusinessDay =
    getNexpakNextBusinessDay;

window.addNexpakBusinessDays =
    addNexpakBusinessDays;

window.isNexpakAfterCutoff =
    isNexpakAfterCutoff;

window.getNexpakDeliveryStartDate =
    getNexpakDeliveryStartDate;

window.calculateNexpakDeliveryDateRange =
    calculateNexpakDeliveryDateRange;

window.formatNexpakFriendlyDate =
    formatNexpakFriendlyDate;

window.getNexpakFriendlyDeliveryEstimate =
    getNexpakFriendlyDeliveryEstimate;

window.updateNexpakEstimatedDeliveryDate =
    updateNexpakEstimatedDeliveryDate;

window.getNexpakCurrentDeliveryDateRange =
    getNexpakCurrentDeliveryDateRange;

window.updateNexpakDeliveryScheduleDisplay =
    updateNexpakDeliveryScheduleDisplay;

window.getNexpakDeliveryCutoffInfo =
    getNexpakDeliveryCutoffInfo;

window.getNexpakDeliveryBusinessDaySummary =
    getNexpakDeliveryBusinessDaySummary;

window.refreshNexpakDeliverySchedule =
    refreshNexpakDeliverySchedule;


/*=========================================================
 END — onlinedelivery.js — PART 5/8
=========================================================*/

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 6/8
=========================================================*/


/*=========================================================
 87. DELIVERY TRACKING CONFIGURATION
=========================================================*/

const NEXPAK_TRACKING_CONFIG = {

    enabled: true,

    trackingPrefix: "NEX",

    referenceLength: 10,

    defaultStatus: "pending",

    trackingStorageKey:
        "nexpakDeliveryTracking",

    customerStatuses: [

        "pending",

        "processing",

        "ready",

        "dispatched",

        "in-transit",

        "out-for-delivery",

        "delivered",

        "collected",

        "cancelled",

        "exception"

    ]

};


/*=========================================================
 88. DELIVERY STATUS DEFINITIONS
=========================================================*/

const NEXPAK_DELIVERY_STATUSES = {

    pending: {

        id: "pending",

        label: "Order Received",

        description:
            "Your order has been received and is awaiting processing.",

        icon: "fa-clock",

        progress: 10

    },


    processing: {

        id: "processing",

        label: "Processing",

        description:
            "Your order is being prepared.",

        icon: "fa-box-open",

        progress: 25

    },


    ready: {

        id: "ready",

        label: "Ready",

        description:
            "Your order is ready for dispatch or collection.",

        icon: "fa-box",

        progress: 40

    },


    dispatched: {

        id: "dispatched",

        label: "Dispatched",

        description:
            "Your order has left NEXPAK and is on its way.",

        icon: "fa-truck",

        progress: 55

    },


    "in-transit": {

        id: "in-transit",

        label: "In Transit",

        description:
            "Your order is currently in transit.",

        icon: "fa-truck-fast",

        progress: 70

    },


    "out-for-delivery": {

        id: "out-for-delivery",

        label: "Out for Delivery",

        description:
            "Your order is with the delivery driver.",

        icon: "fa-location-dot",

        progress: 85

    },


    delivered: {

        id: "delivered",

        label: "Delivered",

        description:
            "Your order has been delivered.",

        icon: "fa-circle-check",

        progress: 100

    },


    collected: {

        id: "collected",

        label: "Collected",

        description:
            "Your order has been collected.",

        icon: "fa-circle-check",

        progress: 100

    },


    cancelled: {

        id: "cancelled",

        label: "Cancelled",

        description:
            "This delivery has been cancelled.",

        icon: "fa-circle-xmark",

        progress: 0

    },


    exception: {

        id: "exception",

        label: "Delivery Exception",

        description:
            "There is an issue affecting this delivery.",

        icon: "fa-triangle-exclamation",

        progress: 50

    }

};


/*=========================================================
 89. DELIVERY TRACKING STATE
=========================================================*/

let nexpakTrackingState = {

    trackingNumber: "",

    orderReference: "",

    status:
        NEXPAK_TRACKING_CONFIG.defaultStatus,

    method:
        "delivery",

    carrier: "",

    trackingUrl: "",

    dispatchedAt: null,

    deliveredAt: null,

    collectedAt: null,

    lastUpdated: null,

    notes: ""

};


/*=========================================================
 90. GENERATE TRACKING NUMBER
=========================================================*/

function generateNexpakTrackingNumber(
    orderReference = ""
) {

    const prefix =
        NEXPAK_TRACKING_CONFIG
            .trackingPrefix;


    const reference =
        String(orderReference || "")
            .replace(
                /[^A-Za-z0-9]/g,
                ""
            )
            .toUpperCase();


    const timestamp =
        Date.now()
            .toString(36)
            .toUpperCase();


    let tracking =
        `${prefix}-${timestamp}`;


    if (reference) {

        tracking =
            `${prefix}-${reference.slice(-6)}-${timestamp.slice(-4)}`;

    }


    return tracking;

}


/*=========================================================
 91. NORMALISE TRACKING NUMBER
=========================================================*/

function normalizeNexpakTrackingNumber(
    trackingNumber
) {

    if (!trackingNumber) {

        return "";

    }


    return String(
        trackingNumber
    )
        .trim()
        .toUpperCase();

}


/*=========================================================
 92. VALIDATE TRACKING NUMBER
=========================================================*/

function isValidNexpakTrackingNumber(
    trackingNumber
) {

    const value =
        normalizeNexpakTrackingNumber(
            trackingNumber
        );


    if (!value) {

        return false;

    }


    return value.startsWith(
        NEXPAK_TRACKING_CONFIG
            .trackingPrefix + "-"
    );

}


/*=========================================================
 93. GET DELIVERY STATUS
=========================================================*/

function getNexpakDeliveryStatus(
    status
) {

    const normalized =
        String(
            status ||
            NEXPAK_TRACKING_CONFIG
                .defaultStatus
        )
            .toLowerCase()
            .trim();


    return (
        NEXPAK_DELIVERY_STATUSES[
            normalized
        ] ||
        NEXPAK_DELIVERY_STATUSES.pending
    );

}


/*=========================================================
 94. SET DELIVERY STATUS
=========================================================*/

function setNexpakDeliveryStatus(
    status,
    options = {}
) {

    const normalized =
        String(status || "")
            .toLowerCase()
            .trim();


    if (
        !NEXPAK_DELIVERY_STATUSES[
            normalized
        ]
    ) {

        return {

            success: false,

            message:
                "Invalid delivery status."

        };

    }


    nexpakTrackingState.status =
        normalized;


    nexpakTrackingState.lastUpdated =
        new Date().toISOString();


    if (
        normalized ===
        "dispatched"
    ) {

        nexpakTrackingState.dispatchedAt =
            options.dispatchedAt ||
            new Date().toISOString();

    }


    if (
        normalized ===
        "delivered"
    ) {

        nexpakTrackingState.deliveredAt =
            options.deliveredAt ||
            new Date().toISOString();

    }


    if (
        normalized ===
        "collected"
    ) {

        nexpakTrackingState.collectedAt =
            options.collectedAt ||
            new Date().toISOString();

    }


    if (options.notes !== undefined) {

        nexpakTrackingState.notes =
            String(
                options.notes || ""
            );

    }


    saveNexpakTrackingState();


    dispatchNexpakDeliveryEvent(
        "nexpak:delivery-status-changed",
        {
            ...nexpakTrackingState
        }
    );


    updateNexpakTrackingInterface();


    return {

        success: true,

        status:
            getNexpakDeliveryStatus(
                normalized
            ),

        tracking:
            {
                ...nexpakTrackingState
            }

    };

}


/*=========================================================
 95. INITIALISE TRACKING
=========================================================*/

function initNexpakTracking(
    orderReference = "",
    method = "delivery",
    options = {}
) {

    const trackingNumber =
        normalizeNexpakTrackingNumber(
            options.trackingNumber
        ) ||
        generateNexpakTrackingNumber(
            orderReference
        );


    nexpakTrackingState = {

        trackingNumber:
            trackingNumber,

        orderReference:
            String(
                orderReference || ""
            ),

        status:
            options.status ||
            NEXPAK_TRACKING_CONFIG
                .defaultStatus,

        method:
            method,

        carrier:
            String(
                options.carrier || ""
            ),

        trackingUrl:
            String(
                options.trackingUrl || ""
            ),

        dispatchedAt:
            options.dispatchedAt ||
            null,

        deliveredAt:
            options.deliveredAt ||
            null,

        collectedAt:
            options.collectedAt ||
            null,

        lastUpdated:
            new Date().toISOString(),

        notes:
            String(
                options.notes || ""
            )

    };


    saveNexpakTrackingState();


    return {

        ...nexpakTrackingState

    };

}


/*=========================================================
 96. SAVE TRACKING STATE
=========================================================*/

function saveNexpakTrackingState() {

    try {

        localStorage.setItem(
            NEXPAK_TRACKING_CONFIG
                .trackingStorageKey,

            JSON.stringify(
                nexpakTrackingState
            )
        );


        return true;

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to save tracking state.",
            error
        );


        return false;

    }

}


/*=========================================================
 97. LOAD TRACKING STATE
=========================================================*/

function loadNexpakTrackingState() {

    try {

        const saved =
            localStorage.getItem(
                NEXPAK_TRACKING_CONFIG
                    .trackingStorageKey
            );


        if (!saved) {

            return nexpakTrackingState;

        }


        const parsed =
            JSON.parse(saved);


        if (
            parsed &&
            typeof parsed === "object"
        ) {

            nexpakTrackingState = {

                ...nexpakTrackingState,

                ...parsed

            };

        }

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to load tracking state.",
            error
        );

    }


    return {

        ...nexpakTrackingState

    };

}


/*=========================================================
 98. GET TRACKING STATE
=========================================================*/

function getNexpakTrackingState() {

    return {

        ...nexpakTrackingState

    };

}


/*=========================================================
 99. CLEAR TRACKING STATE
=========================================================*/

function clearNexpakTrackingState() {

    nexpakTrackingState = {

        trackingNumber: "",

        orderReference: "",

        status:
            NEXPAK_TRACKING_CONFIG
                .defaultStatus,

        method: "delivery",

        carrier: "",

        trackingUrl: "",

        dispatchedAt: null,

        deliveredAt: null,

        collectedAt: null,

        lastUpdated: null,

        notes: ""

    };


    try {

        localStorage.removeItem(
            NEXPAK_TRACKING_CONFIG
                .trackingStorageKey
        );

    } catch (error) {

        console.error(
            "NEXPAK Delivery: Unable to clear tracking state.",
            error
        );

    }


    return getNexpakTrackingState();

}


/*=========================================================
 100. GET STATUS PROGRESS
=========================================================*/

function getNexpakDeliveryProgress(
    status = null
) {

    const activeStatus =
        status ||
        nexpakTrackingState.status;


    return Number(
        getNexpakDeliveryStatus(
            activeStatus
        ).progress || 0
    );

}


/*=========================================================
 101. BUILD TRACKING TIMELINE
=========================================================*/

function buildNexpakTrackingTimeline() {

    const currentStatus =
        nexpakTrackingState.status;


    const statusOrder = [

        "pending",

        "processing",

        "ready",

        "dispatched",

        "in-transit",

        "out-for-delivery",

        "delivered"

    ];


    const currentIndex =
        statusOrder.indexOf(
            currentStatus
        );


    return statusOrder.map(
        (status, index) => {

            const definition =
                getNexpakDeliveryStatus(
                    status
                );


            return {

                ...definition,

                completed:
                    currentIndex >= index,

                current:
                    currentStatus === status,

                upcoming:
                    currentIndex < index

            };

        }
    );

}


/*=========================================================
 102. GET CUSTOMER TRACKING SUMMARY
=========================================================*/

function getNexpakTrackingSummary() {

    const status =
        getNexpakDeliveryStatus(
            nexpakTrackingState.status
        );


    return {

        trackingNumber:
            nexpakTrackingState
                .trackingNumber,

        orderReference:
            nexpakTrackingState
                .orderReference,

        status:
            status.id,

        statusLabel:
            status.label,

        description:
            status.description,

        progress:
            status.progress,

        carrier:
            nexpakTrackingState
                .carrier,

        trackingUrl:
            nexpakTrackingState
                .trackingUrl,

        estimatedDelivery:
            nexpakDeliveryState
                .estimatedDelivery,

        lastUpdated:
            nexpakTrackingState
                .lastUpdated

    };

}


/*=========================================================
 103. UPDATE TRACKING INTERFACE
=========================================================*/

function updateNexpakTrackingInterface() {

    const summary =
        getNexpakTrackingSummary();


    const statusElements =
        document.querySelectorAll(
            "[data-delivery-status]"
        );


    statusElements.forEach(
        element => {

            element.textContent =
                summary.statusLabel;

        }
    );


    const trackingElements =
        document.querySelectorAll(
            "[data-tracking-number]"
        );


    trackingElements.forEach(
        element => {

            element.textContent =
                summary.trackingNumber || "—";

        }
    );


    const progressElements =
        document.querySelectorAll(
            "[data-delivery-progress]"
        );


    progressElements.forEach(
        element => {

            element.style.width =
                `${summary.progress}%`;

            element.setAttribute(
                "aria-valuenow",
                String(
                    summary.progress
                )
            );

        }
    );


    const descriptionElements =
        document.querySelectorAll(
            "[data-delivery-status-description]"
        );


    descriptionElements.forEach(
        element => {

            element.textContent =
                summary.description;

        }
    );


    return summary;

}


/*=========================================================
 104. GET CUSTOMER TRACKING URL
=========================================================*/

function getNexpakTrackingUrl() {

    return (
        nexpakTrackingState
            .trackingUrl || ""
    );

}


/*=========================================================
 105. SET TRACKING URL
=========================================================*/

function setNexpakTrackingUrl(url) {

    if (!url) {

        nexpakTrackingState.trackingUrl =
            "";

    } else {

        try {

            const parsed =
                new URL(url);


            if (
                parsed.protocol !==
                    "http:" &&
                parsed.protocol !==
                    "https:"
            ) {

                return false;

            }


            nexpakTrackingState
                .trackingUrl =
                parsed.href;

        } catch (error) {

            return false;

        }

    }


    nexpakTrackingState.lastUpdated =
        new Date().toISOString();


    saveNexpakTrackingState();


    return true;

}


/*=========================================================
 106. EXPORT PART 6 FUNCTIONS
=========================================================*/

window.NEXPAK_TRACKING_CONFIG =
    NEXPAK_TRACKING_CONFIG;

window.NEXPAK_DELIVERY_STATUSES =
    NEXPAK_DELIVERY_STATUSES;

window.generateNexpakTrackingNumber =
    generateNexpakTrackingNumber;

window.normalizeNexpakTrackingNumber =
    normalizeNexpakTrackingNumber;

window.isValidNexpakTrackingNumber =
    isValidNexpakTrackingNumber;

window.getNexpakDeliveryStatus =
    getNexpakDeliveryStatus;

window.setNexpakDeliveryStatus =
    setNexpakDeliveryStatus;

window.initNexpakTracking =
    initNexpakTracking;

window.saveNexpakTrackingState =
    saveNexpakTrackingState;

window.loadNexpakTrackingState =
    loadNexpakTrackingState;

window.getNexpakTrackingState =
    getNexpakTrackingState;

window.clearNexpakTrackingState =
    clearNexpakTrackingState;

window.getNexpakDeliveryProgress =
    getNexpakDeliveryProgress;

window.buildNexpakTrackingTimeline =
    buildNexpakTrackingTimeline;

window.getNexpakTrackingSummary =
    getNexpakTrackingSummary;

window.updateNexpakTrackingInterface =
    updateNexpakTrackingInterface;

window.getNexpakTrackingUrl =
    getNexpakTrackingUrl;

window.setNexpakTrackingUrl =
    setNexpakTrackingUrl;


/*=========================================================
 END — onlinedelivery.js — PART 6/8
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 7/8
=========================================================*/


/*=========================================================
 107. CUSTOMER DELIVERY UI CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_DISPLAY = {

    trackingContainerSelectors: [
        "#delivery-tracking",
        "#deliveryTracking",
        "[data-delivery-tracking]"
    ],

    timelineSelectors: [
        "#delivery-timeline",
        "#deliveryTimeline",
        "[data-delivery-timeline]"
    ],

    statusSelectors: [
        "#delivery-status",
        "#deliveryStatus",
        "[data-delivery-status]"
    ],

    trackingNumberSelectors: [
        "#tracking-number",
        "#trackingNumber",
        "[data-tracking-number]"
    ],

    carrierSelectors: [
        "#delivery-carrier",
        "#deliveryCarrier",
        "[data-delivery-carrier]"
    ],

    estimateSelectors: [
        "#delivery-estimate",
        "#deliveryEstimate",
        "[data-delivery-estimate]"
    ],

    addressSelectors: [
        "#delivery-address-summary",
        "#deliveryAddressSummary",
        "[data-delivery-address-summary]"
    ],

    progressSelectors: [
        "#delivery-progress",
        "#deliveryProgress",
        "[data-delivery-progress]"
    ]

};


/*=========================================================
 108. FORMAT DELIVERY ADDRESS
=========================================================*/

function formatNexpakDeliveryAddress(
    address = null
) {

    if (!address) {

        return "";

    }


    const lines = [

        address.fullName,

        address.company,

        address.addressLine1,

        address.addressLine2,

        address.suburb,

        address.city,

        address.provinceName ||
            address.province,

        address.postalCode,

        address.country

    ];


    return lines
        .filter(
            value =>
                value &&
                String(value).trim()
        )
        .map(
            value =>
                String(value).trim()
        )
        .join(", ");

}


/*=========================================================
 109. UPDATE DELIVERY ADDRESS DISPLAY
=========================================================*/

function updateNexpakDeliveryAddressDisplay() {

    const address =
        nexpakDeliveryState.address;


    const formatted =
        formatNexpakDeliveryAddress(
            address
        );


    NEXPAK_DELIVERY_DISPLAY
        .addressSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        formatted ||
                        "No delivery address selected.";

                });

        });


    return formatted;

}


/*=========================================================
 110. BUILD TRACKING TIMELINE HTML
=========================================================*/

function renderNexpakTrackingTimeline() {

    const timeline =
        buildNexpakTrackingTimeline();


    if (!timeline.length) {

        return "";

    }


    return timeline.map(
        item => {

            const stateClass =
                item.current
                    ? "current"
                    : item.completed
                        ? "completed"
                        : "upcoming";


            return `

                <div
                    class="
                        nexpak-tracking-step
                        ${stateClass}
                    "
                    data-status="${escapeNexpakDeliveryHTML(
                        item.id
                    )}"
                >

                    <div class="tracking-step-icon">

                        <i
                            class="fa-solid ${escapeNexpakDeliveryHTML(
                                item.icon
                            )}"
                        ></i>

                    </div>


                    <div class="tracking-step-content">

                        <strong>
                            ${escapeNexpakDeliveryHTML(
                                item.label
                            )}
                        </strong>

                        <span>
                            ${escapeNexpakDeliveryHTML(
                                item.description
                            )}
                        </span>

                    </div>

                </div>

            `;

        }
    ).join("");

}


/*=========================================================
 111. RENDER TRACKING TIMELINE
=========================================================*/

function renderNexpakTrackingInterface(
    container = null
) {

    let target =
        container;


    if (!target) {

        for (
            const selector
            of NEXPAK_DELIVERY_DISPLAY
                .timelineSelectors
        ) {

            target =
                document.querySelector(
                    selector
                );


            if (target) {

                break;

            }

        }

    }


    if (!target) {

        return false;

    }


    target.innerHTML =
        renderNexpakTrackingTimeline();


    updateNexpakTrackingInterface();


    return true;

}


/*=========================================================
 112. UPDATE TRACKING NUMBER DISPLAY
=========================================================*/

function updateNexpakTrackingNumberDisplay() {

    const trackingNumber =
        nexpakTrackingState
            .trackingNumber ||
        "Not yet assigned";


    NEXPAK_DELIVERY_DISPLAY
        .trackingNumberSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        trackingNumber;

                });

        });


    return trackingNumber;

}


/*=========================================================
 113. UPDATE DELIVERY STATUS DISPLAY
=========================================================*/

function updateNexpakDeliveryStatusDisplay() {

    const status =
        getNexpakDeliveryStatus(
            nexpakTrackingState.status
        );


    NEXPAK_DELIVERY_DISPLAY
        .statusSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        status.label;

                    element.dataset.status =
                        status.id;

                });

        });


    return status;

}


/*=========================================================
 114. UPDATE CARRIER DISPLAY
=========================================================*/

function updateNexpakCarrierDisplay() {

    const carrier =
        nexpakTrackingState.carrier ||
        "NEXPAK Delivery";


    NEXPAK_DELIVERY_DISPLAY
        .carrierSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.textContent =
                        carrier;

                });

        });


    return carrier;

}


/*=========================================================
 115. UPDATE PROGRESS DISPLAY
=========================================================*/

function updateNexpakDeliveryProgressDisplay() {

    const progress =
        getNexpakDeliveryProgress();


    NEXPAK_DELIVERY_DISPLAY
        .progressSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.style.width =
                        `${progress}%`;

                    element.dataset.progress =
                        progress;

                    element.setAttribute(
                        "aria-valuenow",
                        String(progress)
                    );

                });

        });


    return progress;

}


/*=========================================================
 116. UPDATE COMPLETE CUSTOMER TRACKING UI
=========================================================*/

function updateNexpakCustomerTrackingUI() {

    const summary =
        getNexpakTrackingSummary();


    updateNexpakTrackingNumberDisplay();

    updateNexpakDeliveryStatusDisplay();

    updateNexpakCarrierDisplay();

    updateNexpakDeliveryProgressDisplay();

    updateNexpakDeliveryAddressDisplay();

    updateNexpakDeliveryEstimateDisplay();


    /*
     * Update tracking URL buttons.
     */

    const trackingUrl =
        getNexpakTrackingUrl();


    document
        .querySelectorAll(
            "[data-tracking-link]"
        )
        .forEach(element => {

            if (trackingUrl) {

                element.href =
                    trackingUrl;

                element.hidden =
                    false;

                element.target =
                    "_blank";

                element.rel =
                    "noopener noreferrer";

            } else {

                element.removeAttribute(
                    "href"
                );

                element.hidden =
                    true;

            }

        });


    /*
     * Update tracking container state.
     */

    NEXPAK_DELIVERY_DISPLAY
        .trackingContainerSelectors
        .forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.dataset.status =
                        summary.status;

                    element.dataset.progress =
                        summary.progress;

                });

        });


    return summary;

}


/*=========================================================
 117. DELIVERY STATUS MESSAGE
=========================================================*/

function getNexpakDeliveryStatusMessage(
    status = null
) {

    const definition =
        getNexpakDeliveryStatus(
            status ||
            nexpakTrackingState.status
        );


    return definition.description;

}


/*=========================================================
 118. SHOW DELIVERY NOTIFICATION
=========================================================*/

function showNexpakDeliveryNotification(
    message,
    type = "info"
) {

    if (!message) {

        return false;

    }


    let notification =
        document.querySelector(
            "#delivery-notification"
        );


    if (!notification) {

        notification =
            document.querySelector(
                "[data-delivery-notification]"
            );

    }


    if (!notification) {

        return false;

    }


    notification.className =
        `nexpak-delivery-notification ${type}`;


    notification.textContent =
        String(message);


    notification.hidden =
        false;


    return true;

}


/*=========================================================
 119. HIDE DELIVERY NOTIFICATION
=========================================================*/

function hideNexpakDeliveryNotification() {

    const notification =
        document.querySelector(
            "#delivery-notification"
        ) ||
        document.querySelector(
            "[data-delivery-notification]"
        );


    if (!notification) {

        return false;

    }


    notification.hidden =
        true;


    return true;

}


/*=========================================================
 120. DELIVERY STATUS NOTIFICATION
=========================================================*/

function notifyNexpakDeliveryStatusChange() {

    const status =
        getNexpakDeliveryStatus(
            nexpakTrackingState.status
        );


    let type =
        "info";


    if (
        status.id ===
        "delivered" ||
        status.id ===
        "collected"
    ) {

        type =
            "success";

    }


    if (
        status.id ===
        "exception" ||
        status.id ===
        "cancelled"
    ) {

        type =
            "warning";

    }


    showNexpakDeliveryNotification(
        status.description,
        type
    );


    return {

        status:
            status.id,

        message:
            status.description,

        type:
            type

    };

}


/*=========================================================
 121. DELIVERY TRACKING SEARCH
=========================================================*/

function findNexpakTrackingNumber(
    trackingNumber
) {

    const requested =
        normalizeNexpakTrackingNumber(
            trackingNumber
        );


    if (!requested) {

        return {

            found: false,

            message:
                "Please enter a tracking number."

        };

    }


    if (
        !isValidNexpakTrackingNumber(
            requested
        )
    ) {

        return {

            found: false,

            message:
                "Invalid NEXPAK tracking number."

        };

    }


    /*
     * Current browser session/local state.
     *
     * A production backend can replace this
     * lookup later without changing the
     * customer-facing API.
     */

    if (
        normalizeNexpakTrackingNumber(
            nexpakTrackingState
                .trackingNumber
        ) === requested
    ) {

        return {

            found: true,

            tracking:
                getNexpakTrackingState(),

            summary:
                getNexpakTrackingSummary()

        };

    }


    return {

        found: false,

        message:
            "Tracking information could not be found."

    };

}


/*=========================================================
 122. TRACKING SEARCH FORM
=========================================================*/

function bindNexpakTrackingSearch() {

    const forms =
        document.querySelectorAll(
            "#tracking-search-form, " +
            "#trackingSearchForm, " +
            "[data-tracking-search-form]"
        );


    forms.forEach(form => {

        if (
            form.dataset.nexpakBound ===
            "true"
        ) {

            return;

        }


        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const input =
                    form.querySelector(
                        'input[name="trackingNumber"], ' +
                        "#trackingNumberInput, " +
                        "[data-tracking-input]"
                    );


                if (!input) {

                    return;

                }


                const result =
                    findNexpakTrackingNumber(
                        input.value
                    );


                if (!result.found) {

                    showNexpakDeliveryNotification(
                        result.message,
                        "warning"
                    );


                    return;

                }


                hideNexpakDeliveryNotification();


                updateNexpakCustomerTrackingUI();

                renderNexpakTrackingInterface();

            }
        );


        form.dataset.nexpakBound =
            "true";

    });


    return true;

}


/*=========================================================
 123. BUILD DELIVERY ORDER METADATA
=========================================================*/

function buildNexpakDeliveryOrderMetadata() {

    const deliveryData =
        getNexpakCheckoutDeliveryData();


    const tracking =
        getNexpakTrackingState();


    return {

        fulfilmentMethod:
            deliveryData.method,

        deliveryType:
            deliveryData.deliveryType,

        deliveryZone:
            deliveryData.zone,

        deliveryAddress:
            deliveryData.address,

        deliveryProvince:
            deliveryData.province,

        deliveryCity:
            deliveryData.city,

        deliverySuburb:
            deliveryData.suburb,

        deliveryPostalCode:
            deliveryData.postalCode,

        deliveryCountry:
            deliveryData.country,

        deliveryFee:
            deliveryData.deliveryFee,

        estimatedDelivery:
            deliveryData.estimatedDelivery,

        deliveryTrackingNumber:
            tracking.trackingNumber,

        deliveryStatus:
            tracking.status,

        deliveryCarrier:
            tracking.carrier,

        deliveryTrackingUrl:
            tracking.trackingUrl,

        deliveryLastUpdated:
            tracking.lastUpdated

    };

}


/*=========================================================
 124. ATTACH DELIVERY DATA TO ORDER
=========================================================*/

function attachNexpakDeliveryToOrder(
    order = {}
) {

    if (
        !order ||
        typeof order !== "object"
    ) {

        order = {};

    }


    const metadata =
        buildNexpakDeliveryOrderMetadata();


    order.delivery =
        metadata;


    /*
     * Also expose commonly-used fields
     * at order level for compatibility.
     */

    order.deliveryMethod =
        metadata.fulfilmentMethod;

    order.deliveryFee =
        metadata.deliveryFee;

    order.deliveryAddress =
        metadata.deliveryAddress;

    order.deliveryStatus =
        metadata.deliveryStatus;

    order.trackingNumber =
        metadata.deliveryTrackingNumber;

    order.estimatedDelivery =
        metadata.estimatedDelivery;


    return order;

}


/*=========================================================
 125. DELIVERY CHECKOUT SUMMARY
=========================================================*/

function getNexpakDeliveryCheckoutSummary() {

    const data =
        getNexpakCheckoutDeliveryData();


    const tracking =
        getNexpakTrackingSummary();


    return {

        fulfilmentMethod:
            data.method,

        fulfilmentLabel:
            getNexpakDeliveryMethodLabel(
                data.method
            ),

        deliveryFee:
            data.deliveryFee,

        deliveryFeeFormatted:
            formatNexpakDeliveryCurrency(
                data.deliveryFee
            ),

        estimatedDelivery:
            data.estimatedDelivery,

        address:
            data.address,

        addressFormatted:
            formatNexpakDeliveryAddress(
                data.address
            ),

        trackingNumber:
            tracking.trackingNumber,

        status:
            tracking.status,

        statusLabel:
            tracking.statusLabel

    };

}


/*=========================================================
 126. EXPORT PART 7 FUNCTIONS
=========================================================*/

window.NEXPAK_DELIVERY_DISPLAY =
    NEXPAK_DELIVERY_DISPLAY;

window.formatNexpakDeliveryAddress =
    formatNexpakDeliveryAddress;

window.updateNexpakDeliveryAddressDisplay =
    updateNexpakDeliveryAddressDisplay;

window.renderNexpakTrackingTimeline =
    renderNexpakTrackingTimeline;

window.renderNexpakTrackingInterface =
    renderNexpakTrackingInterface;

window.updateNexpakTrackingNumberDisplay =
    updateNexpakTrackingNumberDisplay;

window.updateNexpakDeliveryStatusDisplay =
    updateNexpakDeliveryStatusDisplay;

window.updateNexpakCarrierDisplay =
    updateNexpakCarrierDisplay;

window.updateNexpakDeliveryProgressDisplay =
    updateNexpakDeliveryProgressDisplay;

window.updateNexpakCustomerTrackingUI =
    updateNexpakCustomerTrackingUI;

window.getNexpakDeliveryStatusMessage =
    getNexpakDeliveryStatusMessage;

window.showNexpakDeliveryNotification =
    showNexpakDeliveryNotification;

window.hideNexpakDeliveryNotification =
    hideNexpakDeliveryNotification;

window.notifyNexpakDeliveryStatusChange =
    notifyNexpakDeliveryStatusChange;

window.findNexpakTrackingNumber =
    findNexpakTrackingNumber;

window.bindNexpakTrackingSearch =
    bindNexpakTrackingSearch;

window.buildNexpakDeliveryOrderMetadata =
    buildNexpakDeliveryOrderMetadata;

window.attachNexpakDeliveryToOrder =
    attachNexpakDeliveryToOrder;

window.getNexpakDeliveryCheckoutSummary =
    getNexpakDeliveryCheckoutSummary;


/*=========================================================
 END — onlinedelivery.js — PART 7/8
=========================================================*/

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DELIVERY ENGINE
 File: onlinedelivery.js
 Version: 1.0
 Part: 8/8 — FINAL
=========================================================*/


/*=========================================================
 127. DELIVERY ENGINE FINAL CONFIGURATION
=========================================================*/

const NEXPAK_DELIVERY_ENGINE = {

    version: "1.0",

    file: "onlinedelivery.js",

    status: "production-ready",

    initialized: false,

    initializedAt: null,

    storageVersion: "1.0",

    country: "South Africa",

    currency: "ZAR"

};


/*=========================================================
 128. FINAL DELIVERY VALIDATION
=========================================================*/

function validateNexpakDeliveryEngine() {

    const errors = [];


    /*---------------------------------------------
     DELIVERY METHOD
    ---------------------------------------------*/

    if (
        !nexpakDeliveryState.method
    ) {

        errors.push(
            "Delivery method has not been selected."
        );

    }


    if (
        nexpakDeliveryState.method &&
        !NEXPAK_DELIVERY_METHODS[
            nexpakDeliveryState.method
        ]
    ) {

        errors.push(
            "Selected delivery method is invalid."
        );

    }


    /*---------------------------------------------
     COLLECTION
    ---------------------------------------------*/

    if (
        nexpakDeliveryState.method ===
        "collection"
    ) {

        return {

            valid:
                errors.length === 0,

            errors: errors

        };

    }


    /*---------------------------------------------
     DELIVERY ADDRESS
    ---------------------------------------------*/

    if (
        nexpakDeliveryState.method ===
            "delivery" ||
        nexpakDeliveryState.method ===
            "express"
    ) {

        const validation =
            validateNexpakFulfilment();


        if (!validation.valid) {

            errors.push(
                ...validation.errors
            );

        }

    }


    /*---------------------------------------------
     DELIVERY ZONE
    ---------------------------------------------*/

    if (
        nexpakDeliveryState.zone &&
        !NEXPAK_DELIVERY_ZONES[
            nexpakDeliveryState.zone
        ]
    ) {

        errors.push(
            "Delivery zone is invalid."
        );

    }


    return {

        valid:
            errors.length === 0,

        errors:
            [
                ...new Set(errors)
            ]

    };

}


/*=========================================================
 129. FINALISE DELIVERY DATA
=========================================================*/

function finalizeNexpakDeliveryData() {

    const validation =
        validateNexpakDeliveryEngine();


    if (!validation.valid) {

        return {

            success: false,

            valid: false,

            errors:
                validation.errors,

            data:
                getNexpakCheckoutDeliveryData()

        };

    }


    /*
     * Make sure delivery fee is current.
     */

    const subtotal =
        getNexpakActiveCheckoutSubtotal();


    updateNexpakDeliveryFee(
        subtotal
    );


    /*
     * Update delivery dates.
     */

    updateNexpakEstimatedDeliveryDate();


    /*
     * Create tracking state if required.
     */

    if (
        !nexpakTrackingState
            .trackingNumber
    ) {

        initNexpakTracking(

            "",

            nexpakDeliveryState.method

        );

    }


    const data =
        getNexpakCheckoutDeliveryData();


    saveNexpakDeliveryState();

    saveNexpakTrackingState();


    return {

        success: true,

        valid: true,

        errors: [],

        data: data,

        tracking:
            getNexpakTrackingState()

    };

}


/*=========================================================
 130. PREPARE ORDER DELIVERY
=========================================================*/

function prepareNexpakOrderDelivery(
    order = {}
) {

    const finalized =
        finalizeNexpakDeliveryData();


    if (!finalized.success) {

        return {

            success: false,

            valid: false,

            errors:
                finalized.errors,

            order: order

        };

    }


    const updatedOrder =
        attachNexpakDeliveryToOrder(
            order
        );


    return {

        success: true,

        valid: true,

        errors: [],

        order:
            updatedOrder,

        delivery:
            finalized.data,

        tracking:
            finalized.tracking

    };

}


/*=========================================================
 131. DELIVERY CHECKOUT HOOK
=========================================================*/

function nexpakDeliveryCheckoutHook(
    order = {}
) {

    const prepared =
        prepareNexpakOrderDelivery(
            order
        );


    if (!prepared.success) {

        return {

            success: false,

            order: order,

            errors:
                prepared.errors

        };

    }


    dispatchNexpakDeliveryEvent(
        "nexpak:order-delivery-prepared",
        {
            order:
                prepared.order,

            delivery:
                prepared.delivery,

            tracking:
                prepared.tracking

        }
    );


    return prepared;

}


/*=========================================================
 132. LISTEN FOR CHECKOUT COMPLETION
=========================================================*/

function bindNexpakDeliveryCheckoutHook() {

    const checkoutEvents = [

        "nexpak:checkout-complete",

        "nexpak:order-created",

        "checkoutComplete",

        "orderCreated"

    ];


    checkoutEvents.forEach(
        eventName => {

            document.addEventListener(
                eventName,
                function(event) {

                    const detail =
                        event.detail || {};


                    const order =
                        detail.order ||
                        detail;


                    /*
                     * Do not block the checkout
                     * event itself. Prepare the
                     * delivery metadata separately.
                     */

                    const result =
                        prepareNexpakOrderDelivery(
                            order
                        );


                    if (
                        result.success
                    ) {

                        dispatchNexpakDeliveryEvent(
                            "nexpak:delivery-attached",
                            {
                                order:
                                    result.order,

                                delivery:
                                    result.delivery,

                                tracking:
                                    result.tracking
                            }
                        );

                    }

                }
            );

        }
    );


    return true;

}


/*=========================================================
 133. DELIVERY STATE SYNCHRONISATION
=========================================================*/

function syncNexpakDeliveryState() {

    /*
     * Reload saved delivery information.
     */

    loadNexpakDeliveryState();


    /*
     * Reload tracking information.
     */

    loadNexpakTrackingState();


    /*
     * Validate method.
     */

    if (
        !NEXPAK_DELIVERY_METHODS[
            nexpakDeliveryState.method
        ]
    ) {

        nexpakDeliveryState.method =
            NEXPAK_DELIVERY_CONFIG
                .defaultMethod;

    }


    /*
     * Validate zone.
     */

    if (
        !NEXPAK_DELIVERY_ZONES[
            nexpakDeliveryState.zone
        ]
    ) {

        nexpakDeliveryState.zone =
            NEXPAK_DELIVERY_CONFIG
                .defaultZone;

    }


    /*
     * Recalculate fee.
     */

    const subtotal =
        getNexpakActiveCheckoutSubtotal();


    updateNexpakDeliveryFee(
        subtotal
    );


    /*
     * Refresh estimated delivery.
     */

    updateNexpakEstimatedDeliveryDate();


    return {

        delivery:
            getNexpakDeliveryState(),

        tracking:
            getNexpakTrackingState()

    };

}


/*=========================================================
 134. DELIVERY STORAGE CLEANUP
=========================================================*/

function cleanupNexpakDeliveryStorage() {

    /*
     * Keep active delivery information,
     * but remove invalid/empty tracking data.
     */

    loadNexpakTrackingState();


    if (
        !nexpakTrackingState
            .trackingNumber
    ) {

        nexpakTrackingState = {

            trackingNumber: "",

            orderReference: "",

            status:
                NEXPAK_TRACKING_CONFIG
                    .defaultStatus,

            method:
                nexpakDeliveryState.method,

            carrier: "",

            trackingUrl: "",

            dispatchedAt: null,

            deliveredAt: null,

            collectedAt: null,

            lastUpdated: null,

            notes: ""

        };


        saveNexpakTrackingState();

    }


    return true;

}


/*=========================================================
 135. FINAL DELIVERY UI REFRESH
=========================================================*/

function refreshNexpakDeliveryUI() {

    /*
     * Checkout
     */

    updateNexpakCheckoutTotalDisplay();


    /*
     * Fulfilment
     */

    updateNexpakFulfilmentUI();


    /*
     * Scheduling
     */

    refreshNexpakDeliverySchedule();


    /*
     * Tracking
     */

    updateNexpakCustomerTrackingUI();


    /*
     * Timeline
     */

    renderNexpakTrackingInterface();


    /*
     * Tracking search
     */

    bindNexpakTrackingSearch();


    /*
     * Delivery methods
     */

    bindNexpakDeliveryMethodEvents();


    return true;

}


/*=========================================================
 136. FINAL DELIVERY ENGINE INITIALISATION
=========================================================*/

function initNexpakDeliveryEngine() {

    /*
     * Prevent duplicate initialisation.
     */

    if (
        NEXPAK_DELIVERY_ENGINE
            .initialized
    ) {

        return {

            initialized: true,

            alreadyInitialized: true

        };

    }


    /*---------------------------------------------
     STEP 1 — DELIVERY STATE
    ---------------------------------------------*/

    initNexpakDelivery();


    /*---------------------------------------------
     STEP 2 — TRACKING STATE
    ---------------------------------------------*/

    loadNexpakTrackingState();


    /*---------------------------------------------
     STEP 3 — CLEAN STORAGE
    ---------------------------------------------*/

    cleanupNexpakDeliveryStorage();


    /*---------------------------------------------
     STEP 4 — CHECKOUT
    ---------------------------------------------*/

    initNexpakCheckoutDelivery();


    /*---------------------------------------------
     STEP 5 — CHECKOUT HOOK
    ---------------------------------------------*/

    bindNexpakDeliveryCheckoutHook();


    /*---------------------------------------------
     STEP 6 — TRACKING
    ---------------------------------------------*/

    bindNexpakTrackingSearch();


    /*---------------------------------------------
     STEP 7 — SYNCHRONISE
    ---------------------------------------------*/

    syncNexpakDeliveryState();


    /*---------------------------------------------
     STEP 8 — UI
    ---------------------------------------------*/

    refreshNexpakDeliveryUI();


    /*---------------------------------------------
     FINAL STATE
    ---------------------------------------------*/

    NEXPAK_DELIVERY_ENGINE
        .initialized = true;


    NEXPAK_DELIVERY_ENGINE
        .initializedAt =
        new Date().toISOString();


    return {

        initialized: true,

        alreadyInitialized: false,

        initializedAt:
            NEXPAK_DELIVERY_ENGINE
                .initializedAt,

        delivery:
            getNexpakDeliveryState(),

        tracking:
            getNexpakTrackingState()

    };

}


/*=========================================================
 137. RESET DELIVERY ENGINE
=========================================================*/

function resetNexpakDeliveryEngine() {

    clearNexpakDeliveryState();

    clearNexpakTrackingState();


    NEXPAK_DELIVERY_ENGINE
        .initialized = false;


    NEXPAK_DELIVERY_ENGINE
        .initializedAt = null;


    return true;

}


/*=========================================================
 138. GET COMPLETE DELIVERY SNAPSHOT
=========================================================*/

function getNexpakDeliverySnapshot() {

    return {

        engine: {
            ...NEXPAK_DELIVERY_ENGINE
        },

        delivery: {
            ...getNexpakDeliveryState()
        },

        checkout:
            getNexpakCheckoutDeliveryData(),

        tracking: {
            ...getNexpakTrackingState()
        },

        trackingSummary:
            getNexpakTrackingSummary(),

        schedule:
            getNexpakCurrentDeliveryDateRange(),

        validation:
            validateNexpakDeliveryEngine()

    };

}


/*=========================================================
 139. FINAL GLOBAL API
=========================================================*/

window.NEXPAK_DELIVERY_ENGINE =
    NEXPAK_DELIVERY_ENGINE;

window.validateNexpakDeliveryEngine =
    validateNexpakDeliveryEngine;

window.finalizeNexpakDeliveryData =
    finalizeNexpakDeliveryData;

window.prepareNexpakOrderDelivery =
    prepareNexpakOrderDelivery;

window.nexpakDeliveryCheckoutHook =
    nexpakDeliveryCheckoutHook;

window.bindNexpakDeliveryCheckoutHook =
    bindNexpakDeliveryCheckoutHook;

window.syncNexpakDeliveryState =
    syncNexpakDeliveryState;

window.cleanupNexpakDeliveryStorage =
    cleanupNexpakDeliveryStorage;

window.refreshNexpakDeliveryUI =
    refreshNexpakDeliveryUI;

window.initNexpakDeliveryEngine =
    initNexpakDeliveryEngine;

window.resetNexpakDeliveryEngine =
    resetNexpakDeliveryEngine;

window.getNexpakDeliverySnapshot =
    getNexpakDeliverySnapshot;


/*=========================================================
 140. FINAL AUTO INITIALISATION
=========================================================*/

function startNexpakDeliveryEngine() {

    try {

        initNexpakDeliveryEngine();

    } catch (error) {

        console.error(
            "NEXPAK Delivery Engine initialization failed:",
            error
        );


        dispatchNexpakDeliveryEvent(
            "nexpak:delivery-engine-error",
            {
                error:
                    error.message ||
                    String(error)
            }
        );

    }

}


/*=========================================================
 DOM READY
=========================================================*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startNexpakDeliveryEngine,
        {
            once: true
        }
    );

} else {

    startNexpakDeliveryEngine();

}


/*=========================================================
 END — onlinedelivery.js — PART 8/8
=========================================================*/


/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 DELIVERY ENGINE — FILE COMPLETE
=========================================================*/
