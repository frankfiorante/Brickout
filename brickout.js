alert("Press Enter To Start");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var ballSize = 20;
var paddleHeight = 20;
var paddleWidth = 150;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;
var level = 1;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 150;
var brickHeight = 40;
var brickPadding = 20;
var brickOffsetTop = 60;
var brickOffsetLeft = 60;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x>b.x && x < b.x+brickWidth && y>b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickColumnCount*brickRowCount){
                        alert("YOU WIN");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+score, 16, 40);
}

function drawLives() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Lives: "+lives, canvas.width-130, 40);
}

function drawLevel() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Level: "+level, 420, 40);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0000b2";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1 ) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ffff00";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    drawLevel();

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    if(x + dx > canvas.width-ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if(y + dy < ballSize) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballSize) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    x += dx;
    y += dy;
}
setInterval(draw, 10);