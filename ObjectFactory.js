/**
 * Created by Richard Tyler on 5/26/2017.
 */

function ObjectFactory(x,y,red,green,blue){

    this.objectQuantity = 0;
    this.gameObjects = [];

    this.createObject = function(objectType,x, y){

        if (objectType === "Ball"){

            this.gameObjects.push(new Ball(this.objectQuantity, x, y, red, green, blue));

        }
        else if (objectType === "Laser"){



        }

        this.objectQuantity++;

    }

}