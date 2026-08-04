/* Updated product.js with magnifier init. Original logic preserved. */

// =========================================================
// NEXPAK SECURITY SOLUTIONS V15
// product.js
// PART 1/4
//
// PRODUCT PAGE CONTROLLER
// =========================================================


document.addEventListener(

"DOMContentLoaded",

initializeProductPage

);




// =========================================================
// GLOBAL VARIABLES
// =========================================================


let pageProduct = null;





// =========================================================
// INITIALIZE PRODUCT PAGE
// =========================================================


function initializeProductPage(){

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if(!productId){
    console.error("No product ID found.");
    showProductError();
    return;
  }

  pageProduct = findProduct(productId);

  if(!pageProduct){
    console.error("Product not found:", productId);
    showProductError();
    return;
  }

  loadProductData();
  updatePageSEO();
  createProductBreadcrumb();
}


// =========================================================
// FIND PRODUCT
// =========================================================

function findProduct(id){
  if(typeof products === "undefined"){ console.error("shop-data.js not loaded."); return null; }
  return products.find(product => product.id === id);
}


// =========================================================
// LOAD BASIC PRODUCT DATA
// =========================================================

function loadProductData(){
  const title = document.querySelector(".product-title");
  const description = document.querySelector(".product-description");
  const image = document.querySelector(".product-image");

  if(title) title.textContent = pageProduct.name;
  if(description) description.textContent = pageProduct.description;
  if(image){ image.src = pageProduct.image || (pageProduct.images && pageProduct.images[0]) || '../images/products/default.jpg'; image.alt = pageProduct.name; }
}


// =========================================================
// PRODUCT ERROR
// =========================================================

function showProductError(){
  const container = document.querySelector(".product-container");
  if(container){
    container.innerHTML = `
      <div class="product-error">
        <h2>Product Not Found</h2>
        <p>Please return to our shop and select a security solution.</p>
        <a href="../shop.html">Back To Shop</a>
      </div>
    `;
  }
}

console.log("%cNEXPAK PRODUCT.JS V15 PART 1 READY","color:#00B4FF;font-size:18px;font-weight:bold;");

// =========================================================
// PART 2: SEO, Breadcrumbs, Category, Badges
// =========================================================

function updatePageSEO(){
  if(!pageProduct) return;
  document.title = pageProduct.name + " | Nexpak Security Solutions";
  const metaDescription = document.querySelector('meta[name="description"]');
  if(metaDescription){ metaDescription.setAttribute("content", pageProduct.description + " Professional security solutions from Nexpak Security Solutions."); }
  const canonical = document.querySelector('link[rel="canonical"]'); if(canonical) canonical.href = window.location.href;
}

function createProductBreadcrumb(){
  const breadcrumb = document.querySelector(".breadcrumb");
  if(!breadcrumb || !pageProduct) return;
  breadcrumb.innerHTML = `
    <a href="../index.html">Home</a>
    <span>/</span>
    <a href="../shop.html">Shop</a>
    <span>/</span>
    <span>${pageProduct.category}</span>
    <span>/</span>
    <strong>${pageProduct.name}</strong>
  `;
}

function loadCategoryData(){ const categoryBox = document.querySelector(".product-category"); if(!categoryBox || !pageProduct) return; categoryBox.textContent = pageProduct.category; }

function createProductBadge(){ const badgeContainer = document.querySelector(".product-badges"); if(!badgeContainer || !pageProduct) return; let badge = "Security Solution"; switch(pageProduct.category){case "CCTV": badge = "📹 CCTV Security"; break; case "Electric Fencing": badge = "⚡ Electric Fence"; break; case "Gate Automation": badge = "🚪 Gate Security"; break; case "Alarm Systems": badge = "🚨 Alarm Protection"; break; case "Outdoor Security": badge = "🛡️ Perimeter Security"; break; case "Access Control": badge = "🔐 Access Control"; break;}
  badgeContainer.innerHTML = `<span class="product-badge">${badge}</span>`;
}

