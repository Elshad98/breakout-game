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

export { getRandom, drawRectangle, showMessage };