/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 configurator.js
 PART 1/5

 ADVANCED CONFIGURATION ENGINE
=========================================================*/

document.addEventListener("DOMContentLoaded", initConfigurator);

/*=========================================================
 GLOBAL VARIABLES
=========================================================*/

let currentProduct = null;
let currentQuantity = 1;
let selectedOptions = {};
let configurationPrice = 0;

/*=========================================================
 INITIALIZE CONFIGURATOR
=========================================================*/

function initConfigurator() {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    if (!productId) {
        console.error("No product selected.");
        return;
    }

    currentProduct = getProductById(productId);

    if (!currentProduct) {
        console.error("Product not found.");
        return;
    }

    configurationPrice = currentProduct.price;

    loadProductInformation();

    createConfigurationSelectors();

    updateConfigurationSummary();

    calculatePrice();

}

/*=========================================================
 LOAD PRODUCT INFORMATION
=========================================================*/

function loadProductInformation() {

    const title = document.querySelector(".product-title");
    const description = document.querySelector(".product-description");
    const image = document.querySelector(".product-image");
    const fullDescription = document.querySelector(".full-description");
    const featureList = document.querySelector(".product-features");

    if (title)
        title.textContent = currentProduct.name;

    if (description)
        description.textContent = currentProduct.description;

    if (image) {
        image.src = currentProduct.image;
        image.alt = currentProduct.name;
    }

    if (fullDescription)
        fullDescription.textContent = currentProduct.description;

    if (featureList) {

        featureList.innerHTML = "";

        currentProduct.features.forEach(feature => {

            featureList.innerHTML += `
<li>
<i class="fas fa-check-circle"></i>
${feature}
</li>
`;

        });

    }

}

/*=========================================================
 RESET CONFIGURATION
=========================================================*/

function resetConfiguration() {

    selectedOptions = {};
    currentQuantity = 1;
    configurationPrice = currentProduct.price;

}

/*=========================================================
 GET CURRENT PRODUCT
=========================================================*/

function getCurrentProduct() {

    return currentProduct;

}

/*=========================================================
 GET CURRENT CONFIGURATION
=========================================================*/

function getCurrentConfiguration() {

    return {

        product: currentProduct,
        quantity: currentQuantity,
        options: selectedOptions,
        total: configurationPrice

    };

}

console.log("%cNEXPAK CONFIGURATOR V9 LOADED",
"color:#00b4ff;font-size:18px;font-weight:bold;");
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 configurator.js
 PART 2/5

 DYNAMIC CONFIGURATION SELECTORS
=========================================================*/

/*=========================================================
 CREATE CONFIGURATION SELECTORS
=========================================================*/

function createConfigurationSelectors() {

    const container =
        document.querySelector(".product-options");

    if (!container || !currentProduct) return;

    container.innerHTML = "";

    selectedOptions = {};

    Object.entries(currentProduct.options).forEach(([key, values]) => {

        const group = document.createElement("div");
        group.className = "option-group";

        const label = document.createElement("label");
        label.textContent = formatOptionName(key);

        const select = document.createElement("select");
        select.className = "config-select";
        select.dataset.option = key;

        values.forEach((item, index) => {

            const option = document.createElement("option");

            option.value = item.name;
            option.dataset.price = item.price;

            option.textContent =
                item.price > 0
                ? `${item.name} (+R${item.price.toLocaleString()})`
                : item.name;

            if (index === 0) {
                option.selected = true;
                selectedOptions[key] = item.name;
            }

            select.appendChild(option);

        });

        select.addEventListener("change", configurationChanged);

        group.appendChild(label);
        group.appendChild(select);

        container.appendChild(group);

    });

}

/*=========================================================
 CONFIGURATION CHANGED
=========================================================*/

function configurationChanged(event) {

    const select = event.target;

    selectedOptions[
        select.dataset.option
    ] = select.value;

    updateConfigurationSummary();

    calculatePrice();

}

/*=========================================================
 FORMAT OPTION NAME
=========================================================*/

function formatOptionName(text) {

    return text

        .replace(/([A-Z])/g, " $1")

        .replace(/^./, letter =>
            letter.toUpperCase()
        );

}

/*=========================================================
 GET SELECTED OPTION PRICE
=========================================================*/

function getSelectedOptionPrice(select) {

    return Number(
        select.options[
            select.selectedIndex
        ].dataset.price
    );

}

/*=========================================================
 GET SELECTED OPTION VALUE
=========================================================*/

function getSelectedOptionValue(select) {

    return select.options[
        select.selectedIndex
    ].value;

}

/*=========================================================
 RESET SELECTORS
=========================================================*/

function resetSelectors() {

    document
        .querySelectorAll(".config-select")
        .forEach(select => {

            select.selectedIndex = 0;

            selectedOptions[
                select.dataset.option
            ] = select.value;

        });

    currentQuantity = 1;

    const qty =
        document.getElementById("productQuantity");

    if (qty)
        qty.value = 1;

    calculatePrice();

    updateConfigurationSummary();

}

/*=========================================================
 REFRESH CONFIGURATION
=========================================================*/

