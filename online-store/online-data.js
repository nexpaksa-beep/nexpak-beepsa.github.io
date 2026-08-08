/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 1/8

 PURPOSE:
 - Master product database foundation
 - Store categories
 - Subcategories
 - Brands
 - Product schema
 - Store configuration
 - Database containers

 IMPORTANT:
 This file is the SINGLE SOURCE OF TRUTH for store data.

 Build Order:
 1. online-data.js
 2. online.js
 3. onlinecart.js
 4. onlinecheckout.js
 5. onlineconfigurator.js
 6. onlinedelivery.js
 7. onlinescript.js
 8. onlineui.js
 9. online.css
=========================================================*/


/*=========================================================
 1. GLOBAL STORE CONFIGURATION
=========================================================*/

const NEXPAK_ONLINE_STORE = {

    version: "1.0",

    name: "NEXPAK Security Solutions",

    storeName: "NEXPAK Online Store",

    country: "South Africa",

    currency: "ZAR",

    currencySymbol: "R",

    language: "en-ZA",

    defaultCategory: "all",

    defaultSort: "featured",

    productsPerPage: 24,

    company: {

        name: "NEXPAK Security Solutions",

        industry: "Security Equipment & Solutions",

        country: "South Africa"

    }

};


/*=========================================================
 2. MAIN STORE CATEGORIES
=========================================================*/

const NEXPAK_CATEGORIES = [

    {
        id: "all",
        name: "All Products",
        slug: "all",
        icon: "fa-solid fa-border-all",
        description: "Browse the complete NEXPAK security product range."
    },

    {
        id: "electric-fencing",
        name: "Electric Fencing",
        slug: "electric-fencing",
        icon: "fa-solid fa-bolt",
        description: "Electric fencing energizers, kits, accessories and agricultural solutions."
    },

    {
        id: "cctv",
        name: "CCTV",
        slug: "cctv",
        icon: "fa-solid fa-video",
        description: "Professional CCTV cameras, DVRs, XVRs and complete surveillance kits."
    },

    {
        id: "ip-cctv",
        name: "IP CCTV",
        slug: "ip-cctv",
        icon: "fa-solid fa-network-wired",
        description: "IP cameras, NVRs, PoE systems and network surveillance equipment."
    },

    {
        id: "ptz",
        name: "PTZ Cameras",
        slug: "ptz",
        icon: "fa-solid fa-camera",
        description: "Pan, tilt and zoom surveillance cameras."
    },

    {
        id: "roboguard",
        name: "Roboguard",
        slug: "roboguard",
        icon: "fa-solid fa-shield-halved",
        description: "Roboguard perimeter security systems, kits and accessories."
    },

    {
        id: "ajax",
        name: "Ajax Security",
        slug: "ajax",
        icon: "fa-solid fa-house-lock",
        description: "Ajax wireless security and alarm systems."
    },

    {
        id: "ids",
        name: "IDS Security",
        slug: "ids",
        icon: "fa-solid fa-house-signal",
        description: "IDS alarm panels, detectors, keypads and security equipment."
    },

    {
        id: "access-control",
        name: "Access Control",
        slug: "access-control",
        icon: "fa-solid fa-id-card",
        description: "Access controllers, readers, locks and complete access systems."
    },

    {
        id: "intercom",
        name: "Intercom Systems",
        slug: "intercom",
        icon: "fa-solid fa-phone-volume",
        description: "Audio and video intercom systems and accessories."
    },

    {
        id: "gate-automation",
        name: "Gate Automation",
        slug: "gate-automation",
        icon: "fa-solid fa-warehouse",
        description: "Gate motors, automation kits, remotes and accessories."
    },

    {
        id: "alarm-systems",
        name: "Alarm Systems",
        slug: "alarm-systems",
        icon: "fa-solid fa-bell",
        description: "Professional alarm panels, detectors, sirens and complete alarm systems."
    },

    {
        id: "security-accessories",
        name: "Security Accessories",
        slug: "security-accessories",
        icon: "fa-solid fa-screwdriver-wrench",
        description: "Cables, power supplies, batteries, connectors and installation accessories."
    }

];


/*=========================================================
 3. SUBCATEGORIES
=========================================================*/

const NEXPAK_SUBCATEGORIES = {

    "electric-fencing": [

        "Energizers",
        "Electric Fence Kits",
        "Agric Electric Fence Kits",
        "Fence Accessories",
        "Fence Wire",
        "Insulators",
        "Warning Signs",
        "Fence Monitoring"

    ],

    "cctv": [

        "DVR Kits",
        "Dahua DVR Kits",
        "Analog Cameras",
        "DVR",
        "XVR",
        "CCTV Accessories"

    ],

    "ip-cctv": [

        "IP Camera Kits",
        "IP Cameras",
        "NVR",
        "PoE Equipment",
        "Network Accessories",
        "Hard Drives"

    ],

    "ptz": [

        "PTZ Cameras",
        "Speed Domes",
        "PTZ Accessories"

    ],

    "roboguard": [

        "Complete Kits",
        "Roboguard Sensors",
        "Receivers",
        "Transmitters",
        "Accessories"

    ],

    "ajax": [

        "Complete Systems",
        "Hubs",
        "Motion Detectors",
        "Door & Window Detectors",
        "Keypads",
        "Sirens",
        "Accessories"

    ],

    "ids": [

        "Alarm Panels",
        "Keypads",
        "Motion Detectors",
        "Magnetic Contacts",
        "Sirens",
        "Accessories",
        "Complete Kits"

    ],

    "access-control": [

        "Access Controllers",
        "Card Readers",
        "Keypads",
        "Magnetic Locks",
        "Electric Locks",
        "Exit Buttons",
        "Access Kits"

    ],

    "intercom": [

        "Audio Intercoms",
        "Video Intercoms",
        "Door Stations",
        "Indoor Monitors",
        "Intercom Kits",
        "Accessories"

    ],

    "gate-automation": [

        "Sliding Gate Motors",
        "Swing Gate Motors",
        "Gate Automation Kits",
        "Remote Controls",
        "Receivers",
        "Batteries",
        "Gate Accessories"

    ],

    "alarm-systems": [

        "Alarm Panels",
        "Wireless Alarms",
        "Motion Detectors",
        "Door Contacts",
        "Keypads",
        "Sirens",
        "Alarm Accessories",
        "Complete Alarm Kits"

    ],

    "security-accessories": [

        "Power Supplies",
        "Batteries",
        "Cables",
        "Connectors",
        "Brackets",
        "Junction Boxes",
        "Storage",
        "Networking",
        "Installation Accessories"

    ]

};


/*=========================================================
 4. BRANDS
=========================================================*/

const NEXPAK_BRANDS = [

    {
        id: "dahua",
        name: "Dahua",
        slug: "dahua"
    },

    {
        id: "hikvision",
        name: "Hikvision",
        slug: "hikvision"
    },

    {
        id: "roboguard",
        name: "Roboguard",
        slug: "roboguard"
    },

    {
        id: "ajax",
        name: "Ajax",
        slug: "ajax"
    },

    {
        id: "ids",
        name: "IDS",
        slug: "ids"
    },

    {
        id: "vantage",
        name: "Vantage",
        slug: "vantage"
    },

    {
        id: "nemtek",
        name: "Nemtek",
        slug: "nemtek"
    },

    {
        id: "generic",
        name: "NEXPAK / Generic",
        slug: "generic"
    }

];


/*=========================================================
 5. PRODUCT TYPE DEFINITIONS
=========================================================*/

const NEXPAK_PRODUCT_TYPES = [

    "single-product",

    "kit",

    "complete-system",

    "accessory",

    "replacement",

    "component",

    "service",

    "quote-required"

];


/*=========================================================
 6. STOCK STATUS DEFINITIONS
=========================================================*/

const NEXPAK_STOCK_STATUS = {

    IN_STOCK: "in-stock",

    LOW_STOCK: "low-stock",

    OUT_OF_STOCK: "out-of-stock",

    PRE_ORDER: "pre-order",

    SPECIAL_ORDER: "special-order",

    QUOTE_REQUIRED: "quote-required"

};


/*=========================================================
 7. PRICING TYPES
=========================================================*/

const NEXPAK_PRICING_TYPES = {

    RETAIL: "retail",

    SALE: "sale",

    TRADE: "trade",

    QUOTE: "quote",

    REQUEST_PRICE: "request-price"

};


/*=========================================================
 8. MASTER PRODUCT DATABASE
=========================================================*/

/*
   ALL ACTUAL PRODUCTS WILL BE ADDED IN PARTS 2–8.

   Do NOT add products directly to other JavaScript files.

   Example product structure:

   {
       id: "product-id",

       sku: "SKU-001",

       name: "Product Name",

       brand: "Brand",

       category: "category-id",

       subcategory: "subcategory",

       type: "single-product",

       price: 0,

       salePrice: null,

       tradePrice: null,

       pricingType: "retail",

       currency: "ZAR",

       image: "images/product.jpg",

       images: [],

       shortDescription: "",

       description: "",

       features: [],

       specifications: {},

       stock: 0,

       stockStatus: "in-stock",

       featured: false,

       popular: false,

       newProduct: false,

       kit: false,

       kitContents: [],

       compatibleWith: [],

       tags: [],

       warranty: "",

       deliveryClass: "standard"

   }
*/


const NEXPAK_PRODUCTS = [];


/*=========================================================
 9. PRODUCT DATABASE VERSION
=========================================================*/

const NEXPAK_DATABASE_INFO = {

    version: "1.0",

    status: "building",

    totalProducts: 0,

    lastUpdated: "2026-08-08",

    source: "NEXPAK Security Solutions",

    architecture: "Centralised Product Database"

};


/*=========================================================
 10. DATABASE HELPER — UPDATE PRODUCT COUNT
=========================================================*/

function updateNexpakProductCount() {

    NEXPAK_DATABASE_INFO.totalProducts =
        NEXPAK_PRODUCTS.length;

}


/*=========================================================
 11. FIND PRODUCT BY ID
=========================================================*/

function getNexpakProductById(productId) {

    return NEXPAK_PRODUCTS.find(

        product => product.id === productId

    ) || null;

}


/*=========================================================
 12. FIND PRODUCT BY SKU
=========================================================*/

function getNexpakProductBySKU(sku) {

    return NEXPAK_PRODUCTS.find(

        product =>
            product.sku &&
            product.sku.toLowerCase() === sku.toLowerCase()

    ) || null;

}


/*=========================================================
 13. FIND CATEGORY
=========================================================*/

function getNexpakCategory(categoryId) {

    return NEXPAK_CATEGORIES.find(

        category =>
            category.id === categoryId

    ) || null;

}


/*=========================================================
 14. INITIAL DATABASE UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 END OF PART 1/8

 NEXT:
 online-data.js — PART 2/8

 PART 2 will begin the REAL PRODUCT DATABASE.

 Planned products include:

 - D5 Evo
 - D5 Smart
 - D10 Smart
 - D10 Turbo Smart
 - D20 Smart
 - SD04
 - Vantage
 - Electric Fence Kits
 - Agric Kits
 - Dahua DVR Kits
 - IP CCTV
 - PTZ
 - Roboguard
 - Ajax
 - IDS
 - Intercom
 - Access Control
 - Gate Automation
 - Security Accessories

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 2/8

 PRODUCT DATABASE
 ELECTRIC FENCING

 Covers:
 - D5 Evo
 - D5 Smart
 - D10 Smart
 - D10 Turbo Smart
 - D20 Smart
 - SD04
 - Vantage
 - Electric Fence Kits
 - Agric Kits
 - Fence Accessories
=========================================================*/


