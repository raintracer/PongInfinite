/**
 * Created by Vampiire on 5/22/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const controller = require('./controller');
// const Game = require('./Server/Game');
const app = express();

let port = process.env.PORT || 3000;

module.exports = server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.set('view engine', 'ejs');

app.use(express.static('Client'));
app.use('/', controller);

// let socket = require('socket.io');
// let io = socket(server);

// io.sockets.on('connection', ProcessConnection);
//
// // ASSIGN PLAYERS STEP 1)
// function ProcessConnection(socket) {
//
//     let Game;
//     let AvailableGameIndex = getAvailableGameIndex();
//     if (AvailableGameIndex === -1){
//         console.log ("No available game found: Create new game.");
//         Game = createGame(io);
//         Game.AddPlayer(socket);
//     } else{
//         console.log ("Add player to existing game.");
//         Game = GAME_ARRAY[AvailableGameIndex];
//         Game.AddPlayer(socket);
//     }
//
//     socket.on('keyPress', function (data) {
//         // Main.Move(data); OBSOLETE, REPLACE WITH PROPER FUNCTIONALITY.
//     });
//
//     socket.on('disconnect', ProcessDisconnection);
//
// }
//
// function ProcessDisconnection(socket){
//     // console.log(`Player ${players.length} disconnected`);
//     // console.log(`before ${GAME_ARRAY.length}`);
//     console.log ("Disconnect detected.");
//
//     let Game = removePlayer(socket);
//     if (Game){
//         if (Game.players.length===0){
//             endGame(Game.id);
//         }
//     } else {
//         console.log("Player to be removed not found.");
//     }
//     console.log(GAME_ARRAY[0].players.length);
//
//     // console.log(`after ${GAME_ARRAY.length}`);
//     // players.splice(players.indexOf(socket.id), 1);
// }



/*

Issues:
io.sockets.on('disconnect') is not working. does not correctly declare the disconnections

on server reset the game is locked up becuase it instantly assigns both players as player 1 when they try to reconnect
to the server

Next:
add a collision detection exporter than can send object collision info and trigger sound


 */




