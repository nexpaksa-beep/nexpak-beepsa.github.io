// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
//
// TAKEALOT STYLE SHOP DATABASE
// PART 1/6
//
// ELECTRIC FENCING PRODUCTS
// ======================================================


const shopProducts = [


{
id:"SHOP-EF-BRACKETS",

name:"Electric Fence Wall Top Brackets",

category:"Electric Fencing",

type:"shop-product",

description:
"Professional electric fence brackets available in multiple line configurations.",


images:[

"images/products/bracket-1.jpg",
"images/products/bracket-2.jpg",
"images/products/bracket-3.jpg",
"images/products/bracket-4.jpg"

],


options:{


bracketType:[

"Flat Bar 6 Line",

"Flat Bar 8 Line",

"Flat Bar 10 Line",

"Flat Bar 12 Line",

"Round Bar 6 Line",

"Round Bar 8 Line",

"Square Tube 6 Line",

"Square Tube 8 Line",

"Square Tube 10 Line",

"Square Tube 12 Line"

]


},


price:0


},





{
id:"SHOP-EF-ANCHORS",

name:"Electric Fence Nail Anchors",

category:"Electric Fencing",


images:[

"images/products/anchors-1.jpg",
"images/products/anchors-2.jpg",
"images/products/anchors-3.jpg",
"images/products/anchors-4.jpg"

],


options:{


size:[

"6x60 Nail Anchors 100s",

"8x80 Nail Anchors 100s"

]


},


price:0


},





{
id:"SHOP-EF-TENSION",

name:"Electric Fence Tension Components",

category:"Electric Fencing",


images:[

"images/products/tension-1.jpg",
"images/products/tension-2.jpg",
"images/products/tension-3.jpg",
"images/products/tension-4.jpg"

],


options:{


component:[

"Wire Tensioners",

"Mini Tweakers",

"Nylon Compression Springs",

"Stay Sleeves",

"Electric Fence Lugs"

]


},


price:0


},





{
id:"SHOP-EF-STAYS",

name:"Electric Fence Stays",

category:"Electric Fencing",


images:[

"images/products/stays-1.jpg",
"images/products/stays-2.jpg",
"images/products/stays-3.jpg",
"images/products/stays-4.jpg"

],


options:{


staySize:[

"600mm Wall Top Stay",

"750mm Wall Top Stay"

]


},


price:0


},





{
id:"SHOP-EF-FERRULES",

name:"Electric Fence Ferrules",

category:"Electric Fencing",


images:[

"images/products/ferrules-1.jpg",
"images/products/ferrules-2.jpg",
"images/products/ferrules-3.jpg",
"images/products/ferrules-4.jpg"

],


options:{


type:[

"6mm Aluminium Ferrules 100s",

"6mm Solid Ferrules 100s",

"10mm Aluminium Ferrules 100s",

"10mm Solid Ferrules 100s"

]


},


price:0


},





{
id:"SHOP-EF-EARTH",

name:"Electric Fence Earth Spikes",

category:"Electric Fencing",


images:[

"images/products/earth-1.jpg",
"images/products/earth-2.jpg",
"images/products/earth-3.jpg",
"images/products/earth-4.jpg"

],


options:{


type:[

"1.2m Galvanised Earth Spike",

"1.2m Copper Plated Earth Spike"

]


},


price:0


},





{
id:"SHOP-EF-HT-CABLE",

name:"High Voltage HT Cable",

category:"Electric Fencing",


images:[

"images/products/ht-1.jpg",
"images/products/ht-2.jpg",
"images/products/ht-3.jpg",
"images/products/ht-4.jpg"

],


options:{


cable:[

"Soft HT Cable 50m",

"Soft HT Cable 100m",

"Soft HT Cable 200m",

"Hard HT Cable 50m",

"Hard HT Cable 100m",

"Hard HT Cable 200m"

]


},


price:0


},





{
id:"SHOP-EF-WIRE",

name:"Electric Fence Wire",

category:"Electric Fencing",


images:[

"images/products/fence-wire-1.jpg",
"images/products/fence-wire-2.jpg",
"images/products/fence-wire-3.jpg",
"images/products/fence-wire-4.jpg"

],


options:{


wire:[

"Stainless Steel Solid 1.2mm 304 Grade 700m",

"Stainless Steel Solid 1.2mm 316 Grade 700m",

"Aluminium Solid 1.6mm 1000m",

"Aluminium Braided 1.6mm 1000m",

"Galvanised Braided 1.2mm 680m"

]


},


price:0


}

];



