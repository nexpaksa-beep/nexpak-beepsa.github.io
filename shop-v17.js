/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 1

 CORE SHOP ENGINE
 INITIALIZATION + DATABASE CONNECTION
=========================================================*/


"use strict";



// ======================================================
// GLOBAL SHOP VARIABLES
// ======================================================


let shopProducts = [];

let displayedProducts = [];

let activeCategory = "all";

let activeSearch = "";

let activeSort = "default";





// ======================================================
// INITIALIZE SHOP
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


initializeShop();


}

);





function initializeShop(){



if(!window.NexpakShop){


console.error(

"Nexpak Shop Data Not Loaded"

);


return;


}




shopProducts =

window.NexpakShop.products;



displayedProducts =

[...shopProducts];




console.log(

"Nexpak V17 Shop Engine Started"

);



console.log(

"Products Available:",

shopProducts.length

);





loadShopInterface();



}





// ======================================================
// LOAD SHOP INTERFACE
// ======================================================


function loadShopInterface(){



renderProducts();



loadCategories();



updateShopCounters();



}





// ======================================================
// PRODUCT GRID LOADER
// ======================================================


function renderProducts(){



const container =

document.querySelector(

"#productGrid"

);



if(!container){



console.warn(

"Product grid not found"

);



return;


}





container.innerHTML="";




if(displayedProducts.length===0){



container.innerHTML=`

<div class="empty-products">

<h3>No products found</h3>

<p>
Try another search or category.
</p>

</div>

`;



return;


}





displayedProducts.forEach(product=>{



container.innerHTML +=

createProductCard(product);



});



}





// ======================================================
// BASIC PRODUCT CARD
// ======================================================


function createProductCard(product){



return `


<div class="product-card"

data-id="${product.id}">


<div class="product-image">


<img src="${product.image}"

alt="${product.name}">


<span class="product-badge">

${product.badge || ""}

</span>


</div>



<div class="product-content">


<h3>

${product.name}

</h3>



<p class="product-category">

${product.category}

</p>



<p class="product-description">

${product.shortDescription || product.description}

</p>



<div class="product-price">


${
product.basePrice > 0

?

"NexpakShop.config.currencySymbol

"+product.basePrice

:

"Request Quote"

}


</div>



<button

class="view-product"

data-id="${product.id}">

View Product

</button>



</div>


</div>


`;

}





// ======================================================
// CATEGORY LOADER
// ======================================================


function loadCategories(){



const categoryBox =

document.querySelector(

"#categoryList"

);



if(!categoryBox){


return;


}




categoryBox.innerHTML="";




window.NexpakShop.categories

.forEach(category=>{



categoryBox.innerHTML += `


<button

class="category-btn"

data-category="${category.id}">


${category.icon}

${category.name}


</button>


`;



});



}





// ======================================================
// SHOP COUNTERS
// ======================================================


function updateShopCounters(){



const count =

document.querySelector(

"#productCount"

);



if(count){



count.textContent =

shopProducts.length;


}



}





console.log(

"shop-v17.js PART 1 loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 2

 SEARCH • FILTER • SORT ENGINE
=========================================================*/



// ======================================================
// INITIALIZE SEARCH CONTROLS
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


initializeSearchControls();


}

);





function initializeSearchControls(){



const searchInput =

document.querySelector(

"#shopSearch"

);



if(searchInput){



searchInput.addEventListener(

"input",

(e)=>{


activeSearch =

e.target.value.toLowerCase();



applyFilters();



}


);


}




const sortSelect =

document.querySelector(

"#sortProducts"

);



if(sortSelect){



sortSelect.addEventListener(

"change",

(e)=>{


activeSort = e.target.value;


applyFilters();



}

);


}




document.addEventListener(

"click",

(e)=>{



if(e.target.classList.contains(

"category-btn"

)){



activeCategory =

e.target.dataset.category;



applyFilters();



}


});


}





// ======================================================
// APPLY ALL FILTERS
// ======================================================


