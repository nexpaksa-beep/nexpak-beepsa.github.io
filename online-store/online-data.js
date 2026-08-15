/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — MASTER DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 1/8

   PURPOSE:
   - Online Store master database
   - PRE-BUILT KITS ONLY
   - Kit categories
   - Kit options
   - Kit contents
   - Pricing
   - VAT
   - Weight / delivery foundation

   IMPORTANT:
   This file belongs ONLY to the Online Store.

   BUILD YOUR SYSTEM uses:
   - shop-data.js
   - configurator.js

   DO NOT MIX THE TWO SYSTEMS.
========================================================= */


/* =========================================================
   1. GLOBAL ONLINE STORE CONFIGURATION
========================================================= */

const NEXPAK_ONLINE_STORE = {

    version: "2.0",

    name: "NEXPAK Security Solutions",

    storeName: "NEXPAK Online Store",

    country: "South Africa",

    currency: "ZAR",

    currencySymbol: "R",

    language: "en-ZA",

    vatRate: 0.15,

    vatPercentage: 15,

    defaultSort: "featured",

    productsPerPage: 24,

    /* ---------------------------------------------
       STORE MODE
    --------------------------------------------- */

    storeMode: "pre-built-kits-only",

    individualProductsEnabled: false,

    buildYourSystemEnabled: false,

    /* ---------------------------------------------
       PAYMENT
    --------------------------------------------- */

    payment: {

        provider: "payfast",

        method: "instant-eft",

        status: "pending-activation",

        live: false

    },

    /* ---------------------------------------------
       COMPANY
    --------------------------------------------- */

    company: {

        name: "NEXPAK Security Solutions",

        industry: "Security Equipment & Solutions",

        country: "South Africa",

        currency: "ZAR"

    }

};


/* =========================================================
   2. VAT CONFIGURATION
========================================================= */

const NEXPAK_VAT = {

    rate: 0.15,

    percentage: 15,

    inclusive: true,

    country: "South Africa",

    calculateFromInclusivePrice: true

};


/* =========================================================
   3. STORE CATEGORIES
========================================================= */

const NEXPAK_ONLINE_CATEGORIES = [

    {
        id: "all",

        name: "All Kits",

        slug: "all",

        description:
            "Browse all NEXPAK pre-built security kits.",

        icon:
            "fa-solid fa-border-all"

    },

    {
        id: "roboguard",

        name: "Roboguard Kits",

        slug: "roboguard",

        description:
            "Roboguard wireless perimeter security kits.",

        icon:
            "fa-solid fa-shield-halved"

    },

    {
        id: "electric-fence",

        name: "Electric Fence Kits",

        slug: "electric-fence",

        description:
            "Complete electric fence installation kits.",

        icon:
            "fa-solid fa-bolt"

    },

    {
        id: "cctv-hd",

        name: "CCTV HD Kits",

        slug: "cctv-hd",

        description:
            "Complete Dahua HD CCTV surveillance kits.",

        icon:
            "fa-solid fa-video"

    },

    {
        id: "cctv-ip",

        name: "IP CCTV Kits",

        slug: "cctv-ip",

        description:
            "Complete Dahua IP CCTV surveillance kits.",

        icon:
            "fa-solid fa-network-wired"

    },

    {
        id: "ids",

        name: "IDS Alarm Kits",

        slug: "ids",

        description:
            "Complete IDS alarm system kits.",

        icon:
            "fa-solid fa-house-signal"

    },

    {
        id: "ajax",

        name: "Ajax Security Kits",

        slug: "ajax",

        description:
            "Complete Ajax wireless security kits.",

        icon:
            "fa-solid fa-house-lock"

    },

    {
        id: "gate-automation",

        name: "Gate Automation Kits",

        slug: "gate-automation",

        description:
            "Complete Centurion gate automation kits.",

        icon:
            "fa-solid fa-warehouse"

    },

    {
        id: "garage-automation",

        name: "Garage Door Kits",

        slug: "garage-automation",

        description:
            "Complete garage door automation kits.",

        icon:
            "fa-solid fa-garage"

    }

];


/* =========================================================
   4. STOCK STATUS
========================================================= */

const NEXPAK_ONLINE_STOCK_STATUS = {

    IN_STOCK: "in-stock",

    LOW_STOCK: "low-stock",

    OUT_OF_STOCK: "out-of-stock",

    PRE_ORDER: "pre-order",

    SPECIAL_ORDER: "special-order",

    QUOTE_REQUIRED: "quote-required"

};


/* =========================================================
   5. PRICING TYPES
========================================================= */

const NEXPAK_ONLINE_PRICING_TYPES = {

    RETAIL: "retail",

    SALE: "sale",

    SPECIAL: "special",

    QUOTE: "quote"

};


/* =========================================================
   6. KIT TYPES
========================================================= */

const NEXPAK_KIT_TYPES = {

    ROBOGUARD: "roboguard-kit",

    ELECTRIC_FENCE: "electric-fence-kit",

    CCTV_HD: "cctv-hd-kit",

    CCTV_IP: "cctv-ip-kit",

    IDS: "ids-kit",

    AJAX: "ajax-kit",

    GATE_AUTOMATION: "gate-automation-kit",

    GARAGE_AUTOMATION: "garage-automation-kit"

};


/* =========================================================
   7. DELIVERY CONFIGURATION
========================================================= */

const NEXPAK_DELIVERY_CONFIG = {

    enabled: true,

    calculationMethod: "distance-and-weight",

    currency: "ZAR",

    freeDeliveryEnabled: false,

    freeDeliveryThreshold: 0,

    minimumDeliveryCharge: 0,

    maximumDeliveryCharge: 0,

    /* ---------------------------------------------
       Distance
    --------------------------------------------- */

    distanceUnit: "km",

    baseDistance: 0,

    pricePerKm: 0,

    /* ---------------------------------------------
       Weight
    --------------------------------------------- */

    weightUnit: "kg",

    weightBandsEnabled: true,

    weightBands: [

        {
            minWeight: 0,
            maxWeight: 5,
            charge: 0
        },

        {
            minWeight: 5,
            maxWeight: 20,
            charge: 0
        },

        {
            minWeight: 20,
            maxWeight: 50,
            charge: 0
        },

        {
            minWeight: 50,
            maxWeight: 100,
            charge: 0
        },

        {
            minWeight: 100,
            maxWeight: 250,
            charge: 0
        },

        {
            minWeight: 250,
            maxWeight: 500,
            charge: 0
        }

    ],

    /* ---------------------------------------------
       Delivery address
    --------------------------------------------- */

    addressRequired: true,

    postalCodeRequired: true,

    suburbRequired: true,

    provinceRequired: true

};


/* =========================================================
   8. KIT DATABASE CONTAINER
========================================================= */

/*
   ALL ONLINE STORE KITS WILL BE STORED HERE.

   IMPORTANT:

   A KIT IS ONE SELLABLE PRODUCT.

   The individual components inside the kit are NOT
   separate cart products.

   They are used for:

   - View More
   - PDF breakdown
   - Kit contents
   - Quantity display
   - Weight calculation
*/

const NEXPAK_ONLINE_KITS = [];


/* =========================================================
   9. KIT SCHEMA
========================================================= */

