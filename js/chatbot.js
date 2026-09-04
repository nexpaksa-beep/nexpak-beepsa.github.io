// ==========================================
// NexPak Security Solutions - Chatbot Script
// ==========================================

const CONFIG = {
  companyName: "NexPak Solutions",
  companyPhone: "+27 11 000 0000",
  companyEmail: "info@nexpaksolutions.co.za",
  businessHours: "Mon - Fri: 8:00 AM - 5:00 PM"
};

let leadCaptured = false;

// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Toggle chat window visibility
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
  }
}

// Handle sending user messages and rendering bot replies
function sendMessage() {
  const inputField = document.getElementById('chat-input');
  const messageContainer = document.getElementById('chat-messages');
  
  if (!inputField || !messageContainer) return;
  
  const userMsg = inputField.value.trim();
  if (!userMsg) return;

  // Append user message to chat UI
  messageContainer.innerHTML += `<div class="user-message"><strong>You:</strong> ${escapeHtml(userMsg)}</div>`;
  inputField.value = '';
  messageContainer.scrollTop = messageContainer.scrollHeight;

  // Simulate thinking delay and fetch response
  setTimeout(() => {
    const botResponse = getResponse(userMsg);
    messageContainer.innerHTML += `<div class="bot-message"><strong>NexPak Bot:</strong> ${botResponse}</div>`;
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, 400);
}

// Basic HTML sanitizer to prevent injection
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// ==========================================
// Dynamic Knowledge-Base Response Engine
// ==========================================
function getResponse(msg) {
  const m = msg.toLowerCase();
  
  // 1. Check for Lead / Quote intent first
  if (m.includes('quote') || m.includes('price') || m.includes('cost')) {
    if (!leadCaptured) {
      const leadForm = document.getElementById('lead-form');
      if (leadForm) leadForm.style.display = 'block';
      return "I'd be happy to help you get a <strong>FREE quote</strong>! Please fill in your details below:";
    }
    return "Our team will contact you within 24 hours with your custom quote.";
  }

  // 2. Check global knowledge base categories from chatbot-knowledge.js
  if (window.NEXPAK_KNOWLEDGE && window.NEXPAK_KNOWLEDGE.productCategories) {
    const categories = window.NEXPAK_KNOWLEDGE.productCategories;
    
    for (const key in categories) {
      const cat = categories[key];
      if (m.includes(cat.name.toLowerCase()) || (cat.id && m.includes(cat.id))) {
        let responseText = `<strong>${cat.name}</strong><br>${cat.shortDescription}`;
        if (cat.customerBenefits && cat.customerBenefits.length > 0) {
          responseText += `<br><br><strong>Key Benefits:</strong><br>• ` + cat.customerBenefits.slice(0, 4).join('<br>• ');
        }
        return responseText;
      }
    }
  }

  // 3. Check Electric Fencing specialized knowledge API if queried
  if (m.includes('electric') || m.includes('fence') || m.includes('energizer')) {
    const ef = window.NexpakKnowledgeAPI ? window.NexpakKnowledgeAPI.getElectricFenceKnowledge() : null;
    if (ef) {
      return `<strong>${ef.name}</strong><br>${ef.definition}<br><br>Would you like to build an electric fence system or request a quote?`;
    }
  }

  // 4. Contact & Business Info fallback
  if (m.includes('contact') || m.includes('phone') || m.includes('email') || m.includes('hours')) {
    return `<strong>${CONFIG.companyPhone}</strong><br><strong>${CONFIG.companyEmail}</strong><br><br>Hours: ${CONFIG.businessHours}`;
  }

  // 5. General Fallback with menu options
  return `I can help you with Nexpak Security Solutions:
    <br>• Electric Fencing & Perimeters
    <br>• CCTV & IP Surveillance
    <br>• Alarm Systems & Access Control
    <br>• Gate Automation & Equestrian Fencing
    <br><br>
    What specific security requirement are you looking into today?`;
          }
    
