var canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');

var x = 2560 / 2;
var y = 1440 / 2;

var red = 0;
var green = 0;
var blue = 0;

var r = 1;

var angle = Math.PI;

var direction = true;

var frame = 0;

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

function resetCenter() {
    x = Math.random() * canvas.getAttribute("width");
    y = Math.random() * canvas.getAttribute("height"); 
}

function setRadius() {
    if(frame % 200 == 0) {
        r = r + Math.ceil(Math.random() * 10);
    } else {
        r = r - Math.ceil(Math.random() * 10);
    }

    if(r > canvas.getAttribute("height") && r > canvas.getAttribute("width")) {
        r = 1;
        resetCenter();
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

function draw() {
    //ctx.clearRect(0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
    drawArc();  
    if(frame % 100 == 0) setRadius();
    if(frame % 70 == 0) setAngle();
    if(frame % 80 == 0) changeDirection();
    frame++;
}

setInterval(draw, 20);