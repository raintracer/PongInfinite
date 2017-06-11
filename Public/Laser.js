/**
 * Created by Vampiire on 5/26/17.
 */

function Laser(id, x, y, red=255, green=255, blue=255){

    GameObject.call(this, id, x, y, red, green, blue);

    // This player don't care bout no friction
    this.friction = 1;
    this.staticFriction = 0;

    this.show = function(){

        fill(0,0, 255);
        rect(this.x, this.y, 10, 10);

    }

}
