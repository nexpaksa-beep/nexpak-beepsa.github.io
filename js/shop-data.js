/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   SHOP DATA — MASTER PRODUCT & SYSTEM DATABASE
   shop-data.js
   ==========================================================================

   PURPOSE:
   - Master database for the Nexpak Security Solutions website
   - Used by:
       shop.js / shop-v17.js
       product.js
       configurator.js
       cart.js
       delivery.js
       checkout.js
       payment.js

   IMPORTANT:
   - NO PRE-BUILT KITS ARE STORED HERE.
   - The online SHOP already contains the pre-built kits.
   - "Build Your System" uses INDIVIDUAL PRODUCTS ONLY.
   - All prices are EXCLUDING 15% VAT.
   - All prices are in South African Rand (ZAR).

   SYSTEMS:
   1. Electric Fencing
   2. CCTV HD
   3. IP CCTV
   4. Roboguard
   5. Gate Automation
   6. IDS Alarm
   7. Ajax Security
   8. Stafix Agri Fencing

   ========================================================================== */


const SHOP_DATA = {

    /* ======================================================================
       1. COMPANY SETTINGS
       ====================================================================== */

    company: {

        name:
            "Nexpak Security Solutions",

        whatsapp:
            "27836308249",

        currency:
            "ZAR",

        vatRate:
            0.15

    },


    /* ======================================================================
       2. MASTER CATEGORY LIST
       ====================================================================== */

    categories: [

        {
            id:
                "electric-fencing",

            title:
                "Electric Fencing",

            desc:
                "Electric fence brackets, stays, wire, energizers, earthing, high-tension cable, accessories and installation products.",

            icon:
                "fa-bolt"
        },


        {
            id:
                "cctv-hd",

            title:
                "CCTV HD Systems",

            desc:
                "HD analogue surveillance cameras, DVRs, hard drives, cabling, baluns, power supplies and CCTV accessories.",

            icon:
                "fa-video"
        },


        {
            id:
                "cctv-ip",

            title:
                "IP CCTV Systems",

            desc:
                "Network surveillance cameras, PoE NVRs, network switches, storage, Cat5e/Cat6 cabling and IP CCTV accessories.",

            icon:
                "fa-network-wired"
        },


        {
            id:
                "roboguard",

            title:
                "Roboguard Outdoor Beams",

            desc:
                "Wireless outdoor beam detection systems, receivers, transmitters, batteries, brackets and Roboguard accessories.",

            icon:
                "fa-shield-halved"
        },


        {
            id:
                "gate-motors",

            title:
                "Gate Automation",

            desc:
                "Centurion gate motors, rack, remotes, batteries, brackets, safety accessories and gate automation equipment.",

            icon:
                "fa-door-open"
        },


        {
            id:
                "ids-alarm",

            title:
                "IDS Alarm Systems",

            desc:
                "IDS wired and hybrid alarm panels, PIRs, keypads, sirens, batteries, communication modules and accessories.",

            icon:
                "fa-bell"
        },


        {
            id:
                "ajax-security",

            title:
                "Ajax Wireless Security",

            desc:
                "Ajax wireless security hubs, motion detectors, outdoor detectors, keypads, sirens and Jeweller accessories.",

            icon:
                "fa-house-lock"
        },


        {
            id:
                "stafix-agri",

            title:
                "Stafix Agri Fencing",

            desc:
                "Agricultural electric fencing equipment including energizers, solar equipment, wire, insulators, posts and accessories.",

            icon:
                "fa-wheat-awn"
        }

    ],


    /* ======================================================================
       3. INDIVIDUAL PRODUCT DATABASE
       ======================================================================

       IMPORTANT:

       Every product below is an INDIVIDUAL PRODUCT.

       There are NO:
           prebuiltKits
           baseKit
           kit selections

       The Build Your System configurator simply allows customers to select
       these products and specify quantities.

       ====================================================================== */

    products: {


        /* ==================================================================
           A. ELECTRIC FENCING
           ================================================================== */

        "electric-fencing": [

            {
                id:
                    "ef-walltop-bracket",

                name:
                    "Wall Top Electric Fence Bracket",

                group:
                    "brackets",

                brand:
                    "Nexpak",

                description:
                    "Wall-top electric fence bracket for mounting multiple electric fence strands.",

                price:
                    85.00,

                unit:
                    "each",

                weightKg:
                    0.45,

                image:
                    ""
            },


            {
                id:
                    "ef-bracket-6line",

                name:
                    "6-Line Electric Fence Bracket",

                group:
                    "brackets",

                brand:
                    "Nexpak",

                description:
                    "6-line electric fence bracket for standard residential and commercial installations.",

                price:
                    95.00,

                unit:
                    "each",

                weightKg:
                    0.50,

                image:
                    ""
            },


            {
                id:
                    "ef-bracket-8line",

                name:
                    "8-Line Electric Fence Bracket",

                group:
                    "brackets",

                brand:
                    "Nexpak",

                description:
                    "8-line electric fence bracket for increased perimeter protection.",

                price:
                    110.00,

                unit:
                    "each",

                weightKg:
                    0.60,

                image:
                    ""
            },


            {
                id:
                    "ef-bracket-10line",

                name:
                    "10-Line Electric Fence Bracket",

                group:
                    "brackets",

                brand:
                    "Nexpak",

                description:
                    "10-line heavy-duty electric fence bracket.",

                price:
                    125.00,

                unit:
                    "each",

                weightKg:
                    0.70,

                image:
                    ""
            },


            {
                id:
                    "ef-bracket-12line",

                name:
                    "12-Line Electric Fence Bracket",

                group:
                    "brackets",

                brand:
                    "Nexpak",

                description:
                    "12-line high-security electric fence bracket.",

                price:
                    145.00,

                unit:
                    "each",

                weightKg:
                    0.80,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-600-black",

                name:
                    "600mm Black Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "600mm black stay for electric fence corners and end points.",

                price:
                    42.00,

                unit:
                    "each",

                weightKg:
                    0.50,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-600-white",

                name:
                    "600mm White Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "600mm white stay for electric fence corners and end points.",

                price:
                    42.00,

                unit:
                    "each",

                weightKg:
                    0.50,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-600-galv",

                name:
                    "600mm Galvanised Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "600mm galvanised stay for electric fence corners and end points.",

                price:
                    48.00,

                unit:
                    "each",

                weightKg:
                    0.55,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-750-black",

                name:
                    "750mm Black Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "750mm heavy-duty black stay for larger electric fence structures.",

                price:
                    55.00,

                unit:
                    "each",

                weightKg:
                    0.65,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-750-white",

                name:
                    "750mm White Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "750mm heavy-duty white stay for larger electric fence structures.",

                price:
                    55.00,

                unit:
                    "each",

                weightKg:
                    0.65,

                image:
                    ""
            },


            {
                id:
                    "ef-stay-750-galv",

                name:
                    "750mm Galvanised Electric Fence Stay",

                group:
                    "stays",

                brand:
                    "Nexpak",

                description:
                    "750mm heavy-duty galvanised stay for larger electric fence structures.",

                price:
                    62.00,

                unit:
                    "each",

                weightKg:
                    0.70,

                image:
                    ""
            },


            {
                id:
                    "ef-anchor-6x60",

                name:
                    "6 x 60mm Nail-In Anchors",

                group:
                    "anchors",

                brand:
                    "Nexpak",

                description:
                    "Nail-in masonry anchors for securing electric fence brackets.",

                price:
                    95.00,

                unit:
                    "100 pack",

                weightKg:
                    0.80,

                image:
                    ""
            },


            {
                id:
                    "ef-anchor-8x80",

                name:
                    "8 x 80mm Nail-In Anchors",

                group:
                    "anchors",

                brand:
                    "Nexpak",

                description:
                    "Heavy-duty nail-in anchors for electric fence mounting applications.",

                price:
                    145.00,

                unit:
                    "100 pack",

                weightKg:
                    1.20,

                image:
                    ""
            },


            {
                id:
                    "ef-lugs-6x35",

                name:
                    "6 x 35mm Electric Fence Wiring Lugs",

                group:
                    "lugs",

                brand:
                    "Nexpak",

                description:
                    "Electrical wiring lugs for electric fence connections.",

                price:
                    25.00,

                unit:
                    "10 pack",

                weightKg:
                    0.08,

                image:
                    ""
            }

        ],


        /* ==================================================================
           B. CCTV HD
           ================================================================== */

        "cctv-hd": [

            {
                id:
                    "hd-dvr-8ch",

                name:
                    "8 Channel HD DVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "8-channel HD DVR for analogue high-definition surveillance systems.",

                price:
                    1450.00,

                unit:
                    "each",

                weightKg:
                    1.50,

                image:
                    ""
            },


            {
                id:
                    "hd-dvr-16ch",

                name:
                    "16 Channel HD DVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "16-channel HD DVR for medium-sized surveillance installations.",

                price:
                    2650.00,

                unit:
                    "each",

                weightKg:
                    2.20,

                image:
                    ""
            },


            {
                id:
                    "hd-dvr-32ch",

                name:
                    "32 Channel HD DVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "32-channel HD DVR for larger commercial surveillance systems.",

                price:
                    5400.00,

                unit:
                    "each",

                weightKg:
                    3.80,

                image:
                    ""
            },


            {
                id:
                    "hd-hdd-1tb",

                name:
                    "1TB Surveillance Hard Drive",

                group:
                    "storage",

                brand:
                    "Surveillance",

                description:
                    "1TB surveillance-rated hard drive for CCTV recording.",

                price:
                    780.00,

                unit:
                    "each",

                weightKg:
                    0.60,

                image:
                    ""
            },


            {
                id:
                    "hd-hdd-2tb",

                name:
                    "2TB Surveillance Hard Drive",

                group:
                    "storage",

                brand:
                    "Surveillance",

                description:
                    "2TB surveillance-rated hard drive for extended CCTV recording.",

                price:
                    1150.00,

                unit:
                    "each",

                weightKg:
                    0.60,

                image:
                    ""
            },


            {
                id:
                    "hd-bullet-30m",

                name:
                    "30m IR HD Bullet Camera",

                group:
                    "cameras",

                brand:
                    "Dahua",

                description:
                    "HD infrared bullet camera with approximately 30m night vision.",

                price:
                    380.00,

                unit:
                    "each",

                weightKg:
                    0.40,

                image:
                    ""
            },


            {
                id:
                    "hd-dome-20m",

                name:
                    "20m IR HD Dome Camera",

                group:
                    "cameras",

                brand:
                    "Dahua",

                description:
                    "HD infrared dome camera with approximately 20m night vision.",

                price:
                    360.00,

                unit:
                    "each",

                weightKg:
                    0.35,

                image:
                    ""
            },


            {
                id:
                    "hd-rg59-100m",

                name:
                    "RG59 + Power CCTV Cable 100m",

                group:
                    "cabling",

                brand:
                    "Nexpak",

                description:
                    "100m RG59 coaxial CCTV cable with power cable.",

                price:
                    420.00,

                unit:
                    "100m roll",

                weightKg:
                    4.50,

                image:
                    ""
            }

        ]

    }

};


