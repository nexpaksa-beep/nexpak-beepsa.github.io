/*=========================================================
 NEXPAK SECURITY SOLUTIONS V16
 OPTIMIZED & CORRECTED SEO SCHEMA ENGINE

 File:
 seo-schema.js

 VERSION 16 FIXES:
 ----------------------------------------------------------
 - Fixed BreadcrumbList homepage error
 - Prevents unnamed breadcrumb items
 - Corrected NexpakSecuritySEO typo
 - Removed duplicate initialization blocks
 - Removed duplicate NexpakSEOEngine declarations
 - Prevents invalid empty breadcrumb names
 - Removes .html from breadcrumb names
 - Preserves Product schema
 - Preserves FAQ schema
 - Preserves Service schema
 - Preserves Organization schema
 - Preserves LocalBusiness schema
 - Preserves WebSite/SearchAction schema
=========================================================*/


/*=========================================================
 1. NEXPAK SEO CONFIGURATION
=========================================================*/

const NexpakSEO = {

    companyName:
        "Nexpak Security Solutions",

    website:
        window.location.origin,

    logo:
        "images/logo.png",

    description:
        "Security equipment supplier and solutions provider offering CCTV systems, electric fencing, gate automation, alarm systems, access control, and equestrian fencing products in Benoni, East Rand, and Johannesburg.",

    keywords: [

        "cctv systems benoni",

        "centurion gate motors benoni",

        "electric fencing east rand",

        "dahua cameras johannesburg",

        "ajax alarm systems south africa",

        "jva energizers benoni",

        "security equipment supplier boksburg",

        "kempton park security solutions",

        "springs electric fencing",

        "edenvale cctv installation",

        "germiston gate automation",

        "ds smart gate motor",

        "vantage smart swing gate",

        "ids alarms",

        "roboguard wireless beams",

        "equestrian horse tape benoni",

        "solar energizers south africa"
    ],

    phone:
        "083 630 8249",

    email:
        "info@nexpaksolutions.co.za",

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

    country:
        "South Africa"
};


/*=========================================================
 2. SCHEMA INJECTION ENGINE
=========================================================*/

const loadedSchemas = [];


