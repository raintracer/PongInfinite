/**
 * Created by Richard Tyler on 5/21/2017.
 */


module.exports = FactoryObject;

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 1, TRANSFER_COEFFICIENT : 0.4};

function FactoryObject(Factory, id, x, y, red=255, green=255, blue=255) {

// position coordinates
    this.Factory = Factory;
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;

// identifiers
    this.id = id;
    this.type = "General";
    this.shape = 'General';

    this.red = red;
    this.green = green;
    this.blue = blue;

// x,y velocities of the Factory object
    this.xvel = 0;
    this.yvel = 0;

// static and dynamic friction factors for the Factory object
    this.friction = 0.6;
    this.staticFriction = 0.5;
    
    // Assign this object to a strip
    this.strip = this.Factory.Game.Arena.GetStripAtArenaPosition(this.x, this.y);
    this.strip.AssignObject(this);

// Factory object acceleration in the x direction, passes a force which continuously accelerates the object per call
    this.accX = function(force){
        this.xvel += force;
    };

// '' y direction
    this.accY = function(force){
        this.yvel += force;
    };

// Factory object update function which continuously updates per call with x,y velocities and movement of the Factory objects
// applies the dynamic friction factor per call and limits the Factory object to a minimum velocity of 0
    this.Update = function(){
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

// moves the Factory object in the x direction, assigns the old x position to the previous x position before movement
// sets bounds in the x direction to contain the Factory object within the canvas
    this.moveX = function(){

        this.x += this.xvel;

        // left edge boundary crossing prevention
        if (this.leftEdge() < 0) {
            this.alignLeftEdge(0);
            this.reflectX();
        }

        // right edge boundary crossing prevention
        else if (this.rightEdge() > Factory.Game.Arena.w) {

            this.alignRightEdge(Factory.Game.Arena.w);
            this.reflectX();
        }

    };

    this.moveY = function(){
        this.y += this.yvel;
    };

// Factory object edges for use in collision detection
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

    this.alignTopEdge = function(position){
        this.setPosition(this.x, position+this.h/2);
    };

    this.alignBottomEdge = function(position){
        this.setPosition(this.x, position-this.h/2);
    };

    this.alignLeftEdge = function(position){
        this.setPosition(position+this.w/2, this.y);
    };

    this.alignRightEdge = function(position){
        this.setPosition(position-this.w/2, this.y);
    };

    this.collidesTopRight = function(Factory_object){
        return Factory_object.containsPoint(this.rightEdge(),this.topEdge());
    };

    this.collidesTopLeft = function(Factory_object){
        return Factory_object.containsPoint(this.leftEdge(),this.topEdge());
    };

    this.collidesBottomRight = function(Factory_object){
        return Factory_object.containsPoint(this.rightEdge(),this.bottomEdge());
    };

    this.collidesBottomLeft = function(Factory_object){
        return Factory_object.containsPoint(this.leftEdge(),this.bottomEdge());
    };

    this.collidesRight = function(Factory_object){
        return Factory_object.containsPoint(this.rightEdge(),this.y)

    };

    this.collidesLeft = function(Factory_object){
        return Factory_object.containsPoint(this.leftEdge(),this.y);
    };

    this.collidesTop = function(Factory_object){
        return Factory_object.containsPoint(this.x,this.topEdge());
    };

    this.collidesBottom = function(Factory_object){
        return Factory_object.containsPoint(this.x,this.bottomEdge());
    };

    this.collidesAny = function(Factory_object){
        return (this.collidesTopLeft(Factory_object) || this.collidesTop(Factory_object) || this.collidesTopRight(Factory_object) || this.collidesRight(Factory_object) || this.collidesBottomRight(Factory_object) || this.collidesBottom(Factory_object) || this.collidesBottomLeft(Factory_object) || this.collidesLeft(Factory_object));
    };

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

    this.transferMomentumX = function(TargetObject){

        // Transfer some velocity between active and target objects
        let MomentumDifference = Math.abs(Math.abs(this.xvel) - Math.abs(TargetObject.xvel));
        let MomentumTransfer = MomentumDifference*Constants.TRANSFER_COEFFICIENT/2;

        if (Math.abs(this.xvel) > TargetObject.xvel){
            this.xvel -= MomentumTransfer*this.xDir();
            TargetObject.xvel += MomentumTransfer*TargetObject.xDir();
        }
        else if (Math.abs(this.xvel) < TargetObject.xvel){
            this.xvel += MomentumTransfer*this.xDir();
            TargetObject.xvel -= MomentumTransfer*TargetObject.xDir();
        }

    };

    this.transferMomentumY = function(TargetObject){

        // Transfer some velocity between active and target objects
        let MomentumDifference = Math.abs(Math.abs(this.yvel) - Math.abs(TargetObject.yvel));
        let MomentumTransfer = MomentumDifference*Constants.TRANSFER_COEFFICIENT;

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
// FactoryObject.prototype.Test2 = function(){
//     alert ("wut");
//
// };