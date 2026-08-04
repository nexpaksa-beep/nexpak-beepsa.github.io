// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// configurator.js
// PART 1/5
//
// ADVANCED PRODUCT CONFIGURATION ENGINE
// COMPATIBLE WITH shop-data.js V15
// =========================================================



document.addEventListener(
"DOMContentLoaded",
initializeConfigurator
);



// =========================================================
// GLOBAL VARIABLES
// =========================================================


let currentProduct = null;

let currentQuantity = 1;

let selectedOptions = {};

let selectedExtras = [];

let configurationPrice = 0;



// =========================================================
// INITIALIZE CONFIGURATOR
// =========================================================


function initializeConfigurator(){


const params =
new URLSearchParams(
window.location.search
);


const productId =
params.get("id");


if(!productId){

console.error(
"No product ID supplied."
);

return;

}



currentProduct =
getProductById(productId);



if(!currentProduct){

console.error(
"Product not found:",
productId
);

return;

}



configurationPrice =
currentProduct.basePrice || 0;



loadProductInformation();


createConfigurationSelectors();


createExtrasSelectors();


updateConfigurationSummary();


calculateConfigurationPrice();



console.log(
"%cNEXPAK CONFIGURATOR V15 INITIALIZED",
"color:#00B4FF;font-size:18px;font-weight:bold;"
);


}





// =========================================================
// GET PRODUCT FROM DATABASE
// =========================================================


function getProductById(id){


if(typeof products === "undefined"){

console.error(
"shop-data.js not loaded."
);

return null;

}


return products.find(
product =>
product.id === id
);


}





// =========================================================
// LOAD PRODUCT INFORMATION
// =========================================================


function loadProductInformation(){


const title =
document.querySelector(
".product-title"
);



const description =
document.querySelector(
".product-description"
);



const image =
document.querySelector(
".product-image"
);



const price =
document.querySelector(
".live-price"
);



if(title){

title.textContent =
currentProduct.name;

}



if(description){

description.textContent =
currentProduct.description;

}



if(image){

image.src =
currentProduct.image;

image.alt =
currentProduct.name;

}



if(price){

price.textContent =
formatCurrency(
currentProduct.basePrice || 0
);

}



}




// =========================================================
// PRODUCT IMAGE UPDATE
// =========================================================


function changeProductImage(image){


const productImage =
document.querySelector(
".product-image"
);



if(productImage){

productImage.src =
image;

}


}




// =========================================================
// GET CURRENT PRODUCT
// =========================================================


function getCurrentProduct(){


return currentProduct;


}




// =========================================================
// GET CURRENT CONFIGURATION
// =========================================================


function getCurrentConfiguration(){


return {


product:
currentProduct,


quantity:
currentQuantity,


options:
selectedOptions,


extras:
selectedExtras,


total:
configurationPrice


};


}




// =========================================================
// RESET CONFIGURATION
// =========================================================


function resetConfiguration(){


selectedOptions = {};

selectedExtras = [];

currentQuantity = 1;


configurationPrice =
currentProduct.basePrice || 0;


createConfigurationSelectors();


createExtrasSelectors();


updateConfigurationSummary();


calculateConfigurationPrice();


}





// =========================================================
// FORMAT CURRENCY
// =========================================================


function formatCurrency(value){


return "R" +

Number(value)

.toLocaleString(
"en-ZA",
{

minimumFractionDigits:2,

maximumFractionDigits:2

}

);


 }

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// configurator.js
// PART 2/5
//
// DYNAMIC OPTION SELECTORS + EXTRAS ENGINE
// =========================================================



// =========================================================
// CREATE PRODUCT OPTION SELECTORS
// =========================================================


