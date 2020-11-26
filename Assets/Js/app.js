/* ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 10, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgb(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath(); */

// Canvas Bal Vars----------------

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// Paddle Vars--------------

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//Control Vars------------------

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  }else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  }else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  
  if (y + dy < ballRadius){
    dy = -dy;
  }else if(y + dy > canvas.height-ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
      dx += 4;
    } else{
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }
  if(x + dx < ballRadius || x + dx > canvas.width-ballRadius){
    dx = -dx;
  }

  if(rightPressed){
    paddleX += 7;
    if(paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  }else if(leftPressed){
    paddleX -= 7;
    if(paddleX < 0){
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);