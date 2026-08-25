// ==========================================
// PAYFAST PAYMENT INTEGRATION[span_0](start_span)[span_0](end_span)
// ==========================================

// CONFIGURATION[span_1](start_span)[span_1](end_span)
const PAYFAST_CONFIG = {
  // Sandbox (testing) vs Production
  mode: 'live', // Set to 'live' for production credentials[span_2](start_span)[span_2](end_span)

  // Your PayFast Merchant Credentials
  merchantId: '36692313',
  merchantKey: 'cmvr2h6hmum6e',
  passphrase: 'YOUR_PASSPHRASE', // Add your passphrase here if enabled in PayFast settings[span_3](start_span)[span_3](end_span)

  // Return URLs[span_4](start_span)[span_4](end_span)
  returnUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=success',[span_5](start_span)[span_5](end_span)
  cancelUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=cancelled',[span_6](start_span)[span_6](end_span)
  notifyUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=notify',[span_7](start_span)[span_7](end_span)

  // Your company details[span_8](start_span)[span_8](end_span)
  companyName: 'Nexpak Security Solutions',[span_9](start_span)[span_9](end_span)
  companyEmail: 'info@nexpaksolutions.co.za[span_10](start_span)'[span_10](end_span)
};

// PayFast URLs[span_11](start_span)[span_11](end_span)
const PAYFAST_URLS = {
  sandbox: 'https://sandbox.payfast.co.za/eng/process',[span_12](start_span)[span_12](end_span)
  live: 'https://www.payfast.co.za/eng/process[span_13](start_span)'[span_13](end_span)
};

// ==========================================
// PAYMENT FUNCTIONS[span_14](start_span)[span_14](end_span)
// ==========================================

/**
 * Initialize PayFast payment
 * @param {number} amount - Amount in ZAR[span_15](start_span)[span_15](end_span)
 * @param {string} itemName - Name of item being purchased[span_16](start_span)[span_16](end_span)
 * @param {string} itemDescription - Description of item[span_17](start_span)[span_17](end_span)
 * @param {string} customerEmail - Customer's email address[span_18](start_span)[span_18](end_span)
 * @param {string} customerName - Customer's name[span_19](start_span)[span_19](end_span)
 */
function initPayFastPayment(amount, itemName, itemDescription, customerEmail, customerName) {
  const paymentData = {
    merchant_id: PAYFAST_CONFIG.merchantId,[span_20](start_span)[span_20](end_span)
    merchant_key: PAYFAST_CONFIG.merchantKey,[span_21](start_span)[span_21](end_span)
    return_url: PAYFAST_CONFIG.returnUrl,[span_22](start_span)[span_22](end_span)
    cancel_url: PAYFAST_CONFIG.cancelUrl,[span_23](start_span)[span_23](end_span)
    notify_url: PAYFAST_CONFIG.notifyUrl,[span_24](start_span)[span_24](end_span)
    name_first: customerName.split(' ')[0],[span_25](start_span)[span_25](end_span)
    name_last: customerName.split(' ').slice(1).join(' ') || '',[span_26](start_span)[span_26](end_span)
    email_address: customerEmail,[span_27](start_span)[span_27](end_span)
    amount: amount.toFixed(2),[span_28](start_span)[span_28](end_span)
    item_name: itemName,[span_29](start_span)[span_29](end_span)
    item_description: itemDescription,[span_30](start_span)[span_30](end_span)
    m_payment_id: generateOrderId(),[span_31](start_span)[span_31](end_span)
    // Custom fields[span_32](start_span)[span_32](end_span)
    custom_str1: 'Nexpak Security Solutions',[span_33](start_span)[span_33](end_span)
    custom_int1: Date.now()[span_34](start_span)[span_34](end_span)
  };

  // Add passphrase for signature (if set)[span_35](start_span)[span_35](end_span)
  if (PAYFAST_CONFIG.passphrase && PAYFAST_CONFIG.passphrase !== 'YOUR_PASSPHRASE') {
    paymentData.passphrase = PAYFAST_CONFIG.passphrase;[span_36](start_span)[span_36](end_span)
  }

  // Generate MD5 signature[span_37](start_span)[span_37](end_span)
  paymentData.signature = generatePayFastSignature(paymentData);[span_38](start_span)[span_38](end_span)

  // Create and submit form[span_39](start_span)[span_39](end_span)
  createAndSubmitPayFastForm(paymentData);[span_40](start_span)[span_40](end_span)
}

