/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 configurator.js

 PART 1/5

 PRODUCT CONFIGURATION ENGINE

=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadConfigurator();


});





/*=========================================================
 GLOBAL VARIABLES
=========================================================*/


let currentProduct = null;

let selectedOptions = {};

let basePrice = 0;

let currentQuantity = 1;









/*=========================================================
 LOAD PRODUCT FROM URL
=========================================================*/


function loadConfigurator(){


    const params = new URLSearchParams(
        window.location.search
    );


    const productID = params.get("id");



    if(!productID){

        console.log(
        "No product selected"
        );

        return;

    }





    currentProduct = getProductById(productID);





    if(!currentProduct){


        console.log(
        "Product not found"
        );


        return;


    }






    basePrice = currentProduct.price;





    displayProduct();



    createSelectors();



    updatePrice();



}









/*=========================================================
 DISPLAY PRODUCT INFORMATION
=========================================================*/


function displayProduct(){



document.querySelector(".product-title")
.innerHTML =
currentProduct.name;





document.querySelector(".product-description")
.innerHTML =
currentProduct.description;






document.querySelector(".product-image")
.src =
currentProduct.image;





const featureBox =
document.querySelector(".product-features");





if(featureBox){


featureBox.innerHTML="";



currentProduct.features.forEach(feature=>{


featureBox.innerHTML += `

<li>

<i class="fas fa-check"></i>

${feature}

</li>


`;


});


}







}
 /*=========================================================
 CREATE PRODUCT SELECTORS

 Generates dropdown menus from products.js

 Examples:
 - CCTV 8/16/32 Channel
 - IP CCTV Channels
 - PSU Options
 - Cable Options
 - Gate Motor Options
 - Electric Fence Options
 - Roboguard Options

=========================================================*/


function createSelectors(){



const container = document.querySelector(
".product-options"
);



if(!container) return;




container.innerHTML="";



selectedOptions = {};





if(!currentProduct.options){

    return;

}






Object.keys(currentProduct.options)
.forEach(optionKey=>{





const optionGroup =
currentProduct.options[optionKey];






let html = `

<div class="option-group">


<label>

${formatOptionName(optionKey)}

</label>



<select 

class="config-select"

data-option="${optionKey}"

onchange="optionChanged(this)">


`;






optionGroup.forEach((option,index)=>{





html += `

<option

value="${option.name}"

data-price="${option.price}"

${index === 0 ? "selected":""}

>


${option.name}

`;



if(option.price > 0){

html += `

 (+R${option.price})

`;

}


html += `

</option>


`;





});





html += `


</select>


</div>


`;





container.innerHTML += html;




});







// Store default selections


document.querySelectorAll(
".config-select"
)
.forEach(select=>{


const selected =
select.options[
select.selectedIndex
];



selectedOptions[
select.dataset.option
]
=
selected.value;



});



}









/*=========================================================
 FORMAT OPTION NAMES
=========================================================*/


function formatOptionName(text){



return text

.replace(/([A-Z])/g," $1")

.replace(/^./,
letter=>letter.toUpperCase());



}








/*=========================================================
 OPTION CHANGE EVENT
=========================================================*/


function optionChanged(select){



const optionName =
select.dataset.option;



const selected =
select.options[
select.selectedIndex
];





selectedOptions[optionName]
=
selected.value;





updatePrice();



}
/*=========================================================
 PRICE CALCULATOR

 Calculates:

 Base Product Price
+
Selected Options
+
Quantity

=========================================================*/


function updatePrice(){



if(!currentProduct) return;



let total =
currentProduct.price;






document.querySelectorAll(
".config-select"
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



total += extra;



});





total =
total * currentQuantity;







const priceBox =
document.querySelector(
".live-price"
);



if(priceBox){


priceBox.innerHTML =

"R" +
total.toLocaleString(
"en-ZA",
{
minimumFractionDigits:2
}
);



}



}









/*=========================================================
 QUANTITY CONTROLS

 Plus / Minus Buttons

=========================================================*/


function changeQuantity(amount){



currentQuantity += amount;





if(currentQuantity < 1){

currentQuantity = 1;

}





const input =
document.getElementById(
"productQuantity"
);





if(input){

input.value =
currentQuantity;

}





updatePrice();



}








/*=========================================================
 MANUAL QUANTITY INPUT

=========================================================*/


document.addEventListener(
"input",
function(e){



if(
e.target.id === "productQuantity"
){



currentQuantity =
parseInt(
e.target.value
);



if(
isNaN(currentQuantity)
||
currentQuantity < 1
){

currentQuantity = 1;

e.target.value = 1;

}



updatePrice();



}


});









/*=========================================================
 BUILD CART ITEM

 Creates configured product

=========================================================*/


