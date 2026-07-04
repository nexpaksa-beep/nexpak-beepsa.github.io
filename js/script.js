// ======================================
// NEXPAK SOLUTIONS V2
// script.js
// PART 1
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    initializeHeader();

    initializeFadeAnimations();

    initializeCounters();

});


// ======================================
// STICKY HEADER
// ======================================

function initializeHeader(){

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 80){

            header.style.background = "rgba(10,35,66,.96)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

        }else{

            header.style.background = "rgba(10,35,66,.88)";
            header.style.boxShadow = "none";

        }

    });

}


// ======================================
// FADE ANIMATIONS
// ======================================

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

    document.querySelectorAll(".fade").forEach(el=>{

        observer.observe(el);

    });

}


// ======================================
// ANIMATED COUNTERS
// ======================================

function initializeCounters(){

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter=>{

        const target = Number(counter.dataset.target);

        let current = 0;

        const speed = target / 120;

        function update(){

            current += speed;

            if(current < target){

                counter.innerText = Math.floor(current);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target;

            }

        }

        update();

    });

    }
// ======================================
// NEXPAK SOLUTIONS V2
// SCRIPT.JS - PART 2
// Hero Slideshow
// Smooth Scroll
// Scroll To Top
// ======================================

// -----------------------------
// HERO SLIDESHOW
// -----------------------------

const heroImages = [

    "imagez/hero.jpg",
    "imagez/hero2.jpg",
    "imagez/hero3.jpg",
    "imagez/hero4.jpg"

];

let heroIndex = 0;

function initializeHeroSlider(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    setInterval(()=>{

        heroIndex++;

        if(heroIndex >= heroImages.length){

            heroIndex = 0;

        }

        hero.style.opacity = ".85";

        setTimeout(()=>{

            hero.style.backgroundImage =
                `url('${heroImages[heroIndex]}')`;

            hero.style.opacity = "1";

        },500);

    },7000);

}

initializeHeroSlider();


// -----------------------------
// SMOOTH SCROLL
// -----------------------------

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// -----------------------------
// SCROLL TO TOP BUTTON
// -----------------------------

const topButton=document.createElement("button");

topButton.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topButton.className="scroll-top";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// -----------------------------
// PAGE LOAD ANIMATION
// -----------------------------

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});
// ======================================
// NEXPAK SOLUTIONS V2
// SCRIPT.JS - PART 3
// Premium Effects
// ======================================

// -----------------------------
// ACTIVE NAVIGATION
// -----------------------------

window.addEventListener("scroll", () => {

    let current = "";

    document.querySelectorAll("section").forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.classList.remove("active");

        if (current && link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// -----------------------------
// HERO PARALLAX EFFECT
// -----------------------------

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    let offset = window.pageYOffset;

    hero.style.backgroundPositionY = offset * 0.35 + "px";

});


// -----------------------------
// CARD HOVER EFFECT
// -----------------------------

document.querySelectorAll(

".product-card,.why-card,.category-card,.testimonial"

).forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// -----------------------------
// HERO BUTTON PULSE
// -----------------------------

setInterval(() => {

    const btn = document.querySelector(".primary-btn");

    if (!btn) return;

    btn.classList.add("pulse");

    setTimeout(() => {

        btn.classList.remove("pulse");

    }, 1000);

}, 5000);


// -----------------------------
// PRELOAD HERO IMAGES
// -----------------------------

heroImages.forEach(src => {

    const img = new Image();

    img.src = src;

});


// -----------------------------
// CONSOLE MESSAGE
// -----------------------------

console.log(
"%cNEXPAK SOLUTIONS WEBSITE V2",
"color:#D4AF37;font-size:20px;font-weight:bold;"
);

console.log(
"%cIndustrial Packaging | PPE | Advanced Security",
"color:#1D4ED8;font-size:14px;"
);