function applyFilters(){



let results =

[...shopProducts];





// SEARCH FILTER


if(activeSearch){



results = results.filter(product=>{



let text = [



product.name,


product.category,


product.description,


(product.keywords || []).join(" ")



]

.join(" ")

.toLowerCase();




return text.includes(

activeSearch

);



});



}





// CATEGORY FILTER


if(

activeCategory &&

activeCategory !== "all"

){



results = results.filter(product=>{



return product.category

.toLowerCase()

.includes(

activeCategory

.toLowerCase()

);



});



}





// SORT FILTER


results =

sortProducts(

results,

activeSort

);





displayedProducts = results;



renderProducts();



updateResultCount();



}





// ======================================================
// SORTING ENGINE
// ======================================================


function sortProducts(list, method){



let sorted =

[...list];



switch(method){



case "name":


sorted.sort(

(a,b)=>

a.name.localeCompare(b.name)

);


break;





case "price-low":


sorted.sort(

(a,b)=>

(a.basePrice || 0)

-

(b.basePrice || 0)

);


break;





case "price-high":


sorted.sort(

(a,b)=>

(b.basePrice || 0)

-

(a.basePrice || 0)

);


break;





case "popular":


sorted.sort(

(a,b)=>

(b.rating || 0)

-

(a.rating || 0)

);


break;



default:


break;



}



return sorted;


}





// ======================================================
// RESULT COUNTER
// ======================================================


function updateResultCount(){



const count =

document.querySelector(

"#productCount"

);



if(count){



count.textContent =

displayedProducts.length;



}



}





// ======================================================
// CLEAR SEARCH
// ======================================================


function clearShopSearch(){



activeSearch="";



const input =

document.querySelector(

"#shopSearch"

);



if(input){


input.value="";


}



applyFilters();


}





console.log(

"shop-v17.js PART 2 Search Engine Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 3

 PRODUCT CARD ACTIONS ENGINE
 CART • WISHLIST • COMPARE • QUICK VIEW
=========================================================*/



// ======================================================
// PRODUCT CARD CLICK EVENTS
// ======================================================


document.addEventListener(

"click",

(e)=>{



// ADD TO CART


if(

e.target.classList.contains(

"add-cart"

)

){



let id =

e.target.dataset.id;



addProductToCart(id);



}





// WISHLIST


if(

e.target.classList.contains(

"wishlist-btn"

)

){



let id =

e.target.dataset.id;



toggleProductWishlist(id);



}





// COMPARE


if(

e.target.classList.contains(

"compare-btn"

)

){



let id =

e.target.dataset.id;



compareProduct(id);



}





// QUICK VIEW


if(

e.target.classList.contains(

"quick-view"

)

){



let id =

e.target.dataset.id;



openQuickView(id);



}



});





// ======================================================
// ADD PRODUCT TO CART
// ======================================================


function addProductToCart(productID){



if(

!window.NexpakShop.storage

){


console.error(

"Cart engine unavailable"

);


return;


}




window.NexpakShop.storage.cart.add(

productID,

1

);



updateCartCount();



showNotification(

"Product added to cart"

);



}





// ======================================================
// CART COUNT UPDATE
// ======================================================


function updateCartCount(){



let countElement =

document.querySelector(

"#cartCount"

);



if(!countElement){

return;

}



let cart =

window.NexpakShop.storage.cart.get();



let total = 0;



cart.forEach(item=>{


total += item.quantity;


});



countElement.textContent = total;



}





// ======================================================
// WISHLIST CONTROL
// ======================================================


function toggleProductWishlist(productID){



window.NexpakShop.storage.wishlist.toggle(

productID

);



showNotification(

"Wishlist updated"

);


}





// ======================================================
// COMPARE CONTROL
// ======================================================


function compareProduct(productID){



let compare =

window.NexpakShop.storage.compare.add(

productID

);



if(compare.length >= 4){



showNotification(

"Maximum 4 products can be compared"

);



}

else{


showNotification(

"Added to comparison"

);


}



}





// ======================================================
// QUICK VIEW WINDOW
// ======================================================


function openQuickView(productID){



let product =

window.NexpakShop.display.quickView(

productID

);



if(!product){

return;

}




let modal =

document.querySelector(

"#quickViewModal"

);



if(!modal){



console.warn(

"Quick view modal missing"

);



return;


}





modal.innerHTML = `



<div class="quick-view-box">


<button class="close-quick">

✕

</button>



<img src="${product.image}"

alt="${product.name}">



<h2>

${product.name}

</h2>



<p>

${product.description}

</p>



<h3>


${
product.basePrice > 0

?

"R"+product.basePrice

:

"Request Quote"

}


</h3>



<button

class="add-cart"

data-id="${product.id}">


Add To Cart


</button>



</div>


`;



modal.classList.add(

"active"

);



}





// ======================================================
// CLOSE QUICK VIEW
// ======================================================


document.addEventListener(

"click",

(e)=>{



if(

e.target.classList.contains(

"close-quick"

)

){



document

.querySelector(

"#quickViewModal"

)

.classList.remove(

"active"

);



}



});





// ======================================================
// USER NOTIFICATION
// ======================================================


function showNotification(message){



let toast =

document.querySelector(

"#shopToast"

);



if(!toast){



console.log(message);


return;


}




toast.textContent = message;


toast.classList.add(

"active"

);



setTimeout(()=>{


toast.classList.remove(

"active"

);



},2500);



}





console.log(

"shop-v17.js PART 3 Product Actions Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 4

 CART DRAWER ENGINE
 MINI CART • QUANTITY • REMOVE • SUMMARY
=========================================================*/



// ======================================================
// INITIALIZE CART
// ======================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


initializeCart();


}

);