/* ==========================================================================
   END OF PART 1
   ========================================================================== */

        /* ==================================================================
           C. IP CCTV SYSTEMS
           ================================================================== */

        "cctv-ip": [

            {
                id:
                    "ip-nvr-4ch-poe",

                name:
                    "4 Channel PoE NVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "4-channel network video recorder with built-in Power over Ethernet ports.",

                price:
                    2100.00,

                unit:
                    "each",

                weightKg:
                    1.80,

                image:
                    ""
            },


            {
                id:
                    "ip-nvr-8ch-poe",

                name:
                    "8 Channel PoE NVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "8-channel PoE network video recorder for IP CCTV installations.",

                price:
                    3400.00,

                unit:
                    "each",

                weightKg:
                    2.40,

                image:
                    ""
            },


            {
                id:
                    "ip-nvr-16ch-poe",

                name:
                    "16 Channel PoE NVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "16-channel PoE network video recorder for medium and large IP CCTV systems.",

                price:
                    5800.00,

                unit:
                    "each",

                weightKg:
                    3.60,

                image:
                    ""
            },


            {
                id:
                    "ip-nvr-32ch",

                name:
                    "32 Channel NVR",

                group:
                    "recorders",

                brand:
                    "Dahua",

                description:
                    "32-channel network video recorder for larger commercial IP surveillance systems.",

                price:
                    7900.00,

                unit:
                    "each",

                weightKg:
                    4.20,

                image:
                    ""
            },


            {
                id:
                    "ip-camera-4mp-turret",

                name:
                    "4MP PoE Turret Dome Camera 30m IR",

                group:
                    "cameras",

                brand:
                    "Dahua",

                description:
                    "4MP network turret camera with PoE connectivity and approximately 30m infrared night vision.",

                price:
                    780.00,

                unit:
                    "each",

                weightKg:
                    0.45,

                image:
                    ""
            },


            {
                id:
                    "ip-camera-8mp-bullet",

                name:
                    "8MP 4K Ultra HD Bullet Camera 50m IR",

                group:
                    "cameras",

                brand:
                    "Dahua",

                description:
                    "8MP 4K IP bullet camera with PoE and approximately 50m infrared night vision.",

                price:
                    1450.00,

                unit:
                    "each",

                weightKg:
                    0.65,

                image:
                    ""
            },


            {
                id:
                    "ip-camera-4mp-ptz",

                name:
                    "4MP Speed Dome PTZ 100m IR",

                group:
                    "cameras",

                brand:
                    "Dahua",

                description:
                    "4MP PTZ network camera with long-range infrared illumination.",

                price:
                    4800.00,

                unit:
                    "each",

                weightKg:
                    2.80,

                image:
                    ""
            },


            {
                id:
                    "ip-hdd-1tb",

                name:
                    "1TB Surveillance Hard Drive",

                group:
                    "storage",

                brand:
                    "Surveillance",

                description:
                    "1TB surveillance-rated hard drive for IP CCTV recording.",

                price:
                    780.00,

                unit:
                    "each",

                weightKg:
                    0.60,

                image:
                    ""
            },


            {
                id:
                    "ip-hdd-2tb",

                name:
                    "2TB Surveillance Hard Drive",

                group:
                    "storage",

                brand:
                    "Surveillance",

                description:
                    "2TB surveillance-rated hard drive for extended IP CCTV recording.",

                price:
                    1150.00,

                unit:
                    "each",

                weightKg:
                    0.60,

                image:
                    ""
            },


            {
                id:
                    "ip-hdd-4tb",

                name:
                    "4TB Surveillance Hard Drive",

                group:
                    "storage",

                brand:
                    "Surveillance",

                description:
                    "4TB surveillance-rated hard drive for extended IP CCTV recording.",

                price:
                    1890.00,

                unit:
                    "each",

                weightKg:
                    0.65,

                image:
                    ""
            },


            {
                id:
                    "ip-cat5e-100m",

                name:
                    "Cat5e Network Cable 100m",

                group:
                    "cabling",

                brand:
                    "Nexpak",

                description:
                    "100m Cat5e network cable for IP cameras and network infrastructure.",

                price:
                    380.00,

                unit:
                    "100m roll",

                weightKg:
                    3.20,

                image:
                    ""
            },


            {
                id:
                    "ip-cat6-100m",

                name:
                    "Cat6 Network Cable 100m",

                group:
                    "cabling",

                brand:
                    "Nexpak",

                description:
                    "100m Cat6 network cable for IP CCTV and network installations.",

                price:
                    520.00,

                unit:
                    "100m roll",

                weightKg:
                    3.50,

                image:
                    ""
            },


            {
                id:
                    "ip-poe-switch-4",

                name:
                    "4-Port PoE Network Switch",

                group:
                    "networking",

                brand:
                    "Dahua",

                description:
                    "Compact PoE switch for powering network cameras.",

                price:
                    950.00,

                unit:
                    "each",

                weightKg:
                    0.70,

                image:
                    ""
            },


            {
                id:
                    "ip-poe-switch-8",

                name:
                    "8-Port PoE Network Switch",

                group:
                    "networking",

                brand:
                    "Dahua",

                description:
                    "8-port PoE network switch for IP camera installations.",

                price:
                    1450.00,

                unit:
                    "each",

                weightKg:
                    1.00,

                image:
                    ""
            },


            {
                id:
                    "ip-poe-switch-16",

                name:
                    "16-Port PoE Network Switch",

                group:
                    "networking",

                brand:
                    "Dahua",

                description:
                    "16-port PoE network switch for larger IP surveillance systems.",

                price:
                    2650.00,

                unit:
                    "each",

                weightKg:
                    1.80,

                image:
                    ""
            },


            {
                id:
                    "ip-rj45-connectors",

                name:
                    "RJ45 Network Connectors",

                group:
                    "connectors",

                brand:
                    "Nexpak",

                description:
                    "RJ45 connectors for terminating CCTV network cables.",

                price:
                    45.00,

                unit:
                    "100 pack",

                weightKg:
                    0.15,

                image:
                    ""
            }

        ],


        /* ==================================================================
           D. ROBOGUARD OUTDOOR BEAMS
           ================================================================== */

        "roboguard": [

            {
                id:
                    "rg-base-station",

                name:
                    "Roboguard Base Station",

                group:
                    "base-stations",

                brand:
                    "Roboguard",

                description:
                    "Wireless Roboguard base station for receiving outdoor beam alerts.",

                price:
                    2850.00,

                unit:
                    "each",

                weightKg:
                    1.20,

                image:
                    ""
            },


            {
                id:
                    "rg-wireless-beam",

                name:
                    "Roboguard Wireless Beam",

                group:
                    "beams",

                brand:
                    "Roboguard",

                description:
                    "Wireless outdoor perimeter beam detector for early warning protection.",

                price:
                    1850.00,

                unit:
                    "each",

                weightKg:
                    0.85,

                image:
                    ""
            },


            {
                id:
                    "rg-beam-bracket",

                name:
                    "Roboguard Beam Mounting Bracket",

                group:
                    "brackets",

                brand:
                    "Roboguard",

                description:
                    "Mounting bracket for positioning Roboguard outdoor beams.",

                price:
                    185.00,

                unit:
                    "each",

                weightKg:
                    0.25,

                image:
                    ""
            },


            {
                id:
                    "rg-repeater",

                name:
                    "Roboguard Wireless Repeater",

                group:
                    "communication",

                brand:
                    "Roboguard",

                description:
                    "Wireless repeater for extending Roboguard communication range.",

                price:
                    1650.00,

                unit:
                    "each",

                weightKg:
                    0.50,

                image:
                    ""
            },


            {
                id:
                    "rg-solar-panel",

                name:
                    "Roboguard Solar Panel",

                group:
                    "power",

                brand:
                    "Roboguard",

                description:
                    "Solar charging panel for suitable Roboguard outdoor installations.",

                price:
                    950.00,

                unit:
                    "each",

                weightKg:
                    1.50,

                image:
                    ""
            },


            {
                id:
                    "rg-battery",

                name:
                    "Roboguard Rechargeable Battery",

                group:
                    "power",

                brand:
                    "Roboguard",

                description:
                    "Rechargeable battery for Roboguard wireless beam equipment.",

                price:
                    420.00,

                unit:
                    "each",

                weightKg:
                    0.80,

                image:
                    ""
            },


            {
                id:
                    "rg-siren",

                name:
                    "Roboguard External Siren",

                group:
                    "alerts",

                brand:
                    "Roboguard",

                description:
                    "External audible warning siren for Roboguard installations.",

                price:
                    450.00,

                unit:
                    "each",

                weightKg:
                    0.70,

                image:
                    ""
            },


            {
                id:
                    "rg-strobe",

                name:
                    "Roboguard Strobe Light",

                group:
                    "alerts",

                brand:
                    "Roboguard",

                description:
                    "Visual warning strobe for Roboguard alarm events.",

                price:
                    380.00,

                unit:
                    "each",

                weightKg:
                    0.30,

                image:
                    ""
            }

        ],


        /* ==================================================================
           E. GATE AUTOMATION
           ================================================================== */

        "gate-motors": [

            {
                id:
                    "gate-centurion-d5-evo",

                name:
                    "Centurion D5-Evo Gate Motor",

                group:
                    "gate-motors",

                brand:
                    "Centurion",

                description:
                    "Sliding gate motor for residential and light commercial applications.",

                price:
                    4650.00,

                unit:
                    "each",

                weightKg:
                    9.50,

                image:
                    ""
            },


            {
                id:
                    "gate-centurion-d5-smart",

                name:
                    "Centurion D5 Smart Gate Motor",

                group:
                    "gate-motors",

                brand:
                    "Centurion",

                description:
                    "Smart sliding gate motor with enhanced connectivity and automation features.",

                price:
                    5850.00,

                unit:
                    "each",

                weightKg:
                    10.00,

                image:
                    ""
            },


            {
                id:
                    "gate-centurion-d10-smart",

                name:
                    "Centurion D10 Turbo Smart",

                group:
                    "gate-motors",

                brand:
                    "Centurion",

                description:
                    "Heavy-duty sliding gate automation solution for larger gates.",

                price:
                    9200.00,

                unit:
                    "each",

                weightKg:
                    12.50,

                image:
                    ""
            },


            {
                id:
                    "gate-steel-rack-2m",

                name:
                    "Steel Gate Rack 2m",

                group:
                    "rack",

                brand:
                    "Centurion",

                description:
                    "Steel rack section for sliding gate automation.",

                price:
                    280.00,

                unit:
                    "2m section",

                weightKg:
                    1.80,

                image:
                    ""
            },


            {
                id:
                    "gate-nylon-rack-2m",

                name:
                    "Nylon Gate Rack 2m",

                group:
                    "rack",

                brand:
                    "Centurion",

                description:
                    "Nylon rack section for sliding gate automation.",

                price:
                    250.00,

                unit:
                    "2m section",

                weightKg:
                    0.90,

                image:
                    ""
            },


            {
                id:
                    "gate-remote-4button",

                name:
                    "Centurion 4-Button Remote",

                group:
                    "remotes",

                brand:
                    "Centurion",

                description:
                    "Four-button remote control for compatible Centurion gate automation systems.",

                price:
                    220.00,

                unit:
                    "each",

                weightKg:
                    0.08,

                image:
                    ""
            },


            {
                id:
                    "gate-battery-7ah",

                name:
                    "Gate Motor 7Ah Backup Battery",

                group:
                    "backup-power",

                brand:
                    "Nexpak",

                description:
                    "7Ah rechargeable backup battery for gate automation systems.",

                price:
                    280.00,

                unit:
                    "each",

                weightKg:
                    2.20,

                image:
                    ""
            },


            {
                id:
                    "gate-antitheft-bracket",

                name:
                    "Heavy-Duty Anti-Theft Gate Motor Bracket",

                group:
                    "security",

                brand:
                    "Centurion",

                description:
                    "Heavy-duty anti-theft mounting bracket for sliding gate motors.",

                price:
                    550.00,

                unit:
                    "each",

                weightKg:
                    2.50,

                image:
                    ""
            }

        ],

                    /* ================================================================
           CONTINUE PRODUCT DATABASE
           ================================================================ */

        {
            id: "ef-ht-100-soft",
            name: "100m HT Cable - Black Soft",
            group: "ht-cable",
            brand: "Nexpak",
            description: "100m high-tension cable for electric fencing.",
            price: 540.00,
            image: ""
        },

        {
            id: "ef-ht-100-hard",
            name: "100m HT Cable - Black Hard",
            group: "ht-cable",
            brand: "Nexpak",
            description: "Heavy-duty 100m high-tension cable.",
            price: 580.00,
            image: ""
        },

        {
            id: "ef-ht-200-soft",
            name: "200m HT Cable - Black Soft",
            group: "ht-cable",
            brand: "Nexpak",
            description: "200m high-tension cable for longer electric fencing installations.",
            price: 980.00,
            image: ""
        },

        {
            id: "ef-ht-200-hard",
            name: "200m HT Cable - Black Hard",
            group: "ht-cable",
            brand: "Nexpak",
            description: "Heavy-duty 200m high-tension cable.",
            price: 1050.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — EARTH LOOPS
           ================================================================ */

        {
            id: "ef-earth-loop-ss",
            name: "Stainless Steel Earth Loop",
            group: "earth-loops",
            brand: "Nexpak",
            description: "Stainless steel earth loop for electric fence earthing connections.",
            price: 18.00,
            image: ""
        },

        {
            id: "ef-earth-loop-alu",
            name: "Aluminium Earth Loop",
            group: "earth-loops",
            brand: "Nexpak",
            description: "Aluminium earth loop for electric fence installations.",
            price: 14.00,
            image: ""
        },

        {
            id: "ef-earth-loop-galv",
            name: "Galvanised Earth Loop",
            group: "earth-loops",
            brand: "Nexpak",
            description: "Galvanised earth loop for durable fence earthing.",
            price: 12.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — WARNING & GATE ACCESSORIES
           ================================================================ */

        {
            id: "ef-warning-sign",
            name: "Electric Fence Warning Sign",
            group: "safety-accessories",
            brand: "Nexpak",
            description: "Legal electric fence warning sign.",
            price: 22.00,
            image: ""
        },

        {
            id: "ef-gate-contact",
            name: "Heavy Duty Gate Contact Switch",
            group: "safety-accessories",
            brand: "Nexpak",
            description: "Heavy-duty gate contact switch for electric fence gate monitoring.",
            price: 145.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — ENERGIZERS
           ================================================================ */

        {
            id: "ef-energizer-1j",
            name: "1 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "1 Joule electric fence energizer.",
            price: 1850.00,
            image: ""
        },

        {
            id: "ef-energizer-3j",
            name: "3 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "3 Joule electric fence energizer.",
            price: 2650.00,
            image: ""
        },

        {
            id: "ef-energizer-4j",
            name: "4 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "4 Joule electric fence energizer.",
            price: 3200.00,
            image: ""
        },

        {
            id: "ef-energizer-8j",
            name: "8 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "8 Joule electric fence energizer.",
            price: 4800.00,
            image: ""
        },

        {
            id: "ef-energizer-14j",
            name: "14 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "14 Joule high-output electric fence energizer.",
            price: 7500.00,
            image: ""
        },

        {
            id: "ef-energizer-2zone-8j",
            name: "2-Zone 8 Joule Energizer",
            group: "energizers",
            brand: "Nemtek",
            description: "Dual-zone 8 Joule electric fence energizer.",
            price: 6200.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — BATTERY BACKUP
           ================================================================ */

        {
            id: "ef-battery-7ah",
            name: "7Ah Lead Acid Battery",
            group: "backup-batteries",
            brand: "Nexpak",
            description: "7Ah rechargeable backup battery.",
            price: 280.00,
            image: ""
        },

        {
            id: "ef-battery-9ah",
            name: "9Ah Deep Cycle Gel Battery",
            group: "backup-batteries",
            brand: "Nexpak",
            description: "9Ah deep-cycle gel backup battery.",
            price: 420.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — POWER SUPPLY & KEYPAD
           ================================================================ */

        {
            id: "ef-psu-16a",
            name: "16 Amp Power Supply",
            group: "power-supply",
            brand: "Nexpak",
            description: "16 Amp power supply unit.",
            price: 350.00,
            image: ""
        },

        {
            id: "ef-keypad-lcd",
            name: "LCD Keypad Programmer",
            group: "power-supply",
            brand: "Nemtek",
            description: "LCD keypad programmer for electric fence energizer configuration.",
            price: 850.00,
            image: ""
        },

        {
            id: "ef-psu-keypad-combo",
            name: "16A PSU + LCD Keypad",
            group: "power-supply",
            brand: "Nemtek",
            description: "Combined 16 Amp PSU and LCD keypad package.",
            price: 1150.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — ENCLOSURES
           ================================================================ */

        {
            id: "ef-enclosure-dmc430",
            name: "DMC 430 Weatherproof Enclosure",
            group: "enclosures",
            brand: "Nexpak",
            description: "Weatherproof enclosure for energizer and associated equipment.",
            price: 450.00,
            image: ""
        },

        {
            id: "ef-enclosure-dmc530",
            name: "DMC 530 High Enclosure",
            group: "enclosures",
            brand: "Nexpak",
            description: "High weatherproof enclosure for larger electric fence installations.",
            price: 620.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — COMMUNICATION MODULES
           ================================================================ */

        {
            id: "ef-comms-none",
            name: "No Remote Communication Module",
            group: "communication",
            brand: "Nexpak",
            description: "No remote communication module.",
            price: 0,
            image: ""
        },

        {
            id: "ef-comms-wifi",
            name: "WiFi Smartphone Module",
            group: "communication",
            brand: "Nemtek",
            description: "WiFi smartphone communication module.",
            price: 890.00,
            image: ""
        },

        {
            id: "ef-comms-gsm",
            name: "GSM Cellular Module",
            group: "communication",
            brand: "Nemtek",
            description: "GSM cellular communication module.",
            price: 1450.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — SIRENS & WARNING LIGHTS
           ================================================================ */

        {
            id: "ef-siren-15w",
            name: "15W Security Siren",
            group: "alerts",
            brand: "Nexpak",
            description: "15W security siren for audible electric fence alerts.",
            price: 120.00,
            image: ""
        },

        {
            id: "ef-strobe",
            name: "Strobe Warning Light",
            group: "alerts",
            brand: "Nexpak",
            description: "Visual strobe warning light.",
            price: 145.00,
            image: ""
        },

        {
            id: "ef-nite-light-red",
            name: "Red Nite Light LED",
            group: "alerts",
            brand: "Nexpak",
            description: "Red LED night warning light.",
            price: 180.00,
            image: ""
        },

        {
            id: "ef-nite-light-blue",
            name: "Blue Nite Light LED",
            group: "alerts",
            brand: "Nexpak",
            description: "Blue LED night warning light.",
            price: 180.00,
            image: ""
        },

        {
            id: "ef-nite-light-green",
            name: "Green Nite Light LED",
            group: "alerts",
            brand: "Nexpak",
            description: "Green LED night warning light.",
            price: 180.00,
            image: ""
        },


        /* ================================================================
           ELECTRIC FENCING — INSTALLATION
           ================================================================ */

        {
            id: "ef-installation",
            name: "Nexpak Certified Installation",
            group: "installation",
            brand: "Nexpak",
            description: "Professional installation by Nexpak Security Solutions.",
            price: 2500.00,
            image: ""
        },
                    /* ================================================================
           ELECTRIC FENCING — END OF CATEGORY
           ================================================================ */

        {
            id: "ef-diy-installation",
            name: "DIY Installation",
            group: "installation",
            brand: "Nexpak",
            description: "Self-installation option for customers building their own system.",
            price: 0,
            image: ""
        },


        /* ================================================================
           CCTV HD — DVR RECORDERS
           ================================================================ */

        {
            id: "hd-dvr-8ch",
            name: "8 Channel HD DVR",
            group: "dvr-recorders",
            brand: "Dahua",
            description: "8-channel high-definition DVR recorder.",
            price: 1450.00,
            image: ""
        },

        {
            id: "hd-dvr-16ch",
            name: "16 Channel HD DVR",
            group: "dvr-recorders",
            brand: "Dahua",
            description: "16-channel high-definition DVR recorder.",
            price: 2650.00,
            image: ""
        },

        {
            id: "hd-dvr-32ch",
            name: "32 Channel HD DVR",
            group: "dvr-recorders",
            brand: "Dahua",
            description: "32-channel high-definition DVR recorder.",
            price: 5400.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — HARD DRIVES
           ================================================================ */

        {
            id: "hd-hdd-1tb",
            name: "1TB Surveillance Hard Drive",
            group: "hard-drives",
            brand: "Seagate",
            description: "1TB surveillance-rated hard drive.",
            price: 780.00,
            image: ""
        },

        {
            id: "hd-hdd-2tb",
            name: "2TB Surveillance Hard Drive",
            group: "hard-drives",
            brand: "Seagate",
            description: "2TB surveillance-rated hard drive.",
            price: 1150.00,
            image: ""
        },

        {
            id: "hd-hdd-4tb",
            name: "4TB Surveillance Hard Drive",
            group: "hard-drives",
            brand: "Seagate",
            description: "4TB surveillance-rated hard drive.",
            price: 1890.00,
            image: ""
        },

        {
            id: "hd-hdd-6tb",
            name: "6TB Surveillance Hard Drive",
            group: "hard-drives",
            brand: "Seagate",
            description: "6TB surveillance-rated hard drive.",
            price: 2950.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — CAMERAS
           ================================================================ */

        {
            id: "hd-bullet-30m",
            name: "Bullet 30m IR Camera",
            group: "cameras",
            brand: "Dahua",
            description: "HD bullet camera with 30m infrared night vision.",
            price: 380.00,
            image: ""
        },

        {
            id: "hd-dome-20m",
            name: "Dome 20m IR Camera",
            group: "cameras",
            brand: "Dahua",
            description: "HD dome camera with 20m infrared night vision.",
            price: 360.00,
            image: ""
        },

        {
            id: "hd-varifocal-bullet-60m",
            name: "60m Varifocal Bullet IR Camera",
            group: "varifocal-cameras",
            brand: "Dahua",
            description: "HD varifocal bullet camera with 60m infrared range.",
            price: 890.00,
            image: ""
        },

        {
            id: "hd-varifocal-dome-40m",
            name: "40m Varifocal Dome IR Camera",
            group: "varifocal-cameras",
            brand: "Dahua",
            description: "HD varifocal dome camera with 40m infrared range.",
            price: 820.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — POWER SUPPLIES
           ================================================================ */

        {
            id: "hd-psu-1way",
            name: "1-Way CCTV Power Adapter",
            group: "power-supplies",
            brand: "Nexpak",
            description: "Single CCTV camera power adapter.",
            price: 120.00,
            image: ""
        },

        {
            id: "hd-psu-9way",
            name: "9-Way 10A CCTV Power Box",
            group: "power-supplies",
            brand: "Nexpak",
            description: "9-way 10A CCTV power distribution box.",
            price: 480.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — CABLE
           ================================================================ */

        {
            id: "hd-rg59-100m",
            name: "RG59 + Power Cable 100m",
            group: "cables",
            brand: "Nexpak",
            description: "100m RG59 coaxial cable with power cable.",
            price: 420.00,
            image: ""
        },

        {
            id: "hd-cat5e-100m",
            name: "Cat5e Cable 100m",
            group: "cables",
            brand: "Nexpak",
            description: "100m Cat5e network cable for CCTV installations.",
            price: 380.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — CONNECTORS & BALUNS
           ================================================================ */

        {
            id: "hd-bnc-dc-set",
            name: "BNC Crimp + DC Lead Set",
            group: "connectors",
            brand: "Nexpak",
            description: "BNC connector and DC power lead set.",
            price: 25.00,
            image: ""
        },

        {
            id: "hd-video-balun",
            name: "HD Video Balun Pair",
            group: "connectors",
            brand: "Nexpak",
            description: "HD CCTV video balun pair.",
            price: 65.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — ACCESSORIES
           ================================================================ */

        {
            id: "hd-junction-box",
            name: "100x100mm CCTV Joint Enclosure",
            group: "accessories",
            brand: "Nexpak",
            description: "Weather-resistant CCTV junction enclosure.",
            price: 28.00,
            image: ""
        },

        {
            id: "hd-monitor-19",
            name: "19-Inch LED Monitor",
            group: "monitors",
            brand: "Nexpak",
            description: "19-inch LED surveillance monitor.",
            price: 1450.00,
            image: ""
        },

        {
            id: "hd-monitor-27",
            name: "27-Inch FHD LED Monitor",
            group: "monitors",
            brand: "Nexpak",
            description: "27-inch Full HD surveillance monitor.",
            price: 2890.00,
            image: ""
        },

        {
            id: "hd-coax-strip-tool",
            name: "CCTV Cable Coax Strip Tool",
            group: "tools",
            brand: "Nexpak",
            description: "Coaxial cable stripping tool for CCTV installation.",
            price: 120.00,
            image: ""
        },

        {
            id: "hd-bnc-crimp-tool",
            name: "CCTV Heavy Duty BNC Crimp Tool",
            group: "tools",
            brand: "Nexpak",
            description: "Heavy-duty BNC crimping tool for CCTV cable installation.",
            price: 280.00,
            image: ""
        },


        /* ================================================================
           CCTV HD — BRANDS
           ================================================================ */

        {
            id: "hd-dahua-option",
            name: "Dahua Technology",
            group: "brands",
            brand: "Dahua",
            description: "Dahua Technology HD CCTV equipment.",
            price: 0,
            image: ""
        },

        {
            id: "hd-hikvision-option",
            name: "Hikvision",
            group: "brands",
            brand: "Hikvision",
            description: "Hikvision HD CCTV equipment.",
            price: 120.00,
            image: ""
        },

                    // ================================================================
        // CCTV HD — CAMERAS
        // ================================================================

        {
            id: "HD-BULLET-30M",
            name: "HD 2MP Bullet Camera - 30m IR",
            category: "cctv-hd",
            group: "cameras",
            brand: "Dahua",
            description:
                "2MP high-definition infrared bullet camera with up to 30m night vision.",
            price: 380.00,
            weightKg: 0.40,
            image: ""
        },

        {
            id: "HD-DOME-20M",
            name: "HD 2MP Dome Camera - 20m IR",
            category: "cctv-hd",
            group: "cameras",
            brand: "Dahua",
            description:
                "2MP indoor/outdoor dome camera with infrared night vision.",
            price: 360.00,
            weightKg: 0.35,
            image: ""
        },

        {
            id: "HD-VARIFOCAL-BULLET",
            name: "HD Varifocal Bullet Camera - 60m IR",
            category: "cctv-hd",
            group: "cameras",
            brand: "Dahua",
            description:
                "Professional varifocal bullet camera with long-range infrared illumination.",
            price: 890.00,
            weightKg: 0.80,
            image: ""
        },

        {
            id: "HD-VARIFOCAL-DOME",
            name: "HD Varifocal Dome Camera - 40m IR",
            category: "cctv-hd",
            group: "cameras",
            brand: "Dahua",
            description:
                "Professional varifocal dome camera for flexible surveillance coverage.",
            price: 820.00,
            weightKg: 0.70,
            image: ""
        },

        // ================================================================
        // CCTV HD — DVR RECORDERS
        // ================================================================

        {
            id: "HD-DVR-8CH",
            name: "8 Channel HD DVR",
            category: "cctv-hd",
            group: "recorders",
            brand: "Dahua",
            description:
                "8-channel HD DVR for residential and small-business surveillance.",
            price: 1450.00,
            weightKg: 1.50,
            image: ""
        },

        {
            id: "HD-DVR-16CH",
            name: "16 Channel HD DVR",
            category: "cctv-hd",
            group: "recorders",
            brand: "Dahua",
            description:
                "16-channel HD DVR for medium-sized surveillance installations.",
            price: 2650.00,
            weightKg: 2.20,
            image: ""
        },

        {
            id: "HD-DVR-32CH",
            name: "32 Channel HD DVR",
            category: "cctv-hd",
            group: "recorders",
            brand: "Dahua",
            description:
                "32-channel professional HD DVR for larger surveillance systems.",
            price: 5400.00,
            weightKg: 3.80,
            image: ""
        },

        // ================================================================
        // CCTV HD — HARD DRIVES
        // ================================================================

        {
            id: "HD-HDD-1TB",
            name: "1TB Surveillance Hard Drive",
            category: "cctv-hd",
            group: "storage",
            brand: "Surveillance",
            description:
                "1TB surveillance-rated hard drive for continuous CCTV recording.",
            price: 780.00,
            weightKg: 0.60,
            image: ""
        },

        {
            id: "HD-HDD-2TB",
            name: "2TB Surveillance Hard Drive",
            category: "cctv-hd",
            group: "storage",
            brand: "Surveillance",
            description:
                "2TB surveillance-rated hard drive for extended recording storage.",
            price: 1150.00,
            weightKg: 0.60,
            image: ""
        },

        {
            id: "HD-HDD-4TB",
            name: "4TB Surveillance Hard Drive",
            category: "cctv-hd",
            group: "storage",
            brand: "Surveillance",
            description:
                "4TB surveillance hard drive for larger CCTV installations.",
            price: 1890.00,
            weightKg: 0.65,
            image: ""
        },

        {
            id: "HD-HDD-6TB",
            name: "6TB Surveillance Hard Drive",
            category: "cctv-hd",
            group: "storage",
            brand: "Surveillance",
            description:
                "6TB surveillance-rated hard drive for high-capacity recording.",
            price: 2950.00,
            weightKg: 0.70,
            image: ""
        },

        // ================================================================
        // CCTV HD — POWER
        // ================================================================

        {
            id: "HD-PSU-1WAY",
            name: "1-Way CCTV Power Adapter",
            category: "cctv-hd",
            group: "power",
            brand: "Nexpak",
            description:
                "12V CCTV power adapter for individual camera installations.",
            price: 120.00,
            weightKg: 0.20,
            image: ""
        },

        {
            id: "HD-PSU-9WAY",
            name: "9-Way 10A CCTV Power Box",
            category: "cctv-hd",
            group: "power",
            brand: "Nexpak",
            description:
                "9-way CCTV power distribution box for multi-camera systems.",
            price: 480.00,
            weightKg: 1.60,
            image: ""
        },

        // ================================================================
        // CCTV HD — CABLE
        // ================================================================

        {
            id: "HD-RG59-100M",
            name: "RG59 + Power CCTV Cable - 100m",
            category: "cctv-hd",
            group: "cables",
            brand: "Nexpak",
            description:
                "100m RG59 coaxial CCTV cable with integrated power conductors.",
            price: 420.00,
            weightKg: 4.50,
            image: ""
        },

        {
            id: "HD-CAT5E-100M",
            name: "Cat5e CCTV Cable - 100m",
            category: "cctv-hd",
            group: "cables",
            brand: "Nexpak",
            description:
                "100m Cat5e network cable suitable for CCTV installations.",
            price: 380.00,
            weightKg: 3.20,
            image: ""
        },

        // ================================================================
        // CCTV HD — CONNECTORS & BALUNS
        // ================================================================

        {
            id: "HD-BNC-DC-SET",
            name: "BNC Crimp + DC Lead Set",
            category: "cctv-hd",
            group: "connectors",
            brand: "Nexpak",
            description:
                "BNC video connector and DC power lead set for HD CCTV installations.",
            price: 25.00,
            weightKg: 0.05,
            image: ""
        },

        {
            id: "HD-VIDEO-BALUN",
            name: "HD Video Balun Pair",
            category: "cctv-hd",
            group: "connectors",
            brand: "Nexpak",
            description:
                "HD video balun pair for transmitting CCTV video over twisted-pair cable.",
            price: 65.00,
            weightKg: 0.08,
            image: ""
        },

        // ================================================================
        // CCTV HD — ACCESSORIES
        // ================================================================

        {
            id: "HD-JUNCTION-BOX",
            name: "100x100mm CCTV Junction Box",
            category: "cctv-hd",
            group: "accessories",
            brand: "Nexpak",
            description:
                "Weather-resistant junction enclosure for CCTV camera connections.",
            price: 28.00,
            weightKg: 0.10,
            image: ""
        },

        {
            id: "HD-MONITOR-19",
            name: "19-Inch LED CCTV Monitor",
            category: "cctv-hd",
            group: "displays",
            brand: "Nexpak",
            description:
                "19-inch LED monitor suitable for CCTV monitoring applications.",
            price: 1450.00,
            weightKg: 2.80,
            image: ""
        },

        {
            id: "HD-MONITOR-27",
            name: "27-Inch FHD CCTV Monitor",
            category: "cctv-hd",
            group: "displays",
            brand: "Nexpak",
            description:
                "27-inch Full HD LED monitor for professional CCTV viewing.",
            price: 2890.00,
            weightKg: 4.50,
            image: ""
        },

        {
            id: "HD-COAX-STRIP-TOOL",
            name: "CCTV Coax Cable Strip Tool",
            category: "cctv-hd",
            group: "tools",
            brand: "Nexpak",
            description:
                "Dedicated coaxial cable stripping tool for CCTV installation.",
            price: 120.00,
            weightKg: 0.15,
            image: ""
        },

        {
            id: "HD-BNC-CRIMP-TOOL",
            name: "Heavy Duty BNC Crimp Tool",
            category: "cctv-hd",
            group: "tools",
            brand: "Nexpak",
            description:
                "Heavy-duty crimping tool for professional BNC CCTV connectors.",
            price: 280.00,
            weightKg: 0.45,
            image: ""
        },

        // ================================================================
        // IP CCTV SYSTEMS — NVR
        // ================================================================

        {
            id: "IP-NVR-4CH-POE",
            name: "4 Channel PoE NVR",
            category: "cctv-ip",
            group: "recorders",
            brand: "Dahua",
            description:
                "4-channel network video recorder with integrated PoE ports.",
            price: 2100.00,
            weightKg: 1.80,
            image: ""
        },

        {
            id: "IP-NVR-8CH-POE",
            name: "8 Channel PoE NVR",
            category: "cctv-ip",
            group: "recorders",
            brand: "Dahua",
            description:
                "8-channel PoE NVR for residential and small-business IP systems.",
            price: 3400.00,
            weightKg: 2.40,
            image: ""
        },

        {
            id: "IP-NVR-16CH-POE",
            name: "16 Channel PoE NVR",
            category: "cctv-ip",
            group: "recorders",
            brand: "Dahua",
            description:
                "16-channel PoE NVR for medium-sized IP CCTV installations.",
            price: 5800.00,
            weightKg: 3.60,
            image: ""
        },

        {
            id: "IP-NVR-32CH",
            name: "32 Channel NVR - No Built-in PoE",
            category: "cctv-ip",
            group: "recorders",
            brand: "Dahua",
            description:
                "32-channel professional NVR designed for larger IP surveillance systems.",
            price: 7900.00,
            weightKg: 4.20,
            image: ""
        },

            /* ==========================================================================
   25. RENDER PRODUCT GROUPS
   ========================================================================== */

function renderProductGroups() {

    if (!elements.configurator) {
        return;
    }

    const products =
        getCurrentProducts();

    elements.configurator.innerHTML = "";

    if (!products.length) {

        elements.configurator.innerHTML = `

            <div class="system-empty-state">

                <i class="fa-solid fa-box-open"></i>

                <h3>No products available</h3>

                <p>
                    Products for this system are currently
                    being updated.
                </p>

            </div>

        `;

        return;
    }


    const groups = {};


    products.forEach(product => {

        const groupId =
            product.group ||
            "general";

        if (!groups[groupId]) {

            groups[groupId] = {

                id: groupId,

                title:
                    product.groupTitle ||
                    "Products",

                products: []

            };

        }

        groups[groupId].products.push(product);

    });


    Object.values(groups).forEach(group => {

        const section =
            document.createElement("section");

        section.className =
            "system-product-group";

        section.dataset.group =
            group.id;


        section.innerHTML = `

            <div class="system-group-header">

                <div>

                    <h3>
                        ${escapeHtml(group.title)}
                    </h3>

                    <p>
                        Select the products and quantities
                        required for your system.
                    </p>

                </div>

            </div>

            <div class="system-product-grid"></div>

        `;


        const grid =
            section.querySelector(
                ".system-product-grid"
            );


        group.products.forEach(product => {

            grid.appendChild(
                createProductCard(product)
            );

        });


        elements.configurator.appendChild(
            section
        );

    });


    attachProductEvents();

}


/* ==========================================================================
   26. CREATE PRODUCT CARD
   ========================================================================== */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "system-product-card";

    const productId =
        getProductId(product);

    const price =
        getProductPrice(product);

    const name =
        getProductName(product);

    const selected =
        state.selections[productId];

    const quantity =
        selected
            ? selected.quantity
            : 0;


    const image =
        product.image ||
        product.img ||
        "";


    const imageHtml =
        image

            ? `

                <div class="system-product-image">

                    <img
                        src="${escapeHtml(image)}"
                        alt="${escapeHtml(name)}"
                        loading="lazy"
                    >

                </div>

            `

            : `

                <div class="system-product-image
                            system-product-placeholder">

                    <i class="fa-solid fa-box"></i>

                </div>

            `;


    card.dataset.productId =
        productId;


    card.innerHTML = `

        ${imageHtml}

        <div class="system-product-content">

            <h4>
                ${escapeHtml(name)}
            </h4>

            ${
                product.description

                    ? `

                        <p class="system-product-description">

                            ${escapeHtml(
                                product.description
                            )}

                        </p>

                    `

                    : ""
            }

            <div class="system-product-price">

                ${formatMoney(price)}

                <span>
                    / ${escapeHtml(
                        product.unit || "each"
                    )}
                </span>

            </div>


            <div class="system-product-actions">

                <button
                    type="button"
                    class="system-qty-btn system-qty-minus"
                    data-product-id="${escapeHtml(productId)}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>


                <input
                    type="number"
                    class="system-qty-input"
                    min="0"
                    step="1"
                    value="${quantity}"
                    data-product-id="${escapeHtml(productId)}"
                    aria-label="${escapeHtml(name)} quantity"
                >


                <button
                    type="button"
                    class="system-qty-btn system-qty-plus"
                    data-product-id="${escapeHtml(productId)}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>


            <div class="system-product-line-total">

                ${
                    quantity > 0

                        ? formatMoney(
                            price * quantity
                        )

                        : formatMoney(0)
                }

            </div>

        </div>

    `;


    if (quantity > 0) {

        card.classList.add(
            "selected"
        );

    }


    return card;

}


/* ==========================================================================
   27. ATTACH PRODUCT EVENTS
   ========================================================================== */

function attachProductEvents() {

    document
        .querySelectorAll(
            ".system-qty-plus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const product =
                        findCurrentProduct(
                            button.dataset.productId
                        );

                    if (!product) {
                        return;
                    }

                    changeQuantity(
                        product,
                        1
                    );

                    refreshProductCard(
                        product
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".system-qty-minus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const product =
                        findCurrentProduct(
                            button.dataset.productId
                        );

                    if (!product) {
                        return;
                    }

                    changeQuantity(
                        product,
                        -1
                    );

                    refreshProductCard(
                        product
                    );

                }
            );

        });


    /* ---------------------------------------------------------------
       DIRECT NUMBER INPUT
       --------------------------------------------------------------- */

    document
        .querySelectorAll(
            ".system-qty-input"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    const product =
                        findCurrentProduct(
                            input.dataset.productId
                        );

                    if (!product) {
                        return;
                    }

                    let quantity =
                        parseInt(
                            input.value,
                            10
                        );

                    if (
                        Number.isNaN(
                            quantity
                        ) ||
                        quantity < 0
                    ) {

                        quantity = 0;

                    }

                    addProduct(
                        product,
                        quantity
                    );

                    refreshProductCard(
                        product
                    );

                }
            );


            input.addEventListener(
                "input",
                () => {

                    let quantity =
                        parseInt(
                            input.value,
                            10
                        );

                    if (
                        Number.isNaN(
                            quantity
                        ) ||
                        quantity < 0
                    ) {

                        input.value = 0;

                    }

                }
            );

        });

}


/* ==========================================================================
   28. FIND CURRENT PRODUCT
   ========================================================================== */

function findCurrentProduct(productId) {

    const products =
        getCurrentProducts();

    return products.find(
        product =>
            String(
                getProductId(product)
            ) === String(productId)
    );

}


/* ==========================================================================
   29. REFRESH PRODUCT CARD
   ========================================================================== */

function refreshProductCard(product) {

    const productId =
        getProductId(product);

    const card =
        document.querySelector(
            `.system-product-card[data-product-id="${CSS.escape(
                String(productId)
            )}"]`
        );

    if (!card) {
        return;
    }


    const selected =
        state.selections[productId];

    const quantity =
        selected
            ? selected.quantity
            : 0;


    const input =
        card.querySelector(
            ".system-qty-input"
        );

    if (input) {

        input.value =
            quantity;

    }


    const lineTotal =
        card.querySelector(
            ".system-product-line-total"
        );


    if (lineTotal) {

        lineTotal.textContent =
            formatMoney(
                getProductPrice(product) *
                quantity
            );

    }


    if (quantity > 0) {

        card.classList.add(
            "selected"
        );

    } else {

        card.classList.remove(
            "selected"
        );

    }

}


/* ==========================================================================
   30. ESCAPE HTML
   ========================================================================== */

function escapeHtml(value) {

    return String(
        value ?? ""
    )

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


/* ==========================================================================
   31. RENDER CURRENT CATEGORY
   ========================================================================== */

function renderCurrentCategory() {

    if (elements.categoryTitle) {

        elements.categoryTitle.textContent =
            state.categoryTitle;

    }


    renderProductGroups();

    updateTotals();

}


/* ==========================================================================
   32. CATEGORY TAB EVENTS
   ========================================================================== */

function attachCategoryEvents() {

    document
        .querySelectorAll(
            ".nav-tab"
        )
        .forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    const category =
                        tab.dataset.category;

                    if (!category) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".nav-tab"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    tab.classList.add(
                        "active"
                    );


                    setCategory(
                        category
                    );


                    renderCurrentCategory();

                }
            );

        });

            }

          /* ==========================================================================
   33. SELECTED PRODUCTS SUMMARY
   ========================================================================== */

function renderSelectedProducts() {

    const summaryContainer =
        document.getElementById(
            "selectedProductsSummary"
        );


    /*
     * If the page does not contain a dedicated
     * selected-products container, we simply
     * skip this section.
     */

    if (!summaryContainer) {
        return;
    }


    const products =
        Object.values(
            state.selections
        );


    if (!products.length) {

        summaryContainer.innerHTML = `

            <div class="selected-products-empty">

                <i class="fa-solid fa-cart-plus"></i>

                <h4>Your system is empty</h4>

                <p>
                    Select products above to build
                    your security system.
                </p>

            </div>

        `;

        return;
    }


    summaryContainer.innerHTML = `

        <div class="selected-products-header">

            <h3>
                Selected Products
            </h3>

            <button
                type="button"
                id="btnClearSystem"
                class="clear-system-btn"
            >
                <i class="fa-solid fa-trash"></i>
                Clear System
            </button>

        </div>

        <div class="selected-products-list"></div>

    `;


    const list =
        summaryContainer.querySelector(
            ".selected-products-list"
        );


    products.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "selected-system-product";


        const lineTotal =
            Number(product.price) *
            Number(product.quantity);


        item.innerHTML = `

            <div class="selected-system-product-info">

                <strong>
                    ${escapeHtml(
                        product.name
                    )}
                </strong>

                <span>
                    ${formatMoney(
                        product.price
                    )}
                    ×
                    ${product.quantity}
                </span>

            </div>


            <div class="selected-system-product-total">

                ${formatMoney(
                    lineTotal
                )}

            </div>


            <button
                type="button"
                class="selected-product-remove"
                data-product-id="${escapeHtml(
                    product.id
                )}"
                aria-label="Remove product"
                title="Remove product"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>

        `;


        list.appendChild(item);

    });


    attachSelectedProductEvents();

}


/* ==========================================================================
   34. SELECTED PRODUCT EVENTS
   ========================================================================== */

function attachSelectedProductEvents() {

    document
        .querySelectorAll(
            ".selected-product-remove"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;


                    removeProduct(
                        productId
                    );


                    const product =
                        findCurrentProduct(
                            productId
                        );


                    if (product) {

                        refreshProductCard(
                            product
                        );

                    }


                    renderSelectedProducts();

                }
            );

        });


    const clearButton =
        document.getElementById(
            "btnClearSystem"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                clearSystem();

                renderProductGroups();

                renderSelectedProducts();

                showToast(
                    "System cleared."
                );

            }
        );

    }

}


