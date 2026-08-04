```javascript
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 1/5

 SHOP ENGINE INITIALIZATION

 FEATURES:

 - Load product database
 - Initialize shop
 - Prepare filters
 - Prepare search
 - Prepare sorting

========================================================= */



document.addEventListener(
"DOMContentLoaded",
()=>{


initializeShop();


});





/*=========================================================
 GLOBAL SHOP VARIABLES
=========================================================*/


let shopProducts = [];

let filteredProducts = [];

let currentCategory = "all";

let currentSearch = "";

let currentSort = "default";





/*=========================================================
 INITIALIZE SHOP
=========================================================*/


function initializeShop(){



if(typeof products === "undefined"){


console.error(
"Nexpak shop database not loaded."
);


return;


}



shopProducts = products;



filteredProducts = [...shopProducts];



createCategoryFilters();


setupSearch();


setupSorting();


renderProducts();



}





/*=========================================================
 CATEGORY FILTER SETUP
=========================================================*/


function createCategoryFilters(){



const categoryContainer =

document.getElementById(
"categoryFilters"
);



if(!categoryContainer){

return;

}



let categories = [

"all",

...new Set(

shopProducts.map(

product=>product.category

)

)

];





categoryContainer.innerHTML = "";





categories.forEach(category=>{


const button =

document.createElement(
"button"
);



button.className =
"category-btn";



button.textContent =

category === "all"

?

"All Products"

:

formatCategory(category);





button.dataset.category =
category;





button.addEventListener(
"click",
()=>{


currentCategory =
category;


filterProducts();


});


categoryContainer.appendChild(
button
);



});



}





/*=========================================================
 CATEGORY NAME FORMATTER
=========================================================*/


function formatCategory(text){


return text

.replace(
"-",
" "
)

.replace(
/\b\w/g,
letter=>letter.toUpperCase()

);


}

```javascript
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 2/5

 FILTER + SEARCH ENGINE

 FEATURES:

 - Category filtering
 - Product searching
 - Live search
 - Database filtering

========================================================= */





/*=========================================================
 INITIALIZE SHOP CONTROLS
=========================================================*/


