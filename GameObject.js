/**
 * Created by Richard Tyler on 5/21/2017.
 */

function GameObject(id,x,y) {

// x,y position of the game object [ball(s), paddles]
    this.x = x;
    this.y = y;
    this.id = id;

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

        this.x += this.xvel;

        // left edge boundary crossing prevention
        if (this.x - (this.w / 2) < 0) {
            this.x = this.w / 2;
            this.xvel *= -1;
        }

        // right edge boundary crossing prevention
        else if (this.x + (this.w / 2) > width) {
            this.x = width - (this.w / 2);
            this.xvel *= -1;
        }

    };

    this.moveY = function(){
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

    this.collidesTopRight = function(game_object){
        return game_object.containsPoint(this.rightEdge(),this.topEdge());
    };

    this.collidesTopLeft = function(game_object){
        return game_object.containsPoint(this.leftEdge(),this.topEdge());
    };

    this.collidesBottomRight = function(game_object){
        return game_object.containsPoint(this.rightEdge(),this.bottomEdge());
    };

    this.collidesBottomLeft = function(game_object){
        return game_object.containsPoint(this.leftEdge(),this.bottomEdge());
    };

    this.collidesRight = function(game_object){
        return game_object.containsPoint(this.rightEdge(),this.y)

    };

    this.collidesLeft = function(game_object){
        return game_object.containsPoint(this.leftEdge(),this.y);
    };

    this.collidesTop = function(game_object){
        return game_object.containsPoint(this.x,this.topEdge());
    };

    this.collidesBottom = function(game_object){
        return game_object.containsPoint(this.x,this.bottomEdge());
    };

    this.collidesAny = function(game_object){
        return (this.collidesTopLeft(game_object) || this.collidesTop(game_object) || this.collidesTopRight(game_object) || this.collidesRight(game_object) || this.collidesBottomRight(game_object) || this.collidesBottom(game_object) || this.collidesBottomLeft(game_object) || this.collidesLeft(game_object));
    }

    // Check if the point is inside the object, treating it like a rectangle
    this.containsPoint = function(x,y){

        // if the point is within the x boundaries
        if ( x>(this.x-this.w/2) &&  x<(this.x+this.w/2)){

            // and if the point is within the y boundaries
            if ( y>(this.y-this.h/2) &&  y<(this.y+this.h/2)){
                // The object contains the point
                return true;
            }
        }

        return false;
    };

    this.reflectX = function(){
        this.xvel *= -1;
    };

    this.reflectY = function(){
        this.yvel *= -1;
    };

    this.xDir = function(){
        if (this.xvel>0){
            return  1;
        }
        else if (this.xvel<0){
            return  -1;
        }
        else{
            return  0;
        }
    };

    this.yDir = function(){
        if (this.yvel>0){
            return 1;
        }
        else if (this.yvel<0){
            return  -1;
        }
        else{
            return  0;
        }
    };

    this.TransferMomentumX = function(TargetObject){

        // Transfer some velocity between active and target objects
        let MomentumDifference = Math.abs(Math.abs(this.xvel) - Math.abs(TargetObject.xvel));
        let MomentumTransfer = MomentumDifference*TRANSFER_COEFFICIENT/2;

        if (Math.abs(this.xvel) > TargetObject.xvel){
            this.xvel -= MomentumTransfer*this.xDir();
            TargetObject.xvel += MomentumTransfer*TargetObject.xDir();
        }
        else if (Math.abs(this.xvel) < TargetObject.xvel){
            this.xvel += MomentumTransfer*this.xDir();
            TargetObject.xvel -= MomentumTransfer*TargetObject.xDir();
        }

    };

    this.TransferMomentumY = function(TargetObject){

        // Transfer some velocity between active and target objects
        let MomentumDifference = Math.abs(Math.abs(this.yvel) - Math.abs(TargetObject.yvel));
        let MomentumTransfer = MomentumDifference*TRANSFER_COEFFICIENT;

        if (Math.abs(this.yvel) > TargetObject.yvel){
            this.yvel -= MomentumTransfer*this.yDir();
            TargetObject.yvel += MomentumTransfer*TargetObject.yDir();
        }
        else if (Math.abs(this.yvel) < TargetObject.yvel){
            this.yvel += MomentumTransfer*this.yDir();
            TargetObject.yvel -= MomentumTransfer*TargetObject.yDir();
        }

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