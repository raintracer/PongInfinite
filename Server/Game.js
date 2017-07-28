/**
 * Created by Vampiire on 7/27/17.
 */

module.exports = Game;

const STAGE_WIDTH = 400;
const STAGE_HEIGHT = 500;
const CHAOS = 3;
const TRANSFER_COEFFICIENT = 0.4;
const PADDLE_FORCE = 6;

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
    this.MaxPlayers = 2;
    this.score = new Score();
    this.lobby = true;

    this.Update = function(){
        if (this.lobby===true){
            this.LobbyUpdate;
        } else{
            this.GameUpdate;
        }
    };

    this.LobbyUpdate = function(){
        // For now, wait patiently.
    };

    this.GameUpdate = function(){
        this.factory.update();
    };
    
    // SETUP THE GAME
    this.StartGame = function (){
        
        // set number of balls
        const numBalls = 10;

        this.factory.paddleBottom = factory.createObject('Paddle', stageWidth / 2, stageHeight - 20, 255, 255, 255);
        this.factory.paddleBottom.populateLasers();
        this.factory.paddleTop = this.factory.createObject('Paddle', stageWidth / 2, 20, 255, 255, 255);
        this.factory.paddleTop.populateLasers();

        for (let i = 0; i < numBalls; i++) {
            this.factory.createObject('Ball', stageWidth / 2, stageHeight / 2, 0, 0, 255);
        }

        this.factory.randomizeBalls();
        this.lobby = false;

    };

    // CLEAR UPDATE INTERVAL AND DELETE SELF
    this.Quit = function(){
        clearInterval(this.interval);
        this.close = true;
    };
    
    this.GetPlayerCount = function(){
        return this.players.length;
    };

    this.AddPlayer = function(playerID){
        this.players.push(playerID);
        if (this.players.length === this.MaxPlayers){
            this.StartGame;
        }
    };

    this.interval = setInterval(this.Update, 16.6);

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