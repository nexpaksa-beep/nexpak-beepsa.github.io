/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 1/8
 Version: 1.0
=========================================================*/

/*=========================================================
 CONFIGURATOR ENGINE — FOUNDATION
=========================================================*/

(function () {
    "use strict";

    /*=====================================================
     GLOBAL CONFIGURATOR NAMESPACE
    =====================================================*/

    window.NexpakConfigurator = window.NexpakConfigurator || {};

    const Configurator = window.NexpakConfigurator;


    /*=====================================================
     CONFIGURATOR VERSION
    =====================================================*/

    Configurator.version = "1.0.0";

    Configurator.status = "initializing";


    /*=====================================================
     STORAGE KEY
    =====================================================*/

    Configurator.storageKey = "nexpak_online_configurator";


    /*=====================================================
     CONFIGURATOR STATE
    =====================================================*/

    Configurator.state = {

        active: false,

        productId: null,

        product: null,

        configurationId: null,

        configurationName: "",

        options: {},

        quantities: {},

        extras: [],

        calculated: {

            subtotal: 0,

            extrasTotal: 0,

            total: 0
        },

        validation: {

            valid: false,

            errors: []
        },

        timestamp: null
    };


    /*=====================================================
     UTILITY — GENERATE CONFIGURATION ID
    =====================================================*/

    Configurator.generateId = function () {

        const timestamp = Date.now();

        const random = Math.random()
            .toString(36)
            .substring(2, 8);

        return "CFG-" + timestamp + "-" + random.toUpperCase();
    };


    /*=====================================================
     UTILITY — SAFE NUMBER
    =====================================================*/

    Configurator.toNumber = function (value, fallback = 0) {

        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : fallback;
    };


    /*=====================================================
     UTILITY — SAFE STRING
    =====================================================*/

    Configurator.toString = function (value, fallback = "") {

        if (value === null || value === undefined) {
            return fallback;
        }

        return String(value);
    };


    /*=====================================================
     UTILITY — CLONE OBJECT
    =====================================================*/

    Configurator.clone = function (object) {

        if (object === null || object === undefined) {
            return object;
        }

        try {

            return JSON.parse(
                JSON.stringify(object)
            );

        } catch (error) {

            console.error(
                "[NexpakConfigurator] Clone error:",
                error
            );

            return object;
        }
    };


    /*=====================================================
     UTILITY — CREATE EMPTY CONFIGURATION
    =====================================================*/

    Configurator.createEmptyState = function () {

        return {

            active: false,

            productId: null,

            product: null,

            configurationId: Configurator.generateId(),

            configurationName: "",

            options: {},

            quantities: {},

            extras: [],

            calculated: {

                subtotal: 0,

                extrasTotal: 0,

                total: 0
            },

            validation: {

                valid: false,

                errors: []
            },

            timestamp: new Date().toISOString()
        };
    };


    /*=====================================================
     RESET CONFIGURATOR
    =====================================================*/

    Configurator.reset = function () {

        Configurator.state =
            Configurator.createEmptyState();

        Configurator.save();

        return Configurator.state;
    };


    /*=====================================================
     START CONFIGURATION
    =====================================================*/

    Configurator.start = function (productId, productData = null) {

        Configurator.reset();

        Configurator.state.active = true;

        Configurator.state.productId =
            productId || null;

        Configurator.state.product =
            productData
                ? Configurator.clone(productData)
                : Configurator.findProduct(productId);

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return Configurator.state;
    };


    /*=====================================================
     SET PRODUCT
    =====================================================*/

    Configurator.setProduct = function (productId, productData = null) {

        Configurator.state.productId =
            productId || null;

        Configurator.state.product =
            productData
                ? Configurator.clone(productData)
                : Configurator.findProduct(productId);

        Configurator.state.active =
            !!Configurator.state.product;

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return Configurator.state.product;
    };


    /*=====================================================
     GET CURRENT PRODUCT
    =====================================================*/

    Configurator.getProduct = function () {

        return Configurator.state.product;
    };


    /*=====================================================
     GET CURRENT CONFIGURATION
    =====================================================*/

    Configurator.getState = function () {

        return Configurator.clone(
            Configurator.state
        );
    };


    /*=====================================================
     FIND PRODUCT
     
     Supports the existing NEXPAK online database
     without assuming one specific database structure.
    =====================================================*/

    Configurator.findProduct = function (productId) {

        if (!productId) {
            return null;
        }

        const possibleSources = [

            window.onlineProducts,

            window.onlineData,

            window.NexpakOnlineData,

            window.products,

            window.productDatabase,

            window.shopData
        ];

        for (const source of possibleSources) {

            if (!source) {
                continue;
            }

            let product = null;

            /*---------------------------------------------
             ARRAY DATABASE
            ---------------------------------------------*/

            if (Array.isArray(source)) {

                product = source.find(item => {

                    if (!item) {
                        return false;
                    }

                    return (
                        item.id == productId ||
                        item.productId == productId ||
                        item.sku == productId ||
                        item.code == productId
                    );
                });
            }

            /*---------------------------------------------
             OBJECT DATABASE
            ---------------------------------------------*/

            else if (
                typeof source === "object"
            ) {

                product =
                    source[productId] ||
                    source.products?.[productId] ||
                    null;

                if (!product && Array.isArray(source.products)) {

                    product = source.products.find(item => {

                        if (!item) {
                            return false;
                        }

                        return (
                            item.id == productId ||
                            item.productId == productId ||
                            item.sku == productId ||
                            item.code == productId
                        );
                    });
                }
            }

            if (product) {

                return Configurator.clone(
                    product
                );
            }
        }

        return null;
    };


    /*=====================================================
     SET OPTION
    =====================================================*/

    Configurator.setOption = function (key, value) {

        if (!key) {
            return false;
        }

        Configurator.state.options[key] =
            Configurator.clone(value);

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return true;
    };


    /*=====================================================
     GET OPTION
    =====================================================*/

    Configurator.getOption = function (key) {

        if (!key) {
            return undefined;
        }

        return Configurator.state.options[key];
    };


    /*=====================================================
     REMOVE OPTION
    =====================================================*/

    Configurator.removeOption = function (key) {

        if (!key) {
            return false;
        }

        delete Configurator.state.options[key];

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return true;
    };


    /*=====================================================
     SET QUANTITY
    =====================================================*/

    Configurator.setQuantity = function (key, quantity) {

        if (!key) {
            return false;
        }

        quantity =
            Math.max(
                0,
                Math.floor(
                    Configurator.toNumber(quantity)
                )
            );

        Configurator.state.quantities[key] =
            quantity;

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return quantity;
    };


    /*=====================================================
     GET QUANTITY
    =====================================================*/

    Configurator.getQuantity = function (key) {

        return Configurator.toNumber(
            Configurator.state.quantities[key],
            0
        );
    };


    /*=====================================================
     ADD EXTRA
    =====================================================*/

    Configurator.addExtra = function (extra) {

        if (!extra) {
            return false;
        }

        const item =
            Configurator.clone(extra);

        if (!item.id) {

            item.id =
                item.sku ||
                item.code ||
                Configurator.generateId();
        }

        Configurator.state.extras.push(item);

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return item;
    };


    /*=====================================================
     REMOVE EXTRA
    =====================================================*/

    Configurator.removeExtra = function (extraId) {

        if (!extraId) {
            return false;
        }

        const before =
            Configurator.state.extras.length;

        Configurator.state.extras =
            Configurator.state.extras.filter(item => {

                return (
                    item.id != extraId &&
                    item.sku != extraId &&
                    item.code != extraId
                );
            });

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return (
            before !==
            Configurator.state.extras.length
        );
    };


    /*=====================================================
     VALIDATION FOUNDATION
    =====================================================*/

    Configurator.validate = function () {

        const errors = [];

        const state =
            Configurator.state;

        if (!state.productId) {

            errors.push(
                "No product has been selected."
            );
        }

        if (!state.product) {

            errors.push(
                "Product information is unavailable."
            );
        }

        state.validation = {

            valid:
                errors.length === 0,

            errors
        };

        Configurator.save();

        return state.validation;
    };


    /*=====================================================
     LOCAL STORAGE — SAVE
    =====================================================*/

    Configurator.save = function () {

        try {

            localStorage.setItem(
                Configurator.storageKey,
                JSON.stringify(
                    Configurator.state
                )
            );

            return true;

        } catch (error) {

            console.warn(
                "[NexpakConfigurator] Unable to save configuration:",
                error
            );

            return false;
        }
    };


    /*=====================================================
     LOCAL STORAGE — LOAD
    =====================================================*/

    Configurator.load = function () {

        try {

            const stored =
                localStorage.getItem(
                    Configurator.storageKey
                );

            if (!stored) {
                return false;
            }

            const parsed =
                JSON.parse(stored);

            if (
                !parsed ||
                typeof parsed !== "object"
            ) {
                return false;
            }

            Configurator.state = {

                ...Configurator.createEmptyState(),

                ...parsed,

                options:
                    parsed.options || {},

                quantities:
                    parsed.quantities || {},

                extras:
                    Array.isArray(parsed.extras)
                        ? parsed.extras
                        : [],

                calculated:
                    parsed.calculated || {
                        subtotal: 0,
                        extrasTotal: 0,
                        total: 0
                    },

                validation:
                    parsed.validation || {
                        valid: false,
                        errors: []
                    }
            };

            return true;

        } catch (error) {

            console.warn(
                "[NexpakConfigurator] Unable to load configuration:",
                error
            );

            return false;
        }
    };


    /*=====================================================
     CLEAR SAVED CONFIGURATION
    =====================================================*/

    Configurator.clearSaved = function () {

        try {

            localStorage.removeItem(
                Configurator.storageKey
            );

            return true;

        } catch (error) {

            console.warn(
                "[NexpakConfigurator] Unable to clear storage:",
                error
            );

            return false;
        }
    };


    /*=====================================================
     INITIALIZE
    =====================================================*/

    Configurator.init = function () {

        const restored =
            Configurator.load();

        if (!restored) {

            Configurator.state =
                Configurator.createEmptyState();
        }

        Configurator.status =
            "ready";

        console.log(
            "[NexpakConfigurator] v" +
            Configurator.version +
            " initialized."
        );

        return Configurator.getState();
    };


    /*=====================================================
     AUTO INITIALIZE
    =====================================================*/

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            Configurator.init
        );

    } else {

        Configurator.init();
    }


    /*=====================================================
     PART 1 COMPLETE
    =====================================================*/

    console.log(
        "[NexpakConfigurator] Part 1/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 2/8
=========================================================*/

/*=========================================================
 CONFIGURATION DEFINITIONS & DYNAMIC OPTIONS
=========================================================*/

(function () {
    "use strict";

    const Configurator = window.NexpakConfigurator;

    if (!Configurator) {
        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 2."
        );
        return;
    }


    /*=====================================================
     CONFIGURATION DEFINITIONS
    =====================================================*/

    Configurator.definitions = {

        /*=================================================
         CCTV SYSTEMS
        =================================================*/

        CCTV: {

            name: "CCTV System",

            options: {

                cameraType: {
                    label: "Camera Type",
                    type: "select",
                    required: true,

                    values: [
                        {
                            id: "analog",
                            label: "Analog CCTV",
                            price: 0
                        },
                        {
                            id: "ip",
                            label: "IP CCTV",
                            price: 0
                        },
                        {
                            id: "wifi",
                            label: "WiFi CCTV",
                            price: 0
                        }
                    ]
                },

                cameraCount: {
                    label: "Number of Cameras",
                    type: "number",
                    required: true,
                    min: 1,
                    max: 64,
                    default: 4
                },

                recorder: {
                    label: "Recorder",
                    type: "select",
                    required: true,

                    values: [
                        {
                            id: "dvr",
                            label: "DVR",
                            price: 0
                        },
                        {
                            id: "nvr",
                            label: "NVR",
                            price: 0
                        }
                    ]
                },

                storage: {
                    label: "Storage",
                    type: "select",

                    values: [
                        {
                            id: "1tb",
                            label: "1TB",
                            price: 0
                        },
                        {
                            id: "2tb",
                            label: "2TB",
                            price: 0
                        },
                        {
                            id: "4tb",
                            label: "4TB",
                            price: 0
                        },
                        {
                            id: "6tb",
                            label: "6TB",
                            price: 0
                        },
                        {
                            id: "8tb",
                            label: "8TB",
                            price: 0
                        }
                    ]
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         IP CCTV
        =================================================*/

        IP_CCTV: {

            name: "IP CCTV System",

            options: {

                cameraCount: {
                    label: "Number of IP Cameras",
                    type: "number",
                    required: true,
                    min: 1,
                    max: 64,
                    default: 4
                },

                resolution: {
                    label: "Camera Resolution",
                    type: "select",

                    values: [
                        {
                            id: "2mp",
                            label: "2MP",
                            price: 0
                        },
                        {
                            id: "4mp",
                            label: "4MP",
                            price: 0
                        },
                        {
                            id: "5mp",
                            label: "5MP",
                            price: 0
                        },
                        {
                            id: "8mp",
                            label: "8MP / 4K",
                            price: 0
                        }
                    ]
                },

                nightVision: {
                    label: "Night Vision",
                    type: "select",

                    values: [
                        {
                            id: "standard",
                            label: "Standard IR",
                            price: 0
                        },
                        {
                            id: "color",
                            label: "Color Night Vision",
                            price: 0
                        }
                    ]
                },

                storage: {
                    label: "Storage",
                    type: "select",

                    values: [
                        {
                            id: "1tb",
                            label: "1TB",
                            price: 0
                        },
                        {
                            id: "2tb",
                            label: "2TB",
                            price: 0
                        },
                        {
                            id: "4tb",
                            label: "4TB",
                            price: 0
                        },
                        {
                            id: "8tb",
                            label: "8TB",
                            price: 0
                        }
                    ]
                },

                poe: {
                    label: "PoE Network",
                    type: "select",

                    values: [
                        {
                            id: "standard",
                            label: "Standard PoE",
                            price: 0
                        },
                        {
                            id: "managed",
                            label: "Managed PoE",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         ELECTRIC FENCING
        =================================================*/

        ELECTRIC_FENCE: {

            name: "Electric Fence",

            options: {

                fenceLength: {
                    label: "Fence Length",
                    type: "number",
                    required: true,
                    min: 1,
                    max: 5000,
                    default: 50
                },

                strands: {
                    label: "Number of Strands",
                    type: "select",

                    values: [
                        {
                            id: "4",
                            label: "4 Strands",
                            price: 0
                        },
                        {
                            id: "6",
                            label: "6 Strands",
                            price: 0
                        },
                        {
                            id: "8",
                            label: "8 Strands",
                            price: 0
                        },
                        {
                            id: "10",
                            label: "10 Strands",
                            price: 0
                        }
                    ]
                },

                energizer: {
                    label: "Energizer",
                    type: "select",

                    values: [
                        {
                            id: "standard",
                            label: "Standard Energizer",
                            price: 0
                        },
                        {
                            id: "heavy",
                            label: "Heavy Duty Energizer",
                            price: 0
                        },
                        {
                            id: "commercial",
                            label: "Commercial Energizer",
                            price: 0
                        }
                    ]
                },

                gateCoverage: {
                    label: "Gate Coverage",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "No Gate Coverage",
                            price: 0
                        },
                        {
                            id: "single",
                            label: "Single Gate",
                            price: 0
                        },
                        {
                            id: "double",
                            label: "Double Gate",
                            price: 0
                        }
                    ]
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         GATE AUTOMATION
        =================================================*/

        GATE_AUTOMATION: {

            name: "Gate Automation",

            options: {

                gateType: {
                    label: "Gate Type",
                    type: "select",

                    values: [
                        {
                            id: "swing",
                            label: "Swing Gate",
                            price: 0
                        },
                        {
                            id: "sliding",
                            label: "Sliding Gate",
                            price: 0
                        }
                    ]
                },

                gateWeight: {
                    label: "Gate Weight",
                    type: "select",

                    values: [
                        {
                            id: "light",
                            label: "Up to 300kg",
                            price: 0
                        },
                        {
                            id: "medium",
                            label: "300kg – 500kg",
                            price: 0
                        },
                        {
                            id: "heavy",
                            label: "500kg – 800kg",
                            price: 0
                        },
                        {
                            id: "commercial",
                            label: "800kg+ / Commercial",
                            price: 0
                        }
                    ]
                },

                remotes: {
                    label: "Remote Controls",
                    type: "number",
                    min: 1,
                    max: 20,
                    default: 2
                },

                batteryBackup: {
                    label: "Battery Backup",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "No Battery Backup",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Battery Backup",
                            price: 0
                        },
                        {
                            id: "extended",
                            label: "Extended Battery Backup",
                            price: 0
                        }
                    ]
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         ALARM SYSTEMS
        =================================================*/

        ALARM: {

            name: "Alarm System",

            options: {

                zones: {
                    label: "Number of Zones",
                    type: "number",
                    required: true,
                    min: 1,
                    max: 128,
                    default: 8
                },

                sensors: {
                    label: "Motion Sensors",
                    type: "number",
                    min: 0,
                    max: 64,
                    default: 2
                },

                remotes: {
                    label: "Remote Controls",
                    type: "number",
                    min: 0,
                    max: 20,
                    default: 2
                },

                gsm: {
                    label: "GSM / LTE Module",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "No GSM / LTE",
                            price: 0
                        },
                        {
                            id: "gsm",
                            label: "GSM Module",
                            price: 0
                        },
                        {
                            id: "lte",
                            label: "LTE Module",
                            price: 0
                        }
                    ]
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         ACCESS CONTROL
        =================================================*/

        ACCESS_CONTROL: {

            name: "Access Control",

            options: {

                doors: {
                    label: "Number of Doors",
                    type: "number",
                    required: true,
                    min: 1,
                    max: 32,
                    default: 1
                },

                reader: {
                    label: "Reader Type",
                    type: "select",

                    values: [
                        {
                            id: "rfid",
                            label: "RFID",
                            price: 0
                        },
                        {
                            id: "fingerprint",
                            label: "Fingerprint",
                            price: 0
                        },
                        {
                            id: "face",
                            label: "Face Recognition",
                            price: 0
                        },
                        {
                            id: "multi",
                            label: "Multi-Biometric",
                            price: 0
                        }
                    ]
                },

                credentials: {
                    label: "Credential Capacity",
                    type: "select",

                    values: [
                        {
                            id: "100",
                            label: "Up to 100 Users",
                            price: 0
                        },
                        {
                            id: "500",
                            label: "Up to 500 Users",
                            price: 0
                        },
                        {
                            id: "1000",
                            label: "Up to 1,000 Users",
                            price: 0
                        },
                        {
                            id: "5000",
                            label: "5,000+ Users",
                            price: 0
                        }
                    ]
                },

                exitButton: {
                    label: "Exit Buttons",
                    type: "number",
                    min: 1,
                    max: 32,
                    default: 1
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         INTERCOM
        =================================================*/

        INTERCOM: {

            name: "Intercom System",

            options: {

                stations: {
                    label: "Indoor Stations",
                    type: "number",
                    min: 1,
                    max: 32,
                    default: 1
                },

                video: {
                    label: "Video Intercom",
                    type: "select",

                    values: [
                        {
                            id: "audio",
                            label: "Audio Only",
                            price: 0
                        },
                        {
                            id: "video",
                            label: "Video Intercom",
                            price: 0
                        }
                    ]
                },

                access: {
                    label: "Gate / Door Access",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "No Access Control",
                            price: 0
                        },
                        {
                            id: "single",
                            label: "Single Access Point",
                            price: 0
                        },
                        {
                            id: "multiple",
                            label: "Multiple Access Points",
                            price: 0
                        }
                    ]
                },

                mobile: {
                    label: "Mobile App",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "No Mobile App",
                            price: 0
                        },
                        {
                            id: "enabled",
                            label: "Mobile App Enabled",
                            price: 0
                        }
                    ]
                }
            }
        },


        /*=================================================
         ROBOGUARD
        =================================================*/

        ROBOGUARD: {

            name: "Roboguard System",

            options: {

                beams: {
                    label: "Number of Beams",
                    type: "number",
                    min: 1,
                    max: 32,
                    default: 2
                },

                receiver: {
                    label: "Receiver",
                    type: "select",

                    values: [
                        {
                            id: "standard",
                            label: "Standard Receiver",
                            price: 0
                        },
                        {
                            id: "advanced",
                            label: "Advanced Receiver",
                            price: 0
                        }
                    ]
                },

                integration: {
                    label: "Alarm Integration",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Standalone",
                            price: 0
                        },
                        {
                            id: "alarm",
                            label: "Alarm Integration",
                            price: 0
                        }
                    ]
                },

                installation: {
                    label: "Installation",
                    type: "select",

                    values: [
                        {
                            id: "none",
                            label: "Equipment Only",
                            price: 0
                        },
                        {
                            id: "standard",
                            label: "Standard Installation",
                            price: 0
                        },
                        {
                            id: "premium",
                            label: "Premium Installation",
                            price: 0
                        }
                    ]
                }
            }
        }
    };


    /*=====================================================
     CATEGORY ALIASES
    =====================================================*/

    Configurator.categoryAliases = {

        "cctv": "CCTV",
        "cctv-systems": "CCTV",
        "cctv_systems": "CCTV",

        "ip-cctv": "IP_CCTV",
        "ip_cctv": "IP_CCTV",

        "electric-fence": "ELECTRIC_FENCE",
        "electric-fencing": "ELECTRIC_FENCE",
        "electric_fence": "ELECTRIC_FENCE",

        "gate-automation": "GATE_AUTOMATION",
        "gate-automation-systems": "GATE_AUTOMATION",
        "gate_automation": "GATE_AUTOMATION",

        "alarm": "ALARM",
        "alarm-system": "ALARM",
        "alarm-systems": "ALARM",

        "access-control": "ACCESS_CONTROL",
        "access_control": "ACCESS_CONTROL",

        "intercom": "INTERCOM",
        "intercom-systems": "INTERCOM",

        "roboguard": "ROBOGUARD",
        "roboguard-systems": "ROBOGUARD"
    };


    /*=====================================================
     NORMALIZE CATEGORY
    =====================================================*/

    Configurator.normalizeCategory = function (category) {

        if (!category) {
            return null;
        }

        const value =
            String(category)
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");

        return (
            Configurator.categoryAliases[value] ||
            category
        );
    };


    /*=====================================================
     GET DEFINITION
    =====================================================*/

    Configurator.getDefinition = function (category) {

        const normalized =
            Configurator.normalizeCategory(category);

        if (!normalized) {
            return null;
        }

        return (
            Configurator.definitions[normalized] ||
            null
        );
    };


    /*=====================================================
     GET PRODUCT CATEGORY
    =====================================================*/

    Configurator.getProductCategory = function (product) {

        if (!product) {
            return null;
        }

        return (
            product.category ||
            product.productCategory ||
            product.type ||
            product.productType ||
            null
        );
    };


    /*=====================================================
     GET PRODUCT DEFINITION
    =====================================================*/

    Configurator.getProductDefinition = function (product) {

        if (!product) {
            return null;
        }

        const category =
            Configurator.getProductCategory(product);

        return Configurator.getDefinition(category);
    };


    /*=====================================================
     GET AVAILABLE OPTIONS
    =====================================================*/

    Configurator.getOptions = function (category) {

        const definition =
            Configurator.getDefinition(category);

        if (!definition) {
            return {};
        }

        return Configurator.clone(
            definition.options || {}
        );
    };


    /*=====================================================
     GET OPTION DEFINITION
    =====================================================*/

    Configurator.getOptionDefinition = function (
        category,
        optionKey
    ) {

        const definition =
            Configurator.getDefinition(category);

        if (!definition ||
            !definition.options ||
            !definition.options[optionKey]) {

            return null;
        }

        return Configurator.clone(
            definition.options[optionKey]
        );
    };


    /*=====================================================
     GET DEFAULT OPTIONS
    =====================================================*/

    Configurator.getDefaultOptions = function (category) {

        const options =
            Configurator.getOptions(category);

        const defaults = {};

        Object.keys(options).forEach(key => {

            const option =
                options[key];

            if (
                option.default !== undefined
            ) {

                defaults[key] =
                    option.default;

                return;
            }

            if (
                option.values &&
                option.values.length > 0
            ) {

                defaults[key] =
                    option.values[0].id;
            }
        });

        return defaults;
    };


    /*=====================================================
     APPLY DEFAULT OPTIONS
    =====================================================*/

    Configurator.applyDefaults = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return false;
        }

        const category =
            Configurator.getProductCategory(product);

        const defaults =
            Configurator.getDefaultOptions(category);

        Object.keys(defaults).forEach(key => {

            if (
                Configurator.state.options[key] ===
                undefined
            ) {

                Configurator.state.options[key] =
                    defaults[key];
            }
        });

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return true;
    };


    /*=====================================================
     CHECK OPTION VALUE
    =====================================================*/

    Configurator.isValidOptionValue = function (
        optionDefinition,
        value
    ) {

        if (!optionDefinition) {
            return false;
        }

        if (
            optionDefinition.type === "number"
        ) {

            const number =
                Number(value);

            if (!Number.isFinite(number)) {
                return false;
            }

            if (
                optionDefinition.min !== undefined &&
                number < optionDefinition.min
            ) {
                return false;
            }

            if (
                optionDefinition.max !== undefined &&
                number > optionDefinition.max
            ) {
                return false;
            }

            return true;
        }


        if (
            optionDefinition.type === "select"
        ) {

            if (
                !Array.isArray(
                    optionDefinition.values
                )
            ) {

                return false;
            }

            return optionDefinition.values.some(
                item => item.id == value
            );
        }


        return true;
    };


    /*=====================================================
     SET DEFINED OPTION
    =====================================================*/

    Configurator.setDefinedOption = function (
        key,
        value
    ) {

        const product =
            Configurator.getProduct();

        if (!product) {
            return false;
        }

        const category =
            Configurator.getProductCategory(product);

        const definition =
            Configurator.getOptionDefinition(
                category,
                key
            );

        if (!definition) {

            console.warn(
                "[NexpakConfigurator] Unknown option:",
                key
            );

            return false;
        }

        if (
            !Configurator.isValidOptionValue(
                definition,
                value
            )
        ) {

            console.warn(
                "[NexpakConfigurator] Invalid option value:",
                key,
                value
            );

            return false;
        }

        if (definition.type === "number") {

            value =
                Number(value);
        }

        return Configurator.setOption(
            key,
            value
        );
    };


    /*=====================================================
     GET CURRENT DEFINED OPTIONS
    =====================================================*/

    Configurator.getDefinedOptions = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return {};
        }

        const category =
            Configurator.getProductCategory(product);

        const definitions =
            Configurator.getOptions(category);

        const current = {};

        Object.keys(definitions).forEach(key => {

            if (
                Configurator.state.options[key] !==
                undefined
            ) {

                current[key] =
                    Configurator.state.options[key];
            }
        });

        return current;
    };


    /*=====================================================
     AUTO APPLY DEFAULTS WHEN PRODUCT CHANGES
    =====================================================*/

    const originalSetProduct =
        Configurator.setProduct;

    Configurator.setProduct = function (
        productId,
        productData = null
    ) {

        const result =
            originalSetProduct.call(
                Configurator,
                productId,
                productData
            );

        if (result) {

            Configurator.applyDefaults();
        }

        return result;
    };


    /*=====================================================
     AUTO APPLY DEFAULTS WHEN CONFIGURATION STARTS
    =====================================================*/

    const originalStart =
        Configurator.start;

    Configurator.start = function (
        productId,
        productData = null
    ) {

        const result =
            originalStart.call(
                Configurator,
                productId,
                productData
            );

        if (result.product) {

            Configurator.applyDefaults();
        }

        return result;
    };


    /*=====================================================
     PART 2 READY
    =====================================================*/

    Configurator.part2 = true;

    console.log(
        "[NexpakConfigurator] Part 2/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 3/8
=========================================================*/

/*=========================================================
 CONFIGURATION PRICING & CALCULATION ENGINE
=========================================================*/

(function () {
    "use strict";

    const Configurator = window.NexpakConfigurator;

    if (!Configurator) {
        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 3."
        );
        return;
    }


    /*=====================================================
     PRICE FIELD DETECTION
    =====================================================*/

    Configurator.getProductPrice = function (product) {

        if (!product) {
            return 0;
        }

        const possiblePrices = [

            product.price,

            product.salePrice,

            product.unitPrice,

            product.amount,

            product.cost,

            product.basePrice
        ];

        for (const value of possiblePrices) {

            const number = Number(value);

            if (
                Number.isFinite(number) &&
                number >= 0
            ) {
                return number;
            }
        }

        return 0;
    };


    /*=====================================================
     OPTION PRICE
    =====================================================*/

    Configurator.getOptionPrice = function (
        category,
        optionKey,
        value
    ) {

        const definition =
            Configurator.getOptionDefinition(
                category,
                optionKey
            );

        if (!definition) {
            return 0;
        }


        /*---------------------------------------------
         SELECT OPTION
        ---------------------------------------------*/

        if (
            definition.type === "select" &&
            Array.isArray(definition.values)
        ) {

            const selected =
                definition.values.find(
                    item => item.id == value
                );

            if (!selected) {
                return 0;
            }

            return Configurator.toNumber(
                selected.price,
                0
            );
        }


        /*---------------------------------------------
         DIRECT PRICE
        ---------------------------------------------*/

        if (
            definition.price !== undefined
        ) {

            return Configurator.toNumber(
                definition.price,
                0
            );
        }


        return 0;
    };


    /*=====================================================
     OPTION PRICE FROM OBJECT
    =====================================================*/

    Configurator.getObjectPrice = function (item) {

        if (!item) {
            return 0;
        }

        const possiblePrices = [

            item.price,

            item.salePrice,

            item.unitPrice,

            item.amount,

            item.cost,

            item.extraPrice
        ];

        for (const value of possiblePrices) {

            const number = Number(value);

            if (
                Number.isFinite(number) &&
                number >= 0
            ) {

                return number;
            }
        }

        return 0;
    };


    /*=====================================================
     EXTRA ITEM TOTAL
    =====================================================*/

    Configurator.calculateExtraTotal = function (extra) {

        if (!extra) {
            return 0;
        }

        const price =
            Configurator.getObjectPrice(extra);

        const quantity =
            Math.max(
                1,
                Math.floor(
                    Configurator.toNumber(
                        extra.quantity,
                        1
                    )
                )
            );

        return price * quantity;
    };


    /*=====================================================
     CALCULATE EXTRAS TOTAL
    =====================================================*/

    Configurator.calculateExtrasTotal = function () {

        const extras =
            Array.isArray(
                Configurator.state.extras
            )
                ? Configurator.state.extras
                : [];

        return extras.reduce(
            (total, extra) => {

                return (
                    total +
                    Configurator.calculateExtraTotal(
                        extra
                    )
                );

            },
            0
        );
    };


    /*=====================================================
     DETERMINE BASE QUANTITY
    =====================================================*/

    Configurator.getBaseQuantity = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return 1;
        }

        const possibleQuantities = [

            Configurator.state.quantities.product,

            Configurator.state.quantities.base,

            product.configurationQuantity,

            product.quantity
        ];

        for (const value of possibleQuantities) {

            const quantity =
                Number(value);

            if (
                Number.isFinite(quantity) &&
                quantity > 0
            ) {

                return Math.floor(quantity);
            }
        }

        return 1;
    };


    /*=====================================================
     SET BASE QUANTITY
    =====================================================*/

    Configurator.setBaseQuantity = function (
        quantity
    ) {

        quantity =
            Math.max(
                1,
                Math.floor(
                    Configurator.toNumber(
                        quantity,
                        1
                    )
                )
            );

        Configurator.state.quantities.product =
            quantity;

        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return quantity;
    };


    /*=====================================================
     CALCULATE OPTION TOTAL
    =====================================================*/

    Configurator.calculateOptionTotal = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return 0;
        }

        const category =
            Configurator.getProductCategory(
                product
            );

        const options =
            Configurator.getDefinedOptions();

        let total = 0;

        Object.keys(options).forEach(
            optionKey => {

                const value =
                    options[optionKey];

                total +=
                    Configurator.getOptionPrice(
                        category,
                        optionKey,
                        value
                    );
            }
        );

        return total;
    };


    /*=====================================================
     CALCULATE QUANTITY-BASED OPTION COST
    =====================================================*/

    Configurator.calculateQuantityOptions = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return 0;
        }

        const category =
            Configurator.getProductCategory(
                product
            );

        const options =
            Configurator.getOptions(
                category
            );

        const quantities =
            Configurator.state.quantities;

        let total = 0;


        Object.keys(quantities).forEach(
            key => {

                if (key === "product") {
                    return;
                }

                const quantity =
                    Number(
                        quantities[key]
                    );

                if (
                    !Number.isFinite(quantity) ||
                    quantity <= 0
                ) {
                    return;
                }

                const definition =
                    options[key];

                if (!definition) {
                    return;
                }

                const unitPrice =
                    Configurator.getOptionPrice(
                        category,
                        key,
                        Configurator.state.options[key]
                    );

                if (unitPrice > 0) {

                    total +=
                        unitPrice *
                        quantity;
                }
            }
        );

        return total;
    };


    /*=====================================================
     CONFIGURATION SUBTOTAL
    =====================================================*/

    Configurator.calculateSubtotal = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return 0;
        }

        const basePrice =
            Configurator.getProductPrice(
                product
            );

        const baseQuantity =
            Configurator.getBaseQuantity();

        const optionTotal =
            Configurator.calculateOptionTotal();

        const quantityOptionTotal =
            Configurator.calculateQuantityOptions();

        const subtotal =
            (
                basePrice +
                optionTotal +
                quantityOptionTotal
            ) * baseQuantity;

        return Math.max(
            0,
            subtotal
        );
    };


    /*=====================================================
     COMPLETE CALCULATION
    =====================================================*/

    Configurator.calculate = function () {

        const product =
            Configurator.getProduct();

        if (!product) {

            Configurator.state.calculated = {

                subtotal: 0,

                extrasTotal: 0,

                total: 0
            };

            return Configurator.state.calculated;
        }


        /*---------------------------------------------
         ENSURE DEFAULTS
        ---------------------------------------------*/

        Configurator.applyDefaults();


        /*---------------------------------------------
         BASE SUBTOTAL
        ---------------------------------------------*/

        const subtotal =
            Configurator.calculateSubtotal();


        /*---------------------------------------------
         EXTRAS
        ---------------------------------------------*/

        const extrasTotal =
            Configurator.calculateExtrasTotal();


        /*---------------------------------------------
         TOTAL
        ---------------------------------------------*/

        const total =
            subtotal +
            extrasTotal;


        /*---------------------------------------------
         SAVE CALCULATION
        ---------------------------------------------*/

        Configurator.state.calculated = {

            subtotal:
                Number(
                    subtotal.toFixed(2)
                ),

            extrasTotal:
                Number(
                    extrasTotal.toFixed(2)
                ),

            total:
                Number(
                    total.toFixed(2)
                )
        };


        Configurator.state.timestamp =
            new Date().toISOString();

        Configurator.save();

        return Configurator.clone(
            Configurator.state.calculated
        );
    };


    /*=====================================================
     GET TOTAL
    =====================================================*/

    Configurator.getTotal = function () {

        return Configurator.toNumber(
            Configurator.state.calculated.total,
            0
        );
    };


    /*=====================================================
     GET SUBTOTAL
    =====================================================*/

    Configurator.getSubtotal = function () {

        return Configurator.toNumber(
            Configurator.state.calculated.subtotal,
            0
        );
    };


    /*=====================================================
     GET EXTRAS TOTAL
    =====================================================*/

    Configurator.getExtrasTotal = function () {

        return Configurator.toNumber(
            Configurator.state.calculated.extrasTotal,
            0
        );
    };


    /*=====================================================
     FORMAT PRICE
     
     Uses South African Rand by default.
    =====================================================*/

    Configurator.formatPrice = function (
        amount
    ) {

        amount =
            Configurator.toNumber(
                amount,
                0
            );

        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {
                    style: "currency",
                    currency: "ZAR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ).format(amount);

        } catch (error) {

            return "R " +
                amount.toFixed(2);
        }
    };


    /*=====================================================
     GET PRICE BREAKDOWN
    =====================================================*/

    Configurator.getPriceBreakdown = function () {

        const product =
            Configurator.getProduct();

        const basePrice =
            product
                ? Configurator.getProductPrice(product)
                : 0;

        const quantity =
            Configurator.getBaseQuantity();

        const optionTotal =
            Configurator.calculateOptionTotal();

        const quantityOptionTotal =
            Configurator.calculateQuantityOptions();

        const extrasTotal =
            Configurator.calculateExtrasTotal();

        const calculation =
            Configurator.calculate();


        return {

            product: {

                id:
                    Configurator.state.productId,

                name:
                    product
                        ? (
                            product.name ||
                            product.title ||
                            "Configured Product"
                        )
                        : "No Product",

                unitPrice:
                    basePrice,

                quantity:
                    quantity,

                baseTotal:
                    basePrice * quantity
            },

            options: {

                standard:
                    optionTotal,

                quantityBased:
                    quantityOptionTotal,

                total:
                    optionTotal +
                    quantityOptionTotal
            },

            extras: {

                total:
                    extrasTotal
            },

            subtotal:
                calculation.subtotal,

            total:
                calculation.total
        };
    };


    /*=====================================================
     GET DISPLAY BREAKDOWN
    =====================================================*/

    Configurator.getDisplayBreakdown = function () {

        const breakdown =
            Configurator.getPriceBreakdown();

        return {

            productName:
                breakdown.product.name,

            productUnitPrice:
                Configurator.formatPrice(
                    breakdown.product.unitPrice
                ),

            productQuantity:
                breakdown.product.quantity,

            productTotal:
                Configurator.formatPrice(
                    breakdown.product.baseTotal
                ),

            optionTotal:
                Configurator.formatPrice(
                    breakdown.options.total
                ),

            extrasTotal:
                Configurator.formatPrice(
                    breakdown.extras.total
                ),

            subtotal:
                Configurator.formatPrice(
                    breakdown.subtotal
                ),

            total:
                Configurator.formatPrice(
                    breakdown.total
                )
        };
    };


    /*=====================================================
     RECALCULATE AFTER OPTION CHANGE
    =====================================================*/

    const originalSetOption =
        Configurator.setOption;

    Configurator.setOption = function (
        key,
        value
    ) {

        const result =
            originalSetOption.call(
                Configurator,
                key,
                value
            );

        if (result) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     RECALCULATE AFTER QUANTITY CHANGE
    =====================================================*/

    const originalSetQuantity =
        Configurator.setQuantity;

    Configurator.setQuantity = function (
        key,
        quantity
    ) {

        const result =
            originalSetQuantity.call(
                Configurator,
                key,
                quantity
            );

        if (result !== false) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     RECALCULATE AFTER BASE QUANTITY CHANGE
    =====================================================*/

    const originalSetBaseQuantity =
        Configurator.setBaseQuantity;

    Configurator.setBaseQuantity = function (
        quantity
    ) {

        const result =
            originalSetBaseQuantity.call(
                Configurator,
                quantity
            );

        Configurator.calculate();

        return result;
    };


    /*=====================================================
     RECALCULATE AFTER ADDING EXTRA
    =====================================================*/

    const originalAddExtra =
        Configurator.addExtra;

    Configurator.addExtra = function (
        extra
    ) {

        const result =
            originalAddExtra.call(
                Configurator,
                extra
            );

        if (result) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     RECALCULATE AFTER REMOVING EXTRA
    =====================================================*/

    const originalRemoveExtra =
        Configurator.removeExtra;

    Configurator.removeExtra = function (
        extraId
    ) {

        const result =
            originalRemoveExtra.call(
                Configurator,
                extraId
            );

        if (result) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     CALCULATE ON PRODUCT START
    =====================================================*/

    const originalStart =
        Configurator.start;

    Configurator.start = function (
        productId,
        productData = null
    ) {

        const result =
            originalStart.call(
                Configurator,
                productId,
                productData
            );

        if (result && result.product) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     CALCULATE ON PRODUCT CHANGE
    =====================================================*/

    const originalSetProduct =
        Configurator.setProduct;

    Configurator.setProduct = function (
        productId,
        productData = null
    ) {

        const result =
            originalSetProduct.call(
                Configurator,
                productId,
                productData
            );

        if (result) {
            Configurator.calculate();
        }

        return result;
    };


    /*=====================================================
     PART 3 COMPLETE
    =====================================================*/

    Configurator.part3 = true;

    console.log(
        "[NexpakConfigurator] Part 3/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 4/8
=========================================================*/

/*=========================================================
 CONFIGURATION VALIDATION & COMPATIBILITY ENGINE
=========================================================*/

(function () {
    "use strict";

    const Configurator = window.NexpakConfigurator;

    if (!Configurator) {
        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 4."
        );
        return;
    }


    /*=====================================================
     VALIDATION HELPERS
    =====================================================*/

    Configurator.validationRules =
        Configurator.validationRules || {};


    /*=====================================================
     CREATE VALIDATION ERROR
    =====================================================*/

    Configurator.createValidationError = function (
        code,
        field,
        message,
        severity = "error"
    ) {

        return {

            code:
                code || "CONFIGURATION_ERROR",

            field:
                field || null,

            message:
                message || "Invalid configuration.",

            severity:
                severity || "error"
        };
    };


    /*=====================================================
     GET CURRENT CATEGORY
    =====================================================*/

    Configurator.getCurrentCategory = function () {

        const product =
            Configurator.getProduct();

        if (!product) {
            return null;
        }

        return Configurator.getProductCategory(
            product
        );
    };


    /*=====================================================
     REQUIRED FIELD VALIDATION
    =====================================================*/

    Configurator.validateRequiredOptions =
        function () {

            const errors = [];

            const product =
                Configurator.getProduct();

            if (!product) {
                return errors;
            }

            const category =
                Configurator.getCurrentCategory();

            const definitions =
                Configurator.getOptions(
                    category
                );

            const options =
                Configurator.state.options;


            Object.keys(definitions).forEach(
                key => {

                    const definition =
                        definitions[key];

                    if (!definition.required) {
                        return;
                    }

                    const value =
                        options[key];


                    if (
                        value === undefined ||
                        value === null ||
                        value === ""
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "REQUIRED_OPTION",
                                key,
                                definition.label +
                                " is required."
                            )
                        );

                        return;
                    }


                    if (
                        definition.type === "number" &&
                        (
                            value === "" ||
                            value === null
                        )
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "REQUIRED_NUMBER",
                                key,
                                definition.label +
                                " requires a value."
                            )
                        );
                    }
                }
            );


            return errors;
        };


    /*=====================================================
     OPTION VALUE VALIDATION
    =====================================================*/

    Configurator.validateOptionValues =
        function () {

            const errors = [];

            const product =
                Configurator.getProduct();

            if (!product) {
                return errors;
            }

            const category =
                Configurator.getCurrentCategory();

            const definitions =
                Configurator.getOptions(
                    category
                );

            const options =
                Configurator.state.options;


            Object.keys(options).forEach(
                key => {

                    const value =
                        options[key];

                    const definition =
                        definitions[key];

                    if (!definition) {

                        errors.push(
                            Configurator.createValidationError(
                                "UNKNOWN_OPTION",
                                key,
                                "Unknown configuration option: " +
                                key
                            )
                        );

                        return;
                    }


                    if (
                        !Configurator.isValidOptionValue(
                            definition,
                            value
                        )
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "INVALID_OPTION_VALUE",
                                key,
                                "Invalid value selected for " +
                                definition.label +
                                "."
                            )
                        );
                    }
                }
            );


            return errors;
        };


    /*=====================================================
     NUMBER LIMIT VALIDATION
    =====================================================*/

    Configurator.validateNumberLimits =
        function () {

            const errors = [];

            const product =
                Configurator.getProduct();

            if (!product) {
                return errors;
            }

            const category =
                Configurator.getCurrentCategory();

            const definitions =
                Configurator.getOptions(
                    category
                );

            const options =
                Configurator.state.options;


            Object.keys(definitions).forEach(
                key => {

                    const definition =
                        definitions[key];

                    if (
                        definition.type !== "number"
                    ) {
                        return;
                    }

                    if (
                        options[key] === undefined
                    ) {
                        return;
                    }

                    const value =
                        Number(options[key]);


                    if (
                        !Number.isFinite(value)
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "INVALID_NUMBER",
                                key,
                                definition.label +
                                " must be a valid number."
                            )
                        );

                        return;
                    }


                    if (
                        definition.min !== undefined &&
                        value < definition.min
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "MINIMUM_VALUE",
                                key,
                                definition.label +
                                " must be at least " +
                                definition.min +
                                "."
                            )
                        );
                    }


                    if (
                        definition.max !== undefined &&
                        value > definition.max
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "MAXIMUM_VALUE",
                                key,
                                definition.label +
                                " cannot exceed " +
                                definition.max +
                                "."
                            )
                        );
                    }
                }
            );


            return errors;
        };


    /*=====================================================
     BASE QUANTITY VALIDATION
    =====================================================*/

    Configurator.validateBaseQuantity =
        function () {

            const errors = [];

            const quantity =
                Configurator.getBaseQuantity();

            if (
                !Number.isFinite(quantity) ||
                quantity < 1
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "INVALID_QUANTITY",
                        "product",
                        "Product quantity must be at least 1."
                    )
                );
            }

            return errors;
        };


    /*=====================================================
     EXTRA VALIDATION
    =====================================================*/

    Configurator.validateExtras =
        function () {

            const errors = [];

            const extras =
                Array.isArray(
                    Configurator.state.extras
                )
                    ? Configurator.state.extras
                    : [];


            extras.forEach(
                (extra, index) => {

                    if (!extra) {

                        errors.push(
                            Configurator.createValidationError(
                                "INVALID_EXTRA",
                                "extras[" + index + "]",
                                "An extra item is invalid."
                            )
                        );

                        return;
                    }


                    const price =
                        Configurator.getObjectPrice(
                            extra
                        );

                    if (
                        !Number.isFinite(price) ||
                        price < 0
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "INVALID_EXTRA_PRICE",
                                "extras[" + index + "]",
                                "An extra item has an invalid price."
                            )
                        );
                    }


                    const quantity =
                        Number(
                            extra.quantity === undefined
                                ? 1
                                : extra.quantity
                        );


                    if (
                        !Number.isFinite(quantity) ||
                        quantity < 1
                    ) {

                        errors.push(
                            Configurator.createValidationError(
                                "INVALID_EXTRA_QUANTITY",
                                "extras[" + index + "]",
                                "Extra item quantity must be at least 1."
                            )
                        );
                    }
                }
            );


            return errors;
        };


    /*=====================================================
     CCTV COMPATIBILITY RULES
    =====================================================*/

    Configurator.validateCCTV =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            if (
                options.cameraType === "ip" &&
                options.recorder === "dvr"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "CCTV_RECORDER_MISMATCH",
                        "recorder",
                        "IP cameras require an NVR rather than a DVR."
                    )
                );
            }


            if (
                options.cameraType === "analog" &&
                options.recorder === "nvr"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "CCTV_RECORDER_MISMATCH",
                        "recorder",
                        "Analog cameras require a compatible DVR configuration."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     IP CCTV COMPATIBILITY RULES
    =====================================================*/

    Configurator.validateIPCCTV =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            if (
                options.cameraCount !== undefined &&
                Number(options.cameraCount) > 0
            ) {

                if (
                    options.poe === undefined ||
                    options.poe === null ||
                    options.poe === ""
                ) {

                    errors.push(
                        Configurator.createValidationError(
                            "POE_REQUIRED",
                            "poe",
                            "PoE configuration is required for an IP CCTV system."
                        )
                    );
                }
            }


            return errors;
        };


    /*=====================================================
     ELECTRIC FENCE RULES
    =====================================================*/

    Configurator.validateElectricFence =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            const fenceLength =
                Number(
                    options.fenceLength
                );


            if (
                Number.isFinite(fenceLength) &&
                fenceLength > 1000 &&
                options.energizer === "standard"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "FENCE_ENERGIZER",
                        "energizer",
                        "Fence lengths above 1,000m require a heavy-duty or commercial energizer."
                    )
                );
            }


            if (
                options.strands === "10" &&
                options.energizer === "standard"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "FENCE_ENERGIZER",
                        "energizer",
                        "10-strand fencing requires a suitable heavy-duty or commercial energizer."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     GATE AUTOMATION RULES
    =====================================================*/

    Configurator.validateGateAutomation =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            if (
                options.gateWeight === "commercial" &&
                options.installation === "none"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "COMMERCIAL_INSTALLATION",
                        "installation",
                        "Commercial gate automation should be professionally installed."
                    )
                );
            }


            if (
                Number(options.remotes) > 10
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "REMOTE_LIMIT",
                        "remotes",
                        "More than 10 remotes requires a custom configuration."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     ALARM SYSTEM RULES
    =====================================================*/

    Configurator.validateAlarm =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            const zones =
                Number(options.zones);

            const sensors =
                Number(options.sensors);


            if (
                Number.isFinite(zones) &&
                Number.isFinite(sensors) &&
                sensors > zones
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "ALARM_ZONE_LIMIT",
                        "sensors",
                        "Motion sensors cannot exceed the available alarm zones."
                    )
                );
            }


            if (
                Number(options.remotes) > 10 &&
                options.gsm === "none"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "ALARM_REMOTE_REVIEW",
                        "gsm",
                        "Large remote-control configurations should be reviewed before ordering."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     ACCESS CONTROL RULES
    =====================================================*/

    Configurator.validateAccessControl =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            const doors =
                Number(options.doors);

            const exitButtons =
                Number(options.exitButton);


            if (
                Number.isFinite(doors) &&
                Number.isFinite(exitButtons) &&
                exitButtons < doors
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "EXIT_BUTTON_COUNT",
                        "exitButton",
                        "Exit-button quantity should match the number of controlled doors."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     INTERCOM RULES
    =====================================================*/

    Configurator.validateIntercom =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            if (
                options.video === "video" &&
                options.stations === undefined
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "VIDEO_STATION_REQUIRED",
                        "stations",
                        "A video intercom requires at least one indoor station."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     ROBOGUARD RULES
    =====================================================*/

    Configurator.validateRoboguard =
        function () {

            const errors = [];

            const options =
                Configurator.state.options;


            const beams =
                Number(options.beams);


            if (
                Number.isFinite(beams) &&
                beams > 8 &&
                options.receiver === "standard"
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "ROBOGUARD_RECEIVER",
                        "receiver",
                        "More than 8 beams requires an advanced receiver configuration."
                    )
                );
            }


            return errors;
        };


    /*=====================================================
     CATEGORY RULE DISPATCHER
    =====================================================*/

    Configurator.validateCategoryRules =
        function () {

            const category =
                Configurator.normalizeCategory(
                    Configurator.getCurrentCategory()
                );


            switch (category) {

                case "CCTV":
                    return Configurator.validateCCTV();

                case "IP_CCTV":
                    return Configurator.validateIPCCTV();

                case "ELECTRIC_FENCE":
                    return Configurator.validateElectricFence();

                case "GATE_AUTOMATION":
                    return Configurator.validateGateAutomation();

                case "ALARM":
                    return Configurator.validateAlarm();

                case "ACCESS_CONTROL":
                    return Configurator.validateAccessControl();

                case "INTERCOM":
                    return Configurator.validateIntercom();

                case "ROBOGUARD":
                    return Configurator.validateRoboguard();

                default:
                    return [];
            }
        };


    /*=====================================================
     VALIDATION SUMMARY
    =====================================================*/

    Configurator.getValidationSummary =
        function (errors) {

            const list =
                Array.isArray(errors)
                    ? errors
                    : [];

            const blocking =
                list.filter(
                    error =>
                        error.severity !== "warning"
                );

            const warnings =
                list.filter(
                    error =>
                        error.severity === "warning"
                );


            return {

                valid:
                    blocking.length === 0,

                errorCount:
                    blocking.length,

                warningCount:
                    warnings.length,

                errors:
                    blocking,

                warnings:
                    warnings
            };
        };


    /*=====================================================
     COMPLETE VALIDATION
    =====================================================*/

    Configurator.validateConfiguration =
        function () {

            const errors = [];


            /*---------------------------------------------
             PRODUCT
            ---------------------------------------------*/

            if (
                !Configurator.getProduct()
            ) {

                errors.push(
                    Configurator.createValidationError(
                        "NO_PRODUCT",
                        "product",
                        "Please select a product before configuring it."
                    )
                );
            }


            /*---------------------------------------------
             REQUIRED OPTIONS
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateRequiredOptions()
            );


            /*---------------------------------------------
             OPTION VALUES
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateOptionValues()
            );


            /*---------------------------------------------
             NUMBER LIMITS
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateNumberLimits()
            );


            /*---------------------------------------------
             BASE QUANTITY
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateBaseQuantity()
            );


            /*---------------------------------------------
             EXTRAS
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateExtras()
            );


            /*---------------------------------------------
             CATEGORY RULES
            ---------------------------------------------*/

            errors.push(
                ...Configurator.validateCategoryRules()
            );


            /*---------------------------------------------
             SUMMARY
            ---------------------------------------------*/

            const summary =
                Configurator.getValidationSummary(
                    errors
                );


            Configurator.state.validation = {

                valid:
                    summary.valid,

                errors:
                    summary.errors,

                warnings:
                    summary.warnings,

                errorCount:
                    summary.errorCount,

                warningCount:
                    summary.warningCount,

                checkedAt:
                    new Date().toISOString()
            };


            Configurator.save();

            return Configurator.clone(
                Configurator.state.validation
            );
        };


    /*=====================================================
     IS CONFIGURATION VALID
    =====================================================*/

    Configurator.isValid =
        function () {

            const validation =
                Configurator.validateConfiguration();

            return validation.valid === true;
        };


    /*=====================================================
     GET VALIDATION ERRORS
    =====================================================*/

    Configurator.getValidationErrors =
        function () {

            const validation =
                Configurator.state.validation || {};

            return Array.isArray(
                validation.errors
            )
                ? Configurator.clone(
                    validation.errors
                )
                : [];
        };


    /*=====================================================
     GET VALIDATION WARNINGS
    =====================================================*/

    Configurator.getValidationWarnings =
        function () {

            const validation =
                Configurator.state.validation || {};

            return Array.isArray(
                validation.warnings
            )
                ? Configurator.clone(
                    validation.warnings
                )
                : [];
        };


    /*=====================================================
     GET FIRST ERROR
    =====================================================*/

    Configurator.getFirstValidationError =
        function () {

            const errors =
                Configurator.getValidationErrors();

            return errors.length
                ? errors[0]
                : null;
        };


    /*=====================================================
     AUTO VALIDATE AFTER OPTION CHANGES
    =====================================================*/

    const originalSetDefinedOption =
        Configurator.setDefinedOption;

    Configurator.setDefinedOption =
        function (
            key,
            value
        ) {

            const result =
                originalSetDefinedOption.call(
                    Configurator,
                    key,
                    value
                );

            if (result) {

                Configurator.validateConfiguration();
            }

            return result;
        };


    /*=====================================================
     AUTO VALIDATE AFTER GENERIC OPTION CHANGES
    =====================================================*/

    const originalSetOption =
        Configurator.setOption;

    Configurator.setOption =
        function (
            key,
            value
        ) {

            const result =
                originalSetOption.call(
                    Configurator,
                    key,
                    value
                );

            if (result) {

                Configurator.validateConfiguration();
            }

            return result;
        };


    /*=====================================================
     AUTO VALIDATE AFTER PRODUCT START
    =====================================================*/

    const previousStart =
        Configurator.start;

    Configurator.start =
        function (
            productId,
            productData = null
        ) {

            const result =
                previousStart.call(
                    Configurator,
                    productId,
                    productData
                );

            Configurator.validateConfiguration();

            return result;
        };


    /*=====================================================
     AUTO VALIDATE AFTER PRODUCT CHANGE
    =====================================================*/

    const previousSetProduct =
        Configurator.setProduct;

    Configurator.setProduct =
        function (
            productId,
            productData = null
        ) {

            const result =
                previousSetProduct.call(
                    Configurator,
                    productId,
                    productData
                );

            Configurator.validateConfiguration();

            return result;
        };


    /*=====================================================
     PART 4 COMPLETE
    =====================================================*/

    Configurator.part4 = true;

    console.log(
        "[NexpakConfigurator] Part 4/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 5/8
=========================================================*/

/*=========================================================
 CONFIGURATION BUILDER & SUMMARY ENGINE
=========================================================*/

(function () {

    "use strict";

    const Configurator =
        window.NexpakConfigurator;


    /*=====================================================
     DEPENDENCY CHECK
    =====================================================*/

    if (!Configurator) {

        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 5."
        );

        return;
    }


    /*=====================================================
     CONFIGURATION STATUS
    =====================================================*/

    Configurator.getConfigurationStatus =
        function () {

            const validation =
                Configurator.validateConfiguration();

            if (!Configurator.getProduct()) {

                return "not-started";
            }

            if (validation.valid) {

                return "ready";
            }

            return "incomplete";
        };


    /*=====================================================
     CONFIGURATION NAME
    =====================================================*/

    Configurator.generateConfigurationName =
        function () {

            const product =
                Configurator.getProduct();

            if (!product) {

                return "Security Configuration";
            }

            const productName =
                product.name ||
                product.title ||
                product.productName ||
                "Security System";

            const configurationId =
                Configurator.state.configurationId ||
                Configurator.generateId();

            return (
                productName +
                " — " +
                configurationId
            );
        };


    /*=====================================================
     SET CONFIGURATION NAME
    =====================================================*/

    Configurator.setConfigurationName =
        function (name) {

            name =
                Configurator.toString(
                    name
                ).trim();

            if (!name) {

                name =
                    Configurator.generateConfigurationName();
            }

            Configurator.state.configurationName =
                name;

            Configurator.state.timestamp =
                new Date().toISOString();

            Configurator.save();

            return name;
        };


    /*=====================================================
     GET CONFIGURATION NAME
    =====================================================*/

    Configurator.getConfigurationName =
        function () {

            if (
                !Configurator.state.configurationName
            ) {

                Configurator.setConfigurationName();
            }

            return (
                Configurator.state.configurationName
            );
        };


    /*=====================================================
     GET PRODUCT IDENTIFIERS
    =====================================================*/

    Configurator.getProductIdentifiers =
        function (product) {

            if (!product) {

                return {

                    id: null,
                    sku: null,
                    code: null
                };
            }

            return {

                id:
                    product.id ||
                    product.productId ||
                    null,

                sku:
                    product.sku ||
                    product.SKU ||
                    null,

                code:
                    product.code ||
                    product.productCode ||
                    null
            };
        };


    /*=====================================================
     GET PRODUCT DISPLAY DATA
    =====================================================*/

    Configurator.getProductDisplayData =
        function () {

            const product =
                Configurator.getProduct();

            if (!product) {

                return {

                    name:
                        "No Product Selected",

                    description:
                        "",

                    image:
                        "",

                    category:
                        "",

                    brand:
                        ""
                };
            }


            return {

                name:
                    product.name ||
                    product.title ||
                    product.productName ||
                    "Security Product",

                description:
                    product.description ||
                    product.shortDescription ||
                    "",

                image:
                    product.image ||
                    product.imageUrl ||
                    product.thumbnail ||
                    "",

                category:
                    Configurator.getProductCategory(
                        product
                    ) || "",

                brand:
                    product.brand ||
                    product.manufacturer ||
                    ""
            };
        };


    /*=====================================================
     BUILD OPTION ITEM
    =====================================================*/

    Configurator.buildOptionItem =
        function (
            category,
            key,
            value
        ) {

            const definition =
                Configurator.getOptionDefinition(
                    category,
                    key
                );

            if (!definition) {

                return {

                    key:
                        key,

                    label:
                        key,

                    value:
                        value,

                    displayValue:
                        String(value),

                    price:
                        0
                };
            }


            let displayValue =
                value;


            let price =
                Configurator.getOptionPrice(
                    category,
                    key,
                    value
                );


            /*---------------------------------------------
             SELECT DISPLAY VALUE
            ---------------------------------------------*/

            if (
                definition.type === "select" &&
                Array.isArray(
                    definition.values
                )
            ) {

                const selected =
                    definition.values.find(
                        item =>
                            item.id == value
                    );

                if (selected) {

                    displayValue =
                        selected.label ||
                        selected.id;

                    price =
                        Configurator.toNumber(
                            selected.price,
                            0
                        );
                }
            }


            /*---------------------------------------------
             NUMBER DISPLAY
            ---------------------------------------------*/

            if (
                definition.type === "number"
            ) {

                displayValue =
                    Configurator.toNumber(
                        value,
                        0
                    );
            }


            return {

                key:
                    key,

                label:
                    definition.label ||
                    key,

                type:
                    definition.type ||
                    "text",

                value:
                    value,

                displayValue:
                    displayValue,

                price:
                    Number(
                        price.toFixed(2)
                    )
            };
        };


    /*=====================================================
     BUILD OPTIONS LIST
    =====================================================*/

    Configurator.buildOptionsList =
        function () {

            const product =
                Configurator.getProduct();

            if (!product) {

                return [];
            }

            const category =
                Configurator.getProductCategory(
                    product
                );

            const options =
                Configurator.getDefinedOptions();

            const list = [];


            Object.keys(options).forEach(
                key => {

                    list.push(
                        Configurator.buildOptionItem(
                            category,
                            key,
                            options[key]
                        )
                    );
                }
            );


            return list;
        };


    /*=====================================================
     BUILD EXTRA ITEM
    =====================================================*/

    Configurator.buildExtraItem =
        function (extra) {

            if (!extra) {
                return null;
            }

            const quantity =
                Math.max(
                    1,
                    Math.floor(
                        Configurator.toNumber(
                            extra.quantity,
                            1
                        )
                    )
                );

            const unitPrice =
                Configurator.getObjectPrice(
                    extra
                );

            return {

                id:
                    extra.id ||
                    extra.sku ||
                    extra.code ||
                    null,

                sku:
                    extra.sku ||
                    null,

                code:
                    extra.code ||
                    null,

                name:
                    extra.name ||
                    extra.title ||
                    extra.label ||
                    "Additional Item",

                quantity:
                    quantity,

                unitPrice:
                    Number(
                        unitPrice.toFixed(2)
                    ),

                total:
                    Number(
                        (
                            unitPrice *
                            quantity
                        ).toFixed(2)
                    ),

                image:
                    extra.image ||
                    extra.imageUrl ||
                    "",

                category:
                    extra.category ||
                    ""
            };
        };


    /*=====================================================
     BUILD EXTRAS LIST
    =====================================================*/

    Configurator.buildExtrasList =
        function () {

            const extras =
                Array.isArray(
                    Configurator.state.extras
                )
                    ? Configurator.state.extras
                    : [];

            return extras
                .map(
                    extra =>
                        Configurator.buildExtraItem(
                            extra
                        )
                )
                .filter(Boolean);
        };


    /*=====================================================
     BUILD QUANTITY DATA
    =====================================================*/

    Configurator.buildQuantityData =
        function () {

            const quantities =
                Configurator.state.quantities ||
                {};

            const result = {};

            Object.keys(quantities)
                .forEach(
                    key => {

                        const quantity =
                            Configurator.toNumber(
                                quantities[key],
                                0
                            );

                        if (quantity > 0) {

                            result[key] =
                                Math.floor(
                                    quantity
                                );
                        }
                    }
                );


            return result;
        };


    /*=====================================================
     BUILD PRICE DATA
    =====================================================*/

    Configurator.buildPriceData =
        function () {

            const calculation =
                Configurator.calculate();

            return {

                currency:
                    "ZAR",

                currencySymbol:
                    "R",

                subtotal:
                    calculation.subtotal,

                extrasTotal:
                    calculation.extrasTotal,

                total:
                    calculation.total,

                formattedSubtotal:
                    Configurator.formatPrice(
                        calculation.subtotal
                    ),

                formattedExtrasTotal:
                    Configurator.formatPrice(
                        calculation.extrasTotal
                    ),

                formattedTotal:
                    Configurator.formatPrice(
                        calculation.total
                    )
            };
        };


    /*=====================================================
     BUILD VALIDATION DATA
    =====================================================*/

    Configurator.buildValidationData =
        function () {

            const validation =
                Configurator.validateConfiguration();

            return {

                valid:
                    validation.valid,

                errorCount:
                    validation.errorCount || 0,

                warningCount:
                    validation.warningCount || 0,

                errors:
                    Configurator.clone(
                        validation.errors || []
                    ),

                warnings:
                    Configurator.clone(
                        validation.warnings || []
                    )
            };
        };


    /*=====================================================
     BUILD CONFIGURATION OBJECT
    =====================================================*/

    Configurator.buildConfiguration =
        function () {

            const product =
                Configurator.getProduct();


            if (!product) {

                return null;
            }


            /*---------------------------------------------
             ENSURE CONFIGURATION ID
            ---------------------------------------------*/

            if (
                !Configurator.state.configurationId
            ) {

                Configurator.state.configurationId =
                    Configurator.generateId();
            }


            /*---------------------------------------------
             ENSURE NAME
            ---------------------------------------------*/

            const name =
                Configurator.getConfigurationName();


            /*---------------------------------------------
             PRODUCT DATA
            ---------------------------------------------*/

            const identifiers =
                Configurator.getProductIdentifiers(
                    product
                );

            const display =
                Configurator.getProductDisplayData();


            /*---------------------------------------------
             BUILD OBJECT
            ---------------------------------------------*/

            const configuration = {

                id:
                    Configurator.state.configurationId,

                name:
                    name,

                status:
                    Configurator.getConfigurationStatus(),

                createdAt:
                    Configurator.state.timestamp ||
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString(),


                product: {

                    id:
                        identifiers.id,

                    sku:
                        identifiers.sku,

                    code:
                        identifiers.code,

                    name:
                        display.name,

                    description:
                        display.description,

                    image:
                        display.image,

                    category:
                        display.category,

                    brand:
                        display.brand
                },


                options:
                    Configurator.buildOptionsList(),


                optionValues:
                    Configurator.clone(
                        Configurator.state.options
                    ),


                quantities:
                    Configurator.buildQuantityData(),


                extras:
                    Configurator.buildExtrasList(),


                pricing:
                    Configurator.buildPriceData(),


                validation:
                    Configurator.buildValidationData()
            };


            return configuration;
        };


    /*=====================================================
     GET CURRENT CONFIGURATION
    =====================================================*/

    Configurator.getConfiguration =
        function () {

            return Configurator.clone(
                Configurator.buildConfiguration()
            );
        };


    /*=====================================================
     GET CONFIGURATION SUMMARY
    =====================================================*/

    Configurator.getSummary =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return {

                    available:
                        false,

                    title:
                        "No Configuration",

                    product:
                        "",

                    options:
                        [],

                    extras:
                        [],

                    total:
                        0,

                    formattedTotal:
                        Configurator.formatPrice(
                            0
                        ),

                    valid:
                        false
                };
            }


            return {

                available:
                    true,

                id:
                    configuration.id,

                title:
                    configuration.name,

                product:
                    configuration.product.name,

                category:
                    configuration.product.category,

                options:
                    configuration.options,

                extras:
                    configuration.extras,

                subtotal:
                    configuration.pricing.subtotal,

                extrasTotal:
                    configuration.pricing.extrasTotal,

                total:
                    configuration.pricing.total,

                formattedSubtotal:
                    configuration.pricing.formattedSubtotal,

                formattedExtrasTotal:
                    configuration.pricing.formattedExtrasTotal,

                formattedTotal:
                    configuration.pricing.formattedTotal,

                valid:
                    configuration.validation.valid,

                errors:
                    configuration.validation.errors,

                warnings:
                    configuration.validation.warnings
            };
        };


    /*=====================================================
     GET CONFIGURATION JSON
    =====================================================*/

    Configurator.exportConfiguration =
        function () {

            const configuration =
                Configurator.getConfiguration();

            if (!configuration) {
                return null;
            }

            return JSON.stringify(
                configuration,
                null,
                2
            );
        };


    /*=====================================================
     IMPORT CONFIGURATION JSON
    =====================================================*/

    Configurator.importConfiguration =
        function (json) {

            if (!json) {
                return false;
            }


            try {

                const parsed =
                    typeof json === "string"
                        ? JSON.parse(json)
                        : json;


                if (
                    !parsed ||
                    typeof parsed !== "object"
                ) {

                    return false;
                }


                /*-----------------------------------------
                 RESTORE CORE STATE
                -----------------------------------------*/

                if (parsed.id) {

                    Configurator.state.configurationId =
                        parsed.id;
                }


                if (parsed.name) {

                    Configurator.state.configurationName =
                        parsed.name;
                }


                if (
                    parsed.product &&
                    parsed.product.id
                ) {

                    Configurator.setProduct(
                        parsed.product.id,
                        parsed.product
                    );
                }


                if (
                    parsed.optionValues &&
                    typeof parsed.optionValues === "object"
                ) {

                    Configurator.state.options =
                        Configurator.clone(
                            parsed.optionValues
                        );
                }


                if (
                    parsed.quantities &&
                    typeof parsed.quantities === "object"
                ) {

                    Configurator.state.quantities =
                        Configurator.clone(
                            parsed.quantities
                        );
                }


                if (
                    Array.isArray(
                        parsed.extras
                    )
                ) {

                    Configurator.state.extras =
                        Configurator.clone(
                            parsed.extras
                        );
                }


                /*-----------------------------------------
                 RECALCULATE
                -----------------------------------------*/

                Configurator.calculate();

                Configurator.validateConfiguration();

                Configurator.save();

                return true;

            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Configuration import failed:",
                    error
                );

                return false;
            }
        };


    /*=====================================================
     DUPLICATE CONFIGURATION
    =====================================================*/

    Configurator.duplicateConfiguration =
        function () {

            const current =
                Configurator.getConfiguration();

            if (!current) {
                return null;
            }


            const newId =
                Configurator.generateId();


            Configurator.state.configurationId =
                newId;

            Configurator.state.configurationName =
                (
                    current.product.name ||
                    "Security Configuration"
                ) +
                " — " +
                newId;


            Configurator.state.timestamp =
                new Date().toISOString();


            Configurator.save();

            return Configurator.getConfiguration();
        };


    /*=====================================================
     REFRESH CONFIGURATION
    =====================================================*/

    Configurator.refresh =
        function () {

            Configurator.applyDefaults();

            Configurator.calculate();

            Configurator.validateConfiguration();

            Configurator.save();

            return Configurator.getConfiguration();
        };


    /*=====================================================
     PART 5 COMPLETE
    =====================================================*/

    Configurator.part5 = true;


    console.log(
        "[NexpakConfigurator] Part 5/8 loaded."
    );

})();
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 6/8
=========================================================*/

