// global variables and constants

let canvas, Balls = [], paddleTop, paddleBottom, score, topScore = 0, bottomScore = 0, start = false;

// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const BALL_QUANTITY = 1, PADDLEACC = 10, CHAOS = 2, STAGE_WIDTH = 500, STAGE_HEIGHT = 500;

// setup function --> deployed during page load
function setup(){
    canvas = createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    centerCanvas();

    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls.push(new Ball(width / 2, height / 2));
    }

    paddleTop = new Paddle(width/2, 20, 0, 255, 0);
    paddleBottom = new Paddle(width/2, height-20, 0, 255, 0);
    score = new Score();

}

// center the canvas
function centerCanvas(){
    let x = (windowWidth - width) / 2, y = (windowHeight - height) / 2;
    canvas.position(x,y);
}

// center on window resize (responsive design)
function windowResized(){
    centerCanvas();
}


// draw function performs actions in control --> update --> detect collision --> show order
function draw(){

// CONTROLS
    if(keyIsDown(LEFT_ARROW)){
        paddleTop.accX(-PADDLEACC);
    }
    else if(keyIsDown(RIGHT_ARROW)){
        paddleTop.accX(PADDLEACC);
    }

    if(keyIsDown(65)){
        paddleBottom.accX(-PADDLEACC);
    }
    else if(keyIsDown(68)){
        paddleBottom.accX(PADDLEACC);
    }


// UPDATES
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].update();
    }
    paddleTop.update();
    paddleBottom.update();

// COLLISION DETECTECTION / BALL DEFLECTION
    for(let i=0;i<BALL_QUANTITY;i++) {
        paddleTop.collision(Balls[i]);
        paddleBottom.collision(Balls[i]);
        score.scorePoint(Balls[i]);
    }


// SHOW
    background(0);
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].show();
    }
    paddleTop.show();
    paddleBottom.show();

}

// drops the ball on movement of either paddle
// sets start to true to prevent repeated ball dropping like a free eunuch clinic
// start is reset to false on page load or point being awarded
function keyPressed(){
    if(start === false && (key == 'A' || key == 'D' || key == '%' || key == "'")){

        for(let i = 0; i < BALL_QUANTITY; i++){

        // sets a randomX and randomY value for each ball, may pass a negative y velocity to bring variation to ball
        // dropping direction
            let randomX = Math.random()*CHAOS, randomY = (Math.random()*CHAOS)+1;
            if(randomY < CHAOS/2){
                randomY *= -1;
            }
            Balls[i].drop(randomX, randomY);
        }
        start = true;
    }
}
