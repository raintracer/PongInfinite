


function Strip(Arena, id, x, y, w, h){
    
    this.id = id;
    this.Arena = Arena;
    this.Objects = [];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.Update = function(){
        
    };

    this.Show = function(){
        
    };

    // Add an object to the object array
    this.AssignObject = function(object){
        this.Objects.push(object);
    };

    // Unassign a specified object
    this.UnassignObject = function(object){
        
        // Search each object for the correct ID
        for (let i = 0; i < Objects.length; i++){
            if (object.id = Objects[i].id) {
                Objects.splice(i,1);
                return true;
            }
        }

        // If no match is found, do nothing and put out a console log
        console.log(`Object ${object.id} tried to unassign from Strip ${this.id} but it did not exist there.`);
        return false;

    };

}

module.exports = Strip;