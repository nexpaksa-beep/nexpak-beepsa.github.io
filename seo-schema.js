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

"Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control,security solutions, installations, products we supply are jva,stafix,nemtek,nice,ajax, roboguard, electric fencing,alarm systems,gate automation,online store, equestrian online store gor all horse fencing products in benoni,east rand, Johannesburg.",
"centurion smart series gate motors, vantage smart swing gate,D5 smart,Dahua cameras,ids alarms,ajax hub 2,D10 smart,jva energizers,tape-joiners,tape buckles,40mm horse tape, electric fencing kits,dvr,nvr,ip cameras,indoor pir,outdoor pir, roboguard wireless beams affordable pricing,buy online, delivery in 2 to 3 working days,custom quotations,build your system online, electric fencing advanced training course online, technical support,benoni, Boksburg,springs, Kempton park, Edenvale, Germiston, Sandton,birchliegh, Johannesburg",


phone:

"083 630 8249",



email:

"info@nexpaksolutions.co.za",
 "nexpaksa@outlook.com",



country:

 "benoni","Boksburg ","Kempton park","Germiston","Edenvale","Gauteng",

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

NexpaksecuritySEO.companyName,



"url":

NexpaksolutionsSEO.website,



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

"SecuritySystemSupplier","online-store", "installation of security",



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

"Brand","Centurion","Dahua","jva","stafix","ajax","cctv","gate-motors","electric fencing",



"name":

"Nexpak Security Solutions"



},



"offers":{


"@type":

"Offer",



"url":

window.location.origin +

"/online.html?id=" +

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
typeof products === "cctv","ip","gate-motors","alarms","electric fencing","equestrian","dog electric collar",
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
product,"centurion","dahua","Hikvision","ajax","ids","paradox","nice et","stafix","jva","nemtek"
)

);



}








/*=========================================================
 LOAD ALL SHOP PRODUCTS SCHEMA
=========================================================*/


function loadShopProductSchemas(){



if(
typeof products === "security-products"
){

return;

}





products.forEach(
product=>{


injectSchema(

createProductSchema(
"security","cctv","gate-motors","alarms","electric-fencing"
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
"index.html"
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

"Nexpak Security Solutions supplies CCTV systems, electric fencing, alarms, gate automation, access control, intercom systems, security accessories,online equestrian store, online security store, online electric fencing training,build your system."

},



{


question:

"Do you provide CCTV security systems?",



answer:

"Yes. Nexpak Security Solutions provides CCTV solutions including security cameras, IP CCTV systems and recording solutions for homes and businesses by top brands dahua and Hikvision"

},



{


question:

"Do you supply electric fencing systems?",



answer:

"Yes. We supply electric fencing solutions including energizers, brackets, fencing accessories and complete security perimeter solutions,6 line,8line,10 line and 12 line electric fencing kits with jva or nemtek energizers,we supply full range of equestrian horse paddock products from tape joiners,buckles,gate handles, intermediate insulators,40mm horse tape, politapes,solar energizers the jva mb and sv range and we do installations including advanced security solutions"

},



{


question:

"Can Nexpak assist with gate automation and access control?",



answer:

"Yes. Nexpak supplies gate motors, access control devices and intercom systems for residential and commercial properties,only top brands like centurion D3,D5,D10 smart gate motors,swing gate vantage smart,sdo smart garage motors"

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
"index.html",
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

"www.nexpaksolutions.co.za" +

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
"product.html","index.html","equestrian.html","online.html","shop.html"
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
