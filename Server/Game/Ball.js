/**
 * Created by Richard Tyler on 5/21/2017.
 */

module.exports = Ball;

const GameObject = require('./GameObject');

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 10, TRANSFER_COEFFICIENT : 0.4};

function Ball(Factory, id, x, y, red=255, green=255, blue=255){

    GameObject.call(this,Factory,id,x,y, red, green, blue);
    this.type = "Ball";
    this.shape = 'ellipse';
    this.Factory = Factory;
    this.imagetype = "Ball";
    const constants = this.Factory.constants;

// Set the default flavor
    this.flavor = 0;

// boolean if the ball has been split by a laser collision
    this.mini = false;

// ball diameter

    const BallSize = 20;
    this.w = BallSize;
    this.h = BallSize;

    this.randomize = function(x = Math.random()*this.Factory.Game.Arena.w, y = Math.random()*this.Factory.Game.Arena.h, xvel = Math.random()*Constants.CHAOS, yvel = Math.random()*Constants.CHAOS){
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

    this.SetFlavor = function(flavor){
        this.flavor = flavor;
        this.imagetype = `Ball${flavor}`;
    };

}
