/**
 * Created by Vampiire on 7/28/17.
 */

const Game = require('./Game');
// const server = require('../app');



const Lobbies = [];

createLobby = (io) => {

    //eventually accept user named routes here

    let route = Lobbies.length;
    let nameSpace = io.of(`/${route}`);
    let game = new Game(nameSpace);
        // set up listeners / emitters internal to the lobby

    // initiateLobby

};

initiateLobby = (lobby) => {
    // call lobby initiation methods
};

closeLobby = (lobby) => {
    Lobbies.forEach( lobby => lobby.shutdown ? lobby.close : false);
};

module.exports = {
    create : createLobby,
    initiate : initiateLobby,
    close : closeLobby
};