// Karuselli

const carousel = document.querySelector(".carousel");
const track = carousel.querySelector(".carousel-track");
const slides = track.querySelectorAll(".carousel-slide");
const prevButton = carousel.querySelector(".carousel-arrow--prev");
const nextButton = carousel.querySelector(".carousel-arrow--next");
const dotsContainer = carousel.querySelector(".carousel-dots");

let currentIndex = 0;
let autoplayInterval = null;
const autoplayDelay = 4000; // ms

// Luo indikaattoripisteet dynaamisesti
slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(i);
        resetAutoplay();
    });
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".carousel-dot");

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
}

function prevSlide() {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
}

// Nuolinappulat
nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
});

prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
});

// Autoplay
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

startAutoplay();
