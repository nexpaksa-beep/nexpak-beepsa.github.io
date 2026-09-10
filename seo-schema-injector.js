/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16
 COMPREHENSIVE SEO SCHEMA INJECTOR

 File:
 seo-schema-injector.js

 VERSION 16 CHANGES:
 - Fixed homepage BreadcrumbList error
 - No breadcrumb schema on / or /index.html
 - Prevents unnamed breadcrumb items
 - Removes .html from breadcrumb names
 - Cleaner breadcrumb URLs
 - Prevents duplicate schemas
 - Preserves Organization, LocalBusiness, Product,
   FAQ, Service, Course, WebApplication and WebSite schemas
=========================================================*/


/*=========================================================
 1. NEXPAK SEO CONFIGURATION
=========================================================*/

const NexpakSEO = {

    companyName: "Nexpak Security Solutions",

    website: window.location.origin,

    logo: "images/logo.png",

    description:
        "Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control, online security store, and equestrian fencing products in Benoni, East Rand, and Johannesburg.",

    phone: "083 630 8249",

    email: "info@nexpaksolutions.co.za",

    serviceAreas: [
        "Benoni",
        "Boksburg",
        "Kempton Park",
        "Springs",
        "Edenvale",
        "Germiston",
        "Johannesburg",
        "Gauteng"
    ],

    country: "South Africa"
};


/*=========================================================
 2. SCHEMA INJECTION ENGINE
    Duplicate Protection Built-In
=========================================================*/

const loadedSchemas = [];


function injectSchema(schema) {

    /*
     * Safety check
     */
    if (!schema) {
        return;
    }

    const schemaString = JSON.stringify(schema);

    /*
     * Prevent duplicate schema injection
     */
    if (loadedSchemas.includes(schemaString)) {
        return;
    }

    loadedSchemas.push(schemaString);

    /*
     * Create JSON-LD script
     */
    const script = document.createElement("script");

    script.type = "application/ld+json";

    script.textContent = JSON.stringify(
        schema,
        null,
        2
    );

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

        "@type": [
            "LocalBusiness",
            "SecuritySystemSupplier"
        ],

        "name": NexpakSEO.companyName,

        "description": NexpakSEO.description,

        "url": NexpakSEO.website,

        "telephone": NexpakSEO.phone,

        "email": NexpakSEO.email,

        "areaServed": NexpakSEO.serviceAreas.map(
            area => ({

                "@type": "AdministrativeArea",

                "name": area
            })
        )
    };
}


/*=========================================================
 5. ENHANCED PRODUCT SCHEMA
    Brand / MPN / Price / Availability
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

            "name":
                product.brand ||
                "Nexpak Security Solutions"
        },

        "offers": {

            "@type": "Offer",

            "url":
                `${window.location.origin}/online.html?id=${product.id}`,

            "priceCurrency": "ZAR",

            "price":
                Number(
                    product.basePrice || 0
                ).toFixed(2),

            "availability":
                "https://schema.org/InStock"
        }
    };
}


/*=========================================================
 PRODUCT SCHEMA - SINGLE PRODUCT
=========================================================*/

function loadProductSchema() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productID =
        params.get("id");


    /*
     * Products database must exist
     */
    if (
        !productID ||
        typeof products === "undefined"
    ) {
        return;
    }


    const product =
        products.find(
            item => item.id == productID
        );


    if (!product) {
        return;
    }


    injectSchema(
        createEnhancedProductSchema(product)
    );
}


/*=========================================================
 PRODUCT SCHEMA - SHOP
=========================================================*/

function loadShopProductSchemas() {

    if (
        typeof products === "undefined" ||
        !Array.isArray(products)
    ) {
        return;
    }


    products.forEach(
        product => {

            injectSchema(
                createEnhancedProductSchema(product)
            );

        }
    );
}


/*=========================================================
 6. FAQ DATABASE
=========================================================*/

const nexpakFAQs = [

    {

        question:
            "What security solutions does Nexpak Security Solutions provide?",

        answer:
            "Nexpak Security Solutions supplies CCTV systems, electric fencing, alarms, gate automation, access control, intercom systems, security accessories, and equestrian fencing products in Benoni and the East Rand."
    },

    {

        question:
            "Do you provide CCTV security systems?",

        answer:
            "Yes. Nexpak Security Solutions provides CCTV solutions including security cameras, IP CCTV systems, and recording solutions for homes and businesses featuring top brands like Dahua and Hikvision."
    },

    {

        question:
            "Do you supply electric fencing systems?",

        answer:
            "Yes. We supply electric fencing solutions including energizers, brackets, fencing accessories, complete security perimeter kits using JVA or Nemtek energizers, and a full range of equestrian horse paddock products."
    },

    {

        question:
            "Can Nexpak assist with gate automation and access control?",

        answer:
            "Yes. Nexpak supplies gate motors, access control devices, and intercom systems for residential and commercial properties, featuring top brands like Centurion Smart gate motors."
    }
];


