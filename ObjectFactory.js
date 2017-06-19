/**
 * Created by Richard Tyler on 5/26/2017.
 */

module.exports = ObjectFactory;

const Ball = require('./Ball');
const Paddle = require('./Paddle');
const Laser = require('./Laser');
const Constants = require('./ServerMain').Constants;

let paddleTop;
let paddleBottom;
let DrawArray = [];

function ObjectFactory(){

    this.objectQuantity = 0;
    this.objectsMade = 0;
    this.gameObjects = [];

    this.createObject = function(objectType,x,y,red,green,blue){

        let object;

        if (objectType === "Ball"){

            object = new Ball(this, this.objectsMade, x, y, red, green, blue);

        }
        else if (objectType === "Laser"){

            object = new Laser(this, this.objectsMade, x, y, red, green, blue);

        }
        else if (objectType === "Paddle"){

            object = new Paddle(this, this.getObjectTypes("Paddle").length+1, this.objectsMade, x, y, red, green, blue);

        }
        else {
            console.log(`Unrecognized object: ${objectType}`);
        }

        this.gameObjects.push(object);

        this.objectsMade++;
        this.objectQuantity++;

        return this.gameObjects[this.gameObjects.length-1];

    };

    this.deleteObject = function(id){

        for (let i = 0; i < this.objectQuantity; i++){

            if (this.gameObjects[i].id === id){

                this.gameObjects.splice(i,1);
                this.objectQuantity--;

            }

        }

    };

    // RETURNS A LIST OF ALL THE OBJECTS MATCHING THE SPECIFIED TYPE
    this.getObjectTypes = function(type){

        let objects = [];
        for (let i = 0; i<this.objectQuantity; i++){
            if (this.gameObjects[i].type === type){
                objects.push(this.gameObjects[i]);
            }
        }

        return objects;

    };

    this.randomizeBalls = function(){
        let Balls = this.getObjectTypes("Ball");
        // console.log(Balls);
        for(i in Balls){
            // console.log(Balls[i].id);
            Balls[i].randomize();
        }
    };

    this.update = function(){

        for (i in this.gameObjects){
            this.gameObjects[i].update();
        }

    };

    this.show = function(){

        DrawArray = [];
        this.gameObjects.forEach(function(e){

            DrawArray.push({
                x:e.x,
                y:e.y,
                type:e.type});

        });

        return DrawArray;

    };

}