// Valitaan elementit
const burgerButton = document.querySelector("#burger");
const nav = document.querySelector("#nav-container");

// Lisätään tapahtumakuuntelija
burgerButton.addEventListener("click", () => {
    console.log("Burgeria painettu")
    burgerButton.classList.toggle("burger-open");
    nav.classList.toggle("nav-open");
});

// Valitaan kaikki navin linkit
const navLinks = document.querySelectorAll(".nav-link");

// Lisätään jokaiseen linkkiin tapahtumakuuntelija, joka sulkee menun klikatessa
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        burgerButton.classList.remove("burger-open");
        nav.classList.remove("nav-open");
    });
});