console.log(
"NEXPAK SHOP PRODUCTS PART 1 READY"
);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
// PART 2/6
//
// TAKEALOT STYLE SHOP DATABASE
// ELECTRIC FENCING CONTINUED
// ======================================================



/* =====================================================
   HIGH VOLTAGE CABLE
===================================================== */


shopProducts.push(


{

id:"SHOP-EF-HT-CABLE",

name:"Electric Fence HT Cable",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/ht-cable-1.jpg",

"images/shop/ht-cable-2.jpg",

"images/shop/ht-cable-3.jpg",

"images/shop/ht-cable-4.jpg"

],


description:
"High voltage insulated cable for electric fence energizer connections and installations.",


options:{


type:[

"Soft HT Cable",

"Hard HT Cable"

],


length:[

"50m",

"100m",

"200m"

]


}


},





/* =====================================================
   ELECTRIC FENCE WIRE
===================================================== */


{

id:"SHOP-EF-WIRE",

name:"Electric Fence Wire",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/fence-wire-1.jpg",

"images/shop/fence-wire-2.jpg",

"images/shop/fence-wire-3.jpg",

"images/shop/fence-wire-4.jpg"

],


description:
"Professional electric fence wire available in stainless steel, aluminium and galvanised options.",


options:{


material:[

"Stainless Steel Solid 1.2mm",

"Stainless Steel Braided 1.2mm 1000m",

"Aluminium Solid 1.6mm 1000m",

"Aluminium Braided 1.6mm 1000m",

"Galvanised Braided 1.2mm 680m"

],


grade:[

"304 Stainless Steel",

"316 Stainless Steel",

"Aluminium",

"Galvanised"

]


}


},





/* =====================================================
   WARNING SIGNS
===================================================== */


{

id:"SHOP-EF-WARNING-SIGNS",

name:"Electric Fence Warning Signs",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/warning-sign-1.jpg",

"images/shop/warning-sign-2.jpg",

"images/shop/warning-sign-3.jpg",

"images/shop/warning-sign-4.jpg"

],


description:
"Mandatory electric fence warning signs for perimeter security installations.",


options:{


size:[

"Medium Warning Sign",

"Large Warning Sign"

]


}


},





/* =====================================================
   ELECTRIC FENCE ENERGIZERS
===================================================== */


{

id:"SHOP-EF-ENERGIZER",

name:"Electric Fence Energizer",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/energizer-1.jpg",

"images/shop/energizer-2.jpg",

"images/shop/energizer-3.jpg",

"images/shop/energizer-4.jpg"

],


description:
"Professional electric fence energizers for residential, commercial and industrial protection.",


options:{


joule:[

"1 Joule",

"3 Joule",

"4 Joule",

"8 Joule",

"8 Joule 2 Zone",

"14 Joule"

],


communication:[

"None",

"GSM Module",

"WiFi Module"

],


control:[

"Keypad",

"Remote Control"

]


}


},





/* =====================================================
   ELECTRIC FENCE BATTERY
===================================================== */


{

id:"SHOP-EF-BATTERY",

name:"Electric Fence Backup Battery",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/battery-1.jpg",

"images/shop/battery-2.jpg",

"images/shop/battery-3.jpg",

"images/shop/battery-4.jpg"

],


description:
"Backup power batteries for electric fence energizer systems.",


options:{


batteryType:[

"12V 7Ah Lead Acid Battery",

"12V 7Ah Gel Battery"

]


}


},





/* =====================================================
   POWER SUPPLY
===================================================== */


{

id:"SHOP-EF-PSU",

name:"Electric Fence Power Supply",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/psu-1.jpg",

"images/shop/psu-2.jpg",

"images/shop/psu-3.jpg",

"images/shop/psu-4.jpg"

],


