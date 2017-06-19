/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

let players = 0;

let port = process.env.PORT || 3000;

let server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.set('view engine', 'ejs');
app.use('/Client', express.static('Client'));

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

}

function ProcessDisconnection(socket){
    console.log("Error");
}


// this will server our index.html file (formerly our index.html)
// using EJS so we can live update the score...once i figure out how to get the score from ServerMain back over here...
app.get('/', (req, res) => res.render('index'));

Main.Main();

Main.setIO(io);

setInterval( () => Main.GameUpdate(), 16.6);



