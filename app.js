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

let socket = require('socket.io');
let io = socket(server);

// pass IO to ServerMain
// Main.setIO(io);

const GAME_ARRAY = [];

addPlayer = (playerID) => {

    let addedPlayer = false;

    GAME_ARRAY.forEach( (e, i, a) => {
        if(e.players.length === 1){
            console.log(`adding a new player...${e.players}`);

            e.players.push(playerID);
            addedPlayer = true;

            break;
        }
    });

    if(!addedPlayer){
        console.log('all lobbies are full, new lobby created');
        createGame(playerID);
    }
};

// CREATE A NEW INSTANCE OF THE GAME
createGame = (socket, playerID) => {
    GAME_ARRAY.push(new Game(GAME_ARRAY, GAME_ARRAY.length, playerID));
}

// SEARCH EACH GAME AND PROCESS A DISCONNECT FOR THE SPECIFIED PLAYER
removePlayer = (playerID) => {
    GAME_ARRAY.forEach( e => {
        let player = e.players.indexOf(playerID);
        if(player){
            e.players.splice(player, 1);
            resetGame(e);
        }
    });
};

// SEARCH ALL GAMES FOR AN EMPTY ONE TO DISBAND
endGame = () => {
    GAME_ARRAY.forEach( (e, i, a) => {
        if(e.players.length === 0){
            clearInterval(e.gameInstance);
            a.splice(i, 1);
        }
    });
};

io.sockets.on('connection', ProcessConnection);

// ASSIGN PLAYERS STEP 1)
function ProcessConnection(socket) {

    GAME_ARRAY.length === 0 ? GAME_ARRAY.push(new GameLobby(socket.id)) : addPlayer(socket.id);
    console.log('lobby array', GAME_ARRAY.length);
    console.log('players length: ', GAME_ARRAY[0].players.length);

    // players.push(socket.id);

    // socket.emit('AssignPlayer', {player: players.length});

// once two players have connected call ServerMain --> Create()
    // ASSIGN PLAYERS STEP 2)
    // if(players.length === 2){
    //     console.log (Main.Create());
    //     console.log(players);
    // }

    socket.on('keyPress', function (data) {
        // Main.Move(data); OBSOLETE, REPLACE WITH PROPER FUNCTIONALITY
    });

    socket.on('disconnect', ProcessDisconnection);

}

function ProcessDisconnection(socket){
    // console.log(`Player ${players.length} disconnected`);
    // console.log(`before ${GAME_ARRAY.length}`);
    removePlayer(socket);
    console.log(GAME_ARRAY[0].players.length);
    endGame();
    // console.log(`after ${GAME_ARRAY.length}`);
    // players.splice(players.indexOf(socket.id), 1);

    // RTS - PROPOSED IMPROVEMENT
}



/*

Issues:
io.sockets.on('disconnect') is not working. does not correctly declare the disconnections

on server reset the game is locked up becuase it instantly assigns both players as player 1 when they try to reconnect
to the server

Next:
add a collision detection exporter than can send object collision info and trigger sound


 */