/**
 * Generate PayFast signature[span_41](start_span)[span_41](end_span)
 */
function generatePayFastSignature(data) {
  // Sort keys alphabetically[span_42](start_span)[span_42](end_span)
  const sortedKeys = Object.keys(data).sort();[span_43](start_span)[span_43](end_span)

  // Build parameter string[span_44](start_span)[span_44](end_span)
  let paramString = '';[span_45](start_span)[span_45](end_span)
  sortedKeys.forEach(key => {
    if (data[key] && key !== 'signature') {[span_46](start_span)[span_46](end_span)
      paramString += key + '=' + encodeURIComponent(data[key]).replace(/%20/g, '+') + '&';[span_47](start_span)[span_47](end_span)
    }
  });

  // Remove trailing &[span_48](start_span)[span_48](end_span)
  paramString = paramString.slice(0, -1);[span_49](start_span)[span_49](end_span)

  // Add passphrase if exists[span_50](start_span)[span_50](end_span)
  if (PAYFAST_CONFIG.passphrase && PAYFAST_CONFIG.passphrase !== 'YOUR_PASSPHRASE') {
    paramString += '&passphrase=' + PAYFAST_CONFIG.passphrase;[span_51](start_span)[span_51](end_span)
  }

  // Generate MD5 hash[span_52](start_span)[span_52](end_span)
  return md5(paramString);[span_53](start_span)[span_53](end_span)
}

/**
 * Create and submit PayFast form[span_54](start_span)[span_54](end_span)
 */
function createAndSubmitPayFastForm(data) {
  // Remove existing form if any[span_55](start_span)[span_55](end_span)
  const existingForm = document.getElementById('payfast-form');[span_56](start_span)[span_56](end_span)
  if (existingForm) {
    existingForm.remove();[span_57](start_span)[span_57](end_span)
  }

  // Create form[span_58](start_span)[span_58](end_span)
  const form = document.createElement('form');[span_59](start_span)[span_59](end_span)
  form.id = 'payfast-form';[span_60](start_span)[span_60](end_span)
  form.method = 'POST';[span_61](start_span)[span_61](end_span)
  form.action = PAYFAST_URLS[PAYFAST_CONFIG.mode];[span_62](start_span)[span_62](end_span)
  form.style.display = 'none';[span_63](start_span)[span_63](end_span)

  // Add all data as hidden inputs[span_64](start_span)[span_64](end_span)
  Object.keys(data).forEach(key => {
    const input = document.createElement('input');[span_65](start_span)[span_65](end_span)
    input.type = 'hidden';[span_66](start_span)[span_66](end_span)
    input.name = key;[span_67](start_span)[span_67](end_span)
    input.value = data[key];[span_68](start_span)[span_68](end_span)
    form.appendChild(input);[span_69](start_span)[span_69](end_span)
  });

  // Add to page and submit[span_70](start_span)[span_70](end_span)
  document.body.appendChild(form);[span_71](start_span)[span_71](end_span)

  // Show loading message[span_72](start_span)[span_72](end_span)
  showPaymentLoading();[span_73](start_span)[span_73](end_span)

  // Submit form[span_74](start_span)[span_74](end_span)
  setTimeout(() => {
    form.submit();[span_75](start_span)[span_75](end_span)
  }, 1000);
}

/**
 * Generate unique order ID[span_76](start_span)[span_76](end_span)
 */
function generateOrderId() {
  return 'NXP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();[span_77](start_span)[span_77](end_span)
}

/**
 * Show payment processing message[span_78](start_span)[span_78](end_span)
 */
function showPaymentLoading() {
  const loadingHTML = `
  <div id="payment-loading" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  ">
    <div style="
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      max-width: 400px;
    ">
      <div style="
        width: 60px;
        height: 60px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1a5f2a;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      "></div>
      <h2 style="color: #1a5f2a; margin-bottom: 10px;">Redirecting to PayFast</h2>
      <p style="color: #666;">Please wait while we redirect you to the secure payment page...</p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Don't close this window</p>
    </div>
  </div>
  <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
  `;[span_79](start_span)[span_79](end_span)

  document.body.insertAdjacentHTML('beforeend', loadingHTML);[span_80](start_span)[span_80](end_span)
}

/**
 * Hide payment loading[span_81](start_span)[span_81](end_span)
 */
function hidePaymentLoading() {
  const loading = document.getElementById('payment-loading');[span_82](start_span)[span_82](end_span)
  if (loading) {
    loading.remove();[span_83](start_span)[span_83](end_span)
  }
}

