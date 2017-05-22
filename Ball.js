/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Ball(x,y, xvel, yvel){

    GameObject.call(this,x,y);

    const BallSize = 25;

    this.xvel = xvel;
    this.yvel = yvel;

    this.friction = 1;

    this.show = function(){
        fill(255);
        ellipse(this.x,this.y,BallSize,BallSize);
    };

    // Ball.prototype = Object.create(GameObject.prototype);
    // Ball.prototype.constructor = Ball;

}
