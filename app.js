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

// pass IO to ServerMain
Main.setIO(io);

io.sockets.on('connection', ProcessConnection);
io.sockets.on('connect_error', ProcessDisconnection);

// ASSIGN PLAYERS STEP 1)
function ProcessConnection(socket) {

    console.log(`Connected to Player [${players + 1}]`);

    socket.once('RequestPlayer', function (data) {

        players++;

        socket.emit('AssignPlayer', {player: players});

    // once two players have connected call ServerMain --> Create()
        // ASSIGN PLAYERS STEP 2)
        if(players === 2){
            Main.Create();
        }

    });

    socket.on('keyPress', function (data) {
        Main.Move(data);
    });

}

function ProcessDisconnection(socket){
    console.log("Player Disconnected");
}

/*

// ---------- ASSIGN PLAYERS
1) [client] emit RequestPlayer --> send a request to the server to be assigned as a player
2) [server] once, each connection, RequestPlayer --> increment player count and emit the player number assignment
   when playerCount === 2 call Create() and move to STARTUP
3) [client] once AssignPlayer --> call assignPlayer() client side and assign the player number to the player variable

// ---------- STARTUP

1) [server] create objects executing Create() --> create paddles and ball(s) and call Preload()
2) [server] emit preLoad --> send preLoad data of all objects created in Create()
3) [client] on preLoad --> pre load the GameGraphics
4) [server] call Start() --> setInterval for Update THEN call randomizeBalls()

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



