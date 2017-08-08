
module.exports = Arena;
const Strip = require('./Strip')

function Arena(Game, StripQuantity){

    this.Game = Game;
    
    this.Constants = {
        STRIP_HEIGHT : 300,
        STRIP_WIDTH : 400
    };

    /*TEST*/
    // StripQuantity*=2;

    this.h = this.Constants.STRIP_HEIGHT * StripQuantity;
    this.w = this.Constants.STRIP_WIDTH;

    this.StripArray = [];
    for (let i = 0; i<StripQuantity; i++) {
        this.StripArray.push( new Strip(this, i, 0, i*this.Constants.STRIP_HEIGHT, this.Constants.STRIP_WIDTH, this.Constants.STRIP_HEIGHT) );
    }

    console.log ("Strip array length is " + this.StripArray.length);

    this.GetStripCenter = function(StripIndex){
        let Coordinate = {
            x: this.Constants.STRIP_WIDTH / 2,
            y: this.Constants.STRIP_HEIGHT * (StripIndex + 0.5)
        };
        console.log(Coordinate);
        return Coordinate;
    };

    // Return the strip that a position lays within
    this.GetStripAtArenaPosition = function(x,y){
        // let StripIndex = Math.floor(y / this.Constants.STRIP_HEIGHT);
        // let StripID = this.StripArray[Math.floor(y / this.Constants.STRIP_HEIGHT)].id;
        // console.log(`Strip ${StripID} returned to object.`);
        while(y<0){
            y+=this.h;
        }
        while(y>=this.h){
            y-=this.h;
        }
        return this.StripArray[Math.floor(y / this.Constants.STRIP_HEIGHT)];
    };

    this.Update = function(){

        this.StripArray.forEach( (Strip,i,a) => {

            Strip.Update();

        });

    }
    
}