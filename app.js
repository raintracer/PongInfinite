/**
 * Created by Vampiire on 5/22/17.
 */


const express = require('express'), app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
    console.log(`listening on port ${port}`);
});

app.set('view engine', 'ejs');

app.use(express.static('assets'));

const gameStateController = require('./Unused/controllers/gameStateController');

const socket = require('socket.io');
const io = socket();

io.sockets.on('Connection', ProcessConnection);

function ProcessConnection(){

}