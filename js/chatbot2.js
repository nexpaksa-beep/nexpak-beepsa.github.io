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
            JSON.stringify(chatState.messages)
        );

    } catch (error) {

        console.warn(
            'Nexpak Chat: Unable to save chat history.',
            error
        );

    }

}

    /* =========================================================
   LOAD CHAT
========================================================= */

function loadChat() {

    try {

        const saved = localStorage.getItem(
            CONFIG.storageKey
        );

        if (!saved) {
            return;
        }

        const history = JSON.parse(saved);

        if (!Array.isArray(history)) {
            return;
        }

        chatState.messages = history;

        const container =
            document.getElementById('nexpak-chat-messages');

        if (!container) {
            return;
        }

        history.forEach(function(message) {

            if (
                !message ||
                !message.content ||
                !message.sender
            ) {
                return;
            }

            renderMessage(
                message.content,
                message.sender,
                false
            );

        });

    } catch (error) {

        console.warn(
            'Nexpak Chat: Unable to load chat history.',
            error
        );

    }

}


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(content, sender) {

    if (!content) {
        return;
    }

    chatState.messages.push({

        content: String(content),

        sender: sender,

        time: Date.now()

    });

    renderMessage(
        content,
        sender,
        true
    );

    saveChat();

}


/* =========================================================
   RENDER MESSAGE
========================================================= */

