/**
 * Created by Richard Tyler on 5/21/2017.
 */

function GameObject(x,y) {

// x,y position of the game object [ball(s), paddles]
    this.x = x;
    this.y = y;

// previous x,y position of the game object [ball(s)]
    this.oldx = x;
    this.oldy = y;

// width and height of the game object
    this.w = 0;
    this.h = 0;

// x,y velocities of the game object
    this.xvel = 0;
    this.yvel = 0;

// static and dynamic friction factors for the game object
    this.friction = 0.6;
    this.staticFriction = 0.5;

// game object acceleration in the x direction, passes a force which continuously accelerates the object per call
    this.accX = function(force){
        this.xvel += force;
    };

// '' y direction
    this.accY = function(force){
        this.yvel += force;
    };

// game object update function which continuously updates per call with x,y velocities and movement of the game objects
// applies the dynamic friction factor per call and limits the game object to a minimum velocity of 0
    this.update = function(){
        this.xvel *= this.friction;
        this.yvel *= this.friction;

        if(Math.abs(this.xvel) < this.staticFriction){
            this.xvel = 0;
        }

        if(Math.abs(this.yvel) < this.staticFriction){
            this.yvel = 0;
        }

        this.moveX();
        this.moveY();
    };

// moves the game object in the x direction, assigns the old x position to the previous x position before movement
// sets bounds in the x direction to contain the game object within the canvas
    this.moveX = function(){
        this.oldx = this.x;
        this.x += this.xvel;

        if(this.x<0){
            this.x=0;
            this.xvel*=-1;
        }

        else if(this.x>width){
            this.x=width;
            this.xvel*=-1;
        }
    };

    this.moveY = function(){
        this.oldy = this.y;
        this.y += this.yvel;
    };

// game object edges for use in collision detection
// old edges are used in determining ball collision in order to
// capture a collision despite the rapid velocity of the ball

    this.leftEdge = function(){
        return this.x - this.w/2;
    };

    this.rightEdge = function(){
        return this.x + this.w/2;
    };

    this.topEdge = function(){
        return this.y - this.h/2;
    };

    this.bottomEdge = function(){
        return this.y + this.h/2;
    };

    this.oldTopEdge = function(){
        return this.oldy - this.h/2;
    };

    this.oldBottomEdge = function(){
        return this.oldy + this.h/2;
    };

// Tyler's first javascript method. We're so proud of him
//     this.TestClass = function(){
//         alert("Yay");
//     };

// position setter
    this.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    };

}

// Tyler's first prototype method.
// GameObject.prototype.Test2 = function(){
//     alert ("wut");
//
// };