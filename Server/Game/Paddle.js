/**
 * Created by Richard Tyler on 5/21/2017.
 */

module.exports = Paddle;
const GameObject = require('./GameObject');
const Constants = require('./ServerMain').Constants;

// paddle object, inherits gameobject properties
// color can be passed or defaults to white (255, 255, 255)
function Paddle(parent, player, id, x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,parent,id,x,y,red, green, blue);
    this.parent = parent;
    this.type = "Paddle";
    this.shape = 'rect';
    this.player = player;
    const LASER_SPEED = 2;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 15;

// dampening coefficient used when imparting the velocity of the paddle to the ball during collision
    this.dampen = .4;

// returns orientation of the paddle
    this.orientation = function(){
        if (this.player===1){
            return -1;
        }
        else if (this.player===2){
            return 1;
        }
    };

// laser bits

    const LASER_ARRAY = [];

    this.populateLasers = () =>{
        let numberOfLasers = 2;
        while(numberOfLasers--){
            let laser = parent.createObject('Laser', this.x, this.topEdge() + (this.orientation()*20), 255, 0, 0);
            LASER_ARRAY.push(laser);
        }

        return LASER_ARRAY
    };

    this.arrangeLasers = () => {
        LASER_ARRAY.forEach( (e, i) => {
            switch(i){
                case 0:
                    e.x = this.leftEdge();
                    break;
                case 1:
                    e.x = this.x;
                    break;
                case 2:
                    e.x = this.rightEdge();
                    break;
            }
        });
    };

    this.fire = () => {
        if(LASER_ARRAY.length > 0){
            let firedLaser = LASER_ARRAY.pop();
            firedLaser.shot = true;
            firedLaser.accY(this.orientation() * 10);
        }else{
            // empty gun click sound effect / signify lasers are all in use
                // allow X number of lasers to each player
                // only that many lasers can be fired at any given time
        }
    };

}
