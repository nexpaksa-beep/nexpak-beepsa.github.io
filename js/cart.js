/* Minimal cart engine compatible with existing site usage */
(function(){
  const STORAGE_KEY = 'nexpak_cart_v1';

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(e){ return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    document.querySelectorAll('.cart-count').forEach(el=>{
      const qty = cart.reduce((s,i)=> s + (i.quantity||0),0);
      el.textContent = qty;
    });
    // update mini-cart display if open
    if(typeof renderCartDrawer === 'function') renderCartDrawer();
  }

  window.getCart = loadCart;

  window.addToCart = function(item) {
    const cart = loadCart();
    const existing = cart.find(i => i.id === item.id && JSON.stringify(i.options) === JSON.stringify(item.options));
    if(existing){
      existing.quantity = (existing.quantity || 0) + (item.quantity || 1);
    } else {
      cart.push(item);
    }
    saveCart(cart);
    showCartNotification('Added to cart');
  };

  window.updateCartItem = function(productId, quantity){
    const cart = loadCart();
    cart.forEach(item=>{
      if(item.id === productId) item.quantity = quantity;
    });
    saveCart(cart);
  };

  window.removeFromCart = function(productId){
    const cart = loadCart().filter(i => i.id !== productId);
    saveCart(cart);
  };

  window.renderCartDrawer = function() {
    let panel = document.querySelector('.cart-panel');
    if(!panel){
      // try to find in shop.html
      panel = document.querySelector('.cart-panel');
    }
    if(!panel) return;
    const container = panel.querySelector('#cartItems');
    const cart = loadCart();
    if(!container) return;
    if(cart.length===0){
      container.innerHTML = '<p>Your cart is empty.</p>';
      const totalEl = panel.querySelector('#cartTotal'); if(totalEl) totalEl.textContent = 'R0.00';
      return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item=>{
      total += (Number(item.price)||0) * (item.quantity||1);
      html += `
        <div class="cart-line">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-line-meta">
            <strong>${item.name}</strong>
            <div class="cart-line-opts">${Object.entries(item.options||{}).map(([k,v])=>`<small>${k}: ${v}</small>`).join('<br>')}</div>
            <div class="qty-controls">
              <button onclick="changeCartQty('${item.id}', -1)">-</button>
              <input type="number" value="${item.quantity}" min="1" onchange="setCartQty('${item.id}', this.value)">
              <button onclick="changeCartQty('${item.id}', 1)">+</button>
            </div>
            <div class="line-price">${formatCurrency((item.price||0))}</div>
            <button class="remove-line" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    const totalEl = panel.querySelector('#cartTotal'); if(totalEl) totalEl.textContent = formatCurrency(total);
  };

  window.changeCartQty = function(id, delta){
    const cart = loadCart();
    cart.forEach(item=>{
      if(item.id === id) item.quantity = Math.max(1, (item.quantity||1) + delta);
    });
    saveCart(cart);
  };
  window.setCartQty = function(id, qty){
    qty = Math.max(1, parseInt(qty)||1);
    const cart = loadCart().map(i=> { if(i.id===id) i.quantity = qty; return i; });
    saveCart(cart);
  };

  function showCartNotification(message){
    const n = document.querySelector('.cart-notification') || (function(){ const div = document.createElement('div'); div.className = 'cart-notification'; div.innerHTML = '<i class="fas fa-check-circle"></i><span></span>'; document.body.appendChild(div); return div; })();
    n.querySelector('span').textContent = message;
    n.classList.add('show');
    setTimeout(()=>n.classList.remove('show'), 2200);
  }

  window.showCartNotification = showCartNotification;

  window.formatCurrency = function(value){
    return 'R' + Number(value).toLocaleString('en-ZA', {minimumFractionDigits:2, maximumFractionDigits:2});
  };

  document.addEventListener('DOMContentLoaded', function(){
    // update cart count on load
    const cart = loadCart();
    document.querySelectorAll('.cart-count').forEach(el=> el.textContent = cart.reduce((s,i)=> s + (i.quantity||0),0));
    if(typeof renderCartDrawer === 'function') renderCartDrawer();
  });

})();
