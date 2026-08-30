/*=========================================================
 NEXPAK SECURITY SOLUTIONS V15 - COMPREHENSIVE SEO SCHEMA INJECTOR
 File: seo-schema-injector.js
=========================================================*/

/*=========================================================
 1. NEXPAK SEO CONFIGURATION
=========================================================*/
const NexpakSEO = {
    companyName: "Nexpak Security Solutions",
    website: window.location.origin,
    logo: "images/logo.png",
    description: "Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control, online security store, and equestrian fencing products in Benoni, East Rand, and Johannesburg.",
    phone: "083 630 8249",
    email: "info@nexpaksolutions.co.za",
    serviceAreas: ["Benoni", "Boksburg", "Kempton Park", "Springs", "Edenvale", "Germiston", "Johannesburg", "Gauteng"],
    country: "South Africa"
};

/*=========================================================
 2. SCHEMA INJECTION ENGINE (Duplicate Protection Built-In)
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
 3. ORGANIZATION SCHEMA
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
 4. LOCAL BUSINESS SCHEMA
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
 5. ENHANCED PRODUCT SCHEMA ENGINE (Brand, MPN, Price, Stock)
=========================================================*/
function createEnhancedProductSchema(product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "mpn": product.mpn || "NEX-SKU",
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

    injectSchema(createEnhancedProductSchema(product));
}

function loadShopProductSchemas() {
    if (typeof products === "undefined" || !Array.isArray(products)) {
        return;
    }

    products.forEach(product => {
        injectSchema(createEnhancedProductSchema(product));
    });
}

/*=========================================================
 6. FAQ DATABASE & SCHEMA
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
 7. SERVICE SCHEMA
=========================================================*/
function createServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Security Solutions",
        "provider": {
            "@type": "Organization",
            "name": NexpakSEO.companyName
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
 8. COURSE & WEB APPLICATION SCHEMAS (Training & System Builder)
=========================================================*/
function createCourseSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Online Electric Fencing Training Course",
        "description": "Advanced online training covering 6-line to 12-line electric fencing kits, energizer configuration, and perimeter security installations.",
        "provider": {
            "@type": "Organization",
            "name": NexpakSEO.companyName,
            "sameAs": NexpakSEO.website
        }
    };
}

function createWebApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Nexpak Interactive Security System Builder",
        "url": `${window.location.origin}/online.html`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "Interactive web tool to build custom security, CCTV, and electric fencing layouts with automated PDF quotation generation."
    };
}

function loadCustomPageSchemas() {
    const path = window.location.pathname;

    // Injects Course Schema on training-related pages
    if (path.includes("training.html")) {
        injectSchema(createCourseSchema());
    }

    // Injects WebApplication Schema on your system builder / configuration tool page
    if (path.includes("online.html") || path.includes("builder.html")) {
        injectSchema(createWebApplicationSchema());
    }
}

/*=========================================================
 9. BREADCRUMB SCHEMA ENGINE
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
 10. WEBSITE SCHEMA (With SearchAction)
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
 11. GLOBAL CONTROLLER & INITIALIZATION
=========================================================*/
function initializeSEOEngine() {
    console.log("Nexpak SEO Schema V15 Loaded Successfully");

    // Base Global Schemas
    injectSchema(createOrganizationSchema());
    injectSchema(createLocalBusinessSchema());
    injectSchema(createWebsiteSchema());
    injectSchema(createBreadcrumbSchema());

    // Contextual Page Schemas (Builder & Training)
    loadCustomPageSchemas();

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
    product: createEnhancedProductSchema,
    faq: createFAQSchema,
    service: createServiceSchema,
    breadcrumb: createBreadcrumbSchema,
    course: createCourseSchema,
    webApp: createWebApplicationSchema
};

document.addEventListener("DOMContentLoaded", () => {
    initializeSEOEngine();
});

