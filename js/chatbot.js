/**
 * Nexpak Security Solutions - Upgraded AI Chatbot
 * Features: Realistic Robot Avatar, Robotic Waving Arm, Automatic Screen Floating
 */
(function() {
'use strict';

// ====== GOOGLE ANALYTICS ======
(function(i,s,o,g,r,a,m){
  i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
  a=s.createElement(o),m=s.getElementsByTagName(o)[0];
  a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-00f00e5ed65d35fc2d5d524170097219675283e9', 'auto');
ga('send', 'pageview');

// ======== COMPANY CONFIG ========
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
      <button id="chat-toggle" class="chat-toggle" title="Chat with Nexpak Bot">

        <!-- REALISTIC ROBOT -->
        <div class="bot-avatar-container">

          <div class="robot-body">

            <div class="robot-neck"></div>

            <div class="robot-head">

              <div class="robot-antenna">
                <span></span>
              </div>

              <div class="robot-ear left"></div>
              <div class="robot-ear right"></div>

              <div class="robot-face">

                <div class="robot-eyes">
                  <span></span>
                  <span></span>
                </div>

                <div class="robot-nose"></div>

                <div class="robot-mouth">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            </div>

            <div class="robot-chest">

              <div class="robot-chest-panel">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

          </div>

          <!-- ROBOTIC WAVING ARM -->
          <div class="robot-arm">

            <div class="robot-shoulder"></div>

            <div class="robot-upper-arm"></div>

            <div class="robot-elbow">
              <span></span>
            </div>

            <div class="robot-forearm"></div>

            <div class="robot-wrist"></div>

            <div class="robot-hand">

              <div class="robot-palm"></div>

              <div class="robot-finger finger-1"></div>
              <div class="robot-finger finger-2"></div>
              <div class="robot-finger finger-3"></div>
              <div class="robot-finger finger-4"></div>
              <div class="robot-thumb"></div>

            </div>

          </div>

        </div>

        <span class="chat-toggle-text">Chat with us</span>

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
              Hi there! Welcome to <strong>${CONFIG.companyName}</strong>.
              <br><br>
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

      /* =========================================================
         NEXPAK REALISTIC ROBOT AVATAR
         ONLY THE BOT VISUAL HAS BEEN CHANGED
      ========================================================= */

      #nexpak-chatbot {
        position: fixed;
        z-index: 9999;
        font-family: 'Segoe UI', Arial, sans-serif;
        user-select: none;
      }
      
      /* Floating Toggle Button */
      .chat-toggle {
        background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(26,95,42,0.4);
        transition: box-shadow 0.2s;
        overflow: visible;
      }

      .chat-toggle:hover {
        box-shadow: 0 6px 25px rgba(26,95,42,0.6);
      }

      /* =========================================================
         ROBOT AVATAR CONTAINER
      ========================================================= */

      .bot-avatar-container {
        position: relative;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 400px;
      }

      /* =========================================================
         ROBOT BODY
      ========================================================= */

      .robot-body {
        position: absolute;
        width: 31px;
        height: 45px;
        left: 7px;
        bottom: 1px;
        z-index: 3;
      }

      .robot-head {
        position: absolute;
        width: 31px;
        height: 27px;
        left: 0;
        top: 0;
        border-radius: 9px 9px 7px 7px;

        background:
          linear-gradient(
            145deg,
            #ffffff 0%,
            #dce5e9 28%,
            #8c9aa2 65%,
            #4b5961 100%
          );

        border: 1px solid rgba(255,255,255,0.8);

        box-shadow:
          inset 2px 2px 4px rgba(255,255,255,0.9),
          inset -3px -3px 5px rgba(0,0,0,0.35),
          0 3px 7px rgba(0,0,0,0.45);
      }

      /* Robot Face Plate */

      .robot-face {
        position: absolute;
        width: 25px;
        height: 20px;
        left: 3px;
        top: 4px;
        border-radius: 6px;

        background:
          linear-gradient(
            145deg,
            #1b252a,
            #05090b
          );

        border: 1px solid #64747d;

        box-shadow:
          inset 0 2px 5px rgba(0,0,0,0.8),
          inset 0 -1px 2px rgba(255,255,255,0.12);
      }

      /* Robot Eyes */

      .robot-eyes {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 15px;
        height: 5px;
        display: flex;
        justify-content: space-between;
      }

      .robot-eyes span {
        width: 5px;
        height: 4px;
        border-radius: 50%;

        background: #55ff9a;

        box-shadow:
          0 0 4px #55ff9a,
          0 0 8px rgba(85,255,154,0.8);

        animation: robotEyeGlow 2s infinite ease-in-out;
      }

      .robot-eyes span:nth-child(2) {
        animation-delay: 0.15s;
      }

      @keyframes robotEyeGlow {
        0%,100% {
          opacity: 0.75;
          transform: scale(0.9);
        }

        50% {
          opacity: 1;
          transform: scale(1.15);
        }
      }

      /* Robot Nose */

      .robot-nose {
        position: absolute;
        width: 3px;
        height: 3px;
        left: 11px;
        top: 11px;
        border-radius: 50%;
        background: #79e7ff;
        box-shadow: 0 0 4px #79e7ff;
      }

      /* Robot Mouth */

      .robot-mouth {
        position: absolute;
        left: 7px;
        bottom: 2px;
        width: 11px;
        height: 3px;
        display: flex;
        gap: 2px;
      }

      .robot-mouth span {
        width: 2px;
        height: 2px;
        background: #51d88a;
        box-shadow: 0 0 3px #51d88a;
      }

      /* Antenna */

      .robot-antenna {
        position: absolute;
        width: 2px;
        height: 7px;
        background: #778890;
        left: 14px;
        top: -7px;
        z-index: 4;
      }

      .robot-antenna span {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        left: -2px;
        top: -5px;

        background: #4ade80;

        box-shadow:
          0 0 5px #4ade80,
          0 0 10px rgba(74,222,128,0.8);

        animation: antennaPulse 1.4s infinite;
      }

      @keyframes antennaPulse {
        0%,100% {
          transform: scale(0.8);
          opacity: 0.7;
        }

        50% {
          transform: scale(1.25);
          opacity: 1;
        }
      }

      /* Robot Ears */

      .robot-ear {
        position: absolute;
        top: 8px;
        width: 4px;
        height: 11px;
        border-radius: 3px;

        background: linear-gradient(
          90deg,
          #48555c,
          #b6c3c9,
          #56636a
        );

        box-shadow:
          inset 0 1px 1px rgba(255,255,255,0.6);
      }

      .robot-ear.left {
        left: -4px;
      }

      .robot-ear.right {
        right: -4px;
      }

      /* Neck */

      .robot-neck {
        position: absolute;
        width: 9px;
        height: 5px;
        left: 11px;
        top: 25px;
        z-index: 2;

        background: linear-gradient(
          90deg,
          #39464d,
          #b8c5ca,
          #39464d
        );
      }

      /* Chest */

      .robot-chest {
        position: absolute;
        width: 25px;
        height: 17px;
        left: 3px;
        top: 28px;
        border-radius: 6px 6px 4px 4px;

        background:
          linear-gradient(
            145deg,
            #e9f0f3,
            #aab8be 45%,
            #56646b
          );

        border: 1px solid #dce5e9;

        box-shadow:
          inset 2px 2px 3px rgba(255,255,255,0.7),
          inset -2px -2px 4px rgba(0,0,0,0.35),
          0 2px 5px rgba(0,0,0,0.3);
      }

      /* Chest Panel */

      .robot-chest-panel {
        position: absolute;
        left: 7px;
        top: 5px;
        width: 11px;
        height: 6px;

        border-radius: 2px;

        background: #172126;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
      }

      .robot-chest-panel span {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 3px #4ade80;
      }

      /* =========================================================
         ROBOT ARM
      ========================================================= */

      .robot-arm {
        position: absolute;
        width: 28px;
        height: 42px;
        left: 28px;
        top: 3px;
        z-index: 8;

        transform-origin: 4px 10px;

        animation: robotWaveArm 1.6s infinite ease-in-out;
      }

      /* Shoulder */

      .robot-shoulder {
        position: absolute;
        width: 10px;
        height: 10px;
        left: 0;
        top: 10px;

        border-radius: 50%;

        background:
          radial-gradient(
            circle at 35% 30%,
            #ffffff,
            #aebbc1 35%,
            #4e5b62 75%,
            #252f34
          );

        border: 1px solid #d8e1e5;

        box-shadow:
          0 2px 4px rgba(0,0,0,0.45),
          inset 1px 1px 2px rgba(255,255,255,0.7);
      }

      /* Upper Arm */

      .robot-upper-arm {
        position: absolute;
        width: 6px;
        height: 15px;
        left: 5px;
        top: 17px;

        border-radius: 4px;

        background:
          linear-gradient(
            90deg,
            #3e4b52,
            #d4dde1,
            #77858c,
            #303b41
          );

        box-shadow:
          inset 1px 0 1px rgba(255,255,255,0.7),
          0 2px 3px rgba(0,0,0,0.35);
      }

      /* Elbow */

      .robot-elbow {
        position: absolute;
        width: 9px;
        height: 9px;
        left: 3px;
        top: 29px;

        border-radius: 50%;

        background:
          radial-gradient(
            circle,
            #dbe4e7,
            #69777e 55%,
            #303b41
          );

        border: 1px solid #cdd8dc;
      }

      .robot-elbow span {
        position: absolute;
        width: 3px;
        height: 3px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
        background: #1b2429;
      }

      /* Forearm */

      .robot-forearm {
        position: absolute;
        width: 6px;
        height: 14px;
        left: 7px;
        top: 34px;

        border-radius: 4px;

        background:
          linear-gradient(
            90deg,
            #39464c,
            #dce4e7,
            #8a989e,
            #303a40
          );

        box-shadow:
          inset 1px 0 1px rgba(255,255,255,0.7),
          0 2px 3px rgba(0,0,0,0.35);
      }

      /* Wrist */

      .robot-wrist {
        position: absolute;
        width: 8px;
        height: 5px;
        left: 6px;
        top: 46px;

        border-radius: 3px;

        background: #515e64;
      }

      /* =========================================================
         ROBOT HAND
      ========================================================= */

      .robot-hand {
        position: absolute;
        width: 13px;
        height: 13px;
        left: 4px;
        top: 49px;

        transform-origin: 50% 100%;

        animation: robotHandWave 0.8s infinite ease-in-out;
      }

      .robot-palm {
        position: absolute;
        width: 8px;
        height: 9px;
        left: 2px;
        top: 3px;

        border-radius: 4px;

        background:
          linear-gradient(
            135deg,
            #f0f5f7,
            #9ba8ae,
            #4d5a61
          );

        border: 1px solid #dbe3e6;

        box-shadow:
          0 2px 3px rgba(0,0,0,0.4),
          inset 1px 1px 2px rgba(255,255,255,0.8);
      }

      /* Fingers */

      .robot-finger {
        position: absolute;
        width: 3px;
        height: 8px;

        border-radius: 3px;

        background:
          linear-gradient(
            90deg,
            #4d5a60,
            #dbe3e6,
            #69767c
          );

        transform-origin: bottom center;
      }

      .finger-1 {
        left: 1px;
        top: -2px;
        transform: rotate(-22deg);
      }

      .finger-2 {
        left: 4px;
        top: -4px;
        transform: rotate(-8deg);
      }

      .finger-3 {
        left: 7px;
        top: -3px;
        transform: rotate(8deg);
      }

      .finger-4 {
        left: 9px;
        top: -1px;
        transform: rotate(22deg);
      }

      .robot-thumb {
        position: absolute;
        width: 4px;
        height: 7px;
        left: -1px;
        top: 5px;

        border-radius: 3px;

        background:
          linear-gradient(
            90deg,
            #4d5a60,
            #dbe3e6,
            #69767c
          );

        transform: rotate(-45deg);
      }

      /* =========================================================
         ARM WAVING
      ========================================================= */

      @keyframes robotWaveArm {

        0% {
          transform: rotate(-8deg);
        }

        15% {
          transform: rotate(8deg);
        }

        30% {
          transform: rotate(-5deg);
        }

        45% {
          transform: rotate(12deg);
        }

        60% {
          transform: rotate(-7deg);
        }

        75% {
          transform: rotate(9deg);
        }

        100% {
          transform: rotate(-8deg);
        }

      }

      @keyframes robotHandWave {

        0% {
          transform: rotate(-12deg);
        }

        25% {
          transform: rotate(20deg);
        }

        50% {
          transform: rotate(-18deg);
        }

        75% {
          transform: rotate(18deg);
        }

        100% {
          transform: rotate(-12deg);
        }

      }

      /* =========================================================
         CHAT WINDOW STYLES
         UNCHANGED
      ========================================================= */

      .chat-window {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 380px;
        height: 550px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.25);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }

      .chat-window.open {
        display: flex;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .chat-header {
        background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
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
        width: 45px;
        height: 45px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
      }

      .chat-header h4 {
        margin: 0;
        font-size: 16px;
      }

      .chat-status {
        font-size: 12px;
        opacity: 0.9;
      }

      .chat-status::before {
        content: '●';
        color: #4ade80;
        margin-right: 4px;
      }

      #chat-minimize {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
      }
      
      .chat-messages {
        flex: 1;
        display: flex;
        overflow-y: auto;
        padding: 16px;
        flex-direction: column;
        gap: 12px;
        background: #f8f9fa;
      }

      .message {
        max-width: 88%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
      }

      .bot-message {
        background: white;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }

      .user-message {
        background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
        color: white;
        align-self: flex-end;
        border-botto
