const tiltCards = document.querySelectorAll(".tilt-card");
const maxTilt = 5; // maksimikallistus asteissa. kokeile eri arvoja!

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const rect = card.getBoundingClientRect();

    // Tämän kanssa saadaan hiiren sijainti kortin päällä
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verrataan sitä keskipisteeseen
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Lasketaan kallistuksen suunta ja kulma etäisyydestä keskipisteeseen
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = ((centerY - y) / centerY) * maxTilt;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });
});
