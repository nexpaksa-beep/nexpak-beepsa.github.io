// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop.js
//
// PART 1/5
//
// TAKEALOT STYLE SHOP ENGINE
// PRODUCT LOADER
// SEARCH ENGINE
// CATEGORY FILTER
// ======================================================



// ======================================================
// INITIALIZE SHOP
// ======================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


initializeShop();


});





// ======================================================
// GLOBAL SHOP VARIABLES
// ======================================================


let currentCategory = "All";

let currentSearch = "";





// ======================================================
// INITIALIZE SHOP
// ======================================================


function initializeShop(){


console.log(
"NEXPAK SHOP ENGINE STARTING..."
);



if(
typeof shopProducts === "undefined"
){

console.error(
"shopProducts database not loaded."
);


return;

}



createCategoryMenu();

renderShopProducts();



initializeSearch();



}





// ======================================================
// CREATE CATEGORY MENU
// ======================================================


function createCategoryMenu(){


const menu = document.querySelector(
".shop-categories"
);



if(!menu){

return;

}



let categories = [

"All"

];



shopProducts.forEach(product=>{


if(
!categories.includes(product.category)
){

categories.push(
product.category
);


}



});




menu.innerHTML = "";



categories.forEach(category=>{


menu.innerHTML += `


<button

class="category-btn"

onclick="filterCategory('${category}')">

${category}

</button>


`;



});



}





// ======================================================
// CATEGORY FILTER
// ======================================================


function filterCategory(category){


currentCategory = category;


renderShopProducts();



}



// ======================================================
// SEARCH ENGINE
// ======================================================


function initializeSearch(){


const searchBox = document.querySelector(
"#shopSearch"
);



if(!searchBox){

return;

}



searchBox.addEventListener(
"input",
()=>{


currentSearch =
searchBox.value.toLowerCase();



renderShopProducts();



});


}





// ======================================================
// FILTER PRODUCTS
// ======================================================


function getFilteredProducts(){


return shopProducts.filter(product=>{


let categoryMatch =

currentCategory === "All"

||

product.category === currentCategory;




let searchMatch =

product.name
.toLowerCase()
.includes(currentSearch)

||

product.description
?.toLowerCase()
.includes(currentSearch);



return (

categoryMatch

&&

searchMatch

);



});



}





// ======================================================
// PLACEHOLDER RENDER FUNCTION
// PART 2 WILL COMPLETE THIS
// ======================================================


function renderShopProducts(){


const container = document.querySelector(
".shop-products"
);



if(!container){

return;

}



const products =
getFilteredProducts();



console.log(
"Products loaded:",
products.length
);



}





