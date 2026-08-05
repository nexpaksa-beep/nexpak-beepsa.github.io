const images = [
    "images/hero.png",
    "images/hero2.png"
];

document.addEventListener("DOMContentLoaded", () => {

    const bg1 = document.querySelector(".hero-bg1");
    const bg2 = document.querySelector(".hero-bg2");

    let current = 0;
    let showingFirst = true;

    bg1.style.backgroundImage = `url('${images[0]}')`;
    bg2.style.backgroundImage = `url('${images[1]}')`;

    setInterval(() => {

        current = (current + 1) % images.length;
        const next = (current + 1) % images.length;

        if (showingFirst) {

            bg2.style.backgroundImage = `url('${images[next]}')`;
            bg2.style.opacity = "1";
            bg1.style.opacity = "0";

        } else {

            bg1.style.backgroundImage = `url('${images[next]}')`;
            bg1.style.opacity = "1";
            bg2.style.opacity = "0";

        }

        showingFirst = !showingFirst;

    }, 5000);

});
