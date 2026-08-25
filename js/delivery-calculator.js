// Nexpak Delivery Calculator Fix[span_0](start_span)[span_0](end_span)
// Add this to your shop.html and equestrian.html[span_1](start_span)[span_1](end_span)

// ==================== DELIVERY CALCULATOR FIX ====================[span_2](start_span)[span_2](end_span)
// Replace the existing delivery calculator section with this enhanced version[span_3](start_span)[span_3](end_span)

const DELIVERY_CONFIG = {
  baseFee: 90, // R90 base fee[span_4](start_span)[span_4](end_span)
  perKm: 6.50, // R6.50 per km[span_5](start_span)[span_5](end_span)
  perKg: 8.00, // R8.00 per kg[span_6](start_span)[span_6](end_span)
  warehouseAddress: 'Benoni, Gauteng, South Africa',[span_7](start_span)[span_7](end_span)
  apiKey: 'ca13591e37193a981604a85d0441ecf91a825edd4b7d461b196294e124c87776' // Get free key at Google Cloud Console[span_8](start_span)[span_8](end_span)
};

// Regional fallback rates[span_9](start_span)[span_9](end_span)
const REGIONAL_RATES = {
  gauteng: 200,[span_10](start_span)[span_10](end_span)
  durban: 650,[span_11](start_span)[span_11](end_span)
  capeTown: 800,[span_12](start_span)[span_12](end_span)
  other: 500[span_13](start_span)[span_13](end_span)
};

function initDeliveryCalculator() {
  // Create enhanced calculator HTML if not exists[span_14](start_span)[span_14](end_span)
  if (!document.getElementById('delivery-calculator-enhanced')) {
    createDeliveryCalculatorHTML();[span_15](start_span)[span_15](end_span)
  }
  // Add event listeners[span_16](start_span)[span_16](end_span)
  setupDeliveryEvents();[span_17](start_span)[span_17](end_span)
}

function createDeliveryCalculatorHTML() {
  const calculatorHTML = `
  <div id="delivery-calculator-enhanced" class="delivery-calc">
    <h3>Delivery Calculator</h3>
    <!-- Address-based calculation -->
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
    <!-- OR Manual distance input -->
    <div class="calc-section or-divider">
      <span>OR enter distance manually</span>
    </div>
    <div class="calc-section">
      <label>Distance from Benoni (km):</label>
      <input type="number" id="distance-km" placeholder="Enter kilometers" min="0" onchange="calculateDeliveryManual()">
    </div>
    <!-- Regional fallback -->
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
    <!-- Results -->
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
  `;[span_18](start_span)[span_18](end_span)

  // Insert into page (adjust selector based on your page structure)[span_19](start_span)[span_19](end_span)
  const existingCalc = document.querySelector('.delivery-calculator, #delivery-calculator');[span_20](start_span)[span_20](end_span)
  if (existingCalc) {
    existingCalc.innerHTML = calculatorHTML;[span_21](start_span)[span_21](end_span)
  }
}

// Add styles[span_22](start_span)[span_22](end_span)
addDeliveryStyles();[span_23](start_span)[span_23](end_span)

function addDeliveryStyles() {
  const styles = `
  .delivery-calc {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    margin: 20px 0;
  }
  .delivery-calc h3 {
    color: #1a5f2a;
    margin-bottom: 16px;
  }
  .calc-section {
    margin-bottom: 16px;
  }
  .calc-section label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }
  .address-input-group {
    display: flex;
    gap: 10px;
  }
  .address-input-group input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
  }
  .calc-btn {
    background: #1a5f2a;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
  }
  .calc-btn:hover {
    background: #2d8b3f;
  }
  .or-divider {
    text-align: center;
    color: #666;
    font-size: 14px;
  }
  .delivery-calc input[type="number"],
  .delivery-calc select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
  }
  .delivery-result {
    background: white;
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
    border: 2px solid #1a5f2a;
  }
  .result-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  .result-row.total {
    font-weight: bold;
    font-size: 18px;
    color: #1a5f2a;
    border-bottom: none;
    padding-top: 12px;
  }
  .calc-note {
    font-size: 12px;
    color: #666;
    margin-top: 12px;
  }
  `;[span_24](start_span)[span_24](end_span)

  const styleEl = document.createElement('style');[span_25](start_span)[span_25](end_span)
  styleEl.textContent = styles;[span_26](start_span)[span_26](end_span)
  document.head.appendChild(styleEl);[span_27](start_span)[span_27](end_span)
}

function setupDeliveryEvents() {
  const addressInput = document.getElementById('delivery-address');[span_28](start_span)[span_28](end_span)
  if (addressInput) {
    addressInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        calculateDeliveryByAddress();[span_29](start_span)[span_29](end_span)
      }
    });
  }
}

