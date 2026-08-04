/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 seo-schema.js

 PART 1/5

 SEO SCHEMA ENGINE CORE

 FEATURES:

 - Schema initialization
 - Organization schema
 - LocalBusiness foundation
 - JSON-LD injection system

========================================================= */





/*=========================================================
 NEXPAK SEO CONFIGURATION
=========================================================*/


const NexpakSEO = {


companyName:

"Nexpak Security Solutions",



website:

window.location.origin,



logo:

"images/logo.png",



description:

"Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control and security solutions.",



phone:

"082 000 0000",



email:

"sales@nexpak.co.za",



country:

"South Africa"


};







/*=========================================================
 SCHEMA INJECTION ENGINE
=========================================================*/


function injectSchema(schema){



const script =

document.createElement(
"script"
);



script.type =

"application/ld+json";



script.textContent =

JSON.stringify(
schema,
null,
2
);



document.head.appendChild(
script
);



}







/*=========================================================
 ORGANIZATION SCHEMA
=========================================================*/


function createOrganizationSchema(){



return {


"@context":

"https://schema.org",



"@type":

"Organization",



"name":

NexpakSEO.companyName,



"url":

NexpakSEO.website,



"logo":

NexpakSEO.logo,



"description":

NexpakSEO.description,



"contactPoint":{


"@type":

"ContactPoint",



"telephone":

NexpakSEO.phone,



"contactType":

"customer service",



"email":

NexpakSEO.email


}



};



}







/*=========================================================
 LOCAL BUSINESS SCHEMA
=========================================================*/


function createLocalBusinessSchema(){



return {


"@context":

"https://schema.org",



"@type":

"SecuritySystemSupplier",



"name":

NexpakSEO.companyName,



"description":

NexpakSEO.description,



"url":

NexpakSEO.website,



"telephone":

NexpakSEO.phone,



"email":

NexpakSEO.email,



"areaServed":{


"@type":

"Country",



"name":

NexpakSEO.country



}



};



}






/*=========================================================
 INITIAL SEO LOAD
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


injectSchema(
createOrganizationSchema()
);



injectSchema(
createLocalBusinessSchema()
);



});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 seo-schema.js

 PART 2/5

 PRODUCT SCHEMA ENGINE

 FEATURES:

 - Dynamic product schema
 - Connects with shop-data.js
 - Generates Google Product structured data
 - Supports pricing
 - Supports categories
 - Supports availability

========================================================= */





/*=========================================================
 CREATE PRODUCT SCHEMA
=========================================================*/


function createProductSchema(product){



return {


"@context":

"https://schema.org",



"@type":

"Product",



"name":

product.name,



"description":

product.description,



"image":

product.image,



"category":

product.category,



"brand":{


"@type":

"Brand",



"name":

"Nexpak Security Solutions"



},



"offers":{


"@type":

"Offer",



"url":

window.location.origin +

"/product.html?id=" +

product.id,



"priceCurrency":

"ZAR",



"price":

Number(
product.basePrice
).toFixed(2),



"availability":

"https://schema.org/InStock"



}



};



}







/*=========================================================
 LOAD CURRENT PRODUCT SCHEMA
=========================================================*/


function loadProductSchema(){



const params =

new URLSearchParams(
window.location.search
);



const productID =

params.get(
"id"
);





if(
!productID
){

return;

}






if(
typeof products === "undefined"
){


console.warn(
"Product database not available."
);


return;


}






const product =

products.find(
item =>

item.id == productID

);





if(
!product
){

return;

}






injectSchema(

createProductSchema(
product
)

);



}








/*=========================================================
 LOAD ALL SHOP PRODUCTS SCHEMA
=========================================================*/


function loadShopProductSchemas(){



if(
typeof products === "undefined"
){

return;

}





products.forEach(
product=>{


injectSchema(

createProductSchema(
product
)

);



});



}







/*=========================================================
 PRODUCT SCHEMA START
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{



if(
window.location.pathname.includes(
"product.html"
)

){


loadProductSchema();



}





if(
window.location.pathname.includes(
"shop.html"
)

){


loadShopProductSchemas();



}



});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 seo-schema.js

 PART 3/5

 FAQ + SERVICE SCHEMA ENGINE

 FEATURES:

 - FAQ structured data
 - Security service schema
 - CCTV services
 - Electric fencing
 - Gate automation
 - Alarm systems
 - Access control

========================================================= */





/*=========================================================
 FAQ DATABASE
=========================================================*/


const nexpakFAQs = [



{


question:

"What security solutions does Nexpak Security Solutions provide?",



answer:

"Nexpak Security Solutions supplies CCTV systems, electric fencing, alarms, gate automation, access control, intercom systems and security accessories."

},



{


question:

"Do you provide CCTV security systems?",



answer:

"Yes. Nexpak Security Solutions provides CCTV solutions including security cameras, IP CCTV systems and recording solutions for homes and businesses."

},



{


question:

"Do you supply electric fencing systems?",



answer:

"Yes. We supply electric fencing solutions including energizers, brackets, fencing accessories and complete security perimeter solutions."

},



{


question:

"Can Nexpak assist with gate automation and access control?",



answer:

"Yes. Nexpak supplies gate motors, access control devices and intercom systems for residential and commercial properties."

}



];







/*=========================================================
 CREATE FAQ SCHEMA
=========================================================*/