function createConfigurationSelectors(){


const container =
document.querySelector(
".product-options"
);



if(!container || !currentProduct){

return;

}



container.innerHTML = "";

selectedOptions = {};



if(
!currentProduct.options
){

return;

}



Object.entries(
currentProduct.options
)

.forEach(
([optionName, optionValues])=>{


const group =
document.createElement(
"div"
);


group.className =
"option-group";



const label =
document.createElement(
"label"
);


label.textContent =
formatOptionName(
optionName
);



const select =
document.createElement(
"select"
);



select.className =
"config-select";


select.dataset.option =
optionName;



optionValues.forEach(
(value,index)=>{


const option =
document.createElement(
"option"
);



let optionNameValue =
value;



let optionPrice =
0;



/*
 Support future products
 with priced options
*/


if(
typeof value === "object"
){


optionNameValue =
value.name || "";


optionPrice =
value.price || 0;


}



option.value =
optionNameValue;



option.dataset.price =
optionPrice;



option.textContent =

optionPrice > 0

?

`${optionNameValue} (+${formatCurrency(optionPrice)})`

:

optionNameValue;



if(index === 0){


option.selected =
true;


selectedOptions[
optionName
] =
optionNameValue;


}



select.appendChild(
option
);



}



);



select.addEventListener(
"change",
optionChanged
);



group.appendChild(
label
);


group.appendChild(
select
);


container.appendChild(
group
);



}



);



}





// =========================================================
// OPTION CHANGED
// =========================================================


function optionChanged(event){


const select =
event.target;



selectedOptions[
select.dataset.option
]
=
select.value;



calculateConfigurationPrice();


updateConfigurationSummary();



saveConfiguration();



}





// =========================================================
// CREATE EXTRAS SELECTORS
// =========================================================


function createExtrasSelectors(){


const container =
document.querySelector(
".product-extras"
);



if(
!container ||
!currentProduct ||
!currentProduct.extras
){

return;

}



container.innerHTML = "";



const title =
document.createElement(
"h3"
);



title.textContent =
"Additional Options";



container.appendChild(
title
);



currentProduct.extras.forEach(
(extra,index)=>{


const wrapper =
document.createElement(
"div"
);



wrapper.className =
"extra-option";



const checkbox =
document.createElement(
"input"
);



checkbox.type =
"checkbox";


checkbox.dataset.index =
index;



const label =
document.createElement(
"label"
);



label.textContent =

`${extra.name} (+${formatCurrency(extra.price)})`;



checkbox.addEventListener(
"change",
extraChanged
);



wrapper.appendChild(
checkbox
);



wrapper.appendChild(
label
);



container.appendChild(
wrapper
);



}



);



}





// =========================================================
// EXTRA OPTION CHANGED
// =========================================================


function extraChanged(event){


const index =
event.target.dataset.index;



const extra =
currentProduct.extras[index];



if(
event.target.checked
){


selectedExtras.push(
extra
);



}
else{


selectedExtras =
selectedExtras.filter(
item =>
item.name !== extra.name
);


}



calculateConfigurationPrice();


updateConfigurationSummary();


saveConfiguration();



}





// =========================================================
// FORMAT OPTION NAME
// =========================================================


function formatOptionName(text){


return text

.replace(
/([A-Z])/g,
" $1"
)

.replace(
/^./,
letter =>
letter.toUpperCase()
);


}





// =========================================================
// GET SELECTED OPTION PRICE
// =========================================================


function getSelectedOptionPrice(select){


return Number(
select.options[
select.selectedIndex
]
.dataset.price || 0
);


}





// =========================================================
// RESET OPTION SELECTORS
// =========================================================


function resetSelectors(){


document

.querySelectorAll(
".config-select"
)

.forEach(
select=>{


select.selectedIndex =
0;



selectedOptions[
select.dataset.option
]
=
select.value;



}



);



document

.querySelectorAll(
".product-extras input"
)

.forEach(
checkbox=>{


checkbox.checked =
false;


});



selectedExtras = [];


calculateConfigurationPrice();


updateConfigurationSummary();



}

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// configurator.js
// PART 3/5
//
// ADVANCED PRICING ENGINE
// LIVE PRICE DISPLAY
// CONFIGURATION SUMMARY
// =========================================================



// =========================================================
// CALCULATE CONFIGURATION PRICE
// =========================================================


