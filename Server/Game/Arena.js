
module.exports = Arena;
const Strip = require('./Strip')

function Arena(Game, StripQuantity){

    this.Game = Game;
    this.Constants = {
        STRIP_HEIGHT : 100,
        STRIP_WIDTH : 400
    };

    this.h = this.Constants.STRIP_HEIGHT * StripQuantity;
    this.w = this.Constants.STRIP_WIDTH;

    this.StripArray = [];
    for (let i = 0; i<StripQuantity; i++) {
        this.StripArray.push( new Strip(this, 0, i*this.Constants.STRIP_HEIGHT, this.Constants.STRIP_WIDTH, this.Constants.STRIP_HEIGHT) );
    }

    this.GetStripCenter = function(StripIndex){
        let Coordinate = {
            x: this.Constants.STRIP_WIDTH / 2,
            y: this.Constants.STRIP_HEIGHT * (StripIndex + 0.5)
        };
        console.log(Coordinate);
        return Coordinate;
    }

    this.update = function(){

    }
    
}