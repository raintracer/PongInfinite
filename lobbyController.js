/**
 * Created by Vampiire on 7/28/17.
 */

const Game = require('./Server/Game');

// processDisconnect

// ----------- LOBBY METHODS ------------- //
const Games = [];
let gamesMade = 0;

checkGames = () => {
    let AvailableGameIndex = getAvailableGameIndex();
    if (AvailableGameIndex === -1){
        console.log ("No available game found: Create new game.");
        let Game = createGame(io);
        Game.AddPlayer(socket);
    } else{
        console.log ("Add player to existing game.");
        Game = GAME_ARRAY[AvailableGameIndex];
        Game.AddPlayer(socket);
    }
};

createGame = (io) => {
    gamesMade++;
    let nameSpace = io.of(`/${gamesMade}`);
    console.log(nameSpace);
    // let newGame = new Game(Games, gamesMade, nameSpace);
    // Games.push(newGame);
    // return newGame;
};


closeGame = (gameID) => {
    let n = Games.length;
    while(n--){
        if(Games[n].id === gameID){
            Games.splice(n, 1);
            break;
        }
    }
};

// -------------- HELPERS ---------------

// RETURNS THE INDEX OF A GAME THAT IS NOT FULL OF PLAYERS, IF NONE ARE AVAILABLE RETURN -1
getAvailableGameIndex = () => {

    console.log (`Checking available games. Number of games: ${Games.length}`);
    // CHECK IF NO GAMES EXIST
    if (Games.length === 0) {
        console.log ("No games found.");
        return -1;
    }

    // LOOK THROUGH AVAILABLE GAMES FOR AN OPEN SLOT
    for (let i = 0; i < Games.length; i++){
        console.log(`Checking player length of Game ${i}: ${Games[i].players.length} players.`);
        if (Games[i].players.length < Games[i].MaxPlayers) {
            return i;
        }
    }

    // IF NO MATCH IS FOUND, RETURN -1
    return -1;

};


// SEARCH EACH GAME AND PROCESS A DISCONNECT FOR THE SPECIFIED PLAYER
removePlayer = (socket) => {
    Games.forEach( (e, index) => {
        let player = e.players.indexOf(socket);
        if(player){
            e.players.splice(player, 1);
            return Games[index];
        }
    });
};

module.exports = {
    create : createGame,
    close : closeGame
};

