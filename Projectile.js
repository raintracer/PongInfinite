/**
 * Created by Vampiire on 5/26/17.
 */

function Projectile(id, x, y){

    GameObject.call(this, id, x, y);

    this.show = function(){
        console.log('show called', id);
        fill(0,0, 255);
        rect(this.x, this.y, 100, 100);
    }

}
