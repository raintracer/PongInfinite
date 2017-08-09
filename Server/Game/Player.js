

const Camera = require('./Camera');

function Player(Game, socket, id){

    this.Game = Game;

    this.socket = socket;
    this.id = id;
    this.paddle = {};
    this.Camera = new Camera(this.Game, 0,0);
    
    // EXAMPLE PROPERTIES
    let name;
    let color;
    let paddle;
    let strip;

    this.keys = {
        up:false,
        down:false,
        left:false,
        right:false,
        a:false,
        s:false,
        q:false,
        e:false
    };

    this.Update = function(){

        if (this.keys.up){
            this.Camera.Move(0,-10);
        }
        if (this.keys.down){
            this.Camera.Move(0,10);
        }
        if (this.keys.left){
            this.paddle.accX(-10);
        }
        if (this.keys.right){
            this.paddle.accX(10);
        }

        if  (this.keys.a){
            this.paddle.reflectFactor = 0.75;
        } else if  (this.keys.s){
            this.paddle.reflectFactor = 1.25;
        } else {
            this.paddle.reflectFactor = 1;
        }

        if (this.keys.q){
            this.Camera.moveZ(-.01);
        }
        if (this.keys.e){
            this.Camera.moveZ(+.01);
        }

    };

    this.CenterCameraOnPaddle = function(){
        this.Camera.SetPosition(this.paddle.x, this.paddle.y);
        // console.log (`Camera for Player ${this.id} has been moved to (${this.Camera.x}, ${this.Camera.y})`)
    };

}

module.exports = Player;