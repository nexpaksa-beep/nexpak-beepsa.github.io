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

