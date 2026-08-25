
/**
 * Nexpak Security Solutions - AI Chatbot & Google Analytics Integration[span_0](start_span)[span_0](end_span)
 */
(function() {
  'use strict';

  // ====== GOOGLE ANALYTICS ======
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-00f00e5ed65d35fc2d5d524170097219675283e9', 'auto');
  ga('send', 'pageview');

  // ====== COMPANY CONFIG ======
  const CONFIG = {
    companyName: 'Nexpak Security Solutions',
    companyPhone: '+27 82 123 4567',
    companyEmail: 'info@nexpaksolutions.co.za',
    businessHours: 'Mon-Fri: 8am-5pm, Sat: 8am-1pm'
  };

  let chatOpen = false;
  let leadCaptured = false;
  let messageCount = 0;

  function init() {
    const html = `
    <div id="nexpak-chatbot">
      <button id="chat-toggle" class="chat-toggle">
        <span class="chat-icon">💬</span>
        <span>Chat with us</span>
      </button>
      <div id="chat-window" class="chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">🤖</div>
            <div>
              <h4>${CONFIG.companyName}</h4>
              <span class="chat-status">Online</span>
            </div>
          </div>
          <button id="chat-minimize">-</button>
        </div>
        <div id="chat-messages" class="chat-messages">
          <div class="message bot-message">
            <div class="message-content">
              Hi there! Welcome to <strong>${CONFIG.companyName}</strong>.<br><br>
              I'm here to help you find the right security solution for your home or business.
              <div class="quick-actions">
                <button onclick="nexpakChat.send('I want a quote')">Get a Quote</button>
                <button onclick="nexpakChat.send('Show me products')">View Products</button>
                <button onclick="nexpakChat.send('Contact details')">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
        <div id="lead-form" class="lead-form" style="display:none;">
          <h4>Get Your Free Quote</h4>
          <input type="text" id="lead-name" placeholder="Your Name *">
          <input type="email" id="lead-email" placeholder="Email Address *">
          <input type="tel" id="lead-phone" placeholder="Phone Number">
          <select id="lead-interest">
            <option value="">What are you interested in?</option>
            <option value="electric_fencing">Electric Fencing</option>
            <option value="cctv">CCTV Surveillance</option>
            <option value="access-control">Access Control</option>
            <option value="gate-automation">Gate Automation</option>
            <option value="equestrian">Equestrian Fencing</option>
          </select>
          <button onclick="nexpakChat.submitLead()">Get My Free Quote</button>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type your message...">
          <button id="send-btn">Send</button>
        </div>
      </div>
    </div>
    <style>
      #nexpak-chatbot { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Segoe UI', Arial, sans-serif; }
      .chat-toggle { background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%); color: white; border: none; padding: 14px 24px; border-radius: 50px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 20px rgba(26,95,42,0.4); transition: all 0.3s; }
      .chat-toggle:hover { transform: translateY(-2px); box-shadow: 0 6px 25px rgba(26,95,42,0.5); }
      .chat-window { position: absolute; bottom: 80px; right: 0; width: 380px; height: 550px; background: white; border-radius: 16px; box-shadow: 0 10px 50px rgba(0,0,0,0.25); display: none; flex-direction: column; overflow: hidden; }
      .chat-window.open { display: flex; animation: slideUp 0.3s ease; }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .chat-header { background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%); color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
      .chat-header-info { display: flex; align-items: center; gap: 12px; }
      .chat-avatar { width: 45px; height: 45px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; }
      .chat-header h4 { margin: 0; font-size: 16px; }
      .chat-status { font-size: 12px; opacity: 0.9; }
      .chat-status::before { content: '● '; color: #4ade80; margin-right: 4px; }
      #chat-minimize { background: rgba(255,255,255,0.2); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 20px; }
      .chat-messages { flex: 1; display: flex; overflow-y: auto; padding: 16px; flex-direction: column; gap: 12px; background: #f8f9fa; }
      .message { max-width: 88%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
      .bot-message { background: white; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
      .user-message { background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
      .quick-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
      .quick-actions button { background: #e8f5e9; color: #1a5f2a; border: 1px solid #1a5f2a; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: all 0.2s; }
      .quick-actions button:hover { background: #1a5f2a; color: white; }
      .lead-form { padding: 12px 16px; background: white; border-top: 1px solid #eee; }
      .lead-form h4 { margin: 0 0 10px 0; font-size: 14px; color: #1a5f2a; }
      .lead-form input, .lead-form select { width: 100%; padding: 10px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
      .lead-form button { width: 100%; background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; }
      .chat-input-area { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid #eee; background: white; }
      #chat-input { flex: 1; padding: 12px 16px; border: 1px solid #ddd; border-radius: 24px; outline: none; font-size: 14px; }
      #chat-input:focus { border-color: #1a5f2a; }
      #send-btn { background: #1a5f2a; color: white; border: none; padding: 12px 20px; border-radius: 24px; cursor: pointer; font-weight: 600; }
      #send-btn:hover { background: #2d8b3f; }
      @media (max-width: 480px) {
        .chat-window { width: calc(100vw - 30px); right: -5px; height: calc(100vh - 140px); }
      }
    </style>`;

    document.body.insertAdjacentHTML('beforeend', html);

    document.getElementById('chat-toggle').addEventListener('click', toggleChat);
    document.getElementById('chat-minimize').addEventListener('click', toggleChat);
    document.getElementById('send-btn').addEventListener('click', () => sendMessage());
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-window').classList.toggle('open', chatOpen);
    document.getElementById('chat-toggle').style.display = chatOpen ? 'none' : 'flex';
    if (chatOpen) {
      document.getElementById('chat-input').focus();
      ga('send', 'event', 'Chat', 'Chat Opened');
    }
  }

  function sendMessage(input) {
    const messageInput = document.getElementById('chat-input');
    const message = input || messageInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    if (!input) messageInput.value = '';
    messageCount++;

    ga('send', 'event', 'Chat', 'Message Sent', message);

    setTimeout(() => {
      addMessage(getResponse(message), 'bot');
    }, 600);
  }

  function addMessage(content, sender) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.innerHTML = `<div class="message-content">${content}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function getResponse(msg) {
    const m = msg.toLowerCase();

    if (m.includes('quote') || m.includes('price') || m.includes('cost')) {
      ga('send', 'event', 'Chat', 'Quote Requested');
      if (!leadCaptured) {
        document.getElementById('lead-form').style.display = 'block';
        return "I'd be happy to help you get a <strong>FREE quote</strong>! Please fill in your details below:";
      }
      return "Our team will contact you within 24 hours with your custom quote.";
    }

    if (m.includes('product') || m.includes('service')) {
      ga('send', 'event', 'Chat', 'Products Viewed');
      return `We offer complete security solutions:<br><br>
        <strong>Electric Fencing</strong> - From R350/m | SAID Approved<br>
        <strong>CCTV Systems</strong> - From R4,500 | HD/4K Cameras<br>
        <strong>Access Control</strong> - From R8,000 | Biometric<br>
        <strong>Gate Automation</strong> - From R12,000 | Smart Ready<br>
        <strong>Equestrian Fencing</strong> - Full Range Available`;
    }

    if (m.includes('electric') || m.includes('fencing')) {
      return "Our <strong>electric fencing</strong> is SAID approved with 12-month warranty. Price starts from R350/m. Would you like a free quote?";
    }

    if (m.includes('cctv') || m.includes('camera')) {
      return "Our <strong>CCTV systems</strong> offer HD/4K quality with night vision and remote viewing. Starting from R4,500.";
    }

    if (m.includes('equestrian') || m.includes('horse') || m.includes('paddock')) {
      return "We have a complete range of <strong>equestrian fencing products</strong>: Polytape, Rope, Insulators, Solar Energizers, Gate Hardware.";
    }

    if (m.includes('contact') || m.includes('phone')) {
      return `<strong>${CONFIG.companyPhone}</strong><br><strong>${CONFIG.companyEmail}</strong><br><br>Hours: ${CONFIG.businessHours}`;
    }

    if (m.includes('delivery') || m.includes('shipping')) {
      return "Delivery rates: Gauteng R200, Durban R650, Cape Town R800. Distance-based calculation also available.";
    }

    return `I can help you with:<br>
      • Security Systems<br>
      • Equestrian Products<br>
      • Free Quotes<br>
      • Contact Details<br><br>What would you like to know?`;
  }

  function submitLead() {
    const name = document.getElementById('lead-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const interest = document.getElementById('lead-interest').value;

    if (!name || !email) {
      alert('Please enter your name and email');
      return;
    }

    leadCaptured = true;
    document.getElementById('lead-form').style.display = 'none';

    // Track in Google Analytics
    ga('send', 'event', 'Lead', 'Lead Captured', interest);
    console.log('NEW LEAD:', { name, email, phone, interest, timestamp: new Date().toISOString() });

    addMessage(`Thank you ${name}! We'll contact you at ${email} within 24 hours.`, 'bot');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.nexpakChat = {
    send: sendMessage,
    submitLead: submitLead
  };
})();
     
