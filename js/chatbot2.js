/**
 * ============================================================
 * NEXPAK SECURITY SOLUTIONS
 * AI CUSTOMER ASSISTANT
 * PART 1 — CORE, KNOWLEDGE BASE & AI RESPONSE ENGINE
 * ============================================================
 */

(function () {

    "use strict";

    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const CONFIG = {

        companyName:
            "Nexpak Security Solutions",

        phone:
            "0836308249",

        whatsapp:
            "27836308249",

        email:
            "info@nexpaksolutions.co.za",

        businessHours:
            "Mon-Fri: 8am-5pm | Sat: 8am-1pm",

        greeting:
            "Hi! 👋 I'm the Nexpak AI Assistant. " +
            "I can help you with security products, " +
            "pricing, installations and quotes. " +
            "What can I help you with?",

        storageKey:
            "nexpak_ai_chat"

    };


    /* =========================================================
       PRODUCT KNOWLEDGE
    ========================================================= */

    const PRODUCTS = {

        electricFencing: {

            keywords: [
                "electric fence",
                "electric fencing",
                "electric fence",
                "perimeter fence",
                "security fence",
                "fence"
            ],

            name:
                "Electric Fencing",

            description:
                "Electric fencing provides an active perimeter " +
                "security layer for homes, businesses, farms " +
                "and other properties.",

            price:
                "Guide pricing starts from approximately " +
                "R350 per metre.",

            features: [
                "Perimeter protection",
                "Energizers",
                "Electric fence accessories",
                "Professional installation",
                "Maintenance and repairs"
            ]

        },


        cctv: {

            keywords: [
                "cctv",
                "camera",
                "cameras",
                "security camera",
                "surveillance",
                "video surveillance",
                "ip camera",
                "ip cameras"
            ],

            name:
                "CCTV Surveillance",

            description:
                "CCTV systems provide video surveillance " +
                "for residential, commercial and agricultural " +
                "properties.",

            price:
                "Systems start from approximately R4,500 " +
                "depending on the number and type of cameras.",

            features: [
                "HD and 4K cameras",
                "Night vision",
                "Remote viewing",
                "Motion detection",
                "Recording"
            ]

        },


        accessControl: {

            keywords: [
                "access control",
                "biometric",
                "fingerprint",
                "facial recognition",
                "card access",
                "access system"
            ],

            name:
                "Access Control",

            description:
                "Access control systems help manage and " +
                "restrict who can enter a property or building.",

            price:
                "Systems start from approximately R8,000 " +
                "depending on requirements.",

            features: [
                "Fingerprint access",
                "Card access",
                "Biometric systems",
                "Entry management",
                "Audit records"
            ]

        },


        gateAutomation: {

            keywords: [
                "gate automation",
                "gate motor",
                "gate motors",
                "automated gate",
                "automatic gate",
                "sliding gate",
                "swing gate"
            ],

            name:
                "Gate Automation",

            description:
                "Gate automation provides convenient and " +
                "secure automatic opening and closing for " +
                "sliding and swing gates.",

            price:
                "Systems start from approximately R12,000 " +
                "depending on the gate and motor requirements.",

            features: [
                "Sliding gate motors",
                "Swing gate motors",
                "Remote controls",
                "Battery backup",
                "Safety sensors"
            ]

        },


        intercom: {

            keywords: [
                "intercom",
                "video intercom",
                "door phone",
                "video door phone",
                "visitor system"
            ],

            name:
                "Video Intercom",

            description:
                "Video intercom systems allow you to see " +
                "and communicate with visitors before granting access.",

            price:
                "Systems start from approximately R3,500.",

            features: [
                "Video communication",
                "Visitor identification",
                "Remote unlocking",
                "Multiple units",
                "Recording options"
            ]

        },


        equestrian: {

            keywords: [
                "equestrian",
                "horse fencing",
                "horse fence",
                "horse",
                "horses",
                "paddock",
                "paddocks",
                "horse paddock",
                "polytape",
                "fence rope",
                "horse tape"
            ],

            name:
                "Equestrian Fencing",

            description:
                "Nexpak supplies specialist equestrian fencing " +
                "products for horse paddocks, arenas and stable " +
                "environments.",

            price:
                "Pricing varies according to the product " +
                "and quantity required.",

            features: [
                "Horse-safe fencing",
                "Polytape",
                "Electric fencing rope",
                "Energizers",
                "Accessories"
            ]

        }

    };


    /* =========================================================
       SERVICE KNOWLEDGE
    ========================================================= */

    const SERVICES = {

        installation: {

            keywords: [
                "installation",
                "install",
                "installer",
                "installers",
                "fit",
                "fitting"
            ],

            response:
                "Yes. Nexpak can assist with professional " +
                "security system installation. The exact " +
                "installation requirements depend on the " +
                "property and system selected."

        },


        maintenance: {

            keywords: [
                "maintenance",
                "service",
                "servicing",
                "maintain"
            ],

            response:
                "We can assist with security system maintenance " +
                "and help keep your equipment operating correctly."

        },


        repairs: {

            keywords: [
                "repair",
                "repairs",
                "broken",
                "fault",
                "faulty",
                "not working"
            ],

            response:
                "We can assist with security system repairs " +
                "and fault finding. Tell me which system is " +
                "giving you trouble and I can guide you."

        },


        consultation: {

            keywords: [
                "consultation",
                "assessment",
                "site visit",
                "security assessment",
                "inspect my property"
            ],

            response:
                "We can help assess your property's security " +
                "requirements and recommend a suitable solution."

        }

    };


    /* =========================================================
       PRICE KNOWLEDGE
    ========================================================= */

    const PRICES = [

        {
            keywords: [
                "electric fence price",
                "electric fencing price",
                "electric fence cost",
                "fence cost"
            ],

            answer:
                "Electric fencing guide pricing starts " +
                "from approximately R350 per metre. " +
                "The final price depends on the property, " +
                "materials and installation requirements."
        },

        {
            keywords: [
                "cctv price",
                "cctv cost",
                "camera price",
                "camera cost"
            ],

            answer:
                "CCTV systems start from approximately R4,500. " +
                "The final price depends on the number of cameras, " +
                "camera type, recording equipment and installation."
        },

        {
            keywords: [
                "access control price",
                "access control cost",
                "biometric price"
            ],

            answer:
                "Access control systems start from approximately " +
                "R8,000. The exact price depends on the number " +
                "of users, doors and equipment required."
        },

        {
            keywords: [
                "gate motor price",
                "gate motor cost",
                "gate automation price",
                "gate automation cost"
            ],

            answer:
                "Gate automation starts from approximately R12,000. " +
                "The final price depends on the gate type, size, " +
                "motor capacity and installation requirements."
        },

        {

            keywords: [
                "intercom price",
                "intercom cost"
            ],

            answer:
                "Video intercom systems start from approximately " +
                "R3,500 depending on the system selected."
        }

    ];


    /* =========================================================
       FAQ KNOWLEDGE
    ========================================================= */

    const FAQS = [

        {

            keywords: [
                "free quote",
                "free quotation",
                "free estimate",
                "quote"
            ],

            answer:
                "Absolutely! 😊 Nexpak can assist with a quote. " +
                "Tell me which security solution you are interested " +
                "in and a few details about your property."

        },

        {

            keywords: [
                "where are you",
                "where do you operate",
                "service areas",
                "areas do you serve",
                "where do you work"
            ],

            answer:
                "Nexpak primarily serves Gauteng and surrounding " +
                "areas. For projects outside the area, contact us " +
                "and we can discuss your requirements."

        },

        {

            keywords: [
                "warranty",
                "warranties"
            ],

            answer:
                "Warranty coverage depends on the manufacturer " +
                "and specific product. We can confirm the warranty " +
                "for the product you're interested in."

        },

        {

            keywords: [
                "payment methods",
                "how can i pay",
                "payment",
                "payfast",
                "eft"
            ],

            answer:
                "Payment options can include EFT and online payment " +
                "methods where available. For a specific order, " +
                "we can confirm the available payment options."

        },

        {

            keywords: [
                "business hours",
                "opening hours",
                "open",
                "hours"
            ],

            answer:
                "Our business hours are " +
                CONFIG.businessHours + "."

        }

    ];


    /* =========================================================
       CHAT STATE
    ========================================================= */

    const STATE = {

        open:
            false,

        messages:
            [],

        lead:
            null,

        started:
            Date.now()

    };


    /* =========================================================
       TEXT NORMALISATION
    ========================================================= */

    function normalise(text) {

        return String(text || "")
            .toLowerCase()
            .replace(/[!?.,]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =========================================================
       KEYWORD MATCHING
    ========================================================= */

    function containsKeyword(
        message,
        keywords
    ) {

        return keywords.some(
            function (keyword) {

                return message.includes(
                    normalise(keyword)
                );

            }
        );

    }


    /* =========================================================
       PRODUCT RESPONSE
    ========================================================= */

    function productResponse(product) {

        return (
            "🔐 " +
            product.name +
            "\n\n" +

            product.description +
            "\n\n" +

            "💰 " +
            product.price +
            "\n\n" +

            "Key features:\n" +

            product.features
                .map(function (feature) {
                    return "• " + feature;
                })
                .join("\n") +

            "\n\nWould you like help choosing " +
            "the right option?"
        );

    }


    /* =========================================================
       MAIN AI-STYLE RESPONSE ENGINE
    ========================================================= */

    function generateResponse(
        userMessage
    ) {

        const message =
            normalise(userMessage);


        if (!message) {

            return CONFIG.greeting;

        }


        /* GREETINGS */

        if (
            message === "hi" ||
            message === "hello" ||
            message === "hey" ||
            message.includes("good morning") ||
            message.includes("good afternoon") ||
            message.includes("good evening")
        ) {

            return (
                "Hi! 👋 Welcome to Nexpak Security Solutions. " +
                "What security solution can I help you with today?"
            );

        }


        /* THANK YOU */

        if (
            message.includes("thank you") ||
            message.includes("thanks") ||
            message === "thank"
        ) {

            return (
                "You're very welcome! 😊 " +
                "If you need anything else, just ask."
            );

        }


        /* CONTACT */

        if (
            message.includes("contact") ||
            message.includes("phone") ||
            message.includes("call me") ||
            message.includes("whatsapp")
        ) {

            return (
                "📞 Nexpak Security Solutions\n\n" +

                "Phone / WhatsApp: " +
                CONFIG.phone +
                "\n\n" +

                "📧 " +
                CONFIG.email +
                "\n\n" +

                "🕐 " +
                CONFIG.businessHours
            );

        }


        /* PRICE QUESTIONS */

        for (
            let i = 0;
            i < PRICES.length;
            i++
        ) {

            if (
                containsKeyword(
                    message,
                    PRICES[i].keywords
                )
            ) {

                return PRICES[i].answer;

            }

        }


        /* GENERAL PRICE REQUEST */

        if (
            message.includes("price") ||
            message.includes("prices") ||
            message.includes("cost") ||
            message.includes("how much")
        ) {

            return (
                "Here are our guide prices:\n\n" +

                "⚡ Electric Fencing: From R350/m\n" +
                "📹 CCTV: From R4,500\n" +
                "🚪 Access Control: From R8,000\n" +
                "⚙️ Gate Automation: From R12,000\n" +
                "📞 Video Intercom: From R3,500\n" +
                "🐴 Equestrian: Pricing varies\n\n" +

                "These are guide prices only. " +
                "A custom quote gives you the exact cost."
            );

        }


        /* PRODUCTS */

        const productList =
            Object.values(PRODUCTS);

        for (
            let i = 0;
            i < productList.length;
            i++
        ) {

            const product =
                productList[i];

            if (
                containsKeyword(
                    message,
                    product.keywords
                )
            ) {

                return productResponse(
                    product
                );

            }

        }


        /* SERVICES */

        const serviceList =
            Object.values(SERVICES);

        for (
            let i = 0;
            i < serviceList.length;
            i++
        ) {

            const service =
                serviceList[i];

            if (
                containsKeyword(
                    message,
                    service.keywords
                )
            ) {

                return service.response;

            }

        }


        /* FAQ */

        for (
            let i = 0;
            i < FAQS.length;
            i++
        ) {

            if (
                containsKeyword(
                    message,
                    FAQS[i].keywords
                )
            ) {

                return FAQS[i].answer;

            }

        }


        /* QUOTE REQUEST */

        if (
            message.includes("quote") ||
            message.includes("quotation") ||
            message.includes("estimate")
        ) {

            return (
                "I'd be happy to help you with a quote. 👍\n\n" +

                "Please tell me:\n" +
                "1. What security system you need\n" +
                "2. Your property type\n" +
                "3. Your approximate requirements\n\n" +

                "You can also contact us directly on " +
                CONFIG.phone + "."
            );

        }


        /* DEFAULT AI RESPONSE */

        return (
            "I can help with that. 😊\n\n" +

            "I specialise in:\n" +

            "⚡ Electric Fencing\n" +
            "📹 CCTV & IP CCTV\n" +
            "🚪 Access Control\n" +
            "⚙️ Gate Automation\n" +
            "📞 Intercom Systems\n" +
            "🐴 Equestrian Fencing\n" +
            "📋 Quotes & Pricing\n" +
            "🛠️ Installation & Repairs\n\n" +

            "Tell me what you're looking for and " +
            "I'll point you in the right direction."
        );

    }


    /* =========================================================
       SAVE CHAT
    ========================================================= */

    function saveChat() {

        try {

            localStorage.setItem(
                CONFIG.storageKey,
                JSON.stringify(
      
