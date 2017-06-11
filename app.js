/**
 * Created by Vampiire on 5/22/17.
 */

let express = require('express'), app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});

app.use(express.static('Public'));


// let gameStateController = require('./Unused/controllers/gameStateController');

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', ProcessConnection);
io.sockets.on('connect_error', ProcessDisconnection);

function ProcessConnection(socket){
    console.log("Connected");
}

function ProcessDisconnection(socket){
    console.log("Error");
}