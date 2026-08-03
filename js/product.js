/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5

 products.js

 PART 1/5

 Product Database
=========================================================*/


const products = [

/*=========================================================
 CCTV SYSTEMS
=========================================================*/


{

id:"hikvision-cctv-8ch",

name:"Hikvision 8 Channel CCTV System",

category:"CCTV",

brand:"Hikvision",

price:4999,

image:"images/products/hikvision-cctv.jpg",


description:

"Professional HD CCTV surveillance system with DVR recorder, cameras, remote viewing and mobile monitoring.",


features:[

"8 Channel DVR",

"HD Cameras",

"Remote Mobile Viewing",

"Night Vision",

"Motion Detection"

],


options:{


channel:[

{
name:"8 Channel",
price:0
},

{
name:"16 Channel",
price:1500
},

{
name:"32 Channel",
price:3500
}

],



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
}

]


}


},





{

id:"dahua-cctv-system",

name:"Dahua CCTV Surveillance System",

category:"CCTV",

brand:"Dahua",

price:4599,


image:
"images/products/dahua-cctv.jpg",



description:

"Reliable Dahua CCTV solution for homes, offices, warehouses and commercial properties.",


features:[

"Full HD Recording",

"AI Detection",

"Remote Access",

"Weather Resistant Cameras"

],


options:{


channel:[

{
name:"8 Channel",
price:0
},

{
name:"16 Channel",
price:1400
},

{
name:"32 Channel",
price:3200
}


],



storage:[

{
name:"1TB HDD",
price:900
},

{
name:"2TB HDD",
price:1600
}

]


}


},





{

id:"hikvision-ip-cctv",

name:"Hikvision IP CCTV System",

category:"IP CCTV",

brand:"Hikvision",


price:7999,


image:

"images/products/ip-cctv.jpg",



description:

"Advanced IP camera surveillance system with NVR recording and high resolution cameras.",


features:[

"IP Cameras",

"NVR Recorder",

"AI Analytics",

"Remote Monitoring"

],



options:{


channels:[

{
name:"8 Channel IP",
price:0
},

{
name:"16 Channel IP",
price:2500
},

{
name:"32 Channel IP",
price:5500
}


],


resolution:[

{
name:"4MP Cameras",
price:0
},

{
name:"8MP 4K Cameras",
price:3000
}

]


}


}



];
/*=========================================================
 ELECTRIC FENCING SYSTEMS
=========================================================*/


