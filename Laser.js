/**
 * Created by Vampiire on 5/24/17.
 */

function Laser(id, x,y, orientation, red = 255, green = 255, blue = 255){


    GameObject.call(this, id, x, y);

    this.x = x;
    this.y = y;
    this.id = id;

    this.red = red;
    this.green = green;
    this.blue = blue;

    this.show = function(){

        fill(this.red, this.green, this.blue);

// ORIENTATION designates which way it points. +1 for top -1 for bottom
        triangle(this.x-10, this.y, this.x, this.y+(orientation*10), this.x+10, this.y);

    };


// shoot method to shoot projectilves
    this.shoot = function(){
        console.log('shoot method', orientation);
        if(orientation === 1){
            if(shotsTop.length >= 1){
                console.log('shot top');
                shotsTop[0].show();
                shotsTop[0].yvel = 2;
                shotsTop.shift();

            }
        }

        if(orientation === -1){
            if(shotsBottom.length >= 1){
                console.log('shot bottom');
                shotsBottom[0].show();
                shotsBottom[0].yvel = -2;
                shotsBottom.shift();

            }
        }

    };




}
