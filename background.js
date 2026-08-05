const images = [
    "hero.png",
    "hero2.png",
    "hero3.png",
    "hero4.png",
    "hero5.png"
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
