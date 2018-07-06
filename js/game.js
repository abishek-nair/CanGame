
var constants = {

    UPDATE_TIME : 20,
    BALL_VELOCITY : 10,
    PADDLE_VELOCITY : 30,
    BALL_RADIUS : 20,
    PADDLE_HEIGHT : 10,
    PADDLE_WIDTH : 150,
    BTN_RIGHT_KEYCODE : 39,
    BTN_LEFT_KEYCODE : 37
}

let canvas;
let ctx;

let ball_x;
let ball_y;
let ball_r = constants.BALL_RADIUS;
let ball_xd = constants.BALL_VELOCITY;
let ball_yd = constants.BALL_VELOCITY;

let paddle_x;
let paddle_y;
let paddle_h = constants.PADDLE_HEIGHT;
let paddle_w = constants.PADDLE_WIDTH;
let paddle_xd = constants.PADDLE_VELOCITY;

let isBtnRightPressed = false;
let isBtnLeftPressed = false;

var onPageLoad = function() {

    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");

    ball_x = (Math.random() * canvas.width);
    ball_y = (Math.random() * (canvas.height - (canvas.height / 2)));

    paddle_x = (canvas.width / 2) - (paddle_w / 2);
    paddle_y = (canvas.height - paddle_h);

    registerKeyPressHandlers();

    setInterval(update, constants.UPDATE_TIME);

}

var registerKeyPressHandlers = function() {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
}

var clearCanvas = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var drawBall = function(ball_x, ball_y) {

    /// Building a Green Circle
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_r, 0, (Math.PI * 2), false);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
    ctx.closePath();
}

var drawPaddle = function(paddle_x, paddle_y) {

    /// Building a yellow paddle
    ctx.beginPath();
    ctx.rect(paddle_x, paddle_y, paddle_w, paddle_h);
    ctx.fillStyle = "#f1c40f";
    ctx.fill();
    ctx.closePath();
}

var update = function() {

    clearCanvas();

    /// If the ball touches the boundary, reverse it's direction.
    if ( (ball_x <= ball_r) || (ball_x + ball_r >= canvas.width) ) {
        ball_xd = -ball_xd ;
    }

    if ( ball_y <= ball_r ) {
        ball_yd = -ball_yd ;
    }

    /// Bottom boundary collision detection
    if ( ball_y + ball_r >= canvas.height - paddle_h ) {

        if ( (ball_x + ball_r >= paddle_x) && (ball_x + ball_r <= paddle_x + paddle_w)) {
            /// Ball collided with the paddle. Cheers .. :)
            ball_yd = -ball_yd;
        } else {
            /// Ball missed the paddle. Boo hoo.. :(
            document.write("LOST");
        }
        
    }

    if ( isBtnLeftPressed && (paddle_x > 0) ) {
        paddle_x -= paddle_xd;
    }

    if ( isBtnRightPressed && (paddle_x + paddle_w < canvas.width) ) {
        paddle_x += paddle_xd;
    }

    drawBall(ball_x, ball_y);
    drawPaddle(paddle_x, paddle_y);

    ball_x += ball_xd ;
    ball_y += ball_yd ;

}

var keyDownHandler = function(event) {

    if (event.keyCode == constants.BTN_LEFT_KEYCODE) {
        isBtnLeftPressed = true;
    }

    if (event.keyCode == constants.BTN_RIGHT_KEYCODE) {
        isBtnRightPressed = true;
    }
}

var keyUpHandler = function() {

    if (event.keyCode == constants.BTN_LEFT_KEYCODE) {
        isBtnLeftPressed = false;
    }

    if (event.keyCode == constants.BTN_RIGHT_KEYCODE) {
        isBtnRightPressed = false;
    }
}

/// INIT CODE
if (document.readyState == "complete" || 
    (document.readyState != "loading" && !document.documentElement.doScroll)) {

        onPageLoad();

} else {
    document.addEventListener("DOMContentLoaded", onPageLoad);
}