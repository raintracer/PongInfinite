/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Ball(id,x,y){

    GameObject.call(this,id,x,y);

// ball diameter

    const BallSize = 20;
    this.w = BallSize;
    this.h = BallSize;

    this.randomize = function(x = Math.random()*width, y = Math.random()*height, xvel = Math.random()*CHAOS, yvel = Math.random()*CHAOS){
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
        fill(255);
        ellipse(this.x,this.y,BallSize,BallSize);
    };

    // moves the game object in the x direction, assigns the old x position to the previous x position before movement
// sets bounds in the x direction to contain the game object within the canvas
    this.moveX = function(){

        this.x += this.xvel;

        // DETECT COLLISION WITH OTHER BALLS
        for (let i = 0; i < Balls.length; i++) {

            // If the target object and the current object aren't the same
            if (Balls[i].id !== this.id) {
                // If the ball is moving right
                if (this.xvel > 0) {

                    // If there is a collision on the right
                    if (this.collidesRight(Balls[i]) || this.collidesTopRight(Balls[i]) || this.collidesBottomRight(Balls[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(Balls[i].leftEdge() - this.w / 2, this.y);

                        // Transfer Momentum
                        this.TransferMomentumX(Balls[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -Balls[i].xDir()){

                            Balls[i].reflectX();

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
                    if (this.collidesLeft(Balls[i]) || this.collidesTopLeft(Balls[i]) || this.collidesBottomLeft(Balls[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(Balls[i].rightEdge() + this.w / 2, this.y);

                        // Transfer Momentum
                        this.TransferMomentumX(Balls[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -Balls[i].xDir()){

                            Balls[i].reflectX();

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

        // DETECT COLLISION WITH OTHER BALLS
        for (let i = 0; i < Balls.length; i++) {

            // If the target object and the current object aren't the same
            if (Balls[i].id !== this.id) {
                // If the ball is moving down
                if (this.yvel > 0) {

                    // If there is a collision on the bottom
                    if (this.collidesBottomLeft(Balls[i]) || this.collidesBottom(Balls[i]) || this.collidesBottomRight(Balls[i])) {

                        this.setPosition(this.x, Balls[i].topEdge() - this.h / 2);

                        // Transfer Momentum
                        this.TransferMomentumY(Balls[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -Balls[i].yDir()){

                            Balls[i].reflectY();

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
                    if (this.collidesTopLeft(Balls[i]) || this.collidesTop(Balls[i]) || this.collidesTopRight(Balls[i])) {
                        this.setPosition(this.x, Balls[i].bottomEdge() + this.h / 2);

                        // Transfer Momentum
                        this.TransferMomentumY(Balls[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -Balls[i].yDir()){

                            Balls[i].reflectY();

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
        // else if (this.y + (this.h / 2) > height) {
        //     this.y = height - (this.h / 2);
        //     this.reflectY();
        // }

    };

}
