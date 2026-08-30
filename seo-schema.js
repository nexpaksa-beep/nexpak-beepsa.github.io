/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15 - OPTIMIZED & CORRECTED
 seo-schema.js
=========================================================*/

/*=========================================================
 NEXPAK SEO CONFIGURATION
=========================================================*/
const NexpakSEO = {
    companyName: "Nexpak Security Solutions",
    website: window.location.origin,
    logo: "images/logo.png",
    description: "Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control, and equestrian fencing products in Benoni, East Rand, and Johannesburg.",
    keywords: [
        "cctv systems benoni", "centurion gate motors benoni", "electric fencing east rand", 
        "dahua cameras johannesburg", "ajax alarm systems south africa", "jva energizers benoni", 
        "security equipment supplier boksburg", "kempton park security solutions", "springs electric fencing", 
        "edenvale cctv installation", "germiston gate automation", "ds smart gate motor", "vantage smart swing gate",
        "ids alarms", "roboguard wireless beams", "equestrian horse tape benoni", "solar energizers south africa"
    ],
    phone: "083 630 8249",
    email: "info@nexpaksolutions.co.za",
    serviceAreas: ["Benoni", "Boksburg", "Kempton Park", "Springs", "Edenvale", "Germiston", "Johannesburg", "Gauteng"],
    country: "South Africa"
};

/*=========================================================
 SCHEMA INJECTION ENGINE (Duplicate Protection Included)
=========================================================*/
const loadedSchemas = [];

function injectSchema(schema) {
    const schemaString = JSON.stringify(schema);
    if (loadedSchemas.includes(schemaString)) {
        return;
    }
    loadedSchemas.push(schemaString);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
}

/*=========================================================
 ORGANIZATION SCHEMA
=========================================================*/
function createOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": NexpakSEO.companyName,
        "url": NexpakSEO.website,
        "logo": NexpakSEO.logo,
        "description": NexpakSEO.description,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": NexpakSEO.phone,
            "contactType": "customer service",
            "email": NexpakSEO.email
        }
    };
}

/*=========================================================
 LOCAL BUSINESS SCHEMA
=========================================================*/
function createLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "SecuritySystemSupplier"],
        "name": NexpakSEO.companyName,
        "description": NexpakSEO.description,
        "url": NexpakSEO.website,
        "telephone": NexpakSEO.phone,
        "email": NexpakSEO.email,
        "areaServed": NexpakSEO.serviceAreas.map(area => ({
            "@type": "AdministrativeArea",
            "name": area
        }))
    };
}

/*=========================================================
 PRODUCT SCHEMA ENGINE
=========================================================*/
function createProductSchema(product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "category": product.category,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Nexpak Security Solutions"
        },
        "offers": {
            "@type": "Offer",
            "url": `${window.location.origin}/online.html?id=${product.id}`,
            "priceCurrency": "ZAR",
            "price": Number(product.basePrice || 0).toFixed(2),
            "availability": "https://schema.org/InStock"
        }
    };
}

function loadProductSchema() {
    const params = new URLSearchParams(window.location.search);
    const productID = params.get("id");

    if (!productID || typeof products === "undefined") {
        return;
    }

    const product = products.find(item => item.id == productID);
    if (!product) {
        return;
    }

    injectSchema(createProductSchema(product));
}

function loadShopProductSchemas() {
    if (typeof products === "undefined" || !Array.isArray(products)) {
        return;
    }

    products.forEach(product => {
        injectSchema(createProductSchema(product));
    });
}

