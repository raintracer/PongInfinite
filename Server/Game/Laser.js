/**
 * Created by Vampiire on 5/26/17.
 */

module.exports = Laser;
const GameObject = require('./GameObject');
const Constants = require('./ServerMain').Constants;

function Laser(parent, id, x, y, red=255, green=255, blue=255){

    GameObject.call(this, parent, id, x, y, red, green, blue);

    this.parent = parent;
    this.type = "Laser";

    // This player don't care bout no friction
    this.friction = 1;
    this.staticFriction = 0;

}
