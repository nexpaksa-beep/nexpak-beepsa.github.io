/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5
 CART SYSTEM
 cart.js
 PART 1/4
=========================================================*/


//=========================================================
// CART STORAGE
//=========================================================


let cart = JSON.parse(localStorage.getItem("nexpakCart")) || [];




//=========================================================
// SAVE CART
//=========================================================


function saveCart(){

    localStorage.setItem(
        "nexpakCart",
        JSON.stringify(cart)
    );

}



//=========================================================
// ADD PRODUCT TO CART
//=========================================================


function addToCart(product){


    const existingProduct = cart.find(item =>

        item.id === product.id &&
        JSON.stringify(item.options) === JSON.stringify(product.options)

    );



    if(existingProduct){


        existingProduct.quantity += product.quantity || 1;


    }else{


        cart.push({

            id: product.id,

            name: product.name,

            image: product.image,

            price: Number(product.price),

            options: product.options || {},

            quantity: product.quantity || 1

        });


    }



    saveCart();


    updateCartCount();


    showCartMessage(product.name);



}






//=========================================================
// QUICK PRODUCT BUTTON
//=========================================================


document.addEventListener(
"click",
function(e){


    if(e.target.classList.contains("add-cart")){


        const button = e.target;



        const product = {


            id:
            button.dataset.id,


            name:
            button.dataset.name,


            price:
            button.dataset.price,


            image:
            button.dataset.image,


            quantity:1,


            options:{}



        };



        addToCart(product);


    }



});






//=========================================================
// CART COUNT
//=========================================================


function updateCartCount(){


    const count =
    document.querySelector(".cart-count");



    if(!count) return;



    let total = 0;



    cart.forEach(item=>{


        total += item.quantity;


    });



    count.innerHTML = total;



}





//=========================================================
// CART MESSAGE
//=========================================================


function showCartMessage(name){


    const message =
    document.createElement("div");



    message.className =
    "cart-message";



    message.innerHTML = `

    <i class="fas fa-check"></i>

    ${name} added to cart

    `;



    document.body.appendChild(message);



    setTimeout(()=>{


        message.remove();


    },3000);



}




// INITIAL LOAD

document.addEventListener(
"DOMContentLoaded",
()=>{

    updateCartCount();

});
/*=========================================================
 CART DISPLAY
 PART 2/4
=========================================================*/



//=========================================================
// DISPLAY CART ITEMS
//=========================================================


function displayCart(){


    const cartContainer =
    document.querySelector(".cart-items");



    if(!cartContainer) return;



    cartContainer.innerHTML = "";



    if(cart.length === 0){


        cartContainer.innerHTML = `

        <div class="empty-cart">

        <i class="fas fa-cart-shopping"></i>

        <h3>Your cart is empty</h3>

        <p>Add security products to continue.</p>

        </div>

        `;


        updateCartTotal();

        return;


    }




    cart.forEach((item,index)=>{



        let optionsHTML = "";



        if(item.options){


            Object.keys(item.options).forEach(option=>{


                optionsHTML += `

                <p>

                <strong>${option}:</strong>
                ${item.options[option]}

                </p>

                `;


            });


        }




        cartContainer.innerHTML += `


        <div class="cart-product glass">


            <img src="${item.image}"
            alt="${item.name}">


            <div class="cart-details">


                <h3>
                ${item.name}
                </h3>


                <div class="cart-options">

                ${optionsHTML}

                </div>



                <p class="cart-price">

                R${(
                item.price *
                item.quantity
                ).toLocaleString()}

                </p>



                <div class="quantity-control">


                    <button onclick="changeQuantity(${index},-1)">
                    -
                    </button>


                    <span>
                    ${item.quantity}
                    </span>


                    <button onclick="changeQuantity(${index},1)">
                    +
                    </button>



                </div>



                <button 
                class="remove-cart"
                onclick="removeCartItem(${index})">


                <i class="fas fa-trash"></i>

                Remove


                </button>



            </div>



        </div>


        `;



    });




    updateCartTotal();



}





//=========================================================
// CHANGE QUANTITY
//=========================================================


function changeQuantity(index,amount){



    cart[index].quantity += amount;



    if(cart[index].quantity <= 0){


        cart[index].quantity = 1;


    }



    saveCart();



    displayCart();



    updateCartCount();



}






//=========================================================
// REMOVE ITEM
//=========================================================


function removeCartItem(index){



    cart.splice(index,1);



    saveCart();



    displayCart();



    updateCartCount();



}







//=========================================================
// CART TOTAL
//=========================================================


