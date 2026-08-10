/**
 * ============================================================================
 * NEXPAK SECURITY SOLUTIONS
 * MASTER SYSTEM BUILDER DATABASE
 * ============================================================================
 *
 * File:
 *     js/shop-data.js
 *
 * Purpose:
 *     Master product database for:
 *       - Build Your System
 *       - Shop
 *       - Cart
 *       - Configurator
 *
 * IMPORTANT:
 *     There are NO PRE-BUILT KITS in this database.
 *
 *     Build Your System allows customers to select individual products,
 *     quantities and options themselves.
 *
 * Prices:
 *     All prices are in South African Rand (ZAR)
 *     and exclude 15% VAT.
 * ============================================================================
 */

const SHOP_DATA = {

    /* ========================================================================
       01. COMPANY SETTINGS
       ======================================================================== */

    company: {

        name:
            "Nexpak Security Solutions",

        tradingName:
            "Nexpak Security Solutions",

        currency:
            "ZAR",

        currencySymbol:
            "R",

        vatRate:
            0.15,

        whatsapp:
            "27836308249",

        country:
            "South Africa"

    },


    /* ========================================================================
       02. SYSTEM BUILDER CATEGORIES
       ======================================================================== */

    categories: [

        {
            id:
                "electric-fencing",

            title:
                "Electric Fencing",

            shortTitle:
                "Electric Fencing",

            description:
                "Build a complete electric fencing system by selecting every component individually.",

            icon:
                "fa-bolt",

            colour:
                "#f5b400",

            active:
                true
        },


        {
            id:
                "cctv-hd",

            title:
                "HD CCTV",

            shortTitle:
                "HD CCTV",

            description:
                "Build an HD CCTV surveillance system with cameras, DVR, storage, cabling and accessories.",

            icon:
                "fa-video",

            colour:
                "#2563eb",

            active:
                true
        },


        {
            id:
                "cctv-ip",

            title:
                "IP CCTV",

            shortTitle:
                "IP CCTV",

            description:
                "Build a network CCTV system using IP cameras, NVRs, PoE equipment and network accessories.",

            icon:
                "fa-network-wired",

            colour:
                "#7c3aed",

            active:
                true
        },


        {
            id:
                "roboguard",

            title:
                "Roboguard",

            shortTitle:
                "Roboguard",

            description:
                "Build a wireless outdoor perimeter detection system using Roboguard beams, receivers and accessories.",

            icon:
                "fa-shield-halved",

            colour:
                "#059669",

            active:
                true
        },


        {
            id:
                "gate-motors",

            title:
                "Gate Automation",

            shortTitle:
                "Gate Automation",

            description:
                "Build a gate automation system with motors, racks, remotes, batteries, brackets and accessories.",

            icon:
                "fa-door-open",

            colour:
                "#dc2626",

            active:
                true
        },


        {
            id:
                "ids-alarm",

            title:
                "IDS Alarm Systems",

            shortTitle:
                "IDS Alarms",

            description:
                "Build an IDS wired or hybrid alarm system with panels, keypads, PIRs, sirens and communication devices.",

            icon:
                "fa-bell",

            colour:
                "#ea580c",

            active:
                true
        },


        {
            id:
                "ajax-security",

            title:
                "Ajax Security",

            shortTitle:
                "Ajax",

            description:
                "Build a professional Ajax wireless security system with hubs, detectors, keypads and accessories.",

            icon:
                "fa-house-lock",

            colour:
                "#111827",

            active:
                true
        },


        {
            id:
                "stafix-agri",

            title:
                "Stafix Agricultural",

            shortTitle:
                "Stafix Agri",

            description:
                "Build agricultural electric fencing systems for farms, livestock and perimeter protection.",

            icon:
                "fa-wheat-awn",

            colour:
                "#65a30d",

            active:
                true
        }

    ],


    /* ========================================================================
       03. PRODUCT DATABASE
       ======================================================================== */

    products: {

        /*
         * Product categories will be added here.
         *
         * Structure:
         *
         * "category-id": [
         *
         *     {
         *         id: "unique-product-id",
         *         name: "Product Name",
         *         description: "Product description",
         *         brand: "Brand",
         *         price: 0.00,
         *         weight: 0.00,
         *         unit: "each",
         *         active: true
         *     }
         *
         * ]
         */

    },


    /* ========================================================================
       04. SYSTEM BUILDER CONFIGURATION
       ======================================================================== */

    configurators: {

        /*
         * These sections will define how individual products are presented
         * inside Build Your System.
         *
         * Example:
         *
         * {
         *     id: "brackets",
         *     label: "Electric Fence Brackets",
         *     type: "quantity-selector",
         *     productGroup: "electric-fencing"
         * }
         *
         * Full configuration will be added in later parts.
         */

    },


    /* ========================================================================
       05. PRODUCT HELPERS
       ======================================================================== */

    helpers: {

        /**
         * Format a number as South African Rand.
         */
        formatCurrency:
            function (
                amount
            ) {

                return new Intl.NumberFormat(
                    "en-ZA",
                    {
                        style:
                            "currency",

                        currency:
                            "ZAR",

                        minimumFractionDigits:
                            2,

                        maximumFractionDigits:
                            2
                    }
                ).format(
                    Number(amount) || 0
                );

            },


        /**
         * Return VAT amount.
         */
        calculateVat:
            function (
                amount
            ) {

                return (
                    Number(amount) || 0
                ) *
                SHOP_DATA.company.vatRate;

            },


        /**
         * Return price including VAT.
         */
        calculatePriceInclVat:
            function (
                amount
            ) {

                const price =
                    Number(amount) || 0;

                return price +
                    SHOP_DATA.helpers.calculateVat(
                        price
                    );

            }

    }

};


/* ============================================================================
   06. DATABASE READY CHECK
   ============================================================================ */

console.log(
    "Nexpak Security Solutions — System Builder Database loaded."
);

console.log(
    "Categories:",
    SHOP_DATA.categories.length
);

console.log(
    "Pre-built kits:",
    "REMOVED — Build Your System uses individual products."
);

