let Balls = [];

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;

function setup(){
    createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    for(let i=0;i<10;i++) {
        Balls.push(new Ball(width / 2, height / 2, Math.random()*20, Math.random()*20));
    }
}

function draw(){
    background(0);
    for(let i=0;i<10;i++) {
        Balls[i].update();
        Balls[i].show();
    }
}

function keyPressed(){
    console.log(key);
}