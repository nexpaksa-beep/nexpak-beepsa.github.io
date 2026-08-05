/**
 * js/shop-data.js
 * Nexpak Security Solutions - Complete Product Catalog & Configuration Database
 * All prices are listed in ZAR (South African Rand) excluding 15% VAT.
 */

const SHOP_DATA = {
  company: {
    name: "Nexpak Security Solutions",
    whatsapp: "27836308249",
    currency: "ZAR",
    vatRate: 0.15
  },

  // ---------------------------------------------------------------------------
  // 1. CATEGORIES MASTER LIST
  // ---------------------------------------------------------------------------
  categories: [
    {
      id: "electric-fencing",
      title: "Electric Fencing Kits",
      desc: "Configure complete perimeter fencing, energizers, brackets, wire rolls, and hardware.",
      icon: "fa-bolt"
    },
    {
      id: "cctv-hd",
      title: "CCTV HD Systems",
      desc: "High-definition analog HD-TVI/CVI surveillance kits, DVRs, hard drives, and cables.",
      icon: "fa-video"
    },
    {
      id: "cctv-ip",
      title: "IP CCTV Systems",
      desc: "Network IP security systems, 4K NVRs, PoE switches, and ultra HD cameras.",
      icon: "fa-network-wired"
    },
    {
      id: "roboguard",
      title: "Roboguard Outdoor Beams",
      desc: "Early-warning wireless outdoor beam detection systems and base stations.",
      icon: "fa-shield-cat"
    },
    {
      id: "gate-motors",
      title: "Centurion Gate Motors",
      desc: "Sliding and swing gate automation kits, rack lengths, backup batteries, and anti-theft brackets.",
      icon: "fa-door-open"
    },
    {
      id: "ids-alarm",
      title: "IDS Alarm Kits",
      desc: "IDS 805 & X64 wired hybrid intrusion detection kits, PIRs, and HYYP modules.",
      icon: "fa-bell"
    },
    {
      id: "ajax-security",
      title: "Ajax Wireless Security",
      desc: "Next-gen Jeweller wireless security hubs, motion cameras, keypads, and outdoor detectors.",
      icon: "fa-house-lock"
    },
    {
      id: "stafix-agri",
      title: "Stafix Agri Fencing",
      desc: "Heavy-duty agricultural solar and mains electric fencing for livestock and farm protection.",
      icon: "fa-wheat-awn"
    }
  ],

  // ---------------------------------------------------------------------------
  // 2. PRE-BUILT BASE KITS
  // ---------------------------------------------------------------------------
  prebuiltKits: {
    "electric-fencing": [
      {
        id: "ef-kit-6line-50m",
        title: "Standard 6-Line Kit (50m)",
        badge: "Best Seller",
        description: "Includes 1J Energizer, 6-Line Brackets, HT Cable & Earth Spikes",
        priceExclVat: 4850.00,
        weightKg: 18.5,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300"
      },
      {
        id: "ef-kit-8line-100m",
        title: "Heavy-Duty 8-Line Kit (100m)",
        badge: "Popular",
        description: "Includes 4J Energizer, Square Tube Brackets, Siren & Strobe Light",
        priceExclVat: 8290.00,
        weightKg: 32.0,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300"
      },
      {
        id: "ef-kit-10line-200m",
        title: "Perimeter 10-Line Kit (200m)",
        badge: "Commercial",
        description: "Includes 8J Nemtek Energizer, Aluminium Wire & GSM Comm Module",
        priceExclVat: 14500.00,
        weightKg: 58.0,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300"
      },
      {
        id: "ef-kit-12line-estate",
        title: "High-Security 12-Line Estate Kit",
        badge: "Max Security",
        description: "Includes 14J Dual-Zone Energizer, WiFi Module & Heavy Backup PSU",
        priceExclVat: 22900.00,
        weightKg: 85.0,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300"
      }
    ],
    "cctv-hd": [
      {
        id: "hd-kit-4cam-1tb",
        title: "4-Camera HD Starter Kit",
        badge: "Home Basic",
        description: "4 Ch DVR, 1TB Surveillance HDD, 4x 30m IR Bullet Cams, 100m Cable",
        priceExclVat: 3450.00,
        weightKg: 6.5,
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300"
      },
      {
        id: "hd-kit-8cam-2tb",
        title: "8-Camera Pro HD Surveillance Kit",
        badge: "Best Value",
        description: "8 Ch DVR, 2TB HDD, 8x Mixed Bullet/Dome Cams, 9-Way Power Box",
        priceExclVat: 6890.00,
        weightKg: 12.0,
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. CATEGORY CONFIGURATOR SELECTORS & OPTIONS
  // ---------------------------------------------------------------------------
  configurators: {

    // ===================================
    // A. ELECTRIC FENCING KITS
    // ===================================
    "electric-fencing": [
      {
        id: "brand",
        label: "Energizer Brand",
        type: "single-select",
        options: [
          { value: "nemtek", label: "Nemtek", price: 0, weight: 0 },
          { value: "jva", label: "JVA", price: 250.00, weight: 0 }
        ]
      },
      {
        id: "bracketLines",
        label: "Bracket Line Count",
        type: "single-select",
        options: [
          { value: "6-line", label: "6 Line", price: 0, weight: 0.4 },
          { value: "8-line", label: "8 Line", price: 15.00, weight: 0.6 },
          { value: "10-line", label: "10 Line", price: 30.00, weight: 0.8 },
          { value: "12-line", label: "12 Line", price: 45.00, weight: 1.0 }
        ]
      },
      {
        id: "bracketColour",
        label: "Bracket Finish / Colour",
        type: "single-select",
        options: [
          { value: "black", label: "Black Powder Coated", price: 0, weight: 0 },
          { value: "white", label: "White Powder Coated", price: 0, weight: 0 },
          { value: "galvanised", label: "Galvanised", price: 8.00, weight: 0.05 }
        ]
      },
      {
        id: "barType",
        label: "Bracket Bar Profile",
        type: "single-select",
        options: [
          { value: "flat-bar", label: "Flat Bar (6 Line Only)", price: 0, weight: 0.3 },
          { value: "round-bar", label: "Round Bar (6 Line Only)", price: 5.00, weight: 0.35 },
          { value: "square-tube", label: "Square Tube (All Lines)", price: 18.00, weight: 0.6 }
        ]
      },
      {
        id: "bracketStyle",
        label: "Bracket Angle Style",
        type: "single-select",
        options: [
          { value: "straight", label: "Straight Bracket", price: 0, weight: 0 },
          { value: "angle", label: "Angled Bracket", price: 6.00, weight: 0.05 }
        ]
      },
      {
        id: "stays",
        label: "Corner & End Stays",
        type: "quantity-selector",
        options: [
          { value: "stay-600-blk", label: "600mm Black Stay", price: 42.00, weight: 0.5 },
          { value: "stay-600-wht", label: "600mm White Stay", price: 42.00, weight: 0.5 },
          { value: "stay-600-galv", label: "600mm Galvanised Stay", price: 48.00, weight: 0.55 },
          { value: "stay-750-blk", label: "750mm Black Stay", price: 55.00, weight: 0.65 },
          { value: "stay-750-wht", label: "750mm White Stay", price: 55.00, weight: 0.65 },
          { value: "stay-750-galv", label: "750mm Galvanised Stay", price: 62.00, weight: 0.7 }
        ]
      },
      {
        id: "staySleeves",
        label: "Stay Sleeves",
        type: "quantity-selector",
        options: [
          { value: "sleeve-600-blk", label: "600mm Black Sleeve", price: 18.00, weight: 0.1 },
          { value: "sleeve-600-wht", label: "600mm White Sleeve", price: 18.00, weight: 0.1 },
          { value: "sleeve-750-blk", label: "750mm Black Sleeve", price: 22.00, weight: 0.12 },
          { value: "sleeve-750-wht", label: "750mm White Sleeve", price: 22.00, weight: 0.12 }
        ]
      },
      {
        id: "lugs",
        label: "Wiring Lugs",
        type: "quantity-selector",
        options: [
          { value: "lugs-6x35", label: "6 x 35mm Lugs (10pk)", price: 25.00, weight: 0.08 }
        ]
      },
      {
        id: "anchors",
        label: "Nail-In Anchors",
        type: "quantity-selector",
        options: [
          { value: "anchor-6x60", label: "6 x 60mm Anchors (100pk)", price: 95.00, weight: 0.8 },
          { value: "anchor-8x80", label: "8 x 80mm Anchors (100pk)", price: 145.00, weight: 1.2 }
        ]
      },
      {
        id: "wireRolls",
        label: "Fence Wire Spools",
        type: "quantity-selector",
        options: [
          { value: "wire-ss-1.2", label: "1.2mm Solid Stainless Steel (545m)", price: 1250.00, weight: 5.2 },
          { value: "wire-alu-1.6", label: "1.6mm Braided Aluminium (1000m)", price: 1890.00, weight: 6.8 },
          { value: "wire-galv-1.2", label: "1.2mm Braided Galvanised Wire (680m)", price: 890.00, weight: 7.5 }
        ]
      },
      {
        id: "ferrules",
        label: "Wire Ferrules (100s)",
        type: "quantity-selector",
        options: [
          { value: "ferrule-6mm-alu", label: "6mm Aluminium Ferrules (100pk)", price: 75.00, weight: 0.25 },
          { value: "ferrule-6mm-solid", label: "6mm Solid Ferrules (100pk)", price: 110.00, weight: 0.4 },
          { value: "ferrule-10mm-alu", label: "10mm Aluminium Ferrules (100pk)", price: 98.00, weight: 0.35 },
          { value: "ferrule-10mm-solid", label: "10mm Solid Ferrules (100pk)", price: 135.00, weight: 0.5 }
        ]
      },
      {
        id: "hardware",
        label: "Tensioners & Hooks",
        type: "quantity-selector",
        options: [
          { value: "tweaker-combo", label: "Tweaker Combo Tool + Springs", price: 165.00, weight: 0.3 },
          { value: "s-hooks", label: "Stainless Steel S-Hooks (20pk)", price: 85.00, weight: 0.2 }
        ]
      },
      {
        id: "earthSpikes",
        label: "Earthing Spikes",
        type: "quantity-selector",
        options: [
          { value: "spike-galv-1.2m", label: "1.2m Galvanised Earth Spike", price: 85.00, weight: 1.1 },
          { value: "spike-copper-1.2m", label: "1.2m Copper Plated Earth Spike", price: 135.00, weight: 1.2 }
        ]
      },
      {
        id: "htCable",
        label: "High Tension (HT) Cable Roll",
        type: "single-select",
        options: [
          { value: "ht-50m-soft", label: "50m HT Cable (Black Soft)", price: 290.00, weight: 2.1 },
          { value: "ht-50m-hard", label: "50m HT Cable (Black Hard)", price: 310.00, weight: 2.3 },
          { value: "ht-100m-soft", label: "100m HT Cable (Black Soft)", price: 540.00, weight: 4.0 },
          { value: "ht-100m-hard", label: "100m HT Cable (Black Hard)", price: 580.00, weight: 4.4 },
          { value: "ht-200m-soft", label: "200m HT Cable (Black Soft)", price: 980.00, weight: 7.8 },
          { value: "ht-200m-hard", label: "200m HT Cable (Black Hard)", price: 1050.00, weight: 8.5 }
        ]
      },
      {
        id: "earthLoops",
        label: "Earth Loops",
        type: "quantity-selector",
        options: [
          { value: "loop-ss", label: "Stainless Steel Earth Loop", price: 18.00, weight: 0.04 },
          { value: "loop-alu", label: "Aluminium Earth Loop", price: 14.00, weight: 0.02 },
          { value: "loop-galv", label: "Galvanised Earth Loop", price: 12.00, weight: 0.05 }
        ]
      },
      {
        id: "accessories",
        label: "Safety & Detection Accessories",
        type: "quantity-selector",
        options: [
          { value: "warning-sign", label: "Legal Warning Sign", price: 22.00, weight: 0.05 },
          { value: "gate-contact", label: "Heavy Duty Gate Contact Switch", price: 145.00, weight: 0.25 }
        ]
      },
      {
        id: "energizerOutput",
        label: "Energizer Power Output",
        type: "single-select",
        options: [
          { value: "1-joule", label: "1 Joule Energizer", price: 1850.00, weight: 2.5 },
          { value: "3-joule", label: "3 Joule Energizer", price: 2650.00, weight: 3.0 },
          { value: "4-joule", label: "4 Joule Energizer", price: 3200.00, weight: 3.2 },
          { value: "8-joule", label: "8 Joule Energizer", price: 4800.00, weight: 4.1 },
          { value: "14-joule", label: "14 Joule Energizer", price: 7500.00, weight: 5.8 },
          { value: "2-zone-8j", label: "2-Zone 8 Joule Energizer", price: 6200.00, weight: 4.8 }
        ]
      },
      {
        id: "batteryBackup",
        label: "Backup Battery",
        type: "single-select",
        options: [
          { value: "7ah-lead", label: "7Ah Lead Acid Battery", price: 280.00, weight: 2.2 },
          { value: "9ah-gel", label: "9Ah Deep Cycle Gel Battery", price: 420.00, weight: 2.7 }
        ]
      },
      {
        id: "powerSupply",
        label: "Power Supply & Keypad",
        type: "single-select",
        options: [
          { value: "psu-16a", label: "16 Amp PSU Only", price: 350.00, weight: 1.0 },
          { value: "keypad-lcd", label: "LCD Keypad Programmer", price: 850.00, weight: 0.4 },
          { value: "psu-keypad-combo", label: "16A PSU + LCD Keypad", price: 1150.00, weight: 1.4 }
        ]
      },
      {
        id: "enclosure",
        label: "Weatherproof Enclosure Box",
        type: "single-select",
        options: [
          { value: "dmc-430", label: "DMC 430 Enclosure", price: 450.00, weight: 1.8 },
          { value: "dmc-530", label: "DMC 530 High Enclosure", price: 620.00, weight: 2.4 }
        ]
      },
      {
        id: "commsModule",
        label: "Smart Remote Communication",
        type: "single-select",
        options: [
          { value: "none", label: "No Remote Module", price: 0, weight: 0 },
          { value: "wifi-module", label: "WiFi Smartphone Module", price: 890.00, weight: 0.2 },
          { value: "gsm-module", label: "GSM Cellular Module", price: 1450.00, weight: 0.3 }
        ]
      },
      {
        id: "visualAudioAlerts",
        label: "Alert Siren & Lights",
        type: "quantity-selector",
        options: [
          { value: "siren-15w", label: "15W Security Siren", price: 120.00, weight: 0.4 },
          { value: "strobe-light", label: "Strobe Warning Light", price: 145.00, weight: 0.2 },
          { value: "nite-light-red", label: "Red Nite Light LED", price: 180.00, weight: 0.15 },
          { value: "nite-light-blue", label: "Blue Nite Light LED", price: 180.00, weight: 0.15 },
          { value: "nite-light-green", label: "Green Nite Light LED", price: 180.00, weight: 0.15 }
        ]
      },
      {
        id: "installation",
        label: "Professional Installation",
        type: "single-select",
        options: [
          { value: "diy", label: "No Installation (DIY)", price: 0, weight: 0 },
          { value: "pro-install", label: "Nexpak Certified Installation", price: 2500.00, weight: 0 }
        ]
      }
    ],

    // ===================================
    // B. CCTV HD SYSTEMS
    // ===================================
    "cctv-hd": [
      {
        id: "cctvBrand",
        label: "Camera Brand",
        type: "single-select",
        options: [
          { value: "dahua", label: "Dahua Technology", price: 0, weight: 0 },
          { value: "hikvision", label: "Hikvision", price: 120.00, weight: 0 }
        ]
      },
      {
        id: "dvrChannels",
        label: "DVR Recorder Channels",
        type: "single-select",
        options: [
          { value: "8-ch", label: "8 Channel DVR", price: 1450.00, weight: 1.5 },
          { value: "16-ch", label: "16 Channel DVR", price: 2650.00, weight: 2.2 },
          { value: "32-ch", label: "32 Channel DVR", price: 5400.00, weight: 3.8 }
        ]
      },
      {
        id: "hardDrive",
        label: "Surveillance Hard Drive",
        type: "single-select",
        options: [
          { value: "1tb", label: "1TB HDD", price: 780.00, weight: 0.6 },
          { value: "2tb", label: "2TB HDD", price: 1150.00, weight: 0.6 },
          { value: "4tb", label: "4TB HDD", price: 1890.00, weight: 0.65 },
          { value: "6tb", label: "6TB HDD", price: 2950.00, weight: 0.7 }
        ]
      },
      {
        id: "powerSupply",
        label: "CCTV Power Supply",
        type: "single-select",
        options: [
          { value: "1-way-psu", label: "1-Way Plug-in Adapter", price: 120.00, weight: 0.2 },
          { value: "9-way-psu", label: "9-Way 10A Power Box", price: 480.00, weight: 1.6 }
        ]
      },
      {
        id: "fixedCameras",
        label: "Fixed Lens Infrared Cameras",
        type: "quantity-selector",
        options: [
          { value: "bullet-30m", label: "Bullet 30m IR Camera", price: 380.00, weight: 0.4 },
          { value: "dome-20m", label: "Dome 20m IR Camera", price: 360.00, weight: 0.35 }
        ]
      },
      {
        id: "varifocalCameras",
        label: "Varifocal Cameras",
        type: "quantity-selector",
        options: [
          { value: "varifocal-bullet-60m", label: "Varifocal 60m Bullet IR", price: 890.00, weight: 0.8 },
          { value: "varifocal-dome-40m", label: "Varifocal 40m Dome IR", price: 820.00, weight: 0.7 }
        ]
      },
      {
        id: "cables",
        label: "CCTV Cable Spools",
        type: "single-select",
        options: [
          { value: "rg59-100m", label: "RG59 Coax + Power Cable 100m Roll", price: 420.00, weight: 4.5 },
          { value: "cat5-100m", label: "Cat 5e Cable 100m Roll", price: 380.00, weight: 3.2 }
        ]
      },
      {
        id: "connectors",
        label: "Connectors & Baluns",
        type: "quantity-selector",
        options: [
          { value: "bnc-crimp-dc", label: "BNC Crimp + DC Lead Set", price: 25.00, weight: 0.05 },
          { value: "video-balun", label: "HD Video Balun Pair", price: 65.00, weight: 0.08 }
        ]
      },
      {
        id: "accessories",
        label: "Enclosures & Displays",
        type: "quantity-selector",
        options: [
          { value: "box-100x100", label: "100x100mm Joint Enclosure", price: 28.00, weight: 0.1 },
          { value: "screen-19", label: "19-Inch LED Monitor", price: 1450.00, weight: 2.8 },
          { value: "screen-27", label: "27-Inch FHD LED Monitor", price: 2890.00, weight: 4.5 },
          { value: "strip-tool", label: "CCTV Cable Coax Strip Tool", price: 120.00, weight: 0.15 },
          { value: "crimp-tool", label: "CCTV Heavy Duty BNC Crimp Tool", price: 280.00, weight: 0.45 }
        ]
      }
    ],

    // ===================================
    // C. IP CCTV SYSTEMS
    // ===================================
    "cctv-ip": [
      {
        id: "ipBrand",
        label: "IP System Brand",
        type: "single-select",
        options: [
          { value: "dahua-ip", label: "Dahua IP", price: 0, weight: 0 },
          { value: "hikvision-ip", label: "Hikvision IP", price: 150.00, weight: 0 }
        ]
      },
      {
        id: "nvrChannels",
        label: "PoE NVR Recorder",
        type: "single-select",
        options: [
          { value: "4-ch-poe", label: "4 Channel PoE NVR", price: 2100.00, weight: 1.8 },
          { value: "8-ch-poe", label: "8 Channel PoE NVR", price: 3400.00, weight: 2.4 },
          { value: "16-ch-poe", label: "16 Channel PoE NVR", price: 5800.00, weight: 3.6 },
          { value: "32-ch-poe", label: "32 Channel NVR (No Built-in PoE)", price: 7900.00, weight: 4.2 }
        ]
      },
      {
        id: "ipCameras",
        label: "IP Network Cameras",
        type: "quantity-selector",
        options: [
          { value: "ip-4mp-turret", label: "4MP PoE Turret Dome 30m IR", price: 780.00, weight: 0.45 },
          { value: "ip-8mp-bullet", label: "8MP 4K Ultra HD Bullet 50m IR", price: 1450.00, weight: 0.65 },
          { value: "ip-4mp-ptz", label: "4MP Speed Dome PTZ 100m IR", price: 4800.00, weight: 2.8 }
        ]
      },
      {
        id: "networkGear",
        label: "Network Cable & Switches",
        ty