{

id:"electric-fence-builder",

name:"Complete Electric Fence System",

category:"Electric Fencing",

brand:"Nexpak Security Solutions",

price:15000,


image:
"images/products/electric-fence.jpg",



description:

"Complete electric fencing solution including fence structure, energizer, wire, accessories and security components.",



features:[

"Residential & Industrial Protection",

"High Voltage Security",

"Multiple Fence Configurations",

"Optional GSM & WiFi Monitoring"

],



options:{



/*---------------------------------
 FENCE STRUCTURE
---------------------------------*/


structure:[


{
name:"Round Bar - 6 Line",
price:0
},


{
name:"Flat Bar - 6 Line",
price:500
},


{
name:"Square Tube - 6 Line",
price:1200
},


{
name:"Square Tube - 8 Line",
price:1800
},


{
name:"Square Tube - 10 Line",
price:2500
},


{
name:"Square Tube - 12 Line",
price:3200
}


],





/*---------------------------------
 WIRE OPTIONS
---------------------------------*/


wire:[


{
name:"Stainless Steel Solid Wire 700m",
price:1200
},


{
name:"Aluminium Solid Wire 1000m",
price:900
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





/*---------------------------------
 PROPERTY LENGTH
---------------------------------*/


propertyLength:[


{
name:"50 Metres",
price:0
},


{
name:"100 Metres",
price:2500
},


{
name:"200 Metres",
price:5000
},


{
name:"300 Metres",
price:7500
}


],





/*---------------------------------
 ENERGIZERS
---------------------------------*/


energizer:[


{
name:"1.3 Joule Energizer",
price:0
},


{
name:"4 Joule Energizer",
price:1500
},


{
name:"8 Joule Energizer",
price:3000
},


{
name:"14 Joule Energizer",
price:5500
}


],





/*---------------------------------
 EARTH SPIKES
---------------------------------*/


earthSpike:[


{
name:"1.2m Galvanised Earth Spike",
price:250
},


{
name:"1.2m Copper Plated Earth Spike",
price:450
}


],





/*---------------------------------
 TENSIONERS
---------------------------------*/


tensioners:[


{
name:"Standard Tensioner",
price:10
},


{
name:"Heavy Duty Tensioner",
price:18
},


{
name:"Stainless Steel Tensioner",
price:25
}


],





/*---------------------------------
 WARNING SIGNS
---------------------------------*/


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





/*---------------------------------
 NAIL IN ANCHORS
---------------------------------*/


anchors:[


{
name:"6x60 Nail In Anchors - 100 Pack",
price:450
},


{
name:"8x80 Nail In Anchors - 100 Pack",
price:650
}


],





/*---------------------------------
 HT CABLE
---------------------------------*/


htCable:[


{
name:"HT Cable Soft 50m",
price:350
},


{
name:"HT Cable Soft 100m",
price:650
},


{
name:"HT Cable Hard 100m",
price:900
},


{
name:"HT Cable Hard 200m",
price:1600
}


],





/*---------------------------------
 FERRULES
---------------------------------*/


ferrules:[


{
name:"Aluminium Ferrules 6mm - 100 Pack",
price:180
},


{
name:"Aluminium Ferrules 10mm - 100 Pack",
price:250
},


{
name:"Solid Ferrules 6mm - 100 Pack",
price:300
},


{
name:"Solid Ferrules 10mm - 100 Pack",
price:450
}


]



}
},
/*=========================================================
 GATE AUTOMATION SYSTEMS
=========================================================*/


{

id:"centurion-d5-evo",

name:"Centurion D5 Evo Sliding Gate Motor",

category:"Gate Automation",

brand:"Centurion",

price:8500,


image:
"images/products/centurion-d5-evo.jpg",



description:

"Heavy duty sliding gate motor designed for residential and commercial applications. Includes intelligent control technology and reliable operation.",



features:[

"Sliding Gate Automation",

"Battery Backup",

"Remote Control Compatible",

"High Security Locking",

"Solar Compatible"

],



options:{


battery:[

{
name:"Standard 7Ah Battery",
price:0
},


{
name:"9 Amp Gel Battery",
price:800
}

],



rack:[

{
name:"Nylon Rack",
price:0
},


{
name:"Steel Rack",
price:120
}

],



rackLength:[

{
name:"4 Metre Rack",
price:0
},


{
name:"6 Metre Rack",
price:250
},


{
name:"8 Metre Rack",
price:500
}

],



accessories:[

{
name:"2 Button Remote",
price:350
},


{
name:"4 Button Remote",
price:550
},


{
name:"Additional Receiver",
price:900
}

]


}


},







{

id:"centurion-d5-smart",

name:"Centurion D5 Smart Gate Motor",

category:"Gate Automation",

brand:"Centurion",

price:10500,


image:
"images/products/d5-smart.jpg",



description:

"Smart sliding gate automation solution with advanced connectivity and improved security features.",



features:[

"Smart Technology",

"Mobile Connectivity",

"Battery Backup",

"Residential Security"

],



options:{


battery:[

{
name:"7Ah Battery",
price:0
},


{
name:"9 Amp Gel Battery",
price:850
}

],



rack:[

{
name:"Nylon Rack",
price:0
},


{
name:"Steel Rack",
price:150
}

],



rackLength:[

{
name:"4 Metre Rack",
price:0
},


{
name:"6 Metre Rack",
price:250
},


{
name:"8 Metre Rack",
price:500
}

]


}


},







{

id:"centurion-d10-smart",

name:"Centurion D10 Smart Gate Motor",

category:"Gate Automation",

brand:"Centurion",

price:14500,


image:
"images/products/d10-smart.jpg",



description:

"High performance sliding gate automation system for heavier gates and commercial applications.",



features:[

"Heavy Duty Operation",

"Smart Control",

"High Security",

"Large Gate Capacity"

],



options:{


battery:[

{
name:"7Ah Battery",
price:0
},


{
name:"9 Amp Gel Battery",
price:1000
}

],



rack:[

{
name:"Nylon Rack",
price:0
},


{
name:"Steel Rack",
price:180
}

],



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

]


}


},







{

id:"centurion-d10-turbo",

name:"Centurion D10 Turbo Gate Motor",

category:"Gate Automation",

brand:"Centurion",

price:18500,


image:
"images/products/d10-turbo.jpg",



description:

"Premium high speed gate automation solution for industrial and high traffic applications.",



features:[

"Turbo Speed Operation",

"Industrial Grade",

"Advanced Safety Features",

"Smart Control Ready"

],



options:{


battery:[

{
name:"7Ah Battery",
price:0
},


{
name:"9 Amp Gel Battery",
price:1200
}

],



rack:[

{
name:"Nylon Rack",
price:0
},


{
name:"Steel Rack",
price:200
}

],



rackLength:[

{
name:"4 Metre Rack",
price:0
},


{
name:"6 Metre Rack",
price:350
},


{
name:"8 Metre Rack",
price:700
}

],



extras:[


{
name:"Infrared Safety Beams",
price:1200
},


{
name:"GSM Module",
price:1800
},


{
name:"WiFi Module",
price:1500
}


]


}


},
/*=========================================================
 ROBOGUARD SECURITY SYSTEMS
=========================================================*/


{

id:"roboguard-beam-system",

name:"Roboguard Wireless Outdoor Beam System",

category:"Outdoor Security",

brand:"Roboguard",

price:3999,


image:
"images/products/roboguard.jpg",



description:

"Wireless outdoor perimeter security system with selectable beam configurations and colour options.",



features:[

"Wireless Detection",

"Outdoor Protection",

"Long Range Detection",

"Low Maintenance"

],



options:{


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



extras:[


{
name:"Additional Receiver",
price:850
},


{
name:"Additional Remote",
price:450
},


{
name:"Battery Pack",
price:350
}


]


}


},







/*=========================================================
 ALARM SYSTEMS
=========================================================*/


{

id:"ajax-alarm-system",

name:"Ajax Wireless Alarm System",

category:"Alarm Systems",

brand:"Ajax",

price:6999,


image:
"images/products/ajax-alarm.jpg",



description:

"Professional wireless alarm system with smart detection, mobile alerts and security automation.",



features:[

"Wireless Sensors",

"Mobile Notifications",

"Smart Hub",

"Remote Control"

],



options:{



hub:[


{
name:"Ajax Hub",
price:0
},


{
name:"Ajax Hub Plus",
price:2500
},


{
name:"Ajax Hub 2",
price:3500
}


],



sensor:[


{
name:"Door Contact",
price:500
},


{
name:"Motion Sensor",
price:850
},


{
name:"Glass Break Sensor",
price:950
}


],



siren:[


{
name:"Indoor Siren",
price:800
},


{
name:"Outdoor Siren",
price:1500
}


]


}


},







/*=========================================================
 ACCESS CONTROL
=========================================================*/


{

id:"biometric-access-control",

name:"Biometric Access Control System",

category:"Access Control",

brand:"Nexpak Security Solutions",

price:4500,


image:
"images/products/access-control.jpg",



description:

"Secure biometric and RFID access control solution for offices, warehouses and restricted areas.",



features:[

"Fingerprint Access",

"RFID Cards",

"User Management",

"Attendance Tracking"

],



options:{



reader:[


{
name:"Fingerprint Reader",
price:0
},


{
name:"Fingerprint + RFID",
price:1200
},


{
name:"Face Recognition",
price:3500
}


],



installation:[


{
name:"Indoor Installation",
price:0
},


{
name:"Outdoor Weatherproof Installation",
price:1500
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


]


}


},







/*=========================================================
 KEYPADS & SENSORS
=========================================================*/


{

id:"security-accessories",

name:"Security Accessories",

category:"Security Accessories",

brand:"Nexpak",

price:350,


image:
"images/products/security-accessories.jpg",



description:

"Additional security accessories including keypads, sirens, sensors and control equipment.",



features:[

"Security Expansion",

"Compatible Equipment",

"Professional Grade"

],



options:{


keypad:[


{
name:"Standard Keypad",
price:0
},


{
name:"Wireless Keypad",
price:650
}


],



siren:[


{
name:"Indoor Siren",
price:400
},


{
name:"Outdoor Siren",
price:900
}


],



sensor:[


{
name:"PIR Motion Sensor",
price:350
},


{
name:"Door Sensor",
price:250
},


{
name:"Beam Sensor",
price:750
}


]


}


},
/*=========================================================
 PRODUCT FUNCTIONS
 PART 5/5

 SHOP LOADER
 PRODUCT PAGE ENGINE
=========================================================*/



//=========================================================
// GET PRODUCT BY ID
//=========================================================


function getProductById(id){


    return products.find(product =>

        product.id === id

    );


}






//=========================================================
// LOAD SHOP PRODUCTS
//=========================================================


function loadProducts(){


    const container =

    document.querySelector(
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

            ${product.description.substring(0,120)}
            ...

            </p>



            <div class="price">

            <span class="current-price">

            R${product.price}

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







//=========================================================
// PRODUCT DETAIL PAGE
//=========================================================


function loadProductDetails(){



    const params =

    new URLSearchParams(
    window.location.search
    );



    const id =

    params.get("id");



    const product =

    getProductById(id);



    if(!product) return;




    document.querySelector(
    ".product-title"
    ).innerHTML = product.name;



    document.querySelector(
    ".product-image"
    ).src = product.image;



    document.querySelector(
    ".product-description"
    ).innerHTML =
    product.description;



    generateOptions(product);



}








//=========================================================
// CREATE PRODUCT OPTIONS
//=========================================================


function generateOptions(product){


const area =

document.querySelector(
".product-options"
);



if(!area) return;



area.innerHTML="";



if(!product.options) return;



Object.keys(product.options)
.forEach(option=>{



let html = `

<label>

${option}

</label>


<select data-option="${option}">

`;



product.options[option]
.forEach(choice=>{


html += `


<option value="${choice.name}"
data-price="${choice.price}">


${choice.name}
(+R${choice.price})


</option>


`;



});



html += `

</select>

`;



area.innerHTML += html;



});



}







//=========================================================
// QUICK ADD TO CART
//=========================================================


function quickAdd(id){



const product =

getProductById(id);



if(!product) return;




const item = {


id:product.id,


name:product.name,


image:product.image,


price:product.price,


quantity:1,


options:{}



};



addToCart(item);



alert(

product.name +

" added to cart"

);



}







//=========================================================
// ADD CONFIGURED PRODUCT
//=========================================================


function addConfiguredProduct(){



const params =

new URLSearchParams(
window.location.search
);



const product =

getProductById(
params.get("id")
);



if(!product) return;




let finalPrice = product.price;



let selectedOptions={};




document
.querySelectorAll(
".product-options select"
)

.forEach(select=>{


const selected =

select.options[
select.selectedIndex
];



const extra =

Number(
selected.dataset.price
);



finalPrice += extra;



selectedOptions[
select.dataset.option
]
=
selected.value;



});






const item={



id:product.id,


name:product.name,


image:product.image,


price:finalPrice,


quantity:1,


options:selectedOptions



};



addToCart(item);



alert(
"Added to cart"
);



}







//=========================================================
// CATEGORY FILTER
//=========================================================


function filterProducts(category){



const container =

document.querySelector(
".products-grid"
);



if(!container) return;



container.innerHTML="";



products

.filter(product=>

product.category === category

)

.forEach(product=>{


container.innerHTML += `


<div class="product-card">


<img src="${product.image}">


<h3>
${product.name}
</h3>


<p>
R${product.price}
</p>


<a href="product.html?id=${product.id}">
View
</a>


</div>


`;



});



}








//=========================================================
// START PRODUCT ENGINE
//=========================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadProducts();


loadProductDetails();


});
