import InitialState from './constants';

import 'reset-css';
import './css/index.css';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let paddleX = (canvas.width - InitialState.PADDLE_WIDTH) / 2;

const keyDownHandler = function (evt) {
    if (evt.keyCode === 39) {
        rightPressed = true;
    }
    else if (evt.keyCode === 37) {
        leftPressed = true;
    }
};

const keyUpHandler = function (evt) {
    if (evt.keyCode === 39) {
        rightPressed = false;
    }
    else if (evt.keyCode === 37) {
        leftPressed = false;
    }
};

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, InitialState.BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
};

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - InitialState.PADDLE_HEIGHT, InitialState.PADDLE_WIDTH, InitialState.PADDLE_HEIGHT);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy < InitialState.BALL_RADIUS) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - InitialState.BALL_RADIUS) {
        if (x > paddleX && x < paddleX + InitialState.PADDLE_WIDTH) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }

    }
    if (x + dx > canvas.width - InitialState.BALL_RADIUS || x + dx < InitialState.BALL_RADIUS) {
        dx = -dx;
    }

    if (rightPressed && paddleX < canvas.width - InitialState.PADDLE_WIDTH) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
};

const interval = setInterval(draw, InitialState.FRAME_TIME);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);