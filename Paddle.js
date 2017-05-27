/**
 * Created by Richard Tyler on 5/21/2017.
 */

// paddle object, inherits gameobject properties
// color can be passed or defaults to white (255, 255, 255)
function Paddle(player, id, x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,id,x,y,red, green, blue);
    this.type = "Paddle";
    this.player = player;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 15;

// dampening coefficient used when imparting the velocity of the paddle to the ball during collision
    this.dampen = .4;

// show method of the paddle, draws the paddle object as a rectangle of specified color, width, height, and position
    this.show = function(){

        if (this.player===1){
            orientation = 1;
        }
        else if (this.player===2){
            orientation = -1;
        }


        fill(this.red, this.green, this.blue);
        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        fill(255,0,0);
        triangle(this.x-10, this.y+(orientation*10), this.x, this.y+(orientation*30), this.x+10, this.y+(orientation*10));
    }

}
