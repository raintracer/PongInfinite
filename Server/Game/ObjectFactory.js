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



function ObjectFactory(Game){

    this.Game = Game;

    // this.objectQuantity = 0;
    this.objectsMade = 0;
    this.gameObjects = [];

    this.Constants = {
        // return { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 3, TRANSFER_COEFFICIENT : 0.4, PADDLE_FORCE: 6};
        STAGE_WIDTH: 400,
        STAGE_HEIGHT: 800,
        CHAOS: 3,
        // TRANSFER_COEFFICIENT: 0.4,
        TRANSFER_COEFFICIENT: 0,
        PADDLE_FORCE: 6
    };

    this.createObject = function(objectType,x,y,red,green,blue, option = null){

        let object;

        if (objectType === "Ball"){
            object = new Ball(this, this.objectsMade, x, y, red, green, blue);
        }
        else if (objectType === "Laser"){
            object = new Laser(this, option, this.objectsMade, x, y, red, green, blue);
        }
        else if (objectType === "Paddle"){
            object = new Paddle(this, this.getObjectTypes("Paddle").length+1, this.objectsMade, x, y, red, green, blue);
        }
        else {
            console.log(`Unrecognized object: ${objectType}`);
        }

        this.gameObjects.push(object);

        this.objectsMade++;

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

    // this.update = function(){

    //     this.gameObjects.forEach( (e, i, a) => {

    //     // checks if a ball has crossed either Y bound and awards the respective point
    //         // deletes old ball(s) and creates a new one to be randomized
    //         if( e.type === 'Ball'){
    //             // if(score.scorePoint(e)){
    //             //     if(!e.mini){
    //             //         let newBall = this.createObject('Ball', Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2);
    //             //         newBall.randomize();
    //             //     }
    //             //     this.deleteObject(e.id);
    //             // }
    //         }

    //         if(e.type === 'Paddle'){

    //         }

    //         if( e.type === 'Laser'){

    //             if(e.shot){
    //                 e.boundaryCheck();
    //                 // e.pulseEffect();
    //                 e.laserHit();

    //             } else{
    //                 e.updateLaser();
    //             }
    //         }

    //     // after applying specific update methods call the GameObject update on the object
    //         e.update();
    //     });

    // };

    this.UpdateStrips = function(){
        this.gameObjects.forEach( (object,i,a) =>{
            object.UpdateStrip();
        });
    };

    // this.show = function(camera) {

    //     DrawArray = [];
    //     let Constants = this.Constants;
    //     this.gameObjects.forEach(function (e) {

    //         DrawArray.push({
    //             type: e.type,
    //             shape : e.shape,
    //             w: e.w,
    //             h: e.h,
    //             fill: {red: e.red, green: e.green, blue: e.blue},
    //             x: e.x-camera.x+Constants.STAGE_WIDTH/2,
    //             y: e.y-camera.y+Constants.STAGE_HEIGHT/2
    //         });

    //         // push an extra offset one to demo continuously drawn objects:
    //         // DrawArray.push({
    //         //     type: e.type,
    //         //     shape : e.shape,
    //         //     w: e.w,
    //         //     h: e.h,
    //         //     fill: {red: e.red, green: e.green, blue: e.blue},
    //         //     x: e.x-camera.x+Constants.STAGE_WIDTH/2,
    //         //     y: e.y-camera.y-Constants.STAGE_HEIGHT/2
    //         // });

    //     });

    //     return DrawArray;
    // };

    console.log(`Object Factor knows the stage width: ${this.Constants.STAGE_WIDTH}`);

}

