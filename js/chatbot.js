/**
 * ============================================================
 * NEXPAK SECURITY SOLUTIONS
 * AI CUSTOMER ASSISTANT — COMPLETE UNIFIED SCRIPT
 * ============================================================
 */

(function () {

    "use strict";

    /* =========================================================
       CONFIGURATION
    ========================================================= */

    const CONFIG = {
        companyName: "Nexpak Security Solutions",
        phone: "0836308249",
        whatsapp: "27836308249",
        email: "info@nexpaksolutions.co.za",
        businessHours: "Mon-Fri: 8am-5pm | Sat: 8am-1pm",
        greeting: "Hi! 👋 Welcome to Nexpak Security Solutions. I can help you with electric fencing, CCTV, gate automation, access control, alarms, equestrian fencing and security quotes. What are you looking for?",
        storageKey: "nexpak_ai_chat",
        captureLeads: true,
        leadDelay: 25000
    };


    /* =========================================================
       CHAT STATE (Unified)
    ========================================================= */

    const chatState = {
        isOpen: false,
        messages: [],
        processing: false,
        leadCaptured: false,
        userInfo: {},
        started: Date.now()
    };


    /* =========================================================
       AUTO-INJECT HTML & CSS (Self-Contained UI)
    ========================================================= */

    function createChatbotUI() {
        if (document.getElementById("nexpak-chatbot")) {
            return; // Already exists in HTML
        }

        // Inject Stylesheet
        const style = document.createElement("style");
        style.textContent = `
            #nexpak-chatbot {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            #nexpak-chatbot * {
                box-sizing: border-box;
            }
            .nexpak-chat-toggle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #0f172a;
                color: #ffffff;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                position: relative;
                transition: transform 0.3s ease;
            }
            .nexpak-chat-toggle:hover {
                transform: scale(1.05);
            }
            .nexpak-bot-hand {
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 16px;
            }
            .nexpak-chat-window {
                position: absolute;
                bottom: 75px;
                right: 0;
                width: 360px;
                height: 520px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            .nexpak-chat-window.open {
                display: flex;
            }
            .nexpak-chat-header {
                background: #0f172a;
                color: #ffffff;
                padding: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .nexpak-header-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .nexpak-bot-avatar {
                font-size: 20px;
            }
            .nexpak-status-dot {
                font-size: 11px;
                color: #4ade80;
                display: block;
            }
            #nexpak-chat-close {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 22px;
                cursor: pointer;
            }
            .nexpak-chat-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .nexpak-message {
                max-width: 80%;
                display: flex;
                flex-direction: column;
            }
            .nexpak-message.user {
                align-self: flex-end;
            }
            .nexpak-message.bot {
                align-self: flex-start;
            }
            .nexpak-message-bubble {
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 14px;
                line-height: 1.4;
                word-break: break-word;
            }
            .nexpak-message.user .nexpak-message-bubble {
                background: #0f172a;
                color: #ffffff;
                border-bottom-right-radius: 2px;
            }
            .nexpak-message.bot .nexpak-message-bubble {
                background: #e2e8f0;
                color: #1e293b;
                border-bottom-left-radius: 2px;
            }
            .nexpak-quick-actions {
                padding: 8px 12px;
                background: #f1f5f9;
                display: flex;
                gap: 6px;
                border-top: 1px solid #e2e8f0;
                overflow-x: auto;
            }
            .nexpak-quick-button {
                background: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 6px 10px;
                border-radius: 16px;
                font-size: 12px;
                cursor: pointer;
                white-space: nowrap;
                color: #334155;
            }
            .nexpak-quick-button:hover {
                background: #0f172a;
                color: #ffffff;
                border-color: #0f172a;
            }
            .nexpak-chat-input-area {
                padding: 12px;
                background: #ffffff;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }
            #nexpak-chat-input {
                flex: 1;
                padding: 10px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                outline: none;
                font-size: 14px;
            }
            #nexpak-chat-input:focus {
                border-color: #0f172a;
            }
            #nexpak-chat-send {
                background: #0f172a;
                color: #ffffff;
                border: none;
                padding: 0 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            }
            .nexpak-lead-form {
                position: absolute;
                bottom: 75px;
                right: 0;
                width: 360px;
                background: #ffffff;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border-radius: 16px;
                display: none;
                flex-direction: column;
                gap: 10px;
                z-index: 10;
                border: 1px solid #e2e8f0;
            }
            .nexpak-lead-form.visible {
                display: flex;
            }
            .nexpak-lead-form input {
                padding: 9px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 6px;
                font-size: 13px;
            }
            .nexpak-lead-submit {
                background: #0f172a;
                color: #ffffff;
                border: none;
                padding: 10px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            }
            .nexpak-floating-greeting {
                position: absolute;
                bottom: 75px;
                right: 0;
                background: #ffffff;
                padding: 10px 14px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                font-size: 13px;
                color: #1e293b;
                display: none;
                white-space: nowrap;
                border: 1px solid #e2e8f0;
            }
            .nexpak-floating-greeting.visible {
                display: block;
            }
            .nexpak-typing-bubble span {
                height: 7px;
                width: 7px;
                float: left;
                margin: 0 2px;
                background-color: #94a3b8;
                border-radius: 50%;
                display: inline-block;
                animation: nexpak-bounce 1.3s infinite ease-in-out;
            }
            .nexpak-typing-bubble span:nth-child(2) { animation-delay: -1.1s; }
            .nexpak-typing-bubble span:nth-child(3) { animation-delay: -0.9s; }
            @keyframes nexpak-bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-4px); }
            }
        `;
        document.head.appendChild(style);

        // Inject HTML Structure
        const container = document.createElement("div");
        container.id = "nexpak-chatbot";
        container.innerHTML = `
            <div id="nexpak-floating-greeting" class="nexpak-floating-greeting">Hi! Need help with security? 👋</div>
            
            <div id="nexpak-chat-window" class="nexpak-chat-window">
                <div class="nexpak-chat-header">
                    <div class="nexpak-header-info">
                        <span class="nexpak-bot-avatar">🛡️</span>
                        <div>
                            <strong>Nexpak Security AI</strong>
                            <span class="nexpak-status-dot">● Online</span>
                        </div>
                    </div>
                    <button type="button" id="nexpak-chat-close">&times;</button>
                </div>
                <div id="nexpak-chat-messages" class="nexpak-chat-messages"></div>
                <div id="nexpak-quick-actions" class="nexpak-quick-actions"></div>
                <div class="nexpak-chat-input-area">
                    <input type="text" id="nexpak-chat-input" placeholder="Type your message..." autocomplete="off">
                    <button type="button" id="nexpak-chat-send">Send</button>
                </div>
            </div>

            <div id="nexpak-lead-form" class="nexpak-lead-form">
                <strong>Want us to contact you?</strong>
                <p style="font-size:12px; color:#64748b; margin:0;">Leave your details and our team will follow up.</p>
                <input type="text" id="nexpak-lead-name" placeholder="Your name">
                <input type="email" id="nexpak-lead-email" placeholder="Email address">
                <input type="tel" id="nexpak-lead-phone" placeholder="Phone number">
                <input type="text" id="nexpak-lead-interest" placeholder="What security do you need?">
                <button type="button" id="nexpak-lead-submit" class="nexpak-lead-submit">Send My Details</button>
                <button type="button" id="nexpak-lead-skip" style="background:none; border:none; color:#64748b; font-size:12px; cursor:pointer;">No thanks, continue chatting</button>
            </div>

            <button type="button" id="nexpak-chat-toggle" class="nexpak-chat-toggle">
                <span class="nexpak-bot-hand">👋</span>
                <span>💬</span>
            </button>
        `;
        document.body.appendChild(container);
    }


    /* =========================================================
       AI RESPONSE ENGINE
    ========================================================= */

    function generateAIResponse(userText) {
        const message = String(userText || "").toLowerCase().trim();

        if (message === "hi" || message === "hello" || message === "hey" || message.includes("good morning")) {
            return "Hi! 👋 Welcome to Nexpak Security Solutions.\n\nI can help you with electric fencing, CCTV, gate automation, access control, alarms, equestrian fencing and security quotes. What are you looking for?";
        }

        if (message.includes("thank you") || message.includes("thanks")) {
            return "You're very welcome! 😊 If you need anything else, I'm right here.";
        }

        if (message.includes("electric fence") || message.includes("electric fencing") || message.includes("perimeter fence")) {
            return "Absolutely. ⚡ Nexpak supplies electric fencing equipment and perimeter-security solutions, including energizers, fence wire, insulators, brackets, and accessories. Would you like a quote or help choosing the right system?";
        }

        if (message.includes("cctv") || message.includes("camera") || message.includes("surveillance")) {
            return "Sure! 📹 We supply CCTV surveillance solutions for homes, businesses and farms, including HD/IP cameras, night vision, recording, and remote viewing. Tell me how many cameras you need to get started.";
        }

        if (message.includes("gate motor") || message.includes("gate automation") || message.includes("automated gate")) {
            return "Yes, we assist with gate automation 🚪 for sliding and swing gates, including replacement motors, batteries, and safety beams. Is your gate sliding or swinging?";
        }

        if (message.includes("access control") || message.includes("biometric") || message.includes("fingerprint")) {
            return "We provide access control solutions 🔐 such as biometric fingerprint readers, facial recognition, and card access systems. Are you securing a home, office, or industrial site?";
        }

        if (message.includes("equestrian") || message.includes("horse fence") || message.includes("paddock") || message.includes("horse")) {
            return "Absolutely! 🐴 Nexpak carries a dedicated equestrian fencing range featuring polytape, rope, energizers, and horse-safe paddock solutions. Tell me what you're building!";
        }

        if (message.includes("quote") || message.includes("quotation") || message.includes("price") || message.includes("cost") || message.includes("how much")) {
            return "I'd be happy to help with a quote. 💬 Please share:\n• What security system you need\n• Your property type/size\n• Your location\n\nYou can also leave your contact details via our quick form and our team will get in touch.";
        }

        if (message.includes("contact") || message.includes("phone") || message.includes("whatsapp") || message.includes("email")) {
            return "Of course. 📞 You can reach Nexpak Security Solutions directly:\n\n📱 Phone: " + CONFIG.phone + "\n💬 WhatsApp: " + CONFIG.whatsapp + "\n✉️ Email: " + CONFIG.email;
        }

        if (message.includes("installation") || message.includes("install")) {
            return "We assist with professional security-system installation 🔧 across Gauteng and surrounding areas. Tell me what system you need installed!";
        }

        if (message.includes("where are you") || message.includes("gauteng") || message.includes("benoni") || message.includes("area")) {
            return "Nexpak Security Solutions is based in Gauteng and services surrounding areas 📍. Tell me your location and what security solution you're looking for.";
        }

        return "I can help with that. 👍 I'm the Nexpak Security Assistant. You can ask me about electric fencing, CCTV, gate automation, access control, alarms, equestrian fencing, or request a quote!";
    }


    /* =========================================================
       STORAGE & CHAT ENGINE
    ========================================================= */

    function saveChat() {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(chatState.messages));
        } catch (error) {
            console.warn("Nexpak chatbot: unable to save chat history.", error);
        }
    }

    function loadChat() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (!saved) return;
            const history = JSON.parse(saved);
            if (!Array.isArray(history)) return;
            chatState.messages = history;
            history.forEach(function(msg) {
                renderMessage(msg.text, msg.sender, false);
            });
        } catch (error) {
            console.warn("Nexpak chatbot: unable to load chat history.", error);
        }
    }

    function addUserMessage(text) {
        if (!text) return;
        const message = { text: text, sender: "user", time: Date.now() };
        chatState.messages.push(message);
        renderMessage(text, "user", true);
        saveChat();
    }

    function addBotMessage(text) {
        if (!text) return;
        const message = { text: text, sender: "bot", time: Date.now() };
        chatState.messages.push(message);
        renderMessage(text, "bot", true);
        saveChat();
    }

    function renderMessage(text, sender, scroll) {
        const container = document.getElementById("nexpak-chat-messages");
        if (!container) return;

        const message = document.createElement("div");
        message.className = sender === "user" ? "nexpak-message user" : "nexpak-message bot";

        const bubble = document.createElement("div");
        bubble.className = "nexpak-message-bubble";
        bubble.innerHTML = String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");

        message.appendChild(bubble);
        container.appendChild(message);

        if (scroll !== false) {
            container.scrollTop = container.scrollHeight;
        }
    }

    function showTyping() {
        if (document.getElementById("nexpak-typing")) return;
        const container = document.getElementById("nexpak-chat-messages");
        if (!container) return;

        const typing = document.createElement("div");
        typing.id = "nexpak-typing";
        typing.className = "nexpak-message bot";
        typing.innerHTML = `<div class="nexpak-message-bubble nexpak-typing-bubble"><span></span><span></span><span></span></div>`;
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById("nexpak-typing");
        if (typing) typing.remove();
    }

    function sendChatMessage() {
        const input = document.getElementById("nexpak-chat-input");
        if (!input) return;
        const text = input.value.trim();
        if (!text || chatState.processing) return;

        addUserMessage(text);
        input.value = "";
        chatState.processing = true;
        showTyping();

        setTimeout(function() {
            hideTyping();
            const response = generateAIResponse(text);
            addBotMessage(response);
            chatState.processing = false;
        }, 600 + Math.floor(Math.random() * 400));
    }

    function handleChatKeydown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendChatMessage();
        }
    }


    /* =========================================================
       QUICK ACTIONS & LEADS
    ========================================================= */

    function handleQuickAction(action) {
        if (action === "quote") {
            addUserMessage(
                "I'd like to get a quote.");
        setTimeout(function() {
            addBotMessage("Absolutely! 👍 I can help start a quote. What security solution are you looking for?");
            showLeadForm();
        }, 400);
    } else if (action === "products") {
        addUserMessage("Show me your products.");
        setTimeout(function() {
            addBotMessage("🛡️ Nexpak offers Electric Fencing, CCTV, Gate Automation, Access Control, Alarm Systems, Intercoms, and Equestrian Fencing. Which one interests you?");
        }, 400);
    } else if (action === "contact") {
        addUserMessage("I want to contact Nexpak.");
        setTimeout(function() {
            addBotMessage("📞 Phone: " + CONFIG.phone + "\n💬 WhatsApp: " + CONFIG.whatsapp + "\n✉️ Email: " + CONFIG.email);
        }, 400);
    }
}

