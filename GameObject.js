/**
 * Created by Richard Tyler on 5/21/2017.
 */

function GameObject(x,y) {

    this.x = x;
    this.y = y;

    this.oldx = x;
    this.oldy = y;

    this.w = 0;
    this.h = 0;

    this.xvel = 0;
    this.yvel = 0;

    this.friction = 0.6;
    this.staticFriction = 0.5;

    this.accX = function(force){
        this.xvel += force;
    };

    this.accY = function(force){
        this.yvel += force;
    };

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

    this.moveX = function(){
        this.oldx = this.x;
        this.x += this.xvel;

        if(this.x<0){
            this.x=0;
            this.xvel*=-1;
        }

        else if(this.x>STAGE_WIDTH){
            this.x=STAGE_WIDTH;
            this.xvel*=-1;
        }
    };

    this.moveY = function(){
        this.oldy = this.y;
        this.y += this.yvel;

        // if(this.y<0){
        //     this.y=0;
        //     this.yvel*=-1;
        // }
        //
        // else if(this.y>STAGE_HEIGHT){
        //     this.y=STAGE_HEIGHT;
        //     this.yvel*=-1;
        // }
    };

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

    this.TestClass = function(){
        alert("Yay");
    };

    this.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    };

}

GameObject.prototype.Test2 = function(){
    alert ("wut");
};