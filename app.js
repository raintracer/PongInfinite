/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

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

const GAME_ARRAY = [];

addPlayer = (playerID) => {

    let addedPlayer = false;

    // GAME_ARRAY.forEach( (e, i, a) => {
    //     if(e.players.length === 1){
    //         console.log(`adding a new player...${e.players}`);

    //         e.players.push(playerID);
    //         addedPlayer = true;

    //         break;
    //     }
    // });

    for (let i = 0; i < GAME_ARRAY.length; i++){
        let e = GAME_ARRAY[i];
        if(e.players.length === 1){
            console.log(`adding a new player...${e.players}`);

            e.players.push(playerID);
            addedPlayer = true;

            break;
        }
    }

    if(!addedPlayer){
        console.log('all lobbies are full, new lobby created');
        createGame(playerID);
    }
};

// CREATE A NEW INSTANCE OF THE GAME AND RETURN A HANDLE TO IT
createGame = (socket, playerID) => {
    GAME_ARRAY.push(new Game(GAME_ARRAY, GAME_ARRAY.length, playerID));
    return GAME_ARRAY[GAME_ARRAY.length-1];
}

// RETURNS THE INDEX OF A GAME THAT IS NOT FULL OF PLAYERS, IF NONE ARE AVAILABLE RETURN -1
getAvailableGameIndex = () =>{

    // LOOK THROUGH AVAILABLE GAMES
    for (let i = 0; i < GAME_ARRAY.length; i++){
        
        if (GAME_ARRAY[i].player.length < PLAYER_MAX) {
            return i;
        } 

    }

    return -1;

}

// SEARCH EACH GAME AND PROCESS A DISCONNECT FOR THE SPECIFIED PLAYER
removePlayer = (playerID) => {
    GAME_ARRAY.forEach( (e, index) => {
        let player = e.players.indexOf(playerID);
        if(player){
            e.players.splice(player, 1);
            resetGame(e);
            return index;
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

    let AvailableGameIndex = getAvailableGameIndex();
    if (AvailableGameIndex = -1){
        let Game = createGame(GAME_ARRAY, socket);
        Game.AddPlayer(socket.id);
    } else{
        Game.AddPlayer(socket.id);
    }

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
        // Main.Move(data); OBSOLETE, REPLACE WITH PROPER FUNCTIONALITY.
    });

    socket.on('disconnect', ProcessDisconnection);

}

function ProcessDisconnection(socket){
    // console.log(`Player ${players.length} disconnected`);
    // console.log(`before ${GAME_ARRAY.length}`);
    let GameIndex = removePlayer(socket);
    if (GameIndex){
        endGame(GameIndex);
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