/* ==========================================================================
   35. UPDATE SELECTED PRODUCTS WHEN STATE CHANGES
   ========================================================================== */

function updateSelectedProducts() {

    renderSelectedProducts();

}


/* ==========================================================================
   36. UPDATE TOTALS EXTENSION
   ========================================================================== */

/*
 * Keep the original updateTotals() calculation,
 * but make sure the selected-products display
 * is refreshed whenever quantities change.
 */

const originalUpdateTotals =
    updateTotals;


function updateTotals() {

    let subtotal = 0;

    let itemCount = 0;

    let productCount = 0;


    Object.values(
        state.selections
    ).forEach(product => {

        const quantity =
            Number(product.quantity) || 0;

        const price =
            Number(product.price) || 0;


        subtotal +=
            price * quantity;


        itemCount +=
            quantity;


        productCount += 1;

    });


    const vat =
        subtotal * VAT_RATE;


    const grandTotal =
        subtotal + vat;


    state.totals = {

        itemCount,

        productCount,

        subtotal,

        vat,

        grandTotal

    };


    updateSummary();

    updateSelectedProducts();

}


/* ==========================================================================
   37. UPDATED SUMMARY INFORMATION
   ========================================================================== */

function updateSummary() {

    if (elements.summaryCategory) {

        elements.summaryCategory.textContent =
            state.categoryTitle;

    }


    if (elements.summaryAddonCount) {

        elements.summaryAddonCount.textContent =

            `${state.totals.itemCount} ` +

            (
                state.totals.itemCount === 1
                    ? "item"
                    : "items"
            ) +

            ` configured`;

    }


    if (elements.summarySubtotal) {

        elements.summarySubtotal.textContent =
            formatMoney(
                state.totals.subtotal
            );

    }


    if (elements.summaryVat) {

        elements.summaryVat.textContent =
            formatMoney(
                state.totals.vat
            );

    }


    if (elements.summaryGrandTotal) {

        elements.summaryGrandTotal.textContent =
            formatMoney(
                state.totals.grandTotal
            );

    }


    updateCartButtonState();

}


