/**
 * Created by Vampiire on 7/27/17.
 */

module.exports = Game;



const ObjectFactory = require('./Game/ObjectFactory');
const Player = require('./Game/Player');
const Camera = require('./Game/Camera');
const Score = require('./Game/Score');

function Game (GAME_ARRAY, id, io) {

    // this.route = name of dynamic lobby route given by player
    this.GAME_ARRAY = GAME_ARRAY;
    this.id = id;
    this.close = false;
    this.factory = new ObjectFactory();
    this.io = io;
    this.players = [];

    this.gameInstance = null;
    this.MaxPlayers = 5;
    this.score = new Score();
    this.lobby = true;

    this.Arena;

    this.Update = function(){

        if (this.lobby===true){
            this.LobbyUpdate();
        } else{
            this.GameUpdate();
        }
        
    };

    this.LobbyUpdate = function(){
        // For now, wait patiently.
    };

    this.GameUpdate = function(){
        this.factory.update();
        this.GameShow();
        this.players[0].camera.y +=5;
        if (this.players[0].camera.y>this.factory.Constants.STAGE_HEIGHT/2){
            this.players[0].camera.y-=this.factory.Constants.STAGE_HEIGHT;
        }
    };

    this.GameShow = function(){
        
        this.players.forEach( (e,i,a) => {
           
            // REQUEST AND EMIT THE DRAW ARRAY FOR THE GAME
            data = {
                DrawArray: this.factory.show(e.camera, this.factory.Constants.STAGE_WIDTH, this.factory.Constants.STAGE_HEIGHT)
            };
            e.socket.emit('gameShow', data);

        });
        
    };
    
    // SETUP THE GAME
    this.StartGame = function (){

        // Create an Arena instance

        const numBalls = 10;

        this.factory.paddleBottom = this.factory.createObject('Paddle', this.factory.Constants.STAGE_WIDTH / 2, this.factory.Constants.STAGE_HEIGHT - 20, 255, 255, 255);
        this.factory.paddleBottom.populateLasers();
        this.factory.paddleTop = this.factory.createObject('Paddle', this.factory.Constants.STAGE_WIDTH / 2, 20, 255, 255, 255);
        this.factory.paddleTop.populateLasers();

        for (let i = 0; i < numBalls; i++) {
            this.factory.createObject('Ball', this.factory.Constants.STAGE_WIDTH / 2, this.factory.Constants.STAGE_HEIGHT / 2, 0, 0, 255);
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

    this.AddPlayer = function(socket){
        console.log(`Player ${socket.id} added.`);
        this.players.push(new Player(socket, this.GetPlayerCount() + 1));
        this.players[this.GetPlayerCount()-1].camera = new Camera(this.factory.Constants.STAGE_WIDTH/2, (this.GetPlayerCount()-1)*this.factory.Constants.STAGE_HEIGHT);
        
        console.log (`Game ${this.id} has ${this.GetPlayerCount()} players now.`);
        
        if (this.GetPlayerCount() === this.MaxPlayers){
            this.StartGame();
        }
        
    };

    let that = this;
    this.interval = setInterval(function(){ return that.Update(); }, 16.6);

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