description:
"12V power supply units for electric fence security systems.",


options:{


type:[

"12V PSU",

"12V PSU With Battery Backup"

]


}


},





/* =====================================================
   KEYPAD CONTROL
===================================================== */


{

id:"SHOP-EF-KEYPAD",

name:"Electric Fence Keypad",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/keypad-1.jpg",

"images/shop/keypad-2.jpg",

"images/shop/keypad-3.jpg",

"images/shop/keypad-4.jpg"

],


description:
"Security keypad controllers for electric fence energizers.",


options:{


style:[

"Indoor Keypad",

"Outdoor Weatherproof Keypad"

]


}


},





/* =====================================================
   EARTH LOOPS
===================================================== */


{

id:"SHOP-EF-EARTH-LOOPS",

name:"Electric Fence Earth Loops",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/earth-loop-1.jpg",

"images/shop/earth-loop-2.jpg",

"images/shop/earth-loop-3.jpg",

"images/shop/earth-loop-4.jpg"

],


description:
"Earth loop accessories for electric fence grounding systems.",


options:{


material:[

"Stainless Steel",

"Aluminium",

"Galvanised"

]


}


},





/* =====================================================
   ENCLOSURE BOXES
===================================================== */


{

id:"SHOP-EF-ENCLOSURE",

name:"Electric Fence Enclosure Box",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/enclosure-1.jpg",

"images/shop/enclosure-2.jpg",

"images/shop/enclosure-3.jpg",

"images/shop/enclosure-4.jpg"

],


description:
"Protective enclosure boxes for electric fence energizers and control equipment.",


options:{


size:[

"DMC Box 430",

"DMC Box 520"

]


}


},





/* =====================================================
   LIGHTNING PROTECTION
===================================================== */


{

id:"SHOP-EF-LIGHTNING",

name:"Electric Fence Lightning Diverter",

category:"Electric Fencing",

type:"shop-product",

price:0,


images:[

"images/shop/lightning-1.jpg",

"images/shop/lightning-2.jpg",

"images/shop/lightning-3.jpg",

"images/shop/lightning-4.jpg"

],


description:
"Lightning protection components for electric fence systems.",


options:{


type:[

"Single Lightning Diverter",

"Dual Lightning Diverter"

]


}


}



);




// ======================================================
// PART 2 COMPLETE
// ======================================================


