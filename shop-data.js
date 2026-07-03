
// ===== NEXPAK PRODUCT DATABASE =====

const products = [
// ===== BUBBLE WRAP =====
{
id: 'BW-312',
name: 'Bubble Wrap 312mm',
category: 'wrap',
specs: '100m x 312mm',
price: 140,
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
price: 155,
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
price: 259,
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
price: 340,
minOrder: 10,
unit: 'roll',
icon: '🫧',
images: ['bubble1.jpeg']
},
{   id: 'CB-20',
    name: 'SFK/Corroboard',
    specs: '915 x 20kg',
    price: 700,
    minOrder: 1,
    unit: 'rolls',
    icon: '💈',
    images: ['images/cor1.jpeg']
},
// ===== PALLET WRAP =====  
{  
    id: 'PW-10',  
    name: 'Pallet Wrap 10mic',  
    category: 'wrap',  
    specs: '450mm x 400m x 10mic',  
    price: 140.00,  
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
    price: 200.00,  
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
    price: 270.00,  
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
    price: 345.00,  
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
    price: 16.00,  
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
    price: 30.00,  
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
    price: 16.00,  
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
    price: 30.00,  
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
    price: 18.00,  
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
    price: 19.5,  
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
    price: 27.00,  
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
    price: 6.00,  
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
    price: 4.5,  
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
    price: 36.00,  
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
    price: 36.00,  
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
    price: 36.00,  
    minOrder: 1,  
    unit: 'units',  
    icon: '🪖',
    images: ['hat1.jpeg']
},  
{  
    id: 'PPE-GLOVES-L',  
    name: 'Chrome Leather DBL palm wrist 2.5',  
    category: 'ppe',  
    specs: 'Pack of 120 pairs',  
    price: 40.00,  
    minOrder: 120,  
    unit: 'packs',  
    icon: '🧤',
    images: ['chrome.jpeg']
},  
{  
    id: 'PPE-GLOVES-N',  
    name: 'Chrome Leather DBL Palm Elbow 8',  
    category: 'ppe',  
    specs: 'Pack of 120 pairs',  
    price: 50.00,  
    minOrder: 120,  
    unit: 'packs',  
    icon: '🧤',
    images: ['chrome.jpeg']
},  
{  
    id: 'PPE-GLOVES-L-XL',  
    name: 'Chrome Leather DBL Palm 16',  
    category: 'ppe',  
    specs: 'MOQ',  
    price: 86.00,  
    minOrder: 120,  
    unit: 'pairs',  
    icon: '🧤',
    images: ['chrome.jpeg']
},  
{  
    id: 'PPE-OVERALL-S',  
    name: '2PC Polycotton Conti Suit',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 159.00,  
    minOrder: 1,  
    sizes:["S","M","L","XL","2XL","3XL"],
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-OVERALL-M',  
    name: '2PC Polycotton Conti Suit Econo',  
    category: 'ppe',  
    specs: 'STD',  
    price: 139.00,  
    minOrder: 1,  
    sizes:["S","M","XL","2XL","3XL"],
    unit: 'units',  
    icon: '🥼',
    images: ['refoverall.jpeg']
},  
{  
    id: 'PPE-OVERALL-J54',  
    name: 'J54 Reflective Conti Suit',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 329.00,  
    minOrder: 1,  
    sizes:["S","M","L","XL","2XL","3XL"],
    unit: 'units',  
    icon: '🥼',
    images: ['j54.jpeg']
},  
{  
    id: 'PPE-OVERALL-D59',  
    name: 'D59 Flame and Acid resistant',  
    category: 'ppe',  
    specs: 'SABS',  
    price: 629.00,  
    minOrder: 1,  
    sizes:["S","M","L","XL","2XL","3XL"],
    unit: 'units',  
    icon: '🥼',
    images: ['j54cotton.jpeg']
},  
{  
    id: 'PPE-BOOTS-safety shoe',  
    name: 'Dot Contractor Safety Boots Size various',  
    category: 'ppe',  
    specs: 'Steel toe',  
    price: 299.00,  
    minOrder: 1,  
    sizes:["8","9","10","11","12","13"],
    unit: 'pairs',  
    icon: '👢',
    images: ['dot.jpeg']
},  
{  
    id: 'PPE-BOOTS-Radon',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Steel toe',  
    price: 299.00,  
    minOrder: 1, 
    sizes:["8","9","10","11","12","13"],
    unit: 'pairs',  
    icon: '👢',
    images: ['radon.jpeg']
},  
{  
    id: 'PPE-BOOTS-Argon',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 319.00,  
    minOrder: 1,
    sizes:["8","9","10","11","12","13"],
    unit: 'pairs',  
    icon: '👢',
    images: ['argon.jpeg']
},  
{  
    id: 'PPE-BOOTS-Mercury',  
    name: 'Steel-Toe Boots Size various',  
    category: 'ppe',  
    specs: 'Slip resistant sole',  
    price: 329.00,  
    minOrder: 1,  
    sizes:["8","9","10","11","12","13"],
    unit: 'pairs',  
    icon: '👢',
    images: ['mercury.jpeg']
},  
{  
    id: 'PPE-GOGGLES-CLR',  
    name: 'Safety Spectacles - Clear,grey,green',  
    category: 'ppe',  
    specs: 'UV Protection',  
    price: 24.00,  
    minOrder: 240,  
    unit: 'MOQ',  
    icon: '🥽',
    images: ['eye.jpeg']
},  
{  
    id: 'PPE-GOGGLES-Clear',  
    name: 'Safety Goggles - Clear',  
    category: 'ppe',  
    specs: 'MONO',  
    price: 30.00,  
    minOrder: 240,  
    unit: 'MOQ',  
    icon: '🥽',
    images: ['goggle.jpeg']
},  
{  
    id: 'PPE-VEST-ORG',  
    name: 'Hi-Vis Safety Vest Orange',  
    category: 'ppe',  
    specs: 'Reflective strips',  
    price: 56.00,  
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
    price: 56.00,  
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
    id: 'PPE-WELD-GOGGLE',  
    name: 'Flip Front Welding Goggles',  
    category: 'ppe',  
    specs: 'Flipfront',  
    price: 46.00,  
    minOrder: 1,  
    unit: 'unit',  
    icon: '😷',
    images: ['weldgog.jpeg']
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
