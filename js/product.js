/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 products.js

 PART 1/5

 PRODUCT DATABASE

 CCTV SYSTEMS
=========================================================*/


const products = [


/*=========================================================
 HIKVISION CCTV SYSTEM
=========================================================*/


{

id:"hikvision-cctv-system",

name:"Hikvision Professional CCTV System",

category:"CCTV",

brand:"Hikvision",

price:4999,


image:
"images/products/hikvision-cctv.jpg",



description:

"Professional Hikvision CCTV surveillance package with configurable recording channels, cameras, storage, cabling and accessories.",



features:[

"HD / Full HD Surveillance",

"Remote Mobile Viewing",

"Night Vision Cameras",

"Motion Detection",

"Professional Security Monitoring"

],



options:{


/* CHANNEL OPTION */

channel:[

{
name:"8 Channel DVR System",
price:0
},

{
name:"16 Channel DVR System",
price:1500
},

{
name:"32 Channel DVR System",
price:3500
}

],



/* CAMERA QUANTITY */

cameraQuantity:[

{
name:"4 Cameras",
price:0
},

{
name:"6 Cameras",
price:1500
},

{
name:"8 Cameras",
price:3000
},

{
name:"16 Cameras",
price:6500
}

],



/* STORAGE */

storage:[

{
name:"No HDD",
price:0
},

{
name:"1TB HDD",
price:900
},

{
name:"2TB HDD",
price:1600
},

{
name:"4TB HDD",
price:2800
},

{
name:"8TB HDD",
price:5500
}

],



/* POWER SUPPLY */

psu:[

{
name:"Single Camera PSU",
price:0
},

{
name:"9 Way CCTV PSU",
price:450
}

],



/* CONNECTORS */

connectors:[

{
name:"Standard BNC + DC Connector Pack",
price:0
},

{
name:"Premium CCTV Connector Pack",
price:350
}

],



/* CABLE TYPE */

cable:[

{
name:"Coax Cable 100m",
price:850
},

{
name:"CAT5 Cable 100m",
price:650
},

{
name:"CAT6 Cable 100m",
price:850
}

],



/* JUNCTION BOXES */

junctionBoxes:[

{
name:"No Junction Boxes",
price:0
},

{
name:"Plastic Weatherproof Junction Boxes",
price:450
},

{
name:"Metal Junction Boxes",
price:900
}

],



/* MONITOR */

monitor:[

{
name:"No Monitor",
price:0
},

{
name:"22 Inch Security Monitor",
price:1800
},

{
name:"32 Inch Security Monitor",
price:3200
}

],



/* BACKUP POWER */

ups:[

{
name:"No UPS Backup",
price:0
},

{
name:"CCTV UPS Backup System",
price:1500
}

],



/* SURGE PROTECTION */

surgeProtection:[

{
name:"No Surge Protection",
price:0
},

{
name:"CCTV Surge Protection Kit",
price:750
}

]


}


}

];
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 products.js

 PART 1/6

 ADVANCED PRODUCT CONFIGURATOR
=========================================================*/


