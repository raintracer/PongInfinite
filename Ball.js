/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Ball(id,x,y){

    GameObject.call(this,id,x,y);

// ball diameter
    const BallSize = 10;
    this.w = BallSize;
    this.h = BallSize;
    this.type = "ball";

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

        // DETECT COLLISION WITH OTHER OBJECTS
        for (let i = 0; i < GameObjects.length; i++) {

            // If the target object and the current object aren't the same
            if (GameObjects[i].id !== this.id) {
                // If the ball is moving right
                if (this.xvel > 0) {

                    // If there is a collision on the right
                    if (this.collidesRight(GameObjects[i]) || this.collidesTopRight(GameObjects[i]) || this.collidesBottomRight(GameObjects[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(GameObjects[i].leftEdge() - this.w / 2, this.y);

                        // Transfer Momentum
                        if (GameObjects[i].type !== "paddle") {
                            this.TransferMomentumX(GameObjects[i]);
                        }

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -GameObjects[i].xDir()){

                            GameObjects[i].reflectX();

                        }

                        // Reflect the active objects
                        this.reflectX();

                        // console.log("Right Collision");
                    }

                }
                else if (this.xvel < 0) {

                    // If there is a collision on the left
                    if (this.collidesLeft(GameObjects[i]) || this.collidesTopLeft(GameObjects[i]) || this.collidesBottomLeft(GameObjects[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(GameObjects[i].rightEdge() + this.w / 2, this.y);

                        // Transfer Momentum
                        if (GameObjects[i].type !== "paddle") {
                            this.TransferMomentumX(GameObjects[i]);
                        }

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -GameObjects[i].xDir()){

                            GameObjects[i].reflectX();

                        }

                        // Reflect the active objects
                        this.reflectX();

                        // console.log("Left Collision");
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

        // DETECT COLLISION WITH OTHER OBJECTS
        for (let i = 0; i < GameObjects.length; i++) {

            // If the target object and the current object aren't the same
            if (GameObjects[i].id !== this.id) {
                // If the ball is moving down
                if (this.yvel > 0) {

                    // If there is a collision on the bottom
                    if (this.collidesBottomLeft(GameObjects[i]) || this.collidesBottom(GameObjects[i]) || this.collidesBottomRight(GameObjects[i])) {

                        this.setPosition(this.x, GameObjects[i].topEdge() - this.h / 2);

                        // Transfer Momentum
                        if (GameObjects[i].type !== "paddle") {
                            this.TransferMomentumY(GameObjects[i]);
                        }

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -GameObjects[i].yDir()){

                            GameObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Bottom Collision");
                    }

                }
                // If the ball is moving up
                else if (this.yvel < 0) {

                    // If there is a collision on the top
                    if (this.collidesTopLeft(GameObjects[i]) || this.collidesTop(GameObjects[i]) || this.collidesTopRight(GameObjects[i])) {
                        this.setPosition(this.x, GameObjects[i].bottomEdge() + this.h / 2);

                        // Transfer Momentum
                        if (GameObjects[i].type !== "paddle") {
                            this.TransferMomentumY(GameObjects[i]);
                        }

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -GameObjects[i].yDir()){

                            GameObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Top Collision");
                    }

                }
            }
        }

        // DETECT COLLISION BOUNDARIES
        // top edge boundary crossing prevention
        if (this.y - (this.h / 2) < 0) {
            this.y = this.h / 2;
            this.reflectY();
        }

        // bottom edge boundary crossing prevention
        else if (this.y + (this.h / 2) > height) {
            this.y = height - (this.h / 2);
            this.reflectY();
        }

    };

}
