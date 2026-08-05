/* ==========================================================================
   Nexpak Security Solutions - Kit Configurator & Live Pricing (configurator.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. CONFIGURATION STATE
    // ----------------------------------------------------------------------
    const state = {
        category: 'electric-fencing',
        categoryTitle: 'Electric Fencing Kits',
        baseKit: { id: 'ef-kit-6line-50m', name: 'Standard 6-Line Kit', price: 4850.00 },
        selections: {},  // Single choice items e.g., { brand: { name: 'Nemtek', price: 0 } }
        quantities: {}   // Multi quantity items e.g., { 'stays-600': { name: '600mm Stays', price: 85, qty: 4 } }
    };

    // ----------------------------------------------------------------------
    // 2. PRODUCT SCHEMA (The options to render based on category)
    // ----------------------------------------------------------------------
    const categorySchemas = {
        'electric-fencing': [
            { type: 'select', title: 'Brand', id: 'brand', options: [ { label: 'Nemtek', price: 0 }, { label: 'JVA', price: 0 } ] },
            { type: 'select', title: 'Bracket Lines', id: 'bracket-lines', options: [ { label: '6 Line', price: 0 }, { label: '8 Line', price: 250 }, { label: '10 Line', price: 400 }, { label: '12 Line', price: 550 } ] },
            { type: 'select', title: 'Bracket Colour', id: 'bracket-color', options: [ { label: 'Black', price: 0 }, { label: 'White', price: 0 }, { label: 'Galvanised', price: -50 } ] },
            { type: 'select', title: 'Bar Type', id: 'bar-type', options: [ { label: 'Flat Bar (6 Line)', price: 0 }, { label: 'Round Bar (6 Line)', price: 20 }, { label: 'Square Tube', price: 45 } ] },
            { type: 'stepper', title: 'Stays (Black/White/Galv)', id: 'stays', price: 95.00 },
            { type: 'stepper', title: 'Nail-in Anchors (100pk)', id: 'anchors', price: 120.00 },
            { type: 'select', title: 'Wire Roll', id: 'wire', options: [ { label: 'Stainless 1.2mm (545m)', price: 850 }, { label: 'Braided Alum 1.6mm (1000m)', price: 1200 }, { label: 'Galvanised 1.2mm (680m)', price: 600 } ] },
            { type: 'select', title: 'Energizer', id: 'energizer', options: [ { label: '1 Joule', price: 0 }, { label: '4 Joule', price: 1200 }, { label: '8 Joule', price: 2500 } ] },
            { type: 'select', title: 'Installation', id: 'installation', options: [ { label: 'DIY (No Install)', price: 0 }, { label: 'Professional Install', price: 2500 } ] }
        ],
        'cctv-hd': [
            { type: 'select', title: 'Brand', id: 'cctv-brand', options: [ { label: 'Dahua', price: 0 }, { label: 'Hikvision', price: 0 } ] },
            { type: 'select', title: 'DVR Channels', id: 'dvr-ch', options: [ { label: '8 Ch', price: 0 }, { label: '16 Ch', price: 1500 }, { label: '32 Ch', price: 3500 } ] },
            { type: 'select', title: 'Hard Drive', id: 'hdd', options: [ { label: '1TB', price: 950 }, { label: '2TB', price: 1400 }, { label: '4TB', price: 2200 } ] },
            { type: 'stepper', title: 'Bullet 30m IR Cameras', id: 'cam-bullet', price: 450.00 },
            { type: 'stepper', title: 'Dome 20m IR Cameras', id: 'cam-dome', price: 400.00 },
            { type: 'stepper', title: 'Video Baluns (Pairs)', id: 'baluns', price: 65.00 },
            { type: 'select', title: 'Cable Roll (100m)', id: 'cctv-cable', options: [ { label: 'RG59 Coax', price: 450 }, { label: 'Cat5e', price: 600 } ] }
        ],
        'gate-motors': [
            { type: 'select', title: 'Motor Model', id: 'motor-model', options: [ { label: 'Centurion D5 Evo', price: 0 }, { label: 'D5 Smart', price: 1200 }, { label: 'D10 Turbo Smart', price: 4500 } ] },
            { type: 'stepper', title: 'Steel Rack (2m)', id: 'rack-steel', price: 280.00 },
            { type: 'stepper', title: 'Nylon Rack (2m)', id: 'rack-nylon', price: 250.00 },
            { type: 'select', title: 'Anti-Theft Bracket', id: 'anti-theft', options: [ { label: 'None', price: 0 }, { label: 'Heavy Duty Bracket', price: 550 } ] },
            { type: 'stepper', title: '4-Button Remotes', id: 'remotes', price: 220.00 }
        ]
        // You can easily expand this array format for Roboguard, Ajax, etc.
    };

    // ----------------------------------------------------------------------
    // 3. UI GENERATOR
    // ----------------------------------------------------------------------
    const configuratorContainer = document.getElementById('configuratorSelectors');
    const categoryTabs = document.querySelectorAll('.nav-tab');

    function renderConfigurator(categoryKey) {
        if (!configuratorContainer) return;
        configuratorContainer.innerHTML = ''; // Clear loading/old config
        state.selections = {};
        state.quantities = {};

        const schema = categorySchemas[categoryKey] || categorySchemas['electric-fencing'];

        schema.forEach(field => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'selector-group';
            
            let html = `<h4>${field.title}</h4>`;

            if (field.type === 'select') {
                html += `<div class="pill-group">`;
                field.options.forEach((opt, index) => {
                    // Auto-select first option
                    const isActive = index === 0 ? 'active' : '';
                    if (isActive) {
                        state.selections[field.id] = { name: opt.label, price: opt.price };
                    }
                    
                    const priceTag = opt.price > 0 ? ` (+R${opt.price})` : '';
                    html += `<button type="button" class="selector-pill ${isActive}" data-group="${field.id}" data-label="${opt.label}" data-price="${opt.price}">
                                ${opt.label} <span class="price-mod">${priceTag}</span>
                             </button>`;
                });
                html += `</div>`;
            } 
            else if (field.type === 'stepper') {
                html += `
                <div class="stepper-control">
                    <span class="stepper-label">${field.title} (R${field.price} ea)</span>
                    <div class="stepper-actions">
                        <button type="button" class="btn-step minus" data-id="${field.id}">-</button>
                        <input type="number" class="step-input" id="qty-${field.id}" value="0" readonly>
                        <button type="button" class="btn-step plus" data-id="${field.id}" data-title="${field.title}" data-price="${field.price}">+</button>
                    </div>
                </div>`;
            }

            groupDiv.innerHTML = html;
            configuratorContainer.appendChild(groupDiv);
        });

        attachConfiguratorEvents();
        updateSummary();
    }

    // ----------------------------------------------------------------------
    // 4. EVENT LISTENERS
    // ----------------------------------------------------------------------
    function attachConfiguratorEvents() {
        // Option Pills (Single Select)
        document.querySelectorAll('.selector-pill').forEach(btn => {
            btn.addEventListener('click', function() {
                const group = this.dataset.group;
                
                // Remove active from siblings
                document.querySelectorAll(`.selector-pill[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
                
                // Set active to clicked
                this.classList.add('active');
                
                // Update state
                state.selections[group] = {
                    name: this.dataset.label,
                    price: parseFloat(this.dataset.price)
                };
                
                updateSummary();
            });
        });

        // Stepper Buttons (+ / -)
        document.querySelectorAll('.btn-step.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const price = parseFloat(this.dataset.price);
                const title = this.dataset.title;
                const input = document.getElementById(`qty-${id}`);
                
                let currentVal = parseInt(input.value);
                input.value = currentVal + 1;
                
                state.quantities[id] = { name: title, price: price, qty: input.value };
                updateSummary();
            });
        });

        document.querySelectorAll('.btn-step.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const input = document.getElementById(`qty-${id}`);
                
                let currentVal = parseInt(input.value);
                if (currentVal > 0) {
                    input.value = currentVal - 1;
                    if (input.value == 0) {
                        delete state.quantities[id];
                    } else {
                        state.quantities[id].qty = input.value;
                    }
                    updateSummary();
                }
            });
        });
    }

    // Base Kit Selection
    document.querySelectorAll('.btn-select-kit').forEach(btn => {
        btn.addEventListener('click', function() {
            // Reset others
            document.querySelectorAll('.kit-card').forEach(card => {
                card.classList.remove('selected');
                card.querySelector('.btn-select-kit').innerText = 'Select Kit';
                card.querySelector('.btn-select-kit').classList.remove('active');
            });

            // Set active
            const card = this.closest('.kit-card');
            card.classList.add('selected');
            this.innerText = 'Selected';
            this.classList.add('active');

            // Update state
            const rawPrice = card.querySelector('.kit-price').innerText.replace(/[^0-9.]/g, '');
            state.baseKit = {
                id: card.dataset.kitId,
                name: card.querySelector('h4').innerText,
                price: parseFloat(rawPrice)
            };
            
            updateSummary();
        });
    });

    // Category Navigation
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // UI Toggle
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update State
            state.category = this.dataset.category;
            state.categoryTitle = this.innerText.trim();
            
            document.getElementById('currentCategoryTitle').innerText = state.categoryTitle;
            
            // Re-render UI
            renderConfigurator(state.category);
        });
    });

    // ----------------------------------------------------------------------
    // 5. PRICING & SUMMARY CALCULATION
    // ----------------------------------------------------------------------
    function updateSummary() {
        let subtotal = state.baseKit.price || 0;
        let addonCount = 0;

        // Add selection prices
        Object.values(state.selections).forEach(sel => {
            subtotal += sel.price;
            if (sel.price > 0) addonCount++;
        });

        // Add quantity prices
        Object.values(state.quantities).forEach(item => {
            subtotal += (item.price * item.qty);
            addonCount += parseInt(item.qty);
        });

        const vat = subtotal * 0.15;
        const grandTotal = subtotal + vat;

        // Update DOM Elements
        document.getElementById('summaryCategory').innerText = state.categoryTitle;
        document.getElementById('summaryBaseKit').innerText = state.baseKit.name;
        document.getElementById('summaryAddonCount').innerText = `${addonCount} items configured`;
        
        document.getElementById('summarySubtotal').innerText = `R ${subtotal.toFixed(2)}`;
        document.getElementById('summaryVat').innerText = `R ${vat.toFixed(2)}`;
        document.getElementById('summaryGrandTotal').innerText = `R ${grandTotal.toFixed(2)}`;
    }

    // ----------------------------------------------------------------------
    // 6. ADD TO CART FUNCTIONALITY
    // ----------------------------------------------------------------------
    const btnAddToCart = document.getElementById('btnAddToCart');
    if (btnAddToCart) {
        btnAddToCart.addEventListener('click', () => {
            const finalKit = {
                id: `CUSTOM-${Date.now()}`,
                category: state.category,
                baseKit: state.baseKit,
                selections: state.selections,
                quantities: state.quantities,
                totalExclVat: parseFloat(document.getElementById('summarySubtotal').innerText.replace(/[^\d.]/g, '')),
                totalInclVat: parseFloat(document.getElementById('summaryGrandTotal').innerText.replace(/[^\d.]/g, ''))
            };

            // Retrieve existing cart or create new array
            let cart = JSON.parse(localStorage.getItem('nexpak_cart')) || [];
            cart.push(finalKit);
            
            // Save to LocalStorage
            localStorage.setItem('nexpak_cart', JSON.stringify(cart));

            // Update UI Cart Badge
            const badge = document.getElementById('cartCountBadge');
            if(badge) badge.innerText = cart.length;

            // Trigger Notification Toast (handled in UI.js or Cart.js, but we can trigger explicitly here)
            const toast = document.getElementById('toastContainer');
            if (toast) {
                toast.innerHTML = `<div class="cart-notification show"><i class="fa-solid fa-check"></i> Kit added to cart successfully!</div>`;
                setTimeout(() => toast.innerHTML = '', 3000);
            }
        });
    }

    // Initialize first load
    renderConfigurator('electric-fencing');
});
                                                                             
