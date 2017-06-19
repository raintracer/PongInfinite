/**
 * Created by Vampiire on 5/26/17.
 */

module.exports = Laser;
const GameObject = require('./GameObject');
const ObjectFactory = require('./ObjectFactory');

const factory = new ObjectFactory();

// const Constants = require('./ServerMain').Constants;

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 10, TRANSFER_COEFFICIENT : 0.4};

function Laser(parent, id, x, y, red=255, green=255, blue=255){

    GameObject.call(this, parent, id, x, y, red, green, blue);

    this.parent = parent;
    this.type = "Laser";

    // This player don't care bout no friction
    this.friction = 1;
    this.staticFriction = 0;

    this.pewPew = function(){

        if(this.topEdge() <= 0 || this.bottomEdge() >= Constants.STAGE_HEIGHT ){
            return true;
        }

    }



}
