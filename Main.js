// global variables and constants


let canvas, Balls = [], GameObjects = [], paddleTop, paddleBottom, score, topScore = 0, bottomScore = 0, start = false;

// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const BALL_QUANTITY = 20, PADDLEACC = 10, CHAOS = 5, STAGE_WIDTH = 500, STAGE_HEIGHT = 500;
const BALL_PUSH_SPEED = .5;
const TRANSFER_COEFFICIENT = 1;

// setup function --> deployed during page load
function setup(){
    canvas = createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    centerCanvas();

    paddleTop = new Paddle(0, width/2, 20, 0, 255, 0);
    paddleBottom = new Paddle(1, width/2, height-20, 0, 255, 0);

    GameObjects[0] = paddleTop;
    GameObjects[1] = paddleBottom;
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls.push(new Ball(2+i, width / 2, height / 2, i));
        Balls[i].xvel = CHAOS*Math.random();
        Balls[i].yvel = CHAOS*Math.random();
        Balls[i].x = width*Math.random();
        Balls[i].y = height*Math.random();
        GameObjects[i+2] = Balls[i];
    }

    score = new Score();

    //TESTING
    Balls[0].setPosition(50,50);
    Balls[1].xvel=1;
    Balls[1].yvel=2;

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
        paddleBottom.accX(-PADDLEACC);
        Balls[0].accX(-BALL_PUSH_SPEED);
    }
    else if(keyIsDown(RIGHT_ARROW)){
        paddleBottom.accX(PADDLEACC);
        Balls[0].accX(BALL_PUSH_SPEED);
    }

    if(keyIsDown(UP_ARROW)){
        Balls[0].accY(-BALL_PUSH_SPEED);
    }
    else if(keyIsDown(DOWN_ARROW)){
        Balls[0].accY(BALL_PUSH_SPEED);
    }

    if(keyIsDown(65)){
        paddleTop.accX(-PADDLEACC);
    }
    else if(keyIsDown(68)){
        paddleTop.accX(PADDLEACC);
    }


// UPDATES
    paddleTop.update();
    paddleBottom.update();
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].update();
    }


// SCORE DETECTION
    for(let i=0;i<BALL_QUANTITY;i++) {
        // score.scorePoint(Balls[i]);
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
