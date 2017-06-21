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