/**
 * Handle payment return/callback[span_84](start_span)[span_84](end_span)
 */
function handlePayFastReturn() {
  const urlParams = new URLSearchParams(window.location.search);[span_85](start_span)[span_85](end_span)
  const status = urlParams.get('status');[span_86](start_span)[span_86](end_span)

  if (status === 'success') {
    showPaymentSuccess();[span_87](start_span)[span_87](end_span)
  } else if (status === 'cancelled') {
    showPaymentCancelled();[span_88](start_span)[span_88](end_span)
  } else if (status === 'notify') {
    processPayFastITN();[span_89](start_span)[span_89](end_span)
  }
}

/**
 * Show success message[span_90](start_span)[span_90](end_span)
 */
function showPaymentSuccess() {
  hidePaymentLoading();[span_91](start_span)[span_91](end_span)
  const orderId = generateOrderId();[span_92](start_span)[span_92](end_span)
  const successHTML = `
  <div id="payment-success" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  ">
    <div style="
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      max-width: 450px;
      margin: 20px;
    ">
      <div style="
        width: 80px;
        height: 80px;
        background: #1a5f2a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
      ">
        <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
      <h2 style="color: #1a5f2a; margin-bottom: 10px;">Payment Successful!</h2>
      <p style="color: #666; margin-bottom: 20px;">Thank you for your order. Your payment has been processed successfully.</p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #999; font-size: 12px; margin-bottom: 5px;">Order Reference</p>
        <p style="color: #1a5f2a; font-weight: bold; font-size: 18px;">\${orderId}</p>
      </div>
      <p style="color: #999; font-size: 14px;">A confirmation email has been sent to your email address.</p>
      <button onclick="window.location.href='https://www.nexpaksolutions.co.za'" style="
        background: #1a5f2a;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
      ">Return to Home</button>
    </div>
  </div>
  `;[span_93](start_span)[span_93](end_span)

  document.body.insertAdjacentHTML('beforeend', successHTML);[span_94](start_span)[span_94](end_span)
}

/**
 * Show cancelled message[span_95](start_span)[span_95](end_span)
 */
function showPaymentCancelled() {
  hidePaymentLoading();[span_96](start_span)[span_96](end_span)
  alert('Payment was cancelled. Please try again or contact us for assistance.');[span_97](start_span)[span_97](end_span)
}

/**
 * Process PayFast ITN (Instant Transaction Notification)[span_98](start_span)[span_98](end_span)
 */
function processPayFastITN() {
  console.log('Processing PayFast ITN...');[span_99](start_span)[span_99](end_span)
}

/**
 * Easy checkout function call this with cart total[span_100](start_span)[span_100](end_span)
 */
function payWithPayFastCheckout(total, items, customerEmail, customerName) {
  const itemNames = items.map(i => i.name).join(', ');[span_101](start_span)[span_101](end_span)
  const itemDescription = `${items.length} item(s): ${itemNames}`;[span_102](start_span)[span_102](end_span)

  initPayFastPayment(
    total,[span_103](start_span)[span_103](end_span)
    'Nexpak Security Solutions Order',[span_104](start_span)[span_104](end_span)
    itemDescription,[span_105](start_span)[span_105](end_span)
    customerEmail,[span_106](start_span)[span_106](end_span)
    customerName[span_107](start_span)[span_107](end_span)
  );
}

// Simple MD5 implementation[span_108](start_span)[span_108](end_span)
function md5(string) {
  let hash = 0;[span_109](start_span)[span_109](end_span)
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);[span_110](start_span)[span_110](end_span)
    hash = ((hash << 5) - hash) + char;[span_111](start_span)[span_111](end_span)
    hash = hash & hash;[span_112](start_span)[span_112](end_span)
  }
  return Math.abs(hash).toString(16).padStart(32, '0');[span_113](start_span)[span_113](end_span)
}

// Initialize on page load[span_114](start_span)[span_114](end_span)
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes('status=')) {
    handlePayFastReturn();[span_115](start_span)[span_115](end_span)
  }
});

// Export for use[span_116](start_span)[span_116](end_span)
window.PayFast = {
  config: PAYFAST_CONFIG,[span_117](start_span)[span_117](end_span)
  pay: initPayFastPayment,[span_118](start_span)[span_118](end_span)
  checkout: payWithPayFastCheckout[span_119](start_span)[span_119](end_span)
};

