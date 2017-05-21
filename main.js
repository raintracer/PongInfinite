let Balls = [], paddleTop, paddleBottom;

const PADDLEACC = 5;

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

    paddleTop.update();
    paddleTop.show();
    paddleBottom.update();
    paddleBottom.show();


}

function keyPressed(){

    switch(key){
        // top player left
        case 'A':
            paddleTop.accX(-PADDLEACC);
            break;
        // top player right
        case 'D':
            paddleTop.accX(PADDLEACC);
            break;
        // bottom player left
        case '%':
            paddleBottom.accX(-PADDLEACC);
            break;
        // bottom player right
        case "'":
            paddleBottom.accX(PADDLEACC);
            break;

    }

}