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
    this.paddleRegistry = []; // Contains a list of default paddle y positions

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

            // Add this paddle to the paddleRegistry
            this.paddleRegistry.push(object.y);
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

    this.UpdateStrips = function(){
        this.gameObjects.forEach( (object,i,a) =>{
            object.UpdateStrip();
        });
    };

}

