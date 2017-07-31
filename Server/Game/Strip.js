


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
        console.log (`Strip ${this.id} has objects: ${this.Objects.length}`);
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

    this.GetDrawArray(Camera, OffsetX, OffsetY){
        
        DrawArray = [];
        let Constants = this.Arena.Game.Factory.Constants;
        
        this.Objects.forEach( (object, i, a) => {

            DrawArray.push({
                type: object.type,
                shape : object.shape,
                w: object.w,
                h: object.h,
                fill: {red: object.red, green: object.green, blue: object.blue},
                x: object.x - camera.x + Constants.STAGE_WIDTH/2 + OffsetX,
                y: object.y - camera.y + Constants.STAGE_HEIGHT/2 + OffsetY
            });
            
        });
        
    }
}

module.exports = Strip;