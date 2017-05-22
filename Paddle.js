/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Paddle(x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,x,y);

    this.red = red;
    this.green = green;
    this.blue = blue;

    this.w = 75;
    this.h = 15;

    this.dampen = .4;

    this.show = function(){

        fill(this.red, this.green, this.blue);

        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);

    };

    this.deflectBall = function(ball) {

        // The ball is within paddle's x range
        if ((ball.rightEdge() >= this.leftEdge()) && ((ball.leftEdge() <= this.rightEdge()))){
            // console.log("RANGE");

            // Check ball collision with top edge
            if (ball.bottomEdge()>this.topEdge() && ball.oldBottomEdge()<this.topEdge()){
                console.log("Hit Top");
                // ball.setPosition(ball.x,this.topEdge()-ball.h/2);
                ball.yvel*=-1;
                ball.accX(this.xvel*this.dampen);
                ball.accY(-.4);
            }

            // Check ball collision with bottom edge
            else if (ball.topEdge()<this.bottomEdge() && ball.oldTopEdge()>this.bottomEdge()){
                // console.log("Hit Top");
                ball.yvel*=-1;
                ball.accX(this.xvel*this.dampen);
                ball.accY(+.4);
            }

        }

    };

}