function initializeCart(){


updateCartCount();


renderCart();



}





// ======================================================
// OPEN CART DRAWER
// ======================================================


function openCart(){



const drawer =

document.querySelector(

"#cartDrawer"

);



if(drawer){



drawer.classList.add(

"active"

);



renderCart();



}



}





// ======================================================
// CLOSE CART DRAWER
// ======================================================


function closeCart(){



const drawer =

document.querySelector(

"#cartDrawer"

);



if(drawer){



drawer.classList.remove(

"active"

);



}



}





// ======================================================
// CART BUTTON EVENTS
// ======================================================


document.addEventListener(

"click",

(e)=>{



if(

e.target.closest(

".cart-icon"

)

){



openCart();


}





if(

e.target.classList.contains(

"close-cart"

)

){



closeCart();


}





if(

e.target.classList.contains(

"remove-cart-item"

)

){



removeCartItem(

e.target.dataset.id

);


}





if(

e.target.classList.contains(

"qty-plus"

)

){



changeCartQuantity(

e.target.dataset.id,

1

);


}





if(

e.target.classList.contains(

"qty-minus"

)

){



changeCartQuantity(

e.target.dataset.id,

-1

);


}



});





// ======================================================
// RENDER CART
// ======================================================


function renderCart(){



const container =

document.querySelector(

"#cartItems"

);



if(!container){

return;

}





let cart =

window.NexpakShop.storage.cart.get();





if(cart.length===0){



container.innerHTML=`

<div class="empty-cart">


<h3>Your cart is empty</h3>


<p>

Add security products to get started.

</p>


</div>

`;



updateCartSummary();


return;


}





container.innerHTML="";




cart.forEach(item=>{



let product =

shopProducts.find(product=>{


return product.id===item.id;


});





if(!product){

return;

}





container.innerHTML += `


<div class="cart-item">


<img src="${product.image}"

alt="${product.name}">



<div class="cart-item-info">


<h4>

${product.name}

</h4>



<div class="quantity-controls">


<button

class="qty-minus"

data-id="${product.id}">

-

</button>



<span>

${item.quantity}

</span>



<button

class="qty-plus"

data-id="${product.id}">

+

</button>


</div>



</div>



<button

class="remove-cart-item"

data-id="${product.id}">

✕

</button>



</div>


`;



});





updateCartSummary();



}





// ======================================================
// CHANGE QUANTITY
// ======================================================


function changeCartQuantity(productID, amount){



let cart =

window.NexpakShop.storage.cart.get();




let item =

cart.find(item=>{


return item.id===productID;


});




if(item){



item.quantity += amount;



if(item.quantity <=0){


item.quantity=1;


}



window.NexpakShop.storage.cart.update(

productID,

item.quantity

);



}





renderCart();


updateCartCount();



}





// ======================================================
// REMOVE ITEM
// ======================================================


function removeCartItem(productID){



window.NexpakShop.storage.cart.remove(

productID

);



renderCart();


updateCartCount();



}





// ======================================================
// CART SUMMARY
// ======================================================


function updateCartSummary(){



const totalBox =

document.querySelector(

"#cartTotal"

);



if(!totalBox){

return;

}





let total =

window.NexpakShop.storage.cart.total();



totalBox.textContent =

"R" +

total.toLocaleString();



}





