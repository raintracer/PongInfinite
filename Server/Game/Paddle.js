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
    this.player = player;
    const LASER_SPEED = 2;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 15;

// dampening coefficient used when imparting the velocity of the paddle to the ball during collision
    this.dampen = .4;


    this.orientation = function(){
        if (this.player===1){
            return -1;
        }
        else if (this.player===2){
            return 1;
        }
    };


    this.paddleHit = function(){

      parent.gameObjects.forEach( e => {

          if(e.type === 'Laser'){

              if(e.laserHit(this)){

                  console.log('struck by laser');

              }

          }

      });

    }

}