function calculateConfigurationPrice(){


if(!currentProduct){

return;

}



let total =
currentProduct.basePrice || 0;



// =====================================================
// OPTION PRICES
// =====================================================


document

.querySelectorAll(
".config-select"
)

.forEach(
select=>{


total +=
getSelectedOptionPrice(select);


}

);




// =====================================================
// EXTRA PRICES
// =====================================================


selectedExtras.forEach(
extra=>{


total +=
Number(
extra.price || 0
);


});




// =====================================================
// QUANTITY
// =====================================================


total *=
currentQuantity;



configurationPrice =
total;



updateLivePrice();


updatePriceBreakdown();


updateConfigurationSummary();



}





// =========================================================
// UPDATE LIVE PRICE
// =========================================================


function updateLivePrice(){


const priceBox =
document.querySelector(
".live-price"
);



if(!priceBox){

return;

}



priceBox.innerHTML =
formatCurrency(
configurationPrice
);



}





// =========================================================
// QUANTITY CONTROL
// =========================================================


function changeQuantity(change){


currentQuantity += change;



if(
currentQuantity < 1
){

currentQuantity = 1;

}



const quantityInput =
document.getElementById(
"productQuantity"
);



if(quantityInput){

quantityInput.value =
currentQuantity;

}



calculateConfigurationPrice();



}




// =========================================================
// MANUAL QUANTITY INPUT
// =========================================================


document.addEventListener(
"input",
function(event){



if(
event.target.id !==
"productQuantity"
){

return;

}



let quantity =
parseInt(
event.target.value
);



if(
isNaN(quantity)
||
quantity < 1
){

quantity = 1;

}



currentQuantity =
quantity;



event.target.value =
quantity;



calculateConfigurationPrice();



}

);





// =========================================================
// CONFIGURATION SUMMARY
// =========================================================


function updateConfigurationSummary(){


const summary =
document.querySelector(
".configuration-summary"
);



if(!summary){

return;

}



summary.innerHTML = "";




// SELECTED OPTIONS

Object.entries(
selectedOptions
)

.forEach(
([key,value])=>{


summary.innerHTML += `

<div class="summary-row">

<span>
${formatOptionName(key)}
</span>

<strong>
${value}
</strong>

</div>

`;


}

);





// SELECTED EXTRAS

selectedExtras.forEach(
extra=>{


summary.innerHTML += `

<div class="summary-row">

<span>
${extra.name}
</span>

<strong>
${formatCurrency(extra.price)}
</strong>

</div>

`;


}

);



}





// =========================================================
// PRICE BREAKDOWN
// =========================================================


function getPriceBreakdown(){


let breakdown = [];



// BASE PRODUCT

breakdown.push({

name:
"Base Product",

price:
currentProduct.basePrice || 0

});





// OPTIONS


document

.querySelectorAll(
".config-select"
)

.forEach(
select=>{


const selected =
select.options[
select.selectedIndex
];



breakdown.push({

name:
selected.value,

price:
Number(
selected.dataset.price || 0
)

});


}

);





// EXTRAS


selectedExtras.forEach(
extra=>{


breakdown.push({

name:
extra.name,

price:
extra.price || 0

});


}

);



return breakdown;



}





// =========================================================
// DISPLAY PRICE BREAKDOWN
// =========================================================


function updatePriceBreakdown(){


const container =
document.querySelector(
".price-breakdown"
);



if(!container){

return;

}



const breakdown =
getPriceBreakdown();



container.innerHTML = "";



breakdown.forEach(
item=>{


container.innerHTML += `

<div class="price-row">

<span>
${item.name}
</span>

<strong>
${formatCurrency(item.price)}
</strong>

</div>

`;


}

);



}





// =========================================================
// GET TOTAL PRICE
// =========================================================


function getConfigurationTotal(){


return configurationPrice;


}





console.log(
"%cNEXPAK CONFIGURATOR V15 PRICE ENGINE READY",
"color:#00B4FF;font-size:16px;font-weight:bold;"
);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// configurator.js
// PART 4/5
//
// VALIDATION
// SAVE / LOAD CONFIGURATION
// RELATED PRODUCTS
// PRODUCT GALLERY
// =========================================================



