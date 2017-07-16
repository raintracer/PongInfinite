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
    const numBalls = 1;

    factory.paddleBottom = factory.createObject('Paddle', Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT - 20, 255, 255, 255);
    factory.paddleTop = factory.createObject('Paddle', Constants().STAGE_WIDTH / 2, 20, 255, 255, 255);

    for (let i = 0; i < numBalls; i++) {
        factory.createObject('Ball', Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT / 2, 0, 0, 255);
    }

    Start();

}


function Start() {
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
            let laser = factory.createObject('Laser', paddle.x, paddle.topEdge() + (paddle.orientation()*20), 255, 0, 0);
            laser.accY(paddle.orientation() * 5);
    }

}

function Constants(){
    return { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 3, TRANSFER_COEFFICIENT : 0.4, PADDLE_FORCE: 6};
}

module.exports = {

    setIO : setIO,
    Create : Create,
    Start : Start,
    Move : Move,
    Constants : Constants

};