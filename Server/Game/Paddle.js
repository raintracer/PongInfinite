/**
 * Created by Richard Tyler on 5/21/2017.
 */

module.exports = Paddle;
const GameObject = require('./GameObject');
// const Constants = require('./ServerMain').Constants;

// paddle object, inherits gameobject properties
// color can be passed or defaults to white (255, 255, 255)
function Paddle(Factory, player, id, x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,Factory,id,x,y,red, green, blue);
    this.Factory = Factory;
    this.type = "Paddle";
    this.shape = 'rect';
    this.player = player;
    this.imagetype = "Paddle1";
    const LASER_SPEED = 2;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 20;

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

// LASERS!

    const LASER_ARRAY = [];

    this.populateLasers = () =>{
        let numberOfLasers = 4;
        while(numberOfLasers--){
            let laser = Factory.createObject('Laser', this.x, this.y, 255, 0, 0, this);


        /*
            positions the lasers based on the left edge of the paddle and the width of the lasers
            this is wonky and only works well for this specific case (number of lasers / widths)
                need to consider options for placing the lasers. designate slots in the paddle?
                    how would the number of lasers changing affect this?


            width of the paddle / ( number of lasers + 1 ) = slot
                1st:
                    NoL = 3 + 1 = 4
                    paddle.w = 75
                    paddle.w / NoL = slot = 75/4 = 19
                    slot / 2 = laser.x = 19/2 = 8.5
                 2nd:
                     NoL = 2 + 1 = 3
                     paddle.w = 75
                     paddle.w / NoL = slot = 75/3 = 25
                     slot / 2 = laser.x = 25/2 = 12.5
                 4th:
                    NoL = 0 + 1 = 1
                    paddle.w = 75
                    paddle.w / NoL = 75
                    slot = 75 / 2 = 37.5

         */
            laser.paddleSlot = numberOfLasers;

            laser.x = this.leftEdge() + (numberOfLasers*laser.w) + laser.w;


            LASER_ARRAY.push(laser);
        }
        return LASER_ARRAY
    };

    // this.arrangeLasers = () => {
    //
    //     LASER_ARRAY.forEach( e => {
    //
    //             e.y = this.y;
    //             switch(e.paddleSlot){
    //                 case 0:
    //                     e.x = this.x - (1.2*e.w);
    //                     break;
    //                 case 1:
    //                     e.x = this.x;
    //                     break;
    //                 case 2:
    //                     e.x = this.x + (1.2*e.w);
    //                     break;
    //             }
    //     });
    // };

    this.fire = () => {

        if(LASER_ARRAY.length > 0){
            let firedLaser;

            LASER_ARRAY.forEach( e => {
                !e.shot ? firedLaser = e : false;
            });

            if(firedLaser){

                firedLaser.shot = true;
                firedLaser.direction = this.orientation();

                // direct the laser according to the orientation of the paddle from which it was shot
                let position;
                firedLaser.direction === 1 ? position = this.bottomEdge() : position = this.topEdge();

                firedLaser.y = position + (firedLaser.direction*20);
                firedLaser.accY(firedLaser.direction * 5);
            }


        }else{
            // empty gun click sound effect / signify lasers are all in use
                // allow X number of lasers to each player
                // only that many lasers can be fired at any given time
        }
    };

    this.resetLaser = (laserID) =>{
        LASER_ARRAY.forEach( e => {
            if(e.id === laserID){
                e.y = this.y;
                e.x = this.leftEdge() + ( e.paddleSlot*e.w ) + e.w;
            }
        });
    };

    this.shrink = () => {

        const paddleFactor = 0.95;
        const laserFactor = 0.9;

        this.w *= paddleFactor;
        LASER_ARRAY.forEach( e => {
            // assumes elliptical shape of laser
            e.w *= laserFactor;
            e.h *= laserFactor;
        });
    };

}