function loadProductFeatures(){ const featureList = document.querySelector(".product-features"); if(!featureList || !pageProduct) return; featureList.innerHTML = ""; let features = []; if(pageProduct.options) features.push("Custom configuration available"); if(pageProduct.extras) features.push("Additional accessories available"); features.push("Professional security equipment"); features.forEach(feature=>{ featureList.innerHTML += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`; }); }

// =========================================================
// PART 3: IMAGE GALLERY, RELATED PRODUCTS
// =========================================================

function createProductGallery(){
  const gallery = document.querySelector(".product-gallery");
  if(!gallery || !pageProduct) return;
  let images = [];
  if(pageProduct.image) images.push(pageProduct.image);
  if(pageProduct.images && Array.isArray(pageProduct.images)) images = images.concat(pageProduct.images);
  if(images.length === 0) images.push('../images/products/default.jpg');

  gallery.innerHTML = '';
  // main image wrapper
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'main-image';
  mainWrapper.style.position = 'relative';
  const mainImg = document.createElement('img');
  mainImg.className = 'product-image';
  mainImg.src = images[0];
  mainImg.alt = pageProduct.name;
  mainWrapper.appendChild(mainImg);
  gallery.appendChild(mainWrapper);

  if(images.length > 1){
    const thumbs = document.createElement('div'); thumbs.className = 'image-thumbnails';
    images.slice(0,4).forEach(img => {
      const t = document.createElement('img'); t.className='thumbnail'; t.src = img; t.alt = pageProduct.name; t.loading='lazy'; t.addEventListener('mouseenter', ()=> changeProductImage(img)); t.addEventListener('click', ()=> changeProductImage(img)); thumbs.appendChild(t);
    });
    gallery.appendChild(thumbs);
  }
}

function loadProductRelated(){
  const container = document.getElementById("related-products"); if(!container || !pageProduct) return; container.innerHTML = "";
  const related = products.filter(p => p.category === pageProduct.category && p.id !== pageProduct.id).slice(0,4);
  if(related.length === 0){ container.innerHTML = '<p>No related products available.</p>'; return; }
  related.forEach(product=>{ container.innerHTML += `
    <div class="related-product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description.substring(0,100)}...</p>
      <a href="product.html?id=${product.id}">View Product</a>
    </div>
  `; });
}

function loadCategoryProducts(){ const categoryLinks = document.querySelectorAll('.category-link'); categoryLinks.forEach(link=>{ link.addEventListener('click', ()=>{ window.location = "../shop.html?category=" + encodeURIComponent(pageProduct.category); }); }); }

function shareProduct(){ if(!pageProduct) return; const shareData = { title: pageProduct.name, text: pageProduct.description, url: window.location.href }; if(navigator.share){ navigator.share(shareData); } else { navigator.clipboard.writeText(window.location.href); alert('Product link copied.'); } }

function printProduct(){ window.print(); }

// =========================================================
// PART 4: CONFIGURATION, CART SYNC
// =========================================================

function checkConfigurator(){ if(typeof createConfigurationSelectors !== "function"){ console.warn("Configurator engine not loaded."); return false; } return true; }

function initializeConfiguration(){ if(!pageProduct) return; if(checkConfigurator()){ console.log("Configurator connected:", pageProduct.name); } }

function validateCartAccess(){ if(typeof addConfiguredProduct !== "function"){ alert("Configuration system is loading. Please wait."); return false; } return true; }

function safeAddToCart(){ if(!validateCartAccess()) return; addConfiguredProduct(); }

function getProductURL(){ return window.location.origin + window.location.pathname + "?id=" + pageProduct.id; }

function updateSocialMeta(){ if(!pageProduct) return; const ogTitle = document.querySelector('meta[property="og:title"]'); const ogDescription = document.querySelector('meta[property="og:description"]'); const ogImage = document.querySelector('meta[property="og:image"]'); if(ogTitle) ogTitle.content = pageProduct.name; if(ogDescription) ogDescription.content = pageProduct.description; if(ogImage) ogImage.content = pageProduct.image || (pageProduct.images && pageProduct.images[0]) || ogImage.content; }

function enableLazyLoading(){ document.querySelectorAll('img').forEach(image=>{ image.loading = 'lazy'; }); }

// Magnifier implementation
function createMagnifier(){
  const img = document.querySelector('.product-gallery .product-image');
  if(!img) return;
  // ensure parent is positioned
  const parent = img.parentElement; parent.style.position = parent.style.position || 'relative';
  let lens = parent.querySelector('.img-zoom-lens');
  if(!lens){ lens = document.createElement('div'); lens.className = 'img-zoom-lens'; parent.appendChild(lens); }
  const cx = 2.5;
  img.addEventListener('mousemove', moveLens);
  img.addEventListener('mouseenter', ()=> lens.style.display = 'block');
  img.addEventListener('mouseleave', ()=> lens.style.display = 'none');
  function moveLens(e){
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lensW = lens.offsetWidth || 150; const lensH = lens.offsetHeight || 150;
    let left = Math.max(0, Math.min(rect.width - lensW, x - lensW/2));
    let top = Math.max(0, Math.min(rect.height - lensH, y - lensH/2));
    lens.style.left = left + 'px'; lens.style.top = top + 'px';
    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundSize = `${img.width * cx}px ${img.height * cx}px`;
    lens.style.backgroundPosition = `${- (x * cx - lensW/2)}px ${- (y * cx - lensH/2)}px`;
  }
}

// finalize product page with enhancements
function finalizeProductPage(){
  if(!pageProduct) return;
  updateSocialMeta();
  enableLazyLoading();
  initializeConfiguration();
  if(typeof renderCartDrawer === 'function') renderCartDrawer();
  // init gallery + magnifier
  createProductGallery();
  setTimeout(()=>{ createMagnifier(); }, 300);
  if(typeof updateCartCounter === "function"){ updateCartCounter(); }
  console.log("Product page ready:", pageProduct.name);
}

// Start engine

document.addEventListener("DOMContentLoaded", ()=>{ setTimeout(()=>{ finalizeProductPage(); },800); });

console.log("%cNEXPAK PRODUCT.JS V15 COMPLETE","color:#00B4FF;font-size:18px;font-weight:bold;");
