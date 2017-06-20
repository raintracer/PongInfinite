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

    socket.once('RequestPlayer', function (data) {
        players++;
        socket.emit('AssignPlayer', {player: players});
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



Main.Main();

Main.setIO(io);

setInterval( () => Main.GameUpdate(), 16.6);