// =========================================================
// VALIDATE CONFIGURATION
// =========================================================


function validateConfiguration(){


if(!currentProduct){

return false;

}



let valid = true;



document

.querySelectorAll(
".config-select"
)

.forEach(
select=>{


if(
!select.value
){


valid = false;


select.classList.add(
"config-error"
);



}else{


select.classList.remove(
"config-error"
);


}



}

);





if(!valid){


alert(
"Please complete your product configuration."
);



}



return valid;



}





// =========================================================
// SAVE CONFIGURATION
// =========================================================


function saveConfiguration(){


if(!currentProduct){

return;

}



const configuration = {


productId:
currentProduct.id,


quantity:
currentQuantity,


options:
selectedOptions,


extras:
selectedExtras



};



localStorage.setItem(

"nexpak_configuration",

JSON.stringify(
configuration
)

);



}





// =========================================================
// LOAD SAVED CONFIGURATION
// =========================================================


function loadSavedConfiguration(){


const saved =
localStorage.getItem(
"nexpak_configuration"
);



if(!saved){

return;

}



const configuration =
JSON.parse(
saved
);



if(

!currentProduct

||

configuration.productId !== currentProduct.id

){

return;

}




currentQuantity =
configuration.quantity || 1;



selectedOptions =
configuration.options || {};



selectedExtras =
configuration.extras || [];





// RESTORE SELECT OPTIONS


document

.querySelectorAll(
".config-select"
)

.forEach(
select=>{


const savedValue =
selectedOptions[
select.dataset.option
];



if(!savedValue){

return;

}



Array.from(
select.options
)

.forEach(
option=>{


if(
option.value === savedValue
){

option.selected = true;

}


}

);



}

);





// RESTORE EXTRAS


document

.querySelectorAll(
".product-extras input"
)

.forEach(
checkbox=>{


const extra =
currentProduct.extras[
checkbox.dataset.index
];



if(
selectedExtras.some(
item =>
item.name === extra.name
)

){


checkbox.checked = true;


}



}

);





const quantity =
document.getElementById(
"productQuantity"
);



if(quantity){

quantity.value =
currentQuantity;

}



calculateConfigurationPrice();



}





// =========================================================
// CLEAR SAVED CONFIGURATION
// =========================================================


function clearSavedConfiguration(){


localStorage.removeItem(
"nexpak_configuration"
);



selectedOptions = {};

selectedExtras = [];



}




// =========================================================
// RELATED PRODUCTS
// =========================================================


function loadRelatedProducts(){


const container =
document.getElementById(
"related-products"
);



if(

!container

||

!currentProduct

){

return;

}



container.innerHTML = "";



products

.filter(
product =>

product.category ===
currentProduct.category

&&

product.id !==
currentProduct.id

)

.slice(
0,
4
)

.forEach(
product=>{


container.innerHTML += `

<div class="related-product-card">


<img 

src="${product.image}"

alt="${product.name}">


<h3>

${product.name}

</h3>


<p>

${product.description.substring(0,100)}...

</p>


<a href="product.html?id=${product.id}">

Configure

</a>


</div>

`;



}

);



}





// =========================================================
// IMAGE GALLERY
// =========================================================


function updateProductImage(image){


const imageElement =
document.querySelector(
".product-image"
);



if(imageElement){


imageElement.src =
image;


}



}





// =========================================================
// AUTO SAVE CHANGES
// =========================================================


document.addEventListener(

"change",

function(event){



if(

event.target.classList.contains(
"config-select"
)

||

event.target.closest(
".product-extras"
)

){


saveConfiguration();


}



}

);





// =========================================================
// INITIAL LOAD SAVED DATA
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(

()=>{


loadSavedConfiguration();


loadRelatedProducts();



},

300

);



});