/*=========================================================
 FAQ SCHEMA
=========================================================*/

function createFAQSchema() {

    return {

        "@context": "https://schema.org",

        "@type": "FAQPage",

        "mainEntity":

            nexpakFAQs.map(
                faq => ({

                    "@type": "Question",

                    "name": faq.question,

                    "acceptedAnswer": {

                        "@type": "Answer",

                        "text": faq.answer
                    }
                })
            )
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

            "name":
                NexpakSEO.companyName
        },

        "serviceType": [

            "CCTV Systems",

            "IP CCTV",

            "Electric Fencing",

            "Gate Automation",

            "Alarm Systems",

            "Access Control"
        ],

        "areaServed":
            NexpakSEO.serviceAreas
    };
}


/*=========================================================
 LOAD FAQ + SERVICE SCHEMA
=========================================================*/

function loadFAQAndServiceSchema() {

    injectSchema(
        createFAQSchema()
    );

    injectSchema(
        createServiceSchema()
    );
}


/*=========================================================
 8. COURSE SCHEMA
=========================================================*/

function createCourseSchema() {

    return {

        "@context": "https://schema.org",

        "@type": "Course",

        "name":
            "Online Electric Fencing Training Course",

        "description":
            "Advanced online training covering 6-line to 12-line electric fencing kits, energizer configuration, and perimeter security installations.",

        "provider": {

            "@type": "Organization",

            "name":
                NexpakSEO.companyName,

            "sameAs":
                NexpakSEO.website
        }
    };
}


/*=========================================================
 WEB APPLICATION SCHEMA
=========================================================*/

function createWebApplicationSchema() {

    return {

        "@context": "https://schema.org",

        "@type": "WebApplication",

        "name":
            "Nexpak Interactive Security System Builder",

        "url":
            `${window.location.origin}/online.html`,

        "applicationCategory":
            "BusinessApplication",

        "operatingSystem":
            "All",

        "description":
            "Interactive web tool to build custom security, CCTV, and electric fencing layouts with automated PDF quotation generation."
    };
}


/*=========================================================
 LOAD CUSTOM PAGE SCHEMAS
=========================================================*/

function loadCustomPageSchemas() {

    const path =
        window.location.pathname;


    /*
     * Course schema
     */
    if (
        path.includes("training.html") ||
        path.includes("equestrian-course")
    ) {

        injectSchema(
            createCourseSchema()
        );
    }


    /*
     * Web Application schema
     */
    if (
        path.includes("online.html") ||
        path.includes("builder.html") ||
        path.includes("shop.html")
    ) {

        injectSchema(
            createWebApplicationSchema()
        );
    }
}


/*=========================================================
 9. BREADCRUMB SCHEMA ENGINE
=========================================================*/

/*
 * IMPORTANT:
 *
 * Homepage:
 * /
 * /index.html
 *
 * DOES NOT receive BreadcrumbList schema.
 *
 * This prevents:
 *
 * Home
 * →
 * [Unnamed item]
 *
 * which was causing the Google Search Console error.
 */

