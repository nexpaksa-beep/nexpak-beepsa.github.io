/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 cart.js

 PART 1/5

 SHOPPING CART ENGINE

=========================================================*/


let cart = [];





/*=========================================================
 LOAD CART FROM STORAGE

=========================================================*/


function loadCart(){


const savedCart =

localStorage.getItem(
"nexpak_cart"
);





if(savedCart){


cart = JSON.parse(
savedCart
);



}else{


cart = [];


}



}








/*=========================================================
 SAVE CART

=========================================================*/


function saveCart(){



localStorage.setItem(

"nexpak_cart",

JSON.stringify(cart)

);



}








/*=========================================================
 ADD PRODUCT TO CART

 Supports:

- Standard products
- Configured systems
- Multiple quantities
- Options

=========================================================*/


function addToCart(item){



if(!item){

return;

}






const existing =

cart.find(product =>

product.id === item.id

&&

JSON.stringify(product.options)

===

JSON.stringify(item.options)

);






if(existing){



existing.quantity +=

item.quantity;



}else{



cart.push(item);



}






saveCart();




updateCartCount();



}








/*=========================================================
 REMOVE PRODUCT

=========================================================*/


function removeFromCart(index){



cart.splice(

index,

1

);



saveCart();



renderCart();



updateCartCount();



}








/*=========================================================
 CLEAR CART

=========================================================*/


function clearCart(){



cart = [];



saveCart();



renderCart();



updateCartCount();



}








/*=========================================================
 CART ITEM COUNT

=========================================================*/


function updateCartCount(){



const counter =

document.querySelector(
".cart-count"
);





if(!counter)
return;





let total = 0;




cart.forEach(item=>{


total += item.quantity;



});






counter.innerHTML = total;



}








/*=========================================================
 INITIAL LOAD

=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCart();


updateCartCount();


});
/*=========================================================
 RENDER CART

 Displays:

- Product image
- Product name
- Selected options
- Quantity
- Price
- Remove button

=========================================================*/


function renderCart(){



const container =

document.querySelector(
".cart-items"
);





if(!container)
return;





container.innerHTML = "";







if(cart.length === 0){



container.innerHTML = `


<div class="empty-cart">


<i class="fas fa-cart-shopping"></i>


<h3>

Your cart is empty

</h3>


<a href="shop.html">

Continue Shopping

</a>


</div>


`;



updateCartTotal();


return;



}








cart.forEach((item,index)=>{





let optionsHTML = "";





if(item.options){



Object.keys(item.options)

.forEach(option=>{



optionsHTML += `


<li>

<strong>

${formatCartOption(option)}

:

</strong>


${item.options[option]}


</li>


`;



});



}









container.innerHTML += `


<div class="cart-item">





<div class="cart-image">


<img src="${item.image}"

alt="${item.name}">


</div>








<div class="cart-details">



<h3>

${item.name}

</h3>




<ul class="cart-options">


${optionsHTML}


</ul>





<div class="cart-price">


R${

calculateItemTotal(item)

.toLocaleString(
"en-ZA"
)

}


</div>






<div class="cart-controls">





<button onclick="changeCartQuantity(${index},-1)">


<i class="fas fa-minus"></i>


</button>





<input type="number"

value="${item.quantity}"

min="1"

onchange="setCartQuantity(${index},this.value)">





<button onclick="changeCartQuantity(${index},1)">


<i class="fas fa-plus"></i>


</button>




<button class="remove-btn"

onclick="removeFromCart(${index})">


<i class="fas fa-trash"></i>


</button>




</div>





</div>


</div>


`;



});






updateCartTotal();



}









/*=========================================================
 CALCULATE ITEM TOTAL

=========================================================*/


function calculateItemTotal(item){



return item.price *

item.quantity;



}








/*=========================================================
 CART TOTAL

=========================================================*/


function updateCartTotal(){



const totalBox =

document.querySelector(
".cart-total"
);





if(!totalBox)
return;





let total = 0;





cart.forEach(item=>{


total += calculateItemTotal(item);



});






totalBox.innerHTML =

"R" +

total.toLocaleString(
"en-ZA"
);



}








