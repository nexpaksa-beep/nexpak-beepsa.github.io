/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5
 script.js
 PART 1/5
 Core Website Engine
=========================================================*/


/*=========================================================
 MAIN INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{


    initializeHeader();

    initializeMobileMenu();

    initializeSmoothScroll();

    initializePageLoad();


});



/*=========================================================
 STICKY HEADER
=========================================================*/


function initializeHeader(){


    const header=document.querySelector("header");


    if(!header) return;



    function updateHeader(){


        if(window.scrollY > 80){


            header.classList.add("scrolled");


        }else{


            header.classList.remove("scrolled");


        }


    }



    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();


}





/*=========================================================
 MOBILE MENU
=========================================================*/


function initializeMobileMenu(){


    const menuButton=
    document.querySelector(".menu-toggle");


    const nav=
    document.querySelector("nav");



    if(!menuButton || !nav) return;



    menuButton.addEventListener(
        "click",
        ()=>{


            nav.classList.toggle("active");


            menuButton.classList.toggle("active");


        }
    );



    document.querySelectorAll("nav a")
    .forEach(link=>{


        link.addEventListener(
            "click",
            ()=>{


                nav.classList.remove("active");


                menuButton.classList.remove("active");


            }
        );


    });



    document.addEventListener(
        "click",
        (event)=>{


            if(
                !nav.contains(event.target)
                &&
                !menuButton.contains(event.target)
            ){


                nav.classList.remove("active");


                menuButton.classList.remove("active");


            }


        }
    );


}






/*=========================================================
 SMOOTH SCROLL
=========================================================*/


function initializeSmoothScroll(){


    document
    .querySelectorAll('a[href^="#"]')
    .forEach(link=>{


        link.addEventListener(
            "click",
            function(event){


                const target=
                document.querySelector(
                    this.getAttribute("href")
                );


                if(!target) return;



                event.preventDefault();



                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });


            }
        );


    });


}






/*=========================================================
 PAGE LOAD ANIMATION
=========================================================*/


function initializePageLoad(){


    window.addEventListener(
        "load",
        ()=>{


            document.body.classList.add(
                "loaded"
            );


        }
    );


}





/*=========================================================
 WINDOW RESIZE HANDLER
=========================================================*/


window.addEventListener(
"resize",
()=>{


    const nav=
    document.querySelector("nav");



    if(
        window.innerWidth > 992
        &&
        nav
    ){


        nav.classList.remove("active");


    }


});
/*=========================================================
 HERO SLIDER SYSTEM
=========================================================*/


const heroImages=[

"images/hero1.jpg",

"images/hero2.jpg",

"images/hero3.jpg",

"images/hero4.jpg"

];


let currentHero=0;



/*=========================================================
 INITIALIZE HERO SLIDER
=========================================================*/


function initializeHeroSlider(){


    const hero=
    document.querySelector(".hero");



    if(!hero) return;



    hero.style.backgroundImage=
    `url("${heroImages[currentHero]}")`;



    setInterval(()=>{


        hero.classList.add("changing");



        setTimeout(()=>{


            currentHero++;



            if(currentHero >= heroImages.length){


                currentHero=0;


            }



            hero.style.backgroundImage=
            `url("${heroImages[currentHero]}")`;



            hero.classList.remove("changing");



        },700);



    },6000);


}







/*=========================================================
 PRELOAD HERO IMAGES
=========================================================*/


function preloadHeroImages(){


    heroImages.forEach(image=>{


        const img=
        new Image();



        img.src=image;


    });


}







/*=========================================================
 HERO PARALLAX EFFECT
=========================================================*/


function initializeHeroParallax(){


    const hero=
    document.querySelector(".hero");



    if(!hero) return;



    window.addEventListener(
        "scroll",
        ()=>{


            const offset=
            window.pageYOffset;



            if(offset < window.innerHeight){


                hero.style.backgroundPositionY=
                `${offset * 0.35}px`;


            }


        }
    );


}






/*=========================================================
 ADD TO MAIN LOADER
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    preloadHeroImages();


    initializeHeroSlider();


    initializeHeroParallax();


});
/*=========================================================
 SCROLL FADE ANIMATIONS
=========================================================*/