/* ==========================================================================
   38. CART BADGE
   ========================================================================== */

function updateCartBadge() {

    if (!elements.cartBadge) {
        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "nexpak_cart"
                )
            ) || [];

    } catch (error) {

        console.warn(
            "Nexpak Configurator: Could not read cart.",
            error
        );

        cart = [];

    }


    let count = 0;


    cart.forEach(item => {

        /*
         * Standard shop products
         */

        if (
            typeof item.quantity === "number"
        ) {

            count +=
                item.quantity;

            return;

        }


        /*
         * Configured systems
         */

        if (
            item.selections &&
            typeof item.selections === "object"
        ) {

            Object.values(
                item.selections
            ).forEach(product => {

                count +=
                    Number(
                        product.quantity
                    ) || 0;

            });

        }

    });


    elements.cartBadge.textContent =
        count;

}


/* ==========================================================================
   39. BUILD CART ITEM
   ========================================================================== */

function buildConfiguratorCartItem() {

    const selectedProducts =
        Object.values(
            state.selections
        );


    if (!selectedProducts.length) {

        return null;

    }


    return {

        id:
            `SYSTEM-${Date.now()}`,

        type:
            "configured-system",

        category:
            state.category,

        categoryTitle:
            state.categoryTitle,

        name:
            `${state.categoryTitle} - Custom System`,

        selections:
            selectedProducts.map(product => ({

                id:
                    product.id,

                name:
                    product.name,

                price:
                    Number(product.price) || 0,

                quantity:
                    Number(product.quantity) || 0,

                image:
                    product.image || "",

                category:
                    product.category ||
                    state.category,

                group:
                    product.group || "",

                unit:
                    product.unit ||
                    "each"

            })),

        itemCount:
            state.totals.itemCount,

        productCount:
            state.totals.productCount,

        subtotal:
            Number(
                state.totals.subtotal
            ),

        vat:
            Number(
                state.totals.vat
            ),

        total:
            Number(
                state.totals.grandTotal
            ),

        vatRate:
            VAT_RATE,

        currency:
            CURRENCY,

        createdAt:
            new Date().toISOString()

    };

}


