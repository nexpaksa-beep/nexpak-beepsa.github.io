// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// product.js
// PART 1/4
//
// PRODUCT PAGE CONTROLLER
// =========================================================



document.addEventListener(

"DOMContentLoaded",

initializeProductPage

);





// =========================================================
// GLOBAL VARIABLES
// =========================================================


let pageProduct = null;





// =========================================================
// INITIALIZE PRODUCT PAGE
// =========================================================


function initializeProductPage(){


const params =

new URLSearchParams(
window.location.search
);



const productId =

params.get("id");



if(!productId){


console.error(
"No product ID found."
);


showProductError();


return;


}





pageProduct =

findProduct(productId);





if(!pageProduct){


console.error(
"Product not found:",
productId
);



showProductError();



return;


}





loadProductData();


updatePageSEO();


createProductBreadcrumb();



}





// =========================================================
// FIND PRODUCT
// =========================================================


function findProduct(id){


if(
typeof products === "undefined"
){


console.error(
"shop-data.js not loaded."
);



return null;


}



return products.find(

product =>

product.id === id

);



}





// =========================================================
// LOAD BASIC PRODUCT DATA
// =========================================================


function loadProductData(){


const title =

document.querySelector(
".product-title"
);



const description =

document.querySelector(
".product-description"
);



const image =

document.querySelector(
".product-image"
);





if(title){


title.textContent =

pageProduct.name;


}





if(description){


description.textContent =

pageProduct.description;


}





if(image){


image.src =

pageProduct.image;


image.alt =

pageProduct.name;


}





}





// =========================================================
// PRODUCT ERROR
// =========================================================


function showProductError(){


const container =

document.querySelector(
".product-container"
);



if(container){


container.innerHTML = `

<div class="product-error">


<h2>
Product Not Found
</h2>


<p>
Please return to our shop and select a security solution.
</p>


<a href="../shop.html">

Back To Shop

</a>


</div>

`;


}



}





console.log(

"%cNEXPAK PRODUCT.JS V15 PART 1 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// product.js
// PART 2/4
//
// SEO UPDATE
// BREADCRUMBS
// PRODUCT CATEGORY DATA
// PRODUCT BADGES
// =========================================================




// =========================================================
// UPDATE PAGE SEO
// =========================================================


function updatePageSEO(){


if(!pageProduct){

return;

}





document.title =

pageProduct.name

+

" | Nexpak Security Solutions";





const metaDescription =

document.querySelector(

'meta[name="description"]'

);





if(metaDescription){


metaDescription.setAttribute(

"content",

pageProduct.description

+

" Professional security solutions from Nexpak Security Solutions."

);



}





// UPDATE CANONICAL PRODUCT DATA


const canonical =

document.querySelector(

'link[rel="canonical"]'

);



if(canonical){


canonical.href =

window.location.href;


}



}





// =========================================================
// CREATE PRODUCT BREADCRUMB
// =========================================================


function createProductBreadcrumb(){


const breadcrumb =

document.querySelector(

".breadcrumb"

);



if(!breadcrumb || !pageProduct){

return;

}





breadcrumb.innerHTML = `


<a href="../index.html">

Home

</a>


<span>

/

</span>


<a href="../shop.html">

Shop

</a>


<span>

/

</span>


<span>

${pageProduct.category}

</span>


<span>

/

</span>


<strong>

${pageProduct.name}

</strong>


`;



}





// =========================================================
// LOAD CATEGORY INFORMATION
// =========================================================


function loadCategoryData(){


const categoryBox =

document.querySelector(

".product-category"

);



if(!categoryBox || !pageProduct){

return;

}





categoryBox.textContent =

pageProduct.category;



}





// =========================================================
// PRODUCT BADGES
// =========================================================


function createProductBadge(){


const badgeContainer =

document.querySelector(

".product-badges"

);



if(!badgeContainer || !pageProduct){

return;

}





let badge = "";





switch(
pageProduct.category
){



case "CCTV":


badge =

"📹 CCTV Security";


break;




case "Electric Fencing":


badge =

"⚡ Electric Fence";


break;




case "Gate Automation":


badge =

"🚪 Gate Security";


break;




case "Alarm Systems":


badge =

"🚨 Alarm Protection";


break;




case "Outdoor Security":


badge =

"🛡️ Perimeter Security";


break;




case "Access Control":


badge =

"🔐 Access Control";


break;




default:


badge =

"Security Solution";



}





badgeContainer.innerHTML = `


<span class="product-badge">

${badge}

</span>


`;



}





// =========================================================
// LOAD PRODUCT FEATURES
// =========================================================


function loadProductFeatures(){


const featureList =

document.querySelector(

".product-features"

);



if(
!featureList ||

!pageProduct

){

return;

}





featureList.innerHTML = "";





let features = [];





if(pageProduct.options){


features.push(

"Custom configuration available"

);


}





if(pageProduct.extras){


features.push(

"Additional accessories available"

);


}





features.push(

"Professional security equipment"

);



features.forEach(

feature=>{


featureList.innerHTML += `


<li>

<i class="fas fa-check-circle"></i>

${feature}

</li>


`;



}

);



}





// =========================================================
// AUTO LOAD PRODUCT INFORMATION
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(()=>{


loadCategoryData();


createProductBadge();


loadProductFeatures();


},200);



});





