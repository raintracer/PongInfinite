

module.exports = Camera;

function Camera(Game, x, y){

    this.Game = Game;
    this.x = x;
    this.y = y;
    
    this.SetPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

    this.Move = function(xvel, yvel){
        
        // Move the camera
        this.x += xvel;
        this.y += yvel;

        let ArenaHeight = this.Game.Arena.h;
        while (this.x < 0){
            this.x += ArenaHeight;
        }
        while (this.x > ArenaHeight){
            this.x -= ArenaHeight;
        }
    };

    this.StageTopEdgeArenaPosition = function(){
        let StageHeight = this.Game.Factory.Constants.STAGE_HEIGHT;
        let StageTop = this.y - StageHeight/2;

        while (StageTop < 0){
            StageTop += this.Game.Arena.h;
        }

        while (StageTop > this.Game.Arena.h){
            StageTop -= this.Game.Arena.h;
        }

        return StageTop;
    };

}