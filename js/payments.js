// Payments Logic\nconsole.log('Payments initialized');
// ==========================================
// PAYFAST PAYMENT CONFIGURATION & INTEGRATION[span_0](start_span)[span_0](end_span)
// ==========================================

const PAYFAST_CONFIG = {
  // Mode: Live or Sandbox
  mode: 'live', // Set to live for production[span_1](start_span)[span_1](end_span)

  // PayFast Merchant Credentials
  merchantId: '36692313',
  merchantKey: 'cmvr2h6hmum6e',
  passphrase: 'YOUR_PASSPHRASE', // Add passphrase if enabled in PayFast settings[span_2](start_span)[span_2](end_span)

  // Return URLs[span_3](start_span)[span_3](end_span)
  returnUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=success',[span_4](start_span)[span_4](end_span)
  cancelUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=cancelled',[span_5](start_span)[span_5](end_span)
  notifyUrl: 'https://www.nexpaksolutions.co.za/checkout.html?status=notify',[span_6](start_span)[span_6](end_span)

  // Company Details[span_7](start_span)[span_7](end_span)
  companyName: 'Nexpak Security Solutions',[span_8](start_span)[span_8](end_span)
  companyEmail: 'info@nexpaksolutions.co.za[span_9](start_span)'[span_9](end_span)
};

const PAYFAST_URLS = {
  sandbox: 'https://sandbox.payfast.co.za/eng/process',[span_10](start_span)[span_10](end_span)
  live: 'https://www.payfast.co.za/eng/process[span_11](start_span)'[span_11](end_span)
};

/**
 * Initialize PayFast payment[span_12](start_span)[span_12](end_span)
 */
function initPayFastPayment(amount, itemName, itemDescription, customerEmail, customerName) {
  const paymentData = {
    merchant_id: PAYFAST_CONFIG.merchantId,[span_13](start_span)[span_13](end_span)
    merchant_key: PAYFAST_CONFIG.merchantKey,[span_14](start_span)[span_14](end_span)
    return_url: PAYFAST_CONFIG.returnUrl,[span_15](start_span)[span_15](end_span)
    cancel_url: PAYFAST_CONFIG.cancelUrl,[span_16](start_span)[span_16](end_span)
    notify_url: PAYFAST_CONFIG.notifyUrl,[span_17](start_span)[span_17](end_span)
    name_first: customerName.split(' ')[0],[span_18](start_span)[span_18](end_span)
    name_last: customerName.split(' ').slice(1).join(' ') || '',[span_19](start_span)[span_19](end_span)
    email_address: customerEmail,[span_20](start_span)[span_20](end_span)
    amount: amount.toFixed(2),[span_21](start_span)[span_21](end_span)
    item_name: itemName,[span_22](start_span)[span_22](end_span)
    item_description: itemDescription,[span_23](start_span)[span_23](end_span)
    m_payment_id: generateOrderId(),[span_24](start_span)[span_24](end_span)
    custom_str1: 'Nexpak Security Solutions',[span_25](start_span)[span_25](end_span)
    custom_int1: Date.now()[span_26](start_span)[span_26](end_span)
  };

  if (PAYFAST_CONFIG.passphrase && PAYFAST_CONFIG.passphrase !== 'YOUR_PASSPHRASE') {
    paymentData.passphrase = PAYFAST_CONFIG.passphrase;[span_27](start_span)[span_27](end_span)
  }

  paymentData.signature = generatePayFastSignature(paymentData);[span_28](start_span)[span_28](end_span)
  createAndSubmitPayFastForm(paymentData);[span_29](start_span)[span_29](end_span)
}

/**
 * Generate PayFast signature[span_30](start_span)[span_30](end_span)
 */
