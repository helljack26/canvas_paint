// Set width and height for canvas
const container = document.getElementById('container')
let h = container.clientHeight;
let w = container.clientWidth;
const canvas = document.getElementById('canvas')
canvas.setAttribute('width', `${w}`)
canvas.setAttribute('height', `${h}`)

// Render thickness value 
const thick = document.getElementById('thickness');
const thickRender = () => {
    const thicknessOut = document.getElementById('thick-value')
    const thicknessValue = document.getElementById('thickness').value;
    thicknessOut.innerText = thicknessValue;
}
thick.onchange = () => {
    thickRender()
}
thickRender();


// Canvas 
const ctx = canvas.getContext('2d')

// Thickness
let thickness
document.getElementById('thickness').addEventListener('change', e => {
    thickness = e.target.value
})
// Brush color
let brushColor;
document.getElementById('colorBr').addEventListener('change', e => {
    brushColor = e.target.value;
});
// Background color
let backgroundColor;
document.getElementById('colorBg').addEventListener('change', e => {
    backgroundColor = e.target.value;
    document.getElementById('canvas').style.backgroundColor = backgroundColor;
});

// Drawing function
const drawingFn = function (moveEvent) {
    ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY)
    ctx.lineWidth = document.getElementById('thickness').value;
    ctx.lineWidth = thickness * 0.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Brush color
    ctx.strokeStyle = 'white';
    ctx.strokeStyle = brushColor;
    ctx.stroke()
}
canvas.addEventListener('mousedown', e => {
    // console.dir(e)
    ctx.beginPath()
    let x = e.offsetX
    let y = e.offsetY
    ctx.moveTo(x, y)

    ctx.stroke()
    canvas.addEventListener('mousemove', drawingFn)
})

canvas.addEventListener('mouseup', e => canvas.removeEventListener('mousemove', drawingFn))