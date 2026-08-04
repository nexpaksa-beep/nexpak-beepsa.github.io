// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// cart.js
// PART 1/5
//
// ADVANCED SHOPPING CART ENGINE
// COMPATIBLE WITH configurator.js V15
// =========================================================



// =========================================================
// GLOBAL CART VARIABLES
// =========================================================


let cart = [];

const CART_STORAGE_KEY =
"nexpak_cart";




// =========================================================
// INITIALIZE CART
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCart();


updateCartCounter();


}

);





// =========================================================
// LOAD CART FROM STORAGE
// =========================================================


function loadCart(){


const savedCart =

localStorage.getItem(
CART_STORAGE_KEY
);



if(savedCart){


try{


cart =
JSON.parse(
savedCart
);



}

catch(error){


console.error(
"Cart loading error:",
error
);



cart = [];


}



}

else{


cart = [];


}



}





// =========================================================
// SAVE CART
// =========================================================


function saveCart(){


localStorage.setItem(

CART_STORAGE_KEY,

JSON.stringify(
cart
)

);



}





// =========================================================
// GET CURRENT CART
// =========================================================


function getCart(){


return cart;


}





// =========================================================
// ADD ITEM TO CART
// =========================================================


function addToCart(item){


if(
!item ||
!item.id
){

console.error(
"Invalid cart item."
);


return;

}





const existingItem =

cart.find(

product =>

product.id === item.id

&&

JSON.stringify(
product.options
)

===

JSON.stringify(
item.options
)

);



if(existingItem){


existingItem.quantity +=

item.quantity || 1;



}

else{


cart.push({

id:
item.id,


name:
item.name,


image:
item.image,


quantity:
item.quantity || 1,


price:
item.price || 0,


options:
item.options || {},


extras:
item.extras || []



});



}





saveCart();


updateCartCounter();


}





// =========================================================
// CART ITEM COUNT
// =========================================================


function updateCartCounter(){


const counters =

document.querySelectorAll(

".cart-count"

);



const total =

cart.reduce(

(sum,item)=>

sum + item.quantity,

0

);



counters.forEach(

counter=>{


counter.textContent =
total;


}

);



}





// =========================================================
// CLEAR CART
// =========================================================


function clearCart(){


cart = [];


saveCart();


updateCartCounter();


}