/*=========================================================
 1. ELECTRIC FENCE ENERGIZERS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      D5 EVO
    -----------------------------------------------------*/

    {
        id: "ef-d5-evo",
        sku: "EF-D5EVO",

        name: "D5 Evo Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/d5-evo.jpg",

        images: [],

        shortDescription:
            "Professional electric fence energizer for residential and commercial perimeter protection.",

        description:
            "The D5 Evo is a professional electric fence energizer designed for reliable perimeter security applications. Suitable for residential, commercial and security installations.",

        features: [

            "Professional electric fence energizer",

            "Designed for perimeter security",

            "Suitable for residential applications",

            "Suitable for commercial applications",

            "Reliable high-voltage pulse output",

            "Installation-friendly design"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Security Perimeter",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "D5 Evo",
            "electric fence",
            "energizer",
            "security fence",
            "Nemtek"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      D5 SMART
    -----------------------------------------------------*/

    {
        id: "ef-d5-smart",
        sku: "EF-D5SMART",

        name: "D5 Smart Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/d5-smart.jpg",

        images: [],

        shortDescription:
            "Smart electric fence energizer for residential and light commercial security applications.",

        description:
            "The D5 Smart provides dependable electric fence perimeter protection for residential and selected commercial installations.",

        features: [

            "Smart electric fence energizer",

            "Perimeter security application",

            "Residential security",

            "Light commercial security",

            "High-voltage pulse technology",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Residential / Commercial",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "D5 Smart",
            "electric fence",
            "energizer",
            "Nemtek"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      D10 SMART
    -----------------------------------------------------*/

    {
        id: "ef-d10-smart",
        sku: "EF-D10SMART",

        name: "D10 Smart Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/d10-smart.jpg",

        images: [],

        shortDescription:
            "Higher-capacity smart energizer for larger electric fence security installations.",

        description:
            "The D10 Smart is designed for larger perimeter security applications requiring a more capable electric fence energizer.",

        features: [

            "High-capacity electric fence energizer",

            "Smart energizer technology",

            "Suitable for larger perimeter installations",

            "Security perimeter application",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Large Security Perimeter",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "D10 Smart",
            "electric fence",
            "energizer",
            "Nemtek"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      D10 TURBO SMART
    -----------------------------------------------------*/

    {
        id: "ef-d10-turbo-smart",
        sku: "EF-D10TURBO",

        name: "D10 Turbo Smart Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/d10-turbo-smart.jpg",

        images: [],

        shortDescription:
            "Turbo smart energizer designed for demanding electric fence perimeter security applications.",

        description:
            "The D10 Turbo Smart is intended for demanding security installations where a higher-capacity electric fence energizer is required.",

        features: [

            "Turbo electric fence energizer",

            "Smart technology",

            "Designed for demanding installations",

            "Perimeter security application",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Large / High-Security Perimeter",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "D10 Turbo Smart",
            "turbo",
            "electric fence",
            "energizer",
            "Nemtek"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      D20 SMART
    -----------------------------------------------------*/

    {
        id: "ef-d20-smart",
        sku: "EF-D20SMART",

        name: "D20 Smart Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/d20-smart.jpg",

        images: [],

        shortDescription:
            "Heavy-duty smart electric fence energizer for large perimeter security installations.",

        description:
            "The D20 Smart is designed for large and demanding electric fence perimeter security applications.",

        features: [

            "Heavy-duty electric fence energizer",

            "Smart energizer technology",

            "Large perimeter applications",

            "High-security perimeter protection",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Large / High-Security Perimeter",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "D20 Smart",
            "electric fence",
            "energizer",
            "Nemtek",
            "high security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      SD04
    -----------------------------------------------------*/

    {
        id: "ef-sd04",
        sku: "EF-SD04",

        name: "SD04 Electric Fence Energizer",

        brand: "Nemtek",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/sd04.jpg",

        images: [],

        shortDescription:
            "Electric fence energizer for perimeter security installations.",

        description:
            "The SD04 is an electric fence energizer suitable for selected perimeter security applications.",

        features: [

            "Electric fence energizer",

            "Perimeter security",

            "Professional installation",

            "Security fence application"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Perimeter Security",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "SD04",
            "electric fence",
            "energizer",
            "Nemtek"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      VANTAGE
    -----------------------------------------------------*/

    {
        id: "ef-vantage",
        sku: "EF-VANTAGE",

        name: "Vantage Electric Fence Energizer",

        brand: "Vantage",

        category: "electric-fencing",

        subcategory: "Energizers",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/vantage.jpg",

        images: [],

        shortDescription:
            "Electric fence energizer for residential, commercial and perimeter security applications.",

        description:
            "Vantage electric fence equipment provides an option for perimeter security installations requiring an electric fence energizer.",

        features: [

            "Electric fence energizer",

            "Perimeter security",

            "Residential applications",

            "Commercial applications",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "Electric Fence Energizer",

            application: "Perimeter Security",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "Vantage",
            "electric fence",
            "energizer"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    }

);


/*=========================================================
 2. ELECTRIC FENCE KITS
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "ef-kit-residential",
        sku: "EF-KIT-RES",

        name: "Residential Electric Fence Security Kit",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Electric Fence Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/residential-kit.jpg",

        images: [],

        shortDescription:
            "Complete electric fence starter kit for residential perimeter protection.",

        description:
            "A configurable residential electric fence security kit containing the core equipment required for a perimeter installation.",

        features: [

            "Residential perimeter protection",

            "Complete starter system",

            "Configurable installation",

            "Professional installation recommended"

        ],

        specifications: {

            application: "Residential",

            systemType: "Electric Fence",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Electric fence energizer",

            "Fence wire",

            "Insulators",

            "Warning signage",

            "Required installation accessories"

        ],

        compatibleWith: [

            "Electric Fence Energizers"

        ],

        tags: [

            "electric fence kit",
            "residential",
            "security fence",
            "starter kit"

        ],

        warranty: "Component manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    },


    {
        id: "ef-kit-commercial",
        sku: "EF-KIT-COM",

        name: "Commercial Electric Fence Security Kit",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Electric Fence Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/commercial-kit.jpg",

        images: [],

        shortDescription:
            "Configurable electric fence kit for commercial and higher-security perimeter applications.",

        description:
            "A configurable commercial electric fence system designed around the perimeter requirements of the installation.",

        features: [

            "Commercial perimeter security",

            "Configurable system",

            "High-security applications",

            "Professional installation",

            "System components selected according to site requirements"

        ],

        specifications: {

            application: "Commercial",

            systemType: "Electric Fence",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Electric fence energizer",

            "Fence wire",

            "Insulators",

            "Warning signage",

            "Installation accessories"

        ],

        compatibleWith: [

            "D5 Evo",
            "D5 Smart",
            "D10 Smart",
            "D10 Turbo Smart",
            "D20 Smart"

        ],

        tags: [

            "commercial electric fence",
            "electric fence kit",
            "security perimeter"

        ],

        warranty: "Component manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    },


    {
        id: "ef-kit-high-security",
        sku: "EF-KIT-HS",

        name: "High-Security Electric Fence System",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Electric Fence Kits",

        type: "complete-system",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/high-security-kit.jpg",

        images: [],

        shortDescription:
            "High-security electric fence system designed for demanding perimeter protection requirements.",

        description:
            "A professional high-security electric fence system configured according to the site perimeter, required protection level and installation requirements.",

        features: [

            "High-security perimeter protection",

            "Site-specific configuration",

            "Heavy-duty system options",

            "Professional installation",

            "Designed for demanding security environments"

        ],

        specifications: {

            application: "High Security",

            systemType: "Electric Fence",

            configuration: "Site Specific",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "High-capacity energizer",

            "Fence conductors",

            "Insulators",

            "Warning signage",

            "Security fence accessories",

            "Installation components"

        ],

        compatibleWith: [

            "D10 Smart",
            "D10 Turbo Smart",
            "D20 Smart"

        ],

        tags: [

            "high security",
            "electric fence",
            "perimeter security",
            "security system"

        ],

        warranty: "Component manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    }

);


/*=========================================================
 3. AGRICULTURAL ELECTRIC FENCE KITS
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "ef-agric-starter",
        sku: "EF-AGRIC-START",

        name: "Agricultural Electric Fence Starter Kit",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Agric Electric Fence Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/agric-starter.jpg",

        images: [],

        shortDescription:
            "Agricultural electric fencing starter system for farms and smallholdings.",

        description:
            "A configurable electric fencing starter system for agricultural perimeter, livestock and property applications.",

        features: [

            "Agricultural application",

            "Farm perimeter protection",

            "Livestock fencing applications",

            "Configurable system",

            "Professional installation available"

        ],

        specifications: {

            application: "Agricultural",

            systemType: "Electric Fence",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Electric fence energizer",

            "Fence conductors",

            "Insulators",

            "Warning signage",

            "Basic installation accessories"

        ],

        compatibleWith: [],

        tags: [

            "agric",
            "farm",
            "electric fence",
            "livestock",
            "smallholding"

        ],

        warranty: "Component manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    },


    {
        id: "ef-agric-perimeter",
        sku: "EF-AGRIC-PERIMETER",

        name: "Agricultural Perimeter Electric Fence Kit",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Agric Electric Fence Kits",

        type: "complete-system",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/electric-fencing/agric-perimeter.jpg",

        images: [],

        shortDescription:
            "Agricultural perimeter electric fencing system for farms, estates and smallholdings.",

        description:
            "A configurable agricultural perimeter system designed around the size and requirements of the property.",

        features: [

            "Farm perimeter security",

            "Smallholding security",

            "Livestock applications",

            "Site-specific configuration",

            "Professional installation"

        ],

        specifications: {

            application: "Agricultural / Rural",

            systemType: "Electric Fence",

            configuration: "Site Specific",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Electric fence energizer",

            "Fence wire",

            "Insulators",

            "Fence hardware",

            "Warning signage",

            "Installation accessories"

        ],

        compatibleWith: [],

        tags: [

            "agricultural",
            "farm security",
            "electric fence",
            "perimeter"

        ],

        warranty: "Component manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    }

);


/*=========================================================
 4. ELECTRIC FENCE ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "ef-wire-high-tensile",
        sku: "EF-WIRE-HT",

        name: "High-Tensile Electric Fence Wire",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Fence Wire",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/electric-fencing/fence-wire.jpg",

        images: [],

        shortDescription:
            "Electric fence wire for security and agricultural fencing installations.",

        description:
            "Electric fence conductor wire suitable for electric fence security and agricultural applications.",

        features: [

            "Electric fence conductor",

            "Security fence applications",

            "Agricultural applications",

            "Available in project quantities"

        ],

        specifications: {

            productType: "Fence Wire",

            application: "Security / Agricultural"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electric Fence Energizers"

        ],

        tags: [

            "electric fence wire",
            "fence wire",
            "security fence",
            "agric"

        ],

        warranty: "",

        deliveryClass: "oversized"

    },


    {
        id: "ef-insulators-set",
        sku: "EF-INSULATORS",

        name: "Electric Fence Insulators",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Insulators",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/electric-fencing/insulators.jpg",

        images: [],

        shortDescription:
            "Electric fence insulators for secure conductor installation.",

        description:
            "Insulators designed to support electric fence conductors while maintaining electrical isolation from the fence structure.",

        features: [

            "Electric fence insulation",

            "Fence conductor support",

            "Security fence applications",

            "Agricultural applications"

        ],

        specifications: {

            productType: "Electric Fence Insulator",

            application: "Security / Agricultural"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electric Fence Wire"

        ],

        tags: [

            "insulator",
            "electric fence",
            "fence accessories"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "ef-warning-sign",
        sku: "EF-WARNING-SIGN",

        name: "Electric Fence Warning Sign",

        brand: "NEXPAK",

        category: "electric-fencing",

        subcategory: "Warning Signs",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/electric-fencing/warning-sign.jpg",

        images: [],

        shortDescription:
            "Warning signage for electric fence installations.",

        description:
            "Clearly visible electric fence warning signage for use on security and agricultural electric fence installations.",

        features: [

            "Electric fence warning signage",

            "Suitable for perimeter installations",

            "Security fence application",

            "Agricultural application"

        ],

        specifications: {

            productType: "Warning Sign",

            application: "Electric Fence"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [],

        tags: [

            "warning sign",
            "electric fence",
            "security"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 PART 2 DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 2/8

 CURRENT DATABASE GROUP:

 ELECTRIC FENCING
 ├── D5 Evo
 ├── D5 Smart
 ├── D10 Smart
 ├── D10 Turbo Smart
 ├── D20 Smart
 ├── SD04
 ├── Vantage
 ├── Residential Kit
 ├── Commercial Kit
 ├── High-Security System
 ├── Agricultural Starter Kit
 ├── Agricultural Perimeter Kit
 ├── Fence Wire
 ├── Insulators
 └── Warning Signs

 NEXT:
 online-data.js — PART 3/8

 CCTV DATABASE
 ├── Dahua DVR Kits
 ├── CCTV Kits
 ├── Cameras
 ├── DVR / XVR
 ├── CCTV Accessories
 └── Related equipment

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 3/8

 PRODUCT DATABASE
 CCTV / DAHUA

 Covers:
 - Dahua CCTV Kits
 - DVR / XVR
 - Analog CCTV Cameras
 - Camera Kits
 - Hard Drives
 - CCTV Power Supplies
 - CCTV Accessories
=========================================================*/


/*=========================================================
 1. DAHUA COMPLETE CCTV KITS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      DAHUA 4-CAMERA CCTV KIT
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-4ch-kit",
        sku: "DAHUA-CCTV-4CH",

        name: "Dahua 4-Camera CCTV Security Kit",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Dahua DVR Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/cctv/dahua-4ch-kit.jpg",

        images: [],

        shortDescription:
            "Complete Dahua 4-camera CCTV surveillance kit for residential and small commercial security.",

        description:
            "A complete Dahua CCTV package designed for residential and small commercial surveillance installations. Final configuration can be adjusted according to camera type, storage requirements and site conditions.",

        features: [

            "Dahua surveillance equipment",

            "4-camera configuration",

            "DVR/XVR recording",

            "Remote viewing capability",

            "Expandable system options",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "Analog CCTV",

            cameraCount: 4,

            recorder: "DVR / XVR",

            application: "Residential / Small Commercial",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Dahua DVR/XVR",

            "4 CCTV cameras",

            "Hard drive option",

            "Power supply",

            "Camera cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "Dahua CCTV Cameras",

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "CCTV kit",

            "4 camera CCTV",

            "security cameras",

            "DVR kit"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      DAHUA 8-CAMERA CCTV KIT
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-8ch-kit",
        sku: "DAHUA-CCTV-8CH",

        name: "Dahua 8-Camera CCTV Security Kit",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Dahua DVR Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/cctv/dahua-8ch-kit.jpg",

        images: [],

        shortDescription:
            "Complete Dahua 8-camera CCTV security system for larger residential and commercial installations.",

        description:
            "A configurable Dahua 8-camera surveillance system designed for properties requiring broader perimeter and internal camera coverage.",

        features: [

            "8-camera surveillance",

            "Dahua recording platform",

            "Remote viewing",

            "Expandable configuration",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "Analog CCTV",

            cameraCount: 8,

            recorder: "DVR / XVR",

            application: "Residential / Commercial",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Dahua DVR/XVR",

            "8 CCTV cameras",

            "Hard drive option",

            "Power supply",

            "Camera cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "Dahua CCTV Cameras",

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "8 camera CCTV",

            "CCTV kit",

            "commercial CCTV"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      DAHUA 16-CAMERA CCTV KIT
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-16ch-kit",
        sku: "DAHUA-CCTV-16CH",

        name: "Dahua 16-Camera CCTV Security Kit",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Dahua DVR Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/cctv/dahua-16ch-kit.jpg",

        images: [],

        shortDescription:
            "Professional Dahua 16-camera CCTV system for larger commercial and high-security properties.",

        description:
            "A scalable Dahua CCTV system designed for larger installations requiring extensive camera coverage.",

        features: [

            "16-camera configuration",

            "Commercial surveillance",

            "Large property coverage",

            "Remote viewing",

            "Scalable system architecture",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "Analog CCTV",

            cameraCount: 16,

            recorder: "DVR / XVR",

            application: "Commercial / High Security",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Dahua DVR/XVR",

            "16 CCTV cameras",

            "Hard drive option",

            "Power supply",

            "Camera cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "Dahua CCTV Cameras",

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "16 camera CCTV",

            "commercial CCTV",

            "high security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    }

);


/*=========================================================
 2. DAHUA CCTV CAMERAS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      DAHUA DOME CAMERA
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-dome",
        sku: "DAHUA-CAM-DOME",

        name: "Dahua CCTV Dome Camera",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Analog Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/dahua-dome.jpg",

        images: [],

        shortDescription:
            "Dahua dome-style CCTV camera for indoor and protected outdoor surveillance applications.",

        description:
            "A Dahua dome CCTV camera suitable for surveillance installations where a compact and discreet camera design is preferred.",

        features: [

            "Dome camera design",

            "Dahua imaging technology",

            "Indoor applications",

            "Protected outdoor applications",

            "Suitable for residential and commercial security"

        ],

        specifications: {

            cameraType: "Dome",

            technology: "CCTV",

            application: "Indoor / Protected Outdoor",

            brand: "Dahua"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "dome camera",

            "CCTV camera",

            "security camera"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      DAHUA BULLET CAMERA
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-bullet",
        sku: "DAHUA-CAM-BULLET",

        name: "Dahua CCTV Bullet Camera",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Analog Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/dahua-bullet.jpg",

        images: [],

        shortDescription:
            "Dahua bullet-style CCTV camera for perimeter and outdoor surveillance.",

        description:
            "A Dahua bullet camera suitable for perimeter, entrance and outdoor surveillance applications.",

        features: [

            "Bullet camera design",

            "Outdoor surveillance applications",

            "Perimeter monitoring",

            "Entrance monitoring",

            "Dahua imaging technology"

        ],

        specifications: {

            cameraType: "Bullet",

            technology: "CCTV",

            application: "Outdoor / Perimeter",

            brand: "Dahua"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "bullet camera",

            "CCTV",

            "outdoor camera",

            "security camera"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      DAHUA TURBO HD CAMERA
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-turbohd",
        sku: "DAHUA-CAM-TURBO",

        name: "Dahua Turbo HD CCTV Camera",

        brand: "Dahua",

        category: "cctv",

        subcategory: "Analog Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/dahua-turbohd.jpg",

        images: [],

        shortDescription:
            "Dahua high-definition CCTV camera for professional surveillance systems.",

        description:
            "A Dahua high-definition camera designed for use with compatible DVR/XVR surveillance systems.",

        features: [

            "High-definition surveillance",

            "Professional CCTV application",

            "Dahua technology",

            "Compatible recording systems",

            "Residential and commercial use"

        ],

        specifications: {

            cameraType: "HD CCTV",

            technology: "Turbo HD",

            application: "Security Surveillance",

            brand: "Dahua"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "Dahua",

            "Turbo HD",

            "HD CCTV",

            "security camera"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 3. DAHUA DVR / XVR RECORDERS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      DAHUA DVR
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-dvr",
        sku: "DAHUA-DVR",

        name: "Dahua DVR Security Recorder",

        brand: "Dahua",

        category: "cctv",

        subcategory: "DVR",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/dahua-dvr.jpg",

        images: [],

        shortDescription:
            "Dahua DVR for recording and managing compatible CCTV cameras.",

        description:
            "Dahua digital video recorder for CCTV surveillance installations. Channel capacity and features depend on the selected model.",

        features: [

            "Digital video recording",

            "Multi-camera support",

            "Remote viewing options",

            "Storage support",

            "Dahua surveillance platform"

        ],

        specifications: {

            productType: "DVR",

            brand: "Dahua",

            channelCapacity: "Model dependent",

            storage: "Hard drive dependent",

            remoteAccess: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua CCTV Cameras",

            "Dahua Turbo HD Cameras"

        ],

        tags: [

            "Dahua",

            "DVR",

            "CCTV recorder",

            "security recorder"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      DAHUA XVR
    -----------------------------------------------------*/

    {
        id: "cctv-dahua-xvr",
        sku: "DAHUA-XVR",

        name: "Dahua XVR Security Recorder",

        brand: "Dahua",

        category: "cctv",

        subcategory: "XVR",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/dahua-xvr.jpg",

        images: [],

        shortDescription:
            "Dahua XVR recorder supporting compatible surveillance camera technologies.",

        description:
            "A Dahua XVR provides flexible recording options for compatible CCTV systems. Exact channel support and camera compatibility depend on the selected model.",

        features: [

            "Flexible video recording",

            "Multi-camera support",

            "Remote viewing options",

            "Multiple camera technology support",

            "Dahua platform"

        ],

        specifications: {

            productType: "XVR",

            brand: "Dahua",

            channelCapacity: "Model dependent",

            storage: "Hard drive dependent",

            cameraCompatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua CCTV Cameras",

            "Compatible Analog Cameras",

            "Compatible HD CCTV Cameras"

        ],

        tags: [

            "Dahua",

            "XVR",

            "CCTV recorder",

            "DVR",

            "security recorder"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 4. CCTV STORAGE
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "cctv-hdd-surveillance",
        sku: "CCTV-HDD-SURV",

        name: "Surveillance Hard Drive",

        brand: "Generic",

        category: "cctv",

        subcategory: "Hard Drives",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/surveillance-hdd.jpg",

        images: [],

        shortDescription:
            "Surveillance-rated hard drive for CCTV DVR and XVR recording systems.",

        description:
            "A surveillance hard drive designed for continuous recording applications in compatible CCTV recording equipment.",

        features: [

            "Surveillance storage",

            "Continuous recording application",

            "DVR compatibility",

            "XVR compatibility",

            "Capacity options available"

        ],

        specifications: {

            productType: "Surveillance HDD",

            capacity: "Model dependent",

            application: "CCTV Recording",

            compatibility: "DVR / XVR"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Dahua DVR",

            "Dahua XVR"

        ],

        tags: [

            "CCTV hard drive",

            "surveillance HDD",

            "DVR storage",

            "XVR storage"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. CCTV POWER EQUIPMENT
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "cctv-power-supply",
        sku: "CCTV-PSU",

        name: "CCTV Camera Power Supply",

        brand: "Generic",

        category: "cctv",

        subcategory: "CCTV Accessories",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/cctv-power-supply.jpg",

        images: [],

        shortDescription:
            "Power supply equipment for compatible CCTV camera installations.",

        description:
            "Power supply equipment for CCTV camera systems. Voltage, output capacity and channel configuration are selected according to the installation requirements.",

        features: [

            "CCTV camera power",

            "Multiple output options",

            "Security installation application",

            "Professional installation recommended"

        ],

        specifications: {

            productType: "CCTV Power Supply",

            output: "Model dependent",

   application: "CCTV",

            installation: "Professional Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras"

        ],

        tags: [

            "CCTV power",

            "power supply",

            "camera PSU",

            "security accessories"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 6. CCTV CABLING & CONNECTORS
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "cctv-coaxial-cable",
        sku: "CCTV-COAX",

        name: "CCTV Coaxial Cable",

        brand: "Generic",

        category: "cctv",

        subcategory: "CCTV Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/coaxial-cable.jpg",

        images: [],

        shortDescription:
            "Coaxial cable for compatible analog CCTV installations.",

        description:
            "CCTV coaxial cable for compatible analog surveillance camera installations. Available according to required length and project specification.",

        features: [

            "CCTV signal cable",

            "Analog camera applications",

            "Available in project lengths",

            "Professional installation"

        ],

        specifications: {

            productType: "Coaxial Cable",

            application: "Analog CCTV",

            length: "Project dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Analog CCTV Cameras",

            "Dahua CCTV Cameras"

        ],

        tags: [

            "CCTV cable",

            "coaxial",

            "camera cable"

        ],

        warranty: "",

        deliveryClass: "oversized"

    },


    {
        id: "cctv-bnc-connectors",
        sku: "CCTV-BNC",

        name: "CCTV BNC Connectors",

        brand: "Generic",

        category: "cctv",

        subcategory: "CCTV Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/bnc-connectors.jpg",

        images: [],

        shortDescription:
            "BNC connectors for compatible CCTV video connections.",

        description:
            "BNC connectors for use with compatible analog CCTV cabling and surveillance equipment.",

        features: [

            "CCTV video connector",

            "BNC connection",

            "Installation accessory",

            "Available individually or in packs"

        ],

        specifications: {

            productType: "BNC Connector",

            application: "Analog CCTV"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Coaxial Cable",

            "DVR",

            "XVR"

        ],

        tags: [

            "BNC",

            "CCTV connector",

            "camera connector"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 7. CCTV INSTALLATION ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "cctv-camera-bracket",
        sku: "CCTV-BRACKET",

        name: "CCTV Camera Mounting Bracket",

        brand: "Generic",

        category: "cctv",

        subcategory: "CCTV Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/camera-bracket.jpg",

        images: [],

        shortDescription:
            "Mounting bracket for compatible CCTV camera installations.",

        description:
            "Camera mounting hardware for positioning compatible CCTV cameras on walls, ceilings and other suitable mounting surfaces.",

        features: [

            "Camera mounting",

            "Wall mounting",

            "Ceiling mounting",

            "Installation accessory"

        ],

        specifications: {

            productType: "Camera Bracket",

            application: "CCTV Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras"

        ],

        tags: [

            "camera bracket",

            "CCTV mount",

            "camera mounting"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "cctv-junction-box",
        sku: "CCTV-JBOX",

        name: "CCTV Camera Junction Box",

        brand: "Generic",

        category: "cctv",

        subcategory: "CCTV Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cctv/junction-box.jpg",

        images: [],

        shortDescription:
            "Junction box for protecting CCTV camera cable connections.",

        description:
            "A camera junction box designed to assist with cable management and protection at CCTV camera mounting points.",

        features: [

            "Cable management",

            "Camera installation",

            "Connection protection",

            "Neat installation"

        ],

        specifications: {

            productType: "Junction Box",

            application: "CCTV Installation"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras",

            "Camera Brackets"

        ],

        tags: [

            "CCTV junction box",

            "camera junction box",

            "cable management"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 8. CCTV DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 9. DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 3/8

 CURRENT PRODUCT GROUPS:

 PART 2
 └── ELECTRIC FENCING

 PART 3
 └── CCTV
     ├── Dahua 4-Camera Kit
     ├── Dahua 8-Camera Kit
     ├── Dahua 16-Camera Kit
     ├── Dahua Dome Camera
     ├── Dahua Bullet Camera
     ├── Dahua Turbo HD Camera
     ├── Dahua DVR
     ├── Dahua XVR
     ├── Surveillance HDD
     ├── CCTV Power Supply
     ├── CCTV Coaxial Cable
     ├── BNC Connectors
     ├── Camera Bracket
     └── Junction Box

 NEXT:
 online-data.js — PART 4/8

 IP CCTV + NVR + POE + PTZ

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 4/8

 PRODUCT DATABASE
 IP CCTV + NVR + POE + PTZ

 Covers:
 - IP CCTV Kits
 - IP Cameras
 - NVRs
 - PoE Switches
 - PoE Equipment
 - Network Accessories
 - PTZ Cameras
 - PTZ Accessories
=========================================================*/


/*=========================================================
 1. IP CCTV COMPLETE KITS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      4 CAMERA IP KIT
    -----------------------------------------------------*/

    {
        id: "ip-cctv-4ch-kit",
        sku: "IP-CCTV-4CH",

        name: "4-Camera IP CCTV Security Kit",

        brand: "NEXPAK",

        category: "ip-cctv",

        subcategory: "IP Camera Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/ip-cctv/4-camera-ip-kit.jpg",

        images: [],

        shortDescription:
            "Complete 4-camera IP surveillance system for residential and small commercial security.",

        description:
            "A configurable IP CCTV package combining network cameras, NVR recording and PoE connectivity for modern surveillance installations.",

        features: [

            "4-camera IP configuration",

            "Network-based surveillance",

            "NVR recording",

            "PoE connectivity",

            "Remote viewing capability",

            "Expandable configuration",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "IP CCTV",

            cameraCount: 4,

            recorder: "NVR",

            connectivity: "PoE",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "4 IP cameras",

            "NVR",

            "Surveillance hard drive",

            "PoE equipment",

            "Network cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "IP Cameras",

            "NVR",

            "PoE Switches"

        ],

        tags: [

            "IP CCTV",

            "4 camera IP",

            "NVR kit",

            "PoE CCTV",

            "network cameras"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      8 CAMERA IP KIT
    -----------------------------------------------------*/

    {
        id: "ip-cctv-8ch-kit",
        sku: "IP-CCTV-8CH",

        name: "8-Camera IP CCTV Security Kit",

        brand: "NEXPAK",

        category: "ip-cctv",

        subcategory: "IP Camera Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/ip-cctv/8-camera-ip-kit.jpg",

        images: [],

        shortDescription:
            "Professional 8-camera IP CCTV system for larger residential and commercial installations.",

        description:
            "An expandable IP surveillance system designed for properties requiring wider camera coverage and network video recording.",

        features: [

            "8-camera IP configuration",

            "NVR recording",

            "PoE connectivity",

            "Remote monitoring",

            "Expandable system",

            "Commercial surveillance",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "IP CCTV",

            cameraCount: 8,

            recorder: "NVR",

            connectivity: "PoE",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "8 IP cameras",

            "NVR",

            "Surveillance hard drive",

            "PoE equipment",

            "Network cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "IP Cameras",

            "NVR",

            "PoE Switches"

        ],

        tags: [

            "IP CCTV",

            "8 camera IP",

            "NVR kit",

            "PoE",

            "commercial CCTV"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      16 CAMERA IP KIT
    -----------------------------------------------------*/

    {
        id: "ip-cctv-16ch-kit",
        sku: "IP-CCTV-16CH",

        name: "16-Camera IP CCTV Security Kit",

        brand: "NEXPAK",

        category: "ip-cctv",

        subcategory: "IP Camera Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/ip-cctv/16-camera-ip-kit.jpg",

        images: [],

        shortDescription:
            "Large-scale IP CCTV system for commercial and high-security surveillance applications.",

        description:
            "A scalable 16-camera IP CCTV platform designed for larger properties, commercial premises and high-security installations.",

        features: [

            "16-camera IP configuration",

            "NVR recording",

            "PoE networking",

            "Remote monitoring",

            "Large property coverage",

            "Scalable architecture",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "IP CCTV",

            cameraCount: 16,

            recorder: "NVR",

            connectivity: "PoE",

            remoteViewing: "Supported",

            storage: "Configuration dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "16 IP cameras",

            "NVR",

            "Surveillance hard drive",

            "PoE equipment",

            "Network cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "IP Cameras",

            "NVR",

            "PoE Switches"

        ],

        tags: [

            "IP CCTV",

            "16 camera IP",

            "commercial surveillance",

            "high security",

            "NVR"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    }

);


/*=========================================================
 2. IP CCTV CAMERAS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      IP DOME CAMERA
    -----------------------------------------------------*/

    {
        id: "ip-camera-dome",
        sku: "IP-CAM-DOME",

        name: "IP CCTV Dome Camera",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "IP Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/ip-dome.jpg",

        images: [],

        shortDescription:
            "Network dome camera for professional IP surveillance installations.",

        description:
            "A network-based dome camera designed for IP surveillance applications in residential, commercial and professional security environments.",

        features: [

            "IP network camera",

            "Dome design",

            "Network video",

            "Remote viewing capability",

            "Indoor applications",

            "Protected outdoor applications"

        ],

        specifications: {

            cameraType: "IP Dome",

            technology: "IP",

            resolution: "Model dependent",

            network: "Ethernet",

            PoE: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "PoE Switch",

            "Network Video System"

        ],

        tags: [

            "IP camera",

            "dome",

            "network camera",

            "Hikvision"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      IP BULLET CAMERA
    -----------------------------------------------------*/

    {
        id: "ip-camera-bullet",
        sku: "IP-CAM-BULLET",

        name: "IP CCTV Bullet Camera",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "IP Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/ip-bullet.jpg",

        images: [],

        shortDescription:
            "Network bullet camera for perimeter, entrance and outdoor surveillance.",

        description:
            "An IP bullet camera designed for outdoor and perimeter surveillance applications.",

        features: [

            "IP network camera",

            "Bullet design",

            "Perimeter surveillance",

            "Outdoor applications",

            "Remote viewing capability",

            "PoE options available"

        ],

        specifications: {

            cameraType: "IP Bullet",

            technology: "IP",

            resolution: "Model dependent",

            network: "Ethernet",

            PoE: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "PoE Switch",

            "Network Video System"

        ],

        tags: [

            "IP camera",

            "bullet camera",

            "outdoor camera",

            "Hikvision"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      HIGH-RESOLUTION IP CAMERA
    -----------------------------------------------------*/

    {
        id: "ip-camera-high-resolution",
        sku: "IP-CAM-HR",

        name: "High-Resolution IP CCTV Camera",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "IP Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/ip-high-resolution.jpg",

        images: [],

        shortDescription:
            "High-resolution IP surveillance camera for detailed security monitoring.",

        description:
            "A high-resolution network camera intended for installations where greater image detail is required.",

        features: [

            "High-resolution imaging",

            "IP network connectivity",

            "Professional surveillance",

            "Remote viewing",

            "PoE options",

            "Suitable for commercial applications"

        ],

        specifications: {

            cameraType: "IP Camera",

            technology: "IP",

            resolution: "Model dependent",

            network: "Ethernet",

            PoE: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "PoE Switch"

        ],

        tags: [

            "high resolution",

            "IP CCTV",

            "network camera",

            "professional CCTV"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 3. NVR RECORDERS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      4 CHANNEL NVR
    -----------------------------------------------------*/

    {
        id: "nvr-4-channel",
        sku: "NVR-4CH",

        name: "4-Channel Network Video Recorder",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "NVR",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/nvr-4ch.jpg",

        images: [],

        shortDescription:
            "Compact NVR for smaller IP CCTV installations.",

        description:
            "A network video recorder designed for smaller IP surveillance systems. Exact camera compatibility and recording specifications depend on the selected model.",

        features: [

            "Network video recording",

            "IP camera support",

            "Remote access",

            "Storage support",

            "Compact surveillance recorder"

        ],

        specifications: {

            productType: "NVR",

            channels: 4,

            storage: "Model dependent",

            network: "Ethernet",

            remoteAccess: "Supported"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "PoE Cameras"

        ],

        tags: [

            "NVR",

            "4 channel NVR",

            "IP CCTV",

            "Hikvision"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      8 CHANNEL NVR
    -----------------------------------------------------*/

    {
        id: "nvr-8-channel",
        sku: "NVR-8CH",

        name: "8-Channel Network Video Recorder",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "NVR",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/nvr-8ch.jpg",

        images: [],

        shortDescription:
            "8-channel NVR for residential and commercial IP surveillance systems.",

        description:
            "A network video recorder designed for medium-sized IP surveillance installations.",

        features: [

            "8-channel network recording",

            "IP camera support",

            "Remote viewing",

            "Storage support",

            "Expandable surveillance system"

        ],

        specifications: {

            productType: "NVR",

            channels: 8,

            storage: "Model dependent",

            network: "Ethernet",

            remoteAccess: "Supported"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "PoE Cameras"

        ],

        tags: [

            "8 channel NVR",

            "NVR",

            "IP CCTV",

            "Hikvision"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      16 CHANNEL NVR
    -----------------------------------------------------*/

    {
        id: "nvr-16-channel",
        sku: "NVR-16CH",

        name: "16-Channel Network Video Recorder",

        brand: "Hikvision",

        category: "ip-cctv",

        subcategory: "NVR",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/nvr-16ch.jpg",

        images: [],

        shortDescription:
            "16-channel NVR for larger commercial and high-security IP surveillance systems.",

        description:
            "A scalable network video recorder designed for larger IP CCTV deployments.",

        features: [

            "16-channel network recording",

            "IP camera support",

            "Remote monitoring",

            "Expandable system",

            "Commercial surveillance",

            "Storage options"

        ],

        specifications: {

            productType: "NVR",

            channels: 16,

            storage: "Model dependent",

            network: "Ethernet",

            remoteAccess: "Supported"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "PoE Cameras",

            "PoE Switches"

        ],

        tags: [

            "16 channel NVR",

            "NVR",

            "commercial CCTV",

            "IP CCTV"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 4. POE EQUIPMENT
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      4 PORT POE SWITCH
    -----------------------------------------------------*/

    {
        id: "poe-switch-4-port",
        sku: "POE-SWITCH-4",

        name: "4-Port PoE Network Switch",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "PoE Equipment",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/poe-4-port.jpg",

        images: [],

        shortDescription:
            "PoE network switch for powering and connecting compatible IP cameras.",

        description:
            "A compact Power over Ethernet switch for compatible IP surveillance installations.",

        features: [

            "PoE connectivity",

            "IP camera power",

            "Network connectivity",

            "Compact design",

            "Surveillance application"

        ],

        specifications: {

            productType: "PoE Switch",

            ports: 4,

            poe: "Model dependent",

            network: "Ethernet"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "NVR"

        ],

        tags: [

            "PoE",

            "PoE switch",

            "IP camera",

            "network switch"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      8 PORT POE SWITCH
    -----------------------------------------------------*/

    {
        id: "poe-switch-8-port",
        sku: "POE-SWITCH-8",

        name: "8-Port PoE Network Switch",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "PoE Equipment",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/poe-8-port.jpg",

        images: [],

        shortDescription:
            "8-port PoE switch for medium-sized IP CCTV installations.",

        description:
            "An 8-port Power over Ethernet network switch designed to connect and power compatible IP surveillance devices.",

        features: [

            "8 network ports",

            "PoE camera power",

            "IP surveillance networking",

            "Commercial applications",

            "Network expansion"

        ],

        specifications: {

            productType: "PoE Switch",

            ports: 8,

            poe: "Model dependent",

            network: "Ethernet"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "NVR"

        ],

        tags: [

            "8 port PoE",

            "PoE switch",

            "IP CCTV",

            "networking"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      16 PORT POE SWITCH
    -----------------------------------------------------*/

    {
        id: "poe-switch-16-port",
        sku: "POE-SWITCH-16",

        name: "16-Port PoE Network Switch",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "PoE Equipment",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/poe-16-port.jpg",

        images: [],

        shortDescription:
            "16-port PoE network switch for larger IP CCTV installations.",

        description:
            "A larger PoE network switch for commercial and high-density IP surveillance installations.",

        features: [

            "16 network ports",

            "PoE camera power",

            "Commercial surveillance",

            "Network expansion",

            "Suitable for larger IP deployments"

        ],

        specifications: {

            productType: "PoE Switch",

            ports: 16,

            poe: "Model dependent",

            network: "Ethernet"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "NVR"

        ],

        tags: [

            "16 port PoE",

            "PoE switch",

            "commercial IP CCTV",

            "networking"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. NETWORK ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "ip-network-cable-cat6",
        sku: "NET-CAT6-CCTV",

        name: "Cat6 Network Cable for IP CCTV",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "Network Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/cat6-cable.jpg",

        images: [],

        shortDescription:
            "Cat6 network cable for IP cameras, NVRs and PoE surveillance systems.",

        description:
            "Network cable suitable for IP CCTV installations requiring Ethernet connectivity between cameras, switches and recording equipment.",

        features: [

            "Cat6 network cable",

            "IP camera connectivity",

            "PoE applications",

            "NVR networking",

            "Available in project lengths"

        ],

        specifications: {

            productType: "Cat6 Network Cable",

            application: "IP CCTV",

            length: "Project dependent",

            network: "Ethernet"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "NVR",

            "PoE Switches"

        ],

        tags: [

            "Cat6",

            "network cable",

            "IP CCTV",

            "PoE",

            "Ethernet"

        ],

        warranty: "",

        deliveryClass: "oversized"

    },


    {
        id: "ip-rj45-connectors",
        sku: "NET-RJ45-CCTV",

        name: "RJ45 Network Connectors",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "Network Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/rj45-connectors.jpg",

        images: [],

        shortDescription:
            "RJ45 connectors for IP CCTV network cable installations.",

        description:
            "Network connectors for terminating compatible Ethernet cable used in IP CCTV and PoE installations.",

        features: [

            "RJ45 termination",

            "IP CCTV networking",

            "PoE installations",

            "Available in packs"

        ],

        specifications: {

            productType: "RJ45 Connector",

            application: "IP CCTV / Ethernet"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Cat6 Network Cable",

            "IP Cameras",

            "PoE Switches"

        ],

        tags: [

            "RJ45",

            "network connector",

            "IP CCTV",

            "PoE"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 6. PTZ CAMERA SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      STANDARD PTZ
    -----------------------------------------------------*/

    {
        id: "ptz-standard",
        sku: "PTZ-STANDARD",

        name: "PTZ Security Camera",

        brand: "Dahua",

        category: "ptz",

        subcategory: "PTZ Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ptz/standard-ptz.jpg",

        images: [],

        shortDescription:
            "Pan-tilt-zoom security camera for wide-area surveillance.",

        description:
            "A PTZ surveillance camera designed to provide remotely controlled pan, tilt and zoom coverage for larger security areas.",

        features: [

            "Pan functionality",

            "Tilt functionality",

            "Optical zoom options",

            "Remote camera control",

            "Wide-area surveillance",

            "Commercial security application"

        ],

        specifications: {

            cameraType: "PTZ",

            technology: "Model dependent",

            zoom: "Model dependent",

            resolution: "Model dependent",

            control: "Remote"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "DVR",

            "XVR",

            "NVR",

            "Compatible CCTV Systems"

        ],

        tags: [

            "PTZ",

            "PTZ camera",

            "Dahua",

            "pan tilt zoom",

            "security camera"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      IP PTZ
    -----------------------------------------------------*/

    {
        id: "ptz-ip",
        sku: "PTZ-IP",

        name: "IP PTZ Security Camera",

        brand: "Hikvision",

        category: "ptz",

        subcategory: "PTZ Cameras",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ptz/ip-ptz.jpg",

        images: [],

        shortDescription:
            "Network PTZ camera for professional IP surveillance systems.",

        description:
            "An IP-based PTZ surveillance camera providing remotely controlled pan, tilt and zoom functionality for professional network surveillance systems.",

        features: [

            "IP network connectivity",

            "Pan and tilt control",

            "Optical zoom options",

            "Remote monitoring",

            "Wide-area coverage",

            "Professional surveillance"

        ],

        specifications: {

            cameraType: "IP PTZ",

            technology: "IP",

            resolution: "Model dependent",

            zoom: "Model dependent",

            network: "Ethernet",

            PoE: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "PoE Switch",

            "IP CCTV System"

        ],

        tags: [

            "IP PTZ",

            "PTZ",

            "Hikvision",

            "network camera",

            "zoom camera"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      PTZ MOUNT
    -----------------------------------------------------*/

    {
        id: "ptz-mount",
        sku: "PTZ-MOUNT",

        name: "PTZ Camera Mounting Bracket",

        brand: "Generic",

        category: "ptz",

        subcategory: "PTZ Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ptz/ptz-mount.jpg",

        images: [],

        shortDescription:
            "Mounting hardware for compatible PTZ security cameras.",

        description:
            "Mounting hardware designed for the installation of compatible PTZ cameras on suitable walls, poles or structures.",

        features: [

            "PTZ camera mounting",

            "Professional installation",

            "Wall or structure mounting",

            "Heavy-duty mounting options"

        ],

        specifications: {

            productType: "PTZ Mount",

            application: "PTZ Installation",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "PTZ Cameras"

        ],

        tags: [

            "PTZ bracket",

            "PTZ mount",

            "camera mounting"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 7. IP CCTV STORAGE
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "ip-cctv-surveillance-hdd",
        sku: "IP-CCTV-HDD",

        name: "IP CCTV Surveillance Hard Drive",

        brand: "Generic",

        category: "ip-cctv",

        subcategory: "Hard Drives",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ip-cctv/surveillance-hdd.jpg",

        images: [],

        shortDescription:
            "Surveillance-rated storage drive for NVR recording systems.",

        description:
            "A surveillance storage drive designed for continuous recording in compatible NVR systems.",

        features: [

            "Surveillance storage",

            "Continuous recording",

            "NVR compatibility",

            "Multiple capacity options"

        ],

        specifications: {

            productType: "Surveillance HDD",

            capacity: "Model dependent",

            application: "NVR Recording",

            compatibility: "NVR"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "IP CCTV Systems"

        ],

        tags: [

            "NVR hard drive",

            "surveillance HDD",

            "IP CCTV storage"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 8. DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 9. DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 4/8

 CURRENT PRODUCT GROUPS:

 PART 2
 └── ELECTRIC FENCING

 PART 3
 └── CCTV / DAHUA

 PART 4
 ├── IP CCTV
 │   ├── 4-Camera IP Kit
 │   ├── 8-Camera IP Kit
 │   ├── 16-Camera IP Kit
 │   ├── IP Dome Camera
 │   ├── IP Bullet Camera
 │   ├── High-Resolution IP Camera
 │   ├── 4-Channel NVR
 │   ├── 8-Channel NVR
 │   ├── 16-Channel NVR
 │   ├── 4-Port PoE Switch
 │   ├── 8-Port PoE Switch
 │   ├── 16-Port PoE Switch
 │   ├── Cat6 Network Cable
 │   ├── RJ45 Connectors
 │   └── Surveillance HDD
 │
 └── PTZ
     ├── Standard PTZ
     ├── IP PTZ
     └── PTZ Mount

 NEXT:
 online-data.js — PART 5/8

 ROBОGUARD + AJAX + IDS
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 5/8

 PRODUCT DATABASE
 ROBOGUARD + AJAX + IDS

 Covers:
 - Roboguard Complete Systems
 - Roboguard Sensors
 - Roboguard Receivers
 - Roboguard Accessories
 - Ajax Alarm Systems
 - Ajax Hubs
 - Ajax Detectors
 - Ajax Keypads
 - Ajax Sirens
 - IDS Alarm Systems
 - IDS Panels
 - IDS Keypads
 - IDS Detectors
 - IDS Sirens
=========================================================*/


/*=========================================================
 1. ROBOGUARD COMPLETE SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      ROBOGUARD STARTER KIT
    -----------------------------------------------------*/

    {
        id: "roboguard-starter-kit",
        sku: "RG-STARTER-KIT",

        name: "Roboguard Perimeter Security Starter Kit",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Complete Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/roboguard/roboguard-starter-kit.jpg",

        images: [],

        shortDescription:
            "Roboguard perimeter security starter system for residential properties.",

        description:
            "A configurable Roboguard perimeter detection system designed to provide early warning and perimeter protection for residential properties.",

        features: [

            "Perimeter security",

            "Early intrusion detection",

            "Wireless sensor technology",

            "Expandable system",

            "Residential application",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "Perimeter Security",

            technology: "Wireless",

            application: "Residential",

            configuration: "Expandable"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Roboguard receiver",

            "Roboguard sensors",

            "System accessories",

            "Power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Roboguard Sensors",

            "Roboguard Receivers"

        ],

        tags: [

            "Roboguard",

            "perimeter security",

            "wireless security",

            "outdoor detection",

            "starter kit"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      ROBOGUARD HOME KIT
    -----------------------------------------------------*/

    {
        id: "roboguard-home-kit",
        sku: "RG-HOME-KIT",

        name: "Roboguard Home Perimeter Security Kit",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Complete Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/roboguard/roboguard-home-kit.jpg",

        images: [],

        shortDescription:
            "Roboguard perimeter detection system configured for residential home security.",

        description:
            "A configurable Roboguard solution designed to provide perimeter detection around homes and residential properties.",

        features: [

            "Residential perimeter detection",

            "Early warning",

            "Wireless sensors",

            "Expandable configuration",

            "Property perimeter protection"

        ],

        specifications: {

            systemType: "Perimeter Detection",

            technology: "Wireless",

            application: "Residential",

            configuration: "Site Dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Roboguard receiver",

            "Roboguard sensors",

            "Power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Roboguard Sensors",

            "Roboguard Receivers"

        ],

        tags: [

            "Roboguard",

            "home security",

            "perimeter",

            "wireless security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      ROBOGUARD COMMERCIAL KIT
    -----------------------------------------------------*/

    {
        id: "roboguard-commercial-kit",
        sku: "RG-COM-KIT",

        name: "Roboguard Commercial Perimeter Security System",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Complete Kits",

        type: "complete-system",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/roboguard/roboguard-commercial-kit.jpg",

        images: [],

        shortDescription:
            "Expandable Roboguard perimeter security solution for commercial properties.",

        description:
            "A site-configured Roboguard perimeter detection system designed for commercial properties, estates and larger security applications.",

        features: [

            "Commercial perimeter security",

            "Expandable sensor network",

            "Early intrusion detection",

            "Large property applications",

            "Site-specific configuration",

            "Professional installation"

        ],

        specifications: {

            systemType: "Perimeter Security",

            technology: "Wireless",

            application: "Commercial",

            configuration: "Site Specific"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Roboguard receiver system",

            "Multiple Roboguard sensors",

            "Power equipment",

            "System accessories",

            "Installation components"

        ],

        compatibleWith: [

            "Roboguard Sensors",

            "Roboguard Receivers"

        ],

        tags: [

            "Roboguard",

            "commercial security",

            "perimeter detection",

            "estate security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "large-security-equipment"

    }

);


/*=========================================================
 2. ROBOGUARD SENSORS
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "roboguard-sensor",
        sku: "RG-SENSOR",

        name: "Roboguard Outdoor Detection Sensor",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Roboguard Sensors",

        type: "single-product",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/roboguard/roboguard-sensor.jpg",

        images: [],

        shortDescription:
            "Outdoor Roboguard detection sensor for perimeter security applications.",

        description:
            "A Roboguard outdoor detection sensor designed to monitor defined areas around a property and provide early warning of potential intrusion.",

        features: [

            "Outdoor detection",

            "Perimeter monitoring",

            "Wireless communication",

            "Early warning",

            "Expandable system"

        ],

        specifications: {

            productType: "Outdoor Sensor",

            technology: "Wireless",

            application: "Perimeter Security",

            detectionArea: "Model / installation dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Roboguard Receiver",

            "Roboguard System"

        ],

        tags: [

            "Roboguard",

            "sensor",

            "outdoor sensor",

            "perimeter detection"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    {
        id: "roboguard-sensor-additional",
        sku: "RG-SENSOR-ADD",

        name: "Roboguard Additional Perimeter Sensor",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Roboguard Sensors",

        type: "replacement",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/roboguard/additional-sensor.jpg",

        images: [],

        shortDescription:
            "Additional Roboguard sensor for expanding an existing perimeter security system.",

        description:
            "Additional detection sensor for expanding a compatible Roboguard perimeter security installation.",

        features: [

            "System expansion",

            "Outdoor detection",

            "Wireless communication",

            "Compatible system expansion"

        ],

        specifications: {

            productType: "Additional Sensor",

            technology: "Wireless",

            application: "Perimeter Security"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Roboguard Receiver",

            "Roboguard Systems"

        ],

        tags: [

            "Roboguard",

            "additional sensor",

            "perimeter sensor"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 3. ROBOGUARD RECEIVERS
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "roboguard-receiver",
        sku: "RG-RECEIVER",

        name: "Roboguard Receiver",

        brand: "Roboguard",

        category: "roboguard",

        subcategory: "Receivers",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/roboguard/roboguard-receiver.jpg",

        images: [],

        shortDescription:
            "Roboguard receiver for managing compatible perimeter detection sensors.",

        description:
            "Receiver equipment for compatible Roboguard perimeter detection systems.",

        features: [

            "Wireless sensor receiver",

            "Perimeter security",

            "System management",

            "Expandable sensor support"

        ],

        specifications: {

            productType: "Receiver",

            technology: "Wireless",

            application: "Perimeter Security",

            compatibility: "Roboguard"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Roboguard Sensors"

        ],

        tags: [

            "Roboguard",

            "receiver",

            "perimeter security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 4. AJAX SECURITY SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      AJAX HUB
    -----------------------------------------------------*/

    {
        id: "ajax-hub",
        sku: "AJAX-HUB",

        name: "Ajax Security Hub",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Hubs",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ajax/ajax-hub.jpg",

        images: [],

        shortDescription:
            "Ajax central security hub for managing compatible wireless security devices.",

        description:
            "The central hub of a compatible Ajax security system, providing communication and management of connected security devices.",

        features: [

            "Central security controller",

            "Wireless device management",

            "Alarm system integration",

            "Expandable system",

            "Remote management options"

        ],

        specifications: {

            productType: "Security Hub",

            technology: "Wireless",

            application: "Alarm / Security",

            compatibility: "Ajax"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Ajax Detectors",

            "Ajax Keypads",

            "Ajax Sirens"

        ],

        tags: [

            "Ajax",

            "security hub",

            "alarm system",

            "wireless alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      AJAX COMPLETE KIT
    -----------------------------------------------------*/

    {
        id: "ajax-starter-kit",
        sku: "AJAX-STARTER-KIT",

        name: "Ajax Wireless Alarm Starter Kit",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Complete Systems",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/ajax/ajax-starter-kit.jpg",

        images: [],

        shortDescription:
            "Ajax wireless security starter system for residential and small commercial properties.",

        description:
            "A configurable Ajax wireless alarm system containing the core equipment required for a basic security installation.",

        features: [

            "Wireless alarm system",

            "Central hub",

            "Intrusion detection",

            "Expandable device network",

            "Remote management options",

            "Residential and small commercial applications"

        ],

        specifications: {

            systemType: "Wireless Alarm",

            technology: "Wireless",

            application: "Residential / Commercial",

            configuration: "Expandable"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Ajax Hub",

            "Motion detector",

            "Door/window detector",

            "Keypad or control device",

            "Sirens or alert device",

            "System accessories"

        ],

        compatibleWith: [

            "Ajax Security Devices"

        ],

        tags: [

            "Ajax",

            "alarm system",

            "wireless alarm",

            "security kit"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      AJAX MOTION DETECTOR
    -----------------------------------------------------*/

    {
        id: "ajax-motion-detector",
        sku: "AJAX-MOTION",

        name: "Ajax Motion Detector",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Motion Detectors",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ajax/ajax-motion.jpg",

        images: [],

        shortDescription:
            "Ajax motion detector for compatible wireless alarm systems.",

        description:
            "Wireless motion detection device designed for compatible Ajax security systems.",

        features: [

            "Motion detection",

            "Wireless communication",

            "Alarm system integration",

            "Indoor security",

            "Expandable system"

        ],

        specifications: {

            productType: "Motion Detector",

            technology: "Wireless",

            application: "Intrusion Detection",

            compatibility: "Ajax"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Ajax Hub"

        ],

        tags: [

            "Ajax",

            "motion detector",

            "PIR",

            "wireless alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      AJAX DOOR/WINDOW DETECTOR
    -----------------------------------------------------*/

    {
        id: "ajax-door-detector",
        sku: "AJAX-DOOR",

        name: "Ajax Door and Window Detector",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Door & Window Detectors",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ajax/ajax-door.jpg",

        images: [],

        shortDescription:
            "Wireless door and window opening detector for Ajax alarm systems.",

        description:
            "A wireless opening detector designed to monitor doors, windows and other protected openings in compatible Ajax alarm systems.",

        features: [

            "Door monitoring",

            "Window monitoring",

            "Wireless communication",

            "Intrusion detection",

            "Ajax system integration"

        ],

        specifications: {

            productType: "Opening Detector",

            technology: "Wireless",

            application: "Door / Window Protection",

            compatibility: "Ajax"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Ajax Hub"

        ],

        tags: [

            "Ajax",

            "door detector",

            "window detector",

            "magnetic contact"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      AJAX KEYPAD
    -----------------------------------------------------*/

    {

       id: "ajax-keypad",
        sku: "AJAX-KEYPAD",

        name: "Ajax Wireless Security Keypad",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Keypads",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ajax/ajax-keypad.jpg",

        images: [],

        shortDescription:
            "Wireless keypad for controlling compatible Ajax security systems.",

        description:
            "A wireless keypad designed to provide user control of compatible Ajax alarm and security systems.",

        features: [

            "Wireless keypad",

            "Alarm system control",

            "User access control",

            "Ajax system integration"

        ],

        specifications: {

            productType: "Security Keypad",

            technology: "Wireless",

            application: "Alarm Control",

            compatibility: "Ajax"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Ajax Hub"

        ],

        tags: [

            "Ajax",

            "keypad",

            "alarm keypad",

            "wireless security"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      AJAX SIREN
    -----------------------------------------------------*/

    {
        id: "ajax-siren",
        sku: "AJAX-SIREN",

        name: "Ajax Wireless Security Siren",

        brand: "Ajax",

        category: "ajax",

        subcategory: "Sirens",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ajax/ajax-siren.jpg",

        images: [],

        shortDescription:
            "Wireless siren for compatible Ajax security alarm systems.",

        description:
            "A wireless security siren designed to provide audible alarm notification for compatible Ajax systems.",

        features: [

            "Wireless alarm siren",

            "Audible notification",

            "Alarm system integration",

            "Indoor or outdoor model options"

        ],

        specifications: {

            productType: "Security Siren",

            technology: "Wireless",

            application: "Alarm Notification",

            compatibility: "Ajax"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Ajax Hub"

        ],

        tags: [

            "Ajax",

            "siren",

            "alarm siren",

            "wireless alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. IDS SECURITY SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      IDS ALARM PANEL
    -----------------------------------------------------*/

    {
        id: "ids-alarm-panel",
        sku: "IDS-PANEL",

        name: "IDS Alarm Control Panel",

        brand: "IDS",

        category: "ids",

        subcategory: "Alarm Panels",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ids/ids-panel.jpg",

        images: [],

        shortDescription:
            "IDS alarm control panel for professional intrusion detection systems.",

        description:
            "An IDS alarm control panel designed to manage compatible intrusion detection devices and alarm system components.",

        features: [

            "Alarm control panel",

            "Intrusion detection",

            "Multiple zone options",

            "Keypad integration",

            "Expandable security system",

            "Professional installation"

        ],

        specifications: {

            productType: "Alarm Panel",

            technology: "Model dependent",

            zones: "Model dependent",

            application: "Intrusion Detection"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IDS Keypads",

            "IDS Motion Detectors",

            "IDS Sirens",

            "IDS Accessories"

        ],

        tags: [

            "IDS",

            "alarm panel",

            "security panel",

            "intrusion alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      IDS COMPLETE KIT
    -----------------------------------------------------*/

    {
        id: "ids-starter-kit",
        sku: "IDS-STARTER-KIT",

        name: "IDS Security Alarm Starter Kit",

        brand: "IDS",

        category: "ids",

        subcategory: "Complete Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/ids/ids-starter-kit.jpg",

        images: [],

        shortDescription:
            "IDS alarm starter system for residential and commercial intrusion protection.",

        description:
            "A configurable IDS alarm system package containing core components for a professional intrusion detection installation.",

        features: [

            "Intrusion detection",

            "Alarm control panel",

            "Motion detection",

            "Door/window protection",

            "Keypad control",

            "Expandable system"

        ],

        specifications: {

            systemType: "Intrusion Alarm",

            technology: "Model dependent",

            application: "Residential / Commercial",

            configuration: "Expandable"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "IDS alarm panel",

            "IDS keypad",

            "Motion detector",

            "Door/window detector",

            "Siren",

            "Installation accessories"

        ],

        compatibleWith: [

            "IDS Alarm Panels",

            "IDS Detectors",

            "IDS Keypads",

            "IDS Sirens"

        ],

        tags: [

            "IDS",

            "alarm kit",

            "security system",

            "intrusion alarm"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      IDS KEYPAD
    -----------------------------------------------------*/

    {
        id: "ids-keypad",
        sku: "IDS-KEYPAD",

        name: "IDS Alarm Keypad",

        brand: "IDS",

        category: "ids",

        subcategory: "Keypads",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ids/ids-keypad.jpg",

        images: [],

        shortDescription:
            "IDS keypad for controlling compatible alarm systems.",

        description:
            "Alarm keypad for arming, disarming and managing compatible IDS security systems.",

        features: [

            "Alarm system control",

            "User interface",

            "Arming and disarming",

            "IDS system compatibility"

        ],

        specifications: {

            productType: "Alarm Keypad",

            application: "Alarm Control",

            compatibility: "IDS"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IDS Alarm Panel"

        ],

        tags: [

            "IDS",

            "keypad",

            "alarm keypad"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      IDS PIR DETECTOR
    -----------------------------------------------------*/

    {
        id: "ids-pir-detector",
        sku: "IDS-PIR",

        name: "IDS PIR Motion Detector",

        brand: "IDS",

        category: "ids",

        subcategory: "Motion Detectors",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ids/ids-pir.jpg",

        images: [],

        shortDescription:
            "IDS PIR motion detector for compatible intrusion alarm systems.",

        description:
            "Passive infrared motion detector designed for indoor intrusion detection in compatible IDS alarm systems.",

        features: [

            "PIR motion detection",

            "Indoor intrusion protection",

            "Alarm panel integration",

            "Professional installation"

        ],

        specifications: {

            productType: "PIR Motion Detector",

            technology: "PIR",

            application: "Indoor Intrusion Detection",

            compatibility: "IDS"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IDS Alarm Panel"

        ],

        tags: [

            "IDS",

            "PIR",

            "motion detector",

            "alarm sensor"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      IDS MAGNETIC CONTACT
    -----------------------------------------------------*/

    {
        id: "ids-magnetic-contact",
        sku: "IDS-MAG-CONTACT",

        name: "IDS Magnetic Door Contact",

        brand: "IDS",

        category: "ids",

        subcategory: "Magnetic Contacts",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ids/ids-magnetic-contact.jpg",

        images: [],

        shortDescription:
            "Magnetic contact for monitoring doors, windows and other protected openings.",

        description:
            "Magnetic opening contact for compatible IDS intrusion alarm systems.",

        features: [

            "Door protection",

            "Window protection",

            "Opening detection",

            "Alarm panel integration"

        ],

        specifications: {

            productType: "Magnetic Contact",

            application: "Door / Window Protection",

            compatibility: "IDS"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IDS Alarm Panel"

        ],

        tags: [

            "IDS",

            "magnetic contact",

            "door contact",

            "window contact"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      IDS SIREN
    -----------------------------------------------------*/

    {
        id: "ids-siren",
        sku: "IDS-SIREN",

        name: "IDS Security Alarm Siren",

        brand: "IDS",

        category: "ids",

        subcategory: "Sirens",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/ids/ids-siren.jpg",

        images: [],

        shortDescription:
            "Alarm siren for compatible IDS security systems.",

        description:
            "Audible alarm siren for use with compatible IDS intrusion detection systems.",

        features: [

            "Audible alarm notification",

            "Intrusion alarm",

            "IDS compatibility",

            "Security installation"

        ],

        specifications: {

            productType: "Alarm Siren",

            application: "Intrusion Alarm",

            compatibility: "IDS"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IDS Alarm Panel"

        ],

        tags: [

            "IDS",

            "siren",

            "alarm siren",

            "security alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 6. DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 7. DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 5/8

 CURRENT PRODUCT GROUPS:

 PART 2
 └── ELECTRIC FENCING

 PART 3
 └── CCTV / DAHUA

 PART 4
 ├── IP CCTV
 └── PTZ

 PART 5
 ├── ROBOGUARD
 │   ├── Starter Kit
 │   ├── Home Kit
 │   ├── Commercial System
 │   ├── Outdoor Sensor
 │   ├── Additional Sensor
 │   └── Receiver
 │
 ├── AJAX
 │   ├── Security Hub
 │   ├── Wireless Alarm Kit
 │   ├── Motion Detector
 │   ├── Door/Window Detector
 │   ├── Keypad
 │   └── Siren
 │
 └── IDS
     ├── Alarm Panel
     ├── Security Alarm Kit
     ├── Keypad
     ├── PIR Detector
     ├── Magnetic Contact
     └── Siren

 NEXT:
 online-data.js — PART 6/8

 ACCESS CONTROL
 INTERCOM SYSTEMS
 GATE AUTOMATION

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 6/8

 PRODUCT DATABASE
 ACCESS CONTROL + INTERCOMS + GATE AUTOMATION

 Covers:
 - Access Control Kits
 - Standalone Access Controllers
 - Keypads
 - RFID Readers
 - Exit Buttons
 - Electromagnetic Locks
 - Electric Strikes
 - Intercom Systems
 - Video Intercoms
 - Audio Intercoms
 - Gate Motors
 - Sliding Gate Automation
 - Swing Gate Automation
 - Gate Accessories
=========================================================*/


/*=========================================================
 1. ACCESS CONTROL COMPLETE SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      SINGLE DOOR ACCESS CONTROL KIT
    -----------------------------------------------------*/

    {
        id: "access-control-single-door-kit",
        sku: "AC-SINGLE-DOOR-KIT",

        name: "Single-Door Access Control Kit",

        brand: "NEXPAK",

        category: "access-control",

        subcategory: "Access Control Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/access-control/single-door-kit.jpg",

        images: [],

        shortDescription:
            "Complete access control package for securing a single pedestrian entrance.",

        description:
            "A configurable single-door access control solution combining user identification, locking hardware and exit control for residential, commercial and office applications.",

        features: [

            "Single-door access control",

            "RFID / keypad options",

            "Electronic locking",

            "Exit button",

            "User access management",

            "Suitable for offices and premises",

            "Expandable options"

        ],

        specifications: {

            systemType: "Access Control",

            doors: 1,

            identification: "RFID / PIN / Model dependent",

            locking: "Electromagnetic / Electric Strike",

            application: "Residential / Commercial"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Access controller",

            "RFID reader or keypad",

            "Electronic lock",

            "Exit button",

            "Power supply",

            "Access cards / tags",

            "Installation accessories"

        ],

        compatibleWith: [

            "RFID Cards",

            "RFID Tags",

            "Magnetic Locks",

            "Electric Strikes"

        ],

        tags: [

            "access control",

            "door access",

            "RFID",

            "keypad",

            "office security"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      TWO DOOR ACCESS CONTROL KIT
    -----------------------------------------------------*/

    {
        id: "access-control-two-door-kit",
        sku: "AC-TWO-DOOR-KIT",

        name: "Two-Door Access Control Kit",

        brand: "NEXPAK",

        category: "access-control",

        subcategory: "Access Control Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/access-control/two-door-kit.jpg",

        images: [],

        shortDescription:
            "Access control solution for managing two secured pedestrian doors.",

        description:
            "A configurable two-door access control system for offices, commercial buildings and controlled-entry environments.",

        features: [

            "Two-door access control",

            "RFID access",

            "Keypad options",

            "Electronic locking",

            "Exit control",

            "User management",

            "Commercial applications"

        ],

        specifications: {

            systemType: "Access Control",

            doors: 2,

            identification: "RFID / PIN / Model dependent",

            locking: "Electronic",

            application: "Commercial"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Access controller",

            "RFID readers / keypads",

            "Electronic locks",

            "Exit buttons",

            "Power supplies",

            "Cards / tags",

            "Installation accessories"

        ],

        compatibleWith: [

            "RFID Cards",

            "RFID Tags",

            "Magnetic Locks",

            "Electric Strikes"

        ],

        tags: [

            "two door access",

            "access control",

            "RFID",

            "commercial security"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    }

);


/*=========================================================
 2. ACCESS CONTROL READERS & CONTROLLERS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      RFID ACCESS READER
    -----------------------------------------------------*/

    {
        id: "access-rfid-reader",
        sku: "AC-RFID-READER",

        name: "RFID Access Control Reader",

        brand: "Generic",

        category: "access-control",

        subcategory: "Readers",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/rfid-reader.jpg",

        images: [],

        shortDescription:
            "RFID reader for controlled access to compatible doors and entrances.",

        description:
            "An RFID access reader for identifying authorised users through compatible access cards or tags.",

        features: [

            "RFID identification",

            "Contactless access",

            "Door access control",

            "Indoor and outdoor model options",

            "System integration"

        ],

        specifications: {

            productType: "RFID Reader",

            technology: "RFID",

            identification: "Card / Tag",

            application: "Access Control"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Access Controllers",

            "RFID Cards",

            "RFID Tags"

        ],

        tags: [

            "RFID",

            "access reader",

            "card reader",

            "door access"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      ACCESS CONTROL KEYPAD
    -----------------------------------------------------*/

    {
        id: "access-control-keypad",
        sku: "AC-KEYPAD",

        name: "Standalone Access Control Keypad",

        brand: "Generic",

        category: "access-control",

        subcategory: "Keypads",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/access-keypad.jpg",

        images: [],

        shortDescription:
            "PIN-based keypad for controlled access to compatible doors.",

        description:
            "A standalone access control keypad providing PIN-based entry for suitable pedestrian access points.",

        features: [

            "PIN access",

            "Standalone operation",

            "Electronic lock control",

            "User code management",

            "Access control application"

        ],

        specifications: {

            productType: "Access Keypad",

            technology: "PIN",

            application: "Door Access",

            operation: "Standalone / Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Magnetic Locks",

            "Electric Strikes",

            "Exit Buttons"

        ],

        tags: [

            "access keypad",

            "PIN keypad",

            "door access",

            "access control"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      BIOMETRIC ACCESS CONTROLLER
    -----------------------------------------------------*/

    {
        id: "access-biometric-reader",
        sku: "AC-BIOMETRIC",

        name: "Biometric Access Control Reader",

        brand: "Generic",

        category: "access-control",

        subcategory: "Biometric",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/biometric-reader.jpg",

        images: [],

        shortDescription:
            "Biometric access reader for fingerprint or compatible biometric identification.",

        description:
            "A biometric access control device for installations requiring user identification beyond conventional cards and PINs.",

        features: [

            "Biometric identification",

            "User management",

            "Access logging",

            "Electronic door control",

            "Commercial applications"

        ],

        specifications: {

            productType: "Biometric Reader",

            technology: "Biometric",

            identification: "Model dependent",

            application: "Access Control"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electronic Locks",

            "Access Controllers"

        ],

        tags: [

            "biometric",

            "fingerprint",

            "access control",

            "security reader"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 3. ACCESS CONTROL LOCKING HARDWARE
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      MAGNETIC LOCK
    -----------------------------------------------------*/

    {
        id: "access-magnetic-lock",
        sku: "AC-MAGLOCK",

        name: "Electromagnetic Door Lock",

        brand: "Generic",

        category: "access-control",

        subcategory: "Door Locks",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/magnetic-lock.jpg",

        images: [],

        shortDescription:
            "Electromagnetic locking solution for controlled pedestrian doors.",

        description:
            "An electromagnetic door lock designed for compatible access control installations.",

        features: [

            "Electromagnetic locking",

            "Fail-safe operation options",

            "Access control integration",

            "Commercial applications",

            "Professional installation"

        ],

        specifications: {

            productType: "Magnetic Lock",

            technology: "Electromagnetic",

            holdingForce: "Model dependent",

            application: "Pedestrian Door"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "RFID Readers",

            "Access Keypads",

            "Exit Buttons",

            "Access Controllers"

        ],

        tags: [

            "maglock",

            "magnetic lock",

            "access control",

            "door lock"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      ELECTRIC STRIKE
    -----------------------------------------------------*/

    {
        id: "access-electric-strike",
        sku: "AC-ELECTRIC-STRIKE",

        name: "Electric Door Strike",

        brand: "Generic",

        category: "access-control",

        subcategory: "Door Locks",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/electric-strike.jpg",

        images: [],

        shortDescription:
            "Electric strike for integrating conventional doors with electronic access control.",

        description:
            "An electric strike designed to release compatible door hardware when authorised access is granted.",

        features: [

            "Electronic door release",

            "Access control integration",

            "Existing door hardware compatibility",

            "Commercial applications"

        ],

        specifications: {

            productType: "Electric Strike",

            technology: "Electronic",

            application: "Pedestrian Door",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Access Controllers",

            "RFID Readers",

            "Access Keypads"

        ],

        tags: [

            "electric strike",

            "door strike",

            "access control",

            "electronic lock"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      EXIT BUTTON
    -----------------------------------------------------*/

    {
        id: "access-exit-button",
        sku: "AC-EXIT-BUTTON",

        name: "Access Control Exit Button",

        brand: "Generic",

        category: "access-control",

        subcategory: "Exit Devices",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/access-control/exit-button.jpg",

        images: [],

        shortDescription:
            "Exit button for releasing compatible electronically locked doors.",

        description:
            "A push-to-exit device for use with compatible electronic access control door locking systems.",

        features: [

            "Push-to-exit operation",

            "Door release",

            "Access control integration",

            "Indoor installation"

        ],

        specifications: {

            productType: "Exit Button",

            application: "Access Control",

            operation: "Push Button"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Magnetic Locks",

            "Electric Strikes",

            "Access Controllers"

        ],

        tags: [

            "exit button",

            "push button",

            "access control",

            "door release"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 4. INTERCOM SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      AUDIO INTERCOM
    -----------------------------------------------------*/

    {
        id: "intercom-audio-system",
        sku: "INTERCOM-AUDIO",

        name: "Audio Gate Intercom System",

        brand: "Generic",

        category: "intercom",

        subcategory: "Audio Intercoms",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/intercom/audio-intercom.jpg",

        images: [],

        shortDescription:
            "Audio intercom system for communication between a gate and property.",

        description:
            "An audio intercom solution allowing occupants to communicate with visitors at a gate or entrance.",

        features: [

            "Two-way audio",

            "Gate communication",

            "Visitor identification",

            "Gate access integration",

            "Residential applications",

            "Commercial applications"

        ],

        specifications: {

            systemType: "Audio Intercom",

            communication: "Two-Way Audio",

            application: "Gate / Entrance",

            configuration: "Model dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Outdoor station",

            "Indoor handset / monitor",

            "Power supply",

            "Installation accessories"

        ],

        compatibleWith: [

            "Gate Automation",

            "Electric Locks"

        ],

        tags: [

            "intercom",

            "audio intercom",

            "gate intercom",

            "visitor communication"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      VIDEO INTERCOM
    -----------------------------------------------------*/

    {
        id: "intercom-video-system",
        sku: "INTERCOM-VIDEO",

        name: "Video Gate Intercom System",

        brand: "Generic",

        category: "intercom",

        subcategory: "Video Intercoms",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/intercom/video-intercom.jpg",

        images: [],

        shortDescription:
            "Video intercom system providing visual visitor identification at gates and entrances.",

        description:
            "A video intercom solution combining two-way communication with visitor video monitoring.",

        features: [

            "Two-way audio",

            "Video visitor identification",

            "Gate communication",

            "Indoor monitor",

            "Gate release options",
     
            "Residential and commercial applications"

        ],

        specifications: {

            systemType: "Video Intercom",

            communication: "Audio + Video",

            application: "Gate / Entrance",

            network: "Model dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Outdoor video station",

            "Indoor monitor",

            "Power supply",

            "Mounting hardware",

            "Installation accessories"

        ],

        compatibleWith: [

            "Gate Automation",

            "Electric Locks"

        ],

        tags: [

            "video intercom",

            "gate intercom",

            "video doorbell",

            "visitor identification"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "security-equipment"

    },


    /*-----------------------------------------------------
      VIDEO DOOR PHONE
    -----------------------------------------------------*/

    {
        id: "intercom-video-door-phone",
        sku: "INTERCOM-DOORPHONE",

        name: "Video Door Phone",

        brand: "Generic",

        category: "intercom",

        subcategory: "Video Intercoms",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/intercom/video-door-phone.jpg",

        images: [],

        shortDescription:
            "Video door communication system for residential and office entrances.",

        description:
            "A video door phone solution for identifying and communicating with visitors before granting access.",

        features: [

            "Video communication",

            "Two-way audio",

            "Visitor identification",

            "Door release options",

            "Indoor monitoring"

        ],

        specifications: {

            productType: "Video Door Phone",

            communication: "Audio + Video",

            application: "Door / Entrance",

            configuration: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electronic Locks",

            "Access Control"

        ],

        tags: [

            "video door phone",

            "intercom",

            "door communication",

            "video intercom"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. GATE AUTOMATION
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      SLIDING GATE MOTOR
    -----------------------------------------------------*/

    {
        id: "gate-motor-sliding",
        sku: "GATE-SLIDING-MOTOR",

        name: "Sliding Gate Automation Motor",

        brand: "Centurion",

        category: "gate-automation",

        subcategory: "Sliding Gate Motors",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/gate-automation/sliding-gate-motor.jpg",

        images: [],

        shortDescription:
            "Automatic sliding gate motor for residential and commercial entrances.",

        description:
            "A sliding gate automation system for automating compatible residential and commercial sliding gates.",

        features: [

            "Sliding gate automation",

            "Remote control",

            "Safety inputs",

            "Manual release",

            "Battery backup options",

            "Residential and commercial applications"

        ],

        specifications: {

            systemType: "Sliding Gate Automation",

            gateType: "Sliding",

            motorCapacity: "Model dependent",

            power: "Model dependent",

            batteryBackup: "Model dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Gate motor",

            "Control electronics",

            "Remote controls",

            "Rack",

            "Battery / power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Gate Remotes",

            "Safety Beams",

            "Intercoms",

            "Access Control"

        ],

        tags: [

            "gate motor",

            "sliding gate",

            "gate automation",

            "Centurion"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "large-security-equipment"

    },


    /*-----------------------------------------------------
      SWING GATE MOTOR
    -----------------------------------------------------*/

    {
        id: "gate-motor-swing",
        sku: "GATE-SWING-MOTOR",

        name: "Swing Gate Automation System",

        brand: "Centurion",

        category: "gate-automation",

        subcategory: "Swing Gate Motors",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/gate-automation/swing-gate-motor.jpg",

        images: [],

        shortDescription:
            "Automated swing gate solution for residential and commercial properties.",

        description:
            "A swing gate automation system designed for compatible hinged and swing gate installations.",

        features: [

            "Swing gate automation",

            "Remote control",

            "Safety inputs",

            "Manual override",

            "Battery backup options",

            "Professional installation"

        ],

        specifications: {

            systemType: "Swing Gate Automation",

            gateType: "Swing",

            motorCapacity: "Model dependent",

            power: "Model dependent",

            batteryBackup: "Model dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Gate motor operators",

            "Control electronics",

            "Remote controls",

            "Battery / power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Gate Remotes",

            "Safety Beams",

            "Intercoms",

            "Access Control"

        ],

        tags: [

            "swing gate",

            "gate motor",

            "gate automation",

            "Centurion"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "large-security-equipment"

    },


    /*-----------------------------------------------------
      GATE REMOTE
    -----------------------------------------------------*/

    {
        id: "gate-remote",
        sku: "GATE-REMOTE",

        name: "Gate Automation Remote Control",

        brand: "Centurion",

        category: "gate-automation",

        subcategory: "Gate Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/gate-automation/gate-remote.jpg",

        images: [],

        shortDescription:
            "Remote control for compatible automated gate systems.",

        description:
            "Replacement or additional remote control for compatible gate automation systems.",

        features: [

            "Gate remote control",

            "Replacement remote",

            "Additional user remote",

            "Compatible automation systems"

        ],

        specifications: {

            productType: "Gate Remote",

            application: "Gate Automation",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Sliding Gate Motors",

            "Swing Gate Motors"

        ],

        tags: [

            "gate remote",

            "Centurion remote",

            "gate automation",

            "remote control"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      SAFETY BEAMS
    -----------------------------------------------------*/

    {
        id: "gate-safety-beams",
        sku: "GATE-SAFETY-BEAMS",

        name: "Gate Automation Safety Beams",

        brand: "Generic",

        category: "gate-automation",

        subcategory: "Safety Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/gate-automation/safety-beams.jpg",

        images: [],

        shortDescription:
            "Safety photo beams for compatible automated gate systems.",

        description:
            "Safety beam equipment designed to detect obstructions in the path of compatible automated gates.",

        features: [

            "Obstacle detection",

            "Gate safety",

            "Automation integration",

            "Residential and commercial use"

        ],

        specifications: {

            productType: "Safety Beam",

            application: "Gate Automation",

            technology: "Photoelectric",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Sliding Gate Motors",

            "Swing Gate Motors"

        ],

        tags: [

            "safety beams",

            "gate safety",

            "photo beam",

            "gate motor"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 6. GATE AUTOMATION ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "gate-battery",
        sku: "GATE-BATTERY",

        name: "Gate Motor Backup Battery",

        brand: "Generic",

        category: "gate-automation",

        subcategory: "Gate Accessories",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/gate-automation/gate-battery.jpg",

        images: [],

        shortDescription:
            "Backup battery for compatible automated gate systems.",

        description:
            "Backup battery designed for compatible gate automation systems requiring battery-supported operation.",

        features: [

            "Gate motor backup",

            "Battery operation",

            "Replacement battery",

            "Automation system support"

        ],

        specifications: {

            productType: "Gate Battery",

            application: "Gate Automation",

            capacity: "Model dependent",

            voltage: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Gate Motors"

        ],

        tags: [

            "gate battery",

            "backup battery",

            "gate motor",

            "automation"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 7. DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 8. DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 6/8

 CURRENT PRODUCT GROUPS:

 PART 2
 └── ELECTRIC FENCING

 PART 3
 └── CCTV / DAHUA

 PART 4
 ├── IP CCTV
 └── PTZ

 PART 5
 ├── ROBOGUARD
 ├── AJAX
 └── IDS

 PART 6
 ├── ACCESS CONTROL
 │   ├── Single-Door Kit
 │   ├── Two-Door Kit
 │   ├── RFID Reader
 │   ├── Access Keypad
 │   ├── Biometric Reader
 │   ├── Magnetic Lock
 │   ├── Electric Strike
 │   └── Exit Button
 │
 ├── INTERCOM
 │   ├── Audio Intercom
 │   ├── Video Intercom
 │   └── Video Door Phone
 │
 └── GATE AUTOMATION
     ├── Sliding Gate Motor
     ├── Swing Gate Motor
     ├── Gate Remote
     ├── Safety Beams
     └── Gate Battery

 NEXT:
 online-data.js — PART 7/8

 AGRICULTURAL SECURITY
 SECURITY ACCESSORIES
 POWER / BACKUP
 CABLING
 INSTALLATION PRODUCTS
 MISCELLANEOUS SECURITY PRODUCTS

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 Part: 7/8

 PRODUCT DATABASE
 AGRICULTURAL SECURITY + ACCESSORIES + POWER + CABLING

 Covers:
 - Agricultural Security
 - Farm / Smallholding Security Kits
 - Roboguard Agricultural Systems
 - Electric Fence Accessories
 - CCTV Accessories
 - Alarm Accessories
 - Power Supplies
 - Batteries
 - Solar / Backup Power
 - Network Cabling
 - CCTV Cabling
 - Connectors
 - Installation Accessories
=========================================================*/


/*=========================================================
 1. AGRICULTURAL SECURITY SYSTEMS
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      AGRICULTURAL SECURITY KIT
    -----------------------------------------------------*/

    {
        id: "agric-security-kit",
        sku: "AGRI-SECURITY-KIT",

        name: "Agricultural Perimeter Security Kit",

        brand: "NEXPAK",

        category: "agricultural-security",

        subcategory: "Agricultural Security Kits",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/agricultural/agri-security-kit.jpg",

        images: [],

        shortDescription:
            "Configurable perimeter security solution for farms, smallholdings and agricultural properties.",

        description:
            "A configurable agricultural security package combining perimeter detection and security equipment for farms, smallholdings and rural properties.",

        features: [

            "Agricultural perimeter protection",

            "Farm security",

            "Early intrusion detection",

            "Expandable system",

            "Outdoor security",

            "Site-specific configuration",

            "Professional installation recommended"

        ],

        specifications: {

            systemType: "Agricultural Security",

            application: "Farm / Smallholding",

            configuration: "Site Specific",

            technology: "Model Dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Perimeter detection equipment",

            "Security sensors",

            "Receiver / control equipment",

            "Power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Roboguard",

            "Electric Fencing",

            "CCTV",

            "Alarm Systems"

        ],

        tags: [

            "farm security",

            "agricultural security",

            "perimeter security",

            "smallholding security"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    },


    /*-----------------------------------------------------
      FARM PERIMETER DETECTION
    -----------------------------------------------------*/

    {
        id: "agric-perimeter-detection",
        sku: "AGRI-PERIMETER",

        name: "Farm Perimeter Detection System",

        brand: "NEXPAK",

        category: "agricultural-security",

        subcategory: "Perimeter Detection",

        type: "complete-system",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/agricultural/farm-perimeter.jpg",

        images: [],

        shortDescription:
            "Site-configured perimeter detection solution for farms and large properties.",

        description:
            "A configurable perimeter detection solution designed for agricultural properties requiring early warning across larger outdoor areas.",

        features: [

            "Large perimeter coverage",

            "Outdoor detection",

            "Early warning",

            "Expandable system",

            "Farm security",

            "Site-specific design"

        ],

        specifications: {

            systemType: "Perimeter Detection",

            application: "Agricultural",

            coverage: "Site Dependent",

            configuration: "Custom"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Detection sensors",

            "Receiver equipment",

            "Control equipment",

            "Power equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "Roboguard",

            "Electric Fence",

            "CCTV",

            "Alarm Systems"

        ],

        tags: [

            "farm perimeter",

            "perimeter detection",

            "agricultural security",

            "rural security"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    },


    /*-----------------------------------------------------
      FARM CCTV KIT
    -----------------------------------------------------*/

    {
        id: "agric-cctv-kit",
        sku: "AGRI-CCTV-KIT",

        name: "Farm CCTV Security Kit",

        brand: "NEXPAK",

        category: "agricultural-security",

        subcategory: "Agricultural CCTV",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/agricultural/farm-cctv-kit.jpg",

        images: [],

        shortDescription:
            "Long-range CCTV security package for agricultural properties.",

        description:
            "A configurable CCTV solution for farms, smallholdings and agricultural properties requiring perimeter and property surveillance.",

        features: [

            "Farm surveillance",

            "Long-range camera options",

            "Night vision options",

            "Remote viewing",

            "Expandable camera system",

            "Site-specific configuration"

        ],

        specifications: {

            systemType: "CCTV",

            application: "Agricultural",

            cameras: "Model / package dependent",

            recorder: "NVR / DVR",

            network: "Model dependent"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: true,

        newProduct: false,

        kit: true,

        kitContents: [

            "Security cameras",

            "NVR / DVR",

            "Hard drive",

            "Power equipment",

            "Cabling",

            "Connectors",

            "Installation accessories"

        ],

        compatibleWith: [

            "IP Cameras",

            "DVR Cameras",

            "NVR",

            "Solar Backup"

        ],

        tags: [

            "farm CCTV",

            "agricultural CCTV",

            "rural CCTV",

            "farm surveillance"

        ],

        warranty: "Manufacturer warranties apply",

        deliveryClass: "large-security-equipment"

    }

);


/*=========================================================
 2. ELECTRIC FENCE ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "electric-fence-insulator",
        sku: "EF-INSULATORS",

        name: "Electric Fence Insulators",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "Electric Fence Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/electric-fence-insulators.jpg",

        images: [],

        shortDescription:
            "Insulators for compatible electric fence installations.",

        description:
            "Electric fence insulators used to isolate live conductors from supporting structures.",

        features: [

            "Fence wire isolation",

            "Electric fence installation",

            "Replacement component",

            "Multiple installation types"

        ],

        specifications: {

            productType: "Fence Insulator",

            application: "Electric Fence",

            material: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electric Fence Wire",

            "Electric Fence Posts"

        ],

        tags: [

            "electric fence",

            "insulator",

            "fence accessories"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "electric-fence-warning-sign",
        sku: "EF-WARNING-SIGN",

        name: "Electric Fence Warning Sign",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "Electric Fence Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/electric-fence-warning-sign.jpg",

        images: [],

        shortDescription:
            "Warning signage for electric fence installations.",

        description:
            "Warning signs for use on compliant electric fence installations.",

        features: [

            "Electric fence warning",

            "Safety signage",

            "Outdoor application",

            "Fence installation accessory"

        ],

        specifications: {

            productType: "Warning Sign",

            application: "Electric Fence",

            material: "Model dependent"

        },

        stock: 0,

        stockStatus: "inquire",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Electric Fence Systems"

        ],

        tags: [

            "electric fence sign",

            "warning sign",

            "fence safety"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 3. CCTV ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      CCTV HARD DRIVE
    -----------------------------------------------------*/

    {
        id: "cctv-hard-drive",
        sku: "CCTV-HDD",

        name: "CCTV Surveillance Hard Drive",

        brand: "WD",

        category: "security-accessories",

        subcategory: "CCTV Storage",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/cctv-hard-drive.jpg",

        images: [],

        shortDescription:
            "Surveillance-rated hard drive for compatible DVR and NVR systems.",

        description:
            "A surveillance storage hard drive designed for compatible CCTV recording systems.",

        features: [

            "CCTV recording storage",

            "DVR compatibility",

            "NVR compatibility",

            "Continuous recording applications",

            "Surveillance storage"

        ],

        specifications: {

            productType: "Surveillance HDD",

            capacity: "Model dependent",

            application: "CCTV",

            compatibility: "DVR / NVR"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "DVR",

            "NVR"

        ],

        tags: [

            "CCTV hard drive",

            "surveillance HDD",

            "DVR storage",

            "NVR storage"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      CCTV POWER SUPPLY
    -----------------------------------------------------*/

    {
        id: "cctv-power-supply",
        sku: "CCTV-POWER-SUPPLY",

        name: "CCTV Camera Power Supply",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "CCTV Power",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/cctv-power-supply.jpg",

        images: [],

        shortDescription:
            "Power supply for compatible CCTV camera installations.",

        description:
            "Power supply equipment for compatible CCTV cameras and surveillance installations.",

        features: [

            "CCTV camera power",

            "Multiple output options",

            "Installation accessory",

            "Security system integration"

        ],

        specifications: {

            productType: "Power Supply",

            voltage: "Model dependent",

            output: "Model dependent",

            application: "CCTV"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras"

        ],

        tags: [

            "CCTV power",

            "camera power supply",

            "security power"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      CCTV BNC CONNECTORS
    -----------------------------------------------------*/

    {
        id: "cctv-bnc-connectors",
        sku: "CCTV-BNC",

        name: "CCTV BNC Connectors",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "CCTV Connectors",

        type: "consumable",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/bnc-connectors.jpg",

        images: [],

        shortDescription:
            "BNC connectors for compatible analogue CCTV installations.",

        description:
            "BNC connectors for terminating and connecting compatible coaxial CCTV cable installations.",

        features: [

            "BNC connection",

            "Analogue CCTV",

            "Coaxial cable termination",

            "Installation consumable"

        ],

        specifications: {

            productType: "BNC Connector",

            application: "Analogue CCTV",

            packSize: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Coaxial CCTV Cable",

            "DVR"

        ],

        tags: [

            "BNC",

            "CCTV connector",

            "coaxial",

            "DVR accessories"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 4. ALARM ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "alarm-pir-detector",
        sku: "ALARM-PIR",

        name: "PIR Alarm Motion Detector",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "Alarm Accessories",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/alarm-pir.jpg",

        images: [],

        shortDescription:
            "PIR motion detector for compatible wired alarm systems.",

        description:
            "Passive infrared motion detector for compatible intrusion alarm installations.",

        features: [

            "PIR detection",

            "Indoor motion detection",

            "Alarm panel integration",

            "Security zone protection"

        ],

        specifications: {

            productType: "PIR Detector",

            technology: "PIR",

            application: "Intrusion Detection",

            connection: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Alarm Panels"

        ],

        tags: [

            "PIR",

            "alarm detector",

            "motion sensor",

            "security alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    {
        id: "alarm-magnetic-contact",
        sku: "ALARM-MAG",

        name: "Alarm Magnetic Door Contact",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "Alarm Accessories",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/alarm-magnetic-contact.jpg",

        images: [],

        shortDescription:
            "Magnetic contact for doors and windows in compatible alarm systems.",

        description:
            "Magnetic contact for detecting the opening of protected doors, windows and other access points.",

        features: [

            "Door protection",

            "Window protection",

            "Opening detection",

            "Alarm zone integration"

        ],

        specifications: {

            productType: "Magnetic Contact",

            application: "Intrusion Detection",

            connection: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Alarm Panels"

        ],

        tags: [

            "magnetic contact",

            "door contact",

            "alarm sensor"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "alarm-external-siren",
        sku: "ALARM-EXT-SIREN",

        name: "External Alarm Siren",

        brand: "Generic",

        category: "security-accessories",

        subcategory: "Alarm Accessories",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/accessories/external-alarm-siren.jpg",

        images: [],

        shortDescription:
            "External audible siren for compatible alarm systems.",

        description:
            "Outdoor alarm siren for providing audible notification during alarm events.",

        features: [

            "Outdoor alarm notification",

            "Audible alarm",

            "Alarm panel integration",

            "Visible security deterrent"

        ],

        specifications: {

            productType: "External Siren",

            application: "Alarm System",

            installation: "Outdoor"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Alarm Panels"

        ],

        tags: [

            "alarm siren",

            "external siren",

            "security alarm"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    }

);


/*=========================================================
 5. POWER & BACKUP
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      12V SECURITY BATTERY
    -----------------------------------------------------*/

    {
        id: "security-battery-12v",
        sku: "SEC-BATTERY-12V",

        name: "12V Security Backup Battery",

        brand: "Generic",

        category: "power-backup",

        subcategory: "Security Batteries",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/power/12v-security-battery.jpg",

        images: [],

        shortDescription:
            "Rechargeable 12V backup battery for compatible security systems.",

        description:
            "Rechargeable backup battery for compatible alarm, gate automation, access control and other security equipment.",

        features: [

            "12V backup power",

            "Rechargeable",

            "Security system backup",

            "Gate automation applications",

            "Alarm applications"

        ],

        specifications: {

            productType: "Rechargeable Battery",

            voltage: "12V",

            capacity: "Model dependent",

            chemistry: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Alarm Systems",

            "Gate Motors",

            "Access Control",

            "Security Power Supplies"

        ],

        tags: [

            "12V battery",

            "security battery",

            "backup battery",

            "gate battery"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      SECURITY UPS
    -----------------------------------------------------*/

    {
        id: "security-ups",
        sku: "SEC-UPS",

        name: "Security System UPS Backup",

        brand: "Generic",

        category: "power-backup",

        subcategory: "UPS Systems",

        type: "component",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/power/security-ups.jpg",

        images: [],

        shortDescription:
            "Backup power solution for selected security and networking equipment.",

        description:
            "A backup power solution designed to help maintain selected security equipment during mains power interruptions.",

        features: [

            "Backup power",

            "Security equipment support",

            "Power interruption protection",

            "CCTV applications",

            "Networking applications"

        ],

        specifications: {

            productType: "UPS",

            capacity: "Model dependent",

            runtime: "Load dependent",

            application: "Security Systems"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: true,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV",

            "NVR",

            "Network Equipment",

            "Security Systems"

        ],

        tags: [

            "UPS",

            "backup power",

            "security UPS",

            "CCTV backup"

        ],

        warranty: "Manufacturer warranty applies",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      SOLAR BACKUP POWER
    -----------------------------------------------------*/

    {
        id: "security-solar-backup",
        sku: "SEC-SOLAR-BACKUP",

        name: "Solar Security Backup Power System",

        brand: "NEXPAK",

        category: "power-backup",

        subcategory: "Solar Backup",

        type: "complete-system",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "quote",

        currency: "ZAR",

        image: "images/products/power/solar-security-backup.jpg",

        images: [],

        shortDescription:
            "Configurable solar backup solution for selected security equipment.",

        description:
            "A site-configured solar and battery backup solution for security installations requiring extended operation during power interruptions.",

        features: [

            "Solar backup",

            "Battery storage",

            "Security system support",

            "Remote-site applications",

            "Power resilience",

            "Site-specific configuration"

        ],

        specifications: {

            systemType: "Solar Backup",

            capacity: "Site Dependent",

            battery: "Model Dependent",

            solarPanel: "Model Dependent",

            application: "Security Systems"

        },

        stock: 0,

        stockStatus: "quote-required",

        featured: true,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Solar panel",

            "Battery system",

            "Charge controller / inverter",

            "Cabling",

            "Protection equipment",

            "Installation accessories"

        ],

        compatibleWith: [

            "CCTV",

            "Electric Fence",

            "Gate Automation",

            "Alarm Systems",

            "Remote Security Systems"

        ],

        tags: [

            "solar security",

            "solar backup",

            "security power",

            "farm security"

        ],

        warranty: "Component warranties apply",

        deliveryClass: "large-security-equipment"

    }

);


/*=========================================================
 6. NETWORK & CCTV CABLING
=========================================================*/

NEXPAK_PRODUCTS.push(

    /*-----------------------------------------------------
      CAT6 CABLE
    -----------------------------------------------------*/

    {
        id: "network-cat6-cable",
        sku: "NET-CAT6",

        name: "CAT6 Network Cable",

        brand: "Generic",

        category: "cabling",

        subcategory: "Network Cable",

        type: "consumable",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cabling/cat6-cable.jpg",

        images: [],

        shortDescription:
            "CAT6 network cable for IP CCTV and network installations.",

        description:
            "CAT6 Ethernet cable suitable for compatible IP CCTV, networking and data installations.",

        features: [

            "CAT6 Ethernet",

            "IP CCTV",

            "Network installations",

            "Data transmission",

            "PoE applications where supported"

        ],

        specifications: {

            productType: "CAT6 Cable",

            category: "Network Cable",

            length: "Model dependent",

            application: "Networking / IP CCTV"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP Cameras",

            "NVR",

            "PoE Switches",

            "Network Equipment"

        ],

        tags: [

            "CAT6",

            "network cable",

            "IP CCTV cable",

            "PoE cable"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      COAXIAL CCTV CABLE
    -----------------------------------------------------*/

    {
        id: "cctv-coaxial-cable",
        sku: "CCTV-COAX",

        name: "CCTV Coaxial Cable",

        brand: "Generic",

        category: "cabling",

        subcategory: "CCTV Cable",

        type: "consumable",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cabling/coaxial-cable.jpg",

        images: [],

        shortDescription:
            "Coaxial cable for compatible analogue CCTV installations.",

        description:
            "Coaxial surveillance cable for compatible analogue CCTV camera and DVR installations.",

        features: [

            "Analogue CCTV",

            "DVR installations",

            "Video transmission",

            "Installation cable"

        ],

        specifications: {

            productType: "Coaxial Cable",

            application: "Analogue CCTV",

            length: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "Analogue Cameras",

            "DVR",

            "BNC Connectors"

        ],

        tags: [

            "coaxial cable",

            "CCTV cable",

            "DVR cable",

            "analogue CCTV"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    /*-----------------------------------------------------
      UTP CCTV CABLE
    -----------------------------------------------------*/

    {
        id: "cctv-utp-cable",
        sku: "CCTV-UTP",

        name: "CCTV UTP Cable",

        brand: "Generic",

        category: "cabling",

        subcategory: "CCTV Cable",

        type: "consumable",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cabling/utp-cctv-cable.jpg",

        images: [],

        shortDescription:
            "UTP cable for compatible CCTV transmission and installation applications.",

        description:
            "UTP cable suitable for compatible CCTV transmission, networking and structured security installations.",

        features: [

            "CCTV installation",

            "Network installation",

            "Data transmission",

            "Structured cabling"

        ],

        specifications: {

            productType: "UTP Cable",

            application: "CCTV / Networking",

            length: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "IP CCTV",

            "Analogue CCTV",

            "Network Equipment"

        ],

        tags: [

            "UTP",

            "CCTV cable",

            "network cable",

            "security cabling"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 7. NETWORK CONNECTORS & ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "network-rj45-connectors",
        sku: "NET-RJ45",

        name: "RJ45 Network Connectors",

        brand: "Generic",

        category: "cabling",

        subcategory: "Network Connectors",

        type: "consumable",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cabling/rj45-connectors.jpg",

        images: [],

        shortDescription:
            "RJ45 connectors for CAT5e, CAT6 and compatible network cabling.",

        description:
            "RJ45 network connectors for terminating compatible Ethernet cables used in IP CCTV and networking installations.",

        features: [

            "RJ45 termination",

            "CAT5e compatibility",

            "CAT6 compatibility",

            "IP CCTV installation",

            "Network installation"

        ],

        specifications: {

            productType: "RJ45 Connector",

            application: "Networking / IP CCTV",

            packSize: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CAT6 Cable",

            "Network Cable",

            "IP CCTV"

        ],

        tags: [

            "RJ45",

            "network connector",

            "CAT6 connector",

            "IP CCTV"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "network-patch-cable",
        sku: "NET-PATCH",

        name: "CAT6 Network Patch Cable",

        brand: "Generic",

        category: "cabling",

        subcategory: "Network Accessories",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/cabling/cat6-patch-cable.jpg",

        images: [],

        shortDescription:
            "Pre-terminated CAT6 patch cable for networking and IP CCTV equipment.",

        description:
            "Pre-terminated Ethernet patch cable for connecting compatible network and IP CCTV equipment.",

        features: [

            "Pre-terminated",

            "CAT6",

            "Network equipment connection",

            "IP CCTV applications"

        ],

        specifications: {

            productType: "Patch Cable",

            category: "Network Cable",

            length: "Model dependent",

            application: "Networking / IP CCTV"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "NVR",

            "PoE Switches",

            "IP Cameras",

            "Routers"

        ],

        tags: [

            "patch cable",

            "CAT6",

            "Ethernet",

            "IP CCTV"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 8. INSTALLATION ACCESSORIES
=========================================================*/

NEXPAK_PRODUCTS.push(

    {
        id: "cctv-camera-junction-box",
        sku: "CCTV-JUNCTION-BOX",

        name: "CCTV Camera Junction Box",

        brand: "Generic",

        category: "installation-accessories",

        subcategory: "Camera Mounting",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/installation/camera-junction-box.jpg",

        images: [],

        shortDescription:
            "Junction box for compatible CCTV camera installations.",

        description:
            "Camera junction box for protecting and organising cable connections at compatible CCTV camera mounting points.",

        features: [

            "Camera cable protection",

            "Neat installation",

            "Cable management",

            "Weather protection options"

        ],

        specifications: {

            productType: "Camera Junction Box",

            application: "CCTV",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras"

        ],

        tags: [

            "junction box",

            "CCTV accessory",

            "camera mounting",

            "installation"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "cctv-camera-bracket",
        sku: "CCTV-BRACKET",

        name: "CCTV Camera Mounting Bracket",

        brand: "Generic",

        category: "installation-accessories",

        subcategory: "Camera Mounting",

        type: "accessory",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/installation/camera-bracket.jpg",

        images: [],

        shortDescription:
            "Mounting bracket for compatible CCTV camera installations.",

        description:
            "Mounting hardware for securely positioning compatible CCTV cameras.",

        features: [

            "Camera mounting",

            "Wall mounting",

            "Ceiling mounting options",

            "Installation accessory"

        ],

        specifications: {

            productType: "Camera Bracket",

            application: "CCTV",

            compatibility: "Model dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: true,

        newProduct: false,

        kit: false,

        kitContents: [],

        compatibleWith: [

            "CCTV Cameras"

        ],

        tags: [

            "camera bracket",

            "CCTV mount",

            "camera mounting"

        ],

        warranty: "",

        deliveryClass: "standard"

    },


    {
        id: "security-cable-management",
        sku: "SEC-CABLE-MGMT",

        name: "Security Installation Cable Management Kit",

        brand: "NEXPAK",

        category: "installation-accessories",

        subcategory: "Installation Accessories",

        type: "kit",

        price: 0,
        salePrice: null,
        tradePrice: null,

        pricingType: "request-price",

        currency: "ZAR",

        image: "images/products/installation/cable-management-kit.jpg",

        images: [],

        shortDescription:
            "Cable management accessories for neat security system installations.",

        description:
            "A collection of cable management accessories for organising CCTV, alarm, access control and network installation cabling.",

        features: [

            "Cable organisation",

            "Professional installation",

            "CCTV applications",

            "Alarm applications",

            "Access control applications",

            "Network applications"

        ],

        specifications: {

            productType: "Cable Management Kit",

            application: "Security Installation",

            configuration: "Model / kit dependent"

        },

        stock: 0,

        stockStatus: "special-order",

        featured: false,

        popular: false,

        newProduct: false,

        kit: true,

        kitContents: [

            "Cable clips",

            "Cable ties",

            "Cable management accessories",

            "Fasteners"

        ],

        compatibleWith: [

            "CCTV",

            "Alarm Systems",

            "Access Control",

            "Networking"

        ],

        tags: [

            "cable management",

            "installation kit",

            "security installation"

        ],

        warranty: "",

        deliveryClass: "standard"

    }

);


/*=========================================================
 9. DATABASE COUNT UPDATE
=========================================================*/

updateNexpakProductCount();


/*=========================================================
 10. DATABASE STATUS
=========================================================*/

NEXPAK_DATABASE_INFO.lastUpdated = "2026-08-08";


/*=========================================================
 END OF PART 7/8

 PRODUCT GROUPS COMPLETED:

 PART 2
 └── ELECTRIC FENCING

 PART 3
 └── CCTV / DAHUA

 PART 4
 ├── IP CCTV
 └── PTZ

 PART 5
 ├── ROBOGUARD
 ├── AJAX
 └── IDS

 PART 6
 ├── ACCESS CONTROL
 ├── INTERCOM
 └── GATE AUTOMATION

 PART 7
 ├── AGRICULTURAL SECURITY
 │   ├── Agricultural Security Kit
 │   ├── Farm Perimeter Detection
 │   └── Farm CCTV Kit
 │
 ├── ELECTRIC FENCE ACCESSORIES
 │   ├── Insulators
 │   └── Warning Signs
 │
 ├── CCTV ACCESSORIES
 │   ├── Surveillance HDD
 │   ├── Power Supply
 │   └── BNC Connectors
 │
 ├── ALARM ACCESSORIES
 │   ├── PIR Detector
 │   ├── Magnetic Contact
 │   └── External Siren
 │
 ├── POWER & BACKUP
 │   ├── 12V Security Battery
 │   ├── Security UPS
 │   └── Solar Security Backup
 │
 ├── CABLING
 │   ├── CAT6
 │   ├── Coaxial
 │   ├── UTP
 │   ├── RJ45 Connectors
 │   └── CAT6 Patch Cable
 │
 └── INSTALLATION
     ├── Camera Junction Box
     ├── Camera Bracket
     └── Cable Management Kit

 NEXT:
 online-data.js — PART 8/8

 FINAL DATABASE ITEMS
 + DATABASE VALIDATION
 + SEARCH TERMS
 + CATEGORY MAP
 + BRAND MAP
 + CONFIGURATOR COMPATIBILITY DATA

 DO NOT MODIFY online.css YET.
=========================================================*/
/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — DATA ENGINE

 File: online-data.js
 Version: 1.0
 PART 8/8

 FINAL DATABASE LAYER

 Includes:
 - Category Map
 - Brand Map
 - Search Aliases
 - Product Type Map
 - Compatibility Rules
 - Configurator Rules
 - Delivery Classes
 - Product Validation
 - Database Statistics
 - Search Helpers
 - Product Lookup Helpers
 - Category Helpers
=========================================================*/


/*=========================================================
 1. MASTER CATEGORY MAP
=========================================================*/

const NEXPAK_CATEGORY_MAP = {

    "all": {
        name: "All Products",
        icon: "fa-solid fa-grid-2",
        description: "Browse all Nexpak Security Solutions products."
    },

    "cctv": {
        name: "CCTV Systems",
        icon: "fa-solid fa-video",
        description: "Analogue CCTV cameras, DVR systems and CCTV kits."
    },

    "ip-cctv": {
        name: "IP CCTV",
        icon: "fa-solid fa-camera",
        description: "Network-based IP surveillance cameras and systems."
    },

    "ptz": {
        name: "PTZ Cameras",
        icon: "fa-solid fa-camera-rotate",
        description: "Pan, tilt and zoom surveillance cameras."
    },

    "electric-fencing": {
        name: "Electric Fencing",
        icon: "fa-solid fa-bolt",
        description: "Electric fence energizers, kits and accessories."
    },

    "roboguard": {
        name: "Roboguard",
        icon: "fa-solid fa-shield-halved",
        description: "Outdoor perimeter detection and Roboguard systems."
    },

    "ajax": {
        name: "Ajax Security",
        icon: "fa-solid fa-house-lock",
        description: "Ajax wireless alarm and security equipment."
    },

    "ids": {
        name: "IDS Alarm Systems",
        icon: "fa-solid fa-bell",
        description: "IDS alarm panels, detectors and accessories."
    },

    "access-control": {
        name: "Access Control",
        icon: "fa-solid fa-id-card",
        description: "Door access control, RFID, biometric and electronic locking."
    },

    "intercom": {
        name: "Intercom Systems",
        icon: "fa-solid fa-phone",
        description: "Audio and video intercom systems."
    },

    "gate-automation": {
        name: "Gate Automation",
        icon: "fa-solid fa-warehouse",
        description: "Gate motors, remotes, safety beams and accessories."
    },

    "agricultural-security": {
        name: "Agricultural Security",
        icon: "fa-solid fa-tractor",
        description: "Security solutions for farms and smallholdings."
    },

    "security-accessories": {
        name: "Security Accessories",
        icon: "fa-solid fa-toolbox",
        description: "Security system accessories and replacement components."
    },

    "power-backup": {
        name: "Power & Backup",
        icon: "fa-solid fa-battery-full",
        description: "Batteries, UPS systems and security backup power."
    },

    "cabling": {
        name: "Cabling",
        icon: "fa-solid fa-network-wired",
        description: "CCTV, network and security system cabling."
    },

    "installation-accessories": {
        name: "Installation Accessories",
        icon: "fa-solid fa-screwdriver-wrench",
        description: "Mounting, cable management and installation equipment."
    }

};


/*=========================================================
 2. BRAND MAP
=========================================================*/

const NEXPAK_BRAND_MAP = {

    "NEXPAK": {
        name: "NEXPAK Security Solutions",
        type: "NEXPAK",
        priority: 1
    },

    "Dahua": {
        name: "Dahua",
        type: "CCTV",
        priority: 2
    },

    "Hikvision": {
        name: "Hikvision",
        type: "CCTV",
        priority: 2
    },

    "Centurion": {
        name: "Centurion",
        type: "Gate Automation",
        priority: 2
    },

    "Roboguard": {
        name: "Roboguard",
        type: "Perimeter Security",
        priority: 2
    },

    "Ajax": {
        name: "Ajax",
        type: "Alarm & Security",
        priority: 2
    },

    "IDS": {
        name: "IDS",
        type: "Alarm Systems",
        priority: 2
    },

    "Generic": {
        name: "Generic / Compatible",
        type: "Accessory",
        priority: 9
    }

};


/*=========================================================
 3. SEARCH ALIASES
=========================================================*/

const NEXPAK_SEARCH_ALIASES = {

    "cctv": [
        "cctv",
        "camera",
        "security camera",
        "surveillance",
        "dvr",
        "cctv kit"
    ],

    "ip camera": [
        "ip camera",
        "ip cctv",
        "network camera",
        "poe camera",
        "nvr"
    ],

    "ptz": [
        "ptz",
        "speed dome",
        "pan tilt zoom",
        "zoom camera"
    ],

    "electric fence": [
        "electric fence",
        "electric fencing",
        "fence",
        "energizer",
        "electric fence kit"
    ],

    "roboguard": [
        "roboguard",
        "perimeter detector",
        "outdoor detector",
        "farm detector"
    ],

    "ajax": [
        "ajax",
        "wireless alarm",
        "wireless security",
        "ajax alarm"
    ],

    "ids": [
        "ids",
        "ids alarm",
        "alarm panel",
        "alarm system"
    ],

    "access control": [
        "access control",
        "door access",
        "rfid",
        "card reader",
        "keypad",
        "biometric",
        "maglock",
        "magnetic lock",
        "electric strike"
    ],

    "intercom": [
        "intercom",
        "video intercom",
        "audio intercom",
        "gate intercom",
        "door phone",
        "video door phone"
    ],

    "gate automation": [
        "gate motor",
        "gate automation",
        "sliding gate",
        "swing gate",
        "gate remote",
        "centurion"
    ],

    "agricultural": [
        "agricultural security",
        "farm security",
        "farm cctv",
        "smallholding",
        "rural security",
        "farm perimeter"
    ],

    "power": [
        "battery",
        "backup",
        "ups",
        "solar",
        "power supply"
    ],

    "cabling": [
        "cable",
        "cat6",
        "utp",
        "coaxial",
        "rj45",
        "bnc",
        "network cable"
    ]

};


/*=========================================================
 4. PRODUCT TYPE MAP
=========================================================*/

const NEXPAK_PRODUCT_TYPES = {

    "kit": {
        label: "Complete Kit",
        configurable: true,
        cartType: "kit"
    },

    "complete-system": {
        label: "Complete System",
        configurable: true,
        cartType: "system"
    },

    "component": {
        label: "Component",
        configurable: true,
        cartType: "product"
    },

    "accessory": {
        label: "Accessory",
        configurable: false,
        cartType: "product"
    },

    "consumable": {
        label: "Consumable",
        configurable: false,
        cartType: "product"
    }

};


/*=========================================================
 5. CONFIGURATOR COMPATIBILITY MAP
=========================================================*/

const NEXPAK_COMPATIBILITY_MAP = {

    "cctv": {

        cameras: [
            "cctv",
            "ip-cctv",
            "ptz"
        ],

        recorders: [
            "dvr",
            "nvr"
        ],

        storage: [
            "cctv-hard-drive"
        ],

        power: [
            "cctv-power-supply",
            "security-battery-12v",
            "security-ups",
            "security-solar-backup"
        ],

        accessories: [
            "cctv-camera-junction-box",
            "cctv-camera-bracket",
            "cctv-bnc-connectors"
        ]

    },


    "access-control": {

        readers: [
            "access-rfid-reader",
            "access-control-keypad",
            "access-biometric-reader"
        ],

        locks: [
            "access-magnetic-lock",
            "access-electric-strike"
        ],

        exitDevices: [
            "access-exit-button"
        ],

        power: [
            "security-battery-12v",
            "security-ups"
        ]

    },


    "gate-automation": {

        motors: [
            "gate-motor-sliding",
            "gate-motor-swing"
        ],

        controls: [
            "gate-remote"
        ],

        safety: [
            "gate-safety-beams"
        ],

        power: [
            "gate-battery",
            "security-solar-backup"
        ],

        communication: [
            "intercom-audio-system",
            "intercom-video-system",
            "intercom-video-door-phone"
        ],

        access: [
            "access-rfid-reader",
            "access-control-keypad",
            "access-biometric-reader"
        ]

    },


    "agricultural-security": {

        perimeter: [
            "agric-security-kit",
            "agric-perimeter-detection"
        ],

        surveillance: [
            "agric-cctv-kit"
        ],

        detection: [
            "roboguard"
        ],

        power: [
            "security-solar-backup",
            "security-battery-12v"
        ]

    }

};


/*=========================================================
 6. DELIVERY CLASS MAP
=========================================================*/

const NEXPAK_DELIVERY_CLASSES = {

    "standard": {

        label: "Standard Security Equipment",

        oversized: false,

        installationRequired: false

    },

    "security-equipment": {

        label: "Security Equipment",

        oversized: false,

        installationRequired: false

    },

    "large-security-equipment": {

        label: "Large Security Equipment",

        oversized: true,

        installationRequired: true

    }

};


/*=========================================================
 7. PRODUCT PRICE STATUS
=========================================================*/

function getNexpakPriceStatus(product) {

    if (!product) {

        return "unknown";

    }


    if (
        product.pricingType === "quote" ||
        product.pricingType === "quote-required"
    ) {

        return "quote";

    }


    if (product.pricingType === "request-price") {

        return "request-price";

    }


    if (
        typeof product.price === "number" &&
        product.price > 0
    ) {

        return "priced";

    }


    return "unknown";

}


/*=========================================================
 8. PRODUCT AVAILABILITY
=========================================================*/

function getNexpakAvailability(product) {

    if (!product) {

        return {

            status: "unknown",

            label: "Unavailable"

        };

    }


    if (
        product.stockStatus === "in-stock" ||
        product.stockStatus === "available"
    ) {

        return {

            status: "available",

            label: "Available"

        };

    }


    if (
        product.stockStatus === "special-order"
    ) {

        return {

            status: "special-order",

            label: "Special Order"

        };

    }


    if (
        product.stockStatus === "quote-required" ||
        product.pricingType === "quote"
    ) {

        return {

            status: "quote",

            label: "Request a Quote"

        };

    }


    return {

        status: "inquire",

        label: "Contact Nexpak"

    };

}


/*=========================================================
 9. PRODUCT SEARCH ENGINE HELPER
=========================================================*/

function searchNexpakProducts(searchTerm) {

    if (
        !searchTerm ||
        typeof searchTerm !== "string"
    ) {

        return NEXPAK_PRODUCTS;

    }


    const term = searchTerm
        .toLowerCase()
        .trim();


    const expandedTerms = [term];


    Object.keys(NEXPAK_SEARCH_ALIASES).forEach(
        alias => {

            const aliases =
                NEXPAK_SEARCH_ALIASES[alias];

            if (
                aliases.some(
                    word =>
                        word.toLowerCase().includes(term) ||
                        term.includes(word.toLowerCase())
                )
            ) {

                expandedTerms.push(alias);

                aliases.forEach(
                    word =>
                        expandedTerms.push(word)
                );

            }

        }
    );


    return NEXPAK_PRODUCTS.filter(product => {

        const searchableText = [

            product.name,

            product.sku,

            product.brand,

            product.category,

            product.subcategory,

            product.shortDescription,

            product.description,

            ...(product.tags || [])

        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


        return expandedTerms.some(
            searchWord =>
                searchableText.includes(
                    searchWord.toLowerCase()
                )
        );

    });

}


/*=========================================================
 10. PRODUCT LOOKUP
=========================================================*/

function getNexpakProductById(productId) {

    if (!productId) {

        return null;

    }


    return NEXPAK_PRODUCTS.find(
        product =>
            product.id === productId
    ) || null;

}


function getNexpakProductBySKU(sku) {

    if (!sku) {

        return null;

    }


    return NEXPAK_PRODUCTS.find(
        product =>
            product.sku === sku
    ) || null;

}


/*=========================================================
 11. CATEGORY LOOKUP
=========================================================*/

function getNexpakCategory(categoryId) {

    if (
        !categoryId ||
        !NEXPAK_CATEGORY_MAP[categoryId]
    ) {

        return NEXPAK_CATEGORY_MAP.all;

    }


    return NEXPAK_CATEGORY_MAP[categoryId];

}


/*=========================================================
 12. PRODUCTS BY CATEGORY
=========================================================*/

function getNexpakProductsByCategory(categoryId) {

    if (
        !categoryId ||
        categoryId === "all"
    ) {

        return NEXPAK_PRODUCTS;

    }


    return NEXPAK_PRODUCTS.filter(

        product =>
            product.category === categoryId

    );

}


/*=========================================================
 13. PRODUCTS BY BRAND
=========================================================*/

function getNexpakProductsByBrand(brand) {

    if (!brand) {

        return NEXPAK_PRODUCTS;

    }


    return NEXPAK_PRODUCTS.filter(

        product =>
            String(product.brand)
                .toLowerCase() ===
            String(brand)
                .toLowerCase()

    );

}


/*=========================================================
 14. FEATURED PRODUCTS
=========================================================*/

function getNexpakFeaturedProducts() {

    return NEXPAK_PRODUCTS.filter(

        product =>
            product.featured === true

    );

}


/*=========================================================
 15. POPULAR PRODUCTS
=========================================================*/

function getNexpakPopularProducts() {

    return NEXPAK_PRODUCTS.filter(

        product =>
            product.popular === true

    );

}


/*=========================================================
 16. NEW PRODUCTS
=========================================================*/

function getNexpakNewProducts() {

    return NEXPAK_PRODUCTS.filter(

        product =>
            product.newProduct === true

    );

}


/*=========================================================
 17. KIT PRODUCTS
=========================================================*/

function getNexpakKits() {

    return NEXPAK_PRODUCTS.filter(

        product =>
            product.kit === true

    );

}


/*=========================================================
 18. CONFIGURABLE PRODUCTS
=========================================================*/

function getNexpakConfigurableProducts() {

    return NEXPAK_PRODUCTS.filter(

        product => {

            const type =
                NEXPAK_PRODUCT_TYPES[
                    product.type
                ];

            return type &&
                type.configurable === true;

        }

    );

}


/*=========================================================
 19. PRODUCT VALIDATION
=========================================================*/

function validateNexpakProduct(product) {

    const errors = [];


    if (!product.id) {

        errors.push("Missing product ID");

    }


    if (!product.sku) {

        errors.push("Missing SKU");

    }


    if (!product.name) {

        errors.push("Missing product name");

    }


    if (!product.category) {

        errors.push("Missing category");

    }


    if (!NEXPAK_CATEGORY_MAP[product.category]) {

        errors.push(
            "Unknown category: " +
            product.category
        );

    }


    if (!product.type) {

        errors.push("Missing product type");

    }


    if (
        product.type &&
        !NEXPAK_PRODUCT_TYPES[product.type]
    ) {

        errors.push(
            "Unknown product type: " +
            product.type
        );

    }


    if (!product.pricingType) {

        errors.push(
            "Missing pricing type"
        );

    }


    if (!product.image) {

        errors.push(
            "Missing product image path"
        );

    }


    if (!Array.isArray(product.features)) {

        errors.push(
            "Features must be an array"
        );

    }


    if (!Array.isArray(product.tags)) {

        errors.push(
            "Tags must be an array"
        );

    }


    return {

        valid: errors.length === 0,

        errors: errors

    };

}


/*=========================================================
 20. VALIDATE COMPLETE DATABASE
=========================================================*/

function validateNexpakDatabase() {

    const results = {

        total: NEXPAK_PRODUCTS.length,

        valid: 0,

        invalid: 0,

        errors: []

    };


    const seenIds = new Set();

    const seenSKUs = new Set();


    NEXPAK_PRODUCTS.forEach(

        product => {

            const validation =
                validateNexpakProduct(
                    product
                );


            if (validation.valid) {

                results.valid++;

            } else {

                results.invalid++;

                results.errors.push({

                    id:
                        product.id ||
                        "UNKNOWN",

                    sku:
                        product.sku ||
                        "UNKNOWN",

                    errors:
                        validation.errors

                });

            }


            if (
                product.id &&
                seenIds.has(product.id)
            ) {

                results.errors.push({

                    id: product.id,

                    sku: product.sku,

                    errors: [
                        "Duplicate product ID"
                    ]

                });

            }


            if (
                product.id
            ) {

                seenIds.add(product.id);

            }


            if (
                product.sku &&
                seenSKUs.has(product.sku)
            ) {

                results.errors.push({

                    id: product.id,

                    sku: product.sku,

                    errors: [
                        "Duplicate SKU"
                    ]

                });

            }


            if (
                product.sku
            ) {

                seenSKUs.add(product.sku);

            }

        }

    );


    results.status =
        results.invalid === 0 &&
        results.errors.length === 0
            ? "READY"
            : "CHECK REQUIRED";


    return results;

}


/*=========================================================
 21. DATABASE STATISTICS
=========================================================*/

function getNexpakDatabaseStats() {

    const stats = {

        totalProducts:
            NEXPAK_PRODUCTS.length,

        categories:
            Object.keys(
                NEXPAK_CATEGORY_MAP
            ).length - 1,

        brands:
            Object.keys(
                NEXPAK_BRAND_MAP
            ).length,

        kits:
            getNexpakKits().length,

        featured:
            getNexpakFeaturedProducts().length,

        popular:
            getNexpakPopularProducts().length,

        newProducts:
            getNexpakNewProducts().length,

        configurable:
            getNexpakConfigurableProducts().length

    };


    return stats;

}


/*=========================================================
 22. CATEGORY PRODUCT COUNTS
=========================================================*/

function getNexpakCategoryCounts() {

    const counts = {

        all:
            NEXPAK_PRODUCTS.length

    };


    Object.keys(
        NEXPAK_CATEGORY_MAP
    ).forEach(

        category => {

            if (category === "all") {

                return;

            }


            counts[category] =
                NEXPAK_PRODUCTS.filter(

                    product =>
                        product.category ===
                        category

                ).length;

        }

    );


    return counts;

}


/*=========================================================
 23. DATABASE INFORMATION OBJECT
=========================================================*/

const NEXPAK_DATABASE_INFO = {

    name:
        "NEXPAK Security Solutions Online Store",

    version:
        "1.0",

    dataVersion:
        "1.0",

    lastUpdated:
        "2026-08-08",

    currency:
        "ZAR",

    country:
        "South Africa",

    pricingModel:
        "Retail / Quote / Request Price",

    productDatabase:
        "NEXPAK_PRODUCTS",

    categories:
        NEXPAK_CATEGORY_MAP,

    brands:
        NEXPAK_BRAND_MAP,

    status:
        "FINAL DATABASE LAYER"

};


/*=========================================================
 24. FINAL DATABASE COUNT
=========================================================*/

function updateNexpakProductCount() {

    if (
        typeof NEXPAK_DATABASE_INFO !==
        "undefined"
    ) {

        NEXPAK_DATABASE_INFO.productCount =
            NEXPAK_PRODUCTS.length;

    }

}


/*=========================================================
 25. FINAL DATABASE VALIDATION
=========================================================*/

const NEXPAK_DATABASE_VALIDATION =
    validateNexpakDatabase();


/*=========================================================
 26. FINAL DATABASE STATISTICS
=========================================================*/

const NEXPAK_DATABASE_STATS =
    getNexpakDatabaseStats();


/*=========================================================
 27. FINAL DATABASE CATEGORY COUNTS
=========================================================*/

const NEXPAK_CATEGORY_COUNTS =
    getNexpakCategoryCounts();


/*=========================================================
 28. GLOBAL STORE DATA OBJECT
=========================================================*/

const NEXPAK_ONLINE_STORE_DATA = {

    products:
        NEXPAK_PRODUCTS,

    categories:
        NEXPAK_CATEGORY_MAP,

    brands:
        NEXPAK_BRAND_MAP,

    aliases:
        NEXPAK_SEARCH_ALIASES,

    productTypes:
        NEXPAK_PRODUCT_TYPES,

    compatibility:
        NEXPAK_COMPATIBILITY_MAP,

    deliveryClasses:
        NEXPAK_DELIVERY_CLASSES,

    databaseInfo:
        NEXPAK_DATABASE_INFO,

    validation:
        NEXPAK_DATABASE_VALIDATION,

    statistics:
        NEXPAK_DATABASE_STATS,

    categoryCounts:
        NEXPAK_CATEGORY_COUNTS

};


/*=========================================================
 29. DEVELOPMENT CONSOLE REPORT
=========================================================*/

console.log(
    "============================================="
);

console.log(
    " NEXPAK ONLINE STORE DATA ENGINE"
);

console.log(
    " Database Version:",
    NEXPAK_DATABASE_INFO.version
);

console.log(
    " Products:",
    NEXPAK_PRODUCTS.length
);

console.log(
    " Categories:",
    NEXPAK_DATABASE_STATS.categories
);

console.log(
    " Brands:",
    NEXPAK_DATABASE_STATS.brands
);

console.log(
    " Kits:",
    NEXPAK_DATABASE_STATS.kits
);

console.log(
    " Configurable:",
    NEXPAK_DATABASE_STATS.configurable
);

console.log(
    " Validation:",
    NEXPAK_DATABASE_VALIDATION.status
);

console.log(
    "============================================="
);


/*=========================================================
 30. FINAL EXPORT
=========================================================*/

if (
    typeof window !== "undefined"
) {

    window.NEXPAK_PRODUCTS =
        NEXPAK_PRODUCTS;

    window.NEXPAK_CATEGORY_MAP =
        NEXPAK_CATEGORY_MAP;

    window.NEXPAK_BRAND_MAP =
        NEXPAK_BRAND_MAP;

    window.NEXPAK_SEARCH_ALIASES =
        NEXPAK_SEARCH_ALIASES;

    window.NEXPAK_PRODUCT_TYPES =
        NEXPAK_PRODUCT_TYPES;

    window.NEXPAK_COMPATIBILITY_MAP =
        NEXPAK_COMPATIBILITY_MAP;

    window.NEXPAK_DELIVERY_CLASSES =
        NEXPAK_DELIVERY_CLASSES;

    window.NEXPAK_ONLINE_STORE_DATA =
        NEXPAK_ONLINE_STORE_DATA;

}


/*=========================================================
 END OF online-data.js — PART 8/8

 DATABASE STRUCTURE NOW COMPLETE

 PRODUCT CATEGORIES
 ├── CCTV
 ├── IP CCTV
 ├── PTZ
 ├── Electric Fencing
 ├── Roboguard
 ├── Ajax
 ├── IDS
 ├── Access Control
 ├── Intercom
 ├── Gate Automation
 ├── Agricultural Security
 ├── Security Accessories
 ├── Power & Backup
 ├── Cabling
 └── Installation Accessories

 DATABASE ENGINE SUPPORTS
 ├── Product lookup
 ├── SKU lookup
 ├── Category filtering
 ├── Brand filtering
 ├── Search aliases
 ├── Featured products
 ├── Popular products
 ├── New products
 ├── Product kits
 ├── Configurable products
 ├── Compatibility rules
 ├── Delivery classes
 ├── Price status
 ├── Availability status
 ├── Database validation
 ├── Duplicate ID detection
 ├── Duplicate SKU detection
 ├── Category counts
 └── Database statistics

 NEXT FILE
 ========================================================

 online.js

 PART 1/8

 STORE / PRODUCT ENGINE

 It will handle:

 ├── Product loading
 ├── Product rendering
 ├── Product cards
 ├── Search
 ├── Category filtering
 ├── Brand filtering
 ├── Sorting
 ├── Product details
 ├── URL product lookup
 ├── Featured products
 ├── Popular products
 ├── Related products
 ├── Configurator integration
 └── Cart integration

 DO NOT START CSS YET.

 online.css REMAINS LAST.
=========================================================*/