function generatePayFastSignature(data) {
  const sortedKeys = Object.keys(data).sort();[span_31](start_span)[span_31](end_span)
  let paramString = '';[span_32](start_span)[span_32](end_span)

  sortedKeys.forEach(key => {
    if (data[key] && key !== 'signature') {[span_33](start_span)[span_33](end_span)
      paramString += key + '=' + encodeURIComponent(data[key]).replace(/%20/g, '+') + '&';[span_34](start_span)[span_34](end_span)
    }
  });

  paramString = paramString.slice(0, -1);[span_35](start_span)[span_35](end_span)

  if (PAYFAST_CONFIG.passphrase && PAYFAST_CONFIG.passphrase !== 'YOUR_PASSPHRASE') {
    paramString += '&passphrase=' + PAYFAST_CONFIG.passphrase;[span_36](start_span)[span_36](end_span)
  }

  return md5(paramString);[span_37](start_span)[span_37](end_span)
}

/**
 * Create and submit PayFast form[span_38](start_span)[span_38](end_span)
 */
function createAndSubmitPayFastForm(data) {
  const existingForm = document.getElementById('payfast-form');[span_39](start_span)[span_39](end_span)
  if (existingForm) {
    existingForm.remove();[span_40](start_span)[span_40](end_span)
  }

  const form = document.createElement('form');[span_41](start_span)[span_41](end_span)
  form.id = 'payfast-form';[span_42](start_span)[span_42](end_span)
  form.method = 'POST';[span_43](start_span)[span_43](end_span)
  form.action = PAYFAST_URLS[PAYFAST_CONFIG.mode];[span_44](start_span)[span_44](end_span)
  form.style.display = 'none';[span_45](start_span)[span_45](end_span)

  Object.keys(data).forEach(key => {
    const input = document.createElement('input');[span_46](start_span)[span_46](end_span)
    input.type = 'hidden';[span_47](start_span)[span_47](end_span)
    input.name = key;[span_48](start_span)[span_48](end_span)
    input.value = data[key];[span_49](start_span)[span_49](end_span)
    form.appendChild(input);[span_50](start_span)[span_50](end_span)
  });

  document.body.appendChild(form);[span_51](start_span)[span_51](end_span)
  showPaymentLoading();[span_52](start_span)[span_52](end_span)

  setTimeout(() => {
    form.submit();[span_53](start_span)[span_53](end_span)
  }, 1000);
}

function generateOrderId() {
  return 'NXP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();[span_54](start_span)[span_54](end_span)
}

function showPaymentLoading() {
  const loadingHTML = `
  <div id="payment-loading" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); display: flex; justify-content: center;
    align-items: center; z-index: 99999;
  ">
    <div style="background: white; padding: 40px; border-radius: 16px; text-align: center; max-width: 400px;">
      <div style="
        width: 60px; height: 60px; border: 4px solid #f3f3f3;
        border-top: 4px solid #1a5f2a; border-radius: 50%;
        animation: spin 1s linear infinite; margin: 0 auto 20px;
      "></div>
      <h2 style="color: #1a5f2a; margin-bottom: 10px;">Redirecting to PayFast</h2>
      <p style="color: #666;">Please wait while we redirect you to the secure payment page...</p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Don't close this window</p>
    </div>
  </div>
  <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
  `;[span_55](start_span)[span_55](end_span)

  document.body.insertAdjacentHTML('beforeend', loadingHTML);[span_56](start_span)[span_56](end_span)
}

function hidePaymentLoading() {
  const loading = document.getElementById('payment-loading');[span_57](start_span)[span_57](end_span)
  if (loading) {
    loading.remove();[span_58](start_span)[span_58](end_span)
  }
}

function handlePayFastReturn() {
  const urlParams = new URLSearchParams(window.location.search);[span_59](start_span)[span_59](end_span)
  const status = urlParams.get('status');[span_60](start_span)[span_60](end_span)

  if (status === 'success') {
    showPaymentSuccess();[span_61](start_span)[span_61](end_span)
  } else if (status === 'cancelled') {
    showPaymentCancelled();[span_62](start_span)[span_62](end_span)
  } else if (status === 'notify') {
    processPayFastITN();[span_63](start_span)[span_63](end_span)
  }
}

