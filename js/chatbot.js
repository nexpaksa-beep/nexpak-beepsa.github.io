/**
 * NEXPAK SECURITY SOLUTIONS
 * Simple Customer Chatbot
 */

(function () {
    "use strict";

    /* ==============================
       CONFIGURATION
    ============================== */

    const CONFIG = {
        company: "Nexpak Security Solutions",
        phone: "0836308249",
        email: "info@nexpaksolutions.co.za",
        whatsapp: "27836308249",
        hours: "Mon-Fri 8am-5pm | Sat 8am-1pm",

        greeting:
            "Hi! 👋 Welcome to Nexpak Security Solutions. I can help you with CCTV, electric fencing, access control, gate automation, equestrian fencing and quotes."
    };

    /* ==============================
       PRODUCTS
    ============================== */

    const PRODUCTS = {
        "electric fencing": {
            name: "Electric Fencing",
            price: "From R350 per metre",
            info:
                "Perimeter electric fencing for homes, farms and businesses. Professional installation and maintenance available."
        },

        "cctv": {
            name: "CCTV Surveillance",
            price: "From R4,500",
            info:
                "HD and 4K CCTV systems with night vision, motion detection and remote viewing."
        },

        "access control": {
            name: "Access Control",
            price: "From R8,000",
            info:
                "Biometric, fingerprint, card and controlled-entry systems for homes and businesses."
        },

        "gate automation": {
            name: "Gate Automation",
            price: "From R12,000",
            info:
                "Sliding and swing gate automation with remote controls, battery backup and safety features."
        },

        "intercom": {
            name: "Video Intercom",
            price: "From R3,500",
            info:
                "Video intercom systems for visitor communication and remote gate or door access."
        },

        "equestrian": {
            name: "Equestrian Fencing",
            price: "Prices vary",
            info:
                "Horse-safe fencing products including polytape, rope, energizers and accessories."
        }
    };

    /* ==============================
       FAQS
    ============================== */

    const FAQS = {
        "free quote":
            "Yes! We offer free quotes. Tell me what security solution you need and I'll help you get started.",

        "quote":
            "I'd be happy to help with a quote. What type of security do you need and what size is the property?",

        "warranty":
            "Our products carry manufacturer warranties. Warranty periods depend on the specific product.",

        "payment":
            "We accept EFT, card payments and PayFast where applicable.",

        "areas":
            "We primarily serve Gauteng and surrounding areas. Contact us for installations further away.",

        "installation":
            "Professional installation is available. Installation time depends on the size and complexity of the project.",

        "maintenance":
            "Yes, maintenance and repair services are available for security systems."
    };

    /* ==============================
       CREATE CHATBOT
    ============================== */

    function createChatbot() {

        if (document.getElementById("nexpak-chatbot")) return;

        const html = `
        <div id="nexpak-chatbot">

            <button id="nexpak-chat-button">
                💬 Chat with us
            </button>

            <div id="nexpak-chat-window">

                <div id="nexpak-chat-header">
                    <div>
                        <strong>${CONFIG.company}</strong>
                        <small>● Online</small>
                    </div>

                    <button id="nexpak-close">×</button>
                </div>

                <div id="nexpak-messages">

                    <div class="nexpak-message bot">
                        ${CONFIG.greeting}
                    </div>

                </div>

                <div id="nexpak-buttons">

                    <button data-message="quote">
                        Get a Quote
                    </button>

                    <button data-message="products">
                        Products
                    </button>

                    <button data-message="contact">
                        Contact Us
                    </button>

                </div>

                <div id="nexpak-input-area">

                    <input
                        id="nexpak-input"
                        type="text"
                        placeholder="Type your message..."
                    >

                    <button id="nexpak-send">
                        Send
                    </button>

                </div>

            </div>

        </div>

        <style>

        #nexpak-chatbot {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 99999;
            font-family:
                Arial,
                sans-serif;
        }

        #nexpak-chat-button {
            border: none;
            border-radius: 30px;
            padding: 14px 22px;
            background: linear-gradient(
                135deg,
                #007bff,
                #0056b3
            );
            color: white;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
            box-shadow:
                0 5px 20px rgba(
                    0,
                    0,
                    0,
                    .25
                );
        }

        #nexpak-chat-window {
            display: none;
            position: absolute;
            right: 0;
            bottom: 65px;
            width: 360px;
            height: 520px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow:
                0 10px 40px rgba(
                    0,
                    0,
                    0,
                    .25
                );
            flex-direction: column;
        }

        #nexpak-chat-window.open {
            display: flex;
        }

        #nexpak-chat-header {
            background: linear-gradient(
                135deg,
                #007bff,
                #0056b3
            );
            color: white;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #nexpak-chat-header small {
            display: block;
            margin-top: 4px;
            opacity: .9;
        }

        #nexpak-close {
            border: none;
            background: transparent;
            color: white;
            font-size: 25px;
            cursor: pointer;
        }

        #nexpak-messages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
        }

        .nexpak-message {
            padding: 11px 14px;
            margin-bottom: 10px;
            border-radius: 15px;
            max-width: 85%;
            white-space: pre-line;
            line-height: 1.5;
            font-size: 14px;
        }

        .nexpak-message.bot {
            background: #f1f3f5;
            color: #222;
        }

        .nexpak-message.user {
            background: #007bff;
            color: white;
            margin-left: auto;
        }

        #nexpak-buttons {
            padding: 8px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }

        #nexpak-buttons button {
            border: none;
            background: #eef2f7;
            padding: 8px 11px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
        }

        #nexpak-input-area {
            display: flex;
            gap: 7px;
            padding: 10px;
            border-top: 1px solid #eee;
        }

        #nexpak-input {
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 22px;
            padding: 11px 14px;
            outline: none;
        }

        #nexpak-send {
            border: none;
            border-radius: 22px;
            padding: 10px 16px;
            background: #007bff;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }

        @media (max-width: 480px) {

            #nexpak-chatbot {
                right: 10px;
                bottom: 10px;
            }

            #nexpak-chat-window {
                width: calc(100vw - 20px);
                height: 70vh;
                right: 0;
            }

        }

        </style>
        `;

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );

        setupEvents();
    }

    /* ==============================
       RESPONSE ENGINE
    ============================== */

    function getResponse(text) {

        const message =
            text.toLowerCase().trim();

        /* CONTACT */

        if (
            message.includes("contact") ||
            message.includes("phone") ||
            message.includes("call") ||
            message.includes("whatsapp")
        ) {

            return `
You can contact Nexpak Security Solutions:

📞 ${CONFIG.phone}
📧 ${CONFIG.email}
💬 WhatsApp: ${CONFIG.phone}

🕐 ${CONFIG.hours}
            `.trim();
        }

        /* PRODUCTS LIST */

        if (
            message === "products" ||
            message.includes("your products") ||
            message.includes("what do you sell")
        ) {

            return `
Our security solutions include:

• Electric Fencing — From R350/m
• CCTV — From R4,500
• Access Control — From R8,000
• Gate Automation — From R12,000
• Video Intercom — From R3,500
• Equestrian Fencing

Which one would you like to know about?
            `.trim();
        }

        /* INDIVIDUAL PRODUCTS */

        for (
            const key in PRODUCTS
        ) {

            if (
                message.includes(key) ||
                (
                    key === "cctv" &&
                    message.includes("camera")
                ) ||
                (
                    key === "electric fencing" &&
                    message.includes("electric fence")
                ) ||
                (
                    key === "equestrian" &&
                    (
                        message.includes("horse") ||
                        message.includes("paddock")
                    )
                )
            ) {

                const product =
                    PRODUCTS[key];

                return `
${product.name}

${product.info}

💰 ${product.price}

Would you like a quote?
                `.trim();
            }
        }

        /* FAQ */

        for (
            const key in FAQS
        ) {

            if (
                message.includes(key)
            ) {

                return FAQS[key];

            }
        }

        /* PRICE */

        if (
            message.includes("price") ||
            message.includes("cost") ||
            message.includes("how much")
        ) {

            return `
Our guide prices are:

• Electric Fencing: R350-R500/m
• CCTV: R4,500+
• Access Control: R8,000+
• Gate Automation: R12,000+
• Intercom: R3,500+

Exact pricing depends on your requirements.
            `.trim();
        }

        /* THANK YOU */

        if (
            message.includes("thank")
        ) {

            return "You're welcome! 😊 Is there anything else I can help you with?";
        }

        /* DEFAULT */

        return `
I can help you with:

• Electric Fencing
• CCTV
• Access Control
• Gate Automation
• Intercom Systems
• Equestrian Fencing
• Quotes
• Installation

What would you like to know?
        `.trim();
    }

    /* ==============================
       ADD MESSAGE
    ============================== */

    function addMessage(
        text,
        type
    ) {

        const container =
            document.getElementById(
                "nexpak-messages"
            );

        const message =
            document.createElement("div");

        message.className =
            "nexpak-message " + type;

        message.textContent = text;

        container.appendChild(message);

        container.scrollTop =
            container.scrollHeight;
    }

    /* ==============================
       SEND MESSAGE
    ============================== */

    function sendMessage() {

        const input =
            document.getElementById(
                "nexpak-input"
            );

        const text =
            input.value.trim();

        if (!text) return;

        addMessage(
            text,
            "user"
        );

        input.value = "";

        setTimeout(
            function () {

                addMessage(
                    getResponse(text),
                    "bot"
                );

            },
            400
        );
    }

    /* ==============================
       EVENTS
    ============================== */

    function setupEvents() {

        const button =
            document.getElementById(
                "nexpak-chat-button"
            );

        const windowBox =
            document.getElementById(
                "nexpak-chat-window"
            );

        const close =
            document.getElementById(
                "nexpak-close"
            );

        const send =
            document.getElementById(
                "nexpak-send"
            );

        const input =
            document.getElementById(
                "nexpak-input"
            );

        button.onclick =
            function () {

                windowBox.classList.toggle(
                    "open"
                );

            };

        close.onclick =
            function () {

                windowBox.classList.remove(
                    "open"
                );

            };

        send.onclick =
            sendMessage;

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    sendMessage();

                }

            }
        );

        document
            .querySelectorAll(
                "#nexpak-buttons button"
            )
            .forEach(
                function (btn) {

                    btn.onclick =
                        function () {

                            const text =
                                this.dataset.message;

                            addMessage(
                                text,
                                "user"
                            );

                            setTimeout(
                                function () {

                                    addMessage(
                                        getResponse(
                                            text
                                        ),
                                        "bot"
                                    );

                                },
                                300
                            );

                        };

                }
            );
    }

    /* ==============================
       START
    ============================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            createChatbot
        );

    } else {

        createChatbot();

    }

})();
