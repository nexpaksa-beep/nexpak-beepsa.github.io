// ==========================================
// EQUESTRIAN PAGE DELIVERY CALCULATOR
// ==========================================
// Add this to your equestrian.html page

const EQUESTRIAN_DELIVERY = {
    // Warehouse location
    warehouse: 'Benoni, Gauteng',
    // Regional rates
    regions: {
        gauteng: { name: 'Gauteng', baseRate: 200, perKm: 3.50 },
        durban: { name: 'Durban', baseRate: 650, perKm: 4.00 },
        capetown: { name: 'Cape Town', baseRate: 800, perKm: 4.50 },
        nelson: { name: 'Nelson Mandela Bay', baseRate: 750, perKm: 4.50 },
        other: { name: 'Other Areas', baseRate: 500, perKm: 5.00 }
    },
    // Product weights (kg) add more as needed
    productWeights: {
        'polytape': 0.5,
        'polytape-200m': 2.5,
        'polytape-500m': 6.0,
        'rope': 0.8,
        'rope-200m': 3.0,
        'insulator': 0.05,
        'energizer': 2.0,
        'solar-energizer': 3.5,
        'gate-handle': 0.3,
        'gate-latch': 0.5,
        'gate-hinge': 0.4,
        'gate-hardware-kit': 2.5,
        'tape-connector': 0.1,
        'strainers': 0.8,
        'posts': 1.5,
        'wire': 0.1
    }
};

function initEquestrianDeliveryCalculator() {
    createEquestrianCalculatorUI();
    addEquestrianStyles();
    setupEquestrianCalculatorEvents();
}

function createEquestrianCalculatorUI() {
    const calculatorHTML = `
        <div id="equestrian-delivery-calc" class="eq-delivery-section">
            <h3>Delivery Calculator</h3>
            <p class="eq-calc-subtitle">Calculate delivery costs for equestrian fencing products</p>
            <div class="eq-calc-grid">
                <!-- Region Selection -->
                <div class="eq-calc-group">
                    <label>Select Your Region:</label>
                    <select id="eq-region-select" class="eq-calc-select" onchange="calculateEquestrianDelivery()">
                        <option value="">-- Select Region --</option>
                        <option value="gauteng">Gauteng From R200</option>
                        <option value="durban">Durban From R650</option>
                        <option value="capetown">Cape Town From R800</option>
                        <option value="nelson">Nelson Mandela Bay From R750</option>
                        <option value="other">Other Areas From R500</option>
                    </select>
                </div>
                <!-- Address Input -->
                <div class="eq-calc-group">
                    <label>Or Enter Address for Exact Quote:</label>
                    <div class="eq-address-input">
                        <input type="text" id="eq-delivery-address" placeholder="e.g., 45 Horse Street, Randburg">
                        <button onclick="calculateEqByAddress()" class="eq-calc-button">
                            Get Quote
                        </button>
                    </div>
                </div>
                <!-- Cart Weight Display -->
                <div class="eq-calc-group">
                    <label>Estimated Cart Weight:</label>
                    <div class="eq-weight-display">
                        <span id="eq-cart-weight">0</span> kg
                    </div>
                </div>
            </div>
            <!-- Results -->
            <div id="eq-delivery-results" class="eq-results" style="display:none;">
                <h4>Delivery Quote</h4>
                <div class="eq-result-details">
                    <div class="eq-result-row">
                        <span>Base Delivery Fee:</span>
                        <span id="eq-base-fee">R0.00</span>
                    </div>
                    <div class="eq-result-row">
                        <span>Weight Adjustment:</span>
                        <span id="eq-weight-fee">R0.00</span>
                    </div>
                    <div class="eq-result-row">
                        <span>Distance Surcharge:</span>
                        <span id="eq-distance-fee">R0.00</span>
                    </div>
                    <div class="eq-result-row total">
                        <span>Total Delivery:</span>
                        <span id="eq-total-delivery">R0.00</span>
                    </div>
                </div>
                <p class="eq-vat-note">* Includes VAT</p>
            </div>
            <!-- Delivery Info -->
            <div class="eq-delivery-info">
                <h4>Delivery Information</h4>
                <ul>
                    <li>Delivery within 3-5 business days</li>
                    <li>Door-to-door delivery service</li>
                    <li>Delivery from Benoni warehouse</li>
                    <li>PayFast payment available</li>
                </ul>
            </div>
        </div>
    `;

    // Insert into page adjust selector based on your page
    const container = document.querySelector('.delivery-section, #delivery, #delivery-calculator');
    if (container) {
        container.innerHTML = calculatorHTML;
    }
}

