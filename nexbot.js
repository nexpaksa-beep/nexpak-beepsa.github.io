/**
 * Nexpak Security Solutions
 * Custom AI Chatbot with Floating Robotic Assistant & Waving Hand
 */
(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    const CHATBOT_CONFIG = {
        companyName: 'Nexpak Security Solutions',
        companyPhone: '+27 82 123 4567',
        companyWhatsApp: '+27 82 123 4567',
        companyEmail: 'info@nexpaksolutions.co.za',
        businessHours: 'Mon-Fri: 8am-5pm, Sat: 8am-1pm',
        captureLeads: true,
        requireEmailForChat: false,
        greetingMessage: "Hi there! Welcome to Nexpak Security Solutions. I'm your virtual security assistant. Need help with electric fencing, CCTV, or a free quote?",
        agentText: "Nexpak Bot",
        
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

    // ==================== INITIALIZATION & UI ====================
    function init() {
        createChatbotUI();
        setupEventListeners();
        loadChatHistory();
    }

    function createChatbotUI() {
        const chatbotHTML = `
        <div id="nexpak-chatbot" class="nexpak-chatbot">
            <!-- Floating Robotic Assistant Toggle Button -->
            <button id="chat-toggle-btn" class="chat-toggle-btn" title="Chat with Nexpak Security">
                <div class="bot-avatar-container">
                    <div class="robotic-head">
                        <div class="robo-eyes"></div>
                    </div>
                    <span class="robotic-hand">👋</span>
                </div>
                <div class="chat-btn-text">
                    <span class="main-label">Chat with Us</span>
                    <span class="sub-label">Online & Ready</span>
                </div>
                <span class="chat-badge" style="display:none;">0</span>
            </button>

            <!-- Chat Window -->
            <div id="chat-window" class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar-window">🤖</div>
                        <div class="chat-title">
                            <h4>${CHATBOT_CONFIG.companyName}</h4>
                            <span class="chat-status">Online</span>
                        </div>
                    </div>
                    <button id="chat-minimize-btn" class="chat-minimize-btn">&times;</button>
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
                    <textarea id="lead-message" placeholder="What security info do you need?" rows="2"></textarea>
                    <button id="submit-lead" class="submit-lead-btn">Send Request</button>
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
            bottom: 25px;
            right: 25px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Floating Robotic Assistant Button with Hover & Wave Animations */
        .chat-toggle-btn {
            background: linear-gradient(135deg, #0b1f33, #12395b);
            color: white;
            border: 2px solid rgba(0, 200, 150, 0.4);
            padding: 10px 18px;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 15px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
            animation: floatBot 3.5s ease-in-out infinite;
            transition: all 0.3s ease;
        }

        .chat-toggle-btn:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0, 200, 150, 0.35);
            border-color: #00c896;
        }

        @keyframes floatBot {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }

        .bot-avatar-container {
            position: relative;
            width: 40px;
            height: 40px;
            background: rgba(0, 200, 150, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .robotic-head {
            width: 22px;
            height: 18px;
            background: #00c896;
            border-radius: 4px;
            position: relative;
        }

        .robo-eyes {
            position: absolute;
            top: 5px;
            left: 4px;
            width: 14px;
            height: 4px;
            background: #ffffff;
            box-shadow: 0 0 6px #ffffff;
            border-radius: 2px;
        }

        /* Waving Robotic Hand Animation */
        .robotic-hand {
            position: absolute;
            right: -8px;
            bottom: -4px;
            font-size: 18px;
            animation: waveHand 1.8s infinite ease-in-out;
            transform-origin: bottom left;
        }

        @keyframes waveHand {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(14deg); }
            40% { transform: rotate(-10deg); }
            60% { transform: rotate(14deg); }
            80% { transform: rotate(-6deg); }
            100% { transform: rotate(0deg); }
        }

        .chat-btn-text {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .chat-btn-text .main-label {
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
        }

        .chat-btn-text .sub-label {
            font-size: 11px;
            color: #00c896;
        }

        .chat-badge {
            background: #dc3545;
            color: white;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 10px;
            position: absolute;
            top: -5px;
            right: -5px;
        }

        /* Chat Window Styling */
        .chat-window {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 380px;
            height: 520px;
            background: white;
            border-radius: 18px;
            box-shadow: 0 15px 45px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #dce4ea;
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
            background: linear-gradient(135deg, #0b1f33, #12395b);
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

        .chat-avatar-window {
            width: 38px;
            height: 38px;
            background: rgba(0, 200, 150, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .chat-title h4 {
            margin: 0;
            font-size: 15px;
        }

        .chat-status {
            font-size: 11px;
            color: #00c896;
        }

        .chat-status::before {
            content: '•';
            margin-right: 4px;
        }

        .chat-minimize-btn {
            background: rgba(255,255,255,0.1);
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
            transition: background 0.2s;
        }

        .chat-minimize-btn:hover {
            background: rgba(255,255,255,0.25);
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #f8f9fa;
        }

        .chat-message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
        }

        .bot-message {
            background: #ffffff;
            color: #17212b;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            border: 1px solid #e1e8ed;
        }

        .user-message {
            background: #00c896;
            color: #05271e;
            font-weight: 500;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .message-time {
            font-size: 10px;
            opacity: 0.6;
            margin-top: 4px;
            text-align: right;
        }

        .quick-actions {
            display: flex;
            gap: 8px;
            padding: 10px 16px;
            background: white;
            border-top: 1px solid #eee;
            flex-wrap: wrap;
        }

        .quick-btn {
            background: #eef2f5;
            color: #0b1f33;
            border: none;
            padding: 7px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
        }

        .quick-btn:hover {
            background: #00c896;
            color: #05271e;
        }

        .lead-form {
            padding: 12px 16px;
            background: #f1f5f8;
            border-top: 1px solid #ddd;
        }

        .lead-form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .lead-form-header h4 {
            margin: 0;
            font-size: 13px;
            color: #0b1f33;
        }

        .skip-lead {
            background: none;
            border: none;
            color: #65727e;
            font-size: 11px;
            cursor: pointer;
        }

        .lead-form input, .lead-form textarea {
            width: 100%;
            padding: 8px 10px;
            margin-bottom: 6px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 13px;
            box-sizing: border-box;
            outline: none;
        }

        .submit-lead-btn {
            width: 100%;
            background: #00c896;
            color: #05271e;
            border: none;
            padding: 8px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 700;
            font-size: 13px;
        }

        .chat-input-area {
            display: flex;
            gap: 8px;
            padding: 12px 16px;
            background: white;
            border-top: 1px solid #eee;
        }

        #chat-input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 20px;
            outline: none;
            font-size: 13px;
        }

        #chat-input:focus {
            border-color: #00c896;
        }

        .send-btn {
            background: #0b1f33;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
        }

        .send-btn:hover {
            background: #12395b;
        }

        /* Typing indicator */
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 10px 14px;
            background: #ffffff;
            border: 1px solid #e1e8ed;
            border-radius: 14px;
            width: fit-content;
        }

        .typing-indicator span {
            width: 7px;
            height: 7px;
            background: #00c896;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
        }

        @media (max-width: 480px) {
            .chat-window {
                width: calc(100vw - 30px);
                height: 460px;
                right: -10px;
            }
        }
        </style>`;

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
                showLe
