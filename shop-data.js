// ===== NEXPAK PRODUCT DATABASE =====

const products = [

    // =========================
    // BUBBLE WRAP
    // =========================

    {
        id: "BW-312",
        name: "Bubble Wrap 312mm",
        category: "wrap",
        subCategory: "bubble-wrap",
        specs: "100m x 312mm",
        price: 128.89,
        minOrder: 10,
        unit: "roll",
        icon: "🫧",
        description: "Protective bubble wrap for fragile goods and courier packaging.",
        features: ["Lightweight", "Shock absorbing", "Industrial grade"],
        images: [
            "/products/bubblew1.jpeg",
            "/products/bubblew2.jpeg",
            "/products/bubblew3.jpeg",
            "/products/bubblew4.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: true
    },

    {
        id: "BW-416",
        name: "Bubble Wrap 416mm",
        category: "wrap",
        subCategory: "bubble-wrap",
        specs: "100m x 416mm",
        price: 171.85,
        minOrder: 10,
        unit: "roll",
        icon: "🫧",
        description: "Protective packaging for delicate products.",
        features: ["Reusable", "Strong", "Lightweight"],
        images: [
            "/products/bubblew1.jpeg",
            "/products/bubblew2.jpeg",
            "/products/bubblew3.jpeg",
            "/products/bubblew4.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: false
    },

    {
        id: "BW-625",
        name: "Bubble Wrap 625mm",
        category: "wrap",
        subCategory: "bubble-wrap",
        specs: "100m x 625mm",
        price: 252.82,
        minOrder: 10,
        unit: "roll",
        icon: "🫧",
        description: "Industrial bubble wrap ideal for shipping and storage.",
        features: ["Shock absorbing", "Flexible", "Durable"],
        images: [
            "/products/bubblew1.jpeg",
            "/products/bubblew2.jpeg",
            "/products/bubblew3.jpeg",
            "/products/bubblew4.jpeg"
        ],
        stock: 400,
        featured: true,
        bestSeller: true
    },

    {
        id: "BW-1250",
        name: "Bubble Wrap 1250mm",
        category: "wrap",
        subCategory: "bubble-wrap",
        specs: "100m x 1250mm",
        price: 376.74,
        minOrder: 10,
        unit: "roll",
        icon: "🫧",
        description: "Large-format bubble wrap for furniture and heavy-duty packaging.",
        features: ["Wide coverage", "Protective", "Professional grade"],
        images: [
            "/products/bubblew1.jpeg",
            "/products/bubblew2.jpeg",
            "/products/bubblew3.jpeg",
            "/products/bubblew4.jpeg"
        ],
        stock: 300,
        featured: true,
        bestSeller: true
    },

    // =========================
    // PALLET WRAP
    // =========================

    {
        id: "PW-10",
        name: "Pallet Wrap 10 Micron",
        category: "wrap",
        subCategory: "stretch-film",
        specs: "450mm x 400m x 10mic",
        price: 132.49,
        minOrder: 10,
        unit: "roll",
        icon: "🧵",
        description: "Economical stretch film for pallet stabilization.",
        features: ["High stretch", "Clear film", "Warehouse use"],
        images: [
            "/products/stretch1.jpeg",
            "/products/stretch2.jpeg",
            "/products/stretch3.jpeg",
            "/products/stretch4.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: false
    },

    {
        id: "PW-15",
        name: "Pallet Wrap 15 Micron",
        category: "wrap",
        subCategory: "stretch-film",
        specs: "450mm x 400m x 15mic",
        price: 198.74,
        minOrder: 10,
        unit: "roll",
        icon: "🧵",
        description: "Premium stretch film for securing pallet loads.",
        features: ["Strong cling", "Industrial grade", "Clear finish"],
        images: [
            "/products/stretch1.jpeg",
            "/products/stretch2.jpeg",
            "/products/stretch3.jpeg",
            "/products/stretch4.jpeg"
        ],
        stock: 450,
        featured: true,
        bestSeller: true
    },

    {
        id: "PW-20",
        name: "Pallet Wrap 20 Micron",
        category: "wrap",
        subCategory: "stretch-film",
        specs: "450mm x 400m x 20mic",
        price: 264.98,
        minOrder: 10,
        unit: "roll",
        icon: "🧵",
        description: "Heavy-duty stretch wrap for warehouse and logistics use.",
        features: ["Durable", "High cling", "Professional quality"],
        images: [
            "/products/stretch1.jpeg",
            "/products/stretch2.jpeg",
            "/products/stretch3.jpeg",
            "/products/stretch4.jpeg"
        ],
        stock: 400,
        featured: true,
        bestSeller: true
    },

    {
        id: "PW-25",
        name: "Pallet Wrap 25 Micron",
        category: "wrap",
        subCategory: "stretch-film",
        specs: "450mm x 400m x 25mic",
        price: 331.22,
        minOrder: 10,
        unit: "roll",
        icon: "🧵",
        description: "Maximum strength pallet wrap for demanding applications.",
        features: ["Heavy duty", "Excellent cling", "Industrial use"],
        images: [
            "/products/stretch1.jpeg",
            "/products/stretch2.jpeg",
            "/products/stretch3.jpeg",
            "/products/stretch4.jpeg"
        ],
        stock: 350,
        featured: true,
        bestSeller: true
    },

    // =========================
    // AEROTHENE
    // =========================

    {
        id: "AERO-1",
        name: "Aerothene Roll",
        category: "wrap",
        subCategory: "foam-wrap",
        specs: "Protective foam sheeting",
        price: 295.00,
        minOrder: 1,
        unit: "roll",
        icon: "🫧",
        description: "Foam protection for furniture, glass and sensitive products.",
        features: ["Scratch resistant", "Lightweight", "Flexible"],
        images: [
            "/products/aero1.jpeg",
            "/products/aero2.jpeg",
            "/products/aero3.jpeg"
        ],
        stock: 200,
        featured: true,
        bestSeller: false
    },
    // =========================
    // TAPES
    // =========================

    {
        id: "T-CLR-50",
        name: "Clear Tape 50m",
        category: "tape",
        subCategory: "clear-tape",
        specs: "48mm x 50m",
        price: 14.32,
        minOrder: 36,
        unit: "rolls",
        icon: "📼",
        description: "High-quality transparent carton sealing tape.",
        features: ["Strong adhesion", "Clear finish", "Packaging grade"],
        images: [
            "/products/cleartp1.jpeg",
            "/products/cleartp2.jpeg"
        ],
        stock: 1000,
        featured: true,
        bestSeller: true
    },

    {
        id: "T-CLR-100",
        name: "Clear Tape 100m",
        category: "tape",
        subCategory: "clear-tape",
        specs: "48mm x 100m",
        price: 28.54,
        minOrder: 36,
        unit: "rolls",
        icon: "📼",
        description: "Extra-length clear packaging tape.",
        features: ["Long roll", "Industrial use", "Strong bond"],
        images: [
            "/products/cleartp1.jpeg",
            "/products/cleartp2.jpeg"
        ],
        stock: 1000,
        featured: true,
        bestSeller: true
    },

    {
        id: "T-BUF-50",
        name: "Buff Tape 50m",
        category: "tape",
        subCategory: "buff-tape",
        specs: "48mm x 50m",
        price: 14.32,
        minOrder: 36,
        unit: "rolls",
        icon: "📼",
        description: "Brown carton sealing tape for shipping and storage.",
        features: ["Strong adhesive", "Warehouse use", "Durable"],
        images: [
            "/products/bufftp1.jpeg",
            "/products/bufftp2.jpeg"
        ],
        stock: 1000,
        featured: true,
        bestSeller: true
    },

    {
        id: "T-BUF-100",
        name: "Buff Tape 100m",
        category: "tape",
        subCategory: "buff-tape",
        specs: "48mm x 100m",
        price: 28.54,
        minOrder: 36,
        unit: "rolls",
        icon: "📼",
        description: "Heavy-duty brown packaging tape.",
        features: ["Long roll", "Industrial grade", "High strength"],
        images: [
            "/products/bufftp1.jpeg",
            "/products/bufftp2.jpeg"
        ],
        stock: 900,
        featured: true,
        bestSeller: false
    },

    {
        id: "T-FIL",
        name: "Filament Tape",
        category: "tape",
        subCategory: "filament-tape",
        specs: "48mm x 40m",
        price: 57.30,
        minOrder: 40,
        unit: "rolls",
        icon: "📼",
        description: "Reinforced filament tape for heavy-duty bundling.",
        features: ["Fiberglass reinforced", "High tensile strength"],
        images: [
            "/products/filatape.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: true
    },

    {
        id: "T-MSK",
        name: "Masking Tape",
        category: "tape",
        subCategory: "masking-tape",
        specs: "48mm x 40m",
        price: 25.17,
        minOrder: 40,
        unit: "rolls",
        icon: "📼",
        description: "General-purpose masking tape for painting and packaging.",
        features: ["Easy tear", "Clean removal", "Multi-purpose"],
        images: [
            "/products/cleartp1.jpeg"
        ],
        stock: 600,
        featured: false,
        bestSeller: false
    },

    // =========================
    // PALLET STRAPPING
    // =========================

    {
        id: "STRAP-1",
        name: "Pallet Strapping Roll",
        category: "strap",
        subCategory: "poly-strapping",
        specs: "Heavy duty pallet strapping",
        price: 395.00,
        minOrder: 1,
        unit: "roll",
        icon: "📦",
        description: "Strong pallet strapping for securing loads.",
        features: ["High strength", "Industrial use", "Reliable"],
        images: [
            "/products/palletstrap.jpeg"
        ],
        stock: 150,
        featured: true,
        bestSeller: true
    },

    // =========================
    // BUCKLES & CLIPS
    // =========================

    {
        id: "BUCKLE-1",
        name: "Strapping Buckles & Clips",
        category: "strap",
        subCategory: "buckles",
        specs: "Metal fastening clips",
        price: 95.00,
        minOrder: 1,
        unit: "pack",
        icon: "🔩",
        description: "Metal buckles for pallet strapping systems.",
        features: ["Corrosion resistant", "Secure fastening"],
        images: [
            "/products/buckle1.jpeg",
            "/products/buckle2.jpeg",
            "/products/buckle3.jpeg",
            "/products/buckle4.jpeg"
        ],
        stock: 300,
        featured: false,
        bestSeller: true
    },

    // =========================
    // SINGLE WALL BOXES
    // =========================

    {
        id: "SWB-230",
        name: "Single Wall Box 230mm",
        category: "boxes",
        subCategory: "single-wall",
        specs: "230x150x150",
        price: 6.64,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Single-wall corrugated carton for lightweight products.",
        features: ["Lightweight", "Stackable", "Durable"],
        images: [
            "/products/singlebox1.jpeg",
            "/products/singlebox2.jpeg",
            "/products/singlebox3.jpeg"
        ],
        stock: 5000,
        featured: true,
        bestSeller: true
    },

    {
        id: "SWB-250",
        name: "Single Wall Box 250mm",
        category: "boxes",
        subCategory: "single-wall",
        specs: "250x150x250",
        price: 5.00,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Strong single-wall carton for packaging applications.",
        features: ["Corrugated board", "Stackable"],
        images: [
            "/products/singlebox1.jpeg",
            "/products/singlebox2.jpeg",
            "/products/singlebox3.jpeg"
        ],
        stock: 5000,
        featured: true,
        bestSeller: true
    },

    // =========================
    // DOUBLE WALL BOXES
    // =========================

    {
        id: "DWB-1",
        name: "Double Wall Box",
        category: "boxes",
        subCategory: "double-wall",
        specs: "Heavy duty export carton",
        price: 18.50,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Heavy-duty double-wall box for industrial applications.",
        features: ["Extra strength", "Export quality"],
        images: [
            "/products/doublebox1.jpeg",
            "/products/doublebox2.jpeg",
            "/products/doublebox3.jpeg"
        ],
        stock: 3000,
        featured: true,
        bestSeller: false
    },

    // =========================
    // TVL BOXES
    // =========================

    {
        id: "TVL-147",
        name: "TVL Box 147mm",
        category: "boxes",
        subCategory: "tvl-boxes",
        specs: "500x400x147",
        price: 17.84,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Heavy-duty corrugated TVL box.",
        features: ["Strong construction", "Stackable"],
        images: [
            "/products/tvlbox1.jpeg",
            "/products/tvlbox2.jpeg"
        ],
        stock: 4000,
        featured: true,
        bestSeller: true
    },

    {
        id: "TVL-286",
        name: "TVL Box 286mm",
        category: "boxes",
        subCategory: "tvl-boxes",
        specs: "500x400x286",
        price: 20.30,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Large industrial corrugated box.",
        features: ["Durable", "High load capacity"],
        images: [
            "/products/tvlbox1.jpeg",
            "/products/tvlbox2.jpeg"
        ],
        stock: 4000,
        featured: true,
        bestSeller: false
    },

    {
        id: "TVL-450",
        name: "TVL Box 450mm",
        category: "boxes",
        subCategory: "tvl-boxes",
        specs: "500x400x450",
        price: 25.07,
        minOrder: 500,
        unit: "units",
        icon: "📦",
        description: "Large-volume heavy-duty box.",
        features: ["High strength", "Warehouse use"],
        images: [
            "/products/tvlbox1.jpeg",
            "/products/tvlbox2.jpeg"
        ],
        stock: 3500,
        featured: true,
        bestSeller: true
    },
    // =========================
    // HARD HATS
    // =========================

    {
        id: "PPE-HH-YEL",
        name: "Hard Hat Yellow",
        category: "ppe",
        subCategory: "hard-hats",
        specs: "Safety Certified",
        price: 71.99,
        minOrder: 1,
        unit: "units",
        icon: "🪖",
        description: "Industrial safety helmet for construction and warehouse environments.",
        features: ["Impact resistant", "Lightweight", "Adjustable fit"],
        images: [
            "/products/hat1.jpeg",
            "/products/hat2.jpeg",
            "/products/hat3.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: true
    },

    {
        id: "PPE-HH-WHT",
        name: "Hard Hat White",
        category: "ppe",
        subCategory: "hard-hats",
        specs: "Safety Certified",
        price: 71.99,
        minOrder: 1,
        unit: "units",
        icon: "🪖",
        description: "Professional-grade safety helmet.",
        features: ["Adjustable", "Impact resistant"],
        images: [
            "/products/hat1.jpeg",
            "/products/hat2.jpeg",
            "/products/hat3.jpeg"
        ],
        stock: 500,
        featured: false,
        bestSeller: false
    },

    {
        id: "PPE-HH-ORG",
        name: "Hard Hat Orange",
        category: "ppe",
        subCategory: "hard-hats",
        specs: "Safety Certified",
        price: 71.99,
        minOrder: 1,
        unit: "units",
        icon: "🪖",
        description: "High-visibility safety helmet.",
        features: ["Comfort fit", "Durable shell"],
        images: [
            "/products/hat1.jpeg",
            "/products/hat2.jpeg",
            "/products/hat3.jpeg"
        ],
        stock: 500,
        featured: false,
        bestSeller: false
    },

    // =========================
    // SAFETY GOGGLES
    // =========================

    {
        id: "PPE-GOGGLES-CLR",
        name: "Safety Goggles Clear",
        category: "ppe",
        subCategory: "eye-protection",
        specs: "UV Protection",
        price: 55.99,
        minOrder: 1,
        unit: "units",
        icon: "🥽",
        description: "Protective goggles for industrial and workshop applications.",
        features: ["UV resistant", "Impact resistant"],
        images: [
            "/products/eye1.jpeg",
            "/products/eye2.jpeg",
            "/products/eye3.jpeg",
            "/products/eye4.jpeg"
        ],
        stock: 800,
        featured: true,
        bestSeller: true
    },

    // =========================
    // EAR PLUGS
    // =========================

    {
        id: "EAR-PLUG",
        name: "Safety Ear Plugs",
        category: "ppe",
        subCategory: "hearing-protection",
        specs: "Noise reduction",
        price: 29.99,
        minOrder: 1,
        unit: "pairs",
        icon: "👂",
        description: "Comfortable hearing protection for noisy work environments.",
        features: ["Reusable", "Soft fit"],
        images: [
            "/products/ear1.jpeg",
            "/products/ear2.jpeg",
            "/products/ear3.jpeg"
        ],
        stock: 1000,
        featured: false,
        bestSeller: true
    },

    // =========================
    // GLOVES
    // =========================

    {
        id: "PPE-GLOVES-L",
        name: "Latex Work Gloves",
        category: "ppe",
        subCategory: "gloves",
        specs: "Pack of 12 pairs",
        price: 119.99,
        minOrder: 1,
        unit: "packs",
        icon: "🧤",
        description: "General-purpose industrial gloves.",
        features: ["Good grip", "Durable"],
        images: [
            "/products/glove1.jpeg",
            "/products/glove3.jpeg",
            "/products/gloves.jpeg"
        ],
        stock: 300,
        featured: true,
        bestSeller: true
    },

    {
        id: "PPE-GLOVES-N",
        name: "Nitrile Gloves",
        category: "ppe",
        subCategory: "gloves",
        specs: "Pack of 12 pairs",
        price: 159.99,
        minOrder: 1,
        unit: "packs",
        icon: "🧤",
        description: "Chemical-resistant nitrile gloves.",
        features: ["Strong grip", "Oil resistant"],
        images: [
            "/products/glove1.jpeg",
            "/products/glove3.jpeg",
            "/products/gloves.jpeg"
        ],
        stock: 300,
        featured: true,
        bestSeller: false
    },

    // =========================
    // BOOTS
    // =========================

    {
        id: "PPE-BOOTS",
        name: "Steel Toe Safety Boots",
        category: "ppe",
        subCategory: "footwear",
        specs: "Slip resistant sole",
        price: 519.99,
        minOrder: 1,
        unit: "pairs",
        icon: "👢",
        description: "Heavy-duty steel-toe safety boots.",
        features: ["Slip resistant", "Steel toe cap"],
        images: [
            "/products/boot1.jpeg",
            "/products/boot2.jpeg",
            "/products/boot3.jpeg",
            "/products/boot4.jpeg",
            "/products/boot5.jpeg",
            "/products/boot6.jpeg",
            "/products/boot7.jpeg"
        ],
        stock: 100,
        featured: true,
        bestSeller: true
    },

    // =========================
    // OVERALLS
    // =========================

    {
        id: "OVERALL-BLUE",
        name: "Blue Overall",
        category: "ppe",
        subCategory: "overalls",
        specs: "One-piece",
        price: 149.99,
        minOrder: 1,
        unit: "units",
        icon: "🥼",
        description: "Durable one-piece work overall.",
        features: ["Comfort fit", "Industrial grade"],
        images: [
            "/products/blueoverall.jpeg"
        ],
        stock: 200,
        featured: true,
        bestSeller: true
    },

    {
        id: "OVERALL-LADIES",
        name: "Ladies Overall",
        category: "ppe",
        subCategory: "overalls",
        specs: "Ladies fit",
        price: 159.99,
        minOrder: 1,
        unit: "units",
        icon: "🥼",
        description: "Comfortable ladies industrial overall.",
        features: ["Tailored fit"],
        images: [
            "/products/ladiesoverall.jpeg"
        ],
        stock: 150,
        featured: false,
        bestSeller: false
    },

    {
        id: "OVERALL-REF",
        name: "Reflective Overall",
        category: "ppe",
        subCategory: "overalls",
        specs: "Reflective strips",
        price: 189.99,
        minOrder: 1,
        unit: "units",
        icon: "🥼",
        description: "High-visibility safety overall.",
        features: ["Reflective tape", "Durable"],
        images: [
            "/products/refoverall.jpeg"
        ],
        stock: 200,
        featured: true,
        bestSeller: true
    },

    {
        id: "OVERALL-FR",
        name: "Flame Resistant Overall",
        category: "ppe",
        subCategory: "overalls",
        specs: "FR protection",
        price: 499.99,
        minOrder: 1,
        unit: "units",
        icon: "🔥",
        description: "Flame-resistant workwear for hazardous environments.",
        features: ["FR fabric", "Heavy-duty"],
        images: [
            "/products/overallfr.jpeg"
        ],
        stock: 100,
        featured: true,
        bestSeller: false
    },

    // =========================
    // RAIN SUIT
    // =========================

    {
        id: "RAIN-2PC",
        name: "2 Piece Rain Suit",
        category: "ppe",
        subCategory: "rainwear",
        specs: "Jacket and trousers",
        price: 349.99,
        minOrder: 1,
        unit: "set",
        icon: "🌧️",
        description: "Waterproof rain suit for outdoor work.",
        features: ["Waterproof", "Lightweight"],
        images: [
            "/products/2prainsuit.jpeg"
        ],
        stock: 150,
        featured: false,
        bestSeller: true
    },

    // =========================
    // SAFETY VESTS
    // =========================

    {
        id: "PPE-VEST",
        name: "Reflective Safety Vest",
        category: "ppe",
        subCategory: "hi-vis",
        specs: "Reflective strips",
        price: 95.99,
        minOrder: 1,
        unit: "units",
        icon: "🦺",
        description: "High-visibility reflective vest.",
        features: ["Bright colour", "Reflective tape"],
        images: [
            "/products/vest1.jpeg",
            "/products/vest2.jpeg",
            "/products/vest3.jpeg",
            "/products/vest4.jpeg"
        ],
        stock: 500,
        featured: true,
        bestSeller: true
    },

    // =========================
    // POLYWORMS
    // =========================

    {
        id: "VOID-SMALL",
        name: "Polyworms Small",
        category: "void",
        subCategory: "void-fill",
        specs: "1kg bag",
        price: 97.33,
        minOrder: 1,
        unit: "bags",
        icon: "💨",
        description: "Lightweight void fill packaging.",
        features: ["Shock absorbing", "Reusable"],
        images: [
            "/products/aero1.jpeg"
        ],
        stock: 100,
        featured: false,
        bestSeller: false
    },

    {
        id: "VOID-LARGE",
        name: "Polyworms Large",
        category: "void",
        subCategory: "void-fill",
        specs: "3kg bag",
        price: 300.83,
        minOrder: 1,
        unit: "bags",
        icon: "💨",
        description: "Large-volume void fill solution.",
        features: ["Protective", "Lightweight"],
        images: [
            "/products/aero1.jpeg"
        ],
        stock: 100,
        featured: false,
        bestSeller: false
    },

    // =========================
    // PALLETS
    // =========================

    {
        id: "PALLET-WOOD",
        name: "Wooden Pallet",
        category: "pallets",
        subCategory: "wooden",
        specs: "1200x1000mm",
        price: 360.00,
        minOrder: 1,
        unit: "units",
        icon: "🪵",
        description: "Heavy-duty wooden pallet.",
        features: ["Reusable", "Strong"],
        images: [
            "/products/woodenpallet1.jpeg"
        ],
        stock: 50,
        featured: true,
        bestSeller: true
    },

    {
        id: "PALLET-PLASTIC",
        name: "Plastic Pallet",
        category: "pallets",
        subCategory: "plastic",
        specs: "1200x1000mm",
        price: 520.00,
        minOrder: 1,
        unit: "units",
        icon: "🔷",
        description: "Durable reusable plastic pallet.",
        features: ["Water resistant", "Long lifespan"],
        images: [
            "/products/plasticpallet.jpeg"
        ],
        stock: 50,
        featured: true,
        bestSeller: false
    }

];

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
    module.exports = { products };
        }