/*
   STANDARD KIT STRUCTURE:

   {
       id: "",

       sku: "",

       name: "",

       category: "",

       kitType: "",

       brand: "",

       description: "",

       shortDescription: "",

       image: "",

       images: [],

       featured: false,

       popular: false,

       newProduct: false,

       stock: 0,

       stockStatus: "in-stock",

       pricingType: "retail",

       priceInclVat: 0,

       priceExVat: 0,

       vatRate: 0.15,

       vatAmount: 0,

       currency: "ZAR",

       weight: 0,

       weightUnit: "kg",

       options: [],

       contents: [],

       tags: [],

       warranty: "",

       deliveryClass: "standard",

       purchasable: true

   }


   ---------------------------------------------
   OPTIONS
   ---------------------------------------------

   Example:

   options: [

       {
           id: "beam-colour",

           name: "Beam Colour",

           type: "select",

           required: true,

           values: [

               {
                   id: "black",
                   name: "Black"
               },

               {
                   id: "green",
                   name: "Green"
               },

               {
                   id: "white",
                   name: "White"
               }

           ]

       }

   ]


   ---------------------------------------------
   CONTENTS
   ---------------------------------------------

   Example:

   contents: [

       {
           name: "Roboguard Beam",

           quantity: 2,

           selectable: false
       },

       {
           name: "HQ Handheld",

           quantity: 1,

           selectable: false
       }

   ]

   Individual component pricing is NOT required.

*/


/* =========================================================
   10. STORE DATABASE INFORMATION
========================================================= */

const NEXPAK_ONLINE_DATABASE_INFO = {

    version: "2.0",

    status: "building",

    totalKits: 0,

    lastUpdated: "2026-08-16",

    source: "NEXPAK Security Solutions",

    architecture:
        "Centralised Pre-Built Kit Database",

    storeType:
        "Pre-Built Kits Only"

};


/* =========================================================
   11. KIT COUNT
========================================================= */

function updateNexpakOnlineKitCount() {

    NEXPAK_ONLINE_DATABASE_INFO.totalKits =
        NEXPAK_ONLINE_KITS.length;

}


/* =========================================================
   12. FIND KIT BY ID
========================================================= */

function getNexpakOnlineKitById(kitId) {

    return NEXPAK_ONLINE_KITS.find(

        kit => kit.id === kitId

    ) || null;

}


/* =========================================================
   13. FIND KIT BY SKU
========================================================= */

function getNexpakOnlineKitBySKU(sku) {

    return NEXPAK_ONLINE_KITS.find(

        kit =>
            kit.sku &&
            kit.sku.toLowerCase() ===
            sku.toLowerCase()

    ) || null;

}


/* =========================================================
   14. FIND CATEGORY
========================================================= */

function getNexpakOnlineCategory(categoryId) {

    return NEXPAK_ONLINE_CATEGORIES.find(

        category =>
            category.id === categoryId

    ) || null;

}


/* =========================================================
   15. PRICE CALCULATION HELPERS
========================================================= */


/*
   Calculate EX VAT from an INCLUSIVE price.
*/

function calculateNexpakExVat(priceInclVat) {

    return Number(

        (priceInclVat / (1 + NEXPAK_VAT.rate))
            .toFixed(2)

    );

}


/*
   Calculate VAT from an INCLUSIVE price.
*/

function calculateNexpakVat(priceInclVat) {

    const exVat =
        calculateNexpakExVat(priceInclVat);

    return Number(

        (priceInclVat - exVat)
            .toFixed(2)

    );

}


/*
   Build complete price information.
*/

function calculateNexpakKitPricing(priceInclVat) {

    const price =
        Number(priceInclVat) || 0;

    const priceExVat =
        calculateNexpakExVat(price);

    const vatAmount =
        calculateNexpakVat(price);

    return {

        priceInclVat: price,

        priceExVat: priceExVat,

        vatAmount: vatAmount,

        vatRate: NEXPAK_VAT.rate

    };

}


/* =========================================================
   16. INITIAL DATABASE UPDATE
========================================================= */

updateNexpakOnlineKitCount();


/* =========================================================
   END OF PART 1/8

   NEXT:

   PART 2/8
   ROBOGUARD KITS

   Will contain:

   - Roboguard Kit 1
   - Roboguard Kit 2
   - Roboguard Kit 3
   - Roboguard Kit 4
   - Beam colour selector
   - Kit contents
   - Temporary market pricing
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 2/8

   ROBOGUARD PRE-BUILT KITS
========================================================= */


/* =========================================================
   ROBOGUARD KIT 1
   2 BEAM SYSTEM
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-kit-1",

    sku: "NPK-RG-KIT-001",

    name: "Roboguard Wireless Beam Kit 1",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 2 wireless beams.",

    description:
        "A complete Roboguard wireless perimeter security solution containing two Roboguard beams, HQ handheld, PowerBack, remote controls and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-kit-1.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        {
            id: "beam-colour",

            name: "Beam Colour",

            type: "select",

            required: true,

            values: [

                {
                    id: "black",
                    name: "Black"
                },

                {
                    id: "green",
                    name: "Green"
                },

                {
                    id: "white",
                    name: "White"
                }

            ],

            default: "black"

        }

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 2
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard PowerBack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "roboguard",
        "wireless beams",
        "perimeter security",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 2
   4 BEAM SYSTEM
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-kit-2",

    sku: "NPK-RG-KIT-002",

    name: "Roboguard Wireless Beam Kit 2",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 4 wireless beams.",

    description:
        "A complete Roboguard wireless perimeter security solution containing four Roboguard beams, HQ handheld, PowerBack, remote controls and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-kit-2.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        {
            id: "beam-colour",

            name: "Beam Colour",

            type: "select",

            required: true,

            values: [

                {
                    id: "black",
                    name: "Black"
                },

                {
                    id: "green",
                    name: "Green"
                },

                {
                    id: "white",
                    name: "White"
                }

            ],

            default: "black"

        }

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 4
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard PowerBack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "roboguard",
        "wireless beams",
        "perimeter security",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 3
   6 BEAM SYSTEM
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-kit-3",

    sku: "NPK-RG-KIT-003",

    name: "Roboguard Wireless Beam Kit 3",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 6 wireless beams.",

    description:
        "A complete Roboguard wireless perimeter security solution containing six Roboguard beams, HQ handheld, PowerBack, remote controls and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-kit-3.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        {
            id: "beam-colour",

            name: "Beam Colour",

            type: "select",

            required: true,

            values: [

                {
                    id: "black",
                    name: "Black"
                },

                {
                    id: "green",
                    name: "Green"
                },

                {
                    id: "white",
                    name: "White"
                }

            ],

            default: "black"

        }

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 6
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard PowerBack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "roboguard",
        "wireless beams",
        "perimeter security",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 4
   8 BEAM SYSTEM
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-kit-4",

    sku: "NPK-RG-KIT-004",

    name: "Roboguard Wireless Beam Kit 4",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 8 wireless beams.",

    description:
        "A complete Roboguard wireless perimeter security solution containing eight Roboguard beams, HQ handheld, PowerBack, remote controls and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-kit-4.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        {
            id: "beam-colour",

            name: "Beam Colour",

            type: "select",

            required: true,

            values: [

                {
                    id: "black",
                    name: "Black"
                },

                {
                    id: "green",
                    name: "Green"
                },

                {
                    id: "white",
                    name: "White"
                }

            ],

            default: "black"

        }

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 8
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard PowerBack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "roboguard",
        "wireless beams",
        "perimeter security",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 2/8

   ROBOGUARD KITS ADDED:
   - Kit 1 — 2 Beams
   - Kit 2 — 4 Beams
   - Kit 3 — 6 Beams
   - Kit 4 — 8 Beams

   OPTION:
   - Beam Colour
     - Black
     - Green
     - White

   NEXT:
   PART 3/8
   ELECTRIC FENCE KITS
========================================================= */
/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 3/8

   ELECTRIC FENCE PRE-BUILT KITS

   IMPORTANT:
   FLAT BAR AND SQUARE TUBE ARE SEPARATE KIT FAMILIES.

   FLAT BAR:
   - 100m 5 Line
   - 100m 6 Line

   SQUARE TUBE:
   - 100m 6 Line
   - 100m 8 Line
   - 200m 6 Line
   - 200m 8 Line

   PROFILE OPTION:
   - Angled
   - Straight