function showPaymentSuccess() {
  hidePaymentLoading();[span_64](start_span)[span_64](end_span)
  const orderId = generateOrderId();[span_65](start_span)[span_65](end_span)
  const successHTML = `
  <div id="payment-success" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
    display: flex; justify-content: center; align-items: center; z-index: 99999;
  ">
    <div style="background: white; padding: 40px; border-radius: 16px; text-align: center; max-width: 450px; margin: 20px;">
      <div style="
        width: 80px; height: 80px; background: #1a5f2a; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
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
        background: #1a5f2a; color: white; border: none; padding: 15px 30px;
        border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 20px;
      ">Return to Home</button>
    </div>
  </div>
  `;[span_66](start_span)[span_66](end_span)

  document.body.insertAdjacentHTML('beforeend', successHTML);[span_67](start_span)[span_67](end_span)
}

function showPaymentCancelled() {
  hidePaymentLoading();[span_68](start_span)[span_68](end_span)
  alert('Payment was cancelled. Please try again or contact us for assistance.');[span_69](start_span)[span_69](end_span)
}

function processPayFastITN() {
  console.log('Processing PayFast ITN...');[span_70](start_span)[span_70](end_span)
}

function payWithPayFastCheckout(total, items, customerEmail, customerName) {
  const itemNames = items.map(i => i.name).join(', ');[span_71](start_span)[span_71](end_span)
  const itemDescription = `${items.length} item(s): ${itemNames}`;[span_72](start_span)[span_72](end_span)

  initPayFastPayment(
    total,[span_73](start_span)[span_73](end_span)
    'Nexpak Security Solutions Order',[span_74](start_span)[span_74](end_span)
    itemDescription,[span_75](start_span)[span_75](end_span)
    customerEmail,[span_76](start_span)[span_76](end_span)
    customerName[span_77](start_span)[span_77](end_span)
  );
}

function md5(string) {
  let hash = 0;[span_78](start_span)[span_78](end_span)
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);[span_79](start_span)[span_79](end_span)
    hash = ((hash << 5) - hash) + char;[span_80](start_span)[span_80](end_span)
    hash = hash & hash;[span_81](start_span)[span_81](end_span)
  }
  return Math.abs(hash).toString(16).padStart(32, '0');[span_82](start_span)[span_82](end_span)
}

// ==========================================
// DELIVERY CALCULATOR FIX[span_83](start_span)[span_83](end_span)
// ==========================================

const DELIVERY_CONFIG = {
  baseFee: 90, // R90 base fee[span_84](start_span)[span_84](end_span)
  perKm: 6.50, // R6.50 per km[span_85](start_span)[span_85](end_span)
  perKg: 8.00, // R8.00 per kg[span_86](start_span)[span_86](end_span)
  warehouseAddress: 'Benoni, Gauteng, South Africa',[span_87](start_span)[span_87](end_span)
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Get free key at Google Cloud Console[span_88](start_span)[span_88](end_span)
};

const REGIONAL_RATES = {
  gauteng: 200,[span_89](start_span)[span_89](end_span)
  durban: 650,[span_90](start_span)[span_90](end_span)
  capeTown: 800,[span_91](start_span)[span_91](end_span)
  other: 500[span_92](start_span)[span_92](end_span)
};

function initDeliveryCalculator() {
  if (!document.getElementById('delivery-calculator-enhanced')) {
    createDeliveryCalculatorHTML();[span_93](start_span)[span_93](end_span)
  }
  setupDeliveryEvents();[span_94](start_span)[span_94](end_span)
}

