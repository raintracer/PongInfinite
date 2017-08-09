// global variables and constants
let socket;
let canvas;
let ballCollide, pointAwarded, paddleCollide, mute = true;
let GameGraphics = {};
let player;
let frame = 0;

let RailColor = {
    Red:255,
    Green:255,
    Blue:255
};

// ALL YOUR CONSTANTS ARE BELONG TO US. I DON'T KNOW WHAT WERE YELLING ABOUT
const STAGE_WIDTH = 450, STAGE_HEIGHT = 800;

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

    GameGraphics["Ball0"] = createGraphics(20, 20);
    GameGraphics["Ball0"].fill(255);
    GameGraphics["Ball0"].noStroke();
    GameGraphics["Ball0"].ellipse(10,10,20);
    GameGraphics["Ball0"].fill(0);
    GameGraphics["Ball0"].ellipse(10,10,18);

    GameGraphics["Ball1"] = createGraphics(20, 20);
    GameGraphics["Ball1"].fill(255);
    GameGraphics["Ball1"].noStroke();
    GameGraphics["Ball1"].ellipse(10,10,20);

    GameGraphics["Paddle1"] = createGraphics(75, 20);
    GameGraphics["Paddle1"].fill(255,0,0);
    GameGraphics["Paddle1"].noStroke();
    GameGraphics["Paddle1"].rect(0,0,75,20);

    GameGraphics["Paddle2"] = createGraphics(75, 20);
    GameGraphics["Paddle2"].fill(0,0,255);
    GameGraphics["Paddle2"].noStroke();
    GameGraphics["Paddle2"].rect(0,0,75,20);

    GameGraphics["PaddleHighlight"] = createGraphics(75, 20);
    GameGraphics["PaddleHighlight"].noFill();
    GameGraphics["PaddleHighlight"].strokeWeight(5);
    GameGraphics["PaddleHighlight"].stroke(100,255,0);
    GameGraphics["PaddleHighlight"].rect(0,0,75,20);

    GameGraphics["Laser"] = createGraphics(15, 15);
    GameGraphics["Laser"].fill(0,255,0);
    GameGraphics["Laser"].noStroke();
    GameGraphics["Laser"].ellipse(7.5,7.5,15);

    GameGraphics["None"] = createGraphics(20,20);
    GameGraphics["None"].fill(255);
    GameGraphics["None"].noStroke();
    GameGraphics["None"].rect(0,0,20,20);
    // GameGraphics["Laser"].rect(0, 0, 5, 10);

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

// function getKeyID(){
//     console.log(`keyCode recognized as ${keyCode}`);
// }

function keyPressed(){
    // console.log("Key Pressed");
    console.log(`Key pressed: ${keyCode}`)
    data = {
        key: key,
        keyCode: keyCode,
        socketID: socket.id
    };
    socket.emit('keyPress', data);
}

function keyReleased(){
    // console.log("Key Released");
    data = {
        key: key,
        keyCode: keyCode,
        socketID: socket.id
    };
    socket.emit('keyRelease', data);
}

function Update(data) {

    background(0);
    DrawScale = data.DrawArray[0].scale;

    // Color Pulse
    frame++;
    if (frame === 60){
        CrawlSpeed = 100;
        frame = 0;
    } else{
        CrawlSpeed = 10;
    }

    // Color Crawl
    RailColor.Red += CrawlSpeed*(Math.random()*2-1);
    RailColor.Green += CrawlSpeed*(Math.random()*2-1);
    RailColor.Blue += CrawlSpeed*(Math.random()*2-1);

    RailColor.Red < 0 ? RailColor.Red = 0 : 0;
    RailColor.Green < 0 ? RailColor.Green = 0 : 0;
    RailColor.Blue < 0 ? RailColor.Blue = 0 : 0;

    RailColor.Red > 255 ? RailColor.Red = 255 : 0;
    RailColor.Green > 255 ? RailColor.Green = 255 : 0;
    RailColor.Blue > 255 ? RailColor.Blue = 255 : 0;

    // Draw Rails
    scale(scale);
    fill(RailColor.Red, RailColor.Green, RailColor.Blue);
    rect(5,0,5,STAGE_HEIGHT);
    rect(20,0,5,STAGE_HEIGHT);
    rect(STAGE_WIDTH-10,0,5,STAGE_HEIGHT);
    rect(STAGE_WIDTH-25,0,5,STAGE_HEIGHT);

    // prevents crash if data is not available for the loop due to server hangup
    if(data){

        data.DrawArray.forEach(function(e){

            // console.log(e.type);
            // console.log(e.imagetype);
            // GameGraphics[e.imagetype].fill(e.fill.red, e.fill.green, e.fill.blue);
            // GameGraphics[e.type].noStroke();
            //
            //
            // console.log(`preload ${e.type} of shape ${e.shape}`);
            //
            // switch(e.shape){
            //     case 'rect':
            //         console.log('rect called');
            //         GameGraphics[e.type].rect(e.x, e.y, e.w, e.h);rs

            //         break;
            //     case 'ellipse':
            //         GameGraphics[e.type].ellipse(e.x, e.y, e.w, e.h);
            //         break;
            // }

        // draw from center to match server side draw method

            imageMode(CENTER);
            image(GameGraphics[e.imagetype], (25 + e.x) /*Uncomment to scale x : * DrawScale+(STAGE_WIDTH-50)*(1-DrawScale)/2*/, e.y*DrawScale, e.w, e.h*DrawScale);

        });


    }

}

// single press of a key, p5 listener
// function keyPressed(){

//     let key;

//     // single press of key
//     switch(keyCode){
//         case 38:
//             key = 'up';
//             break;
//     }

//     if(key){
//         socket.emit('keyPress', { player : player, key : key });
//     }

// }
