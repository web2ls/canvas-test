console.log('Renderer');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let contour = [];

// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(300, 300);
// ctx.stroke();

canvas.addEventListener('mousedown', (event) => {
    console.log('Start draw');
    console.log(event);
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    console.log(event.offsetX, event.offsetY);
    contour.push([event.pageX, event.pageY]);
})

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    console.log('drawing');

    // ctx.moveTo(event.pageX, event.pageY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    contour.push([event.pageX, event.pageY]);
})

canvas.addEventListener('mouseup', (event) => {
    console.log('Stop draw');
    isDrawing = false;
    contour.push([event.pageX, event.pageY]);
    console.log(contour);
    contour = [];
})