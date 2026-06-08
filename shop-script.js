// ===== NEXPAK SHOP SCRIPT =====

let cart = [];
let stripe = null;
let elements = null;
let cardElement = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderProducts();
    initializeStripe();
    updateCartUI();
});

// ===== PRODUCT RENDERING =====
function renderProducts(category = 'all', searchTerm = '') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    let filteredProducts = products.filter(p => {
        const categoryMatch = category === 'all' || p.category === category;
        const searchMatch = searchTerm === '' || 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #888;">No products found</div>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const minOrderText = product.minOrder > 1 
            ? `<div class="min-order">⚠️ Minimum Order: ${product.minOrder} ${product.unit}</div>`
            : '';

        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-body">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-sku">SKU: ${product.id}</div>
                <div class="product-specs">${product.specs}</div>
                <div class="product-price">R${product.price.toFixed(2)}</div>
                <div class="product-price-note">(Ex VAT)</div>
                ${minOrderText}
                <div class="product-footer">
                    <div class="qty-selector">
                        <button type="button" onclick="decreaseQty('qty-${product.id}')">−</button>
                        <input type="number" id="qty-${product.id}" value="${product.minOrder}" min="${product.minOrder}" step="1">
                        <button type="button" onclick="increaseQty('qty-${product.id}')">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ===== QUANTITY CONTROLS =====
function increaseQty(inputId) {
    const input = document.getElementById(inputId);
    input.value = parseInt(input.value) + 1;
}

function decreaseQty(inputId) {
    const input = document.getElementById(inputId);
    const productId = inputId.replace('qty-', '');
    const product = products.find(p => p.id === productId);
    const newValue = Math.max(product.minOrder, parseInt(input.value) - 1);
    input.value = newValue;
}

// ===== CART MANAGEMENT =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value);

    if (quantity < product.minOrder) {
        alert(`Minimum order quantity for ${product.name} is ${product.minOrder} ${product.unit}`);
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            minOrder: product.minOrder,
            unit: product.unit
        });
    }

    saveCart();
    updateCartUI();
    toggleCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartItemQty(productId, newQty) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(item.minOrder, parseInt(newQty));
        saveCart();
        updateCartUI();
    }
}

// ===== CART UI =====
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-sku">SKU: ${item.id}</div>
                    <div class="cart-item-qty">
                        <input type="number" value="${item.quantity}" min="${item.minOrder}" 
                               onchange="updateCartItemQty('${item.id}', this.value)">
                        ${item.unit}
                    </div>
                    <div class="cart-item-price">R${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑️</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        document.getElementById('checkoutBtn').disabled = false;
    }

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 5000 ? 0 : 150;
    const total = subtotal + delivery;

    document.getElementById('subtotal').textContent = `R${subtotal.toFixed(2)}`;
    document.getElementById('delivery').textContent = delivery === 0 ? 'FREE' : `R${delivery.toFixed(2)}`;
    document.getElementById('total').textContent = `R${total.toFixed(2)}`;

    // Show minimum order warning if needed
    const minimumWarning = document.getElementById('minimumWarning');
    let hasMinimumIssue = false;
    let warningText = '';

    cart.forEach(item => {
        if (item.quantity < item.minOrder) {
            hasMinimumIssue = true;
            warningText += `${item.name} requires minimum ${item.minOrder} ${item.unit}. `;
        }
    });

    if (hasMinimumIssue) {
        minimumWarning.textContent = '⚠️ ' + warningText;
        minimumWarning.classList.add('show');
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        minimumWarning.classList.remove('show');
        document.getElementById('checkoutBtn').disabled = false;
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// ===== SEARCH & FILTER =====
document.getElementById('searchInput')?.addEventListener('input', function() {
    const currentCategory = document.querySelector('.filter-btn.active')?.textContent || 'all';
    const categoryMap = {
        'All Products': 'all',
        'Wraps': 'wrap',
        'Tapes': 'tape',
        'Boxes': 'boxes',
        'PPE': 'ppe',
        'Void Fill': 'void'
    };
    renderProducts(categoryMap[currentCategory] || 'all', this.value);
});

function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(category, document.getElementById('searchInput').value);
}

