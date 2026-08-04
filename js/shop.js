// ======================================================
// NEXPAK SECURITY SOLUTIONS V16
// shop.js
//
// PART 1/5
//
// ADVANCED E-COMMERCE SHOP ENGINE
//
// CORE SYSTEM
// PRODUCT LOADER
// SEARCH
// CATEGORY FILTER
// STATE MANAGEMENT
// ======================================================


// ======================================================
// GLOBAL SHOP STATE
// ======================================================


let shopState = {

    category: "All",

    search: "",

    sort: "default",

    products: [],

    viewed: []

};





// ======================================================
// INITIALIZE SHOP
// ======================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


startShopEngine();


});





// ======================================================
// START SHOP ENGINE
// ======================================================


function startShopEngine(){


console.log(
"NEXPAK V16 SHOP ENGINE STARTING..."
);



if(
typeof shopProducts === "undefined"
){


console.error(
"Product database missing."
);


return;


}





shopState.products =
[...shopProducts];




createCategoryMenu();


initializeSearch();


initializeSort();


loadRecentlyViewed();


renderShopProducts();


updateShopCartIcon();




console.log(
"NEXPAK V16 SHOP ONLINE"
);



}





// ======================================================
// CREATE CATEGORY MENU
// ======================================================


function createCategoryMenu(){


const menu =
document.querySelector(
".shop-categories"
);



if(!menu){

return;

}




let categories =
[
"All"
];





shopState.products.forEach(product=>{


if(

product.category &&

!categories.includes(
product.category
)

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

data-category="${category}"

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


shopState.category =
category;



renderShopProducts();



updateActiveCategory(
category
);



}





// ======================================================
// ACTIVE CATEGORY BUTTON
// ======================================================


function updateActiveCategory(category){


document
.querySelectorAll(
".category-btn"
)
.forEach(button=>{


button.classList.remove(
"active"
);



if(
button.dataset.category === category
){


button.classList.add(
"active"
);


}



});


}





// ======================================================
// SEARCH ENGINE
// ======================================================


function initializeSearch(){


const searchBox =
document.querySelector(
"#shopSearch"
);



if(!searchBox){

return;

}





searchBox.addEventListener(
"input",
()=>{


shopState.search =

searchBox.value

.toLowerCase()

.trim();




renderShopProducts();



});



}





// ======================================================
// FILTER PRODUCTS
// ======================================================


function getFilteredProducts(){


let products =
[...shopState.products];





return products.filter(product=>{



let categoryMatch =


shopState.category === "All"

||

product.category === shopState.category;






let searchText =


(

product.name +

" " +

(product.category || "") +

" " +

(product.description || "")

)

.toLowerCase();





let searchMatch =


searchText.includes(
shopState.search
);






return (

categoryMatch

&&

searchMatch

);



});



}





// ======================================================
// SORT SYSTEM INITIALIZER
// ======================================================


function initializeSort(){


const sortBox =
document.querySelector(
"#shopSort"
);



if(!sortBox){

return;

}





sortBox.addEventListener(
"change",
()=>{


shopState.sort =
sortBox.value;



renderShopProducts();



});



}





// ======================================================
// APPLY SORT
// ======================================================


function applySort(products){



if(
shopState.sort === "name"
){


return products.sort(
(a,b)=>

a.name.localeCompare(
b.name
)

);


}





if(
shopState.sort === "price-low"
){


return products.sort(
(a,b)=>

(a.price || 0)

-

(b.price || 0)

);


}





if(
shopState.sort === "price-high"
){


return products.sort(
(a,b)=>

(b.price || 0)

-

(a.price || 0)

);


}





return products;



}





// ======================================================
// RESET FILTERS
// ======================================================


function clearShopFilters(){


shopState.category =
"All";


shopState.search =
"";



const search =
document.querySelector(
"#shopSearch"
);



if(search){

search.value = "";

}



renderShopProducts();



}





console.log(

"%cNEXPAK V16 SHOP.JS PART 1 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V16
// shop.js
//
// PART 2/5
//
// TAKEALOT STYLE PRODUCT CARDS
//
// PRODUCT GRID
// IMAGE GALLERY
// RATINGS
// STOCK STATUS
// DISCOUNTS
// WISHLIST
// PRODUCT QUICK VIEW
// ======================================================





// ======================================================
// RENDER SHOP PRODUCTS
// ======================================================


function renderShopProducts(){


const container =
document.querySelector(
".shop-products"
);



if(!container){

return;

}




let products =
getFilteredProducts();




products =
applySort(products);





container.innerHTML = "";





if(products.length === 0){


container.innerHTML = `


<div class="no-products">


<i class="fas fa-search"></i>


<h3>
No products found
</h3>


<p>
Try changing your search or category.
</p>


<button

onclick="clearShopFilters()">

Clear Filters

</button>


</div>


`;

return;


}





products.forEach(product=>{


container.innerHTML +=

createProductCard(product);



});



}





// ======================================================
// CREATE PRODUCT CARD
// ======================================================


function createProductCard(product){



const discount =

product.discount

?

`

<span class="discount-badge">

-${product.discount}%

</span>

`

:

"";





const stock =

getStockBadge(product);






const rating =

createRatingStars(
product.rating || 0
);






return `


<div class="shop-card"

data-product="${product.id}">





<div class="product-image-area">





${discount}




<button

class="wishlist-btn"

onclick="toggleWishlist('${product.id}')">


<i class="far fa-heart"></i>


</button>






<img

src="${product.images?.[0] || 'images/no-image.jpg'}"

alt="${product.name}"

loading="lazy"

class="product-main-image"

onclick="openQuickView('${product.id}')"



>




</div>







<div class="product-details">





<div class="product-rating">

${rating}

<span>

(${product.reviews || 0})

</span>


</div>





<h2>

${product.name}

</h2>





<span class="product-category">

${product.category || ""}

</span>





<p class="product-description">


${product.description || ""}


</p>






${stock}







<div class="product-price">


${formatShopPrice(product.price)}


</div>







<div class="product-actions">





<button

class="view-btn"

onclick="openQuickView('${product.id}')">


<i class="fas fa-eye"></i>

View


</button>





<button

class="add-cart-btn"

onclick="addShopProductToCart('${product.id}')">


<i class="fas fa-cart-shopping"></i>

Add


</button>




</div>






</div>





</div>


`;



}





// ======================================================
// STOCK BADGE
// ======================================================


function getStockBadge(product){



if(
product.stock === 0
){


return `


<div class="stock out">


Out Of Stock

</div>


`;



}




if(
product.stock <= 5
){


return `


<div class="stock low">


Only ${product.stock} left

</div>


`;



}




return `


<div class="stock available">


<i class="fas fa-check"></i>

In Stock

</div>


`;



}





// ======================================================
// STAR RATING SYSTEM
// ======================================================


function createRatingStars(rating){


let stars = "";





for(
let i = 1;
i <= 5;
i++
){



if(
i <= rating
){


stars +=

'<i class="fas fa-star"></i>';


}

else{


stars +=

'<i class="far fa-star"></i>';


}



}



return stars;



}





// ======================================================
// WISHLIST ENGINE
// ======================================================


let wishlist =

JSON.parse(

localStorage.getItem(
"nexpak_wishlist"
)

)

|| [];







function toggleWishlist(productId){



const index =

wishlist.indexOf(
productId
);





if(index > -1){


wishlist.splice(
index,
1
);



showShopNotification(
"Removed from wishlist"
);



}

else{


wishlist.push(
productId
);



showShopNotification(
"Added to wishlist ❤️"
);



}





localStorage.setItem(

"nexpak_wishlist",

JSON.stringify(
wishlist
)

);



updateWishlistButtons();



}





// ======================================================
// UPDATE WISHLIST BUTTONS
// ======================================================


function updateWishlistButtons(){



document

.querySelectorAll(
".wishlist-btn"
)

.forEach(button=>{


const card =
button.closest(
".shop-card"
);



const id =
card.dataset.product;





if(
wishlist.includes(id)
){


button.classList.add(
"active"
);



button.innerHTML =

'<i class="fas fa-heart"></i>';



}

else{


button.classList.remove(
"active"
);



button.innerHTML =

'<i class="far fa-heart"></i>';



}



});



}





// ======================================================
// QUICK VIEW PLACEHOLDER
// PART 3 WILL COMPLETE MODAL
// ======================================================


function openQuickView(productId){



console.log(

"Quick view:",

productId

);



}





console.log(

"%cNEXPAK V16 SHOP.JS PART 2 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V16
// shop.js
//
// PART 3/5
//
// ADVANCED PRODUCT EXPERIENCE
//
// QUICK VIEW MODAL
// IMAGE SLIDER
// PRODUCT OPTIONS
// SPECIFICATIONS
// RECENTLY VIEWED
// RELATED PRODUCTS
// ======================================================





// ======================================================
// QUICK VIEW MODAL
// ======================================================


function openQuickView(productId){



const product =

shopState.products.find(

item =>

item.id === productId

);



if(!product){

return;

}





addRecentlyViewed(productId);





let modal =

document.querySelector(
"#productQuickView"
);





if(!modal){


modal = document.createElement(
"div"
);


modal.id =
"productQuickView";


modal.className =
"quick-view-modal";


document.body.appendChild(
modal
);



}





modal.innerHTML = `


<div class="quick-view-box">



<button

class="close-quick-view"

onclick="closeQuickView()">

×

</button>





<div class="quick-image-section">


<img

id="quickMainImage"

src="${product.images?.[0] || 'images/no-image.jpg'}"

alt="${product.name}"

>




<div class="quick-thumbnails">


${createQuickThumbnails(product)}


</div>



</div>







<div class="quick-product-info">



<h2>

${product.name}

</h2>





<div class="product-rating">

${createRatingStars(product.rating || 0)}

</div>





<p>

${product.description || ""}

</p>





<div class="quick-price">


${formatShopPrice(product.price)}

</div>






<div class="quick-options">


${createProductOptions(product)}


</div>





<div class="quick-specifications">


${createSpecifications(product)}


</div>







<button

class="add-cart-btn"

onclick="addQuickViewToCart('${product.id}')">


<i class="fas fa-cart-shopping"></i>

Add To Cart


</button>




</div>



</div>



`;





modal.classList.add(
"active"
);



}





// ======================================================
// CLOSE QUICK VIEW
// ======================================================


function closeQuickView(){



const modal =

document.querySelector(
"#productQuickView"
);



if(modal){


modal.classList.remove(
"active"
);


}



}





// ======================================================
// QUICK VIEW THUMBNAILS
// ======================================================


function createQuickThumbnails(product){



if(
!product.images ||
product.images.length < 2
){

return "";

}





let html = "";





product.images.forEach(image=>{


html += `


<img

src="${image}"

onclick="changeQuickImage('${image}')"

loading="lazy"


>


`;



});





return html;



}





// ======================================================
// CHANGE QUICK IMAGE
// ======================================================


function changeQuickImage(image){



const main =

document.querySelector(
"#quickMainImage"
);



if(main){


main.src =
image;


}



}





// ======================================================
// CREATE PRODUCT OPTIONS
// ======================================================


function createProductOptions(product){



if(
!product.options
){

return "";

}





let html = "";





Object.entries(
product.options
)

.forEach(
([name,values])=>{



html += `


<label>

${formatOptionName(name)}

</label>



<select

id="quick-${product.id}-${name}"

class="quick-selector">


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



});





return html;



}





// ======================================================
// PRODUCT SPECIFICATIONS
// ======================================================


function createSpecifications(product){



if(
!product.specifications
){

return "";

}





let html = `


<h3>

Specifications

</h3>



<table class="spec-table">


`;





Object.entries(
product.specifications
)

.forEach(
([key,value])=>{


html += `


<tr>


<td>

${key}

</td>



<td>

${value}

</td>



</tr>


`;



});





html += `

</table>

`;





return html;



}





// ======================================================
// ADD QUICK VIEW TO CART
// ======================================================


function addQuickViewToCart(productId){



const product =

shopState.products.find(

item =>

item.id === productId

);



if(!product){

return;

}





let options = {};





if(product.options){


Object.keys(
product.options
)

.forEach(option=>{


const selector =

document.querySelector(

`#quick-${productId}-${option}`

);




if(selector){


options[option] =

selector.value;


}



});



}





const item = {


id:

product.id,


name:

product.name,


image:

product.images?.[0],


price:

product.price || 0,


quantity:

1,


options:

options



};






if(
typeof addToCart === "function"
){


addToCart(item);


showShopNotification(

product.name +

" added to cart"

);


}



}





// ======================================================
// RECENTLY VIEWED
// ======================================================


function addRecentlyViewed(id){



let viewed =

JSON.parse(

localStorage.getItem(
"nexpak_recent"
)

)

|| [];





viewed =

viewed.filter(
item => item !== id
);





viewed.unshift(
id
);





viewed =

viewed.slice(
0,
10
);





localStorage.setItem(

"nexpak_recent",

JSON.stringify(
viewed
)

);



}





function loadRecentlyViewed(){



shopState.viewed =

JSON.parse(

localStorage.getItem(
"nexpak_recent"
)

)

|| [];



}





// ======================================================
// RELATED PRODUCTS
// ======================================================


function getRelatedProducts(productId){



const product =

shopState.products.find(

item =>

item.id === productId

);



if(!product){

return [];

}





return shopState.products

.filter(item=>

item.category === product.category

&&

item.id !== productId

)

.slice(
0,
4
);



}





console.log(

"%cNEXPAK V16 SHOP.JS PART 3 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// ======================================================
// NEXPAK SECURITY SOLUTIONS V16
// shop.js
//
// PART 4/5
//
// ADVANCED SHOP FEATURES
//
// MINI CART DRAWER
// PRODUCT COMPARISON
// DELIVERY ESTIMATOR
// TRUST FEATURES
// CART EXPERIENCE
// ======================================================





// ======================================================
// MINI CART DRAWER
// ======================================================


function showMiniCart(){


if(
typeof getCart !== "function"
){

return;

}




const cartItems =
getCart();




let box =
document.querySelector(
".mini-cart"
);



if(!box){

return;

}





if(
cartItems.length === 0
){


box.innerHTML = `


<div class="empty-cart">


<i class="fas fa-cart-shopping"></i>


<p>
Your cart is empty
</p>


</div>


`;


return;


}






let html = "";

let total = 0;





cartItems.forEach(item=>{


total +=

(item.price || 0)

*

item.quantity;





html += `


<div class="mini-cart-item">


<img

src="${item.image}"

alt="${item.name}"

>



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





box.innerHTML = `


<div class="mini-cart-products">


${html}


</div>




<div class="mini-cart-total">


Total:

${formatShopPrice(total)}


</div>




<a

href="cart.html"

class="checkout-mini-btn">


View Cart

</a>


`;



}





// ======================================================
// TOGGLE MINI CART
// ======================================================


function toggleMiniCart(){



const cart =

document.querySelector(
".mini-cart"
);



if(!cart){

return;

}




cart.classList.toggle(
"active"
);



showMiniCart();



}





// ======================================================
// PRODUCT COMPARISON
// ======================================================


let compareProducts =

JSON.parse(

localStorage.getItem(
"nexpak_compare"
)

)

|| [];





function addToCompare(productId){



if(

compareProducts.includes(
productId
)

){


showShopNotification(
"Already added to compare"
);


return;


}





if(

compareProducts.length >= 4

){


showShopNotification(
"Maximum 4 products allowed"
);


return;


}





compareProducts.push(
productId
);





localStorage.setItem(

"nexpak_compare",

JSON.stringify(
compareProducts
)

);





showShopNotification(
"Added to comparison"
);



updateCompareCounter();



}





function removeFromCompare(productId){



compareProducts =

compareProducts.filter(

id =>

id !== productId

);





localStorage.setItem(

"nexpak_compare",

JSON.stringify(
compareProducts
)

);





updateCompareCounter();



}





function updateCompareCounter(){



document

.querySelectorAll(
".compare-count"
)

.forEach(counter=>{


counter.textContent =

compareProducts.length;



});


}





// ======================================================
// BUILD COMPARISON TABLE
// ======================================================


function openComparison(){



let products =

compareProducts.map(id=>

shopState.products.find(

product=>

product.id === id

)

)

.filter(Boolean);





if(products.length === 0){


showShopNotification(
"No products selected"
);


return;


}





let html = `


<table class="compare-table">


<tr>


<th>
Feature
</th>

`;





products.forEach(product=>{


html += `


<th>

${product.name}

</th>


`;



});





html += `

</tr>

`;





const fields = [

"price",

"category",

"stock",

"description"

];





fields.forEach(field=>{


html += `


<tr>


<td>

${field}

</td>


`;





products.forEach(product=>{


html += `


<td>

${product[field] || "-"}

</td>


`;



});





html += `

</tr>

`;



});





html += `

</table>

`;





const compareBox =

document.querySelector(
".compare-area"
);



if(compareBox){


compareBox.innerHTML = html;


}



}





// ======================================================
// DELIVERY ESTIMATOR
// ======================================================


function estimateDelivery(){



const locationInput =

document.querySelector(
"#deliveryLocation"
);



const result =

document.querySelector(
"#deliveryResult"
);



if(
!locationInput ||
!result
){

return;

}





let location =

locationInput.value.trim();





if(!location){


result.innerHTML =

"Enter your area";


return;


}





// Basic South Africa estimate

result.innerHTML = `


<i class="fas fa-truck"></i>


Delivery available to:

<strong>

${location}

</strong>



<br>


Estimated delivery:

2 - 5 working days


`;



}





// ======================================================
// TRUST BADGES
// ======================================================


function loadTrustFeatures(){



const area =

document.querySelector(
".trust-features"
);



if(!area){

return;

}





area.innerHTML = `


<div class="trust-box">


<i class="fas fa-shield-halved"></i>


<h4>

Secure Shopping

</h4>


<p>

Safe payment and customer support

</p>


</div>





<div class="trust-box">


<i class="fas fa-truck"></i>


<h4>

Fast Delivery

</h4>


<p>

Nationwide security equipment delivery

</p>


</div>






<div class="trust-box">


<i class="fas fa-user-shield"></i>


<h4>

Security Experts

</h4>


<p>

Professional installation support

</p>


</div>


`;



}





// ======================================================
// SHOP NOTIFICATION
// ======================================================


function showShopNotification(message){



let alert =

document.createElement(
"div"
);



alert.className =
"shop-alert";



alert.innerHTML = `


<i class="fas fa-check-circle"></i>


${message}


`;





document.body.appendChild(
alert
);





setTimeout(()=>{


alert.remove();


},3000);



}





// ======================================================
// INITIALIZE ADVANCED FEATURES
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadTrustFeatures();


updateCompareCounter();


});





console.log(

"%cNEXPAK V16 SHOP.JS PART 4 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
// ======================================================
// NEXPAK SECURITY SOLUTIONS V16
// shop.js
//
// PART 5/5
//
// FINAL SHOP ENGINE
//
// SEO SCHEMA
// WHATSAPP AUTOMATION
// PERFORMANCE
// CART COMPATIBILITY
// SYSTEM CHECK
// PRODUCTION FINALIZATION
// ======================================================





// ======================================================
// PRODUCT SEO SCHEMA GENERATOR
// ======================================================


function generateProductSchema(product){



const schema = {


"@context":

"https://schema.org",



"@type":

"Product",



"name":

product.name,



"description":

product.description || "",



"image":

product.images || [],



"category":

product.category || "Security Equipment",



"offers":{


"@type":

"Offer",



"priceCurrency":

"ZAR",



"price":

product.price || 0,



"availability":

product.stock > 0

?

"https://schema.org/InStock"

:

"https://schema.org/OutOfStock"



},



"aggregateRating":

product.rating

?

{


"@type":

"AggregateRating",



"ratingValue":

product.rating,



"reviewCount":

product.reviews || 0


}

:

undefined



};



return schema;



}





// ======================================================
// INSERT PRODUCT SEO DATA
// ======================================================


function injectProductSchema(productId){



const product =

shopState.products.find(

item =>

item.id === productId

);



if(!product){

return;

}





const oldSchema =

document.querySelector(
"#product-schema"
);



if(oldSchema){


oldSchema.remove();


}





const script =

document.createElement(
"script"
);



script.type =

"application/ld+json";



script.id =

"product-schema";



script.textContent =

JSON.stringify(

generateProductSchema(product)

);





document.head.appendChild(
script
);



}





// ======================================================
// WHATSAPP QUOTE AUTOMATION
// ======================================================


function createWhatsAppQuote(productId){



const product =

shopState.products.find(

item =>

item.id === productId

);



if(!product){

return;

}





const message = `


Hello Nexpak Security Solutions.


I would like a quotation for:


Product:

${product.name}



Category:

${product.category}



Please send pricing and availability.



`;





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
// CART COMPATIBILITY LAYER
// ======================================================


function syncShopCart(){



if(

typeof getCartQuantity !== "function"

){

return;

}





const quantity =

getCartQuantity();





document

.querySelectorAll(
".cart-count"
)

.forEach(counter=>{


counter.textContent =

quantity;



});



}





// ======================================================
// PRODUCT IMAGE OPTIMIZATION
// ======================================================


function optimizeProductImages(){



document

.querySelectorAll(
".product-main-image"
)

.forEach(image=>{


image.loading =

"lazy";



image.decoding =

"async";



});



}





// ======================================================
// RECENT PRODUCTS DISPLAY
// ======================================================


function renderRecentlyViewed(){



const container =

document.querySelector(
".recent-products"
);



if(!container){

return;

}





let html = "";





shopState.viewed.forEach(id=>{


const product =

shopState.products.find(

item=>

item.id === id

);



if(product){



html += `


<div class="recent-item"


onclick="openQuickView('${product.id}')">


<img

src="${product.images[0]}"

>


<p>

${product.name}

</p>


</div>


`;



}



});





container.innerHTML = html;



}





// ======================================================
// PRODUCT URL HANDLER
// ======================================================


function checkProductURL(){



const params =

new URLSearchParams(

window.location.search

);



const id =

params.get(
"id"
);



if(id){


injectProductSchema(id);


openQuickView(id);


}



}





// ======================================================
// ERROR HANDLING
// ======================================================


window.addEventListener(

"error",

function(event){



console.warn(

"Nexpak Shop Error:",

event.message

);



}



);





// ======================================================
// FINAL SYSTEM CHECK
// ======================================================


function shopSystemCheck(){



console.log(

"%c================================",

"color:#00B4FF"

);



console.log(

"%cNEXPAK SECURITY SOLUTIONS V16",

"color:#00B4FF;font-size:20px;font-weight:bold"

);



console.log(

"Products:",

shopState.products.length

);





console.log(

"Wishlist:",

wishlist.length

);





console.log(

"Compare Items:",

compareProducts.length

);





console.log(

"Cart Engine:",

typeof addToCart === "function"

?

"CONNECTED"

:

"MISSING"

);





console.log(

"%cSHOP ENGINE READY",

"color:#00ff88;font-size:18px;font-weight:bold"

);



}





// ======================================================
// FINAL STARTUP
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


syncShopCart();


optimizeProductImages();


renderRecentlyViewed();


checkProductURL();


shopSystemCheck();



});





console.log(

"%cNEXPAK SHOP.JS V16 COMPLETE",

"color:#00B4FF;font-size:22px;font-weight:bold"

);
