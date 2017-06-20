/**
 * Created by Richard Tyler on 5/26/2017.
 */

module.exports = ObjectFactory;

const Ball = require('./Ball');
const Paddle = require('./Paddle');
const Laser = require('./Laser');
const Constants = require('./ServerMain').Constants;
const Score = require('./Score');

const score = new Score();

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


// I DONT THINK THIS WORKS ANYMORE. IT WAS FAILING WHEN TRYING TO DELETE LASERS THAT PASSED THE Y BOUNDS
// CONSOLE LOGGED INSIDE AND IT SAID GAMEOBJECTS WAS EMPTY....
    // this.deleteObject = function(id){
    //
    //     this.gameObjects.forEach((e, i, a) => {
    //
    //         console.log('loop');
    //
    //         if(e.id === id){
    //             a.splice(i, 1);
    //             this.objectQuantity--;
    //         }
    //
    //     });
    //
    // };

    // RETURNS A LIST OF ALL THE OBJECTS MATCHING THE SPECIFIED TYPE
    this.getObjectTypes = function(type){

        let objects = [];

        this.gameObjects.forEach( e => e.type === type ? objects.push(e) : false);

        return objects;

    };

    this.randomizeBalls = function(){

        let Balls = this.getObjectTypes("Ball");

        Balls.forEach( e => e.randomize());
    };

    this.update = function(){

        this.gameObjects.forEach( (e, i, a) => {

            e.update();

        // checks if a ball has crossed either Y bound and awards the respective point
            if( e.type === 'Ball'){
                score.scorePoint(e)
            }

            if( e.type === 'Laser'){

            // checks if a laser has crossed either Y bound and deletes the object if so to reduce memory usage
                if(e.boundaryCheck()){
                    console.log('deleted');
                    a.splice(i, 1);
                }

                e.laserHit();
            }

        });

    };

    this.show = function(){

        DrawArray = [];
        this.gameObjects.forEach(function(e){

            DrawArray.push({
                x:e.leftEdge(),
                y:e.topEdge(),
                type:e.type});

        });

        return DrawArray;

    };

}