// ======================================================
// CHECKOUT BUTTON
// ======================================================


document.addEventListener(

"click",

(e)=>{



if(

e.target.classList.contains(

"checkout-btn"

)

){



window.location.href=

"checkout.html";



}



});





console.log(

"shop-v17.js PART 4 Cart Drawer Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 5

 WISHLIST PANEL
 COMPARE PANEL
=========================================================*/



// ======================================================
// INITIALIZE PANELS
// ======================================================

document.addEventListener(

"DOMContentLoaded",

()=>{

renderWishlist();

renderCompare();

}

);




// ======================================================
// WISHLIST
// ======================================================

function renderWishlist(){

const container =
document.querySelector("#wishlistItems");

if(!container) return;

const wishlist =
window.NexpakShop.storage.wishlist.get();

if(wishlist.length===0){

container.innerHTML=`

<div class="empty-state">

<h3>Your wishlist is empty</h3>

<p>Save products to view them later.</p>

</div>

`;

return;

}

container.innerHTML="";

wishlist.forEach(id=>{

const product =
shopProducts.find(p=>p.id===id);

if(!product) return;

container.innerHTML+=`

<div class="wishlist-item">

<img src="${product.image}" alt="${product.name}">

<div class="wishlist-info">

<h4>${product.name}</h4>

<p>${product.category}</p>

</div>

<div class="wishlist-actions">

<button
class="add-cart"
data-id="${product.id}">

Add To Cart

</button>

<button
class="remove-wishlist"
data-id="${product.id}">

Remove

</button>

</div>

</div>

`;

});

}




// ======================================================
// REMOVE WISHLIST ITEM
// ======================================================

function removeWishlistItem(productID){

window.NexpakShop.storage.wishlist.toggle(productID);

renderWishlist();

showNotification("Removed from wishlist");

}




// ======================================================
// COMPARE PANEL
// ======================================================

function renderCompare(){

const container =
document.querySelector("#compareItems");

if(!container) return;

const compare =
window.NexpakShop.storage.compare.get();

if(compare.length===0){

container.innerHTML=`

<div class="empty-state">

<h3>No products selected</h3>

<p>Select products to compare.</p>

</div>

`;

return;

}

container.innerHTML="";

compare.forEach(id=>{

const product =
shopProducts.find(p=>p.id===id);

if(!product) return;

container.innerHTML+=`

<div class="compare-item">

<img src="${product.image}" alt="${product.name}">

<h4>${product.name}</h4>

<p>${product.category}</p>

<p>

${product.basePrice>0

?

"R"+product.basePrice

:

"Request Quote"

}

</p>

<button
class="remove-compare"
data-id="${product.id}">

Remove

</button>

</div>

`;

});

}




// ======================================================
// REMOVE COMPARE ITEM
// ======================================================

function removeCompareItem(productID){

window.NexpakShop.storage.compare.remove(productID);

renderCompare();

showNotification("Removed from comparison");

}




// ======================================================
// PANEL EVENTS
// ======================================================

document.addEventListener(

"click",

(e)=>{

if(e.target.classList.contains("remove-wishlist")){

removeWishlistItem(

e.target.dataset.id

);

}

if(e.target.classList.contains("remove-compare")){

removeCompareItem(

e.target.dataset.id

);

}

if(e.target.classList.contains("wishlist-icon")){

document
.querySelector("#wishlistPanel")
?.classList.add("active");

renderWishlist();

}

if(e.target.classList.contains("compare-icon")){

document
.querySelector("#comparePanel")
?.classList.add("active");

renderCompare();

}

if(e.target.classList.contains("close-wishlist")){

document
.querySelector("#wishlistPanel")
?.classList.remove("active");

}

if(e.target.classList.contains("close-compare")){

document
.querySelector("#comparePanel")
?.classList.remove("active");

}

});



console.log(

"shop-v17.js PART 5 Wishlist & Compare Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 6

 QUICK VIEW
 PRODUCT GALLERY
 RELATED PRODUCTS
=========================================================*/



// ======================================================
// OPEN PRODUCT DETAILS
// ======================================================

function openProduct(productID){

const product =
shopProducts.find(p=>p.id===productID);

if(!product){

console.warn("Product not found");

return;

}

renderQuickView(product);

}





// ======================================================
// QUICK VIEW WINDOW
// ======================================================

function renderQuickView(product){

const modal =
document.querySelector("#quickViewModal");

if(!modal){

return;

}

modal.innerHTML = `

<div class="quick-view-window">

<button
class="close-quick-view">

✕

</button>

<div class="quick-view-gallery">

<img

id="mainProductImage"

src="${product.image}"

alt="${product.name}">

<div
class="gallery-thumbnails">

${createGallery(product)}

</div>

</div>

<div class="quick-view-details">

<span class="product-category">

${product.category}

</span>

<h2>

${product.name}

</h2>

<p>

${product.description}

</p>

<div class="quick-view-price">

${product.basePrice>0

?

"R"+product.basePrice.toLocaleString()

:

"Request Quote"

}

</div>

<div class="quick-view-actions">

<button
class="add-cart"
data-id="${product.id}">

Add To Cart

</button>

<button
class="wishlist-btn"
data-id="${product.id}">

❤ Wishlist

</button>

<button
class="compare-btn"
data-id="${product.id}">

⚖ Compare

</button>

</div>

</div>

</div>

`;

modal.classList.add("active");

renderRelatedProducts(product);

}





// ======================================================
// IMAGE GALLERY
// ======================================================

function createGallery(product){

if(!product.gallery){

return "";

}

return product.gallery.map(image=>`

<img

class="gallery-thumb"

src="${image}"

data-image="${image}"

alt="${product.name}">

`).join("");

}





// ======================================================
// CHANGE MAIN IMAGE
// ======================================================

function changeGalleryImage(image){

const main =

document.querySelector("#mainProductImage");

if(main){

main.src=image;

}

}





// ======================================================
// RELATED PRODUCTS
// ======================================================

function renderRelatedProducts(product){

const container =

document.querySelector("#relatedProducts");

if(!container){

return;

}

const related =

shopProducts

.filter(item=>

item.category===product.category &&

item.id!==product.id

)

.slice(0,4);

container.innerHTML="";

related.forEach(item=>{

container.innerHTML+=createProductCard(item);

});

}





// ======================================================
// QUICK VIEW EVENTS
// ======================================================

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("view-product")){

openProduct(

e.target.dataset.id

);

}

if(e.target.classList.contains("close-quick-view")){

document

.querySelector("#quickViewModal")

?.classList.remove("active");

}

if(e.target.classList.contains("gallery-thumb")){

changeGalleryImage(

e.target.dataset.image

);

}

});



