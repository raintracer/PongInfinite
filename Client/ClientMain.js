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

    GameGraphics["Ball"] = createGraphics(20, 20);
    GameGraphics["Ball"].fill(255);
    GameGraphics["Ball"].noStroke();
    GameGraphics["Ball"].ellipse(10,10,20);

    GameGraphics["Paddle"] = createGraphics(75, 20);
    GameGraphics["Paddle"].fill(255,0,0);
    GameGraphics["Paddle"].noStroke();
    GameGraphics["Paddle"].rect(0,0,75,20);

    GameGraphics["Laser"] = createGraphics(15, 15);
    GameGraphics["Laser"].fill(0,255,0);
    GameGraphics["Laser"].noStroke();
    // GameGraphics["Laser"].ellipse(7.5,7.5,15);
    GameGraphics["Laser"].rect(0, 0, 5, 10);

    // UPDATE SOCKET SERVER ON TESTING
    socket = io.connect("127.0.0.1:3000");
    // socket = io.connect('https://1651a3db.ngrok.io');

    // initiate the AssignPlayer listener before emitting the request for assignment
    socket.on("AssignPlayer", assignPlayer);

    // initialize gameShow listener and call Update() on data reception
    socket.on('gameShow', Update);

    // initialize updateScore listener and update score divs on data reception
    socket.on('updateScore', score => {

        let topScore =  document.getElementById('topScore'),
            bottomScore = document.getElementById('bottomScore');

        topScore.innerHTML = score.top;
        bottomScore.innerHTML = score.bottom;

        // trying to set the bottom score to scale with canvas height...not working but worth exploring later
        // console.log('canvas', document.getElementById('defaultCanvas0').height+20);

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
    console.log(`You are player ${player}. ${player === 1 ? "Bottom Paddle" : "Top Paddle"}`);
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

            GameGraphics[e.type].fill(e.fill.red, e.fill.green, e.fill.blue);
            // GameGraphics[e.type].noStroke();
            //
            //
            // console.log(`preload ${e.type} of shape ${e.shape}`);
            //
            // switch(e.shape){
            //     case 'rect':
            //         console.log('rect called');
            //         GameGraphics[e.type].rect(e.x, e.y, e.w, e.h);
            //         break;
            //     case 'ellipse':
            //         GameGraphics[e.type].ellipse(e.x, e.y, e.w, e.h);
            //         break;
            // }

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