function initializeFadeAnimations(){


    const elements =
    document.querySelectorAll(".fade");



    if(!elements.length) return;



    const observer =
    new IntersectionObserver(
        (entries)=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.classList.add(
                        "show"
                    );


                    observer.unobserve(
                        entry.target
                    );


                }


            });


        },
        {

            threshold:0.15

        }
    );



    elements.forEach(element=>{


        observer.observe(element);


    });


}






/*=========================================================
 ANIMATED NUMBER COUNTERS
=========================================================*/


function initializeCounters(){


    const counters =
    document.querySelectorAll(".counter");



    if(!counters.length) return;



    const observer =
    new IntersectionObserver(
        (entries)=>{


            entries.forEach(entry=>{


                if(!entry.isIntersecting)
                return;



                const counter =
                entry.target;



                const target =
                parseInt(
                    counter.dataset.target
                );



                if(isNaN(target))
                return;



                let current=0;



                const speed =
                target / 80;



                function update(){


                    current += speed;



                    if(current < target){


                        counter.innerHTML =
                        Math.floor(current)
                        .toLocaleString();



                        requestAnimationFrame(
                            update
                        );


                    }else{


                        counter.innerHTML =
                        target.toLocaleString()
                        + "+";


                    }


                }



                update();



                observer.unobserve(
                    counter
                );


            });


        },
        {

            threshold:.5

        }
    );



    counters.forEach(counter=>{


        observer.observe(counter);


    });


}







/*=========================================================
 ACTIVE NAVIGATION TRACKING
=========================================================*/


function initializeActiveNavigation(){


    const sections =
    document.querySelectorAll(
        "section[id]"
    );



    const links =
    document.querySelectorAll(
        "nav a"
    );



    if(!sections.length || !links.length)
    return;



    window.addEventListener(
        "scroll",
        ()=>{


            let current="";



            sections.forEach(section=>{


                const sectionTop =
                section.offsetTop - 180;



                const height =
                section.offsetHeight;



                if(
                    window.scrollY >= sectionTop
                    &&
                    window.scrollY <
                    sectionTop + height
                ){


                    current =
                    section.id;


                }


            });



            links.forEach(link=>{


                link.classList.remove(
                    "active"
                );



                if(
                    link.getAttribute("href")
                    === "#" + current
                ){


                    link.classList.add(
                        "active"
                    );


                }


            });


        }
    );


}







/*=========================================================
 INITIALIZE PART 3
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeFadeAnimations();


    initializeCounters();


    initializeActiveNavigation();


});
/*=========================================================
 NEXPAK V5 ECOMMERCE FUNCTIONS
 PART 4/5
=========================================================*/


/*=========================================================
 CART COUNT UPDATE
=========================================================*/


function updateCartCount(){


    const cartCount =
    document.querySelector(".cart-count");



    if(!cartCount) return;



    let cart =
    JSON.parse(
        localStorage.getItem("nexpakCart")
    )
    || [];



    let total = 0;



    cart.forEach(item=>{


        total += item.quantity;


    });



    cartCount.textContent =
    total;



}






/*=========================================================
 ADD TO CART BUTTONS
=========================================================*/


function initializeCartButtons(){


    const buttons =
    document.querySelectorAll(
        ".add-cart"
    );



    if(!buttons.length)
    return;



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const product =
                {

                    id:
                    button.dataset.id,


                    name:
                    button.dataset.name,


                    price:
                    Number(
                        button.dataset.price
                    ),


                    image:
                    button.dataset.image,


                    quantity:1

                };



                let cart =
                JSON.parse(
                    localStorage.getItem(
                        "nexpakCart"
                    )
                )
                ||
                [];



                const existing =
                cart.find(
                    item =>
                    item.id === product.id
                );



                if(existing){


                    existing.quantity++;


                }
                else{


                    cart.push(product);


                }



                localStorage.setItem(

                    "nexpakCart",

                    JSON.stringify(cart)

                );



                updateCartCount();



                showCartMessage(
                    product.name
                );


            }
        );


    });


}






/*=========================================================
 CART NOTIFICATION
=========================================================*/


