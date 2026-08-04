/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 products.js
 PART 1/6
 PRODUCT DATABASE
=========================================================*/

const products = [

/*=========================================================
 CCTV SYSTEM
=========================================================*/

{
    id: "hikvision-cctv-8ch",

    name: "Hikvision Professional CCTV System",

    category: "CCTV",

    brand: "Hikvision",

    price: 4999,

    image: "images/products/cctv.jpg",

    description:
        "Professional Hikvision CCTV surveillance system with configurable DVR, cameras, storage and accessories.",

    features: [
        "Remote Viewing",
        "Night Vision",
        "Motion Detection",
        "Mobile App",
        "HD Recording"
    ],

    options: {

        channel: [
            { name: "8 Channel DVR", price: 0 },
            { name: "16 Channel DVR", price: 1800 },
            { name: "32 Channel DVR", price: 4200 }
        ],

        cameras: [
            { name: "4 Cameras", price: 0 },
            { name: "8 Cameras", price: 2500 },
            { name: "16 Cameras", price: 6200 }
        ],

        storage: [
            { name: "1TB HDD", price: 1200 },
            { name: "2TB HDD", price: 2200 },
            { name: "4TB HDD", price: 3800 }
        ],

        cable: [
            { name: "100m Coax", price: 850 },
            { name: "100m CAT5", price: 950 },
            { name: "100m CAT6", price: 1200 }
        ],

        psu: [
            { name: "Single PSU", price: 0 },
            { name: "9 Way PSU", price: 850 }
        ],

        monitor: [
            { name: "No Monitor", price: 0 },
            { name: "22 Inch LED", price: 2200 },
            { name: "32 Inch LED", price: 4200 }
        ],

        backup: [
            { name: "No UPS", price: 0 },
            { name: "UPS Backup", price: 1800 }
        ]

    }

},

/*=========================================================
 IP CCTV
=========================================================*/

{
    id: "hikvision-ip-cctv",

    name: "Professional IP CCTV System",

    category: "IP CCTV",

    brand: "Hikvision",

    price: 7999,

    image: "images/products/ip-cctv.jpg",

    description:
        "Advanced IP CCTV system using AI cameras, NVR recording and network infrastructure.",

    features: [
        "4K Recording",
        "AI Detection",
        "Smart Playback",
        "Remote Monitoring",
        "Power over Ethernet"
    ],

    options: {

        nvr: [
            { name: "8 Channel NVR", price: 0 },
            { name: "16 Channel NVR", price: 2500 },
            { name: "32 Channel NVR", price: 5800 }
        ],

        cameras: [
            { name: "4 x 4MP Cameras", price: 0 },
            { name: "8 x 4MP Cameras", price: 3800 },
            { name: "16 x 4MP Cameras", price: 7600 }
        ],

        resolution: [
            { name: "4MP", price: 0 },
            { name: "6MP", price: 1800 },
            { name: "8MP 4K", price: 4200 }
        ],

        storage: [
            { name: "2TB HDD", price: 1800 },
            { name: "4TB HDD", price: 3400 },
            { name: "8TB HDD", price: 6200 }
        ],

        poe: [
            { name: "8 Port POE", price: 0 },
            { name: "16 Port POE", price: 1800 },
            { name: "24 Port POE", price: 4200 }
        ],

        cable: [
            { name: "100m CAT5", price: 950 },
            { name: "100m CAT6", price: 1400 }
        ]

    }

},

 /*=========================================================
 ELECTRIC FENCE BUILDER
=========================================================*/

{
    id: "electric-fence-builder",

    name: "Complete Electric Fence Builder",

    category: "Electric Fencing",

    brand: "Nemtek",

    price: 12999,

    image: "images/products/electric-fence.jpg",

    description:
        "Build your complete electric fence system with energizers, brackets, wire, warning signs and accessories.",

    features: [
        "Residential & Industrial",
        "Premium Energizers",
        "Lightning Protection",
        "Battery Backup",
        "Expandable System"
    ],

    options: {

        fenceType: [
            { name: "6 Line Round Bar", price: 0 },
            { name: "6 Line Flat Bar", price: 850 },
            { name: "8 Line Square Tube", price: 1800 },
            { name: "10 Line Square Tube", price: 3200 }
        ],

        length: [
            { name: "50 Metres", price: 0 },
            { name: "100 Metres", price: 3200 },
            { name: "200 Metres", price: 6900 },
            { name: "300 Metres", price: 10500 }
        ],

        energizer: [
            { name: "2 Joule", price: 0 },
            { name: "4 Joule", price: 2200 },
            { name: "8 Joule", price: 4800 },
            { name: "14 Joule", price: 7900 }
        ],

        wire: [
            { name: "Aluminium Wire", price: 1200 },
            { name: "Galvanised Wire", price: 950 },
            { name: "Stainless Steel Wire", price: 1650 }
        ],

        earthSpike: [
            { name: "1 Earth Spike", price: 0 },
            { name: "3 Earth Spikes", price: 600 },
            { name: "5 Earth Spikes", price: 950 }
        ],

        siren: [
            { name: "No Siren", price: 0 },
            { name: "Outdoor Siren", price: 750 }
        ],

        keypad: [
            { name: "No Keypad", price: 0 },
            { name: "LCD Keypad", price: 1450 }
        ],

        monitoring: [
            { name: "None", price: 0 },
            { name: "WiFi Module", price: 1650 },
            { name: "GSM Module", price: 2450 }
        ]

    }

},

/*=========================================================
 GATE AUTOMATION
=========================================================*/

{
    id: "centurion-d5-evo",

    name: "Centurion Gate Automation",

    category: "Gate Motors",

    brand: "Centurion",

    price: 8999,

    image: "images/products/gate-motor.jpg",

    description:
        "Professional sliding gate motor systems with batteries, racks, remotes and smart accessories.",

    features: [
        "Battery Backup",
        "Smart Controller",
        "Remote Access",
        "Solar Ready",
        "Heavy Duty"
    ],

    options: {

        motor: [
            { name: "D5 Evo", price: 0 },
            { name: "D5 Smart", price: 2800 },
            { name: "D10 Smart", price: 7200 }
        ],

        battery: [
            { name: "7Ah Battery", price: 0 },
            { name: "9Ah Battery", price: 850 }
        ],

        rack: [
            { name: "4m Nylon Rack", price: 0 },
            { name: "6m Nylon Rack", price: 420 },
            { name: "Steel Rack", price: 850 }
        ],

        remotes: [
            { name: "1 Remote", price: 0 },
            { name: "2 Remotes", price: 450 },
            { name: "4 Remotes", price: 900 }
        ],

        beam: [
            { name: "No Safety Beam", price: 0 },
            { name: "Safety Beam Kit", price: 1350 }
        ],

        gsm: [
            { name: "No GSM Module", price: 0 },
            { name: "GSM Module", price: 2200 }
        ],

        solar: [
            { name: "No Solar", price: 0 },
            { name: "Solar Backup Kit", price: 4800 }
        ],

        installation: [
            { name: "Supply Only", price: 0 },
            { name: "Professional Installation", price: 2800 }
        ]

    }

},

 /*=========================================================
 ROBOGUARD WIRELESS PERIMETER SYSTEM
=========================================================*/

{
    id: "roboguard-beam-system",

    name: "Roboguard Wireless Perimeter System",

    category: "Outdoor Security",

    brand: "Roboguard",

    price: 3999,

    image: "images/products/roboguard.jpg",

    description:
        "Wireless outdoor perimeter detection system providing early warning before intrusion.",

    features: [
        "Wireless Detection",
        "Long Range",
        "Battery Powered",
        "Weather Resistant",
        "Expandable"
    ],

    options: {

        kit: [
            { name: "4 Beam Kit", price: 0 },
            { name: "6 Beam Kit", price: 1800 },
            { name: "8 Beam Kit", price: 3500 }
        ],

        colour: [
            { name: "Green", price: 0 },
            { name: "Black", price: 0 },
            { name: "White", price: 0 }
        ],

        receiver: [
            { name: "Standard Receiver", price: 0 },
            { name: "Advanced Receiver", price: 1200 }
        ],

        siren: [
            { name: "No Siren", price: 0 },
            { name: "Outdoor Siren", price: 900 }
        ]

    }

},

/*=========================================================
 AJAX ALARM SYSTEM
=========================================================*/

{
    id: "ajax-alarm-system",

    name: "Ajax Smart Alarm System",

    category: "Alarm Systems",

    brand: "Ajax",

    price: 6499,

    image: "images/products/alarm.jpg",

    description:
        "Professional wireless alarm system with smart sensors, mobile app and remote monitoring.",

    features: [
        "Wireless Technology",
        "Smartphone Control",
        "Instant Alerts",
        "Battery Backup",
        "Expandable"
    ],

    options: {

        panel: [
            { name: "Ajax Hub", price: 0 },
            { name: "Ajax Hub 2", price: 2500 }
        ],

        keypad: [
            { name: "No Keypad", price: 0 },
            { name: "Wireless Keypad", price: 1200 },
            { name: "Touch Keypad", price: 2500 }
        ],

        sensors: [
            { name: "4 Motion Sensors", price: 0 },
            { name: "8 Motion Sensors", price: 1800 },
            { name: "16 Motion Sensors", price: 4200 }
        ],

        siren: [
            { name: "Indoor Siren", price: 600 },
            { name: "Outdoor Siren", price: 1200 }
        ],

        monitoring: [
            { name: "No GSM", price: 0 },
            { name: "GSM Module", price: 1800 },
            { name: "WiFi Module", price: 1500 }
        ]

    }

},

/*=========================================================
 ACCESS CONTROL
=========================================================*/

{
    id: "biometric-access-control",

    name: "Biometric Access Control System",

    category: "Access Control",

    brand: "ZKTeco",

    price: 4999,

    image: "images/products/access-control.jpg",

    description:
        "Fingerprint, facial recognition and RFID access control solutions for homes and businesses.",

    features: [
        "Fingerprint Reader",
        "RFID Cards",
        "Face Recognition",
        "Time Attendance",
        "Remote Management"
    ],

    options: {

        reader: [
            { name: "RFID Reader", price: 0 },
            { name: "Fingerprint Reader", price: 1500 },
            { name: "Face Recognition", price: 4500 }
        ],

        lock: [
            { name: "Maglock", price: 1200 },
            { name: "Electric Strike", price: 1500 }
        ],

        cards: [
            { name: "10 RFID Cards", price: 300 },
            { name: "50 RFID Cards", price: 1200 },
            { name: "100 RFID Cards", price: 2200 }
        ],

        exitButton: [
            { name: "Standard Exit Button", price: 250 },
            { name: "Touchless Exit Button", price: 650 }
        ]

    }

},

/*=========================================================
 SECURITY ACCESSORIES
=========================================================*/

{
    id: "security-accessories",

    name: "Security Accessories",

    category: "Accessories",

    brand: "Nexpak",

    price: 299,

    image: "images/products/accessories.jpg",

    description:
        "Quality security accessories including sirens, power supplies, batteries, connectors and cabling.",

    features: [
        "Premium Quality",
        "Compatible With Major Brands",
        "Professional Grade",
        "Reliable Performance"
    ],

    options: {

        accessory: [
            { name: "Outdoor Siren", price: 600 },
            { name: "Indoor Siren", price: 450 },
            { name: "9 Way PSU", price: 850 },
            { name: "12V Battery", price: 450 },
            { name: "CCTV Connectors", price: 180 }
        ],

        quantity: [
            { name: "1 Item", price: 0 },
            { name: "5 Items", price: 1200 },
            { name: "10 Items", price: 2500 }
        ]

    }

}

];