/*=========================================================
 FORMAT OPTION LABELS

=========================================================*/


function formatCartOption(text){



return text

.replace(/([A-Z])/g," $1")

.replace(/^./,

letter => letter.toUpperCase());



 }
/*=========================================================
 UPDATE CART QUANTITY

=========================================================*/


function changeCartQuantity(index,amount){



cart[index].quantity += amount;





if(cart[index].quantity < 1){


cart[index].quantity = 1;


}





saveCart();



renderCart();



updateCartCount();



}








/*=========================================================
 SET CART QUANTITY MANUALLY

=========================================================*/


function setCartQuantity(index,value){



let qty =
parseInt(value);





if(isNaN(qty) || qty < 1){


qty = 1;


}





cart[index].quantity = qty;




saveCart();



renderCart();



updateCartCount();



}









/*=========================================================
 CART SUMMARY BUILDER

 Creates customer order summary

=========================================================*/


function generateCartSummary(){



let summary =

"NEXPAK SECURITY SOLUTIONS QUOTE%0A%0A";






let total = 0;







cart.forEach((item,index)=>{



summary +=


(index + 1)

+

". "

+

item.name

+

"%0A";







if(item.options){



Object.keys(item.options)

.forEach(option=>{


summary +=

"- "

+

formatCartOption(option)

+

": "

+

item.options[option]

+

"%0A";



});


}







summary +=


"Quantity: "

+

item.quantity

+

"%0A";





summary +=


"Price: R"

+

calculateItemTotal(item)

+

"%0A%0A";






total += calculateItemTotal(item);



});






summary +=


"TOTAL: R"

+

total;





return summary;



}









/*=========================================================
 WHATSAPP CHECKOUT

=========================================================*/


function checkoutWhatsApp(){



if(cart.length === 0){


alert(

"Your cart is empty"

);



return;


}





const message =

generateCartSummary();






window.open(


"https://wa.me/27836308249?text="

+

message,


"_blank"


);



}









/*=========================================================
 EMAIL QUOTE

=========================================================*/


function checkoutEmail(){



const body =

decodeURIComponent(

generateCartSummary()

);






window.location.href =


"mailto:info@nexpaksecurity.co.za"

+

"?subject=Nexpak Security Quote"

+

"&body="

+

encodeURIComponent(body);



}









/*=========================================================
 REFRESH CART PAGE

=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


renderCart();


});
/*=========================================================
 CUSTOMER DETAILS

 Collects customer information
 before sending quote

=========================================================*/


let customerDetails = {

name:"",
company:"",
phone:"",
email:"",
address:""

};








function saveCustomerDetails(){



customerDetails.name =

document.getElementById(
"customer-name"
)?.value || "";



customerDetails.company =

document.getElementById(
"customer-company"
)?.value || "";



customerDetails.phone =

document.getElementById(
"customer-phone"
)?.value || "";



customerDetails.email =

document.getElementById(
"customer-email"
)?.value || "";



customerDetails.address =

document.getElementById(
"customer-address"
)?.value || "";






localStorage.setItem(

"nexpak_customer",

JSON.stringify(
customerDetails
)

);



}









/*=========================================================
 LOAD CUSTOMER DETAILS

=========================================================*/


function loadCustomerDetails(){



const saved =

localStorage.getItem(
"nexpak_customer"
);





if(saved){


customerDetails =

JSON.parse(saved);



}



}








/*=========================================================
 VALIDATE ORDER

=========================================================*/


function validateOrder(){



if(cart.length === 0){



alert(

"Your cart is empty"

);



return false;



}





if(!customerDetails.name){



alert(

"Please enter your name"

);



return false;



}





if(!customerDetails.phone){



alert(

"Please enter your phone number"

);



return false;



}





return true;



}









/*=========================================================
 COMPLETE QUOTE MESSAGE

 Includes:

Customer details

Products

Configurations

Total

=========================================================*/


