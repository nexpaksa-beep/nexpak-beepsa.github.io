/*=========================================================
 NEXPAK SECURITY SOLUTIONS V3
 script.js
 PART 1
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeHeader();

    initializeMobileMenu();

    initializeSmoothScroll();

    initializeFadeAnimations();

});

/*=========================================================
 STICKY HEADER
=========================================================*/

function initializeHeader(){

    const header = document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 80){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/*=========================================================
 MOBILE MENU
=========================================================*/

function initializeMobileMenu(){

    const menuButton = document.querySelector(".menu-toggle");

    const nav = document.querySelector("nav");

    if(!menuButton || !nav) return;

    menuButton.addEventListener("click",()=>{

        nav.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

    document.querySelectorAll("nav a").forEach(link=>{

        link.addEventListener("click",()=>{

            nav.classList.remove("active");

            menuButton.classList.remove("active");

        });

    });

}

/*=========================================================
 SMOOTH SCROLL
=========================================================*/

function initializeSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}

/*=========================================================
 FADE ANIMATIONS
=========================================================*/

function initializeFadeAnimations(){

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    document.querySelectorAll(".fade").forEach(item=>{

        observer.observe(item);

    });

}
/*=========================================================
 HERO IMAGE SLIDER
=========================================================*/

const heroImages = [

"images/hero1.jpg",

"images/hero2.jpg",

"images/hero3.jpg",

"images/hero4.jpg"

];

let currentHero = 0;

function initializeHeroSlider(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    hero.style.backgroundImage =
    `url('${heroImages[currentHero]}')`;

    setInterval(()=>{

        hero.style.opacity=".92";

        setTimeout(()=>{

            currentHero++;

            if(currentHero >= heroImages.length){

                currentHero = 0;

            }

            hero.style.backgroundImage =
            `url('${heroImages[currentHero]}')`;

            hero.style.opacity="1";

        },500);

    },6000);

}

/*=========================================================
 PRELOAD HERO IMAGES
=========================================================*/

function preloadHeroImages(){

    heroImages.forEach(src=>{

        const img = new Image();

        img.src = src;

    });

}

/*=========================================================
 HERO PARALLAX
=========================================================*/

function initializeHeroParallax(){

    const hero=document.querySelector(".hero");

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        const offset=window.pageYOffset;

        hero.style.backgroundPositionY=(offset*0.35)+"px";

    });

}

/*=========================================================
 INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    preloadHeroImages();

    initializeHeroSlider();

    initializeHeroParallax();

});
/*=========================================================
 ANIMATED COUNTERS
=========================================================*/

function initializeCounters(){

    const counters = document.querySelectorAll(".counter");

    if(!counters.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            let current = 0;

            const increment = target / 120;

            function updateCounter(){

                current += increment;

                if(current < target){

                    counter.textContent = Math.floor(current);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.textContent = target.toLocaleString();

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    },{

        threshold:0.5

    });

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

/*=========================================================
 ACTIVE NAVIGATION
=========================================================*/

function initializeActiveNavigation(){

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let currentSection="";

        sections.forEach(section=>{

            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if(window.scrollY >= sectionTop &&
               window.scrollY < sectionTop + sectionHeight){

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + currentSection){

                link.classList.add("active");

            }

        });

    });

}

/*=========================================================
 SCROLL TO TOP
=========================================================*/

function initializeScrollTop(){

    const button=document.createElement("button");

    button.className="scroll-top";

    button.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*=========================================================
 INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeCounters();

    initializeActiveNavigation();

    initializeScrollTop();

});
/*=========================================================
 NEXPAK SECURITY SOLUTIONS V3
 SCRIPT.JS - PART 4
 Premium Effects
=========================================================*/

/*=========================================================
 HERO BUTTON PULSE
=========================================================*/

function initializeButtonPulse(){

    const button=document.querySelector(".primary-btn");

    if(!button) return;

    setInterval(()=>{

        button.classList.add("pulse");

        setTimeout(()=>{

            button.classList.remove("pulse");

        },1000);

    },5000);

}

/*=========================================================
 CARD HOVER EFFECT
=========================================================*/

function initializeCardEffects(){

    const cards=document.querySelectorAll(

        ".service-card,.product-card,.why-card,.industry-card,.testimonial-card"

    );

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-10px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

}

/*=========================================================
 PAGE LOAD
=========================================================*/

function initializePageLoad(){

    document.body.classList.add("loaded");

}

/*=========================================================
 RESIZE HANDLER
=========================================================*/

window.addEventListener("resize",()=>{

    const nav=document.querySelector("nav");

    if(window.innerWidth>992 && nav){

        nav.classList.remove("active");

    }

});

/*=========================================================
 INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeButtonPulse();

    initializeCardEffects();

});

window.addEventListener("load",()=>{

    initializePageLoad();

});

/*=========================================================
 CONSOLE MESSAGE
=========================================================*/

console.clear();

console.log(

"%cNEXPAK SECURITY SOLUTIONS V3",

"color:#00B4FF;font-size:22px;font-weight:bold;"

);

console.log(

"%cCCTV | Alarm Systems | Electric Fencing | Access Control | AI Surveillance",

"color:#38BDF8;font-size:14px;"

);

console.log(

"%cWebsite developed for Nexpak Security Solutions",

"color:#94A3B8;font-size:12px;"

);