========================================================= */


/* =========================================================
   ELECTRIC FENCE OPTION
   ANGLED / STRAIGHT
========================================================= */

const NEXPAK_FENCE_PROFILE_OPTION = {

    id: "fence-profile",

    name: "Fence Profile",

    type: "select",

    required: true,

    values: [

        {
            id: "angled",
            name: "Angled"
        },

        {
            id: "straight",
            name: "Straight"
        }

    ],

    default: "angled"

};


/* =========================================================
   ELECTRIC FENCE KIT 1
   100M — 5 LINE FLAT BAR
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-100m-flat-5",

    sku: "NPK-EF-100-5FB",

    name: "100m 5-Line Flat Bar Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 100 metre 5-line flat bar electric fence security kit.",

    description:
        "Complete 100 metre electric fence installation kit using 5-line flat bar, including energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/100m-flat-bar-5-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "5 Line Flat Bar Black",
            quantity: 33
        },

        {
            name: "Stay 600mm Black",
            quantity: 8
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 16
        },

        {
            name: "Nail-In Anchor 6 x 60mm — 100s",
            quantity: 1
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 1
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 36
        },

        {
            name: "S-Hook",
            quantity: 36
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 1
        },

        {
            name: "Warning Signs",
            quantity: 10
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 6
        },

        {
            name: "HT Cable Soft Black 50m",
            quantity: 1
        },

        {
            name: "Gate Contact Single",
            quantity: 1
        },

        {
            name: "1 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "flat bar",
        "5 line",
        "100 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ELECTRIC FENCE KIT 2
   100M — 6 LINE FLAT BAR
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-100m-flat-6",

    sku: "NPK-EF-100-6FB",

    name: "100m 6-Line Flat Bar Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 100 metre 6-line flat bar electric fence security kit.",

    description:
        "Complete 100 metre electric fence installation kit using 6-line flat bar, including energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/100m-flat-bar-6-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "6 Line Flat Bar Black",
            quantity: 33
        },

        {
            name: "Stay 600mm Black",
            quantity: 8
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 16
        },

        {
            name: "Nail-In Anchor 6 x 60mm — 100s",
            quantity: 1
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 1
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 36
        },

        {
            name: "S-Hook",
            quantity: 36
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 1
        },

        {
            name: "Warning Signs",
            quantity: 10
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 6
        },

        {
            name: "HT Cable Soft Black 50m",
            quantity: 1
        },

        {
            name: "Gate Contact Single",
            quantity: 1
        },

        {
            name: "1 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "flat bar",
        "6 line",
        "100 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ELECTRIC FENCE KIT 3
   100M — 6 LINE SQUARE TUBE
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-100m-square-6",

    sku: "NPK-EF-100-6SQ",

    name: "100m 6-Line Square Tube Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 100 metre 6-line square tube electric fence security kit.",

    description:
        "Complete 100 metre electric fence installation kit using 6-line black square tube, including energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/100m-square-6-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "Square Tube 6 Line Black",
            quantity: 33
        },

        {
            name: "Stay 600mm Black",
            quantity: 8
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 16
        },

        {
            name: "Nail-In Anchor 8 x 80mm — 100s",
            quantity: 1
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 36
        },

        {
            name: "S-Hook",
            quantity: 36
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 1
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 1
        },

        {
            name: "Warning Signs",
            quantity: 10
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 6
        },

        {
            name: "HT Cable Soft Black 50m",
            quantity: 1
        },

        {
            name: "Gate Contact Single",
            quantity: 1
        },

        {
            name: "1 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "square tube",
        "6 line",
        "100 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ELECTRIC FENCE KIT 4
   100M — 8 LINE SQUARE TUBE
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-100m-square-8",

    sku: "NPK-EF-100-8SQ",

    name: "100m 8-Line Square Tube Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 100 metre 8-line square tube electric fence security kit.",

    description:
        "Complete 100 metre electric fence installation kit using 8-line black square tube, including 3 joule energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/100m-square-8-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "Square Tube 8 Line Black",
            quantity: 33
        },

        {
            name: "Stay 750mm Black",
            quantity: 8
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 16
        },

        {
            name: "Nail-In Anchor 8 x 80mm — 100s",
            quantity: 1
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 50
        },

        {
            name: "S-Hook",
            quantity: 50
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 2
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 1
        },

        {
            name: "Warning Signs",
            quantity: 10
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 6
        },

        {
            name: "HT Cable Soft Black 50m",
            quantity: 1
        },

        {
            name: "Gate Contact Single",
            quantity: 1
        },

        {
            name: "3 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "square tube",
        "8 line",
        "100 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ELECTRIC FENCE KIT 5
   200M — 6 LINE SQUARE TUBE
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-200m-square-6",

    sku: "NPK-EF-200-6SQ",

    name: "200m 6-Line Square Tube Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 200 metre 6-line square tube electric fence security kit.",

    description:
        "Complete 200 metre electric fence installation kit using 6-line black square tube, including 3 joule energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/200m-square-6-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "Square Tube 6 Line Black",
            quantity: 66
        },

        {
            name: "Stay 600mm Black",
            quantity: 12
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 24
        },

        {
            name: "Nail-In Anchor 8 x 80mm — 100s",
            quantity: 2
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 42
        },

        {
            name: "S-Hook",
            quantity: 42
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 2
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 1
        },

        {
            name: "Warning Signs",
            quantity: 20
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 12
        },

        {
            name: "HT Cable Soft Black 100m",
            quantity: 1
        },

        {
            name: "Gate Contact Double",
            quantity: 1
        },

        {
            name: "Gate Contact Bracket",
            quantity: 1
        },

        {
            name: "3 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "square tube",
        "6 line",
        "200 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ELECTRIC FENCE KIT 6
   200M — 8 LINE SQUARE TUBE
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "electric-fence-200m-square-8",

    sku: "NPK-EF-200-8SQ",

    name: "200m 8-Line Square Tube Electric Fence Kit",

    category: "electric-fence",

    kitType: NEXPAK_KIT_TYPES.ELECTRIC_FENCE,

    brand: "NEXPAK",

    shortDescription:
        "Complete 200 metre 8-line square tube electric fence security kit.",

    description:
        "Complete 200 metre electric fence installation kit using 8-line black square tube, including 4 joule energizer, battery, power supply, fence hardware, monitoring and warning equipment.",

    image:
        "images/products/electric-fencing/200m-square-8-line.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_FENCE_PROFILE_OPTION

    ],

    contents: [

        {
            name: "Square Tube 8 Line Black",
            quantity: 66
        },

        {
            name: "Stay 750mm Black",
            quantity: 12
        },

        {
            name: "Lug 6 x 35mm",
            quantity: 24
        },

        {
            name: "Nail-In Anchor 8 x 80mm — 100s",
            quantity: 2
        },

        {
            name: "Tweaker Combo Tensioner",
            quantity: 60
        },

        {
            name: "S-Hook",
            quantity: 60
        },

        {
            name: "Galvanised Braided Wire 680m",
            quantity: 3
        },

        {
            name: "Ferrules 6mm — 100s",
            quantity: 2
        },

        {
            name: "Warning Signs",
            quantity: 20
        },

        {
            name: "Copper-Plated Earth Spike",
            quantity: 12
        },

        {
            name: "HT Cable Soft Black 100m",
            quantity: 1
        },

        {
            name: "Gate Contact Double",
            quantity: 1
        },

        {
            name: "Gate Contact Bracket",
            quantity: 1
        },

        {
            name: "4 Joule Energizer",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 1
        },

        {
            name: "Power Supply Unit",
            quantity: 1
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

                {
            name: "Red Strobe",
            quantity: 1
        },

        {
            name: "Red Indicator Light",
            quantity: 1
        },

        {
            name: "Dual Lightning Divertor",
            quantity: 1
        },

        {
            name: "LCD Keypad",
            quantity: 1
        }

    ],

    tags: [

        "electric fence",
        "square tube",
        "8 line",
        "200 metre",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 3/8

   ELECTRIC FENCE KITS ADDED:

   FLAT BAR:
   - 100m 5 Line
   - 100m 6 Line

   SQUARE TUBE:
   - 100m 6 Line
   - 100m 8 Line
   - 200m 6 Line
   - 200m 8 Line

   PROFILE OPTIONS:
   - Angled
   - Straight

   NEXT:
   PART 4/8
   DAHUA CCTV HD + DAHUA IP CCTV KITS
========================================================= */

      /* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 4/8

   DAHUA CCTV HD + DAHUA IP CCTV PRE-BUILT KITS

   CCTV HD:
   - 8 Channel
   - 16 Channel
   - 32 Channel

   CCTV IP:
   - 8 Channel
   - 16 Channel
   - 32 Channel

   CAMERA OPTION:
   - Dome
   - Bullet
========================================================= */


