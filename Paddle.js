/**
 * Created by Richard Tyler on 5/21/2017.
 */

module.exports = Paddle;
const GameObject = require('./GameObject');
const Constants = require('./ServerMain').Constants;

// paddle object, inherits gameobject properties
// color can be passed or defaults to white (255, 255, 255)
function Paddle(player, id, x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,id,x,y,red, green, blue);
    this.type = "Paddle";
    this.player = player;
    const LASER_SPEED = 2;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 15;

// dampening coefficient used when imparting the velocity of the paddle to the ball during collision
    this.dampen = .4;

// show method of the paddle, draws the paddle object as a rectangle of specified color, width, height, and position
    this.show = function(){



        fill(this.red, this.green, this.blue);
        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        fill(255,0,0);
        triangle(this.x-10, this.y+(this.orientation()*10), this.x, this.y+(this.orientation()*30), this.x+10, this.y+(this.orientation()*10));
    };

    this.PaddleUpdate = function() {

        // // CONTROLS
        // if (this.player === 2) {
        //
        //     if (keyIsDown(LEFT_ARROW)) {
        //         this.accX(-PADDLEACC);
        //         // laserBottom.accX(-PADDLEACC);
        //     }
        //     else if (keyIsDown(RIGHT_ARROW)) {
        //         this.accX(PADDLEACC);
        //         // laserBottom.accX(PADDLEACC);
        //     }
        //
        //     if (keyIsDown(UP_ARROW)) {
        //         let newLaser = objectFactory.createObject("Laser", this.x, this.y + this.h*this.orientation(), Math.random()*255, Math.random()*255, Math.random()*255);
        //         newLaser.accY(LASER_SPEED*this.orientation());
        //         // laserBottom.accX(PADDLEACC);
        //     }
        //
        // }
        // else if (this.player === 1) {
        //
        //     if (keyIsDown(65)) {
        //         this.accX(-PADDLEACC);
        //         // laserTop.accX(-PADDLEACC);
        //     }
        //     else if (keyIsDown(68)) {
        //         this.accX(PADDLEACC);
        //         // laserTop.accX(PADDLEACC);
        //     }
        // }

        this.update();

    };

    this.orientation = function(){
        if (this.player===1){
            return 1;
        }
        else if (this.player===2){
            return -1;
        }
    }

}
