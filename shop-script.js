/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16

 shop-script.js

 PART 1/5

 INITIALIZATION + GLOBAL ENGINE

=========================================================*/



document.addEventListener(

"DOMContentLoaded",

()=>{

initializeShop();

}

);





/*=========================================================
 GLOBAL VARIABLES
=========================================================*/

let shopProducts=[];

let filteredProducts=[];

let activeCategory="all";

let searchTerm="";

let currentSort="default";

let currentView=

localStorage.getItem(
"nexpak_shop_view"
)

||

"grid";





/*=========================================================
 INITIALIZE SHOP
=========================================================*/

function initializeShop(){



if(

typeof products==="undefined"

){

console.error(

"Nexpak Shop Database Missing."

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



initializeViewButtons();



loadURLFilters();



applyFilters();



console.log(

"V16 Shop Initialized"

);



}





/*=========================================================
 DATABASE VALIDATION
=========================================================*/

function validateShopDatabase(){



if(

!Array.isArray(shopProducts)

){

console.error(

"Invalid Product Database"

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



container.innerHTML="";



const categories=[

"all",

...new Set(

shopProducts.map(

product=>product.category

)

)

];



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



refreshCategoryButtons();



}





/*=========================================================
 FORMAT CATEGORY
=========================================================*/

function formatCategoryName(category){



if(category==="all"){

return"All Products";

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
 PRODUCT HELPERS
=========================================================*/

function isConfigurable(product){



return(

product.options &&

Object.keys(

product.options

).length>0

);



}



function hasExtras(product){



return(

Array.isArray(

product.extras

)

&&

product.extras.length>0

);



}



function getDisplayPrice(product){



if(

Number(product.basePrice)>0

){

return

"R"+

Number(

product.basePrice

).toLocaleString(

"en-ZA"

);

}



return"Request Quote";

}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16

 shop-script.js

 PART 2/5

 FILTERS • SEARCH • SORTING • VIEW

=========================================================*/





/*=========================================================
 INITIALIZE SHOP CONTROLS
=========================================================*/

function initializeShopControls(){



const searchInput=

document.getElementById(

"shopSearch"

);



if(searchInput){

searchInput.value=

searchTerm;



searchInput.addEventListener(

"input",

event=>{

searchTerm=

event.target.value

.toLowerCase()

.trim();



applyFilters();

}

);

}



/*-----------------------
CATEGORY BUTTONS
-----------------------*/

document

.querySelectorAll(

".category-button"

)

.forEach(button=>{

button.addEventListener(

"click",

()=>{

activeCategory=

button.dataset.category;



refreshCategoryButtons();



applyFilters();

}

);

});



}





/*=========================================================
 INITIALIZE SORTING
=========================================================*/

function initializeSorting(){



const sort=

document.getElementById(

"productSort"

);



if(!sort){

return;

}



sort.value=

currentSort;



sort.addEventListener(

"change",

()=>{

currentSort=

sort.value;

applyFilters();

}

);



}





/*=========================================================
 GRID / LIST VIEW
=========================================================*/

function initializeViewButtons(){



const grid=

document.getElementById(

"gridView"

);



const list=

document.getElementById(

"listView"

);



if(grid){

grid.addEventListener(

"click",

()=>{

setView(

"grid"

);

}

);

}



if(list){

list.addEventListener(

"click",

()=>{

setView(

"list"

);

}

);

}



setView(

currentView,

false

);



}





/*=========================================================
 SET VIEW
=========================================================*/

function setView(

view,

render=true

){



currentView=view;



localStorage.setItem(

"nexpak_shop_view",

view

);



const container=

document.getElementById(

"productsGrid"

);



if(container){

container.classList.remove(

"grid-view",

"list-view"

);



container.classList.add(

view+"-view"

);

}



const grid=

document.getElementById(

"gridView"

);

const list=

document.getElementById(

"listView"

);



if(grid){

grid.classList.toggle(

"active",

view==="grid"

);

}



if(list){

list.classList.toggle(

"active",

view==="list"

);

}



if(render){

renderProducts();

}



}





/*=========================================================
 APPLY FILTERS
=========================================================*/

function applyFilters(){



filteredProducts=

shopProducts.filter(product=>{



const categoryMatch=

activeCategory==="all"

||

product.category===

activeCategory;



const searchable=(

(product.name||"")

+" "+

(product.category||"")

+" "+

(product.description||"")

+" "+

(product.id||"")

)

.toLowerCase();



const searchMatch=

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



renderProducts();



saveShopState();



}





/*=========================================================
 SORT PRODUCTS
=========================================================*/

function sortProducts(

type="default",

render=true

){



switch(type){



case"name-a-z":

filteredProducts.sort(

(a,b)=>

a.name.localeCompare(

b.name

)

);

break;



case"name-z-a":

filteredProducts.sort(

(a,b)=>

b.name.localeCompare(

a.name

)

);

break;



case"price-low":

filteredProducts.sort(

(a,b)=>

Number(a.basePrice)

-

Number(b.basePrice)

);

break;



case"price-high":

filteredProducts.sort(

(a,b)=>

Number(b.basePrice)

-

Number(a.basePrice)

);

break;



default:

filteredProducts.sort(

(a,b)=>

a.name.localeCompare(

b.name

)

);

break;



}



currentSort=type;



if(render){

renderProducts();

}



}





/*=========================================================
 ACTIVE CATEGORY BUTTON
=========================================================*/

function refreshCategoryButtons(){



document

.querySelectorAll(

".category-button"

)

.forEach(button=>{



button.classList.toggle(

"active",

button.dataset.category===

activeCategory

);



});



}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16

 shop-script.js

 PART 3/5

 PRODUCT RENDERING ENGINE

=========================================================*/





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

<h2>No Products Found</h2>

<p>

Try another category or search term.

</p>

</div>

`;



updateProductCount(0);

return;

}



filteredProducts.forEach(product=>{

container.insertAdjacentHTML(

"beforeend",

createProductCard(product)

);

});



updateProductCount(

filteredProducts.length

);





}





/*=========================================================
 PRODUCT CARD
=========================================================*/

function createProductCard(product){



const configurable=

isConfigurable(product);



const extras=

hasExtras(product);



const price=

getDisplayPrice(product);



const image=

product.image ||

"images/product-placeholder.png";



return`

<div class="product-card">



<div class="product-image">



${product.featured ?

'<span class="badge featured">Featured</span>'

:

''}



${configurable ?

'<span class="badge configurable">Configurable</span>'

:

''}



${extras ?

'<span class="badge extras">Extras</span>'

:

''}



<img

src="${image}"

alt="${product.name}"

loading="lazy"

onerror="this.src='images/product-placeholder.png'"

>



</div>



<div class="product-content">



<div class="product-category">

${formatCategoryName(

product.category

)}

</div>



<h3 class="product-name">

${product.name}

</h3>



<p class="product-description">

${product.description}

</p>



<div class="product-price">

${price}

</div>



<div class="product-actions">



<a

href="products/product.html?id=${product.id}"

class="primary-btn"

>

${configurable ?

"Configure"

:

"View Product"}

</a>



<button

class="secondary-btn"

onclick="quickQuote('${product.id}')"

>

Request Quote

</button>



</div>



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

`${count} Products`;

}



}





/*=========================================================
 QUICK QUOTE
=========================================================*/

function quickQuote(id){



window.location.href=

`quote.html?product=${encodeURIComponent(id)}`;



}





/*=========================================================
 PRELOAD IMAGES
=========================================================*/

function preloadImages(){



filteredProducts

.slice(0,10)

.forEach(product=>{



const img=

new Image();



img.src=

product.image;



});



 }

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16

 shop-script.js

 PART 4/5

 URLS • STATE • STORAGE • HELPERS

=========================================================*/





/*=========================================================
 LOAD URL PARAMETERS
=========================================================*/

function loadURLFilters(){



const params=

new URLSearchParams(

window.location.search

);



const category=

params.get(

"category"

);



const search=

params.get(

"search"

);



const sort=

params.get(

"sort"

);



if(category){

activeCategory=

category;

}



if(search){

searchTerm=

search

.toLowerCase()

.trim();

}



if(sort){

currentSort=

sort;

}



}





/*=========================================================
 SAVE SHOP STATE
=========================================================*/

function saveShopState(){



const state={

category:

activeCategory,

search:

searchTerm,

sort:

currentSort,

view:

currentView

};



localStorage.setItem(

"nexpak_shop_state",

JSON.stringify(

state

)

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

JSON.parse(

saved

);



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



currentView=

state.view

||

"grid";



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

function openCategory(

category

){



window.location.href=

`shop.html?category=${encodeURIComponent(category)}`;



}





/*=========================================================
 SEARCH PRODUCTS
=========================================================*/

function searchProducts(

keyword

){



window.location.href=

`shop.html?search=${encodeURIComponent(keyword)}`;



}





/*=========================================================
 PRELOAD PRODUCT IMAGES
=========================================================*/

function preloadImages(){



filteredProducts

.slice(

0,

12

)

.forEach(product=>{



if(

!product.image

){

return;

}



const image=

new Image();



image.src=

product.image;



});



}





/*=========================================================
 REFRESH SHOP
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



setView(

currentView,

false

);



renderProducts();



}





/*=========================================================
 FEATURED PRODUCTS
=========================================================*/

function loadFeaturedProducts(){



const featured=

shopProducts.filter(

product=>

product.featured===true

);



if(

featured.length===0

){

return;

}



filteredProducts=[

...featured

];



renderProducts();



}





/*=========================================================
 CLEAR FILTERS
=========================================================*/

function clearFilters(){



activeCategory=

"all";



searchTerm="";



currentSort=

"default";



const input=

document.getElementById(

"shopSearch"

);



if(input){

input.value="";

}



const sort=

document.getElementById(

"productSort"

);



if(sort){

sort.value=

"default";

}



refreshCategoryButtons();



applyFilters();



}

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16

 shop-script.js

 PART 5/5

 CART + FINAL STARTUP

===========================================================

/*=========================================================
 ADD PRODUCT TO CART
=========================================================*/

function addProductToCart(productId){

    if(
        typeof window.addToCart !== "function"
    ){
        window.location.href =
        `products/product.html?id=${productId}`;
        return;
    }

    const product =
    shopProducts.find(
        item => item.id == productId
    );

    if(!product){
        return;
    }

    window.addToCart({
        id:product.id,
        name:product.name,
        image:product.image,
        price:product.basePrice,
        quantity:1
    });

}


/*=========================================================
 START SHOP
=========================================================*/

function startShop(){


    console.log(
        "Nexpak Security Solutions Shop V16 Loaded"
    );

}


/*=========================================================
 PUBLIC SHOP API
=========================================================*/

window.NexpakShop={

    filter(category){

        activeCategory=category;

        applyFilters();

    },

    search(keyword){

        searchTerm=
        (keyword||"")
        .toLowerCase()
        .trim();

        applyFilters();

    },

    sort(type){

        sortProducts(type);

    },

    clear(){

        activeCategory="all";

        searchTerm="";

        currentSort="default";

        refreshShop();

        applyFilters();

    },

    featured(){

        loadFeaturedProducts();

    },

    refresh(){

        refreshShop();

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

    startShop();

});


/*=========================================================
 VERSION INFO
=========================================================*/

console.info(
"=========================================="
);

console.info(
"NEXPAK SECURITY SOLUTIONS"
);

console.info(
"SHOP ENGINE V16"
);

console.info(
"STATUS : PRODUCTION READY"
);

console.info(
"=========================================="
);
