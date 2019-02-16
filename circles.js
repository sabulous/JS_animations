var canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height / 2;

var isPlaying = true;
var red = 0;
var green = 0;
var blue = 0;

var r = 1;

var angle = Math.PI;

var direction = true;

var frame = 0;

function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function playPause() {
    isPlaying = !isPlaying;
    document.getElementById("playPauseButton").innerHTML = isPlaying ? "Pause" : "Play";
}

function drawArc() {
    ctx.beginPath();
    ctx.arc(x, y, r, angle * 0.67, angle, direction);
    setColor();
    ctx.stroke();
    ctx.closePath();
}

function setColor() {
    red += 2;
    green += 4;
    blue += 8;

    red %= 256;
    green %= 256;
    blue %= 256;

    ctx.strokeStyle = 'rgb('+ red + ',' + green + ',' + blue +')';
}

function setRadius() {
    if(frame % 10 != 0) {
        r = r + Math.ceil(Math.random() * 10);
    } else {
        r = Math.abs(r - Math.ceil(Math.random() * 10));
    }
}

function setAngle() {
    angle = Math.random() * Math.PI * 2;
}

function setDirection() {
    var a = Math.random();
    var b = Math.random();
    if(a >= b) direction = false;
    else direction = true;
}

function setCenter() {
    x = Math.random() * canvas.getAttribute("width");
    y = Math.random() * canvas.getAttribute("height"); 
}

function initRadius() {
    r = 1;
}

function ensureBoundaries() {
    if(r > canvas.getAttribute("height") && r > canvas.getAttribute("width")) {
        initRadius();
        setCenter();
    }
}

function showPanel(panel) {
    panel.style.opacity = 1;
}

function hidePanel(panel) {
    panel.style.opacity = 0;
}

function jump() {
    setCenter();
    initRadius();
}

function keyPressed(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode
    
    // if p pressed
    if(charCode == 80 || charCode == 112) playPause();
    
    // if j pressed
    if(charCode == 74 || charCode == 106) jump();
}

function draw() {
    if(!isPlaying) return;
    drawArc();
    
    if(frame % 2 == 0) setRadius();
    ensureBoundaries();

    if(frame % 3 == 0) setAngle();
    if(frame % 10 == 0) setDirection();
    frame++;
}

initialize();
document.onkeypress = keyPressed;
setInterval(draw, 10);