console.log(

"shop-v17.js PART 6 Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 7

 SMART MARKETPLACE ENGINE
 SEARCH SUGGESTIONS
 RECENTLY VIEWED
 FEATURED PRODUCTS
 FLASH DEALS
=========================================================*/



// ======================================================
// RECENTLY VIEWED
// ======================================================

const RECENT_STORAGE_KEY =
"nexpak_recent_v17";



function addRecentlyViewed(productID){

let recent =

JSON.parse(

localStorage.getItem(
RECENT_STORAGE_KEY
)

|| "[]");

recent = recent.filter(id=>id!==productID);

recent.unshift(productID);

recent = recent.slice(0,8);

localStorage.setItem(

RECENT_STORAGE_KEY,

JSON.stringify(recent)

);

}



function getRecentlyViewed(){

const ids =

JSON.parse(

localStorage.getItem(
RECENT_STORAGE_KEY
)

|| "[]");

return ids.map(id=>

shopProducts.find(p=>p.id===id)

).filter(Boolean);

}





// ======================================================
// SEARCH SUGGESTIONS
// ======================================================

function getSearchSuggestions(term){

if(!term || term.length<2){

return [];

}

term = term.toLowerCase();

return shopProducts

.filter(product=>{

return (

product.name.toLowerCase().includes(term) ||

product.category.toLowerCase().includes(term)

);

})

.slice(0,8);

}





function renderSearchSuggestions(term){

const box =

document.querySelector(

"#searchSuggestions"

);

if(!box){

return;

}

const results =

getSearchSuggestions(term);

if(results.length===0){

box.innerHTML="";

box.classList.remove("active");

return;

}

box.innerHTML = results.map(product=>`

<div

class="search-suggestion"

data-id="${product.id}">

<img

src="${product.image}"

alt="${product.name}">

<div>

<strong>${product.name}</strong>

<p>${product.category}</p>

</div>

</div>

`).join("");

box.classList.add("active");

}





// ======================================================
// FEATURED PRODUCTS
// ======================================================

function renderFeaturedProducts(){

const container =

document.querySelector(

"#featuredProducts"

);

if(!container){

return;

}

const featured =

shopProducts.filter(product=>

product.featured ||

(product.flags && product.flags.featured)

);

container.innerHTML="";

featured.forEach(product=>{

container.innerHTML +=

createProductCard(product);

});

}





// ======================================================
// FLASH DEALS
// ======================================================

function renderFlashDeals(){

const container =

document.querySelector(

"#flashDeals"

);

if(!container){

return;

}

const deals =

shopProducts.filter(product=>

product.deal ||

(product.flags && product.flags.deal)

);

container.innerHTML="";

deals.forEach(product=>{

container.innerHTML +=

createProductCard(product);

});

}





// ======================================================
// RECENTLY VIEWED DISPLAY
// ======================================================

function renderRecentlyViewed(){

const container =

document.querySelector(

"#recentProducts"

);

if(!container){

return;

}

const recent =

getRecentlyViewed();

container.innerHTML="";

recent.forEach(product=>{

container.innerHTML +=

createProductCard(product);

});

}





// ======================================================
// SHOP DASHBOARD REFRESH
// ======================================================

function refreshMarketplace(){

renderFeaturedProducts();

renderFlashDeals();

renderRecentlyViewed();

}



console.log(

"shop-v17.js PART 7 Marketplace Engine Loaded"

);

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V17

 shop-v17.js

 PART 8

 FINAL ENGINE
 PERFORMANCE
 UTILITIES
=========================================================*/



// ======================================================
// INITIALIZE ENHANCEMENTS
// ======================================================

function initializeShopEnhancements(){

initializeBackToTop();

initializeNewsletter();

initializeLazyImages();

refreshMarketplace();

}





// ======================================================
// BACK TO TOP
// ======================================================

function initializeBackToTop(){

const button =
document.querySelector("#backTop");

if(!button){

return;

}

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

button.classList.add("active");

}

else{

button.classList.remove("active");

}

});

