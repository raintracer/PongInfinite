/**
 * Created by Vampiire on 6/19/17.
 */

let io;
const numBalls = 1;

// const socket = require('socket.io');
const ObjectFactory = require('./ObjectFactory');
const factory = new ObjectFactory();

function setIO(appIO){
    io = appIO;
}

function Main(){

    factory.paddleBottom = factory.createObject('Paddle', Constants().STAGE_WIDTH/2, Constants().STAGE_HEIGHT-20, 255, 255, 255);
    factory.paddleTop = factory.createObject('Paddle', Constants().STAGE_WIDTH/2, 20, 255, 255, 255);

    for(let i = 0; i < numBalls; i++){
        factory.createObject('Ball', Constants().STAGE_WIDTH/2, Constants().STAGE_HEIGHT/2, Math.random()*255, Math.random()*255, 0);
    }

    factory.randomizeBalls();
}


function playerMove(data){


    let player = data.player,
        key = data.key;

    let paddle;

    player === 1 ? paddle = factory.paddleBottom : paddle = factory.paddleTop;

    switch(key){
        case 'left':
            paddle.accX(-Constants().PADDLE_FORCE);
            break;
        case 'right':
            paddle.accX(Constants().PADDLE_FORCE);
            break;
    }

}

function GameUpdate(){
    factory.update();
    io.sockets.emit('gameShow', { DrawArray : factory.show() })
}

function Constants(){
    return { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 3, TRANSFER_COEFFICIENT : 0.4, PADDLE_FORCE: 7};
}

module.exports = {

    Main: Main,
    Constants : Constants,
    GameUpdate : GameUpdate,
    setIO : setIO,
    playerMove : playerMove

};