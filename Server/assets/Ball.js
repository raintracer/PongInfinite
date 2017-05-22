/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Ball(x,y){

    GameObject.call(this,x,y);

// ball diameter
    const BallSize = 25;
    this.w = BallSize;
    this.h = BallSize;

// ball drop (on startup or reset after point is awarded)

    this.drop = function(xvel, yvel){
        this.xvel = xvel;
        this.yvel = yvel;
    };


// negates GameObject dynamic friction
    this.friction = 1;

// draws the ball object
    this.show = function(){
        fill(255);
        ellipse(this.x,this.y,BallSize,BallSize);
    };

}
