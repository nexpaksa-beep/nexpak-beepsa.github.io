
// ===== NEXPAK PRODUCT DATABASE =====

const products = [
// ===== BUBBLE WRAP =====
{
id: 'BW-312',
name: 'Bubble Wrap 312mm',
category: 'wrap',
specs: '100m x 312mm',
price: 161.11,
minOrder: 10,
unit: 'roll',
icon: '🫧',
images: ['bubble1.jpeg']
},
{
id: 'BW-416',
name: 'Bubble Wrap 416mm',
category: 'wrap',
specs: '100m x 416mm',
price: 214.81,
minOrder: 10,
unit: 'roll',
icon: '🫧',
images: ['bubble1.jpeg']
},
{
id: 'BW-625',
name: 'Bubble Wrap 625mm',
category: 'wrap',
specs: '100m x 625mm',
price: 316.02,
minOrder: 10,
unit: 'roll',
icon: '🫧',
images: ['bubble1.jpeg']
},
{
id: 'BW-1250',
name: 'Bubble Wrap 1250mm',
category: 'wrap',
specs: '100m x 1250mm',
price: 470.93,
minOrder: 10,
unit: 'roll',
icon: '🫧',
images: ['bubble1.jpeg']
},

// ===== PALLET WRAP =====  
{  
    id: 'PW-10',  
    name: 'Pallet Wrap 10mic',  
    category: 'wrap',  
    specs: '450mm x 400m x 10mic',  
    price: 165.61,  
    minOrder: 10,  
    unit: 'rolls',  
    icon: '🧵',
    images: ['palletwrap.png']
},  
{  
    id: 'PW-15',  
    name: 'Pallet Wrap 15mic',  
    category: 'wrap',  
    specs: '450mm x 400m x 15mic',  
    price: 248.43,  
    minOrder: 10,  
    unit: 'rolls',  
    icon: '🧵',
    images: ['palletwrap.png']
},  
{  
    id: 'PW-20',  
    name: 'Pallet Wrap 20mic',  
    category: 'wrap',  
    specs: '450mm x 400m x 20mic',  
    price: 331.23,  
    minOrder: 10,  
    unit: 'rolls',  
    icon: '🧵',
    images: ['palletwrap.png']
},  
{  
    id: 'PW-25',  
    name: 'Pallet Wrap 25mic',  
    category: 'wrap',  
    specs: '450mm x 400m x 25mic',  
    price: 414.03,  
    minOrder: 10,  
    unit: 'rolls',  
    icon: '🧵',
    images: ['palletwrap.png']
},  

// ===== TAPES =====  
{  
    id: 'T-CLR-50',  
    name: 'Clear Tape 50m',  
    category: 'tape',  
    specs: '48mm x 50m',  
    price: 17.90,  
    minOrder: 36,  
    unit: 'rolls',  
    icon: '📼',
    images: ['cleartp1.jpeg']
},  
{  
    id: 'T-CLR-100',  
    name: 'Clear Tape 100m',  
    category: 'tape',  
    specs: '48mm x 100m',  
    price: 35.67,  
    minOrder: 36,  
    unit: 'rolls',  
    icon: '📼',
    images: ['cleartp1.jpeg']
},  
{  
    id: 'T-BUF-50',  
    name: 'Buff Tape 50m',  
    category: 'tape',  
    specs: '48mm x 50m',  
    price: 17.90,  
    minOrder: 36,  
    unit: 'rolls',  
    icon: '📼',
    images: ['bufftp1.jpeg']
},  
{  
    id: 'T-BUF-100',  
    name: 'Buff Tape 100m',  
    category: 'tape',  
    specs: '48mm x 100m',  
    price: 35.67,  
    minOrder: 36,  
    unit: 'rolls',  
    icon: '📼',
    images: ['bufftp1.jpeg']
},  
{  
    id: 'T-FIL',  
    name: 'Filament Tape',  
    category: 'tape',  
    specs: '48mm x 40m',  
    price: 71.63,  
    minOrder: 40,  
    unit: 'rolls',  
    icon: '📼',
    images: ['filatape.jpeg']
},  
{  
    id: 'T-MSK',  
    name: 'Masking Tape',  
    category: 'tape',  
    specs: '48mm x 40m',  
    price: 31.46,  
    minOrder: 40,  
    unit: 'rolls',  
    icon: '📼',
    images: ['maskingtape.jpeg']
},  

// ===== BOXES =====  
{  
    id: 'TVL-147',  
    name: 'TVL Box 147mm',  
    category: 'boxes',  
    specs: '500x400x147',  
    price: 22.30,  
    minOrder: 500,  
    unit: 'units',  
    icon: '📦',
    images: ['tvlbox1.jpeg']
},  
{  
    id: 'TVL-286',  
    name: 'TVL Box 286mm',  
    category: 'boxes',  
    specs: '500x400x286',  
    price: 25.37,  
    minOrder: 500,  
    unit: 'units',  
    icon: '📦',
    images: ['tvlbox1.jpeg']
},  
{  
    id: 'TVL-450',  
    name: 'TVL Box 450mm',  
    category: 'boxes',  
    specs: '500x400x450',  
    price: 31.34,  
    minOrder: 500,  
    unit: 'units',  
    icon: '📦',
    images: ['tvlbox1.jpeg']
},  
{  
    id: 'SWB-230',  
    name: 'SWB Box 230mm',  
    category: 'boxes',  
    specs: '230x150x150',  
    price: 8.30,  
    minOrder: 500,  
    unit: 'units',  
    icon: '📦',
    images: ['singlebox1.jpeg']
},  
{  
    id: 'SWB-250',  
    name: 'SWB Box 250mm',  
    category: 'boxes',  
    specs: '250x150x250',  
    price: 6.25,  
    minOrder: 500,  
    unit: 'units',  
    icon: '📦',
    images: ['singlebox1.jpeg']
},  

// ===== PPE PRODUCTS =====  
{  
    id: 'PPE-HH-YEL',  
    name: 'Hard Hat Yellow',  
    category: 'ppe',  
    specs: 'Safety Certified',  
    price: 89.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🪖',
    images: ['hat1.jpeg']
},  
{  
    id: 'PPE-HH-WHT',  
    name: 'Hard Hat White',  
    category: 'ppe',  
    specs: 'Safety Certified',  
    price: 89.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🪖',
    images: ['hat1.jpeg']
},  
{  
    id: 'PPE-HH-ORG',  
    name: 'Hard Hat Orange',  
    category: 'ppe',  
    specs: 'Safety Certified',  
    price: 89.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🪖',
    images: ['hat1.jpeg']
},  
{  
    id: 'PPE-GLOVES-L',  
    name: 'Work Gloves - Latex',  
    category: 'ppe',  
    specs: 'Pack of 12 pairs',  
    price: 49.99,  
    minOrder: 1,  
    unit: 'packs',  
    icon: '🧤',
    images: ['glove1.jpeg']
},  
{  
    id: 'PPE-GLOVES-N',  
    name: 'Work Gloves - Nitrile',  
    category: 'ppe',  
    specs: 'Pack of 12 pairs',  
    price: 165.99,  
    minOrder: 1,  
    unit: 'packs',  
    icon: '🧤',
    images: ['glove1.jpeg']
},  
{  
    id: 'PPE-GLOVES-L-XL',  
    name: 'Leather Work Gloves XL',  
    category: 'ppe',  
    specs: 'Premium leather',  
    price: 69.99,  
    minOrder: 1,  
    unit: 'pairs',  
    icon: '🧤',
    images: ['glove1.jpeg']
},  
{  
    id: 'PPE-OVERALL-S',  
    name: 'Safety Overall Polycotton 2PC- Small',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 179.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-OVERALL-M',  
    name: 'Safety Overall - Medium',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 194.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-OVERALL-L',  
    name: 'Safety Overall - Large',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 194.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-OVERALL-XL',  
    name: 'Safety Overall - XL',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 194.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-BOOTS-Passion safety shoe',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 269.99,  
    minOrder: 1,  
    unit: 'pairs',  
    icon: '👢',
    images: ['boot1.jpeg']
},  
{  
    id: 'PPE-BOOTS-Sigma Apache',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 304.99,  
    minOrder: 1,  
    unit: 'pairs',  
    icon: '👢',
    images: ['boot1.jpeg']
},  
{  
    id: 'PPE-BOOTS-Kalibre Raptor',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 549.99,  
    minOrder: 1,  
    unit: 'pairs',  
    icon: '👢',
    images: ['boot1.jpeg']
},  
{  
    id: 'PPE-BOOTS-Kalibre Utility',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 550.99,  
    minOrder: 1,  
    unit: 'pairs',  
    icon: '👢',
    images: ['boot1.jpeg']
},  
{  
    id: 'PPE-GOGGLES-CLR',  
    name: 'Safety Goggles - Clear',  
    category: 'ppe',  
    specs: 'UV Protection',  
    price: 69.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥽',
    images: ['eye1.jpeg']
},  
{  
    id: 'PPE-GOGGLES-DARK',  
    name: 'Safety Goggles - Dark',  
    category: 'ppe',  
    specs: 'UV Protection',  
    price: 89.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🥽',
    images: ['eye1.jpeg']
},  
{  
    id: 'PPE-VEST-ORG',  
    name: 'Hi-Vis Safety Vest Orange',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 49.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🦺',
    images: ['vest1.jpeg']
},  
{  
    id: 'PPE-VEST-YEL',  
    name: 'Hi-Vis Safety Vest Yellow',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 49.99,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🦺',
    images: ['vest1.jpeg']
},  
{  
    id: 'PPE-MASK-KN95',  
    name: 'KN95 Face Mask',  
    category: 'ppe',  
    specs: 'Box of 50',  
    price: 249.99,  
    minOrder: 1,  
    unit: 'boxes',  
    icon: '😷',
    images: ['mask.jpeg']
},  
{  
    id: 'PPE-MASK-N95',  
    name: 'N95 Face Mask',  
    category: 'ppe',  
    specs: 'Box of 50',  
    price: 349.99,  
    minOrder: 1,  
    unit: 'boxes',  
    icon: '😷',
    images: ['mask.jpeg']
},  

// ===== VOID FILL =====  
{  
    id: 'VOID-SMALL',  
    name: 'Polyworms Small',  
    category: 'void',  
    specs: '1kg bag',  
    price: 121.66,  
    minOrder: 1,  
    unit: 'bags',  
    icon: '💨',
    images: ['worm.jpeg']
},  
{  
    id: 'VOID-LARGE',  
    name: 'Polyworms Large',  
    category: 'void',  
    specs: '3kg bag',  
    price: 376.04,  
    minOrder: 1,  
    unit: 'bags',  
    icon: '💨',
    images: ['worm.jpeg']
},  

// ===== PALLETS =====  
{  
    id: 'PALLET-WOOD',  
    name: 'Wooden Pallet',  
    category: 'wrap',  
    specs: '1200x1000mm',  
    price: 450.00,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🪵',
    images: ['woodenpallet2.jpeg']
},  
{  
    id: 'PALLET-PLASTIC',  
    name: 'Plastic Pallet',  
    category: 'wrap',  
    specs: '1200x1000mm',  
    price: 650.00,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🔷',
    images: ['palletplastic.jpeg']
}

];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
module.exports = { products };
    }