/* =========================================================
   CCTV CAMERA OPTION
   DOME / BULLET
========================================================= */

const NEXPAK_CCTV_CAMERA_OPTION = {

    id: "camera-style",

    name: "Camera Style",

    type: "select",

    required: true,

    values: [

        {
            id: "dome",
            name: "Dome"
        },

        {
            id: "bullet",
            name: "Bullet"
        }

    ],

    default: "dome"

};


/* =========================================================
   CCTV HD KIT 1
   DAHUA 8 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-cctv-hd-8",

    sku: "NPK-CCTV-HD-8",

    name: "Dahua CCTV HD 8 Channel Kit",

    category: "cctv-hd",

    kitType: NEXPAK_KIT_TYPES.CCTV_HD,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 8 channel HD CCTV surveillance kit with 8 cameras.",

    description:
        "Complete 8 channel Dahua HD CCTV system including DVR, 1TB hard drive, eight 2MP fixed lens infrared cameras and installation accessories.",

    image:
        "images/products/cctv-hd/dahua-8-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua DVR 8 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 1TB",
            quantity: 1
        },

        {
            name: "2MP Fixed Lens 20m IR Camera",
            quantity: 8
        },

        {
            name: "Paox Cable 100m",
            quantity: 1
        },

        {
            name: "BNC Connector",
            quantity: 16
        },

        {
            name: "DC Lead",
            quantity: 8
        },

        {
            name: "CCTV PSU 9 Way",
            quantity: 1
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 8
        }

    ],

    tags: [

        "Dahua",
        "CCTV",
        "HD CCTV",
        "8 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CCTV HD KIT 2
   DAHUA 16 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-cctv-hd-16",

    sku: "NPK-CCTV-HD-16",

    name: "Dahua CCTV HD 16 Channel Kit",

    category: "cctv-hd",

    kitType: NEXPAK_KIT_TYPES.CCTV_HD,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 16 channel HD CCTV surveillance kit with 16 cameras.",

    description:
        "Complete 16 channel Dahua HD CCTV system including DVR, 2TB hard drive, sixteen 2MP fixed lens infrared cameras and installation accessories.",

    image:
        "images/products/cctv-hd/dahua-16-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua DVR 16 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 2TB",
            quantity: 1
        },

        {
            name: "2MP Fixed Lens 20m IR Camera",
            quantity: 16
        },

        {
            name: "Paox Cable 100m",
            quantity: 2
        },

        {
            name: "BNC Connector",
            quantity: 32
        },

        {
            name: "DC Lead",
            quantity: 16
        },

        {
            name: "CCTV PSU 9 Way",
            quantity: 2
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 16
        }

    ],

    tags: [

        "Dahua",
        "CCTV",
        "HD CCTV",
        "16 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CCTV HD KIT 3
   DAHUA 32 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-cctv-hd-32",

    sku: "NPK-CCTV-HD-32",

    name: "Dahua CCTV HD 32 Channel Kit",

    category: "cctv-hd",

    kitType: NEXPAK_KIT_TYPES.CCTV_HD,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 32 channel HD CCTV surveillance kit with 32 cameras.",

    description:
        "Complete 32 channel Dahua HD CCTV system including DVR, 4TB hard drive, thirty-two 2MP fixed lens infrared cameras and installation accessories.",

    image:
        "images/products/cctv-hd/dahua-32-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua DVR 32 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 4TB",
            quantity: 1
        },

        {
            name: "2MP Fixed Lens 20m IR Camera",
            quantity: 32
        },

        {
            name: "Paox Cable 100m",
            quantity: 4
        },

        {
            name: "BNC Connector",
            quantity: 64
        },

        {
            name: "DC Lead",
            quantity: 32
        },

        {
            name: "CCTV PSU 9 Way",
            quantity: 4
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 32
        }

    ],

    tags: [

        "Dahua",
        "CCTV",
        "HD CCTV",
        "32 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   DAHUA IP CCTV KIT 1
   8 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-ip-cctv-8",

    sku: "NPK-IP-CCTV-8",

    name: "Dahua IP CCTV 8 Channel Kit",

    category: "cctv-ip",

    kitType: NEXPAK_KIT_TYPES.CCTV_IP,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 8 channel IP CCTV surveillance kit with 8 cameras.",

    description:
        "Complete 8 channel Dahua IP CCTV system including NVR, 1TB hard drive, 8 port PoE switch and eight 2MP fixed lens infrared IP cameras.",

    image:
        "images/products/cctv-ip/dahua-ip-8-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua NVR 8 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 1TB",
            quantity: 1
        },

        {
            name: "8 Port PoE",
            quantity: 1
        },

        {
            name: "2MP Fixed Lens 20m IR IP Camera",
            quantity: 8
        },

        {
            name: "Cat5 Cable 100m",
            quantity: 1
        },

        {
            name: "RJ45 Connector",
            quantity: 16
        },

        {
            name: "RJ45 Boot",
            quantity: 16
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 8
        }

    ],

    tags: [

        "Dahua",
        "IP CCTV",
        "NVR",
        "PoE",
        "8 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   DAHUA IP CCTV KIT 2
   16 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-ip-cctv-16",

    sku: "NPK-IP-CCTV-16",

    name: "Dahua IP CCTV 16 Channel Kit",

    category: "cctv-ip",

    kitType: NEXPAK_KIT_TYPES.CCTV_IP,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 16 channel IP CCTV surveillance kit with 16 cameras.",

    description:
        "Complete 16 channel Dahua IP CCTV system including NVR, 2TB hard drive, 16 port PoE switch and sixteen 2MP fixed lens infrared IP cameras.",

    image:
        "images/products/cctv-ip/dahua-ip-16-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    currency: "ZAR",

    vatAmount: 0,

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua NVR 16 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 2TB",
            quantity: 1
        },

        {
            name: "16 Port PoE",
            quantity: 1
        },

        {
            name: "2MP Fixed Lens 20m IR IP Camera",
            quantity: 16
        },

        {
            name: "Cat5 Cable 100m",
            quantity: 2
        },

        {
            name: "RJ45 Connector",
            quantity: 32
        },

        {
            name: "RJ45 Boot",
            quantity: 32
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 16
        }

    ],

    tags: [

        "Dahua",
        "IP CCTV",
        "NVR",
        "PoE",
        "16 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   DAHUA IP CCTV KIT 3
   32 CHANNEL
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "dahua-ip-cctv-32",

    sku: "NPK-IP-CCTV-32",

    name: "Dahua IP CCTV 32 Channel Kit",

    category: "cctv-ip",

    kitType: NEXPAK_KIT_TYPES.CCTV_IP,

    brand: "Dahua",

    shortDescription:
        "Complete Dahua 32 channel IP CCTV surveillance kit with 32 cameras.",

    description:
        "Complete 32 channel Dahua IP CCTV system including NVR, 4TB hard drive, two 16 port PoE switches and thirty-two 2MP fixed lens infrared IP cameras.",

    image:
        "images/products/cctv-ip/dahua-ip-32-channel.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_CCTV_CAMERA_OPTION

    ],

    contents: [

        {
            name: "Dahua NVR 32 Channel",
            quantity: 1
        },

        {
            name: "Hard Drive 4TB",
            quantity: 1
        },

        {
            name: "16 Port PoE",
            quantity: 2
        },

        {
            name: "2MP Fixed Lens 20m IR IP Camera",
            quantity: 32
        },

        {
            name: "Cat5 Cable 300m",
            quantity: 2
        },

        {
            name: "RJ45 Connector",
            quantity: 64
        },

        {
            name: "RJ45 Boot",
            quantity: 64
        },

        {
            name: "100 x 100 Enclosure",
            quantity: 32
        }

    ],

    tags: [

        "Dahua",
        "IP CCTV",
        "NVR",
        "PoE",
        "32 channel",
        "2MP",
        "security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 4/8

   DAHUA CCTV HD:
   - 8 Channel
   - 16 Channel
   - 32 Channel

   DAHUA IP CCTV:
   - 8 Channel
   - 16 Channel
   - 32 Channel

   CAMERA OPTIONS:
   - Dome
   - Bullet

   NEXT:
   PART 5/8
   IDS + AJAX SECURITY KITS
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 5/8

   IDS + AJAX PRE-BUILT SECURITY KITS
========================================================= */