function refreshConfigurator() {

    createConfigurationSelectors();

    calculatePrice();

    updateConfigurationSummary();

}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 configurator.js
 PART 3/5

 PRICE ENGINE & CONFIGURATION SUMMARY
=========================================================*/

/*=========================================================
 CALCULATE CONFIGURATION PRICE
=========================================================*/

function calculatePrice() {

    if (!currentProduct) return;

    let total = currentProduct.price;

    document
    .querySelectorAll(".config-select")
    .forEach(select => {

        total += getSelectedOptionPrice(select);

    });

    total *= currentQuantity;

    configurationPrice = total;

    updateLivePrice();

    updateConfigurationSummary();

}

/*=========================================================
 UPDATE LIVE PRICE
=========================================================*/

function updateLivePrice() {

    const priceBox =
    document.querySelector(".live-price");

    if (!priceBox) return;

    priceBox.innerHTML =
    "R" +
    configurationPrice.toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}

/*=========================================================
 CHANGE QUANTITY
=========================================================*/

function changeQuantity(change) {

    currentQuantity += change;

    if (currentQuantity < 1)
        currentQuantity = 1;

    const input =
    document.getElementById("productQuantity");

    if (input)
        input.value = currentQuantity;

    calculatePrice();

}

/*=========================================================
 MANUAL QUANTITY INPUT
=========================================================*/

document.addEventListener("input", function(e){

    if(e.target.id !== "productQuantity")
        return;

    let qty = parseInt(e.target.value);

    if(isNaN(qty) || qty < 1)
        qty = 1;

    currentQuantity = qty;

    e.target.value = qty;

    calculatePrice();

});

/*=========================================================
 UPDATE CONFIGURATION SUMMARY
=========================================================*/

function updateConfigurationSummary(){

    const summary =
    document.querySelector(".configuration-summary");

    if(!summary) return;

    summary.innerHTML = "";

    Object.keys(selectedOptions)
    .forEach(option=>{

        summary.innerHTML += `

<div class="summary-row">

<span>

${formatOptionName(option)}

</span>

<strong>

${selectedOptions[option]}

</strong>

</div>

`;

    });

}

/*=========================================================
 PRICE BREAKDOWN
=========================================================*/

function getPriceBreakdown(){

    let breakdown = [];

    breakdown.push({

        name:"Base Product",

        price:currentProduct.price

    });

    document
    .querySelectorAll(".config-select")
    .forEach(select=>{

        const option =
        select.options[
        select.selectedIndex];

        breakdown.push({

            name:option.value,

            price:Number(
                option.dataset.price
            )

        });

    });

    return breakdown;

}

/*=========================================================
 DISPLAY PRICE BREAKDOWN
=========================================================*/

function displayPriceBreakdown(){

    const box =
    document.querySelector(".price-breakdown");

    if(!box) return;

    const breakdown =
    getPriceBreakdown();

    box.innerHTML = "";

    breakdown.forEach(item=>{

        box.innerHTML += `

<div class="price-row">

<span>

${item.name}

</span>

<strong>

R${item.price.toLocaleString()}

</strong>

</div>

`;

    });

         }

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 configurator.js
 PART 4/5

 VALIDATION • SAVE/LOAD • RELATED PRODUCTS
=========================================================*/

/*=========================================================
 VALIDATE CONFIGURATION
=========================================================*/

function validateConfiguration(){

    if(!currentProduct)
        return false;

    const selects =
    document.querySelectorAll(".config-select");

    let valid = true;

    selects.forEach(select=>{

        if(select.selectedIndex < 0){

            valid = false;

            select.classList.add("config-error");

        }else{

            select.classList.remove("config-error");

        }

    });

    if(!valid){

        alert(
        "Please complete your product configuration."
        );

    }

    return valid;

}

/*=========================================================
 SAVE CONFIGURATION
=========================================================*/

function saveConfiguration(){

    if(!currentProduct) return;

    const data = {

        productId: currentProduct.id,

        quantity: currentQuantity,

        options: selectedOptions

    };

    localStorage.setItem(
        "nexpak_configuration",
        JSON.stringify(data)
    );

}

/*=========================================================
 LOAD SAVED CONFIGURATION
=========================================================*/

function loadSavedConfiguration(){

    const saved =
    localStorage.getItem(
    "nexpak_configuration"
    );

    if(!saved) return;

    const config =
    JSON.parse(saved);

    if(
        !currentProduct ||
        config.productId !== currentProduct.id
    ){
        return;
    }

    currentQuantity =
    config.quantity || 1;

    document
    .querySelectorAll(".config-select")
    .forEach(select=>{

        const value =
        config.options[
        select.dataset.option];

        if(!value) return;

        [...select.options]
        .forEach(option=>{

            if(option.value === value){

                option.selected = true;

            }

        });

        selectedOptions[
        select.dataset.option] = value;

    });

    const qty =
    document.getElementById(
    "productQuantity");

    if(qty)
        qty.value = currentQuantity;

    calculatePrice();

}