function createFAQSchema(){



return {


"@context":

"https://schema.org",



"@type":

"FAQPage",



"mainEntity":

nexpakFAQs.map(
(faq)=>{


return {


"@type":

"Question",



"name":

faq.question,



"acceptedAnswer":{


"@type":

"Answer",



"text":

faq.answer



}



};



})



};



}








/*=========================================================
 SERVICE SCHEMA
=========================================================*/


function createServiceSchema(){



return {


"@context":

"https://schema.org",



"@type":

"Service",



"name":

"Security Solutions",



"provider":{


"@type":

"Organization",



"name":

"Nexpak Security Solutions"



},



"serviceType":[


"CCTV Systems",


"IP CCTV",


"Electric Fencing",


"Gate Automation",


"Alarm Systems",


"Access Control",


"Intercom Systems",


"Security Accessories"


],



"areaServed":{


"@type":

"Country",



"name":

"South Africa"


}



};



}








/*=========================================================
 LOAD FAQ + SERVICE SCHEMA
=========================================================*/


function loadFAQAndServiceSchema(){



injectSchema(

createFAQSchema()

);



injectSchema(

createServiceSchema()

);



}







document.addEventListener(
"DOMContentLoaded",
()=>{


loadFAQAndServiceSchema();



});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 seo-schema.js

 PART 4/5

 BREADCRUMB + WEBSITE SCHEMA ENGINE

 FEATURES:

 - Breadcrumb structured data
 - Website schema
 - SearchAction support
 - Better Google navigation signals

========================================================= */





/*=========================================================
 CREATE BREADCRUMB SCHEMA
=========================================================*/


function createBreadcrumbSchema(){



const path =

window.location.pathname
.split("/")
.filter(
item=>item
);




let breadcrumbs = [];



let currentURL =

window.location.origin;





breadcrumbs.push({


"@type":

"ListItem",



"position":

1,



"name":

"Home",



"item":

window.location.origin +

"/"


});





path.forEach(
(part,index)=>{


let cleanName =

part

.replace(
".html",
""
)

.replace(
"-",
" "
)

.replace(
/\b\w/g,
letter=>

letter.toUpperCase()

);





currentURL +=

"/" +

part;






breadcrumbs.push({


"@type":

"ListItem",



"position":

index + 2,



"name":

cleanName,



"item":

currentURL



});





});





return {


"@context":

"https://schema.org",



"@type":

"BreadcrumbList",



"itemListElement":

breadcrumbs



};



}







/*=========================================================
 WEBSITE SCHEMA
=========================================================*/


function createWebsiteSchema(){



return {


"@context":

"https://schema.org",



"@type":

"WebSite",



"name":

NexpakSEO.companyName,



"url":

NexpakSEO.website,



"potentialAction":{


"@type":

"SearchAction",



"target":

NexpakSEO.website +

"/shop.html?search={search_term_string}",



"query-input":

"required name=search_term_string"



}



};



}







/*=========================================================
 PAGE TYPE DETECTION
=========================================================*/


function loadNavigationSchemas(){



injectSchema(

createBreadcrumbSchema()

);



injectSchema(

createWebsiteSchema()

);



}







/*=========================================================
 INITIALIZE NAVIGATION SCHEMA
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


loadNavigationSchemas();



});

/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15

 seo-schema.js

 PART 5/5

 FINAL SEO ENGINE INTEGRATION

 FEATURES:

 - Duplicate schema protection
 - Page optimization hooks
 - Global SEO controller
 - Final initialization

========================================================= */





/*=========================================================
 SCHEMA DUPLICATE PROTECTION
=========================================================*/


const loadedSchemas = [];





function injectSchema(schema){



const schemaString =

JSON.stringify(
schema
);





if(
loadedSchemas.includes(
schemaString
)

){


return;


}





loadedSchemas.push(
schemaString
);





const script =

document.createElement(
"script"
);



script.type =

"application/ld+json";



script.textContent =

JSON.stringify(
schema,
null,
2
);



document.head.appendChild(
script
);



}







/*=========================================================
 SEO PAGE CONTROLLER
=========================================================*/


function initializeSEOEngine(){



console.log(
"Nexpak SEO Schema V15 Loaded"
);





const page =

window.location.pathname;





/*

All pages:

- Organization
- LocalBusiness
- Website
- Breadcrumb


*/



injectSchema(
createOrganizationSchema()
);



injectSchema(
createLocalBusinessSchema()
);



injectSchema(
createWebsiteSchema()
);



injectSchema(
createBreadcrumbSchema()
);







/*

Product pages:

product.html?id=

*/


if(
page.includes(
"product.html"
)

){


loadProductSchema();



}







/*

Shop page:

shop.html

*/


if(
page.includes(
"shop.html"
)

){


loadShopProductSchemas();



}







/*

FAQ and services:

*/


loadFAQAndServiceSchema();





}







/*=========================================================
 SEO PAGE META HELPERS
=========================================================*/


function updateSEOMeta(
title,
description
){



document.title =

title;





let meta =

document.querySelector(
'meta[name="description"]'
);





if(meta){


meta.content =

description;


}



}








/*=========================================================
 GLOBAL SEO OBJECT
=========================================================*/


window.NexpakSEOEngine = {



load:

initializeSEOEngine,



product:

createProductSchema,



faq:

createFAQSchema,



service:

createServiceSchema,



breadcrumb:

createBreadcrumbSchema



};








/*=========================================================
 START ENGINE
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


initializeSEOEngine();



});