console.log(
"%cNEXPAK CONFIGURATOR V15 STORAGE ENGINE READY",
"color:#00B4FF;font-size:16px;font-weight:bold;"
);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// configurator.js
// PART 5/5
//
// CART INTEGRATION
// WHATSAPP QUOTE
// EMAIL QUOTE
// PRINT
// FINAL INITIALIZATION
// =========================================================



// =========================================================
// ADD CONFIGURED PRODUCT TO CART
// =========================================================


function addConfiguredProduct(){


if(
!validateConfiguration()
){

return;

}



const cartItem = {


id:
currentProduct.id,


name:
currentProduct.name,


image:
currentProduct.image,


quantity:
currentQuantity,


price:
configurationPrice,


options:
{...selectedOptions},


extras:
[...selectedExtras]



};





if(
typeof addToCart === "function"
){



addToCart(
cartItem
);



saveConfiguration();



alert(

currentProduct.name +

" added to cart."

);



}

else{


console.error(

"cart.js not loaded."

);



}



}





// =========================================================
// CREATE WHATSAPP QUOTE
// =========================================================


function createWhatsAppQuote(){


if(
!currentProduct
){

return;

}



let message =


`*NEXPAK SECURITY SOLUTIONS*

Quotation Request

Product:
${currentProduct.name}

`;





Object.entries(
selectedOptions
)

.forEach(
([key,value])=>{


message +=

`${formatOptionName(key)}:
${value}

`;



}

);





if(
selectedExtras.length > 0
){


message +=

"Additional Options:

";



selectedExtras.forEach(
extra=>{


message +=

`${extra.name}

`;



}

);



}





message +=

`

Quantity:
${currentQuantity}


Estimated Total:
${formatCurrency(configurationPrice)}


Please send me a quotation.`;


window.open(

"https://wa.me/27836308249?text="

+

encodeURIComponent(message),

"_blank"

);



}





// =========================================================
// EMAIL QUOTE
// =========================================================


function emailConfiguration(){


if(
!currentProduct
){

return;

}



let body =


"Quotation Request\n\n"

+

"Product: "

+

currentProduct.name

+

"\n\n";





Object.entries(
selectedOptions
)

.forEach(
([key,value])=>{


body +=

formatOptionName(key)

+

": "

+

value

+

"\n";


}

);





if(
selectedExtras.length
){

body +=

"\nAdditional Options:\n";



selectedExtras.forEach(
extra=>{


body +=

extra.name

+

"\n";


}

);



}





body +=


`

Quantity:
${currentQuantity}


Estimated Total:
${formatCurrency(configurationPrice)}

`;





window.location =


"mailto:info@nexpaksecurity.co.za"

+

"?subject=Security Quote Request"

+

"&body="

+

encodeURIComponent(body);



}





// =========================================================
// PRINT CONFIGURATION
// =========================================================


function printConfiguration(){


window.print();


}





// =========================================================
// COPY CONFIGURATION
// =========================================================


function copyConfiguration(){


if(
!currentProduct
){

return;

}



let text =


currentProduct.name

+

"\n\n";





Object.entries(
selectedOptions
)

.forEach(
([key,value])=>{


text +=

formatOptionName(key)

+

": "

+

value

+

"\n";


}

);





if(
selectedExtras.length
){


text +=

"\nExtras:\n";



selectedExtras.forEach(
extra=>{


text +=

extra.name

+

"\n";


}

);



}



text +=

`

Quantity:
${currentQuantity}


Total:
${formatCurrency(configurationPrice)}

`;





navigator.clipboard.writeText(
text
);



alert(
"Configuration copied."
);



}





// =========================================================
// RESET ALL
// =========================================================


function resetAllConfiguration(){


selectedOptions = {};

selectedExtras = [];

currentQuantity = 1;


clearSavedConfiguration();


createConfigurationSelectors();


createExtrasSelectors();


calculateConfigurationPrice();


updateConfigurationSummary();


}





// =========================================================
// FINAL INITIALIZATION
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(

()=>{


calculateConfigurationPrice();


loadRelatedProducts();


},

500

);



});





console.log(

"%cNEXPAK SECURITY SOLUTIONS V15 CONFIGURATOR READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
