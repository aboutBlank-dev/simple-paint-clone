import './css/style.css';
if (module.hot) {
  module.hot.accept();
}

let previousMousePos = { x: 0, y: 0 };
let currentMousePos = {x: 0, y: 0};
let drawing = false;

let strokeSize = 3;
let strokeColor = 'green';


const onMouseUpLeave = () => {
  drawing = false;
}

const onMouseMove = (e) => {
  updateMousePosition(getCursorPosition(canvas, e));
  draw();
}

const onMouseDown = (e) => {
  drawing = true;

  updateMousePosition(getCursorPosition(canvas, e));
  drawCircle(currentMousePos);
  
}

const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y };
}

const updateMousePosition = (position) => {
  previousMousePos = currentMousePos;
  currentMousePos = position;
}

const updateStrokeSize = (size) => {
  strokeSize = size;
  canvasContext.lineWidth = strokeSize * 2;
}

const updateStrokeColor = (color) => {
  strokeColor = color;
  canvasContext.fillStyle = strokeColor;
  canvasContext.strokeStyle = strokeColor;
}

const draw = () => {
  if(drawing) drawLine(previousMousePos, currentMousePos);
}

const drawCircle = (position) => {
  canvasContext.beginPath();
  canvasContext.arc(position.x, position.y, strokeSize, 0, 2 * Math.PI);
  canvasContext.fill();
  canvasContext.closePath();
}

const drawLine = (fromPos, toPos) => {
  canvasContext.beginPath();
  canvasContext.moveTo(fromPos.x, fromPos.y);
  canvasContext.lineTo(toPos.x, toPos.y);
  canvasContext.stroke();
  canvasContext.closePath();
}

const resetCanvas = () => {
  canvasContext.lineCap = "round";
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = strokeColor;
  updateStrokeColor(strokeColor);
}

const downloadCurrentCanvas = () => {
  const source = canvas.toDataURL('image/png');
  var el = document.createElement("a");
  el.setAttribute("href", source);
  el.setAttribute("download", "MyPainting.png");
  document.body.appendChild(el);
  el.click();
  el.remove();
}

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext('2d');

canvas.addEventListener('mouseup', onMouseUpLeave);
canvas.addEventListener('mouseleave', onMouseUpLeave);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);

const colorButtonContainer = document.getElementById('color-btn-container');
const colorButtons = colorButtonContainer.children;

for(let i = 0; i < colorButtons.length; i++) {
  colorButtons[i].addEventListener('click', () => {
    updateStrokeColor(colorButtons[i].id);
  });
}

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', resetCanvas);

const donwloadButton = document.getElementById('download-btn');
donwloadButton.addEventListener('click', downloadCurrentCanvas);

resetCanvas();
updateStrokeSize(strokeSize);
updateStrokeColor(strokeColor);