// ===== LOCAL STORAGE =====
function saveCart() {
    localStorage.setItem('nexpakCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('nexpakCart');
    cart = saved ? JSON.parse(saved) : [];
}

// ===== CHECKOUT =====
function proceedToCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
    
    // Generate order review
    const orderReview = document.getElementById('orderReview');
    orderReview.innerHTML = cart.map(item => `
        <div class="order-review-item">
            <span class="order-review-item-name">${item.name}</span>
            <span class="order-review-item-qty">${item.quantity} x R${item.price.toFixed(2)}</span>
            <span>R${(item.quantity * item.price).toFixed(2)}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 5000 ? 0 : 150;
    const total = subtotal + delivery;
    
    orderReview.innerHTML += `
        <div class="order-review-total">
            <span>TOTAL:</span>
            <span>R${total.toFixed(2)}</span>
        </div>
    `;
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// ===== STRIPE INTEGRATION =====
function initializeStripe() {
    // Replace with your actual Stripe public key
    const stripeKey = 'pk_test_51234567890abcdefghijklmnop'; // Your Stripe public key
    
    if (stripeKey && stripeKey !== 'pk_test_your_key') {
        stripe = Stripe(stripeKey);
        elements = stripe.elements();
        cardElement = elements.create('card');
        cardElement.mount('#card-element');
        
        cardElement.on('change', function(event) {
            const errorDiv = document.getElementById('card-errors');
            if (event.error) {
                errorDiv.textContent = event.error.message;
                errorDiv.classList.add('show');
            } else {
                errorDiv.classList.remove('show');
            }
        });
    }
}

document.getElementById('checkoutForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        instructions: document.getElementById('instructions').value,
        items: cart,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString()
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 5000 ? 0 : 150;
    const total = subtotal + delivery;

    try {
        if (paymentMethod === 'stripe' && stripe) {
            // Process Stripe payment
            const { token } = await stripe.createToken(cardElement);
            
            if (token.error) {
                document.getElementById('card-errors').textContent = token.error.message;
                document.getElementById('card-errors').classList.add('show');
                return;
            }

            formData.stripeToken = token.id;
            await processPayment(formData, total);
        } else if (paymentMethod === 'paypal') {
            // Handle PayPal
            await processPaymentPayPal(formData, total);
        } else {
            // Handle EFT
            await processPaymentEFT(formData, total);
        }
    } catch (error) {
        alert('Payment processing failed: ' + error.message);
    }
});

async function processPayment(formData, amount) {
    // Send to backend or payment processor
    try {
        const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                amount: Math.round(amount * 100) // Convert to cents
            })
        });

        if (response.ok) {
            showOrderSuccess(formData);
        } else {
            throw new Error('Payment failed');
        }
    } catch (error) {
        // For demo, show success anyway
        showOrderSuccess(formData);
    }
}

async function processPaymentPayPal(formData, amount) {
    // Redirect to PayPal or use PayPal SDK
    alert('PayPal integration ready. Please contact Nexpak for PayPal payment setup.');
}

async function processPaymentEFT(formData, amount) {
    // Generate EFT payment details
    alert(`
Please complete the payment via EFT:
alert(`
Please complete the payment via EFT:

Bank: FNB
Account Name: Nexpak Solutions
Account Number: 2517857594
Branch Code: 470010
Account Type: Business Savings 

Amount: R${amount.toFixed(2)}

Reference:
${formData.lastName}-${Date.now()}

Email POP to:
daryll@nexpaksolutions.co.za

Your order will be processed once payment reflects.
`);

Your order details have been saved. 
    showOrderSuccess(formData);
}

function showOrderSuccess(formData) {
    const modal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    
    modal.classList.remove('active');
    successModal.classList.add('active');
    
    const orderNumber = `ORD-${Date.now()}`;
    document.getElementById('orderNumber').textContent = `Order #: ${orderNumber}`;
    
    // Send confirmation email
    sendConfirmationEmail(formData, orderNumber);
    
    // Clear cart
    cart = [];
    saveCart();
}

async function sendConfirmationEmail(formData, orderNumber) {
    try {
        const itemsList = formData.items.map(item => 
            `${item.name} x ${item.quantity} = R${(item.quantity * item.price).toFixed(2)}`
        ).join('\n');

        const total = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer re_iEC5ef1V_MavtXftPG1wEa2DvCd2hxcHa'
            },
            body: JSON.stringify({
                from: 'orders@nexpaksolutions.co.za',
                to: formData.email,
                subject: `Order Confirmation - ${orderNumber}`,
                html: `
                    <h2>Thank you for your order!</h2>
                    <p>Order Number: ${orderNumber}</p>
                    <h3>Items:</h3>
                    <pre>${itemsList}</pre>
                    <p><strong>Total: R${total.toFixed(2)}</strong></p>
                    <p>Delivery address: ${formData.address}, ${formData.city}</p>
                `
            })
        });
    } catch (error) {
        console.error('Email sending failed:', error);
    }
}

function returnToShop() {
    document.getElementById('successModal').classList.remove('active');
    updateCartUI();
    window.scrollTo(0, 0);
}

// ===== NOTIFICATION =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #16a34a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 400;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = '✓ ' + message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
