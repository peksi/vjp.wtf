//Valitaan elementti, jossa hiiren liikettä halutaan seurata
const body = document.querySelector("body");

//Valitaan liikuteltavat elementit
const pupilliV = document.querySelector(".pupilliV");
const pupilliO = document.querySelector(".pupilliO");

//Lisätään tapahtumakuuntelija, joka seuraa hiiren liikettä elementissä
body.addEventListener("mousemove", (event) => {
  //event parametri välittää tietoa valitun elementin tapahtumasta

  //Lasketaan näytön korkeus ja leveys
  const wH = window.innerHeight;
  const wW = window.innerWidth;

  //Lasketaan hiiren sijainti näytöllä ja pyöristetään se kokonaisluvuksi
  //event-paramaetristä saadaan hiiren sijainti näytöllä
  const left = Math.round((event.clientX / wW) * 100);
  const top = Math.round((event.clientY / wH) * 100);

  //Asetetaan elementtien sijainti
  pupilliV.style.marginLeft = left + "px";
  pupilliO.style.marginLeft = left + "px";

  pupilliV.style.marginTop = top + "px";
  pupilliO.style.marginTop = top + "px";
});
