//Valitaan kaikki modaali-napit ja modaali-ikkunat
const modalButtons = document.querySelectorAll(".modal-button");
const modals = document.querySelectorAll(".modal");

//Muutetaan modals-nodelist arrayksi, koska nodelist ei tue kaikkia array-metodeja, kuten find-metodia
const modalsArray = Array.from(modals);

//Valitaan modaali-container, johon modaali ilmestyy
const modalContainer = document.querySelector("#modal-container");

//Lisätään tapahtumankuuntelija jokaiselle modaali-napille forEach loopilla
modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        //HTML:ssä kullekkin modaali-napille on annettu kustom data-modal-attribuutti, joka kertoo, mikä modaali-ikkuna avataan
        const modalNumber = button.dataset.modal;

        //Etsitään oikea modaali-ikkuna modaali-ikkunoiden listasta
        const modal = modalsArray.find(
            //Etsitään modaali-ikkuna, jonka data-modal-attribuutti on sama kuin modaali-napin data-modal-attribuutti
            (modal) => modal.dataset.modal === modalNumber
        );

        //Näytetään modaali-ikkuna ja modaali-container
        modal.style.display = "block";
        modalContainer.style.display = "flex";
    });
});

//Valitaan kaikki modaali-ikkunoiden sulkemisnapit
const closeButtons = document.querySelectorAll(".modal-close");

//Lisätään tapahtumankuuntelija jokaiselle sulkemisnapille
closeButtons.forEach((button) => {
    button.addEventListener("click", () => {

        //Piilotetaan nappulat parent element eli modaali-ikkunan
        button.parentElement.style.display = "none";

        //Piilotetaan myös modaali-container
        modalContainer.style.display = "none";
    });
})