console.log(

"%cNEXPAK CART V15 PART 1 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// cart.js
// PART 2/5
//
// CART DISPLAY ENGINE
// RENDER ITEMS
// QUANTITY CONTROLS
// TOTAL CALCULATION
// =========================================================




// =========================================================
// DISPLAY CART
// =========================================================


function displayCart(){


const container =

document.querySelector(
".cart-items"
);



if(!container){

return;

}



container.innerHTML = "";





if(cart.length === 0){


container.innerHTML = `

<div class="empty-cart">

<h3>
Your cart is empty
</h3>

<p>
Browse our security solutions and add products.
</p>

</div>

`;



updateCartTotals();


return;


}





cart.forEach(

(item,index)=>{


const itemTotal =

item.price *

item.quantity;



container.innerHTML += `


<div class="cart-item">


<div class="cart-image">

<img

src="${item.image}"

alt="${item.name}">

</div>



<div class="cart-details">


<h3>

${item.name}

</h3>



<div class="cart-options">

${renderCartOptions(item)}

</div>



<div class="cart-price">

${formatCurrency(item.price)}

</div>



<div class="quantity-control">


<button onclick="changeCartQuantity(${index},-1)">

−

</button>



<input

type="number"

value="${item.quantity}"

onchange="updateCartQuantity(${index},this.value)">


<button onclick="changeCartQuantity(${index},1)">

+

</button>


</div>



<div class="item-total">

Total:

<strong>

${formatCurrency(itemTotal)}

</strong>

</div>



<button

class="remove-cart-item"

onclick="removeCartItem(${index})">

Remove

</button>



</div>


</div>


`;



}



);




updateCartTotals();



}




// =========================================================
// RENDER OPTIONS
// =========================================================


function renderCartOptions(item){


let html = "";




if(item.options){


Object.entries(

item.options

)

.forEach(

([key,value])=>{


html += `

<div>

<strong>
${formatOptionName(key)}
:
</strong>

${value}

</div>

`;



}



);



}





if(

item.extras

&&

item.extras.length

){


html += `

<div>

<strong>
Extras:
</strong>

</div>

`;



item.extras.forEach(

extra=>{


html += `

<div>

${extra.name}

(+${formatCurrency(extra.price)})

</div>

`;



}



);



}



return html;



}





// =========================================================
// CHANGE CART QUANTITY
// =========================================================


function changeCartQuantity(index,change){


if(!cart[index]){

return;

}



cart[index].quantity += change;



if(cart[index].quantity < 1){


cart[index].quantity = 1;


}



saveCart();


displayCart();


updateCartCounter();



}





// =========================================================
// UPDATE MANUAL QUANTITY
// =========================================================


function updateCartQuantity(index,value){


let quantity =
parseInt(value);



if(

isNaN(quantity)

||

quantity < 1

){

quantity = 1;

}



if(cart[index]){


cart[index].quantity =
quantity;



}



saveCart();


displayCart();


updateCartCounter();



}





// =========================================================
// REMOVE ITEM
// =========================================================


function removeCartItem(index){


cart.splice(
index,
1
);



saveCart();


displayCart();


updateCartCounter();



}





// =========================================================
// CALCULATE TOTALS
// =========================================================


function getCartSubtotal(){


return cart.reduce(

(total,item)=>{


return total +

(
item.price *

item.quantity

);



},

0

);



}




function updateCartTotals(){


const subtotal =
getCartSubtotal();



const subtotalBox =

document.querySelector(
".cart-subtotal"
);



const totalBox =

document.querySelector(
".cart-total"
);



if(subtotalBox){

subtotalBox.textContent =

formatCurrency(
subtotal
);


}



if(totalBox){

totalBox.textContent =

formatCurrency(
subtotal
);


}



}





// =========================================================
// FORMAT OPTION NAME FALLBACK
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
// FORMAT CURRENCY FALLBACK
// =========================================================


function formatCurrency(value){


return "R" +

Number(value || 0)

.toLocaleString(
"en-ZA",
{

minimumFractionDigits:2,

maximumFractionDigits:2

}

);


}





// =========================================================
// AUTO DISPLAY CART PAGE
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


displayCart();


});