/* ==========================================================================
   40. ADD CONFIGURED SYSTEM TO CART
   ========================================================================== */

function addConfiguredSystemToCart() {

    const cartItem =
        buildConfiguratorCartItem();


    if (!cartItem) {

        showToast(
            "Please select at least one product.",
            "error"
        );

        return;

    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "nexpak_cart"
                )
            ) || [];


        if (
            !Array.isArray(cart)
        ) {

            cart = [];

        }

    } catch (error) {

        console.error(
            "Nexpak Configurator: Cart data could not be read.",
            error
        );

        cart = [];

    }


    cart.push(
        cartItem
    );


    localStorage.setItem(
        "nexpak_cart",
        JSON.stringify(cart)
    );


    updateCartBadge();


    showToast(
        "Your custom system has been added to the cart."
    );


    /*
     * Allow existing cart.js to react if it
     * listens for storage/custom events.
     */

    window.dispatchEvent(
        new CustomEvent(
            "nexpak:cart-updated",
            {
                detail: {
                    item: cartItem,
                    cart: cart
                }
            }
        )
    );


    /*
     * Optional visual state.
     */

    if (elements.addToCart) {

        const originalText =
            elements.addToCart.innerHTML;


        elements.addToCart.innerHTML = `

            <i class="fa-solid fa-check"></i>

            System Added

        `;


        window.setTimeout(
            () => {

                elements.addToCart.innerHTML =
                    originalText;

            },
            2500
        );

    }

}


