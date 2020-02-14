console.log(turf);

console.log('Renderer');

const canvas = document.getElementById('canvas');
const buttonCheckElem = document.querySelector('.check-btn');
const buttonClearElem = document.querySelector('.clear-canvas-btn');
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

buttonCheckElem.addEventListener('click', () => {
    console.log('click on the button');
    const rawPoly1 = JSON.parse(localStorage.getItem('contour1'));
    const rawPoly2 = JSON.parse(localStorage.getItem('contour2'));
    const poly1 = turf.polygon([rawPoly1]);
    const poly2 = turf.polygon([rawPoly2]);
    const intersection = turf.intersect(poly1, poly2);
    console.log(intersection);
})

buttonClearElem.addEventListener('click', () => {
    console.log('clear canvas');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.clear();
})