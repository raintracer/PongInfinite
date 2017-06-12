// global variables and constants

let socket;

let canvas, objectFactory, Balls = [], paddleTop, laserTop, shotsTop = [], paddleBottom, laserBottom, shotsBottom = [], score, topScore = 0, bottomScore = 0, start = false,
    ballCollide = '', pointAwarded = '', paddleCollide = '', mute = true;

let player;


// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const BALL_QUANTITY = 2, PADDLEACC = 10, STAGE_WIDTH = 400, STAGE_HEIGHT = 500;
const CHAOS = 6;                    // CHAOS IS THE MAXIMUM STARTING SPEED OF THE BALLS
const TRANSFER_COEFFICIENT = .5;    // THE TRANSFER COEFFICIENT IS HOW MUCH OF THE MOMENTUM DELTA IS TRANSFERRED IN A COLLISION
const LASER_SPEED = 2;

// PRELOAD THE SOUND EFFECTS TO BE READY FOR USE
function preload(){
    ballCollide = loadSound('Sound Effects/Ball_Collide.mp3');
    pointAwarded = loadSound('Sound Effects/Light_Fapping.mp3');
    paddleCollide = loadSound('Sound Effects/Soft_Ding.mp3');

    // CONNECT TO THE SERVER
    // socket = io.connect("http://localhost:3000");
    socket = io.connect("http://44caf9fc.ngrok.io");
    socket.once("AssignPlayer", assignPlayer);
    socket.emit("RequestPlayer");
    socket.on('serverKeyPress', serverKeyPress);
    socket.on('PushServerUpdate', loadUpdate)
}

// setup function --> deployed during page load
function setup(){

    canvas = createCanvas(STAGE_WIDTH,STAGE_HEIGHT);
    centerCanvas();

    objectFactory = new ObjectFactory();

    // INITIALIZE THE PADDLES
    paddleTop = new Paddle(1, 0, width/2, 20, 0, 255, 0);
    paddleBottom = new Paddle(2, 1, width/2, height-20, 0, 255, 0);

    // CREATE A LIST OF GAME OBJECTS, WHILE INITIALIZING BALLS IN RANDOM STATES
    for(let i=0;i<BALL_QUANTITY;i++) {
        objectFactory.createObject("Ball", width/2, height/2, Math.random()*255, Math.random()*255, Math.random()*255);
    }
    objectFactory.randomizeBalls();

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



    // UPDATES
    if (player === 1) {

        paddleTop.PaddleUpdate();
        paddleBottom.PaddleUpdate();
        objectFactory.update();

        let updatePackage = {
            paddleTop: paddleTop,
            paddleBottom: paddleBottom,
            objectFactory: objectFactory
        };
        socket.emit("PushClientUpdate", updatePackage);


        // SCORE DETECTION
        // for(let i=0;i<BALL_QUANTITY;i++) {
        //     score.scorePoint(Balls[i]);
        // }


        // SHOW
        background(0);
        objectFactory.show();
        paddleTop.show();
        // laserTop.show();
        paddleBottom.show();
        // laserBottom.show();
    }

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
    socket.emit("shootKey", {keyCode:keyCode});
}

function serverKeyPress(data){


    if(data.keyCode === UP_ARROW){

        console.log('shoot');
        let newLaser = objectFactory.createObject("Laser", paddleBottom.x, paddleBottom.y + paddleBottom.h*paddleBottom.orientation(), Math.random()*255, Math.random()*255, Math.random()*255);
        newLaser.accY(LASER_SPEED*paddleBottom.orientation());

    }

    if(data.keyCode === 83){
        console.log('top shoot');
        let newLaser = objectFactory.createObject("Laser", paddleTop.x, paddleTop.y + paddleTop.h*paddleTop.orientation(), Math.random()*255, Math.random()*255, Math.random()*255);
        newLaser.accY(LASER_SPEED*paddleTop.orientation());
        paddleTop.xvel+=100;
    }

}

function assignPlayer(data){

    player = data.player;
    console.log("Player Assigned: " + player);

}

function loadUpdate(data){
    if (player!==1) {
        console.log(data);

        // data.paddleTop.draw();
        // data.paddleBottom.draw();

        background(0);
        data.objectFactory.show();
        data.paddleTop.show();
        // laserTop.show();
        data.paddleBottom.show();

        // let objectArray = data.objectFactory.gameObjects;
        // objectFactory.gameObjects = [];
        // for (let i in data.objectFactory.gameObjects){
        //     objectFactory.create
        // }

    }
}