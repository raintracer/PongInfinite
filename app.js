/**
 * Created by Vampiire on 5/22/17.
 */

// const Controller = require('./Controller');

let express = require('express'), app = express();
let players = 0;

let port = process.env.PORT || 3000;

let server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});

app.use(express.static('Public'));
// app.use('/', Controller);

// let gameStateController = require('./Unused/controllers/gameStateController');

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', ProcessConnection);
io.sockets.on('connect_error', ProcessDisconnection);

function ProcessConnection(socket){

    console.log("Connected");

    socket.on('shootKey', function(data){

        console.log(socket.id);
        console.log(data);

        io.sockets.emit('serverKeyPress', data);

    });

    socket.once('RequestPlayer', function(data){
        players++;
        socket.emit('AssignPlayer',{player:players});
    });

    socket.on('PushClientUpdate', function(data){

        socket.broadcast.emit('PushServerUpdate', data);

    });

}

function ProcessDisconnection(socket){
    console.log("Error");
}

const Main = require('./ServerMain');

Main.setIO(io);

setInterval(function(){
    Main.GameUpdate(io);
}, 16.6);

// module.exports = {
//
//     server : server
// };