/* ==========================================================================
   41. ADD TO CART BUTTON
   ========================================================================== */

if (elements.addToCart) {

    elements.addToCart.addEventListener(
        "click",
        addConfiguredSystemToCart
    );

}


/* ==========================================================================
   42. INITIAL CART BADGE
   ========================================================================== */

updateCartBadge();

/* ==========================================================================
   43. SYNCHRONISE CATEGORY TABS
   ========================================================================== */

function syncCategoryTabs() {

    document
        .querySelectorAll(".nav-tab")
        .forEach(tab => {

            const isActive =
                tab.dataset.category ===
                state.category;


            tab.classList.toggle(
                "active",
                isActive
            );

        });

}


/* ==========================================================================
   44. INITIALISE CATEGORY TABS
   ========================================================================== */

function initialiseCategoryTabs() {

    const tabs =
        document.querySelectorAll(
            ".nav-tab"
        );


    if (!tabs.length) {

        console.warn(
            "Nexpak Configurator: No category tabs found."
        );

        return;

    }


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const categoryId =
                    tab.dataset.category;


                if (!categoryId) {

                    return;

                }


                const category =
                    getCategory(
                        categoryId
                    );


                if (!category) {

                    console.warn(
                        `Nexpak Configurator: ` +
                        `Category "${categoryId}" not found.`
                    );

                    return;

                }


                setCategory(
                    categoryId
                );


                syncCategoryTabs();

                renderCurrentCategory();


                /*
                 * Move the user back to the
                 * configurator area after changing
                 * system type.
                 */

                if (
                    elements.configurator
                ) {

                    elements.configurator.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });

}


