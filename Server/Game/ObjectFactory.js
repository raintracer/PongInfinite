/**
 * Created by Richard Tyler on 5/26/2017.
 */

module.exports = ObjectFactory;

const Ball = require('./Ball');
const Paddle = require('./Paddle');
const Laser = require('./Laser');
const Score = require('./Score');

const score = new Score();

let paddleTop;
let paddleBottom;
let DrawArray = [];

const Constants = {
    // return { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 3, TRANSFER_COEFFICIENT : 0.4, PADDLE_FORCE: 6};
    stageWidth: 400,
    stageHeight: 500,
    chaos: 3,
    transferCoefficient: 0.4,
    paddleForce: 6
};


function ObjectFactory(){

    // this.objectQuantity = 0;
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
        // this.objectQuantity++;

        return this.gameObjects[this.gameObjects.length-1];

    };

    this.deleteObject = function(id){
        this.gameObjects.forEach( (e, i, a) => {
            if(e.id === id){
                a.splice(i, 1);
                this.objectsMade--;
            }
        });
    };

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



        // checks if a ball has crossed either Y bound and awards the respective point
            // deletes old ball(s) and creates a new one to be randomized
            if( e.type === 'Ball'){
                if(score.scorePoint(e)){
                    this.deleteObject(e.id);
                    console.log(`${e.type} deleted new length ${this.gameObjects.length}`);
                    // if(this.getObjectTypes('Ball').length <= 1){
                        let newBall = this.createObject('Ball', Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2);
                        newBall.randomize();
                    // }
                }
            }

            if(e.type === 'Paddle'){
                e.arrangeLasers();
            }

            if( e.type === 'Laser'){
            // checks if a laser has crossed either Y boundary and deletes the object
                if(e.boundaryCheck()){
                    this.deleteObject(e.id);
                }else{
                    e.pulseEffect();
                }

                if(e.shot){
                    e.laserHit();
                }else{

                }
            }

            e.update();

        });

    };

    this.show = function() {

        DrawArray = [];

        this.gameObjects.forEach(function (e) {

            DrawArray.push({
                type: e.type,
                shape : e.shape,
                w: e.w,
                h: e.h,
                fill: {red: e.red, green: e.green, blue: e.blue},
                x: e.x,
                y: e.y
            });
        });

        return DrawArray;
    };

}

