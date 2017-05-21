/**
 * Created by Richard Tyler on 5/21/2017.
 */

function GameObject(x,y) {

    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;

    this.friction = 0.95;
    this.staticFriction = 0.2;

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
        this.y += this.yvel;
        if(this.y<0){
            this.y=0;
            this.yvel*=-1;
        }
        else if(this.y>STAGE_HEIGHT){
            this.y=STAGE_HEIGHT;
            this.yvel*=-1;
        }
    };

    this.TestClass = function(){
        alert("Yay");
    };

}

GameObject.prototype.Test2 = function(){
    alert ("wut");
};