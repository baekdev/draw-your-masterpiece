const canvas = document.getElementById('paper');
const colors = document.getElementsByClassName('controls_color');
const range = document.getElementById('range');
const btnMode = document.getElementById('btnMode');
const btnSave = document.getElementById('btnSave');

const CANVAS_SIZE = 700;
const INITIAL_COLOR = '#2c2c2c';

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting(event) {
  if (filling) {
    return;
  }
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function onMouseMove(event) {
  startPainting(event);
}

function onMouseDown(event) {
  painting = true;
  startPainting(event);
}

function handleClickCanvas() {
  if (filling) {
    console.log(ctx.strokeStyle);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM() {
  event.preventDefault();
}

function handleMode(event) {
  if (filling) {
    filling = false;
    btnMode.innerText = 'fill';
  } else {
    filling = true;
    btnMode.innerText = 'paint';
  }
}

function handleSave(event) {
  var dataURL = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'your-masterpiece[🎨]';
  link.click();
}

function changeColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
}
function changeSize(event) {
  ctx.lineWidth = event.target.value;
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleClickCanvas);
  canvas.addEventListener('contextmenu', handleCM);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener('click', changeColor)
  );
}

if (range) {
  range.addEventListener('input', changeSize);
}

if (btnMode) {
  btnMode.addEventListener('click', handleMode);
}

if (btnSave) {
  btnSave.addEventListener('click', handleSave);
}
