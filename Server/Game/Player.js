

const Camera = require('./Camera');

function Player(Game, socket, id){

    this.Game = Game;
    this.socket = socket,
    this.id = id;
    this.paddle;
    this.Camera = new Camera(this.Game, 0,0);
    
    // EXAMPLE PROPERTIES
    let name;
    let color;
    let paddle;
    let strip;

    this.CenterCameraOnPaddle = function(){
        this.Camera.SetPosition(this.paddle.x, this.paddle.y);
        // console.log (`Camera for Player ${this.id} has been moved to (${this.Camera.x}, ${this.Camera.y})`)
    };

}

module.exports = Player;