function showCartMessage(product){


    const message =
    document.createElement(
        "div"
    );



    message.className =
    "cart-message";



    message.innerHTML = `

    <i class="fa-solid fa-check"></i>

    ${product} added to cart

    `;



    document.body.appendChild(
        message
    );



    setTimeout(()=>{


        message.classList.add(
            "show"
        );


    },50);



    setTimeout(()=>{


        message.remove();


    },3000);


}






/*=========================================================
 WISHLIST SYSTEM
=========================================================*/


function initializeWishlist(){


    const wishlistButtons =
    document.querySelectorAll(
        ".wishlist-btn"
    );



    wishlistButtons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                button.classList.toggle(
                    "saved"
                );



                button.innerHTML =
                button.classList.contains(
                    "saved"
                )

                ?

                '<i class="fa-solid fa-heart"></i>'

                :

                '<i class="fa-regular fa-heart"></i>';



            }
        );


    });


}






/*=========================================================
 PRODUCT QUICK VIEW
=========================================================*/


function initializeQuickView(){


    const buttons =
    document.querySelectorAll(
        ".quick-view"
    );



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                alert(
                    "Product preview coming soon"
                );


            }
        );


    });


}







/*=========================================================
 INITIALIZE PART 4
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    updateCartCount();


    initializeCartButtons();


    initializeWishlist();


    initializeQuickView();


});
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5
 PREMIUM EFFECTS
 PART 5/5
=========================================================*/



/*=========================================================
 BUTTON GLOW EFFECT
=========================================================*/


function initializeButtonEffects(){


    const buttons =
    document.querySelectorAll(
        ".primary-btn,.shop-btn"
    );



    buttons.forEach(button=>{


        button.addEventListener(
            "mouseenter",
            ()=>{


                button.classList.add(
                    "glow"
                );


            }
        );



        button.addEventListener(
            "mouseleave",
            ()=>{


                button.classList.remove(
                    "glow"
                );


            }
        );


    });


}







/*=========================================================
 CARD TILT EFFECT
=========================================================*/


function initializeCardTilt(){


    const cards =
    document.querySelectorAll(
        ".product-card,"
        +
        ".service-card,"
        +
        ".why-card,"
        +
        ".industry-card"
    );



    cards.forEach(card=>{


        card.addEventListener(
            "mousemove",
            (event)=>{


                const rect =
                card.getBoundingClientRect();



                const x =
                event.clientX - rect.left;



                const y =
                event.clientY - rect.top;



                const centerX =
                rect.width / 2;



                const centerY =
                rect.height / 2;



                const rotateX =
                ((y-centerY)/centerY)
                * -5;



                const rotateY =
                ((x-centerX)/centerX)
                * 5;



                card.style.transform =
                `perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)`;



            }
        );



        card.addEventListener(
            "mouseleave",
            ()=>{


                card.style.transform="";


            }
        );


    });


}







/*=========================================================
 SCROLL TO TOP BUTTON
=========================================================*/


function initializeScrollTop(){


    const button =
    document.createElement(
        "button"
    );



    button.className =
    "scroll-top";



    button.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';



    document.body.appendChild(
        button
    );



    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 600){


                button.classList.add(
                    "show"
                );


            }
            else{


                button.classList.remove(
                    "show"
                );


            }


        }
    );



    button.addEventListener(
        "click",
        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }
    );


}






/*=========================================================
 LAZY LOAD IMAGES
=========================================================*/


function initializeLazyLoading(){


    const images =
    document.querySelectorAll(
        "img"
    );



    images.forEach(image=>{


        image.setAttribute(
            "loading",
            "lazy"
        );


    });


}






/*=========================================================
 SECURITY WEBSITE CONSOLE
=========================================================*/


function initializeConsole(){


    console.clear();



    console.log(
        "%cNEXPAK SECURITY SOLUTIONS V5",
        "color:#00B4FF;font-size:22px;font-weight:bold;"
    );



    console.log(
        "%cCCTV | Alarms | Electric Fencing | Access Control",
        "color:#38BDF8;font-size:14px;"
    );



}







/*=========================================================
 FINAL WEBSITE STARTUP
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeButtonEffects();


    initializeCardTilt();


    initializeScrollTop();


    initializeLazyLoading();


    initializeConsole();


});