const products = [


/*=========================================================
 CCTV SYSTEMS
=========================================================*/


{

id:"cctv-system",

name:"Professional CCTV Security System",

category:"CCTV",

brand:"Hikvision / Dahua",

price:4500,

image:"images/products/cctv.jpg",


description:

"Complete CCTV surveillance solution including recorder, cameras, storage and installation accessories.",


features:[

"Remote Viewing",

"Night Vision",

"Motion Detection",

"Mobile Monitoring",

"Commercial Grade"

],


options:{



channel:[


{
name:"8 Channel DVR",
price:0
},


{
name:"16 Channel DVR",
price:1800
},


{
name:"32 Channel DVR",
price:4200
}


],




camera:[


{
name:"4 Camera Package",
price:0
},


{
name:"8 Camera Package",
price:2500
},


{
name:"16 Camera Package",
price:6000
}


],




storage:[


{
name:"No HDD",
price:0
},


{
name:"1TB Surveillance HDD",
price:1200
},


{
name:"2TB Surveillance HDD",
price:2000
},


{
name:"4TB Surveillance HDD",
price:3500
}


],




psu:[


{
name:"Single Power Supply",
price:0
},


{
name:"9 Way Power Supply Box",
price:850
}


],




cable:[


{
name:"Coax Cable 100m",
price:750
},


{
name:"CAT5 Cable 100m",
price:950
}


],




connectors:[


{
name:"BNC Connectors Pack",
price:180
},


{
name:"DC Connectors Pack",
price:150
},


{
name:"BNC + DC Complete Pack",
price:300
}


],




junctionBox:[


{
name:"Standard Junction Boxes",
price:300
},


{
name:"Weatherproof Junction Boxes",
price:650
}


]



}

},






/*=========================================================
 IP CCTV SYSTEMS
=========================================================*/


{

id:"ip-cctv-system",

name:"Professional IP CCTV System",

category:"IP CCTV",

brand:"Hikvision / Dahua",

price:7500,


image:"images/products/ip-cctv.jpg",



description:

"Advanced IP surveillance system using network cameras and NVR technology.",


features:[

"4K Resolution",

"AI Detection",

"Network Cameras",

"Remote Access"

],




options:{



channels:[


{
name:"8 Channel NVR",
price:0
},


{
name:"16 Channel NVR",
price:2500
},


{
name:"32 Channel NVR",
price:5500
}


],




cameraResolution:[


{
name:"4MP IP Cameras",
price:0
},


{
name:"6MP IP Cameras",
price:2500
},


{
name:"8MP 4K IP Cameras",
price:5000
}


],




storage:[


{
name:"1TB HDD",
price:1200
},


{
name:"2TB HDD",
price:2000
},


{
name:"4TB HDD",
price:3500
}


],




poeSwitch:[


{
name:"No POE Switch",
price:0
},


{
name:"8 Port POE Switch",
price:1200
},


{
name:"16 Port POE Switch",
price:2500
}


],




cable:[


{
name:"CAT5 Cable 100m",
price:950
},


{
name:"CAT6 Cable 100m",
price:1400
}


],




junctionBox:[


{
name:"Standard IP Junction Box",
price:350
},


{
name:"Outdoor Waterproof Box",
price:700
}


]



}


},
 /*=========================================================
 ELECTRIC FENCING CONFIGURATOR
=========================================================*/


{

id:"electric-fencing-system",

name:"Complete Electric Fence Security System",

category:"Electric Fencing",

brand:"Nexpak Security Solutions",

price:15000,


image:"images/products/electric-fence.jpg",



description:

"Complete electric fencing solution with fence structure, energizer, wire, accessories and monitoring options.",



features:[

"Residential & Industrial Protection",

"Multiple Fence Designs",

"High Security Energizers",

"Optional GSM & WiFi Monitoring"

],



options:{



/*==============================
 FENCE STRUCTURE
==============================*/


fenceType:[


{
name:"Round Bar 6 Line",
price:0
},


{
name:"Flat Bar 6 Line",
price:600
},


{
name:"Square Tube 6 Line",
price:1200
},


{
name:"Square Tube 8 Line",
price:1800
},


{
name:"Square Tube 10 Line",
price:2500
},


{
name:"Square Tube 12 Line",
price:3500
}


],




/*==============================
 PROPERTY LENGTH
==============================*/


propertyLength:[


{
name:"50 Metres",
price:0
},


{
name:"100 Metres",
price:3000
},


{
name:"150 Metres",
price:5000
},


{
name:"200 Metres",
price:7500
},


{
name:"300 Metres",
price:10000
}


],




/*==============================
 WIRE TYPE
==============================*/


wireType:[


{
name:"Stainless Steel Solid Wire 700m",
price:1200
},


{
name:"Aluminium Solid Wire 1000m",
price:950
},


{
name:"Braided Wire 1000m",
price:1100
},


{
name:"Galvanised Braided Wire 680m",
price:850
}


],




/*==============================
 ENERGIZER
==============================*/


energizer:[


{
name:"1.3 Joule Energizer",
price:0
},


{
name:"4 Joule Energizer",
price:1800
},


{
name:"8 Joule Energizer",
price:3500
},


{
name:"14 Joule Energizer",
price:6000
}


],




/*==============================
 TENSIONERS
==============================*/


tensioner:[


{
name:"Standard Tensioner",
price:10
},


{
name:"Heavy Duty Tensioner",
price:20
},


{
name:"Stainless Steel Tensioner",
price:35
}


],




tensionerQuantity:[


{
name:"100 Units",
price:0
},


{
name:"200 Units",
price:500
},


{
name:"500 Units",
price:1200
}


],




/*==============================
 EARTH SPIKE
==============================*/


earthSpike:[


{
name:"1.2m Galvanised Earth Spike",
price:250
},


{
name:"1.2m Copper Plated Earth Spike",
price:500
}


],




earthSpikeQuantity:[


{
name:"1 Spike",
price:0
},


{
name:"3 Spikes",
price:500
},


{
name:"5 Spikes",
price:900
}


],




/*==============================
 HOOKS
==============================*/


hooks:[


{
name:"Fence Hooks 100 Pack",
price:150
},


{
name:"Fence Hooks 500 Pack",
price:600
},


{
name:"Fence Hooks 1000 Pack",
price:1000
}


],




/*==============================
 WARNING SIGNS
==============================*/


warningSigns:[


{
name:"Medium Warning Sign",
price:50
},


{
name:"Large Warning Sign",
price:90
}


],




warningQuantity:[


{
name:"10 Signs",
price:0
},


{
name:"20 Signs",
price:500
}


],




/*==============================
 NAIL IN ANCHORS
==============================*/


anchors:[


{
name:"6x60 Nail In Anchors 100 Pack",
price:450
},


{
name:"8x80 Nail In Anchors 100 Pack",
price:650
}


],




/*==============================
 HT CABLE
==============================*/


htCable:[


{
name:"Soft HT Cable 50m",
price:350
},


{
name:"Soft HT Cable 100m",
price:650
},


{
name:"Hard HT Cable 100m",
price:900
},


{
name:"Hard HT Cable 200m",
price:1600
}


],




/*==============================
 FERRULES
==============================*/


ferrules:[


{
name:"Aluminium Ferrules 6mm 100 Pack",
price:180
},


{
name:"Aluminium Ferrules 10mm 100 Pack",
price:250
},


{
name:"Solid Ferrules 6mm 100 Pack",
price:350
},


{
name:"Solid Ferrules 10mm 100 Pack",
price:500
}


],




/*==============================
 GATE CONTACT
==============================*/


gateContact:[


{
name:"Single Gate Contact",
price:450
},


{
name:"Double Gate Contact",
price:850
}


],




/*==============================
 EARTH LOOP
==============================*/


earthLoop:[


{
name:"Stainless Steel Earth Loop",
price:250
},


{
name:"Aluminium Earth Loop",
price:180
},


{
name:"Galvanised Earth Loop",
price:150
}


],




/*==============================
 ENCLOSURE BOX
==============================*/


enclosure:[


{
name:"430 Enclosure Box",
price:900
},


{
name:"530 Enclosure Box",
price:1400
}


],




/*==============================
 CONNECTIVITY
==============================*/


connectivity:[


{
name:"No Module",
price:0
},


{
name:"WiFi Module",
price:1500
},


{
name:"GSM Module",
price:2200
}


],




/*==============================
 CABLE CORE
==============================*/


cable:[


{
name:"4 Core Cable 100m",
price:800
},


{
name:"6 Core Cable 100m",
price:1100
},


{
name:"8 Core Cable 100m",
price:1500
}


],




/*==============================
 ACCESSORIES
==============================*/


extras:[


{
name:"Siren",
price:600
},


{
name:"Stone Siren",
price:750
},


{
name:"Keypad",
price:1200
}


]



}


},
 /*=========================================================
 GATE AUTOMATION CONFIGURATOR
=========================================================*/


{


id:"gate-automation",

name:"Centurion Gate Automation Systems",

category:"Gate Motors",

brand:"Centurion",

price:8500,


image:"images/products/gate-motor.jpg",



description:

"Professional sliding gate automation solutions with battery backup, rack options and smart connectivity.",



features:[

"Residential & Commercial Use",

"Battery Backup",

"Remote Control",

"Solar Compatible",

"Smart Connectivity"

],




options:{



/*==============================
 MOTOR MODEL
==============================*/


motorModel:[


{
name:"Centurion D5 Evo",
price:0
},


{
name:"Centurion D5 Smart",
price:2500
},


{
name:"Centurion D10 Smart",
price:6000
},


{
name:"Centurion D10 Turbo",
price:10000
}


],




/*==============================
 BATTERY OPTIONS
==============================*/


battery:[


{
name:"Standard 7Ah Battery",
price:0
},


{
name:"9 Amp Gel Battery",
price:900
}


],




/*==============================
 RACK TYPE
==============================*/


rackType:[


{
name:"Nylon Rack",
price:0
},


{
name:"Steel Rack",
price:150
}


],




/*==============================
 RACK LENGTH
==============================*/


rackLength:[


{
name:"4 Metre Rack",
price:0
},


{
name:"6 Metre Rack",
price:300
},


{
name:"8 Metre Rack",
price:600
}


],




/*==============================
 REMOTES
==============================*/


remote:[


{
name:"1 x Remote",
price:0
},


{
name:"2 x Remotes",
price:500
},


{
name:"4 x Remotes",
price:900
}


],




/*==============================
 SAFETY OPTIONS
==============================*/


safety:[


{
name:"No Safety Beam",
price:0
},


{
name:"Infrared Safety Beam",
price:1200
},


{
name:"Heavy Duty Safety Beam",
price:1800
}


],




/*==============================
 ACCESS CONTROL
==============================*/


accessControl:[


{
name:"Standard Receiver",
price:0
},


{
name:"Keypad Entry",
price:1200
},


{
name:"GSM Remote Access",
price:2200
},


{
name:"WiFi Smart Module",
price:1800
}


],




/*==============================
 SOLAR OPTIONS
==============================*/


solar:[


{
name:"No Solar Backup",
price:0
},


{
name:"Solar Ready Kit",
price:2500
},


{
name:"Complete Solar System",
price:6500
}


],




/*==============================
 INSTALLATION
==============================*/


installation:[


{
name:"Supply Only",
price:0
},


{
name:"Professional Installation",
price:2500
}


]



}



},
 /*=========================================================
 ROBOGUARD OUTDOOR SECURITY CONFIGURATOR
=========================================================*/


{


id:"roboguard-system",

name:"Roboguard Wireless Perimeter Security System",

category:"Outdoor Security",

brand:"Roboguard",

price:3999,


image:"images/products/roboguard.jpg",



description:

"Wireless outdoor beam detection system with multiple beam configurations and colour options.",



features:[

"Wireless Outdoor Detection",

"Long Range Protection",

"Low Maintenance",

"Multiple Beam Options"

],



options:{



/*==============================
 BEAM KIT
==============================*/


beamKit:[


{
name:"4 Beam Kit",
price:0
},


{
name:"6 Beam Kit",
price:1500
},


{
name:"8 Beam Kit",
price:3000
}


],




/*==============================
 COLOUR SELECTOR
==============================*/


colour:[


{
name:"Green",
price:0
},


{
name:"Black",
price:0
},


{
name:"White",
price:0
}


],




/*==============================
 RECEIVER
==============================*/


receiver:[


{
name:"Standard Receiver",
price:0
},


{
name:"Advanced Receiver",
price:1200
}


],




/*==============================
 ACCESSORIES
==============================*/


accessories:[


{
name:"Additional Remote",
price:450
},


{
name:"Extra Battery Pack",
price:350
},


{
name:"Outdoor Siren",
price:900
}


]



}



},






/*=========================================================
 ALARM SYSTEM CONFIGURATOR
=========================================================*/


{


id:"alarm-system",

name:"Smart Alarm System",

category:"Alarm Systems",

brand:"Ajax / Paradox",

price:6500,


image:"images/products/alarm.jpg",



description:

"Professional alarm system with sensors, keypad, sirens and smart monitoring options.",



options:{



controlPanel:[


{
name:"Basic Alarm Panel",
price:0
},


{
name:"Smart Alarm Hub",
price:2500
}


],




keypad:[


{
name:"No Keypad",
price:0
},


{
name:"Wireless Keypad",
price:1200
},


{
name:"Touch Screen Keypad",
price:2500
}


],




sensors:[


{
name:"Door Contact",
price:350
},


{
name:"PIR Motion Sensor",
price:550
},


{
name:"Outdoor Beam Sensor",
price:1200
}


],




siren:[


{
name:"Indoor Siren",
price:500
},


{
name:"Outdoor Siren",
price:1200
},


{
name:"Stone Siren",
price:900
}


],




monitoring:[


{
name:"No Monitoring",
price:0
},


{
name:"GSM Monitoring",
price:1500
},


{
name:"WiFi Monitoring",
price:1200
}


]



}



},






/*=========================================================
 ACCESS CONTROL CONFIGURATOR
=========================================================*/


{


id:"access-control",

name:"Access Control Security System",

category:"Access Control",

brand:"Nexpak",

price:4500,


image:"images/products/access-control.jpg",



description:

"Secure access management systems for offices, warehouses and residential properties.",



options:{



reader:[


{
name:"RFID Reader",
price:0
},


{
name:"Fingerprint Reader",
price:1200
},


{
name:"Face Recognition Reader",
price:3500
}


],




lock:[


{
name:"Magnetic Lock",
price:900
},


{
name:"Electric Strike Lock",
price:1200
}


],




exitButton:[


{
name:"Standard Exit Button",
price:250
},


{
name:"No Touch Exit Button",
price:650
}


],




cards:[


{
name:"10 RFID Cards",
price:300
},


{
name:"50 RFID Cards",
price:1200
}


]



}



},






/*=========================================================
 SECURITY ACCESSORIES
=========================================================*/


{


id:"security-accessories",

name:"Security Accessories",

category:"Accessories",

brand:"Nexpak",

price:300,


image:"images/products/accessories.jpg",



description:

"Additional security equipment including sirens, sensors, cables and accessories.",



options:{



accessoryType:[


{
name:"Siren",
price:500
},


{
name:"Keypad",
price:1200
},


{
name:"Sensor",
price:350
},


{
name:"Gate Contact",
price:450
}


],



quantity:[


{
name:"1 Unit",
price:0
},


{
name:"5 Units",
price:1200
},


{
name:"10 Units",
price:2500
}


]



}



},
 /*=========================================================
 PRODUCT ENGINE
 PART 6/6
=========================================================*/



/*=========================================================
 FIND PRODUCT
=========================================================*/


function getProductById(id){

    return products.find(product => 
        product.id === id
    );

}






/*=========================================================
 LOAD SHOP PRODUCTS
=========================================================*/


function loadProducts(){


const container = document.querySelector(
".products-grid"
);


if(!container) return;



container.innerHTML="";



products.forEach(product=>{


container.innerHTML += `


<div class="product-card">



<img src="${product.image}"
alt="${product.name}">



<div class="product-content">



<span class="badge">

${product.category}

</span>



<h3>

${product.name}

</h3>



<p>

${product.description.substring(0,140)}

...

</p>



<div class="price">

<span class="current-price">

R${product.price.toLocaleString()}

</span>

</div>




<div class="product-buttons">



<a href="product.html?id=${product.id}"
class="quote-btn">

View Details

</a>



<button onclick="quickAdd('${product.id}')"
class="cart-btn">

Add Cart

</button>



</div>


</div>


</div>


`;



});



}








/*=========================================================
 PRODUCT DETAILS PAGE
=========================================================*/


function loadProductDetails(){


const id =

new URLSearchParams(
window.location.search
).get("id");



const product =

getProductById(id);



if(!product) return;




const title =
document.querySelector(".product-title");


const image =
document.querySelector(".product-image");


const description =
document.querySelector(".product-description");



if(title)

title.textContent =
product.name;



if(image)

image.src =
product.image;



if(description)

description.textContent =
product.description;



generateOptions(product);


updateLivePrice(product.price);



}








/*=========================================================
 CREATE DROPDOWN SELECTORS
=========================================================*/


function generateOptions(product){


const box =
document.querySelector(".product-options");



if(!box) return;



box.innerHTML="";



if(!product.options)

return;




Object.entries(product.options)

.forEach(([key,value])=>{



let html = `

<div class="option-group">


<label>

${key.replace(/([A-Z])/g,' $1')}

</label>



<select 
class="config-option"
data-option="${key}"
onchange="calculatePrice()">


`;




value.forEach(option=>{


html += `


<option 
value="${option.name}"
data-price="${option.price}">


${option.name}

(+R${option.price.toLocaleString()})


</option>


`;


});



html +=`

</select>


</div>

`;



box.innerHTML += html;



});



}








/*=========================================================
 LIVE PRICE CALCULATOR
=========================================================*/


function calculatePrice(){


const basePrice =

Number(
document.querySelector(".base-price")
?.dataset.price || 0
);



let total = basePrice;



document.querySelectorAll(
".config-option"
)

.forEach(option=>{


const selected =

option.options[
option.selectedIndex
];



total += Number(
selected.dataset.price
);



});



const output =
document.querySelector(".live-price");



if(output)

output.innerHTML =

"R" + total.toLocaleString();



return total;


}








/*=========================================================
 QUICK ADD
=========================================================*/


function quickAdd(id){



const product =
getProductById(id);



if(!product)

return;



const item = {


id:
product.id,


name:
product.name,


image:
product.image,


price:
product.price,


quantity:1,


options:{}


};



addToCart(item);



showCartMessage(
product.name + 
" added to cart"
);



}








/*=========================================================
 ADD CONFIGURED PRODUCT
=========================================================*/


function addConfiguredProduct(){



const id =

new URLSearchParams(
window.location.search
).get("id");



const product =

getProductById(id);



if(!product)

return;



let total =
product.price;



let selected = {};



document.querySelectorAll(
".config-option"
)

.forEach(option=>{


let choice =

option.options[
option.selectedIndex
];



total += Number(
choice.dataset.price
);



selected[
option.dataset.option
]

=

choice.value;



});




const quantity =

Number(
document.querySelector(
"#productQuantity"
)?.value || 1
);



const item = {


id:product.id,


name:product.name,


image:product.image,


price:total,


quantity:quantity,


options:selected


};



addToCart(item);



showCartMessage(
"Configured product added to cart"
);



}








/*=========================================================
 QUANTITY CONTROL
=========================================================*/


function changeQuantity(amount){


const input =

document.querySelector(
"#productQuantity"
);



if(!input)

return;



let value =

Number(input.value);



value += amount;



if(value < 1)

value=1;



input.value=value;



}








/*=========================================================
 CART MESSAGE
=========================================================*/


function showCartMessage(message){



let box =
document.querySelector(
".cart-message"
);



if(!box){


box=document.createElement(
"div"
);


box.className="cart-message";


document.body.appendChild(box);


}



box.innerHTML=message;



box.classList.add("show");



setTimeout(()=>{


box.classList.remove("show");


},3000);



}








/*=========================================================
 SEARCH PRODUCTS
=========================================================*/


function searchProducts(text){


const result =

products.filter(product=>


product.name
.toLowerCase()
.includes(
text.toLowerCase()
)


);



return result;


}








/*=========================================================
 INITIALIZE
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


loadProducts();


loadProductDetails();



});