/* =========================================================
   IDS 806 KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "ids-806-kit",

    sku: "NPK-IDS-806",

    name: "IDS 806 Security Kit",

    category: "ids",

    kitType: NEXPAK_KIT_TYPES.IDS,

    brand: "IDS",

    shortDescription:
        "Complete IDS 806 alarm security kit.",

    description:
        "Complete IDS 806 alarm system kit including control panel, keypad, PIR detectors, panic buttons, door contacts, siren, battery, power supply and communications cable.",

    image:
        "images/products/ids/ids-806-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "IDS 806 Panel",
            quantity: 1
        },

        {
            name: "IDS Keypad",
            quantity: 1
        },

        {
            name: "IDS PSU",
            quantity: 1
        },

        {
            name: "7 Amp Battery",
            quantity: 1
        },

        {
            name: "IDS PIR",
            quantity: 2
        },

        {
            name: "IDS Panic Button",
            quantity: 2
        },

        {
            name: "IDS Door Magnetic Contact",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "4 Core Communications Cable 100m",
            quantity: 1
        }

    ],

    tags: [

        "IDS",
        "IDS 806",
        "alarm",
        "security",
        "alarm kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   IDS X64 KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "ids-x64-kit",

    sku: "NPK-IDS-X64",

    name: "IDS X64 Security Kit",

    category: "ids",

    kitType: NEXPAK_KIT_TYPES.IDS,

    brand: "IDS",

    shortDescription:
        "Complete IDS X64 alarm security kit.",

    description:
        "Complete IDS X64 alarm system kit including X64 panel, LCD keypad, PIR detectors, panic buttons, door contacts, siren, battery, power supply and communications cables.",

    image:
        "images/products/ids/ids-x64-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "IDS X64 Panel",
            quantity: 1
        },

        {
            name: "IDS LCD Keypad",
            quantity: 1
        },

        {
            name: "IDS PIR",
            quantity: 4
        },

        {
            name: "IDS Panic Button",
            quantity: 2
        },

        {
            name: "IDS Door Magnetic Contact",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        },

        {
            name: "7 Amp Battery",
            quantity: 1
        },

        {
            name: "IDS PSU",
            quantity: 1
        },

        {
            name: "4 Core Communications Cable 100m",
            quantity: 1
        },

        {
            name: "6 Core Communications Cable 100m",
            quantity: 1
        }

    ],

    tags: [

        "IDS",
        "X64",
        "alarm",
        "security",
        "alarm kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   AJAX WIRELESS KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "ajax-wireless-kit",

    sku: "NPK-AJAX-WIRELESS",

    name: "Ajax Wireless Security Kit",

    category: "ajax",

    kitType: NEXPAK_KIT_TYPES.AJAX,

    brand: "Ajax",

    shortDescription:
        "Complete Ajax wireless security system kit.",

    description:
        "Complete Ajax wireless security kit including Ajax Hub, keypad, indoor motion detectors, door contacts and indoor siren.",

    image:
        "images/products/ajax/ajax-wireless-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Ajax Hub",
            quantity: 1
        },

        {
            name: "Ajax Keypad",
            quantity: 1
        },

        {
            name: "Ajax Indoor Detector",
            quantity: 2
        },

        {
            name: "Ajax Door Contact",
            quantity: 2
        },

        {
            name: "Ajax Indoor Siren",
            quantity: 1
        }

    ],

    tags: [

        "Ajax",
        "wireless",
        "alarm",
        "security",
        "wireless security kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 5/8

   IDS:
   - IDS 806 Kit
   - IDS X64 Kit

   AJAX:
   - Ajax Wireless Kit

   NEXT:
   PART 6/8

   CENTURION GATE AUTOMATION KITS
   - D5 EVO
   - D5 Smart
   - D6 Smart
   - D10 Smart
   - D10 Turbo
   - D20 Smart
========================================================= */
/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 6/8

   CENTURION GATE AUTOMATION PRE-BUILT KITS

   Includes:
   - D5 EVO
   - D5 Smart
   - D6 Smart
   - D10 Smart
   - D10 Turbo
   - D20 Smart
   - Vantage Swing Gate
   - RDO Roll-Up Garage
   - SDO Smart Tilt Garage
========================================================= */


