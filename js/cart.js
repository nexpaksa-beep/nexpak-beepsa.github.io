/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 1/6

 ADVANCED SHOPPING CART ENGINE
=========================================================*/

document.addEventListener("DOMContentLoaded", initCart);

/*=========================================================
 GLOBAL VARIABLES
=========================================================*/

let cart = [];
let cartSubtotal = 0;
let cartVAT = 0;
let cartShipping = 0;
let cartTotal = 0;

const VAT_RATE = 0.15;

/*=========================================================
 INITIALIZE CART
=========================================================*/

function initCart(){

    loadCart();

    updateCartCount();

    renderCart();

    calculateTotals();

}

/*=========================================================
 LOAD CART
=========================================================*/

function loadCart(){

    const saved =
    localStorage.getItem("nexpak_cart");

    if(saved){

        try{

            cart = JSON.parse(saved);

        }catch(error){

            cart = [];

        }

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
 ADD PRODUCT
=========================================================*/

function addToCart(item){

    if(!item) return;

    const existing = cart.find(product =>

        product.id === item.id &&

        JSON.stringify(product.options || {}) ===
        JSON.stringify(item.options || {})

    );

    if(existing){

        existing.quantity += item.quantity || 1;

    }else{

        cart.push({

            id:item.id,

            name:item.name,

            image:item.image,

            price:item.price,

            quantity:item.quantity || 1,

            options:item.options || {}

        });

    }

    saveCart();

    updateCartCount();

    calculateTotals();

    animateCart();

}

/*=========================================================
 REMOVE PRODUCT
=========================================================*/

function removeFromCart(index){

    if(index < 0 || index >= cart.length)
        return;

    cart.splice(index,1);

    saveCart();

    renderCart();

    updateCartCount();

    calculateTotals();

}

/*=========================================================
 CLEAR CART
=========================================================*/

function clearCart(){

    cart = [];

    saveCart();

    renderCart();

    updateCartCount();

    calculateTotals();

}

/*=========================================================
 CART COUNT
=========================================================*/

function updateCartCount(){

    const counter =
    document.querySelector(".cart-count");

    if(!counter)
        return;

    let total = 0;

    cart.forEach(item=>{

        total += item.quantity;

    });

    counter.textContent = total;

}

/*=========================================================
 GET CART
=========================================================*/

function getCart(){

    return cart;

}

console.log(

"%cNEXPAK CART V9 PART 1 LOADED",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 2/6

 CART RENDERING ENGINE
=========================================================*/

/*=========================================================
 RENDER CART
=========================================================*/

function renderCart(){

    const container =
    document.querySelector(".cart-items");

    if(!container) return;

    container.innerHTML = "";

    if(cart.length === 0){

        container.innerHTML = `

<div class="empty-cart">

<i class="fas fa-cart-shopping"></i>

<h2>Your cart is empty</h2>

<p>Add products from our Security Shop.</p>

<a href="shop.html" class="primary-btn">

Continue Shopping

</a>

</div>

`;

        return;

    }

    cart.forEach((item,index)=>{

        container.innerHTML += createCartItem(item,index);

    });

}

/*=========================================================
 CREATE CART ITEM
=========================================================*/

function createCartItem(item,index){

    return `

<div class="cart-item">

<div class="cart-image">

<img src="${item.image}"
alt="${item.name}">

</div>

<div class="cart-details">

<h3>${item.name}</h3>

${buildOptions(item)}

<div class="cart-price">

R${item.price.toLocaleString("en-ZA")}

</div>

<div class="cart-quantity">

<button
onclick="changeQuantity(${index},-1)">

<i class="fas fa-minus"></i>

</button>

<input
type="number"
min="1"
value="${item.quantity}"
onchange="setQuantity(${index},this.value)">

<button
onclick="changeQuantity(${index},1)">

<i class="fas fa-plus"></i>

</button>

</div>

<div class="cart-subtotal">

Subtotal:

<strong>

R${getItemSubtotal(item).toLocaleString("en-ZA")}

</strong>

</div>

<button
class="remove-btn"
onclick="removeFromCart(${index})">

<i class="fas fa-trash"></i>

Remove

</button>

</div>

</div>

`;

}

/*=========================================================
 BUILD OPTIONS HTML
=========================================================*/

function buildOptions(item){

    if(!item.options)
        return "";

    let html =

'<ul class="cart-options">';

    Object.keys(item.options).forEach(option=>{

        html += `

<li>

<strong>

${formatOption(option)}

</strong>

${item.options[option]}

</li>

`;

    });

    html += "</ul>";

    return html;

}

/*=========================================================
 FORMAT OPTION NAME
=========================================================*/

function formatOption(text){

    return text

    .replace(/([A-Z])/g," $1")

    .replace(/^./,
    letter=>letter.toUpperCase());

}

/*=========================================================
 ITEM SUBTOTAL
=========================================================*/

function getItemSubtotal(item){

    return item.price * item.quantity;

}

/*=========================================================
 REFRESH CART
=========================================================*/

function refreshCart(){

    renderCart();

    calculateTotals();

    updateCartCount();

    saveCart();

}

console.log(

"%cCART V9 PART 2 LOADED",

"color:#00B4FF;font-weight:bold;"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 3/6

 TOTALS • VAT • SHIPPING
=========================================================*/

/*=========================================================
 CALCULATE TOTALS
=========================================================*/

function calculateTotals(){

    cartSubtotal = 0;

    cart.forEach(item=>{

        cartSubtotal +=
        getItemSubtotal(item);

    });

    cartVAT =
    cartSubtotal * VAT_RATE;

    cartShipping =
    calculateShipping(cartSubtotal);

    cartTotal =
    cartSubtotal +
    cartVAT +
    cartShipping;

    updateTotalsDisplay();

}

/*=========================================================
 SHIPPING CALCULATOR
=========================================================*/

function calculateShipping(subtotal){

    if(subtotal <= 0)
        return 0;

    /* Free delivery over R10 000 */

    if(subtotal >= 10000)
        return 0;

    return 250;

}

/*=========================================================
 UPDATE TOTAL DISPLAY
=========================================================*/

function updateTotalsDisplay(){

    const subtotal =
    document.querySelector(".cart-subtotal-value");

    const vat =
    document.querySelector(".cart-vat-value");

    const shipping =
    document.querySelector(".cart-shipping-value");

    const total =
    document.querySelector(".cart-total-value");

    if(subtotal){

        subtotal.innerHTML =
        "R" +
        cartSubtotal.toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits:2
        });

    }

    if(vat){

        vat.innerHTML =
        "R" +
        cartVAT.toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits:2
        });

    }

    if(shipping){

        shipping.innerHTML =
        cartShipping === 0 ?

        "FREE"

        :

        "R" +
        cartShipping.toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits:2
        });

    }

    if(total){

        total.innerHTML =
        "R" +
        cartTotal.toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits:2
        });

    }

}