/* ==========================================================================
   45. HANDLE EXTERNAL CATEGORY CHANGES
   ========================================================================== */

/*
 * Other parts of the Nexpak website can change
 * the active configurator category by dispatching:
 *
 * window.dispatchEvent(
 *     new CustomEvent(
 *         "nexpak:change-category",
 *         {
 *             detail: {
 *                 category: "cctv-ip"
 *             }
 *         }
 *     )
 * );
 */

window.addEventListener(
    "nexpak:change-category",
    event => {

        const categoryId =
            event.detail &&
            event.detail.category;


        if (!categoryId) {

            return;

        }


        if (!getCategory(categoryId)) {

            console.warn(
                `Nexpak Configurator: ` +
                `Cannot switch to unknown category "${categoryId}".`
            );

            return;

        }


        setCategory(
            categoryId
        );


        syncCategoryTabs();

        renderCurrentCategory();

    }
);


/* ==========================================================================
   46. CATEGORY FROM URL
   ========================================================================== */

/*
 * Supports links such as:
 *
 * build-system.html?category=cctv-ip
 *
 * or:
 *
 * build-system.html?category=roboguard
 *
 * If the category does not exist, the default
 * Electric Fencing category remains active.
 */

function getCategoryFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get(
            "category"
        );


    if (
        category &&
        getCategory(category)
    ) {

        return category;

    }


    return "electric-fencing";

}


/* ==========================================================================
   47. UPDATE URL WITHOUT RELOADING PAGE
   ========================================================================== */

function updateCategoryUrl() {

    try {

        const url =
            new URL(
                window.location.href
            );


        url.searchParams.set(
            "category",
            state.category
        );


        window.history.replaceState(
            {
                category:
                    state.category
            },
            "",
            url
        );

    } catch (error) {

        console.warn(
            "Nexpak Configurator: Could not update URL.",
            error
        );

    }

}


