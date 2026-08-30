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
    
    /* =========================================================
   PART 5 — CHAT HISTORY + MESSAGE ENGINE
========================================================= */

    function saveChat() {

        try {

            localStorage.setItem(
                CONFIG.storageKey,
                JSON.stringify(chatState.messages)
            );

        } catch (error) {

            console.warn(
                "Nexpak chatbot: unable to save chat history.",
                error
            );

        }

    }


    /* =========================================================
       LOAD CHAT
    ========================================================= */

    function loadChat() {

        try {

            const saved =
                localStorage.getItem(
                    CONFIG.storageKey
                );

            if (!saved) return;

            const history =
                JSON.parse(saved);

            if (!Array.isArray(history)) return;

            chatState.messages = history;

            history.forEach(function(message) {

                renderMessage(
                    message.text,
                    message.sender,
                    false
                );

            });

        } catch (error) {

            console.warn(
                "Nexpak chatbot: unable to load chat history.",
                error
            );

        }

    }


    /* =========================================================
       CLEAR CHAT
    ========================================================= */

    function clearChat() {

        chatState.messages = [];

        try {

            localStorage.removeItem(
                CONFIG.storageKey
            );

        } catch (error) {

            console.warn(
                "Nexpak chatbot: unable to clear history.",
                error
            );

        }

        const container =
            document.getElementById(
                "nexpak-chat-messages"
            );

        if (container) {

            container.innerHTML = "";

        }

        addBotMessage(
            CONFIG.greeting
        );

    }


    /* =========================================================
       ADD USER MESSAGE
    ========================================================= */

    function addUserMessage(text) {

        if (!text) return;

        const message = {

            text: text,

            sender: "user",

            time: Date.now()

        };

        chatState.messages.push(message);

        renderMessage(
            text,
            "user",
            true
        );

        saveChat();

    }


    /* =========================================================
       ADD BOT MESSAGE
    ========================================================= */

    function addBotMessage(text) {

        if (!text) return;

        const message = {

            text: text,

            sender: "bot",

            time: Date.now()

        };

        chatState.messages.push(message);

        renderMessage(
            text,
            "bot",
            true
        );

        saveChat();

    }


    /* =========================================================
       RENDER MESSAGE
    ========================================================= */

    function renderMessage(
        text,
        sender,
        scroll
    ) {

        const container =
            document.getElementById(
                "nexpak-chat-messages"
            );

        if (!container) return;


        const message =
            document.createElement("div");


        message.className =
            sender === "user"
                ? "nexpak-message user"
                : "nexpak-message bot";


        const bubble =
            document.createElement("div");


        bubble.className =
            "nexpak-message-bubble";


        /*
         * Convert line breaks into
         * readable chat formatting.
         */

        bubble.innerHTML =
            formatBotText(text);


        message.appendChild(
            bubble
        );


        container.appendChild(
            message
        );


        if (scroll !== false) {

            scrollChatToBottom();

        }

    }


    /* =========================================================
       FORMAT CHAT TEXT
    ========================================================= */

    function formatBotText(text) {

        if (!text) return "";


        let formatted =
            String(text);


        /*
         * Escape HTML first so that
         * customer messages cannot
         * inject unwanted HTML.
         */

        formatted =
            formatted
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");


        /*
         * Convert line breaks.
         */

        formatted =
            formatted.replace(
                /\n/g,
                "<br>"
            );


        /*
         * Simple bullet formatting.
         */

        formatted =
            formatted.replace(
                /•/g,
                "•"
            );


        return formatted;

    }


    /* =========================================================
       SCROLL CHAT
    ========================================================= */

    function scrollChatToBottom() {

        const container =
            document.getElementById(
                "nexpak-chat-messages"
            );

        if (!container) return;


        setTimeout(function() {

            container.scrollTop =
                container.scrollHeight;

        }, 20);

    }


    /* =========================================================
       TYPING INDICATOR
    ========================================================= */

    function showTyping() {

        if (
            document.getElementById(
                "nexpak-typing"
            )
        ) {

            return;

        }


        const container =
            document.getElementById(
                "nexpak-chat-messages"
            );

        if (!container) return;


        const typing =
            document.createElement("div");


        typing.id =
            "nexpak-typing";


        typing.className =
            "nexpak-message bot";


        typing.innerHTML = `

            <div class="nexpak-typing-bubble">

                <span></span>
                <span></span>
                <span></span>

            </div>

        `;


        container.appendChild(
            typing
        );


        scrollChatToBottom();

    }


    /* =========================================================
       HIDE TYPING INDICATOR
    ========================================================= */

    function hideTyping() {

        const typing =
            document.getElementById(
                "nexpak-typing"
            );

        if (typing) {

            typing.remove();

        }

    }


    /* =========================================================
       SEND MESSAGE
    ========================================================= */

    function sendChatMessage() {

        const input =
            document.getElementById(
                "nexpak-chat-input"
            );

        if (!input) return;


        const text =
            input.value.trim();


        if (!text) return;


        /*
         * Prevent multiple messages
         * while the bot is responding.
         */

        if (chatState.processing) {

            return;

        }


        addUserMessage(text);


        input.value = "";


        chatState.processing = true;


        showTyping();


        /*
         * Small natural delay so the
         * chatbot does not feel robotic.
         */

        const delay =
            650 +
            Math.floor(
                Math.random() * 650
            );


        setTimeout(function() {

            hideTyping();


            const response =
                generateAIResponse(text);


            addBotMessage(
                response
            );


            chatState.processing =
                false;


        }, delay);

    }


    /* =========================================================
       KEYBOARD SEND
    ========================================================= */

    function handleChatKeydown(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendChatMessage();

        }

    }


    /* =========================================================
       AI RESPONSE ENGINE
    ========================================================= */

    function generateAIResponse(
        userText
    ) {

        const message =
            userText
                .toLowerCase()
                .trim();


        /*
         * Greeting detection
         */

        if (
            message === "hi" ||
            message === "hello" ||
            message === "hey" ||
            message.includes("good morning") ||
            message.includes("good afternoon") ||
            message.includes("good evening")
        ) {

            return (
                "Hi! 👋 Welcome to Nexpak Security Solutions." +
                "\n\n" +
                "I can help you with electric fencing, CCTV, " +
                "gate automation, access control, alarms, " +
                "equestrian fencing and security quotes." +
                "\n\n" +
                "What are you looking for?"
            );

        }


        /*
         * Thank you
         */

        if (
            message.includes("thank you") ||
            message.includes("thanks")
        ) {

            return (
                "You're very welcome! 😊" +
                "\n\n" +
                "If you need anything else, I'm right here."
            );

        }


        /*
         * Electric fencing
         */

        if (
            message.includes("electric fence") ||
            message.includes("electric fencing") ||
            message.includes("perimeter fence") ||
            message.includes("security fence")
        ) {

            return (
                "Absolutely. ⚡" +
                "\n\n" +
                "Nexpak supplies electric fencing equipment " +
                "and can assist with perimeter-security solutions." +
                "\n\n" +
                "We can help with energizers, fence wire, " +
                "insulators, brackets, warning signs, " +
                "earth systems and accessories." +
                "\n\n" +
                "Would you like a quote or help choosing " +
                "the right system?"
            );

        }


        /*
         * CCTV
         */

        if (
            message.includes("cctv") ||
            message.includes("camera") ||
            message.includes("surveillance") ||
            message.includes("security camera")
        ) {

            return (
                "Sure! 📹" +
                "\n\n" +
                "We supply CCTV surveillance solutions " +
                "for homes, businesses and other properties." +
                "\n\n" +
                "Options can include HD/IP cameras, " +
                "night vision, recording and remote viewing." +
                "\n\n" +
                "Tell me how many cameras you think you need, " +
                "and I can help you work out the right solution."
            );

        }


        /*
         * Gate automation
         */

        if (
            message.includes("gate motor") ||
            message.includes("gate automation") ||
            message.includes("automated gate") ||
            message.includes("gate opener")
        ) {

            return (
                "Yes, we can help with gate automation. 🚪" +
                "\n\n" +
                "We can assist with sliding and swing-gate " +
                "automation, including suitable accessories " +
                "and battery-backup requirements." +
                "\n\n" +
                "Is your gate sliding or swinging?"
            );

        }


        /*
         * Access control
         */

        if (
            message.includes("access control") ||
            message.includes("biometric") ||
            message.includes("fingerprint") ||
            message.includes("facial recognition")
        ) {

            return (
                "We can help with access control. 🔐" +
                "\n\n" +
                "Solutions can include biometric, card and " +
                "other controlled-access systems." +
                "\n\n" +
                "Are you looking for access control for a " +
                "home, office, business or larger site?"
            );

        }


        /*
         * Equestrian
         */

        if (
            message.includes("equestrian") ||
            message.includes("horse fence") ||
            message.includes("horse fencing") ||
            message.includes("paddock") ||
            message.includes("horse")
        ) {

            return (
                "Absolutely! 🐴" +
                "\n\n" +
                "Nexpak also has a dedicated equestrian fencing " +
                "range, including products such as polytape, " +
                "rope, energizers and fencing accessories." +
                "\n\n" +
                "If you're fencing a paddock, arena or stable " +
                "property, tell me what you're building and " +
                "I'll help you choose the right products."
            );

        }


        /*
         * Quote requests
         */

        if (
            message.includes("quote") ||
            message.includes("quotation") ||
            message.includes("estimate") ||
            message.includes("price") ||
            message.includes("cost") ||
            message.includes("how much")
        ) {

            chatState.quoteRequested =
                true;


            return (
                "I'd be happy to help with a quote. 💬" +
                "\n\n" +
                "Tell me:" +
                "\n• What security system you need" +
                "\n• Your approximate property size" +
                "\n• Your location" +
                "\n\n" +
                "You can also leave your contact details " +
                "and our team can assist you directly."
            );

        }


        /*
         * Contact
         */

        if (
            message.includes("contact") ||
            message.includes("phone") ||
            message.includes("whatsapp") ||
            message.includes("email") ||
            message.includes("call you")
        ) {

            return (
                "Of course. 📞" +
                "\n\n" +
                "You can contact Nexpak Security Solutions " +
                "for product enquiries, quotes and assistance." +
                "\n\n" +
                "Phone: " +
                CONFIG.phone +
                "\nWhatsApp: " +
                CONFIG.whatsapp +
                "\nEmail: " +
                CONFIG.email
            );

        }


        /*
         * Installation
         */

        if (
            message.includes("installation") ||
            message.includes("install") ||
            message.includes("installer")
        ) {

            return (
                "We can assist with security-system installation " +
                "and related requirements. 🔧" +
                "\n\n" +
                "Tell me which system you're interested in " +
                "and your location, and I can guide you from there."
            );

        }


        /*
         * Areas
         */

        if (
            message.includes("where are you") ||
            message.includes("area") ||
            message.includes("gauteng") ||
            message.includes("benoni") ||
            message.includes("johannesburg")
        ) {

            return (
                "Nexpak Security Solutions is based in Gauteng " +
                "and assists customers with security products " +
                "and solutions in the surrounding areas." +
                "\n\n" +
                "Tell me your location and what you need, " +
                "and I'll help you with the next step."
            );

        }


        /*
         * Product question
         */

        if (
            message.includes("product") ||
            message.includes("what do you sell") ||
            message.includes("what do you offer") ||
            message.includes("services")
        ) {

            return (
                "We offer a range of security solutions. 🛡️" +
                "\n\n" +
                "• Electric Fencing" +
                "\n• CCTV & Surveillance" +
                "\n• Gate Automation" +
                "\n• Access Control" +
                "\n• Alarm Systems" +
                "\n• Intercom Systems" +
                "\n• Equestrian Fencing" +
                "\n\n" +
                "Which one would you like to know more about?"
            );

        }


        /*
         * Default intelligent response
         */

        return (
            "I can help with that. 👍" +
            "\n\n" +
            "I'm the Nexpak Security Solutions assistant, " +
            "and I can help you with:" +
            "\n\n" +
            "• Electric fencing" +
            "\n• CCTV" +
            "\n• Gate automation" +
            "\n• Access control" +
            "\n• Alarm systems" +
            "\n• Equestrian fencing" +
            "\n• Product information" +
            "\n• Quotes and enquiries" +
            "\n\n" +
            "Tell me a little more about what you need."
        );

        }
    /* =========================================================
   PART 6 — QUICK ACTIONS + LEAD CAPTURE
========================================================= */

    function handleQuickAction(action) {

        if (!action) return;


        /* ================================================
           GET A QUOTE
        ================================================ */

        if (action === "quote") {

            addUserMessage(
                "I'd like to get a quote."
            );

            setTimeout(function() {

                addBotMessage(
                    "Absolutely! 👍\n\n" +
                    "I can help you start a quote. " +
                    "First, what type of security solution " +
                    "are you interested in?\n\n" +
                    "• Electric Fencing\n" +
                    "• CCTV\n" +
                    "• Gate Automation\n" +
                    "• Access Control\n" +
                    "• Alarm System\n" +
                    "• Equestrian Fencing"
                );

                showLeadForm();

            }, 400);

            return;
        }


        /* ================================================
           VIEW PRODUCTS
        ================================================ */

        if (action === "products") {

            addUserMessage(
                "Show me your products."
            );

            setTimeout(function() {

                addBotMessage(
                    "Sure! 🛡️ Here's what Nexpak can help you with:\n\n" +
                    "⚡ Electric Fencing\n" +
                    "📹 CCTV & Surveillance\n" +
                    "🚪 Gate Automation\n" +
                    "🔐 Access Control\n" +
                    "🚨 Alarm Systems\n" +
                    "📞 Intercom Systems\n" +
                    "🐴 Equestrian Fencing\n\n" +
                    "Tell me which product you're interested in " +
                    "and I'll give you more information."
                );

            }, 400);

            return;
        }


        /* ================================================
           CONTACT US
        ================================================ */

        if (action === "contact") {

            addUserMessage(
                "I want to contact Nexpak."
            );

            setTimeout(function() {

                addBotMessage(
                    "Of course! 📞\n\n" +
                    "You can contact Nexpak Security Solutions:\n\n" +
                    "📱 Phone: " +
                    CONFIG.phone +
                    "\n\n" +
                    "💬 WhatsApp: " +
                    CONFIG.whatsapp +
                    "\n\n" +
                    "✉️ Email: " +
                    CONFIG.email +
                    "\n\n" +
                    "Our team will be happy to assist you."
                );

            }, 400);

            return;
        }

    }


    /* =========================================================
       SHOW LEAD FORM
    ========================================================= */

    function showLeadForm() {

        const form =
            document.getElementById(
                "nexpak-lead-form"
            );

        if (!form) return;


        form.classList.add(
            "visible"
        );


        const nameInput =
            document.getElementById(
                "nexpak-lead-name"
            );


        if (nameInput) {

            setTimeout(function() {

                nameInput.focus();

            }, 150);

        }


        scrollChatToBottom();

    }


    /* =========================================================
       HIDE LEAD FORM
    ========================================================= */

    function hideLeadForm() {

        const form =
            document.getElementById(
                "nexpak-lead-form"
            );

        if (!form) return;


        form.classList.remove(
            "visible"
        );

    }


    /* =========================================================
       SKIP LEAD FORM
    ========================================================= */

    function skipLeadForm() {

        hideLeadForm();


        addBotMessage(
            "No problem! 😊 You can continue chatting with me " +
            "without leaving your details."
        );

    }


    /* =========================================================
       SUBMIT LEAD
    ========================================================= */

    function submitLead() {

        const nameInput =
            document.getElementById(
                "nexpak-lead-name"
            );

        const emailInput =
            document.getElementById(
                "nexpak-lead-email"
            );

        const phoneInput =
            document.getElementById(
                "nexpak-lead-phone"
            );

        const interestInput =
            document.getElementById(
                "nexpak-lead-interest"
            );


        if (!nameInput || !emailInput) {

            return;

        }


        const name =
            nameInput.value.trim();


        const email =
            emailInput.value.trim();


        const phone =
            phoneInput
                ? phoneInput.value.trim()
                : "";


        const interest =
            interestInput
                ? interestInput.value.trim()
                : "";


        /* ================================================
           VALIDATION
        ================================================ */

        if (!name) {

            alert(
                "Please enter your name."
            );

            nameInput.focus();

            return;

        }


        if (!email) {

            alert(
                "Please enter your email address."
            );

            emailInput.focus();

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return;

        }


        /* ================================================
           SAVE CUSTOMER INFORMATION
        ================================================ */

        chatState.userInfo = {

            name: name,

            email: email,

            phone: phone,

            interest: interest,

            capturedAt:
                new Date().toISOString()

        };


        chatState.leadCaptured =
            true;


        /* ================================================
           SAVE LEAD LOCALLY
        ================================================ */

        try {

            localStorage.setItem(

                "nexpak_chat_lead",

                JSON.stringify(
                    chatState.userInfo
                )

            );

        } catch (error) {

            console.warn(
                "Nexpak chatbot: unable to save lead.",
                error
            );

        }


        hideLeadForm();


        /* ================================================
           CLEAR FORM
        ================================================ */

        nameInput.value = "";

        emailInput.value = "";


        if (phoneInput) {

            phoneInput.value = "";

        }


        if (interestInput) {

            interestInput.value = "";

        }


        /* ================================================
           CONFIRMATION MESSAGE
        ================================================ */

        addBotMessage(

            "Thanks, " +
            name +
            "! 😊\n\n" +

            "I've received your details and your enquiry " +
            "has been recorded." +

            "\n\n" +

            "Our team can contact you at " +
            email +

            (
                phone
                    ? " or " + phone + "."
                    : "."
            ) +

            "\n\n" +

            "Is there anything else you'd like to know " +
            "about our security solutions?"

        );


        /*
         * Send the lead to any connected
         * backend/API if one is configured.
         */

        sendLeadToBackend(
            chatState.userInfo
        );

    }


    /* =========================================================
       BACKEND LEAD HOOK
    ========================================================= */

    function sendLeadToBackend(lead) {

        /*
         * This function is intentionally safe.
         *
         * The chatbot will still work even when
         * no backend has been connected yet.
         *
         * When your Nexpak backend is ready,
         * this is the place where the lead can
         * be sent to your CRM / lead engine.
         */

        if (!CONFIG.leadEndpoint) {

            console.log(
                "Nexpak Lead:",
                lead
            );

            return;

        }


        fetch(
            CONFIG.leadEndpoint,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(lead)

            }

        )

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Lead request failed."
                );

            }

            return response.json();

        })

        .then(function(data) {

            console.log(
                "Nexpak lead successfully sent.",
                data
            );

        })

        .catch(function(error) {

            console.warn(
                "Nexpak chatbot lead delivery failed.",
                error
            );

        });

    }


    /* =========================================================
       AUTO LEAD PROMPT
    ========================================================= */

    function startLeadPromptTimer() {

        if (
            !CONFIG.captureLeads
        ) {

            return;

        }


        setTimeout(function() {

            if (
                chatState.leadCaptured
            ) {

                return;

            }


            if (
                chatState.messages.length > 1
            ) {

                addBotMessage(

                    "If you'd like us to contact you about " +
                    "your enquiry, you can leave your details " +
                    "here. 👇"

                );

                showLeadForm();

            }

        }, CONFIG.leadDelay);

    }


    /* =========================================================
       LOAD SAVED LEAD
    ========================================================= */

    function loadSavedLead() {

        try {

            const saved =
                localStorage.getItem(
                    "nexpak_chat_lead"
                );


            if (!saved) return;


            const lead =
                JSON.parse(saved);


            if (!lead || !lead.email) {

                return;

            }


            chatState.userInfo =
                lead;


            chatState.leadCaptured =
                true;


        } catch (error) {

            console.warn(
                "Nexpak chatbot: unable to load saved lead.",
                error
            );

        }

    }

 /* =========================================================
   PART 7 — QUICK BUTTONS + CHAT CONTROLS + INITIALIZATION
========================================================= */

    /* =========================================================
       QUICK ACTION BUTTONS
    ========================================================= */

    function createQuickActions() {

        const container =
            document.getElementById(
                "nexpak-quick-actions"
            );

        if (!container) return;


        container.innerHTML = "";


        const actions = [

            {
                label: "💬 Get a Quote",
                action: "quote"
            },

            {
                label: "🛡️ Products",
                action: "products"
            },

            {
                label: "📞 Contact Us",
                action: "contact"
            }

        ];


        actions.forEach(function(item) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "nexpak-quick-button";


            button.textContent =
                item.label;


            button.addEventListener(
                "click",
                function() {

                    handleQuickAction(
                        item.action
                    );

                }
            );


            container.appendChild(
                button
            );

        });

    }


    /* =========================================================
       OPEN CHAT
    ========================================================= */

    function openChat() {

        const chatbot =
            document.getElementById(
                "nexpak-chatbot"
            );

        const windowElement =
            document.getElementById(
                "nexpak-chat-window"
            );


        if (!chatbot || !windowElement) {

            return;

        }


        chatState.isOpen =
            true;


        chatbot.classList.add(
            "chat-open"
        );


        windowElement.classList.add(
            "open"
        );


        const input =
            document.getElementById(
                "nexpak-chat-input"
            );


        if (input) {

            setTimeout(function() {

                input.focus();

            }, 200);

        }


        scrollChatToBottom();

    }


    /* =========================================================
       CLOSE CHAT
    ========================================================= */

    function closeChat() {

        const chatbot =
            document.getElementById(
                "nexpak-chatbot"
            );

        const windowElement =
            document.getElementById(
                "nexpak-chat-window"
            );


        if (!chatbot || !windowElement) {

            return;

        }


        chatState.isOpen =
            false;


        chatbot.classList.remove(
            "chat-open"
        );


        windowElement.classList.remove(
            "open"
        );

    }


    /* =========================================================
       TOGGLE CHAT
    ========================================================= */

    function toggleChat() {

        if (
            chatState.isOpen
        ) {

            closeChat();

        } else {

            openChat();

        }

    }


    /* =========================================================
       CHAT BUTTON EVENTS
    ========================================================= */

    function setupChatEvents() {

        const toggle =
            document.getElementById(
                "nexpak-chat-toggle"
            );


        const close =
            document.getElementById(
                "nexpak-chat-close"
            );


        const send =
            document.getElementById(
                "nexpak-chat-send"
            );


        const input =
            document.getElementById(
                "nexpak-chat-input"
            );


        const skip =
            document.getElementById(
                "nexpak-lead-skip"
            );


        const submit =
            document.getElementById(
                "nexpak-lead-submit"
            );


        if (toggle) {

            toggle.addEventListener(
                "click",
                toggleChat
            );

        }


        if (close) {

            close.addEventListener(
                "click",
                closeChat
            );

        }


        if (send) {

            send.addEventListener(
                "click",
                sendChatMessage
            );

        }


        if (input) {

            input.addEventListener(
                "keydown",
                handleChatKeydown
            );

        }


        if (skip) {

            skip.addEventListener(
                "click",
                skipLeadForm
            );

        }


        if (submit) {

            submit.addEventListener(
                "click",
                submitLead
            );

        }


        /*
         * Allow clicking outside the chatbot
         * window to close it on desktop.
         */

        document.addEventListener(
            "click",
            function(event) {

                if (
                    !chatState.isOpen
                ) {

                    return;

                }


                const chatbot =
                    document.getElementById(
                        "nexpak-chatbot"
                    );


                if (
                    !chatbot
                ) {

                    return;

                }


                if (
                    !chatbot.contains(
                        event.target
                    )
                ) {

                    closeChat();

                }

            }
        );

    }


    /* =========================================================
       MOBILE KEYBOARD HANDLING
    ========================================================= */

    function setupMobileHandling() {

        const input =
            document.getElementById(
                "nexpak-chat-input"
            );


        if (!input) return;


        input.addEventListener(
            "focus",
            function() {

                setTimeout(
                    scrollChatToBottom,
                    300
                );

            }
        );

    }


    /* =========================================================
       CHAT WINDOW ACCESSIBILITY
    ========================================================= */

    function setupAccessibility() {

        const toggle =
            document.getElementById(
                "nexpak-chat-toggle"
            );


        const windowElement =
            document.getElementById(
                "nexpak-chat-window"
            );


        if (toggle) {

            toggle.setAttribute(
                "aria-label",
                "Open Nexpak AI Assistant"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (windowElement) {

            windowElement.setAttribute(
                "role",
                "dialog"
            );

            windowElement.setAttribute(
                "aria-label",
                "Nexpak Security AI Assistant"
            );

        }

    }


    /* =========================================================
       UPDATE ACCESSIBILITY STATE
    ========================================================= */

    function updateAccessibilityState() {

        const toggle =
            document.getElementById(
                "nexpak-chat-toggle"
            );


        if (!toggle) return;


        toggle.setAttribute(
            "aria-expanded",
            chatState.isOpen
                ? "true"
                : "false"
        );

    }


    /* =========================================================
       OPEN CHAT FROM EXTERNAL BUTTON
    ========================================================= */

    function attachExternalOpenButtons() {

        document
            .querySelectorAll(
                "[data-open-nexpak-chat]"
            )
            .forEach(function(button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        openChat();

                    }
                );

            });

    }


    /* =========================================================
       INITIAL BOT MESSAGE
    ========================================================= */

    function ensureGreeting() {

        if (
            chatState.messages.length > 0
        ) {

            return;

        }


        addBotMessage(
            CONFIG.greeting
        );

    }


    /* =========================================================
       INITIALIZE CHATBOT
    ========================================================= */

    function initializeChatbot() {

        /*
         * Make sure the HTML created by
         * the earlier section is available.
         */

        if (
            !document.getElementById(
                "nexpak-chatbot"
            )
        ) {

            return;

        }


        loadSavedLead();


        loadChat();


        ensureGreeting();


        createQuickActions();


        setupChatEvents();


        setupMobileHandling();


        setupAccessibility();


        attachExternalOpenButtons();


        startLeadPromptTimer();


        /*
         * Keep accessibility state synchronized.
         */

        const observer =
            new MutationObserver(
                function() {

                    updateAccessibilityState();

                }
            );


        const chatbot =
            document.getElementById(
                "nexpak-chatbot"
            );


        if (chatbot) {

            observer.observe(
                chatbot,
                {
                    attributes: true,
                    subtree: true
                }
            );

        }

    }


    /* =========================================================
       START CHATBOT
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeChatbot
        );

    } else {

        initializeChatbot();

    }


    /* =========================================================
       PUBLIC CHATBOT API
    ========================================================= */

    window.NexpakChatbot = {

        open: function() {

            openChat();

        },


        close: function() {

            closeChat();

        },


        toggle: function() {

            toggleChat();

        },


        send: function(message) {

            if (!message) return;


            addUserMessage(
                message
            );


            showTyping();


            setTimeout(
                function() {

                    hideTyping();


                    addBotMessage(
                        generateAIResponse(
                            message
                        )
                    );

                },
                700
            );

        },


        clear: function() {

            clearChat();

        },


        getLead: function() {

            return chatState.userInfo;

        },


        isOpen: function() {

            return chatState.isOpen;

        }

    };