/*=========================================================
 CONFIGURATOR UI CONTROL & EVENT ENGINE
=========================================================*/

(function () {

    "use strict";

    const Configurator =
        window.NexpakConfigurator;


    /*=====================================================
     DEPENDENCY CHECK
    =====================================================*/

    if (!Configurator) {

        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 6."
        );

        return;
    }


    /*=====================================================
     EVENT SYSTEM
    =====================================================*/

    Configurator.events =
        Configurator.events || {};


    Configurator.events.listeners =
        Configurator.events.listeners || {};


    /*=====================================================
     ADD EVENT LISTENER
    =====================================================*/

    Configurator.on =
        function (
            eventName,
            callback
        ) {

            if (
                !eventName ||
                typeof callback !== "function"
            ) {

                return false;
            }


            if (
                !Array.isArray(
                    Configurator.events.listeners[eventName]
                )
            ) {

                Configurator.events.listeners[eventName] =
                    [];
            }


            Configurator.events.listeners[eventName]
                .push(callback);


            return true;
        };


    /*=====================================================
     REMOVE EVENT LISTENER
    =====================================================*/

    Configurator.off =
        function (
            eventName,
            callback
        ) {

            const listeners =
                Configurator.events.listeners[eventName];


            if (
                !Array.isArray(listeners)
            ) {

                return false;
            }


            const index =
                listeners.indexOf(
                    callback
                );


            if (index === -1) {

                return false;
            }


            listeners.splice(
                index,
                1
            );


            return true;
        };


    /*=====================================================
     DISPATCH EVENT
    =====================================================*/

    Configurator.emit =
        function (
            eventName,
            data = {}
        ) {

            const listeners =
                Configurator.events.listeners[eventName];


            if (
                !Array.isArray(listeners)
            ) {

                return false;
            }


            listeners.forEach(
                callback => {

                    try {

                        callback(
                            data
                        );

                    } catch (error) {

                        console.error(
                            "[NexpakConfigurator] Event error:",
                            eventName,
                            error
                        );
                    }
                }
            );


            return true;
        };


    /*=====================================================
     DOM SELECTOR
    =====================================================*/

    Configurator.$ =
        function (selector, root = document) {

            if (!selector) {
                return null;
            }

            try {

                return root.querySelector(
                    selector
                );

            } catch (error) {

                return null;
            }
        };


    /*=====================================================
     DOM SELECT ALL
    =====================================================*/

    Configurator.$$ =
        function (selector, root = document) {

            if (!selector) {
                return [];
            }

            try {

                return Array.from(
                    root.querySelectorAll(
                        selector
                    )
                );

            } catch (error) {

                return [];
            }
        };


    /*=====================================================
     GET CONFIGURATOR ROOT
     
     Supports multiple possible HTML structures.
    =====================================================*/

    Configurator.getRoot =
        function () {

            const selectors = [

                "[data-nexpak-configurator]",

                "#onlineConfigurator",

                "#online-configurator",

                ".online-configurator",

                ".configurator",

                "[data-configurator]"
            ];


            for (
                const selector of selectors
            ) {

                const element =
                    Configurator.$(
                        selector
                    );


                if (element) {

                    return element;
                }
            }


            return null;
        };


    /*=====================================================
     GET OPTION ELEMENTS
    =====================================================*/

    Configurator.getOptionElements =
        function () {

            const root =
                Configurator.getRoot();


            if (!root) {

                return [];
            }


            return Configurator.$$(
                "[data-config-option]",
                root
            );
        };


    /*=====================================================
     READ OPTION VALUE
    =====================================================*/

    Configurator.readOptionElement =
        function (element) {

            if (!element) {
                return undefined;
            }


            const key =
                element.dataset.configOption;


            if (!key) {
                return undefined;
            }


            let value;


            if (
                element.type === "checkbox"
            ) {

                value =
                    element.checked;

            } else {

                value =
                    element.value;
            }


            if (
                element.type === "number"
            ) {

                value =
                    Number(value);
            }


            return {

                key:
                    key,

                value:
                    value
            };
        };


    /*=====================================================
     WRITE OPTION TO ELEMENT
    =====================================================*/

    Configurator.writeOptionElement =
        function (
            element,
            value
        ) {

            if (!element) {
                return false;
            }


            if (
                element.type === "checkbox"
            ) {

                element.checked =
                    value === true ||
                    value === "true" ||
                    value === 1;

            } else {

                element.value =
                    value === undefined ||
                    value === null
                        ? ""
                        : value;
            }


            return true;
        };


    /*=====================================================
     SYNC DOM → STATE
    =====================================================*/

    Configurator.syncOptionsFromDOM =
        function () {

            const elements =
                Configurator.getOptionElements();


            elements.forEach(
                element => {

                    const data =
                        Configurator.readOptionElement(
                            element
                        );


                    if (!data) {
                        return;
                    }


                    Configurator.setDefinedOption(
                        data.key,
                        data.value
                    );
                }
            );


            Configurator.calculate();

            Configurator.validateConfiguration();


            Configurator.emit(
                "optionsSynced",
                {
                    state:
                        Configurator.getState()
                }
            );


            return true;
        };


    /*=====================================================
     SYNC STATE → DOM
    =====================================================*/

    Configurator.syncOptionsToDOM =
        function () {

            const elements =
                Configurator.getOptionElements();


            const options =
                Configurator.state.options;


            elements.forEach(
                element => {

                    const key =
                        element.dataset.configOption;


                    if (!key) {
                        return;
                    }


                    if (
                        options[key] !== undefined
                    ) {

                        Configurator.writeOptionElement(
                            element,
                            options[key]
                        );
                    }
                }
            );


            return true;
        };


    /*=====================================================
     UPDATE ELEMENT TEXT
    =====================================================*/

    Configurator.updateText =
        function (
            selector,
            value,
            root = document
        ) {

            const element =
                Configurator.$(
                    selector,
                    root
                );


            if (!element) {
                return false;
            }


            element.textContent =
                value === undefined ||
                value === null
                    ? ""
                    : value;


            return true;
        };


    /*=====================================================
     UPDATE PRICE DISPLAY
    =====================================================*/

    Configurator.updatePriceDisplay =
        function () {

            const calculation =
                Configurator.calculate();


            const total =
                Configurator.formatPrice(
                    calculation.total
                );


            const subtotal =
                Configurator.formatPrice(
                    calculation.subtotal
                );


            const extras =
                Configurator.formatPrice(
                    calculation.extrasTotal
                );


            const selectors = {

                total: [
                    "[data-config-total]",
                    "#configTotal",
                    ".config-total"
                ],

                subtotal: [
                    "[data-config-subtotal]",
                    "#configSubtotal",
                    ".config-subtotal"
                ],

                extras: [
                    "[data-config-extras-total]",
                    "#configExtrasTotal",
                    ".config-extras-total"
                ]
            };


            selectors.total.some(
                selector =>
                    Configurator.updateText(
                        selector,
                        total
                    )
            );


            selectors.subtotal.some(
                selector =>
                    Configurator.updateText(
                        selector,
                        subtotal
                    )
            );


            selectors.extras.some(
                selector =>
                    Configurator.updateText(
                        selector,
                        extras
                    )
            );


            Configurator.emit(
                "priceUpdated",
                {
                    subtotal:
                        calculation.subtotal,

                    extrasTotal:
                        calculation.extrasTotal,

                    total:
                        calculation.total
                }
            );


            return calculation;
        };


    /*=====================================================
     UPDATE VALIDATION DISPLAY
    =====================================================*/

    Configurator.updateValidationDisplay =
        function () {

            const validation =
                Configurator.validateConfiguration();


            const root =
                Configurator.getRoot();


            if (!root) {

                return validation;
            }


            root.classList.toggle(
                "is-valid",
                validation.valid === true
            );


            root.classList.toggle(
                "has-errors",
                validation.valid !== true
            );


            const errorContainer =
                root.querySelector(
                    "[data-config-errors]"
                );


            if (
                errorContainer
            ) {

                errorContainer.innerHTML = "";


                const errors =
                    validation.errors || [];


                errors.forEach(
                    error => {

                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "config-validation-error";


                        item.textContent =
                            error.message ||
                            "Configuration error.";


                        errorContainer.appendChild(
                            item
                        );
                    }
                );
            }


            const warningContainer =
                root.querySelector(
                    "[data-config-warnings]"
                );


            if (
                warningContainer
            ) {

                warningContainer.innerHTML =
                    "";


                const warnings =
                    validation.warnings || [];


                warnings.forEach(
                    warning => {

                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "config-validation-warning";


                        item.textContent =
                            warning.message ||
                            "Configuration warning.";


                        warningContainer.appendChild(
                            item
                        );
                    }
                );
            }


            Configurator.emit(
                "validationUpdated",
                validation
            );


            return validation;
        };


    /*=====================================================
     UPDATE SUMMARY DISPLAY
    =====================================================*/

    Configurator.updateSummaryDisplay =
        function () {

            const summary =
                Configurator.getSummary();


            const root =
                Configurator.getRoot();


            if (!root) {

                return summary;
            }


            const summaryContainer =
                root.querySelector(
                    "[data-config-summary]"
                );


            if (
                !summaryContainer
            ) {

                return summary;
            }


            summaryContainer.innerHTML =
                "";


            /*---------------------------------------------
             PRODUCT
            ---------------------------------------------*/

            if (
                summary.product
            ) {

                const productRow =
                    document.createElement(
                        "div"
                    );


                productRow.className =
                    "config-summary-product";


                productRow.textContent =
                    summary.product;


                summaryContainer.appendChild(
                    productRow
                );
            }


            /*---------------------------------------------
             OPTIONS
            ---------------------------------------------*/

            if (
                Array.isArray(
                    summary.options
                )
            ) {

                summary.options.forEach(
                    option => {

                        const row =
                            document.createElement(
                                "div"
                            );


                        row.className =
                            "config-summary-option";


                        row.textContent =
                            (
                                option.label ||
                                option.key
                            ) +
                            ": " +
                            (
                                option.displayValue
                            );


                        summaryContainer.appendChild(
                            row
                        );
                    }
                );
            }


            /*---------------------------------------------
             EXTRAS
            ---------------------------------------------*/

            if (
                Array.isArray(
                    summary.extras
                )
            ) {

                summary.extras.forEach(
                    extra => {

                        const row =
                            document.createElement(
                                "div"
                            );


                        row.className =
                            "config-summary-extra";


                        row.textContent =
                            (
                                extra.name
                            ) +
                            " × " +
                            (
                                extra.quantity
                            );


                        summaryContainer.appendChild(
                            row
                        );
                    }
                );
            }


            /*---------------------------------------------
             TOTAL
            ---------------------------------------------*/

            const totalRow =
                document.createElement(
                    "div"
                );


            totalRow.className =
                "config-summary-total";


            totalRow.textContent =
                "Total: " +
                summary.formattedTotal;


            summaryContainer.appendChild(
                totalRow
            );


            Configurator.emit(
                "summaryUpdated",
                summary
            );


            return summary;
        };


    /*=====================================================
     UPDATE CONFIGURATION ID DISPLAY
    =====================================================*/

    Configurator.updateIdDisplay =
        function () {

            const id =
                Configurator.state.configurationId;


            const selectors = [

                "[data-config-id]",

                "#configId",

                ".config-id"
            ];


            selectors.some(
                selector =>
                    Configurator.updateText(
                        selector,
                        id || ""
                    )
            );


            return id;
        };


    /*=====================================================
     UPDATE CONFIGURATION STATUS
    =====================================================*/

    Configurator.updateStatusDisplay =
        function () {

            const status =
                Configurator.getConfigurationStatus();


            const root =
                Configurator.getRoot();


            if (root) {

                root.dataset.configStatus =
                    status;


                root.classList.toggle(
                    "config-ready",
                    status === "ready"
                );


                root.classList.toggle(
                    "config-incomplete",
                    status === "incomplete"
                );


                root.classList.toggle(
                    "config-not-started",
                    status === "not-started"
                );
            }


            Configurator.updateText(
                "[data-config-status]",
                status
            );


            return status;
        };


    /*=====================================================
     UPDATE ALL UI
    =====================================================*/

    Configurator.updateUI =
        function () {

            Configurator.syncOptionsToDOM();

            Configurator.updatePriceDisplay();

            Configurator.updateValidationDisplay();

            Configurator.updateSummaryDisplay();

            Configurator.updateIdDisplay();

            Configurator.updateStatusDisplay();


            Configurator.emit(
                "uiUpdated",
                {
                    state:
                        Configurator.getState()
                }
            );


            return true;
        };


    /*=====================================================
     HANDLE OPTION CHANGE
    =====================================================*/

    Configurator.handleOptionChange =
        function (element) {

            const data =
                Configurator.readOptionElement(
                    element
                );


            if (!data) {
                return false;
            }


            const success =
                Configurator.setDefinedOption(
                    data.key,
                    data.value
                );


            if (!success) {

                return false;
            }


            Configurator.calculate();

            Configurator.validateConfiguration();

            Configurator.updateUI();


            Configurator.emit(
                "optionChanged",
                {
                    key:
                        data.key,

                    value:
                        data.value,

                    state:
                        Configurator.getState()
                }
            );


            return true;
        };


    /*=====================================================
     HANDLE BASE QUANTITY
    =====================================================*/

    Configurator.handleBaseQuantity =
        function (element) {

            if (!element) {
                return false;
            }


            let quantity =
                Number(
                    element.value
                );


            if (
                !Number.isFinite(quantity)
            ) {

                quantity = 1;
            }


            Configurator.setBaseQuantity(
                quantity
            );


            Configurator.updateUI();


            Configurator.emit(
                "quantityChanged",
                {
                    quantity:
                        Configurator.getBaseQuantity()
                }
            );


            return true;
        };


    /*=====================================================
     RESET BUTTON
    =====================================================*/

    Configurator.handleReset =
        function () {

            const confirmed =
                window.confirm(
                    "Reset this security configuration?"
                );


            if (!confirmed) {

                return false;
            }


            Configurator.reset();

            Configurator.updateUI();


            Configurator.emit(
                "configurationReset",
                {}
            );


            return true;
        };


    /*=====================================================
     SAVE CONFIGURATION
    =====================================================*/

    Configurator.handleSave =
        function () {

            Configurator.refresh();

            Configurator.save();


            Configurator.emit(
                "configurationSaved",
                {
                    configuration:
                        Configurator.getConfiguration()
                }
            );


            return true;
        };


    /*=====================================================
     EVENT DELEGATION
    =====================================================*/

    Configurator.bindUIEvents =
        function () {

            const root =
                Configurator.getRoot();


            if (!root) {

                return false;
            }


            if (
                root.dataset.configuratorBound ===
                "true"
            ) {

                return true;
            }


            /*---------------------------------------------
             OPTION CHANGES
            ---------------------------------------------*/

            root.addEventListener(
                "change",
                function (event) {

                    const option =
                        event.target.closest(
                            "[data-config-option]"
                        );


                    if (option) {

                        Configurator.handleOptionChange(
                            option
                        );

                        return;
                    }


                    const quantity =
                        event.target.closest(
                            "[data-config-quantity]"
                        );


                    if (quantity) {

                        Configurator.handleBaseQuantity(
                            quantity
                        );
                    }
                }
            );


            /*---------------------------------------------
             CLICK EVENTS
            ---------------------------------------------*/

            root.addEventListener(
                "click",
                function (event) {

                    const resetButton =
                        event.target.closest(
                            "[data-config-reset]"
                        );


                    if (resetButton) {

                        event.preventDefault();

                        Configurator.handleReset();

                        return;
                    }


                    const saveButton =
                        event.target.closest(
                            "[data-config-save]"
                        );


                    if (saveButton) {

                        event.preventDefault();

                        Configurator.handleSave();

                        return;
                    }


                    const refreshButton =
                        event.target.closest(
                            "[data-config-refresh]"
                        );


                    if (refreshButton) {

                        event.preventDefault();

                        Configurator.refresh();

                        Configurator.updateUI();

                        return;
                    }
                }
            );


            root.dataset.configuratorBound =
                "true";


            Configurator.emit(
                "uiBound",
                {
                    root:
                        root
                }
            );


            return true;
        };


    /*=====================================================
     INITIALIZE UI
    =====================================================*/

    Configurator.initUI =
        function () {

            const root =
                Configurator.getRoot();


            if (!root) {

                return false;
            }


            Configurator.bindUIEvents();

            Configurator.syncOptionsToDOM();

            Configurator.updateUI();


            Configurator.emit(
                "uiInitialized",
                {
                    root:
                        root,

                    state:
                        Configurator.getState()
                }
            );


            return true;
        };


    /*=====================================================
     WATCH FOR DYNAMIC ROOT
    =====================================================*/

    Configurator.observeDOM =
        function () {

            if (
                Configurator.domObserver
            ) {

                return true;
            }


            if (
                typeof MutationObserver ===
                "undefined"
            ) {

                return false;
            }


            Configurator.domObserver =
                new MutationObserver(
                    function () {

                        const root =
                            Configurator.getRoot();


                        if (
                            root &&
                            root.dataset.configuratorBound !==
                            "true"
                        ) {

                            Configurator.initUI();
                        }
                    }
                );


            Configurator.domObserver.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );


            return true;
        };


    /*=====================================================
     CONFIGURATION CHANGE EVENT
    =====================================================*/

    Configurator.on(
        "optionChanged",
        function () {

            Configurator.updatePriceDisplay();

            Configurator.updateValidationDisplay();

            Configurator.updateSummaryDisplay();

            Configurator.updateStatusDisplay();
        }
    );


    /*=====================================================
     INITIALIZE AFTER DOM READY
    =====================================================*/

    Configurator.initPart6 =
        function () {

            Configurator.initUI();

            Configurator.observeDOM();

            Configurator.emit(
                "part6Initialized",
                {}
            );

            return true;
        };


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            Configurator.initPart6
        );

    } else {

        Configurator.initPart6();
    }


    /*=====================================================
     PART 6 COMPLETE
    =====================================================*/

    Configurator.part6 =
        true;


    console.log(
        "[NexpakConfigurator] Part 6/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 7/8
=========================================================*/

/*=========================================================
 CONFIGURED PRODUCT / CART HANDOFF ENGINE
=========================================================*/

(function () {

    "use strict";

    const Configurator =
        window.NexpakConfigurator;


    /*=====================================================
     DEPENDENCY CHECK
    =====================================================*/

    if (!Configurator) {

        console.error(
            "[NexpakConfigurator] Part 1 is required before Part 7."
        );

        return;
    }


    /*=====================================================
     CART PAYLOAD VERSION
    =====================================================*/

    Configurator.cartPayloadVersion =
        "1.0.0";


    /*=====================================================
     CREATE CONFIGURED SKU
    =====================================================*/

    Configurator.generateConfiguredSKU =
        function () {

            const product =
                Configurator.getProduct();

            const productSKU =
                product
                    ? (
                        product.sku ||
                        product.SKU ||
                        product.code ||
                        product.productCode ||
                        product.id ||
                        product.productId ||
                        "PRODUCT"
                    )
                    : "PRODUCT";


            const configurationId =
                Configurator.state.configurationId ||
                Configurator.generateId();


            const cleanProductSKU =
                String(productSKU)
                    .replace(
                        /[^a-zA-Z0-9_-]/g,
                        ""
                    )
                    .toUpperCase();


            const cleanConfigID =
                String(configurationId)
                    .replace(
                        /[^a-zA-Z0-9_-]/g,
                        ""
                    )
                    .toUpperCase();


            return (
                cleanProductSKU +
                "-CONFIG-" +
                cleanConfigID
            );
        };


    /*=====================================================
     CREATE OPTION IDENTIFIER
    =====================================================*/

    Configurator.generateOptionIdentifier =
        function (option) {

            if (!option) {
                return "";
            }


            const key =
                option.key ||
                "";


            const value =
                option.value === undefined ||
                option.value === null
                    ? ""
                    : option.value;


            return (
                String(key)
                    .replace(
                        /[^a-zA-Z0-9_-]/g,
                        ""
                    )
                    .toUpperCase()
                +
                "=" +
                String(value)
                    .replace(
                        /[^a-zA-Z0-9_-]/g,
                        ""
                    )
                    .toUpperCase()
            );
        };


    /*=====================================================
     CREATE CONFIGURATION DESCRIPTION
    =====================================================*/

    Configurator.generateConfigurationDescription =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return "";
            }


            const parts = [];


            if (
                configuration.product &&
                configuration.product.name
            ) {

                parts.push(
                    configuration.product.name
                );
            }


            if (
                Array.isArray(
                    configuration.options
                )
            ) {

                configuration.options.forEach(
                    option => {

                        if (
                            !option
                        ) {
                            return;
                        }


                        const label =
                            option.label ||
                            option.key;


                        const value =
                            option.displayValue;


                        if (
                            label &&
                            value !== undefined &&
                            value !== ""
                        ) {

                            parts.push(
                                label +
                                ": " +
                                value
                            );
                        }
                    }
                );
            }


            if (
                Array.isArray(
                    configuration.extras
                ) &&
                configuration.extras.length
            ) {

                parts.push(
                    "Extras: " +
                    configuration.extras
                        .map(
                            extra =>
                                extra.name +
                                " x" +
                                extra.quantity
                        )
                        .join(", ")
                );
            }


            return parts.join(
                " | "
            );
        };


    /*=====================================================
     BUILD CONFIGURATION METADATA
    =====================================================*/

    Configurator.buildConfigurationMetadata =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return {};
            }


            return {

                configurationId:
                    configuration.id,

                configurationName:
                    configuration.name,

                configuredSKU:
                    Configurator.generateConfiguredSKU(),

                version:
                    Configurator.cartPayloadVersion,

                category:
                    configuration.product.category,

                brand:
                    configuration.product.brand,

                status:
                    configuration.status,

                createdAt:
                    configuration.createdAt,

                updatedAt:
                    configuration.updatedAt
            };
        };


    /*=====================================================
     BUILD CART OPTIONS
    =====================================================*/

    Configurator.buildCartOptions =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {
                return [];
            }


            return configuration.options
                .map(
                    option => {

                        if (!option) {
                            return null;
                        }


                        return {

                            key:
                                option.key,

                            label:
                                option.label,

                            value:
                                option.value,

                            displayValue:
                                option.displayValue,

                            type:
                                option.type,

                            price:
                                option.price
                        };
                    }
                )
                .filter(Boolean);
        };


    /*=====================================================
     BUILD CART EXTRAS
    =====================================================*/

    Configurator.buildCartExtras =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {
                return [];
            }


            return configuration.extras
                .map(
                    extra => {

                        if (!extra) {
                            return null;
                        }


                        return {

                            id:
                                extra.id,

                            sku:
                                extra.sku,

                            code:
                                extra.code,

                            name:
                                extra.name,

                            quantity:
                                extra.quantity,

                            unitPrice:
                                extra.unitPrice,

                            total:
                                extra.total
                        };
                    }
                )
                .filter(Boolean);
        };


    /*=====================================================
     BUILD CART ITEM
    =====================================================*/

    Configurator.buildCartItem =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return null;
            }


            const validation =
                configuration.validation;


            /*---------------------------------------------
             BLOCK INVALID CONFIGURATION
            ---------------------------------------------*/

            if (
                !validation ||
                validation.valid !== true
            ) {

                return {

                    valid:
                        false,

                    errors:
                        validation
                            ? validation.errors || []
                            : [
                                {
                                    code:
                                        "INVALID_CONFIGURATION",

                                    field:
                                        null,

                                    message:
                                        "Configuration is not valid."
                                }
                            ]
                };
            }


            const product =
                configuration.product;


            const configuredSKU =
                Configurator.generateConfiguredSKU();


            const quantity =
                Configurator.getBaseQuantity();


            const description =
                Configurator.generateConfigurationDescription();


            const price =
                Configurator.toNumber(
                    configuration.pricing.total,
                    0
                );


            /*---------------------------------------------
             CART ITEM
            ---------------------------------------------*/

            const cartItem = {

                valid:
                    true,

                id:
                    configuredSKU,

                productId:
                    product.id,

                sku:
                    configuredSKU,

                baseSku:
                    product.sku ||
                    product.SKU ||
                    product.code ||
                    null,

                code:
                    product.code ||
                    product.productCode ||
                    null,

                name:
                    configuration.name,

                productName:
                    product.name,

                title:
                    configuration.name,

                description:
                    description,

                category:
                    product.category,

                brand:
                    product.brand,

                image:
                    product.image,

                quantity:
                    quantity,

                unitPrice:
                    Number(
                        (
                            price /
                            Math.max(
                                quantity,
                                1
                            )
                        ).toFixed(2)
                    ),

                price:
                    price,

                total:
                    price,

                currency:
                    "ZAR",

                configurable:
                    true,

                configured:
                    true,

                configurationId:
                    configuration.id,

                configurationName:
                    configuration.name,

                configuration: {

                    id:
                        configuration.id,

                    name:
                        configuration.name,

                    options:
                        Configurator.buildCartOptions(),

                    optionValues:
                        Configurator.clone(
                            configuration.optionValues
                        ),

                    quantities:
                        Configurator.clone(
                            configuration.quantities
                        ),

                    extras:
                        Configurator.buildCartExtras()
                },

                metadata:
                    Configurator.buildConfigurationMetadata(),

                addedAt:
                    new Date().toISOString()
            };


            return cartItem;
        };


    /*=====================================================
     GET CART PAYLOAD
    =====================================================*/

    Configurator.getCartPayload =
        function () {

            const cartItem =
                Configurator.buildCartItem();


            if (!cartItem) {

                return {

                    valid:
                        false,

                    item:
                        null,

                    configuration:
                        null,

                    errors: [
                        {
                            code:
                                "NO_CONFIGURATION",

                            field:
                                null,

                            message:
                                "No configuration is available."
                        }
                    ]
                };
            }


            if (
                cartItem.valid !== true
            ) {

                return {

                    valid:
                        false,

                    item:
                        null,

                    configuration:
                        Configurator.getConfiguration(),

                    errors:
                        cartItem.errors || []
                };
            }


            return {

                valid:
                    true,

                item:
                    cartItem,

                configuration:
                    Configurator.getConfiguration(),

                errors:
                    []
            };
        };


    /*=====================================================
     GET CART ITEM DIRECTLY
    =====================================================*/

    Configurator.getCartItem =
        function () {

            const payload =
                Configurator.getCartPayload();


            if (
                !payload.valid
            ) {

                return null;
            }


            return payload.item;
        };


    /*=====================================================
     CHECK CART COMPATIBILITY
     
     Detects common cart-engine APIs without
     modifying onlinecart.js.
    =====================================================*/

    Configurator.getCartEngine =
        function () {

            return (
                window.NexpakCart ||
                window.NexpakCartEngine ||
                window.OnlineCart ||
                window.onlineCart ||
                window.CartEngine ||
                window.cartEngine ||
                null
            );
        };


    /*=====================================================
     FIND CART ADD METHOD
    =====================================================*/

    Configurator.findCartAddMethod =
        function (cart) {

            if (!cart) {
                return null;
            }


            const methods = [

                "addItem",

                "add",

                "addToCart",

                "addProduct",

                "insertItem",

                "pushItem"
            ];


            for (
                const method of methods
            ) {

                if (
                    typeof cart[method] ===
                    "function"
                ) {

                    return method;
                }
            }


            return null;
        };


    /*=====================================================
     PREPARE CART HANDOFF
     
     This does NOT automatically add to cart.
    =====================================================*/

    Configurator.prepareCartHandoff =
        function () {

            const payload =
                Configurator.getCartPayload();


            if (!payload.valid) {

                Configurator.emit(
                    "cartHandoffFailed",
                    payload
                );


                return payload;
            }


            const handoff = {

                valid:
                    true,

                type:
                    "configured-product",

                version:
                    Configurator.cartPayloadVersion,

                item:
                    payload.item,

                configuration:
                    payload.configuration,

                timestamp:
                    new Date().toISOString()
            };


            Configurator.state.lastCartHandoff =
                Configurator.clone(
                    handoff
                );


            Configurator.save();


            Configurator.emit(
                "cartHandoffPrepared",
                handoff
            );


            return handoff;
        };


    /*=====================================================
     ADD CONFIGURATION TO CART
     
     Attempts to use an existing cart engine.
     It does NOT replace or rewrite that engine.
    =====================================================*/

    Configurator.addToCart =
        function () {

            const handoff =
                Configurator.prepareCartHandoff();


            if (
                !handoff.valid
            ) {

                return {

                    success:
                        false,

                    reason:
                        "invalid-configuration",

                    errors:
                        handoff.errors ||
                        []
                };
            }


            const cart =
                Configurator.getCartEngine();


            if (!cart) {

                Configurator.emit(
                    "cartEngineUnavailable",
                    {
                        handoff:
                            handoff
                    }
                );


                return {

                    success:
                        false,

                    reason:
                        "cart-engine-unavailable",

                    handoff:
                        handoff,

                    item:
                        handoff.item
                };
            }


            const method =
                Configurator.findCartAddMethod(
                    cart
                );


            if (!method) {

                Configurator.emit(
                    "cartAddMethodUnavailable",
                    {
                        cart:
                            cart,

                        handoff:
                            handoff
                    }
                );


                return {

                    success:
                        false,

                    reason:
                        "cart-add-method-unavailable",

                    handoff:
                        handoff
                };
            }


            try {

                const result =
                    cart[method](
                        handoff.item
                    );


                Configurator.emit(
                    "configurationAddedToCart",
                    {
                        result:
                            result,

                        item:
                            handoff.item,

                        handoff:
                            handoff
                    }
                );


                return {

                    success:
                        true,

                    method:
                        method,

                    result:
                        result,

                    item:
                        handoff.item,

                    handoff:
                        handoff
                };


            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Cart handoff failed:",
                    error
                );


                Configurator.emit(
                    "cartHandoffError",
                    {
                        error:
                            error,

                        handoff:
                            handoff
                    }
                );


                return {

                    success:
                        false,

                    reason:
                        "cart-error",

                    error:
                        error,

                    handoff:
                        handoff
                };
            }
        };


    /*=====================================================
     CONFIGURATION ADD BUTTON
    =====================================================*/

    Configurator.bindCartButton =
        function () {

            const root =
                Configurator.getRoot();


            if (!root) {
                return false;
            }


            if (
                root.dataset.configCartBound ===
                "true"
            ) {

                return true;
            }


            root.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            "[data-config-add-cart]"
                        );


                    if (!button) {
                        return;
                    }


                    event.preventDefault();


                    button.disabled =
                        true;


                    button.dataset.originalText =
                        button.textContent;


                    button.textContent =
                        "Adding...";


                    const result =
                        Configurator.addToCart();


                    if (
                        result.success
                    ) {

                        button.textContent =
                            "Added to Cart";


                        button.classList.add(
                            "is-added"
                        );


                        Configurator.emit(
                            "cartButtonSuccess",
                            result
                        );


                    } else {

                        button.disabled =
                            false;


                        button.textContent =
                            button.dataset.originalText ||
                            "Add to Cart";


                        Configurator.emit(
                            "cartButtonError",
                            result
                        );
                    }


                    window.setTimeout(
                        function () {

                            button.disabled =
                                false;

                        },
                        1200
                    );
                }
            );


            root.dataset.configCartBound =
                "true";


            return true;
        };


    /*=====================================================
     CHECKOUT PREPARATION ONLY
     
     This prepares data for future integration.
     It does not call checkout.
    =====================================================*/

    Configurator.prepareCheckoutData =
        function () {

            const handoff =
                Configurator.prepareCartHandoff();


            if (
                !handoff.valid
            ) {

                return {

                    valid:
                        false,

                    data:
                        null,

                    errors:
                        handoff.errors || []
                };
            }


            return {

                valid:
                    true,

                data: {

                    type:
                        "configured-product",

                    configurationId:
                        handoff.configuration.id,

                    configuration:
                        handoff.configuration,

                    item:
                        handoff.item,

                    amount:
                        handoff.item.total,

                    currency:
                        "ZAR"
                },

                errors:
                    []
            };
        };


    /*=====================================================
     CLEAR LAST HANDOFF
    =====================================================*/

    Configurator.clearLastHandoff =
        function () {

            delete Configurator.state
                .lastCartHandoff;


            Configurator.save();


            return true;
        };


    /*=====================================================
     CONFIGURATION READY EVENT
    =====================================================*/

    Configurator.emit(
        "configurationHandoffReady",
        {
            version:
                Configurator.cartPayloadVersion
        }
    );


    /*=====================================================
     PART 7 COMPLETE
    =====================================================*/

    Configurator.part7 =
        true;


    console.log(
        "[NexpakConfigurator] Part 7/8 loaded."
    );

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CONFIGURATOR ENGINE
 File: onlineconfigurator.js
 Part: 8/8
