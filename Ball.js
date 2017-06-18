/**
 * Created by Richard Tyler on 5/21/2017.
 */

module.exports = Ball;

const GameObject = require('./GameObject');
const Constants = require('./ServerMain').Constants;

function Ball(id,x,y, red=255, green=255, blue=255){

    GameObject.call(this,id,x,y, red, green, blue);
    this.type = "Ball";

// ball diameter

    const BallSize = 20;
    this.w = BallSize;
    this.h = BallSize;

    this.randomize = function(x = Math.random()*Constants.STAGE_WIDTH, y = Math.random()*Constants.STAGE_HEIGHT, xvel = Math.random()*Constants.CHAOS, yvel = Math.random()*Constants.CHAOS){
        this.x = x;
        this.y = y;
        this.xvel = xvel;
        this.yvel = yvel;
    };

// ball drop (on startup or reset after point is awarded)

    this.drop = function(xvel, yvel){
        this.xvel = xvel;
        this.yvel = yvel;
    };

// negates GameObject dynamic friction
    this.friction = 1;
    this.staticFriction = 0;

// draws the ball object
    this.show = function(){
        fill(red, green, blue);
        ellipse(this.x,this.y,BallSize,BallSize);
    };

    // moves the game object in the x direction, assigns the old x position to the previous x position before movement
// sets bounds in the x direction to contain the game object within the canvas
    this.moveX = function(){

        this.x += this.xvel;
        let HitObjects = objectFactory.getObjectTypes("Ball");

        // DETECT COLLISION WITH OTHER BALLS
        for (let i = 0; i < HitObjects.length; i++) {

            // If the target object and the current object aren't the same
            if (HitObjects[i].id !== this.id) {
                // If the ball is moving right
                if (this.xvel > 0) {

                    // If there is a collision on the right
                    if (this.collidesRight(HitObjects[i]) || this.collidesTopRight(HitObjects[i]) || this.collidesBottomRight(HitObjects[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(HitObjects[i].leftEdge() - this.w / 2, this.y);

                        // Transfer Momentum
                        this.TransferMomentumX(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -HitObjects[i].xDir()){

                            HitObjects[i].reflectX();

                        }

                        // Reflect the active objects
                        this.reflectX();

                        // console.log("Right Collision");

                        // play ball collision sound if mute is off
                        if(!mute){
                            ballCollide.playMode('restart');
                            ballCollide.play();
                        }
                    }

                }
                else if (this.xvel < 0) {

                    // If there is a collision on the left
                    if (this.collidesLeft(HitObjects[i]) || this.collidesTopLeft(HitObjects[i]) || this.collidesBottomLeft(HitObjects[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(HitObjects[i].rightEdge() + this.w / 2, this.y);

                        // Transfer Momentum
                        this.TransferMomentumX(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -HitObjects[i].xDir()){

                            HitObjects[i].reflectX();

                        }

                        // Reflect the active objects
                        this.reflectX();

                        // console.log("Left Collision");

                        // play ball collision sound if mute is off
                        if(!mute){
                            ballCollide.playMode('restart');
                            ballCollide.play();
                        }

                    }



                }
            }
        }

        // DETECT COLLISION BOUNDARIES
        // left edge boundary crossing prevention
        if (this.x - (this.w / 2) < 0) {
            this.x = this.w / 2;
            this.reflectX();
        }

        // right edge boundary crossing prevention
        else if (this.x + (this.w / 2) > width) {
            this.x = width - (this.w / 2);
            this.reflectX();
        }

    };

    // moves the game object in the y direction, assigns the old y position to the previous y position before movement
    // sets bounds in the y direction to contain the game object within the canvas
    this.moveY = function(){

        this.y += this.yvel;
        score.scorePoint(this);
        let HitObjects = objectFactory.getObjectTypes("Ball");

        // DETECT COLLISION WITH OTHER BALLS
        for (let i = 0; i < HitObjects.length; i++) {

            // If the target object and the current object aren't the same
            if (HitObjects[i].id !== this.id) {
                // If the ball is moving down
                if (this.yvel > 0) {

                    // If there is a collision on the bottom
                    if (this.collidesBottomLeft(HitObjects[i]) || this.collidesBottom(HitObjects[i]) || this.collidesBottomRight(HitObjects[i])) {

                        this.setPosition(this.x, HitObjects[i].topEdge() - this.h / 2);

                        // Transfer Momentum
                        this.TransferMomentumY(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -HitObjects[i].yDir()){

                            HitObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Bottom Collision");

                        // play ball collision sound if mute is off
                        if(!mute){
                            ballCollide.playMode('restart');
                            ballCollide.play();
                        }
                    }

                }
                // If the ball is moving up
                else if (this.yvel < 0) {

                    // If there is a collision on the top
                    if (this.collidesTopLeft(HitObjects[i]) || this.collidesTop(HitObjects[i]) || this.collidesTopRight(HitObjects[i])) {
                        this.setPosition(this.x, HitObjects[i].bottomEdge() + this.h / 2);

                        // Transfer Momentum
                        this.TransferMomentumY(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -HitObjects[i].yDir()){

                            HitObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Top Collision");

                        // play ball collision sound if mute is off
                        if(!mute){
                            ballCollide.playMode('restart');
                            ballCollide.play();
                        }
                    }

                }
            }
        }

        // DETECT COLLISION WITH PADDLES AT ANY OF THE BALLS CORNERS OR SIDES
        if (this.collidesAny(paddleTop)){
            this.setPosition(this.x, paddleTop.bottomEdge() + this.h/2);
            this.yvel = Math.abs(this.yvel);
            this.yvel *= 1.1;
            this.xvel += paddleTop.xvel/10;

            // play paddle collision sound if mute is off
            if(!mute){
                paddleCollide.playMode('restart');
                paddleCollide.play();
            }


        }

        if (this.collidesAny(paddleBottom)){
            this.setPosition(this.x, paddleBottom.topEdge() - this.h/2);
            this.yvel = -Math.abs(this.yvel);
            this.yvel *= 1.1;
            this.xvel += paddleTop.xvel/10;

            // play paddle collision sound if mute is off
            if(!mute){
                paddleCollide.playMode('restart');
                paddleCollide.play();
            }
        }



        // DETECT COLLISION BOUNDARIES - Disabled to allow pass-through and scoring
        // // top edge boundary crossing prevention
        // if (this.y - (this.h / 2) < 0) {
        //     this.y = this.h / 2;
        //     this.reflectY();
        // }
        //
        // // bottom edge boundary crossing prevention
        // else if (this.y + (this.h / 2) > Constants.STAGE_HEIGHT) {
        //     this.y = Constants.STAGE_HEIGHT - (this.h / 2);
        //     this.reflectY();
        // }

    };

}