console.log(

"%cNEXPAK SHOP.JS PART 1 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop.js
//
// PART 2/5
//
// TAKEALOT STYLE PRODUCT CARDS
// IMAGE GALLERY
// IMAGE ZOOM
// PRODUCT SELECTORS
// ======================================================





// ======================================================
// RENDER SHOP PRODUCTS
// ======================================================


function renderShopProducts(){


const container = document.querySelector(
".shop-products"
);



if(!container){

return;

}



const products =
getFilteredProducts();



container.innerHTML = "";





if(products.length === 0){


container.innerHTML = `


<div class="no-products">


<h3>
No products found
</h3>


<p>
Try another search or category.
</p>


</div>


`;

return;


}





products.forEach(product=>{


container.innerHTML += createProductCard(product);



});



}





// ======================================================
// CREATE PRODUCT CARD
// ======================================================


function createProductCard(product){



let images = "";



product.images.forEach(
(image,index)=>{


images += `


<img

src="${image}"

alt="${product.name}"

class="product-image

${index === 0 ? "active-image" : ""}"



onmouseover="zoomProductImage(this)"

>


`;



});





return `


<div class="shop-card">



<div class="shop-gallery">


<div class="main-image">


<img

src="${product.images[0]}"

id="main-${product.id}"

alt="${product.name}"

class="zoom-image"

>


</div>



<div class="thumbnail-images">


${images}


</div>



</div>





<div class="shop-product-info">



<h2>

${product.name}

</h2>



<p class="shop-category">

${product.category}

</p>



<p>

${product.description || ""}

</p>



<div class="shop-options">


${createSelectors(product)}


</div>





<div class="shop-price">


Request Quote


</div>




<div class="quantity-box">


<button

onclick="changeShopQuantity('${product.id}',-1)">

-

</button>



<input

type="number"

id="qty-${product.id}"

value="1"

min="1"



>


<button

onclick="changeShopQuantity('${product.id}',1)">

+

</button>


</div>





<button

class="add-cart-btn"

onclick="addShopProductToCart('${product.id}')">


<i class="fas fa-cart-shopping"></i>

Add To Cart


</button>



</div>



</div>



`;



}





// ======================================================
// CREATE PRODUCT SELECTORS
// ======================================================


function createSelectors(product){



let html = "";





if(!product.options){

return html;

}




Object.entries(product.options)

.forEach(
([key,values])=>{



html += `


<label>


${formatOptionName(key)}


</label>



<select

id="${product.id}-${key}"

class="product-selector">


`;





values.forEach(value=>{


html += `


<option>

${value}

</option>


`;



});



html += `

</select>


`;



}



);



return html;



}





// ======================================================
// IMAGE ZOOM
// ======================================================


function zoomProductImage(image){



const card = image.closest(
".shop-card"
);



const mainImage =
card.querySelector(
".zoom-image"
);



mainImage.src =
image.src;



}





// ======================================================
// QUANTITY CONTROL
// ======================================================


function changeShopQuantity(id,change){



const input =
document.getElementById(
"qty-"+id
);



if(!input){

return;

}



let quantity =
parseInt(input.value);



quantity += change;



if(quantity < 1){

quantity = 1;

}



input.value =
quantity;



}





console.log(

"%cNEXPAK SHOP.JS PART 2 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop.js
//
// PART 3/5
//
// PRODUCT CONFIGURATION
// ADD TO CART CONNECTION
// OPTIONS CAPTURE
// ======================================================





// ======================================================
// ADD SHOP PRODUCT TO CART
// ======================================================


function addShopProductToCart(productId){



const product =

shopProducts.find(

item =>

item.id === productId

);



if(!product){


console.error(
"Product not found:",
productId
);


return;


}





let selectedOptions = {};





// ======================================================
// COLLECT SELECTOR VALUES
// ======================================================


if(product.options){


Object.keys(product.options)

.forEach(option=>{


const selector =

document.getElementById(

product.id +

"-" +

option

);



if(selector){


selectedOptions[option] =

selector.value;


}



});



}





const quantityInput =

document.getElementById(

"qty-" + product.id

);



const quantity =

quantityInput

?

parseInt(quantityInput.value)

:

1;





const cartItem = {


id:

product.id,


name:

product.name,



image:

product.images[0],



quantity:

quantity,



price:

product.price || 0,



options:

selectedOptions,



extras:

[]



};





// ======================================================
// SEND TO CART ENGINE
// ======================================================


if(
typeof addToCart === "function"
){


addToCart(
cartItem
);



showCartMessage(
product.name
);



}

else{


console.error(
"Cart engine not loaded."
);


}



}





// ======================================================
// CART SUCCESS MESSAGE
// ======================================================


function showCartMessage(productName){



const message = document.createElement(
"div"
);



message.className =
"shop-alert";



message.innerHTML = `


<i class="fas fa-check-circle"></i>


${productName}

added to cart


`;



document.body.appendChild(
message
);



setTimeout(()=>{


message.remove();


},3000);



}





// ======================================================
// QUICK BUY FUNCTION
// ======================================================


function buyNow(productId){


addShopProductToCart(productId);



setTimeout(()=>{


window.location.href =
"cart.html";


},500);



}





// ======================================================
// UPDATE CART ICON
// ======================================================


function updateShopCartIcon(){



const counters =

document.querySelectorAll(
".cart-count"
);



if(
typeof getCartQuantity === "function"
){



const count =

getCartQuantity();



counters.forEach(
counter=>{


counter.textContent =
count;



});


}



}





// ======================================================
// AUTO UPDATE CART DISPLAY
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


updateShopCartIcon();



});





