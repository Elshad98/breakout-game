const getRandom = (array) => {
    return Math.floor(Math.random() * array.length);
};

const drawRectangle = (ctx, x, y, width, height, color) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

const showMessage = (ctx, font, color, text, x, y) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};

const drawStrokeRectangle = (ctx, x, y, width, height, color, strokeStyle) => {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = strokeStyle;
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

const drawCircle = (ctx, x, y, radius, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

export { getRandom, drawRectangle, showMessage, drawCircle, drawStrokeRectangle };