function createDeliveryCalculatorHTML() {
  const calculatorHTML = `
  <div id="delivery-calculator-enhanced" class="delivery-calc">
    <h3>Delivery Calculator</h3>
    <div class="calc-section">
      <label>Enter your delivery address:</label>
      <div class="address-input-group">
        <input type="text" id="delivery-address" placeholder="e.g., 123 Main Street, Johannesburg" autocomplete="off">
        <button onclick="calculateDeliveryByAddress()" class="calc-btn">
          Calculate
        </button>
      </div>
      <div id="address-suggestions" class="address-suggestions"></div>
    </div>
    <div class="calc-section or-divider">
      <span>OR enter distance manually</span>
    </div>
    <div class="calc-section">
      <label>Distance from Benoni (km):</label>
      <input type="number" id="distance-km" placeholder="Enter kilometers" min="0" onchange="calculateDeliveryManual()">
    </div>
    <div class="calc-section">
      <label>Or select region:</label>
      <select id="delivery-region" onchange="calculateDeliveryRegion()">
        <option value="">Select Region</option>
        <option value="gauteng">Gauteng - R200</option>
        <option value="durban">Durban - R650</option>
        <option value="capetown">Cape Town Areas - R800</option>
        <option value="other">Other - R500</option>
      </select>
    </div>
    <div id="delivery-result" class="delivery-result" style="display:none;">
      <div class="result-row">
        <span>Base Fee:</span>
        <span id="base-fee-display">R0.00</span>
      </div>
      <div class="result-row">
        <span>Distance Fee:</span>
        <span id="distance-fee-display">R0.00</span>
      </div>
      <div class="result-row">
        <span>Weight Fee:</span>
        <span id="weight-fee-display">R0.00</span>
      </div>
      <div class="result-row total">
        <span>Total Delivery: </span>
        <span id="total-delivery-display">R0.00</span>
      </div>
    </div>
    <p class="calc-note">* Final delivery cost may vary based on exact location and weight</p>
  </div>
  `;[span_95](start_span)[span_95](end_span)

  const existingCalc = document.querySelector('.delivery-calculator, #delivery-calculator');[span_96](start_span)[span_96](end_span)
  if (existingCalc) {
    existingCalc.innerHTML = calculatorHTML;[span_97](start_span)[span_97](end_span)
  }
}

addDeliveryStyles();[span_98](start_span)[span_98](end_span)

function addDeliveryStyles() {
  const styles = `
  .delivery-calc { background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0; }
  .delivery-calc h3 { color: #1a5f2a; margin-bottom: 16px; }
  .calc-section { margin-bottom: 16px; }
  .calc-section label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; }
  .address-input-group { display: flex; gap: 10px; }
  .address-input-group input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
  .calc-btn { background: #1a5f2a; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
  .calc-btn:hover { background: #2d8b3f; }
  .or-divider { text-align: center; color: #666; font-size: 14px; }
  .delivery-calc input[type="number"], .delivery-calc select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
  .delivery-result { background: white; padding: 16px; border-radius: 8px; margin-top: 16px; border: 2px solid #1a5f2a; }
  .result-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
  .result-row.total { font-weight: bold; font-size: 18px; color: #1a5f2a; border-bottom: none; padding-top: 12px; }
  .calc-note { font-size: 12px; color: #666; margin-top: 12px; }
  `;[span_99](start_span)[span_99](end_span)

  const styleEl = document.createElement('style');[span_100](start_span)[span_100](end_span)
  styleEl.textContent = styles;[span_101](start_span)[span_101](end_span)
  document.head.appendChild(styleEl);[span_102](start_span)[span_102](end_span)
}

function setupDeliveryEvents() {
  const addressInput = document.getElementById('delivery-address');[span_103](start_span)[span_103](end_span)
  if (addressInput) {
    addressInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        calculateDeliveryByAddress();[span_104](start_span)[span_104](end_span)
      }
    });
  }
}