button.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}





// ======================================================
// NEWSLETTER
// ======================================================

function initializeNewsletter(){

const form =

document.querySelector("#newsletterForm");

if(!form){

return;

}

form.addEventListener("submit",(event)=>{

event.preventDefault();

const email =

form.querySelector("input[type='email']");

if(!email || !email.value.trim()){

showNotification("Please enter your email address.");

return;

}

showNotification("Thank you for subscribing!");

form.reset();

});

}





// ======================================================
// LAZY LOAD IMAGES
// ======================================================

function initializeLazyImages(){

if(!("IntersectionObserver" in window)){

return;

}

const images =

document.querySelectorAll("img[data-src]");

const observer =

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting){

return;

}

const image = entry.target;

image.src = image.dataset.src;

image.removeAttribute("data-src");

observer.unobserve(image);

});

});

images.forEach(image=>{

observer.observe(image);

});

}





// ======================================================
// LOAD MORE PRODUCTS
// ======================================================

function loadMoreProducts(count=12){

const nextProducts =

shopProducts.slice(

displayedProducts.length,

displayedProducts.length+count

);

displayedProducts =

displayedProducts.concat(nextProducts);

renderProducts();

}





// ======================================================
// PERFORMANCE HELPERS
// ======================================================

function debounce(callback,delay=300){

let timer;

return function(...args){

clearTimeout(timer);

timer = setTimeout(()=>{

callback.apply(this,args);

},delay);

};

}





// ======================================================
// SHOP SUMMARY
// ======================================================

function getShopSummary(){

return{

products:shopProducts.length,

displayed:displayedProducts.length,

cartItems:

window.NexpakShop.storage.cart.get().length,

wishlistItems:

window.NexpakShop.storage.wishlist.get().length,

compareItems:

window.NexpakShop.storage.compare.get().length

};

}





// ======================================================
// DEBUG INFO
// ======================================================

console.table(getShopSummary());

console.log(

"NEXPAK SECURITY SOLUTIONS V17",

"Shop Engine Ready"

);
