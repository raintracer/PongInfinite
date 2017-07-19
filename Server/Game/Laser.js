/**
 * Created by Vampiire on 5/26/17.
 */

module.exports = Laser;
const GameObject = require('./GameObject');

// const Constants = require('./ServerMain').Constants;

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 10, TRANSFER_COEFFICIENT : 0.4};

function Laser(parent, id, x, y, red=255, green=255, blue=255){

    GameObject.call(this, parent, id, x, y, red, green, blue);

    this.AnimationArray = [.2,.4,.6,.8,1,1,.8,.6,.4, 0.2];
    this.frame = 0;


    this.parent = parent;
    this.type = "Laser";
    this.shape = 'ellipse';

    const size = 15;
    this.w = size;
    this.h = size;

    // This player don't care bout no friction
    this.friction = 1;
    this.staticFriction = 0;

    this.shot = false;
    this.direction = null;


// custom methods

    this.pulseEffect = function() {
        this.frame++;
        this.frame > this.AnimationArray.length ? this.frame = 0 : this.w = size * this.AnimationArray[this.frame];
    };

    this.boundaryCheck = function(){
        return this.topEdge() <= 0 || this.bottomEdge() >= Constants.STAGE_HEIGHT;
    };

    this.laserHit = function(){
        parent.gameObjects.forEach( e => {
            if(e.id !== this.id && this.collidesAny(e)) {
                this.laserReact(e);
            }
        });
    };

    this.laserReact = (object) => {
        let paddle;
        this.direction === 1 ? paddle = parent.paddleTop : paddle = parent.paddleBottom;

        switch(object.type){
            case "Ball":
                let n = 2;
                while(n--) {
                    let splitBall = parent.createObject('Ball', Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2, 255, 255, 255);
                    splitBall.w *= 0.7;
                    splitBall.h *= 0.7;
                    splitBall.randomize();
                }
                // parent.deleteObject(object.id);
                // paddle.resetLaser();
                // paddle.arrangeLasers();
                break;
            case "Paddle":
                object.w *= 0.95;
                // paddle.resetLaser();
                // paddle.arrangeLasers();
                break;
            case "Laser":
                // parent.deleteObject(object.id);
                // parent.deleteObject(this.id);
                // paddle.resetLaser();
                // paddle.arrangeLasers();
        }
        // parent.deleteObject(this.id);
        paddle.arrangeLasers();
    };

}
