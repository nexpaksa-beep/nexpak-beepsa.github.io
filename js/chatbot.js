/**
* Nexpak Security Solutions[span_1](start_span)[span_1](end_span)
* Custom AI Chatbot (Upgraded with Waving Hand & Floating Motion)
*/
(function() {
'use strict';

// ==================== CONFIGURATION ====================
const CHATBOT_CONFIG = {
    // Company Info
    companyName: 'Nexpak Security Solutions',
    companyPhone: '+27 82 123 4567',
    companyWhatsApp: '+27 82 123 4567',
    companyEmail: 'info@nexpaksolutions.co.za',
    
    // Business Hours
    businessHours: 'Mon-Fri: 8am-5pm, Sat: 8am-1pm',
    
    // Lead Capture
    captureLeads: true,
    requireEmailForChat: false,
    
    // Chat Settings
    greetingMessage: "Hi there! Welcome to Nexpak Security Solutions. I'm here to help you find the right security solution for your needs. What can I help you with today?",
    agentText: "Our team",
    
    // Knowledge Base
    knowledgeBase: {
        products: {
            'electric fencing': {
                name: 'Electric Fencing',
                description: 'High-quality electric fencing for perimeter security. SAID approved, 12-month warranty, professional installation available.',
                price: 'From R350 per meter',
                features: ['SAID approved', '12-month warranty', 'Professional installation', 'Maintenance contracts']
            },
            'cctv': {
                name: 'CCTV Surveillance',
                description: 'HD and 4K security cameras with remote viewing, night vision, and cloud storage options.',
                price: 'From R4,500 for 4-camera system',
                features: ['HD/4K quality', 'Remote viewing', 'Night vision', 'Motion detection']
            },
            'access control': {
                name: 'Biometric Access Control',
                description: 'Fingerprint, facial recognition, and card access systems for controlled entry.',
                price: 'From R8,000',
                features: ['Biometric recognition', 'Time attendance', 'Remote management', 'Audit logs']
            },
            'gate automation': {
                name: 'Gate Automation',
                description: 'Automated sliding and swing gate motors with remote control and smart home integration.',
                price: 'From R12,000',
                features: ['Remote control', 'Smart home ready', 'Battery backup', 'Safety sensors']
            },
            'intercom': {
                name: 'Video Intercom',
                description: 'Video door phones and intercom systems for visitor management and remote answering.',
                price: 'From R3,500',
                features: ['Video calling', 'Remote unlock', 'Multiple units', 'Recording']
            },
            'equestrian': {
                name: 'Equestrian Fencing',
                description: 'Specialized horse fencing including polytape, rope, energizers, and accessories.',
                price: 'Varies by product',
                features: ['Horse-safe design', 'Solar options', 'Durable materials', 'Full range available']
            }
        },
        services: {
            'installation': 'Professional installation by certified technicians. We serve Gauteng and surrounding areas.',
            'maintenance': 'Annual maintenance contracts available. Keep your security systems running optimally.',
            'repair': 'We repair all makes of electric fencing, CCTV, and access control systems.',
            'consultation': 'Free site visit and security assessment. We recommend the best solution for your needs.'
        },
        pricing: {
            'electric fencing': 'R350-R500 per meter',
            'cctv': 'R4,500-R25,000 depending on cameras',
            'access control': 'R8,000-R50,000 depending on users',
            'gate automation': 'R12,000-R35,000 depending on gate size'
        }
    },
    
    // Common Questions & Answers
    faqs: {
        'what areas do you serve': 'We serve Gauteng, Durban, Cape Town, and surrounding areas. Contact us for installation outside these areas.',
        'do you offer free quotes': 'Yes! We offer free site visits and quotes. Contact us to schedule yours.',
        'how long does installation take': 'Most residential installations take 1-2 days. Commercial projects vary based on size.',
        'do you offer warranties': 'Yes, all our products come with manufacturer warranties, typically 12-24 months.',
        'what payment methods do you accept': 'We accept EFT, credit card, and PayFast online payments. For large projects, we offer payment plans.',
        'can i get same-day service': 'We offer emergency call-outs for existing clients. New clients typically within 48 hours.',
        'are your products said approved': 'Yes, our electric fencing is SAID (South African Intruder Detection) approved.'
    }
};

// ==================== CHATBOT STATE ====================
let chatState = {
    isOpen: false,
    messages: [],
    userInfo: null,
    leadCaptured: false,
    conversationStart: Date.now()
};

// ==================== CHATBOT UI ====================
function init() {
    createChatbotUI();
    setupEventListeners();
    loadChatHistory();
}

function createChatbotUI() {
    const chatbotHTML = `
        <div id="nexpak-chatbot" class="nexpak-chatbot">
            <!-- Floating Chat Button with Robot & Waving Hand -->
            <button id="chat-toggle-btn" class="chat-toggle-btn">
                <span class="chat-icon">🤖</span>
                <span class="waving-hand">👋</span>
                <span class="chat-text">Chat with us</span>
                <span class="chat-badge" style="display:none;">0</span>
            </button>
            
            <!-- Chat Window -->
            <div id="chat-window" class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">🤖</div>
                        <div class="chat-title">
                            <h4>${CHATBOT_CONFIG.companyName}</h4>
                            <span class="chat-status">Online</span>
                        </div>
                    </div>
                    <button id="chat-minimize-btn" class="chat-minimize-btn">-</button>
                </div>
                
                <div id="chat-messages" class="chat-messages">
                    <div class="chat-message bot-message">
                        <div class="message-content">${CHATBOT_CONFIG.greetingMessage}</div>
                        <div class="message-time">${formatTime(new Date())}</div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions">
                    <button class="quick-btn" data-action="quote">Get a Quote</button>
                    <button class="quick-btn" data-action="products">View Products</button>
                    <button class="quick-btn" data-action="contact">Contact Us</button>
                </div>
                
                <!-- Lead Capture Form -->
                <div id="lead-form" class="lead-form" style="display:none;">
                    <div class="lead-form-header">
                        <h4>Let us contact you</h4>
                        <button id="skip-lead" class="skip-lead">Skip</button>
                    </div>
                    <input type="text" id="lead-name" placeholder="Your Name" required>
                    <input type="email" id="lead-email" placeholder="Email Address" required>
                    <input type="tel" id="lead-phone" placeholder="Phone Number">
                    <textarea id="lead-message" placeholder="What would you like to know?" rows="2"></textarea>
                    <button id="submit-lead" class="submit-lead-btn">Send</button>
                </div>
                
                <!-- Chat Input Area -->
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
                    <button id="send-message-btn" class="send-btn">Send</button>
                </div>
            </div>
        </div>

        <style>
        .nexpak-chatbot {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            animation: floatAround 10s ease-in-out infinite;
        }

        /* Floating Window Keyframe Animation */
        @keyframes floatAround {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-30px, -45px); }
            50% { transform: translate(-60px, -10px); }
            75% { transform: translate(-20px, -35px); }
            100% { transform: translate(0, 0); }
        }

        .chat-toggle-btn {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border: none;
            padding: 14px 22px;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(0,123,255,0.5);
            transition: all 0.3s ease;
        }

        .chat-toggle-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(0,123,255,0.7);
            animation-play-state: paused;
        }

        .chat-icon {
            font-size: 22px;
        }

        /* Waving Hand Animation */
        .waving-hand {
            display: inline-block;
            font-size: 20px;
            animation: waveAnimation 1.8s infinite;
            transform-origin: 70% 70%;
        }

        @keyframes waveAnimation {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(14deg); }
            30% { transform: rotate(-8deg); }
            45% { transform: rotate(14deg); }
            60% { transform: rotate(-4deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }

        .chat-badge {
            background: #dc3545;
            color: white;
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 10px;
            position: absolute;
            top: -5px;
            right: -5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .chat-window {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 380px;
            height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .chat-window.open {
            display: flex;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .chat-header {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chat-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .chat-avatar {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
        }

        .chat-title h4 {
            margin: 0;
            font-size: 16px;
        }

        .chat-status {
            font-size: 12px;
            opacity: 0.9;
        }

        .chat-status::before {
            content: '•';
            color: #4ade80;
            margin-right: 4px;
            font-size: 14px;
        }

        .chat-minimize-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .chat-message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
        }

        .bot-message {
            background: #f1f3f4;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .user-message {
            background: #007bff;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .message-time {
            font-size: 10px;
            opacity: 0.7;
            margin-top: 4px;
        }

        .quick-actions {
            display: flex;
            gap: 8px;
            padding: 8px 16px;
            border-top: 1px solid #eee;
            flex-wrap: wrap;
        }

        .quick-btn {
            background: #e9ecef;
            border: none;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .quick-btn:hover {
            background: #dee2e6;
        }

        .lead-form {
            padding: 12px 16px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }

        .lead-form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .lead-form-header h4 {
            margin: 0;
            font-size: 14px;
        }

        .skip-lead {
            background: none;
            border: none;
            color: #6c757d;
            font-size: 12px;
            cursor: pointer;
        }

        .lead-form input, .lead-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 8px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            box-sizing: border-box;
        }

        .submit-lead-btn {
            width: 100%;
            background: #28a745;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .chat-input-area {
            display: flex;
            gap: 8px;
            padding: 12px 16px;
            border-top: 1px solid #eee;
        }

        #chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 24px;
            outline: none;
            font-size: 14px;
        }

        #chat-input:focus {
            border-color: #007bff;
        }

        .send-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 24px;
            cursor: pointer;
            font-weight: 600;
        }

        .send-btn:hover {
            background: #0056b3;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: #f1f3f4;
            border-radius: 16px;
            width: fit-content;
        }

        .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #999;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
        }

        @media (max-width: 480px) {
            .chat-window {
                width: calc(100vw - 40px);
                height: calc(100vh - 120px);
                right: 10px;
            }
        }
        </style>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    document.getElementById('chat-toggle-btn').addEventListener('click', toggleChat);
    document.getElementById('chat-minimize-btn').addEventListener('click', toggleChat);
    
    document.getElementById('send-message-btn').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
    
    document.getElementById('skip-lead').addEventListener('click', skipLeadForm);
    document.getElementById('submit-lead').addEventListener('click', submitLeadForm);
    
    setTimeout(() => {
        if (CHATBOT_CONFIG.captureLeads && !chatState.leadCaptured) {
            showLeadForm();
        }
    }, 15000);
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const chatBtn = document.getElementById('chat-toggle-btn');
    chatState.isOpen = !chatState.isOpen;
    
    if (chatState.isOpen) {
        chatWindow.classList.add('open');
        chatBtn.style.display = 'none';
        document.getElementById('chat-input').focus();
    } else {
        chatWindow.classList.remove('open');
        chatBtn.style.display = 'flex';
    }
}

// ==================== MESSAGE & AI LOGIC ====================
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-time">${formatTime(new Date())}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    chatState.messages.push({ content, sender, time: Date.now() });
    saveChatHistory();
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove
