/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 1/8

INITIALIZATION
GLOBAL VARIABLES
=========================================================*/


/*=========================================================
GLOBAL VARIABLES
=========================================================*/

let products = [];

let filteredProducts = [];

let currentCategory = "all";

let currentSort = "default";

let searchText = "";


/*=========================================================
INITIALIZE SHOP
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

initializeShop();

}

);


/*=========================================================
MAIN INITIALIZER
=========================================================*/

function initializeShop(){

products=[...SHOP_PRODUCTS];

filteredProducts=[...SHOP_PRODUCTS];

renderProducts(filteredProducts);

updateProductCount();

initializeSearch();

initializeSorting();

initializeCategories();

initializeHeaderButtons();
initializeCategories();
 
console.log(

"SHOP V18 INITIALIZED"

);

}


/*=========================================================
UPDATE PRODUCT COUNT
=========================================================*/

function updateProductCount(){

const count=document.getElementById("productCount");

if(!count) return;

count.textContent=

filteredProducts.length+

" Products";

}


/*=========================================================
REFRESH SHOP
=========================================================*/

function refreshShop(){

renderProducts(filteredProducts);

updateProductCount();

}


/*=========================================================
END PART 1
=========================================================*/
/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 2/8

PRODUCT RENDER ENGINE
=========================================================*/


/*=========================================================
RENDER PRODUCTS
=========================================================*/

function renderProducts(productList){

const grid=document.getElementById("productGrid");

if(!grid) return;

grid.innerHTML="";

if(productList.length===0){

grid.innerHTML=`

<div class="no-products">

<i class="fas fa-box-open"></i>

<h2>No Products Found</h2>

<p>Try another search or category.</p>

</div>

`;

return;

}

productList.forEach(product=>{

grid.innerHTML+=createProductCard(product);

});

}


/*=========================================================
CREATE PRODUCT CARD
=========================================================*/

function createProductCard(product){

return `

<div class="product-card">

<div class="product-image"
onclick="quickView(${product.id})">

    <img src="${product.image}" alt="${product.name}">

</div>


${product.discount>0?`

<div class="discount">

-${product.discount}%

</div>

`:''}

<button class="wishlist" onclick="addToWishlist(${product.id})">
    <i class="far fa-heart"></i>
</button>

</div>

<div class="product-content">

<div class="product-brand">

${product.brand}

</div>

<h3 class="product-title">

${product.name}

</h3>

<div class="rating">

★★★★★

</div>

<div class="price">

<span class="current-price">

R${product.price.toLocaleString()}

</span>

${product.oldPrice?`

<span class="old-price">

R${product.oldPrice.toLocaleString()}

</span>

`:''}

</div>

<div class="product-stock">

${product.stock>0

?'<span class="instock">In Stock</span>'

:'<span class="outstock">Out Of Stock</span>'}

</div>

<div class="product-buttons">

<button
class="view-btn"
onclick="viewProduct('${product.page}')">

View

</button>

<button
class="add-cart"
onclick="addToCart(${product.id})">

<i class="fas fa-shopping-cart"></i>

Add

</button>

</div>

</div>

</div>

`;

}


/*=========================================================
VIEW PRODUCT
=========================================================*/

function viewProduct(page){

window.location.href=page;

}


/*=========================================================
END PART 2
=========================================================*/

/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 3/8

CATEGORY FILTER ENGINE
=========================================================*/

function initializeCategories() {

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category = button.dataset.category;

            if (category === "all") {

                filteredProducts = [...products];

            } else {

                filteredProducts = products.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );

            }

            renderProducts(filteredProducts);

            updateProductCount();

        });

    });

       /*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 4/8

WISHLIST ENGINE
=========================================================*/

let wishlist = [];

function addToWishlist(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    const exists = wishlist.find(item => item.id === id);

    if(exists){
        return;
    }

    wishlist.push(product);

    updateWishlist();

}

function removeFromWishlist(id){

    wishlist = wishlist.filter(item => item.id !== id);

    updateWishlist();

}

function updateWishlist(){

    const count = document.getElementById("wishlistCount");

    if(count){

        count.textContent = wishlist.length;

    }

    const panel = document.getElementById("wishlistItems");

    if(!panel) return;

    panel.innerHTML = "";

    if(wishlist.length === 0){

        panel.innerHTML = "<p>Your wishlist is empty.</p>";

        return;

    }

    wishlist.forEach(product=>{

        panel.innerHTML += `
        <div class="wishlist-item">

            <strong>${product.name}</strong>

            <br>

            R${product.price.toFixed(2)}

            <br><br>

            <button onclick="addToCart(${product.id})">

                Add To Cart

            </button>

            <button onclick="removeFromWishlist(${product.id})">

                Remove

            </button>

        </div>
        `;

    });

      /*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 5/8

QUICK VIEW ENGINE
=========================================================*/

function quickView(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    const modal = document.getElementById("quickViewModal");

    if(!modal) return;

    modal.innerHTML = `

    <div class="quick-view-card">

        <button class="close-modal"
        onclick="closeQuickView()">

            <i class="fas fa-times"></i>

        </button>

        <div class="quick-view-image">

            <img src="${product.image}" alt="${product.name}">

        </div>

        <div class="quick-view-content">

            <h2>${product.name}</h2>

            <h4>${product.brand}</h4>

            <p>${product.description || "Professional security equipment."}</p>

            <h3>R${product.price.toFixed(2)}</h3>

            <button
            class="btn"
            onclick="addToCart(${product.id})">

                Add To Cart

            </button>

        </div>

    </div>

    `;

    modal.style.display = "flex";

}

function closeQuickView(){

    const modal = document.getElementById("quickViewModal");

    if(modal){

        modal.style.display = "none";

        modal.innerHTML = "";

    }

}

window.addEventListener("click",(e)=>{

    const modal = document.getElementById("quickViewModal");

    if(e.target === modal){

        closeQuickView();

    }

});                           
}

/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 6/8

CART DRAWER
TOAST NOTIFICATIONS
=========================================================*/

function openCart(){

    const drawer = document.getElementById("cartDrawer");

    if(drawer){

        drawer.classList.add("open");

    }

}

function closeCart(){

    const drawer = document.getElementById("cartDrawer");

    if(drawer){

        drawer.classList.remove("open");

    }

}

document.addEventListener("click",(e)=>{

    if(e.target.closest(".cart-icon")){

        openCart();

    }

    if(e.target.closest(".close-cart")){

        closeCart();

    }

});

function showToast(message){

    const toast = document.getElementById("shopToast");

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

const originalAddToCart = addToCart;

addToCart = function(id){

    originalAddToCart(id);

    showToast("✔ Product added to cart");

};

/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 7/8

RECENTLY VIEWED
RECOMMENDED PRODUCTS
=========================================================*/

let recentlyViewed = [];

function addRecentlyViewed(id){

    const product = products.find(p => p.id === id);
 
    addRecentlyViewed(id);
 
    if(!product) return;

    recentlyViewed = recentlyViewed.filter(item => item.id !== id);

    recentlyViewed.unshift(product);

    if(recentlyViewed.length > 8){

        recentlyViewed.pop();

    }

    renderRecentlyViewed();

}

function renderRecentlyViewed(){

    const container = document.getElementById("recentProducts");

    if(!container) return;

    container.innerHTML = "";

    recentlyViewed.forEach(product=>{

        container.innerHTML += `

        <div class="product-card small">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-content">

                <div class="product-title">

                    ${product.name}

                </div>

                <div class="current-price">

                    R${product.price.toFixed(2)}

                </div>

            </div>

        </div>

        `;

    });

}

function renderRecommendedProducts(){

    const container = document.getElementById("recommendedProducts");

    if(!container) return;

    container.innerHTML = "";

    products.slice(0,8).forEach(product=>{

        container.innerHTML += `

        <div class="product-card small">

            <div class="product-image"
            onclick="quickView(${product.id})">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-content">

                <div class="product-title">

                    ${product.name}

                </div>

                <div class="current-price">

                    R${product.price.toFixed(2)}

                </div>

                <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

     }

/*=========================================================
NEXPAK SECURITY SOLUTIONS
SHOP V18
PART 8/8

FINAL INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    renderRecommendedProducts();

    updateWishlist();

    updateProductCount();

    if(typeof Cart !== "undefined"){

        if(typeof Cart.updateUI === "function"){

            Cart.updateUI();

        }

    }

});


/*=========================================================
MOBILE MENU
=========================================================*/

const mobileButton = document.querySelector(".mobile-menu");

if(mobileButton){

    mobileButton.addEventListener("click",()=>{

        document.body.classList.toggle("menu-open");

    });

}


/*=========================================================
SCROLL TO TOP
=========================================================*/

const scrollButton = document.createElement("button");

scrollButton.className="scroll-top";

scrollButton.innerHTML='<i class="fas fa-arrow-up"></i>';

document.body.appendChild(scrollButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        scrollButton.classList.add("show");

    }else{

        scrollButton.classList.remove("show");

    }

});

scrollButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=========================================================
IMAGE FALLBACK
=========================================================*/

document.addEventListener("error",(e)=>{

    if(e.target.tagName==="IMG"){

        e.target.src="images/no-image.png";

    }

},true);


/*=========================================================
SHOP READY
=========================================================*/

console.log("NEXPAK SHOP V18 LOADED");