function injectSchema(schema) {

    /*
     * Do nothing if schema is invalid/null
     */
    if (!schema) {

        return;
    }


    /*
     * Convert schema to a string for
     * duplicate detection.
     */
    const schemaString =
        JSON.stringify(schema);


    /*
     * Prevent duplicate schema injection.
     */
    if (
        loadedSchemas.includes(
            schemaString
        )
    ) {

        return;
    }


    loadedSchemas.push(
        schemaString
    );


    /*
     * Create JSON-LD script.
     */
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
 3. ORGANIZATION SCHEMA
=========================================================*/

function createOrganizationSchema() {

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

        "contactPoint": {

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
 4. LOCAL BUSINESS SCHEMA
=========================================================*/

function createLocalBusinessSchema() {

    return {

        "@context":
            "https://schema.org",

        "@type": [

            "LocalBusiness",

            "SecuritySystemSupplier"
        ],

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

        "areaServed":

            NexpakSEO.serviceAreas.map(

                area => ({

                    "@type":
                        "AdministrativeArea",

                    "name":
                        area
                })
            )
    };
}


/*=========================================================
 5. PRODUCT SCHEMA ENGINE
=========================================================*/

function createProductSchema(product) {

    if (!product) {

        return null;
    }


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

        "brand": {

            "@type":
                "Brand",

            "name":
                product.brand ||
                "Nexpak Security Solutions"
        },

        "offers": {

            "@type":
                "Offer",

            "url":
                `${window.location.origin}/online.html?id=${product.id}`,

            "priceCurrency":
                "ZAR",

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
 6. LOAD SINGLE PRODUCT SCHEMA
=========================================================*/

function loadProductSchema() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productID =
        params.get("id");


    /*
     * Stop if no product ID.
     */
    if (
        !productID
    ) {

        return;
    }


    /*
     * Stop if product database
     * is not available.
     */
    if (
        typeof products ===
        "undefined"
    ) {

        return;
    }


    /*
     * Find product.
     */
    const product =
        products.find(
            item =>
                item.id == productID
        );


    if (!product) {

        return;
    }


    injectSchema(
        createProductSchema(
            product
        )
    );
}


/*=========================================================
 7. LOAD SHOP PRODUCT SCHEMAS
=========================================================*/

function loadShopProductSchemas() {

    if (

        typeof products ===
            "undefined" ||

        !Array.isArray(
            products
        )

    ) {

        return;
    }


    products.forEach(

        product => {

            injectSchema(
                createProductSchema(
                    product
                )
            );

        }
    );
}


/*=========================================================
 8. FAQ DATABASE
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
 9. FAQ SCHEMA
=========================================================*/

function createFAQSchema() {

    return {

        "@context":
            "https://schema.org",

        "@type":
            "FAQPage",

        "mainEntity":

            nexpakFAQs.map(

                faq => ({

                    "@type":
                        "Question",

                    "name":
                        faq.question,

                    "acceptedAnswer": {

                        "@type":
                            "Answer",

                        "text":
                            faq.answer
                    }
                })
            )
    };
}


/*=========================================================
 10. SERVICE SCHEMA
=========================================================*/

function createServiceSchema() {

    return {

        "@context":
            "https://schema.org",

        "@type":
            "Service",

        "name":
            "Security Solutions",

        "provider": {

            "@type":
                "Organization",

            /*
             * FIXED:
             * Was incorrectly:
             *
             * NexpakSecuritySEO.companyName
             *
             * Correct:
             */
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
 11. LOAD FAQ + SERVICE SCHEMA
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
 12. BREADCRUMB SCHEMA ENGINE
=========================================================*/

function createBreadcrumbSchema() {

    const path =
        window.location.pathname;


    /*-------------------------------------------------------
      HOMEPAGE
    -------------------------------------------------------*/

    /*
     * DO NOT generate BreadcrumbList for:
     *
     * /
     *
     * /index.html
     *
     * /folder/index.html
     *
     * This prevents:
     *
     * Home
     * [unnamed item]
     *
     * from being sent to Google.
     */

    if (

        path === "/" ||

        path === "/index.html" ||

        path.endsWith(
            "/index.html"
        )

    ) {

        return null;
    }


    /*-------------------------------------------------------
      CLEAN PATH
    -------------------------------------------------------*/

    const cleanPath =
        path.replace(
            /^\/+|\/+$/g,
            ""
        );


    if (!cleanPath) {

        return null;
    }


    /*-------------------------------------------------------
      SPLIT URL
    -------------------------------------------------------*/

    const parts =
        cleanPath
            .split("/")
            .filter(
                Boolean
            );


    /*-------------------------------------------------------
      START WITH HOME
    -------------------------------------------------------*/

    const breadcrumbs = [

        {

            "@type":
                "ListItem",

            "position":
                1,

            "name":
                "Home",

            "item":
                window.location.origin + "/"
        }
    ];


    /*-------------------------------------------------------
      BUILD CURRENT URL
    -------------------------------------------------------*/

    let currentURL =
        window.location.origin;


    /*-------------------------------------------------------
      PROCESS EACH PATH SEGMENT
    -------------------------------------------------------*/

    parts.forEach(

        part => {

            /*
             * Never add index.html
             * as a breadcrumb.
             */
            if (

                part.toLowerCase() ===
                "index.html"

            ) {

                return;
            }


            /*
             * Build URL.
             */
            currentURL +=
                "/" + part;


            /*
             * Remove .html
             */
            let cleanName =
                part.replace(
                    /\.html$/i,
                    ""
                );


            /*
             * Replace hyphens and
             * underscores with spaces.
             */
            cleanName =
                cleanName
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
             * Never add empty item.
             */
            if (!cleanName) {

                return;
            }


            /*
             * Capitalize words.
             */
            cleanName =
                cleanName.replace(
                    /\b\w/g,
                    letter =>
                        letter.toUpperCase()
                );


            /*-------------------------------------------------
              NEXPAK TERMINOLOGY
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
                        /\bFaq\b/gi,
                        "FAQ"
                    )

                    .replace(
                        /\bSeo\b/gi,
                        "SEO"
                    )

                    .replace(
                        /\bNexpak\b/gi,
                        "Nexpak"
                    );


            /*
             * Final safety check.
             */
            if (!cleanName) {

                return;
            }


            /*-------------------------------------------------
              ADD BREADCRUMB
            -------------------------------------------------*/

            breadcrumbs.push({

                "@type":
                    "ListItem",

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
      GOOGLE SAFETY CHECK
    -------------------------------------------------------*/

    /*
     * If there is only Home,
     * there is no meaningful breadcrumb.
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
 13. WEBSITE SCHEMA
=========================================================*/

function createWebsiteSchema() {

    return {

        "@context":
            "https://schema.org",

        "@type":
            "WebSite",

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
 14. GLOBAL SEO CONTROLLER
=========================================================*/

function initializeSEOEngine() {

    console.log(
        "Nexpak SEO Schema V16 Loaded Successfully"
    );


    /*-------------------------------------------------------
      ORGANIZATION
    -------------------------------------------------------*/

    injectSchema(
        createOrganizationSchema()
    );


    /*-------------------------------------------------------
      LOCAL BUSINESS
    -------------------------------------------------------*/

    injectSchema(
        createLocalBusinessSchema()
    );


    /*-------------------------------------------------------
      WEBSITE
    -------------------------------------------------------*/

    injectSchema(
        createWebsiteSchema()
    );


    /*-------------------------------------------------------
      BREADCRUMB
    -------------------------------------------------------*/

    const breadcrumbSchema =
        createBreadcrumbSchema();


    /*
     * Homepage returns null.
     * Internal pages get valid breadcrumbs.
     */

    if (
        breadcrumbSchema
    ) {

        injectSchema(
            breadcrumbSchema
        );
    }


    /*-------------------------------------------------------
      CURRENT PAGE
    -------------------------------------------------------*/

    const page =
        window.location.pathname;


    /*-------------------------------------------------------
      PRODUCT SCHEMA
    -------------------------------------------------------*/

    if (

        page.includes(
            "product.html"
        ) ||

        page.includes(
            "online.html"
        )

    ) {

        loadProductSchema();
    }


    /*-------------------------------------------------------
      SHOP PRODUCT SCHEMAS
    -------------------------------------------------------*/

    if (

        page.includes(
            "shop.html"
        )

    ) {

        loadShopProductSchemas();
    }


    /*-------------------------------------------------------
      FAQ + SERVICE
    -------------------------------------------------------*/

    loadFAQAndServiceSchema();
}


/*=========================================================
 15. PUBLIC NEXPAK SEO ENGINE
=========================================================*/

window.NexpakSEOEngine = {

    load: initializeSEOEngine,

    product: createProductSchema,

    faq: createFAQSchema,

    service: createServiceSchema,

    breadcrumb: createBreadcrumbSchema

};


/*=========================================================
 16. AUTOMATIC INITIALIZATION
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSEOEngine();

    }
);
