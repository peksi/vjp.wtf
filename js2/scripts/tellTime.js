// Valitaan tervahdysnappula, tervahdyskenttä ja ajastinpalkki
const tellTimeButton = document.querySelector("#tell-time-button");
const tellTimeField = document.querySelector("#time-container");
const progressBar = document.querySelector("#bar");


// Tehdään muuttuja tervehdyksen ajalle
const timer = 10000; // 10000ms = 10s


// Lisataan tapahtumakuuntelija napulle
tellTimeButton.addEventListener("click", function () {
    //Jotta nappulaa ei voi painaa uudestaan ennen kuin tervehdys on valmis
    tellTimeButton.disabled = true;

    // Haetaan nykyinen aika ja muutetaan se stringiksi
    const currentTime = new Date();
    const timeString = currentTime.toLocaleDateString();

    // Luodaan tekstikappale ja asetetaan aika siihen
    const timeText = document.createElement("p");
    timeText.textContent = `Hei, tänään on: ${timeString}`

    // Lisataan tekstikappale tervahdyskenttään
    tellTimeField.appendChild(timeText);

    // Lisätään ajastipalkille luokka "active"
    progressBar.classList.add("active");

    // Asetetaan ajastin, joka poistaa tekstin ja luokan "active" ajastinpalkilta sekä palautta nappulan käytettäväksi
    setTimeout(function () {
        tellTimeField.removeChild(timeText);
        progressBar.classList.remove("active");
        tellTimeButton.disabled = false;
    }, timer);
});
