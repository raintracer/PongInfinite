/**
 * Created by Richard Tyler on 5/21/2017.
 */

function Paddle(x,y, red = 255, green = 255, blue = 255){

    GameObject.call(this,x,y);

    this.red = red;
    this.green = green;
    this.blue = blue;

    const WIDTH = 75;
    const HEIGHT = 15;

    this.show = function(){

        fill(this.red, this.green, this.blue);

        rect(this.x-WIDTH/2, this.y-HEIGHT/2, WIDTH, HEIGHT);

    }




}