=========================================================*/

/*=========================================================
 FINALIZATION / PERSISTENCE / DIAGNOSTICS / PUBLIC API
=========================================================*/

(function () {

    "use strict";

    const Configurator =
        window.NexpakConfigurator;


    /*=====================================================
     DEPENDENCY CHECK
    =====================================================*/

    if (!Configurator) {

        console.error(
            "[NexpakConfigurator] Configurator core is missing."
        );

        return;
    }


    /*=====================================================
     VERSION
    =====================================================*/

    Configurator.version =
        "1.0.0";

    Configurator.engine =
        "onlineconfigurator";

    Configurator.completedParts =
        8;


    /*=====================================================
     STORAGE KEY
    =====================================================*/

    Configurator.storageKey =
        Configurator.storageKey ||
        "nexpak_online_configurator";


    /*=====================================================
     SAFE STORAGE
    =====================================================*/

    Configurator.storageAvailable =
        function () {

            try {

                const testKey =
                    "__nexpak_config_test__";

                localStorage.setItem(
                    testKey,
                    "1"
                );

                localStorage.removeItem(
                    testKey
                );

                return true;

            } catch (error) {

                return false;
            }
        };


    /*=====================================================
     PERSIST CONFIGURATION
    =====================================================*/

    Configurator.persist =
        function () {

            if (
                !Configurator.storageAvailable()
            ) {

                return false;
            }


            try {

                const configuration =
                    Configurator.getConfiguration();


                if (!configuration) {

                    return false;
                }


                localStorage.setItem(
                    Configurator.storageKey,
                    JSON.stringify(
                        configuration
                    )
                );


                Configurator.emit(
                    "configurationPersisted",
                    {
                        configuration:
                            configuration
                    }
                );


                return true;

            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Persistence failed:",
                    error
                );


                return false;
            }
        };


    /*=====================================================
     RESTORE CONFIGURATION
    =====================================================*/

    Configurator.restore =
        function () {

            if (
                !Configurator.storageAvailable()
            ) {

                return false;
            }


            try {

                const stored =
                    localStorage.getItem(
                        Configurator.storageKey
                    );


                if (!stored) {

                    return false;
                }


                const parsed =
                    JSON.parse(
                        stored
                    );


                if (
                    !parsed ||
                    typeof parsed !== "object"
                ) {

                    return false;
                }


                const restored =
                    Configurator.importConfiguration(
                        parsed
                    );


                if (restored) {

                    Configurator.emit(
                        "configurationRestored",
                        {
                            configuration:
                                Configurator.getConfiguration()
                        }
                    );
                }


                return restored;

            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Restore failed:",
                    error
                );


                return false;
            }
        };


    /*=====================================================
     CLEAR PERSISTED CONFIGURATION
    =====================================================*/

    Configurator.clearPersisted =
        function () {

            if (
                !Configurator.storageAvailable()
            ) {

                return false;
            }


            try {

                localStorage.removeItem(
                    Configurator.storageKey
                );


                Configurator.emit(
                    "configurationStorageCleared",
                    {}
                );


                return true;

            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Storage clear failed:",
                    error
                );


                return false;
            }
        };


    /*=====================================================
     AUTO SAVE
    =====================================================*/

    Configurator.enableAutoSave =
        function () {

            if (
                Configurator.autoSaveEnabled
            ) {

                return true;
            }


            Configurator.autoSaveEnabled =
                true;


            const saveEvents = [

                "optionChanged",

                "quantityChanged",

                "configurationReset",

                "configurationSaved"
            ];


            saveEvents.forEach(
                eventName => {

                    Configurator.on(
                        eventName,
                        function () {

                            Configurator.persist();

                        }
                    );
                }
            );


            return true;
        };


    /*=====================================================
     DISABLE AUTO SAVE
    =====================================================*/

    Configurator.disableAutoSave =
        function () {

            Configurator.autoSaveEnabled =
                false;


            return true;
        };


    /*=====================================================
     CONFIGURATION SNAPSHOT
    =====================================================*/

    Configurator.createSnapshot =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return null;
            }


            return {

                timestamp:
                    new Date().toISOString(),

                configuration:
                    Configurator.clone(
                        configuration
                    )
            };
        };


    /*=====================================================
     RESTORE SNAPSHOT
    =====================================================*/

    Configurator.restoreSnapshot =
        function (snapshot) {

            if (
                !snapshot ||
                !snapshot.configuration
            ) {

                return false;
            }


            const result =
                Configurator.importConfiguration(
                    snapshot.configuration
                );


            if (result) {

                Configurator.updateUI();

                Configurator.emit(
                    "snapshotRestored",
                    {
                        snapshot:
                            snapshot
                    }
                );
            }


            return result;
        };


    /*=====================================================
     CONFIGURATION HASH
     
     Used to identify configuration changes.
    =====================================================*/

    Configurator.getConfigurationHash =
        function () {

            const configuration =
                Configurator.getConfiguration();


            if (!configuration) {

                return null;
            }


            const source =
                JSON.stringify({

                    product:
                        configuration.product,

                    optionValues:
                        configuration.optionValues,

                    quantities:
                        configuration.quantities,

                    extras:
                        configuration.extras
                });


            let hash =
                0;


            for (
                let index = 0;
                index < source.length;
                index++
            ) {

                hash =
                    (
                        (
                            hash << 5
                        ) -
                        hash
                    ) +
                    source.charCodeAt(
                        index
                    );


                hash |= 0;
            }


            return (
                "CFG-" +
                Math.abs(hash)
                    .toString(16)
                    .toUpperCase()
            );
        };


    /*=====================================================
     DIRTY STATE
    =====================================================*/

    Configurator.markClean =
        function () {

            Configurator.state.savedHash =
                Configurator.getConfigurationHash();


            return true;
        };


    Configurator.isDirty =
        function () {

            const currentHash =
                Configurator.getConfigurationHash();


            return (
                currentHash !==
                Configurator.state.savedHash
            );
        };


    /*=====================================================
     UPDATE DIRTY STATE
    =====================================================*/

    Configurator.updateDirtyState =
        function () {

            const dirty =
                Configurator.isDirty();


            const root =
                Configurator.getRoot();


            if (root) {

                root.classList.toggle(
                    "is-dirty",
                    dirty
                );


                root.classList.toggle(
                    "is-clean",
                    !dirty
                );


                root.dataset.configDirty =
                    dirty
                        ? "true"
                        : "false";
            }


            Configurator.emit(
                "dirtyStateChanged",
                {
                    dirty:
                        dirty
                }
            );


            return dirty;
        };


    /*=====================================================
     DIAGNOSTICS
    =====================================================*/

    Configurator.diagnostics =
        function () {

            const product =
                Configurator.getProduct();


            const validation =
                Configurator.validateConfiguration();


            const configuration =
                Configurator.getConfiguration();


            const cart =
                Configurator.getCartEngine();


            return {

                engine:
                    Configurator.engine,

                version:
                    Configurator.version,

                completedParts:
                    Configurator.completedParts,

                configuratorReady:
                    true,

                productSelected:
                    !!product,

                configurationAvailable:
                    !!configuration,

                configurationValid:
                    validation.valid === true,

                cartEngineAvailable:
                    !!cart,

                storageAvailable:
                    Configurator.storageAvailable(),

                autoSaveEnabled:
                    Configurator.autoSaveEnabled === true,

                dirty:
                    Configurator.isDirty(),

                configurationId:
                    Configurator.state.configurationId ||
                    null,

                configurationHash:
                    Configurator.getConfigurationHash(),

                timestamp:
                    new Date().toISOString()
            };
        };


    /*=====================================================
     HEALTH CHECK
    =====================================================*/

    Configurator.healthCheck =
        function () {

            const diagnostics =
                Configurator.diagnostics();


            const checks = {

                core:
                    true,

                product:
                    diagnostics.productSelected,

                configuration:
                    diagnostics.configurationAvailable,

                validation:
                    diagnostics.configurationValid,

                storage:
                    diagnostics.storageAvailable
            };


            const passed =
                Object.keys(checks)
                    .filter(
                        key =>
                            key !== "product" &&
                            key !== "configuration"
                    )
                    .every(
                        key =>
                            checks[key] === true
                    );


            return {

                healthy:
                    passed,

                checks:
                    checks,

                diagnostics:
                    diagnostics
            };
        };


    /*=====================================================
     CLEANUP
    =====================================================*/

    Configurator.destroy =
        function () {

            if (
                Configurator.domObserver
            ) {

                Configurator.domObserver.disconnect();

                Configurator.domObserver =
                    null;
            }


            const root =
                Configurator.getRoot();


            if (root) {

                root.dataset.configuratorBound =
                    "false";

                root.dataset.configCartBound =
                    "false";
            }


            Configurator.emit(
                "destroyed",
                {}
            );


            return true;
        };


    /*=====================================================
     FINAL UI REFRESH
    =====================================================*/

    Configurator.finalizeUI =
        function () {

            try {

                Configurator.updateUI();

                Configurator.updateDirtyState();

                Configurator.markClean();

                Configurator.updateDirtyState();

                return true;

            } catch (error) {

                console.error(
                    "[NexpakConfigurator] Final UI refresh failed:",
                    error
                );


                return false;
            }
        };


    /*=====================================================
     FINAL INITIALIZATION
    =====================================================*/

    Configurator.initialize =
        function () {

            try {

                /*-----------------------------------------
                 APPLY DEFAULTS
                -----------------------------------------*/

                if (
                    typeof Configurator.applyDefaults ===
                    "function"
                ) {

                    Configurator.applyDefaults();
                }


                /*-----------------------------------------
                 RESTORE SAVED CONFIGURATION
                -----------------------------------------*/

                Configurator.restore();


                /*-----------------------------------------
                 CALCULATE
                -----------------------------------------*/

                if (
                    typeof Configurator.calculate ===
                    "function"
                ) {

                    Configurator.calculate();
                }


                /*-----------------------------------------
                 VALIDATE
                -----------------------------------------*/

                if (
                    typeof Configurator.validateConfiguration ===
                    "function"
                ) {

                    Configurator.validateConfiguration();
                }


                /*-----------------------------------------
                 UI
                -----------------------------------------*/

                if (
                    typeof Configurator.initUI ===
                    "function"
                ) {

                    Configurator.initUI();
                }


                if (
                    typeof Configurator.bindCartButton ===
                    "function"
                ) {

                    Configurator.bindCartButton();
                }


                /*-----------------------------------------
                 AUTO SAVE
                -----------------------------------------*/

                Configurator.enableAutoSave();


                /*-----------------------------------------
                 FINAL STATE
                -----------------------------------------*/

                Configurator.finalizeUI();


                Configurator.initialized =
                    true;


                Configurator.emit(
                    "initialized",
                    {
                        diagnostics:
                            Configurator.diagnostics()
                    }
                );


                return true;

            } catch (error) {

                Configurator.initialized =
                    false;


                console.error(
                    "[NexpakConfigurator] Initialization failed:",
                    error
                );


                Configurator.emit(
                    "initializationError",
                    {
                        error:
                            error
                    }
                );


                return false;
            }
        };


    /*=====================================================
     PUBLIC API
    =====================================================*/

    Configurator.api = {

        version:
            Configurator.version,

        initialize:
            Configurator.initialize,

        getProduct:
            Configurator.getProduct,

        setProduct:
            Configurator.setProduct,

        getConfiguration:
            Configurator.getConfiguration,

        getSummary:
            Configurator.getSummary,

        getState:
            Configurator.getState,

        reset:
            Configurator.reset,

        calculate:
            Configurator.calculate,

        validate:
            Configurator.validateConfiguration,

        updateUI:
            Configurator.updateUI,

        refresh:
            Configurator.refresh,

        save:
            Configurator.save,

        persist:
            Configurator.persist,

        restore:
            Configurator.restore,

        export:
            Configurator.exportConfiguration,

        import:
            Configurator.importConfiguration,

        createSnapshot:
            Configurator.createSnapshot,

        restoreSnapshot:
            Configurator.restoreSnapshot,

        getHash:
            Configurator.getConfigurationHash,

        isDirty:
            Configurator.isDirty,

        diagnostics:
            Configurator.diagnostics,

        healthCheck:
            Configurator.healthCheck,

        prepareCart:
            Configurator.prepareCartHandoff,

        getCartItem:
            Configurator.getCartItem,

        getCartPayload:
            Configurator.getCartPayload,

        addToCart:
            Configurator.addToCart,

        prepareCheckout:
            Configurator.prepareCheckoutData,

        on:
            Configurator.on,

        off:
            Configurator.off
    };


    /*=====================================================
     GLOBAL ALIASES
    =====================================================*/

    window.NexpakOnlineConfigurator =
        Configurator;

    window.onlineConfigurator =
        Configurator;


    /*=====================================================
     FINAL EVENT HOOKS
    =====================================================*/

    Configurator.on(
        "optionChanged",
        function () {

            Configurator.updateDirtyState();

        }
    );


    Configurator.on(
        "quantityChanged",
        function () {

            Configurator.updateDirtyState();

        }
    );


    Configurator.on(
        "configurationSaved",
        function () {

            Configurator.markClean();

            Configurator.updateDirtyState();

        }
    );


    Configurator.on(
        "configurationReset",
        function () {

            Configurator.markClean();

            Configurator.updateDirtyState();

        }
    );


    /*=====================================================
     START ENGINE
    =====================================================*/

    function startConfigurator() {

        if (
            Configurator.initialized
        ) {

            return;
        }


        Configurator.initialize();
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startConfigurator,
            {
                once:
                    true
            }
        );

    } else {

        startConfigurator();
    }


    /*=====================================================
     FINAL ENGINE STATUS
    =====================================================*/

    Configurator.part8 =
        true;

    Configurator.complete =
        true;

    Configurator.status =
        "COMPLETE";


    console.log(
        "================================================="
    );

    console.log(
        "[NexpakConfigurator] onlineconfigurator.js"
    );

    console.log(
        "[NexpakConfigurator] VERSION:",
        Configurator.version
    );

    console.log(
        "[NexpakConfigurator] PARTS:",
        "8/8 COMPLETE"
    );

    console.log(
        "[NexpakConfigurator] STATUS:",
        "READY"
    );

    console.log(
        "================================================="
    );

})();