/* ==========================================================================
   48. CATEGORY CHANGE EVENT PATCH
   ========================================================================== */

/*
 * Keep the browser URL synchronized whenever
 * the configurator changes category.
 */

window.addEventListener(
    "nexpak:category-changed",
    updateCategoryUrl
);


/* ==========================================================================
   49. PATCH SET CATEGORY
   ========================================================================== */

/*
 * We dispatch a custom event after setCategory()
 * so other Nexpak modules can respond without
 * directly modifying configurator state.
 */

const originalSetCategory =
    setCategory;


function setCategory(categoryId) {

    const previousCategory =
        state.category;


    originalSetCategory(
        categoryId
    );


    if (
        state.category !==
        previousCategory
    ) {

        window.dispatchEvent(
            new CustomEvent(
                "nexpak:category-changed",
                {
                    detail: {
                        category:
                            state.category,

                        previousCategory:
                            previousCategory
                    }
                }
            )
        );

    }

}


/* ==========================================================================
   50. RE-EXPOSE UPDATED CATEGORY FUNCTION
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR.setCategory =
        setCategory;

}


/* ==========================================================================
   51. RE-EXPOSE PRODUCT FUNCTIONS
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR.getProducts =
        getCurrentProducts;


    window.NEXPAK_CONFIGURATOR.findProduct =
        findCurrentProduct;


    window.NEXPAK_CONFIGURATOR.render =
        renderCurrentCategory;


    window.NEXPAK_CONFIGURATOR.addToCart =
        addConfiguredSystemToCart;

}


/* ==========================================================================
   52. INITIAL CATEGORY SETUP
   ========================================================================== */

const initialCategory =
    getCategoryFromUrl();


setCategory(
    initialCategory
);


syncCategoryTabs();

updateCategoryUrl();

renderCurrentCategory();


/* ==========================================================================
   53. INITIALISE CATEGORY EVENTS
   ========================================================================== */

initialiseCategoryTabs();


/* ==========================================================================
   54. INITIALISE CART BADGE
   ========================================================================== */

updateCartBadge();


/* ==========================================================================
   55. CONFIGURATOR READY EVENT
   ========================================================================== */

window.dispatchEvent(
    new CustomEvent(
        "nexpak:configurator-ready",
        {
            detail: {

                category:
                    state.category,

                categoryTitle:
                    state.categoryTitle,

                productCount:
                    getCurrentProducts().length

            }
        }
    )
);


/* ==========================================================================
   56. FINAL DEBUG MESSAGE
   ========================================================================== */

console.log(
    "Nexpak Security Solutions — Build Your System",
    "Configurator V2 ready.",
    {
        category:
            state.category,

        products:
            getCurrentProducts().length,

        vatRate:
            VAT_RATE,

        currency:
            CURRENCY,

        prebuiltKits:
            "REMOVED"
    }
);
/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   BUILD YOUR SYSTEM — CONFIGURATOR V2
   PART 8 — FINAL INITIALISATION & SAFETY
   ========================================================================== */


/* ==========================================================================
   57. FINAL DOM REFRESH
   ========================================================================== */

function finalConfiguratorRefresh() {

    /*
     * Make sure the category heading reflects
     * the current system.
     */

    if (elements.categoryTitle) {

        elements.categoryTitle.textContent =
            state.categoryTitle;

    }


    /*
     * Render all individual products.
     */

    renderProductGroups();


    /*
     * Render the selected-products summary.
     */

    renderSelectedProducts();


    /*
     * Recalculate all prices.
     */

    updateTotals();


    /*
     * Refresh cart badge.
     */

    updateCartBadge();

}


/* ==========================================================================
   58. RESET SYSTEM FOR NEW CATEGORY
   ========================================================================== */

function resetForCategory(categoryId) {

    if (!getCategory(categoryId)) {

        console.warn(
            `Nexpak Configurator: ` +
            `Cannot reset unknown category "${categoryId}".`
        );

        return false;

    }


    setCategory(
        categoryId
    );


    syncCategoryTabs();

    updateCategoryUrl();

    finalConfiguratorRefresh();


    return true;

}


/* ==========================================================================
   59. CLEAR SYSTEM CONFIRMATION
   ========================================================================== */

function confirmClearSystem() {

    const productCount =
        state.totals.productCount;


    if (productCount === 0) {

        return true;

    }


    /*
     * Use a confirmation only when the customer
     * actually has products selected.
     */

    return window.confirm(
        "Are you sure you want to clear " +
        "your current system configuration?"
    );

}


/* ==========================================================================
   60. SAFE CLEAR SYSTEM
   ========================================================================== */

function safeClearSystem() {

    if (
        !confirmClearSystem()
    ) {

        return;

    }


    clearSystem();

    renderProductGroups();

    renderSelectedProducts();

    updateCartBadge();

    showToast(
        "Your system configuration has been cleared."
    );

}


/* ==========================================================================
   61. PUBLIC CLEAR FUNCTION
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR.clear =
        safeClearSystem;


    window.NEXPAK_CONFIGURATOR.reset =
        resetForCategory;


    window.NEXPAK_CONFIGURATOR.getState =
        () => state;


    window.NEXPAK_CONFIGURATOR.getTotals =
        () => state.totals;

}


/* ==========================================================================
   62. STORAGE EVENT
   ========================================================================== */

/*
 * If another browser tab changes the cart,
 * refresh the cart badge in this configurator.
 */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
            "nexpak_cart"
        ) {

            updateCartBadge();

        }

    }
);


/* ==========================================================================
   63. CART UPDATED EVENT
   ========================================================================== */

/*
 * Listen for updates from cart.js or other
 * Nexpak modules.
 */

window.addEventListener(
    "nexpak:cart-updated",
    () => {

        updateCartBadge();

    }
);


/* ==========================================================================
   64. HANDLE BROWSER BACK / FORWARD
   ========================================================================== */

window.addEventListener(
    "popstate",
    () => {

        const category =
            getCategoryFromUrl();


        if (
            category !==
            state.category
        ) {

            setCategory(
                category
            );

            syncCategoryTabs();

            renderCurrentCategory();

        }

    }
);


/* ==========================================================================
   65. PREVENT ACCIDENTAL FORM SUBMISSION
   ========================================================================== */

if (
    elements.configurator
) {

    const parentForm =
        elements.configurator.closest(
            "form"
        );


    if (parentForm) {

        parentForm.addEventListener(
            "submit",
            event => {

                /*
                 * The configurator itself should
                 * never submit the page accidentally.
                 */

                event.preventDefault();

            }
        );

    }

}


/* ==========================================================================
   66. FINAL PRODUCT VALIDATION
   ========================================================================== */

function validateCurrentProducts() {

    const products =
        getCurrentProducts();


    if (
        !Array.isArray(products)
    ) {

        console.error(
            "Nexpak Configurator: Product source is invalid."
        );

        return false;

    }


    /*
     * Warn about products without IDs.
     */

    products.forEach(product => {

        if (
            !getProductId(product)
        ) {

            console.warn(
                "Nexpak Configurator: " +
                "Product is missing an ID.",
                product
            );

        }

    });


    return true;

}


/* ==========================================================================
   67. FINAL CONFIGURATOR VALIDATION
   ========================================================================== */

function validateConfigurator() {

    if (
        typeof SHOP_DATA ===
        "undefined"
    ) {

        console.error(
            "Nexpak Configurator: SHOP_DATA is unavailable."
        );

        return false;

    }


    if (
        !Array.isArray(
            SHOP_DATA.categories
        )
    ) {

        console.error(
            "Nexpak Configurator: " +
            "SHOP_DATA.categories is missing."
        );

        return false;

    }


    if (
        !SHOP_DATA.configurators
    ) {

        console.error(
            "Nexpak Configurator: " +
            "SHOP_DATA.configurators is missing."
        );

        return false;

    }


    return validateCurrentProducts();

}


/* ==========================================================================
   68. FINAL STARTUP
   ========================================================================== */

if (
    validateConfigurator()
) {

    finalConfiguratorRefresh();


    console.log(
        "Nexpak Security Solutions",
        "Build Your System is fully initialised."
    );


} else {

    console.error(
        "Nexpak Security Solutions",
        "Build Your System could not initialise correctly."
    );

}


/* ==========================================================================
   69. CONFIGURATOR VERSION
   ========================================================================== */

if (
    window.NEXPAK_CONFIGURATOR
) {

    window.NEXPAK_CONFIGURATOR.version =
        "V2";


    window.NEXPAK_CONFIGURATOR.prebuiltKits =
        false;

}


/* ==========================================================================
   70. FINAL READY EVENT
   ========================================================================== */

window.dispatchEvent(
    new CustomEvent(
        "nexpak:build-system-ready",
        {
            detail: {

                version:
                    "V2",

                category:
                    state.category,

                categoryTitle:
                    state.categoryTitle,

                productCount:
                    getCurrentProducts().length,

                selectedProducts:
                    state.totals.productCount,

                itemCount:
                    state.totals.itemCount,

                subtotal:
                    state.totals.subtotal,

                vat:
                    state.totals.vat,

                grandTotal:
                    state.totals.grandTotal,

                prebuiltKits:
                    false

            }

        }
    )
);


/* ==========================================================================
   END OF CONFIGURATOR.JS
   ========================================================================== */