console.log(

"%cNEXPAK CART V15 PART 2 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// cart.js
// PART 3/5
//
// CHECKOUT ENGINE
// CART SUMMARY
// WHATSAPP CART QUOTE
// EMAIL CART QUOTE
// =========================================================



// =========================================================
// CART TOTAL ITEMS
// =========================================================


function getCartItemCount(){


return cart.reduce(

(total,item)=>

total + item.quantity,

0

);


}





// =========================================================
// CART SUBTOTAL
// =========================================================


function calculateCartTotal(){


let total = 0;



cart.forEach(

item=>{


total +=

(item.price * item.quantity);



}

);



return total;



}





// =========================================================
// DISPLAY CART SUMMARY
// =========================================================


function displayCartSummary(){


const summaryBox =

document.querySelector(
".cart-summary"
);



if(!summaryBox){

return;

}



summaryBox.innerHTML = "";





cart.forEach(

item=>{


summaryBox.innerHTML += `


<div class="summary-item">


<span>

${item.name}

</span>



<strong>

${formatCurrency(
item.price * item.quantity
)}

</strong>


</div>


`;



}

);





summaryBox.innerHTML += `


<div class="summary-total">


<strong>

Total

</strong>


<strong>

${formatCurrency(
calculateCartTotal()
)}

</strong>


</div>


`;



}





// =========================================================
// CREATE CART MESSAGE
// =========================================================


function createCartMessage(){


let message =


`*NEXPAK SECURITY SOLUTIONS*

Quotation Request

`;





cart.forEach(

(item,index)=>{


message +=


`
${index + 1}.
${item.name}

Quantity:
${item.quantity}

Price:
${formatCurrency(
item.price
)}

`;





if(
item.options
){


message +=

"Configuration:\n";



Object.entries(
item.options
)

.forEach(

([key,value])=>{


message +=

`${formatOptionName(key)}:
${value}

`;



}

);



}





if(

item.extras

&&

item.extras.length > 0

){


message +=

"Extras:\n";



item.extras.forEach(

extra=>{


message +=

`${extra.name}

`;



}

);



}



message += "\n";



}

);





message +=


`
Total:

${formatCurrency(
calculateCartTotal()
)}

Please send me a quotation.

`;



return message;



}





// =========================================================
// WHATSAPP CART QUOTE
// =========================================================


function sendWhatsAppQuote(){


if(
cart.length === 0
){


alert(
"Your cart is empty."
);



return;


}



const message =

createCartMessage();



window.open(

"https://wa.me/27836308249?text="

+

encodeURIComponent(message),

"_blank"

);



}





// =========================================================
// EMAIL CART QUOTE
// =========================================================


function sendEmailQuote(){


if(
cart.length === 0
){

alert(
"Your cart is empty."
);



return;


}



const subject =

"Nexpak Security Solutions Quote Request";



const body =

createCartMessage();



window.location =


"mailto:info@nexpaksecurity.co.za"

+

"?subject="

+

encodeURIComponent(subject)

+

"&body="

+

encodeURIComponent(body);



}





// =========================================================
// UPDATE CART DISPLAY
// =========================================================


function refreshCart(){


saveCart();


displayCart();


displayCartSummary();


updateCartCounter();



}





console.log(

"%cNEXPAK CART V15 PART 3 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// cart.js
// PART 4/5
//
// CART VALIDATION
// CUSTOMER INFORMATION
// QUOTE PREPARATION
// ORDER SUMMARY
// =========================================================



// =========================================================
// VALIDATE CART
// =========================================================


function validateCart(){


if(
cart.length === 0
){


alert(
"Your cart is empty."
);



return false;


}



let valid = true;



cart.forEach(

item=>{


if(
!item.id ||
!item.name
){


valid = false;


}



}

);



if(!valid){


alert(
"Some cart items are invalid."
);



}



return valid;



}





// =========================================================
// BUILD ORDER SUMMARY
// =========================================================


function buildOrderSummary(){


let summary =

"NEXPAK SECURITY SOLUTIONS\n\n";


summary +=

"Product Quote Request\n\n";





cart.forEach(

(item,index)=>{


summary +=

`${index + 1}. ${item.name}\n`;



summary +=

`Quantity:
${item.quantity}\n`;



summary +=

`Price:
${formatCurrency(item.price)}\n`;





if(
item.options
){


summary +=

"Configuration:\n";



Object.entries(
item.options
)

.forEach(

([key,value])=>{


summary +=

`${formatOptionName(key)}:
${value}\n`;



}

);



}




if(

item.extras

&&

item.extras.length

){


summary +=

"Extras:\n";



item.extras.forEach(

extra=>{


summary +=

`${extra.name}\n`;



}

);



}



summary +=

"\n";



}

);





summary +=

"TOTAL:\n"

+

formatCurrency(
getCartSubtotal()
);



return summary;



}





// =========================================================
// CUSTOMER DETAILS STORAGE
// =========================================================


function saveCustomerDetails(){


const customer = {


name:

document.getElementById(
"customerName"
)?.value || "",



email:

document.getElementById(
"customerEmail"
)?.value || "",



phone:

document.getElementById(
"customerPhone"
)?.value || "",



company:

document.getElementById(
"customerCompany"
)?.value || "",



address:

document.getElementById(
"customerAddress"
)?.value || ""



};



localStorage.setItem(

"nexpak_customer",

JSON.stringify(
customer
)

);



}





// =========================================================
// LOAD CUSTOMER DETAILS
// =========================================================


function loadCustomerDetails(){


const saved =

localStorage.getItem(
"nexpak_customer"
);



if(!saved){

return;

}



const customer =

JSON.parse(
saved
);



Object.entries(
customer
)

.forEach(

([key,value])=>{


const field =

document.getElementById(
"customer" +

key.charAt(0).toUpperCase()

+

key.slice(1)

);



if(field){

field.value =
value;

}



}

);



}





// =========================================================
// CREATE QUOTE DATA OBJECT
// =========================================================


function createQuoteData(){


return {


company:

"Nexpak Security Solutions",



date:

new Date()
.toLocaleDateString(
"en-ZA"
),



items:

cart,



subtotal:

getCartSubtotal(),



customer:

JSON.parse(

localStorage.getItem(
"nexpak_customer"
)

)

|| {}



};



}





// =========================================================
// PREPARE QUOTE
// =========================================================


function prepareQuote(){


if(
!validateCart()
){

return null;

}



saveCustomerDetails();



const quote =

createQuoteData();



localStorage.setItem(

"nexpak_quote",

JSON.stringify(
quote
)

);



return quote;



}





// =========================================================
// LOAD QUOTE DATA
// =========================================================


function loadQuoteData(){


const quote =

localStorage.getItem(
"nexpak_quote"
);



if(!quote){

return null;

}



return JSON.parse(
quote
);



}





// =========================================================
// CLEAR QUOTE
// =========================================================


function clearQuote(){


localStorage.removeItem(
"nexpak_quote"
);



}





console.log(

"%cNEXPAK CART V15 PART 4 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// cart.js
// PART 5/5
//
// CHECKOUT
// WHATSAPP QUOTE
// EMAIL QUOTE
// PDF QUOTE HANDOFF
// FINAL INITIALIZATION
// =========================================================




// =========================================================
// SEND CART VIA WHATSAPP
// =========================================================


function sendCartWhatsApp(){


if(
!validateCart()
){

return;

}



let message =

buildOrderSummary();



window.open(

"https://wa.me/27836308249?text="

+

encodeURIComponent(message),

"_blank"

);



}





// =========================================================
// SEND CART VIA EMAIL
// =========================================================


function sendCartEmail(){


if(
!validateCart()
){

return;

}



const subject =

"Security Quote Request - Nexpak Security Solutions";



const body =

buildOrderSummary();



window.location =


"mailto:info@nexpaksecurity.co.za"

+

"?subject="

+

encodeURIComponent(subject)

+

"&body="

+

encodeURIComponent(body);



}





// =========================================================
// PROCEED TO QUOTE PAGE
// =========================================================


function proceedToQuote(){


const quote =

prepareQuote();



if(!quote){

return;

}



window.location =

"quote.html";



}





// =========================================================
// GENERATE QUOTE ID
// =========================================================


function generateQuoteNumber(){


const date =

new Date();



const year =

date.getFullYear();



const month =

String(
date.getMonth()+1
)

.padStart(
2,
"0"
);



const day =

String(
date.getDate()
)

.padStart(
2,
"0"
);



const random =

Math.floor(
1000 +
Math.random()*9000
);



return (

"NEX-"

+

year

+

month

+

day

+

"-"

+

random

);



}





// =========================================================
// SAVE FINAL QUOTE
// =========================================================


function saveFinalQuote(){


const quote =

prepareQuote();



if(!quote){

return;

}



quote.quoteNumber =

generateQuoteNumber();



localStorage.setItem(

"nexpak_final_quote",

JSON.stringify(
quote
)

);



return quote;



}





// =========================================================
// CHECKOUT BUTTON HANDLER
// =========================================================


function checkout(){


const quote =

saveFinalQuote();



if(!quote){

return;

}



alert(

"Quote prepared successfully."

);



window.location =

"quote.html";



}





// =========================================================
// CART INITIALIZATION
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCart();


displayCart();


updateCartCounter();


loadCustomerDetails();



});





// =========================================================
// EXPOSE CART DATA
// =========================================================


function getCartTotal(){


return getCartSubtotal();


}





function getCartQuantity(){


return cart.reduce(

(total,item)=>

total + item.quantity,

0

);


}





// =========================================================
// FINAL MESSAGE
// =========================================================


console.log(

"%cNEXPAK SECURITY SOLUTIONS V15 CART ENGINE READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
