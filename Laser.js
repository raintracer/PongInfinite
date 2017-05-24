/**
 * Created by Vampiire on 5/24/17.
 */

function Laser(x,y, orientation, red = 255, green = 255, blue = 255){

    this.x = x;
    this.y = y;

    this.red = red;
    this.green = green;
    this.blue = blue;

    this.show = function(){
        fill(this.red, this.green, this.blue);

        triangle(this.x-10, this.y, this.x, this.y+(orientation*10), this.x+10, this.y);
    };

    this.shoot = function(){



    }

}
