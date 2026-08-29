function createChatbotUI() {

    const chatbotHTML = `
    <div id="nexpak-chatbot" class="nexpak-chatbot">

        <!-- =========================
             FLOATING AI BOT BUTTON
        ========================== -->
        <button id="chat-toggle-btn"
                class="chat-toggle-btn"
                aria-label="Open Nexpak AI">

            <div class="bot-floating-avatar">
                <div class="bot-head">
                    <div class="bot-eye left"></div>
                    <div class="bot-eye right"></div>
                    <div class="bot-mouth"></div>
                </div>
                <div class="bot-antenna"></div>
            </div>

            <div class="bot-floating-text">
                <strong>Nexpak AI</strong>
                <span>Security Assistant</span>
            </div>

            <span class="chat-badge"
                  style="display:none;">0</span>

        </button>


        <!-- =========================
             CHAT WINDOW
        ========================== -->
        <div id="chat-window" class="chat-window">

            <!-- HEADER -->
            <div class="chat-header">

                <div class="chat-header-info">

                    <div class="chat-avatar">

                        <div class="bot-head">
                            <div class="bot-eye left"></div>
                            <div class="bot-eye right"></div>
                            <div class="bot-mouth"></div>
                        </div>

                        <div class="bot-antenna"></div>

                    </div>

                    <div class="chat-title">

                        <div class="chat-name-row">
                            <h4>Nexpak AI</h4>
                            <span class="ai-badge">AI</span>
                        </div>

                        <span class="chat-subtitle">
                            Security Assistant
                        </span>

                        <span class="chat-status">
                            Online
                        </span>

                    </div>

                </div>


                <button id="chat-minimize-btn"
                        class="chat-minimize-btn"
                        aria-label="Close chat">

                    ×

                </button>

            </div>


            <!-- AI INTRO BAR -->
            <div class="ai-intro">

                <div class="ai-intro-icon">
                    ✦
                </div>

                <div>
                    <strong>Nexpak AI Assistant</strong>
                    <span>Here to help you find the right security solution.</span>
                </div>

            </div>


            <!-- MESSAGES -->
            <div id="chat-messages"
                 class="chat-messages">

                <div class="chat-message bot-message">

                    <div class="message-avatar">

                        <div class="mini-bot">
                            <div class="mini-eye"></div>
                            <div class="mini-eye"></div>
                        </div>

                    </div>

                    <div class="message-wrapper">

                        <div class="message-content">
                            Hi! I'm <strong>Nexpak AI</strong> 🤖
                            <br><br>
                            I can help you choose the right
                            security solution for your home,
                            business, farm or property.
                        </div>

                        <div class="message-time">
                            ${formatTime(new Date())}
                        </div>

                    </div>

                </div>

            </div>


            <!-- QUICK ACTIONS -->
            <div class="quick-actions">

                <div class="quick-title">
                    How can I help?
                </div>

                <div class="quick-buttons">

                    <button class="quick-btn"
                            data-action="quote">
                        <span>💰</span>
                        Get a Quote
                    </button>

                    <button class="quick-btn"
                            data-action="products">
                        <span>🛡️</span>
                        View Products
                    </button>

                    <button class="quick-btn"
                            data-action="contact">
                        <span>📞</span>
                        Contact Nexpak
                    </button>

                </div>

            </div>


            <!-- LEAD CAPTURE -->
            <div id="lead-form"
                 class="lead-form"
                 style="display:none;">

                <div class="lead-form-header">

                    <div>
                        <strong>Let's get you a quote</strong>
                        <span>We'll contact you shortly.</span>
                    </div>

                    <button id="skip-lead"
                            class="skip-lead">
                        ×
                    </button>

                </div>


                <input type="text"
                       id="lead-name"
                       placeholder="Your name"
                       autocomplete="name"
                       required>


                <input type="email"
                       id="lead-email"
                       placeholder="Email address"
                       autocomplete="email"
                       required>


                <input type="tel"
                       id="lead-phone"
                       placeholder="Phone number"
                       autocomplete="tel">


                <textarea id="lead-message"
                          placeholder="Tell us what you need..."
                          rows="3"></textarea>


                <button id="submit-lead"
                        class="submit-lead-btn">

                    Send Enquiry
                    <span>→</span>

                </button>

            </div>


            <!-- INPUT -->
            <div class="chat-input-area">

                <div class="input-wrapper">

                    <input type="text"
                           id="chat-input"
                           placeholder="Ask Nexpak AI..."
                           autocomplete="off">

                    <button id="send-message-btn"
                            class="send-btn"
                            aria-label="Send message">

                        <span>➤</span>

                    </button>

                </div>

                <div class="chat-disclaimer">
                    Nexpak AI can help with products,
                    services and general enquiries.
                </div>

            </div>

        </div>

    </div>


    <!-- =========================
         NEXPAK AI STYLES
    ========================== -->

    <style>

    /* =========================
       MAIN CONTAINER
    ========================== */

    .nexpak-chatbot {

        position: fixed;

        right: 22px;
        bottom: 22px;

        z-index: 99999;

        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;

    }


    /* =========================
       FLOATING BUTTON
    ========================== */

    .chat-toggle-btn {

        position: relative;

        display: flex;

        align-items: center;

        gap: 12px;

        border: none;

        cursor: pointer;

        padding: 10px 18px 10px 10px;

        border-radius: 60px;

        color: #ffffff;

        background:
            linear-gradient(
                135deg,
                #111827,
                #1f2937
            );

        box-shadow:
            0 8px 30px rgba(0,0,0,.30),
            0 0 0 1px rgba(255,255,255,.08);

        transition:
            transform .25s ease,
            box-shadow .25s ease;

    }


    .chat-toggle-btn:hover {

        transform: translateY(-4px);

        box-shadow:
            0 14px 35px rgba(0,0,0,.35),
            0 0 25px rgba(34,197,94,.18);

    }


    /* =========================
       FLOATING ROBOT
    ========================== */

    .bot-floating-avatar {

        position: relative;

        width: 48px;
        height: 48px;

        border-radius: 50%;

        display: flex;

        align-items: center;
        justify-content: center;

        background:
            linear-gradient(
                145deg,
                #1f2937,
                #374151
            );

        border: 2px solid rgba(255,255,255,.15);

        box-shadow:
            inset 0 0 15px rgba(255,255,255,.05),
            0 0 18px rgba(34,197,94,.18);

    }


    .bot-head {

        position: relative;

        width: 28px;
        height: 23px;

        border-radius: 8px;

        background:
            linear-gradient(
                145deg,
                #f3f4f6,
                #d1d5db
            );

        border: 2px solid #9ca3af;

        display: flex;

        align-items: center;

        justify-content: center;

        gap: 6px;

    }


    .bot-eye {

        width: 5px;
        height: 7px;

        border-radius: 50%;

        background: #22c55e;

        box-shadow:
            0 0 6px rgba(34,197,94,.8);

    }


    .bot-mouth {

        position: absolute;

        width: 9px;
        height: 3px;

        border-radius: 5px;

        bottom: 3px;

        background: #6b7280;

    }


    .bot-antenna {

        position: absolute;

        width: 2px;
        height: 7px;

        background: #9ca3af;

        top: 3px;

        left: 50%;

        transform: translateX(-50%);

    }


    .bot-antenna::before {

        content: "";

        position: absolute;

        width: 5px;
        height: 5px;

        border-radius: 50%;

        background: #22c55e;

        box-shadow:
            0 0 7px rgba(34,197,94,.8);

        top: -4px;

        left: 50%;

        transform: translateX(-50%);

    }


    /* =========================
       BUTTON TEXT
    ========================== */

    .bot-floating-text {

        display: flex;

        flex-direction: column;

        text-align: left;

        line-height: 1.15;

    }


    .bot-floating-text strong {

        font-size: 14px;

        letter-spacing: .2px;

    }


    .bot-floating-text span {

        margin-top: 3px;

        font-size: 10px;

        color: #9ca3af;

    }


    /* =========================
       BADGE
    ========================== */

    .chat-badge {

        position: absolute;

        top: -5px;
        right: -4px;

        min-width: 18px;
        height: 18px;

        padding: 0 5px;

        border-radius: 20px;

        display: flex;

        align-items: center;
        justify-content: center;

        background: #ef4444;

        color: white;

        font-size: 10px;

        font-weight: 700;

    }


    /* =========================
       CHAT WINDOW
    ========================== */

    .chat-window {

        position: absolute;

        right: 0;

        bottom: 76px;

        width: 390px;

        height: 600px;

        display: none;

        flex-direction: column;

        overflow: hidden;

        background: #ffffff;

        border-radius: 20px;

        border: 1px solid rgba(0,0,0,.08);

        box-shadow:
            0 25px 70px rgba(0,0,0,.28),
            0 8px 25px rgba(0,0,0,.12);

    }


    .chat-window.open {

        display: flex;

        animation:
            chatbotOpen .3s ease forwards;

    }


    @keyframes chatbotOpen {

        from {

            opacity: 0;

            transform:
                translateY(20px)
                scale(.97);

        }

        to {

            opacity: 1;

            transform:
                translateY(0)
                scale(1);

        }

    }


    /* =========================
       HEADER
    ========================== */

    .chat-header {

        position: relative;

        padding: 16px 18px;

        display: flex;

        justify-content: space-between;

        align-items: center;

        color: white;

        background:
            linear-gradient(
                135deg,
                #111827,
                #1f2937
            );

    }


    .chat-header::after {

        content: "";

        position: absolute;

        left: 0;
        right: 0;
        bottom: 0;

        height: 2px;

        background:
            linear-gradient(
                90deg,
                transparent,
                #22c55e,
                transparent
            );

        opacity: .8;

    }


    .chat-header-info {

        display: flex;

        align-items: center;

        gap: 12px;

    }


    .chat-avatar {

        position: relative;

        width: 46px;
        height: 46px;

        border-radius: 14px;

        display: flex;

        align-items: center;
        justify-content: center;

        background:
            linear-gradient(
                145deg,
                #374151,
                #111827
            );

        border: 1px solid rgba(255,255,255,.15);

    }


    .chat-avatar .bot-head {

        transform: scale(.9);

    }


    .chat-title {

        display: flex;

        flex-direction: column;

    }


    .chat-name-row {

        display: flex;

        align-items: center;

        gap: 7px;

    }


    .chat-title h4 {

        margin: 0;

        font-size: 17px;

        font-weight: 700;

    }


    .ai-badge {

        padding: 2px 6px;

        border-radius: 5px;

        font-size: 8px;

        font-weight: 800;

        letter-spacing: .5px;

        background: #22c55e;

        color: #052e16;

    }


    .chat-subtitle {

        margin-top: 2px;

        font-size: 11px;

        color: #9ca3af;

    }


    .chat-status {

        margin-top: 3px;

        font-size: 10px;

        color: #86efac;

    }


    .chat-status::before {

        content: "";

        display: inline-block;

        width: 6px;
        height: 6px;

        margin-right: 5px;

        border-radius: 50%;

        background: #22c55e;

        box-shadow:
            0 0 7px rgba(34,197,94,.8);

    }


    .chat-minimize-btn {

        width: 34px;
        height: 34px;

        border: none;

        border-radius: 50%;

        cursor: pointer;

        color: #ffffff;

        background:
            rgba(255,255,255,.08);

        font-size: 24px;

        line-height: 1;

        transition: background .2s ease;

    }


    .chat-minimize-btn:hover {

        background:
            rgba(255,255,255,.18);

    }


    /* =========================
       AI INTRO
    ========================== */

    .ai-intro {

        display: flex;

        align-items: center;

        gap: 10px;

        padding: 11px 15px;

        background: #f8fafc;

        border-bottom: 1px solid #e5e7eb;

    }


    .ai-intro-icon {

        width: 30px;
        height: 30px;

        border-radius: 9px;

        display: flex;

        align-items: center;
        justify-content: center;

        background: #111827;

        color: #22c55e;

        font-size: 16px;

    }


    .ai-intro div:last-child {

        display: flex;

        flex-direction: column;

    }


    .ai-intro strong {

        font-size: 11px;

        color: #111827;

    }


    .ai-intro span {

        margin-top: 2px;

        font-size: 10px;

        color: #6b7280;

    }


    /* =========================
       MESSAGES
    ========================== */

    .chat-messages {

        flex: 1;

        overflow-y: auto;

        padding: 18px;

        display: flex;

        flex-direction: column;

        gap: 15px;

        background:
            linear-gradient(
                180deg,
                #ffffff,
                #f8fafc
            );

    }


    .chat-message {

        max-width: 88%;

        display: flex;

        gap: 8px;

        font-size: 13px;

        line-height: 1.55;

    }


    .bot-message {

        align-self: flex-start;

    }


    .user-message {

        align-self: flex-end;

        flex-direction: row-reverse;

    }


    .message-avatar {

        flex-shrink: 0;

        width: 27px;
        height: 27px;

        border-radius: 9px;

        display: flex;

        align-items: center;
        justify-content: center;

        background: #111827;

    }


    .mini-bot {

        width: 17px;
        height: 13px;

        border-radius: 4px;

        background: #e5e7eb;

        display: flex;

        align-items: center;

        justify-content: center;

        gap: 3px;

    }


    .mini-eye {

        width: 3px;
        height: 4px;

        border-radius: 50%;

        background: #22c55e;

    }


    .message-wrapper {

        display: flex;

        flex-direction: column;

    }


    .message-content {

        padding: 11px 13px;

        border-radius: 15px;

        white-space: pre-line;

    }


    .bot-message .message-content {

        background: #f1f5f9;

        color: #1f2937;

        border-top-left-radius: 4px;

    }


    .user-message .message-content {

        background:
            linear-gradient(
                135deg,
                #111827,
                #374151
            );

        color: #ffffff;

        border-top-right-radius: 4px;

    }


    .message-time {

        margin-top: 4px;

        font-size: 9px;

        color: #9ca3af;

    }


    .user-message .message-time {

        text-align: right;

    }


    /* =========================
       QUICK ACTIONS
    ========================== */

    .quick-actions {

        padding: 10px 15px;

        background: #ffffff;

        border-top: 1px solid #e5e7eb;

    }


    .quick-title {

        margin-bottom: 7px;

        font-size: 10px;

        font-weight: 700;

        color: #6b7280;

    }


    .quick-buttons {

        display: flex;

        gap: 6px;

        flex-wrap: wrap;

    }


    .quick-btn {

        display: flex;

        align-items: center;

        gap: 5px;

        padding: 7px 10px;

        border: 1px solid #e5e7eb;

        border-radius: 20px;

        background: #ffffff;

        color: #374151;

        cursor: pointer;

        font-size: 10px;

        font-weight: 600;

        transition:
            all .2s ease;

    }


    .quick-btn:hover {

        background: #111827;

        color: #ffffff;

        border-color: #111827;

        transform: translateY(-1px);

    }


    /* =========================
       LEAD FORM
    ========================== */

    .lead-form {

        padding: 13px 15px;

        background: #f8fafc;

        border-top: 1px solid #e5e7eb;

    }


    .lead-form-header {

        display: flex;

        justify-content: space-between;

        align-items: flex-start;

        margin-bottom: 9px;

    }


    .lead-form-header div {

        display: flex;

        flex-direction: column;

    }


    .lead-form-header strong {

        font-size: 12px;

        color: #111827;

    }


    .lead-form-header span {

        margin-top: 2px;

        font-size: 9px;

        color: #6b7280;

    }


    .skip-lead {

        border: none;

        background: none;

        color: #9ca3af;

        cursor: pointer;

        font-size: 20px;

        line-height: 1;

    }


    .lead-form input,
    .lead-form textarea {

        width: 100%;

        box-sizing: border-box;

        padding: 9px 11px;

        margin-bottom: 7px;

        border: 1px solid #dbe1e8;

        border-radius: 9px;

        outline: none;

        background: #ffffff;

        color: #111827;

        font-size: 11px;

        font-family:             -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;
        resize: vertical;
        min-height: 55px;
    }

    .submit-lead-btn {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 9px;
        background: linear-gradient(
            135deg,
            #007bff,
            #0056b3
        );
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: .25s ease;
    }

    .submit-lead-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 14px rgba(0,123,255,.25);
    }

    .chat-input-area {
        display: flex;
        gap: 7px;
        padding: 10px 12px;
        border-top: 1px solid #e5e7eb;
        background: #ffffff;
    }

    #chat-input {
        flex: 1;
        min-width: 0;
        padding: 10px 13px;
        border: 1px solid #dbe1e8;
        border-radius: 22px;
        outline: none;
        background: #ffffff;
        color: #111827;
        font-size: 12px;
        box-sizing: border-box;
    }

    #chat-input:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0,123,255,.08);
    }

    .send-btn {
        flex-shrink: 0;
        padding: 10px 15px;
        border: none;
        border-radius: 22px;
        background: linear-gradient(
            135deg,
            #007bff,
            #0056b3
        );
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: .25s ease;
    }

    .send-btn:hover {
        background: linear-gradient(
            135deg,
            #0056b3,
            #003f88
        );
    }

    /* ==============================
       TYPING INDICATOR
       ============================== */

    .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        width: fit-content;
        padding: 10px 13px;
        background: #f1f3f4;
        border-radius: 15px;
        border-bottom-left-radius: 4px;
    }

    .typing-indicator span {
        width: 7px;
        height: 7px;
        background: #9ca3af;
        border-radius: 50%;
        animation: chatbotBounce 1.4s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(1) {
        animation-delay: 0s;
    }

    .typing-indicator span:nth-child(2) {
        animation-delay: .2s;
    }

    .typing-indicator span:nth-child(3) {
        animation-delay: .4s;
    }

    @keyframes chatbotBounce {
        0%,
        80%,
        100% {
            transform: translateY(0);
        }

        40% {
            transform: translateY(-6px);
        }
    }

    /* ==============================
       MOBILE
       ============================== */

    @media (max-width: 480px) {

        .nexpak-chatbot {
            right: 12px;
            bottom: 12px;
            left: 12px;
        }

        .chat-toggle-btn {
            margin-left: auto;
            padding: 12px 18px;
            font-size: 14px;
        }

        .chat-window {
            width: calc(100vw - 24px);
            right: 0;
            bottom: 68px;
            height: min(560px, calc(100vh - 95px));
            border-radius: 14px;
        }

        .chat-messages {
            padding: 12px;
        }

        .chat-message {
            max-width: 88%;
            font-size: 13px;
        }

        .quick-actions {
            padding: 7px 10px;
        }

        .quick-btn {
            font-size: 11px;
            padding: 7px 10px;
        }

        .lead-form {
            padding: 10px 12px;
        }
    }
        </style>`;

        document.body.insertAdjacentHTML(
            'beforeend',
            chatbotHTML
        );
    }

    /* ==============================
       EVENT LISTENERS
       ============================== */

    function setupEventListeners() {

        const toggleButton =
            document.getElementById(
                'chat-toggle-btn'
            );

        const minimizeButton =
            document.getElementById(
                'chat-minimize-btn'
            );

        const sendButton =
            document.getElementById(
                'send-message-btn'
            );

        const chatInput =
            document.getElementById(
                'chat-input'
            );

        const skipButton =
            document.getElementById(
                'skip-lead'
            );

        const submitButton =
            document.getElementById(
                'submit-lead'
            );

        if (!toggleButton) return;

        toggleButton.addEventListener(
            'click',
            toggleChat
        );

        minimizeButton.addEventListener(
            'click',
            toggleChat
        );

        sendButton.addEventListener(
            'click',
            sendMessage
        );

        chatInput.addEventListener(
            'keypress',
            function(e) {

                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }

            }
        );

        document
            .querySelectorAll('.quick-btn')
            .forEach(function(btn) {

                btn.addEventListener(
                    'click',
                    function() {

                        handleQuickAction(
                            this.dataset.action
                        );

                    }
                );

            });

        skipButton.addEventListener(
            'click',
            skipLeadForm
        );

        submitButton.addEventListener(
            'click',
            submitLeadForm
        );

        setTimeout(function() {

            if (
                CHATBOT_CONFIG.captureLeads &&
                !chatState.leadCaptured
            ) {

                showLeadForm();

            }

        }, 15000);
    }

    /* ==============================
       OPEN / CLOSE CHAT
       ============================== */

    function toggleChat() {

        const chatWindow =
            document.getElementById(
                'chat-window'
            );

        const chatButton =
            document.getElementById(
                'chat-toggle-btn'
            );

        chatState.isOpen =
            !chatState.isOpen;

        if (chatState.isOpen) {

            chatWindow.classList.add('open');

            chatButton.style.display =
                'none';

            const input =
                document.getElementById(
                    'chat-input'
                );

            if (input) {
                input.focus();
            }

        } else {

            chatWindow.classList.remove(
                'open'
            );

            chatButton.style.display =
                'flex';
        }
    }

    /* ==============================
       SEND MESSAGE
       ============================== */

    function sendMessage() {

        const input =
            document.getElementById(
                'chat-input'
            );

        const message =
            input.value.trim();

        if (!message) return;

        addMessage(
            message,
            'user'
        );

        input.value = '';

        showTypingIndicator();

        setTimeout(function() {

            hideTypingIndicator();

            const response =
                generateResponse(message);

            addMessage(
                response,
                'bot'
            );

        }, 900 + Math.random() * 900);
    }

    /* ==============================
       ADD MESSAGE
       ============================== */

    function addMessage(
        content,
        sender
    ) {

        const container =
            document.getElementById(
                'chat-messages'
            );

        if (!container) return;

        const messageDiv =
            document.createElement(
                'div'
            );

        messageDiv.className =
            'chat-message ' +
            sender +
            '-message';

        /*
         * Use textContent instead of
         * innerHTML for user messages.
         * This prevents HTML/script injection.
         */

        const contentDiv =
            document.createElement(
                'div'
            );

        contentDiv.className =
            'message-content';

        contentDiv.textContent =
            content;

        const timeDiv =
            document.createElement(
                'div'
            );

        timeDiv.className =
            'message-time';

        timeDiv.textContent =
            formatTime(
                new Date()
            );

        messageDiv.appendChild(
            contentDiv
        );

        messageDiv.appendChild(
            timeDiv
        );

        container.appendChild(
            messageDiv
        );

        container.scrollTop =
            container.scrollHeight;

        chatState.messages.push({
            content: content,
            sender: sender,
            time: Date.now()
        });

        saveChatHistory();
    }

    /* ==============================
       TYPING INDICATOR
       ============================== */

    function showTypingIndicator() {

        const container =
            document.getElementById(
                'chat-messages'
            );

        if (!container) return;

        if (
            document.getElementById(
                'typing-indicator'
            )
        ) return;

        const typing =
            document.createElement(
                'div'
            );

        typing.className =
            'typing-indicator';

        typing.id =
            'typing-indicator';

        typing.innerHTML =
            '<span></span>' +
            '<span></span>' +
            '<span></span>';

        container.appendChild(
            typing
        );

        container.scrollTop =
            container.scrollHeight;
    }

    function hideTypingIndicator() {

        const typing =
            document.getElementById(
                'typing-indicator'
            );

        if (typing) {
            typing.remove();
        }
    }

    /* ==============================
       RESPONSE ENGINE
       ============================== */

    function generateResponse(
        userMessage
    ) {

        const message =
            userMessage
                .toLowerCase()
                .trim();

        /* FAQs */

        for (
            const [key, value]
            of Object.entries(
                CHATBOT_CONFIG.faqs
            )
        ) {

            if (
                message.includes(
                    key
                )
            ) {

                return value;
            }
        }

        /* Pricing */

        if (
            message.includes('price') ||
            message.includes('cost') ||
            message.includes('how much') ||
            message.includes('pricing')
        ) {

            return getPricingResponse(
                message
            );
        }

        /* Electric fencing */

        if (
            message.includes(
                'electric fence'
            ) ||
            message.includes(
                'electric fencing'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'electric fencing'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                );
        }

        /* CCTV */

        if (
            message.includes('cctv') ||
            message.includes('camera') ||
            message.includes('cameras') ||
            message.includes(
                'surveillance'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'cctv'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                );
        }

        /* Access control */

        if (
            message.includes(
                'access control'
            ) ||
            message.includes(
                'biometric'
            ) ||
            message.includes(
                'fingerprint'
            ) ||
            message.includes(
                'facial recognition'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'access control'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                );
        }

        /* Gate automation */

        if (
            message.includes('gate') ||
            message.includes(
                'automation'
            ) ||
            message.includes(
                'gate motor'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'gate automation'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                );
        }

        /* Intercom */

        if (
            message.includes(
                'intercom'
            ) ||
            message.includes(
                'door phone'
            ) ||
            message.includes(
                'video door'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'intercom'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                );
        }

        /* Equestrian */

        if (
            message.includes(
                'equestrian'
            ) ||
            message.includes(
                'horse'
            ) ||
            message.includes(
                'paddock'
            ) ||
            message.includes(
                'horse fence'
            )
        ) {

            const product =
                CHATBOT_CONFIG
                    .knowledgeBase
                    .products[
                        'equestrian'
                    ];

            return product.description +
                '\n\n' +
                product.price +
                '\n\nFeatures: ' +
                product.features.join(
                    ', '
                ) +
                '\n\nWould you like me to show you our equestrian products?';
        }

        /* Contact */

        if (
            message.includes(
                'contact'
            ) ||
            message.includes(
                'phone'
            ) ||
            message.includes(
                'call'
            ) ||
            message.includes(
                'whatsapp'
            )
        ) {

            return (
                'You can reach Nexpak Security Solutions at:' +
                '\n\n' +
                'Phone: ' +
                CHATBOT_CONFIG.companyPhone +
                '\n' +
                'Email: ' +
                CHATBOT_CONFIG.companyEmail +
                '\n' +
                'WhatsApp: ' +
                CHATBOT_CONFIG.companyWhatsApp +
                '\n\n' +
                'Business hours: ' +
                CHATBOT_CONFIG.businessHours
            );
        }

        /* Quote */

        if (
            message.includes(
                'quote'
            ) ||
            message.includes(
                'quotation'
            )
        ) {

            return (
                'Absolutely! I can help you get a quote.' +
                '\n\n' +
                'Please tell me:' +
                '\n1. What security solution you need' +
                '\n2. Your approximate property size' +
                '\n3. Your location' +
                '\n\n' +
                'You can also leave your contact details in the form and our team will contact you.'
            );
        }

        /* Thanks */

        if (
            message.includes(
                'thank'
            ) ||
            message.includes(
                'thanks'
            )
        ) {

            return (
                "You're welcome! 😊 Is there anything else I can help you with?"
            );
        }

        /* Default */

        return (
            'I understand you are asking about "' +
            userMessage +
            '".\n\n' +
            'I can help you with:' +
            '\n• Electric Fencing' +
            '\n• CCTV Cameras' +
            '\n• Access Control' +
            '\n• Gate Automation' +
            '\n• Intercom Systems' +
            '\n• Equestrian Fencing' +
            '\n• Free Quotes' +
            '\n\nWhat would you like to know more about?'
        );
    }

    /* ==============================
       PRICING
       ============================== */

    function getPricingResponse(
        message
    ) {

        /*
         * Give a specific product price
         * when the customer mentions one.
         */

        if (
            message.includes(
                'electric'
            )
        ) {

            return (
                'Electric fencing starts from approximately R350 per metre, depending on the system and installation requirements.\n\nFor an accurate price, we can provide a custom quote after assessing your property.'
            );
        }

        if (
            message.includes(
                'cctv'
            ) ||
            message.includes(
                'camera'
            )
        ) {

            return (
                'CCTV systems start from approximately R4,500 for a 4-camera system. The final price depends on camera type, storage, cabling and installation.'
            );
        }

        if (
            message.includes(
                'access'
            )
        ) {

            return (
                'Access control systems start from approximately R8,000. Pricing depends on the number of users, doors and equipment required.'
            );
        }

        if (
            message.includes(
                'gate'
            )
        ) {

            return (
                'Gate automation starts from approximately R12,000. The final price depends on the gate type, size and motor requirements.'
            );
        }

        let response =
            'Here is our general pricing guide:\n\n';

        for (
            const [product, price]
            of Object.entries(
                CHATBOT_CONFIG
                    .knowledgeBase
                    .pricing
            )
        ) {

            response +=
                product
                    .charAt(0)
                    .toUpperCase() +
                product.slice(1) +
                ': ' +
                price +
                '\n';
        }

        response +=
                    response +=
            '\nThese are guide prices only. A custom quote will give you the exact cost for your property.';

        return response;
    }

    function handleQuickAction(action) {
        switch (action) {

            case 'quote':

                addMessage(
                    "I'd like to get a quote",
                    'user'
                );

                setTimeout(() => {

                    addMessage(
                        "Great! I'll help you get a quote. " +
                        "What type of security solution are you interested in?",
                        'bot'
                    );

                    showLeadForm();

                }, 500);

                break;


            case 'products':

                addMessage(
                    "Show me your products",
                    'user'
                );

                setTimeout(() => {

                    addMessage(
                        "We offer a range of security solutions:\n\n" +
                        "• Electric Fencing from R350/m\n" +
                        "• CCTV Systems from R4,500\n" +
                        "• Access Control from R8,000\n" +
                        "• Gate Automation from R12,000\n" +
                        "• Equestrian Fencing\n\n" +
                        "Which one interests you?",
                        'bot'
                    );

                }, 500);

                break;


            case 'contact':

                addMessage(
                    "I want to contact you",
                    'user'
                );

                setTimeout(() => {

                    addMessage(
                        `Phone: ${CHATBOT_CONFIG.companyPhone}\n` +
                        `Email: ${CHATBOT_CONFIG.companyEmail}\n` +
                        `WhatsApp: ${CHATBOT_CONFIG.companyWhatsApp}\n\n` +
                        `We're open ${CHATBOT_CONFIG.businessHours}`,
                        'bot'
                    );

                }, 500);

                break;
        }
    }

    function showLeadForm() {

        const form =
            document.getElementById('lead-form');

        if (form) {
            form.style.display = 'block';
        }
    }

    function skipLeadForm() {

        const form =
            document.getElementById('lead-form');

        if (form) {
            form.style.display = 'none';
        }
    }

    function submitLeadForm() {

        const name =
            document.getElementById('lead-name').value.trim();

        const email =
            document.getElementById('lead-email').value.trim();

        const phone =
            document.getElementById('lead-phone').value.trim();

        const message =
            document.getElementById('lead-message').value.trim();


        if (!name || !email) {

            alert(
                'Please enter your name and email.'
            );

            return;
        }


        chatState.userInfo = {
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        chatState.leadCaptured = true;


        document.getElementById(
            'lead-form'
        ).style.display = 'none';


        addMessage(
            `Thanks ${name}! We'll be in touch soon.`,
            'bot'
        );


        console.log(
            'New Lead Captured:',
            chatState.userInfo
        );
    }


    function formatTime(date) {

        return date.toLocaleTimeString(
            'en-US',
            {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }
        );
    }


    function saveChatHistory() {

        localStorage.setItem(
            'nexpak_chat_history',
            JSON.stringify(chatState.messages)
        );
    }


    function loadChatHistory() {

        const saved =
            localStorage.getItem(
                'nexpak_chat_history'
            );

        if (saved) {

            try {

                chatState.messages =
                    JSON.parse(saved);

            } catch (error) {

                console.warn(
                    'Could not load chat history.',
                    error
                );

                chatState.messages = [];
            }
        }
    }


    /* ==========================================================
       START CHATBOT
       ========================================================== */

    if (
        document.readyState === 'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            init
        );

    } else {

        init();
    }


    /* ==========================================================
       PUBLIC API
       ========================================================== */

    window.NexpakChatbot = {

        open: function() {

            if (!chatState.isOpen) {
                toggleChat();
            }

        },

        close: function() {

            if (chatState.isOpen) {
                toggleChat();
            }

        },

        send: function(message) {

            if (!message) return;

            addMessage(
                message,
                'user'
            );

            showTypingIndicator();

            setTimeout(() => {

                hideTypingIndicator();

                const response =
                    generateResponse(message);

                addMessage(
                    response,
                    'bot'
                );

            }, 500);

        }

    };

})();
