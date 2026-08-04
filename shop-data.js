// ======================================================
// NEXPAK SECURITY SOLUTIONS
// SHOP DATA V1
// ======================================================

const products = [

/* =====================================================
   CCTV SOLUTION KIT
===================================================== */

{
id: "CCTV-KIT",

name: "Professional CCTV Surveillance Kit",

category: "CCTV",

type: "configurable",

basePrice: 4999.00,

description: "Build your own professional CCTV surveillance system using Hikvision or Dahua equipment.",

image: "images/products/cctv-kit.jpg",

icon: "📹",

options: {

brand: [
"Hikvision",
"Dahua"
],

channels: [
4,
8,
16,
32
],

cameraType: [
"Dome",
"Bullet",
"Turret"
],

resolution: [
"2MP",
"5MP",
"8MP"
],

cameraQuantity: [
2,
4,
6,
8,
12,
16,
24,
32
],

hardDrive: [
"None",
"1TB",
"2TB",
"4TB",
"6TB",
"8TB",
"10TB"
],

colour: [
"White",
"Black"
],

installation: [
"Supply Only",
"Supply & Installation"
],

warranty: [
"1 Year",
"2 Years",
"3 Years"
]

},

extras: [

{
name: "Additional Camera",
price: 699
},

{
name: "27\" LED Monitor",
price: 2999
},

{
name: "Mouse & Keyboard",
price: 399
},

{
name: "UPS Backup Power",
price: 1899
},

{
name: "Cat5e Cable (per metre)",
price: 8
},

{
name: "Cat6 Cable (per metre)",
price: 12
},

{
name: "PVC Conduit (per metre)",
price: 18
},

{
name: "Junction Box",
price: 89
}

]

},

/* =====================================================
   WALL TOP ELECTRIC FENCE KIT
===================================================== */

{
id: "WALLTOP-KIT",

name: "Wall Top Electric Fence System",

category: "Electric Fencing",

type: "configurable",

basePrice: 0,

description: "Configure a complete wall top electric fence solution.",

image: "images/products/wall-top-kit.jpg",

icon: "⚡",

options: {

brackets: [
"6 Line Flat Bar",
"8 Line Flat Bar",
"10 Line Flat Bar",
"12 Line Flat Bar",
"6 Line Round Bar",
"8 Line Round Bar",
"10 Line Round Bar",
"12 Line Round Bar"
],

bracketStyle: [
"Straight",
"Angle"
],

bracketColour: [
"Black",
"White"
],

wallTopStays: [
"600mm Stay",
"750mm Stay"
],

staySleeves: [
"Standard Stay Sleeve"
],

lugs: [
"Compression Lug"
],

tensioners: [
"Tweaker",
"Compression Spring"
],

wire: [
"1.2mm Stainless Steel Solid",
"1.2mm Stainless Steel Braided 1000m",
"1.2mm Galvanised Braided 680m",
"1.6mm Braided Aluminium 1000m",
"1.6mm Solid Aluminium 1000m"
],

nailAnchors: [
"6x60 Nail Anchors (100s)",
"8x80 Nail Anchors (100s)"
],

ferrules: [
"6mm Aluminium Ferrules (100s)",
"6mm Solid Ferrules"
],

htCable: [
"50m Soft HT Cable",
"100m Soft HT Cable",
"200m Soft HT Cable",
"50m Hard HT Cable",
"100m Hard HT Cable",
"200m Hard HT Cable"
],

warningSigns: [
"Medium Warning Sign",
"Large Warning Sign"
],

earthSpikes: [
"1.2m Galvanised Earth Spike",
"1.2m Copper Plated Earth Spike"
]

id: "walltop-protection-v1"

lightningProtection: [

"Lightning Diverter"

],

enclosures: [

"DMC Enclosure Box 430",

"DMC Enclosure Box 530"

],

/* =====================================================
   ELECTRIC FENCE ENERGIZER & CONTROL SYSTEM
===================================================== */

{
id: "EF-CONTROL-KIT",

name: "Electric Fence Energizer & Control System",

category: "Electric Fencing",

type: "configurable",

basePrice: 0,

description: "Select the correct energizer, backup power and control accessories for your electric fence system.",

image: "images/products/electric-fence-control.jpg",

icon: "⚡",

options: {

energizer: [

"1 Joule Energizer",

"3 Joule Energizer",

"4 Joule Energizer",

"8 Joule Energizer",

"8 Joule 2 Zone Energizer",

"14 Joule Energizer"

],

battery: [

"7Ah Lead Acid Battery",

"7Ah Gel Battery"

],

enclosure: [

"DMC Enclosure Box 430",

"DMC Enclosure Box 530"

],

powerSupply: [

"12V PSU"

],

controlKeypad: [

"LCD Keypad",

"Touch Keypad"

],

communication: [

"None",

"GSM Module",

"Wi-Fi Module"

],

securityAlert: [

"Indoor Siren",

"Outdoor Siren",

"Strobe Light",

"Siren & Strobe Combination"

],

lighting: [

"Night Light"

],

lightningProtection: [

"Lightning Diverter"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Remote Keypad",
price: 0
},

{
name: "Additional Battery",
price: 0
},

{
name: "Wireless Remote",
price: 0
},

{
name: "Gate Contact",
price: 0
},

{
name: "Fence Alarm Indicator",
price: 0
}

]

},

  /* =====================================================
   GATE AUTOMATION SOLUTION KIT
===================================================== */

{
id: "GATE-AUTO-KIT",

name: "Gate Automation System",

category: "Gate Automation",

type: "configurable",

basePrice: 0,

description: "Configure a complete automatic gate system for sliding and swing gates.",

image: "images/products/gate-automation-kit.jpg",

icon: "🚪",

options: {

brand: [

"Centurion",

"Hansa",

"Gemini",

"ET Nice"

],

gateType: [

"Sliding Gate",

"Swing Gate"

],

motorSelection: [

"Centurion D5 Smart",

"Centurion D10 Smart",

"Centurion D10 Turbo",

"Centurion A10",

"Centurion D5 Evo"

],

gateWeight: [

"Up to 500kg",

"Up to 1000kg",

"Up to 1500kg",

"Up to 2000kg"

],

powerOptions: [

"AC Powered",

"Solar Powered"

],

battery: [

"7Ah Battery",

"12Ah Battery",

"18Ah Battery"

],

rackLength: [

"3m Rack",

"4m Rack",

"5m Rack",

"6m Rack",

"Custom Length"
],

remoteControls: [

"1 Remote",

"2 Remotes",

"4 Remotes",

"Additional Remotes"

],

accessControl: [

"Remote Only",

"Keypad",

"GSM Access",

"Wi-Fi Access"

],

safetyDevices: [

"Safety Beams",

"Loop Detector",

"Safety Edge"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Centurion Nova Remote",
price: 0
},

{
name: "Centurion Battery Backup",
price: 0
},

{
name: "Solar Panel Kit",
price: 0
},

{
name: "Gate Rack Section",
price: 0
},

{
name: "Safety Infrared Beams",
price: 0
},

{
name: "GSM Module",
price: 0
},

{
name: "Wi-Fi Module",
price: 0
},

{
name: "Intercom System",
price: 0
},

{
name: "Exit Button",
price: 0
},

{
name: "Magnetic Lock",
price: 0
}

]

},  

/* =====================================================
   ALARM SYSTEM SOLUTION KIT
===================================================== */

{
id: "ALARM-KIT",

name: "Professional Alarm System Kit",

category: "Alarm Systems",

type: "configurable",

basePrice: 0,

description: "Configure a complete intrusion detection alarm system for residential, commercial and industrial properties.",

image: "images/products/alarm-kit.jpg",

icon: "🚨",

options: {

brand: [

"Paradox",

"IDS",

"Ajax",

"Texecom"

],

systemType: [

"Wired Alarm System",

"Wireless Alarm System",

"Hybrid Alarm System"

],

alarmPanel: [

"4 Zone Panel",

"8 Zone Panel",

"16 Zone Panel",

"32 Zone Panel"

],

keypad: [

"LED Keypad",

"LCD Keypad",

"Touch Keypad",

"Wireless Keypad"

],

motionSensors: [

"1 PIR Sensor",

"2 PIR Sensors",

"4 PIR Sensors",

"8 PIR Sensors"

],

outdoorProtection: [

"None",

"Outdoor PIR",

"Dual Beam Detector",

"Outdoor Wireless Beam"

],

doorProtection: [

"None",

"Magnetic Door Contact",

"Wireless Door Contact"

],

communication: [

"None",

"GSM Module",

"Wi-Fi Module",

"GSM + Wi-Fi Module"

],

battery: [

"7Ah Lead Acid Battery",

"7Ah Gel Battery",

"12Ah Battery"

],

siren: [

"Indoor Siren",

"Outdoor Siren",

"Outdoor Siren + Strobe"

],

panicButtons: [

"None",

"Wireless Panic Button",

"Fixed Panic Button"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Additional PIR Sensor",
price: 0
},

{
name: "Additional Door Contact",
price: 0
},

{
name: "Remote Control",
price: 0
},

{
name: "Wireless Receiver",
price: 0
},

{
name: "Smoke Detector",
price: 0
},

{
name: "Heat Detector",
price: 0
},

{
name: "External Beam",
price: 0
},

{
name: "DMC Enclosure Box",
price: 0
}

]

},

/* =====================================================
   ROBOGUARD OUTDOOR BEAM SYSTEMS
===================================================== */

{
id: "ROBOGUARD-KITS",

name: "Roboguard Outdoor Beam Security Systems",

category: "Outdoor Security",

type: "configurable",

basePrice: 0,

description: "Complete Roboguard outdoor perimeter protection beam kits.",

image: "images/products/roboguard-kit.jpg",

icon: "🛡️",

options: {

kitSelection: [

"Roboguard Beam Kit 4",

"Roboguard Beam Kit 6",

"Roboguard Beam Kit 8"

],

beamColour: [

"Green",

"Black",

"White"

],

kitComponents: {

"Roboguard Beam Kit 4": [

"4 x Roboguard Beams",

"1 x HQ",

"1 x Robalarm Powerback",

"1 x Siren",

"2 x 4 Button Remotes"

],

"Roboguard Beam Kit 6": [

"6 x Roboguard Beams",

"1 x HQ",

"1 x Robalarm Powerback",

"1 x Siren",

"2 x 4 Button Remotes"

],

"Roboguard Beam Kit 8": [

"8 x Roboguard Beams",

"1 x HQ",

"1 x Robalarm Powerback",

"1 x Siren",

"2 x 4 Button Remotes"

]

},

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Additional Roboguard Beam",
price: 0
},

{
name: "Additional 4 Button Remote",
price: 0
},

{
name: "Additional Siren",
price: 0
}

]

},

   /* =====================================================
   ACCESS CONTROL SYSTEMS
===================================================== */

{
id: "ACCESS-CONTROL-KIT",

name: "Access Control Security Systems",

category: "Access Control",

type: "configurable",

basePrice: 0,

description: "Configure professional access control solutions for homes, offices and commercial properties.",

image: "images/products/access-control-kit.jpg",

icon: "🔐",

options: {

accessType: [

"RFID Access Control",

"Fingerprint Access Control",

"Facial Recognition Access Control",

"Keypad Access Control",

"Multi-Technology Access Control"

],

readerType: [

"Single Door Reader",

"Outdoor Weatherproof Reader",

"Standalone Reader",

"Network Reader"

],

controller: [

"Single Door Controller",

"2 Door Controller",

"4 Door Controller",

"8 Door Controller"

],

lockType: [

"Magnetic Lock 180kg",

"Magnetic Lock 280kg",

"Magnetic Lock 300kg",

"Electric Strike Lock",

"Drop Bolt Lock"

],

exitOptions: [

"Exit Button",

"No Touch Exit Button",

"Emergency Break Glass"

],

powerSupply: [

"12V 3A PSU",

"12V 5A PSU",

"Boxed Power Supply With Battery Backup"

],

batteryBackup: [

"7Ah Lead Acid Battery",

"7Ah Gel Battery",

"12Ah Battery"

],

communication: [

"Standalone",

"TCP/IP Network",

"Wi-Fi"

],

doorType: [

"Single Door",

"Double Door",

"Gate Access"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "RFID Cards",
price: 0
},

{
name: "RFID Tags",
price: 0
},

{
name: "Exit Button",
price: 0
},

{
name: "Door Contact",
price: 0
},

{
name: "Request To Exit Sensor",
price: 0
},

{
name: "Video Intercom Integration",
price: 0
}

]

},

   /* =====================================================
   CCTV CAMERA SYSTEMS
===================================================== */

{
id: "CCTV-SYSTEM-KIT",

name: "Professional CCTV Surveillance Systems",

category: "CCTV",

type: "configurable",

basePrice: 0,

description: "Configure a complete CCTV surveillance system for residential, commercial and industrial security.",

image: "images/products/cctv-kit.jpg",

icon: "📹",

options: {

brand: [

"Hikvision",

"Dahua"

],

systemType: [

"Turbo HD CCTV",

"IP CCTV"

],

cameraQuantity: [

"2 Camera System",

"4 Camera System",

"6 Camera System",

"8 Camera System",

"16 Camera System",

"32 Camera System"

],

cameraType: [

"Bullet Camera",

"Dome Camera",

"Turret Camera",

"ColorVu Camera",

"Full Colour Night Vision",

"AI Smart Detection Camera"

],

cameraResolution: [

"2MP",

"4MP",

"5MP",

"8MP 4K"

],

recorder: [

"DVR",

"NVR",

"XVR Hybrid Recorder"

],

storage: [

"1TB Hard Drive",

"2TB Hard Drive",

"4TB Hard Drive",

"8TB Hard Drive"

],

monitor: [

"None",

"22 inch Monitor",

"24 inch Monitor",

"32 inch Monitor"

],

networkOptions: [

"Remote Viewing Setup",

"Mobile App Setup",

"Cloud Access"

],

powerOptions: [

"12V Power Supply",

"PoE Switch",

"PoE NVR"

],

cabling: [

"RG59 Cable Kit",

"CAT6 Cable Kit",

"Pre-made Cable Kit"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Additional Camera",
price: 0
},

{
name: "Additional Hard Drive",
price: 0
},

{
name: "PoE Switch",
price: 0
},

{
name: "CAT6 Cable",
price: 0
},

{
name: "BNC Connectors",
price: 0
},

{
name: "Power Connectors",
price: 0
},

{
name: "Camera Junction Box",
price: 0
},

{
name: "Surge Protection",
price: 0
}

]

}, 

    /* =====================================================
   INTERCOM & SMART SECURITY SYSTEMS
===================================================== */

{
id: "INTERCOM-SYSTEM-KIT",

name: "Video Intercom & Smart Security Systems",

category: "Intercom",

type: "configurable",

basePrice: 0,

description: "Configure professional video intercom solutions for homes, offices and commercial properties.",

image: "images/products/intercom-kit.jpg",

icon: "📞",

options: {

brand: [

"Hikvision",

"Dahua",

"Commax",

"Other"

],

systemType: [

"Audio Intercom",

"Video Intercom",

"IP Video Intercom",

"Wi-Fi Smart Intercom"

],

doorStation: [

"Single Button Outdoor Station",

"Multi Button Outdoor Station",

"Villa Door Station",

"Commercial Door Station"

],

indoorMonitor: [

"None",

"7 inch Indoor Monitor",

"10 inch Indoor Monitor",

"Touch Screen Indoor Monitor"

],

connection: [

"2 Wire System",

"4 Wire System",

"IP Network",

"Wi-Fi"

],

gateControl: [

"Gate Release",

"Electric Lock Control",

"Magnetic Lock Control"

],

cameraIntegration: [

"Built-in Camera",

"CCTV Integration",

"Additional Camera"

],

accessOptions: [

"PIN Code",

"RFID Card",

"Fingerprint",

"Facial Recognition"

],

mobileAccess: [

"None",

"Mobile App Viewing",

"Remote Gate Opening"

],

powerSupply: [

"12V Power Supply",

"24V Power Supply",

"PoE Power"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Additional Indoor Monitor",
price: 0
},

{
name: "Additional Outdoor Station",
price: 0
},

{
name: "Electric Strike Lock",
price: 0
},

{
name: "Magnetic Lock",
price: 0
},

{
name: "Exit Button",
price: 0
},

{
name: "Gate Motor Integration",
price: 0
},

{
name: "Wi-Fi Module",
price: 0
}

]

},

    /* =====================================================
   SECURITY ACCESSORIES & CONSUMABLES
===================================================== */

{
id: "SECURITY-ACCESSORIES",

name: "Security Accessories & Components",

category: "Accessories",

type: "configurable",

basePrice: 0,

description: "Security system accessories, replacement parts and installation components.",

image: "images/products/security-accessories.jpg",

icon: "🔧",

options: {

electricFenceAccessories: [

"Electric Fence Remote",

"Electric Fence Key Switch",

"Fence Alarm Indicator",

"Gate Contact",

"Lightning Diverter",

"Earth Clamp",

"Earth Cable",

"High Voltage Cable",

"Fence Joiner",

"Fence Warning Signs"

],

alarmAccessories: [

"PIR Motion Detector",

"Outdoor PIR Detector",

"Magnetic Door Contact",

"Wireless Door Contact",

"Remote Control",

"Panic Button",

"Siren",

"Strobe Light",

"Smoke Detector",

"Heat Detector"

],

cctvAccessories: [

"Camera Junction Box",

"BNC Connector",

"DC Power Connector",

"CAT6 Cable",

"RG59 Cable",

"PoE Switch",

"Hard Drive",

"Monitor"

],

gateAccessories: [

"Gate Remote",

"Safety Beam",

"Loop Detector",

"Gate Rack",

"Battery",

"Solar Panel",

"Keypad",

"GSM Module"

],

powerProducts: [

"12V PSU",

"24V PSU",

"7Ah Battery",

"12Ah Battery",

"18Ah Battery"

],

cables: [

"Alarm Cable",

"CCTV Cable",

"CAT5 Cable",

"CAT6 Cable",

"Power Cable"

],

installationHardware: [

"Wall Plugs",

"Screws",

"Cable Clips",

"Junction Boxes",

"Enclosure Boxes"

],

installation: [

"Supply Only",

"Supply & Installation"

]

},

extras: [

{
name: "Technician Installation Pack",
price: 0
},

{
name: "Replacement Battery",
price: 0
},

{
name: "Replacement Power Supply",
price: 0
},

{
name: "Maintenance Call Out",
price: 0
}

]

},
