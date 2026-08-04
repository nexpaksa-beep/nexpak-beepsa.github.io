/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 1/5

 FINAL SHOP ENGINE

 CLEAN INITIALIZATION

=========================================================*/



document.addEventListener(
"DOMContentLoaded",
()=>{

initializeShop();

});





/*=========================================================
 GLOBAL VARIABLES
=========================================================*/


let shopProducts=[];

let filteredProducts=[];

let activeCategory="all";

let searchTerm="";

let currentSort="default";





/*=========================================================
 INITIALIZE SHOP
=========================================================*/


function initializeShop(){



if(

typeof products==="undefined"

){

console.error(

"Product database missing."

);

return;

}



shopProducts=[...products];

filteredProducts=[...shopProducts];



if(

!validateShopDatabase()

){

return;

}



restoreShopState();



generateCategories();



initializeShopControls();



initializeSorting();



loadURLFilters();



applyFilters();



}





/*=========================================================
 DATABASE VALIDATION
=========================================================*/


function validateShopDatabase(){



if(

!Array.isArray(shopProducts)

){

console.error(

"Invalid shop database."

);

return false;

}



return true;

}





/*=========================================================
 CATEGORY GENERATOR
=========================================================*/


function generateCategories(){



const container=

document.getElementById(

"categoryFilters"

);



if(!container){

return;

}



const categories=[

"all",

...new Set(

shopProducts.map(

product=>product.category

)

)

];



container.innerHTML="";



categories.forEach(category=>{



const button=

document.createElement(

"button"

);



button.className=

"category-button";



button.dataset.category=

category;



button.textContent=

formatCategoryName(

category

);



container.appendChild(

button

);



});



}





/*=========================================================
 CATEGORY FORMATTER
=========================================================*/


function formatCategoryName(category){



if(category==="all"){

return "All Products";

}



return category

.replace(

/-/g,

" "

)

.replace(

/\b\w/g,

letter=>letter.toUpperCase()

);


}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 2/5

 FILTER + SEARCH ENGINE

 FEATURES:

 - Live Search
 - Category Filtering
 - Combined Filters
 - Active Button State

=========================================================*/





/*=========================================================
 INITIALIZE SHOP CONTROLS
=========================================================*/


function initializeShopControls(){



const searchInput =

document.getElementById(
"shopSearch"
);



if(searchInput){

searchInput.value = searchTerm;



searchInput.addEventListener(
"input",
(event)=>{

searchTerm =

event.target.value

.toLowerCase()

.trim();



applyFilters();

});

}



const categoryButtons =

document.querySelectorAll(
".category-button"
);



categoryButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

activeCategory =

button.dataset.category;



setActiveCategoryButton(
button
);



applyFilters();

});

});

}





/*=========================================================
 APPLY FILTERS
=========================================================*/


function applyFilters(){



filteredProducts =

shopProducts.filter(product=>{



/*-----------------------------
 CATEGORY FILTER
-----------------------------*/

const categoryMatch =

activeCategory==="all"

||

product.category===activeCategory;





/*-----------------------------
 SEARCH FILTER
-----------------------------*/

const searchable =

(

(product.name || "")

+

" "

+

(product.category || "")

+

" "

+

(product.description || "")

)

.toLowerCase();



const searchMatch =

searchable.includes(
searchTerm
);





return(

categoryMatch

&&

searchMatch

);



});



sortProducts(
currentSort,
false
);



saveShopState();



}





/*=========================================================
 ACTIVE CATEGORY BUTTON
=========================================================*/


function setActiveCategoryButton(

activeButton

){



document

.querySelectorAll(
".category-button"
)

.forEach(button=>{

button.classList.remove(
"active"
);

});



activeButton.classList.add(
"active"
);



}





/*=========================================================
 UPDATE ACTIVE BUTTON
=========================================================*/


function refreshCategoryButtons(){



const button =

document.querySelector(

`[data-category="${activeCategory}"]`

);



if(button){

setActiveCategoryButton(
button
);

}



}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 3/5

 SORTING + PRODUCT RENDERING

 FEATURES:

 - Product sorting
 - Product rendering
 - Product cards
 - Featured badges
 - Product counter

=========================================================*/





/*=========================================================
 SORT PRODUCTS
=========================================================*/


function sortProducts(

sortType = "default",

render = true

){

currentSort = sortType;



switch(sortType){



case "price-low":

filteredProducts.sort(

(a,b)=>

Number(a.basePrice)-Number(b.basePrice)

);

break;





case "price-high":

filteredProducts.sort(

(a,b)=>

Number(b.basePrice)-Number(a.basePrice)

);

break;





case "name-a-z":

filteredProducts.sort(

(a,b)=>

a.name.localeCompare(b.name)

);

break;





case "name-z-a":

filteredProducts.sort(

(a,b)=>

b.name.localeCompare(a.name)

);

break;





default:

break;

}



if(render){

renderProducts();

}

}





/*=========================================================
 INITIALIZE SORTING
=========================================================*/


function initializeSorting(){



const sortSelect=

document.getElementById(

"productSort"

);



if(!sortSelect){

return;

}



sortSelect.value=currentSort;



sortSelect.addEventListener(

"change",

()=>{

sortProducts(

sortSelect.value

);

}

);



}





/*=========================================================
 RENDER PRODUCTS
=========================================================*/


