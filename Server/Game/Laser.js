/**
 * Created by Vampiire on 5/26/17.
 */

module.exports = Laser;
const GameObject = require('./GameObject');

// const Constants = require('./ServerMain').Constants;

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 10, TRANSFER_COEFFICIENT : 0.4};

function Laser(Factory, paddle, id, x, y, red=255, green=255, blue=255){

    GameObject.call(this, Factory, id, x, y, red, green, blue);

    this.AnimationArray = [.2,.4,.6,.8,1,1,.8,.6,.4, 0.2];
    this.frame = 0;

    this.Factory = Factory;
    this.type = "Laser";
    this.shape = 'ellipse';

    // the paddle the laser is associated with
    this.paddle = paddle;
    this.paddleSlot = 0;

    const size = 15;
    this.w = size;
    this.h = size;

    // This player don't care bout no friction
    this.friction = 1;
    this.staticFriction = 0;

    this.shot = false;
    this.direction = null;


// custom methods

    // this.myPaddle = () => {
    //     let paddle;
    //     this.direction === 1 ? paddle = Factory.paddleTop : paddle = Factory.paddleBottom;
    //     return paddle;
    // };

    this.updateLaser = () => {
        if(paddle.x !== 0 || paddle.x !== Constants.STAGE_WIDTH){
            this.x += this.paddle.xvel;
        }
    };

    this.pulseEffect = function() {
        this.frame++;
        this.frame > this.AnimationArray.length ? this.frame = 0 : this.w = size * this.AnimationArray[this.frame];
    };

    this.boundaryCheck = function(){
        // let paddle = this.myPaddle();
        this.topEdge() <= 0 || this.bottomEdge() >= Constants.STAGE_HEIGHT ? this.paddle.resetLaser(this.id) : false;
    };

    this.laserHit = function(){
        Factory.gameObjects.forEach( e => {
            if(this.collidesAny(e)) {
                // console.log(`this laser's paddle ${this.paddle.player} paddle collided with ${e.paddle.player}`);
                this.laserReact(e);
            }
        });
    };



    this.laserReact = (object) => {

        // let paddle = this.myPaddle();

        this.yvel = 0;
        this.shot = false;

        switch(object.type){
            case "Ball":
                let n = 2;
                while(n--) {
                    let splitBall = Factory.createObject('Ball', Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2, 255, 255, 255);
                    splitBall.w *= 0.7;
                    splitBall.h *= 0.7;
                    splitBall.split = true;
                    splitBall.randomize();
                }
                // this.paddle.arrangeLasers();
                break;
            case "Paddle":
                if(object !== this.paddle){
                    // object.w *= 0.95;
                    object.shrink();
                }
                break;
        }

        this.paddle.resetLaser(this.id);
    };

}
