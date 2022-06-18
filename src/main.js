import '../dist/css/style.css';
if (module.hot) {
  module.hot.accept();
}

let previousMousePos = { x: 0, y: 0 };
let currentMousePos = {x: 0, y: 0};
let drawing = false;

let strokeSize = 3;
let strokeColor = '#000000';


/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext('2d');

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y };
}

canvas.addEventListener('mouseleave', (event) => {
  drawing = false;
});

canvas.addEventListener('mousedown', (e) => {
  updateMousePosition(getCursorPosition(canvas, e));
  drawCircle(currentMousePos);
  drawing = true;
})

canvas.addEventListener('mousemove', (e) => {
  updateMousePosition(getCursorPosition(canvas, e));
  draw();
});

canvas.addEventListener('mouseup', (e) =>{
  drawing = false;
})

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


updateStrokeSize(6);
updateStrokeColor('green');