/* =========================================================
   CENTURION D5 EVO KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d5-evo-kit",

    sku: "NPK-CEN-D5EVO",

    name: "Centurion D5 EVO Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion D5 EVO sliding gate motor kit.",

    description:
        "Complete Centurion D5 EVO gate automation kit including motor, battery, nylon rack, remotes and anti-theft bracket.",

    image:
        "images/products/gate-automation/d5-evo-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D5 EVO",
            quantity: 1
        },

        {
            name: "7 Amp Battery",
            quantity: 1
        },

        {
            name: "2m Nylon Rack",
            quantity: 2
        },

        {
            name: "4 Button Remote",
            quantity: 2
        },

        {
            name: "Anti-Theft Bracket",
            quantity: 1
        }

    ],

    tags: [

        "Centurion",
        "D5 EVO",
        "gate motor",
        "sliding gate",
        "automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION D5 SMART KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d5-smart-kit",

    sku: "NPK-CEN-D5SMART",

    name: "Centurion D5 Smart Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion D5 Smart sliding gate motor kit.",

    description:
        "Complete Centurion D5 Smart gate automation kit including motor, two batteries, nylon rack, remotes and anti-theft bracket.",

    image:
        "images/products/gate-automation/d5-smart-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D5 Smart",
            quantity: 1
        },

        {
            name: "7 Amp Battery",
            quantity: 2
        },

        {
            name: "2m Nylon Rack",
            quantity: 2
        },

        {
            name: "4 Button Remote",
            quantity: 2
        },

        {
            name: "Anti-Theft Bracket",
            quantity: 1
        }

    ],

    tags: [

        "Centurion",
        "D5 Smart",
        "gate motor",
        "sliding gate",
        "automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION D6 SMART KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d6-smart-kit",

    sku: "NPK-CEN-D6",

    name: "Centurion D6 Smart Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion D6 Smart sliding gate motor kit.",

    description:
        "Complete Centurion D6 Smart gate automation kit including motor, batteries, nylon rack, remotes and anti-theft bracket.",

    image:
        "images/products/gate-automation/d6-smart-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D6 Smart Motor",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 2
        },

        {
            name: "2m Nylon Rack",
            quantity: 2
        },

        {
            name: "Anti-Theft Bracket",
            quantity: 1
        },

        {
            name: "4 Button Remote",
            quantity: 2
        }

    ],

    tags: [

        "Centurion",
        "D6 Smart",
        "gate motor",
        "sliding gate",
        "automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION D10 SMART KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d10-smart-kit",

    sku: "NPK-CEN-D10SMART",

    name: "Centurion D10 Smart Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion D10 Smart heavy-duty sliding gate motor kit.",

    description:
        "Complete Centurion D10 Smart gate automation kit including motor, batteries, steel rack, remotes and anti-theft bracket.",

    image:
        "images/products/gate-automation/d10-smart-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D10 Smart Motor",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 2
        },

        {
            name: "2m Steel Rack",
            quantity: 3
        },

        {
            name: "Anti-Theft Bracket",
            quantity: 1
        },

        {
            name: "4 Button Remote",
            quantity: 2
        }

    ],

    tags: [

        "Centurion",
        "D10 Smart",
        "gate motor",
        "heavy duty",
        "sliding gate"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION D10 TURBO KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d10-turbo-kit",

    sku: "NPK-CEN-D10TURBO",

    name: "Centurion D10 Turbo Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion D10 Turbo heavy-duty sliding gate motor kit.",

    description:
        "Complete Centurion D10 Turbo gate automation kit including motor, batteries, steel rack, remotes and anti-theft bracket.",

    image:
        "images/products/gate-automation/d10-turbo-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D10 Turbo Motor",
            quantity: 1
        },

        {
            name: "Battery",
            quantity: 2
        },

        {
            name: "2m Steel Rack",
            quantity: 3
        },

        {
            name: "Anti-Theft Bracket",
            quantity: 1
        },

        {
            name: "4 Button Remote",
            quantity: 2
        }

    ],

    tags: [

        "Centurion",
        "D10 Turbo",
        "gate motor",
        "heavy duty",
        "sliding gate"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION D20 SMART KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-d20-smart-kit",

    sku: "NPK-CEN-D20SMART",

    name: "Centurion D20 Smart Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Centurion D20 Smart heavy-duty sliding gate motor kit.",

    description:
        "Centurion D20 Smart gate automation kit including motor and steel rack.",

    image:
        "images/products/gate-automation/d20-smart-kit.jpg",

    images: [],

    featured: true,

    popular: false,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion D20 Smart Motor",
            quantity: 1
        },

        {
            name: "2m Steel Rack",
            quantity: 3
        }

    ],

    tags: [

        "Centurion",
        "D20 Smart",
        "gate motor",
        "heavy duty",
        "sliding gate"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION VANTAGE 400 SWING GATE KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-vantage-400-kit",

    sku: "NPK-CEN-VANTAGE",

    name: "Centurion Vantage 400 Swing Gate Motor Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GATE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Complete Centurion Vantage 400 swing gate automation kit.",

    description:
        "Complete Centurion Vantage 400 swing gate kit including two motors, controller, remotes and motor cable.",

    image:
        "images/products/gate-automation/vantage-400-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Vantage 400 Motor",
            quantity: 2
        },

        {
            name: "Vantage Controller",
            quantity: 1
        },

        {
            name: "4 Button Remote",
            quantity: 2
        },

        {
            name: "Vantage Cable 30m",
            quantity: 1
        }

    ],

    tags: [

        "Centurion",
        "Vantage",
        "Vantage 400",
        "swing gate",
        "gate automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION RDO ROLL-UP GARAGE KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-rdo-kit",

    sku: "NPK-CEN-RDO",

    name: "Centurion RDO Roll-Up Garage Door Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GARAGE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Centurion RDO roll-up garage door automation kit.",

    description:
        "Complete Centurion RDO roll-up garage door automation kit.",

    image:
        "images/products/gate-automation/rdo-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion RDO Kit",
            quantity: 1
        }

    ],

    tags: [

        "Centurion",
        "RDO",
        "garage",
        "roll-up garage",
        "garage door automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   CENTURION SDO SMART TILT GARAGE KIT
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "centurion-sdo-smart-kit",

    sku: "NPK-CEN-SDO",

    name: "Centurion SDO Smart Tilt Garage Door Kit",

    category: "gate-automation",

    kitType: NEXPAK_KIT_TYPES.GARAGE_AUTOMATION,

    brand: "Centurion",

    shortDescription:
        "Centurion SDO Smart tilt garage door automation kit.",

    description:
        "Complete Centurion SDO Smart tilt garage door automation kit.",

    image:
        "images/products/gate-automation/sdo-smart-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [],

    contents: [

        {
            name: "Centurion SDO Smart Kit",
            quantity: 1
        }

    ],

    tags: [

        "Centurion",
        "SDO Smart",
        "garage",
        "tilt garage",
        "garage door automation"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 6/8

   CENTURION KITS ADDED:

   - D5 EVO
   - D5 Smart
   - D6 Smart
   - D10 Smart
   - D10 Turbo
   - D20 Smart
   - Vantage 400
   - RDO
   - SDO Smart

   NEXT:
   PART 7/8
   ROBOGUARD WIRELESS BEAM KITS
========================================================= */


/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 7/8

   ROBOGUARD WIRELESS BEAM PRE-BUILT KITS

   Includes:
   - Kit 1 — 2 Beams
   - Kit 2 — 4 Beams
   - Kit 3 — 6 Beams
   - Kit 4 — 8 Beams

   BEAM COLOUR:
   - Black
   - Green
   - White
========================================================= */


/* =========================================================
   ROBOGUARD BEAM COLOUR OPTION
========================================================= */

const NEXPAK_ROBOGUARD_BEAM_COLOUR_OPTION = {

    id: "beam-colour",

    name: "Beam Colour",

    type: "select",

    required: true,

    values: [

        {
            id: "black",
            name: "Black"
        },

        {
            id: "green",
            name: "Green"
        },

        {
            id: "white",
            name: "White"
        }

    ],

    default: "black"

};


/* =========================================================
   ROBOGUARD KIT 1
   2 BEAMS
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-wireless-2",

    sku: "NPK-RG-WB-2",

    name: "Roboguard Wireless Beam Kit — 2 Beams",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 2 beams.",

    description:
        "Complete Roboguard wireless beam security kit including two Roboguard beams, HQ handheld, powerpack, four-button remotes and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-2-beam-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_ROBOGUARD_BEAM_COLOUR_OPTION

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 2
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard Powerpack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "Roboguard",
        "wireless",
        "beam",
        "perimeter security",
        "2 beam kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 2
   4 BEAMS
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-wireless-4",

    sku: "NPK-RG-WB-4",

    name: "Roboguard Wireless Beam Kit — 4 Beams",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 4 beams.",

    description:
        "Complete Roboguard wireless beam security kit including four Roboguard beams, HQ handheld, powerpack, four-button remotes and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-4-beam-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_ROBOGUARD_BEAM_COLOUR_OPTION

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 4
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard Powerpack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "Roboguard",
        "wireless",
        "beam",
        "perimeter security",
        "4 beam kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 3
   6 BEAMS
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-wireless-6",

    sku: "NPK-RG-WB-6",

    name: "Roboguard Wireless Beam Kit — 6 Beams",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 6 beams.",

    description:
        "Complete Roboguard wireless beam security kit including six Roboguard beams, HQ handheld, powerpack, four-button remotes and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-6-beam-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_ROBOGUARD_BEAM_COLOUR_OPTION

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 6
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard Powerpack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "Roboguard",
        "wireless",
        "beam",
        "perimeter security",
        "6 beam kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   ROBOGUARD KIT 4
   8 BEAMS
========================================================= */

