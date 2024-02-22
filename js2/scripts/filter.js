// Valitaan filtteröinnin napit
const buttonA = document.querySelector("#filter-code");
const buttonB = document.querySelector("#filter-ui");
const buttonC = document.querySelector("#filter-ux");
const reset = document.querySelector("#filter-reset");


// Valitaan eri kategorioihin kuuluvat projektilaatikot. 
// Koska querySelectorAll palauttaa HTMLNodelistin, muutetaan se Arrayksi Array.from-funktiolla, jotta voidaan käyttää map-metodia.
const aBoxes = Array.from(document.querySelectorAll(".project-wrapper .a"));
const bBoxes = Array.from(document.querySelectorAll(".project-wrapper .b"));
const cBoxes = Array.from(document.querySelectorAll(".project-wrapper .c"));

// Yhdistetään kaikki projektilaatikko arrayt yhteen arrayhin
const allBoxes = [...aBoxes, ...bBoxes, ...cBoxes];

// Lisää ylläolevasta syntaksista: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment



// Lisätään tapahtumakuuntelija jokaiselle napille:

// Nappi A:lle
buttonA.addEventListener("click", () => {
  // Annetaan nappulalle luokka active, jotta käyttäjä näkee, mikä nappi on valittuna...
  buttonA.classList.add("active");
  // ... ja poistetaan se muilta napeilta
  buttonB.classList.remove("active");
  buttonC.classList.remove("active");

  // Mäpätään a laatikot näkyviin muokkaamalla suoraan tyylejä 
  // saman voisi tehdä myös lisäämällä ja poistamalla luokkia
  aBoxes.map((box) => {
    box.style.display = "flex";
    box.style.opacity = "1";
  });

  // Yhteitetään piilotettavat laatikot yhteen arrayhin, ...
  const hideBoxes = [...bBoxes, ...cBoxes];

  // ... ja piilotetaan ne
  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});

// Nappi B:lle
buttonB.addEventListener("click", () => {
  buttonB.classList.add("active");
  buttonA.classList.remove("active");
  buttonC.classList.remove("active");

  bBoxes.map((box) => {
    box.style.display = "flex";
    box.style.opacity = "1";
  });

  const hideBoxes = [...aBoxes, ...cBoxes];

  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});


// Nappi C:lle
buttonC.addEventListener("click", () => {
  buttonC.classList.add("active");
  buttonA.classList.remove("active");
  buttonB.classList.remove("active");

  cBoxes.map((box) => {
    box.style.display = "flex";
  });

  const hideBoxes = [...aBoxes, ...bBoxes];

  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});


// Lisätään reset-napille tapahtumakuuntelija
reset.addEventListener("click", () => {
  // Poistetaan kaikilta napeilta luokka active
  buttonA.classList.remove("active");
  buttonB.classList.remove("active");
  buttonC.classList.remove("active");
  
  allBoxes.map((box) => {
    // Asetetaan kaikki laatikot näkyviin ja palautetaan niiden opacity alkuperäiseksi
    box.style.display = "flex";
  });
});
