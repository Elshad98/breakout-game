import { InitialState, Buttons, Brick } from './constants';
import colors from './dummy-data';
import { getRandom, drawRectangle, showMessage, drawCircle } from './lib';

import 'reset-css';
import './css/index.css';
import { isRegExp } from 'util';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let paddleX = (canvas.width - InitialState.PADDLE_WIDTH) / 2;
let score = 0;
let bricks = [];
let arrColors = [];

for (let i = 0; i < Brick.COLUMN_COUNT; i++)
    arrColors[i] = colors[getRandom(colors)];

for (let i = 0; i < Brick.COLUMN_COUNT; i++) {
    bricks[i] = [];
    for (let j = 0; j < Brick.ROW_COUNT; j++)
        bricks[i][j] = { x: 0, y: 0, status: 1, color: arrColors[j] };
}

const keyDownHandler = function (evt) {
    if (evt.keyCode === Buttons.ARROW_RIGHT) {
        rightPressed = true;
    }
    else if (evt.keyCode === Buttons.ARROW_LEFT) {
        leftPressed = true;
    }
};


const drawBricks = () => {
    for (let i = 0; i < Brick.COLUMN_COUNT; i++) {
        for (let j = 0; j < Brick.ROW_COUNT; j++) {
            if (bricks[i][j].status === 1) {
                let brickX = (i * (Brick.WIDTH + Brick.PADDING)) + Brick.OFFSET_LEFT;
                let brickY = (j * (Brick.HEIGHT + Brick.PADDING)) + Brick.OFFSET_TOP;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                drawRectangle(ctx, brickX, brickY, Brick.WIDTH, Brick.HEIGHT, bricks[i][j].color); // drawing bricks
            }
        }
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

const collisionDetection = () => {
    for (let i = 0; i < Brick.COLUMN_COUNT; i++) {
        for (let j = 0; j < Brick.ROW_COUNT; j++) {
            let b = bricks[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + Brick.WIDTH && y > b.y && y < b.y + Brick.HEIGHT) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === Brick.COLUMN_COUNT * Brick.ROW_COUNT){
                        alert('YOU WIN, CONGRATULATIONS!!!');
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawCircle(ctx, x, y, InitialState.BALL_RADIUS, 0, Math.PI * 2, InitialState.COLOR); // draw ball
    drawRectangle(ctx, paddleX, canvas.height - InitialState.PADDLE_HEIGHT, InitialState.PADDLE_WIDTH, InitialState.PADDLE_HEIGHT, InitialState.COLOR); // draw paddle
    showMessage(ctx, '16px Arial', InitialState.COLOR, `Score: ${score}`, 8, 20);
    collisionDetection();

    if (x + dx > canvas.width - InitialState.BALL_RADIUS || x + dx < InitialState.BALL_RADIUS) {
        dx = -dx;
    }
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