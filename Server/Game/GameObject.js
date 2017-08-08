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

    this.imagetype = "None";
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
    // console.log(this);
    this.Strip = this.Factory.Game.Arena.GetStripAtArenaPosition(this.x, this.y);
    this.Strip.AssignObject(this);

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

    // moves the game object in the x direction, assigns the old x position to the previous x position before movement
// sets bounds in the x direction to contain the game object within the canvas
    this.moveX = function(){

        // console.log('moving in the x');

        this.x += this.xvel;
        let HitObjects = Factory.gameObjects;

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

                        // transfer Momentum
                        this.transferMomentumX(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -HitObjects[i].xDir()){

                            HitObjects[i].reflectX();

                        }

                        // Reflect the active objects
                        this.reflectX();

                        // console.log("Right Collision");

                    }

                }
                else if (this.xvel < 0) {

                    // If there is a collision on the left
                    if (this.collidesLeft(HitObjects[i]) || this.collidesTopLeft(HitObjects[i]) || this.collidesBottomLeft(HitObjects[i])) {

                        // Set the active object against the left side of the target object
                        this.setPosition(HitObjects[i].rightEdge() + this.w / 2, this.y);

                        // transfer Momentum
                        this.transferMomentumX(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.xDir() === -HitObjects[i].xDir()){

                            HitObjects[i].reflectX();

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
        else if (this.x + (this.w / 2) > Constants.STAGE_WIDTH) {
            this.x = Constants.STAGE_WIDTH - (this.w / 2);
            this.reflectX();
        }

    };

        // moves the game object in the y direction, assigns the old y position to the previous y position before movement
    // sets bounds in the y direction to contain the game object within the canvas
    this.moveY = function(){

        this.y += this.yvel;
        let HitObjects = Factory.gameObjects;

        // DETECT COLLISION WITH OTHER BALLS
        for (let i = 0; i < HitObjects.length; i++) {

            // If the target object and the current object aren't the same
            if (HitObjects[i].id !== this.id) {
                // If the ball is moving down
                if (this.yvel > 0) {

                    // If there is a collision on the bottom
                    if (this.collidesBottomLeft(HitObjects[i]) || this.collidesBottom(HitObjects[i]) || this.collidesBottomRight(HitObjects[i])) {

                        this.setPosition(this.x, HitObjects[i].topEdge() - this.h / 2);

                        // transfer Momentum
                        this.transferMomentumY(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -HitObjects[i].yDir()){

                            HitObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Bottom Collision");

                    }

                }
                // If the ball is moving up
                else if (this.yvel < 0) {

                    // If there is a collision on the top
                    if (this.collidesTopLeft(HitObjects[i]) || this.collidesTop(HitObjects[i]) || this.collidesTopRight(HitObjects[i])) {
                        this.setPosition(this.x, HitObjects[i].bottomEdge() + this.h / 2);

                        // transfer Momentum
                        this.transferMomentumY(HitObjects[i]);

                        // If the active object and the target object are moving in opposite, reflect the target object
                        if(this.yDir() === -HitObjects[i].yDir()){

                            HitObjects[i].reflectY();

                        }

                        // Reflect the active objects
                        this.reflectY();

                        // console.log("Top Collision");
                    }

                }
            }
        };

        // DETECT COLLISION WITH PADDLES AT ANY OF THE BALLS CORNERS OR SIDES
        // if (this.collidesAny(Factory.paddleTop)){
        //     this.setPosition(this.x, Factory.paddleTop.bottomEdge() + this.h/2);
        //     this.yvel = Math.abs(this.yvel);
        //     this.yvel *= 1.1;
        //     this.xvel += Factory.paddleTop.xvel/10;

        // }

        // if (this.collidesAny(Factory.paddleBottom)){
        //     this.setPosition(this.x, Factory.paddleBottom.topEdge() - this.h/2);
        //     this.yvel = -Math.abs(this.yvel);
        //     this.yvel *= 1.1;
        //     this.xvel += Factory.paddleTop.xvel/10;

        // }

        

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

        while (this.y < 0) {
            this.y += Factory.Game.Arena.h;
        }
        
        while (this.y > Factory.Game.Arena.h) {
            this.y -= Factory.Game.Arena.h;
        }

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

        if(TargetObject.type === "Paddle"){
            // this.xvel*=TargetObject.reflectFactor;
            return 1;
        }

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

        if(TargetObject.type === "Paddle"){
            // console.log(TargetObject);
            this.yvel*=TargetObject.reflectFactor;
            return 1;
        }

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

    // Check to see if this object has moved to another Strip, and reassign if necessary
    // This function assumes that the object did not move more than one strip away from the previous strip
    // If that becomes possible, a more robust method must be used
    this.UpdateStrip = function(){

        let CurrentStrip = this.Factory.Game.Arena.GetStripAtArenaPosition(this.x,this.y);
        // console.log(`${this.xvel}, ${this.yvel}`)

        if (CurrentStrip.id !== this.Strip.id){

            let OldStripID = this.Strip.id;
            let NewStripID = CurrentStrip.id;

            console.log(`OldStripID: ${OldStripID}`);
            console.log(`NewStripID: ${NewStripID}`);

            this.Strip.ReassignObject(this, CurrentStrip);
            this.Strip = CurrentStrip;

            // Determine if the strip went up or down
            let IntervalStepUp;
            if (OldStripID < NewStripID) {
                // Account for the fact that the OldStrip may have been at 0, meaning the NewStrip ID is actually down one
                if (OldStripID === 0){
                    // Check to see if the New Strip ID is the next highest
                    if (NewStripID === 1){
                        // The New Strip ID is higher
                        IntervalStepUp = true;
                    } else{
                        // [This should perhaps check that the NewStrip ID is at the end of the Strip IDs. This leaves it open to error]
                        // The New Strip ID is lower
                        IntervalStepUp = false;
                    }
                } else{
                    // The New Strip ID is definitely higher
                    IntervalStepUp = true;
                }
            } else if (OldStripID > NewStripID) {
                // Account for the fact that the OldStrip may have been at the max, meaning the NewStrip ID is actually up one
                if (NewStripID === 0){
                    // Check to see if the Old Strip ID is the next highest
                    if (OldStripID === 1){
                        // The New Strip ID is lower
                        IntervalStepUp = false;
                    } else{
                        // The New Strip ID is higher
                        IntervalStepUp = true;
                    }
                } else{
                    // The New Strip ID is definitely lower
                    IntervalStepUp = false;
                }
            } else {
                console.log("Warning: Strip was reassigned to a strip with a matching ID");
            }

            // Perform the appropriate action based on the strip movement
            switch (this.type) {
                case "Ball":
                    IntervalStepUp ? console.log("A ball went up") : console.log("A ball went down");
                    break;
                default:
                    break;
            }

        }
    };

}

// Tyler's first prototype method.
// FactoryObject.prototype.Test2 = function(){
//     alert ("wut");
//
// };