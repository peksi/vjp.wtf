// Valitaan elementit

const burgerButton = document.querySelector("#burger");
const nav = document.querySelector("#nav-container");

// Lisätään tapahtumakuuntelija

burgerButton.addEventListener("click", () => {
    console.log("Burgeria painettu")
    burgerButton.classList.toggle("burger-open");
    nav.classList.toggle("nav-open");
});