function renderMessage(
    content,
    sender,
    scroll
) {

    const container =
        document.getElementById(
            'nexpak-chat-messages'
        );

    if (!container) {
        return;
    }

    const message =
        document.createElement('div');

    message.className =
        'nexpak-chat-message ' +
        (sender === 'user'
            ? 'nexpak-user-message'
            : 'nexpak-bot-message');


    const text =
        document.createElement('div');

    text.className =
        'nexpak-message-text';

    /*
     * Convert line breaks to HTML safely.
     */

    text.innerHTML =
        escapeHTML(String(content))
        .replace(/\n/g, '<br>');


    const time =
        document.createElement('div');

    time.className =
        'nexpak-message-time';

    time.textContent =
        formatTime(new Date());


    message.appendChild(text);

    message.appendChild(time);

    container.appendChild(message);


    if (scroll) {

        container.scrollTop =
            container.scrollHeight;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement('div');

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(date) {

    return date.toLocaleTimeString(
        'en-ZA',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }
    );

}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    const container =
        document.getElementById(
            'nexpak-chat-messages'
        );

    if (!container) {
        return;
    }

    if (
        document.getElementById(
            'nexpak-typing'
        )
    ) {
        return;
    }


    const typing =
        document.createElement('div');

    typing.id =
        'nexpak-typing';

    typing.className =
        'nexpak-typing';


    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;


    container.appendChild(typing);

    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   HIDE TYPING INDICATOR
========================================================= */

function hideTyping() {

    const typing =
        document.getElementById(
            'nexpak-typing'
        );

    if (typing) {

        typing.remove();

    }

}


/* =========================================================
   BOT RESPONSE
========================================================= */

function sendBotResponse(
    response,
    delay
) {

    showTyping();


    setTimeout(function() {

        hideTyping();

        addMessage(
            response,
            'bot'
        );

    }, delay || 800);

}


/* =========================================================
   OPEN CHAT
========================================================= */

function openChat() {

    const windowElement =
        document.getElementById(
            'nexpak-chat-window'
        );

    if (!windowElement) {
        return;
    }

    windowElement.classList.add(
        'nexpak-chat-open'
    );

    chatState.isOpen = true;


    const input =
        document.getElementById(
            'nexpak-chat-input'
        );

    if (input) {

        setTimeout(function() {

            input.focus();

        }, 200);

    }

}


/* =========================================================
   CLOSE CHAT
========================================================= */

function closeChat() {

    const windowElement =
        document.getElementById(
            'nexpak-chat-window'
        );

    if (!windowElement) {
        return;
    }

    windowElement.classList.remove(
        'nexpak-chat-open'
    );

    chatState.isOpen = false;

}


/* =========================================================
   TOGGLE CHAT
========================================================= */

function toggleChat() {

    if (chatState.isOpen) {

        closeChat();

    } else {

        openChat();

    }

}


/* =========================================================
   SEND USER MESSAGE
========================================================= */

function sendUserMessage() {

    const input =
        document.getElementById(
            'nexpak-chat-input'
        );

    if (!input) {
        return;
    }


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    addMessage(
        message,
        'user'
    );


    input.value = '';


    processMessage(message);

}


/* =========================================================
   PROCESS MESSAGE
========================================================= */

function processMessage(message) {

    const response =
        generateAIResponse(message);


    sendBotResponse(
        response,
        700 + Math.random() * 700
    );

}


/* =========================================================
   QUICK ACTION
========================================================= */

function quickAction(action) {

    if (action === 'quote') {

        addMessage(
            'I would like a quote.',
            'user'
        );

        sendBotResponse(
            'Absolutely! 👍 Tell me which security solution you need — Electric Fencing, CCTV, Gate Automation, Access Control, Alarm Systems, or Equestrian Fencing. I can then help you with the next step.',
            600
        );

        return;
    }


    if (action === 'products') {

        addMessage(
            'Show me your products.',
            'user'
        );

        sendBotResponse(
            'We supply a wide range of security products including Electric Fencing, CCTV, Gate Automation, Access Control, Alarm Systems, Intercoms, Roboguard and Equestrian Fencing. 🛡️ Which one would you like to explore?',
            600
        );

        return;
    }


    if (action === 'contact') {

        addMessage(
            'I want to contact Nexpak.',
            'user'
        );

        sendBotResponse(
            'Sure! You can contact Nexpak Security Solutions through WhatsApp, phone or email. Our team can also arrange a quotation or site assessment for you.',
            600
        );

        return;
    }

                               }
    
/* =========================================================
   AI RESPONSE ENGINE
========================================================= */

function generateAIResponse(userMessage) {

    const message =
        String(userMessage)
            .toLowerCase()
            .trim();


    /* -----------------------------------------------------
       GREETINGS
    ----------------------------------------------------- */

    if (
        message === 'hi' ||
        message === 'hello' ||
        message === 'hey' ||
        message.includes('good morning') ||
        message.includes('good afternoon') ||
        message.includes('good evening')
    ) {

        return `
Hi! 👋 Welcome to Nexpak Security Solutions.

I'm your virtual security assistant. I can help you with:

• Electric Fencing
• CCTV & Surveillance
• Alarm Systems
• Gate Automation
• Access Control
• Intercom Systems
• Roboguard
• Equestrian Fencing
• Quotes & product information

What can I help you with today?
        `.trim();

    }


    /* -----------------------------------------------------
       THANK YOU
    ----------------------------------------------------- */

    if (
        message.includes('thank you') ||
        message.includes('thanks') ||
        message.includes('thx')
    ) {

        return `
You're very welcome! 😊

If you need anything else, I'm right here.

I can also help you request a quote or find the right security solution for your property.
        `.trim();

    }


    /* -----------------------------------------------------
       ELECTRIC FENCING
    ----------------------------------------------------- */

    if (
        message.includes('electric fence') ||
        message.includes('electric fencing') ||
        message.includes('electric fence')
    ) {

        return `
⚡ Electric Fencing

Nexpak Security Solutions supplies electric fencing equipment and security solutions for residential, commercial and agricultural properties.

We can help with:

• Electric fence systems
• Energizers
• Fence accessories
• Insulators
• High-voltage conductors
• Gate connections
• Warning signage
• Repairs and maintenance
• Professional installation

If you're looking for a quote, tell me approximately how many metres of fencing you need and your location.
        `.trim();

    }


    /* -----------------------------------------------------
       CCTV
    ----------------------------------------------------- */

    if (
        message.includes('cctv') ||
        message.includes('camera') ||
        message.includes('security camera') ||
        message.includes('surveillance')
    ) {

        return `
📹 CCTV & Surveillance

We can help you with CCTV solutions for homes, businesses, farms and other properties.

Options can include:

• HD CCTV
• IP CCTV
• Night vision
• Remote viewing
• Motion detection
• Recording
• Multiple-camera systems

If you tell me how many cameras you think you need, I can help you work out what type of system would suit you.
        `.trim();

    }


    /* -----------------------------------------------------
       ALARM SYSTEMS
    ----------------------------------------------------- */

    if (
        message.includes('alarm') ||
        message.includes('alarms')
    ) {

        return `
🚨 Alarm Systems

Nexpak Security Solutions can assist with alarm security solutions for residential and commercial properties.

We can help with:

• Alarm panels
• Wireless alarm systems
• Wired systems
• Sensors
• Outdoor detection
• Remote notifications
• Integration with other security systems

Tell me whether this is for a house, business, farm or another property and I can guide you further.
        `.trim();

    }


    /* -----------------------------------------------------
       GATE AUTOMATION
    ----------------------------------------------------- */

    if (
        message.includes('gate motor') ||
        message.includes('gate automation') ||
        message.includes('automated gate') ||
        message.includes('automatic gate')
    ) {

        return `
🚪 Gate Automation

We supply gate automation solutions for sliding and swing gates.

We can assist with:

• Gate motors
• Remotes
• Battery backup
• Safety beams
• Access control integration
• Replacement equipment
• Installation and maintenance

If you tell me whether your gate is sliding or swing type, I can help you choose the right solution.
        `.trim();

    }


    /* -----------------------------------------------------
       ACCESS CONTROL
    ----------------------------------------------------- */

    if (
        message.includes('access control') ||
        message.includes('biometric') ||
        message.includes('fingerprint') ||
        message.includes('facial recognition') ||
        message.includes('access system')
    ) {

        return `
🔐 Access Control

We provide access control solutions for controlling who can enter your property.

Solutions may include:

• Fingerprint access
• Facial recognition
• PIN access
• Card readers
• Time attendance
• Door controllers
• Exit buttons
• Access logs

Tell me what type of door or entrance you want to secure and I can help you determine what you need.
        `.trim();

    }


    /* -----------------------------------------------------
       INTERCOM
    ----------------------------------------------------- */

    if (
        message.includes('intercom') ||
        message.includes('video doorbell') ||
        message.includes('door phone')
    ) {

        return `
📞 Intercom Systems

We can assist with intercom and video communication systems for homes, offices and businesses.

Features can include:

• Video calling
• Two-way communication
• Remote door release
• Multiple indoor stations
• Visitor identification

If you tell me how many entrances you have, I can help you work out a suitable system.
        `.trim();

    }


    /* -----------------------------------------------------
       ROBoguard
    ----------------------------------------------------- */

    if (
        message.includes('roboguard') ||
        message.includes('early warning') ||
        message.includes('perimeter detection')
    ) {

        return `
🛡️ Roboguard & Perimeter Detection

Roboguard-style perimeter detection can provide an additional layer of early warning around a property.

It can be particularly useful for larger properties, farms and areas where early detection is important.

If you tell me what type of property you have and approximately how large the area is, I can help you determine what to consider.
        `.trim();

    }


    /* -----------------------------------------------------
       EQUESTRIAN
    ----------------------------------------------------- */

    if (
        message.includes('equestrian') ||
        message.includes('horse fence') ||
        message.includes('horse fencing') ||
        message.includes('paddock') ||
        message.includes('horse')
    ) {

        return `
🐴 Equestrian Fencing

Yes, we also supply equestrian fencing products.

Our range can include:

• Electric polytape
• Electric rope
• Energizers
• Fence accessories
• Horse-safe fencing solutions
• Solar options

If you're fencing a paddock, arena or horse property, tell me approximately how many metres you need and I can help you work out what products you may require.
        `.trim();

    }


    /* -----------------------------------------------------
       REPAIR
    ----------------------------------------------------- */

    if (
        message.includes('repair') ||
        message.includes('not working') ||
        message.includes('fault') ||
        message.includes('broken')
    ) {

        return `
🔧 Repairs & Maintenance

We can assist with security-system troubleshooting, repairs and maintenance.

This may include:

• Electric fencing
• CCTV
• Alarm systems
• Access control
• Gate automation
• Perimeter security

Tell me which system is giving you trouble and what is happening, and I'll help you work through the problem.
        `.trim();

    }


    /* -----------------------------------------------------
       QUOTE
    ----------------------------------------------------- */

    if (
        message.includes('quote') ||
        message.includes('quotation') ||
        message.includes('estimate') ||
        message.includes('pricing') ||
        message.includes('price') ||
        message.includes('cost') ||
        message.includes('how much')
    ) {

        return `
💰 I'd be happy to help you with a quote.

Please tell me:

1. What security system do you need?
2. Is it for a home, business, farm or another property?
3. Approximately how large is the property?
4. What area are you located in?

You can also leave your contact details and our team can follow up with you.
        `.trim();

    }


    /* -----------------------------------------------------
       CONTACT
    ----------------------------------------------------- */

    if (
        message.includes('contact') ||
        message.includes('phone') ||
        message.includes('whatsapp') ||
        message.includes('email') ||
        message.includes('call you')
    ) {

        return `
📞 Contact Nexpak Security Solutions

Our team can assist you with product information, quotations, installation and security advice.

📱 Phone / WhatsApp:
${CONFIG.phone}

📧 Email:
${CONFIG.email}

We look forward to helping you secure your property. 🛡️
        `.trim();

    }


    /* -----------------------------------------------------
       INSTALLATION
    ----------------------------------------------------- */

    if (
        message.includes('installation') ||
        message.includes('install') ||
        message.includes('installer')
    ) {

        return `
🔧 Installation

We can assist with professional security-system installation depending on the solution and location.

This can include:

• Electric fencing
• CCTV
• Gate automation
• Access control
• Alarm systems
• Intercoms
• Perimeter security

Tell me what you need installed and your location, and I can guide you on the next step.
        `.trim();

    }


    /* -----------------------------------------------------
       AREAS
    ----------------------------------------------------- */

    if (
        message.includes('where are you') ||
        message.includes('where do you operate') ||
        message.includes('areas') ||
        message.includes('location') ||
        message.includes('gauteng')
    ) {

        return `
📍 Service Areas

Nexpak Security Solutions is based in Gauteng and can assist customers in Gauteng and surrounding areas.

For projects outside our normal service area, contact us so we can confirm availability.

Where are you located?
        `.trim();

    }


    /* -----------------------------------------------------
       HELP
    ----------------------------------------------------- */

    if (
        message.includes('help') ||
        message.includes('what can you do') ||
        message.includes('what do you offer')
    ) {

        return `
🤖 I'm here to help!

I can answer questions about:

⚡ Electric Fencing
📹 CCTV
🚨 Alarm Systems
🚪 Gate Automation
🔐 Access Control
📞 Intercoms
🛡️ Roboguard
🐴 Equestrian Fencing
🔧 Repairs & Maintenance
💰 Quotes & Pricing

Just type your question in your own words.
        `.trim();

    }


    /* -----------------------------------------------------
       DEFAULT RESPONSE
    ----------------------------------------------------- */

    return `
I can help with that. 😊

I specialise in helping customers find the right Nexpak security solution.

You can ask me about:

• Electric Fencing
• CCTV
• Alarm Systems
• Gate Automation
• Access Control
• Intercoms
• Roboguard
• Equestrian Fencing
• Repairs
• Quotes

What would you like to know?
    `.trim();

}

    /* =========================================================
   LEAD CAPTURE
========================================================= */

function showLeadForm() {

    const form =
        document.getElementById(
            'nexpak-lead-form'
        );

    if (!form) {
        return;
    }

    form.classList.add(
        'nexpak-lead-visible'
    );

}


/* =========================================================
   HIDE LEAD FORM
========================================================= */

function hideLeadForm() {

    const form =
        document.getElementById(
            'nexpak-lead-form'
        );

    if (!form) {
        return;
    }

    form.classList.remove(
        'nexpak-lead-visible'
    );

}


/* =========================================================
   SUBMIT LEAD
========================================================= */

function submitLead() {

    const name =
        document.getElementById(
            'nexpak-lead-name'
        );

    const email =
        document.getElementById(
            'nexpak-lead-email'
        );

    const phone =
        document.getElementById(
            'nexpak-lead-phone'
        );

    const interest =
        document.getElementById(
            'nexpak-lead-interest'
        );


    if (!name || !email) {
        return;
    }


    const nameValue =
        name.value.trim();

    const emailValue =
        email.value.trim();

    const phoneValue =
        phone
            ? phone.value.trim()
            : '';

    const interestValue =
        interest
            ? interest.value.trim()
            : '';


    if (!nameValue) {

        name.focus();

        return;

    }


    if (!emailValue) {

        email.focus();

        return;

    }


    if (
        !emailValue.includes('@') ||
        !emailValue.includes('.')
    ) {

        email.focus();

        return;

    }


    chatState.userInfo = {

        name: nameValue,

        email: emailValue,

        phone: phoneValue,

        interest: interestValue,

        time: Date.now()

    };


    chatState.leadCaptured = true;


    localStorage.setItem(

        'nexpak_chat_lead',

        JSON.stringify(
            chatState.userInfo
        )

    );


    hideLeadForm();


    addMessage(

        `Thanks ${nameValue}! 👍

We've received your details.

Our team can contact you regarding your ${interestValue || 'security requirements'}.

If you need anything else, you can continue chatting with me.`,

        'bot'

    );


    /*
     * Send the lead to the configured endpoint
     * if one has been supplied.
     */

    if (
        CONFIG.leadEndpoint &&
        typeof fetch === 'function'
    ) {

        fetch(
            CONFIG.leadEndpoint,
            {

                method: 'POST',

                headers: {

                    'Content-Type':
                        'application/json'

                },

                body: JSON.stringify(
                    chatState.userInfo
                )

            }

        ).catch(function(error) {

            console.warn(
                'Nexpak Chat: Lead endpoint error.',
                error
            );

        });

    }

}


/* =========================================================
   CHECK SAVED LEAD
========================================================= */

function loadLead() {

    try {

        const saved =
            localStorage.getItem(
                'nexpak_chat_lead'
            );


        if (!saved) {
            return;
        }


        const lead =
            JSON.parse(saved);


        if (!lead) {
            return;
        }


        chatState.userInfo =
            lead;

        chatState.leadCaptured =
            true;


    } catch (error) {

        console.warn(
            'Nexpak Chat: Unable to load lead.',
            error
        );

    }

}


/* =========================================================
   LEAD FORM HTML
========================================================= */

function createLeadForm() {

    const existing =
        document.getElementById(
            'nexpak-lead-form'
        );

    if (existing) {
        return;
    }


    const wrapper =
        document.createElement('div');


    wrapper.id =
        'nexpak-lead-form';

    wrapper.className =
        'nexpak-lead-form';


    wrapper.innerHTML = `

        <div class="nexpak-lead-title">

            <strong>
                Want us to contact you?
            </strong>

            <button
                type="button"
                id="nexpak-lead-close"
                aria-label="Close"
            >
                ×
            </button>

        </div>


        <p class="nexpak-lead-text">

            Leave your details and our team
            can assist you with your security
            requirements.

        </p>


        <input
            type="text"
            id="nexpak-lead-name"
            placeholder="Your name"
            autocomplete="name"
        >


        <input
            type="email"
            id="nexpak-lead-email"
            placeholder="Email address"
            autocomplete="email"
        >


        <input
            type="tel"
            id="nexpak-lead-phone"
            placeholder="Phone number"
            autocomplete="tel"
        >


        <input
            type="text"
            id="nexpak-lead-interest"
            placeholder="What security do you need?"
        >


        <button
            type="button"
            id="nexpak-lead-submit"
            class="nexpak-lead-submit"
        >
            Send My Details
        </button>

    `;


    document.body.appendChild(
        wrapper
    );


    const closeButton =
        document.getElementById(
            'nexpak-lead-close'
        );


    if (closeButton) {

        closeButton.addEventListener(
            'click',
            hideLeadForm
        );

    }


    const submitButton =
        document.getElementById(
            'nexpak-lead-submit'
        );


    if (submitButton) {

        submitButton.addEventListener(
            'click',
            submitLead
        );

    }

}


/* =========================================================
   CHATBOT INTRO MESSAGE
========================================================= */

function showWelcomeMessage() {

    const container =
        document.getElementById(
            'nexpak-chat-messages'
        );


    if (!container) {
        return;
    }


    if (
        container.children.length > 0
    ) {
        return;
    }


    addMessage(

        `Hi! 👋 I'm Nexpak's virtual security assistant.

I can help you find the right security products, answer questions and help you request a quote.

What are you looking for today?`,

        'bot'

    );

}


/* =========================================================
   CHATBOT INITIALISATION
========================================================= */

function initialiseChatbot() {

    createChatbotUI();

    createLeadForm();

    loadLead();

    loadChat();

    showWelcomeMessage();

    setupChatEvents();

}


/* =========================================================
   START CHATBOT
========================================================= */

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initialiseChatbot
    );

} else {

    initialiseChatbot();

            }
    
    
