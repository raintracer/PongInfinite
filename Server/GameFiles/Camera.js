

module.exports = Camera;

function Camera(x, y){

    this.x = x;
    this.y = y;
    
    this.SetPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

}