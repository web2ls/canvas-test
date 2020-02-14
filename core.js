console.log('Renderer');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let contour = [];

canvas.addEventListener('mousedown', (event) => {
    console.log('Start draw');
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    
    contour.push([event.offsetX, event.offsetY]);
})

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    console.log('drawing');

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    contour.push([event.offsetX, event.offsetY]);
})

canvas.addEventListener('mouseup', (event) => {
    console.log('Stop draw');
    contour.push([event.offsetX, event.offsetY]);
    ctx.lineTo(event.offsetX, event.offsetY);

    ctx.lineTo(contour[0][0], contour[0][1]);
    contour.push(contour[0]);
    ctx.stroke();
    isDrawing = false;

    if (!localStorage.getItem('contour1'))
        localStorage.setItem('contour1', JSON.stringify(contour));
    else if (!localStorage.getItem('contour2'))
        localStorage.setItem('contour2', JSON.stringify(contour));

    contour = [];
})