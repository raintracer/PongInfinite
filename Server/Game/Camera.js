

module.exports = Camera;

function Camera(Game, x, y){

    this.Game = Game;
    this.x = x;
    this.y = y;
    
    this.SetPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

    this.StageTopEdge = function(){
        let StageHeight = this.Game.Factory.Constants.STAGE_HEIGHT;
        return this.y - StageHeight/2;
    };

    this.StageBottomEdge = function(){
        let StageHeight = this.Game.Factory.Constants.STAGE_HEIGHT;
        return this.y + StageHeight/2;
    };

}