NEXPAK_ONLINE_KITS.push({

    id: "roboguard-wireless-8",

    sku: "NPK-RG-WB-8",

    name: "Roboguard Wireless Beam Kit — 8 Beams",

    category: "roboguard",

    kitType: NEXPAK_KIT_TYPES.ROBOGUARD,

    brand: "Roboguard",

    shortDescription:
        "Complete Roboguard wireless perimeter security kit with 8 beams.",

    description:
        "Complete Roboguard wireless beam security kit including eight Roboguard beams, HQ handheld, powerpack, four-button remotes and 15 watt siren.",

    image:
        "images/products/roboguard/roboguard-8-beam-kit.jpg",

    images: [],

    featured: true,

    popular: true,

    newProduct: false,

    stock: 0,

    stockStatus:
        NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

    pricingType:
        NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

    priceInclVat: 0,

    priceExVat: 0,

    vatRate: NEXPAK_VAT.rate,

    vatAmount: 0,

    currency: "ZAR",

    weight: 0,

    weightUnit: "kg",

    options: [

        NEXPAK_ROBOGUARD_BEAM_COLOUR_OPTION

    ],

    contents: [

        {
            name: "Roboguard Beam",
            quantity: 8
        },

        {
            name: "HQ Handheld",
            quantity: 1
        },

        {
            name: "Roboguard Powerpack",
            quantity: 1
        },

        {
            name: "Roboguard 4 Button Remote",
            quantity: 2
        },

        {
            name: "15 Watt Siren",
            quantity: 1
        }

    ],

    tags: [

        "Roboguard",
        "wireless",
        "beam",
        "perimeter security",
        "8 beam kit"

    ],

    warranty: "",

    deliveryClass: "standard",

    purchasable: true

});


/* =========================================================
   END OF PART 7/8

   ROBOGUARD KITS ADDED:

   - 2 Beam
   - 4 Beam
   - 6 Beam
   - 8 Beam

   BEAM COLOUR:
   - Black
   - Green
   - White

   NEXT:
   PART 8/8
   FINAL DATABASE VALIDATION + HELPERS
========================================================= */

/* =========================================================
   NEXPAK SECURITY SOLUTIONS
   ONLINE STORE — DATA ENGINE

   File: online-data.js
   Version: 2.0
   Part: 8/8

   FINAL DATABASE VALIDATION + HELPER FUNCTIONS

   IMPORTANT:
   This file is the SINGLE SOURCE OF TRUTH for the
   NEXPAK ONLINE STORE.

   The Build Your System page uses its own:
   configurator.js
   shop-data.js

   DO NOT MIX THE TWO SYSTEMS.
========================================================= */


/* =========================================================
   1. DATABASE INFORMATION
========================================================= */

const NEXPAK_ONLINE_DATABASE_INFO = {

    version: "2.0",

    status: "active",

    lastUpdated: "2026-08-16",

    source: "NEXPAK Security Solutions",

    architecture: "Pre-Built Kit Online Store",

    pricingModel: "Kit Based",

    vatRate: NEXPAK_VAT.rate,

    currency: "ZAR",

    productModel:
        "Pre-built security kits with optional kit configurations"

};


/* =========================================================
   2. UPDATE KIT COUNT
========================================================= */

function updateNexpakOnlineKitCount() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return 0;

    }

    NEXPAK_ONLINE_DATABASE_INFO.totalKits =
        NEXPAK_ONLINE_KITS.length;

    return NEXPAK_ONLINE_KITS.length;

}


/* =========================================================
   3. FIND KIT BY ID
========================================================= */

function getNexpakOnlineKitById(kitId) {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return null;

    }

    return NEXPAK_ONLINE_KITS.find(

        kit => kit.id === kitId

    ) || null;

}


/* =========================================================
   4. FIND KIT BY SKU
========================================================= */

function getNexpakOnlineKitBySKU(sku) {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return null;

    }

    if (!sku) {

        return null;

    }

    return NEXPAK_ONLINE_KITS.find(

        kit =>
            kit.sku &&
            kit.sku.toLowerCase() ===
            sku.toLowerCase()

    ) || null;

}


/* =========================================================
   5. GET KITS BY CATEGORY
========================================================= */

function getNexpakOnlineKitsByCategory(categoryId) {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return [];

    }

    if (
        !categoryId ||
        categoryId === "all"
    ) {

        return [...NEXPAK_ONLINE_KITS];

    }

    return NEXPAK_ONLINE_KITS.filter(

        kit =>
            kit.category === categoryId

    );

}


/* =========================================================
   6. GET KITS BY BRAND
========================================================= */

function getNexpakOnlineKitsByBrand(brand) {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return [];

    }

    if (!brand) {

        return [...NEXPAK_ONLINE_KITS];

    }

    return NEXPAK_ONLINE_KITS.filter(

        kit =>
            kit.brand &&
            kit.brand.toLowerCase() ===
            brand.toLowerCase()

    );

}


/* =========================================================
   7. GET FEATURED KITS
========================================================= */

function getNexpakFeaturedOnlineKits() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return [];

    }

    return NEXPAK_ONLINE_KITS.filter(

        kit => kit.featured === true

    );

}


/* =========================================================
   8. GET POPULAR KITS
========================================================= */

function getNexpakPopularOnlineKits() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return [];

    }

    return NEXPAK_ONLINE_KITS.filter(

        kit => kit.popular === true

    );

}


/* =========================================================
   9. CALCULATE VAT FROM INCLUSIVE PRICE
========================================================= */

function calculateNexpakOnlineVAT(priceInclVat) {

    const price =
        Number(priceInclVat) || 0;

    const rate =
        Number(NEXPAK_VAT.rate) || 0;

    if (rate <= 0) {

        return 0;

    }

    return Number(

        (
            price -
            (
                price /
                (1 + rate)
            )
        ).toFixed(2)

    );

}


/* =========================================================
   10. CALCULATE EX VAT PRICE
========================================================= */

function calculateNexpakOnlineExVat(priceInclVat) {

    const price =
        Number(priceInclVat) || 0;

    const rate =
        Number(NEXPAK_VAT.rate) || 0;

    if (rate <= 0) {

        return Number(
            price.toFixed(2)
        );

    }

    return Number(

        (
            price /
            (1 + rate)
        ).toFixed(2)

    );

}


/* =========================================================
   11. CALCULATE INCLUSIVE PRICE
========================================================= */

function calculateNexpakOnlineInclVat(priceExVat) {

    const price =
        Number(priceExVat) || 0;

    const rate =
        Number(NEXPAK_VAT.rate) || 0;

    return Number(

        (
            price *
            (1 + rate)
        ).toFixed(2)

    );

}


/* =========================================================
   12. PREPARE KIT PRICING
========================================================= */

