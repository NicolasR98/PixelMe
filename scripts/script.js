/*
==============
Selectors
==============
*/

const whiteboard = document.querySelector(".frame_whiteboard");
const gridButtons = document.querySelectorAll(".btn_grid");
const gapButton = document.querySelector(".btn_gap");
const toolButtons = document.querySelectorAll(".btn_tool");
const currentColor = document.querySelector("#color");

/*
==============
Global Variables
==============
*/
let currentTool = "pencil";

/*
==============
Functions
==============
*/

//============== Grid Functions ==============
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

const toggleGap = () => whiteboard.classList.toggle("gap");

//============== Tools Functions ==============
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomHexCl = () => {
  let hexColor = [];
  let currentNum = 0;

  for (let i = 0; i < 6; i++) {
    currentNum = getRandomNum(0, 15).toString(16);
    hexColor.push(currentNum);
  }

  return `#${hexColor.join("")}`;
};

const selectTool = (e) => (currentTool = e.target.getAttribute("data-tool"));

const toolHandling = (e) => {
  let pixel = e.target;
  if (pixel.className === "whiteboard_square") {
    const TOOLS = {
      pencil: () => (pixel.style.background = currentColor.value),
      eraser: () => (pixel.style.background = "#fff"),
      randomizer: () => (pixel.style.background = getRandomHexCl()),
    };
    TOOLS[currentTool]();
  }
};

const renderDraw = (e) => {
  whiteboard.addEventListener("mousedown", (e) => {
    //Invoke the function when click
    toolHandling(e);
    //Invoke the function when move the mouse
    whiteboard.addEventListener("mousemove", toolHandling);
  });
};

/*
==============
Events
==============
*/

gridButtons.forEach((btn) => {
  btn.addEventListener("click", makeGrid);
});

gapButton.addEventListener("click", toggleGap);

toolButtons.forEach((btn) => {
  btn.addEventListener("click", selectTool);
});

whiteboard.addEventListener("mousedown", renderDraw);
//When we stop clicking, it stops drawing
window.addEventListener("mouseup", (e) => {
  whiteboard.removeEventListener("mousemove", toolHandling);
});
