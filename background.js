const images = [
    "images/hero.png",
    "images/hero2.png",
    "images/hero3.png",
    "images/hero4.png",
    "images/hero5.png"
];

let index = 0;

function startBackgroundSlider() {

    document.body.style.backgroundImage = `url('${images[0]}')`;

    setInterval(() => {

        index = (index + 1) % images.length;
        document.body.style.backgroundImage = `url('${images[index]}')`;

    }, 5000);
}

document.addEventListener("DOMContentLoaded", startBackgroundSlider);