function generateFullQuote(){



let message =



"NEXPAK SECURITY SOLUTIONS"

+

"%0A--------------------%0A%0A";







message +=


"Customer: "

+

customerDetails.name

+

"%0A";





message +=


"Company: "

+

customerDetails.company

+

"%0A";





message +=


"Phone: "

+

customerDetails.phone

+

"%0A";





message +=


"Email: "

+

customerDetails.email

+

"%0A%0A";







message +=


"PRODUCTS:%0A%0A";







let total = 0;





cart.forEach(item=>{



message +=


item.name

+

"%0A";





if(item.options){



Object.keys(item.options)

.forEach(option=>{



message +=


"- "

+

formatCartOption(option)

+

": "

+

item.options[option]

+

"%0A";



});


}







message +=


"Qty: "

+

item.quantity

+

"%0A";





message +=


"Subtotal: R"

+

calculateItemTotal(item)

+

"%0A%0A";





total += calculateItemTotal(item);



});






message +=


"TOTAL: R"

+

total;






return message;



}









/*=========================================================
 FINAL WHATSAPP QUOTE

=========================================================*/


function sendQuote(){



saveCustomerDetails();





if(!validateOrder()){


return;


}







const quote =

generateFullQuote();






window.open(


"https://wa.me/27836308249?text="

+

quote,


"_blank"


);



}








/*=========================================================
 INITIALIZE CUSTOMER DATA

=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCustomerDetails();


});
/*=========================================================
 ORDER NUMBER GENERATOR

 Creates unique enquiry reference

=========================================================*/


function generateOrderNumber(){



const date =

new Date();




const year =
date.getFullYear();



const month =

String(
date.getMonth()+1
)
.padStart(2,"0");




const day =

String(
date.getDate()
)
.padStart(2,"0");




const random =

Math.floor(
Math.random()*9000
+1000
);





return (

"NP"

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









/*=========================================================
 CREATE ORDER OBJECT

 Ready for:

- CRM
- Email
- Database
- Invoice System

=========================================================*/


function createOrder(){



let total = 0;





cart.forEach(item=>{


total += calculateItemTotal(item);



});






return {



orderNumber:
generateOrderNumber(),



date:
new Date()
.toISOString(),



customer:
customerDetails,



items:
cart,



total:
total



};



}









/*=========================================================
 SAVE ORDER LOCALLY

 Future CRM integration

=========================================================*/


function saveOrder(){



const order =

createOrder();





let orders =

JSON.parse(

localStorage.getItem(
"nexpak_orders"
)

|| "[]"

);





orders.push(order);






localStorage.setItem(

"nexpak_orders",

JSON.stringify(
orders
)

);



return order;



}









/*=========================================================
 COMPLETE CHECKOUT

=========================================================*/


function completeCheckout(){



saveCustomerDetails();





if(!validateOrder()){

return;

}






const order =

saveOrder();





console.log(

"Nexpak Order Created",

order

);






sendQuote();








}









/*=========================================================
 CART BUTTON ANIMATION

=========================================================*/


function animateCart(){



const cartIcon =

document.querySelector(
".cart-icon"
);





if(!cartIcon)
return;





cartIcon.classList.add(
"cart-pulse"
);






setTimeout(()=>{


cartIcon.classList.remove(
"cart-pulse"
);



},800);



}








/*=========================================================
 CLEAR AFTER SUCCESS

=========================================================*/


function clearAfterOrder(){



cart = [];



saveCart();



renderCart();



updateCartCount();



}









/*=========================================================
 FINAL CART INITIALIZATION

=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCart();


renderCart();


updateCartCount();



console.log(

"%cNEXPAK CART V8 ACTIVE",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);



});








/*=========================================================
 NEXPAK SECURITY SOLUTIONS V8

 CART SYSTEM COMPLETE

 Features:

✔ Local Storage Cart
✔ Configured Products
✔ CCTV Options
✔ Electric Fence Builder
✔ Gate Motor Builder
✔ Roboguard Options
✔ WhatsApp Quotes
✔ Customer Details
✔ Order References
✔ CRM Ready

=========================================================*/