/*=========================================================
 CHANGE QUANTITY
=========================================================*/

function changeQuantity(index, amount){

    if(!cart[index]) return;

    cart[index].quantity += amount;

    if(cart[index].quantity < 1){

        cart[index].quantity = 1;

    }

    refreshCart();

}

/*=========================================================
 SET QUANTITY
=========================================================*/

function setQuantity(index, value){

    let qty =
    parseInt(value);

    if(isNaN(qty) || qty < 1){

        qty = 1;

    }

    cart[index].quantity = qty;

    refreshCart();

}

/*=========================================================
 CART SUMMARY
=========================================================*/

function getCartSummary(){

    return {

        items: cart,

        subtotal: cartSubtotal,

        vat: cartVAT,

        shipping: cartShipping,

        total: cartTotal,

        totalItems:

        cart.reduce((sum,item)=>

            sum + item.quantity

        ,0)

    };

}

console.log(

"%cCART V9 PART 3 LOADED",

"color:#00B4FF;font-weight:bold;"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 4/6

 CUSTOMER DETAILS • ORDERS • QUOTATIONS
=========================================================*/

/*=========================================================
 CUSTOMER DETAILS
=========================================================*/

let customer = {

    name:"",
    company:"",
    phone:"",
    email:"",
    address:"",
    notes:""

};

/*=========================================================
 SAVE CUSTOMER
=========================================================*/

function saveCustomer(){

    customer.name =
    document.getElementById("customer-name")?.value || "";

    customer.company =
    document.getElementById("customer-company")?.value || "";

    customer.phone =
    document.getElementById("customer-phone")?.value || "";

    customer.email =
    document.getElementById("customer-email")?.value || "";

    customer.address =
    document.getElementById("customer-address")?.value || "";

    customer.notes =
    document.getElementById("customer-notes")?.value || "";

    localStorage.setItem(
        "nexpak_customer",
        JSON.stringify(customer)
    );

}

/*=========================================================
 LOAD CUSTOMER
=========================================================*/

function loadCustomer(){

    const saved =
    localStorage.getItem("nexpak_customer");

    if(!saved) return;

    customer = JSON.parse(saved);

}

/*=========================================================
 VALIDATE CUSTOMER
=========================================================*/

function validateCustomer(){

    saveCustomer();

    if(customer.name === ""){

        alert("Please enter your name.");
        return false;

    }

    if(customer.phone === ""){

        alert("Please enter your phone number.");
        return false;

    }

    return true;

}

/*=========================================================
 ORDER NUMBER
=========================================================*/

function generateOrderNumber(){

    const now = new Date();

    const random =
    Math.floor(Math.random()*9000)+1000;

    return "NP-" +

    now.getFullYear() +

    String(now.getMonth()+1).padStart(2,"0") +

    String(now.getDate()).padStart(2,"0") +

    "-" +

    random;

}

/*=========================================================
 CREATE ORDER OBJECT
=========================================================*/

function createOrder(){

    return{

        orderNumber:
        generateOrderNumber(),

        date:
        new Date().toISOString(),

        customer:
        customer,

        items:
        cart,

        subtotal:
        cartSubtotal,

        vat:
        cartVAT,

        shipping:
        cartShipping,

        total:
        cartTotal

    };

}

/*=========================================================
 SAVE ORDER
=========================================================*/

function saveOrder(){

    const order =
    createOrder();

    const orders =
    JSON.parse(

        localStorage.getItem(
        "nexpak_orders"
        ) || "[]"

    );

    orders.push(order);

    localStorage.setItem(

        "nexpak_orders",

        JSON.stringify(orders)

    );

    return order;

}

/*=========================================================
 BUILD QUOTE MESSAGE
=========================================================*/

function buildQuoteMessage(){

    let message =

`NEXPAK SECURITY SOLUTIONS

Quotation Request

Order:
${generateOrderNumber()}

Customer:
${customer.name}

Company:
${customer.company}

Phone:
${customer.phone}

Email:
${customer.email}

--------------------------------

`;

    cart.forEach(item=>{

        message +=

`${item.name}

`;

        if(item.options){

            Object.keys(item.options).forEach(option=>{

                message +=

`${formatOption(option)}:
${item.options[option]}

`;

            });

        }

        message +=

`Qty:
${item.quantity}

Subtotal:
R${getItemSubtotal(item).toLocaleString("en-ZA")}

--------------------------------

`;

    });

    message +=

`Subtotal:
R${cartSubtotal.toLocaleString("en-ZA")}

VAT:
R${cartVAT.toLocaleString("en-ZA")}

Shipping:
${cartShipping===0?"FREE":"R"+cartShipping.toLocaleString("en-ZA")}

TOTAL:
R${cartTotal.toLocaleString("en-ZA")}

`;

    return message;

}

console.log(

"%cCART V9 PART 4 LOADED",

"color:#00B4FF;font-weight:bold;"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 5/6

 CHECKOUT • WHATSAPP • EMAIL • ORDER COMPLETE
=========================================================*/

/*=========================================================
 SEND WHATSAPP QUOTE
=========================================================*/

function checkoutWhatsApp(){

    if(cart.length===0){

        alert("Your cart is empty.");
        return;

    }

    if(!validateCustomer()) return;

    const order = saveOrder();

    let message = buildQuoteMessage();

    message += `

Reference:
${order.orderNumber}

Thank you.
`;

    window.open(

        "https://wa.me/27836308249?text=" +

        encodeURIComponent(message),

        "_blank"

    );

}

/*=========================================================
 EMAIL QUOTE
=========================================================*/

function checkoutEmail(){

    if(cart.length===0){

        alert("Your cart is empty.");
        return;

    }

    if(!validateCustomer()) return;

    const order = saveOrder();

    const subject =

    "Security Quote Request - " +

    order.orderNumber;

    const body = buildQuoteMessage();

    window.location.href =

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

/*=========================================================
 COMPLETE CHECKOUT
=========================================================*/

function completeCheckout(){

    if(cart.length===0){

        alert("Your cart is empty.");
        return;

    }

    if(!validateCustomer()) return;

    saveOrder();

    showNotification(

        "Quote created successfully."

    );

    clearCart();

}

/*=========================================================
 SUCCESS NOTIFICATION
=========================================================*/

function showNotification(message){

    let box = document.createElement("div");

    box.className = "cart-notification";

    box.innerHTML = `

<i class="fas fa-circle-check"></i>

<span>${message}</span>

`;

    document.body.appendChild(box);

    setTimeout(()=>{

        box.classList.add("show");

    },100);

    setTimeout(()=>{

        box.classList.remove("show");

        setTimeout(()=>{

            box.remove();

        },300);

    },2500);

}

/*=========================================================
 CART ANIMATION
=========================================================*/

function animateCart(){

    const icon =

    document.querySelector(".cart-icon");

    if(!icon) return;

    icon.classList.add("cart-bounce");

    setTimeout(()=>{

        icon.classList.remove("cart-bounce");

    },700);

}

/*=========================================================
 EMPTY CART MESSAGE
=========================================================*/

function isCartEmpty(){

    return cart.length===0;

}

/*=========================================================
 CONTINUE SHOPPING
=========================================================*/

function continueShopping(){

    window.location.href = "shop.html";

}

console.log(

"%cNEXPAK CART V9 PART 5 LOADED",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V9
 cart.js
 PART 6/6

 DISCOUNTS • UTILITIES • FINAL INITIALIZATION
=========================================================*/

/*=========================================================
 DISCOUNT VARIABLES
=========================================================*/

let discount = 0;
let discountCode = "";

/*=========================================================
 APPLY DISCOUNT CODE
=========================================================*/

function applyDiscount(){

    const input =
    document.getElementById("discount-code");

    if(!input) return;

    discountCode =
    input.value.trim().toUpperCase();

    discount = 0;

    switch(discountCode){

        case "NEXPAK5":
            discount = cartSubtotal * 0.05;
            break;

        case "NEXPAK10":
            discount = cartSubtotal * 0.10;
            break;

        case "SECURITY15":
            discount = cartSubtotal * 0.15;
            break;

        default:

            alert("Invalid discount code.");

            discount = 0;

    }

    calculateTotals();

}

/*=========================================================
 OVERRIDE TOTAL CALCULATION
=========================================================*/

const originalCalculateTotals =
calculateTotals;

calculateTotals = function(){

    originalCalculateTotals();

    cartTotal -= discount;

    if(cartTotal < 0){

        cartTotal = 0;

    }

    updateTotalsDisplay();

};

/*=========================================================
 EMPTY CART AFTER ORDER
=========================================================*/

function clearAfterOrder(){

    cart = [];

    saveCart();

    renderCart();

    updateCartCount();

    calculateTotals();

}

/*=========================================================
 EXPORT ORDER
=========================================================*/

function exportOrder(){

    const order =
    createOrder();

    console.log(order);

    return order;

}

/*=========================================================
 RECOVER SAVED CUSTOMER
=========================================================*/

window.addEventListener("load",()=>{

    loadCustomer();

});

/*=========================================================
 RESET CART
=========================================================*/

function resetCart(){

    if(confirm("Clear your shopping cart?")){

        clearCart();

    }

}

/*=========================================================
 DEBUG MODE
=========================================================*/

function viewCart(){

    console.table(cart);

}

/*=========================================================
 CART READY
=========================================================*/

window.addEventListener("load",()=>{

    loadCart();

    renderCart();

    updateCartCount();

    calculateTotals();

});

/*=========================================================
 VERSION
=========================================================*/

const CART_VERSION = "9.0";

/*=========================================================
 STARTUP MESSAGE
=========================================================*/

console.log(

"%cNEXPAK SECURITY SOLUTIONS",

"color:#00B4FF;font-size:22px;font-weight:bold;"

);

console.log(

"%cSHOPPING CART V9 READY",

"color:#00CC66;font-size:18px;font-weight:bold;"

);

console.log(

"Version:",

CART_VERSION

);

console.log(

"Products Loaded:",

cart.length

);

/*=========================================================
 FEATURES

✓ Product Configurator Support
✓ Multiple Quantities
✓ Local Storage
✓ Customer Details
✓ WhatsApp Quotes
✓ Email Quotes
✓ Discount Codes
✓ VAT
✓ Shipping
✓ Order Numbers
✓ CRM Ready
✓ Invoice Ready
✓ Future PayFast / Paystack Ready

=========================================================*/
