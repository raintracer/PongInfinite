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
    socket = io.connect("https://4ac8acda.ngrok.io");
    socket.once("AssignPlayer", assignPlayer);
    socket.emit("RequestPlayer");
    // socket.on('serverKeyPress', serverKeyPress);
    // socket.on('PushServerUpdate', loadUpdate);
    socket.on('gameShow', updateShow);
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

// KEY PRESS TO SHEET
function keyPressed(){
    socket.emit("shootKey", {keyCode:keyCode});
}

function serverKeyPress(data){
}

function assignPlayer(data){
    player = data.player;
    console.log("Player Assigned: " + player);
}

function updateShow(data) {

    if (keyIsDown(65)) {
        console.log(data);
    }

    background(0);
    data.DrawArray.forEach(function(e){
        image(GameGraphics[e.type], e.x, e.y)
    });

}