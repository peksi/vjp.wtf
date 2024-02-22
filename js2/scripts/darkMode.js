// Valitaa nappula, joka vaihtaa sivuston värityksen
const darkModeButton = document.querySelector("#dark-mode-button");

// Jos nappulaa painetaan, vaihdetaan sivuston väri
darkModeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      darkModeButton.classList.toggle("active");
});