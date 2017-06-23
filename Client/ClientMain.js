// global variables and constants
let socket;
let canvas;
let ballCollide, pointAwarded, paddleCollide, mute = true;
let GameGraphics = {};
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
    socket = io.connect("127.0.0.1:3000");
    // socket = io.connect('https://58d4f45d.ngrok.io');

    // initiate the AssignPlayer listener before emitting the request for assignment
    socket.on("AssignPlayer", assignPlayer);

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
        data.preLoadData.forEach(e => {

            GameGraphics[e.type] = createGraphics(e.w, e.h);
            GameGraphics[e.type].fill(e.fill.red, e.fill.green, e.fill.blue);

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

    // prevents crash if data is not available for the loop due to server hangup
    if(data){

        data.DrawArray.forEach(function(e){

            GameGraphics[e.type].background(e.fill.red, e.fill.green, e.fill.blue);
            GameGraphics[e.type].noStroke();

        // draw from center to match server side draw method
            imageMode(CENTER);
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
