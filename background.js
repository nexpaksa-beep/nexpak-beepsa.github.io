const images = [
    "hero.jpg",
    "hero2.jpg",
    "hero3.jpg",
    "hero4.jpg"
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
