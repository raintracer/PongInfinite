/**
 * Created by Vampiire on 7/27/17.
 */

const Main = require('')
const ObjectFactory = require('./Game/ObjectFactory');


Lobby = (socket) => {

    // this.route = name of dynamic lobby route given by player
    this.close = false;
    this.factory = new ObjectFactory();
    this.socket = socket;
    this.players = [];
    this.gameInstance = null;

    this.Update = function(){
        this.factory.update();
    };
    
    // SETUP THE GAME
    this.StartGame = function (){
        
        // set number of balls
        const numBalls = 10;

        factory.paddleBottom = factory.createObject('Paddle', Constants.stageWidth / 2, Constants.stageHeight - 20, 255, 255, 255);
        factory.paddleBottom.populateLasers();
        factory.paddleTop = factory.createObject('Paddle', Constants.stageWidth / 2, 20, 255, 255, 255);
        factory.paddleTop.populateLasers();

        for (let i = 0; i < numBalls; i++) {
            factory.createObject('Ball', Constants.stageWidth / 2, Constants.stageHeight / 2, 0, 0, 255);
        }

        factory.randomizeBalls();

    }

    this.Quit = function(){
        clearInterval(interval);
        this.close = true;
    };
    
    this.GetPlayerCount = function(){
        return players.length;
    }

    let interval = setInterval(this.update(), 16.6);

};

/**
 * Created by Vampiire on 6/19/17.
 */

const Score = require('./Score');
const score = new Score();

// // set global (ServerMain scope) socket IO
// let io;
// function setIO(appIO){
//     io = appIO;
// }

function Move(data){

    let player = data.player,
        key = data.key;

    let paddle;

    // assign the paddle based on player
    player === 1 ? paddle = factory.paddleBottom : paddle = factory.paddleTop;

    switch(key){
        case 'left':
            paddle.accX(-Constants.paddleForce);
            break;
        case 'right':
            paddle.accX(Constants.paddleForce);
            break;
        case 'up':
            // let laser = factory.createObject('Laser', paddle.x, paddle.topEdge() + (paddle.orientation()*20), 255, 0, 0);
            // laser.accY(paddle.orientation() * 10);
            paddle.fire();
    }

}