console.log(

"%cNEXPAK SHOP.JS PART 3 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop.js
//
// PART 4/5
//
// ADVANCED SHOP FEATURES
// IMAGE GALLERY
// ZOOM EFFECT
// SORTING
// CART PREVIEW
// ======================================================





// ======================================================
// IMAGE GALLERY SWITCH
// ======================================================


function changeMainProductImage(
productId,
image
){


const mainImage =

document.getElementById(

"main-" + productId

);



if(mainImage){


mainImage.src =
image;


}



}





// ======================================================
// IMAGE ZOOM EFFECT
// ======================================================


document.addEventListener(

"mousemove",

function(e){


const image =

e.target.closest(
".zoom-image"
);



if(!image){

return;

}




const rect =
image.getBoundingClientRect();



const x =

((e.clientX - rect.left)
/ rect.width) * 100;



const y =

((e.clientY - rect.top)
/ rect.height) * 100;




image.style.transformOrigin =

`${x}% ${y}%`;



}



);





document.addEventListener(

"mouseenter",

function(e){


if(
e.target.classList.contains(
"zoom-image"
)

){


e.target.style.transform =
"scale(1.8)";


e.target.style.cursor =
"zoom-in";


}



},

true

);





document.addEventListener(

"mouseleave",

function(e){


if(
e.target.classList.contains(
"zoom-image"
)

){


e.target.style.transform =
"scale(1)";


}



},

true

);





// ======================================================
// SORT PRODUCTS
// ======================================================


function sortProducts(type){



if(type === "name"){


shopProducts.sort(

(a,b)=>

a.name.localeCompare(
b.name
)

);


}



if(type === "category"){


shopProducts.sort(

(a,b)=>

a.category.localeCompare(
b.category
)

);


}



renderShopProducts();



}





// ======================================================
// CART MINI PREVIEW
// ======================================================


function showMiniCart(){


if(
typeof getCart !== "function"
){

return;

}



const cartItems =
getCart();



let html = "";





if(cartItems.length === 0){


html = `

<p>
Your cart is empty
</p>

`;



}

else{


cartItems.forEach(item=>{


html += `


<div class="mini-cart-item">


<img src="${item.image}">


<div>


<strong>

${item.name}

</strong>


<br>


Qty:

${item.quantity}


</div>



</div>


`;



});



}





const box =

document.querySelector(
".mini-cart"
);



if(box){


box.innerHTML = html;



}



}





// ======================================================
// CART DROPDOWN TOGGLE
// ======================================================


function toggleMiniCart(){



const cartBox =

document.querySelector(
".mini-cart"
);



if(!cartBox){

return;

}



cartBox.classList.toggle(
"active"
);



showMiniCart();



}





// ======================================================
// MOBILE SHOP FILTER
// ======================================================


function toggleShopFilters(){



const filters =

document.querySelector(
".shop-filters"
);



if(filters){


filters.classList.toggle(
"open"
);



}



}





console.log(

"%cNEXPAK SHOP.JS PART 4 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V15
// shop.js
//
// PART 5/5
//
// FINAL SHOP ENGINE
// PRICE FORMAT
// PRODUCT URL SUPPORT
// CART COMPATIBILITY
// FINAL INITIALIZATION
// ======================================================





// ======================================================
// FORMAT SHOP PRICE
// ======================================================


function formatShopPrice(price){


if(!price || price === 0){


return "Request Quote";


}



return "R" +

Number(price)

.toLocaleString(

"en-ZA",

{

minimumFractionDigits:2,

maximumFractionDigits:2

}

);



}





// ======================================================
// UPDATE PRODUCT PRICE DISPLAY
// ======================================================


function updateProductPrice(
productId,
price
){


const element =

document.querySelector(

"#price-" + productId

);



if(element){


element.innerHTML =

formatShopPrice(price);


}



}





// ======================================================
// LOAD SINGLE PRODUCT FROM URL
// ======================================================


function loadShopProductFromURL(){


const params =

new URLSearchParams(

window.location.search

);



const productId =

params.get(
"id"
);



if(!productId){

return;

}



const product =

shopProducts.find(

item =>

item.id === productId

);



if(!product){

return;

}



console.log(

"Shop product loaded:",

product.name

);



}





// ======================================================
// CREATE SHOP PRODUCT LINK
// ======================================================


function getProductLink(product){


return (

"shop.html?id="

+

product.id

);



}





// ======================================================
// REQUEST QUOTE FALLBACK
// ======================================================


function requestProductQuote(productId){


const product =

shopProducts.find(

item =>

item.id === productId

);



if(!product){

return;

}



const message =


`Nexpak Security Solutions Quote Request

Product:

${product.name}


Please provide pricing and availability.`;


window.open(

"https://wa.me/27836308249?text="

+

encodeURIComponent(
message
),

"_blank"

);



}





// ======================================================
// CLEAR SHOP FILTERS
// ======================================================


function clearShopFilters(){


currentCategory = "All";


currentSearch = "";



const search =

document.querySelector(
"#shopSearch"
);



if(search){

search.value = "";

}



renderShopProducts();



}





// ======================================================
// SHOP READY CHECK
// ======================================================


function shopSystemCheck(){



console.log(

"%cNEXPAK SHOP SYSTEM ONLINE",

"color:#00ff88;font-size:18px;font-weight:bold;"

);



console.log(

"Products:",

shopProducts.length

);



if(
typeof addToCart === "function"
){


console.log(

"Cart integration: OK"

);


}

else{


console.warn(

"Cart integration missing"

);


}



}





// ======================================================
// FINAL STARTUP
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


shopSystemCheck();


loadShopProductFromURL();


});





console.log(

"%cNEXPAK SHOP.JS V15 COMPLETE",

"color:#00B4FF;font-size:20px;font-weight:bold;"

);
