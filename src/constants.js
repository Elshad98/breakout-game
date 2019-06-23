const InitialState = Object.freeze({
    BALL_RADIUS: 10,
    FRAME_TIME: 10,
    PADDLE_HEIGHT: 10,
    PADDLE_WIDTH: 75,
    SCORE: 0,
    LIVES: 3,
    COLOR: '#7289da'
});

const Buttons = Object.freeze({
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37
});

const Brick = Object.freeze({
    ROW_COUNT: 3,
    COLUMN_COUNT: 10,
    WIDTH: 80,
    HEIGHT: 30,
    PADDING: 0,
    OFFSET_TOP: 30,
    OFFSET_LEFT: 0
});

export { InitialState, Buttons, Brick };