/*=========================================================
 PRODUCT ENGINE
 PART 4/6
=========================================================*/

/*=========================================================
 FIND PRODUCT BY ID
=========================================================*/

function getProductById(id) {

    return products.find(product => product.id === id);

}

/*=========================================================
 LOAD SHOP PRODUCTS
=========================================================*/

function loadProducts() {

    const grid = document.querySelector(".products-grid");

    if (!grid) return;

    grid.innerHTML = "";

    products.forEach(product => {

        grid.innerHTML += `

<div class="product-card fade">

    <img src="${product.image}" alt="${product.name}">

    <div class="product-content">

        <span class="product-badge">
            ${product.category}
        </span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-price">
            From <strong>R${product.price.toLocaleString()}</strong>
        </div>

        <div class="product-buttons">

            <a href="product.html?id=${product.id}"
               class="primary-btn">

                Configure

            </a>

        </div>

    </div>

</div>

`;

    });

}

/*=========================================================
 LOAD PRODUCT DETAILS
=========================================================*/

function loadProductDetails() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) return;

    const product = getProductById(id);

    if (!product) {

        document.querySelector(".product-title").textContent =
            "Product Not Found";

        return;

    }

    document.querySelector(".product-title").textContent =
        product.name;

    document.querySelector(".product-description").textContent =
        product.description;

    document.querySelector(".product-image").src =
        product.image;

    document.querySelector(".product-image").alt =
        product.name;

    const fullDescription =
        document.querySelector(".full-description");

    if (fullDescription)
        fullDescription.textContent =
            product.description;

    const featureList =
        document.querySelector(".product-features");

    if (featureList) {

        featureList.innerHTML = "";

        product.features.forEach(feature => {

            featureList.innerHTML +=
                `<li>${feature}</li>`;

        });

    }

    generateOptions(product);

}