function createBreadcrumbSchema() {

    const path =
        window.location.pathname;


    /*-------------------------------------------------------
      HOMEPAGE CHECK
    -------------------------------------------------------*/

    if (

        path === "/" ||

        path === "/index.html" ||

        path.endsWith("/index.html")

    ) {

        return null;
    }


    /*-------------------------------------------------------
      CLEAN URL PATH
    -------------------------------------------------------*/

    const cleanPath =
        path
            .replace(/^\/+|\/+$/g, "");


    /*
     * No usable path
     */
    if (!cleanPath) {

        return null;
    }


    /*-------------------------------------------------------
      SPLIT PATH
    -------------------------------------------------------*/

    const parts =
        cleanPath
            .split("/")
            .filter(Boolean);


    /*
     * Start with Home
     */
    const breadcrumbs = [

        {

            "@type": "ListItem",

            "position": 1,

            "name": "Home",

            "item":
                window.location.origin + "/"
        }
    ];


    /*-------------------------------------------------------
      BUILD BREADCRUMBS
    -------------------------------------------------------*/

    let currentURL =
        window.location.origin;


    parts.forEach(

        (part, index) => {


            /*
             * Ignore index.html
             */
            if (
                part.toLowerCase() ===
                "index.html"
            ) {

                return;
            }


            /*
             * Add URL segment
             */
            currentURL +=
                "/" + part;


            /*
             * Convert filename to readable name
             */
            let cleanName =
                part
                    .replace(
                        /\.html$/i,
                        ""
                    )
                    .replace(
                        /[-_]+/g,
                        " "
                    )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();


            /*
             * Safety check
             */
            if (!cleanName) {

                return;
            }


            /*
             * Capitalize words
             */
            cleanName =
                cleanName.replace(
                    /\b\w/g,
                    letter =>
                        letter.toUpperCase()
                );


            /*-------------------------------------------------
              NEXPAK TERMINOLOGY CLEANUP
            -------------------------------------------------*/

            cleanName =
                cleanName

                    .replace(
                        /\bCctv\b/gi,
                        "CCTV"
                    )

                    .replace(
                        /\bIp\b/gi,
                        "IP"
                    )

                    .replace(
                        /\bJva\b/gi,
                        "JVA"
                    )

                    .replace(
                        /\bIds\b/gi,
                        "IDS"
                    )

                    .replace(
                        /\bDahua\b/gi,
                        "Dahua"
                    )

                    .replace(
                        /\bHikvision\b/gi,
                        "Hikvision"
                    )

                    .replace(
                        /\bNexpak\b/gi,
                        "Nexpak"
                    )

                    .replace(
                        /\bSeo\b/gi,
                        "SEO"
                    )

                    .replace(
                        /\bFaq\b/gi,
                        "FAQ"
                    );
            

            /*
             * NEVER create an unnamed item
             */
            if (!cleanName) {

                return;
            }


            /*
             * Add breadcrumb
             */
            breadcrumbs.push({

                "@type": "ListItem",

                "position":
                    breadcrumbs.length + 1,

                "name":
                    cleanName,

                "item":
                    currentURL
            });
        }
    );


    /*-------------------------------------------------------
      GOOGLE ELIGIBILITY SAFETY CHECK
    -------------------------------------------------------*/

    /*
     * A breadcrumb list containing only Home
     * is not useful.
     *
     * Therefore return null instead.
     */
    if (
        breadcrumbs.length < 2
    ) {

        return null;
    }


    /*-------------------------------------------------------
      RETURN BREADCRUMB SCHEMA
    -------------------------------------------------------*/

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
 10. WEBSITE SCHEMA
     SearchAction
=========================================================*/

function createWebsiteSchema() {

    return {

        "@context": "https://schema.org",

        "@type": "WebSite",

        "name":
            NexpakSEO.companyName,

        "url":
            NexpakSEO.website,

        "potentialAction": {

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
 11. GLOBAL CONTROLLER
=========================================================*/

function initializeSEOEngine() {

    console.log(
        "Nexpak SEO Schema V16 Loaded Successfully"
    );


    /*-------------------------------------------------------
      BASE GLOBAL SCHEMAS
    -------------------------------------------------------*/

    injectSchema(
        createOrganizationSchema()
    );


    injectSchema(
        createLocalBusinessSchema()
    );


    injectSchema(
        createWebsiteSchema()
    );


    /*-------------------------------------------------------
      BREADCRUMB SCHEMA
    -------------------------------------------------------*/

    const breadcrumbSchema =
        createBreadcrumbSchema();


    /*
     * Only inject if valid.
     *
     * Homepage returns null.
     */
    if (breadcrumbSchema) {

        injectSchema(
            breadcrumbSchema
        );
    }


    /*-------------------------------------------------------
      CUSTOM PAGE SCHEMAS
    -------------------------------------------------------*/

    loadCustomPageSchemas();


    /*-------------------------------------------------------
      PAGE DETECTION
    -------------------------------------------------------*/

    const page =
        window.location.pathname;


    /*-------------------------------------------------------
      SINGLE PRODUCT / ONLINE STORE
    -------------------------------------------------------*/

    if (

        page.includes("product.html") ||

        page.includes("online.html")

    ) {

        loadProductSchema();
    }


    /*-------------------------------------------------------
      SHOP PRODUCT SCHEMAS
    -------------------------------------------------------*/

    if (
        page.includes("shop.html")
    ) {

        loadShopProductSchemas();
    }


    /*-------------------------------------------------------
      FAQ + SERVICE
    -------------------------------------------------------*/

    loadFAQAndServiceSchema();
}


/*=========================================================
 12. PUBLIC NEXPAK SEO ENGINE
=========================================================*/

window.NexpakSEOEngine = {

    load:
        initializeSEOEngine,

    product:
        createEnhancedProductSchema,

    faq:
        createFAQSchema,

    service:
        createServiceSchema,

    breadcrumb:
        createBreadcrumbSchema,

    course:
        createCourseSchema,

    webApp:
        createWebApplicationSchema
};


/*=========================================================
 13. AUTOMATIC INITIALIZATION
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSEOEngine();

    }
);