function createQuickActions() {
    const container = document.getElementById("nexpak-quick-actions");
    if (!container) return;
    container.innerHTML = "";

    const actions = [
        { label: "💬 Get a Quote", action: "quote" },
        { label: "🛡️ Products", action: "products" },
        { label: "📞 Contact Us", action: "contact" }
    ];

    actions.forEach(function(item) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "nexpak-quick-button";
        button.textContent = item.label;
        button.addEventListener("click", function() { handleQuickAction(item.action); });
        container.appendChild(button);
    });
}

function showLeadForm() {
    const form = document.getElementById("nexpak-lead-form");
    if (form) form.classList.add("visible");
}

function hideLeadForm() {
    const form = document.getElementById("nexpak-lead-form");
    if (form) form.classList.remove("visible");
}

function submitLead() {
    const nameInput = document.getElementById("nexpak-lead-name");
    const emailInput = document.getElementById("nexpak-lead-email");
    const phoneInput = document.getElementById("nexpak-lead-phone");
    const interestInput = document.getElementById("nexpak-lead-interest");

    if (!nameInput || !emailInput) return;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert("Please enter your name and email address.");
        return;
    }

    chatState.userInfo = {
        name: name,
        email: email,
        phone: phoneInput ? phoneInput.value.trim() : "",
        interest: interestInput ? interestInput.value.trim() : ""
    };
    chatState.leadCaptured = true;

    try {
        localStorage.setItem("nexpak_chat_lead", JSON.stringify(chatState.userInfo));
    } catch (e) {}

    hideLeadForm();
    addBotMessage("Thanks, " + name + "! 😊 We've received your details and our team will contact you shortly.");
}