/* ====================================================================
           A. ELECTRIC FENCING PRODUCTS
           ==================================================================== */

        "electric-fencing": [

            /* ================================================================
               BRACKETS
               ================================================================ */

            {
                id: "ef-bracket-6line-black",
                name: "6-Line Electric Fence Bracket - Black",
                group: "brackets",
                brand: "Nexpak",
                description: "6-line powder-coated electric fence bracket.",
                price: 145.00,
                weight: 1.10,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-6line-white",
                name: "6-Line Electric Fence Bracket - White",
                group: "brackets",
                brand: "Nexpak",
                description: "6-line white powder-coated electric fence bracket.",
                price: 145.00,
                weight: 1.10,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-6line-galv",
                name: "6-Line Electric Fence Bracket - Galvanised",
                group: "brackets",
                brand: "Nexpak",
                description: "6-line galvanised electric fence bracket.",
                price: 155.00,
                weight: 1.15,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-8line-black",
                name: "8-Line Electric Fence Bracket - Black",
                group: "brackets",
                brand: "Nexpak",
                description: "8-line powder-coated electric fence bracket.",
                price: 175.00,
                weight: 1.35,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-8line-white",
                name: "8-Line Electric Fence Bracket - White",
                group: "brackets",
                brand: "Nexpak",
                description: "8-line white powder-coated electric fence bracket.",
                price: 175.00,
                weight: 1.35,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-8line-galv",
                name: "8-Line Electric Fence Bracket - Galvanised",
                group: "brackets",
                brand: "Nexpak",
                description: "8-line galvanised electric fence bracket.",
                price: 190.00,
                weight: 1.40,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-10line-black",
                name: "10-Line Electric Fence Bracket - Black",
                group: "brackets",
                brand: "Nexpak",
                description: "10-line powder-coated electric fence bracket.",
                price: 210.00,
                weight: 1.60,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-10line-white",
                name: "10-Line Electric Fence Bracket - White",
                group: "brackets",
                brand: "Nexpak",
                description: "10-line white powder-coated electric fence bracket.",
                price: 210.00,
                weight: 1.60,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-10line-galv",
                name: "10-Line Electric Fence Bracket - Galvanised",
                group: "brackets",
                brand: "Nexpak",
                description: "10-line galvanised electric fence bracket.",
                price: 225.00,
                weight: 1.65,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-12line-black",
                name: "12-Line Electric Fence Bracket - Black",
                group: "brackets",
                brand: "Nexpak",
                description: "12-line powder-coated electric fence bracket.",
                price: 245.00,
                weight: 1.90,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-12line-white",
                name: "12-Line Electric Fence Bracket - White",
                group: "brackets",
                brand: "Nexpak",
                description: "12-line white powder-coated electric fence bracket.",
                price: 245.00,
                weight: 1.90,
                unit: "each",
                active: true
            },

            {
                id: "ef-bracket-12line-galv",
                name: "12-Line Electric Fence Bracket - Galvanised",
                group: "brackets",
                brand: "Nexpak",
                description: "12-line galvanised electric fence bracket.",
                price: 265.00,
                weight: 1.95,
                unit: "each",
                active: true
            },


            /* ================================================================
               BRACKET BARS / PROFILES
               ================================================================ */

            {
                id: "ef-flat-bar-6line",
                name: "Flat Bar - 6 Line",
                group: "bracket-bars",
                brand: "Nexpak",
                description: "Flat steel bar for 6-line electric fence brackets.",
                price: 65.00,
                weight: 0.45,
                unit: "each",
                active: true
            },

            {
                id: "ef-round-bar-6line",
                name: "Round Bar - 6 Line",
                group: "bracket-bars",
                brand: "Nexpak",
                description: "Round steel bar for 6-line electric fence brackets.",
                price: 75.00,
                weight: 0.50,
                unit: "each",
                active: true
            },

            {
                id: "ef-square-tube",
                name: "Square Tube Bracket Bar",
                group: "bracket-bars",
                brand: "Nexpak",
                description: "Heavy-duty square tube bracket profile.",
                price: 95.00,
                weight: 0.70,
                unit: "each",
                active: true
            },


            /* ================================================================
               NAIL-IN ANCHORS
               ================================================================ */

            {
                id: "ef-anchor-6x60",
                name: "6 x 60mm Nail-In Anchors - 100 Pack",
                group: "anchors",
                brand: "Nexpak",
                description: "Nail-in anchors for electric fence installation.",
                price: 95.00,
                weight: 0.80,
                unit: "pack",
                active: true
            },

            {
                id: "ef-anchor-8x80",
                name: "8 x 80mm Nail-In Anchors - 100 Pack",
                group: "anchors",
                brand: "Nexpak",
                description: "Heavy-duty nail-in anchors for mounting fence components.",
                price: 145.00,
                weight: 1.20,
                unit: "pack",
                active: true
            },


            /* ================================================================
               CORNER & END STAYS
               ================================================================ */

            {
                id: "ef-stay-600-black",
                name: "600mm Corner / End Stay - Black",
                group: "stays",
                brand: "Nexpak",
                description: "600mm powder-coated corner and end stay.",
                price: 42.00,
                weight: 0.50,
                unit: "each",
                active: true
            },

            {
                id: "ef-stay-600-white",
                name: "600mm Corner / End Stay - White",
                group: "stays",
                brand: "Nexpak",
                description: "600mm white powder-coated corner and end stay.",
                price: 42.00,
                weight: 0.50,
                unit: "each",
                active: true
            },

            {
                id: "ef-stay-600-galv",
                name: "600mm Corner / End Stay - Galvanised",
                group: "stays",
                brand: "Nexpak",
                description: "600mm galvanised corner and end stay.",
                price: 48.00,
                weight: 0.55,
                unit: "each",
                active: true
            },

            {
                id: "ef-stay-750-black",
                name: "750mm Corner / End Stay - Black",
                group: "stays",
                brand: "Nexpak",
                description: "750mm powder-coated corner and end stay.",
                price: 55.00,
                weight: 0.65,
                unit: "each",
                active: true
            },

            {
                id: "ef-stay-750-white",
                name: "750mm Corner / End Stay - White",
                group: "stays",
                brand: "Nexpak",
                description: "750mm white powder-coated corner and end stay.",
                price: 55.00,
                weight: 0.65,
                unit: "each",
                active: true
            },

            {
                id: "ef-stay-750-galv",
                name: "750mm Corner / End Stay - Galvanised",
                group: "stays",
                brand: "Nexpak",
                description: "750mm galvanised corner and end stay.",
                price: 62.00,
                weight: 0.70,
                unit: "each",
                active: true
            },


            /* ================================================================
               STAY SLEEVES
               ================================================================ */

            {
                id: "ef-sleeve-600-black",
                name: "600mm Stay Sleeve - Black",
                group: "stay-sleeves",
                brand: "Nexpak",
                description: "Protective sleeve for 600mm stays.",
                price: 18.00,
                weight: 0.10,
                unit: "each",
                active: true
            },

            {
                id: "ef-sleeve-600-white",
                name: "600mm Stay Sleeve - White",
                group: "stay-sleeves",
                brand: "Nexpak",
                description: "Protective sleeve for 600mm stays.",
                price: 18.00,
                weight: 0.10,
                unit: "each",
                active: true
            },

            {
                id: "ef-sleeve-750-black",
                name: "750mm Stay Sleeve - Black",
                group: "stay-sleeves",
                brand: "Nexpak",
                description: "Protective sleeve for 750mm stays.",
                price: 22.00,
                weight: 0.12,
                unit: "each",
                active: true
            },

            {
                id: "ef-sleeve-750-white",
                name: "750mm Stay Sleeve - White",
                group: "stay-sleeves",
                brand: "Nexpak",
                description: "Protective sleeve for 750mm stays.",
                price: 22.00,
                weight: 0.12,
                unit: "each",
                active: true
            },


            /* ================================================================
               WIRING LUGS
               ================================================================ */

            {
                id: "ef-lugs-6x35-10pk",
                name: "6 x 35mm Wiring Lugs - 10 Pack",
                group: "lugs",
                brand: "Nexpak",
                description: "Electric fence wiring lugs for connecting fence conductors.",
                price: 25.00,
                weight: 0.08,
                unit: "pack",
                active: true
            },

            {
                id: "ef-lugs-heavy-duty",
                name: "Heavy-Duty Fence Wiring Lugs - 10 Pack",
                group: "lugs",
                brand: "Nexpak",
                description: "Heavy-duty electrical connection lugs.",
                price: 38.00,
                weight: 0.10,
                unit: "pack",
                active: true
            },


            /* ================================================================
               FENCE WIRE
               ================================================================ */

            {
                id: "ef-wire-ss-1.2-545",
                name: "1.2mm Solid Stainless Steel Wire - 545m",
                group: "wire",
                brand: "Nemtek",
                description: "Solid stainless steel electric fence wire.",
                price: 1250.00,
                weight: 5.20,
                unit: "roll",
                active: true
            },

            {
                id: "ef-wire-alu-1.6-1000",
                name: "1.6mm Braided Aluminium Wire - 1000m",
                group: "wire",
                brand: "Nemtek",
                description: "Braided aluminium electric fence wire.",
                price: 1890.00,
                weight: 6.80,
                unit: "roll",
                active: true
            },

            {
                id: "ef-wire-galv-1.2-680",
                name: "1.2mm Braided Galvanised Wire - 680m",
                group: "wire",
                brand: "Nemtek",
                description: "Braided galvanised electric fence wire.",
                price: 890.00,
                weight: 7.50,
                unit: "roll",
                active: true
            },


            /* ================================================================
               FERRULES
               ================================================================ */

            {
                id: "ef-ferrule-6mm-alu",
                name: "6mm Aluminium Ferrules - 100 Pack",
                group: "ferrules",
                brand: "Nexpak",
                description: "Aluminium ferrules for electric fence wire connections.",
                price: 75.00,
                weight: 0.25,
                unit: "pack",
                active: true
            },

            {
                id: "ef-ferrule-6mm-solid",
                name: "6mm Solid Ferrules - 100 Pack",
                group: "ferrules",
                brand: "Nexpak",
                description: "Solid ferrules for secure electric fence connections.",
                price: 110.00,
                weight: 0.40,
                unit: "pack",
                active: true
            },

            {
                id: "ef-ferrule-10mm-alu",
                name: "10mm Aluminium Ferrules - 100 Pack",
                group: "ferrules",
                brand: "Nexpak",
                description: "10mm aluminium ferrules for fence connections.",
                price: 98.00,
                weight: 0.35,
                unit: "pack",
                active: true
            },

            {
                id: "ef-ferrule-10mm-solid",
                name: "10mm Solid Ferrules - 100 Pack",
                group: "ferrules",
                brand: "Nexpak",
                description: "10mm solid ferrules for heavy-duty connections.",
                price: 135.00,
                weight: 0.50,
                unit: "pack",
                active: true
            },


            /* ================================================================
               TENSIONERS & HOOKS
               ================================================================ */

            {
                id: "ef-tweaker-combo",
                name: "Tweaker Combo Tool + Springs",
                group: "tensioners",
                brand: "Nexpak",
                description: "Fence wire tensioning tool and spring set.",
                price: 165.00,
                weight: 0.30,
                unit: "set",
                active: true
            },

            {
                id: "ef-s-hooks-20pk",
                name: "Stainless Steel S-Hooks - 20 Pack",
                group: "hooks",
                brand: "Nexpak",
                description: "Stainless steel S-hooks for electric fence installation.",
                price: 85.00,
                weight: 0.20,
                unit: "pack",
                active: true
            },


            /* ================================================================
               EARTHING
               ================================================================ */

            {
                id: "ef-earth-spike-galv-1.2",
                name: "1.2m Galvanised Earth Spike",
                group: "earth-spikes",
                brand: "Nexpak",
                description: "Galvanised earth spike for electric fence earthing.",
                price: 85.00,
                weight: 1.10,
                unit: "each",
                active: true
            },

            {
                id: "ef-earth-spike-copper-1.2",
                name: "1.2m Copper-Plated Earth Spike",
                group: "earth-spikes",
                brand: "Nexpak",
                description: "Copper-plated earth spike for enhanced corrosion resistance.",
                price: 135.00,
                weight: 1.20,
                unit: "each",
                active: true
            },

            {
                id: "ef-earth-loop-ss",
                name: "Stainless Steel Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Stainless steel earth loop.",
                price: 18.00,
                weight: 0.04,
                unit: "each",
                active: true
            },

            {
                id: "ef-earth-loop-alu",
                name: "Aluminium Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Aluminium earth loop.",
                price: 14.00,
                weight: 0.02,
                unit: "each",
                active: true
            },

            {
                id: "ef-earth-loop-galv",
                name: "Galvanised Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Galvanised earth loop.",
                price: 12.00,
                weight: 0.05,
                unit: "each",
                active: true
            },


            /* ================================================================
               HT CABLE
               ================================================================ */

            {
                id: "ef-ht-50-soft",
                name: "50m HT Cable - Black Soft",
                group: "ht-cable",
                brand: "Nexpak",
                description: "High-tension cable for electric fence connections.",
                price: 290.00,
                weight: 2.10,
                unit: "roll",
                active: true
            },

            {
                id: "ef-ht-50-hard",
                name: "50m HT Cable - Black Hard",
                group: "ht-cable",
                brand: "Nexpak",
                description: "Heavy-duty high-tension cable.",
                price: 310.00,
                unit: "roll",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-ht-100-soft",
                name: "100m HT Cable - Black Soft",
                group: "ht-cable",
                brand: "Nexpak",
                description: "Flexible high-tension cable for electric fence connections.",
                price: 540.00,
                unit: "roll",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-ht-100-hard",
                name: "100m HT Cable - Black Hard",
                group: "ht-cable",
                brand: "Nexpak",
                description: "Heavy-duty 100m high-tension cable.",
                price: 580.00,
                unit: "roll",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-ht-200-soft",
                name: "200m HT Cable - Black Soft",
                group: "ht-cable",
                brand: "Nexpak",
                description: "200m flexible high-tension cable.",
                price: 980.00,
                unit: "roll",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-ht-200-hard",
                name: "200m HT Cable - Black Hard",
                group: "ht-cable",
                brand: "Nexpak",
                description: "200m heavy-duty high-tension cable.",
                price: 1050.00,
                unit: "roll",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               EARTH SPIKES
               ============================================================ */

            {
                id: "ef-earth-spike-galv",
                name: "1.2m Galvanised Earth Spike",
                group: "earth-spikes",
                brand: "Nexpak",
                description: "Galvanised earth spike for electric fence grounding.",
                price: 85.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-earth-spike-copper",
                name: "1.2m Copper Plated Earth Spike",
                group: "earth-spikes",
                brand: "Nexpak",
                description: "Copper plated earth spike for improved grounding performance.",
                price: 135.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               EARTH LOOPS
               ============================================================ */

            {
                id: "ef-earth-loop-ss",
                name: "Stainless Steel Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Stainless steel earth loop for electric fence installations.",
                price: 18.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-earth-loop-alu",
                name: "Aluminium Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Lightweight aluminium earth loop.",
                price: 14.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-earth-loop-galv",
                name: "Galvanised Earth Loop",
                group: "earth-loops",
                brand: "Nexpak",
                description: "Galvanised earth loop for durable outdoor installations.",
                price: 12.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               ENERGIZERS
               ============================================================ */

            {
                id: "ef-energizer-1j",
                name: "1 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "Compact 1 Joule electric fence energizer.",
                price: 1850.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            {
                id: "ef-energizer-3j",
                name: "3 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "3 Joule energizer for residential and medium perimeter applications.",
                price: 2650.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            {
                id: "ef-energizer-4j",
                name: "4 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "4 Joule electric fence energizer.",
                price: 3200.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            {
                id: "ef-energizer-8j",
                name: "8 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "High-output 8 Joule energizer for larger installations.",
                price: 4800.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            {
                id: "ef-energizer-14j",
                name: "14 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "High-power 14 Joule energizer for large perimeter systems.",
                price: 7500.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            {
                id: "ef-energizer-2zone-8j",
                name: "2-Zone 8 Joule Electric Fence Energizer",
                group: "energizers",
                brand: "Nemtek",
                description: "Two-zone 8 Joule energizer for advanced perimeter protection.",
                price: 6200.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: true
            },

            /* ============================================================
               BATTERY BACKUP
               ============================================================ */

            {
                id: "ef-battery-7ah",
                name: "7Ah Lead Acid Backup Battery",
                group: "backup-batteries",
                brand: "Nexpak",
                description: "7Ah rechargeable backup battery.",
                price: 280.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-battery-9ah",
                name: "9Ah Deep Cycle Gel Battery",
                group: "backup-batteries",
                brand: "Nexpak",
                description: "9Ah deep cycle gel backup battery.",
                price: 420.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               PSU & KEYPAD
               ============================================================ */

            {
                id: "ef-psu-16a",
                name: "16 Amp Power Supply",
                group: "psu-keypad",
                brand: "Nexpak",
                description: "16 Amp power supply for electric fence equipment.",
                price: 350.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-keypad-lcd",
                name: "LCD Keypad Programmer",
                group: "psu-keypad",
                brand: "Nemtek",
                description: "LCD keypad programmer for compatible electric fence energizers.",
                price: 850.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-psu-keypad-combo",
                name: "16A PSU + LCD Keypad",
                group: "psu-keypad",
                brand: "Nexpak",
                description: "Combined 16A PSU and LCD keypad package.",
                price: 1150.00,
                unit: "set",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               ENCLOSURES
               ============================================================ */

            {
                id: "ef-enclosure-dmc430",
                name: "DMC 430 Weatherproof Enclosure",
                group: "enclosures",
                brand: "DMC",
                description: "Weatherproof enclosure for electric fence equipment.",
                price: 450.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-enclosure-dmc530",
                name: "DMC 530 High Weatherproof Enclosure",
                group: "enclosures",
                brand: "DMC",
                description: "Large weatherproof enclosure for larger electric fence installations.",
                price: 620.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               COMMUNICATION MODULES
               ============================================================ */

            {
                id: "ef-wifi-module",
                name: "WiFi Smartphone Communication Module",
                group: "communication",
                brand: "Nemtek",
                description: "Smartphone connectivity module for compatible energizers.",
                price: 890.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-gsm-module",
                name: "GSM Cellular Communication Module",
                group: "communication",
                brand: "Nemtek",
                description: "GSM communication module for remote monitoring.",
                price: 1450.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               SIRENS & LIGHTS
               ============================================================ */

            {
                id: "ef-siren-15w",
                name: "15W Security Siren",
                group: "alerts",
                brand: "Nexpak",
                description: "15W external security siren.",
                price: 120.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-strobe-light",
                name: "Strobe Warning Light",
                group: "alerts",
                brand: "Nexpak",
                description: "Visual warning strobe light for perimeter security.",
                price: 145.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-nite-light-red",
                name: "Red Nite Light LED",
                group: "alerts",
                brand: "Nexpak",
                description: "Red LED security warning light.",
                price: 180.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-nite-light-blue",
                name: "Blue Nite Light LED",
                group: "alerts",
                brand: "Nexpak",
                description: "Blue LED security warning light.",
                price: 180.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-nite-light-green",
                name: "Green Nite Light LED",
                group: "alerts",
                brand: "Nexpak",
                description: "Green LED security warning light.",
                price: 180.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               SAFETY & ACCESSORIES
               ============================================================ */

            {
                id: "ef-warning-sign",
                name: "Electric Fence Warning Sign",
                group: "safety-accessories",
                brand: "Nexpak",
                description: "Legal electric fence warning sign.",
                price: 22.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            {
                id: "ef-gate-contact",
                name: "Heavy Duty Gate Contact Switch",
                group: "safety-accessories",
                brand: "Nexpak",
                description: "Heavy-duty gate contact switch for electric fence monitoring.",
                price: 145.00,
                unit: "each",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
            },

            /* ============================================================
               INSTALLATION
               ============================================================ */

            {
                id: "ef-installation",
                name: "Nexpak Certified Electric Fence Installation",
                group: "installation",
                brand: "Nexpak",
                description: "Professional electric fence installation service.",
                price: 2500.00,
                unit: "service",
                quantityType: "quantity",
                category: "electric-fencing",
                image: "",
                featured: false
              }
                      /* ============================================================
               CCTV HD SYSTEMS
               ============================================================ */

            {
                id: "hd-dahua-dvr-4ch",
                name: "Dahua 4 Channel HD DVR",
                group: "dvr",
                brand: "Dahua",
                description: "4 channel HD DVR for residential CCTV installations.",
                price: 1250.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-dahua-dvr-8ch",
                name: "Dahua 8 Channel HD DVR",
                group: "dvr",
                brand: "Dahua",
                description: "8 channel HD DVR for residential and small commercial CCTV systems.",
                price: 1450.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-dahua-dvr-16ch",
                name: "Dahua 16 Channel HD DVR",
                group: "dvr",
                brand: "Dahua",
                description: "16 channel HD DVR for larger surveillance installations.",
                price: 2650.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-dahua-dvr-32ch",
                name: "Dahua 32 Channel HD DVR",
                group: "dvr",
                brand: "Dahua",
                description: "32 channel HD DVR for commercial and larger CCTV systems.",
                price: 5400.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-dvr-4ch",
                name: "Hikvision 4 Channel HD DVR",
                group: "dvr",
                brand: "Hikvision",
                description: "4 channel Hikvision HD DVR for residential surveillance.",
                price: 1370.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-dvr-8ch",
                name: "Hikvision 8 Channel HD DVR",
                group: "dvr",
                brand: "Hikvision",
                description: "8 channel Hikvision HD DVR.",
                price: 1570.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-dvr-16ch",
                name: "Hikvision 16 Channel HD DVR",
                group: "dvr",
                brand: "Hikvision",
                description: "16 channel Hikvision HD DVR for larger installations.",
                price: 2770.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-dvr-32ch",
                name: "Hikvision 32 Channel HD DVR",
                group: "dvr",
                brand: "Hikvision",
                description: "32 channel Hikvision HD DVR for commercial surveillance.",
                price: 5520.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               SURVEILLANCE HARD DRIVES
               ============================================================ */

            {
                id: "hd-hdd-1tb",
                name: "1TB Surveillance Hard Drive",
                group: "hard-drives",
                brand: "Seagate",
                description: "1TB surveillance-grade hard drive for DVR recording.",
                price: 780.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hdd-2tb",
                name: "2TB Surveillance Hard Drive",
                group: "hard-drives",
                brand: "Seagate",
                description: "2TB surveillance-grade hard drive for CCTV recording.",
                price: 1150.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-hdd-4tb",
                name: "4TB Surveillance Hard Drive",
                group: "hard-drives",
                brand: "Seagate",
                description: "4TB surveillance-grade hard drive for extended CCTV recording.",
                price: 1890.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hdd-6tb",
                name: "6TB Surveillance Hard Drive",
                group: "hard-drives",
                brand: "Seagate",
                description: "6TB surveillance-grade hard drive for high-capacity recording.",
                price: 2950.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               BULLET CAMERAS
               ============================================================ */

            {
                id: "hd-dahua-bullet-30m",
                name: "Dahua 2MP Bullet Camera 30m IR",
                group: "bullet-cameras",
                brand: "Dahua",
                description: "HD infrared bullet camera with up to 30m night vision.",
                price: 380.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-hikvision-bullet-30m",
                name: "Hikvision 2MP Bullet Camera 30m IR",
                group: "bullet-cameras",
                brand: "Hikvision",
                description: "HD infrared bullet camera with up to 30m night vision.",
                price: 420.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-dahua-bullet-60m",
                name: "Dahua 5MP Bullet Camera 60m IR",
                group: "bullet-cameras",
                brand: "Dahua",
                description: "High-resolution bullet camera with extended 60m infrared night vision.",
                price: 690.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-bullet-60m",
                name: "Hikvision 5MP Bullet Camera 60m IR",
                group: "bullet-cameras",
                brand: "Hikvision",
                description: "High-resolution bullet camera with extended 60m infrared night vision.",
                price: 750.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               DOME CAMERAS
               ============================================================ */

            {
                id: "hd-dahua-dome-20m",
                name: "Dahua 2MP Dome Camera 20m IR",
                group: "dome-cameras",
                brand: "Dahua",
                description: "Compact HD dome camera with 20m infrared night vision.",
                price: 360.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-hikvision-dome-20m",
                name: "Hikvision 2MP Dome Camera 20m IR",
                group: "dome-cameras",
                brand: "Hikvision",
                description: "Compact HD dome camera with 20m infrared night vision.",
                price: 400.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-dahua-dome-40m",
                name: "Dahua 5MP Dome Camera 40m IR",
                group: "dome-cameras",
                brand: "Dahua",
                description: "High-resolution dome camera with 40m infrared night vision.",
                price: 650.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-dome-40m",
                name: "Hikvision 5MP Dome Camera 40m IR",
                group: "dome-cameras",
                brand: "Hikvision",
                description: "High-resolution dome camera with 40m infrared night vision.",
                price: 710.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               VARIFOCAL CAMERAS
               ============================================================ */

            {
                id: "hd-dahua-varifocal-bullet",
                name: "Dahua Varifocal Bullet Camera 60m IR",
                group: "varifocal-cameras",
                brand: "Dahua",
                description: "Adjustable-lens varifocal bullet camera with 60m infrared.",
                price: 890.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-varifocal-bullet",
                name: "Hikvision Varifocal Bullet Camera 60m IR",
                group: "varifocal-cameras",
                brand: "Hikvision",
                description: "Adjustable-lens varifocal bullet camera with 60m infrared.",
                price: 950.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-dahua-varifocal-dome",
                name: "Dahua Varifocal Dome Camera 40m IR",
                group: "varifocal-cameras",
                brand: "Dahua",
                description: "Adjustable-lens varifocal dome camera with 40m infrared.",
                price: 820.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-hikvision-varifocal-dome",
                name: "Hikvision Varifocal Dome Camera 40m IR",
                group: "varifocal-cameras",
                brand: "Hikvision",
                description: "Adjustable-lens varifocal dome camera with 40m infrared.",
                price: 880.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               CCTV POWER SUPPLIES
               ============================================================ */

            {
                id: "hd-power-adapter",
                name: "12V CCTV Power Adapter",
                group: "power-supplies",
                brand: "Nexpak",
                description: "12V plug-in power adapter for individual CCTV cameras.",
                price: 120.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-9way-power-box",
                name: "9-Way 10A CCTV Power Supply Box",
                group: "power-supplies",
                brand: "Nexpak",
                description: "Multi-output CCTV power supply box for multiple cameras.",
                price: 480.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-18way-power-box",
                name: "18-Way CCTV Power Supply Box",
                group: "power-supplies",
                brand: "Nexpak",
                description: "High-capacity multi-output CCTV power supply box.",
                price: 780.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               CCTV CABLE
               ============================================================ */

            {
                id: "hd-rg59-100m",
                name: "RG59 Coax + Power Cable 100m",
                group: "cables",
                brand: "Nexpak",
                description: "100m RG59 coaxial cable with integrated power cable.",
                price: 420.00,
                unit: "roll",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-rg59-305m",
                name: "RG59 Coax + Power Cable 305m",
                group: "cables",
                brand: "Nexpak",
                description: "305m CCTV RG59 coaxial cable roll.",
                price: 1180.00,
                unit: "roll",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-cat5e-100m",
                name: "Cat5e CCTV Cable 100m",
                group: "cables",
                brand: "Nexpak",
                description: "100m Cat5e network cable suitable for CCTV installations.",
                price: 380.00,
                unit: "roll",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               CONNECTORS & BALUNS
               ============================================================ */

            {
                id: "hd-bnc-crimp-set",
                name: "BNC Crimp + DC Lead Set",
                group: "connectors",
                brand: "Nexpak",
                description: "BNC connector and DC power lead set.",
                price: 25.00,
                unit: "set",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-video-balun",
                name: "HD Video Balun Pair",
                group: "connectors",
                brand: "Nexpak",
                description: "HD video balun pair for transmitting CCTV video over twisted-pair cable.",
                price: 65.00,
                unit: "pair",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               JOINT ENCLOSURES
               ============================================================ */

            {
                id: "hd-joint-box-100",
                name: "100x100mm CCTV Joint Enclosure",
                group: "enclosures",
                brand: "Nexpak",
                description: "Compact enclosure for CCTV cable joints and connections.",
                price: 28.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-joint-box-150",
                name: "150x150mm CCTV Joint Enclosure",
                group: "enclosures",
                brand: "Nexpak",
                description: "Larger weather-resistant CCTV junction enclosure.",
                price: 45.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               CCTV MONITORS
               ============================================================ */

            {
                id: "hd-monitor-19",
                name: "19-Inch LED CCTV Monitor",
                group: "monitors",
                brand: "Nexpak",
                description: "19-inch LED display for CCTV monitoring.",
                price: 1450.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            {
                id: "hd-monitor-22",
                name: "22-Inch FHD LED CCTV Monitor",
                group: "monitors",
                brand: "Nexpak",
                description: "22-inch Full HD LED monitor for CCTV surveillance.",
                price: 1890.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: true
            },

            {
                id: "hd-monitor-27",
                name: "27-Inch FHD LED CCTV Monitor",
                group: "monitors",
                brand: "Nexpak",
                description: "27-inch Full HD LED monitor for larger surveillance control rooms.",
                price: 2890.00,
                unit: "each",
                quantityType: "quantity",
                category: "cctv-hd",
                image: "",
                featured: false
            },

            /* ============================================================
               CCTV TOOLS
               ============================================================ */

                    {
            id: "hd-coax-strip-tool",
            name: "CCTV Coax Cable Strip Tool",
            group: "cctv-accessories",
            brand: "Nexpak",
            description: "Professional coaxial cable stripping tool for CCTV installations.",
            price: 120.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "hd-bnc-crimp-tool",
            name: "Heavy Duty BNC Crimp Tool",
            group: "cctv-accessories",
            brand: "Nexpak",
            description: "Heavy-duty crimping tool for professional BNC CCTV connectors.",
            price: 280.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "hd-junction-box",
            name: "100x100mm CCTV Junction Box",
            group: "cctv-accessories",
            brand: "Nexpak",
            description: "Weather-resistant junction enclosure for CCTV cable connections.",
            price: 28.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "hd-monitor-19",
            name: "19-Inch LED CCTV Monitor",
            group: "cctv-monitors",
            brand: "Nexpak",
            description: "19-inch LED monitor suitable for CCTV surveillance viewing.",
            price: 1450.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "hd-monitor-27",
            name: "27-Inch FHD CCTV Monitor",
            group: "cctv-monitors",
            brand: "Nexpak",
            description: "27-inch Full HD LED monitor for professional surveillance systems.",
            price: 2890.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           IP CCTV PRODUCTS
           =============================================================== */

        {
            id: "ip-nvr-4ch-poe",
            name: "4 Channel PoE NVR",
            group: "ip-nvr",
            brand: "Dahua",
            description: "4-channel network video recorder with built-in PoE ports.",
            price: 2100.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-nvr-8ch-poe",
            name: "8 Channel PoE NVR",
            group: "ip-nvr",
            brand: "Dahua",
            description: "8-channel PoE NVR for network CCTV installations.",
            price: 3400.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-nvr-16ch-poe",
            name: "16 Channel PoE NVR",
            group: "ip-nvr",
            brand: "Dahua",
            description: "16-channel professional PoE network video recorder.",
            price: 5800.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-nvr-32ch",
            name: "32 Channel NVR",
            group: "ip-nvr",
            brand: "Dahua",
            description: "32-channel professional network video recorder without built-in PoE.",
            price: 7900.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-4mp-turret",
            name: "4MP PoE Turret Dome 30m IR",
            group: "ip-cameras",
            brand: "Dahua",
            description: "4MP PoE turret camera with infrared night vision up to 30 metres.",
            price: 780.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-8mp-bullet",
            name: "8MP 4K Bullet Camera 50m IR",
            group: "ip-cameras",
            brand: "Dahua",
            description: "8MP 4K network bullet camera with long-range infrared night vision.",
            price: 1450.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-4mp-ptz",
            name: "4MP Speed Dome PTZ 100m IR",
            group: "ip-cameras",
            brand: "Dahua",
            description: "4MP network PTZ speed dome with powerful 100m infrared range.",
            price: 4800.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-cat5e-100m",
            name: "Cat5e Network Cable 100m",
            group: "ip-cabling",
            brand: "Nexpak",
            description: "100-metre Cat5e network cable roll for IP CCTV installations.",
            price: 380.00,
            unit: "roll",
            image: "",
            featured: false
        },

        {
            id: "ip-cat6-305m",
            name: "Cat6 Network Cable 305m",
            group: "ip-cabling",
            brand: "Nexpak",
            description: "305-metre Cat6 network cable box for professional installations.",
            price: 1450.00,
            unit: "box",
            image: "",
            featured: false
        },

        {
            id: "ip-poe-switch-4",
            name: "4 Port PoE Switch",
            group: "ip-network",
            brand: "Dahua",
            description: "Compact PoE network switch for smaller IP CCTV systems.",
            price: 950.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-poe-switch-8",
            name: "8 Port PoE Switch",
            group: "ip-network",
            brand: "Dahua",
            description: "8-port PoE switch for IP camera installations.",
            price: 1450.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ip-poe-switch-16",
            name: "16 Port PoE Switch",
            group: "ip-network",
            brand: "Dahua",
            description: "16-port professional PoE switch for larger IP CCTV systems.",
            price: 2850.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           ROBOGUARD PRODUCTS
           =============================================================== */

        {
            id: "rg-base-station",
            name: "Roboguard Base Station",
            group: "roboguard-base",
            brand: "Roboguard",
            description: "Wireless Roboguard receiver and base station.",
            price: 2450.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "rg-beam",
            name: "Roboguard Wireless Beam",
            group: "roboguard-beams",
            brand: "Roboguard",
            description: "Wireless outdoor perimeter beam detector.",
            price: 1650.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "rg-beam-long-range",
            name: "Roboguard Long Range Beam",
            group: "roboguard-beams",
            brand: "Roboguard",
            description: "Long-range wireless outdoor beam for extended perimeter protection.",
            price: 1950.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "rg-solar-panel",
            name: "Roboguard Solar Panel",
            group: "roboguard-power",
            brand: "Roboguard",
            description: "Solar power option for Roboguard outdoor beam installations.",
            price: 890.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "rg-battery",
            name: "Roboguard Replacement Battery",
            group: "roboguard-power",
            brand: "Roboguard",
            description: "Replacement rechargeable battery for Roboguard equipment.",
            price: 420.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           GATE AUTOMATION PRODUCTS
           =============================================================== */

        {
            id: "centurion-d5-evo",
            name: "Centurion D5-Evo Gate Motor",
            group: "gate-motors",
            brand: "Centurion",
            description: "Professional sliding gate motor for residential and light commercial gates.",
            price: 4850.00,
            unit: "each",
            image: "",
            featured: true
        },

        {
            id: "centurion-d5-smart",
            name: "Centurion D5 Smart Gate Motor",
            group: "gate-motors",
            brand: "Centurion",
            description: "Smart sliding gate motor with advanced connectivity features.",
            price: 6050.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "centurion-d10-smart",
            name: "Centurion D10 Turbo Smart",
            group: "gate-motors",
            brand: "Centurion",
            description: "Heavy-duty high-speed sliding gate motor for larger gates.",
            price: 9350.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "gate-steel-rack",
            name: "Steel Gate Rack 2m",
            group: "gate-rack",
            brand: "Nexpak",
            description: "Heavy-duty galvanised steel rack section for sliding gates.",
            price: 280.00,
            unit: "2m section",
            image: "",
            featured: false
        },

        {
            id: "gate-nylon-rack",
            name: "Nylon Gate Rack 2m",
            group: "gate-rack",
            brand: "Nexpak",
            description: "Nylon rack section for compatible sliding gate motors.",
            price: 250.00,
            unit: "2m section",
            image: "",
            featured: false
        },

        {
            id: "gate-remote-4button",
            name: "4-Button Gate Remote",
            group: "gate-remotes",
            brand: "Centurion",
            description: "4-button remote control for compatible Centurion gate automation systems.",
            price: 220.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "gate-anti-theft",
            name: "Heavy Duty Anti-Theft Bracket",
            group: "gate-accessories",
            brand: "Centurion",
            description: "Heavy-duty anti-theft bracket for additional gate motor protection.",
            price: 550.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "gate-battery-7ah",
            name: "7Ah Gate Motor Backup Battery",
            group: "gate-power",
            brand: "Nexpak",
            description: "7Ah rechargeable backup battery for gate automation systems.",
            price: 280.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           IDS ALARM PRODUCTS
           =============================================================== */

        {
            id: "ids-805",
            name: "IDS 805 Alarm Panel",
            group: "ids-panels",
            brand: "IDS",
            description: "IDS 805 intrusion alarm control panel.",
            price: 850.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ids-x64",
            name: "IDS X64 Alarm Panel",
            group: "ids-panels",
            brand: "IDS",
            description: "IDS X64 hybrid alarm control panel for larger security installations.",
            price: 1650.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ids-pir",
            name: "IDS PIR Motion Detector",
            group: "ids-detectors",
            brand: "IDS",
            description: "Indoor PIR motion detector for IDS alarm systems.",
            price: 180.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ids-keypad",
            name: "IDS LCD Keypad",
            group: "ids-keypads",
            brand: "IDS",
            description: "LCD alarm keypad for IDS alarm panels.",
            price: 520.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ids-siren",
            name: "IDS Indoor/Outdoor Siren",
            group: "ids-alerts",
            brand: "IDS",
            description: "High-output security siren for IDS alarm installations.",
            price: 180.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ids-hyyp",
            name: "IDS HYYP Module",
            group: "ids-communication",
            brand: "IDS",
            description: "Smart communication module for remote alarm monitoring and control.",
            price: 1450.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           AJAX SECURITY PRODUCTS
           =============================================================== */

        {
            id: "ajax-hub-2",
            name: "Ajax Hub 2",
            group: "ajax-hubs",
            brand: "Ajax",
            description: "Wireless Ajax security hub supporting Jeweller devices.",
            price: 3250.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ajax-motioncam",
            name: "Ajax MotionCam",
            group: "ajax-detectors",
            brand: "Ajax",
            description: "Wireless motion detector with photo verification.",
            price: 1450.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ajax-keypad",
            name: "Ajax KeyPad",
            group: "ajax-keypads",
            brand: "Ajax",
            description: "Wireless touch keypad for Ajax security systems.",
            price: 1250.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ajax-doorprotect",
            name: "Ajax DoorProtect",
            group: "ajax-detectors",
            brand: "Ajax",
            description: "Wireless opening detector for doors and windows.",
            price: 650.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "ajax-outdoor",
            name: "Ajax MotionProtect Outdoor",
            group: "ajax-outdoor",
            brand: "Ajax",
            description: "Wireless outdoor motion detector for perimeter protection.",
            price: 1950.00,
            unit: "each",
            image: "",
            featured: false
        },


        /* ===============================================================
           STAFIX AGRICULTURAL FENCING
           =============================================================== */

        {
            id: "stafix-energizer-2j",
            name: "Stafix 2J Energizer",
            group: "stafix-energizers",
            brand: "Stafix",
            description: "Agricultural electric fence energizer for farm and livestock applications.",
            price: 2350.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "stafix-solar-energizer",
            name: "Stafix Solar Energizer",
            group: "stafix-energizers",
            brand: "Stafix",
            description: "Solar-powered agricultural electric fence energizer.",
            price: 3250.00,
            unit: "each",
            image: "",
            featured: false
        },

        {
            id: "stafix-polywire",
            name: "Stafix Polywire Roll",
            group: "stafix-wire",
            brand: "Stafix",
            description: "High-visibility electric fence polywire for agricultural fencing.",
            price: 580.00,
            unit: "roll",
            image: "",
            featured: false
        },

        {
            id: "stafix-insulator",
            name: "Stafix Electric Fence Insulators",
            group: "stafix-accessories",
            brand: "Stafix",
            description: "Agricultural electric fence insulators for secure wire mounting.",
            price: 95.00,
            unit: "pack",
            image: "",
            featured: false
        }

    ]

};


/* ==========================================================================
   CONFIGURATOR CATEGORY HELPERS
   ========================================================================== */

const SYSTEM_CATEGORIES = [
    {
        id: "electric-fencing",
        title: "Electric Fencing",
        icon: "fa-bolt"
    },
    {
        id: "cctv-hd",
        title: "HD CCTV",
        icon: "fa-video"
    },
    {
        id: "cctv-ip",
        title: "IP CCTV",
        icon: "fa-network-wired"
    },
    {
        id: "roboguard",
        title: "Roboguard",
        icon: "fa-shield-halved"
    },
    {
        id: "gate-motors",
        title: "Gate Automation",
        icon: "fa-door-open"
    },
    {
        id: "ids-alarm",
        title: "IDS Alarm",
        icon: "fa-bell"
    },
    {
        id: "ajax-security",
        title: "Ajax Security",
        icon: "fa-house-lock"
    },
    {
        id: "stafix-agri",
        title: "Stafix Agri",
        icon: "fa-wheat-awn"
    }
];


/* ==========================================================================
   PRODUCT HELPERS
   ========================================================================== */

function getSystemProducts(category) {

    return SHOP_DATA.products.filter(
        product => product.category === category ||
                   product.group?.startsWith(category)
    );

}


function getProductById(productId) {

    return SHOP_DATA.products.find(
        product => product.id === productId
    );

}


function formatZAR(amount) {

    return new Intl.NumberFormat(
        "en-ZA",
        {
            style: "currency",
            currency: "ZAR",
            minimumFractionDigits: 2
        }
    ).format(
        Number(amount) || 0
    );

}


/* ==========================================================================
   LEGACY COMPATIBILITY
   ========================================================================== */

const CONFIGURATOR_DATA = SHOP_DATA.products;


/* ==========================================================================
   GLOBAL EXPORT
   ========================================================================== */

window.SHOP_DATA = SHOP_DATA;
window.SYSTEM_CATEGORIES = SYSTEM_CATEGORIES;
window.CONFIGURATOR_DATA = CONFIGURATOR_DATA;
window.getSystemProducts = getSystemProducts;
window.getProductById = getProductById;
window.formatZAR = formatZAR;

console.log(
    "Nexpak shop-data.js loaded:",
    SHOP_DATA.products.length,
    "individual products."
);

      /* ==========================================================================
   BUILD YOUR SYSTEM — PRODUCT GROUP DEFINITIONS
   ========================================================================== */

const SYSTEM_PRODUCT_GROUPS = {

    /* ======================================================================
       ELECTRIC FENCING
       ====================================================================== */

    "electric-fencing": [

        {
            id: "ef-brackets",
            title: "Fence Brackets",
            description: "Select the bracket style, line configuration and finish required.",
            icon: "fa-border-all",
            selectionType: "multiple"
        },

        {
            id: "ef-stays",
            title: "Corner & End Stays",
            description: "Heavy-duty stays for corners, ends and tension points.",
            icon: "fa-grip-lines",
            selectionType: "multiple"
        },

        {
            id: "ef-sleeves",
            title: "Stay Sleeves",
            description: "Protective sleeves for electric fence stays.",
            icon: "fa-circle",
            selectionType: "multiple"
        },

        {
            id: "ef-lugs",
            title: "Wiring Lugs",
            description: "Electrical connection lugs for fence installation.",
            icon: "fa-link",
            selectionType: "multiple"
        },

        {
            id: "ef-anchors",
            title: "Nail-In Anchors",
            description: "Anchoring hardware for securing electric fence components.",
            icon: "fa-anchor",
            selectionType: "multiple"
        },

        {
            id: "ef-wire",
            title: "Electric Fence Wire",
            description: "Choose the wire type and roll length required.",
            icon: "fa-arrows-left-right",
            selectionType: "multiple"
        },

        {
            id: "ef-ferrules",
            title: "Wire Ferrules",
            description: "Ferrules for secure electric fence wire connections.",
            icon: "fa-circle-nodes",
            selectionType: "multiple"
        },

        {
            id: "ef-tensioners",
            title: "Tensioners & Hooks",
            description: "Fence tensioning hardware and connection hooks.",
            icon: "fa-link",
            selectionType: "multiple"
        },

        {
            id: "ef-earth",
            title: "Earthing",
            description: "Earth spikes, earth loops and related grounding components.",
            icon: "fa-bolt",
            selectionType: "multiple"
        },

        {
            id: "ef-ht",
            title: "HT Cable",
            description: "High-tension cable for energizer and fence connections.",
            icon: "fa-cable-car",
            selectionType: "multiple"
        },

        {
            id: "ef-warning",
            title: "Warning & Safety",
            description: "Legal warning signs and safety accessories.",
            icon: "fa-triangle-exclamation",
            selectionType: "multiple"
        },

        {
            id: "ef-energizers",
            title: "Energizers",
            description: "Choose the energizer output suitable for the installation.",
            icon: "fa-bolt",
            selectionType: "single"
        },

        {
            id: "ef-battery",
            title: "Backup Battery",
            description: "Backup power for electric fence energizers.",
            icon: "fa-car-battery",
            selectionType: "single"
        },

        {
            id: "ef-power",
            title: "Power Supply & Keypad",
            description: "Power supply and programming equipment.",
            icon: "fa-plug",
            selectionType: "single"
        },

        {
            id: "ef-enclosure",
            title: "Enclosures",
            description: "Weatherproof equipment enclosures.",
            icon: "fa-box",
            selectionType: "single"
        },

        {
            id: "ef-communication",
            title: "Communication Modules",
            description: "Remote monitoring and smartphone communication options.",
            icon: "fa-tower-cell",
            selectionType: "single"
        },

        {
            id: "ef-alerts",
            title: "Siren & Warning Lights",
            description: "Audible and visual security alerts.",
            icon: "fa-bell",
            selectionType: "multiple"
        },

        {
            id: "ef-installation",
            title: "Installation",
            description: "Choose DIY or professional installation.",
            icon: "fa-screwdriver-wrench",
            selectionType: "single"
        }

    ],


    /* ======================================================================
       HD CCTV
       ====================================================================== */

    "cctv-hd": [

        {
            id: "hd-brand",
            title: "CCTV Brand",
            description: "Choose your preferred HD CCTV manufacturer.",
            icon: "fa-building",
            selectionType: "single"
        },

        {
            id: "hd-dvr",
            title: "DVR Recorders",
            description: "Select the DVR channel capacity required.",
            icon: "fa-server",
            selectionType: "single"
        },

        {
            id: "hd-hdd",
            title: "Surveillance Hard Drives",
            description: "Choose storage capacity for your CCTV recorder.",
            icon: "fa-hard-drive",
            selectionType: "single"
        },

        {
            id: "hd-power",
            title: "CCTV Power Supplies",
            description: "Power distribution equipment for cameras.",
            icon: "fa-plug",
            selectionType: "single"
        },

        {
            id: "hd-cameras",
            title: "HD Cameras",
            description: "Select as many bullet, dome or other cameras as required.",
            icon: "fa-video",
            selectionType: "multiple"
        },

        {
            id: "hd-varifocal",
            title: "Varifocal Cameras",
            description: "Professional adjustable-lens CCTV cameras.",
            icon: "fa-camera",
            selectionType: "multiple"
        },

        {
            id: "hd-cabling",
            title: "CCTV Cable",
            description: "Select the cable type and roll length required.",
            icon: "fa-cable-car",
            selectionType: "multiple"
        },

        {
            id: "hd-connectors",
            title: "Connectors & Baluns",
            description: "CCTV connection accessories.",
            icon: "fa-plug-circle-bolt",
            selectionType: "multiple"
        },

        {
            id: "hd-accessories",
            title: "CCTV Accessories",
            description: "Junction boxes, tools and other installation accessories.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        },

        {
            id: "hd-monitors",
            title: "CCTV Monitors",
            description: "Displays for viewing your surveillance system.",
            icon: "fa-desktop",
            selectionType: "multiple"
        }

    ],


    /* ======================================================================
       IP CCTV
       ====================================================================== */

    "cctv-ip": [

        {
            id: "ip-brand",
            title: "IP CCTV Brand",
            description: "Choose your preferred IP CCTV manufacturer.",
            icon: "fa-building",
            selectionType: "single"
        },

        {
            id: "ip-nvr",
            title: "NVR Recorders",
            description: "Select your required network video recorder.",
            icon: "fa-server",
            selectionType: "single"
        },

        {
            id: "ip-cameras",
            title: "IP Cameras",
            description: "Add the exact number and type of IP cameras required.",
            icon: "fa-video",
            selectionType: "multiple"
        },

        {
            id: "ip-cabling",
            title: "Network Cable",
            description: "Cat5e and Cat6 network cabling.",
            icon: "fa-ethernet",
            selectionType: "multiple"
        },

        {
            id: "ip-network",
            title: "PoE Switches & Network Equipment",
            description: "PoE switches and network infrastructure.",
            icon: "fa-network-wired",
            selectionType: "multiple"
        },

        {
            id: "ip-storage",
            title: "IP Surveillance Storage",
            description: "Hard drives for NVR recording systems.",
            icon: "fa-hard-drive",
            selectionType: "single"
        },

        {
            id: "ip-accessories",
            title: "IP CCTV Accessories",
            description: "Connectors, junction boxes and installation accessories.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        }

    ],


    /* ======================================================================
       ROBOGUARD
       ====================================================================== */

    "roboguard": [

        {
            id: "rg-base",
            title: "Base Stations",
            description: "Roboguard receivers and base stations.",
            icon: "fa-tower-broadcast",
            selectionType: "single"
        },

        {
            id: "rg-beams",
            title: "Wireless Beams",
            description: "Select the number and type of outdoor Roboguard beams.",
            icon: "fa-arrows-left-right-to-line",
            selectionType: "multiple"
        },

        {
            id: "rg-power",
            title: "Power & Solar",
            description: "Solar panels and replacement batteries.",
            icon: "fa-solar-panel",
            selectionType: "multiple"
        },

        {
            id: "rg-accessories",
            title: "Roboguard Accessories",
            description: "Additional equipment and installation accessories.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        }

    ],


    /* ======================================================================
       GATE AUTOMATION
       ====================================================================== */

    "gate-motors": [

        {
            id: "gate-motors",
            title: "Gate Motors",
            description: "Choose the gate motor required for the installation.",
            icon: "fa-gears",
            selectionType: "single"
        },

        {
            id: "gate-rack",
            title: "Gate Rack",
            description: "Add the required quantity of steel or nylon rack.",
            icon: "fa-grip-lines",
            selectionType: "multiple"
        },

        {
            id: "gate-remotes",
            title: "Remote Controls",
            description: "Add additional remotes to the system.",
            icon: "fa-gamepad",
            selectionType: "multiple"
        },

        {
            id: "gate-power",
            title: "Backup Power",
            description: "Backup batteries for gate automation.",
            icon: "fa-car-battery",
            selectionType: "multiple"
        },

        {
            id: "gate-accessories",
            title: "Gate Accessories",
            description: "Anti-theft brackets and additional gate hardware.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        },

        {
            id: "gate-installation",
            title: "Gate Motor Installation",
            description: "Professional installation options.",
            icon: "fa-screwdriver-wrench",
            selectionType: "single"
        }

    ],


    /* ======================================================================
       IDS ALARM
       ====================================================================== */

    "ids-alarm": [

        {
            id: "ids-panels",
            title: "Alarm Panels",
            description: "Choose the IDS control panel required.",
            icon: "fa-microchip",
            selectionType: "single"
        },

        {
            id: "ids-keypads",
            title: "Keypads",
            description: "Add the required alarm keypads.",
            icon: "fa-keyboard",
            selectionType: "multiple"
        },

        {
            id: "ids-detectors",
            title: "Motion & Door Detectors",
            description: "Add PIR and other intrusion detectors.",
            icon: "fa-person-running",
            selectionType: "multiple"
        },

        {
            id: "ids-alerts",
            title: "Sirens & Alerts",
            description: "Audible alarm warning equipment.",
            icon: "fa-bell",
            selectionType: "multiple"
        },

        {
            id: "ids-communication",
            title: "Communication Modules",
            description: "Remote alarm communication and monitoring.",
            icon: "fa-tower-cell",
            selectionType: "multiple"
        },

        {
            id: "ids-accessories",
            title: "Alarm Accessories",
            description: "Additional IDS installation equipment.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        }

    ],


    /* ======================================================================
       AJAX
       ====================================================================== */

    "ajax-security": [

        {
            id: "ajax-hubs",
            title: "Ajax Hubs",
            description: "Choose the central Ajax security hub.",
            icon: "fa-house-lock",
            selectionType: "single"
        },

        {
            id: "ajax-detectors",
            title: "Indoor Detectors",
            description: "Motion, opening and other indoor detectors.",
            icon: "fa-person-running",
            selectionType: "multiple"
        },

        {
            id: "ajax-outdoor",
            title: "Outdoor Detectors",
            description: "Wireless outdoor perimeter protection.",
            icon: "fa-shield-halved",
            selectionType: "multiple"
        },

        {
            id: "ajax-keypads",
            title: "Keypads",
            description: "Wireless Ajax keypads.",
            icon: "fa-keyboard",
            selectionType: "multiple"
        },

        {
            id: "ajax-accessories",
            title: "Ajax Accessories",
            description: "Additional Ajax security equipment.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        }

    ],


    /* ======================================================================
       STAFIX AGRICULTURAL FENCING
       ====================================================================== */

    "stafix-agri": [

        {
            id: "stafix-energizers",
            title: "Agricultural Energizers",
            description: "Solar and mains-powered agricultural energizers.",
            icon: "fa-bolt",
            selectionType: "single"
        },

        {
            id: "stafix-wire",
            title: "Agricultural Fence Wire",
            description: "Polywire and agricultural electric fence conductors.",
            icon: "fa-arrows-left-right",
            selectionType: "multiple"
        },

        {
            id: "stafix-accessories",
            title: "Agricultural Fence Accessories",
            description: "Insulators and other agricultural fencing equipment.",
            icon: "fa-toolbox",
            selectionType: "multiple"
        }

    ]

};


/* ==========================================================================
   PRODUCT → SYSTEM GROUP MAPPING
   ========================================================================== */

const PRODUCT_SYSTEM_MAP = {

    /* Electric Fencing */

    "ef-bracket": "ef-brackets",
    "ef-brackets": "ef-brackets",

    "ef-stay": "ef-stays",
    "ef-stays": "ef-stays",

    "ef-sleeve": "ef-sleeves",
    "ef-sleeves": "ef-sleeves",

    "ef-lug": "ef-lugs",
    "ef-lugs": "ef-lugs",

    "ef-anchor": "ef-anchors",
    "ef-anchors": "ef-anchors",

    "ef-wire": "ef-wire",
    "ef-wire-roll": "ef-wire",

    "ef-ferrule": "ef-ferrules",
    "ef-ferrules": "ef-ferrules",

    "ef-tensioner": "ef-tensioners",
    "ef-hook": "ef-tensioners",

    "ef-earth-spike": "ef-earth",
    "ef-earth-loop": "ef-earth",

    "ef-ht": "ef-ht",
    "ef-ht-cable": "ef-ht",

    "ef-warning": "ef-warning",
    "ef-warning-sign": "ef-warning",

    "ef-energizer": "ef-energizers",
    "ef-battery": "ef-battery",
    "ef-power": "ef-power",
    "ef-keypad": "ef-power",
    "ef-enclosure": "ef-enclosure",
    "ef-wifi": "ef-communication",
    "ef-gsm": "ef-communication",
    "ef-siren": "ef-alerts",
    "ef-strobe": "ef-alerts",
    "ef-nite-light": "ef-alerts",


    /* HD CCTV */

    "hd-dvr": "hd-dvr",
    "hd-hdd": "hd-hdd",
    "hd-camera": "hd-cameras",
    "hd-bullet": "hd-cameras",
    "hd-dome": "hd-cameras",
    "hd-varifocal": "hd-varifocal",
    "hd-cable": "hd-cabling",
    "hd-balun": "hd-connectors",
    "hd-bnc": "hd-connectors",
    "hd-junction": "hd-accessories",
    "hd-coax-strip-tool": "hd-accessories",
    "hd-bnc-crimp-tool": "hd-accessories",
    "hd-monitor": "hd-monitors",


    /* IP CCTV */

    "ip-nvr": "ip-nvr",
    "ip-camera": "ip-cameras",
    "ip-cameras": "ip-cameras",
    "ip-cat5e": "ip-cabling",
    "ip-cat6": "ip-cabling",
    "ip-poe-switch": "ip-network",
    "ip-switch": "ip-network",
    "ip-hdd": "ip-storage",
    "ip-accessory": "ip-accessories",


    /* Roboguard */

    "rg-base": "rg-base",
    "rg-base-station": "rg-base",
    "rg-beam": "rg-beams",
    "rg-beams": "rg-beams",
    "rg-solar": "rg-power",
    "rg-solar-panel": "rg-power",
    "rg-battery": "rg-power",
    "rg-accessory": "rg-accessories",


    /* Gate Automation */

    "gate-motor": "gate-motors",
    "centurion-d5-evo": "gate-motors",
    "centurion-d5-smart": "gate-motors",
    "centurion-d10-smart": "gate-motors",

    "gate-rack": "gate-rack",
    "gate-steel-rack": "gate-rack",
    "gate-nylon-rack": "gate-rack",

    "gate-remote": "gate-remotes",
    "gate-remote-4button": "gate-remotes",

    "gate-battery": "gate-power",
    "gate-battery-7ah": "gate-power",

    "gate-anti-theft": "gate-accessories",

    "gate-installation": "gate-installation",


    /* IDS */

    "ids-panel": "ids-panels",
    "ids-805": "ids-panels",
    "ids-x64": "ids-panels",

    "ids-keypad": "ids-keypads",

    "ids-pir": "ids-detectors",
    "ids-detector": "ids-detectors",

    "ids-siren": "ids-alerts",

    "ids-hyyp": "ids-communication",

    "ids-accessory": "ids-accessories",


    /* Ajax */

    "ajax-hub": "ajax-hubs",
    "ajax-hub-2": "ajax-hubs",

    "ajax-motioncam": "ajax-detectors",
    "ajax-doorprotect": "ajax-detectors",

    "ajax-outdoor": "ajax-outdoor",

    "ajax-keypad": "ajax-keypads",

    "ajax-accessory": "ajax-accessories",


    /* Stafix */

    "stafix-energizer": "stafix-energizers",
    "stafix-energizer-2j": "stafix-energizers",
    "stafix-solar-energizer": "stafix-energizers",

    "stafix-polywire": "stafix-wire",

    "stafix-insulator": "stafix-accessories"

};


/* ==========================================================================
   NORMALISE PRODUCT CATEGORY
   ========================================================================== */

function getProductSystemGroup(product) {

    if (!product) {
        return null;
    }

    /*
     * First check explicit mapping.
     */

    if (
        PRODUCT_SYSTEM_MAP[
            product.id
        ]
    ) {

        return PRODUCT_SYSTEM_MAP[
    product.id
] || null;
}


/* ==========================================================================
   SYSTEM PRODUCT HELPERS
   ========================================================================== */

/**
 * Get all products belonging to a specific system.
 */
function getSystemProducts(
    systemId
) {

    if (
        !systemId ||
        !Array.isArray(
            SHOP_PRODUCTS
        )
    ) {
        return [];
    }

    return SHOP_PRODUCTS.filter(
        product => {

            const mapping =
                PRODUCT_SYSTEM_MAP[
                    product.id
                ];

            if (!mapping) {
                return false;
            }

            return (
                mapping.system ===
                systemId
            );
        }
    );
}


/**
 * Get products belonging to a
 * specific system group.
 */
function getSystemGroupProducts(
    systemId,
    groupId
) {

    if (
        !systemId ||
        !groupId
    ) {
        return [];
    }

    return SHOP_PRODUCTS.filter(
        product => {

            const mapping =
                PRODUCT_SYSTEM_MAP[
                    product.id
                ];

            if (!mapping) {
                return false;
            }

            return (
                mapping.system ===
                    systemId &&
                mapping.group ===
                    groupId
            );
        }
    );
}


/**
 * Find a product by its ID.
 */
function getProductById(
    productId
) {

    if (
        !productId ||
        !Array.isArray(
            SHOP_PRODUCTS
        )
    ) {
        return null;
    }

    return (
        SHOP_PRODUCTS.find(
            product =>
                product.id ===
                productId
        ) || null
    );
}


/**
 * Get the system configuration
 * definition.
 */
function getSystemConfig(
    systemId
) {

    if (
        !systemId ||
        !SYSTEM_CONFIGS
    ) {
        return null;
    }

    return (
        SYSTEM_CONFIGS[
            systemId
        ] || null
    );
}


/**
 * Get available product groups
 * for a system.
 */
function getSystemGroups(
    systemId
) {

    const config =
        getSystemConfig(
            systemId
        );

    if (
        !config ||
        !Array.isArray(
            config.groups
        )
    ) {
        return [];
    }

    return config.groups;
}


/* ==========================================================================
   PRODUCT PRICE HELPER
   ========================================================================== */

function getProductPrice(
    productId
) {

    const product =
        getProductById(
            productId
        );

    if (
        !product
    ) {
        return 0;
    }

    const price =
        Number(
            product.price ??
            product.priceExclVat ??
            0
        );

    return Number.isFinite(
        price
    )
        ? price
        : 0;
}


/* ==========================================================================
   PRODUCT DISPLAY HELPER
   ========================================================================== */

function formatSystemPrice(
    price
) {

    const amount =
        Number(price) || 0;

    return (
        "R " +
        amount.toLocaleString(
            "en-ZA",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );
}


/* ==========================================================================
   CONFIGURATOR SYSTEM LIST
   ========================================================================== */

const SYSTEM_CATEGORIES = [

    {
        id: "electric-fencing",
        name: "Electric Fencing",
        icon: "fa-bolt",
        description:
            "Build your electric fence by selecting every component individually."
    },

    {
        id: "cctv-hd",
        name: "HD CCTV",
        icon: "fa-video",
        description:
            "Build a complete HD CCTV system from individual components."
    },

    {
        id: "cctv-ip",
        name: "IP CCTV",
        icon: "fa-network-wired",
        description:
            "Build a network CCTV system with NVRs, cameras, storage and accessories."
    },

    {
        id: "roboguard",
        name: "Roboguard",
        icon: "fa-shield-cat",
        description:
            "Configure a wireless Roboguard outdoor beam detection system."
    },

    {
        id: "gate-motors",
        name: "Gate Automation",
        icon: "fa-door-open",
        description:
            "Select your gate motor, rack, remotes, batteries and accessories."
    },

    {
        id: "ids-alarm",
        name: "IDS Alarm",
        icon: "fa-bell",
        description:
            "Build an IDS alarm system component by component."
    },

    {
        id: "ajax-security",
        name: "Ajax Security",
        icon: "fa-house-lock",
        description:
            "Build an Ajax wireless security system from individual products."
    },

    {
        id: "stafix-agri",
        name: "Stafix Agri",
        icon: "fa-wheat-awn",
        description:
            "Configure an agricultural electric fencing system."
    }

];


/* ==========================================================================
   VAT / CURRENCY HELPERS
   ========================================================================== */

const NEXPAK_VAT_RATE =
    (
        SHOP_DATA &&
        SHOP_DATA.company &&
        Number(
            SHOP_DATA.company.vatRate
        )
    ) || 0.15;


function calculateVat(
    amount
) {

    return (
        Number(amount) || 0
    ) * NEXPAK_VAT_RATE;
}


function calculateInclVat(
    amount
) {

    const subtotal =
        Number(amount) || 0;

    return (
        subtotal +
        calculateVat(
            subtotal
        )
    );
}


/* ==========================================================================
   GLOBAL EXPORTS
   ========================================================================== */

window.NEXPAK_SHOP_DATA =
    SHOP_DATA;

window.SHOP_PRODUCTS =
    SHOP_PRODUCTS;

window.PRODUCT_SYSTEM_MAP =
    PRODUCT_SYSTEM_MAP;

window.SYSTEM_CONFIGS =
    SYSTEM_CONFIGS;

window.SYSTEM_CATEGORIES =
    SYSTEM_CATEGORIES;

window.getProductById =
    getProductById;

window.getSystemProducts =
    getSystemProducts;

window.getSystemGroupProducts =
    getSystemGroupProducts;

window.getSystemConfig =
    getSystemConfig;

window.getSystemGroups =
    getSystemGroups;

window.getProductPrice =
    getProductPrice;

window.formatSystemPrice =
    formatSystemPrice;

window.calculateVat =
    calculateVat;

window.calculateInclVat =
    calculateInclVat;


/* ==========================================================================
   DEBUG
   ========================================================================== */

console.log(
    "Nexpak Shop Data loaded."
);

console.log(
    "Products:",
    SHOP_PRODUCTS.length
);

console.log(
    "System categories:",
    SYSTEM_CATEGORIES.length
);

console.log(
    "Pre-built kits:",
    "REMOVED — Build Your System uses individual products."
);
    // ==========================================================================
// NEXPAK SECURITY SOLUTIONS
// SHOP DATA — PART 5
// CONTINUATION: INDIVIDUAL SYSTEM PRODUCTS
// ==========================================================================


/* ==========================================================================
   CCTV IP PRODUCTS
   ========================================================================== */

SHOP_PRODUCTS.push(

    {
        id: "ip-nvr-4ch-poe",
        name: "4 Channel PoE NVR",
        category: "cctv-ip",
        group: "nvr",
        brand: "Dahua",
        description:
            "4-channel network video recorder with built-in PoE ports.",
        price: 2100.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-nvr-8ch-poe",
        name: "8 Channel PoE NVR",
        category: "cctv-ip",
        group: "nvr",
        brand: "Dahua",
        description:
            "8-channel PoE network video recorder.",
        price: 3400.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-nvr-16ch-poe",
        name: "16 Channel PoE NVR",
        category: "cctv-ip",
        group: "nvr",
        brand: "Dahua",
        description:
            "16-channel professional PoE NVR.",
        price: 5800.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-nvr-32ch",
        name: "32 Channel NVR",
        category: "cctv-ip",
        group: "nvr",
        brand: "Dahua",
        description:
            "32-channel network video recorder without built-in PoE.",
        price: 7900.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "ip-camera-4mp-turret",
        name: "4MP PoE Turret Dome 30m IR",
        category: "cctv-ip",
        group: "ip-cameras",
        brand: "Dahua",
        description:
            "4MP PoE turret camera with infrared night vision.",
        price: 780.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-camera-8mp-bullet",
        name: "8MP 4K Bullet 50m IR",
        category: "cctv-ip",
        group: "ip-cameras",
        brand: "Dahua",
        description:
            "8MP 4K Ultra HD PoE bullet camera with long-range IR.",
        price: 1450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-camera-4mp-ptz",
        name: "4MP Speed Dome PTZ 100m IR",
        category: "cctv-ip",
        group: "ip-cameras",
        brand: "Dahua",
        description:
            "Professional PTZ network camera with 100m infrared range.",
        price: 4800.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "ip-cat5e-100m",
        name: "Cat5e Network Cable 100m",
        category: "cctv-ip",
        group: "network-cable",
        brand: "Nexpak",
        description:
            "100m Cat5e network cable for IP CCTV installations.",
        price: 380.00,
        unit: "roll",
        image: "",
        active: true
    },

    {
        id: "ip-cat6-100m",
        name: "Cat6 Network Cable 100m",
        category: "cctv-ip",
        group: "network-cable",
        brand: "Nexpak",
        description:
            "100m Cat6 network cable for higher-performance installations.",
        price: 520.00,
        unit: "roll",
        image: "",
        active: true
    },


    {
        id: "ip-poe-switch-4",
        name: "4 Port PoE Switch",
        category: "cctv-ip",
        group: "poe-switches",
        brand: "Dahua",
        description:
            "Compact PoE switch for IP camera installations.",
        price: 850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-poe-switch-8",
        name: "8 Port PoE Switch",
        category: "cctv-ip",
        group: "poe-switches",
        brand: "Dahua",
        description:
            "8-port PoE network switch for CCTV systems.",
        price: 1450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-poe-switch-16",
        name: "16 Port PoE Switch",
        category: "cctv-ip",
        group: "poe-switches",
        brand: "Dahua",
        description:
            "Professional 16-port PoE network switch.",
        price: 2650.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "ip-hdd-1tb",
        name: "1TB Surveillance HDD",
        category: "cctv-ip",
        group: "storage",
        brand: "Seagate",
        description:
            "1TB surveillance-grade hard drive.",
        price: 780.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-hdd-2tb",
        name: "2TB Surveillance HDD",
        category: "cctv-ip",
        group: "storage",
        brand: "Seagate",
        description:
            "2TB surveillance-grade hard drive.",
        price: 1150.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-hdd-4tb",
        name: "4TB Surveillance HDD",
        category: "cctv-ip",
        group: "storage",
        brand: "Seagate",
        description:
            "4TB surveillance-grade hard drive.",
        price: 1890.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ip-hdd-6tb",
        name: "6TB Surveillance HDD",
        category: "cctv-ip",
        group: "storage",
        brand: "Seagate",
        description:
            "6TB surveillance-grade hard drive.",
        price: 2950.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "ip-rj45-connectors",
        name: "RJ45 Network Connectors (100pk)",
        category: "cctv-ip",
        group: "connectors",
        brand: "Nexpak",
        description:
            "RJ45 connectors for network CCTV installations.",
        price: 95.00,
        unit: "pack",
        image: "",
        active: true
    },

    {
        id: "ip-junction-box",
        name: "IP Camera Junction Box",
        category: "cctv-ip",
        group: "accessories",
        brand: "Nexpak",
        description:
            "Weather-resistant junction box for IP cameras.",
        price: 95.00,
        unit: "each",
        image: "",
        active: true
    }

);


/* ==========================================================================
   ROBOGUARD PRODUCTS
   ========================================================================== */

SHOP_PRODUCTS.push(

    {
        id: "rg-base-station",
        name: "Roboguard Base Station",
        category: "roboguard",
        group: "base-station",
        brand: "Roboguard",
        description:
            "Wireless Roboguard receiver/base station for outdoor beam detection.",
        price: 2850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-beam-standard",
        name: "Roboguard Wireless Beam",
        category: "roboguard",
        group: "beams",
        brand: "Roboguard",
        description:
            "Wireless outdoor perimeter detection beam.",
        price: 1650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-beam-long-range",
        name: "Roboguard Long Range Beam",
        category: "roboguard",
        group: "beams",
        brand: "Roboguard",
        description:
            "Long-range wireless outdoor beam detector.",
        price: 2250.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-repeater",
        name: "Roboguard Wireless Repeater",
        category: "roboguard",
        group: "repeaters",
        brand: "Roboguard",
        description:
            "Wireless repeater for extending Roboguard system range.",
        price: 1950.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-remote",
        name: "Roboguard Remote",
        category: "roboguard",
        group: "remotes",
        brand: "Roboguard",
        description:
            "Remote control for Roboguard system operation.",
        price: 450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-siren",
        name: "Roboguard External Siren",
        category: "roboguard",
        group: "alerts",
        brand: "Roboguard",
        description:
            "External audible warning siren.",
        price: 650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-strobe",
        name: "Roboguard Strobe Light",
        category: "roboguard",
        group: "alerts",
        brand: "Nexpak",
        description:
            "Visual warning strobe for outdoor detection systems.",
        price: 450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "rg-battery",
        name: "Roboguard Backup Battery",
        category: "roboguard",
        group: "power",
        brand: "Nexpak",
        description:
            "Backup battery for Roboguard equipment.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    }

);


/* ==========================================================================
   GATE AUTOMATION PRODUCTS
   ========================================================================== */

SHOP_PRODUCTS.push(

    {
        id: "gate-d5-evo",
        name: "Centurion D5-Evo Gate Motor",
        category: "gate-motors",
        group: "gate-motors",
        brand: "Centurion",
        description:
            "Sliding gate motor for residential and light commercial applications.",
        price: 4850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-d5-smart",
        name: "Centurion D5 Smart Gate Motor",
        category: "gate-motors",
        group: "gate-motors",
        brand: "Centurion",
        description:
            "Smart sliding gate motor with advanced access features.",
        price: 6050.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-d10-smart",
        name: "Centurion D10 Turbo Smart",
        category: "gate-motors",
        group: "gate-motors",
        brand: "Centurion",
        description:
            "Heavy-duty sliding gate motor for larger gates.",
        price: 9350.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "gate-rack-steel-2m",
        name: "Steel Gate Rack 2m",
        category: "gate-motors",
        group: "rack",
        brand: "Centurion",
        description:
            "2m steel rack section for sliding gate motors.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-rack-nylon-2m",
        name: "Nylon Gate Rack 2m",
        category: "gate-motors",
        group: "rack",
        brand: "Centurion",
        description:
            "2m nylon rack section for sliding gates.",
        price: 250.00,
        unit: "each",
        image: "",
        active: true
    },


    {
        id: "gate-remote-4button",
        name: "Centurion 4-Button Remote",
        category: "gate-motors",
        group: "remotes",
        brand: "Centurion",
        description:
            "Four-button remote control transmitter.",
        price: 220.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-battery-7ah",
        name: "7Ah Gate Motor Battery",
        category: "gate-motors",
        group: "battery",
        brand: "Nexpak",
        description:
            "12V 7Ah backup battery for gate automation.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-anti-theft",
        name: "Heavy Duty Anti-Theft Bracket",
        category: "gate-motors",
        group: "security",
        brand: "Centurion",
        description:
            "Heavy-duty anti-theft protection bracket.",
        price: 550.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-solar-panel",
        name: "Gate Motor Solar Panel",
        category: "gate-motors",
        group: "solar",
        brand: "Nexpak",
        description:
            "Solar charging panel for suitable gate automation installations.",
        price: 1450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "gate-safety-beam",
        name: "Gate Safety Infrared Beam",
        category: "gate-motors",
        group: "safety",
        brand: "Centurion",
        description:
            "Safety beam for detecting vehicles and obstructions.",
        price: 850.00,
        unit: "pair",
        image: "",
        active: true
    }

);

/* ==========================================================================
   IDS ALARM PRODUCTS
   ========================================================================== */

SHOP_PRODUCTS.push(

    {
        id: "ids-805-panel",
        name: "IDS 805 Alarm Panel",
        category: "ids-alarm",
        group: "panels",
        brand: "IDS",
        description:
            "IDS 805 wired intrusion alarm control panel.",
        price: 1250.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-x64-panel",
        name: "IDS X64 Hybrid Alarm Panel",
        category: "ids-alarm",
        group: "panels",
        brand: "IDS",
        description:
            "Hybrid IDS alarm control panel for larger residential and commercial systems.",
        price: 2450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-keypad",
        name: "IDS LCD Keypad",
        category: "ids-alarm",
        group: "keypads",
        brand: "IDS",
        description:
            "LCD alarm keypad for IDS control panels.",
        price: 850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-pir",
        name: "IDS Wired PIR Detector",
        category: "ids-alarm",
        group: "detectors",
        brand: "IDS",
        description:
            "Indoor passive infrared motion detector.",
        price: 220.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-pet-pir",
        name: "IDS Pet-Friendly PIR",
        category: "ids-alarm",
        group: "detectors",
        brand: "IDS",
        description:
            "Pet-friendly indoor PIR motion detector.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-door-contact",
        name: "IDS Magnetic Door Contact",
        category: "ids-alarm",
        group: "contacts",
        brand: "IDS",
        description:
            "Magnetic contact for doors and windows.",
        price: 65.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-siren",
        name: "IDS Indoor Siren",
        category: "ids-alarm",
        group: "sirens",
        brand: "IDS",
        description:
            "Indoor alarm siren.",
        price: 180.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-external-siren",
        name: "IDS External Siren",
        category: "ids-alarm",
        group: "sirens",
        brand: "IDS",
        description:
            "External high-output alarm siren.",
        price: 320.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-strobe",
        name: "IDS Strobe Light",
        category: "ids-alarm",
        group: "alerts",
        brand: "IDS",
        description:
            "Visual alarm warning strobe.",
        price: 240.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-hyyp-module",
        name: "IDS HYYP Communication Module",
        category: "ids-alarm",
        group: "communication",
        brand: "IDS",
        description:
            "Communication module for remote alarm monitoring and notifications.",
        price: 1450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-battery-7ah",
        name: "7Ah Alarm Backup Battery",
        category: "ids-alarm",
        group: "battery",
        brand: "Nexpak",
        description:
            "12V 7Ah rechargeable backup battery.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-transformer",
        name: "IDS Alarm Transformer",
        category: "ids-alarm",
        group: "power",
        brand: "IDS",
        description:
            "Replacement power transformer for compatible IDS alarm systems.",
        price: 450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ids-enclosure",
        name: "IDS Metal Alarm Enclosure",
        category: "ids-alarm",
        group: "enclosures",
        brand: "IDS",
        description:
            "Metal enclosure for IDS alarm control equipment and backup battery.",
        price: 650.00,
        unit: "each",
        image: "",
        active: true
    }

);


/* ==========================================================================
   AJAX SECURITY PRODUCTS
   ========================================================================== */

SHOP_PRODUCTS.push(

    {
        id: "ajax-hub-2",
        name: "Ajax Hub 2",
        category: "ajax-security",
        group: "hubs",
        brand: "Ajax",
        description:
            "Wireless Jeweller security hub for Ajax intrusion protection.",
        price: 3850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-hub-2-plus",
        name: "Ajax Hub 2 Plus",
        category: "ajax-security",
        group: "hubs",
        brand: "Ajax",
        description:
            "Advanced Ajax security hub supporting larger installations and multiple communication channels.",
        price: 5200.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-keypad",
        name: "Ajax KeyPad",
        category: "ajax-security",
        group: "keypads",
        brand: "Ajax",
        description:
            "Wireless touch keypad for Ajax security systems.",
        price: 1450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-motionprotect",
        name: "Ajax MotionProtect",
        category: "ajax-security",
        group: "motion-detectors",
        brand: "Ajax",
        description:
            "Wireless indoor motion detector.",
        price: 850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-motioncam",
        name: "Ajax MotionCam",
        category: "ajax-security",
        group: "motion-detectors",
        brand: "Ajax",
        description:
            "Wireless motion detector with photo verification.",
        price: 1650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-motionprotect-curtain",
        name: "Ajax MotionProtect Curtain",
        category: "ajax-security",
        group: "motion-detectors",
        brand: "Ajax",
        description:
            "Wireless curtain-type motion detector for perimeter protection.",
        price: 1350.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-doorprotect",
        name: "Ajax DoorProtect",
        category: "ajax-security",
        group: "contacts",
        brand: "Ajax",
        description:
            "Wireless opening detector for doors and windows.",
        price: 650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-glassprotect",
        name: "Ajax GlassProtect",
        category: "ajax-security",
        group: "detectors",
        brand: "Ajax",
        description:
            "Wireless glass-break detector.",
        price: 850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-outdoorprotect",
        name: "Ajax MotionProtect Outdoor",
        category: "ajax-security",
        group: "outdoor-detectors",
        brand: "Ajax",
        description:
            "Wireless outdoor motion detector with advanced false-alarm protection.",
        price: 1950.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-street-siren",
        name: "Ajax StreetSiren",
        category: "ajax-security",
        group: "sirens",
        brand: "Ajax",
        description:
            "Wireless outdoor siren with visual indication.",
        price: 1650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-home-siren",
        name: "Ajax HomeSiren",
        category: "ajax-security",
        group: "sirens",
        brand: "Ajax",
        description:
            "Wireless indoor siren.",
        price: 1150.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-spacecontrol",
        name: "Ajax SpaceControl",
        category: "ajax-security",
        group: "remotes",
        brand: "Ajax",
        description:
            "Wireless key fob for controlling Ajax security systems.",
        price: 650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-button",
        name: "Ajax Button",
        category: "ajax-security",
        group: "panic",
        brand: "Ajax",
        description:
            "Wireless panic button for emergency activation.",
        price: 650.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-rex-2",
        name: "Ajax ReX 2",
        category: "ajax-security",
        group: "repeaters",
        brand: "Ajax",
        description:
            "Wireless range extender for Ajax Jeweller devices.",
        price: 2450.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-12vpsu",
        name: "Ajax 12V PSU",
        category: "ajax-security",
        group: "power",
        brand: "Ajax",
        description:
            "12V power supply for compatible Ajax hub installations.",
        price: 850.00,
        unit: "each",
        image: "",
        active: true
    },

    {
        id: "ajax-battery",
        name: "Ajax Backup Battery",
        category: "ajax-security",
        group: "battery",
        brand: "Nexpak",
        description:
            "Backup battery for compatible security system installations.",
        price: 280.00,
        unit: "each",
        image: "",
        active: true
    }

);
  /* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   SHOP DATA — PART 7
   INDIVIDUAL PRODUCT CATALOG
   ========================================================================== */


/* ==========================================================================
   7. GATE AUTOMATION PRODUCTS
   ========================================================================== */

PRODUCTS.push(

    {
        id: "gate-centurion-d5-evo",
        name: "Centurion D5-Evo Sliding Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "gate-motor",
        brand: "Centurion",
        description:
            "Professional sliding gate automation motor for residential and light commercial applications.",
        price: 4950.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "gate-centurion-d5-smart",
        name: "Centurion D5 Smart Sliding Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "gate-motor",
        brand: "Centurion",
        description:
            "Smart sliding gate motor with advanced access and monitoring functionality.",
        price: 6150.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "gate-centurion-d10-smart",
        name: "Centurion D10 Smart Sliding Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "gate-motor",
        brand: "Centurion",
        description:
            "Heavy-duty sliding gate automation solution for larger and heavier gates.",
        price: 9450.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-centurion-d10-turbo",
        name: "Centurion D10 Turbo Sliding Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "gate-motor",
        brand: "Centurion",
        description:
            "High-performance sliding gate motor designed for demanding installations.",
        price: 10950.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-centurion-vantage-400",
        name: "Centurion Vantage 400 Swing Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "swing-motor",
        brand: "Centurion",
        description:
            "Professional swing gate automation motor for residential and commercial gates.",
        price: 6350.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "gate-centurion-vantage-500",
        name: "Centurion Vantage 500 Swing Gate Motor",
        category: "gate-motors",
        system: "gate-motors",
        group: "swing-motor",
        brand: "Centurion",
        description:
            "Heavy-duty swing gate automation system for larger gate applications.",
        price: 7850.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-steel-rack-2m",
        name: "Steel Gate Motor Rack - 2m",
        category: "gate-motors",
        system: "gate-motors",
        group: "rack",
        brand: "Centurion",
        description:
            "Heavy-duty steel rack for sliding gate automation.",
        price: 280.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-nylon-rack-2m",
        name: "Nylon Gate Motor Rack - 2m",
        category: "gate-motors",
        system: "gate-motors",
        group: "rack",
        brand: "Centurion",
        description:
            "Nylon rack section for compatible sliding gate motors.",
        price: 250.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-remote-4button",
        name: "4-Button Gate Remote",
        category: "gate-motors",
        system: "gate-motors",
        group: "remote",
        brand: "Centurion",
        description:
            "Four-button remote transmitter for compatible gate automation systems.",
        price: 220.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-remote-2button",
        name: "2-Button Gate Remote",
        category: "gate-motors",
        system: "gate-motors",
        group: "remote",
        brand: "Centurion",
        description:
            "Two-button remote transmitter for compatible gate automation systems.",
        price: 195.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-battery-7ah",
        name: "7Ah Gate Motor Backup Battery",
        category: "gate-motors",
        system: "gate-motors",
        group: "battery",
        brand: "Nexpak",
        description:
            "12V 7Ah rechargeable backup battery for gate automation systems.",
        price: 280.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-battery-9ah",
        name: "9Ah Gate Motor Backup Battery",
        category: "gate-motors",
        system: "gate-motors",
        group: "battery",
        brand: "Nexpak",
        description:
            "12V 9Ah rechargeable backup battery for gate automation systems.",
        price: 420.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-anti-theft-bracket",
        name: "Heavy-Duty Anti-Theft Gate Motor Bracket",
        category: "gate-motors",
        system: "gate-motors",
        group: "security",
        brand: "Nexpak",
        description:
            "Heavy-duty security bracket designed to help protect sliding gate motors.",
        price: 550.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-ground-stop",
        name: "Gate Ground Stop",
        category: "gate-motors",
        system: "gate-motors",
        group: "hardware",
        brand: "Nexpak",
        description:
            "Heavy-duty gate stop for controlled sliding gate positioning.",
        price: 165.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "gate-loop-detector",
        name: "Vehicle Loop Detector",
        category: "gate-motors",
        system: "gate-motors",
        group: "accessory",
        brand: "Nexpak",
        description:
            "Vehicle detection loop controller for automated gate access applications.",
        price: 890.00,
        image: "",
        featured: false,
        stock: true
    }

);


/* ==========================================================================
   8. IDS ALARM PRODUCTS
   ========================================================================== */

PRODUCTS.push(

    {
        id: "ids-805",
        name: "IDS 805 Alarm Panel",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "alarm-panel",
        brand: "IDS",
        description:
            "Reliable wired intrusion alarm control panel for residential and small commercial installations.",
        price: 950.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ids-x64",
        name: "IDS X64 Alarm Panel",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "alarm-panel",
        brand: "IDS",
        description:
            "Expandable hybrid alarm panel for larger residential and commercial security systems.",
        price: 1850.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ids-keypad",
        name: "IDS LCD Alarm Keypad",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "keypad",
        brand: "IDS",
        description:
            "LCD keypad for programming and controlling compatible IDS alarm panels.",
        price: 850.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-pir",
        name: "IDS PIR Motion Detector",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "detector",
        brand: "IDS",
        description:
            "Indoor PIR motion detector for reliable intrusion detection.",
        price: 280.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ids-pet-pir",
        name: "IDS Pet-Friendly PIR Detector",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "detector",
        brand: "IDS",
        description:
            "Pet-tolerant PIR detector for indoor residential applications.",
        price: 350.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-door-contact",
        name: "IDS Magnetic Door Contact",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "contact",
        brand: "IDS",
        description:
            "Magnetic reed contact for doors, windows and other protected openings.",
        price: 85.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-outdoor-beam",
        name: "IDS Outdoor Beam Detector",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "outdoor-detector",
        brand: "IDS",
        description:
            "Outdoor perimeter beam detector for early intrusion detection.",
        price: 950.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-siren",
        name: "IDS 15W Alarm Siren",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "siren",
        brand: "IDS",
        description:
            "High-output indoor or outdoor security alarm siren.",
        price: 120.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-strobe",
        name: "IDS Strobe Warning Light",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "strobe",
        brand: "IDS",
        description:
            "Visual alarm indicator for indoor or outdoor security installations.",
        price: 145.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-hyyp-module",
        name: "IDS HYYP GSM/IP Communication Module",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "communication",
        brand: "IDS",
        description:
            "Remote alarm communication module for compatible IDS alarm systems.",
        price: 1450.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ids-psu-16a",
        name: "IDS 16A Power Supply",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "power-supply",
        brand: "IDS",
        description:
            "16 Amp power supply for alarm and security system installations.",
        price: 350.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ids-battery-7ah",
        name: "7Ah Alarm Backup Battery",
        category: "ids-alarm",
        system: "ids-alarm",
        group: "battery",
        brand: "Nexpak",
        description:
            "12V 7Ah rechargeable standby battery for alarm systems.",
        price: 280.00,
        image: "",
        featured: false,
        stock: true
    }

);


/* ==========================================================================
   9. AJAX SECURITY PRODUCTS
   ========================================================================== */

PRODUCTS.push(

    {
        id: "ajax-hub-2",
        name: "Ajax Hub 2",
        category: "ajax-security",
        system: "ajax-security",
        group: "hub",
        brand: "Ajax",
        description:
            "Wireless security hub for professional intrusion detection systems.",
        price: 3950.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-hub-2-plus",
        name: "Ajax Hub 2 Plus",
        category: "ajax-security",
        system: "ajax-security",
        group: "hub",
        brand: "Ajax",
        description:
            "Advanced wireless security hub with expanded communication capabilities.",
        price: 5450.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-motionprotect",
        name: "Ajax MotionProtect",
        category: "ajax-security",
        system: "ajax-security",
        group: "motion-detector",
        brand: "Ajax",
        description:
            "Wireless indoor motion detector with advanced false-alarm protection.",
        price: 950.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-motionprotect-outdoor",
        name: "Ajax MotionProtect Outdoor",
        category: "ajax-security",
        system: "ajax-security",
        group: "outdoor-detector",
        brand: "Ajax",
        description:
            "Wireless outdoor motion detector for perimeter protection.",
        price: 2150.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-doorprotect",
        name: "Ajax DoorProtect",
        category: "ajax-security",
        system: "ajax-security",
        group: "door-contact",
        brand: "Ajax",
        description:
            "Wireless magnetic opening detector for doors and windows.",
        price: 650.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ajax-fireprotect",
        name: "Ajax FireProtect",
        category: "ajax-security",
        system: "ajax-security",
        group: "fire-detector",
        brand: "Ajax",
        description:
            "Wireless smoke and heat detector for residential and commercial protection.",
        price: 1150.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ajax-keypad",
        name: "Ajax KeyPad",
        category: "ajax-security",
        system: "ajax-security",
        group: "keypad",
        brand: "Ajax",
        description:
            "Wireless keypad for arming and disarming Ajax security systems.",
        price: 1450.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-spacecontrol",
        name: "Ajax SpaceControl Remote",
        category: "ajax-security",
        system: "ajax-security",
        group: "remote",
        brand: "Ajax",
        description:
            "Compact wireless remote control for Ajax security systems.",
        price: 850.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ajax-street-siren",
        name: "Ajax StreetSiren",
        category: "ajax-security",
        system: "ajax-security",
        group: "siren",
        brand: "Ajax",
        description:
            "Wireless outdoor siren with visual alarm indication.",
        price: 1750.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "ajax-street-siren-doubledeck",
        name: "Ajax StreetSiren DoubleDeck",
        category: "ajax-security",
        system: "ajax-security",
        group: "siren",
        brand: "Ajax",
        description:
            "Advanced wireless outdoor siren with enhanced visibility.",
        price: 2250.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "ajax-transmitter",
        name: "Ajax Transmitter",
        category: "ajax-security",
        system: "ajax-security",
        group: "integration",
        brand: "Ajax",
        description:
            "Wireless integration module for connecting third-party wired devices.",
        price: 1250.00,
        image: "",
        featured: false,
        stock: true
    }

);


/* ==========================================================================
   10. STAFIX AGRICULTURAL FENCING PRODUCTS
   ========================================================================== */

PRODUCTS.push(

    {
        id: "stafix-energizer-1j",
        name: "Stafix 1 Joule Energizer",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "energizer",
        brand: "Stafix",
        description:
            "Agricultural electric fence energizer for smaller livestock and perimeter applications.",
        price: 1850.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-energizer-3j",
        name: "Stafix 3 Joule Energizer",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "energizer",
        brand: "Stafix",
        description:
            "Medium-duty agricultural electric fence energizer.",
        price: 2950.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "stafix-energizer-6j",
        name: "Stafix 6 Joule Energizer",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "energizer",
        brand: "Stafix",
        description:
            "High-output agricultural energizer for larger perimeter fencing.",
        price: 4650.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-solar-energizer",
        name: "Stafix Solar Electric Fence Energizer",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "solar-energizer",
        brand: "Stafix",
        description:
            "Solar-powered electric fence energizer for agricultural and remote installations.",
        price: 4250.00,
        image: "",
        featured: true,
        stock: true
    },

    {
        id: "stafix-braid-wire",
        name: "Stafix Electric Fence Polywire",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "wire",
        brand: "Stafix",
        description:
            "High-visibility conductive polywire for agricultural electric fencing.",
        price: 450.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-polyrope",
        name: "Stafix Electric Fence Polyrope",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "wire",
        brand: "Stafix",
        description:
            "Conductive electric fence polyrope for livestock fencing.",
        price: 650.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-tensioner",
        name: "Stafix Wire Tensioner",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "tensioner",
        brand: "Stafix",
        description:
            "Heavy-duty tensioner for agricultural electric fence wire.",
        price: 85.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-insulator",
        name: "Stafix Electric Fence Insulator",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "insulator",
        brand: "Stafix",
        description:
            "Electric fence insulator for agricultural fence posts.",
        price: 18.00,
        image: "",
        featured: false,
        stock: true
    },

    {
        id: "stafix-earth-spike",
        name: "Stafix Galvanised Earth Spike",
        category: "stafix-agri",
        system: "stafix-agri",
        group: "earthing",
        brand: "Stafix",
        description:
            "Galvanised earth spike for agricultural electric fence earthing systems.",
        price: 85.00,
        image: "",
        featured: false,
        stock: true
    }

);


/* ==========================================================================
   END OF PART 7
   ========================================================================== */

/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   SHOP DATA — PART 8
   SYSTEM MAP + CONFIGURATOR HELPERS + EXPORTS
   ========================================================================== */


/* ==========================================================================
   8. SYSTEM PRODUCT MAP
   ========================================================================== */

const PRODUCT_SYSTEM_MAP = {

    "electric-fencing": {
        title: "Build Your Electric Fence System",
        description:
            "Select every component required for your electric fencing installation.",
        groups: [
            "energizer",
            "bracket",
            "bracket-lines",
            "bracket-colour",
            "bracket-profile",
            "bracket-style",
            "stay",
            "stay-sleeve",
            "lugs",
            "anchors",
            "wire",
            "ferrules",
            "tensioner",
            "hooks",
            "earth-spike",
            "ht-cable",
            "earth-loop",
            "warning-sign",
            "gate-contact",
            "battery",
            "power-supply",
            "keypad",
            "enclosure",
            "communication",
            "siren",
            "strobe",
            "nite-light",
            "installation"
        ]
    },

    "cctv-hd": {
        title: "Build Your HD CCTV System",
        description:
            "Choose your cameras, DVR, storage, cabling, power and installation components.",
        groups: [
            "camera-brand",
            "dvr",
            "hdd",
            "power-supply",
            "camera",
            "varifocal-camera",
            "cable",
            "connector",
            "balun",
            "joint-box",
            "monitor",
            "tool",
            "installation"
        ]
    },

    "cctv-ip": {
        title: "Build Your IP CCTV System",
        description:
            "Configure your network surveillance system component by component.",
        groups: [
            "ip-brand",
            "nvr",
            "ip-camera",
            "poe-switch",
            "hdd",
            "network-cable",
            "connector",
            "monitor",
            "cabinet",
            "ups",
            "installation"
        ]
    },

    "roboguard": {
        title: "Build Your Roboguard System",
        description:
            "Configure your wireless outdoor early-warning beam security system.",
        groups: [
            "base-station",
            "beam",
            "receiver",
            "transmitter",
            "battery",
            "solar",
            "bracket",
            "cable",
            "siren",
            "strobe",
            "remote",
            "installation"
        ]
    },

    "gate-motors": {
        title: "Build Your Gate Automation System",
        description:
            "Select your gate motor and all required automation accessories.",
        groups: [
            "gate-motor",
            "swing-motor",
            "rack",
            "remote",
            "battery",
            "security",
            "hardware",
            "accessory",
            "loop-detector",
            "installation"
        ]
    },

    "ids-alarm": {
        title: "Build Your IDS Alarm System",
        description:
            "Build an IDS alarm system by selecting every required component.",
        groups: [
            "alarm-panel",
            "keypad",
            "detector",
            "outdoor-detector",
            "contact",
            "siren",
            "strobe",
            "communication",
            "power-supply",
            "battery",
            "enclosure",
            "installation"
        ]
    },

    "ajax-security": {
        title: "Build Your Ajax Security System",
        description:
            "Configure your Ajax wireless security system from individual products.",
        groups: [
            "hub",
            "motion-detector",
            "outdoor-detector",
            "door-contact",
            "fire-detector",
            "keypad",
            "remote",
            "siren",
            "integration",
            "battery",
            "installation"
        ]
    },

    "stafix-agri": {
        title: "Build Your Stafix Agricultural Fence",
        description:
            "Configure an agricultural electric fencing system component by component.",
        groups: [
            "energizer",
            "solar-energizer",
            "wire",
            "tensioner",
            "insulator",
            "earthing",
            "battery",
            "installation"
        ]
    }

};


/* ==========================================================================
   9. PRODUCT LOOKUP
   ========================================================================== */

function getProductById(productId) {

    return PRODUCTS.find(
        product => product.id === productId
    );

}


/* ==========================================================================
   10. GET PRODUCTS FOR A SYSTEM
   ========================================================================== */

function getProductsForSystem(systemId) {

    if (
        !PRODUCT_SYSTEM_MAP[
            systemId
        ]
    ) {

        return [];

    }

    return PRODUCTS.filter(
        product =>
            product.system === systemId
    );

}


/* ==========================================================================
   11. GET PRODUCTS BY GROUP
   ========================================================================== */

function getProductsByGroup(
    systemId,
    group
) {

    return PRODUCTS.filter(
        product =>
            product.system === systemId &&
            product.group === group
    );

}


/* ==========================================================================
   12. GET SYSTEM CONFIGURATION
   ========================================================================== */

function getSystemConfiguration(
    systemId
) {

    return PRODUCT_SYSTEM_MAP[
        systemId
    ] || null;

}


/* ==========================================================================
   13. SEARCH PRODUCTS
   ========================================================================== */

function searchProducts(
    searchTerm
) {

    const term =
        String(
            searchTerm || ""
        )
            .trim()
            .toLowerCase();

    if (!term) {

        return PRODUCTS;

    }

    return PRODUCTS.filter(
        product => {

            const searchableText =
                [
                    product.name,
                    product.brand,
                    product.category,
                    product.system,
                    product.group,
                    product.description
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

            return searchableText.includes(
                term
            );

        }
    );

}


/* ==========================================================================
   14. GET PRODUCTS BY CATEGORY
   ========================================================================== */

function getProductsByCategory(
    categoryId
) {

    return PRODUCTS.filter(
        product =>
            product.category === categoryId
    );

}


/* ==========================================================================
   15. GET PRODUCTS BY BRAND
   ========================================================================== */

function getProductsByBrand(
    brand
) {

    const selectedBrand =
        String(
            brand || ""
        )
            .trim()
            .toLowerCase();

    return PRODUCTS.filter(
        product =>
            String(
                product.brand || ""
            )
                .toLowerCase() ===
            selectedBrand
    );

}


/* ==========================================================================
   16. PRICE CALCULATION
   ========================================================================== */

function calculateProductTotal(
    productId,
    quantity
) {

    const product =
        getProductById(
            productId
        );

    if (!product) {

        return 0;

    }

    const qty =
        Math.max(
            0,
            Number(quantity) || 0
        );

    return (
        Number(product.price) *
        qty
    );

}


/* ==========================================================================
   17. SYSTEM SUBTOTAL
   ========================================================================== */

function calculateSystemSubtotal(
    selections
) {

    let subtotal = 0;

    if (
        !selections ||
        typeof selections !== "object"
    ) {

        return subtotal;

    }

    Object.keys(
        selections
    ).forEach(
        productId => {

            const quantity =
                Number(
                    selections[
                        productId
                    ]
                ) || 0;

            subtotal +=
                calculateProductTotal(
                    productId,
                    quantity
                );

        }
    );

    return subtotal;

}


/* ==========================================================================
   18. VAT CALCULATION
   ========================================================================== */

function calculateVat(
    subtotal
) {

    const rate =
        SHOP_DATA.company.vatRate;

    return (
        Number(subtotal || 0) *
        rate
    );

}


/* ==========================================================================
   19. GRAND TOTAL
   ========================================================================== */

function calculateGrandTotal(
    subtotal
) {

    return (
        Number(subtotal || 0) +
        calculateVat(
            subtotal
        )
    );

}


/* ==========================================================================
   20. FORMAT CURRENCY
   ========================================================================== */

function formatZAR(
    amount
) {

    return new Intl.NumberFormat(
        "en-ZA",
        {
            style: "currency",
            currency: "ZAR",
            minimumFractionDigits: 2
        }
    ).format(
        Number(amount) || 0
    );

}


/* ==========================================================================
   21. GET SYSTEM PRODUCT COUNT
   ========================================================================== */

function getSystemProductCount(
    systemId
) {

    return getProductsForSystem(
        systemId
    ).length;

}


/* ==========================================================================
   22. GET AVAILABLE SYSTEM GROUPS
   ========================================================================== */

function getAvailableSystemGroups(
    systemId
) {

    const products =
        getProductsForSystem(
            systemId
        );

    return [
        ...new Set(
            products
                .map(
                    product =>
                        product.group
                )
                .filter(Boolean)
        )
    ];

}


/* ==========================================================================
   23. PRODUCT AVAILABILITY
   ========================================================================== */

function isProductAvailable(
    productId
) {

    const product =
        getProductById(
            productId
        );

    if (!product) {

        return false;

    }

    return product.stock !== false;

}


/* ==========================================================================
   24. GET AVAILABLE PRODUCTS ONLY
   ========================================================================== */

function getAvailableProducts(
    systemId
) {

    return getProductsForSystem(
        systemId
    ).filter(
        product =>
            product.stock !== false
    );

}


/* ==========================================================================
   25. SYSTEM SUMMARY
   ========================================================================== */

function getSystemSummary(
    systemId
) {

    const config =
        getSystemConfiguration(
            systemId
        );

    const products =
        getProductsForSystem(
            systemId
        );

    if (!config) {

        return null;

    }

    return {

        id: systemId,

        title:
            config.title,

        description:
            config.description,

        productCount:
            products.length,

        groups:
            getAvailableSystemGroups(
                systemId
            ),

        products:
            products

    };

}


/* ==========================================================================
   26. SHOP DATA EXPORT OBJECT
   ========================================================================== */

const NEXPAK_SHOP_DATA = {

    company:
        SHOP_DATA.company,

    categories:
        SHOP_DATA.categories,

    products:
        PRODUCTS,

    systemMap:
        PRODUCT_SYSTEM_MAP,

    getProductById:
        getProductById,

    getProductsForSystem:
        getProductsForSystem,

    getProductsByGroup:
        getProductsByGroup,

    getProductsByCategory:
        getProductsByCategory,

    getProductsByBrand:
        getProductsByBrand,

    searchProducts:
        searchProducts,

    getSystemConfiguration:
        getSystemConfiguration,

    getSystemSummary:
        getSystemSummary,

    calculateProductTotal:
        calculateProductTotal,

    calculateSystemSubtotal:
        calculateSystemSubtotal,

    calculateVat:
        calculateVat,

    calculateGrandTotal:
        calculateGrandTotal,

    formatZAR:
        formatZAR,

    isProductAvailable:
        isProductAvailable,

    getAvailableProducts:
        getAvailableProducts

};


/* ==========================================================================
   27. GLOBAL ACCESS
   ========================================================================== */

window.SHOP_DATA =
    SHOP_DATA;

window.PRODUCTS =
    PRODUCTS;

window.PRODUCT_SYSTEM_MAP =
    PRODUCT_SYSTEM_MAP;

window.NEXPAK_SHOP_DATA =
    NEXPAK_SHOP_DATA;

window.getProductById =
    getProductById;

window.getProductsForSystem =
    getProductsForSystem;

window.getProductsByGroup =
    getProductsByGroup;

window.getProductsByCategory =
    getProductsByCategory;

window.getProductsByBrand =
    getProductsByBrand;

window.searchProducts =
    searchProducts;

window.getSystemConfiguration =
    getSystemConfiguration;

window.getSystemSummary =
    getSystemSummary;

window.calculateProductTotal =
    calculateProductTotal;

window.calculateSystemSubtotal =
    calculateSystemSubtotal;

window.calculateVat =
    calculateVat;

window.calculateGrandTotal =
    calculateGrandTotal;

window.formatZAR =
    formatZAR;

window.isProductAvailable =
    isProductAvailable;

window.getAvailableProducts =
    getAvailableProducts;


/* ==========================================================================
   28. DATABASE VALIDATION
   ========================================================================== */

(function validateShopDatabase() {

    console.log(
        "=============================================="
    );

    console.log(
        "NEXPAK SECURITY SOLUTIONS"
    );

    console.log(
        "Individual Product Database Loaded"
    );

    console.log(
        "Total products:",
        PRODUCTS.length
    );

    console.log(
        "Total categories:",
        SHOP_DATA.categories.length
    );

    console.log(
        "Pre-built kits:",
        "REMOVED — Build Your System uses individual products."
    );

    Object.keys(
        PRODUCT_SYSTEM_MAP
    ).forEach(
        systemId => {

            console.log(
                systemId +
                ":",
                getSystemProductCount(
                    systemId
                ),
                "products"
            );

        }
    );

    console.log(
        "=============================================="
    );

})();


/* ==========================================================================
   END OF SHOP-DATA.JS
   ========================================================================== */
