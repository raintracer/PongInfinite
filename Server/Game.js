/**
 * Created by Vampiire on 7/27/17.
 */

module.exports = Game;

const stageWidth = 400;
const stageHeight = 500;
const chaos = 3;
const transferCoefficient = 0.4;
const paddleForce = 6;

const ObjectFactory = require('./Game/ObjectFactory');
const Score = require('./Game/Score');

function Game (GAME_ARRAY, id, socket) {

    // this.route = name of dynamic lobby route given by player
    this.GAME_ARRAY = GAME_ARRAY;
    this.id = id;
    this.close = false;
    this.factory = new ObjectFactory();
    this.socket = socket;
    this.players = [];
    this.gameInstance = null;
    this.MaxPlayers = 4;
    this.score = new Score();

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

    };

    // CLEAR UPDATE INTERVAL AND DELETE SELF
    this.Quit = function(){
        clearInterval(interval);
        this.close = true;
    };
    
    this.GetPlayerCount = function(){
        return players.length;
    };

    this.AddPlayer = function(playerID){
        players.push(playerID);
    };

    this.interval = setInterval(function(){this.Update;}, 16.6);

};

/**
 * Created by Vampiire on 6/19/17.
 */



// // set global (ServerMain scope) socket IO
// let io;
// function setIO(appIO){
//     io = appIO;
// }

// function Move(data){

//     let player = data.player,
//         key = data.key;

//     let paddle;

//     // assign the paddle based on player
//     player === 1 ? paddle = factory.paddleBottom : paddle = factory.paddleTop;

//     switch(key){
//         case 'left':
//             paddle.accX(-Constants.paddleForce);
//             break;
//         case 'right':
//             paddle.accX(Constants.paddleForce);
//             break;
//         case 'up':
//             // let laser = factory.createObject('Laser', paddle.x, paddle.topEdge() + (paddle.orientation()*20), 255, 0, 0);
//             // laser.accY(paddle.orientation() * 10);
//             paddle.fire();
//     }

// }