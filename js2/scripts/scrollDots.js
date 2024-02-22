// Valitaan scroll-dot-container, johon indikaattorit luodaan
const scrollDotContainer = document.querySelector("#scroll-dot-container");

// Valitaan kaikki elementit, joille halutaan omat indikaattorit.
// Tässä tapauksessa valitaan kaikki section-elementit
const sections = document.querySelectorAll("section");

// Muutetaan sections NodeList arrayksi, jotta siihen voidaan käyttää array-metodeja
const sectionsArray = Array.from(sections);

// Luodaan aluksi tyhjä lista, johon indikaattorit lisätään
const scrollDots = [];

// Käydään jokainen section-elementti läpi ja luodaan niille oma indikaattori
sectionsArray.forEach((section) => {
    // Luodaan uusi Linkki-elementti
    const scrollDot = document.createElement("a");

    // Lisätään elementille href-attribuutti, joka viittaa kyseiseen section-elementtiin
    scrollDot.href = "#" + section.id;

    // Lisätään elementille luokka
    scrollDot.classList.add("scroll-dot");

    // Lisätään elementti scrollDotContaineriin
    scrollDotContainer.appendChild(scrollDot);

    // Lisätään vielä elementti scrollDots-listaan
    scrollDots.push(scrollDot);
});

// Tehdään apufunktio isElementInViewportCenter, joka tarkistaa, onko elementti ruudun keskialueella
function isElementInViewportCenter(element) {
    // Määritetään muuttujaan halutun alueen korkeus
    const centerZoneHeight = 100;

    // Etsitään elementin ylä- ja alareuna
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    // Etsitään näytön korkeus
    const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

    // Lasketaan näytön keskialueen ylä- ja alareuna
    const viewportCenterTop = viewportHeight / 2 - centerZoneHeight / 2;
    const viewportCenterBottom = viewportHeight / 2 + centerZoneHeight / 2;

    // Tarkistetaan, onko elementin ylä- ja alareuna näytön keskialueella
    return (
        elementTop < viewportCenterBottom && elementBottom > viewportCenterTop
    );
}

// Lisätään scroll event listener, joka seuraa sivun scrollausta
window.addEventListener("scroll", () => {
    // Käydään jokainen section-elementti läpi
    sectionsArray.forEach((section, index) => {
        // Tarkistetaan, onko kyseinen section-elementti tarpeeksi keskellä näkymää
        if (isElementInViewportCenter(section)) {
            // Jos on, niin lisätään kyseisen sectionin indikaattoriin luokka active
            scrollDots[index].classList.add("active");
        } else {
            // Muuten poistetaan kyseisen sectionin indikaattorista luokka active
            scrollDots[index].classList.remove("active");
        }
    });
});

// TESTAUSTA - voit käyttää omaan testaamiseen 
const testElement = document.querySelector("#modal");

testElement.addEventListener("click", () => {
    const isElementInViewportResult = isElementInViewportCenter(testElement);
    console.log('Aktiivinen: ', isElementInViewportResult);
});