function buildConfiguredItem(){



let finalPrice =
currentProduct.price;





let options = {};






document.querySelectorAll(
".config-select"
)

.forEach(select=>{



const selected =
select.options[
select.selectedIndex
];



const optionPrice =
Number(
selected.dataset.price
);




finalPrice += optionPrice;





options[
select.dataset.option
]
=
selected.value;



});








return {



id:
currentProduct.id,



name:
currentProduct.name,



image:
currentProduct.image,



price:
finalPrice,



quantity:
currentQuantity,



options:
options



};



}
 /*=========================================================
 ADD CONFIGURED PRODUCT TO CART

 Sends finished configuration
 to cart.js

=========================================================*/


function addConfiguredProduct(){



if(!currentProduct){

alert(
"Please select a product"
);

return;

}






const item =
buildConfiguredItem();






if(typeof addToCart === "function"){


addToCart(item);



alert(

currentProduct.name +

" added to cart"

);



}else{


console.log(
"cart.js not loaded"
);


}



}









/*=========================================================
 LOAD RELATED PRODUCTS

 Shows products in same category

=========================================================*/


function loadRelatedProducts(){



const container =
document.getElementById(
"related-products"
);





if(!container ||
!currentProduct){

return;

}





container.innerHTML="";





products

.filter(product=>

product.category === currentProduct.category

&&

product.id !== currentProduct.id

)

.slice(0,4)

.forEach(product=>{





container.innerHTML += `


<div class="service-card fade">



<img src="${product.image}"

alt="${product.name}">





<h3>

${product.name}

</h3>





<p>

${product.description.substring(0,100)}
...

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
 WHATSAPP QUOTE BUILDER

 Creates customer enquiry

=========================================================*/


function createWhatsAppQuote(){



if(!currentProduct)
return;






let message =

"Hi Nexpak Security Solutions,%0A%0A"

+

"I would like a quote for:%0A"

+

currentProduct.name

+

"%0A%0A";






document.querySelectorAll(
".config-select"
)

.forEach(select=>{


const selected =
select.options[
select.selectedIndex
];



message +=

select.dataset.option

+
": "

+
selected.value

+

"%0A";



});





message +=

"%0AQuantity: "

+

currentQuantity;







window.open(

"https://wa.me/27836308249?text="

+

message,

"_blank"

);



}









/*=========================================================
 START RELATED PRODUCTS

=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


setTimeout(()=>{


loadRelatedProducts();



},300);



});
/*=========================================================
 CONFIGURATION SUMMARY

 Displays selected options
 before adding to cart

=========================================================*/


function showConfigurationSummary(){


const summary =
document.querySelector(
".configuration-summary"
);



if(!summary) return;




summary.innerHTML="";



Object.keys(selectedOptions)

.forEach(option=>{



summary.innerHTML += `

<p>

<strong>

${formatOptionName(option)}

:

</strong>

${selectedOptions[option]}

</p>

`;



});



}








/*=========================================================
 VALIDATE CONFIGURATION

 Prevents incomplete orders

=========================================================*/


function validateConfiguration(){



if(!currentProduct){

return false;

}





const selectors =
document.querySelectorAll(
".config-select"
);





if(
selectors.length === 0
){

return true;

}





let valid = true;





selectors.forEach(select=>{


if(!select.value){


valid=false;


}



});






if(!valid){


alert(
"Please select all product options before adding to cart."
);


}



return valid;



}









/*=========================================================
 OVERRIDE ADD CART VALIDATION

=========================================================*/


const originalAddConfiguredProduct =
window.addConfiguredProduct;






window.addConfiguredProduct =
function(){



if(
!validateConfiguration()
){

return;

}





showConfigurationSummary();




const item =
buildConfiguredItem();





if(typeof addToCart === "function"){



addToCart(item);




alert(

"Product configuration added to cart"

);



}



};









/*=========================================================
 SAVE CONFIGURATION

 Saves customer selections

=========================================================*/


function saveConfiguration(){



const saved = {


product:
currentProduct.id,


options:
selectedOptions,


quantity:
currentQuantity



};




localStorage.setItem(

"nexpak_configuration",

JSON.stringify(saved)

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





if(!saved)
return;





console.log(

"Saved configuration loaded",

JSON.parse(saved)

);



}









/*=========================================================
 FINAL INITIALIZATION

=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


setTimeout(()=>{


loadSavedConfiguration();


updatePrice();


},500);



});








/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 CONFIGURATOR READY

 CCTV
 IP CCTV
 ELECTRIC FENCE
 GATE AUTOMATION
 ROBOGUARD
 ALARM
 ACCESS CONTROL

=========================================================*/


console.log(

"%cNEXPAK CONFIGURATOR V8 ACTIVE",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