async function calculateDeliveryByAddress() {
  const address = document.getElementById('delivery-address').value;[span_30](start_span)[span_30](end_span)
  if (!address) {
    alert('Please enter an address');[span_31](start_span)[span_31](end_span)
    return;[span_32](start_span)[span_32](end_span)
  }

  const btn = document.querySelector('.calc-btn');[span_33](start_span)[span_33](end_span)
  btn.textContent = 'Calculating...';[span_34](start_span)[span_34](end_span)
  btn.disabled = true;[span_35](start_span)[span_35](end_span)

  try {
    // Use Google Maps Distance Matrix API[span_36](start_span)[span_36](end_span)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(DELIVERY_CONFIG.warehouseAddress)}&destinations=${encodeURIComponent(address)}&key=${DELIVERY_CONFIG.apiKey}`
    );[span_37](start_span)[span_37](end_span)
    const data = await response.json();[span_38](start_span)[span_38](end_span)

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceKm = data.rows[0].elements[0].distance.value / 1000; // Convert meters to km[span_39](start_span)[span_39](end_span)
      document.getElementById('distance-km').value = Math.round(distanceKm);[span_40](start_span)[span_40](end_span)
      calculateDeliveryManual();[span_41](start_span)[span_41](end_span)
    } else {
      alert('Could not find that address. Please try a different address or enter distance manually.');[span_42](start_span)[span_42](end_span)
    }
  } catch (error) {
    console.error('Delivery calculation error:', error);[span_43](start_span)[span_43](end_span)
    alert('Error calculating delivery. Please enter distance manually.');[span_44](start_span)[span_44](end_span)
  } finally {
    btn.textContent = 'Calculate';[span_45](start_span)[span_45](end_span)
    btn.disabled = false;[span_46](start_span)[span_46](end_span)
  }
}

function calculateDeliveryManual() {
  const distance = parseFloat(document.getElementById('distance-km').value) || 0;[span_47](start_span)[span_47](end_span)
  const weight = getCartWeight(); // Get weight from cart[span_48](start_span)[span_48](end_span)
  const baseFee = DELIVERY_CONFIG.baseFee;[span_49](start_span)[span_49](end_span)
  const distanceFee = distance * DELIVERY_CONFIG.perKm;[span_50](start_span)[span_50](end_span)
  const weightFee = weight * DELIVERY_CONFIG.perKg;[span_51](start_span)[span_51](end_span)
  const total = baseFee + distanceFee + weightFee;[span_52](start_span)[span_52](end_span)

  displayDeliveryResult(baseFee, distanceFee, weightFee, total);[span_53](start_span)[span_53](end_span)
}

function calculateDeliveryRegion() {
  const region = document.getElementById('delivery-region').value;[span_54](start_span)[span_54](end_span)
  if (!region) return;[span_55](start_span)[span_55](end_span)

  const cost = REGIONAL_RATES[region];[span_56](start_span)[span_56](end_span)
  const weight = getCartWeight();[span_57](start_span)[span_57](end_span)
  const weightFee = weight * DELIVERY_CONFIG.perKg;[span_58](start_span)[span_58](end_span)
  const total = cost + weightFee;[span_59](start_span)[span_59](end_span)

  document.getElementById('base-fee-display').textContent = 'R' + cost.toFixed(2);[span_60](start_span)[span_60](end_span)
  document.getElementById('distance-fee-display').textContent = 'R0.00';[span_61](start_span)[span_61](end_span)
  document.getElementById('weight-fee-display').textContent = 'R' + weightFee.toFixed(2);[span_62](start_span)[span_62](end_span)
  document.getElementById('total-delivery-display').textContent = 'R' + total.toFixed(2);[span_63](start_span)[span_63](end_span)
  document.getElementById('delivery-result').style.display = 'block';[span_64](start_span)[span_64](end_span)
}

function displayDeliveryResult(base, distance, weight, total) {
  document.getElementById('base-fee-display').textContent = 'R' + base.toFixed(2);[span_65](start_span)[span_65](end_span)
  document.getElementById('distance-fee-display').textContent = 'R' + distance.toFixed(2);[span_66](start_span)[span_66](end_span)
  document.getElementById('weight-fee-display').textContent = 'R' + weight.toFixed(2);[span_67](start_span)[span_67](end_span)
  document.getElementById('total-delivery-display').textContent = 'R' + total.toFixed(2);[span_68](start_span)[span_68](end_span)
  document.getElementById('delivery-result').style.display = 'block';[span_69](start_span)[span_69](end_span)
}

function getCartWeight() {
  // Try to get weight from cart based on your cart implementation[span_70](start_span)[span_70](end_span)
  const cartElement = document.querySelector('.cart-total-weight, #cart-weight, [data-weight]');[span_71](start_span)[span_71](end_span)
  if (cartElement) {
    return parseFloat(cartElement.textContent) || 0;[span_72](start_span)[span_72](end_span)
  }
  return 0; // Default weight if not found[span_73](start_span)[span_73](end_span)
}

// Initialize on page load[span_74](start_span)[span_74](end_span)
document.addEventListener('DOMContentLoaded', initDeliveryCalculator);[span_75](start_span)[span_75](end_span)

