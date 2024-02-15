const body = document.querySelector("body");
const pupilliV = document.querySelector(".pupilliV");
const pupilliO = document.querySelector(".pupilliO");

body.addEventListener("mousemove", (event) => {
  const wH = window.innerHeight;
  const wW = window.innerWidth;

  const left = Math.round((event.clientX / wW) * 100);
  const top = Math.round((event.clientY / wH) * 100);

  pupilliV.style.marginLeft = left + "px";
  pupilliO.style.marginLeft = left + "px";

  pupilliV.style.marginTop = top + "px";
  pupilliO.style.marginTop = top + "px";
});
