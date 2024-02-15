// selecting all the elements
const buttonA = document.querySelector("#filter-code");
const buttonB = document.querySelector("#filter-ui");
const buttonC = document.querySelector("#filter-ux");
const reset = document.querySelector("#filter-reset");

const boxes = Array.from(document.querySelectorAll(".project"));

// in order to map over multiple elements we need to convert HTMLNodelist to Array with Array.from function
const aBoxes = Array.from(document.querySelectorAll(".project-wrapper .a"));
const bBoxes = Array.from(document.querySelectorAll(".project-wrapper .b"));
const cBoxes = Array.from(document.querySelectorAll(".project-wrapper .c"));
const allBoxes = [...aBoxes, ...bBoxes, ...cBoxes];

// event listener to be triggered after clicking button
buttonA.addEventListener("click", () => {
  allBoxes.map((box) => {
    box.style.display = "block";
    box.style.opacity = "1";
  });

  // make width of b and c boxes 0 and hide them after 500ms

  const hideBoxes = [...bBoxes, ...cBoxes];

  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});

// event listener to hide all boxes and then show B boxes
buttonB.addEventListener("click", () => {
  allBoxes.map((box) => {
    box.style.display = "block";
    box.style.opacity = "1";
  });

  // make width of a and c boxes 0 and hide them after 500ms

  const hideBoxes = [...aBoxes, ...cBoxes];

  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});

// event listener to hide all boxes and then show C boxes
buttonC.addEventListener("click", () => {
  allBoxes.map((box) => {
    box.style.display = "block";
    box.style.opacity = "1";
  });

  // make width of a and b boxes 0 and hide them after 500ms

  const hideBoxes = [...aBoxes, ...bBoxes];

  hideBoxes.map((box) => {
    box.style.display = "none";
  });
});

// reset

reset.addEventListener("click", () => {
  boxes.map((box) => {
    // show everything
    box.style.display = "block";
  });
});
