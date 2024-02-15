// selecting all the elements
const buttonA = document.querySelector("#filter-code");
const buttonB = document.querySelector("#filter-ui");
const buttonC = document.querySelector("#filter-ux");
const reset = document.querySelector("#filter-reset");

const boxes = Array.from(document.querySelectorAll(".project"));

// in order to map over multiple elements we need to convert HTMLNodelist to Array with Array.from function
const aBoxes = Array.from(document.querySelectorAll(".a"));
const bBoxes = Array.from(document.querySelectorAll(".b"));
const cBoxes = Array.from(document.querySelectorAll(".c"));

// event listener to be triggered after clicking button
buttonA.addEventListener("click", () => {
  console.log("click A");
  console.log(aBoxes);

  // make width of b and c boxes 0 and hide them after 500ms

  const hideBoxes = [...bBoxes, ...cBoxes];

  hideBoxes.map((box) => {
    box.style.width = "0";
  });

  setTimeout(() => {
    hideBoxes.map((box) => {
      box.style.display = "none";
    });
  }, 500);

  // and after that show only A
  aBoxes.map((box) => {
    box.style.display = "block";
  });
});

// event listener to hide all boxes and then show B boxes
buttonB.addEventListener("click", () => {
  console.log("click B");

  // hide everything
  boxes.map((box) => {
    box.style.display = "none";
  });

  // and after that show only B
  bBoxes.map((box) => {
    box.style.display = "block";
  });
});

// event listener to hide all boxes and then show C boxes
buttonC.addEventListener("click", () => {
  console.log("click C");

  boxes.map((box) => {
    box.style.display = "none";
  });

  cBoxes.map((box) => {
    box.style.display = "block";
  });
});

// reset

reset.addEventListener("click", () => {
  boxes.map((box) => {
    // show everything
    box.style.display = "block";
  });
});