async function calculateDeliveryByAddress() {
  const address = document.getElementById('delivery-address').value;[span_105](start_span)[span_105](end_span)
  if (!address) {
    alert('Please enter an address');[span_106](start_span)[span_106](end_span)
    return;[span_107](start_span)[span_107](end_span)
  }

  const btn = document.querySelector('.calc-btn');[span_108](start_span)[span_108](end_span)
  btn.textContent = 'Calculating...';[span_109](start_span)[span_109](end_span)
  btn.disabled = true;[span_110](start_span)[span_110](end_span)

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(DELIVERY_CONFIG.warehouseAddress)}&destinations=${encodeURIComponent(address)}&key=${DELIVERY_CONFIG.apiKey}`
    );[span_111](start_span)[span_111](end_span)
    const data = await response.json();[span_112](start_span)[span_112](end_span)

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceKm = data.rows[0].elements[0].distance.value / 1000;[span_113](start_span)[span_113](end_span)
      document.getElementById('distance-km').value = Math.round(distanceKm);[span_114](start_span)[span_114](end_span)
      calculateDeliveryManual();[span_115](start_span)[span_115](end_span)
    } else {
      alert('Could not find that address. Please try a different address or enter distance manually.');[span_116](start_span)[span_116](end_span)
    }
  } catch (error) {
    console.error('Delivery calculation error:', error);[span_117](start_span)[span_117](end_span)
    alert('Error calculating delivery. Please enter distance manually.');[span_118](start_span)[span_118](end_span)
  } finally {
    btn.textContent = 'Calculate';[span_119](start_span)[span_119](end_span)
    btn.disabled = false;[span_120](start_span)[span_120](end_span)
  }
}

function calculateDeliveryManual() {
  const distance = parseFloat(document.getElementById('distance-km').value) || 0;[span_121](start_span)[span_121](end_span)
  const weight = getCartWeight();[span_122](start_span)[span_122](end_span)
  const baseFee = DELIVERY_CONFIG.baseFee;[span_123](start_span)[span_123](end_span)
  const distanceFee = distance * DELIVERY_CONFIG.perKm;[span_124](start_span)[span_124](end_span)
  const weightFee = weight * DELIVERY_CONFIG.perKg;[span_125](start_span)[span_125](end_span)
  const total = baseFee + distanceFee + weightFee;[span_126](start_span)[span_126](end_span)

  displayDeliveryResult(baseFee, distanceFee, weightFee, total);[span_127](start_span)[span_127](end_span)
}

function calculateDeliveryRegion() {
  const region = document.getElementById('delivery-region').value;[span_128](start_span)[span_128](end_span)
  if (!region) return;[span_129](start_span)[span_129](end_span)

  const cost = REGIONAL_RATES[region];[span_130](start_span)[span_130](end_span)
  const weight = getCartWeight();[span_131](start_span)[span_131](end_span)
  const weightFee = weight * DELIVERY_CONFIG.perKg;[span_132](start_span)[span_132](end_span)
  const total = cost + weightFee;[span_133](start_span)[span_133](end_span)

  document.getElementById('base-fee-display').textContent = 'R' + cost.toFixed(2);[span_134](start_span)[span_134](end_span)
  document.getElementById('distance-fee-display').textContent = 'R0.00';[span_135](start_span)[span_135](end_span)
  document.getElementById('weight-fee-display').textContent = 'R' + weightFee.toFixed(2);[span_136](start_span)[span_136](end_span)
  document.getElementById('total-delivery-display').textContent = 'R' + total.toFixed(2);[span_137](start_span)[span_137](end_span)
    document.getElementById('delivery-result').style.display = 'block';[span_0](start_span)[span_0](end_span)
}

function displayDeliveryResult(base, distance, weight, total) {
  document.getElementById('base-fee-display').textContent = 'R' + base.toFixed(2);[span_1](start_span)[span_1](end_span)
  document.getElementById('distance-fee-display').textContent = 'R' + distance.toFixed(2);[span_2](start_span)[span_2](end_span)
  document.getElementById('weight-fee-display').textContent = 'R' + weight.toFixed(2);[span_3](start_span)[span_3](end_span)
  document.getElementById('total-delivery-display').textContent = 'R' + total.toFixed(2);[span_4](start_span)[span_4](end_span)
  document.getElementById('delivery-result').style.display = 'block';[span_5](start_span)[span_5](end_span)
}

function getCartWeight() {
  const cartElement = document.querySelector('.cart-total-weight, #cart-weight, [data-weight]');[span_6](start_span)[span_6](end_span)
  if (cartElement) {
    return parseFloat(cartElement.textContent) || 0;[span_7](start_span)[span_7](end_span)
  }
  return 0;[span_8](start_span)[span_8](end_span)
}

// Global Exports & Page Initialization[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span)
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes('status=')) {
    handlePayFastReturn();[span_11](start_span)[span_11](end_span)
  }
  initDeliveryCalculator();[span_12](start_span)[span_12](end_span)
});

window.PayFast = {
  config: PAYFAST_CONFIG,[span_13](start_span)[span_13](end_span)
  pay: initPayFastPayment,[span_14](start_span)[span_14](end_span)
  checkout: payWithPayFastCheckout[span_15](start_span)[span_15](end_span)
};
    