function prepareNexpakOnlineKitPricing(kit) {

    if (!kit) {

        return null;

    }

    const inclusive =
        Number(kit.priceInclVat) || 0;

    const exVat =
        calculateNexpakOnlineExVat(
            inclusive
        );

    const vat =
        calculateNexpakOnlineVAT(
            inclusive
        );

    kit.priceExVat =
        exVat;

    kit.vatAmount =
        vat;

    kit.priceInclVat =
        Number(
            inclusive.toFixed(2)
        );

    return kit;

}


/* =========================================================
   13. PREPARE ALL KIT PRICING
========================================================= */

function prepareAllNexpakOnlineKitPricing() {

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        return;

    }

    NEXPAK_ONLINE_KITS.forEach(

        kit => {

            prepareNexpakOnlineKitPricing(
                kit
            );

        }

    );

}


/* =========================================================
   14. GET KIT CONTENTS
========================================================= */

function getNexpakOnlineKitContents(kitId) {

    const kit =
        getNexpakOnlineKitById(
            kitId
        );

    if (!kit) {

        return [];

    }

    return Array.isArray(
        kit.contents
    )
        ? [...kit.contents]
        : [];

}


/* =========================================================
   15. GET KIT OPTIONS
========================================================= */

function getNexpakOnlineKitOptions(kitId) {

    const kit =
        getNexpakOnlineKitById(
            kitId
        );

    if (!kit) {

        return [];

    }

    return Array.isArray(
        kit.options
    )
        ? [...kit.options]
        : [];

}


/* =========================================================
   16. CHECK KIT AVAILABILITY
========================================================= */

function isNexpakOnlineKitPurchasable(kitId) {

    const kit =
        getNexpakOnlineKitById(
            kitId
        );

    if (!kit) {

        return false;

    }

    if (
        kit.purchasable === false
    ) {

        return false;

    }

    return true;

}


/* =========================================================
   17. NORMALISE KIT
========================================================= */

function normaliseNexpakOnlineKit(kit) {

    if (!kit) {

        return null;

    }

    return {

        id:
            kit.id || "",

        sku:
            kit.sku || "",

        name:
            kit.name || "NEXPAK Security Kit",

        category:
            kit.category || "all",

        kitType:
            kit.kitType || "",

        brand:
            kit.brand || "NEXPAK",

        shortDescription:
            kit.shortDescription || "",

        description:
            kit.description || "",

        image:
            kit.image || "",

        images:
            Array.isArray(kit.images)
                ? kit.images
                : [],

        priceInclVat:
            Number(
                kit.priceInclVat
            ) || 0,

        priceExVat:
            Number(
                kit.priceExVat
            ) || 0,

        vatRate:
            Number(
                kit.vatRate
            ) || NEXPAK_VAT.rate,

        vatAmount:
            Number(
                kit.vatAmount
            ) || 0,

        currency:
            kit.currency || "ZAR",

        weight:
            Number(
                kit.weight
            ) || 0,

        weightUnit:
            kit.weightUnit || "kg",

        options:
            Array.isArray(kit.options)
                ? kit.options
                : [],

        contents:
            Array.isArray(kit.contents)
                ? kit.contents
                : [],

        featured:
            kit.featured === true,

        popular:
            kit.popular === true,

        newProduct:
            kit.newProduct === true,

        stock:
            Number(
                kit.stock
            ) || 0,

        stockStatus:
            kit.stockStatus ||
            NEXPAK_ONLINE_STOCK_STATUS.SPECIAL_ORDER,

        pricingType:
            kit.pricingType ||
            NEXPAK_ONLINE_PRICING_TYPES.RETAIL,

        warranty:
            kit.warranty || "",

        deliveryClass:
            kit.deliveryClass ||
            "standard",

        tags:
            Array.isArray(kit.tags)
                ? kit.tags
                : [],

        purchasable:
            kit.purchasable !== false

    };

}


/* =========================================================
   18. VALIDATE KIT
========================================================= */

function validateNexpakOnlineKit(kit) {

    const errors = [];

    if (!kit) {

        errors.push(
            "Kit object is missing."
        );

        return {

            valid: false,

            errors

        };

    }

    if (!kit.id) {

        errors.push(
            "Missing kit ID."
        );

    }

    if (!kit.sku) {

        errors.push(
            "Missing SKU."
        );

    }

    if (!kit.name) {

        errors.push(
            "Missing kit name."
        );

    }

    if (!kit.category) {

        errors.push(
            "Missing category."
        );

    }

    if (
        typeof kit.priceInclVat !== "number"
    ) {

        errors.push(
            "priceInclVat must be a number."
        );

    }

    if (
        !Array.isArray(
            kit.contents
        )
    ) {

        errors.push(
            "Kit contents must be an array."
        );

    }

    return {

        valid:
            errors.length === 0,

        errors

    };

}


/* =========================================================
   19. VALIDATE ENTIRE DATABASE
========================================================= */

function validateNexpakOnlineDatabase() {

    const results = {

        valid: true,

        totalKits: 0,

        errors: []

    };

    if (
        typeof NEXPAK_ONLINE_KITS === "undefined"
    ) {

        results.valid = false;

        results.errors.push(
            "NEXPAK_ONLINE_KITS is not defined."
        );

        return results;

    }

    results.totalKits =
        NEXPAK_ONLINE_KITS.length;

    NEXPAK_ONLINE_KITS.forEach(

        kit => {

            const validation =
                validateNexpakOnlineKit(
                    kit
                );

            if (
                !validation.valid
            ) {

                results.valid = false;

                results.errors.push({

                    kit:
                        kit.id ||
                        "unknown",

                    errors:
                        validation.errors

                });

            }

        }

    );

    return results;

}


/* =========================================================
   20. DATABASE INITIALISATION
========================================================= */

function initialiseNexpakOnlineDatabase() {

    updateNexpakOnlineKitCount();

    prepareAllNexpakOnlineKitPricing();

    return validateNexpakOnlineDatabase();

}


/* =========================================================
   21. INITIALISE DATABASE
========================================================= */

const NEXPAK_ONLINE_DATABASE_STATUS =
    initialiseNexpakOnlineDatabase();


/* =========================================================
   22. FINAL DATABASE SUMMARY
========================================================= */

NEXPAK_ONLINE_DATABASE_INFO.totalKits =
    typeof NEXPAK_ONLINE_KITS !== "undefined"
        ? NEXPAK_ONLINE_KITS.length
        : 0;


/* =========================================================
   END OF online-data.js — PART 8/8

   ONLINE STORE DATABASE COMPLETE

   STORE MODEL:
   - PRE-BUILT KITS ONLY
   - KIT QUANTITY SELECTOR
   - OPTIONAL KIT CONFIGURATION
   - NO INDIVIDUAL PRODUCT SELECTION
   - NO INDIVIDUAL COMPONENT PRICING
   - KIT PRICE INCLUDES VAT
   - EX VAT CALCULATED AUTOMATICALLY
   - VAT CALCULATED AUTOMATICALLY
   - KIT CONTENTS STORED FOR PDF QUOTE
   - KIT WEIGHT STORED FOR DELIVERY CALCULATION
   - KIT CATEGORY STORED FOR STORE FILTERING

   BUILD YOUR SYSTEM PAGE:
   - USES SEPARATE configurator.js
   - USES ITS OWN PRODUCT DATABASE
   - MUST NOT USE THIS ONLINE KIT DATABASE

   NEXT FILE:
   online.js

   online.js WILL HANDLE:
   - STORE DISPLAY
   - CATEGORY FILTERING
   - SEARCH
   - KIT QUANTITY
   - KIT OPTIONS
   - ADD TO CART
   - VIEW MORE
   - PDF KIT BREAKDOWN
   - EX VAT
   - VAT
   - TOTAL
========================================================= */