/*=========================================================
 CLEAR SAVED CONFIGURATION
=========================================================*/

function clearSavedConfiguration(){

    localStorage.removeItem(
    "nexpak_configuration"
    );

}

/*=========================================================
 RELATED PRODUCTS
=========================================================*/

function loadRelatedProducts(){

    const container =
    document.getElementById(
    "related-products"
    );

    if(
        !container ||
        !currentProduct
    ) return;

    container.innerHTML = "";

    products

    .filter(product=>

        product.id !== currentProduct.id

    )

    .slice(0,4)

    .forEach(product=>{

        container.innerHTML += `

<div class="service-card">

<img src="${product.image}"
alt="${product.name}">

<h3>

${product.name}

</h3>

<p>

${product.description.substring(0,80)}...

</p>

<a href="product.html?id=${product.id}">

Configure

<i class="fas fa-arrow-right"></i>

</a>

</div>

`;

    });

}

/*=========================================================
 PRODUCT IMAGE GALLERY
=========================================================*/

function changeProductImage(image){

    const img =
    document.querySelector(
    ".product-image"
    );

    if(img){

        img.src = image;

    }

}

/*=========================================================
 AUTO SAVE
=========================================================*/

document.addEventListener(
"change",
function(e){

    if(
        e.target.classList.contains(
        "config-select")
    ){

        saveConfiguration();

    }

});

/*=========================================================
 INITIALIZE SAVED DATA
=========================================================*/

document.addEventListener(
"DOMContentLoaded",
()=>{

    setTimeout(()=>{

        loadSavedConfiguration();

        loadRelatedProducts();

    },300);

});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 configurator.js
 PART 5/5

 CART • WHATSAPP • PRINT • FINAL INITIALIZATION
=========================================================*/

/*=========================================================
 ADD CONFIGURED PRODUCT TO CART
=========================================================*/

function addConfiguredProduct(){

    if(!validateConfiguration())
        return;

    const item = {

        id: currentProduct.id,

        name: currentProduct.name,

        image: currentProduct.image,

        quantity: currentQuantity,

        price: configurationPrice,

        options: {...selectedOptions}

    };

    if(typeof addToCart === "function"){

        addToCart(item);

        saveConfiguration();

        alert(
            currentProduct.name +
            " added to cart."
        );

    }else{

        console.error(
            "cart.js not loaded."
        );

    }

}

/*=========================================================
 BUILD WHATSAPP QUOTE
=========================================================*/

function createWhatsAppQuote(){

    if(!currentProduct) return;

    let message =
`*NEXPAK SECURITY SOLUTIONS*

Quotation Request

Product:
${currentProduct.name}

`;

    Object.keys(selectedOptions).forEach(option=>{

        message +=
`${formatOptionName(option)}:
${selectedOptions[option]}

`;

    });

    message +=

`Quantity:
${currentQuantity}

Estimated Total:
R${configurationPrice.toLocaleString("en-ZA")}

Please send me a quotation.`;

    window.open(

"https://wa.me/27836308249?text=" +

encodeURIComponent(message),

"_blank"

);

}

/*=========================================================
 PRINT CONFIGURATION
=========================================================*/

function printConfiguration(){

    window.print();

}

/*=========================================================
 COPY CONFIGURATION
=========================================================*/

function copyConfiguration(){

    let text =

currentProduct.name + "\n\n";

    Object.keys(selectedOptions).forEach(option=>{

        text +=

formatOptionName(option) +

": " +

selectedOptions[option] +

"\n";

    });

    text +=

"\nQuantity: " +

currentQuantity +

"\n";

    text +=

"Total: R" +

configurationPrice.toLocaleString();

    navigator.clipboard.writeText(text);

    alert("Configuration copied.");

}

/*=========================================================
 EMAIL QUOTE
=========================================================*/

function emailConfiguration(){

    let body =

"Quotation Request%0A%0A";

    body +=

"Product: " +

currentProduct.name +

"%0A";

    Object.keys(selectedOptions).forEach(option=>{

        body +=

formatOptionName(option) +

": " +

selectedOptions[option] +

"%0A";

    });

    body +=

"Quantity: " +

currentQuantity +

"%0A";

    body +=

"Estimated Total: R" +

configurationPrice.toLocaleString();

    window.location =

"mailto:info@nexpaksecurity.co.za?subject=Security Quote Request&body=" +

body;

}

/*=========================================================
 RESET CONFIGURATION
=========================================================*/

function resetConfiguration(){

    document

    .querySelectorAll(".config-select")

    .forEach(select=>{

        select.selectedIndex = 0;

        selectedOptions[select.dataset.option] =
        select.value;

    });

    currentQuantity = 1;

    const qty =
    document.getElementById("productQuantity");

    if(qty)
        qty.value = 1;

    calculatePrice();

    updateConfigurationSummary();

}

/*=========================================================
 FINAL INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(()=>{

        calculatePrice();

        loadRelatedProducts();

    },200);

});

/*=========================================================
 CONFIGURATOR READY
=========================================================*/

console.log(

"%cNEXPAK CONFIGURATOR V9 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
