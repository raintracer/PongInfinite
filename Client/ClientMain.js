// global variables and constants

let socket;

let canvas, score, topScore = 0, bottomScore = 0;
let ballCollide = '', pointAwarded = '', paddleCollide = '', mute = true;

let GameGraphics = [];

let player;

// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const STAGE_WIDTH = 400, STAGE_HEIGHT = 500;

// PRELOAD THE SOUND EFFECTS TO BE READY FOR USE
function preload(){

    // LOAD SOUNDS
    ballCollide = loadSound('Sound Effects/Ball_Collide.mp3');
    pointAwarded = loadSound('Sound Effects/Light_Fapping.mp3');
    paddleCollide = loadSound('Sound Effects/Soft_Ding.mp3');

    // LOAD GRAPHICS
    GameGraphics["Ball"] = createGraphics(20, 20);
    GameGraphics["Ball"].fill(255);
    GameGraphics["Ball"].noStroke();
    GameGraphics["Ball"].ellipse(10,10,20);

    GameGraphics["Paddle"] = createGraphics(75, 15);
    GameGraphics["Paddle"].fill(255,0,0);
    GameGraphics["Paddle"].noStroke();
    GameGraphics["Paddle"].rect(0,0,75,15);

    GameGraphics["Laser"] = createGraphics(10, 10);
    GameGraphics["Laser"].fill(0,0,255);
    GameGraphics["Laser"].noStroke();
    GameGraphics["Laser"].rect(0,0,10,10);

    // THE SACRED TRIANGLE (STUPID)
    // fill(255,0,0);
    // triangle(this.x-10, this.y+(this.orientation()*10), this.x, this.y+(this.orientation()*30), this.x+10, this.y+(this.orientation()*10));

    // // // CONNECT TO THE SERVER
    // socket = io.connect("http://localhost:3000");
    socket = io.connect("https://fb11fb60.ngrok.io");
    socket.once("AssignPlayer", assignPlayer);
    socket.emit("RequestPlayer");
    socket.on('gameShow', Update);

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


// draw function performs actions in control --> update --> detect collision --> show order
function draw(){
    noLoop();
}

// single press of a key
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


function assignPlayer(data){
    player = data.player;
    console.log("Player Assigned: " + player);
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

    data.DrawArray.forEach(function(e){
        image(GameGraphics[e.type], e.x, e.y)
    });

}