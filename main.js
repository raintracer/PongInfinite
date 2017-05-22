let Balls = [], paddleTop, paddleBottom;

const PADDLEACC = 10;

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;

function setup(){
    createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    for(let i=0;i<10;i++) {
        Balls.push(new Ball(width / 2, height / 2, Math.random()*20, Math.random()*20));
    }

    paddleTop = new Paddle(STAGE_WIDTH/2, 20, 255, 0, 0);
    paddleBottom = new Paddle(STAGE_WIDTH/2, STAGE_HEIGHT-20, 0, 255, 0);
}

function draw(){
    background(0);
    for(let i=0;i<10;i++) {
        Balls[i].update();
        Balls[i].show();
    }

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


    paddleTop.update();
    paddleTop.show();
    paddleBottom.update();
    paddleBottom.show();


}