function addEquestrianStyles() {
    const styles = `
        .eq-delivery-section {
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid #e5e5e5;
        }
        .eq-delivery-section h3 {
            color: #1a5f2a;
            margin-bottom: 5px;
        }
        .eq-calc-subtitle {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .eq-calc-grid {
            display: grid;
            gap: 20px;
        }
        .eq-calc-group label {
            display: block;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .eq-calc-group select,
        .eq-calc-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
        }
        .eq-address-input {
            display: flex;
            gap: 10px;
        }
        .eq-address-input input {
            flex: 1;
        }
        .eq-calc-button {
            background: #1a5f2a;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            white-space: nowrap;
            transition: background 0.2s;
        }
        .eq-calc-button:hover {
            background: #2d8b3f;
        }
        .eq-weight-display {
            background: #f5f5f5;
            padding: 12px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            color: #1a5f2a;
        }
        .eq-results {
            background: #f0f7f0;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            border: 2px solid #1a5f2a;
        }
        .eq-results h4 {
            color: #1a5f2a;
            margin-bottom: 15px;
        }
        .eq-result-details {
            background: white;
            padding: 15px;
            border-radius: 8px;
        }
        .eq-result-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .eq-result-row.total {
            font-size: 20px;
            font-weight: bold;
            color: #1a5f2a;
            border-bottom: none;
            padding-top: 15px;
        }
        .eq-vat-note {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
            text-align: right;
        }
        .eq-delivery-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
        }
        .eq-delivery-info h4 {
            color: #333;
            margin-bottom: 12px;
        }
        .eq-delivery-info ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .eq-delivery-info li {
            padding: 8px 0;
            color: #555;
            font-size: 14px;
        }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
}

function setupEquestrianCalculatorEvents() {
    // Update cart weight when cart changes
    document.addEventListener('cartUpdated', updateEquestrianCartWeight);
    // Initial weight calculation
    updateEquestrianCartWeight();
}

function updateEquestrianCartWeight() {
    let totalWeight = 0;
    // Get cart items and calculate weight
    const cartItems = document.querySelectorAll('.cart-item, .product-item, [data-product-id]');
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity, [data-quantity]')?.textContent || 1);
        const productId = item.dataset.productId || item.dataset.productName?.toLowerCase().replace(/\s+/g, '-');
        
        // Get weight from product data or use default 0.5
        let weight = EQUESTRIAN_DELIVERY.productWeights[productId] || 0.5;
        totalWeight += weight * quantity;
    });

    // Also check for manually added weight in cart display
    const weightEl = document.querySelector('.cart-weight, #cart-weight');
    if (weightEl && parseFloat(weightEl.textContent) > 0) {
        totalWeight = parseFloat(weightEl.textContent);
    }

    const weightDisplay = document.getElementById('eq-cart-weight');
    if (weightDisplay) {
        weightDisplay.textContent = totalWeight.toFixed(1);
    }

    return totalWeight;
}

function calculateEquestrianDelivery() {
    const region = document.getElementById('eq-region-select').value;
    if (!region) return;

    const regionData = EQUESTRIAN_DELIVERY.regions[region];
    const weight = updateEquestrianCartWeight();

    const weightFee = weight * 8; // R8 per kg
    const baseFee = regionData.baseRate;
    const distanceSurcharge = weight > 10 ? (weight - 10) * 5 : 0;
    const total = baseFee + weightFee + distanceSurcharge;

    displayEquestrianResults(baseFee, weightFee, distanceSurcharge, total);
}

function displayEquestrianResults(base, weightFee, distanceFee, total) {
    document.getElementById('eq-base-fee').textContent = 'R' + base.toFixed(2);
    document.getElementById('eq-weight-fee').textContent = 'R' + weightFee.toFixed(2);
    document.getElementById('eq-distance-fee').textContent = 'R' + distanceFee.toFixed(2);
    document.getElementById('eq-total-delivery').textContent = 'R' + total.toFixed(2);
    document.getElementById('eq-delivery-results').style.display = 'block';
}

async function calculateEqByAddress() {
    const address = document.getElementById('eq-delivery-address').value;
    if (!address) {
        alert('Please enter your delivery address');
        return;
    }

    // For now, use regional calculation as fallback
    // In production, integrate with Google Maps API
    alert('Address-based calculation requires Google Maps API setup. Please select a region for now, or contact us for a custom quote.');
}

// Initialize
document.addEventListener('DOMContentLoaded', initEquestrianDeliveryCalculator);

