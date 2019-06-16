import InitialState  from './constants';

import 'reset-css';
import './css/index.css';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, InitialState .BALL_RADIUS, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    if(y + dy > canvas.height - InitialState .BALL_RADIUS || y + dy < InitialState .BALL_RADIUS){
        dy = -dy;
    }

    if(x + dx > canvas.width - InitialState .BALL_RADIUS || x + dx < InitialState .BALL_RADIUS){
        dx = -dx;
    }
};

setInterval(draw, InitialState .FRAME_TIME);