
module.exports = Arena;
Strip = require('./Strip')

function Arena(Game, StripQuantity){

    this.Game = Game;
    this.Constants = {
        STRIP_HEIGHT = 400,
        STRIP_WIDTH = 400
    };

    this.h = this.Constants.STRIP_HEIGHT * StripQuantity;
    this.w = this.Constants.STRIP_WIDTH;

    this.StripArray = [];
    for (let i = 0; i<StripQuantity; i++) {
        this.StripArray.push(New Strip(0, i*this.Constants.STRIP_HEIGHT, this.Constants.STRIP_WIDTH, this.Constants.STRIP_HEIGHT));
    }

    this.update = function(){

    }
    
}