function initializeShopControls(){



const searchInput = document.getElementById(
"shopSearch"
);



if(searchInput){


searchInput.addEventListener(
"input",
(event)=>{


searchTerm = event.target.value
.toLowerCase()
.trim();



applyFilters();



});


}






const categoryButtons =

document.querySelectorAll(
"[data-category]"
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
 APPLY ALL FILTERS
=========================================================*/


function applyFilters(){



let results = [...shopProducts];





/*=========================================================
 CATEGORY FILTER
=========================================================*/


if(
activeCategory !== "all"
){


results = results.filter(
(product)=>{


return (

product.category
&&

product.category
.toLowerCase()

===

activeCategory
.toLowerCase()


);



});


}





/*=========================================================
 SEARCH FILTER
=========================================================*/


if(searchTerm){


results = results.filter(
(product)=>{


const searchable =


(

product.name

+

" "

+

product.category

+

" "

+

product.description

)

.toLowerCase();




return searchable.includes(
searchTerm
);



});


}





filteredProducts = results;



renderProducts(
filteredProducts
);



}





/*=========================================================
 CATEGORY BUTTON STATE
=========================================================*/


function setActiveCategoryButton(
activeButton
){



const buttons =

document.querySelectorAll(
"[data-category]"
);



buttons.forEach(button=>{


button.classList.remove(
"active"
);


});




activeButton.classList.add(
"active"
);



}





/*=========================================================
 CATEGORY LIST GENERATOR
=========================================================*/


function generateCategories(){



const categoryContainer =

document.getElementById(
"categoryFilters"
);



if(!categoryContainer){

return;

}




let categories = [

"all"

];




shopProducts.forEach(product=>{


if(
product.category
&&

!categories.includes(
product.category
)

){


categories.push(
product.category
);


}


});





categoryContainer.innerHTML = "";





categories.forEach(category=>{



categoryContainer.innerHTML += `


<button

data-category="${category}"

class="category-button"


>


${formatCategoryName(category)}


</button>


`;



});





initializeShopControls();



}





/*=========================================================
 CATEGORY NAME FORMATTER
=========================================================*/


function formatCategoryName(
category
){


if(
category === "all"
){


return "All Products";


}



return category

.replace(
"-",
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

 PART 3/5

 SORTING ENGINE + PRODUCT CARD ENHANCEMENTS

 FEATURES:

 - Price sorting
 - Name sorting
 - Featured products
 - Configurator badges
 - Product category display

========================================================= */





/*=========================================================
 SORT PRODUCTS
=========================================================*/


function sortProducts(sortType){



let results = [...filteredProducts];





switch(sortType){



case "price-low":


results.sort(
(a,b)=>


Number(a.basePrice)

-

Number(b.basePrice)


);


break;





case "price-high":


results.sort(
(a,b)=>


Number(b.basePrice)

-

Number(a.basePrice)


);


break;





case "name-a-z":


results.sort(
(a,b)=>

a.name.localeCompare(
b.name
)

);


break;





case "name-z-a":


results.sort(
(a,b)=>

b.name.localeCompare(
a.name
)

);


break;





default:


break;



}





renderProducts(
results
);



}





/*=========================================================
 SORT CONTROL
=========================================================*/


function initializeSorting(){



const sortSelect =

document.getElementById(
"productSort"
);




if(!sortSelect){

return;

}





sortSelect.addEventListener(
"change",
()=>{


sortProducts(
sortSelect.value
);



});



}





/*=========================================================
 ENHANCED PRODUCT CARD
=========================================================*/


function createProductCard(product){



let badge = "";




if(
product.options
&&

product.options.length > 0

){


badge = `

<span class="product-badge">

Configurable

</span>

`;


}




if(
product.extras
&&

product.extras.length > 0

){


badge += `

<span class="product-badge extra">

Extras Available

</span>

`;



}





return `


<div class="product-card">


${badge}





<a href="product.html?id=${product.id}">


<img

src="${product.image}"

alt="${product.name}"

loading="lazy"


>



<h3>

${product.name}

</h3>


</a>





<div class="product-category">


${formatCategoryName(
product.category
)}


</div>






<p>

${product.description}

</p>






<div class="product-price">


Starting From


<strong>

R${Number(
product.basePrice
).toFixed(2)}

</strong>



</div>







<a

href="product.html?id=${product.id}"

class="product-button"


>


Configure / View


</a>





</div>


`;



}





/*=========================================================
 FEATURED PRODUCTS
=========================================================*/


function loadFeaturedProducts(){



const featured =

shopProducts.filter(
product=>

product.featured === true

);





if(
featured.length
){


renderProducts(
featured
);


}



}





/*=========================================================
 START SORTING AFTER SHOP LOAD
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


initializeSorting();


});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 4/5

 SHOP URL HANDLING + PERFORMANCE

 FEATURES:

 - Category URL parameters
 - Search URL parameters
 - Product count
 - Lazy loading support
 - Empty state improvements

========================================================= */





/*=========================================================
 LOAD URL FILTERS
=========================================================*/


function loadURLFilters(){



const params =

new URLSearchParams(
window.location.search
);





const category =

params.get(
"category"
);





const search =

params.get(
"search"
);





if(category){


activeCategory =
category;



}





if(search){


searchTerm =

search.toLowerCase();


const input =

document.getElementById(
"shopSearch"
);



if(input){

input.value =
search;


}



}





applyFilters();



}





/*=========================================================
 PRODUCT COUNT DISPLAY
=========================================================*/


function updateProductCount(
count
){



const counter =

document.getElementById(
"productCount"
);




if(counter){


counter.textContent =

count +

" security products found";


}



}





/*=========================================================
 UPDATE RENDER FUNCTION
=========================================================*/


const originalRenderProducts = renderProducts;




renderProducts = function(
productList
){



originalRenderProducts(
productList
);



updateProductCount(
productList.length
);



};





/*=========================================================
 CATEGORY LINK HANDLER
=========================================================*/


function openCategory(
category
){



window.location.href =

"shop.html?category=" +

encodeURIComponent(
category
);



}





/*=========================================================
 SEARCH LINK HANDLER
=========================================================*/


function searchProducts(
keyword
){



window.location.href =

"shop.html?search=" +

encodeURIComponent(
keyword
);



}





/*=========================================================
 IMAGE ERROR PROTECTION
=========================================================*/


document.addEventListener(
"error",
function(event){



if(
event.target.tagName === "IMG"
){



event.target.src =

"images/product-placeholder.png";



}



},
true
);





/*=========================================================
 INITIALIZE URL FEATURES
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


loadURLFilters();


});

```javascript
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 shop-script.js

 PART 5/5

 FINAL SHOP ENGINE INTEGRATION

 FEATURES:

 - Complete initialization
 - Database validation
 - Category generation
 - Sorting activation
 - Shop state saving
 - Public functions

========================================================= */





/*=========================================================
 DATABASE VALIDATION
=========================================================*/


function validateShopDatabase(){



if(
!Array.isArray(shopProducts)
){


console.error(
"Nexpak shop database format invalid."
);



return false;


}




return true;



}





/*=========================================================
 SAVE SHOP STATE
=========================================================*/


function saveShopState(){



const state = {


category:

activeCategory,



search:

searchTerm



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



const saved =

localStorage.getItem(
"nexpak_shop_state"
);




if(
!saved
){

return;

}



try{


const state =

JSON.parse(
saved
);




if(
state.category
){


activeCategory =

state.category;


}





if(
state.search
){


searchTerm =

state.search;


}




}

catch(error){


console.error(
"Shop state restore failed",
error
);


}



}





/*=========================================================
 COMPLETE SHOP STARTUP
=========================================================*/


function startShopV15(){



if(
!validateShopDatabase()
){

return;

}




restoreShopState();



generateCategories();



applyFilters();



}





/*=========================================================
 UPDATE STATE AFTER FILTERING
=========================================================*/


const originalApplyFilters = applyFilters;




applyFilters = function(){



originalApplyFilters();



saveShopState();



};





/*=========================================================
 GLOBAL SHOP FUNCTIONS

 AVAILABLE FOR HTML BUTTONS

=========================================================*/


window.NexpakShop = {


filter:

function(category){


activeCategory = category;


applyFilters();


},




search:

function(keyword){


searchTerm =

keyword
.toLowerCase();


applyFilters();


},





sort:

function(type){


sortProducts(type);


},




category:

openCategory,




searchPage:

searchProducts



};





/*=========================================================
 FINAL INITIALIZATION
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


startShopV15();



});