function renderProducts(){



const container=

document.getElementById(

"productsGrid"

);



if(!container){

return;

}



container.innerHTML="";



if(filteredProducts.length===0){



container.innerHTML=`

<div class="empty-products">

<i class="fa-solid fa-box-open"></i>

<h3>

No Products Found

</h3>

<p>

Try changing your search or category.

</p>

</div>

`;



updateProductCount(0);

return;

}



filteredProducts.forEach(product=>{

container.innerHTML+=

createProductCard(product);

});



updateProductCount(

filteredProducts.length

);



}





/*=========================================================
 PRODUCT CARD
=========================================================*/


function createProductCard(product){



const configurable =

product.options

&&

product.options.length>0;



const extras =

product.extras

&&

product.extras.length>0;



return `

<div class="product-card">

${configurable ?

'<span class="product-badge">Configurable</span>'

:

''

}

${extras ?

'<span class="product-badge extra">Extras Available</span>'

:

''

}

<a href="product.html?id=${product.id}">

<img

src="${product.image}"

alt="${product.name}"

loading="lazy"

onerror="this.src='images/product-placeholder.png'"

>

</a>

<div class="product-content">

<div class="product-category">

${formatCategoryName(product.category)}

</div>

<h3>

${product.name}

</h3>

<p>

${product.description}

</p>

<div class="product-price">

Starting From

<strong>

R${Number(product.basePrice).toLocaleString("en-ZA")}

</strong>

</div>

<a

href="product.html?id=${product.id}"

class="primary-btn">

Configure / View

</a>

</div>

</div>

`;

}





/*=========================================================
 PRODUCT COUNTER
=========================================================*/


function updateProductCount(count){



const counter=

document.getElementById(

"productCount"

);



if(counter){

counter.textContent=

`${count} Security Products`;

}



 }

 /*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 4/5

 URL HANDLING + SHOP STATE

 FEATURES:

 - URL Parameters
 - Category Links
 - Search Links
 - Local Storage
 - Performance Helpers

=========================================================*/





/*=========================================================
 LOAD URL PARAMETERS
=========================================================*/


function loadURLFilters(){



const params =

new URLSearchParams(

window.location.search

);



const category =

params.get("category");

const search =

params.get("search");



if(category){

activeCategory = category;

}



if(search){

searchTerm =

search

.toLowerCase()

.trim();

}



}





/*=========================================================
 SAVE SHOP STATE
=========================================================*/


function saveShopState(){



const state={

category:activeCategory,

search:searchTerm,

sort:currentSort

};



localStorage.setItem(

"nexpak_shop_state",

JSON.stringify(state)

);



}





/*=========================================================
 RESTORE SHOP STATE
=========================================================*/


function restoreShopState(){



const saved=

localStorage.getItem(

"nexpak_shop_state"

);



if(!saved){

return;

}



try{

const state=

JSON.parse(saved);



activeCategory=

state.category

||

"all";



searchTerm=

state.search

||

"";



currentSort=

state.sort

||

"default";



}

catch(error){

console.error(

"Unable to restore shop state.",

error

);

}



}





/*=========================================================
 OPEN CATEGORY
=========================================================*/


function openCategory(category){



window.location.href=

`shop.html?category=${encodeURIComponent(category)}`;



}





/*=========================================================
 SEARCH PAGE
=========================================================*/


function searchProducts(keyword){



window.location.href=

`shop.html?search=${encodeURIComponent(keyword)}`;



}





/*=========================================================
 PRELOAD PRODUCT IMAGES
=========================================================*/


function preloadImages(){



filteredProducts

.slice(0,8)

.forEach(product=>{

const image=

new Image();

image.src=

product.image;

});

}





/*=========================================================
 REFRESH SHOP DISPLAY
=========================================================*/


function refreshShop(){



refreshCategoryButtons();



const searchInput=

document.getElementById(

"shopSearch"

);



if(searchInput){

searchInput.value=

searchTerm;

}



const sortSelect=

document.getElementById(

"productSort"

);



if(sortSelect){

sortSelect.value=

currentSort;

}



renderProducts();



preloadImages();



}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 5/5

 FINAL SHOP ENGINE

 FEATURES:

 - Shop Startup
 - Public API
 - Featured Products
 - Global Functions
 - Final Initialization

=========================================================*/





/*=========================================================
 LOAD FEATURED PRODUCTS
=========================================================*/


function loadFeaturedProducts(){



const featured =

shopProducts.filter(

product => product.featured === true

);



if(featured.length){

filteredProducts = [...featured];

renderProducts();

}

}





/*=========================================================
 START SHOP
=========================================================*/


function startShopV15(){



refreshShop();



console.log(

"Nexpak Security Solutions V15 Shop Engine Loaded"

);



}





/*=========================================================
 PUBLIC SHOP API
=========================================================*/


window.NexpakShop = {



filter(category){

activeCategory = category;

applyFilters();

},



search(keyword){

searchTerm =

(keyword || "")

.toLowerCase()

.trim();

applyFilters();

},



sort(type){

sortProducts(type);

},



clearFilters(){

activeCategory = "all";

searchTerm = "";

currentSort = "default";



refreshShop();

applyFilters();

},



showFeatured(){

loadFeaturedProducts();

},



reload(){

initializeShop();

}



};





/*=========================================================
 FINAL STARTUP
=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{

startShopV15();

}

);





/*=========================================================
 VERSION INFORMATION
=========================================================*/

console.info(

"==================================================="

);

console.info(

"NEXPAK SECURITY SOLUTIONS"

);

console.info(

"SHOP ENGINE V15"

);

console.info(

"STATUS : COMPLETE"

);

console.info(

"==================================================="

);