console.log(

"%cNEXPAK PRODUCT.JS V15 PART 2 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// product.js
// PART 3/4
//
// IMAGE GALLERY
// RELATED PRODUCTS
// CATEGORY NAVIGATION
// PRODUCT SHARING
// =========================================================




// =========================================================
// CREATE PRODUCT GALLERY
// =========================================================


function createProductGallery(){


const gallery =

document.querySelector(

".product-gallery"

);



if(
!gallery ||

!pageProduct

){

return;

}





let images = [];





// MAIN IMAGE

if(
pageProduct.image
){

images.push(
pageProduct.image
);

}





// ADD FUTURE PRODUCT IMAGES


if(
pageProduct.images

&&

Array.isArray(
pageProduct.images
)

){


images =

images.concat(
pageProduct.images
);


}





gallery.innerHTML = "";





// MAIN DISPLAY IMAGE


gallery.innerHTML += `


<img

class="product-image"

src="${images[0]}"

alt="${pageProduct.name}"

>


`;





// THUMBNAILS


if(
images.length > 1
){


gallery.innerHTML += `


<div class="image-thumbnails">


${

images.map(

image =>

`

<img

class="thumbnail"

src="${image}"

onclick="changeProductImage('${image}')"

alt="${pageProduct.name}"

>


`

).join("")

}


</div>


`;



}



}





// =========================================================
// LOAD RELATED PRODUCTS
// =========================================================


function loadProductRelated(){


const container =

document.getElementById(

"related-products"

);



if(
!container ||

!pageProduct

){

return;

}





container.innerHTML = "";





const related =

products

.filter(

product =>


product.category ===

pageProduct.category


&&


product.id !==

pageProduct.id


)

.slice(
0,
4
);





if(
related.length === 0
){


container.innerHTML = `


<p>

No related products available.

</p>


`;



return;

}





related.forEach(

product=>{


container.innerHTML += `


<div class="related-product">


<img

src="${product.image}"

alt="${product.name}"

>


<h3>

${product.name}

</h3>


<p>

${product.description}

</p>


<a href="product.html?id=${product.id}">

View Product

</a>


</div>


`;



}

);



}





// =========================================================
// CATEGORY PRODUCT LINKS
// =========================================================


function loadCategoryProducts(){


const categoryLinks =

document.querySelectorAll(

".category-link"

);



categoryLinks.forEach(

link=>{


link.addEventListener(

"click",

()=>{


window.location =

"../shop.html?category="

+

encodeURIComponent(
pageProduct.category
);



}

);



}

);



}





// =========================================================
// SHARE PRODUCT
// =========================================================


function shareProduct(){


if(
!pageProduct
){

return;

}





const shareData = {


title:

pageProduct.name,


text:

pageProduct.description,


url:

window.location.href



};





if(
navigator.share
){


navigator.share(
shareData
);



}

else{


navigator.clipboard.writeText(

window.location.href

);



alert(

"Product link copied."

);



}



}





// =========================================================
// PRINT PRODUCT PAGE
// =========================================================


function printProduct(){


window.print();



}





// =========================================================
// INITIALIZE PRODUCT EXTRAS
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(()=>{


createProductGallery();


loadProductRelated();


loadCategoryProducts();


},500);



});





console.log(

"%cNEXPAK PRODUCT.JS V15 PART 3 READY",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// product.js
// PART 4/4
//
// FINAL CONTROLLER
// CART SYNC
// CONFIGURATOR SUPPORT
// PERFORMANCE
// =========================================================





// =========================================================
// CHECK CONFIGURATOR STATUS
// =========================================================


function checkConfigurator(){


if(
typeof createConfigurationSelectors !== "function"
){


console.warn(

"Configurator engine not loaded."

);


return false;


}



return true;



}





// =========================================================
// INITIALIZE CONFIGURATION LINK
// =========================================================


function initializeConfiguration(){


if(
!pageProduct
){

return;

}





if(
checkConfigurator()
){


console.log(

"Configurator connected:",

pageProduct.name

);



}





}





// =========================================================
// CART BUTTON PROTECTION
// =========================================================


function validateCartAccess(){


if(
typeof addConfiguredProduct !== "function"
){


alert(

"Configuration system is loading. Please wait."

);


return false;


}



return true;



}





// =========================================================
// SAFE ADD TO CART
// =========================================================


function safeAddToCart(){


if(
!validateCartAccess()
){

return;

}





addConfiguredProduct();



}





// =========================================================
// PRODUCT URL GENERATOR
// =========================================================


function getProductURL(){


return window.location.origin

+

window.location.pathname

+

"?id="

+

pageProduct.id;



}





// =========================================================
// UPDATE SOCIAL META TAGS
// =========================================================


function updateSocialMeta(){


if(
!pageProduct
){

return;

}





const ogTitle =

document.querySelector(

'meta[property="og:title"]'

);



const ogDescription =

document.querySelector(

'meta[property="og:description"]'

);



const ogImage =

document.querySelector(

'meta[property="og:image"]'

);





if(ogTitle){


ogTitle.content =

pageProduct.name;


}





if(ogDescription){


ogDescription.content =

pageProduct.description;


}





if(ogImage){


ogImage.content =

pageProduct.image;


}





}





// =========================================================
// LAZY LOAD IMAGES
// =========================================================


function enableLazyLoading(){


document

.querySelectorAll(

"img"

)

.forEach(

image=>{


image.loading =

"lazy";


}

);



}





// =========================================================
// FINAL PRODUCT INITIALIZATION
// =========================================================


function finalizeProductPage(){


if(
!pageProduct
){

return;

}





updateSocialMeta();



enableLazyLoading();



initializeConfiguration();





if(
typeof updateCartCounter === "function"
){


updateCartCounter();


}





console.log(

"Product page ready:",

pageProduct.name

);



}





// =========================================================
// START ENGINE
// =========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


setTimeout(()=>{


finalizeProductPage();


},800);



});





console.log(

"%cNEXPAK PRODUCT.JS V15 COMPLETE",

"color:#00B4FF;font-size:18px;font-weight:bold;"

);
