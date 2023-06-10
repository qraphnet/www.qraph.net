import { Vec2 } from './vector.js';
import './style.css'

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let width = canvasElement.width, height = canvasElement.height;

const resizeObserver = new ResizeObserver(([entry]) => {
  if (entry != null) {
    const box = entry.devicePixelContentBoxSize[0];
    width = box.inlineSize;
    height = box.blockSize;
    canvasElement.width = width;
    canvasElement.height = height;
  }
});
resizeObserver.observe(canvasElement);

let mouseCoordinate = new Vec2(0, 0);
canvasElement.addEventListener("mousemove", e => {
  mouseCoordinate = new Vec2(e.offsetX, e.offsetY);
});

const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

let lay = mouseCoordinate;
function render() {
  const middle = new Vec2(width / 2 | 0, height / 2 | 0);
  lay = Vec2.division(lay, mouseCoordinate.sub(middle), 0.5);
  const c = -Math.min(width, height) / 2;
  const a = lay.x, b = lay.y;
  const tan = a * b / (a * a + c * c), intercept = b * c / (a * a + c * c) * c / 6;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(middle.x, middle.y);

    ctx.beginPath();

    ctx.moveTo(-middle.x, tan * -middle.x + intercept);
    ctx.lineTo(width - middle.x, tan * (width - middle.x) + intercept);

    ctx.closePath();
    ctx.stroke();
  
  ctx.restore();
  requestAnimationFrame(render);
}

render();

