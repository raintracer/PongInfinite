// global variables and constants

let socket;

let canvas;
let ballCollide = '', pointAwarded = '', paddleCollide = '', mute = true;

let GameGraphics = [];

let player;

// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const STAGE_WIDTH = 400, STAGE_HEIGHT = 500;

// Preload the game and socket listeners / emitters
function preload(){

    // LOAD SOUNDS
    // ballCollide = loadSound('Sound Effects/Ball_Collide.mp3');
    // pointAwarded = loadSound('Sound Effects/Light_Fapping.mp3');
    // paddleCollide = loadSound('Sound Effects/Soft_Ding.mp3');

    // UPDATE SOCKET SERVER ON TESTING
    socket = io.connect("https://01c1969c.ngrok.io");

    // initiate the AssignPlayer listener before emitting the request for assignment
    socket.once("AssignPlayer", assignPlayer);

    // request player assignment
    socket.emit("RequestPlayer");

    // initialize gameShow listener and call Update() on data reception
    socket.on('gameShow', Update);

    // initialize updateScore listener and update score divs on data reception
    socket.on('updateScore', score => {

        document.getElementById('topScore').innerHTML = score.top;
        document.getElementById('bottomScore').innerHTML = score.bottom;

    });
}

function setup(){
    canvas = createCanvas(STAGE_WIDTH, STAGE_HEIGHT);
    centerCanvas();
}


// center the canvas
function centerCanvas(){
    let x = (windowWidth - width) / 2, y = (windowHeight - height) / 2;
    canvas.position(x,y);
}
// center on window resize (responsive design)
function windowResized(){
    centerCanvas();
}

// no draw loop required, draw data / rate controlled by server
function draw(){
    noLoop();
}

// ----------- CLIENT / SERVER INTERACTIONS ----------- //

function assignPlayer(data){
    player = data.player;
    console.log("Player Assigned: " + player);

    // initialize the preLoad listener AFTER player assignment
    socket.on('preLoad', data => {

        console.log('data in preload', data);

        const preLoadData = data.preLoadData;

        const preLoadGraphics = [preLoadData.ball, preLoadData.paddle, preLoadData.laser];

        preLoadGraphics.forEach( e => {

            console.log('forEach');

            GameGraphics[e.type] = createGraphics(e.w, e.h);
            GameGraphics[e.type].fill(e.fill.R, e.fill.G, e.fill.B);
            GameGraphics[e.type].noStroke();

            switch(e.shape){
                case 'rect':
                    shape = GameGraphics[e.type].rect(e.x, e.y, e.w, e.h);
                    break;
                case 'ellipse':
                    GameGraphics[e.type].ellipse(e.x, e.y, e.w, e.h);
                    break;
            }

        });

    });

}

function Update(data) {

    let key;

    if(keyIsDown(LEFT_ARROW)){
        key = 'left';
    }

    if(keyIsDown(RIGHT_ARROW)){
        key = 'right';
    }

    if(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)){
        socket.emit('keyPress', { player : player, key : key} );
    }

    background(0);

    if(data){

        data.DrawArray.forEach(function(e){
            // pass in width, height
            image(GameGraphics[e.type], e.x, e.y, e.w, e.h);

        });
    }



}

// single press of a key, p5 listener
function keyPressed(){

    let key;

    // single press of key
    switch(keyCode){
        case 38:
            key = 'up';
            break;
    }

    if(key){
        socket.emit('keyPress', { player : player, key : key });
    }

}
