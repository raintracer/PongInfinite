let Balls = [], paddleTop, paddleBottom;

const BALL_QUANTITY = 1;
const PADDLEACC = 10;

const CHAOS = 5;

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;

function setup(){
    createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls.push(new Ball(width / 2, height / 2, Math.random()*CHAOS, Math.random()*CHAOS));
    }

    paddleTop = new Paddle(STAGE_WIDTH/2, 20, 255, 0, 0);
    paddleBottom = new Paddle(STAGE_WIDTH/2, STAGE_HEIGHT-20, 0, 255, 0);
}

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

    // HIT DETECT
    for(let i=0;i<BALL_QUANTITY;i++) {
        paddleTop.deflectBall(Balls[i]);
        paddleBottom.deflectBall(Balls[i]);
    }


    // DRAW
    background(0);
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].show();
    }
    paddleTop.show();
    paddleBottom.show();

}
