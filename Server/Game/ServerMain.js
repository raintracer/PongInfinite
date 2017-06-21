/**
 * Created by Vampiire on 6/19/17.
 */

const ObjectFactory = require('./ObjectFactory');
const factory = new ObjectFactory();

const Score = require('./Score');
const score = new Score();

// set global (ServerMain scope) socket IO
let io;
function setIO(appIO){
    io = appIO;
}

// STARTUP STEP 1)
function Create(){

    // set number of balls
    const numBalls = 5;

    factory.paddleBottom = factory.createObject('Paddle', Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT - 20, 255, 255, 255);
    factory.paddleTop = factory.createObject('Paddle', Constants().STAGE_WIDTH / 2, 20, 255, 255, 255);

    for (let i = 0; i < numBalls; i++) {
        factory.createObject('Ball', Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT / 2, Math.random() * 255, Math.random() * 255, 0);
    }

    // STARTUP STEP 2)
    PreLoad();

}

function PreLoad(){

// **************  THIS CAN BE REFACTORED TO PULL ALL DATA FROM GAME OBJECTS THEN EMIT

// set the initial graphic attributes here for each object type to be shown client side
    const ballGraphic = {
        type : "Ball",
        shape : 'ellipse',
        w : 20,
        h : 20,
        fill : { red: 255, green: 0, blue: 0},
        x : 10,
        y: 10
    };

    const paddleGraphic = {
        type : "Paddle",
        shape : 'rect',
        w : 75,
        h : 15,
        fill : { red: 0, green: 255, blue: 0},
        x : 0,
        y: 0
    };

    const laserGraphic = {
        type : "Laser",
        shape : 'ellipse',
        w : 20,
        h : 20,
        fill : { red: 0, green: 0, blue: 255},
        x : 10,
        y: 10
    };

    const preLoadData = { ball : ballGraphic, paddle: paddleGraphic, laser : laserGraphic };

    console.log('preload data', preLoadData);
    io.sockets.emit('preLoad', { preLoadData : preLoadData });

    // STARTUP STEP 4)
    Start();
}

function Start() {
    console.log('start called');
    setInterval(() => Update(), 16.6);
    factory.randomizeBalls();
}

// called every frame
function Update(){
    factory.update();
    io.sockets.emit('updateScore', score.getScore());
    io.sockets.emit('gameShow', { DrawArray : factory.show() })
}

function Move(data){

    console.log('Move called', data);

    let player = data.player,
        key = data.key;

    let paddle;

    // assign the paddle based on player
    player === 1 ? paddle = factory.paddleBottom : paddle = factory.paddleTop;

    switch(key){
        case 'left':
            paddle.accX(-Constants().PADDLE_FORCE);
            break;
        case 'right':
            paddle.accX(Constants().PADDLE_FORCE);
            break;
        case 'up':
            let laser = factory.createObject('Laser', paddle.x, paddle.topEdge() + (paddle.orientation()*20), 0, 255, 0);
            laser.accY(paddle.orientation() * 5);
    }

}

function Constants(){
    return { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 3, TRANSFER_COEFFICIENT : 0.4, PADDLE_FORCE: 6};
}

module.exports = {

    setIO : setIO,
    Create : Create,
    PreLoad : PreLoad,
    Start : Start,
    Move : Move,
    Constants : Constants

};