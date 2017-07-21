/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

let players = [];

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

const LOBBY_ARRAY = [];

// Game constructor
function GameLobby(player){
    console.log('called');
    this.players = [player];
    this.gameInstance = null;
}

addPlayer = (player) => {
    LOBBY_ARRAY.forEach( e => {
        if(e.players.length === 1){
            e.players.push(player);
            e.gameInstance = Main.Create();
        }
    });
};

removePlayer = (playerID) => {
    LOBBY_ARRAY.forEach( e => {
        let player = e.players.indexOf(playerID);

        if(player){
            e.players.splice(player, 1);
        }
    });
};

endGame = () => {
    LOBBY_ARRAY.forEach( (e, i, a) => {
        if(e.gameInstance !== null && e.players.length === 0){
            clearInterval(e.gameInstance);
            a.splice(i, 1);
        }
    });
};

io.sockets.on('connection', ProcessConnection);

// ASSIGN PLAYERS STEP 1)
function ProcessConnection(socket) {



    LOBBY_ARRAY.length === 0 ? LOBBY_ARRAY.push(new GameLobby(socket.id)) : addPlayer(socket.id);
    console.log('lobby array', LOBBY_ARRAY.length);
    console.log('players length: ', LOBBY_ARRAY[0].players.length);

    // players.push(socket.id);

    // socket.emit('AssignPlayer', {player: players.length});

// once two players have connected call ServerMain --> Create()
    // ASSIGN PLAYERS STEP 2)
    // if(players.length === 2){
    //     console.log (Main.Create());
    //     console.log(players);
    // }

    socket.on('keyPress', function (data) {
        Main.Move(data);
    });

    socket.on('disconnect', ProcessDisconnection);

}

function ProcessDisconnection(socket){
    // console.log(`Player ${players.length} disconnected`);
    // console.log(`before ${LOBBY_ARRAY.length}`);
    removePlayer(socket);
    console.log(LOBBY_ARRAY[0].players.length);
    endGame();
    // console.log(`after ${LOBBY_ARRAY.length}`);
    // players.splice(players.indexOf(socket.id), 1);
}



/*

Issues:
io.sockets.on('disconnect') is not working. does not correctly declare the disconnections

on server reset the game is locked up becuase it instantly assigns both players as player 1 when they try to reconnect
to the server

Next:
add a collision detection exporter than can send object collision info and trigger sound


 */