function updateCartTotal(){



    const totalElement =
    document.querySelector(".cart-total");



    if(!totalElement) return;



    let total = 0;



    cart.forEach(item=>{


        total +=
        item.price *
        item.quantity;


    });




    totalElement.innerHTML =

    `R${total.toLocaleString()}`;



}






//=========================================================
// LOAD CART PAGE
//=========================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    displayCart();



});
/*=========================================================
 PRODUCT CONFIGURATOR
 PART 3/4
=========================================================*/


//=========================================================
// GET SELECTED OPTIONS
//=========================================================


function getProductOptions(container){


    let options = {};



    const selectors =
    container.querySelectorAll("select");



    selectors.forEach(select=>{


        if(select.value){


            options[select.dataset.option] =
            select.value;


        }


    });



    return options;



}





//=========================================================
// CALCULATE OPTION PRICE
//=========================================================


function calculateOptionPrice(container){


    let extraPrice = 0;



    const selectors =
    container.querySelectorAll("select");



    selectors.forEach(select=>{


        const selected =
        select.options[
        select.selectedIndex
        ];



        if(selected.dataset.price){


            extraPrice +=
            Number(selected.dataset.price);



        }


    });



    return extraPrice;



}







//=========================================================
// CONFIGURED PRODUCT ADD TO CART
//=========================================================


function addConfiguredProduct(button){



    const productBox =
    button.closest(".product-config");



    if(!productBox) return;




    const basePrice =
    Number(productBox.dataset.price);




    const optionPrice =
    calculateOptionPrice(productBox);




    const product = {



        id:
        productBox.dataset.id,



        name:
        productBox.dataset.name,



        image:
        productBox.dataset.image,



        price:
        basePrice + optionPrice,



        quantity:
        Number(
        productBox.querySelector(".product-qty").value
        )
        || 1,



        options:
        getProductOptions(productBox)



    };



    addToCart(product);



}






//=========================================================
// CONFIGURATION BUTTON LISTENER
//=========================================================


document.addEventListener(
"click",
function(e){



    if(
    e.target.classList.contains(
    "configure-cart")
    ){


        addConfiguredProduct(
        e.target
        );


    }



});
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5
 CART SYSTEM
 PART 4/4
=========================================================*/


//=========================================================
// GENERATE ORDER NUMBER
//=========================================================

function generateOrderNumber(){

    const date = new Date();

    return "NXP-" +
    date.getFullYear() +
    (date.getMonth()+1) +
    date.getDate() +
    "-" +
    Math.floor(
        Math.random()*9000 + 1000
    );

}





//=========================================================
// WHATSAPP ORDER
//=========================================================


function sendWhatsAppOrder(){


    if(cart.length === 0){

        alert(
        "Your cart is empty."
        );

        return;

    }



    let message =

    `Nexpak Security Solutions\n\n` +

    `Order Reference: ${generateOrderNumber()}\n\n` +

    `Customer Enquiry:\n`;




    let total = 0;



    cart.forEach(item=>{


        message +=

        `\n--------------------\n` +

        `${item.name}\n` +

        `Quantity: ${item.quantity}\n`;



        if(item.options){


            message += "Options:\n";


            Object.keys(item.options)
            .forEach(option=>{


                message +=

                `${option}: ${item.options[option]}\n`;


            });


        }



        message +=

        `Price: R${

        (
        item.price *
        item.quantity

        )
        .toLocaleString()

        }\n`;



        total +=

        item.price *
        item.quantity;



    });



    message +=

    `\n--------------------\n` +

    `Estimated Total: R${

    total.toLocaleString()

    }\n\n` +

    `Please contact me regarding this quotation.`;




    const whatsappURL =

    "https://wa.me/27836308249?text=" +

    encodeURIComponent(message);



    window.open(
    whatsappURL,
    "_blank"
    );


}





//=========================================================
// CLEAR CART
//=========================================================


function clearCart(){


    if(confirm(
    "Remove all items from cart?"
    )){


        cart = [];


        saveCart();


        displayCart();


        updateCartCount();



    }


}







//=========================================================
// CHECKOUT BUTTON
//=========================================================


document.addEventListener(
"click",
function(e){



    if(
    e.target.classList.contains(
    "whatsapp-checkout"
    )
    ){


        sendWhatsAppOrder();


    }





    if(
    e.target.classList.contains(
    "clear-cart"
    )
    ){


        clearCart();


    }



});







//=========================================================
// CART STARTUP
//=========================================================


window.addEventListener(
"load",
()=>{


    updateCartCount();

    displayCart();


});
