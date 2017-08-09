

module.exports = Camera;

function Camera(Game, x, y){

    this.Game = Game;

    const StageHeight = this.Game.Constants.STAGE_HEIGHT;
    const StageWidth = this.Game.Constants.STAGE_WIDTH;

    this.x = x;
    this.y = y;
    this.z = 1;
    
    this.SetPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

    this.moveZ = function(zvel){
        this.z += zvel;
        if (this.z > 1){
            this.z = 1;
        }
        if (this.z < .1){
            this.z = .1;
        }
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

    //
    this.GetVisibleArenaHeight = function(){
        return StageHeight / this.z;
    };

    this.StageTopEdgeArenaPosition = function(){
        let StageHeight = this.Game.Factory.Constants.STAGE_HEIGHT;
        let StageTop = this.y - this.GetVisibleArenaHeight()/2;

        while (StageTop < 0){
            StageTop += this.Game.Arena.h;
        }

        while (StageTop > this.Game.Arena.h){
            StageTop -= this.Game.Arena.h;
        }

        return StageTop;
    };

}