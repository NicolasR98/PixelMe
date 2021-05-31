/*
==============
Selectors
==============
*/

const frameSubmenu = document.querySelector(".submenu");
const frame = document.querySelector(".frame");

const gridButtons = document.querySelectorAll(".btn_grid");
const toolButtons = document.querySelectorAll(".btn_tool");

const closeButtons = document.querySelectorAll(".close");
const chevron = document.querySelector(".chevron_submenu");
const modalButtons = document.querySelectorAll(".btn_modal");
const modal = document.querySelector(".modal");
const modalBox = document.querySelectorAll(".modal_box");

const currentColor = document.querySelector(".palette");

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

//============== Modal and Submenu Functions ==============
const displayModal = (e) => {
  let target = e.target.getAttribute("data-nav-item");
  const NAV_MODALS = {
    help: () => {
      modal.classList.add("active");
      modalBox[0].classList.add("active");
    },
    social: () => {
      modal.classList.add("active");
      modalBox[1].classList.add("active");
    },
    about: () => {
      modal.classList.add("active");
      modalBox[2].classList.add("active");
    },
  };
  NAV_MODALS[target]();
};

const closeWindow = () => {
  modal.classList.remove("active");
  modalBox.forEach((box) => box.classList.remove("active"));
};

const displaySubmenu = () => {
  frameSubmenu.classList.toggle("active");
};

//============== Tools Functions ==============
const handleBtnState = (tool) => {
  // Remove all the .active of all tool buttons except the current tool.
  toolButtons.forEach((btn) => {
    let dataTool = btn.getAttribute("data-tool");
    dataTool === currentTool ? "" : btn.classList.remove("active");
  });
  frameSubmenu.classList.remove("active");
  chevron.classList.remove("active");

  const TOOL_BUTTONS = {
    pencil: () => toolButtons[0].classList.add("active"),
    eraser: () => toolButtons[1].classList.toggle("active"),
    frame: () => {
      toolButtons[3].classList.toggle("active");
      chevron.classList.toggle("active");
      displaySubmenu();
    },
  };
  if (tool) {
    TOOL_BUTTONS[tool]();
  }
};

const selectTool = (e) => {
  const TOOLS = {
    pencil: () => {
      currentTool = "pencil";
      handleBtnState(currentTool);
    },
    eraser: () => {
      currentTool = "eraser";
      handleBtnState(currentTool);
    },
    frame: () => {
      currentTool = "frame";
      handleBtnState(currentTool);
    },
    palette: () => {
      currentTool = "pencil";
      handleBtnState(currentTool);
    },
  };

  if (e) {
    let target = e.target.getAttribute("data-tool");
    TOOLS[target]();
  } else {
    TOOLS.pencil();
  }
};

const handleTool = (e) => {
  if (e.target.className === "frame_square") {
    const TOOLS = {
      pencil: () => (e.target.style.background = currentColor.value),
      eraser: () => (e.target.style.background = "#FFF"),
    };
    TOOLS[currentTool]();
  }
};

//============== Grid Functions ==============
const getGridSize = (e) => (gridSize = e.target.getAttribute("data-grid-size"));

const makeGrid = (e) => {
  //Clear whiteboard
  frame.innerHTML = "";

  let gridSize = Number();

  // When we invoke this function without any params, this will create an 8x8 grid.
  if (!e) {
    gridSize = 8;
  } else {
    gridSize = getGridSize(e);
  }
  const squareQty = gridSize * gridSize;

  frame.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  frame.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  //Create the squares and append them to the frame
  for (let i = 0; i <= squareQty; i++) {
    const square = document.createElement("div");
    square.className = "frame_square";
    frame.append(square);
  }

  //After create a grid, select the pencil
  selectTool();
  handleBtnState();
};

/*
==============
Events
==============
*/
modalButtons.forEach((btn) => {
  btn.addEventListener("click", displayModal);
});
closeButtons.forEach((btn) => {
  btn.addEventListener("click", closeWindow);
});

gridButtons.forEach((btn) => {
  btn.addEventListener("click", makeGrid);
});

toolButtons.forEach((btn) => {
  btn.addEventListener("click", selectTool);
});

frame.addEventListener("mousedown", handleTool);

//This enables click-dragging
document.body.onmousedown = () => {
  frame.addEventListener("mouseover", handleTool);
};
document.body.onmouseup = () => {
  frame.removeEventListener("mouseover", handleTool);
  handleBtnState();
};

//Create an initial grid 8x8
makeGrid();
