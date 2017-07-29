/**
 * Created by Vampiire on 7/29/17.
 */

const express = require('express');
const router = module.exports = express.Router();
const server = require('./app');
const lobbyController = require('./lobbyController');
const socket = require('socket.io');
const io = socket(server);

// change to / to bring up the splash page of the game. link to lobby

io.sockets.on('connection', socket => {

});

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/Client/index.html`);
});

router.get('/lobby', (req, res) => {

});
