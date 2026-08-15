/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   SHOP DATA — MASTER PRODUCT & SYSTEM DATABASE
   shop-data.js
   ========================================================================== */

const SHOP_DATA = {

    company: {
        name: "Nexpak Security Solutions",
        whatsapp: "27836308249",
        currency: "ZAR",
        vatRate: 0.15
    },

    categories: [
        { id: "electric-fencing", title: "Electric Fencing", desc: "Electric fence brackets, stays, wire, energizers, earthing, high-tension cable, accessories and installation products.", icon: "fa-bolt" },
        { id: "cctv", title: "CCTV HD Systems", desc: "HD analogue surveillance cameras, DVRs, hard drives, cabling, baluns, power supplies and CCTV accessories.", icon: "fa-video" },
        { id: "ip-cctv", title: "IP CCTV Systems", desc: "Network surveillance cameras, PoE NVRs, network switches, storage, Cat5e/Cat6 cabling and IP CCTV accessories.", icon: "fa-network-wired" },
        { id: "roboguard", title: "Roboguard Outdoor Beams", desc: "Wireless outdoor beam detection systems, receivers, transmitters, batteries, brackets and Roboguard accessories.", icon: "fa-shield-halved" },
        { id: "gate-automation", title: "Gate Automation", desc: "Centurion gate motors, rack, remotes, batteries, brackets, safety accessories and gate automation equipment.", icon: "fa-door-open" },
        { id: "alarm-systems", title: "Alarm Systems", desc: "Wired, hybrid and wireless alarm panels, PIRs, keypads, sirens, batteries and communication modules.", icon: "fa-bell" },
        { id: "access-control", title: "Access Control", desc: "Access control readers, keypads, biometric units, electric locks and related accessories.", icon: "fa-house-lock" },
        { id: "intercom-systems", title: "Intercom Systems", desc: "Video and audio intercom units, monitors, door stations and related accessories.", icon: "fa-phone-volume" },
        { id: "security-accessories", title: "Security Accessories", desc: "General security accessories, cabling, mounting hardware and installation consumables.", icon: "fa-toolbox" },
    ],

    products: {

        /* ============================================================== */
   "electric-fencing": [
            { id: "ef-walltop-bracket", name: "Wall Top Electric Fence Bracket", category: "electric-fencing", group: "brackets", brand: "Nexpak", description: "Wall-top electric fence bracket for mounting multiple electric fence strands.", price: 85.0, unit: "each", weightKg: 0.45, image: "" },
            { id: "ef-bracket-6line", name: "6-Line Electric Fence Bracket", category: "electric-fencing", group: "brackets", brand: "Nexpak", description: "6-line electric fence bracket for standard residential and commercial installations.", price: 95.0, unit: "each", weightKg: 0.5, image: "" },
            { id: "ef-bracket-8line", name: "8-Line Electric Fence Bracket", category: "electric-fencing", group: "brackets", brand: "Nexpak", description: "8-line electric fence bracket for increased perimeter protection.", price: 110.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "ef-bracket-10line", name: "10-Line Electric Fence Bracket", category: "electric-fencing", group: "brackets", brand: "Nexpak", description: "10-line heavy-duty electric fence bracket.", price: 125.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "ef-bracket-12line", name: "12-Line Electric Fence Bracket", category: "electric-fencing", group: "brackets", brand: "Nexpak", description: "12-line high-security electric fence bracket.", price: 145.0, unit: "each", weightKg: 0.8, image: "" },
            { id: "ef-stay-600-black", name: "600mm Black Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "600mm black stay for electric fence corners and end points.", price: 42.0, unit: "each", weightKg: 0.5, image: "" },
            { id: "ef-stay-600-white", name: "600mm White Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "600mm white stay for electric fence corners and end points.", price: 42.0, unit: "each", weightKg: 0.5, image: "" },
            { id: "ef-stay-600-galv", name: "600mm Galvanised Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "600mm galvanised stay for electric fence corners and end points.", price: 48.0, unit: "each", weightKg: 0.55, image: "" },
            { id: "ef-stay-750-black", name: "750mm Black Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "750mm heavy-duty black stay for larger electric fence structures.", price: 55.0, unit: "each", weightKg: 0.65, image: "" },
            { id: "ef-stay-750-white", name: "750mm White Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "750mm heavy-duty white stay for larger electric fence structures.", price: 55.0, unit: "each", weightKg: 0.65, image: "" },
            { id: "ef-stay-750-galv", name: "750mm Galvanised Electric Fence Stay", category: "electric-fencing", group: "stays", brand: "Nexpak", description: "750mm heavy-duty galvanised stay for larger electric fence structures.", price: 62.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "ef-anchor-6x60", name: "6 x 60mm Nail-In Anchors", category: "electric-fencing", group: "anchors", brand: "Nexpak", description: "Nail-in masonry anchors for securing electric fence brackets.", price: 95.0, unit: "100 pack", weightKg: 0.8, image: "" },
            { id: "ef-anchor-8x80", name: "8 x 80mm Nail-In Anchors", category: "electric-fencing", group: "anchors", brand: "Nexpak", description: "Heavy-duty nail-in anchors for electric fence mounting applications.", price: 145.0, unit: "100 pack", weightKg: 1.2, image: "" },
            { id: "ef-lugs-6x35", name: "6 x 35mm Electric Fence Wiring Lugs", category: "electric-fencing", group: "lugs", brand: "Nexpak", description: "Electrical wiring lugs for electric fence connections.", price: 25.0, unit: "10 pack", weightKg: 0.08, image: "" },
            { id: "ef-earth-loop-ss", name: "Stainless Steel Earth Loop", category: "electric-fencing", group: "earth-loops", brand: "Nexpak", description: "Stainless steel earth loop for electric fence earthing connections.", price: 18.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-earth-loop-alu", name: "Aluminium Earth Loop", category: "electric-fencing", group: "earth-loops", brand: "Nexpak", description: "Aluminium earth loop for electric fence installations.", price: 14.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-earth-loop-galv", name: "Galvanised Earth Loop", category: "electric-fencing", group: "earth-loops", brand: "Nexpak", description: "Galvanised earth loop for durable fence earthing.", price: 12.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-warning-sign", name: "Electric Fence Warning Sign", category: "electric-fencing", group: "safety-accessories", brand: "Nexpak", description: "Legal electric fence warning sign.", price: 22.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-gate-contact", name: "Heavy Duty Gate Contact Switch", category: "electric-fencing", group: "safety-accessories", brand: "Nexpak", description: "Heavy-duty gate contact switch for electric fence gate monitoring.", price: 145.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-1j", name: "1 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "1 Joule electric fence energizer.", price: 1850.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-3j", name: "3 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "3 Joule electric fence energizer.", price: 2650.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-4j", name: "4 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "4 Joule electric fence energizer.", price: 3200.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-8j", name: "8 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "8 Joule electric fence energizer.", price: 4800.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-14j", name: "14 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "14 Joule high-output electric fence energizer.", price: 7500.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-energizer-2zone-8j", name: "2-Zone 8 Joule Energizer", category: "electric-fencing", group: "energizers", brand: "Nemtek", description: "Dual-zone 8 Joule electric fence energizer.", price: 6200.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-battery-7ah", name: "7Ah Lead Acid Battery", category: "electric-fencing", group: "backup-batteries", brand: "Nexpak", description: "7Ah rechargeable backup battery.", price: 280.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-battery-9ah", name: "9Ah Deep Cycle Gel Battery", category: "electric-fencing", group: "backup-batteries", brand: "Nexpak", description: "9Ah deep-cycle gel backup battery.", price: 420.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-psu-16a", name: "16 Amp Power Supply", category: "electric-fencing", group: "power-supply", brand: "Nexpak", description: "16 Amp power supply unit.", price: 350.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-keypad-lcd", name: "LCD Keypad Programmer", category: "electric-fencing", group: "power-supply", brand: "Nemtek", description: "LCD keypad programmer for electric fence energizer configuration.", price: 850.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-psu-keypad-combo", name: "16A PSU + LCD Keypad", category: "electric-fencing", group: "power-supply", brand: "Nemtek", description: "Combined 16 Amp PSU and LCD keypad package.", price: 1150.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-enclosure-dmc430", name: "DMC 430 Weatherproof Enclosure", category: "electric-fencing", group: "enclosures", brand: "Nexpak", description: "Weatherproof enclosure for energizer and associated equipment.", price: 450.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-enclosure-dmc530", name: "DMC 530 High Enclosure", category: "electric-fencing", group: "enclosures", brand: "Nexpak", description: "High weatherproof enclosure for larger electric fence installations.", price: 620.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-comms-none", name: "No Remote Communication Module", category: "electric-fencing", group: "communication", brand: "Nexpak", description: "No remote communication module.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-comms-wifi", name: "WiFi Smartphone Module", category: "electric-fencing", group: "communication", brand: "Nemtek", description: "WiFi smartphone communication module.", price: 890.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-comms-gsm", name: "GSM Cellular Module", category: "electric-fencing", group: "communication", brand: "Nemtek", description: "GSM cellular communication module.", price: 1450.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-siren-15w", name: "15W Security Siren", category: "electric-fencing", group: "alerts", brand: "Nexpak", description: "15W security siren for audible electric fence alerts.", price: 120.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-strobe", name: "Strobe Warning Light", category: "electric-fencing", group: "alerts", brand: "Nexpak", description: "Visual strobe warning light.", price: 145.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-nite-light-red", name: "Red Nite Light LED", category: "electric-fencing", group: "alerts", brand: "Nexpak", description: "Red LED night warning light.", price: 180.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-nite-light-blue", name: "Blue Nite Light LED", category: "electric-fencing", group: "alerts", brand: "Nexpak", description: "Blue LED night warning light.", price: 180.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-nite-light-green", name: "Green Nite Light LED", category: "electric-fencing", group: "alerts", brand: "Nexpak", description: "Green LED night warning light.", price: 180.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-installation", name: "Nexpak Certified Installation", category: "electric-fencing", group: "installation", brand: "Nexpak", description: "Professional installation by Nexpak Security Solutions.", price: 2500.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "ef-diy-installation", name: "DIY Installation", category: "electric-fencing", group: "installation", brand: "Nexpak", description: "Self-installation option for customers building their own system.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
        ],

        /* ============================================================== */
       "cctv": [
            { id: "hd-dvr-8ch", name: "8 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "8-channel HD DVR for analogue high-definition surveillance systems.", price: 1450.0, unit: "each", weightKg: 1.5, image: "" },
            { id: "hd-dvr-16ch", name: "16 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "16-channel HD DVR for medium-sized surveillance installations.", price: 2650.0, unit: "each", weightKg: 2.2, image: "" },
            { id: "hd-dvr-32ch", name: "32 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "32-channel HD DVR for larger commercial surveillance systems.", price: 5400.0, unit: "each", weightKg: 3.8, image: "" },
            { id: "hd-hdd-1tb", name: "1TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "1TB surveillance-rated hard drive for CCTV recording.", price: 780.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "hd-hdd-2tb", name: "2TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "2TB surveillance-rated hard drive for extended CCTV recording.", price: 1150.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "hd-bullet-30m", name: "30m IR HD Bullet Camera", category: "cctv", group: "cameras", brand: "Dahua", description: "HD infrared bullet camera with approximately 30m night vision.", price: 380.0, unit: "each", weightKg: 0.4, image: "" },
            { id: "hd-dome-20m", name: "20m IR HD Dome Camera", category: "cctv", group: "cameras", brand: "Dahua", description: "HD infrared dome camera with approximately 20m night vision.", price: 360.0, unit: "each", weightKg: 0.35, image: "" },
            { id: "hd-rg59-100m", name: "RG59 + Power CCTV Cable 100m", category: "cctv", group: "cabling", brand: "Nexpak", description: "100m RG59 coaxial CCTV cable with power cable.", price: 420.0, unit: "100m roll", weightKg: 4.5, image: "" },
            { id: "hd-hdd-4tb", name: "4TB Surveillance Hard Drive", category: "cctv", group: "hard-drives", brand: "Seagate", description: "4TB surveillance-rated hard drive.", price: 1890.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-hdd-6tb", name: "6TB Surveillance Hard Drive", category: "cctv", group: "hard-drives", brand: "Seagate", description: "6TB surveillance-rated hard drive.", price: 2950.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-varifocal-bullet-60m", name: "60m Varifocal Bullet IR Camera", category: "cctv", group: "varifocal-cameras", brand: "Dahua", description: "HD varifocal bullet camera with 60m infrared range.", price: 890.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-varifocal-dome-40m", name: "40m Varifocal Dome IR Camera", category: "cctv", group: "varifocal-cameras", brand: "Dahua", description: "HD varifocal dome camera with 40m infrared range.", price: 820.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-psu-1way", name: "1-Way CCTV Power Adapter", category: "cctv", group: "power-supplies", brand: "Nexpak", description: "Single CCTV camera power adapter.", price: 120.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-psu-9way", name: "9-Way 10A CCTV Power Box", category: "cctv", group: "power-supplies", brand: "Nexpak", description: "9-way 10A CCTV power distribution box.", price: 480.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-cat5e-100m", name: "Cat5e Cable 100m", category: "cctv", group: "cables", brand: "Nexpak", description: "100m Cat5e network cable for CCTV installations.", price: 380.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-bnc-dc-set", name: "BNC Crimp + DC Lead Set", category: "cctv", group: "connectors", brand: "Nexpak", description: "BNC connector and DC power lead set.", price: 25.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-video-balun", name: "HD Video Balun Pair", category: "cctv", group: "connectors", brand: "Nexpak", description: "HD CCTV video balun pair.", price: 65.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-junction-box", name: "100x100mm CCTV Joint Enclosure", category: "cctv", group: "accessories", brand: "Nexpak", description: "Weather-resistant CCTV junction enclosure.", price: 28.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-monitor-19", name: "19-Inch LED Monitor", category: "cctv", group: "monitors", brand: "Nexpak", description: "19-inch LED surveillance monitor.", price: 1450.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-monitor-27", name: "27-Inch FHD LED Monitor", category: "cctv", group: "monitors", brand: "Nexpak", description: "27-inch Full HD surveillance monitor.", price: 2890.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-coax-strip-tool", name: "CCTV Cable Coax Strip Tool", category: "cctv", group: "tools", brand: "Nexpak", description: "Coaxial cable stripping tool for CCTV installation.", price: 120.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-bnc-crimp-tool", name: "CCTV Heavy Duty BNC Crimp Tool", category: "cctv", group: "tools", brand: "Nexpak", description: "Heavy-duty BNC crimping tool for CCTV cable installation.", price: 280.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-dahua-option", name: "Dahua Technology", category: "cctv", group: "brands", brand: "Dahua", description: "Dahua Technology HD CCTV equipment.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "hd-hikvision-option", name: "Hikvision", category: "cctv", group: "brands", brand: "Hikvision", description: "Hikvision HD CCTV equipment.", price: 120.0, unit: "each", weightKg: 0.0, image: "" },
            { id: "HD-BULLET-30M", name: "HD 2MP Bullet Camera - 30m IR", category: "cctv", group: "cameras", brand: "Dahua", description: "2MP high-definition infrared bullet camera with up to 30m night vision.", price: 380.0, unit: "each", weightKg: 0.4, image: "" },
            { id: "HD-DOME-20M", name: "HD 2MP Dome Camera - 20m IR", category: "cctv", group: "cameras", brand: "Dahua", description: "2MP indoor/outdoor dome camera with infrared night vision.", price: 360.0, unit: "each", weightKg: 0.35, image: "" },
            { id: "HD-VARIFOCAL-BULLET", name: "HD Varifocal Bullet Camera - 60m IR", category: "cctv", group: "cameras", brand: "Dahua", description: "Professional varifocal bullet camera with long-range infrared illumination.", price: 890.0, unit: "each", weightKg: 0.8, image: "" },
            { id: "HD-VARIFOCAL-DOME", name: "HD Varifocal Dome Camera - 40m IR", category: "cctv", group: "cameras", brand: "Dahua", description: "Professional varifocal dome camera for flexible surveillance coverage.", price: 820.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "HD-DVR-8CH", name: "8 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "8-channel HD DVR for residential and small-business surveillance.", price: 1450.0, unit: "each", weightKg: 1.5, image: "" },
            { id: "HD-DVR-16CH", name: "16 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "16-channel HD DVR for medium-sized surveillance installations.", price: 2650.0, unit: "each", weightKg: 2.2, image: "" },
            { id: "HD-DVR-32CH", name: "32 Channel HD DVR", category: "cctv", group: "recorders", brand: "Dahua", description: "32-channel professional HD DVR for larger surveillance systems.", price: 5400.0, unit: "each", weightKg: 3.8, image: "" },
            { id: "HD-HDD-1TB", name: "1TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "1TB surveillance-rated hard drive for continuous CCTV recording.", price: 780.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "HD-HDD-2TB", name: "2TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "2TB surveillance-rated hard drive for extended recording storage.", price: 1150.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "HD-HDD-4TB", name: "4TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "4TB surveillance hard drive for larger CCTV installations.", price: 1890.0, unit: "each", weightKg: 0.65, image: "" },
            { id: "HD-HDD-6TB", name: "6TB Surveillance Hard Drive", category: "cctv", group: "storage", brand: "Surveillance", description: "6TB surveillance-rated hard drive for high-capacity recording.", price: 2950.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "HD-PSU-1WAY", name: "1-Way CCTV Power Adapter", category: "cctv", group: "power", brand: "Nexpak", description: "12V CCTV power adapter for individual camera installations.", price: 120.0, unit: "each", weightKg: 0.2, image: "" },
            { id: "HD-PSU-9WAY", name: "9-Way 10A CCTV Power Box", category: "cctv", group: "power", brand: "Nexpak", description: "9-way CCTV power distribution box for multi-camera systems.", price: 480.0, unit: "each", weightKg: 1.6, image: "" },
            { id: "HD-RG59-100M", name: "RG59 + Power CCTV Cable - 100m", category: "cctv", group: "cables", brand: "Nexpak", description: "100m RG59 coaxial CCTV cable with integrated power conductors.", price: 420.0, unit: "each", weightKg: 4.5, image: "" },
            { id: "HD-CAT5E-100M", name: "Cat5e CCTV Cable - 100m", category: "cctv", group: "cables", brand: "Nexpak", description: "100m Cat5e network cable suitable for CCTV installations.", price: 380.0, unit: "each", weightKg: 3.2, image: "" },
            { id: "HD-BNC-DC-SET", name: "BNC Crimp + DC Lead Set", category: "cctv", group: "connectors", brand: "Nexpak", description: "BNC video connector and DC power lead set for HD CCTV installations.", price: 25.0, unit: "each", weightKg: 0.05, image: "" },
            { id: "HD-VIDEO-BALUN", name: "HD Video Balun Pair", category: "cctv", group: "connectors", brand: "Nexpak", description: "HD video balun pair for transmitting CCTV video over twisted-pair cable.", price: 65.0, unit: "each", weightKg: 0.08, image: "" },
            { id: "HD-JUNCTION-BOX", name: "100x100mm CCTV Junction Box", category: "cctv", group: "accessories", brand: "Nexpak", description: "Weather-resistant junction enclosure for CCTV camera connections.", price: 28.0, unit: "each", weightKg: 0.1, image: "" },
            { id: "HD-MONITOR-19", name: "19-Inch LED CCTV Monitor", category: "cctv", group: "displays", brand: "Nexpak", description: "19-inch LED monitor suitable for CCTV monitoring applications.", price: 1450.0, unit: "each", weightKg: 2.8, image: "" },
            { id: "HD-MONITOR-27", name: "27-Inch FHD CCTV Monitor", category: "cctv", group: "displays", brand: "Nexpak", description: "27-inch Full HD LED monitor for professional CCTV viewing.", price: 2890.0, unit: "each", weightKg: 4.5, image: "" },
            { id: "HD-COAX-STRIP-TOOL", name: "CCTV Coax Cable Strip Tool", category: "cctv", group: "tools", brand: "Nexpak", description: "Dedicated coaxial cable stripping tool for CCTV installation.", price: 120.0, unit: "each", weightKg: 0.15, image: "" },
            { id: "HD-BNC-CRIMP-TOOL", name: "Heavy Duty BNC Crimp Tool", category: "cctv", group: "tools", brand: "Nexpak", description: "Heavy-duty crimping tool for professional BNC CCTV connectors.", price: 280.0, unit: "each", weightKg: 0.45, image: "" },
        ],

        /* ============================================================== */
       "ip-cctv": [
            { id: "ip-nvr-4ch-poe", name: "4 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "4-channel network video recorder with built-in Power over Ethernet ports.", price: 2100.0, unit: "each", weightKg: 1.8, image: "" },
            { id: "ip-nvr-8ch-poe", name: "8 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "8-channel PoE network video recorder for IP CCTV installations.", price: 3400.0, unit: "each", weightKg: 2.4, image: "" },
            { id: "ip-nvr-16ch-poe", name: "16 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "16-channel PoE network video recorder for medium and large IP CCTV systems.", price: 5800.0, unit: "each", weightKg: 3.6, image: "" },
            { id: "ip-nvr-32ch", name: "32 Channel NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "32-channel network video recorder for larger commercial IP surveillance systems.", price: 7900.0, unit: "each", weightKg: 4.2, image: "" },
            { id: "ip-camera-4mp-turret", name: "4MP PoE Turret Dome Camera 30m IR", category: "ip-cctv", group: "cameras", brand: "Dahua", description: "4MP network turret camera with PoE connectivity and approximately 30m infrared night vision.", price: 780.0, unit: "each", weightKg: 0.45, image: "" },
            { id: "ip-camera-8mp-bullet", name: "8MP 4K Ultra HD Bullet Camera 50m IR", category: "ip-cctv", group: "cameras", brand: "Dahua", description: "8MP 4K IP bullet camera with PoE and approximately 50m infrared night vision.", price: 1450.0, unit: "each", weightKg: 0.65, image: "" },
            { id: "ip-camera-4mp-ptz", name: "4MP Speed Dome PTZ 100m IR", category: "ip-cctv", group: "cameras", brand: "Dahua", description: "4MP PTZ network camera with long-range infrared illumination.", price: 4800.0, unit: "each", weightKg: 2.8, image: "" },
            { id: "ip-hdd-1tb", name: "1TB Surveillance Hard Drive", category: "ip-cctv", group: "storage", brand: "Surveillance", description: "1TB surveillance-rated hard drive for IP CCTV recording.", price: 780.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "ip-hdd-2tb", name: "2TB Surveillance Hard Drive", category: "ip-cctv", group: "storage", brand: "Surveillance", description: "2TB surveillance-rated hard drive for extended IP CCTV recording.", price: 1150.0, unit: "each", weightKg: 0.6, image: "" },
            { id: "ip-hdd-4tb", name: "4TB Surveillance Hard Drive", category: "ip-cctv", group: "storage", brand: "Surveillance", description: "4TB surveillance-rated hard drive for extended IP CCTV recording.", price: 1890.0, unit: "each", weightKg: 0.65, image: "" },
            { id: "ip-cat5e-100m", name: "Cat5e Network Cable 100m", category: "ip-cctv", group: "cabling", brand: "Nexpak", description: "100m Cat5e network cable for IP cameras and network infrastructure.", price: 380.0, unit: "100m roll", weightKg: 3.2, image: "" },
            { id: "ip-cat6-100m", name: "Cat6 Network Cable 100m", category: "ip-cctv", group: "cabling", brand: "Nexpak", description: "100m Cat6 network cable for IP CCTV and network installations.", price: 520.0, unit: "100m roll", weightKg: 3.5, image: "" },
            { id: "ip-poe-switch-4", name: "4-Port PoE Network Switch", category: "ip-cctv", group: "networking", brand: "Dahua", description: "Compact PoE switch for powering network cameras.", price: 950.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "ip-poe-switch-8", name: "8-Port PoE Network Switch", category: "ip-cctv", group: "networking", brand: "Dahua", description: "8-port PoE network switch for IP camera installations.", price: 1450.0, unit: "each", weightKg: 1.0, image: "" },
            { id: "ip-poe-switch-16", name: "16-Port PoE Network Switch", category: "ip-cctv", group: "networking", brand: "Dahua", description: "16-port PoE network switch for larger IP surveillance systems.", price: 2650.0, unit: "each", weightKg: 1.8, image: "" },
            { id: "ip-rj45-connectors", name: "RJ45 Network Connectors", category: "ip-cctv", group: "connectors", brand: "Nexpak", description: "RJ45 connectors for terminating CCTV network cables.", price: 45.0, unit: "100 pack", weightKg: 0.15, image: "" },
            { id: "IP-NVR-4CH-POE", name: "4 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "4-channel network video recorder with integrated PoE ports.", price: 2100.0, unit: "each", weightKg: 1.8, image: "" },
            { id: "IP-NVR-8CH-POE", name: "8 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "8-channel PoE NVR for residential and small-business IP systems.", price: 3400.0, unit: "each", weightKg: 2.4, image: "" },
            { id: "IP-NVR-16CH-POE", name: "16 Channel PoE NVR", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "16-channel PoE NVR for medium-sized IP CCTV installations.", price: 5800.0, unit: "each", weightKg: 3.6, image: "" },
            { id: "IP-NVR-32CH", name: "32 Channel NVR - No Built-in PoE", category: "ip-cctv", group: "recorders", brand: "Dahua", description: "32-channel professional NVR designed for larger IP surveillance systems.", price: 7900.0, unit: "each", weightKg: 4.2, image: "" },
        ],

        /* ============================================================== */

       "roboguard": [
            { id: "rg-base-station", name: "Roboguard Base Station", category: "roboguard", group: "base-stations", brand: "Roboguard", description: "Wireless Roboguard base station for receiving outdoor beam alerts.", price: 2850.0, unit: "each", weightKg: 1.2, image: "" },
            { id: "rg-wireless-beam", name: "Roboguard Wireless Beam", category: "roboguard", group: "beams", brand: "Roboguard", description: "Wireless outdoor perimeter beam detector for early warning protection.", price: 1850.0, unit: "each", weightKg: 0.85, image: "" },
            { id: "rg-beam-bracket", name: "Roboguard Beam Mounting Bracket", category: "roboguard", group: "brackets", brand: "Roboguard", description: "Mounting bracket for positioning Roboguard outdoor beams.", price: 185.0, unit: "each", weightKg: 0.25, image: "" },
            { id: "rg-repeater", name: "Roboguard Wireless Repeater", category: "roboguard", group: "communication", brand: "Roboguard", description: "Wireless repeater for extending Roboguard communication range.", price: 1650.0, unit: "each", weightKg: 0.5, image: "" },
            { id: "rg-solar-panel", name: "Roboguard Solar Panel", category: "roboguard", group: "power", brand: "Roboguard", description: "Solar charging panel for suitable Roboguard outdoor installations.", price: 950.0, unit: "each", weightKg: 1.5, image: "" },
            { id: "rg-battery", name: "Roboguard Rechargeable Battery", category: "roboguard", group: "power", brand: "Roboguard", description: "Rechargeable battery for Roboguard wireless beam equipment.", price: 420.0, unit: "each", weightKg: 0.8, image: "" },
            { id: "rg-siren", name: "Roboguard External Siren", category: "roboguard", group: "alerts", brand: "Roboguard", description: "External audible warning siren for Roboguard installations.", price: 450.0, unit: "each", weightKg: 0.7, image: "" },
            { id: "rg-strobe", name: "Roboguard Strobe Light", category: "roboguard", group: "alerts", brand: "Roboguard", description: "Visual warning strobe for Roboguard alarm events.", price: 380.0, unit: "each", weightKg: 0.3, image: "" },
        ],

        /* ============================================================== */
       "gate-automation": [
            { id: "gate-centurion-d5-evo", name: "Centurion D5-Evo Gate Motor", category: "gate-automation", group: "gate-motors", brand: "Centurion", description: "Sliding gate motor for residential and light commercial applications.", price: 4650.0, unit: "each", weightKg: 9.5, image: "" },
            { id: "gate-centurion-d5-smart", name: "Centurion D5 Smart Gate Motor", category: "gate-automation", group: "gate-motors", brand: "Centurion", description: "Smart sliding gate motor with enhanced connectivity and automation features.", price: 5850.0, unit: "each", weightKg: 10.0, image: "" },
            { id: "gate-centurion-d10-smart", name: "Centurion D10 Turbo Smart", category: "gate-automation", group: "gate-motors", brand: "Centurion", description: "Heavy-duty sliding gate automation solution for larger gates.", price: 9200.0, unit: "each", weightKg: 12.5, image: "" },
            { id: "gate-steel-rack-2m", name: "Steel Gate Rack 2m", category: "gate-automation", group: "rack", brand: "Centurion", description: "Steel rack section for sliding gate automation.", price: 280.0, unit: "2m section", weightKg: 1.8, image: "" },
            { id: "gate-nylon-rack-2m", name: "Nylon Gate Rack 2m", category: "gate-automation", group: "rack", brand: "Centurion", description: "Nylon rack section for sliding gate automation.", price: 250.0, unit: "2m section", weightKg: 0.9, image: "" },
            { id: "gate-remote-4button", name: "Centurion 4-Button Remote", category: "gate-automation", group: "remotes", brand: "Centurion", description: "Four-button remote control for compatible Centurion gate automation systems.", price: 220.0, unit: "each", weightKg: 0.08, image: "" },
            { id: "gate-battery-7ah", name: "Gate Motor 7Ah Backup Battery", category: "gate-automation", group: "backup-power", brand: "Nexpak", description: "7Ah rechargeable backup battery for gate automation systems.", price: 280.0, unit: "each", weightKg: 2.2, image: "" },
            { id: "gate-antitheft-bracket", name: "Heavy-Duty Anti-Theft Gate Motor Bracket", category: "gate-automation", group: "security", brand: "Centurion", description: "Heavy-duty anti-theft mounting bracket for sliding gate motors.", price: 550.0, unit: "each", weightKg: 2.5, image: "" },
        ],

        /* ============================================================== */

       "alarm-systems": [
            { id: "alarm-panel-placeholder-1", name: "PLACEHOLDER - Alarm Panel (add real product)", category: "alarm-systems", group: "panels", brand: "Nexpak", description: "Placeholder product - replace with real Alarm System catalogue item.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
        ],

        /* ============================================================== */
        "access-control": [
            { id: "ac-placeholder-1", name: "PLACEHOLDER - Access Control Product (add real product)", category: "access-control", group: "general", brand: "Nexpak", description: "Placeholder product - replace with real Access Control catalogue item.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
        ],

        /* ============================================================== */
        "intercom-systems": [
            { id: "ic-placeholder-1", name: "PLACEHOLDER - Intercom Product (add real product)", category: "intercom-systems", group: "general", brand: "Nexpak", description: "Placeholder product - replace with real Intercom System catalogue item.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
        ],

        /* ============================================================== */
        "security-accessories": [
            { id: "sa-placeholder-1", name: "PLACEHOLDER - Security Accessory (add real product)", category: "security-accessories", group: "general", brand: "Nexpak", description: "Placeholder product - replace with real Security Accessories catalogue item.", price: 0.0, unit: "each", weightKg: 0.0, image: "" },
        ],

    }

};

/* ==========================================================================
   END OF SHOP DATA
   ========================================================================== */