/*=========================================================
 SEARCH PRODUCTS
=========================================================*/

function searchProducts(searchText) {

    const cards =
        document.querySelectorAll(".product-card");

    searchText = searchText.toLowerCase();

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(searchText)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

/*=========================================================
 FILTER PRODUCTS
=========================================================*/

function filterProducts(category) {

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const badge =
            card.querySelector(".product-badge");

        if (!badge) return;

        if (category === "All") {

            card.style.display = "";

        } else if (
            badge.innerText === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

/*=========================================================
 RELATED PRODUCTS
=========================================================*/

function loadRelatedProducts(currentProduct) {

    const container =
        document.getElementById("related-products");

    if (!container) return;

    container.innerHTML = "";

    products
        .filter(product => product.id !== currentProduct.id)
        .slice(0,4)
        .forEach(product => {

            container.innerHTML += `

<div class="service-card fade">

    <img src="${product.image}" alt="${product.name}">

    <h3>${product.name}</h3>

    <p>${product.category}</p>

    <a href="product.html?id=${product.id}">

        View Product
        <i class="fas fa-arrow-right"></i>

    </a>

</div>

`;

        });

             }

/*=========================================================
 PRODUCT CONFIGURATOR
 PART 5/6
=========================================================*/

let currentProduct = null;
let currentPrice = 0;

/*=========================================================
 GENERATE OPTIONS
=========================================================*/

function generateOptions(product){

    currentProduct = product;
    currentPrice = product.price;

    const container =
        document.querySelector(".product-options");

    if(!container) return;

    container.innerHTML = "";

    Object.entries(product.options).forEach(([key, values])=>{

        let html = `

<div class="option-group">

<label>

${key.replace(/([A-Z])/g," $1")}

</label>

<select class="config-option"
data-option="${key}">

`;

        values.forEach((item,index)=>{

            html += `

<option
value="${index}"
data-price="${item.price}">

${item.name}
(+R${item.price.toLocaleString()})

</option>

`;

        });

        html += `

</select>

</div>

`;

        container.innerHTML += html;

    });

    document
    .querySelectorAll(".config-option")
    .forEach(select=>{

        select.addEventListener(
            "change",
            updateConfigurationPrice
        );

    });

    updateConfigurationPrice();

}

/*=========================================================
 UPDATE LIVE PRICE
=========================================================*/

function updateConfigurationPrice(){

    if(!currentProduct) return;

    let total = currentProduct.price;

    document
    .querySelectorAll(".config-option")
    .forEach(select=>{

        const option =
        select.options[
        select.selectedIndex];

        total += Number(
            option.dataset.price
        );

    });

    const qty =
    parseInt(
    document.getElementById(
    "productQuantity"
    )?.value || 1);

    total *= qty;

    currentPrice = total;

    const livePrice =
    document.querySelector(".live-price");

    if(livePrice){

        livePrice.innerHTML =
        "R" +
        total.toLocaleString();

    }

}

/*=========================================================
 CHANGE QUANTITY
=========================================================*/

function changeQuantity(change){

    const qty =
    document.getElementById(
    "productQuantity"
    );

    if(!qty) return;

    let value =
    parseInt(qty.value);

    value += change;

    if(value < 1)
        value = 1;

    qty.value = value;

    updateConfigurationPrice();

}

const quantityInput =
document.getElementById(
"productQuantity"
);

if(quantityInput){

    quantityInput.addEventListener(
    "input",
    updateConfigurationPrice
    );

}

/*=========================================================
 ADD CONFIGURED PRODUCT
=========================================================*/

function addConfiguredProduct(){

    if(!currentProduct) return;

    const config = {};

    document
    .querySelectorAll(".config-option")
    .forEach(select=>{

        config[
        select.dataset.option
        ] =
        select.options[
        select.selectedIndex
        ].text;

    });

    const quantity =
    parseInt(
    document.getElementById(
    "productQuantity"
    ).value
    );

    const item = {

        id: currentProduct.id,

        name: currentProduct.name,

        image: currentProduct.image,

        quantity: quantity,

        configuration: config,

        price: currentPrice

    };

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    cart.push(item);

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    alert(
    "Product added to cart successfully."
    );

}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 products.js
 PART 6/6
 CART + INITIALIZATION
=========================================================*/

/*=========================================================
 QUICK ADD TO CART
=========================================================*/

function quickAdd(id){

    const product = getProductById(id);

    if(!product) return;

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    cart.push({

        id: product.id,

        name: product.name,

        image: product.image,

        price: product.price,

        quantity: 1,

        configuration: {}

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart.");

}

/*=========================================================
 UPDATE CART COUNT
=========================================================*/

function updateCartCount(){

    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    const badge =
    document.querySelector(".cart-count");

    if(!badge) return;

    badge.textContent = cart.length;

}

/*=========================================================
 REMOVE FROM CART
=========================================================*/

function removeFromCart(index){

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}

/*=========================================================
 CALCULATE CART TOTAL
=========================================================*/

function getCartTotal(){

    let total = 0;

    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    cart.forEach(item=>{

        total += item.price;

    });

    return total;

}

/*=========================================================
 WHATSAPP QUOTE
=========================================================*/

function sendWhatsAppQuote(){

    const cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    let message =
`Hello Nexpak Security Solutions,

Please send me a quotation for:

`;

    cart.forEach((item,index)=>{

        message +=
`${index+1}. ${item.name}
Qty: ${item.quantity}
Price: R${item.price.toLocaleString()}

`;

        if(item.configuration){

            Object.entries(item.configuration)
            .forEach(([key,value])=>{

                message +=
`${key}: ${value}
`;

            });

            message += "\n";

        }

    });

    message +=
`Estimated Total: R${getCartTotal().toLocaleString()}`;

    window.open(

"https://wa.me/27836308249?text=" +
encodeURIComponent(message),

"_blank"

);

}

/*=========================================================
 PAGE INITIALIZATION
=========================================================*/

document.addEventListener(
"DOMContentLoaded",
function(){

    updateCartCount();

    loadProducts();

    loadProductDetails();

});