/* =========================================================
   WINDOW CONTROLS & INITIALIZATION
========================================================= */

function openChat() {
    const windowElement = document.getElementById("nexpak-chat-window");
    if (!windowElement) return;
    chatState.isOpen = true;
    windowElement.classList.add("open");
    
    const greeting = document.getElementById("nexpak-floating-greeting");
    if (greeting) greeting.classList.remove("visible");

    const input = document.getElementById("nexpak-chat-input");
    if (input) setTimeout(function() { input.focus(); }, 200);
}

function closeChat() {
    const windowElement = document.getElementById("nexpak-chat-window");
    if (!windowElement) return;
    chatState.isOpen = false;
    windowElement.classList.remove("open");
}

function toggleChat() {
    if (chatState.isOpen) closeChat();
    else openChat();
}

function setupEvents() {
    const toggle = document.getElementById("nexpak-chat-toggle");
    const close = document.getElementById("nexpak-chat-close");
    const send = document.getElementById("nexpak-chat-send");
    const input = document.getElementById("nexpak-chat-input");
    const submit = document.getElementById("nexpak-lead-submit");
    const skip = document.getElementById("nexpak-lead-skip");

    if (toggle) toggle.addEventListener("click", toggleChat);
    if (close) close.addEventListener("click", closeChat);
    if (send) send.addEventListener("click", sendChatMessage);
    if (input) input.addEventListener("keydown", handleChatKeydown);
    if (submit) submit.addEventListener("click", submitLead);
    if (skip) skip.addEventListener("click", function() {
        hideLeadForm();
        addBotMessage("No problem! You can continue chatting anytime.");
    });
}

function initialize() {
    createChatbotUI();
    loadChat();
    
    if (chatState.messages.length === 0) {
        addBotMessage(CONFIG.greeting);
    }

    createQuickActions();
    setupEvents();

    // Show floating greeting bubble after 4 seconds if unopened
    setTimeout(function() {
        const greeting = document.getElementById("nexpak-floating-greeting");
        if (greeting && !chatState.isOpen) {
            greeting.classList.add("visible");
        }
    }, 4000);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
} else {
    initialize();
}

// Public API
window.NexpakChatbot = {
    open: openChat,
    close: closeChat,
    toggle: toggleChat
};

})();
                   
