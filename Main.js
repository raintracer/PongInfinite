// global variables and constants

let canvas, Balls = [], paddleTop, laserTop, shotsTop = [], paddleBottom, laserBottom, shotsBottom = [], score, topScore = 0, bottomScore = 0, start = false,
    ballCollide = '', pointAwarded = '', paddleCollide = '', mute = true;


// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const BALL_QUANTITY = 2, PADDLEACC = 10, STAGE_WIDTH = 400, STAGE_HEIGHT = 500;
const CHAOS = 6;                    // CHAOS IS THE MAXIMUM STARTING SPEED OF THE BALLS
const TRANSFER_COEFFICIENT = .5;    // THE TRANSFER COEFFICIENT IS HOW MUCH OF THE MOMENTUM DELTA IS TRANSFERRED IN A COLLISION


// PRELOAD THE SOUND EFFECTS TO BE READY FOR USE
function preload(){
    ballCollide = loadSound('Sound Effects/Ball_Collide.mp3');
    pointAwarded = loadSound('Sound Effects/Light_Fapping.mp3');
    paddleCollide = loadSound('Sound Effects/Soft_Ding.mp3');
}

// setup function --> deployed during page load
function setup(){

    canvas = createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    centerCanvas();

    // INITIALIZE THE PADDLES
    paddleTop = new Paddle(0, width/2, 20, 0, 255, 0);
    laserTop = new Laser(2, paddleTop.x, paddleTop.bottomEdge(), 1, 255, 0, 0);
    paddleBottom = new Paddle(1, width/2, height-20, 0, 255, 0);
    laserBottom = new Laser(4, paddleBottom.x, paddleBottom.topEdge(), -1, 255, 0, 0);

    for(let i = 0; i < 10; i++){
        shotsTop.push(new Projectile(4+i, laserTop.x, laserTop.y+20));
        shotsBottom.push(new Projectile(4+i, laserBottom.x, laserBottom.y-20));
    }

    // CREATE A LIST OF GAME OBJECTS, WHILE INITIALIZING BALLS IN RANDOM STATES

    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls.push(new Ball(24+i, width / 2, height / 2));
        Balls[i].randomize();
    }

    // INITIALIZE THE SCORE OBJECT
    score = new Score();

    // INITIALIZE THE SOUND EFFECTS


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
        laserBottom.accX(-PADDLEACC);
    }
    else if(keyIsDown(RIGHT_ARROW)){
        paddleBottom.accX(PADDLEACC);
        laserBottom.accX(PADDLEACC);
    }

    if(keyIsDown(65)){
        paddleTop.accX(-PADDLEACC);
        laserTop.accX(-PADDLEACC);
    }
    else if(keyIsDown(68)){
        paddleTop.accX(PADDLEACC);
        laserTop.accX(PADDLEACC);
    }



    // UPDATES
    paddleTop.update();
    laserTop.update();
    paddleBottom.update();
    laserBottom.update();
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].update();
    }

    // SCORE DETECTION
    // for(let i=0;i<BALL_QUANTITY;i++) {
    //     score.scorePoint(Balls[i]);
    // }


    // SHOW
    background(0);
    for(let i=0;i<BALL_QUANTITY;i++) {
        Balls[i].show();
    }
    paddleTop.show();
    laserTop.show();
    paddleBottom.show();
    laserBottom.show();

}

// drops the ball on movement of either paddle
// sets start to true to prevent repeated ball dropping like a free eunuch clinic
// start is reset to false on page load or point being awarded
// function keyPressed(){
//     if(start === false && (key == 'A' || key == 'D' || key == '%' || key == "'")){
//
//         for(let i = 0; i < BALL_QUANTITY; i++){
//
//         // sets a randomX and randomY value for each ball, may pass a negative y velocity to bring variation to ball
//         // dropping direction
//             let randomX = Math.random()*CHAOS, randomY = (Math.random()*CHAOS)+1;
//             if(randomY < CHAOS/2){
//                 randomY *= -1;
//             }
//             Balls[i].drop(randomX, randomY);
//         }
//         start = true;
//     }
// }

// key press to shoot
function keyPressed(){

    if(keyCode === UP_ARROW){
        console.log('shoot');
        laserBottom.shoot();
    }

    if(key === 'S'){
        console.log('top shoot');
        laserTop.shoot();
    }
}