console.log(

"%cNEXPAK SHOP PRODUCTS V15 PART 2 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
//
// PART 3/6
//
// CCTV + IP CCTV TAKEALOT SHOP DATABASE
// ======================================================



shopProducts.push(



// ======================================================
// DVR SYSTEMS
// ======================================================


{

id:"SHOP-DVR-SYSTEM",

name:"Professional DVR CCTV System",

category:"CCTV",

type:"shop-product",


description:
"Complete analogue CCTV recording systems with selectable channels, storage and accessories.",



images:[

"images/products/dvr-1.jpg",
"images/products/dvr-2.jpg",
"images/products/dvr-3.jpg",
"images/products/dvr-4.jpg"

],



options:{


brand:[

"Hikvision",

"Dahua"

],



channels:[

"8 Channel DVR",

"16 Channel DVR",

"32 Channel DVR"

],



hardDrive:[

"1TB Surveillance HDD",

"2TB Surveillance HDD",

"4TB Surveillance HDD",

"8TB Surveillance HDD"

],



cameraType:[

"Bullet Camera",

"Dome Camera"

],



resolution:[

"2MP HD",

"4MP",

"5MP",

"8MP 4K"

],



cabling:[

"100m RG59 Coax Cable",

"100m CAT5 Cable",

"Balun Transmission Kit"

],



powerSupply:[

"1 Way 12V Power Supply",

"9 Way 12V Power Supply"

],



connector:[

"BNC Connector Set",

"DC Power Connector Set"

],



monitor:[

"27 Inch LED Screen",

"32 Inch LED Screen"

]

},



price:0


},





// ======================================================
// NVR IP CCTV SYSTEMS
// ======================================================


{

id:"SHOP-NVR-SYSTEM",

name:"Professional IP NVR CCTV System",

category:"IP CCTV",

type:"shop-product",


description:
"High resolution IP surveillance systems with network recording and PoE options.",



images:[

"images/products/nvr-1.jpg",
"images/products/nvr-2.jpg",
"images/products/nvr-3.jpg",
"images/products/nvr-4.jpg"

],



options:{


brand:[

"Hikvision",

"Dahua"

],



channels:[

"8 Channel NVR",

"16 Channel NVR",

"32 Channel NVR"

],



cameraType:[

"IP Bullet Camera",

"IP Dome Camera",

"Turret Camera",

"AI Smart Camera"

],



resolution:[

"2MP",

"4MP",

"5MP",

"8MP 4K"

],



storage:[

"1TB HDD",

"2TB HDD",

"4TB HDD",

"8TB HDD"

],



network:[

"Standard NVR",

"PoE NVR"

],



cabling:[

"CAT5 Cable 100m",

"CAT6 Cable 100m"

],



monitor:[

"27 Inch LED Screen",

"32 Inch LED Screen"

]

},



price:0


},





// ======================================================
// CCTV CAMERAS
// ======================================================


{

id:"SHOP-CCTV-CAMERAS",

name:"Security CCTV Cameras",

category:"CCTV Accessories",

type:"shop-product",



images:[

"images/products/camera-1.jpg",
"images/products/camera-2.jpg",
"images/products/camera-3.jpg",
"images/products/camera-4.jpg"

],



options:{


cameraStyle:[

"Bullet Camera",

"Dome Camera",

"Turret Camera",

"ColorVu Camera",

"AI Detection Camera"

],



brand:[

"Hikvision",

"Dahua"

],



resolution:[

"2MP",

"4MP",

"5MP",

"8MP 4K"

],



nightVision:[

"IR Night Vision",

"Full Colour Night Vision"

]


},



price:0


},





// ======================================================
// CCTV ACCESSORIES
// ======================================================


{

id:"SHOP-CCTV-ACCESSORIES",

name:"CCTV Installation Accessories",

category:"CCTV Accessories",

type:"shop-product",



images:[

"images/products/cctv-accessory-1.jpg",
"images/products/cctv-accessory-2.jpg",
"images/products/cctv-accessory-3.jpg",
"images/products/cctv-accessory-4.jpg"

],



options:{


items:[

"BNC Connectors",

"DC Power Connectors",

"Video Balun Set",

"RG59 Coax Cable",

"CAT5 Cable",

"CAT6 Cable",

"Camera Junction Box",

"12V Power Supply",

"Surge Protector",

"Hard Drive"

]


},



price:0


}



);



console.log(
"NEXPAK SHOP PRODUCTS PART 3 READY"
);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
//
// PART 4/6
//
// GATE AUTOMATION
// GARAGE MOTORS
// ROBOGUARD DATABASE
// ======================================================



shopProducts.push(



// ======================================================
// GATE AUTOMATION SYSTEMS
// ======================================================


{

id:"SHOP-GATE-MOTOR",

name:"Automatic Gate Automation System",

category:"Gate Automation",

type:"shop-product",


description:
"Professional Centurion gate automation systems with accessories and installation options.",



images:[

"images/products/gate-motor-1.jpg",
"images/products/gate-motor-2.jpg",
"images/products/gate-motor-3.jpg",
"images/products/gate-motor-4.jpg"

],



options:{


brand:[

"Centurion"

],



motor:[

"Centurion D5 Evo",

"Centurion D5 Smart",

"Centurion D10 Smart",

"Centurion A10 Smart"

],



battery:[

"7Ah Lead Acid Battery",

"9Ah Gel Battery"

],



rack:[

"2m Steel Rack",

"2m Nylon Rack"

],



security:[

"Anti Theft Bracket",

"Standard Mounting"

],



safetyBeams:[

"Wired Infrared Beams",

"Wireless Infrared Beams"

],



power:[

"AC Power",

"Solar Backup"

],



remotes:[

"1 x Remote",

"2 x Remotes",

"4 x Remotes"

]

},



price:0


},





// ======================================================
// GARAGE DOOR MOTOR
// ======================================================


{

id:"SHOP-GARAGE-MOTOR",

name:"Centurion SD04 Smart Garage Door Motor",

category:"Garage Automation",

type:"shop-product",


description:
"Smart garage door automation complete with rail track kit.",



images:[

"images/products/sd04-1.jpg",
"images/products/sd04-2.jpg",
"images/products/sd04-3.jpg",
"images/products/sd04-4.jpg"

],



options:{


motor:[

"Centurion SD04 Smart"

],



track:[

"Standard Track Kit",

"Extended Track Kit"

],



battery:[

"7Ah Battery Backup",

"9Ah Gel Battery Backup"

],



accessories:[

"1 Remote",

"2 Remotes",

"4 Remotes",

"Wireless Wall Switch"

]


},



price:0


},





// ======================================================
// ROBOGUARD BEAM SYSTEM
// ======================================================


{

id:"SHOP-ROBOGUARD",

name:"Roboguard Outdoor Beam Security System",

category:"Roboguard",

type:"shop-product",



description:
"Wireless outdoor perimeter protection system with selectable beam quantity and accessories.",



images:[

"images/products/roboguard-1.jpg",
"images/products/roboguard-2.jpg",
"images/products/roboguard-3.jpg",
"images/products/roboguard-4.jpg"

],



options:{


beamQuantity:[

"1 Beam",

"2 Beams",

"3 Beams",

"4 Beams",

"5 Beams",

"6 Beams",

"7 Beams",

"8 Beams"

],



receiver:[

"Roboguard HQ Base",

"Alarm Interface Module"

],



powerSupply:[

"Standard Power Supply",

"Power Supply With Alarm Outputs"

],



siren:[

"15 Watt Siren",

"30 Watt Siren"

],



remote:[

"4 Button Remote",

"Additional 4 Button Remote"

]


},



price:0


}



);



console.log(
"NEXPAK SHOP PRODUCTS PART 4 READY"
);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
//
// PART 5/6
//
// IDS + AJAX ALARM SYSTEMS
// ======================================================


shopProducts.push(



// ======================================================
// IDS ALARM SYSTEMS
// ======================================================


{

id:"SHOP-IDS-ALARM",

name:"IDS Professional Alarm System",

category:"Alarm Systems",

type:"shop-product",


description:
"Professional IDS wired and wireless alarm solutions for residential and commercial security.",



images:[

"images/products/ids-alarm-1.jpg",
"images/products/ids-alarm-2.jpg",
"images/products/ids-alarm-3.jpg",
"images/products/ids-alarm-4.jpg"

],



options:{


starterKit:[

"IDS 805 Kit",

"Custom IDS System"

],



panel:[

"IDS X64 Alarm Panel",

"IDS 805 Panel"

],



keypad:[

"LED Keypad",

"LCD Keypad",

"Touch Keypad"

],



powerSupply:[

"Standard PSU",

"Boxed PSU With Battery Backup"

],



battery:[

"7Ah Lead Acid Battery",

"7Ah Gel Battery",

"12Ah Battery"

],



siren:[

"Indoor Siren",

"Outdoor Siren"

],



cable:[

"4 Core Alarm Cable 100m",

"6 Core Alarm Cable 100m",

"Comms Cable 100m"

],



expanders:[

"8 Zone Wired Expander",

"8 Zone Wireless Expander"

],



indoorDetection:[

"Wired Indoor PIR",

"Wireless Indoor PIR"

],



outdoorDetection:[

"Wired Outdoor Detector",

"Wireless Outdoor Detector"

],



communication:[

"IDS HYYP Module",

"SMS Module",

"WiFi Module"

]


},



price:0


},





// ======================================================
// AJAX ALARM SYSTEM
// ======================================================


{

id:"SHOP-AJAX-ALARM",

name:"Ajax Wireless Smart Alarm System",

category:"Alarm Systems",

type:"shop-product",



description:
"Professional wireless Ajax security system with smart mobile monitoring.",



images:[

"images/products/ajax-alarm-1.jpg",
"images/products/ajax-alarm-2.jpg",
"images/products/ajax-alarm-3.jpg",
"images/products/ajax-alarm-4.jpg"

],



options:{


hub:[

"Ajax Hub",

"Ajax Hub 2",

"Ajax Hub 2 Plus"

],



keypad:[

"Ajax KeyPad",

"Ajax KeyPad Plus"

],



siren:[

"Ajax Indoor Siren",

"Ajax Outdoor Siren"

],



doorProtection:[

"Ajax Door Magnet",

"Ajax DoorProtect Plus"

],



indoorDetection:[

"Ajax MotionProtect",

"Ajax MotionProtect Plus"

],



outdoorDetection:[

"Ajax MotionProtect Outdoor",

"Ajax DualCurtain Outdoor"

],



smokeProtection:[

"Ajax FireProtect",

"Ajax FireProtect Plus"

],



communication:[

"Ethernet",

"WiFi",

"SIM Card Backup"

]


},



price:0


}



);



console.log(
"NEXPAK SHOP PRODUCTS PART 5 READY"
);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop-products.js
//
// PART 6/6
//
// SECURITY ACCESSORIES
// INTERCOM SYSTEMS
// DATABASE FINALIZATION
// ======================================================



shopProducts.push(



// ======================================================
// SECURITY ACCESSORIES
// ======================================================


{

id:"SHOP-SECURITY-ACCESSORIES",

name:"Security System Accessories",

category:"Security Accessories",

type:"shop-product",


description:
"Professional security installation accessories and replacement components.",



images:[

"images/products/security-accessory-1.jpg",
"images/products/security-accessory-2.jpg",
"images/products/security-accessory-3.jpg",
"images/products/security-accessory-4.jpg"

],



options:{


accessories:[

"Alarm PIR Sensor",

"Outdoor PIR Detector",

"Magnetic Door Contact",

"Wireless Door Contact",

"Panic Button",

"Alarm Remote",

"Siren",

"Strobe Light",

"Smoke Detector",

"Heat Detector",

"Power Supply",

"Battery",

"Enclosure Box"

]


},



price:0


},





// ======================================================
// VIDEO INTERCOM SYSTEMS
// ======================================================


{

id:"SHOP-VIDEO-INTERCOM",

name:"Video Intercom & Smart Entry System",

category:"Intercom Systems",

type:"shop-product",



description:
"Audio and video entry systems for homes, estates, offices and commercial properties.",



images:[

"images/products/intercom-1.jpg",
"images/products/intercom-2.jpg",
"images/products/intercom-3.jpg",
"images/products/intercom-4.jpg"

],



options:{


brand:[

"Hikvision",

"Dahua",

"Commax"

],



systemType:[

"Audio Intercom",

"Video Intercom",

"IP Video Intercom",

"WiFi Smart Intercom"

],



outdoorStation:[

"Single Button Station",

"Multi Button Station",

"Villa Station",

"Commercial Station"

],



indoorMonitor:[

"7 Inch Monitor",

"10 Inch Monitor",

"Touch Screen Monitor"

],



accessControl:[

"RFID Card",

"PIN Code",

"Fingerprint",

"Facial Recognition"

],



gateIntegration:[

"Gate Release",

"Electric Lock Control",

"Gate Motor Integration"

],



network:[

"2 Wire",

"4 Wire",

"IP Network",

"WiFi"

]


},



price:0


},





// ======================================================
// GENERAL INSTALLATION PRODUCTS
// ======================================================


{

id:"SHOP-INSTALLATION-MATERIAL",

name:"Security Installation Materials",

category:"Installation Materials",

type:"shop-product",



images:[

"images/products/materials-1.jpg",
"images/products/materials-2.jpg",
"images/products/materials-3.jpg",
"images/products/materials-4.jpg"

],



options:{


items:[

"Cable",

"Conduit",

"Cable Clips",

"Junction Boxes",

"Screws",

"Plugs",

"Mounting Brackets",

"Labels"

]


},



price:0


}



);





// ======================================================
// MAKE AVAILABLE TO SHOP ENGINE
// ======================================================


window.shopProducts = shopProducts;





console.log(

"%cNEXPAK SHOP PRODUCTS V15 DATABASE COMPLETE",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
