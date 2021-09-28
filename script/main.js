var cursor = document.getElementById("cursor");
document.body.addEventListener("mousemove", function(e) {
  cursor.style.left = e.clientX + "px",
    cursor.style.top = e.clientY + "px";
});

// Set width and height for canvas
const container = document.getElementById('container')
const canvasSizeRender = () => {
    let h = container.clientHeight;
    let w = container.clientWidth;
    const canvas = document.getElementById('canvas')
    canvas.setAttribute('width', `${w}`)
    canvas.setAttribute('height', `${h}`)
}
window.onresize = () => {
    canvasSizeRender()
}
canvasSizeRender()

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
    ctx.imageSmoothingEnabled = true;
    // Brush color
    ctx.strokeStyle = 'white';
    ctx.strokeStyle = brushColor;
    ctx.stroke()
}

canvas.addEventListener('mousedown', e => {
    ctx.beginPath()
    let x = e.offsetX
    let y = e.offsetY
    ctx.moveTo(x, y)
    ctx.stroke()
    canvas.addEventListener('mousemove', drawingFn)
})
var cPushArray = new Array();

canvas.addEventListener('mouseup', e => {
    function cPush() {
        cPushArray.push(document.getElementById('canvas').toDataURL());
    }
    cPush()
    canvas.removeEventListener('mousemove', drawingFn)
})

// Download button
document.getElementById('download').onclick = function () {
    const dataURL = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
    document.body.removeChild(link);
};

// Undo button
document.getElementById('undo').onclick = function () {
    ctx.clearRect(0, 0, 10000, 10000);
    cPushArray.pop()
    let last = cPushArray.length - 1
    var canvasPic = new Image();
    canvasPic.src = cPushArray[last];
    canvasPic.onload = function () {
        ctx.drawImage(canvasPic, 0, 0);
    }
};