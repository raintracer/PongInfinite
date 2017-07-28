/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Game = require('./Server/Game');

const PLAYER_MAX = 2;

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

let GAME_ARRAY = [];

// CREATE A NEW INSTANCE OF THE GAME AND RETURN A HANDLE TO IT
createGame = (socket, playerID) => {
    GAME_ARRAY.push( new Game(GAME_ARRAY, GAME_ARRAY.length, playerID) );
    console.log("Game created:");
    console.log(`Number of games: ${GAME_ARRAY.length}`);
    return GAME_ARRAY[GAME_ARRAY.length-1];
}

// RETURNS THE INDEX OF A GAME THAT IS NOT FULL OF PLAYERS, IF NONE ARE AVAILABLE RETURN -1
getAvailableGameIndex = () => {

    console.log (`Checking available games. Number of games: ${GAME_ARRAY.length}`)
    // CHECK IF NO GAMES EXIST
    if (GAME_ARRAY.length === 0) {
        console.log ("No games found.");
        return -1;
    } 

    // LOOK THROUGH AVAILABLE GAMES FOR AN OPEN SLOT
    for (let i = 0; i < GAME_ARRAY.length; i++){
        console.log(`Checking player length of Game ${i}: ${GAME_ARRAY[i].players.length} players.`)
        if (GAME_ARRAY[i].players.length < PLAYER_MAX) {
            return i;
        } 
    }

    // IF NO MATCH IS FOUND, RETURN -1
    return -1;

}

// SEARCH EACH GAME AND PROCESS A DISCONNECT FOR THE SPECIFIED PLAYER
removePlayer = (socket) => {
    GAME_ARRAY.forEach( (e, index) => {
        let player = e.players.indexOf(socket.id);
        if(player){
            e.players.splice(player, 1);
            return GAME_ARRAY[index];
        }
    });
};

// END THE GAME IN THE SPECIFIED INDEX
endGame = (GameIndex) => {

    GAME_ARRAY[GameIndex].Quit;
    GAME_ARRAY.splice(GameIndex, 1);

    // GAME_ARRAY.forEach( (e, i, a) => {
    //     if(e.players.length === 0){
    //         clearInterval(e.gameInstance);
    //         a.splice(i, 1);
    //     }
    // });
};

io.sockets.on('connection', ProcessConnection);

// ASSIGN PLAYERS STEP 1)
function ProcessConnection(socket) {

    let Game;
    let AvailableGameIndex = getAvailableGameIndex();
    if (AvailableGameIndex === -1){
        console.log ("No available game found: Create new game.");
        Game = createGame(GAME_ARRAY, socket);
        Game.AddPlayer(socket.id);
    } else{
        console.log ("Add player to existing game.");
        Game = GAME_ARRAY[AvailableGameIndex];
        Game.AddPlayer(socket.id);
    }

    socket.on('keyPress', function (data) {
        // Main.Move(data); OBSOLETE, REPLACE WITH PROPER FUNCTIONALITY.
    });

    socket.on('disconnect', ProcessDisconnection);
    
}

function ProcessDisconnection(socket){
    // console.log(`Player ${players.length} disconnected`);
    // console.log(`before ${GAME_ARRAY.length}`);
    console.log ("Disconnect detected.");

    let Game = removePlayer(socket);
    if (Game){
        if (Game.players.length===0){
            endGame(Game.id);
        }
    } else {
        console.log("Player to be removed not found.");
    }
    console.log(GAME_ARRAY[0].players.length);
    
    // console.log(`after ${GAME_ARRAY.length}`);
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




