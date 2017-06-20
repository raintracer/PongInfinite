/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

let players = 0;
let score;
let clientCount = 0;

let port = process.env.PORT || 3000;

let server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.set('view engine', 'ejs');
app.use(express.static('Client'));

const Main = require('./Server/Game/ServerMain');

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', ProcessConnection);
io.sockets.on('connect_error', ProcessDisconnection);

function ProcessConnection(socket) {

    console.log("Connected");

    // Main.preLoad();

    socket.once('RequestPlayer', function (data) {

        console.log(JSON.stringify(data));
        console.log('player', players);

        players++;

        socket.emit('AssignPlayer', {player: players});

        Main.preLoad();



    });

    // socket.on('requestPreload', data => {
    //
    //     console.log('requesting preload', data.player);
    //
    //
    //     while(players--){
    //         Main.preLoad();
    //     }
    //
    //
    //
    // });

    socket.on('clientReady', data => {

        // if(data.ready){

            Main.Main();

        // }



    });

    socket.on('keyPress', function (data) {

        Main.playerMove(data);

    });

    socket.on('score', data => {

        score = data;

        // console.log(score);

    });

}

function ProcessDisconnection(socket){
    console.log("Error");
}



// Main.Main();

Main.setIO(io);
setInterval(() => Main.GameUpdate(), 16.6);

// Main.preLoad();



// setInterval( () => Main.GameUpdate(), 16.6);


// [server] preload emit --> [client] preload graphics, emit ready -->
// [server] call Main() --> [server] Main() calls setInterval(GameUpdate()) -->
// game begins

/*

// ---------- STARTUP

1) [server] create objects Create() --> create paddles and ball(s)
2) [server] emit preLoad --> send preLoad data about paddle and ball(s)
3) [client] on preLoad --> pre load the GameGraphics
4) [client] emit clientReady --> send clientReady data { player, ready }
5) [server] on clientReady --> check if both clients have declared ready
6) [server] both clientReady --> call Main()
7) [server] execute Main() --> setInterval for GameUpdate THEN call randomizeBalls()

// --------- GAMEPLAY

Update (continuous setInterval, 60fps aka every 16.6ms)
1) [server] setInterval loop --> executes GameUpdate every 60frames (1000/60 ~ 16.6ms)
2) [server] GameUpdate() --> iterates through gameObjects and gathers new object data points
3) [server] emit GameShow() --> passes updated gameObjects data array back to client
4) [client] on GameShow() --> iterates through gameObjects array data and updates the clients' graphics

Collision
1) [server] detect collision --> gather collision object data
2) [server] emit Collision --> send sound / animation trigger to clients
3) [client] on Collision --> trigger sound / animation

Score
1) [server] detect point score --> gather point data
2) [server] emit updateScore --> send score data { topScore, bottomScore }
3) [client] on updateScore --> update the clients' score divs

Keypresses
1) [client] emit keyPress --> send keyPress data { player, key }
2) [server] on keyPress --> register keyPress movement and proceed back to GameUpdate

 */