/*=========================================================
 FAQ DATABASE & SCHEMA
=========================================================*/
const nexpakFAQs = [
    {
        question: "What security solutions does Nexpak Security Solutions provide?",
        answer: "Nexpak Security Solutions supplies CCTV systems, electric fencing, alarms, gate automation, access control, intercom systems, security accessories, and equestrian fencing products in Benoni and the East Rand."
    },
    {
        question: "Do you provide CCTV security systems?",
        answer: "Yes. Nexpak Security Solutions provides CCTV solutions including security cameras, IP CCTV systems, and recording solutions for homes and businesses featuring top brands like Dahua and Hikvision."
    },
    {
        question: "Do you supply electric fencing systems?",
        answer: "Yes. We supply electric fencing solutions including energizers, brackets, fencing accessories, complete security perimeter kits using JVA or Nemtek energizers, and a full range of equestrian horse paddock products."
    },
    {
        question: "Can Nexpak assist with gate automation and access control?",
        answer: "Yes. Nexpak supplies gate motors, access control devices, and intercom systems for residential and commercial properties, featuring top brands like Centurion Smart gate motors."
    }
];

function createFAQSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": nexpakFAQs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

/*=========================================================
 SERVICE SCHEMA
=========================================================*/
function createServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Security Solutions",
        "provider": {
            "@type": "Organization",
            "name": NexpakSecuritySEO.companyName
        },
        "serviceType": [
            "CCTV Systems", "IP CCTV", "Electric Fencing", 
            "Gate Automation", "Alarm Systems", "Access Control"
        ],
        "areaServed": NexpakSEO.serviceAreas
    };
}

function loadFAQAndServiceSchema() {
    injectSchema(createFAQSchema());
    injectSchema(createServiceSchema());
}

/*=========================================================
 BREADCRUMB SCHEMA ENGINE
=========================================================*/
function createBreadcrumbSchema() {
    const path = window.location.pathname.split("/").filter(item => item);
    let breadcrumbs = [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin + "/"
    }];

    let currentURL = window.location.origin;

    path.forEach((part, index) => {
        const cleanName = part.replace("index.html", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        currentURL += "/" + part;

        breadcrumbs.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": cleanName,
            "item": currentURL
        });
    });

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
    };
}

/*=========================================================
 WEBSITE SCHEMA
=========================================================*/
function createWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": NexpakSEO.companyName,
        "url": NexpakSEO.website,
        "potentialAction": {
            "@type": "SearchAction",
            "target": NexpakSEO.website + "/shop.html?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
}

/*=========================================================
 GLOBAL CONTROLLER & INITIALIZATION
=========================================================*/
function initializeSEOEngine() {
    console.log("Nexpak SEO Schema V15 Loaded Successfully");

    injectSchema(createOrganizationSchema());
    injectSchema(createLocalBusinessSchema());
    injectSchema(createWebsiteSchema());
    injectSchema(createBreadcrumbSchema());

    const page = window.location.pathname;

    if (page.includes("product.html") || page.includes("online.html")) {
        loadProductSchema();
    }

    if (page.includes("shop.html")) {
        loadShopProductSchemas();
    }

    loadFAQAndServiceSchema();
}

window.NexpakSEOEngine = {
    load: initializeSEOEngine,
    product: createProductSchema,
    faq: createFAQSchema,
    service: createServiceSchema,
    breadcrumb: createBreadcrumbSchema
};

document.addEventListener("DOMContentLoaded", () => {
    initializeSEOEngine();
});

window.NexpakSEOEngine = {
    load: initializeSEOEngine,
    product: createProductSchema,
    faq: createFAQSchema,
    service: createServiceSchema,
    breadcrumb: createBreadcrumbSchema
};

document.addEventListener("DOMContentLoaded", () => {
    initializeSEOEngine();
});
window.NexpakSEOEngine = {
    load: initializeSEOEngine,
    product: createProductSchema,
    faq: createFAQSchema,
    service: createServiceSchema,
    breadcrumb: createBreadcrumbSchema
};

document.addEventListener("DOMContentLoaded", () => {
    initializeSEOEngine();
});

window.NexpakSEOEngine = {
    load: initializeSEOEngine,
    product: createProductSchema,
    faq: createFAQSchema,
    service: createServiceSchema,
    breadcrumb: createBreadcrumbSchema
};

document.addEventListener("DOMContentLoaded", () => {
    initializeSEOEngine();
});

