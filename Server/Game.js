/**
 * Created by Vampiire on 7/27/17.
 */

const ObjectFactory = require('./Game/ObjectFactory');


module.exports = Game = function(nameSpace){

    // this.route = name of dynamic lobby route given by player
    this.id =
    this.factory = new ObjectFactory();
    this.socket = socket;
    this.players = [];
    this.gameInstance = null;


    this.Start = function(){
        Game.Start();
        ServerMain.Start();
    };

    this.Update = function(){
        return setInterval(() => {
            this.factory.update();
            //emit stuff
        }, 16.6);
    };



    // this.Update = function(){
    //     this.factory.update();
    // };
    //
    // this.ClearInterval = function(){
    //     clearInterval(interval);
    // };
    //
    // let interval = setInterval(this.update(), 16.6);

};

