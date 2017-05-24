/**
 * Created by Richard Tyler on 5/21/2017.
 */

// paddle object, inherits gameobject properties
// color can be passed or defaults to white (255, 255, 255)
function Paddle(id, x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,id,x,y);

// assigns the rgb color values passed into the constructor, defaults to white
    this.red = red;
    this.green = green;
    this.blue = blue;

// assigns the width and height of the paddle object
    this.w = 75;
    this.h = 15;

// dampening coefficient used when imparting the velocity of the paddle to the ball during collision
    this.dampen = .4;

// defines left and right faces of the paddle
    this.leftFace =

// show method of the paddle, draws the paddle object as a rectangle of specified color, width, height, and position
    this.show = function(){

        fill(this.red, this.green, this.blue);

        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);

    }

}
