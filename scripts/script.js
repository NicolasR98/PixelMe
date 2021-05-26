/*
==============
Selectors
==============
*/

const whiteboard = document.querySelector(".frame_whiteboard");
const buttons = document.querySelectorAll(".btn");
const currentColor = document.querySelector("#color");

/*
==============
Functions
==============
*/

const getGridSize = (e) => (gridSize = e.target.getAttribute("data-grid-size"));
const makeGrid = (e) => {
  //Clear whiteboard
  whiteboard.innerHTML = "";

  const gridSize = getGridSize(e);
  const squareQty = gridSize * gridSize;

  whiteboard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  whiteboard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  //Create the squares and append them to the whiteboard
  for (let i = 0; i <= squareQty; i++) {
    const square = document.createElement("div");
    square.className = "whiteboard_square";
    whiteboard.append(square);
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", makeGrid);
});

const toolHandling = (e) => {
  let target = e.target;
  if (target.className === "whiteboard_square") {
    target.style.background = currentColor.value;
  }
};
const draw = (e) => {
  whiteboard.addEventListener("mousedown", (e) => {
    whiteboard.addEventListener("mousemove", toolHandling);
  });
};

/*
==============
Events
==============
*/

whiteboard.addEventListener("mousedown", draw);
window.addEventListener("mouseup", (e) => {
  whiteboard.removeEventListener("mousemove", toolHandling);
});

