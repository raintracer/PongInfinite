


function Strip(Arena, id, x, y, w, h){
    
    this.id = id;
    this.Arena = Arena;
    this.Objects = [];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Update each object without reassigning
    this.Update = function(){
        this.Objects.forEach( (object, i, a) => {
            object.Update();
        });
    };

    this.Show = function(){
        
    };

    // Add an object to the object array
    this.AssignObject = function(object){
        this.Objects.push(object);
        // console.log (`Strip ${this.id} has objects: ${this.Objects.length}`);
    };

    // Unassign a specified object
    this.UnassignObject = function(object){
        
        // Search each object for the correct ID
        for (let i = 0; i < this.Objects.length; i++){
            if (object.id === this.Objects[i].id) {
                this.Objects.splice(i,1);
                return true;
            }
        }

        // If no match is found, do nothing and put out a console log
        console.log(`Object ${object.id} tried to unassign from Strip ${this.id} but it did not exist there.`);
        return false;

    };

    // Unassign a specified object
    this.ReassignObject = function(object, newStrip){
        
        if (this.UnassignObject(object) === false){
            console.log(`Object failed to unassign from strip ${this.id} while being reassigned to strip ${newStrip.id}.`)
        };
        newStrip.AssignObject(object);

    };

    this.GetDrawArray = function(player, OffsetX, OffsetY){
        
        DrawArray = [];
        let Constants = this.Arena.Game.Factory.Constants;
        
        this.Objects.forEach( (object, i, a) => {

            // Objects are populated to the Draw Array relative to the strip position and passed offset
            DrawArray.push({
                type: object.type,
                imagetype: object.imagetype,
                shape : object.shape,
                w: object.w,
                h: object.h,
                fill: {red: object.red, green: object.green, blue: object.blue},
                x: object.x - this.x + OffsetX,
                y: object.y - this.y + OffsetY
            });

            // Add a highlight around a paddle that belongs to the player
            if (object.type === "Paddle" && object.id === player.paddle.id){
                DrawArray.push({
                    type: "PaddleHighlight",
                    imagetype: "PaddleHighlight",
                    shape : object.shape,
                    w: object.w,
                    h: object.h,
                    x: object.x - this.x + OffsetX,
                    y: object.y - this.y + OffsetY
                });
            }

        });

        return DrawArray;
        
    }
}

module.exports = Strip;